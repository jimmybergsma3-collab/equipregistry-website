import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getSession } from '@/lib/auth/getSession';
import { OrganizationError } from '@/lib/organizations/service';
import { PreparationError } from '@/lib/imports/contract';
import * as service from '@/lib/imports/persistence';

export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src blob:; base-uri 'none'; frame-ancestors 'none'; form-action 'none'" };
const reply = (data: unknown, status = 200) => Response.json(data, { status, headers });
function enabled(request: Request) {
  const url = new URL(request.url);
  return process.env.ER_LOCAL_IMPORTS === 'synthetic-only' && ['127.0.0.1', 'localhost'].includes(url.hostname) && ['127.0.0.1', 'localhost'].includes((request.headers.get('host') ?? '').split(':')[0]);
}
export async function GET(request: Request) {
  if (!enabled(request)) return reply({ code: 'NOT_AVAILABLE' }, 404);
  if (!(await getSession()).isAuthenticated) return reply({ code: 'ACCESS_DENIED' }, 401);
  const asset = new URL(request.url).searchParams.get('asset') ?? 'html';
  if (!['html', 'js', 'css'].includes(asset)) return reply({ code: 'NOT_AVAILABLE' }, 404);
  const file = asset === 'css' ? 'wizard.css' : `durable.${asset}`;
  return new Response(await readFile(path.join(process.cwd(), 'local-import', file), 'utf8'), { headers: { ...headers, 'Content-Type': asset === 'html' ? 'text/html; charset=utf-8' : asset === 'js' ? 'text/javascript' : 'text/css' } });
}
// Process-local conservative quotas are supplementary; public exposure stays disabled.
const limits = new Map<string, { busy: boolean; start: number; count: number }>();
export async function POST(request: Request) {
  if (!enabled(request)) return reply({ code: 'NOT_AVAILABLE' }, 404);
  const session = await getSession();
  if (!session.isAuthenticated) return reply({ code: 'ACCESS_DENIED' }, 401);
  const origin = `${new URL(request.url).protocol}//${request.headers.get('host')}`;
  if (request.headers.get('origin') !== origin || ![null, 'same-origin'].includes(request.headers.get('sec-fetch-site'))) return reply({ code: 'ACCESS_DENIED' }, 403);
  if (request.headers.get('content-type') !== 'application/json') return reply({ code: 'JSON_REQUIRED' }, 415);
  const now = Date.now();
  for (const [key, value] of limits) if (!value.busy && now - value.start > 60000) limits.delete(key);
  const quota = limits.get(session.user.id) ?? { busy: false, start: now, count: 0 };
  if (quota.busy || quota.count >= 30 || limits.size > 1000) return reply({ code: 'IMPORT_BUSY' }, 429);
  quota.busy = true; quota.count++; limits.set(session.user.id, quota);
  const reader = request.body?.getReader();
  try {
    if (!reader) return reply({ code: 'REQUEST_INVALID' }, 400);
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.length;
      if (size > 3 * 1024 * 1024) { await reader.cancel(); return reply({ code: 'FILE_LIMIT' }, 413); }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || Object.keys(body).some(k => !['command', 'input'].includes(k)) || !body.input) return reply({ code: 'REQUEST_INVALID' }, 400);
    const input = body.input;
    input.signal = request.signal;
    if (['inspect', 'stage'].includes(body.command)) {
      if (typeof input.bytes !== 'string' || input.bytes.length > 2796204 || !/^[A-Za-z0-9+/]*={0,2}$/.test(input.bytes)) return reply({ code: 'FILE_LIMIT' }, 400);
      input.file = { bytes: Buffer.from(input.bytes, 'base64'), filename: input.filename, mime: input.mime };
      delete input.bytes;
    }
    const data = body.command === 'inspect' ? await service.inspectImport(input) : body.command === 'stage' ? await service.stageImport(input) : body.command === 'read' ? await service.readImport(input) : body.command === 'commit' ? await service.commitImport(input) : body.command === 'cancel' ? await service.cancelImport(input) : null;
    if (!data) return reply({ code: 'REQUEST_INVALID' }, 400);
    return reply({ ok: true, result: data });
  } catch (error) {
    return reply({ code: error instanceof PreparationError ? error.code : 'IMPORT_UNAVAILABLE' }, error instanceof OrganizationError ? error.status : error instanceof PreparationError ? 409 : 400);
  } finally { reader?.releaseLock(); quota.busy = false; }
}
