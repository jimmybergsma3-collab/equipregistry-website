import { createHash } from "node:crypto";
import { verifyUploadBinding } from "@/lib/registry/upload-binding";
import type { StoredUpload } from "@/lib/registry/upload-types";

export const PHOTO_LABELS = ["overview", "front", "rear", "left", "right", "interior", "serial_plate", "vin_chassis", "hull_id", "engine_serial", "detail", "damage", "attachment", "other"] as const;
export type PhotoLabelCode = typeof PHOTO_LABELS[number];
export const PHOTO_GROUPS = ["asset_overview_photo", "serial_plate_photo", "vin_chassis_photo", "hull_id_photo", "engine_serial_photo"] as const;
export const POLICY = "asset-photo-privacy-v1";
export const CONSENT_POLICY = "asset-photo-consent-v1";
export const sha256 = (bytes: Buffer | string) => createHash("sha256").update(bytes).digest("hex");
export const mediaIdValid = (id: string) => /^[a-f0-9]{48}$/.test(id);
export function isPhotoLabel(value: string): value is PhotoLabelCode {
  return (PHOTO_LABELS as readonly string[]).includes(value);
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (record(value)) return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(",")}}`;
  return JSON.stringify(value);
}
export const metadataHash = (value: unknown) => sha256(canonical(value));
export function sourceCandidates(documents: unknown, ownerId: string) {
  if (!record(documents)) return [];
  const all: { key: string; file: StoredUpload }[] = [];
  for (const [key, group] of Object.entries(documents)) {
    if (!record(group) || !Array.isArray(group.files)) continue;
    for (const file of group.files) if (record(file)) all.push({ key, file: file as StoredUpload });
  }
  return all.filter(({ key, file }) =>
    (PHOTO_GROUPS as readonly string[]).includes(key) &&
    all.filter(x => x.file.id === file.id).length === 1 &&
    typeof file.id === "string" && typeof file.mimeType === "string" &&
    ["image/jpeg", "image/png", "image/webp"].includes(file.mimeType) &&
    file.storage === "supabase" && typeof file.relativePath === "string" &&
    !!file.contentSha256 && /^[a-f0-9]{64}$/.test(file.contentSha256) &&
    verifyUploadBinding(file as unknown as Record<string, unknown>, ownerId)
  );
}
export function exactSource(documents: unknown, ownerId: string, fileId: string) {
  const source = sourceCandidates(documents, ownerId).find(x => x.file.id === fileId);
  if (!source) throw new Error("Photo publication unavailable.");
  return source;
}
export function sourceLocator(file: StoredUpload) {
  return JSON.stringify({ storage: file.storage, bucket: file.storageBucket ?? file.bucket, path: file.relativePath });
}
export type PublicPhoto = { id: string; src: string; labelCode: PhotoLabelCode; width: number; height: number };
export function sortPhotos<T extends { id: string; labelCode: string; publishedAt: Date | null }>(photos: T[]) {
  return [...photos].sort((a, b) => PHOTO_LABELS.indexOf(a.labelCode as PhotoLabelCode) - PHOTO_LABELS.indexOf(b.labelCode as PhotoLabelCode) ||
    (a.publishedAt?.getTime() ?? 0) - (b.publishedAt?.getTime() ?? 0) || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
