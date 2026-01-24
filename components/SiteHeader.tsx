// components/SiteHeader.tsx
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo + naam (altijd zichtbaar) */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <img
            src="/equipregistry_logo.png"
            alt="EquipRegistry"
            className="h-9 w-auto shrink-0"
            onError={(e) => {
              // als image niet laadt: verberg img zodat tekst netjes staat
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-semibold text-slate-900 truncate">EquipRegistry</span>
        </Link>

        {/* Rechts: altijd zichtbaar (ook mobiel) */}
        <nav className="flex items-center gap-4 text-sm font-medium">
          <a href="/#how" className="hover:text-blue-700">
            How it works
          </a>
          <Link href="/login?next=/" className="hover:text-blue-700">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
