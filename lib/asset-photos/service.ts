import { randomBytes } from "node:crypto";
import type { AssetPhotoPublication, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/get-current-user";
import { assertSyntheticPhotoEnvironment, prepareVariant, readSource, readVariant } from "./local-storage";
import { CONSENT_POLICY, POLICY, exactSource, isPhotoLabel, mediaIdValid, metadataHash, sourceCandidates, sourceLocator, sortPhotos, type PublicPhoto } from "./policy";

const denied = () => new Error("Photo publication unavailable.");
async function admin() {
  const user = await requireAdmin();
  if (!user) throw denied();
  assertSyntheticPhotoEnvironment();
  return user;
}
async function lockRequest(tx: Prisma.TransactionClient, id: string) {
  await tx.$queryRaw`SELECT "id" FROM "RegistrationRequest" WHERE "id" = ${id} FOR UPDATE`;
  const request = await tx.registrationRequest.findUnique({ where: { id } });
  if (!request || request.deletedAt || request.requestStatus !== "passport_issued") throw denied();
  return request;
}
async function assertCurrent(tx: Prisma.TransactionClient, row: AssetPhotoPublication) {
  const request = await tx.registrationRequest.findUnique({ where: { id: row.registrationRequestId } });
  if (!request || request.deletedAt || request.requestStatus !== "passport_issued" || request.userId !== row.sourceOwnerId) throw denied();
  const latest = await tx.assetPhotoPublication.findFirst({ where: { registrationRequestId: request.id, sourceFileId: row.sourceFileId }, orderBy: { revision: "desc" } });
  if (latest?.id !== row.id) throw denied();
  const source = exactSource(request.documents, request.userId, row.sourceFileId);
  if (source.key !== row.sourceDocumentKey || sourceLocator(source.file) !== row.sourceLocator ||
      metadataHash(source.file) !== row.sourceMetadataSha256 || source.file.contentSha256 !== row.sourceSha256 ||
      row.sourceProvenance !== "server-bound-v1" || !isPhotoLabel(row.labelCode) ||
      row.consentActorId !== request.userId || row.consentPolicyVersion !== CONSENT_POLICY ||
      !row.consentRecordedBy || !row.consentRecordedAt || row.consentEvidenceRef.trim().length < 20) throw denied();
  await readSource(row.sourceSha256);
  return source;
}
export async function preparePhoto(input: { registrationId: string; fileId: string; label: string; consentEvidence: string; rightsConfirmed: boolean }) {
  const reviewer = await admin();
  if (!isPhotoLabel(input.label) || !input.rightsConfirmed || input.consentEvidence.trim().length < 20 || input.consentEvidence.length > 2000) throw denied();
  const labelCode = input.label;
  return prisma.$transaction(async tx => {
    const request = await lockRequest(tx, input.registrationId);
    const source = exactSource(request.documents, request.userId, input.fileId);
    const variant = await prepareVariant(await readSource(source.file.contentSha256!), source.file.mimeType);
    const previous = await tx.assetPhotoPublication.findFirst({ where: { registrationRequestId: request.id, sourceFileId: source.file.id }, orderBy: { revision: "desc" } });
    if (previous?.publicationStatus === "published") {
      await tx.assetPhotoPublication.update({ where: { id: previous.id }, data: { publicationStatus: "revoked", revokedAt: new Date(), revokedBy: reviewer.id, revocationReasonCode: "superseded" } });
    }
    // The consent statement is a private, attributable admin record specific to this immutable revision.
    // It must identify the rights holder's actual permission; the general registration declaration is never used.
    return tx.assetPhotoPublication.create({ data: {
      id: randomBytes(24).toString("hex"), registrationRequestId: request.id,
      sourceFileId: source.file.id, sourceDocumentKey: source.key, sourceLocator: sourceLocator(source.file),
      sourceSha256: source.file.contentSha256!, sourceMetadataSha256: metadataHash(source.file), sourceOwnerId: request.userId,
      sourceProvenance: "server-bound-v1", revision: (previous?.revision ?? 0) + 1,
      labelCode, publicationStatus: "pending_review", consentActorId: request.userId,
      consentRecordedBy: reviewer.id, consentRecordedAt: new Date(), consentEvidenceRef: input.consentEvidence.trim(),
      consentPolicyVersion: CONSENT_POLICY, ...variant,
    } });
  }, { timeout: 20000 });
}
export async function decidePhoto(input: { registrationId: string; mediaId: string; decision: "publish" | "reject" | "revoke"; reviewedVariantHash?: string; privacyConfirmed?: boolean }) {
  const reviewer = await admin();
  if (!mediaIdValid(input.mediaId)) throw denied();
  return prisma.$transaction(async tx => {
    await lockRequest(tx, input.registrationId);
    const row = await tx.assetPhotoPublication.findUnique({ where: { id: input.mediaId } });
    if (!row || row.registrationRequestId !== input.registrationId) throw denied();
    if (input.decision === "revoke" && row.publicationStatus === "published") {
      return tx.assetPhotoPublication.update({ where: { id: row.id }, data: { publicationStatus: "revoked", revokedAt: new Date(), revokedBy: reviewer.id, revocationReasonCode: "admin_withdrawal" } });
    }
    if (row.publicationStatus !== "pending_review") throw denied();
    if (input.decision === "reject") return tx.assetPhotoPublication.update({ where: { id: row.id }, data: { publicationStatus: "rejected", privacyReviewResult: "failed", reviewedBy: reviewer.id, reviewedAt: new Date(), reviewPolicyVersion: POLICY } });
    if (input.decision !== "publish" || !input.privacyConfirmed || input.reviewedVariantHash !== row.variantSha256) throw denied();
    await assertCurrent(tx, row);
    await readVariant(row);
    return tx.assetPhotoPublication.update({ where: { id: row.id }, data: { publicationStatus: "published", privacyReviewResult: "passed", reviewedBy: reviewer.id, reviewedAt: new Date(), reviewPolicyVersion: POLICY, publishedAt: new Date() } });
  }, { timeout: 20000 });
}
async function verifiedPublic(row: AssetPhotoPublication) {
  if (row.publicationStatus !== "published" || row.revokedAt || row.privacyReviewResult !== "passed" ||
      !row.reviewedBy || !row.reviewedAt || row.reviewPolicyVersion !== POLICY || !row.publishedAt) throw denied();
  await assertCurrent(prisma, row);
  const bytes = await readVariant(row);
  // Recheck after I/O so a completed revoke is not hidden behind a stale row snapshot.
  const current = await prisma.assetPhotoPublication.findUnique({ where: { id: row.id } });
  if (!current || current.publicationStatus !== "published" || current.revokedAt) throw denied();
  await assertCurrent(prisma, current);
  return bytes;
}
export async function publicPhotoBytes(id: string) {
  try {
    assertSyntheticPhotoEnvironment();
    if (!mediaIdValid(id)) return null;
    const row = await prisma.assetPhotoPublication.findUnique({ where: { id } });
    return row ? await verifiedPublic(row) : null;
  } catch { return null; }
}
export async function publicPhotos(reference: string): Promise<PublicPhoto[]> {
  try {
    assertSyntheticPhotoEnvironment();
    const rows = await prisma.assetPhotoPublication.findMany({ where: { registrationRequest: { reference, requestStatus: "passport_issued", deletedAt: null }, publicationStatus: "published" } });
    const visible: AssetPhotoPublication[] = [];
    for (const row of rows) { try { await verifiedPublic(row); visible.push(row); } catch { /* Fail closed per photo. */ } }
    return sortPhotos(visible).map(row => ({ id: row.id, src: `/api/public-asset-photos/${row.id}`, labelCode: row.labelCode, width: row.variantWidth, height: row.variantHeight }));
  } catch { return []; }
}
export async function adminPhotos(registrationId: string) {
  await admin();
  const request = await prisma.registrationRequest.findUnique({ where: { id: registrationId } });
  if (!request || request.deletedAt || request.requestStatus !== "passport_issued") throw denied();
  const rows = await prisma.assetPhotoPublication.findMany({ where: { registrationRequestId: registrationId }, orderBy: { createdAt: "desc" } });
  return { reference: request.reference, candidates: sourceCandidates(request.documents, request.userId).map(s => ({ id: s.file.id, name: s.file.originalName, group: s.key })), rows };
}
export async function adminVariant(id: string) {
  await admin();
  if (!mediaIdValid(id)) throw denied();
  const row = await prisma.assetPhotoPublication.findUnique({ where: { id } });
  if (!row) throw denied();
  return readVariant(row);
}
