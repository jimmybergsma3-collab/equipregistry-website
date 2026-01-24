import Link from "next/link";
import React from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== Responsive Dashboard Header ===== */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          {/* Logo (mobile safe) */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              className="h-9 w-auto max-w-[140px] shrink-0"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-slate-900">
                EquipRegistry
              </div>
              <div className="text-xs text-slate-500">Dashboard</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <DashboardNav />
          </div>

          {/* Mobile fallback */}
          <div className="md:hidden">
            <Link
              href="/dashboard"
              className="rounded-lg border px-3 py-2 text-sm"
            >
              Menu
            </Link>
          </div>
        </div>

        {/* Mobile dashboard nav (scrollable tabs) */}
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-2 overflow-x-auto">
            <DashboardNav />
          </div>
        </div>
      </header>

      {/* ===== Page content ===== */}
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
