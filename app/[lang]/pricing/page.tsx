import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";
import { getPricingPageContent } from "@/lib/i18n/pricing-page";
import {
  type AssetPricingCategory,
  formatPricingAmount,
  PRICING,
} from "@/lib/registry/pricing";

type Props = {
  params: Promise<{ lang: string }>;
};

const PRICING_SECTION_ORDER: AssetPricingCategory[] = [
  "light_mobility_step",
  "bike",
  "standard_vehicle",
  "heavy_asset",
];

function Section({
  pricingCategory,
  content,
  locale,
  registrationLabel,
  yearlyLabel,
  examplesLabel,
  textAlignClass,
}: {
  pricingCategory: AssetPricingCategory;
  content: {
    title: string;
    description: string;
    examples: string[];
  };
  locale: Lang;
  registrationLabel: string;
  yearlyLabel: string;
  examplesLabel: string;
  textAlignClass: string;
}) {
  const pricing = PRICING[pricingCategory];

  return (
    <section className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0 last:pb-0">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className={textAlignClass}>
          <h2 className="text-xl font-semibold text-zinc-950">{content.title}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-xs tracking-[0.14em] text-zinc-500">
                {registrationLabel}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {formatPricingAmount(pricing.registration, locale)}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-xs tracking-[0.14em] text-zinc-500">
                {yearlyLabel}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-950">
                {formatPricingAmount(pricing.yearly, locale)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {content.description}
          </p>
        </div>
        <div className={`rounded-2xl border border-zinc-200 bg-zinc-50 p-5 ${textAlignClass}`}>
          <p className="text-sm leading-6 text-zinc-700">
            <span className="font-semibold text-zinc-900">{examplesLabel}:</span>{" "}
            {content.examples.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
}

function Info({
  title,
  text,
  textAlignClass,
}: {
  title: string;
  text: string;
  textAlignClass: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white p-6 ${textAlignClass}`}
    >
      <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
    </section>
  );
}

export default async function PricingPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const dir = getLangDir(currentLang);
  const isRtl = dir === "rtl";
  const textAlignClass = isRtl ? "text-right" : "text-left";
  const ctaLayoutClass = isRtl ? "justify-end" : "";
  const content = getPricingPageContent(currentLang);

  return (
    <>
      <SiteHeader lang={currentLang} />
      <main dir={dir} className="min-h-screen bg-white">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className={`mb-10 ${textAlignClass}`}>
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-500">
                {content.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 sm:text-base">
                {content.subtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
              {PRICING_SECTION_ORDER.map((pricingCategory) => (
                <Section
                  key={pricingCategory}
                  pricingCategory={pricingCategory}
                  content={content.sections[pricingCategory]}
                  locale={currentLang}
                  registrationLabel={content.labels.registration}
                  yearlyLabel={content.labels.yearly}
                  examplesLabel={content.labels.examples}
                  textAlignClass={textAlignClass}
                />
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <Info
                title={content.info.afterPayment.title}
                text={content.info.afterPayment.text}
                textAlignClass={textAlignClass}
              />
              <Info
                title={content.info.passport.title}
                text={content.info.passport.text}
                textAlignClass={textAlignClass}
              />
              <Info
                title={content.info.historyUnknown.title}
                text={content.info.historyUnknown.text}
                textAlignClass={textAlignClass}
              />
              <Info
                title={content.info.annualValidation.title}
                text={content.info.annualValidation.text}
                textAlignClass={textAlignClass}
              />
            </div>

            <div className={`mt-10 flex flex-wrap gap-3 ${ctaLayoutClass}`}>
              <Link
                href={`/${currentLang}/register`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {content.actions.startRegistration}
              </Link>
              <Link
                href={`/${currentLang}/contact`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
              >
                {content.actions.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={currentLang} />
    </>
  );
}
