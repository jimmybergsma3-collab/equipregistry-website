import { MAX_UPLOAD_SIZE_BYTES } from "@/lib/registry/upload-types";

// File signatures establish a plausible type, NOT a clean/safe document.
// Do not parse/render untrusted documents here or use this check to release intake.
export async function validateUploadContent(file: File): Promise<void> {
  if (file.size <= 0 || file.size > MAX_UPLOAD_SIZE_BYTES) throw new Error("Invalid upload size.");
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length !== file.size) throw new Error("Upload size does not match its content.");
  const head = bytes.subarray(0, 32);
  let kind = "";
  if (/^%PDF-(?:1\.[0-7]|2\.0)[\r\n]/.test(head.toString("latin1")) &&
      /%%EOF[\x00\t\n\r ]*$/.test(bytes.subarray(-1024).toString("latin1"))) kind = "pdf";
  else if (bytes.length >= 4 && head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff &&
      bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9) kind = "jpeg";
  else if (bytes.length >= 45 && head.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) &&
      head.readUInt32BE(8) === 13 && head.toString("ascii",12,16) === "IHDR" &&
      bytes.subarray(-12).equals(Buffer.from([0,0,0,0,73,69,78,68,174,66,96,130]))) kind = "png";
  else if (bytes.length >= 20 && head.toString("ascii",0,4) === "RIFF" &&
      head.toString("ascii",8,12) === "WEBP" && head.readUInt32LE(4) + 8 === bytes.length) kind = "webp";
  else if (bytes.length >= 24 && head.toString("ascii",4,8) === "ftyp" &&
      head.readUInt32BE(0) >= 24 && head.readUInt32BE(0) <= bytes.length &&
      ["heic","heix","hevc","hevx","mif1","msf1"].includes(head.toString("ascii",8,12))) kind = "heif";
  const types: Record<string, string[]> = {
    pdf: ["application/pdf","application/x-pdf"], jpeg: ["image/jpeg","image/jpg","image/pjpeg"],
    png: ["image/png","image/x-png"], webp: ["image/webp"],
    heif: ["image/heic","image/heic-sequence","image/heif","image/heif-sequence"],
  };
  const extensions: Record<string, string[]> = {pdf:["pdf"],jpeg:["jpg","jpeg"],png:["png"],webp:["webp"],heif:["heic","heif"]};
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!kind || !extensions[kind].includes(extension) || (file.type && !types[kind].includes(file.type.toLowerCase()))) {
    throw new Error("The file content does not match its document type. Please select the original file.");
  }
}
