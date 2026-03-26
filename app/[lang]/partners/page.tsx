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

export default async function PartnersPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <PageHero
        title={t.pages.partners.title}
        subtitle={t.pages.partners.subtitle}
      />

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.pages.partners.insurersTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {t.pages.partners.insurersText}
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.pages.partners.rentalTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {t.pages.partners.rentalText}
            </p>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.pages.partners.financeTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {t.pages.partners.financeText}
            </p>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}