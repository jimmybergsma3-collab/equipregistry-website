import { getSession } from "@/lib/auth/getSession";
import * as service from "@/lib/organizations/service";

import * as governance from "@/lib/organizations/governance";

export const runtime = "nodejs";
const commands: Record<string,(input: unknown)=>Promise<unknown>> = {
  proposeMandate:governance.proposeMandate,
  readMandate:governance.readMandate,
  recordRetentionReview:governance.recordRetentionReview,
  acceptMandate:governance.acceptMandate,
  revokeMandate:governance.revokeMandate,
  applyMandate:governance.applyMandate,
  leaveOrganization:governance.leaveOrganization,
  previewOrganizationClosure:governance.previewOrganizationClosure,
  closeOrganization:governance.closeOrganization,
  changeDraftArchive:governance.changeDraftArchive,
  readArchivedDraft:governance.readArchivedDraft,
  createOrganization:service.createOrganization,
  activateOrganization:service.activateOrganization,
  setMembership:service.setMembership,
  createPrivateAsset:service.createPrivateAsset,
  readPrivateAsset:service.readPrivateAsset,
  correctPrivateAssetName:service.correctPrivateAssetName,
  readOrganizationAdministration:service.readOrganizationAdministration,
};
function reply(body: unknown,status=200) {
  return Response.json(body,{status,headers:{"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
}

// A separate private POST API; no existing registration/upload endpoint is reused.
export async function POST(request: Request) {
  if (!(await getSession()).isAuthenticated) return reply({error:"Unavailable"},401);
  // Next may use an internal hostname in request.url. Host is the browser's
  // actual request authority; never accept X-Forwarded-Host as CSRF authority.
  const url=new URL(request.url);
  const expectedOrigin=request.headers.has("host")?`${url.protocol}//${request.headers.get("host")}`:url.origin;
  if (request.headers.get("origin") !== expectedOrigin ||
      ![null,"same-origin"].includes(request.headers.get("sec-fetch-site"))) return reply({error:"Unavailable"},403);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return reply({error:"Unavailable"},415);
  const reader=request.body?.getReader();
  if (!reader) return reply({error:"Unavailable"},400);
  try {
    const chunks:Uint8Array[]=[];let size=0;
    while (true) {
      const {done,value}=await reader.read();if(done)break;
      size+=value.byteLength;
      if(size>16384){await reader.cancel();return reply({error:"Unavailable"},413);}
      chunks.push(value);
    }
    const body=JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(Buffer.concat(chunks)));
    if (!body || typeof body!=="object" || Array.isArray(body) || Object.keys(body).some(k=>!["command","input"].includes(k)) ||
        typeof body.command!=="string" || !Object.hasOwn(commands,body.command)) return reply({error:"Unavailable"},400);
    const data=await commands[body.command](body.input);
    return reply({data});
  } catch(error) {
    const status=error instanceof service.OrganizationError?error.status:error instanceof SyntaxError||error instanceof TypeError?400:503;
    return reply({error:"Unavailable"},status);
  } finally { reader.releaseLock(); }
}
