import "server-only";
import { prisma } from "@/lib/db";
import { legacyIncident, type PublicIncident, type PublicIncidents } from "./public-model";
type Row = { id:string; incidentType:PublicIncident["type"]; state:PublicIncident["state"]; reportedAt:Date; resolvedAt:Date|null; recovered:boolean; events:{state:string;at:string}[] };
export async function publicIncidents(reference:string, legacy:unknown):Promise<PublicIncidents> {
  const asOf = new Date().toISOString();
  try {
    // One SQL snapshot. No actor, notes, location, evidence or upload metadata selected.
    const rows = await prisma.$queryRaw<Row[]>`SELECT i.id,i."incidentType",i.state,i."reportedAt",i."resolvedAt",coalesce(i."resolutionReason"='RECOVERED',false) AS recovered,
      coalesce((SELECT jsonb_agg(jsonb_build_object('state',e."toState",'at',e."recordedAt") ORDER BY e.version) FROM incident_private."AssetIncidentEvent" e WHERE e."incidentId"=i.id),'[]'::jsonb) AS events
      FROM incident_private."AssetIncident" i JOIN public."RegistrationRequest" r ON r.id=i."registrationRequestId"
      WHERE r.reference=${reference} AND r."requestStatus"='passport_issued' AND r."deletedAt" IS NULL ORDER BY i."reportedAt" DESC,i.id`;
    if (!rows.length) return {...legacyIncident(legacy),asOf};
    const incidents = rows.map(r => ({reference:r.id,type:r.incidentType,state:r.state,reportedAt:r.reportedAt.toISOString(),resolvedAt:r.resolvedAt?.toISOString() ?? null,recovered:r.recovered,legacy:false,events:r.events.map(e => ({state:e.state,at:e.at}))}));
    return {current:incidents.find(i => i.state !== "RESOLVED") ?? incidents[0],history:incidents.filter(i => i.state === "RESOLVED"),uncertain:false,asOf};
  } catch {
    // Incident failure cannot turn an alert green or remove the issued passport.
    return {current:null,history:[],uncertain:true,asOf};
  }
}
