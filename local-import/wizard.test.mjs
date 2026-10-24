import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { startDemo } from './server.mjs';
import * as f from '../tests/import-fixtures.mjs';

const valid = () => ({ filename: 'synthetic.csv', mime: 'text/csv', bytes: Buffer.from([f.headers, f.valid].map(r => r.join(',')).join('\n')).toString('base64'), parse: { delimiter: ',', encoding: 'utf-8' }, mapping: f.mapping, validation: f.profile });
async function session(demo) { const res = await fetch(demo.origin); assert.match(res.headers.get('cache-control'), /no-store/); return res.headers.get('set-cookie').split(';')[0]; }
async function call(demo, cookie, route, input, headers = {}) { const res = await fetch(demo.origin + route, { method: 'POST', headers: { Cookie: cookie, Origin: demo.origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(input) }); return { status: res.status, data: await res.json(), headers: res.headers }; }
test('real parser behind local HTTP: CSV/XLSX, mapping, preview and no commit', async () => {
  const demo = await startDemo();
  try {
    const cookie = await session(demo), input = valid();
    const inspect = await call(demo, cookie, '/inspect', input); assert.equal(inspect.status, 200); assert.deepEqual(inspect.data.result.headers, f.headers);
    const preview = await call(demo, cookie, '/preview', input); assert.equal(preview.status, 200); assert.equal(preview.data.result.rows[0].state, 'READY_FOR_PRIVATE_PREPARATION'); assert.equal(preview.data.result.persistable, false);
    assert.equal(preview.data.result.ownershipClaim, false); assert.match(preview.headers.get('cache-control'), /no-store/);
    const x = f.xlsx(); Object.assign(input, { filename: x.filename, mime: x.mime, bytes: Buffer.from(x.bytes).toString('base64'), parse: { sheet: 'Assets' } });
    assert.equal((await call(demo, cookie, '/preview', input)).data.result.rows[0].state, 'READY_FOR_PRIVATE_PREPARATION');
    for (const route of ['/commit', '/confirm', '/assets']) assert.equal((await call(demo, cookie, route, input)).status, 404);
    input.mapping = []; assert.equal((await call(demo, cookie, '/preview', input)).data.code, 'MAPPING_INCOMPLETE');
    input.parse = {}; assert.equal((await call(demo, cookie, '/inspect', input)).data.code, 'SHEET_SELECTION_REQUIRED');
  } finally { await demo.close(); }
});
test('session, origin, content type, host and synthetic organization roles fail closed', async () => {
  const access = { authenticated: true, orgStatus: 'ACTIVE', status: 'ACTIVE', role: 'IMPORTER' };
  const demo = await startDemo({ access });
  try {
    const cookie = await session(demo), input = valid();
    for (const [sessionCookie, headers] of [['', {}], [cookie, { Origin: 'https://example.invalid' }], [cookie, { 'Content-Type': 'text/plain' }]]) assert.equal((await call(demo, sessionCookie, '/preview', input, headers)).status, 403);
    const hostStatus = await new Promise(resolve => { http.get(demo.origin, { headers: { Host: 'example.invalid' } }, res => { res.resume(); resolve(res.statusCode); }); }); assert.equal(hostStatus, 403);
    for (const role of ['VIEWER', 'EVIDENCE_WORKER', 'PLATFORM_ADMIN']) { access.role = role; assert.equal((await call(demo, cookie, '/preview', input)).status, 403); }
    access.role = 'IMPORTER'; access.status = 'REVOKED'; assert.equal((await call(demo, cookie, '/inspect', input)).status, 403);
    access.status = 'ACTIVE'; access.orgStatus = 'ARCHIVED'; assert.equal((await call(demo, cookie, '/preview', input)).status, 403);
    access.orgStatus = 'ACTIVE'; access.revokeAfterFirst = true; assert.equal((await call(demo, cookie, '/preview', input)).status, 403);
  } finally { await demo.close(); }
});
test('bounded body, worker timeout, concurrency and safe errors', async () => {
  const demo = await startDemo({ workerTimeout: 1 });
  try {
    const cookie = await session(demo);
    assert.equal((await call(demo, cookie, '/preview', { bytes: 'A'.repeat(3 * 1024 * 1024) })).status, 413);
    assert.equal((await call(demo, cookie, '/preview', { bytes: '*secret*', parse: {} })).data.code, 'REQUEST_INVALID');
    const result = await call(demo, cookie, '/preview', valid()); assert.equal(result.data.code, 'PREVIEW_TIMEOUT'); assert(!JSON.stringify(result.data).includes('Synthetic'));
  } finally { await demo.close(); }
  const concurrent = await startDemo();
  try {
    const cookie = await session(concurrent);
    const result = await Promise.all([call(concurrent, cookie, '/preview', valid()), call(concurrent, cookie, '/preview', valid())]);
    assert.deepEqual(result.map(r => r.status).sort(), [200, 429]);
  } finally { await concurrent.close(); }
});
test('formula/unsafe values and duplicate identities cannot become ready', async () => {
  const demo = await startDemo();
  try {
    const cookie = await session(demo), input = valid();
    input.bytes = Buffer.from([f.headers, ['=SECRET()', 'vehicles', 'truck', '0000123']].map(r => r.join(',')).join('\n')).toString('base64');
    const result = await call(demo, cookie, '/preview', input); assert.equal(result.data.result.rows[0].state, 'INVALID'); assert(!JSON.stringify(result.data).includes('SECRET'));
    input.bytes = Buffer.from([f.headers, f.valid, f.valid].map(r => r.join(',')).join('\n')).toString('base64');
    const duplicates = await call(demo, cookie, '/preview', input); assert(duplicates.data.result.rows.every(r => r.state === 'REVIEW'));
  } finally { await demo.close(); }
});
test('account/org quota also bounds malformed requests', async () => {
  const demo = await startDemo();
  try {
    const cookie = await session(demo);
    for (let i = 0; i < 30; i++) assert.equal((await call(demo, cookie, '/inspect', {})).status, 400);
    assert.equal((await call(demo, cookie, '/inspect', {})).status, 429);
  } finally { await demo.close(); }
});
test('client cancellation frees worker slot; 100-row synthetic XLSX is ready', async () => {
  const demo = await startDemo();
  try {
    const cookie = await session(demo), controller = new AbortController();
    const request = fetch(demo.origin + '/preview', { method: 'POST', headers: { Cookie: cookie, Origin: demo.origin, 'Content-Type': 'application/json' }, body: JSON.stringify(valid()), signal: controller.signal });
    setTimeout(() => controller.abort(), 100);
    await assert.rejects(request, error => error.name === 'AbortError');
    let samples;
    const deadline = Date.now() + 3000;
    do { await new Promise(resolve => setTimeout(resolve, 100)); samples = await call(demo, cookie, '/sample', {}); } while (samples.status === 429 && Date.now() < deadline);
    assert.equal(samples.status, 200);
    const input = { ...valid(), filename: 'synthetic.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', bytes: samples.data.result.xlsx, parse: { sheet: 'Assets' } };
    const result = await call(demo, cookie, '/preview', input); assert.equal(result.data.result.rows.length, 100); assert(result.data.result.rows.every(r => r.state === 'READY_FOR_PRIVATE_PREPARATION'));
  } finally { await demo.close(); }
});
