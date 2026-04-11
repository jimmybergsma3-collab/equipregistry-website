export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

export type StoredUpload = {
  id: string;
  bucket: string;
  originalName: string;
  storedName: string;
  relativePath: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
};
