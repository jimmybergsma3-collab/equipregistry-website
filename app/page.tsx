export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";
import { SiteHeader } from "@/components/SiteHeader";

/* ================= TYPES ================= */

type Props = {
  searchParams: Promise<{
    serial?: string;
  }>;
};

type Status = {
  label: string;
  color: "green" | "orange" | "red" | "gray";
  message: string;
  why: string;
  metadata?: { label: string; value: string }[];
  warning?: string;
  actions?: {
    label: string;
    href: string;
    style: "primary" | "danger" | "secondary";
  }[];
};

/* ================= STATUS LOGIC ================= */

function getStatus(serial: string): Status {
  const s = serial.trim().toUpperCase();

  if (s === "ER-REG-001") {
    return {
      label: "Registered & Verified",
      color: "green",
      message:
        "This machine is registered in EquipRegistry and its legal origin has been verified.",
      why:
        "This equipment has a verified legal origin and an active registry passport.",
      metadata: [
        { label: "Status", value: "Active" },
        { label: "Registry passport", value: "Full" },
        { label: "Last validation", value: "2025" },
      ],
      actions: [
        {
          label: "View passport",
          href: `/passport/${encodeURIComponent(s)}`,
          style: "primary",
        },
      ],
    };
  }

  if (s === "ER-HIS-404") {
    return {
      label: "History Unknown",
      color: "orange",
      message:
        "This machine exists in the registry, but its full ownership history could not be verified.",
      why:
        "Incomplete ownership history increases fraud, insurance and compliance risk.",
      metadata: [
        { label: "Status", value: "Limited passport" },
        { label: "Risk level", value: "Medium" },
      ],
      actions: [
        {
          label: "View passport (limited)",
          href: `/passport/${encodeURIComponent(s)}`,
          style: "secondary",
        },
        {
          label: "Request verification",
          href: `/action?type=verify&registryId=${encodeURIComponent(s)}`,
          style: "primary",
        },
        {
          label: "Register documents",
          href: `/action?type=register&registryId=${encodeURIComponent(s)}`,
          style: "secondary",
        },
      ],
    };
  }

  if (s === "ER-STOL-777") {
    return {
      label: "Stolen Equipment – Red Flag",
      color: "red",
      message:
        "This machine has been officially reported stolen and is actively blacklisted in EquipRegistry.",
      warning: "Do NOT purchase, insure, rent or transport this machine.",
      why:
        "Any transaction involving stolen equipment may lead to legal and financial consequences.",
      metadata: [
        { label: "Status", value: "Blacklisted" },
        { label: "Risk level", value: "High" },
        { label: "Reported by", value: "Insurance partner" },
        { label: "Jurisdiction", value: "EU / Cross-border alert" },
        { label: "Report date", value: "2025-03-12" },
      ],
      actions: [
        {
          label: "Report sighting",
          href: `/action?type=report&registryId=${encodeURIComponent(s)}`,
          style: "primary",
        },
        {
          label: "Contact authorities",
          href: `/action?type=authorities&registryId=${encodeURIComponent(
            s
          )}&caseId=ER-CASE-2026-00123`,
          style: "danger",
        },
        {
          label: "Verify case ID",
          href: `/action?type=verify&registryId=${encodeURIComponent(s)}`,
          style: "secondary",
        },
      ],
    };
  }

  return {
    label: "Not Registered",
    color: "gray",
    message: "This serial number is not registered in EquipRegistry.",
    why: "Unregistered equipment lacks a verified ownership and history record.",
    actions: [
      {
        label: "Register this machine",
        href: "/action?type=register",
        style: "primary",
      },
    ],
  };
}

/* ================= PAGE ================= */

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const serial = params.serial;
  const status = serial ? getStatus(serial) : null;

  const session = await getSession();
  const isLoggedIn = !!session?.isAuthenticated;

  // Helper: if logged in, send actions to dashboard instead of login
  const dashboardTargetFor = (registryId?: string) =>
    registryId
      ? `/dashboard/passport/${encodeURIComponent(registryId)}`
      : "/dashboard";

  const resolveActionHref = (href: string) => {
    // Keep non-action links unchanged
    if (!href.startsWith("/action")) return href;

    // Not logged in -> keep /action gate (it will redirect to login with next)
    if (!isLoggedIn) return href;

    // Logged in -> go directly to dashboard passport when possible
    if (serial) return dashboardTargetFor(serial.trim().toUpperCase());
    return "/dashboard";
  };

  async function logout() {
    "use server";
    const { cookies } = await import("next/headers");
    const jar = await cookies();
    jar.set("er_session", "", { path: "/", httpOnly: true, maxAge: 0 });
    redirect("/");
  }

  return (
    <>
      {/* ✅ New responsive header */}
      <SiteHeader variant="public" />

      {/* Optional: keep logout for logged-in users (mobile-safe) */}
      {isLoggedIn && (
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-end gap-3">
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-700">
              Dashboard
            </Link>
            <form action={logout}>
              <button className="text-sm font-medium hover:text-blue-700" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= HERO + SEARCH ================= */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Verify Equipment History Worldwide
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            A global registry to prevent equipment fraud, theft and insurance risk.
          </p>

          {/* Logged-in banner */}
          {isLoggedIn && (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                ✅ You’re logged in. You can use search normally and still access private passports.
              </div>
              <div className="flex gap-2">
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg bg-blue-700 text-white font-semibold"
                >
                  Go to dashboard
                </Link>
              </div>
            </div>
          )}

          <form method="GET" action="/" className="flex flex-col sm:flex-row gap-3">
            <input
              name="serial"
              defaultValue={serial || ""}
              placeholder="Enter serial number"
              className="flex-1 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="px-8 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 transition text-white font-semibold">
              Search
            </button>
          </form>

          {/* ===== DEMO SERIALS ===== */}
          <div className="mt-3 text-sm text-slate-500">
            Demo serials:
            {["ER-REG-001", "ER-HIS-404", "ER-NOT-999", "ER-STOL-777"].map((s) => (
              <a key={s} href={`/?serial=${s}`} className="ml-2 underline hover:text-blue-700">
                {s}
              </a>
            ))}
          </div>

          {/* ================= RESULT ================= */}
          {status && (
            <div
              id="search-result"
              className={`mt-12 text-left rounded-xl p-6 border-2 ${
                status.color === "green"
                  ? "border-green-600 bg-green-50"
                  : status.color === "orange"
                  ? "border-orange-500 bg-orange-50"
                  : status.color === "red"
                  ? "border-red-600 bg-red-50"
                  : "border-slate-400 bg-slate-100"
              }`}
            >
              <h2 className="text-xl font-bold mb-3">{status.label}</h2>
              <p className="mb-4">{status.message}</p>

              {status.metadata && (
                <ul className="text-sm mb-4 space-y-1">
                  {status.metadata.map((m, i) => (
                    <li key={i}>
                      <strong>{m.label}:</strong> {m.value}
                    </li>
                  ))}
                </ul>
              )}

              {status.warning && (
                <p className="text-red-700 font-semibold mb-4">{status.warning}</p>
              )}

              <div className="bg-white border rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">Why this matters</h3>
                <p className="text-sm">{status.why}</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {status.actions?.map((a, i) => (
                  <a
                    key={i}
                    href={resolveActionHref(a.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      a.style === "primary"
                        ? "bg-blue-700 text-white"
                        : a.style === "danger"
                        ? "border border-red-600 text-red-600"
                        : "border border-slate-400 text-slate-700"
                    }`}
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== AUTO SCROLL SCRIPT ===== */}
      {status && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const el = document.getElementById('search-result');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              });
            `,
          }}
        />
      )}

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="bg-slate-50 py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How EquipRegistry Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-700 font-bold text-xl mb-2">1. Check</div>
              <p className="text-sm text-slate-600">
                Enter the equipment serial number to instantly check registration status.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">2. Verify</div>
              <p className="text-sm text-slate-600">
                Review ownership history, documents and validation level.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">3. Register</div>
              <p className="text-sm text-slate-600">
                Register equipment and upload proof of legal origin where required.
              </p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">4. Use</div>
              <p className="text-sm text-slate-600">
                Use the registry passport for insurance, rental, resale or compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Built for Trust at Global Scale</h2>

          <p className="max-w-3xl mx-auto text-slate-600 mb-12">
            EquipRegistry is designed as neutral infrastructure for the equipment industry —
            supporting insurers, rental companies, professional owners and cross-border transactions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">Insurance-ready</h3>
              <p className="text-sm text-slate-600">
                Structured to support underwriting, validation cycles and risk-based decision making.
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">
                Independent & Neutral
              </h3>
              <p className="text-sm text-slate-600">
                Not tied to manufacturers, dealers or jurisdictions — one global source of truth.
              </p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">Designed to Scale</h3>
              <p className="text-sm text-slate-600">
                From single machines to global fleets, built for high-volume, multi-country adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 text-sm text-slate-500 border-t bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} EquipRegistry — Concept demo for investors & insurers
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-blue-800">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-800">
              Terms & Conditions
            </a>
            <a href="/disclaimer" className="hover:text-blue-800">
              Disclaimer
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
