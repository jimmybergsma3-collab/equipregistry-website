import Link from "next/link";

export default function PageShell({
  children,
  rightLinks,
}: {
  children: React.ReactNode;
  rightLinks?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              className="h-10 w-auto"
            />
            <span className="text-sm font-semibold text-slate-900">
              EquipRegistry
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            {rightLinks ?? (
              <>
                <Link className="text-slate-700 hover:text-slate-900" href="/#how-it-works">
                  How it works
                </Link>
                <Link className="text-slate-700 hover:text-slate-900" href="/login">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
