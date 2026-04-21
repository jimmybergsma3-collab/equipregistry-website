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
  readStoredUpload,
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

function getDownloadFileName(upload: StoredUpload) {
  return (upload.originalName || upload.storedName || "document")
    .replace(/[\r\n"]/g, "")
    .trim();
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
    throw new Error("Supabase URL is not configured.");
  }

  return raw.replace(/\/+$/, "");
}

function getSupabaseServiceRoleKey() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    throw new Error("Supabase service role key is not configured.");
  }

  return serviceRoleKey;
}

async function uploadFileToSupabase(file: File, bucket: UploadBucket) {
  const configuredBucket =
    process.env.SUPABASE_UPLOAD_BUCKET ||
    process.env.SUPABASE_STORAGE_BUCKET;

  if (!configuredBucket) {
    throw new Error("Supabase upload bucket is not configured.");
  }

  const id = randomUUID();
  const uploadedAt = new Date().toISOString();
  const extension = getSafeExtension(file.name);
  const baseName = sanitizeBaseName(file.name) || "upload";
  const storedName = `${id}-${baseName}${extension}`;
  const storageBucket = configuredBucket;
  const objectPath = `${bucket}/${storedName}`;
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  const uploadUrl = `${baseUrl}/storage/v1/object/${encodeURIComponent(
    storageBucket
  )}/${encodePathSegments(objectPath)}`;

  console.log("UPLOAD_TARGET", {
    storageBucket,
    objectPath,
  });

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
      storageBucket,
      objectPath,
      status: response.status,
      details: details.slice(0, 300),
    });
    throw new Error("Upload storage failed. Please try again.");
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

  if (externalUrl) {
    return NextResponse.redirect(externalUrl);
  }

  const { buffer, mimeType, fileName } = await readStoredUpload(upload);
  const disposition = download ? "attachment" : "inline";
  const safeName = encodeURIComponent(getDownloadFileName({ ...upload, originalName: fileName }));

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
      "Content-Length": String(buffer.length),
      "Cache-Control": "private, no-store, max-age=0",
      "Content-Disposition": `${disposition}; filename*=UTF-8''${safeName}`,
      "X-Content-Type-Options": "nosniff",
    },
  });
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
        .filter((entry): entry is File => entry instanceof File)
        .map((file) => file.type || "unknown"),
      singleFileType:
        formData.get("file") instanceof File
          ? (formData.get("file") as File).type || "unknown"
          : null,
    });

    if (!bucket) {
      return NextResponse.json(
        { error: "Unsupported upload bucket." },
        { status: 400 }
      );
    }

    const fileEntries = formData
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File);

    if (fileEntries.length === 0) {
      const singleFile = formData.get("file");
      if (singleFile instanceof File) {
        fileEntries.push(singleFile);
      }
    }

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
      validateUploadFile(file);
      uploads.push(stripHeavyUploadPayloads(await uploadFileToSupabase(file, bucket)));
    }

    return NextResponse.json({ success: true, uploads });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed unexpectedly.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
