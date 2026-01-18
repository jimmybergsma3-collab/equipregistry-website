import React from "react";
import Link from "next/link";
import { getMachineById } from "@/lib/queries/machines";
import { getStatusUI } from "@/lib/machineStatus";

/* ================= BADGE (ALTIJD KLEUR) ================= */

function Badge({
  tone,
  children,
}: {
  tone: "green" | "orange" | "red" | "gray";
  children: React.ReactNode;
}) {
  const colors: Record<
    typeof tone,
    { bg: string; text: string; border: string }
  > = {
    green: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
    orange: { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
    red: { bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
    gray: { bg: "#F8FAFC", text: "#334155", border: "#E2E8F0" },
  };

  const c = colors[tone];

  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
      style={{
        backgroundColor: c.bg,
        color: c.text,
        borderColor: c.border,
      }}
    >
      {children}
    </span>
  );
}

/* ================= HELPERS ================= */

function fmtDate(d: Date | string | null | undefined) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleDateString();
  }
}

function fmtDateTime(d: Date | string | null | undefined) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const machineId = Number.parseInt(id, 10);
  if (Number.isNaN(machineId)) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Invalid machine ID</h1>
        <p className="text-sm text-slate-600 mt-2">ID: {id}</p>
        <div className="mt-4">
          <Link className="underline" href="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const machine = await getMachineById(machineId);

  if (!machine) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Machine not found</h1>
        <p className="text-sm text-slate-600 mt-2">ID: {id}</p>
        <div className="mt-4">
          <Link className="underline" href="/dashboard">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const ui = getStatusUI(machine.status);

  // ✅ sommige versies geven `tone`, andere `color` terug
  const tone = (ui.tone ?? ui.color ?? "gray") as
    | "green"
    | "orange"
    | "red"
    | "gray";

  return (
    <div className="p-6">
      {/* Top row */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {machine.registryId}
          </h1>

          <div className="mt-1 text-sm text-slate-600">
            {machine.brand} {machine.model} {machine.year ? `(${machine.year})` : ""}
          </div>

          <div className="mt-3">
            <Badge tone={tone}>{ui.label}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link className="underline" href="/dashboard">
            Back
          </Link>

          <Link
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
            href={`/passport/${machine.registryId}`}
          >
            View Passport
          </Link>
        </div>
      </div>

      {/* Sub text */}
      <p className="text-sm text-slate-600 mb-6">
        Details for this machine record. Use the passport link to view the public
        equipment passport.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: main details */}
        <div className="lg:col-span-2 rounded-2xl border bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Machine details</h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Registry ID</div>
              <div className="mt-1 text-sm font-medium">{machine.registryId}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Status</div>
              <div className="mt-1 text-sm font-medium">{ui.label}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Brand</div>
              <div className="mt-1 text-sm font-medium">{machine.brand}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Model</div>
              <div className="mt-1 text-sm font-medium">{machine.model}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Year</div>
              <div className="mt-1 text-sm font-medium">{machine.year ?? "—"}</div>
            </div>

            <div className="rounded-xl border bg-slate-50 p-4">
              <div className="text-xs text-slate-600">Last validated</div>
              <div className="mt-1 text-sm font-medium">
                {fmtDate(machine.lastValidated)}
              </div>
            </div>
          </div>
        </div>

        {/* Right: owner/meta */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Ownership & metadata
          </h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-600">Owner</span>
              <span className="font-medium text-slate-900">
                {machine.owner?.email ?? "—"}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-600">Created</span>
              <span className="font-medium text-slate-900">
                {fmtDateTime(machine.createdAt)}
              </span>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="text-xs text-slate-500">
              Tip: share the public passport route with authorities if needed:{" "}
              <span className="font-medium text-slate-700">
                /passport/{machine.registryId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
