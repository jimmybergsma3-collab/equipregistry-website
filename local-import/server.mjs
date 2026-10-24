import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

const MAX_BODY = 3 * 1024 * 1024;
export async function startDemo({ port = 0, access = { authenticated: true, orgStatus: 'ACTIVE', status: 'ACTIVE', role: 'IMPORTER' }, workerTimeout = 10000 } = {}) {
  const token = crypto.randomBytes(32).toString('hex');
  const workers = new Set();
  let active = false, windowStart = Date.now(), requests = 0, origin;
  const authorized = () => access.authenticated && access.orgStatus === 'ACTIVE' && access.status === 'ACTIVE' && ['IMPORTER', 'ORG_ADMIN'].includes(access.role);
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, private, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' blob:; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
    const send = (status, data) => { if (!res.destroyed) { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(data)); } };
    if (req.headers.host !== new URL(origin).host) return send(403, { code: 'ACCESS_DENIED' });
    const cookies = (req.headers.cookie || '').split(';').map(x => x.trim());
    const session = cookies.includes(`demo_session=${token}`);
    if (req.method === 'GET' && req.url === '/') {
      res.setHeader('Set-Cookie', `demo_session=${token}; HttpOnly; SameSite=Strict; Path=/`);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(new URL('wizard.html', import.meta.url)));
    }
    if (req.method === 'GET' && ['/wizard.js', '/wizard.css'].includes(req.url) && session) {
      res.writeHead(200, { 'Content-Type': req.url.endsWith('.js') ? 'text/javascript' : 'text/css' });
      return res.end(fs.readFileSync(new URL(req.url.slice(1), import.meta.url)));
    }
    if (req.method !== 'POST' || !['/inspect', '/preview', '/sample'].includes(req.url)) return send(404, { code: 'NOT_AVAILABLE' });
    if (!session || req.headers.origin !== origin || req.headers['content-type'] !== 'application/json' || !authorized()) return send(403, { code: 'ACCESS_DENIED' });
    if (active) return send(429, { code: 'PREVIEW_BUSY' });
    if (Date.now() - windowStart >= 60000) { requests = 0; windowStart = Date.now(); }
    if (++requests > 30) return send(429, { code: 'PREVIEW_RATE_LIMIT' });
    if (Number(req.headers['content-length']) > MAX_BODY) return send(413, { code: 'FILE_LIMIT' });
    active = true;
    let worker, timer;
    const cancel = () => { if (worker) void worker.terminate(); };
    res.once('close', cancel);
    try {
      const chunks = []; let size = 0;
      req.setTimeout(10000, () => req.destroy());
      for await (const chunk of req) { size += chunk.length; if (size > MAX_BODY) { send(413, { code: 'FILE_LIMIT' }); return; } chunks.push(chunk); }
      let input;
      try { input = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return send(400, { code: 'REQUEST_INVALID' }); }
      if (req.url !== '/sample' && (!input || typeof input.bytes !== 'string' || input.bytes.length > 2796204 || !/^[A-Za-z0-9+/]*={0,2}$/.test(input.bytes) || !input.parse || typeof input.parse !== 'object')) return send(400, { code: 'REQUEST_INVALID' });
      const result = await new Promise(resolve => {
        worker = new Worker(new URL('worker.mjs', import.meta.url), { workerData: { action: req.url.slice(1), input, access: { ...access } }, resourceLimits: { maxOldGenerationSizeMb: 128, maxYoungGenerationSizeMb: 16, stackSizeMb: 4 }, env: { NODE_ENV: 'test' } });
        workers.add(worker);
        timer = setTimeout(() => { cancel(); resolve({ ok: false, code: 'PREVIEW_TIMEOUT' }); }, workerTimeout);
        worker.once('message', resolve);
        worker.once('error', () => resolve({ ok: false, code: 'PREVIEW_UNAVAILABLE' }));
        worker.once('exit', () => resolve({ ok: false, code: 'PREVIEW_CANCELLED' }));
      });
      await worker.terminate(); workers.delete(worker); worker = null;
      active = false;
      if (!authorized()) return send(403, { code: 'ACCESS_DENIED' });
      send(result.ok ? 200 : result.code === 'ACCESS_DENIED' ? 403 : 400, result);
    } catch {
      send(400, { code: 'REQUEST_INVALID' });
    } finally {
      clearTimeout(timer); res.off('close', cancel);
      if (worker) { await worker.terminate(); workers.delete(worker); }
      active = false;
    }
  });
  server.requestTimeout = 12000; server.headersTimeout = 10000; server.maxHeadersCount = 30;
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  return { origin, close: async () => { for (const worker of workers) await worker.terminate(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); } };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const demo = await startDemo();
  console.log(`Synthetic local import wizard: ${demo.origin}`);
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await demo.close(); process.exit(0); });
}
