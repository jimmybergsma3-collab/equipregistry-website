import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { storedUploadProvenance } from "@/lib/registry/upload-binding";
import { resolveSupabaseSigningTarget, getSupabaseAccessUrl } from "@/lib/registry/uploads";
import type { StoredUpload } from "@/lib/registry/upload-types";

type Tx = Prisma.TransactionClient;
type State = "PENDING_REVIEW" | "ACTIVE" | "RESOLVED";
type Reason = "RECOVERED" | "NOT_SUBSTANTIATED" | "WITHDRAWN" | "CORRECTED";
type Incident = { id: string; registrationRequestId: string; incidentType: "STOLEN" | "MISSING"; state: State; version: number };
type Parent = { id: string; userId: string; dynamicFields: unknown; deletedAt: Date | null; requestStatus: string };
type Actor = { id: string; role: string };
type Evidence = { id: string; incidentId: string; registrationRequestId: string; sourceFileId: string; sourceMetadata: unknown; sourceMetadataSha256: string; ownerIdAtBinding: string };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export class IncidentError extends Error {
  constructor(public status: number) { super("Incident request unavailable."); }
}
function fail(status = 404): never { throw new IncidentError(status); }
function record(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
}
function canonical(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(canonical).join(",")}]`;
  if (v && typeof v === "object") return `{${Object.entries(record(v)).sort(([a],[b]) => a.localeCompare(b)).map(([k,x]) => `${JSON.stringify(k)}:${canonical(x)}`).join(",")}}`;
  return JSON.stringify(v) ?? "null";
}
function hash(v: unknown) { return createHash("sha256").update(canonical(v)).digest("hex"); }
async function sessionId() {
  const session = await getSession();
  if (!session.isAuthenticated) fail(401);
  return session.user.id;
}
async function actor(tx: Tx, id: string): Promise<Actor> {
  const rows = await tx.$queryRaw<Actor[]>`SELECT id,role::text FROM public."User" WHERE id=${id} FOR SHARE`;
  return rows[0] ?? fail(401);
}
async function parent(tx: Tx, id: string, user: Actor): Promise<Parent> {
  const rows = await tx.$queryRaw<Parent[]>`SELECT id,"userId","dynamicFields","deletedAt","requestStatus"::text FROM public."RegistrationRequest" WHERE id=${id} FOR UPDATE`;
  const row = rows[0];
  if (!row || row.deletedAt || row.requestStatus !== "passport_issued" || (user.role !== "admin" && row.userId !== user.id)) fail();
  return row;
}
function boundMetadata(value: unknown, ownerId: string): StoredUpload {
  const v = record(value);
  if (storedUploadProvenance(v, ownerId) !== "server-bound") fail();
  const upload = v as StoredUpload;
  // Existing upload-server output only, never arbitrary URLs, public photos or legacy metadata.
  if (upload.storage !== "supabase" || upload.storageBucket !== "equipregistry-uploads" ||
      !/^(stolen_supporting_document|stolen_police_report)\/er-bound-v1\/[A-Za-z0-9._-]+$/.test(upload.relativePath) ||
      !resolveSupabaseSigningTarget(upload)) fail();
  return upload;
}
async function attach(tx: Tx, incident: Incident, p: Parent, user: Actor, ids: string[]) {
  if (!ids.length || ids.length > 20 || new Set(ids).size !== ids.length) fail(400);
  const legacyCase = record(record(p.dynamicFields).__stolen);
  for (const id of ids) {
    const candidates = (["evidenceFiles", "policeReportFiles"] as const).flatMap(scope => {
      const list = legacyCase[scope];
      return Array.isArray(list) ? list.filter(v => record(v).id === id).map(v => ({ scope, value: v })) : [];
    });
    if (candidates.length !== 1) fail();
    const { scope, value } = candidates[0];
    const upload = boundMetadata(value, p.userId);
    await tx.$executeRaw`INSERT INTO incident_private."AssetIncidentEvidence" (id,"incidentId","registrationRequestId","sourceFileId","sourceScope","sourceMetadata","sourceMetadataSha256","ownerIdAtBinding","attachedBy") VALUES (${randomUUID()}::uuid,${incident.id}::uuid,${p.id},${upload.id},${scope},${JSON.stringify(upload)}::jsonb,${hash(upload)},${p.userId},${user.id})`;
  }
}
async function replay(tx: Tx, user: Actor, key: string, digest: string) {
  const rows = await tx.$queryRaw<{ incidentId: string; commandHash: string; version: number; toState: State }[]>`SELECT "incidentId","commandHash",version,"toState" FROM incident_private."AssetIncidentEvent" WHERE "actorId"=${user.id} AND "commandKey"=${key}::uuid`;
  if (!rows.length) return null;
  if (rows[0].commandHash !== digest) fail(409);
  return { id: rows[0].incidentId, state: rows[0].toState, version: rows[0].version };
}

// Staged server API: no UI/action caller is connected during 3B-1.
// Only file IDs are accepted; metadata is read under the parent lock from existing storage.
export async function reportIncident(input: { registrationId: string; type: "STOLEN" | "MISSING"; evidenceFileIds: string[]; commandKey: string }, intake?: { draft: unknown; expectedDynamicFields: unknown }) {
  const userId = await sessionId();
  if (!uuid.test(input.commandKey) || !["STOLEN","MISSING"].includes(input.type)) fail(400);
  const draftContent = intake ? Object.fromEntries(["incidentDescription","country","cityRegion","incidentDate","policeReportDate","policeReportNumber","evidenceFiles","policeReportFiles"].map(key=>[key,record(intake.draft)[key]])) : undefined;
  const digest = hash({ operation: "report", ...input, ...(intake ? {draft:draftContent} : {}) });
  return prisma.$transaction(async tx => {
    const user = await actor(tx, userId);
    const p = await parent(tx, input.registrationId, user);
    const prior = await replay(tx, user, input.commandKey, digest);
    if (prior) return prior;
    const live = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM incident_private."AssetIncident" WHERE "registrationRequestId"=${p.id} AND state <> 'RESOLVED'`;
    if (live.length) fail(409);
    if (intake) {
      if (hash(p.dynamicFields) !== hash(intake.expectedDynamicFields)) fail(409);
      const priorIncidents = await tx.$queryRaw<{id:string}[]>`SELECT id FROM incident_private."AssetIncident" WHERE "registrationRequestId"=${p.id}`;
      if (record(p.dynamicFields).__stolen && !priorIncidents.length) fail(409);
      const draft = record(intake.draft);
      if (typeof draft.incidentDescription !== "string" || !draft.incidentDescription.trim()) fail(400);
      const files = [draft.evidenceFiles,draft.policeReportFiles].flatMap(v => Array.isArray(v)?v:[]);
      for (const f of files) boundMetadata(f,p.userId);
      // Existing location/description/upload projection only. Incident state is exclusively relational.
      p.dynamicFields = {...record(p.dynamicFields),__stolen:draft};
      await tx.$executeRaw`UPDATE public."RegistrationRequest" SET "dynamicFields"=${JSON.stringify(p.dynamicFields)}::jsonb WHERE id=${p.id}`;
    }
    const id = randomUUID();
    const rows = await tx.$queryRaw<Incident[]>`INSERT INTO incident_private."AssetIncident" (id,"registrationRequestId","incidentType",state,"reporterId","lastActorId","commandKey","commandHash") VALUES (${id}::uuid,${p.id},${input.type},'PENDING_REVIEW',${user.id},${user.id},${input.commandKey}::uuid,${digest}) RETURNING id,"registrationRequestId","incidentType",state,version`;
    await attach(tx, rows[0], p, user, input.evidenceFileIds);
    return { id, state: rows[0].state, version: rows[0].version };
  });
}

export async function transitionIncident(input: { registrationId: string; incidentId: string; expectedVersion: number; to: "ACTIVE" | "RESOLVED"; reason?: Reason; reviewNote: string; reviewedEvidenceIds: string[]; commandKey: string; recoveryEvidenceId?:string; reviewContext?: Record<string,unknown> }) {
  const userId = await sessionId();
  if (!uuid.test(input.incidentId) || !uuid.test(input.commandKey) || !Number.isSafeInteger(input.expectedVersion) || input.expectedVersion < 0 || !["ACTIVE","RESOLVED"].includes(input.to) || input.reviewNote.trim().length < 10 || input.reviewNote.length > 4000) fail(400);
  if (input.to === "RESOLVED" ? !["RECOVERED","NOT_SUBSTANTIATED","WITHDRAWN","CORRECTED"].includes(input.reason ?? "") : input.reason !== undefined) fail(400);
  const digest = hash({ operation: "transition", ...input });
  return prisma.$transaction(async tx => {
    const user = await actor(tx, userId);
    if (user.role !== "admin") fail(403);
    const p = await parent(tx, input.registrationId, user);
    const prior = await replay(tx, user, input.commandKey, digest);
    if (prior) return prior;
    if(input.reviewContext) {
      const context=record(record(p.dynamicFields).__stolen);
      for(const [key,value] of Object.entries(input.reviewContext)) if(context[key] !== value) fail(409);
    }
    const rows = await tx.$queryRaw<Incident[]>`SELECT id,"registrationRequestId","incidentType",state,version FROM incident_private."AssetIncident" WHERE id=${input.incidentId}::uuid AND "registrationRequestId"=${p.id} FOR UPDATE`;
    const current = rows[0];
    if (!current) fail();
    if (current.version !== input.expectedVersion || current.state === "RESOLVED" || (input.to === "ACTIVE" && current.state !== "PENDING_REVIEW")) fail(409);
    const evidence = await tx.$queryRaw<Evidence[]>`SELECT * FROM incident_private."AssetIncidentEvidence" WHERE "incidentId"=${current.id}::uuid AND "registrationRequestId"=${p.id} ORDER BY id`;
    if ((input.to === "ACTIVE" || input.reason === "RECOVERED") && !evidence.length) fail(409);
    if (canonical([...input.reviewedEvidenceIds].sort()) !== canonical(evidence.map(e => e.id).sort())) fail(409);
    for (const e of evidence) {
      if (e.ownerIdAtBinding !== p.userId || hash(e.sourceMetadata) !== e.sourceMetadataSha256) fail();
      boundMetadata(e.sourceMetadata, p.userId);
    }
    if(input.reason === "RECOVERED") {
      if(!input.recoveryEvidenceId || !evidence.some(e=>e.id===input.recoveryEvidenceId)) fail(409);
      const fresh = await tx.$queryRaw<{id:string}[]>`SELECT e.id FROM incident_private."AssetIncidentEvidence" e WHERE e.id=${input.recoveryEvidenceId}::uuid AND e."incidentId"=${current.id}::uuid AND e."createdAt" > (SELECT max("recordedAt") FROM incident_private."AssetIncidentEvent" WHERE "incidentId"=${current.id}::uuid AND "eventType" IN ('REPORTED','ACTIVATED'))`;
      if(!fresh.length) fail(409);
    }
    const updated = await tx.$queryRaw<Incident[]>`UPDATE incident_private."AssetIncident" SET state=${input.to},version=version+1,"resolutionReason"=${input.reason ?? null},"reviewNote"=${input.reviewNote.trim()},"lastActorId"=${user.id},"commandKey"=${input.commandKey}::uuid,"commandHash"=${digest} WHERE id=${current.id}::uuid AND version=${input.expectedVersion} AND state=${current.state} RETURNING id,state,version`;
    if (updated.length !== 1) fail(409);
    return { id: updated[0].id, state: updated[0].state, version: updated[0].version };
  });
}

export async function supplementIncident(input: { registrationId: string; incidentId: string; expectedVersion: number; evidenceFileIds: string[] }, intake?: {draft:unknown;expectedDynamicFields:unknown}) {
  const userId = await sessionId();
  if (!uuid.test(input.incidentId)) fail(400);
  return prisma.$transaction(async tx => {
    const user = await actor(tx, userId);
    const p = await parent(tx, input.registrationId, user);
    const rows = await tx.$queryRaw<Incident[]>`SELECT id,"registrationRequestId","incidentType",state,version FROM incident_private."AssetIncident" WHERE id=${input.incidentId}::uuid AND "registrationRequestId"=${p.id} FOR UPDATE`;
    const current = rows[0];
    if (!current) fail();
    if (current.state === "RESOLVED" || current.version !== input.expectedVersion) fail(409);
    if(intake) {
      if(hash(p.dynamicFields)!==hash(intake.expectedDynamicFields)) fail(409);
      const draft=record(intake.draft);
      const files=[draft.evidenceFiles,draft.policeReportFiles].flatMap(v=>Array.isArray(v)?v:[]);
      for(const f of files) boundMetadata(f,p.userId);
      p.dynamicFields={...record(p.dynamicFields),__stolen:draft};
      await tx.$executeRaw`UPDATE public."RegistrationRequest" SET "dynamicFields"=${JSON.stringify(p.dynamicFields)}::jsonb WHERE id=${p.id}`;
    }
    // Each immutable evidence row records actor/time; a later review must acknowledge the full set.
    await attach(tx, current, p, user, input.evidenceFileIds);
    return { id: current.id, state: current.state, version: current.version };
  });
}

export async function privateEvidenceUrl(registrationId: string, incidentId: string, evidenceId: string) {
  const userId = await sessionId();
  if (!uuid.test(incidentId) || !uuid.test(evidenceId)) fail();
  return prisma.$transaction(async tx => {
    const user = await actor(tx, userId);
    const p = await parent(tx, registrationId, user);
    const rows = await tx.$queryRaw<Evidence[]>`SELECT e.* FROM incident_private."AssetIncidentEvidence" e JOIN incident_private."AssetIncident" i ON i.id=e."incidentId" AND i."registrationRequestId"=e."registrationRequestId" WHERE e.id=${evidenceId}::uuid AND i.id=${incidentId}::uuid AND i."registrationRequestId"=${p.id}`;
    const e = rows[0];
    if (!e || e.ownerIdAtBinding !== p.userId || hash(e.sourceMetadata) !== e.sourceMetadataSha256) fail();
    const upload = boundMetadata(e.sourceMetadata, p.userId);
    // Reuses the existing private signing adapter (one-hour bearer access).
    // Authorization is evaluated while parent ownership/deletion remains locked.
    const result = await getSupabaseAccessUrl(upload, { download: true });
    if (!result?.redirectUrl) fail(502);
    return result.redirectUrl;
  }, { timeout: 10000 });
}

export async function privateIncident(registrationId: string) {
  const userId = await sessionId();
  return prisma.$transaction(async tx => {
    const user = await actor(tx,userId);
    const p = await parent(tx,registrationId,user);
    const rows = await tx.$queryRaw<(Incident & { reportedAt:Date; resolvedAt:Date|null })[]>`SELECT id,"registrationRequestId","incidentType",state,version,"reportedAt","resolvedAt" FROM incident_private."AssetIncident" WHERE "registrationRequestId"=${p.id} ORDER BY "reportedAt" DESC,id DESC LIMIT 1`;
    if (!rows[0]) return null;
    const current = rows[0];
    const evidence = await tx.$queryRaw<{id:string}[]>`SELECT id FROM incident_private."AssetIncidentEvidence" WHERE "incidentId"=${current.id}::uuid AND "ownerIdAtBinding"=${p.userId} ORDER BY id`;
    return {id:current.id,type:current.incidentType,state:current.state,version:current.version,evidenceIds:evidence.map(e=>e.id),reportedAt:current.reportedAt.toISOString(),resolvedAt:current.resolvedAt?.toISOString() ?? null};
  });
}

export async function saveIncidentContext(registrationId:string, input:ReturnType<typeof import("@/lib/registry/stolen-case").parseStolenCaseInput>) {
  const userId=await sessionId();
  return prisma.$transaction(async tx=>{
    const user=await actor(tx,userId);
    if(user.role!=="admin") fail(403);
    const p=await parent(tx,registrationId,user);
    const live=await tx.$queryRaw<{id:string}[]>`SELECT id FROM incident_private."AssetIncident" WHERE "registrationRequestId"=${p.id} AND state <> 'RESOLVED' FOR UPDATE`;
    if(live.length!==1) fail(409);
    const draft={...record(record(p.dynamicFields).__stolen),...input};
    const next={...record(p.dynamicFields),__stolen:draft};
    await tx.$executeRaw`UPDATE public."RegistrationRequest" SET "dynamicFields"=${JSON.stringify(next)}::jsonb WHERE id=${p.id}`;
  });
}
