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
      if (
        file &&
        typeof file === "object" &&
        "id" in file &&
        file.id === fileId &&
        "originalName" in file &&
        "storedName" in file &&
        "relativePath" in file &&
        "mimeType" in file &&
        "size" in file &&
        "uploadedAt" in file
      ) {
        return file as StoredUpload;
      }
    }
  }

  return null;
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
  const session = await getSession();

  if (!session.isAuthenticated) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const url = new URL(request.url);
  const requestId = url.searchParams.get("requestId")?.trim() || "";
  const fileId = url.searchParams.get("fileId")?.trim() || "";
  const download = url.searchParams.get("download") === "1";
  const debug = url.searchParams.get("debug") === "1";

  if (!requestId || !fileId) {
    return NextResponse.json({ error: "Missing file reference." }, { status: 400 });
  }

  const registrationRequest = await prisma.registrationRequest.findUnique({
    where: { id: requestId },
    select: {
      userId: true,
      documents: true,
    },
  });

  if (!registrationRequest) {
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }

  const isAdmin = session.user.role === "admin";
  const isOwner = registrationRequest.userId === session.user.id;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const upload = findStoredUpload(registrationRequest.documents, fileId);

  if (!upload) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const externalUrl = await getSupabaseAccessUrl(upload, { download });
  const signedUrlHost = externalUrl
    ? new URL(externalUrl).host
    : null;

  if (debug) {
    return NextResponse.json({
      requestId,
      kind: fileId,
      download,
      storageBucket: upload.storageBucket ?? null,
      relativePath: upload.relativePath,
      signedUrlCreated: Boolean(externalUrl),
      signedUrlHost,
      error: externalUrl ? null : "Unable to create signed upload URL.",
    });
  }

  if (externalUrl) {
    return NextResponse.redirect(externalUrl);
  }

  console.error("UPLOAD_SIGNED_URL_MISSING", {
    storageBucket: upload.storageBucket,
    relativePath: upload.relativePath,
  });

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
