export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang, type Lang } from "@/lib/i18n/config";

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

function getSupportedAssets(lang: Lang) {
  switch (lang) {
    case "es":
      return {
        title: "Activos compatibles",
        items: [
          "Vehículos (coches, camiones y clásicos)",
          "Equipos y maquinaria",
          "Bicicletas y movilidad ligera",
        ],
      };
    case "de":
      return {
        title: "Unterstützte Assets",
        items: [
          "Fahrzeuge (Autos, Lkw und Klassiker)",
          "Maschinen und Geräte",
          "Fahrräder und leichte Mobilität",
        ],
      };
    case "nl":
      return {
        title: "Ondersteunde assets",
        items: [
          "Voertuigen (auto’s, trucks en classics)",
          "Machines en equipment",
          "Fietsen en lichte mobiliteit",
        ],
      };
    case "fr":
      return {
        title: "Actifs pris en charge",
        items: [
          "Véhicules (voitures, camions et classiques)",
          "Équipements et machines",
          "Vélos et mobilité légère",
        ],
      };
    case "it":
      return {
        title: "Asset supportati",
        items: [
          "Veicoli (auto, camion e classiche)",
          "Attrezzature e macchinari",
          "Biciclette e micromobilità",
        ],
      };
    case "pt":
      return {
        title: "Ativos suportados",
        items: [
          "Veículos (carros, camiões e clássicos)",
          "Equipamentos e maquinaria",
          "Bicicletas e mobilidade leve",
        ],
      };
    default:
      return {
        title: "Supported assets",
        items: [
          "Vehicles (cars, trucks and classic vehicles)",
          "Equipment and machinery",
          "Bikes and light mobility",
        ],
      };
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
  const supportedAssets = getSupportedAssets(lang);
  const query = searchParams ? await searchParams : undefined;
  const serial = query?.serial?.trim() || "";
  const normalizedSerial = serial ? serial.toUpperCase() : "";
  const status = normalizedSerial ? getStatus(normalizedSerial, lang) : null;

  const isLoggedIn = false;

  return (
    <>
      <SiteHeader lang={lang} serial={normalizedSerial} />

      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.hero.title}
          </h1>

          <p className="text-lg text-slate-600 mb-10">{t.hero.subtitle}</p>

          {isLoggedIn && (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>✅ {t.hero.loggedInMessage}</div>
              <div className="flex gap-2">
                <Link
                  href={`/${lang}/dashboard`}
                  className="px-3 py-2 rounded-lg bg-blue-700 text-white font-semibold"
                >
                  {t.hero.goToDashboard}
                </Link>
              </div>
            </div>
          )}

          <form
            method="GET"
            action={`/${lang}`}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              name="serial"
              defaultValue={normalizedSerial}
              placeholder={t.hero.placeholder}
              className="flex-1 px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="px-8 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 transition text-white font-semibold">
              {t.hero.search}
            </button>
          </form>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left">
            <p className="text-sm font-semibold text-slate-800 mb-2">
              {supportedAssets.title}
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              {supportedAssets.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3 text-sm text-slate-500">
            {t.hero.demoSerials}
            {DEMO_SERIALS.map((demoSerial) => (
              <Link
                key={demoSerial}
                href={`/${lang}?serial=${demoSerial}`}
                className="ml-2 underline hover:text-blue-700"
              >
                {demoSerial}
              </Link>
            ))}
          </div>

          {status && (
            <div
              id="search-result"
              className={`mt-12 text-left rounded-xl p-6 border-2 ${getStatusClasses(
                status.color
              )}`}
            >
              <h2 className="text-xl font-bold mb-3">{status.label}</h2>
              <p className="mb-4">{status.message}</p>

              {status.metadata && (
                <ul className="text-sm mb-4 space-y-1">
                  {status.metadata.map((item, index) => (
                    <li key={`${item.label}-${index}`}>
                      <strong>{item.label}:</strong> {item.value}
                    </li>
                  ))}
                </ul>
              )}

              {status.warning && (
                <p className="text-red-700 font-semibold mb-4">
                  {status.warning}
                </p>
              )}

              <div className="bg-white border rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">{t.result.whyThisMatters}</h3>
                <p className="text-sm">{status.why}</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                {status.actions?.map((action, index) => (
                  <a
                    key={`${action.label}-${index}`}
                    href={action.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${getActionClasses(
                      action.style
                    )}`}
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

      <section id="how" className="bg-slate-50 py-20 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t.howItWorks.title}
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-700 font-bold text-xl mb-2">
                {t.howItWorks.step1Title}
              </div>
              <p className="text-sm text-slate-600">{t.howItWorks.step1Text}</p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">
                {t.howItWorks.step2Title}
              </div>
              <p className="text-sm text-slate-600">{t.howItWorks.step2Text}</p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">
                {t.howItWorks.step3Title}
              </div>
              <p className="text-sm text-slate-600">{t.howItWorks.step3Text}</p>
            </div>

            <div className="bg-white rounded-2xl border p-6">
              <div className="text-blue-800 font-bold text-xl mb-2">
                {t.howItWorks.step4Title}
              </div>
              <p className="text-sm text-slate-600">{t.howItWorks.step4Text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">{t.trust.title}</h2>

          <p className="max-w-3xl mx-auto text-slate-600 mb-12">
            {t.trust.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                {t.trust.card1Title}
              </h3>
              <p className="text-sm text-slate-600">{t.trust.card1Text}</p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">
                {t.trust.card2Title}
              </h3>
              <p className="text-sm text-slate-600">{t.trust.card2Text}</p>
            </div>

            <div className="border rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-2 text-blue-800">
                {t.trust.card3Title}
              </h3>
              <p className="text-sm text-slate-600">{t.trust.card3Text}</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}