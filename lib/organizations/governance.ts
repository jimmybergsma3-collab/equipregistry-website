import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { organizationDb as prisma, platformDb } from '@/lib/db-capabilities';
import { getSession } from "@/lib/auth/getSession";
import { OrganizationError } from "./service";
import { draftRestoreAvailable } from "./retention-policy";

type Tx = Prisma.TransactionClient;
type Actor = { id: string; role: string; emailVerifiedAt: Date | null };
type Org = { id: string; status: string; version: number };
type Review = { id: string; organizationId: string; targetId: string; reviewerId: string; scope: string; organizationVersion: number; targetVersion: number | null; expiresAt: Date; acceptedAt: Date | null; revokedAt: Date | null; usedAt: Date | null; version: number };
function unavailable(status = 404): never { throw new OrganizationError(status); }
const uuid = (v: unknown): string => typeof v === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v) ? v.toLowerCase() : unavailable(400);
const str = (v: unknown, max = 200): string => typeof v === "string" && v.trim().length > 0 && v.length <= max && !/[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(v) ? v.normalize("NFC").trim() : unavailable(400);
const ver = (v: unknown): number => Number.isSafeInteger(v) && Number(v) >= 0 ? Number(v) : unavailable(400);
function input(v: unknown, fields: string[]): Record<string, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v) || Object.keys(v).some(k => !fields.includes(k))) unavailable(400);
  return v as Record<string, unknown>;
}
function platform(a: Actor) { if (a.role !== "admin") unavailable(403); }
async function account(tx: Tx, id: string) {
  const rows = await tx.$queryRaw<Actor[]>`SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${id} FOR SHARE`;
  return rows[0] ?? unavailable();
}
async function transaction<T>(fn: (tx: Tx, actor: Actor) => Promise<T>, administrative = false) {
  const session = await getSession();
  if (!session.isAuthenticated) unavailable(401);
  return (administrative ? platformDb : prisma).$transaction(async tx => {
    const actor = await account(tx, session.user.id);
    if (!actor.emailVerifiedAt) unavailable(401);
    return fn(tx, actor);
  });
}
async function lock(tx: Tx, organizationId: string) {
  const rows = await tx.$queryRaw<Org[]>`SELECT id,status,version FROM public."Organization" WHERE id=${organizationId}::uuid FOR UPDATE`;
  return rows[0] ?? unavailable();
}
async function admin(tx: Tx, a: Actor, o: Org) {
  const m = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: o.id, userId: a.id } } });
  if (o.status !== "ACTIVE" || m?.role !== "ORG_ADMIN" || m.status !== "ACTIVE" || m.endsAt) unavailable();
}
async function audit(tx: Tx, a: Actor, org: string, action: string, subject: string, version: number) {
  await tx.organizationEvent.create({ data: { organizationId: org, actorId: a.id, action, subjectId: subject, subjectVersion: version } });
}
// Canonical primitive-only command payloads, bound to actor and organization.
async function operation(tx: Tx, a: Actor, org: string, operationId: string, payload: Record<string, unknown>, run: () => Promise<Record<string, unknown>>) {
  const canonical = JSON.stringify(Object.fromEntries(Object.entries({ ...payload, actorId: a.id }).sort(([a], [b]) => a.localeCompare(b))));
  const hash = createHash("sha256").update(canonical).digest("hex");
  const rows = await tx.$queryRaw<{ hash: string; actorId: string; result: Record<string, unknown> }[]>`SELECT hash,"actorId",result FROM governance_private."Operation" WHERE "organizationId"=${org}::uuid AND id=${operationId}::uuid`;
  if (rows[0]) {
    if (rows[0].hash !== hash || rows[0].actorId !== a.id) unavailable(409);
    return rows[0].result;
  }
  const result = await run();
  await tx.$executeRaw`INSERT INTO governance_private."Operation" (id,"organizationId","actorId",hash,result) VALUES (${operationId}::uuid,${org}::uuid,${a.id},${hash},${JSON.stringify(result)}::jsonb)`;
  return result;
}
async function review(tx: Tx, org: string, id: string) {
  const rows = await tx.$queryRaw<Review[]>`SELECT * FROM governance_private."Mandate" WHERE id=${id}::uuid AND "organizationId"=${org}::uuid FOR UPDATE`;
  return rows[0] ?? unavailable();
}
async function now(tx: Tx) { return (await tx.$queryRaw<{ now: Date }[]>`SELECT clock_timestamp() AS now`)[0].now; }
async function usable(tx: Tx, r: Review, o: Org, expected: number, scope: string) {
  if (r.version !== expected || r.scope !== scope || r.organizationVersion !== o.version || r.revokedAt || r.usedAt || !r.acceptedAt || r.expiresAt <= await now(tx)) unavailable(409);
  const target = await account(tx, r.targetId), reviewer = await account(tx, r.reviewerId);
  if (!target.emailVerifiedAt || reviewer.role !== "admin" || !reviewer.emailVerifiedAt || r.targetId === r.reviewerId) unavailable(409);
  const membership = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: o.id, userId: r.targetId } } });
  if ((membership?.version ?? null) !== r.targetVersion || membership?.status === "ACTIVE" && membership.role === "ORG_ADMIN") unavailable(409);
  return membership;
}

export async function proposeMandate(value: unknown) {
  const v = input(value, ["organizationId", "expectedVersion", "targetId", "scope", "privateReviewReference", "operationId"]);
  const org = uuid(v.organizationId), expected = ver(v.expectedVersion), target = str(v.targetId), scope = str(v.scope, 16), ref = str(v.privateReviewReference), op = uuid(v.operationId);
  if (!["ADD_ADMIN", "TRANSFER", "REOPEN"].includes(scope) || ref.length < 10) unavailable(400);
  return transaction(async (tx, a) => {
    platform(a); const o = await lock(tx, org);
    return operation(tx, a, org, op, { command: "propose", expected, target, scope, ref }, async () => {
      if (a.id === target) unavailable(403);
      if (o.version !== expected || (scope === "REOPEN" ? !["ARCHIVED", "SUSPENDED_GOVERNANCE"].includes(o.status) : o.status !== "ACTIVE")) unavailable(409);
      if (!(await account(tx, target)).emailVerifiedAt) unavailable(409);
      const membership = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: org, userId: target } } });
      if (membership?.role === "ORG_ADMIN" && membership.status === "ACTIVE") unavailable(409);
      const id = randomUUID();
      await tx.$executeRaw`INSERT INTO governance_private."Mandate" (id,"organizationId","targetId","reviewerId",scope,"organizationVersion","targetVersion","privateReviewReference") VALUES (${id}::uuid,${org}::uuid,${target},${a.id},${scope},${expected},${membership?.version ?? null},${ref})`;
      await audit(tx, a, org, "MANDATE_PROPOSED", id, 0);
      return { id, version: 0 };
    });
  }, true);
}

export async function acceptMandate(value: unknown, portalStrict = false) {
  const v = input(value, ["organizationId", "reviewId", "expectedVersion", "operationId"]);
  const org = uuid(v.organizationId), id = uuid(v.reviewId), expected = ver(v.expectedVersion), op = uuid(v.operationId);
  return transaction(async (tx, a) => {
    const o = await lock(tx, org), r = await review(tx, org, id);
    if (a.id !== r.targetId) unavailable();
    return operation(tx, a, org, op, { command: "accept", id, expected }, async () => {
      if (portalStrict) {
        const reviewer = await account(tx, r.reviewerId), clock = await now(tx);
        if (!reviewer.emailVerifiedAt || reviewer.role !== "admin" || reviewer.id === a.id) unavailable(409);
        const conflict = await tx.organizationMembership.findFirst({where:{organizationId:org,userId:reviewer.id,status:"ACTIVE",startsAt:{lte:clock},OR:[{endsAt:null},{endsAt:{gt:clock}}]}});
        const target = await tx.organizationMembership.findUnique({where:{organizationId_userId:{organizationId:org,userId:a.id}}});
        if (conflict || (target?.version ?? null) !== r.targetVersion || target?.status === "ACTIVE" && target.role === "ORG_ADMIN" ||
          (r.scope === "REOPEN" ? !["ARCHIVED","SUSPENDED_GOVERNANCE"].includes(o.status) : o.status !== "ACTIVE")) unavailable(409);
      }
      if (r.organizationVersion !== o.version || r.version !== expected || r.acceptedAt || r.revokedAt || r.usedAt || r.expiresAt <= await now(tx)) unavailable(409);
      await tx.$executeRaw`UPDATE governance_private."Mandate" SET "acceptedAt"=clock_timestamp(),version=version+1 WHERE id=${id}::uuid`;
      await audit(tx, a, org, "MANDATE_ACCEPTED", id, expected + 1);
      return { id, version: expected + 1 };
    });
  });
}

export async function readMandate(value: unknown) {
  const v = input(value, ["organizationId", "reviewId"]), org = uuid(v.organizationId), id = uuid(v.reviewId);
  return transaction(async (tx, a) => {
    await lock(tx, org); const r = await review(tx, org, id);
    if (a.id !== r.targetId && a.role !== "admin") unavailable();
    return { id: r.id, organizationId: org, targetId: r.targetId, scope: r.scope,
      version: r.version, expiresAt: r.expiresAt, accepted: !!r.acceptedAt,
      revoked: !!r.revokedAt, used: !!r.usedAt };
  });
}

export async function revokeMandate(value: unknown) {
  const v = input(value, ["organizationId", "reviewId", "expectedVersion", "reason", "operationId"]);
  const org = uuid(v.organizationId), id = uuid(v.reviewId), expected = ver(v.expectedVersion), reason = str(v.reason), op = uuid(v.operationId);
  return transaction(async (tx, a) => {
    platform(a); await lock(tx, org); const r = await review(tx, org, id);
    return operation(tx, a, org, op, { command: "revokeReview", id, expected, reason }, async () => {
      if (r.version !== expected || r.usedAt || r.revokedAt) unavailable(409);
      await tx.$executeRaw`UPDATE governance_private."Mandate" SET "revokedAt"=clock_timestamp(),"revocationReason"=${reason},version=version+1 WHERE id=${id}::uuid`;
      await audit(tx, a, org, "MANDATE_REVOKED", id, expected + 1);
      return { id, version: expected + 1 };
    });
  });
}

export async function applyMandate(value: unknown) {
  const v = input(value, ["organizationId", "expectedVersion", "reviewId", "reviewVersion", "outgoingId", "outgoingVersion", "operationId"]);
  const org = uuid(v.organizationId), expected = ver(v.expectedVersion), id = uuid(v.reviewId), rv = ver(v.reviewVersion), op = uuid(v.operationId);
  const outgoing = v.outgoingId == null ? null : str(v.outgoingId), ov = outgoing ? ver(v.outgoingVersion) : null;
  if (!outgoing && v.outgoingVersion != null) unavailable(400);
  return transaction(async (tx, a) => {
    platform(a); const o = await lock(tx, org);
    return operation(tx, a, org, op, { command: "apply", expected, id, rv, outgoing, ov }, async () => {
      if (o.version !== expected) unavailable(409);
      const scope = outgoing ? "TRANSFER" : o.status === "ACTIVE" ? "ADD_ADMIN" : "REOPEN";
      if (outgoing && o.status !== "ACTIVE" || !["ACTIVE", "ARCHIVED", "SUSPENDED_GOVERNANCE"].includes(o.status)) unavailable(409);
      const r = await review(tx, org, id);
      if (a.id === r.targetId) unavailable(403);
      const current = await usable(tx, r, o, rv, scope);
      if (outgoing) {
        const old = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: org, userId: outgoing } } });
        if (outgoing === r.targetId || old?.role !== "ORG_ADMIN" || old.status !== "ACTIVE" || old.version !== ov) unavailable(409);
        await tx.organizationMembership.update({ where: { organizationId_userId: { organizationId: org, userId: outgoing } }, data: { status: "REVOKED", endsAt: await now(tx), version: { increment: 1 } } });
        await audit(tx, a, org, "MEMBERSHIP_REVOKED", outgoing, old.version + 1);
      }
      const data = { role: "ORG_ADMIN", status: "ACTIVE", endsAt: null, grantedBy: a.id };
      const m = current ? await tx.organizationMembership.update({ where: { organizationId_userId: { organizationId: org, userId: r.targetId } }, data: { ...data, version: { increment: 1 } } }) : await tx.organizationMembership.create({ data: { ...data, organizationId: org, userId: r.targetId } });
      await tx.$executeRaw`UPDATE governance_private."Mandate" SET "usedAt"=clock_timestamp(),"grantedVersion"=${m.version},version=version+1 WHERE id=${id}::uuid`;
      await audit(tx, a, org, "MANDATE_USED", id, rv + 1);
      await audit(tx, a, org, "ADMIN_GRANTED", r.targetId, m.version);
      await tx.organization.update({ where: { id: org }, data: { status: "ACTIVE", version: { increment: 1 } } });
      await audit(tx, a, org, scope === "REOPEN" ? "ORGANIZATION_REOPENED" : "ADMINISTRATION_CHANGED", org, expected + 1);
      return { id: org, status: "ACTIVE", version: expected + 1, administratorId: r.targetId };
    });
  }, true);
}

export async function leaveOrganization(value: unknown, portalStrict = false) {
  const v = input(value, ["organizationId", "expectedVersion", "operationId"]);
  const org = uuid(v.organizationId), expected = ver(v.expectedVersion), op = uuid(v.operationId);
  return transaction(async (tx, a) => {
    const o = await lock(tx, org);
    return operation(tx, a, org, op, { command: "leave", expected }, async () => {
      const m = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: org, userId: a.id } } });
      if (o.status !== "ACTIVE" || !m || m.role === "ORG_ADMIN" || m.status !== "ACTIVE") unavailable();
      if (portalStrict && (m.endsAt || m.startsAt > await now(tx))) unavailable();
      if (m.version !== expected) unavailable(409);
      await tx.organizationMembership.update({ where: { organizationId_userId: { organizationId: org, userId: a.id } }, data: { status: "REVOKED", endsAt: await now(tx), version: { increment: 1 } } });
      await audit(tx, a, org, "MEMBERSHIP_REVOKED", a.id, expected + 1);
      return { userId: a.id, status: "REVOKED", version: expected + 1 };
    });
  });
}

export async function previewOrganizationClosure(value: unknown) {
  const v = input(value, ["organizationId"]), org = uuid(v.organizationId);
  return transaction(async (tx, a) => {
    platform(a); const o = await lock(tx, org);
    // Explicit platform review capability: counts/state only, never tenant content.
    return { id: org, status: o.status, version: o.version,
      activeMemberships: await tx.organizationMembership.count({ where: { organizationId: org, status: "ACTIVE" } }),
      privateAssets: await tx.privateImportedAsset.count({ where: { organizationId: org } }),
      effect: "Revoke all memberships; preserve records; no automatic restoration or jobs" };
  }, true);
}

export async function closeOrganization(value: unknown) {
  const v = input(value, ["organizationId", "expectedVersion", "status", "reason", "consequencesAccepted", "operationId"]);
  const org = uuid(v.organizationId), expected = ver(v.expectedVersion), status = str(v.status, 24), reason = str(v.reason), op = uuid(v.operationId);
  if (!["ARCHIVED", "SUSPENDED_GOVERNANCE"].includes(status) || v.consequencesAccepted !== true) unavailable(400);
  return transaction(async (tx, a) => {
    platform(a); const o = await lock(tx, org);
    return operation(tx, a, org, op, { command: "close", expected, status, reason }, async () => {
      if (o.version !== expected || !["ACTIVE", "SUSPENDED_GOVERNANCE"].includes(o.status) || o.status === status) unavailable(409);
      return recordOrganizationClosure(tx,a.id,org,expected,status,reason);
    });
  }, true);
}


// Shared closure writes preserve the existing 4B revocation and immutable audit.
// The caller holds the organization lock and has checked current authority/version.
export async function recordOrganizationClosure(tx:Tx,actorId:string,org:string,expected:number,status:string,reason:string) {
 if(!['ARCHIVED','SUSPENDED_GOVERNANCE'].includes(status))unavailable(400);
 const a={id:actorId,role:'',emailVerifiedAt:null};
 const members=await tx.organizationMembership.findMany({where:{organizationId:org,status:'ACTIVE'},orderBy:{userId:'asc'}});
 for(const m of members){await tx.organizationMembership.update({where:{organizationId_userId:{organizationId:org,userId:m.userId}},data:{status:'REVOKED',endsAt:await now(tx),version:{increment:1}}});await audit(tx,a,org,'MEMBERSHIP_REVOKED',m.userId,m.version+1);}
 await tx.organization.update({where:{id:org},data:{status,version:{increment:1}}});
 await tx.$executeRaw`INSERT INTO governance_private."Closure" ("organizationId",version,"actorId",reason) VALUES (${org}::uuid,${expected+1},${actorId},${reason})`;
 await audit(tx,a,org,status==='ARCHIVED'?'ORGANIZATION_ARCHIVED':'ORGANIZATION_SUSPENDED',org,expected+1);
 return {id:org,status,version:expected+1};
}

export async function changeDraftArchive(value: unknown) {
  const v = input(value, ["organizationId", "assetId", "expectedVersion", "restore", "operationId"]);
  const org = uuid(v.organizationId), id = uuid(v.assetId), expected = ver(v.expectedVersion), op = uuid(v.operationId);
  if (typeof v.restore !== "boolean") unavailable(400);
  const restore = v.restore;
  return transaction(async (tx, a) => {
    const o = await lock(tx, org); await admin(tx, a, o);
    return operation(tx, a, org, op, { command: "draftArchive", id, expected, restore }, async () => {
      const asset = await tx.privateImportedAsset.findFirst({ where: { id, organizationId: org } });
      if (!asset) unavailable();
      if (asset.version !== expected || asset.lifecycleState !== (restore ? "ARCHIVED_PRIVATE" : "IMPORTED_PRIVATE")) unavailable(409);
      const blockers = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM governance_private."AssetBlocker" WHERE "organizationId"=${org}::uuid AND "assetId"=${id}::uuid LIMIT 1`;
      if (blockers.length || asset.evidenceState !== "EVIDENCE_REQUIRED") unavailable(409);
      if (restore) {
        const archived = await tx.organizationEvent.findFirst({ where: { organizationId: org, subjectId: id, action: "DRAFT_ARCHIVED", subjectVersion: expected }, orderBy: { createdAt: "desc" } });
        if (!archived || !draftRestoreAvailable(archived.createdAt, await now(tx))) unavailable(409);
      }
      const state = restore ? "IMPORTED_PRIVATE" : "ARCHIVED_PRIVATE";
      await tx.privateImportedAsset.update({ where: { id }, data: { lifecycleState: state, version: { increment: 1 } } });
      await audit(tx, a, org, restore ? "DRAFT_RESTORED" : "DRAFT_ARCHIVED", id, expected + 1);
      return { id, lifecycleState: state, version: expected + 1 };
    });
  });
}

export async function readArchivedDraft(value: unknown) {
  const v = input(value, ["organizationId", "assetId"]), org = uuid(v.organizationId), id = uuid(v.assetId);
  return transaction(async (tx, a) => {
    const o = await lock(tx, org); await admin(tx, a, o);
    return await tx.privateImportedAsset.findFirst({ where: { id, organizationId: org, lifecycleState: "ARCHIVED_PRIVATE" }, select: { id: true, assetName: true, lifecycleState: true, version: true, sourceSystem: true, externalAssetKey: true } }) ?? unavailable();
  });
}

// Manual retention review records a decision to preserve, never deletion authority.
export async function recordRetentionReview(value: unknown) {
  const v = input(value, ["organizationId", "expectedVersion", "category", "outcome", "operationId"]);
  const org = uuid(v.organizationId), expected = ver(v.expectedVersion), category = str(v.category, 16), outcome = str(v.outcome, 24), op = uuid(v.operationId);
  if (!["MANDATE", "MEMBERSHIP", "AUDIT"].includes(category) || !["KEEP_PENDING_POLICY", "HOLD_PRESENT"].includes(outcome)) unavailable(400);
  return transaction(async (tx, a) => {
    platform(a); const o = await lock(tx, org);
    return operation(tx, a, org, op, { command: "retentionReview", expected, category, outcome }, async () => {
      if (o.version !== expected || o.status === "PENDING_REVIEW") unavailable(409);
      const date = await now(tx), next = new Date(date);
      next.setUTCFullYear(next.getUTCFullYear() + 1);
      await audit(tx, a, org, "RETENTION_REVIEWED", `${category}:${outcome}`, expected);
      return { id: org, category, outcome, reviewedAt: date.toISOString(), nextReviewAt: next.toISOString(), purgeAuthorized: false };
    });
  }, true);
}
