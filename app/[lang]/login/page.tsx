"use client";

import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const lang = String(params.lang || "en");
  const rawNext = searchParams.get("next");
  const safeNext =
    rawNext && rawNext.startsWith("/") ? rawNext : `/${lang}/dashboard`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Inloggen mislukt.");
        return;
      }

      router.push(safeNext);
      router.refresh();
    } catch {
      setError("Serverfout tijdens inloggen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto py-20 px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Inloggen</h1>
        <p className="text-slate-600">
          Log in om assets te registreren en je dashboard te openen.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">E-mail</label>
          <input
            type="email"
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="naam@bedrijf.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Wachtwoord</label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Bezig..." : "Inloggen"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Tijdelijke setup gedaan? Ga terug naar{" "}
        <Link href={`/${lang}`} className="underline hover:text-blue-700">
          homepage
        </Link>
      </div>
    </main>
  );
}