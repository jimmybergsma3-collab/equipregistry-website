import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "@/components/language-switcher";
import HeaderLoginButton from "@/components/auth/header-login-button";

type Props = {
  lang: string;
  serial?: string;
};

const headerText = {
  en: {
    home: "Home",
    register: "Register asset",
    partners: "For partners",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
  },
  es: {
    home: "Inicio",
    register: "Registrar activo",
    partners: "Para socios",
    contact: "Contacto",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    dashboard: "Panel",
  },
  de: {
    home: "Startseite",
    register: "Asset registrieren",
    partners: "Für Partner",
    contact: "Kontakt",
    login: "Anmelden",
    logout: "Abmelden",
    dashboard: "Dashboard",
  },
  fr: {
    home: "Accueil",
    register: "Enregistrer un actif",
    partners: "Pour partenaires",
    contact: "Contact",
    login: "Connexion",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
  },
  it: {
    home: "Home",
    register: "Registrare asset",
    partners: "Per partner",
    contact: "Contatto",
    login: "Accedi",
    logout: "Esci",
    dashboard: "Dashboard",
  },
  nl: {
    home: "Home",
    register: "Asset registreren",
    partners: "Voor partners",
    contact: "Contact",
    login: "Inloggen",
    logout: "Uitloggen",
    dashboard: "Dashboard",
  },
  pt: {
    home: "Início",
    register: "Registar ativo",
    partners: "Para parceiros",
    contact: "Contacto",
    login: "Iniciar sessão",
    logout: "Terminar sessão",
    dashboard: "Dashboard",
  },
  zh: {
    home: "首页",
    register: "注册资产",
    partners: "合作伙伴",
    contact: "联系",
    login: "登录",
    logout: "退出登录",
    dashboard: "仪表板",
  },
  ar: {
    home: "الرئيسية",
    register: "تسجيل الأصل",
    partners: "للشركاء",
    contact: "اتصال",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
  },
  hi: {
    home: "होम",
    register: "संपत्ति पंजीकरण",
    partners: "साझेदारों के लिए",
    contact: "संपर्क",
    login: "लॉगिन",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
  },
  ru: {
    home: "Главная",
    register: "Регистрация актива",
    partners: "Для партнеров",
    contact: "Контакт",
    login: "Вход",
    logout: "Выход",
    dashboard: "Панель",
  },
} as const;

function navLinkClassName() {
  return "inline-flex h-10 items-center text-sm font-medium text-zinc-800 transition hover:text-blue-700";
}

export default function SiteHeader({ lang }: Props) {
  const t = headerText[lang as keyof typeof headerText] ?? headerText.en;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-8 px-6">
        <div className="flex items-center">
          <Link href={`/${lang}`} className="flex shrink-0 items-center">
            <Image
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              width={190}
              height={44}
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>

        <div className="hidden min-w-0 items-center justify-center lg:flex">
          <nav className="flex items-center gap-8">
            <Link href={`/${lang}`} className={navLinkClassName()}>
              {t.home}
            </Link>

            <Link href={`/${lang}/register`} className={navLinkClassName()}>
              {t.register}
            </Link>

            <Link href={`/${lang}/partners`} className={navLinkClassName()}>
              {t.partners}
            </Link>

            <Link href={`/${lang}/contact`} className={navLinkClassName()}>
              {t.contact}
            </Link>
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden lg:flex h-10 items-center">
            <HeaderLoginButton
              lang={lang}
              loginLabel={t.login}
              logoutLabel={t.logout}
              dashboardLabel={t.dashboard}
            />
          </div>

          <div className="flex h-10 items-center">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}