import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { sha256 } from "./policy";

// Intentionally no production storage adapter, signed URL or remote fetch fallback.
export function assertSyntheticPhotoEnvironment() {
  const url = new URL(process.env.ER_REGISTRATION_DATABASE_URL ?? "http://invalid");
  if (process.env.ER_PHOTO_STORAGE_MODE !== "synthetic-local" ||
      !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
      !url.pathname.startsWith("/synthetic_2c") || !process.env.ER_PHOTO_LOCAL_ROOT ||
      !path.isAbsolute(process.env.ER_PHOTO_LOCAL_ROOT)) throw new Error("Photo publication unavailable.");
  return process.env.ER_PHOTO_LOCAL_ROOT;
}
function localPath(area: "sources" | "variants", key: string) {
  if (!/^[a-f0-9]{64}$/.test(key)) throw new Error("Photo publication unavailable.");
  return path.join(assertSyntheticPhotoEnvironment(), area, key);
}
export async function readSource(hash: string) {
  const bytes = await fs.readFile(localPath("sources", hash));
  if (bytes.length > 10 * 1024 * 1024 || sha256(bytes) !== hash) throw new Error("Photo publication unavailable.");
  return bytes;
}
export async function prepareVariant(source: Buffer, declaredMime: string) {
  const decoder = sharp(source, { limitInputPixels: 40_000_000, animated: false, failOn: "warning" });
  const meta = await decoder.metadata();
  const formats: Record<string, string> = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };
  if (!meta.format || formats[meta.format] !== declaredMime || (meta.pages ?? 1) !== 1) throw new Error("Photo publication unavailable.");
  // Fresh raster encoding strips EXIF/GPS/XMP/ICC; visible private content still requires human review.
  const { data, info } = await decoder.rotate().resize({ width: 1600, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer({ resolveWithObject: true });
  const hash = sha256(data);
  const target = localPath("variants", hash);
  await fs.mkdir(path.dirname(target), { recursive: true });
  try { await fs.writeFile(target, data, { flag: "wx" }); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error; }
  if (sha256(await fs.readFile(target)) !== hash) throw new Error("Photo publication unavailable.");
  return { variantObjectKey: hash, variantSha256: hash, variantMimeType: "image/webp", variantWidth: info.width, variantHeight: info.height };
}
export async function readVariant(row: { variantObjectKey: string; variantSha256: string; variantMimeType: string; variantWidth: number; variantHeight: number }) {
  if (row.variantMimeType !== "image/webp") throw new Error("Photo publication unavailable.");
  const bytes = await fs.readFile(localPath("variants", row.variantObjectKey));
  if (sha256(bytes) !== row.variantSha256) throw new Error("Photo publication unavailable.");
  const metadata = await sharp(bytes).metadata();
  if (metadata.format !== "webp" || metadata.width !== row.variantWidth || metadata.height !== row.variantHeight || metadata.exif || metadata.xmp || metadata.icc) throw new Error("Photo publication unavailable.");
  return bytes;
}
