export const dynamic = "force-dynamic";

import Link from "next/link";

function Badge({ tone, children }: { tone: "green" | "orange" | "red" | "gray"; children: React.ReactNode }) {
  const cls =
    tone === "green"
      ? "bg-green-50 text-green-700 border-green-200"
      : tone === "orange"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : tone === "red"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{children}</span>;
}

export default async function InsuranceDashboardPage() {
  // DEMO data (later: pull from DB / API)
  const kpis = [
    { label: "Total monitored assets", value: "12,480" },
    { label: "Registered & Verified", value: "9,210" },
    { label: "History Unknown", value: "2,941" },
    { label: "Stolen alerts", value: "329" },
  ];

  const recent = [
    { time: "Today 14:18", serial: "ER-STOL-777", event: "Sighting reported", location: "Valencia, ES", risk: "High" },
    { time: "Today 09:02", serial: "ER-HIS-404", event: "Verification requested", location: "—", risk: "Medium" },
    { time: "Yesterday 17:41", serial: "ER-REG-001", event: "Validated", location: "—", risk: "Low" },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/equipregistry_logo.png" alt="EquipRegistry" className="h-10" />
            <span className="font-bold">Insurance Intelligence</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-blue-700">Serial check</Link>
            <Link href="/dashboard" className="hover:text-blue-700">Owner/Dealer Portal</Link>
            <Link href="/insurance" className="hover:text-blue-700">Insurance Dashboard</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Risk & Fraud Overview</h1>
            <p className="text-slate-600 mt-1">
              Demo dashboard — designed for underwriting, claims triage and fraud teams.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Link href="/?serial=ER-STOL-777" className="px-3 py-2 rounded-lg border bg-white text-sm font-semibold hover:bg-slate-50">
              Test stolen flow
            </Link>
            <Link href="/action?type=authorities&registryId=ER-STOL-777&caseId=ER-CASE-2026-00123" className="px-3 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800">
              Authorities demo
            </Link>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white border rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">{k.label}</div>
              <div className="text-2xl font-extrabold mt-2">{k.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent activity */}
          <div className="lg:col-span-2 bg-white border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent activity</h2>
              <span className="text-xs text-slate-500">Demo feed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500">
                  <tr className="border-b">
                    <th className="py-2 pr-4">Time</th>
                    <th className="py-2 pr-4">Serial</th>
                    <th className="py-2 pr-4">Event</th>
                    <th className="py-2 pr-4">Location</th>
                    <th className="py-2 pr-4">Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-3 pr-4 whitespace-nowrap">{r.time}</td>
                      <td className="py-3 pr-4 font-semibold">
                        <Link className="underline hover:text-blue-700" href={`/?serial=${encodeURIComponent(r.serial)}`}>
                          {r.serial}
                        </Link>
                      </td>
                      <td className="py-3 pr-4">{r.event}</td>
                      <td className="py-3 pr-4">{r.location}</td>
                      <td className="py-3 pr-4">
                        {r.risk === "High" ? <Badge tone="red">High</Badge> : r.risk === "Medium" ? <Badge tone="orange">Medium</Badge> : <Badge tone="green">Low</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk insights */}
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3">Risk insights</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="font-semibold">Top action</div>
                <div className="text-slate-600 mt-1">
                  Prioritize stolen alerts with recent sightings and cross-border indicators.
                </div>
              </div>

              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="font-semibold">What EquipRegistry returns via API</div>
                <ul className="mt-2 list-disc pl-5 text-slate-600">
                  <li>Status (Verified / Unknown / Not Registered / Stolen)</li>
                  <li>Risk level + case ID</li>
                  <li>Passport URL (public or logged-in)</li>
                </ul>
              </div>

              <div className="rounded-xl border bg-red-50 p-4">
                <div className="font-semibold text-red-700">Stolen workflow</div>
                <div className="text-red-700 mt-1">
                  Report sighting → generate case ID → contact authorities → verify case ID.
                </div>
              </div>
            </div>
          </div>
        </div>

{/* Insurance & Commercial insights */}
<div className="grid md:grid-cols-2 gap-6 mt-10">
  {/* Insurance Risk Insight */}
  <div className="bg-white border rounded-2xl p-6">
    <div className="flex items-center gap-2 mb-3">
      <span>🛡️</span>
      <h3 className="font-bold text-lg">Insurance Risk Insight</h3>
    </div>

    <p className="text-sm text-slate-700 mb-3">
      Machines with "History Unknown" status show a 3–5× higher fraud and theft probability.
    </p>

    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
      <li>24% flagged before underwriting</li>
      <li>Lower claim volatility</li>
      <li>Earlier risk detection</li>
    </ul>
  </div>

  {/* Commercial Value Insight */}
  <div className="bg-white border rounded-2xl p-6">
    <div className="flex items-center gap-2 mb-3">
      <span>💼</span>
      <h3 className="font-bold text-lg">Commercial Value Insight</h3>
    </div>

    <p className="text-sm text-slate-700 mb-3">
      Registry validation creates a new trust layer for the global equipment market.
    </p>

    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
      <li><strong>Low-cost registry passport</strong> – One-time registration creates a permanent digital equipment passport.</li>
      <li><strong>Light annual validation fee</strong> – Small recurring fee to keep the passport active and insurance-ready.</li>
      <li><strong>Embedded in insurance workflows</strong> – Annual validation aligns naturally with policy renewal cycles.</li>
    </ul>

    <p className="text-sm text-slate-600 mt-3">
      Typical annual validation costs are negligible compared to insurance premiums or asset value.
    </p>
  </div>
</div>

        {/* Footer note */}
        <div className="mt-8 text-xs text-slate-500">
          Concept demo — insurers typically stay inside their own systems. This dashboard is an optional intelligence layer.
        </div>
      </div>
    </main>
  );
}
