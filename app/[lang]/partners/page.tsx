import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang, type Lang } from "@/lib/i18n/config";

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

  const currentLang = lang as Lang;
  const t = getDictionary(currentLang);
  const p = t.pages.partners;

  return (
    <>
      <SiteHeader lang={currentLang} />

      <PageHero title={p.title} subtitle={p.subtitle} />

      <section className="border-b bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 px-6">
          <a
            href="#insurers"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {p.insurersTitle}
          </a>
          <a
            href="#finance"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {p.financeTitle}
          </a>
          <a
            href="#rental"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {p.rentalTitle}
          </a>
          <a
            href="#terminals"
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {p.terminalsTitle}
          </a>
        </div>
      </section>

      <section
        id="insurers"
        className="scroll-mt-32 border-b border-slate-200 bg-white py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-2xl font-semibold text-slate-900">
            {p.insurersTitle}
          </h3>

          <p className="mb-8 max-w-4xl text-base leading-7 text-slate-700">
            {p.insurersText}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {t.statuses.registeredVerified.label}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {t.statuses.registeredVerified.why}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {t.statuses.stolen.label}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {t.statuses.stolen.why}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="finance"
        className="scroll-mt-32 border-b border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-2xl font-semibold text-slate-900">
            {p.financeTitle}
          </h3>

          <p className="mb-6 max-w-4xl text-base leading-7 text-slate-700">
            {p.financeText}
          </p>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="mb-3 text-lg font-semibold text-slate-900">
              {p.financeRiskTitle}
            </h4>
            <p className="text-sm leading-6 text-slate-600">
              {p.financeRiskText}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.financeVerificationTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.financeVerificationText}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.financeTrustTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.financeTrustText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rental"
        className="scroll-mt-32 border-b border-slate-200 bg-white py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-2xl font-semibold text-slate-900">
            {p.rentalTitle}
          </h3>

          <p className="mb-8 max-w-4xl text-base leading-7 text-slate-700">
            {p.rentalText}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.rentalVisibilityTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.rentalVisibilityText}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.rentalPreventionTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.rentalPreventionText}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.rentalOriginTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.rentalOriginText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="terminals"
        className="scroll-mt-32 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-2xl font-semibold text-slate-900">
            {p.terminalsTitle}
          </h3>

          <p className="mb-8 max-w-4xl text-base leading-7 text-slate-700">
            {p.terminalsText}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.terminalsEntryTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.terminalsEntryText}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="mb-3 text-lg font-semibold text-slate-900">
                {p.terminalsCustomsTitle}
              </h4>
              <p className="text-sm leading-6 text-slate-600">
                {p.terminalsCustomsText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h3 className="mb-6 text-3xl font-semibold">{t.common.contactEquipRegistry}</h3>
          <p className="mb-8 text-lg leading-8 text-slate-200">
            {p.ctaText}
          </p>
          <a
            href={`/${currentLang}/contact`}
            className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-black transition hover:bg-slate-200"
          >
            {t.menu.contact}
          </a>
        </div>
      </section>

      <SiteFooter lang={currentLang} />
    </>
  );
}
