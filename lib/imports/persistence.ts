import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import { importDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { canUseAuthenticatedApp } from '@/lib/auth/email-verification';
import { OrganizationError } from '@/lib/organizations/service';
import { parseIsolated } from './isolated-parser';
import { rejectSensitiveTable } from './privacy';
import { PreparationError, type FileInput, type ParseProfile, type Table } from './contract';
import { TARGETS, type Mapping } from './mapping';
import { validateRows, type Payload, type PreviewRow, type ValidationProfile } from './validate';
import { markConflicts } from './conflicts';

type Tx = Prisma.TransactionClient;
type Job = { id: string; organizationId: string; creatorId: string; fileHash: string; createdAt: Date; expiresAt: Date; revision: number; status: string; mapping: Mapping; profile: ValidationProfile; previewDigest: string };
type Row = PreviewRow & { id: string; outcome: string | null; assetId: string | null };
type Input = { organizationId: string; ingestKey: string; file: FileInput; parse: ParseProfile; mapping: Mapping; validation: ValidationProfile; signal?: AbortSignal };
const uuid = (v: string) => { if (typeof v !== 'string' || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(v)) throw new OrganizationError(400); return v; };
const stable = (v: unknown): string => v === null || typeof v !== 'object' ? JSON.stringify(v) : Array.isArray(v) ? '[' + v.map(stable).join(',') + ']' : '{' + Object.entries(v).sort(([a], [b]) => a.localeCompare(b)).map(([k, x]) => JSON.stringify(k) + ':' + stable(x)).join(',') + '}';
const hash = (v: unknown) => createHash('sha256').update(stable(v)).digest('hex');
const deny = (code: string): never => { throw new PreparationError(code); };
async function authorized<T>(organizationId: string, fn: (tx: Tx, actor: string) => Promise<T>): Promise<T> {
  uuid(organizationId);
  const session = await getSession();
  if (!session.isAuthenticated) throw new OrganizationError(401);
  // Bounded retry restarts the WHOLE transaction and all authorization checks.
  for (let attempt = 0; ; attempt++) {
    try {
      return await prisma.$transaction(async tx => {
        const users = await tx.$queryRaw<{ id: string; role: 'user' | 'admin'; emailVerifiedAt: Date | null }[]>`SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${session.user.id} FOR SHARE`;
        if (!users[0] || !canUseAuthenticatedApp(users[0])) throw new OrganizationError(401);
        await tx.$queryRaw`SELECT set_config('er.import_actor',${session.user.id},true),set_config('er.import_org',${organizationId},true)`;
        const orgs = await tx.$queryRaw<{ status: string }[]>`SELECT status FROM public."Organization" WHERE id=${organizationId}::uuid FOR UPDATE`;
        const member = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId, userId: session.user.id } } });
        if (orgs[0]?.status !== 'ACTIVE' || member?.status !== 'ACTIVE' || member.endsAt || !['IMPORTER', 'ORG_ADMIN'].includes(member.role)) throw new OrganizationError(404);
        return fn(tx, session.user.id);
      }, { maxWait: 5000, timeout: 20000 });
    } catch (error) {
      const e = error as { code?: string; meta?: { code?: string } };
      if (attempt < 2 && (e.code === 'P2034' || ['40001', '40P01'].includes(e.meta?.code ?? ''))) continue;
      if (error instanceof PreparationError || error instanceof OrganizationError) throw error;
      return deny('IMPORT_UNAVAILABLE_RETRY');
    }
  }
}
async function clock(tx: Tx) { return (await tx.$queryRaw<{ now: Date }[]>`SELECT clock_timestamp() AS now`)[0].now; }
async function job(tx: Tx, org: string, id: string) {
  uuid(id);
  const jobs = await tx.$queryRaw<Job[]>`SELECT * FROM import_private."Job" WHERE id=${id}::uuid AND "organizationId"=${org}::uuid FOR UPDATE`;
  if (!jobs[0]) throw new OrganizationError(404);
  return jobs[0];
}
async function rows(tx: Tx, j: Job) { return tx.$queryRaw<Row[]>`SELECT id,position,payload,issues,state,outcome,"assetId" FROM import_private."Row" WHERE "jobId"=${j.id}::uuid AND "organizationId"=${j.organizationId}::uuid ORDER BY position`; }
async function live(tx: Tx, j: Job) {
  if ((await clock(tx)) >= j.expiresAt) deny('STAGING_EXPIRED');
  if (['CANCELLED', 'COMPLETED'].includes(j.status)) deny('IMPORT_CLOSED');
}
async function event(tx: Tx, j: Job, actor: string, action: string, key: string, requestHash: string, result: unknown) {
  await tx.$executeRaw`INSERT INTO import_private."Event" (id,"organizationId","jobId","actorId",revision,action,"commandKey","requestHash",result) VALUES (${randomUUID()}::uuid,${j.organizationId}::uuid,${j.id}::uuid,${actor},${j.revision},${action},${key}::uuid,${requestHash},${JSON.stringify(result)}::jsonb)`;
}
function canonicalValidation(p: Payload, profile: ValidationProfile) {
  const entries: [string, string][] = Object.entries(p).filter(([k]) => !['dynamic', 'sourceSystem', 'registryHint'].includes(k)).map(([k, v]) => [k, v == null ? '' : String(v)]);
  for (const [k, v] of Object.entries(p.dynamic)) entries.push([k, Array.isArray(v) ? v.join('|') : typeof v === 'object' ? v.value : v]);
  const units = Object.fromEntries(Object.entries(p.dynamic).filter(([, v]) => typeof v === 'object' && !Array.isArray(v)).map(([k, v]) => [k, (v as { unit: string }).unit]));
  const table: Table = { format: 'csv', headers: entries.map(([k]) => k), rows: [{ position: 2, cells: entries.map(([, text]) => ({ text, kind: 'text' })) }], sheets: [], duplicateHeaders: [] };
  rejectSensitiveTable(table);
  return validateRows(table, entries.map(([target], column) => ({ column, target })), { ...profile, asOfYear: Math.min(profile.asOfYear, new Date().getUTCFullYear()), sourceSystem: p.sourceSystem ?? undefined, countryFormat: 'ISO_ALPHA2', decimal: '.', listSeparator: '|', units })[0];
}
async function classify(tx: Tx, org: string, inputRows: PreviewRow[]) {
  const existing = await tx.privateImportedAsset.findMany({ where: { organizationId: org }, take: 10001, orderBy: { id: 'asc' } });
  const extensions = await tx.$queryRaw<{ assetId: string; payload: Payload }[]>`SELECT "assetId",payload FROM import_private."AssetPayload" WHERE "organizationId"=${org}::uuid LIMIT 10001`;
  const result = markConflicts(structuredClone(inputRows), org, existing);
  return result.map(r => {
    const p = r.payload;
    const same = existing.find(a => p.externalAssetKey && a.sourceSystem === p.sourceSystem && a.externalAssetKey === p.externalAssetKey && a.lifecycleState === 'IMPORTED_PRIVATE' &&
      extensions.some(e => e.assetId === a.id && hash(e.payload) === hash(p)) &&
      (['assetName', 'category', 'subcategory', 'brand', 'model', 'serialNumber', 'identifierType'] as const).every(k => a[k] === p[k]));
    // Full payload equality is necessary; a source key alone never proves replay.
    const loose = (s: string) => s.normalize('NFC').trim().toLowerCase().replace(/[\s-]/g, '');
    if (same && existing.every(a => !p.serialNumber || !a.serialNumber || loose(a.serialNumber) !== loose(p.serialNumber) || a.id === same.id) && !r.issues.some(i => !['REVIEW_EXISTING_SOURCE', 'REVIEW_EXISTING_SERIAL'].includes(i.code))) return { ...r, state: 'READY_FOR_PRIVATE_PREPARATION' as const, issues: [], existingId: same.id };
    return { ...r, existingId: null };
  });
}
// Shared account and organization admission, committed before parsing so malformed
// authorized files also consume a slot. Database time and row locks cover replicas.
async function admitParser(organizationId: string) {
  return authorized(organizationId, async (tx, actor) => {
    for (const [kind, subject] of [['account', actor], ['organization', organizationId]]) {
      const admitted = await tx.$queryRaw<{ attempts: number }[]>`
        INSERT INTO import_private."ParserBudget" AS b(kind,subject,window_start,attempts)
        VALUES(${kind},${subject},clock_timestamp(),1)
        ON CONFLICT(kind,subject) DO UPDATE SET
          window_start=CASE WHEN b.window_start<=clock_timestamp()-interval '60 seconds' THEN clock_timestamp() ELSE b.window_start END,
          attempts=CASE WHEN b.window_start<=clock_timestamp()-interval '60 seconds' THEN 1 ELSE b.attempts+1 END
        WHERE b.window_start<=clock_timestamp()-interval '60 seconds' OR b.attempts<30
        RETURNING attempts`;
      if (!admitted.length) deny('IMPORT_QUOTA');
    }
    return clock(tx);
  });
}
export async function inspectImport(input: Pick<Input, 'organizationId' | 'file' | 'parse' | 'signal'>) {
  await admitParser(input.organizationId);
  let table: Table;
  try { table = await parseIsolated(input.file, input.parse, input.signal); }
  catch (error) {
    if (error instanceof PreparationError && error.code === 'SENSITIVE_FILE_REJECTED') {
      const reference = randomUUID();
      await authorized(input.organizationId, async tx => { await tx.$executeRaw`INSERT INTO import_private."Rejection" (id,"organizationId",code) VALUES (${reference}::uuid,${input.organizationId}::uuid,'SENSITIVE_FILE_REJECTED')`; });
      return { rejected: true as const, reference, code: 'SENSITIVE_FILE_REJECTED' };
    }
    throw error;
  }
  return authorized(input.organizationId, async () => ({ headers: table.headers, targets: TARGETS }));
}
export async function stageImport(input: Input) {
  uuid(input.ingestKey);
  const received = await admitParser(input.organizationId);
  let prepared: PreviewRow[];
  try {
    const table = await parseIsolated(input.file, input.parse, input.signal);
    rejectSensitiveTable(table);
    if (!Number.isInteger(input.validation?.asOfYear)) deny('VALIDATION_PROFILE');
    prepared = validateRows(table, input.mapping, { ...input.validation, asOfYear: Math.min(input.validation.asOfYear, received.getUTCFullYear()) });
    rejectSensitiveTable({ ...table, headers: ['sourceSystem'], rows: [{ position: 1, cells: [{ kind: 'text', text: input.validation.sourceSystem ?? '' }] }] });
  } catch (error) {
    if (error instanceof PreparationError && error.code === 'SENSITIVE_FILE_REJECTED') {
      const reference = randomUUID();
      await authorized(input.organizationId, async tx => { await tx.$executeRaw`INSERT INTO import_private."Rejection" (id,"organizationId",code) VALUES (${reference}::uuid,${input.organizationId}::uuid,'SENSITIVE_FILE_REJECTED')`; });
      return { rejected: true as const, reference, code: 'SENSITIVE_FILE_REJECTED' };
    }
    throw error;
  }
  // Store only canonical allowlisted data, never files, names, ignored cells or parser internals.
  const fileHash = hash({ bytes: createHash('sha256').update(input.file.bytes).digest('hex'), mapping: input.mapping, parse: input.parse, validation: input.validation });
  return authorized(input.organizationId, async (tx, actor) => {
    if (input.signal?.aborted) deny('IMPORT_CANCELLED');
    const prior = await tx.$queryRaw<Job[]>`SELECT * FROM import_private."Job" WHERE "organizationId"=${input.organizationId}::uuid AND "ingestKey"=${input.ingestKey}::uuid`;
    if (prior[0]) {
      if (prior[0].fileHash !== fileHash || prior[0].creatorId !== actor) deny('INGEST_KEY_CONFLICT');
      if ((await clock(tx)) >= prior[0].expiresAt && !['COMPLETED', 'CANCELLED'].includes(prior[0].status)) deny('STAGING_EXPIRED');
      return { ...prior[0], rows: await rows(tx, prior[0]) };
    }
    const classified = await classify(tx, input.organizationId, prepared);
    // Profile contains only parser-independent choices needed for revalidation.
    const profile: ValidationProfile = { asOfYear: Math.min(input.validation.asOfYear, received.getUTCFullYear()), decimal: '.' };
    const createdAt = await clock(tx);
    const j: Job = { id: randomUUID(), organizationId: input.organizationId, creatorId: actor, fileHash, createdAt, expiresAt: new Date(createdAt.getTime() + 30 * 86400000), revision: 0, status: 'STAGED', mapping: input.mapping, profile, previewDigest: hash(classified) };
    await tx.$executeRaw`INSERT INTO import_private."Job" (id,"organizationId","creatorId","ingestKey","fileHash","createdAt","expiresAt",mapping,profile,"previewDigest") VALUES (${j.id}::uuid,${j.organizationId}::uuid,${actor},${input.ingestKey}::uuid,${fileHash},${j.createdAt},${j.expiresAt},${JSON.stringify(j.mapping)}::jsonb,${JSON.stringify(profile)}::jsonb,${j.previewDigest})`;
    for (const r of classified) await tx.$executeRaw`INSERT INTO import_private."Row" (id,"organizationId","jobId",position,payload,issues,state) VALUES (${randomUUID()}::uuid,${j.organizationId}::uuid,${j.id}::uuid,${r.position},${JSON.stringify(r.payload)}::jsonb,${JSON.stringify(r.issues)}::jsonb,${r.state})`;
    await event(tx, j, actor, 'STAGED', input.ingestKey, fileHash, { count: classified.length });
    return { ...j, rows: await rows(tx, j) };
  });
}
export async function readImport(input: { organizationId: string; jobId: string }) {
  return authorized(input.organizationId, async tx => {
    const j = await job(tx, input.organizationId, input.jobId);
    const expired = (await clock(tx)) >= j.expiresAt && !['COMPLETED', 'CANCELLED'].includes(j.status);
    // Expired unfinished staging is unavailable for further processing; outcomes survive.
    const saved = await rows(tx, j);
    return { ...j, expired, rows: expired ? saved.filter(r => r.outcome).map(r => ({ id: r.id, position: r.position, outcome: r.outcome, assetId: r.assetId })) : saved };
  });
}
type Commit = { organizationId: string; jobId: string; commandKey: string; revision: number; previewDigest: string; selectedRows: string[]; acknowledged: boolean };
export async function commitImport(input: Commit) {
  uuid(input.commandKey);
  if (input.acknowledged !== true || !Array.isArray(input.selectedRows) || !input.selectedRows.length || input.selectedRows.length > 1000 || new Set(input.selectedRows).size !== input.selectedRows.length) deny('CONFIRMATION_REQUIRED');
  input.selectedRows.forEach(uuid);
  const requestHash = hash({ revision: input.revision, digest: input.previewDigest, rows: [...input.selectedRows].sort() });
  return authorized(input.organizationId, async (tx, actor) => {
    const j = await job(tx, input.organizationId, input.jobId);
    // Expiry also forbids processing/replay of unfinished jobs. Read-only summary remains.
    if (!['COMPLETED', 'CANCELLED'].includes(j.status) && (await clock(tx)) >= j.expiresAt) deny('STAGING_EXPIRED');
    const prior = await tx.$queryRaw<{ requestHash: string; result: unknown }[]>`SELECT "requestHash",result FROM import_private."Event" WHERE "organizationId"=${j.organizationId}::uuid AND "jobId"=${j.id}::uuid AND "commandKey"=${input.commandKey}::uuid AND action='COMMITTED'`;
    if (prior[0]) { if (prior[0].requestHash !== requestHash) deny('COMMAND_KEY_CONFLICT'); return prior[0].result; }
    await live(tx, j);
    if (input.revision !== j.revision || input.previewDigest !== j.previewDigest) deny('PREVIEW_CHANGED');
    const all = await rows(tx, j), selected = all.filter(r => input.selectedRows.includes(r.id));
    if (selected.length !== input.selectedRows.length || selected.some(r => r.outcome || r.state !== 'READY_FOR_PRIVATE_PREPARATION')) deny('SELECTION_NOT_READY');
    const checked = selected.map(r => ({ ...canonicalValidation(r.payload, j.profile), position: r.position }));
    if (checked.some((r, i) => r.state !== 'READY_FOR_PRIVATE_PREPARATION' || hash(r.payload) !== hash(selected[i].payload))) deny('VALIDATION_CHANGED');
    const current = await classify(tx, j.organizationId, checked);
    if (current.some(r => r.state !== 'READY_FOR_PRIVATE_PREPARATION')) deny('CONFLICT_REVIEW_REQUIRED');
    const outcomes: { rowId: string; assetId: string; outcome: string }[] = [];
    for (let i = 0; i < selected.length; i++) {
      const r = selected[i], p = r.payload;
      let assetId = current[i].existingId;
      const outcome = assetId ? 'ALREADY_IMPORTED' : 'CREATED';
      if (!assetId) {
        const asset = await tx.privateImportedAsset.create({ data: { organizationId: j.organizationId, assetName: p.assetName, category: p.category, subcategory: p.subcategory, brand: p.brand, model: p.model, serialNumber: p.serialNumber, identifierType: p.identifierType, sourceSystem: p.sourceSystem, externalAssetKey: p.externalAssetKey, identityState: 'IDENTITY_PROVIDED', createdBy: actor } });
        assetId = asset.id;
        await tx.$executeRaw`INSERT INTO import_private."AssetPayload" ("organizationId","assetId",payload) VALUES (${j.organizationId}::uuid,${assetId}::uuid,${JSON.stringify(p)}::jsonb)`;
        await tx.organizationEvent.create({ data: { organizationId: j.organizationId, actorId: actor, action: 'PRIVATE_ASSET_CREATED', subjectId: assetId, subjectVersion: 0 } });
      }
      await tx.$executeRaw`UPDATE import_private."Row" SET outcome=${outcome},"assetId"=${assetId}::uuid WHERE id=${r.id}::uuid AND "organizationId"=${j.organizationId}::uuid AND "jobId"=${j.id}::uuid AND outcome IS NULL`;
      outcomes.push({ rowId: r.id, assetId, outcome });
    }
    await live(tx, j); // No successful transaction may cross the staging deadline.
    const status = all.every(r => r.outcome || input.selectedRows.includes(r.id)) ? 'COMPLETED' : 'PARTIAL';
    await tx.$executeRaw`UPDATE import_private."Job" SET status=${status},revision=revision+1 WHERE id=${j.id}::uuid AND "organizationId"=${j.organizationId}::uuid`;
    const result = { jobId: j.id, revision: j.revision + 1, status, outcomes };
    await event(tx, { ...j, revision: j.revision + 1 }, actor, 'COMMITTED', input.commandKey, requestHash, result);
    if ((await clock(tx)) >= j.expiresAt) deny('STAGING_EXPIRED');
    return result;
  });
}
export async function cancelImport(input: { organizationId: string; jobId: string; revision: number; commandKey: string }) {
  uuid(input.commandKey);
  return authorized(input.organizationId, async (tx, actor) => {
    const j = await job(tx, input.organizationId, input.jobId);
    if (j.status === 'CANCELLED') return { status: j.status };
    await live(tx, j);
    if (j.revision !== input.revision) deny('PREVIEW_CHANGED');
    await tx.$executeRaw`UPDATE import_private."Job" SET status='CANCELLED',revision=revision+1 WHERE id=${j.id}::uuid AND "organizationId"=${j.organizationId}::uuid`;
    await event(tx, { ...j, revision: j.revision + 1 }, actor, 'CANCELLED', input.commandKey, hash(input.revision), { status: 'CANCELLED' });
    return { status: 'CANCELLED' };
  });
}
