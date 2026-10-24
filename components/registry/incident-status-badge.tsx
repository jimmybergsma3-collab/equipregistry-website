import type { ReactNode } from "react";
import { publicIncidents } from "@/lib/incidents/public-read";
import { incidentPresentation } from "@/lib/i18n/incident-status";
export default async function IncidentStatusBadge({reference,lang,issued,fallback}:{reference:string;lang:string;issued:boolean;fallback:ReactNode}) {
 if(!issued) return fallback;
 const view=incidentPresentation(await publicIncidents(reference,{}),lang);
 if(!view) return fallback;
 return <span className={`inline-flex rounded border px-3 py-1 text-sm ${view.tone==="danger"?"border-red-300 bg-red-50 text-red-800":view.tone==="warning"?"border-amber-300 bg-amber-50 text-amber-900":"border-slate-300 bg-slate-50 text-slate-800"}`}>{view.label} — {view.state}</span>;
}
