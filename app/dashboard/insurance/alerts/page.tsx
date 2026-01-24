"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/insurance/StatusBadge";
import { MOCK_MACHINES, type InsuranceMachine } from "@/lib/insurance/mockMachines";

const STORAGE_KEY = "er_insurance_machines_v1";

function daysSince(dateISO: string) {
  const d = new Date(dateISO);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

type AlertType = "ALL" | "STOLEN" | "NEEDS_RECHECK" | "HISTORY_UNKNOWN" | "NOT_REGISTERED";

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs font-semibold",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
      ].join(" ")}
      type="button"
    >
      {children}
    </button>
  );
}

export default function InsuranceAlertsPage() {
  const [machines, setMachines] = useState<InsuranceMachine[]>(MOCK_MACHINES);
  const [type, setType] = useState<AlertType>("ALL");

  // load same demo state as table
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as InsuranceMachine[];
        if (Array.isArray(parsed) && parsed.length) setMachines(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const alerts = useMemo(() => {
    const mapped = machines.map((m) => {
      const ageDays = daysSince(m.lastVerifiedAt);
      const needsRecheck = ageDays > 180;

      const tags: AlertType[] = [];
      if (m.status === "STOLEN") tags.push("STOLEN");
      if (m.status === "HISTORY_UNKNOWN") tags.push("HISTORY_UNKNOWN");
      if (m.status === "NOT_REGISTERED") tags.push("NOT_REGISTERED");
      if (needsRecheck) tags.push("NEEDS_RECHECK");

      // Priority (demo): stolen highest, then history unknown, then not registered, then needs recheck
      const priority =
        (m.status === "STOLEN" ? 100 : 0) +
        (m.status === "HISTORY_UNKNOWN" ? 60 : 0) +
        (m.status === "NOT_REGISTERED" ? 40 : 0) +
        (needsRecheck ? 20 : 0);

      return {
        machine: m,
        ageDays,
        needsRecheck,
        tags,
        priority,
      };
    });

    // only keep rows that have at least 1 alert tag
    const onlyAlerts = mapped.filter((x) => x.tags.length > 0);

    // filter by selected type
    const filtered =
      type === "ALL" ? onlyAlerts : onlyAlerts.filter((x) => x.tags.includes(type));

    // sort by priority desc
    filtered.sort((a, b) => b.priority - a.priority);

    return filtered;
  }, [machines, type]);

  const counts = useMemo(() => {
    const all = machines.map((m) => {
      const ageDays = daysSince(m.lastVerifiedAt);
      const needsRecheck = ageDays > 180;
      return { m, needsRecheck };
    });

    const stolen = all.filter((x) => x.m.status === "STOLEN").length;
    const historyUnknown = all.filter((x) => x.m.status === "HISTORY_UNKNOWN").length;
    const notRegistered = all.filter((x) => x.m.status === "NOT_REGISTERED").length;
    const needsRecheck = all.filter((x) => x.needsRecheck).length;

    const any =
      all.filter(
        (x) =>
          x.m.status === "STOLEN" ||
          x.m.status === "HISTORY_UNKNOWN" ||
          x.m.status === "NOT_REGISTERED" ||
          x.needsRecheck
      ).length;

    return { any, stolen, historyUnknown, notRegistered, needsRecheck };
  }, [machines]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insurance Alerts</h1>
          <p className="mt-1 text-sm text-slate-600">
            Action list for risk & claims (demo). Uses the same state as the machines table.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/insurance/machines"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Machines →
          </Link>
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Pill active={type === "ALL"} onClick={() => setType("ALL")}>
          All ({counts.any})
        </Pill>
        <Pill active={type === "STOLEN"} onClick={() => setType("STOLEN")}>
          Stolen ({counts.stolen})
        </Pill>
        <Pill active={type === "HISTORY_UNKNOWN"} onClick={() => setType("HISTORY_UNKNOWN")}>
          History Unknown ({counts.historyUnknown})
        </Pill>
        <Pill active={type === "NOT_REGISTERED"} onClick={() => setType("NOT_REGISTERED")}>
          Not Registered ({counts.notRegistered})
        </Pill>
        <Pill active={type === "NEEDS_RECHECK"} onClick={() => setType("NEEDS_RECHECK")}>
          Needs re-check ({counts.needsRecheck})
        </Pill>
      </div>

      {/* Alerts table */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="text-sm text-slate-700">
            Showing <span className="font-semibold text-slate-900">{alerts.length}</span>{" "}
            alert item(s)
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Registry ID</th>
                <th className="px-4 py-3">Machine</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Why flagged</th>
                <th className="px-4 py-3">Last verified</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {alerts.map((a) => (
                <tr key={a.machine.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-mono text-xs text-slate-900">
                    {a.machine.serial}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{a.machine.brand}</div>
                    <div className="text-xs text-slate-600">{a.machine.model}</div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={a.machine.status} />
                  </td>
                  <td className="px-4 py-4 text-slate-900">
                    <ul className="list-disc pl-5 text-sm">
                      {a.machine.status === "STOLEN" && <li>Reported stolen / high risk</li>}
                      {a.machine.status === "HISTORY_UNKNOWN" && <li>Legal history incomplete</li>}
                      {a.machine.status === "NOT_REGISTERED" && <li>No registry record found</li>}
                      {a.needsRecheck && <li>Verification expired (&gt; 180 days)</li>}
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-900">{a.machine.lastVerifiedAt}</div>
                    <div className={`text-xs ${a.needsRecheck ? "text-amber-700" : "text-slate-600"}`}>
                      {a.ageDays <= 1 ? "today" : `${a.ageDays} days ago`}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/dashboard/insurance/machines/${a.machine.id}`}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}

              {alerts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-600">
                    No alerts for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-4 text-xs text-slate-600">
        Note: Alerts are computed in the browser from status + lastVerifiedAt (demo logic).
      </p>
    </main>
  );
}
