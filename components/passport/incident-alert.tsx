import type { PublicIncidents } from "@/lib/incidents/public-model";
import { incidentPresentation, incidentWords } from "@/lib/i18n/incident-status";
export default function IncidentAlert({data,lang}:{data:PublicIncidents;lang:string}) {
 const view=incidentPresentation(data,lang),w=incidentWords(lang);
 if(!view) return null;
 const i=data.current;
 return <section aria-label={view.label} data-incident-state={i?.state ?? "UNKNOWN"} className={`mb-5 break-inside-avoid rounded-xl border-2 p-5 print:rounded-none print:border-black ${view.tone==="danger"?"border-red-600 bg-red-50 text-red-950":view.tone==="warning"?"border-amber-600 bg-amber-50 text-amber-950":"border-slate-500 bg-slate-50 text-slate-900"}`}>
  <h2 className="text-xl font-bold">{view.label} — {view.state}</h2><p className="mt-2 text-sm">{view.message}</p>
  {i ? <dl className="mt-3 text-sm [overflow-wrap:anywhere]"><dt className="font-semibold">{w.reference}</dt><dd>{i.reference}</dd>{i.reportedAt?<><dt>{w.reported}</dt><dd>{i.reportedAt.slice(0,10)}</dd></>:null}{i.resolvedAt?<><dt>{w.closed}</dt><dd>{i.resolvedAt.slice(0,10)}</dd></>:null}</dl>:null}
  {i?.legacy?<p className="mt-2 text-sm">{w.legacy}</p>:null}
  <p className="mt-3 text-xs">{w.snapshot}{data.asOf ? <> <time dateTime={data.asOf}>{data.asOf.replace("T"," ").replace(/\.\d+Z$/," UTC")}</time></> : null}</p>
 </section>;
}

export function IncidentHistory({data,lang}:{data:PublicIncidents;lang:string}) {
 const w=incidentWords(lang);
 if(!data.history.length) return null;
 return <section className="mt-5 rounded-xl border border-slate-300 p-4" aria-label={w.history}>
  <h2 className="font-semibold">{w.history}</h2>
  <ul className="mt-3 space-y-4 text-sm [overflow-wrap:anywhere]">{data.history.map(h=><li className="break-inside-avoid" key={h.reference}>{h.reference} · {h.type==="STOLEN"?w.stolen:w.missing} · {h.recovered?w.recovered:w.resolved}{h.resolvedAt?` · ${h.resolvedAt.slice(0,10)}`:""}{h.events.length?<ul>{h.events.map((e,n)=><li key={n}>{e.state==="ACTIVE"?w.active:e.state==="RESOLVED"?w.resolved:w.pending} · {e.at.slice(0,10)}</li>)}</ul>:null}</li>)}</ul>
 </section>;
}
