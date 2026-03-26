import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth/getSession";
import LogoutButton from "@/components/logout-button";
import LanguageSwitcher from "@/components/language-switcher";

type Props = {
  lang: string;
};

export default async function SiteHeader({ lang }: Props) {
  const session = await getSession();
  const isAuthenticated = session.isAuthenticated;
  const isAdmin = session.isAuthenticated && session.user.role === "admin";

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href={`/${lang}`} className="flex items-center">
          <Image
            src="/equipregistry_logo.png"
            alt="EquipRegistry"
            width={190}
            height={44}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {!isAuthenticated ? (
          <nav className="flex items-center gap-8 text-sm text-zinc-900">
            <Link href={`/${lang}`}>Home</Link>
            <Link href={`/${lang}/register`}>Registreren</Link>
            <Link href={`/${lang}/partners`}>Partners</Link>
            <Link href={`/${lang}/contact`}>Contact</Link>
            <Link href={`/${lang}/login`}>Inloggen</Link>
            <LanguageSwitcher />
          </nav>
        ) : (
          <nav className="flex items-center gap-8 text-sm text-zinc-900">
            <Link href={`/${lang}/dashboard`}>Dashboard</Link>
            <Link href={`/${lang}/dashboard/registrations`}>Registraties</Link>
            {isAdmin && <Link href={`/${lang}/admin`}>Admin</Link>}
            <LogoutButton lang={lang} />
            <LanguageSwitcher />
          </nav>
        )}
      </div>
    </header>
  );
}