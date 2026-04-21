export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "application/x-pdf",
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/x-png",
  "image/webp",
  "image/heic",
  "image/heic-sequence",
  "image/heif",
  "image/heif-sequence",
] as const;

export const COMPRESSIBLE_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const ALLOWED_UPLOAD_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif";

export type StoredUpload = {
  id: string;
  bucket: string;
  storageBucket?: string;
  originalName: string;
  storedName: string;
  relativePath: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  storage?: "filesystem" | "inline" | "supabase";
  inlineBase64?: string;
};

const HEAVY_UPLOAD_PAYLOAD_KEYS = new Set([
  "inlineBase64",
  "fileContent",
  "rawBuffer",
  "buffer",
]);

export function stripHeavyUploadPayloads(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripHeavyUploadPayloads);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const next: Record<string, unknown> = {};

  for (const [key, item] of Object.entries(value)) {
    if (HEAVY_UPLOAD_PAYLOAD_KEYS.has(key)) {
      continue;
    }

    next[key] = stripHeavyUploadPayloads(item);
  }

  return next;
}
