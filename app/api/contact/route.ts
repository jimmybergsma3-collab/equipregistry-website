import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <PageHero
        title={t.pages.contact.title}
        subtitle={t.pages.contact.subtitle}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl border p-8 bg-slate-50">
            <h2 className="text-2xl font-semibold mb-4">
              {t.pages.contact.introTitle}
            </h2>
            <p className="text-slate-600 mb-4">{t.pages.contact.introText}</p>

            <p className="text-sm text-slate-500">{t.pages.contact.note}</p>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}