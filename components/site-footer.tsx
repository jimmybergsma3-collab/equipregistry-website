import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import { getLangDir } from "@/lib/i18n/config";
import { getSiteFooterText } from "@/lib/i18n/site-footer";

type Props = {
  lang: Lang;
};

export default function SiteFooter({ lang }: Props) {
  const t = getSiteFooterText(lang);
  const dir = getLangDir(lang);
  const footerTextAlignClass = dir === "rtl" ? "md:text-right" : "md:text-left";

  return (
    <footer
      dir={dir}
      className="border-t border-slate-200 bg-slate-50 py-12 text-sm text-slate-600"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div
          className={`text-center ${footerTextAlignClass}`}
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href={`/${lang}/privacy`}
            className="transition hover:text-blue-800"
          >
            {t.footer.privacy}
          </Link>

          <Link
            href={`/${lang}/terms`}
            className="transition hover:text-blue-800"
          >
            {t.footer.terms}
          </Link>

          <Link
            href={`/${lang}/disclaimer`}
            className="transition hover:text-blue-800"
          >
            {t.footer.disclaimer}
          </Link>
        </div>
      </div>
    </footer>
  );
}
