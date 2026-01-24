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
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              className="h-10 w-auto"
            />
            <div>
              <div className="text-sm font-semibold text-slate-900">
                EquipRegistry
              </div>
              <div className="text-xs text-slate-500">Dashboard</div>
            </div>
          </Link>

          <DashboardNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
