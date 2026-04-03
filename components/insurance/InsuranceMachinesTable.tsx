"use client";

// components/insurance/InsuranceMachinesTable.tsx
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/insurance/StatusBadge";
import {
  MOCK_MACHINES,
  type InsuranceMachine,
  type InsuranceMachineStatus,
} from "@/lib/insurance/mockMachines";

type SortKey = "serial" | "brand" | "country" | "status" | "lastVerifiedAt";

function daysSince(dateISO: string) {
  const d = new Date(dateISO);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function financeLabel(s?: string) {
  switch (s) {
    case "FINANCED":
      return "Financed";
    case "LEASED":
      return "Leased";
    case "OWNED":
      return "Owned";
    default:
      return "Unknown";
  }
}

function fraudSignals(machine: InsuranceMachine) {
  const signals: string[] = [];
  let tone: "red" | "orange" | "gray" = "gray";
  let note = "No elevated fraud indicators based on finance + registry status.";

  const fin = machine.financeStatus;
  const st = machine.status;

  if (st === "STOLEN" && (fin === "FINANCED" || fin === "LEASED")) {
    tone = "red";
    signals.push("Stolen asset with active financing/lease exposure.");
    signals.push("Potential double financing or fraudulent collateral risk.");
    note = "High priority: lender/lessor may have an active claim on this asset.";
  } else if (st === "HISTORY_UNKNOWN" && fin === "FINANCED") {
    tone = "orange";
    signals.push("History Unknown combined with active financing.");
    signals.push("Increased probability of fraud or disputed provenance.");
    note = "Flag for underwriting: request proof of legal origin and lien checks.";
  } else if (st === "NOT_REGISTERED" && fin === "FINANCED") {
    tone = "orange";
    signals.push("Financed asset not found in registry.");
    signals.push("Potential unregistered collateral / documentation gap.");
    note = "Consider requiring registration before policy issuance/renewal.";
  } else if (fin === "UNKNOWN") {
    signals.push("Financing status unknown (data gap).");
    note = "Recommend collecting finance/lease information for better risk scoring.";
  } else if (fin === "LEASED" && st === "VERIFIED") {
    signals.push("Leased asset: verify lessor/contract alignment (demo rule).");
  }

  return { tone, signals, note };
}

const STORAGE_KEY = "er_insurance_machines_v1";

export default function InsuranceMachinesTable() {
  // stateful dataset (demo)
  const [machines, setMachines] = useState<InsuranceMachine[]>(MOCK_MACHINES);

  // filters
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<InsuranceMachineStatus | "ALL">("ALL");
  const [country, setCountry] = useState<string>("ALL");
  const [showNeedsRecheck, setShowNeedsRecheck] = useState(false); // > 180 days
  const [sortKey, setSortKey] = useState<SortKey>("lastVerifiedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // load saved demo state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
const parsed = safeParse<InsuranceMachine[]>(raw) ?? [];        if (Array.isArray(parsed) && parsed.length) setMachines(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // persist demo state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(machines));
    } catch {
      // ignore
    }
  }, [machines]);

  function setStatusFor(id: string, nextStatus: InsuranceMachineStatus) {
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m))
    );
  }

  const countries = useMemo(() => {
    const set = new Set(machines.map((m) => m.country));
    return ["ALL", ...Array.from(set).sort()];
  }, [machines]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return machines.filter((m) => {
      const matchesQuery =
        !q ||
        m.serial.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.model.toLowerCase().includes(q) ||
        m.owner.toLowerCase().includes(q) ||
        m.policyNo.toLowerCase().includes(q);

      const matchesStatus = status === "ALL" ? true : m.status === status;
      const matchesCountry = country === "ALL" ? true : m.country === country;

      const needsRecheck = daysSince(m.lastVerifiedAt) > 180;
      const matchesRecheck = showNeedsRecheck ? needsRecheck : true;

      return matchesQuery && matchesStatus && matchesCountry && matchesRecheck;
    });
  }, [machines, query, status, country, showNeedsRecheck]);

  const sorted = useMemo(() => {
    const arr = [...filtered];

    arr.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;

      // dates
      if (sortKey === "lastVerifiedAt") {
        const da = new Date(a.lastVerifiedAt).getTime();
        const db = new Date(b.lastVerifiedAt).getTime();
        return (da - db) * dir;
      }

      // string compare
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      return String(va).localeCompare(String(vb)) * dir;
    });

    return arr;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("asc");
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Controls */}
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-end md:justify-between">
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-end">
          <div className="w-full md:w-80">
            <label className="text-xs font-semibold text-slate-700">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Serial, owner, brand, policy…"
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
            />
          </div>

          <div className="w-full md:w-56">
            <label className="text-xs font-semibold text-slate-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
            >
              <option value="ALL">All</option>
              <option value="VERIFIED">Verified</option>
              <option value="HISTORY_UNKNOWN">History Unknown</option>
              <option value="NOT_REGISTERED">Not Registered</option>
              <option value="STOLEN">Stolen / Red Flag</option>
            </select>
          </div>

          <div className="w-full md:w-40">
            <label className="text-xs font-semibold text-slate-700">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <label className="mt-2 inline-flex items-center gap-2 text-sm text-slate-700 md:mt-0">
            <input
              type="checkbox"
              checked={showNeedsRecheck}
              onChange={(e) => setShowNeedsRecheck(e.target.checked)}
              className="h-4 w-4"
            />
            Needs re-check (&gt; 180 days)
          </label>
        </div>

        <div className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">{sorted.length}</span>{" "}
          machines
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <Th onClick={() => toggleSort("serial")} active={sortKey === "serial"} dir={sortDir}>
                Serial
              </Th>
              <Th onClick={() => toggleSort("brand")} active={sortKey === "brand"} dir={sortDir}>
                Brand / Model
              </Th>
              <Th onClick={() => toggleSort("country")} active={sortKey === "country"} dir={sortDir}>
                Country
              </Th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Policy</th>
              <th className="px-4 py-3">Financing</th>
              <Th onClick={() => toggleSort("status")} active={sortKey === "status"} dir={sortDir}>
                Status
              </Th>
              <th className="px-4 py-3">Fraud risk</th>
              <Th
                onClick={() => toggleSort("lastVerifiedAt")}
                active={sortKey === "lastVerifiedAt"}
                dir={sortDir}
              >
                Last verified
              </Th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {sorted.map((m) => (
              <Row
                key={m.id}
                m={m}
                onVerify={() => setStatusFor(m.id, "VERIFIED")}
                onFlag={() => setStatusFor(m.id, "STOLEN")}
              />
            ))}

            {sorted.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-slate-600">
                  No machines match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Row({
  m,
  onVerify,
  onFlag,
}: {
  m: InsuranceMachine;
  onVerify: () => void;
  onFlag: () => void;
}) {
  const ageDays = daysSince(m.lastVerifiedAt);
  const ageLabel = ageDays <= 1 ? "today" : `${ageDays} days ago`;

  const fraud = fraudSignals(m);
  const riskLabel = fraud.tone === "red" ? "High" : fraud.tone === "orange" ? "Medium" : "Low";

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-4 font-mono text-xs text-slate-900">{m.serial}</td>
      <td className="px-4 py-4">
        <div className="font-semibold text-slate-900">{m.brand}</div>
        <div className="text-xs text-slate-600">{m.model}</div>
      </td>
      <td className="px-4 py-4 text-slate-900">{m.country}</td>
      <td className="px-4 py-4 text-slate-900">{m.owner}</td>
      <td className="px-4 py-4 font-mono text-xs text-slate-900">{m.policyNo}</td>

      <td className="px-4 py-4">
        <div className="text-slate-900">{financeLabel(m.financeStatus)}</div>
        <div className="text-xs text-slate-600">{m.financeProvider || "—"}</div>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={m.status} />
      </td>

      <td className="px-4 py-4">
        <div
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            fraud.tone === "red"
              ? "border-red-200 bg-red-50 text-red-700"
              : fraud.tone === "orange"
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          {riskLabel}
        </div>
        <div className="mt-1 text-xs text-slate-600">{fraud.signals[0] || "—"}</div>
      </td>

      <td className="px-4 py-4">
        <div className="text-slate-900">{m.lastVerifiedAt}</div>
        <div className={`text-xs ${ageDays > 180 ? "text-amber-700" : "text-slate-600"}`}>
          {ageLabel}
        </div>
      </td>

      <td className="px-4 py-4 text-right">
        <div className="inline-flex gap-2">
          <Link
            href={`/dashboard/insurance/machines/${m.id}`}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
          >
            View
          </Link>

          <button
            onClick={onVerify}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            title="Set status to Verified (demo)"
          >
            Verify
          </button>

          <button
            onClick={onFlag}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            title="Flag as Stolen / Red Flag (demo)"
          >
            Flag
          </button>
        </div>
      </td>
    </tr>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <th onClick={onClick} className="cursor-pointer select-none px-4 py-3 hover:text-slate-900" title="Sort">
      <span className="inline-flex items-center gap-2">
        {children}
        {active && <span className="text-[10px]">{dir === "asc" ? "▲" : "▼"}</span>}
      </span>
    </th>
  );
}