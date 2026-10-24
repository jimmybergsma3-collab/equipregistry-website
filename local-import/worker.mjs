import { parentPort, workerData } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import net from 'node:net';
import * as fixtures from '../tests/import-fixtures.mjs';

// This adapter is deliberately synthetic. It cannot load the application's DB or session.
net.Socket.prototype.connect = function () { throw Error('NETWORK_DISABLED'); };
globalThis.fetch = async () => { throw Error('NETWORK_DISABLED'); };
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const org = '11111111-1111-1111-1111-111111111111';
const state = workerData.access;
let checks = 0;
class OrganizationError extends Error { constructor(status) { super('ACCESS_DENIED'); this.status = status; } }
const forbidden = new Proxy({}, { get() { throw Error('PERSISTENCE_DISABLED'); } });
const tx = {
  $queryRaw: async (sql) => sql.join('').includes('"User"') ? state.authenticated ? [{ id: 'synthetic-user' }] : [] : [{ status: state.orgStatus }],
  organizationMembership: { findUnique: async () => ({ role: state.role, status: state.revokeAfterFirst && checks > 1 ? 'REVOKED' : state.status, endsAt: null }) },
  privateImportedAsset: { findMany: async ({ where }) => {
    if (where.organizationId !== org) throw Error('ACCESS_DENIED');
    return []; // Fixed empty synthetic fleet; no real or cross-tenant query.
  } },
  machine: forbidden, registrationRequest: forbidden, registrySequence: forbidden, organizationEvent: forbidden,
};
const load = fixtures.loader({
  [path.join(root, 'lib/db-capabilities.ts')]: { importDb: { $transaction: async callback => { checks++; return callback(tx); } } },
  [path.join(root, 'lib/auth/getSession.ts')]: { getSession: async () => ({ isAuthenticated: state.authenticated, user: { id: 'synthetic-user' } }) },
  [path.join(root, 'lib/organizations/service.ts')]: { OrganizationError },
});
try {
  const input = workerData.input;
  if (!state.authenticated || state.orgStatus !== 'ACTIVE' || state.status !== 'ACTIVE' || !['IMPORTER', 'ORG_ADMIN'].includes(state.role)) throw new OrganizationError(404);
  if (workerData.action === 'sample') {
    const rows = [fixtures.headers, ...Array.from({ length: 100 }, (_, i) => [`Demo truck ${i + 1}`, 'vehicles', 'truck', `DEMO-${String(i + 1).padStart(6, '0')}`])];
    parentPort.postMessage({ ok: true, result: { csv: rows.map(r => r.join(',')).join('\n'), xlsx: Buffer.from(fixtures.xlsx(fixtures.parts(rows)).bytes).toString('base64') } });
  } else {
    const file = { bytes: Buffer.from(input.bytes, 'base64'), filename: input.filename, mime: input.mime };
    if (workerData.action === 'inspect') {
      const table = await load('lib/imports/parse.ts').parseImport(file, input.parse);
      parentPort.postMessage({ ok: true, result: { headers: table.headers, sheets: table.sheets, duplicateHeaders: table.duplicateHeaders, count: table.rows.length, targets: load('lib/imports/mapping.ts').TARGETS } });
    } else {
      const result = await load('lib/imports/preview.ts').preparePrivateImport({ organizationId: org, file, parse: input.parse, mapping: input.mapping, validation: input.validation });
      parentPort.postMessage({ ok: true, result });
    }
  }
} catch (error) {
  parentPort.postMessage({ ok: false, code: error instanceof OrganizationError ? 'ACCESS_DENIED' : error instanceof load('lib/imports/contract.ts').PreparationError ? error.code : 'PREVIEW_UNAVAILABLE' });
}
