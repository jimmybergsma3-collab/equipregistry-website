import { getSession } from '@/lib/auth/getSession';
import { portalEnabled, portalCommand } from '@/lib/business/portal';
import { listPrivateBusinessAssets, readPrivateBusinessAsset } from '@/lib/business/read';
import { BusinessError, type View } from '@/lib/business/model';
import { accessCommand } from '@/lib/business/access';

export const runtime = 'nodejs';
const reply = (body: unknown, status = 200) => Response.json(body, {status, headers: {'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff'}});
export async function POST(request: Request) {
  if (!portalEnabled()) return reply({error: 'UNAVAILABLE'}, 404);
  const session = await getSession();
  if (!session.isAuthenticated || !session.user.emailVerifiedAt) return reply({error: 'SIGN_IN_REQUIRED'}, 401);
  const url = new URL(request.url);
  const origin = request.headers.has('host') ? `${url.protocol}//${request.headers.get('host')}` : url.origin;
  if (request.headers.get('origin') !== origin || ![null, 'same-origin'].includes(request.headers.get('sec-fetch-site'))) return reply({error: 'UNAVAILABLE'}, 403);
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply({error: 'UNAVAILABLE'}, 415);
  const reader = request.body?.getReader();
  if (!reader) return reply({error: 'INVALID_REQUEST'}, 400);
  try {
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 4096) { await reader.cancel(); return reply({error: 'INVALID_REQUEST'}, 413); }
      chunks.push(value);
    }
    const body = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(Buffer.concat(chunks)));
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some(k => !['command', 'input'].includes(k)) || typeof body.command !== 'string') throw new BusinessError(400);
    const input = body.input;
    if (body.command.startsWith('members.') || body.command.startsWith('mandates.')) return reply({data: await accessCommand(body.command, input)});
    if (body.command === 'list' || body.command === 'asset') {
      const keys = body.command === 'list' ? ['organizationId'] : ['organizationId', 'assetId', 'view'];
      if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(k => !keys.includes(k)) || keys.some(k => typeof input[k] !== 'string')) throw new BusinessError(400);
      return reply({data: body.command === 'list' ? await listPrivateBusinessAssets(input.organizationId, true) :
        await readPrivateBusinessAsset(input as {organizationId: string; assetId: string; view: View}, true)});
    }
    return reply({data: await portalCommand(body.command, input)});
  } catch (e) {
    const status = e instanceof BusinessError ? e.status : e instanceof SyntaxError || e instanceof TypeError ? 400 : 503;
    return reply({error: status === 401 ? 'SIGN_IN_REQUIRED' : status === 409 ? 'REQUEST_CONFLICT' : status === 400 ? 'INVALID_REQUEST' : 'UNAVAILABLE'}, status);
  } finally { reader.releaseLock(); }
}
