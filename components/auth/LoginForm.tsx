"use client";

import { useMemo, useState } from "react";

export default function LoginForm({
  error,
  next,
}: {
  error?: string;
  next?: string;
}) {
  const [showPw, setShowPw] = useState(false);

  const errorText = useMemo(() => {
    if (!error) return null;
    // jij gebruikt nu meestal: ?error=1
    if (error === "1" || error === "invalid") return "Wrong email or password.";
    return "Login failed. Please try again.";
  }, [error]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-1 text-sm text-slate-600">
        Access your dashboard and private passports.
      </p>

      {errorText ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorText}
        </div>
      ) : null}

      <form className="mt-6 space-y-5" action="/api/login" method="post">
        <input type="hidden" name="next" value={next ?? "/dashboard"} />

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            defaultValue="demo@equipregistry.com"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>

          <div className="mt-2 flex items-center gap-2">
            <input
              name="password"
              type={showPw ? "text" : "password"}
              defaultValue="demo"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              placeholder="••••"
            />

            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="shrink-0 rounded-xl border px-3 py-3 text-sm"
              aria-label={showPw ? "Hide password" : "Show password"}
              title={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Demo account: demo@equipregistry.com / demo
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white"
        >
          Login
        </button>

        <p className="pt-3 text-center text-xs text-slate-500">
          EquipRegistry is an independent verification registry. Not a title authority.
        </p>
      </form>
    </div>
  );
}
