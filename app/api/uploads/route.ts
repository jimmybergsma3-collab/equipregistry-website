export const runtime = "nodejs";

import { randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";
import {
  bucketSupportsMultipleFiles,
  getSupabaseAccessUrl,
  normalizeUploadBucket,
  validateUploadFile,
} from "@/lib/registry/uploads";
import {
  stripHeavyUploadPayloads,
  type StoredUpload,
} from "@/lib/registry/upload-types";
import type { UploadBucket } from "@/lib/registry/uploads";

const DEFAULT_SUPABASE_UPLOAD_BUCKET = "equipregistry-uploads";

function findStoredUpload(documents: unknown, fileId: string): StoredUpload | null {
  if (!documents || typeof documents !== "object" || Array.isArray(documents)) {
    return null;
  }

  for (const value of Object.values(documents as Record<string, unknown>)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      continue;
    }

    const files =
      "files" in value && Array.isArray(value.files)
        ? value.files
        : [];

    for (const file of files) {
      if (!file || typeof file !== "object" || !("id" in file)) {
        continue;
      }

      if (String(file.id) === fileId) {
        return file as StoredUpload;
      }
    }
  }

  return null;
}

function toNonEmptyString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseSupabaseStoragePath(value: string) {
  const raw = value.trim();
  if (!raw) {
    return null;
  }

  const normalizedRaw = raw.startsWith("supabase://")
    ? `https://supabase.local/storage/v1/object/${raw.slice("supabase://".length)}`
    : raw;

  let pathname = "";
  try {
    pathname = new URL(normalizedRaw, "https://supabase.local").pathname;
  } catch {
    pathname = normalizedRaw;
  }

  const segments = pathname.split("/").filter(Boolean);
  const objectMarker = segments.findIndex(
    (segment, index) =>
      segment === "storage" &&
      segments[index + 1] === "v1" &&
      segments[index + 2] === "object"
  );

  if (objectMarker < 0) {
    return null;
  }

  const mode = segments[objectMarker + 3];
  const modeOffset =
    mode === "public" || mode === "sign" || mode === "authenticated" ? 1 : 0;
  const bucket = toNonEmptyString(segments[objectMarker + 3 + modeOffset]);
  const objectPathSegments = segments
    .slice(objectMarker + 4 + modeOffset)
    .map((segment) => decodeURIComponent(segment));
  const objectPath = toNonEmptyString(objectPathSegments.join("/"));

  if (!bucket || !objectPath) {
    return null;
  }

  return {
    storageBucket: bucket,
    relativePath: objectPath,
  };
}

function normalizeRelativePathForSigning(
  rawPath: string | null,
  storageBucket: string
) {
  if (!rawPath) {
    return null;
  }

  let normalized = rawPath.replace(/^\/+/, "");

  const parsedFromStorageUrl = parseSupabaseStoragePath(normalized);
  if (parsedFromStorageUrl) {
    normalized = parsedFromStorageUrl.relativePath;
  }

  if (normalized.startsWith(`${storageBucket}/`)) {
    normalized = normalized.slice(storageBucket.length + 1);
  }

  normalized = normalized.replace(/^\/+/, "").trim();
  return normalized.length > 0 ? normalized : null;
}

function getConfiguredSupabaseUploadBucket() {
  return (
    toNonEmptyString(process.env.SUPABASE_UPLOAD_BUCKET) ||
    toNonEmptyString(process.env.SUPABASE_STORAGE_BUCKET) ||
    DEFAULT_SUPABASE_UPLOAD_BUCKET
  );
}

function resolveUploadLocation(upload: StoredUpload) {
  const source = upload as StoredUpload & Record<string, unknown>;
  const sourceUrl = toNonEmptyString(source.url);
  const parsedFromRelativePath = toNonEmptyString(upload.relativePath)
    ? parseSupabaseStoragePath(upload.relativePath)
    : null;
  const parsedFromUrl = sourceUrl
    ? parseSupabaseStoragePath(sourceUrl)
    : null;

  const storageBucket =
    toNonEmptyString(upload.storageBucket) ||
    parsedFromRelativePath?.storageBucket ||
    parsedFromUrl?.storageBucket ||
    getConfiguredSupabaseUploadBucket();

  const rawRelativePath =
    toNonEmptyString(upload.relativePath) ||
    toNonEmptyString(source.relativePath) ||
    toNonEmptyString(source.objectPath) ||
    toNonEmptyString(source.path) ||
    toNonEmptyString(source.key) ||
    parsedFromRelativePath?.relativePath ||
    parsedFromUrl?.relativePath ||
    null;

  const fallbackFolder = toNonEmptyString(upload.bucket);
  const fallbackStoredName = toNonEmptyString(upload.storedName);
  const fallbackRelativePath =
    rawRelativePath ||
    (fallbackStoredName
      ? fallbackFolder && fallbackFolder !== storageBucket
        ? `${fallbackFolder}/${fallbackStoredName}`
        : fallbackStoredName
      : null);

  const normalizedRelativePath = normalizeRelativePathForSigning(
    fallbackRelativePath,
    storageBucket
  );

  const originalFilename =
    toNonEmptyString(upload.originalName) ||
    toNonEmptyString(source.fileName) ||
    toNonEmptyString(source.name) ||
    toNonEmptyString(upload.storedName) ||
    "document";

  if (!storageBucket || !normalizedRelativePath) {
    return null;
  }

  return {
    storageBucket,
    relativePath: fallbackRelativePath,
    normalizedRelativePath,
    originalFilename,
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
    console.error("UPLOAD_CONFIG_ERROR", { hasSupabaseUrl: false });
    throw new UploadStorageError("Supabase URL is not configured.");
  }

  return raw.replace(/\/+$/, "");
}

function getSupabaseServiceRoleKey() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    console.error("UPLOAD_CONFIG_ERROR", { hasServiceRoleKey: false });
    throw new UploadStorageError("Supabase service role key is not configured.");
  }

  return serviceRoleKey;
}

async function uploadFileToSupabase(file: File, folder: UploadBucket) {
  const bucket = "equipregistry-uploads";
  const id = randomUUID();
  const uploadedAt = new Date().toISOString();
  const extension = getSafeExtension(file.name);
  const baseName = sanitizeBaseName(file.name) || "upload";
  const storedName = `${id}-${baseName}${extension}`;
  const storageBucket = bucket;
  const objectPath = `${folder}/${storedName}`;
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const uploadUrl = `${baseUrl}/storage/v1/object/${encodeURIComponent(
    storageBucket
  )}/${encodePathSegments(objectPath)}`;

  console.error("SUPABASE_URL_DEBUG", {
    supabaseUrlRaw: process.env.SUPABASE_URL ?? null,
    nextPublicSupabaseUrlRaw: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    uploadUrl,
    supabaseUrlTrimmed: (process.env.SUPABASE_URL ?? "").trim(),
    nextPublicSupabaseUrlTrimmed: (
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
    ).trim(),
    supabaseUrlStartsWithHttps: (process.env.SUPABASE_URL ?? "")
      .trim()
      .startsWith("https://"),
    nextPublicSupabaseUrlStartsWithHttps: (
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
    )
      .trim()
      .startsWith("https://"),
  });

  console.log("UPLOAD_TARGET", {
    storageBucket,
    objectPath,
  });

  let body: Blob;

  try {
    body = new Blob([await file.arrayBuffer()], {
      type: file.type || "application/octet-stream",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("UPLOAD_ARRAYBUFFER_FAILED", {
      message,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    });
    return NextResponse.json(
      {
        error: "Upload arrayBuffer failed",
        message,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
      },
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("UPLOAD_FETCH_FAILED", {
      message,
      uploadUrl,
      storageBucket,
      objectPath,
    });
    return NextResponse.json(
      {
        error: "Upload fetch failed",
        message,
        storageBucket,
        objectPath,
      },
      { status: 502 }
    );
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("UPLOAD_SUPABASE_FAILED", {
      status: response.status,
      statusText: response.statusText,
      body,
    });
    return NextResponse.json(
      {
        error: "Supabase upload failed",
        status: response.status,
        statusText: response.statusText,
        body,
      },
      { status: 502 }
    );
  }

  return {
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
  } satisfies StoredUpload;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const debug = url.searchParams.get("debug") === "1";
  let step = "start";
  const debugData: Record<string, unknown> = {};

  const debugResponse = (error: string | null = null) =>
    new Response(
      JSON.stringify(
        {
          requestId: debugData.requestId ?? null,
          fileId: debugData.fileId ?? null,
          download: debugData.download ?? null,
          step,
          storageBucket: debugData.storageBucket ?? null,
          relativePath: debugData.relativePath ?? null,
          normalizedRelativePath: debugData.normalizedRelativePath ?? null,
          originalFilename: debugData.originalFilename ?? null,
          signedUrlCreated: debugData.signedUrlCreated ?? false,
          signedUrlHost: debugData.signedUrlHost ?? null,
          upload: debugData.upload ?? null,
          error,
        },
        null,
        2
      ),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      }
    );

  const requestId = url.searchParams.get("requestId")?.trim() || "";
  const fileId = url.searchParams.get("fileId")?.trim() || "";
  const download = url.searchParams.get("download") === "1";

  step = "after-params";
  Object.assign(debugData, {
    requestId,
    fileId,
    download,
  });

  if (!requestId || !fileId) {
    if (debug) {
      return debugResponse("Missing file reference.");
    }

    return NextResponse.json({ error: "Missing file reference." }, { status: 400 });
  }

  const session = await getSession();
  step = "after-auth";

  if (!session.isAuthenticated) {
    if (debug) {
      return debugResponse("Not authenticated.");
    }

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
    if (debug) {
      return debugResponse("Not authenticated.");
    }

    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const registrationRequest = await prisma.registrationRequest.findUnique({
    where: { id: requestId },
    select: {
      userId: true,
      documents: true,
    },
  });
  step = "after-db-lookup";

  if (!registrationRequest) {
    if (debug) {
      return debugResponse("Registration not found.");
    }

    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  const isAdmin = authUser.role === "admin";
  const registrationOwnerId = registrationRequest.userId?.trim() || "";

  if (!isAdmin) {
    const isOwner =
      registrationOwnerId.length > 0 && registrationOwnerId === authUser.id;

    if (!isOwner) {
      if (debug) {
        return debugResponse("Forbidden.");
      }

      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  const upload = findStoredUpload(registrationRequest.documents, fileId);
  step = "after-upload-found";

  if (!upload) {
    if (debug) {
      return debugResponse("File not found.");
    }

    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const resolvedUpload = resolveUploadLocation(upload);

  Object.assign(debugData, {
    storageBucket: resolvedUpload?.storageBucket ?? null,
    relativePath: resolvedUpload?.relativePath ?? null,
    normalizedRelativePath: resolvedUpload?.normalizedRelativePath ?? null,
    originalFilename: resolvedUpload?.originalFilename ?? null,
    upload,
  });

  if (!resolvedUpload) {
    step = "upload-missing-data";

    if (debug) {
      return debugResponse("Upload metadata missing for signed URL.");
    }

    return NextResponse.json(
      { error: "Upload metadata missing for signed URL." },
      { status: 422 }
    );
  }

  const uploadForAccess: StoredUpload = {
    ...upload,
    storageBucket: resolvedUpload.storageBucket,
    relativePath: resolvedUpload.normalizedRelativePath,
    originalName: resolvedUpload.originalFilename,
  };

  step = "before-signed-url";
  let externalUrl: string | null = null;
  try {
    externalUrl = await getSupabaseAccessUrl(uploadForAccess, { download });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    step = "signed-url-error";
    Object.assign(debugData, { error: message });
    console.error("UPLOAD_SIGNED_URL_ERROR", {
      message,
      storageBucket: resolvedUpload.storageBucket,
      relativePath: resolvedUpload.normalizedRelativePath,
    });

    if (debug) {
      return debugResponse(message);
    }

    return NextResponse.json(
      { error: "Unable to create signed upload URL." },
      { status: 502 }
    );
  }

  step = "after-signed-url";
  Object.assign(debugData, {
    signedUrlCreated: Boolean(externalUrl),
    signedUrlHost: externalUrl
      ? (() => {
          try {
            return new URL(externalUrl).host;
          } catch {
            return null;
          }
        })()
      : null,
  });

  if (externalUrl) {
    if (debug) {
      return debugResponse(null);
    }

    return NextResponse.redirect(externalUrl);
  }

  console.error("UPLOAD_SIGNED_URL_MISSING", {
    storageBucket: upload.storageBucket,
    relativePath: upload.relativePath,
  });

  if (debug) {
    return debugResponse("Unable to create signed upload URL.");
  }

  return NextResponse.json(
    { error: "Unable to create signed upload URL." },
    { status: 502 }
  );
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const bucketValue = String(formData.get("bucket") || "").trim();
    const bucket = normalizeUploadBucket(bucketValue);

    console.info("UPLOAD_FORMDATA_RECEIVED", {
      bucket: bucketValue || null,
      resolvedBucket: bucket,
      fileTypes: formData
        .getAll("files")
        .filter(isUploadedFile)
        .map((file) => file.type || "unknown"),
      singleFileType:
        isUploadedFile(formData.get("file"))
          ? (formData.get("file") as File).type || "unknown"
          : null,
    });

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

    console.log("UPLOAD_FILE_ENTRIES_CHECK", {
      filesCount: files.length,
      singleFilePresent: Boolean(singleFile),
      fileEntriesLength: fileEntries.length,
    });

    console.log("UPLOAD_DEBUG_FULL", {
      keys: Array.from(formData.keys()),
      filesRawCount: formData.getAll("files").length,
      singleFilePresent: Boolean(formData.get("file")),
      documentsRawCount: formData.getAll("documents").length,
      singleDocumentPresent: Boolean(formData.get("document")),
      fileEntriesLength: fileEntries.length,
    });

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

    const uploads = [];

    for (const file of fileEntries) {
      console.log("UPLOAD_MIME_CHECK", {
        fileName: file.name,
        mimeType: file.type,
      });
      validateUploadFile(file);
      const upload = await uploadFileToSupabase(file, bucket);

      if (upload instanceof NextResponse) {
        return upload;
      }

      uploads.push(stripHeavyUploadPayloads(upload));
    }

    return NextResponse.json({ success: true, uploads });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed unexpectedly.";
    const status = error instanceof UploadStorageError ? error.statusCode : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
