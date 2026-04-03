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
  },
  es: {
    home: "Inicio",
    register: "Registrar activo",
    partners: "Para socios",
    contact: "Contacto",
    login: "Iniciar sesión",
  },
  de: {
    home: "Startseite",
    register: "Asset registrieren",
    partners: "Für Partner",
    contact: "Kontakt",
    login: "Anmelden",
  },
  fr: {
    home: "Accueil",
    register: "Enregistrer un actif",
    partners: "Pour partenaires",
    contact: "Contact",
    login: "Connexion",
  },
  it: {
    home: "Home",
    register: "Registrare asset",
    partners: "Per partner",
    contact: "Contatto",
    login: "Accedi",
  },
  nl: {
    home: "Home",
    register: "Asset registreren",
    partners: "Voor partners",
    contact: "Contact",
    login: "Inloggen",
  },
  pt: {
    home: "Início",
    register: "Registar ativo",
    partners: "Para parceiros",
    contact: "Contacto",
    login: "Iniciar sessão",
  },

  // 🔽 NIEUW TOEGEVOEGD

  zh: {
    home: "首页",
    register: "注册资产",
    partners: "合作伙伴",
    contact: "联系",
    login: "登录",
  },
  ar: {
    home: "الرئيسية",
    register: "تسجيل الأصل",
    partners: "للشركاء",
    contact: "اتصال",
    login: "تسجيل الدخول",
  },
  hi: {
    home: "होम",
    register: "संपत्ति पंजीकरण",
    partners: "साझेदारों के लिए",
    contact: "संपर्क",
    login: "लॉगिन",
  },
  ru: {
    home: "Главная",
    register: "Регистрация актива",
    partners: "Для партнеров",
    contact: "Контакт",
    login: "Вход",
  },
} as const;

export default function SiteHeader({ lang }: Props) {
  const t = headerText[lang as keyof typeof headerText] ?? headerText.en;

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

        <nav className="flex items-center gap-6 text-sm text-zinc-900">
          <Link href={`/${lang}`}>{t.home}</Link>
          <Link href={`/${lang}/register`}>{t.register}</Link>
          <Link href={`/${lang}/partners`}>{t.partners}</Link>
          <Link href={`/${lang}/contact`}>{t.contact}</Link>

          <HeaderLoginButton lang={lang} label={t.login} />

          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}