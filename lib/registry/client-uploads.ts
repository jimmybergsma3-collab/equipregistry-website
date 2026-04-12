"use client";

import {
  ALLOWED_UPLOAD_MIME_TYPES,
  COMPRESSIBLE_IMAGE_MIME_TYPES,
  MAX_UPLOAD_SIZE_BYTES,
  type StoredUpload,
} from "@/lib/registry/upload-types";

export type ClientUploadErrorCode =
  | "file_too_large"
  | "invalid_file_type"
  | "upload_failed";

export class ClientUploadError extends Error {
  constructor(public readonly code: ClientUploadErrorCode) {
    super(code);
    this.name = "ClientUploadError";
  }
}

function isAllowedUploadMimeType(file: File) {
  return !file.type || ALLOWED_UPLOAD_MIME_TYPES.includes(file.type as never);
}

function isCompressibleImage(file: File) {
  return COMPRESSIBLE_IMAGE_MIME_TYPES.includes(file.type as never);
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("image-load-failed"));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

async function optimizeImageFile(file: File) {
  if (!isCompressibleImage(file) || typeof window === "undefined") {
    return file;
  }

  try {
    const image = await loadImage(file);
    const attempts = [
      { maxDimension: 2200, quality: 0.82 },
      { maxDimension: 1800, quality: 0.76 },
      { maxDimension: 1440, quality: 0.72 },
    ];

    let bestFile = file;

    for (const attempt of attempts) {
      const scale = Math.min(
        1,
        attempt.maxDimension / Math.max(image.width, image.height)
      );
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) {
        return file;
      }

      context.drawImage(image, 0, 0, width, height);

      const blob = await canvasToBlob(canvas, file.type || "image/jpeg", attempt.quality);
      if (!blob) {
        continue;
      }

      const candidate = new File([blob], file.name, {
        type: blob.type || file.type,
        lastModified: file.lastModified,
      });

      if (candidate.size < bestFile.size) {
        bestFile = candidate;
      }

      if (bestFile.size <= MAX_UPLOAD_SIZE_BYTES) {
        break;
      }
    }

    return bestFile;
  } catch {
    return file;
  }
}

async function prepareUploadFile(file: File) {
  const prepared = await optimizeImageFile(file);

  if (!prepared.name || prepared.size <= 0) {
    throw new ClientUploadError("upload_failed");
  }

  if (!isAllowedUploadMimeType(prepared)) {
    throw new ClientUploadError("invalid_file_type");
  }

  if (prepared.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new ClientUploadError("file_too_large");
  }

  return prepared;
}

export async function uploadFilesForBucket(
  bucket: string,
  files: File[]
): Promise<StoredUpload[]> {
  const preparedFiles = [];

  for (const file of files) {
    preparedFiles.push(await prepareUploadFile(file));
  }

  const formData = new FormData();
  formData.set("bucket", bucket);

  for (const file of preparedFiles) {
    formData.append("files", file);
  }

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success || !Array.isArray(data.uploads)) {
    throw new ClientUploadError("upload_failed");
  }

  return data.uploads as StoredUpload[];
}
