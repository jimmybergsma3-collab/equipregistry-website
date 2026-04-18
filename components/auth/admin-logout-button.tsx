// components/auth/admin-logout-button.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  lang: string;
};

const TEXT = {
  en: {
    loading: "Loading...",
    logout: "Log out",
  },
  nl: {
    loading: "Bezig...",
    logout: "Uitloggen",
  },
} as const;

export default function AdminLogoutButton({ lang }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const text = lang === "nl" ? TEXT.nl : TEXT.en;

  async function handleLogout() {
    setLoading(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });

      router.push(`/${lang}/secure-admin-access`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100 disabled:opacity-60"
    >
      {loading ? text.loading : text.logout}
    </button>
  );
}
