"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const pathname = usePathname();
  const isInsurance = pathname?.startsWith("/dashboard/insurance");

  if (isInsurance) {
    return (
      <nav className="flex items-center gap-4 text-sm">
        <Link
          href="/dashboard/insurance"
          className="text-slate-700 hover:text-slate-900"
        >
          Overview
        </Link>

        <Link
          href="/dashboard/insurance/machines"
          className="text-slate-700 hover:text-slate-900"
        >
          Machines
        </Link>

        <Link
          href="/dashboard/insurance/alerts"
          className="text-slate-700 hover:text-slate-900"
        >
          Alerts
        </Link>

        {/* Switch to owner portal */}
        <Link
          href="/dashboard"
          className="ml-4 text-slate-500 hover:text-slate-900"
          title="Switch to owner / trader portal"
        >
          Owner portal →
        </Link>

        <form action="/logout" method="post">
          <button
            type="submit"
            className="ml-2 text-slate-700 hover:text-slate-900"
          >
            Logout
          </button>
        </form>
      </nav>
    );
  }

  // Owner / trader dashboard menu
  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
        Machines
      </Link>

      {/* Switch to insurance portal */}
      <Link
        href="/dashboard/insurance"
        className="text-slate-500 hover:text-slate-900"
        title="Switch to insurance portal"
      >
        Insurance portal →
      </Link>

      <form action="/logout" method="post">
        <button type="submit" className="text-slate-700 hover:text-slate-900">
          Logout
        </button>
      </form>
    </nav>
  );
}
