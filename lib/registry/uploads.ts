import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES,
  type StoredUpload,
} from "@/lib/registry/upload-types";

type UploadAccessOptions = {
  requestId: string;
  fileId: string;
  download?: boolean;
};

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

const UPLOAD_BUCKET_ALIASES: Record<string, UploadBucket> = {
  addressProof: "proof_of_address",
  proofOfAddress: "proof_of_address",
  proofOfOwnership: "proof_of_ownership",
  ownershipProof: "proof_of_ownership",
  applicantId: "applicant_id",
  applicantID: "applicant_id",
  invoicePurchaseProof: "invoice_purchase_proof",
  purchaseProof: "invoice_purchase_proof",
  assetOverviewPhoto: "asset_overview_photo",
  assetPhoto: "asset_overview_photo",
  serialPlatePhoto: "serial_plate_photo",
  vinChassisPhoto: "vin_chassis_photo",
  vinPhoto: "vin_chassis_photo",
  chassisPhoto: "vin_chassis_photo",
  registrationDocument: "registration_document",
  hullIdPhoto: "hull_id_photo",
  hinPhoto: "hull_id_photo",
  engineSerialPhoto: "engine_serial_photo",
  additionalSupportingDocument: "additional_supporting_document",
  supportingDocument: "additional_supporting_document",
  stolenSupportingDocument: "stolen_supporting_document",
  stolenPoliceReport: "stolen_police_report",
  policeReport: "stolen_police_report",
};

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

export function normalizeUploadBucket(value: string): UploadBucket | null {
  const trimmed = value.trim();

  if (isUploadBucket(trimmed)) {
    return trimmed;
  }

  return UPLOAD_BUCKET_ALIASES[trimmed] ?? null;
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
    throw new Error("Each file must be 10 MB or smaller.");
  }

  if (
    file.type &&
    !ALLOWED_UPLOAD_MIME_TYPES.includes(
      file.type as (typeof ALLOWED_UPLOAD_MIME_TYPES)[number]
    )
  ) {
    throw new Error("Only PDF, JPG, PNG, WEBP, HEIC, and HEIF files are allowed.");
  }
}

function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null;
}

function getSupabaseUploadTarget(bucket: UploadBucket, storedName: string) {
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!baseUrl || !serviceRoleKey) {
    return null;
  }

  const configuredBucket =
    process.env.SUPABASE_UPLOAD_BUCKET?.trim() ||
    process.env.SUPABASE_STORAGE_BUCKET?.trim() ||
    "";

  if (!configuredBucket) {
    throw new Error("Supabase upload bucket is not configured.");
  }

  const storageBucket = configuredBucket;
  const objectPath = `${bucket}/${storedName}`;

  return {
    baseUrl,
    serviceRoleKey,
    storageBucket,
    objectPath,
  };
}

async function uploadToSupabaseStorage(
  file: File,
  bucket: UploadBucket,
  storedName: string
): Promise<Pick<StoredUpload, "storageBucket" | "relativePath" | "storage"> | null> {
  const target = getSupabaseUploadTarget(bucket, storedName);

  if (!target) {
    return null;
  }

  const { baseUrl, serviceRoleKey, storageBucket, objectPath } = target;
  const uploadUrl = `${baseUrl}/storage/v1/object/${encodeURIComponent(
    storageBucket
  )}/${encodePathSegments(objectPath)}`;
  const body = new Blob([await file.arrayBuffer()], {
    type: file.type || "application/octet-stream",
  });

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error("UPLOAD_SUPABASE_FAILED", {
      bucket,
      storageBucket,
      status: response.status,
      details: details.slice(0, 300),
    });
    throw new Error("Upload storage failed. Please try again.");
  }

  return {
    storageBucket,
    relativePath: objectPath,
    storage: "supabase",
  };
}

async function writeLocalUploadFile(
  file: File,
  bucket: UploadBucket,
  storedName: string
) {
  const relativePath = path.join("data", "uploads", bucket, storedName);
  const absolutePath = path.join(process.cwd(), relativePath);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, buffer);

  return {
    relativePath: relativePath.replace(/\\/g, "/"),
    storage: "filesystem" as const,
  };
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
  const durableUpload = await uploadToSupabaseStorage(file, bucket, storedName);

  if (!durableUpload && process.env.NODE_ENV === "production") {
    throw new Error("Upload storage is not configured. Please try again later.");
  }

  const storage = durableUpload ?? (await writeLocalUploadFile(file, bucket, storedName));

  return {
    id,
    bucket,
    originalName: file.name,
    storedName,
    ...storage,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt,
  };
}

export async function readStoredUpload(upload: StoredUpload) {
  if (
    (upload.storage === "inline" || upload.relativePath.startsWith("inline://")) &&
    typeof upload.inlineBase64 === "string" &&
    upload.inlineBase64.length > 0
  ) {
    return {
      buffer: Buffer.from(upload.inlineBase64, "base64"),
      mimeType: upload.mimeType || "application/octet-stream",
      fileName: upload.originalName || upload.storedName,
    };
  }

  const absolutePath = path.join(process.cwd(), upload.relativePath);
  const buffer = await readFile(absolutePath);

  return {
    buffer,
    mimeType: upload.mimeType || "application/octet-stream",
    fileName: upload.originalName || upload.storedName,
  };
}

function encodePathSegments(value: string) {
  return value
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getSupabaseBaseUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    "";

  if (!raw) {
    return null;
  }

  return raw.replace(/\/+$/, "");
}

function getSupabaseObjectLocation(upload: StoredUpload) {
  if (upload.storage === "supabase" && upload.relativePath) {
    return {
      bucket: upload.storageBucket || upload.bucket,
      objectPath: upload.relativePath.replace(/^\/+/, ""),
    };
  }

  if (!upload.relativePath.startsWith("supabase://")) {
    return null;
  }

  const remainder = upload.relativePath.slice("supabase://".length);
  const [bucket, ...rest] = remainder.split("/").filter(Boolean);

  if (!bucket || rest.length === 0) {
    return null;
  }

  return {
    bucket,
    objectPath: rest.join("/"),
  };
}

export function buildStoredUploadAccessUrl({
  requestId,
  fileId,
  download = false,
}: UploadAccessOptions) {
  const params = new URLSearchParams({
    requestId,
    fileId,
  });

  if (download) {
    params.set("download", "1");
  }

  return `/api/uploads?${params.toString()}`;
}

export async function getSupabaseAccessUrl(
  upload: StoredUpload,
  options?: { download?: boolean }
) {
  const location = getSupabaseObjectLocation(upload);
  const baseUrl = getSupabaseBaseUrl();

  if (!location || !baseUrl) {
    return null;
  }

  const { bucket, objectPath } = location;
  const encodedBucket = encodeURIComponent(bucket);
  const encodedObjectPath = encodePathSegments(objectPath);

  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!serviceRoleKey) {
    return null;
  }

  const signUrl = `${baseUrl}/storage/v1/object/sign/${encodedBucket}/${encodedObjectPath}`;
  const response = await fetch(signUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({
      expiresIn: 60 * 60,
      download: options?.download ? upload.originalName || true : undefined,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    signedURL?: string;
    signedUrl?: string;
  };
  const signedPath = payload.signedURL || payload.signedUrl;

  if (!signedPath) {
    return null;
  }

  if (/^https?:\/\//i.test(signedPath)) {
    return signedPath;
  }

  return `${baseUrl}${signedPath.startsWith("/") ? "" : "/"}${signedPath}`;
}
