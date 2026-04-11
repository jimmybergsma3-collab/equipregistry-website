export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  bucketSupportsMultipleFiles,
  isUploadBucket,
  persistUploadFile,
} from "@/lib/registry/uploads";

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
