import 'server-only';
import { randomBytes } from 'node:crypto';

export const localBusinessToken = randomBytes(24).toString('hex');
// This adapter cannot target another database or host. It is not a production login.
export function localBusinessAllowed(request: Request) {
  try {
    const db = new URL(process.env.ER_BUSINESS_DATABASE_URL ?? '');
    const url = new URL(request.url);
    // Next normalizes the internal request URL to localhost; the incoming Host remains exact.
    return process.env.ER_BUSINESS_SYNTHETIC === '1' &&
      db.protocol === 'postgresql:' && db.hostname === '127.0.0.1' && db.port === '55480' &&
      db.pathname === '/synthetic_business' && db.username === 'business_reader' && !db.search &&
      ['127.0.0.1', 'localhost'].includes(url.hostname) && url.port === '3158' && request.headers.get('host') === '127.0.0.1:3158' &&
      (!request.headers.get('origin') || request.headers.get('origin') === 'http://127.0.0.1:3158') &&
      request.headers.get('sec-fetch-site') !== 'cross-site';
  } catch { return false; }
}
export const localHeaders = {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
};
