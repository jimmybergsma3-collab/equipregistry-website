export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
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
  originalName: string;
  storedName: string;
  relativePath: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  storage?: "filesystem" | "inline" | "supabase";
  inlineBase64?: string;
};
