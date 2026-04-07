"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  lang: string;
  loginLabel: string;
  logoutLabel: string;
  dashboardLabel: string;
};

type SessionState = {
  loggedIn: boolean;
  role?: string;
};

export default function HeaderLoginButton({
  lang,
  loginLabel,
  logoutLabel,
  dashboardLabel,
}: Props) {
  const [session, setSession] = useState<SessionState>({ loggedIn: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const res = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!res.ok) {
          if (active) setSession({ loggedIn: false });
          return;
        }

        const data = await res.json();

        if (active) {
          setSession({
            loggedIn: !!data?.loggedIn,
            role: data?.role,
          });
        }
      } catch {
        if (active) setSession({ loggedIn: false });
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch {}

    window.location.href = `/${lang}`;
  }

  if (loading) return null;

  if (!session.loggedIn) {
    return <Link href={`/${lang}/login`}>{loginLabel}</Link>;
  }

  const dashboardHref =
    session.role === "admin"
      ? `/${lang}/dashboard/admin`
      : `/${lang}/dashboard/registrations`;

  return (
    <div className="flex items-center gap-4">
      <Link href={dashboardHref}>{dashboardLabel}</Link>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm text-zinc-900 hover:underline"
      >
        {logoutLabel}
      </button>
    </div>
  );
}