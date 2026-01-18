import React from "react";

export type Tone = "green" | "orange" | "red" | "gray";

export default function StatusBadge({
  tone,
  children,
  className = "",
}: {
  tone: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  const map: Record<Tone, string> = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    orange: "bg-amber-50 text-amber-900 border-amber-200",
    red: "bg-rose-50 text-rose-800 border-rose-200",
    gray: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        map[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
