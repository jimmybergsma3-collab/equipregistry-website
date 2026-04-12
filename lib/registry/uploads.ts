import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES,
  type StoredUpload,
} from "@/lib/registry/upload-types";

export type UploadBucket =
  | "proof_of_ownership"
  | "applicant_id"
  | "invoice_purchase_proof"
  | "asset_overview_photo"
  | "serial_plate_photo"
  | "vin_chassis_photo"
  | "registration_document"
  | "hull_id_photo"
  | "engine_serial_photo"
  | "proof_of_address"
  | "additional_supporting_document"
  | "stolen_supporting_document"
  | "stolen_police_report";

const ALLOWED_BUCKETS: UploadBucket[] = [
  "proof_of_ownership",
  "applicant_id",
  "invoice_purchase_proof",
  "asset_overview_photo",
  "serial_plate_photo",
  "vin_chassis_photo",
  "registration_document",
  "hull_id_photo",
  "engine_serial_photo",
  "proof_of_address",
  "additional_supporting_document",
  "stolen_supporting_document",
  "stolen_police_report",
];

const MULTI_FILE_BUCKETS: UploadBucket[] = [
  "applicant_id",
  "invoice_purchase_proof",
  "asset_overview_photo",
  "serial_plate_photo",
  "vin_chassis_photo",
  "hull_id_photo",
  "engine_serial_photo",
  "additional_supporting_document",
  "stolen_supporting_document",
  "stolen_police_report",
];

function sanitizeBaseName(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function getSafeExtension(name: string) {
  const ext = path.extname(name).toLowerCase();
  if (!ext || ext.length > 8) {
    return ".bin";
  }

  return ext;
}

export function isUploadBucket(value: string): value is UploadBucket {
  return ALLOWED_BUCKETS.includes(value as UploadBucket);
}

export function bucketSupportsMultipleFiles(bucket: UploadBucket) {
  return MULTI_FILE_BUCKETS.includes(bucket);
}

export function validateUploadFile(file: File) {
  if (!file.name) {
    throw new Error("Missing file name.");
  }

  if (file.size <= 0) {
    throw new Error("The selected file is empty.");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("Each file must be 6 MB or smaller.");
  }

  if (
    file.type &&
    !ALLOWED_UPLOAD_MIME_TYPES.includes(
      file.type as (typeof ALLOWED_UPLOAD_MIME_TYPES)[number]
    )
  ) {
    throw new Error("Only PDF, JPG, PNG, and WEBP files are allowed.");
  }
}

export async function persistUploadFile(
  file: File,
  bucket: UploadBucket
): Promise<StoredUpload> {
  validateUploadFile(file);

  const id = randomUUID();
  const uploadedAt = new Date().toISOString();
  const extension = getSafeExtension(file.name);
  const baseName = sanitizeBaseName(file.name) || "upload";
  const storedName = `${id}-${baseName}${extension}`;
  const relativePath = path.join("data", "uploads", bucket, storedName);
  const absolutePath = path.join(process.cwd(), relativePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, buffer);

  return {
    id,
    bucket,
    originalName: file.name,
    storedName,
    relativePath: relativePath.replace(/\\/g, "/"),
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt,
  };
}

export async function readStoredUpload(upload: StoredUpload) {
  const absolutePath = path.join(process.cwd(), upload.relativePath);
  const buffer = await readFile(absolutePath);

  return {
    buffer,
    mimeType: upload.mimeType || "application/octet-stream",
    fileName: upload.originalName || upload.storedName,
  };
}
