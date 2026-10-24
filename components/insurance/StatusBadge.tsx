// components/insurance/StatusBadge.tsx
import type { InsuranceMachineStatus } from "@/lib/insurance/mockMachines";

export default function StatusBadge({ status }: { status: InsuranceMachineStatus }) {
  const map: Record<
    InsuranceMachineStatus,
    { label: string; tone: "green" | "orange" | "red" | "gray" }
  > = {
    VERIFIED: { label: "Verified", tone: "green" },
    HISTORY_UNKNOWN: { label: "History Unknown", tone: "orange" },
    NOT_REGISTERED: { label: "Not Registered", tone: "gray" },
    STOLEN: { label: "Stolen / Red Flag", tone: "red" },
  };

  const tone = map[status].tone;

  const cls =
    tone === "green"
      ? "bg-green-50 text-green-700 border-green-200"
      : tone === "orange"
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : tone === "red"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>
      {map[status].label}
    </span>
  );
}
