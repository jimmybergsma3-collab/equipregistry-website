"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import StatusBadge from "@/components/insurance/StatusBadge";
import { MOCK_MACHINES, type InsuranceMachine } from "@/lib/insurance/mockMachines";

const STORAGE_KEY = "er_insurance_machines_v1";

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

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/passport/${machine.serial}`}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Open public passport →
            </Link>

            <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
              Open full passport (insurance) (demo)
            </button>

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
