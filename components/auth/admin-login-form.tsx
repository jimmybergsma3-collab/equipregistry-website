// components/auth/admin-login-form.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  lang: string;
};

const TEXT = {
  en: {
    emailLabel: "Admin email",
    emailPlaceholder: "you@equipregistry.com",
    passwordLabel: "Password",
    button: "Admin sign in",
    loading: "Loading...",
    required: "Enter your admin email and password.",
    invalid: "Invalid admin credentials.",
    forbidden: "Admin access is required.",
    server: "Something went wrong. Please try again.",
  },
  nl: {
    emailLabel: "Admin e-mail",
    emailPlaceholder: "jij@equipregistry.com",
    passwordLabel: "Wachtwoord",
    button: "Admin inloggen",
    loading: "Bezig...",
    required: "Vul admin e-mail en wachtwoord in.",
    invalid: "Ongeldige gegevens.",
    forbidden: "Geen admin-toegang.",
    server: "Er ging iets mis. Probeer opnieuw.",
  },
} as const;

function getText(lang: string) {
  return lang === "nl" ? TEXT.nl : TEXT.en;
}

function getErrorMessage(lang: string, status: number, apiError?: string) {
  if (lang === "nl" && apiError) {
    return apiError;
  }

  const text = getText(lang);

  if (status === 400) return text.required;
  if (status === 401) return text.invalid;
  if (status === 403) return text.forbidden;
  return text.server;
}

export default function AdminLoginForm({ lang }: Props) {
  const router = useRouter();
  const text = getText(lang);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(getErrorMessage(lang, res.status, data?.error));
        setLoading(false);
        return;
      }

      router.push(`/${lang}/admin`);
      router.refresh();
    } catch {
      setError(text.server);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {text.emailLabel}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
          placeholder={text.emailPlaceholder}
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          {text.passwordLabel}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-black"
          placeholder="••••••••"
          required
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? text.loading : text.button}
      </button>
    </form>
  );
}
