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

  const debugResponse = (error: string | null = null, status = 200) =>
    new Response(
      JSON.stringify(
        {
          requestId: debugData.requestId ?? null,
          fileId: debugData.fileId ?? null,
          download: debugData.download ?? null,
          fallbackUsed: debugData.fallbackUsed ?? false,
          fallbackCandidateCount: debugData.fallbackCandidateCount ?? 0,
          foundRegistrationId: debugData.foundRegistrationId ?? null,
          registrationId: debugData.registrationId ?? null,
          registrationKeys: debugData.registrationKeys ?? null,
          searchScopes: debugData.searchScopes ?? null,
          uploadsFound: debugData.uploadsFound ?? null,
          uploadMatchedLocation: debugData.uploadMatchedLocation ?? null,
          registration: debugData.registration ?? null,
          step,
          storageBucket: debugData.storageBucket ?? null,
          relativePath: debugData.originalRelativePath ?? null,
          resolvedDocumentFolder: debugData.resolvedDocumentFolder ?? null,
          normalizedRelativePath: debugData.finalNormalizedRelativePath ?? null,
          finalPathPassedToSigning:
            debugData.finalPathPassedToSigning ?? null,
          signedUrlCreated: debugData.signedUrlCreated ?? false,
          rawSignedUrl: debugData.rawSignedUrl ?? null,
          redirectUrl: debugData.redirectUrl ?? null,
          signedUrlHost: debugData.signedUrlHost ?? null,
          upload: debugData.upload ?? null,
          error,
        },
        null,
        2
      ),
      {
        status,
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

  if (!fileId) {
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

  const isAdmin = authUser.role === "admin";
  let fallbackUsed = false;
  let registrationRequest: {
    id: string;
    userId: string;
    documents: unknown;
    dynamicFields: unknown;
  } | null = null;
  let uploadSearchResult: UploadSearchResult | null = null;
  let fallbackCandidateCount = 0;

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
    step = "after-db-lookup";

    if (registrationRequest) {
      uploadSearchResult = findStoredUploadInRegistration(registrationRequest, fileId);
      if (!uploadSearchResult.upload) {
        fallbackUsed = true;
        step = "requestid-mismatch-fallback";
      }
    } else {
      fallbackUsed = true;
      step = "requestid-not-found-fallback";
    }
  } else {
    fallbackUsed = true;
    step = "no-requestid-fallback";
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
    step = "fallback-search";
    fallbackCandidateCount = fallbackCandidates.length;

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
    step = "after-fallback-search";
  }

  Object.assign(debugData, {
    fallbackUsed,
    fallbackCandidateCount,
    foundRegistrationId: registrationRequest?.id ?? null,
    registrationId: registrationRequest?.id ?? null,
    registrationKeys: registrationRequest
      ? Object.keys(registrationRequest as Record<string, unknown>)
      : null,
    searchScopes: uploadSearchResult?.searchScopes ?? null,
    uploadsFound: uploadSearchResult?.uploadsFound ?? 0,
    uploadMatchedLocation: uploadSearchResult?.matchedLocation ?? null,
    registration: registrationRequest,
  });

  if (!registrationRequest || !uploadSearchResult?.upload) {
    if (debug) {
      return debugResponse("File not found.");
    }

    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

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

  const upload = uploadSearchResult.upload;
  step = "after-upload-search";

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

  Object.assign(debugData, {
    storageBucket: storageBucket || null,
    originalRelativePath: originalRelativePath || null,
    resolvedDocumentFolder: resolvedDocumentFolder || null,
    finalNormalizedRelativePath: finalNormalizedRelativePath || null,
    upload,
  });

  if (!storageBucket || !normalizedRelativePath) {
    step = "upload-missing-data";

    if (debug) {
      return debugResponse("Upload metadata missing for signed URL.", 422);
    }

    return NextResponse.json(
      { error: "Upload metadata missing for signed URL." },
      { status: 422 }
    );
  }

  if (!normalizedRelativePath.includes("/") && !resolvedDocumentFolder) {
    step = "upload-missing-folder";

    if (debug) {
      return debugResponse(
        "Upload folder/type missing for filename-only relativePath.",
        422
      );
    }

    return NextResponse.json(
      { error: "Upload folder/type missing for filename-only relativePath." },
      { status: 422 }
    );
  }

  if (!finalNormalizedRelativePath) {
    step = "upload-missing-data";

    if (debug) {
      return debugResponse("Upload path could not be resolved for signed URL.", 422);
    }

    return NextResponse.json(
      { error: "Upload path could not be resolved for signed URL." },
      { status: 422 }
    );
  }

  console.log("UPLOAD_SIGNED_PATH_RESOLUTION", {
    storageBucket,
    originalRelativePath,
    resolvedDocumentFolder: resolvedDocumentFolder || null,
    finalNormalizedRelativePath,
  });

  const uploadForAccess: StoredUpload = {
    ...upload,
    storageBucket,
    relativePath: finalNormalizedRelativePath,
    originalName: originalFilename,
  };

  const signingTarget = resolveSupabaseSigningTarget(uploadForAccess);
  Object.assign(debugData, {
    finalPathPassedToSigning: signingTarget?.finalPathPassedToSigning ?? null,
  });

  console.log("UPLOAD_SIGNED_FINAL_PATH", {
    storageBucket,
    relativePathFromDb: originalRelativePath || null,
    normalizedRelativePath: finalNormalizedRelativePath || null,
    finalPathPassedToSigning: signingTarget?.finalPathPassedToSigning ?? null,
  });

  if (!signingTarget) {
    step = "upload-missing-signing-path";

    if (debug) {
      return debugResponse("Upload signing path could not be resolved.", 422);
    }

    return NextResponse.json(
      { error: "Upload signing path could not be resolved." },
      { status: 422 }
    );
  }

  step = "before-signed-url";
  let signedUrlResult:
    | {
        rawSignedUrl: string;
        redirectUrl: string;
      }
    | null = null;
  try {
    signedUrlResult = await getSupabaseAccessUrl(uploadForAccess, { download });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    step = "signed-url-error";
    Object.assign(debugData, { error: message });
    console.error("UPLOAD_SIGNED_URL_ERROR", {
      message,
      storageBucket,
      relativePath: finalNormalizedRelativePath,
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
  const redirectUrl = signedUrlResult?.redirectUrl ?? null;
  const rawSignedUrl = signedUrlResult?.rawSignedUrl ?? null;
  Object.assign(debugData, {
    signedUrlCreated: Boolean(rawSignedUrl),
    rawSignedUrl,
    redirectUrl,
    signedUrlHost: redirectUrl
      ? (() => {
          try {
            return new URL(redirectUrl).host;
          } catch {
            return null;
          }
        })()
      : null,
  });

  if (redirectUrl) {
    if (debug) {
      return debugResponse(null);
    }

    return NextResponse.redirect(redirectUrl);
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
