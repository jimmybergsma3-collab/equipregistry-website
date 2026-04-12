import Image from "next/image";
import Link from "next/link";
import HeaderLoginButton from "@/components/auth/header-login-button";
import LanguageSwitcher from "@/components/language-switcher";
import { getLangDir, isValidLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  lang: string;
  serial?: string;
  showDivider?: boolean;
};

function navLinkClassName(isRtl: boolean) {
  return `inline-flex h-10 items-center rounded-md px-1 text-sm font-medium text-zinc-700 transition hover:text-zinc-950 ${
    isRtl ? "text-right" : "text-left"
  }`;
}

export default function SiteHeader({
  lang,
  showDivider = true,
}: Props) {
  const safeLang = isValidLang(lang) ? lang : "en";
  const t = getDictionary(safeLang);
  const dir = getLangDir(safeLang);
  const isRtl = dir === "rtl";
  const menuPanelPositionClass = isRtl ? "left-0" : "right-0";
  const mobileTextAlignClass = isRtl ? "text-right" : "text-left";
  const navItems = [
    { href: `/${safeLang}`, label: t.menu.home },
    { href: `/${safeLang}/register`, label: t.menu.registerAsset },
    { href: `/${safeLang}/pricing`, label: t.menu.pricing },
    { href: `/${safeLang}/partners`, label: t.menu.partners },
    { href: `/${safeLang}/contact`, label: t.menu.contact },
  ];

  return (
    <header
      dir={dir}
      className={[
        "sticky top-0 z-40 bg-white/95 pb-3 backdrop-blur",
        showDivider ? "border-b border-zinc-200" : "",
      ].join(" ")}
    >
      <div className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href={`/${safeLang}`} className="flex shrink-0 items-center">
            <Image
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              width={150}
              height={35}
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>

        <div className="hidden min-w-0 items-center justify-center xl:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClassName(isRtl)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden h-10 items-center xl:flex">
            <HeaderLoginButton
              lang={safeLang}
              loginLabel={t.nav.login}
              logoutLabel={t.nav.logout}
              dashboardLabel={t.nav.dashboard}
            />
          </div>

          <div className="flex h-10 items-center">
            <LanguageSwitcher currentLang={safeLang} />
          </div>

          <details className="relative xl:hidden">
            <summary className="flex h-10 cursor-pointer list-none items-center rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950">
              {t.nav.menu}
            </summary>

            <div
              className={`absolute top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)] ${menuPanelPositionClass}`}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 ${mobileTextAlignClass}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 border-t border-zinc-200 pt-4">
                <HeaderLoginButton
                  lang={safeLang}
                  loginLabel={t.nav.login}
                  logoutLabel={t.nav.logout}
                  dashboardLabel={t.nav.dashboard}
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
