import http from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { authorize, BusinessError, readBusinessAsset, type View } from '../lib/business/model';
import { fixtureReader, fixtureStore, profiles, type Profile } from './fixtures';

// A fixed-fixture demonstrator. Never imports db/auth/env/storage/provider modules.
export function createDemoServer() {
  const sessions = new Map<string, {profile: Profile; expires: number}>();
  const bootstrap = randomBytes(24).toString('hex');
  const store = fixtureStore();
  const root = path.join(process.cwd(), 'local-business');
  const server = http.createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    const address = server.address();
    const origin = `http://127.0.0.1:${typeof address === 'object' && address ? address.port : 0}`;
    const send = (status: number, body: unknown) => {res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'}); res.end(JSON.stringify(body));};
    try {
      if (req.headers.host !== new URL(origin).host || req.headers.origin && req.headers.origin !== origin || req.headers['sec-fetch-site'] === 'cross-site') return send(403, {error: 'DEMO_UNAVAILABLE'});
      const url = new URL(req.url ?? '/', origin);
      if (req.method === 'GET' && ['/', '/app.js', '/style.css'].includes(url.pathname)) {
        const filename = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
        let body = await readFile(path.join(root, filename), 'utf8');
        if (filename === 'index.html') body = body.replace('DEMO_NONCE', bootstrap);
        res.writeHead(200, {'Content-Type': filename.endsWith('.html') ? 'text/html; charset=utf-8' : filename.endsWith('.js') ? 'text/javascript; charset=utf-8' : 'text/css; charset=utf-8'}); return res.end(body);
      }
      if (req.method === 'POST' && url.pathname === '/session') {
        if (req.headers.origin !== origin || req.headers['content-type'] !== 'application/json') return send(403, {error: 'DEMO_UNAVAILABLE'});
        let body = ''; for await (const chunk of req) {body += chunk; if (Buffer.byteLength(body) > 512) return send(413, {error: 'DEMO_UNAVAILABLE'});}
        const v = JSON.parse(body);
        const token = Buffer.from(String(v.token ?? ''));
        if (token.length !== bootstrap.length || !timingSafeEqual(token, Buffer.from(bootstrap)) || !Object.hasOwn(profiles, v.profile)) return send(403, {error: 'DEMO_UNAVAILABLE'});
        for (const [key, session] of sessions) if (session.expires <= Date.now()) sessions.delete(key);
        const old = /(?:^|; )demo_session=([a-f0-9]{48})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1];
        if (old) sessions.delete(old);
        if (sessions.size >= 50) return send(429, {error: 'DEMO_UNAVAILABLE'});
        const key = randomBytes(24).toString('hex');
        sessions.set(key, {profile: v.profile, expires: Date.now() + 900_000});
        res.setHeader('Set-Cookie', `demo_session=${key}; HttpOnly; SameSite=Strict; Path=/; Max-Age=900`);
        return send(200, {synthetic: true});
      }
      if (req.method !== 'GET') return send(405, {error: 'READ_ONLY'});
      const key = /(?:^|; )demo_session=([a-f0-9]{48})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1] ?? '';
      const session = sessions.get(key);
      if (!session || session.expires <= Date.now()) return send(401, {error: 'DEMO_SESSION_REQUIRED'});
      const p = profiles[session.profile], reader = fixtureReader(session.profile, store);
      if (url.pathname === '/api/assets') {
        await reader.withSnapshot(p.org, async s => authorize(s.access, p.org));
        return send(200, {synthetic: true, organizationId: p.org, assets: store.assets.filter(a => a.organizationId === p.org).map(a => ({id: a.id, name: a.assetName}))});
      }
      if (url.pathname === '/api/asset') return send(200, {synthetic: true, ...await readBusinessAsset(reader, {
        organizationId: url.searchParams.get('organizationId') ?? p.org,
        assetId: url.searchParams.get('assetId') ?? '', view: (url.searchParams.get('view') ?? 'rental') as View,
      })});
      return send(404, {error: 'DEMO_UNAVAILABLE'});
    } catch (error) { return send(error instanceof BusinessError ? error.status : 503, {error: 'DEMO_UNAVAILABLE'}); }
  });
  server.requestTimeout = 5000; server.headersTimeout = 5000; server.maxConnections = 20;
  return server;
}
if (process.argv.includes('--synthetic')) {
  createDemoServer().listen(3148, '127.0.0.1', () => console.log('Synthetische demo: http://127.0.0.1:3148'));
}
