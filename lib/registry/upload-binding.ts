import { createHmac, timingSafeEqual } from "node:crypto";
import type { StoredUpload } from "@/lib/registry/upload-types";

// Reserved server-generated namespace. Never treat a missing proof here as legacy.
export const BOUND_UPLOAD_SEGMENT = "er-bound-v1";
const DOMAIN = "equipregistry:upload-provenance:v1";
export const UPLOAD_BINDING_ERROR = "Upload ownership could not be verified.";

export function requireUploadBindingKey() {
  const key = process.env.ER_UPLOAD_BINDING_SECRET;
  if (!key || Buffer.byteLength(key, "utf8") < 32) {
    throw new Error(UPLOAD_BINDING_ERROR);
  }
  return key;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// JSON metadata only; sorting makes JSON key order irrelevant to the MAC.
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (isRecord(value)) return `{${Object.keys(value).sort().map(
    (key) => `${JSON.stringify(key)}:${canonical(value[key])}`
  ).join(",")}}`;
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new Error(UPLOAD_BINDING_ERROR);
  return encoded;
}

function metadata(upload: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(upload).filter(([key]) => key !== "binding"));
}

function signature(upload: Record<string, unknown>, uploaderId: string) {
  return createHmac("sha256", requireUploadBindingKey())
    .update(canonical({ domain: DOMAIN, uploaderId, metadata: metadata(upload) }))
    .digest();
}

// Call only with metadata constructed by the upload server after storage success.
// This must never be used to endorse submitted JSON or historical uploads.
export function bindNewUpload(upload: StoredUpload, uploaderId: string): StoredUpload {
  if (!uploaderId || !upload.relativePath.split("/").includes(BOUND_UPLOAD_SEGMENT) ||
      upload.storage !== "supabase" || !upload.contentSha256) {
    throw new Error(UPLOAD_BINDING_ERROR);
  }
  return { ...upload, binding: {
    version: 1,
    uploaderId,
    signature: signature(upload, uploaderId).toString("base64url"),
  } };
}

function hasSecureMarker(upload: Record<string, unknown>) {
  return "binding" in upload || "contentSha256" in upload ||
    (typeof upload.relativePath === "string" &&
      upload.relativePath.split("/").includes(BOUND_UPLOAD_SEGMENT));
}

export function verifyUploadBinding(upload: Record<string, unknown>, ownerId: string) {
  try {
    const proof = upload.binding;
    if (!isRecord(proof) || proof.version !== 1 || !ownerId ||
        proof.uploaderId !== ownerId || typeof proof.signature !== "string" ||
        !/^[A-Za-z0-9_-]{43}$/.test(proof.signature)) return false;
    const supplied = Buffer.from(proof.signature, "base64url");
    const expected = signature(upload, ownerId);
    return supplied.toString("base64url") === proof.signature &&
      supplied.length === expected.length && timingSafeEqual(supplied, expected);
  } catch {
    return false;
  }
}

// This classification is for server-loaded JSON, never a client-provided legacy flag.
export function storedUploadProvenance(upload: Record<string, unknown>, ownerId: string) {
  if (!hasSecureMarker(upload)) return "legacy-unproven" as const;
  return verifyUploadBinding(upload, ownerId) ? "server-bound" as const : "invalid" as const;
}

function uploadsIn(value: unknown, fileEntry = false): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap((entry) => uploadsIn(entry, fileEntry));
  if (!isRecord(value)) return [];
  const uploadLike = fileEntry || ["relativePath", "storedName", "inlineBase64", "binding", "contentSha256"]
    .some((key) => key in value) || ("id" in value && "originalName" in value);
  return [...(uploadLike ? [value] : []), ...Object.entries(value).flatMap(([key, nested]) =>
    uploadsIn(nested, ["files", "evidenceFiles", "policeReportFiles", "supportingDocuments"].includes(key))
  )];
}

// Only pass database-loaded fields from the already-authorized target record.
export function assertStoredUploadBindings(value: unknown, ownerId: string) {
  for (const upload of uploadsIn(value)) {
    if (storedUploadProvenance(upload, ownerId) === "invalid") {
      throw new Error(UPLOAD_BINDING_ERROR);
    }
  }
}

// New registrations have no legacy source. Existing-record actions may retain an
// exact legacy object already stored on THAT record, without signing or promoting it.
export function assertIncomingUploadBindings(
  value: unknown,
  ownerId: string,
  existingRecordUploads?: unknown
) {
  const legacy = uploadsIn(existingRecordUploads)
    .filter((upload) => storedUploadProvenance(upload, ownerId) === "legacy-unproven")
    .map(canonical);
  for (const upload of uploadsIn(value)) {
    if (verifyUploadBinding(upload, ownerId)) continue;
    if (!hasSecureMarker(upload) && legacy.includes(canonical(upload))) continue;
    throw new Error(UPLOAD_BINDING_ERROR);
  }
}
