import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { createSessionToken } from '@/lib/auth/session-token';
import { businessDb as prisma } from '@/lib/db-capabilities';
import { BusinessError, type View } from '@/lib/business/model';
import { readPrivateBusinessAsset, listPrivateBusinessAssets } from '@/lib/business/read';
import { localBusinessAllowed, localBusinessToken, localHeaders } from '@/lib/business/local-gate';
import { profiles, type Profile } from '@/local-business/fixtures';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const base = '/api/local-business/';
const json = (body: unknown, status = 200, headers = {}) => Response.json(body, {status, headers: {...localHeaders, ...headers}});

export async function GET(request: Request) {
  if (!localBusinessAllowed(request)) return json({error: 'BUSINESS_UNAVAILABLE'}, 404);
  const url = new URL(request.url), name = url.pathname.slice(base.length);
  try {
    if (['demo', 'app.js', 'style.css'].includes(name)) {
      const filename = name === 'demo' ? 'index.html' : name === 'app.js' ? 'db-app.js' : name;
      let body = await readFile(path.join(process.cwd(), 'local-business', filename), 'utf8');
      if (name === 'demo') body = body.replace('DEMO_NONCE', localBusinessToken)
        .replace('href="/style.css"', `href="${base}style.css"`).replace('src="/app.js"', `src="${base}app.js"`)
        .replace('href="/"', `href="${base}demo"`)
        .replace('Dit is een profielsimulatie, geen echte accountaanmelding.', 'Synthetische testaccounts gebruiken de bestaande ondertekende sessiecontrole en een geïsoleerde lokale database. De profielkeuze is alleen een lokale testaanmelding.');
      return new Response(body, {headers: {...localHeaders, 'Content-Type': name === 'demo' ? 'text/html; charset=utf-8' : name === 'app.js' ? 'text/javascript; charset=utf-8' : 'text/css; charset=utf-8'}});
    }
    if (name === 'assets' && [...url.searchParams.keys()].every(k => k === 'organizationId') && url.searchParams.getAll('organizationId').length === 1)
      return json({synthetic: true, ...await listPrivateBusinessAssets(url.searchParams.get('organizationId') ?? '')});
    if (name === 'asset' && [...url.searchParams.keys()].every(k => ['organizationId', 'assetId', 'view'].includes(k)) && ['organizationId', 'assetId', 'view'].every(k => url.searchParams.getAll(k).length === 1))
      return json({synthetic: true, ...await readPrivateBusinessAsset({organizationId: url.searchParams.get('organizationId') ?? '', assetId: url.searchParams.get('assetId') ?? '', view: url.searchParams.get('view') as View})});
    return json({error: 'BUSINESS_UNAVAILABLE'}, 400);
  } catch (error) { return json({error: 'BUSINESS_UNAVAILABLE'}, error instanceof BusinessError ? error.status : 503); }
}

export async function POST(request: Request) {
  if (!localBusinessAllowed(request)) return json({error: 'BUSINESS_UNAVAILABLE'}, 404);
  if (new URL(request.url).pathname !== base + 'session') return json({error: 'READ_ONLY'}, 405);
  if (request.headers.get('origin') !== 'http://127.0.0.1:3158' || request.headers.get('content-type') !== 'application/json') return json({error: 'BUSINESS_UNAVAILABLE'}, 403);
  try {
    const reader = request.body?.getReader(); if (!reader) return json({error: 'BUSINESS_UNAVAILABLE'}, 400);
    let bytes = 0; const chunks: Uint8Array[] = [];
    while (true) {const {done, value} = await reader.read(); if (done) break; bytes += value.length; if (bytes > 512) {await reader.cancel(); return json({error: 'BUSINESS_UNAVAILABLE'}, 413);} chunks.push(value);}
    const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!input || Object.keys(input).some(k => !['profile', 'token'].includes(k)) || typeof input.token !== 'string' || typeof input.profile !== 'string' || !Object.hasOwn(profiles, input.profile)) return json({error: 'BUSINESS_UNAVAILABLE'}, 400);
    const token = Buffer.from(input.token);
    if (token.length !== localBusinessToken.length || !timingSafeEqual(token, Buffer.from(localBusinessToken))) return json({error: 'BUSINESS_UNAVAILABLE'}, 403);
    const userId = `synthetic-business-${input.profile}`;
    if (!await prisma.user.findUnique({where: {id: userId}, select: {id: true}})) return json({error: 'BUSINESS_UNAVAILABLE'}, 401);
    return json({synthetic: true, organizationId: profiles[input.profile as Profile].org}, 200, {
      'Set-Cookie': `er_session=${createSessionToken(userId, 900)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=900`,
    });
  } catch { return json({error: 'BUSINESS_UNAVAILABLE'}, 503); }
}
