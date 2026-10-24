export type PublicIncident = {
  reference: string;
  type: "STOLEN" | "MISSING";
  state: "PENDING_REVIEW" | "ACTIVE" | "RESOLVED";
  reportedAt: string | null;
  resolvedAt: string | null;
  recovered: boolean;
  legacy: boolean;
  events: { state: string; at: string }[];
};
export type PublicIncidents = { current: PublicIncident | null; history: PublicIncident[]; uncertain: boolean; asOf?:string };
export function legacyIncident(value: unknown): PublicIncidents {
  const empty: PublicIncidents = {current:null,history:[],uncertain:false};
  if (!value || typeof value !== "object" || Array.isArray(value)) return empty;
  const meta = value as Record<string, unknown>;
  if (!meta.__stolen) return {...empty, uncertain: ["stolen","verified_stolen"].includes(String(meta.__registryStatus))};
  const v = meta.__stolen as Record<string, unknown>;
  const state = v.status === "pending_review" ? "PENDING_REVIEW" : v.status === "open" ? "ACTIVE" : v.status === "resolved" ? "RESOLVED" : null;
  // Only recognize the existing generated reference format; never publish arbitrary legacy text.
  if (!state || typeof v.caseReference !== "string" || !/^ER-CASE-[A-Z0-9-]{1,60}$/.test(v.caseReference)) return {...empty,uncertain:true};
  const incident: PublicIncident = {reference:v.caseReference,type:"STOLEN",state,reportedAt:null,resolvedAt:null,recovered:false,legacy:true,events:[]};
  return {current:incident,history:state === "RESOLVED" ? [incident] : [],uncertain:false};
}
