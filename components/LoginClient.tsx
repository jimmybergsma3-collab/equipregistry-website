"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginClient({ nextUrl }: { nextUrl: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push(nextUrl);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login (temporary)</h1>
        <p style={styles.text}>This is a placeholder login for development.</p>

        <form onSubmit={handleLogin}>
          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: 24,
  },
  card: {
    width: 360,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#1f4fd8",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    background: "#fee2e2",
    color: "#7f1d1d",
    padding: "8px 10px",
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 12,
  },
};
