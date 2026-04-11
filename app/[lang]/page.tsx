export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  searchParams?: Promise<{
    serial?: string;
  }>;
};

type ActionStyle = "primary" | "danger" | "secondary";
type StatusColor = "green" | "orange" | "red" | "gray";

type StatusAction = {
  label: string;
  href: string;
  style: ActionStyle;
};

type Status = {
  label: string;
  color: StatusColor;
  message: string;
  why: string;
  metadata?: { label: string; value: string }[];
  warning?: string;
  actions?: StatusAction[];
};

const DEMO_SERIALS = [
  "ER-REG-001",
  "ER-HIS-404",
  "ER-NOT-999",
  "ER-STOL-777",
] as const;

function getStatusClasses(color: StatusColor) {
  switch (color) {
    case "green":
      return "border-green-600 bg-green-50";
    case "orange":
      return "border-orange-500 bg-orange-50";
    case "red":
      return "border-red-600 bg-red-50";
    default:
      return "border-slate-400 bg-slate-100";
  }
}

function getActionClasses(style: ActionStyle) {
  switch (style) {
    case "primary":
      return "bg-blue-700 text-white hover:bg-blue-800";
    case "danger":
      return "border border-red-600 text-red-600 hover:bg-red-50";
    default:
      return "border border-slate-400 text-slate-700 hover:bg-slate-50";
  }
}

function getStatus(serial: string, lang: Lang): Status {
  const s = serial.trim().toUpperCase();
  const t = getDictionary(lang).statuses;

  if (s === "ER-REG-001") {
    return {
      label: t.registeredVerified.label,
      color: "green",
      message: t.registeredVerified.message,
      why: t.registeredVerified.why,
      metadata: [
        {
          label: t.registeredVerified.metadataStatus,
          value: t.metadataValues.active,
        },
        {
          label: t.registeredVerified.metadataPassport,
          value: t.metadataValues.full,
        },
        {
          label: t.registeredVerified.metadataValidation,
          value: t.metadataValues.lastValidation2025,
        },
      ],
      actions: [
        {
          label: t.registeredVerified.actionViewPassport,
          href: `/${lang}/passport/${encodeURIComponent(s)}`,
          style: "primary",
        },
      ],
    };
  }

  if (s === "ER-HIS-404") {
    return {
      label: t.historyUnknown.label,
      color: "orange",
      message: t.historyUnknown.message,
      why: t.historyUnknown.why,
      metadata: [
        {
          label: t.historyUnknown.metadataStatus,
          value: t.metadataValues.limitedPassport,
        },
        {
          label: t.historyUnknown.metadataRisk,
          value: t.metadataValues.medium,
        },
      ],
      actions: [
        {
          label: t.historyUnknown.actionViewPassport,
          href: `/${lang}/passport/${encodeURIComponent(s)}`,
          style: "secondary",
        },
        {
          label: t.historyUnknown.actionRequestVerification,
          href: `/${lang}/register`,
          style: "primary",
        },
        {
          label: t.historyUnknown.actionRegisterDocuments,
          href: `/${lang}/register`,
          style: "secondary",
        },
      ],
    };
  }

  if (s === "ER-STOL-777") {
    return {
      label: t.stolen.label,
      color: "red",
      message: t.stolen.message,
      warning: t.stolen.warning,
      why: t.stolen.why,
      metadata: [
        {
          label: t.stolen.metadataStatus,
          value: t.metadataValues.blacklisted,
        },
        {
          label: t.stolen.metadataRisk,
          value: t.metadataValues.high,
        },
        {
          label: t.stolen.metadataReportedBy,
          value: t.metadataValues.insurancePartner,
        },
        {
          label: t.stolen.metadataJurisdiction,
          value: t.metadataValues.euCrossBorderAlert,
        },
        {
          label: t.stolen.metadataReportDate,
          value: t.metadataValues.reportDate,
        },
      ],
      actions: [
        {
          label: t.stolen.actionContactAuthorities,
          href: `/${lang}/contact-authorities?registryId=${encodeURIComponent(s)}&caseId=ER-CASE-2026-00123`,
          style: "danger",
        },
        {
          label: t.stolen.actionVerifyCaseId,
          href: `/${lang}/register`,
          style: "secondary",
        },
      ],
    };
  }

  return {
    label: t.notRegistered.label,
    color: "gray",
    message: t.notRegistered.message,
    why: t.notRegistered.why,
    actions: [
      {
        label: t.notRegistered.actionRegister,
        href: `/${lang}/register`,
        style: "primary",
      },
    ],
  };
}

export default async function Home({ params, searchParams }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const t = getDictionary(lang);
  const dir = getLangDir(lang);
  const isRtl = dir === "rtl";
  const textAlignClass = isRtl ? "text-right" : "text-left";
  const query = searchParams ? await searchParams : undefined;
  const serial = query?.serial?.trim() || "";
  const normalizedSerial = serial ? serial.toUpperCase() : "";
  const status = normalizedSerial ? getStatus(normalizedSerial, lang) : null;

  const isLoggedIn = false;

  return (
    <>
      <SiteHeader lang={lang} serial={normalizedSerial} />

      <main dir={dir}>
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              {t.hero.title}
            </h1>

            <p className="mb-10 text-lg text-slate-600">{t.hero.subtitle}</p>

            {isLoggedIn && (
              <div className="mb-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:flex-row">
                <div>{t.hero.loggedInMessage}</div>
                <div className="flex gap-2">
                  <Link
                    href={`/${lang}/dashboard`}
                    className="rounded-lg bg-blue-700 px-3 py-2 font-semibold text-white"
                  >
                    {t.hero.goToDashboard}
                  </Link>
                </div>
              </div>
            )}

            <form
              method="GET"
              action={`/${lang}`}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                name="serial"
                dir="auto"
                defaultValue={normalizedSerial}
                placeholder={t.hero.placeholder}
                className="flex-1 rounded-xl border border-slate-300 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800">
                {t.hero.search}
              </button>
            </form>

            <div className={`mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 ${textAlignClass}`}>
              <p className="mb-2 text-sm font-semibold text-slate-800">
                {t.hero.supportedAssetsTitle}
              </p>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                {t.hero.supportedAssetsItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
              <span>{t.hero.demoSerials}</span>
              {DEMO_SERIALS.map((demoSerial) => (
                <Link
                  key={demoSerial}
                  href={`/${lang}?serial=${demoSerial}`}
                  className="underline hover:text-blue-700"
                >
                  {demoSerial}
                </Link>
              ))}
            </div>

            {status && (
              <div
                id="search-result"
                className={`mt-12 rounded-xl border-2 p-6 ${textAlignClass} ${getStatusClasses(status.color)}`}
              >
                <h2 className="mb-3 text-xl font-bold">{status.label}</h2>
                <p className="mb-4">{status.message}</p>

                {status.metadata && (
                  <ul className="mb-4 space-y-1 text-sm">
                    {status.metadata.map((item, index) => (
                      <li key={`${item.label}-${index}`}>
                        <strong>{item.label}:</strong> {item.value}
                      </li>
                    ))}
                  </ul>
                )}

                {status.warning && (
                  <p className="mb-4 font-semibold text-red-700">
                    {status.warning}
                  </p>
                )}

                <div className="mb-4 rounded-lg border bg-white p-4">
                  <h3 className="mb-2 font-semibold">{t.result.whyThisMatters}</h3>
                  <p className="text-sm">{status.why}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {status.actions?.map((action, index) => (
                    <a
                      key={`${action.label}-${index}`}
                      href={action.href}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${getActionClasses(action.style)}`}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {status && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.addEventListener('load', () => {
                  const el = document.getElementById('search-result');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                });
              `,
            }}
          />
        )}

        <section id="how" className="border-t bg-slate-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">
              {t.howItWorks.title}
            </h2>

            <div className={`grid gap-8 md:grid-cols-4 ${textAlignClass}`}>
              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-2 text-xl font-bold text-blue-700">
                  {t.howItWorks.step1Title}
                </div>
                <p className="text-sm text-slate-600">{t.howItWorks.step1Text}</p>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-2 text-xl font-bold text-blue-800">
                  {t.howItWorks.step2Title}
                </div>
                <p className="text-sm text-slate-600">{t.howItWorks.step2Text}</p>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-2 text-xl font-bold text-blue-800">
                  {t.howItWorks.step3Title}
                </div>
                <p className="text-sm text-slate-600">{t.howItWorks.step3Text}</p>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-2 text-xl font-bold text-blue-800">
                  {t.howItWorks.step4Title}
                </div>
                <p className="text-sm text-slate-600">{t.howItWorks.step4Text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-6 text-3xl font-bold">{t.trust.title}</h2>

            <p className="mx-auto mb-12 max-w-3xl text-slate-600">
              {t.trust.subtitle}
            </p>

            <div className={`grid gap-8 md:grid-cols-3 ${textAlignClass}`}>
              <div className="rounded-2xl border p-6">
                <h3 className="mb-2 text-lg font-semibold text-blue-700">
                  {t.trust.card1Title}
                </h3>
                <p className="text-sm text-slate-600">{t.trust.card1Text}</p>
              </div>

              <div className="rounded-2xl border p-6">
                <h3 className="mb-2 text-lg font-semibold text-blue-800">
                  {t.trust.card2Title}
                </h3>
                <p className="text-sm text-slate-600">{t.trust.card2Text}</p>
              </div>

              <div className="rounded-2xl border p-6">
                <h3 className="mb-2 text-lg font-semibold text-blue-800">
                  {t.trust.card3Title}
                </h3>
                <p className="text-sm text-slate-600">{t.trust.card3Text}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
