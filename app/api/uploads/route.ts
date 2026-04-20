export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";
import {
  bucketSupportsMultipleFiles,
  getSupabaseAccessUrl,
  isUploadBucket,
  persistUploadFile,
  readStoredUpload,
} from "@/lib/registry/uploads";
import type { StoredUpload } from "@/lib/registry/upload-types";

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

    if (!isUploadBucket(bucketValue)) {
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

    if (!bucketSupportsMultipleFiles(bucketValue) && fileEntries.length > 1) {
      return NextResponse.json(
        { error: "Only one file is allowed for this document type." },
        { status: 400 }
      );
    }

    const uploads = [];

    for (const file of fileEntries) {
      uploads.push(await persistUploadFile(file, bucketValue));
    }

    return NextResponse.json({ success: true, uploads });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed unexpectedly.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
