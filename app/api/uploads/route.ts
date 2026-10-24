export const runtime = "nodejs";

import { createHash, randomUUID } from "node:crypto";
import { validateUploadContent } from "@/lib/registry/upload-content";
import { assertPrivateIntakeReady } from "@/lib/registry/private-intake";
import { assertUploadIntakeAvailable, boundUploadRequest, MAX_UPLOAD_BATCH_BYTES, MAX_UPLOAD_BATCH_FILES } from "@/lib/registry/upload-intake";
import {
  BOUND_UPLOAD_SEGMENT,
  bindNewUpload,
  requireUploadBindingKey,
  storedUploadProvenance,
} from "@/lib/registry/upload-binding";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";
import {
  bucketSupportsMultipleFiles,
  getSupabaseAccessUrl,
  normalizeUploadBucket,
  resolveSupabaseSigningTarget,
  validateUploadFile,
} from "@/lib/registry/uploads";
import {
  stripHeavyUploadPayloads,
  type StoredUpload,
} from "@/lib/registry/upload-types";
import type { UploadBucket } from "@/lib/registry/uploads";

type UploadSearchResult = {
  upload: StoredUpload | null;
  matchedLocation: string | null;
  searchScopes: string[];
  uploadsFound: number;
};

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function collectUploadsFromValue(
  value: unknown,
  location: string,
  entries: Array<{ upload: StoredUpload; location: string }>
) {
  if (Array.isArray(value)) {
    for (const [index, entry] of value.entries()) {
      collectUploadsFromValue(entry, `${location}[${index}]`, entries);
    }
    return;
  }

  if (!isObjectRecord(value)) {
    return;
  }

  const hasUploadLikeFields =
    typeof value.id !== "undefined" &&
    (typeof value.relativePath === "string" ||
      typeof value.storedName === "string" ||
      typeof value.originalName === "string");

  if (hasUploadLikeFields) {
    entries.push({ upload: value as StoredUpload, location });
  }

  if (Array.isArray(value.files)) {
    for (const [index, fileEntry] of value.files.entries()) {
      if (isObjectRecord(fileEntry) && typeof fileEntry.id !== "undefined") {
        entries.push({
          upload: fileEntry as StoredUpload,
          location: `${location}.files[${index}]`,
        });
      }
      collectUploadsFromValue(fileEntry, `${location}.files[${index}]`, entries);
    }
  }

  for (const [key, nested] of Object.entries(value)) {
    if (key === "files") {
      continue;
    }
    collectUploadsFromValue(nested, `${location}.${key}`, entries);
  }
}

function findStoredUploadInRegistration(
  registration: {
    documents?: unknown;
    dynamicFields?: unknown;
    uploads?: unknown;
  },
  fileId: string
): UploadSearchResult {
  const scopes: Array<{ name: string; value: unknown }> = [
    { name: "registration.documents", value: registration.documents },
    { name: "registration.uploads", value: registration.uploads },
    { name: "registration.dynamicFields", value: registration.dynamicFields },
  ];

  const entries: Array<{ upload: StoredUpload; location: string }> = [];
  const searchScopes: string[] = [];

  for (const scope of scopes) {
    searchScopes.push(scope.name);
    collectUploadsFromValue(scope.value, scope.name, entries);
  }

  const match = entries.find((entry) => String(entry.upload.id) === fileId) ?? null;

  return {
    upload: match?.upload ?? null,
    matchedLocation: match?.location ?? null,
    searchScopes,
    uploadsFound: entries.length,
  };
}

class UploadStorageError extends Error {
  statusCode = 502;
}

function isUploadedFile(entry: FormDataEntryValue | null): entry is File {
  if (entry instanceof File) {
    return true;
  }

  if (!entry || typeof entry !== "object") {
    return false;
  }

  const candidate = entry as {
    arrayBuffer?: unknown;
    name?: unknown;
    size?: unknown;
  };

  return (
    typeof candidate.name === "string" &&
    typeof candidate.size === "number" &&
    typeof candidate.arrayBuffer === "function"
  );
}

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
    throw new UploadStorageError("Supabase URL is not configured.");
  }

  return raw.replace(/\/+$/, "");
}

function getSupabaseServiceRoleKey() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    throw new UploadStorageError("Supabase service role key is not configured.");
  }

  return serviceRoleKey;
}

async function uploadFileToSupabase(file: File, folder: UploadBucket, uploaderId: string) {
  requireUploadBindingKey();
  const bucket = "equipregistry-uploads";
  const id = randomUUID();
  const uploadedAt = new Date().toISOString();
  const extension = getSafeExtension(file.name);
  const baseName = sanitizeBaseName(file.name) || "upload";
  const storedName = `${id}-${baseName}${extension}`;
  const storageBucket = bucket;
  const objectPath = `${folder}/${BOUND_UPLOAD_SEGMENT}/${storedName}`;
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const uploadUrl = `${baseUrl}/storage/v1/object/${encodeURIComponent(
    storageBucket
  )}/${encodePathSegments(objectPath)}`;

  let body: Blob;
  let contentSha256: string;

  try {
    const bytes = await file.arrayBuffer();
    contentSha256 = createHash("sha256").update(Buffer.from(bytes)).digest("hex");
    body = new Blob([bytes], {
      type: file.type || "application/octet-stream",
    });
  } catch {
    return NextResponse.json(
      { error: "Upload storage failed. Please try again." },
      { status: 502 }
    );
  }

  let response: Response;

  try {
    response = await fetch(uploadUrl, {
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
  } catch {
    return NextResponse.json(
      { error: "Upload storage failed. Please try again." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "Upload storage failed. Please try again." },
      { status: 502 }
    );
  }

  return bindNewUpload({
    id,
    bucket,
    storageBucket,
    originalName: file.name,
    storedName,
    relativePath: objectPath,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt,
    storage: "supabase",
    contentSha256,
  } satisfies StoredUpload, uploaderId);
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  const requestId = url.searchParams.get("requestId")?.trim() || "";
  const fileId = url.searchParams.get("fileId")?.trim() || "";
  const download = url.searchParams.get("download") === "1";

  if (!fileId) {
    return NextResponse.json({ error: "Missing file reference." }, { status: 400 });
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const authUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
    },
  });

  if (!authUser) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const isAdmin = authUser.role === "admin";
  let fallbackUsed = false;
  let registrationRequest: {
    id: string;
    userId: string;
    documents: unknown;
    dynamicFields: unknown;
  } | null = null;
  let uploadSearchResult: UploadSearchResult | null = null;

  if (requestId) {
    registrationRequest = await prisma.registrationRequest.findUnique({
      where: { id: requestId },
      select: {
        id: true,
        userId: true,
        documents: true,
        dynamicFields: true,
      },
    });

    if (registrationRequest) {
      uploadSearchResult = findStoredUploadInRegistration(registrationRequest, fileId);
      if (!uploadSearchResult.upload) {
        fallbackUsed = true;
      }
    } else {
      fallbackUsed = true;
    }
  } else {
    fallbackUsed = true;
  }

  if (fallbackUsed) {
    const fallbackCandidates = await prisma.registrationRequest.findMany({
      where: isAdmin
        ? { deletedAt: null }
        : { deletedAt: null, userId: authUser.id },
      select: {
        id: true,
        userId: true,
        documents: true,
        dynamicFields: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    registrationRequest = null;
    uploadSearchResult = null;
    for (const candidate of fallbackCandidates) {
      const candidateResult = findStoredUploadInRegistration(candidate, fileId);
      if (candidateResult.upload) {
        registrationRequest = candidate;
        uploadSearchResult = candidateResult;
        break;
      }
    }
  }

  if (!registrationRequest || !uploadSearchResult?.upload) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const registrationOwnerId = registrationRequest.userId?.trim() || "";

  if (!isAdmin) {
    const isOwner =
      registrationOwnerId.length > 0 && registrationOwnerId === authUser.id;

    if (!isOwner) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  const upload = uploadSearchResult.upload;

  if (storedUploadProvenance(upload, registrationOwnerId) === "invalid") {
    return NextResponse.json({ error: "Upload ownership could not be verified." }, { status: 403 });
  }

  const storageBucket =
    typeof upload.storageBucket === "string"
      ? upload.storageBucket.trim()
      : "";
  const originalRelativePath =
    typeof upload.relativePath === "string"
      ? upload.relativePath.trim()
      : "";
  const normalizedRelativePath = originalRelativePath.replace(/^\/+/, "");
  const resolvedDocumentFolder =
    typeof upload.bucket === "string" ? upload.bucket.trim().replace(/^\/+|\/+$/g, "") : "";
  const finalNormalizedRelativePath =
    normalizedRelativePath.includes("/")
      ? normalizedRelativePath
      : normalizedRelativePath && resolvedDocumentFolder
        ? `${resolvedDocumentFolder}/${normalizedRelativePath}`
        : "";
  const originalFilename =
    typeof upload.originalName === "string" && upload.originalName.trim().length > 0
      ? upload.originalName
      : "document";

  if (!storageBucket || !normalizedRelativePath) {
    return NextResponse.json(
      { error: "Upload metadata missing for signed URL." },
      { status: 422 }
    );
  }

  if (!normalizedRelativePath.includes("/") && !resolvedDocumentFolder) {
    return NextResponse.json(
      { error: "Upload folder/type missing for filename-only relativePath." },
      { status: 422 }
    );
  }

  if (!finalNormalizedRelativePath) {
    return NextResponse.json(
      { error: "Upload path could not be resolved for signed URL." },
      { status: 422 }
    );
  }

  const uploadForAccess: StoredUpload = {
    ...upload,
    storageBucket,
    relativePath: finalNormalizedRelativePath,
    originalName: originalFilename,
  };

  const signingTarget = resolveSupabaseSigningTarget(uploadForAccess);

  if (!signingTarget) {
    return NextResponse.json(
      { error: "Upload signing path could not be resolved." },
      { status: 422 }
    );
  }

  let signedUrlResult:
    | {
        rawSignedUrl: string;
        redirectUrl: string;
      }
    | null = null;
  try {
    signedUrlResult = await getSupabaseAccessUrl(uploadForAccess, { download });
  } catch {
    return NextResponse.json(
      { error: "Unable to create signed upload URL." },
      { status: 502 }
    );
  }

  const redirectUrl = signedUrlResult?.redirectUrl ?? null;

  if (redirectUrl) {
    try {
      return new Response(null, {
        status: 302,
        headers: {
          Location: redirectUrl,
          "cache-control": "no-store",
        },
      });
    } catch {
      return NextResponse.json(
        { error: "Unable to redirect to signed upload URL." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    { error: "Unable to create signed upload URL." },
    { status: 502 }
  );
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session.isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    try {
      assertUploadIntakeAvailable();
    } catch {
      return NextResponse.json({ error: "Document uploads are temporarily unavailable. Please contact support." }, { status: 503 });
    }
    request = await boundUploadRequest(request);
    const formData = await request.formData();
    const bucketValue = String(formData.get("bucket") || "").trim();
    const bucket = normalizeUploadBucket(bucketValue);

    if (!bucket) {
      return NextResponse.json(
        { error: "Unsupported upload bucket." },
        { status: 400 }
      );
    }

    const files = formData.getAll("files");
    const singleFile = formData.get("file");
    const documents = formData.getAll("documents");
    const singleDocument = formData.get("document");
    const fileEntries = [
      ...files,
      singleFile,
      ...documents,
      singleDocument,
    ].filter(isUploadedFile);

    if (fileEntries.length === 0) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (!bucketSupportsMultipleFiles(bucket) && fileEntries.length > 1) {
      return NextResponse.json(
        { error: "Only one file is allowed for this document type." },
        { status: 400 }
      );
    }

    // Validate the entire batch before the first storage write.
    if (fileEntries.length > MAX_UPLOAD_BATCH_FILES || fileEntries.reduce((total, file) => total + file.size, 0) > MAX_UPLOAD_BATCH_BYTES) {
      return NextResponse.json({ error: "Please upload fewer files at once (maximum 10 files and 20 MB)." }, { status: 400 });
    }
    for (const file of fileEntries) validateUploadFile(file);
    // Check every file before writing any part of the batch. This is not malware clearance.
    for (const file of fileEntries) await validateUploadContent(file);
    try {
      await assertPrivateIntakeReady();
    } catch {
      return NextResponse.json({ error: "Document uploads are temporarily unavailable. Please contact support." }, { status: 503 });
    }
    const uploads = [];

    for (const file of fileEntries) {
      try {
        validateUploadFile(file);
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Invalid upload file." },
          { status: 400 }
        );
      }
      const upload = await uploadFileToSupabase(file, bucket, session.user.id);

      if (upload instanceof NextResponse) {
        return upload;
      }

      uploads.push(stripHeavyUploadPayloads(upload));
    }

    return NextResponse.json({ success: true, uploads });
  } catch (error) {
    const message =
      error instanceof UploadStorageError ? "Upload storage failed. Please try again." : "Upload failed unexpectedly.";
    const status = error instanceof UploadStorageError ? error.statusCode : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
