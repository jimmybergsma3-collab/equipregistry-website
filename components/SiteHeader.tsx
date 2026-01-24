import Link from "next/link";

export function SiteHeader({
  variant = "public",
}: {
  variant?: "public" | "dashboard";
}) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo (klein op mobiel) */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <img
            src="/logo.png"
            alt="EquipRegistry"
            className="h-9 w-auto max-w-[140px] shrink-0"
          />
          <span className="hidden sm:block font-semibold truncate">
            EquipRegistry
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {variant === "public" ? (
            <>
              <Link href="/#how" className="hover:underline">
                How it works
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:underline">
                Overview
              </Link>
              <Link href="/dashboard/insurance" className="hover:underline">
                Machines
              </Link>
              <Link href="/dashboard/insurance/alerts" className="hover:underline">
                Alerts
              </Link>
              <Link href="/dashboard/owner" className="hover:underline">
                Owner portal →
              </Link>
            </>
          )}
        </nav>

        {/* Mobile: 1 knop (geen chaos) */}
        <div className="md:hidden">
          <Link
            href={variant === "public" ? "/login" : "/dashboard"}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {variant === "public" ? "Login" : "Dashboard"}
          </Link>
        </div>
      </div>
    </header>
  );
}
