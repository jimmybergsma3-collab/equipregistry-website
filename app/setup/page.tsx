"use client";

import { useState } from "react";

export default function SetupPage() {
  const [email, setEmail] = useState("jimmy@test.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Bezig...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Er ging iets mis");
        return;
      }

      setMessage(`Gebruiker aangemaakt. User ID: ${data.userId}`);
    } catch (error) {
      setMessage("Serverfout bij aanmaken gebruiker");
    }
  }

  return (
    <main className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Setup gebruiker</h1>

      <form onSubmit={handleCreateUser} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            type="email"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Wachtwoord</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
            type="password"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-blue-700 text-white font-semibold"
        >
          Gebruiker aanmaken
        </button>
      </form>

      {message && <p className="mt-6 text-sm">{message}</p>}
    </main>
  );
}