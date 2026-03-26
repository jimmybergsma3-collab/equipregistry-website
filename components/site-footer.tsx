import type { Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  lang: Lang;
};

export default function SiteFooter({ lang }: Props) {
  const t = getDictionary(lang);

  return (
    <footer className="py-12 text-sm text-slate-500 border-t bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div suppressHydrationWarning>
          © {new Date().getFullYear()} {t.footer.copyright}
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <a href={`/${lang}/privacy`} className="hover:text-blue-800">
            {t.footer.privacy}
          </a>
          <a href={`/${lang}/terms`} className="hover:text-blue-800">
            {t.footer.terms}
          </a>
          <a href={`/${lang}/disclaimer`} className="hover:text-blue-800">
            {t.footer.disclaimer}
          </a>
        </div>
      </div>
    </footer>
  );
}