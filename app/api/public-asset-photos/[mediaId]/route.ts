import { publicPhotoBytes } from "@/lib/asset-photos/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, context: { params: Promise<{ mediaId: string }> }) {
  const { mediaId } = await context.params;
  const bytes = await publicPhotoBytes(mediaId);
  return new Response(bytes ? new Uint8Array(bytes) : null, { status: bytes ? 200 : 404, headers: {
    "Content-Type": bytes ? "image/webp" : "text/plain",
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Content-Security-Policy": "default-src 'none'; sandbox",
  } });
}
