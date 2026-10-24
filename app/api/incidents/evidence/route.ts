import { IncidentError, privateEvidenceUrl } from "@/lib/incidents/service";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const headers = { "Cache-Control": "private, no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" };
  try {
    const url = new URL(request.url);
    const signed = await privateEvidenceUrl(url.searchParams.get("registrationId") ?? "", url.searchParams.get("incidentId") ?? "", url.searchParams.get("evidenceId") ?? "");
    return new Response(null, { status: 302, headers: { ...headers, Location: signed } });
  } catch (error) {
    return new Response(null, { status: error instanceof IncidentError ? error.status : 503, headers });
  }
}
