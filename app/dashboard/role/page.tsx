"use client";

import { useState } from "react";
import Link from "next/link";

export default function RolePage() {
  const [loading, setLoading] = useState<"owner" | "insurance" | null>(null);

  async function setRole(role: "owner" | "insurance") {
    setLoading(role);
    try {
      await fetch("/api/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      // After setting cookie, navigate to the correct portal
      window.location.href = role === "insurance" ? "/dashboard/insurance" : "/dashboard";
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Select role (demo)</h1>
      <p className="mt-2 text-sm text-slate-600">
        This sets a cookie <span className="font-mono">er_role</span> and redirects you to the right portal.
      </p>

      <div className="mt-6 grid gap-3">
        <button
          onClick={() => setRole("owner")}
          disabled={loading !== null}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left hover:bg-slate-50 disabled:opacity-60"
        >
          <div className="font-semibold">Owner / Trader portal</div>
          <div className="text-xs text-slate-600">Access to /dashboard</div>
          {loading === "owner" ? <div className="mt-1 text-xs">Switching…</div> : null}
        </button>

        <button
          onClick={() => setRole("insurance")}
          disabled={loading !== null}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left hover:bg-slate-50 disabled:opacity-60"
        >
          <div className="font-semibold">Insurance portal</div>
          <div className="text-xs text-slate-600">Access to /dashboard/insurance</div>
          {loading === "insurance" ? <div className="mt-1 text-xs">Switching…</div> : null}
        </button>
      </div>

      <div className="mt-6 text-sm">
        <Link href="/dashboard" className="text-slate-700 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
