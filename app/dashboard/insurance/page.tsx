"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MOCK_MACHINES, type InsuranceMachine } from "@/lib/insurance/mockMachines";

const STORAGE_KEY = "er_insurance_machines_v1";
const SNAPSHOT_KEY = "er_insurance_overview_snapshot_v1";

function daysSince(dateISO: string) {
  const d = new Date(dateISO);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

type Snapshot = {
  savedAt: string; // ISO
  total: number;
  verified: number;
  historyUnknown: number;
  notRegistered: number;
  stolen: number;
  needsRecheck: number;
  riskScore: number;
};

function pctChange(current: number, prev: number) {
  if (prev === 0) return null; // avoid infinity
  return ((current - prev) / prev) * 100;
}

function Delta({
  current,
  prev,
}: {
  current: number;
  prev: number | null | undefined;
}) {
  if (prev === null || prev === undefined) return null;

  const diff = current - prev;
  const pct = pctChange(current, prev);

  const isUp = diff > 0;
  const isDown = diff < 0;

  const cls =
    isUp ? "text-amber-700" : isDown ? "text-green-700" : "text-slate-500";

  const sign = diff > 0 ? "+" : "";
  const pctText =
    pct === null
      ? ""
      : ` (${pct > 0 ? "+" : ""}${pct.toFixed(1)}%)`;

  return (
    <div className={`mt-2 text-xs font-semibold ${cls}`}>
      Δ {sign}
      {diff}
      {pctText}
    </div>
  );
}

function Card({
  title,
  value,
  hint,
  delta,
}: {
  title: string;
  value: string | number;
  hint?: string;
  delta?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        {title}
      </div>
      <div className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
      {delta}
      {hint ? <div className="mt-2 text-xs text-slate-600">{hint}</div> : null}
    </div>
  );
}

export default function InsuranceOverviewPage() {
  const [machines, setMachines] = useState<InsuranceMachine[]>(MOCK_MACHINES);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  // load demo state from localStorage (same as table)
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

  // load snapshot
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SNAPSHOT_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as Snapshot);
    } catch {
      // ignore
    }
  }, []);

  const stats = useMemo(() => {
    const total = machines.length;
    const verified = machines.filter((m) => m.status === "VERIFIED").length;
    const historyUnknown = machines.filter((m) => m.status === "HISTORY_UNKNOWN").length;
    const notRegistered = machines.filter((m) => m.status === "NOT_REGISTERED").length;
    const stolen = machines.filter((m) => m.status === "STOLEN").length;

    const needsRecheck = machines.filter((m) => daysSince(m.lastVerifiedAt) > 180).length;

    // simple risk score for demo (0..100)
    const riskScore = Math.min(
      100,
      Math.round(
        ((stolen * 4 + historyUnknown * 2 + notRegistered * 1 + needsRecheck * 1) /
          Math.max(1, total)) *
          20
      )
    );

    return {
      total,
      verified,
      historyUnknown,
      notRegistered,
      stolen,
      needsRecheck,
      riskScore,
    };
  }, [machines]);

  function saveSnapshot() {
    const s: Snapshot = {
      savedAt: new Date().toISOString(),
      ...stats,
    };
    setSnapshot(s);
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(s));
    } catch {
      // ignore
    }
  }

  function resetSnapshot() {
    setSnapshot(null);
    try {
      localStorage.removeItem(SNAPSHOT_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insurance Overview</h1>
          <p className="mt-1 text-sm text-slate-600">
            Portfolio summary (demo). Tracks trend vs last saved snapshot.
          </p>
          {snapshot?.savedAt ? (
            <p className="mt-1 text-xs text-slate-500">
              Snapshot saved:{" "}
              <span className="font-mono">{new Date(snapshot.savedAt).toLocaleString()}</span>
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              No snapshot saved yet. Click <span className="font-semibold">Save snapshot</span> to enable Δ values.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={saveSnapshot}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            type="button"
          >
            Save snapshot
          </button>

          <button
            onClick={resetSnapshot}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            type="button"
          >
            Reset snapshot
          </button>

          <Link
            href="/dashboard/insurance/machines"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            View machines →
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Total machines"
          value={stats.total}
          delta={<Delta current={stats.total} prev={snapshot?.total} />}
        />
        <Card
          title="Verified"
          value={stats.verified}
          delta={<Delta current={stats.verified} prev={snapshot?.verified} />}
        />
        <Card
          title="History Unknown"
          value={stats.historyUnknown}
          delta={<Delta current={stats.historyUnknown} prev={snapshot?.historyUnknown} />}
        />
        <Card
          title="Not Registered"
          value={stats.notRegistered}
          delta={<Delta current={stats.notRegistered} prev={snapshot?.notRegistered} />}
        />
        <Card
          title="Stolen / Red Flag"
          value={stats.stolen}
          delta={<Delta current={stats.stolen} prev={snapshot?.stolen} />}
        />
        <Card
          title="Needs re-check"
          value={stats.needsRecheck}
          hint="> 180 days since last verified"
          delta={<Delta current={stats.needsRecheck} prev={snapshot?.needsRecheck} />}
        />
        <Card
          title="Risk score"
          value={`${stats.riskScore}/100`}
          hint="Demo score based on portfolio flags"
          delta={<Delta current={stats.riskScore} prev={snapshot?.riskScore} />}
        />
        <Card title="Data source" value="Demo" hint="localStorage + mock fallback" />
      </div>

      {/* Highlights */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
        <div className="font-semibold text-slate-900">How to demo the trend</div>
        <ol className="mt-2 list-decimal pl-5">
          <li>Click <span className="font-semibold">Save snapshot</span>.</li>
          <li>Go to <span className="font-semibold">Machines</span> and click <span className="font-semibold">Verify</span> or <span className="font-semibold">Flag</span>.</li>
          <li>Return to <span className="font-semibold">Overview</span> to show Δ changes.</li>
        </ol>
      </div>
    </main>
  );
}
