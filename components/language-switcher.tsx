import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth/getSession";
import LogoutButton from "@/components/logout-button";
import LanguageSwitcher from "@/components/language-switcher";

type Props = {
  lang: string;
};

const headerText = {
  en: {
    home: "Home",
    register: "Register",
    partners: "Partners",
    contact: "Contact",
    login: "Login",
    dashboard: "Dashboard",
    registrations: "Registrations",
    admin: "Admin",
  },
  es: {
    home: "Inicio",
    register: "Registrar",
    partners: "Partners",
    contact: "Contacto",
    login: "Iniciar sesión",
    dashboard: "Panel",
    registrations: "Registros",
    admin: "Admin",
  },
  de: {
    home: "Startseite",
    register: "Registrieren",
    partners: "Partner",
    contact: "Kontakt",
    login: "Anmelden",
    dashboard: "Dashboard",
    registrations: "Registrierungen",
    admin: "Admin",
  },
  fr: {
    home: "Accueil",
    register: "Enregistrer",
    partners: "Partenaires",
    contact: "Contact",
    login: "Connexion",
    dashboard: "Tableau de bord",
    registrations: "Enregistrements",
    admin: "Admin",
  },
  it: {
    home: "Home",
    register: "Registrare",
    partners: "Partner",
    contact: "Contatto",
    login: "Accedi",
    dashboard: "Dashboard",
    registrations: "Registrazioni",
    admin: "Admin",
  },
  nl: {
    home: "Home",
    register: "Registreren",
    partners: "Partners",
    contact: "Contact",
    login: "Inloggen",
    dashboard: "Dashboard",
    registrations: "Registraties",
    admin: "Admin",
  },
  pt: {
    home: "Início",
    register: "Registar",
    partners: "Parceiros",
    contact: "Contacto",
    login: "Iniciar sessão",
    dashboard: "Dashboard",
    registrations: "Registos",
    admin: "Admin",
  },
} as const;

export default async function SiteHeader({ lang }: Props) {
  const session = await getSession();
  const isAuthenticated = session.isAuthenticated;
  const isAdmin = session.isAuthenticated && session.user.role === "admin";

  const t =
    headerText[lang as keyof typeof headerText] ?? headerText.en;

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
            <Link href={`/${lang}`}>{t.home}</Link>
            <Link href={`/${lang}/register`}>{t.register}</Link>
            <Link href={`/${lang}/partners`}>{t.partners}</Link>
            <Link href={`/${lang}/contact`}>{t.contact}</Link>
            <Link href={`/${lang}/login`}>{t.login}</Link>
            <LanguageSwitcher />
          </nav>
        ) : (
          <nav className="flex items-center gap-8 text-sm text-zinc-900">
            <Link href={`/${lang}/dashboard`}>{t.dashboard}</Link>
            <Link href={`/${lang}/dashboard/registrations`}>
              {t.registrations}
            </Link>
            {isAdmin && <Link href={`/${lang}/admin`}>{t.admin}</Link>}
            <LogoutButton lang={lang} />
            <LanguageSwitcher />
          </nav>
        )}
      </div>
    </header>
  );
}