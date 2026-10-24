"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";

type Props = {
  lang: Lang;
  active: "dashboard" | "profile" | "passports";
};

function getLinkClassName(active: boolean) {
  return active
    ? "inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
    : "inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50";
}

export default function CustomerDashboardNav({ lang, active }: Props) {
  const text = getCustomerDashboardText(lang);

  return (
    <nav className="mb-6 flex flex-wrap gap-3" aria-label={text.dashboardTitle}>
      <Link
        href={`/${lang}/dashboard/registrations`}
        className={getLinkClassName(active === "dashboard")}
      >
        {text.dashboardLink}
      </Link>
      <Link
        href={`/${lang}/dashboard/profile`}
        className={getLinkClassName(active === "profile")}
      >
        {text.profileLink}
      </Link>
      <Link
        href={`/${lang}/dashboard/passports`}
        className={getLinkClassName(active === "passports")}
      >
        {text.passportsLink}
      </Link>
    </nav>
  );
}
