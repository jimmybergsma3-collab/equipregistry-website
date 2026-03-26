"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  lang: string;
};

export default function LogoutButton({ lang }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout mislukt");
      }

      router.push(`/${lang}`);
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-zinc-900 hover:text-blue-700 disabled:opacity-60"
    >
      {loading ? "Bezig..." : "Logout"}
    </button>
  );
}