"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/insurance/StatusBadge";
import { MOCK_MACHINES, type InsuranceMachine } from "@/lib/insurance/mockMachines";

const STORAGE_KEY = "er_insurance_machines_v1";

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

export default function InsuranceMachineDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || "";

  const [machines, setMachines] = useState<InsuranceMachine[]>(MOCK_MACHINES);

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

  const machine = useMemo(
    () => machines.find((m) => m.id === id),
    [machines, id]
  );

  const fraud = useMemo(() => (machine ? fraudSignals(machine) : null), [machine]);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard/insurance/machines"
          className="text-sm font-semibold text-slate-700 hover:underline"
        >
          ← Back to machines
        </Link>
      </div>

      {!machine ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold">Machine not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            ID: <span className="font-mono">{id}</span>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Tip: check that /lib/insurance/mockMachines.ts has id values like
            ER-REG-001, ER-HIS-404, etc.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-600">Registry ID</div>
              <div className="font-mono text-sm">{machine.serial}</div>
            </div>
            <StatusBadge status={machine.status} />
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            {machine.brand}{" "}
            <span className="text-slate-500">{machine.model}</span>
          </h1>

          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Owner
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {machine.owner}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Policy
              </dt>
              <dd className="mt-1 font-mono text-sm text-slate-900">
                {machine.policyNo}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Financing
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {financeLabel(machine.financeStatus)}
              </dd>
              <dd className="mt-1 text-xs text-slate-600">
                {machine.financeProvider || "—"}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Country
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {machine.country}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Last verified
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {machine.lastVerifiedAt}
              </dd>
            </div>
          </dl>

          {/* Fraud / Double financing signals */}
          {fraud && (
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                fraud.tone === "red"
                  ? "border-red-200 bg-red-50"
                  : fraud.tone === "orange"
                  ? "border-amber-200 bg-amber-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">
                  Fraud / Double financing signals
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  {fraud.tone === "red" ? "High" : fraud.tone === "orange" ? "Medium" : "Low"}
                </div>
              </div>

              <p className="mt-2 text-sm text-slate-700">{fraud.note}</p>

              {fraud.signals.length > 0 && (
                <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                  {fraud.signals.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/passport/${machine.serial}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Open public passport →
            </Link>

            <Link
              href={`/dashboard/insurance/passport/${machine.id}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Open full passport (insurance) (demo)
            </Link>

            <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
              Download PDF (demo)
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Public passport opens the public verification page for this machine.
          </p>
        </div>
      )}
    </main>
  );
}