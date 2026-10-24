import { publicIncidents } from "@/lib/incidents/public-read";
import { incidentPresentation, incidentWords } from "@/lib/i18n/incident-status";
export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getLandingText } from "@/lib/i18n/landing";
import styles from "./landing.module.css";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { prisma } from "@/lib/db";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";
import { getPublicHomeText } from "@/lib/i18n/public-home";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";
import { getStolenCaseText } from "@/lib/i18n/stolen-case";
import {
  getRegistryAssetStatus,
  getStolenCaseRecord,
} from "@/lib/registry/request-meta";
import {
  getPublicDateValue,
  getPublicIncidentLocation,
} from "@/lib/registry/stolen-case";

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


function normalizeLookupSerial(serial: string) {
  return serial.trim().toUpperCase();
}

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

function getDemoStatus(serial: string, lang: Lang): Status {
  const s = normalizeLookupSerial(serial);
  const t = repairMojibakeDeep(getPublicHomeText(lang)).statuses;

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
          label: t.historyUnknown.actionRegisterDocuments,
          href: `/${lang}/register`,
          style: "primary",
        },
      ],
    };
  }

  if (s === "ER-STOL-777") {
    return {
      label: incidentWords(lang).stolen + " — " + incidentWords(lang).active,
      color: "red",
      message: t.stolen.message,
      warning: t.stolen.warning,
      why: t.stolen.why,
      metadata: [
        {
          label: t.stolen.metadataStatus,
          value: incidentWords(lang).active,
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
          label: t.stolen.actionReportSighting,
          href: `/${lang}/report-sighting?registryId=${encodeURIComponent(s)}&caseId=ER-CASE-2026-00123`,
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

async function getStoredStatus(serial: string, lang: Lang): Promise<Status | null> {
  const trimmedSerial = serial.trim();
  const normalizedSerial = normalizeLookupSerial(serial);

  if (!trimmedSerial) {
    return null;
  }

  const orderBy = [
    { updatedAt: "desc" as const },
    { createdAt: "desc" as const },
    { reference: "asc" as const },
  ];

  let request = await prisma.registrationRequest.findFirst({
    where: {
      deletedAt: null,
      requestStatus: "passport_issued",
      reference: normalizedSerial,
    },
    orderBy,
    select: {
      reference: true,
      dynamicFields: true,
    },
  });

  if (!request) {
    request = await prisma.registrationRequest.findFirst({
      where: {
        deletedAt: null,
        requestStatus: "passport_issued",
        serialNumber: {
          equals: trimmedSerial,
          mode: "insensitive",
        },
      },
      orderBy,
      select: {
        reference: true,
        dynamicFields: true,
      },
    });
  }

  if (!request) {
    return null;
  }

  const t = repairMojibakeDeep(getPublicHomeText(lang)).statuses;
  const stolenText = repairMojibakeDeep(getStolenCaseText(lang));
  const stolenCase = getStolenCaseRecord(request.dynamicFields);

  const incidents = await publicIncidents(request.reference, request.dynamicFields);
  const view = incidentPresentation(incidents, lang);
  if (view && !(incidents.current?.legacy && stolenCase?.isStolen && stolenCase.status === "open")) {
    return {label: view.label + " — " + view.state, color:view.color, message:view.message, why:view.state,
      metadata:incidents.current ? [{label:"Incident reference",value:incidents.current.reference}] : [],
      actions:[...(incidents.current?.state === "ACTIVE" && incidents.current.type === "STOLEN" ? [{label:t.stolen.actionContactAuthorities,href:"/"+lang+"/contact-authorities?registryId="+encodeURIComponent(request.reference)+"&caseId="+encodeURIComponent(incidents.current.reference),style:"danger" as const}] : []),{label:t.registeredVerified.actionViewPassport,href:"/" + lang + "/passport/" + encodeURIComponent(request.reference),style:"secondary"}]};
  }

  if (stolenCase?.isStolen && stolenCase.status === "open") {
    return {
      label: view ? `${view.label} — ${view.state}` : t.stolen.label,
      color: "red",
      message: view?.message ?? t.stolen.message,
      warning: t.stolen.warning,
      why: t.stolen.why,
      metadata: [
        {
          label: t.stolen.metadataStatus,
          value: view?.state ?? t.stolen.label,
        },
        {
          label: t.stolen.metadataRisk,
          value: t.metadataValues.high,
        },
        {
          label: stolenText.public.caseReference,
          value: stolenCase.caseReference,
        },
        {
          label: stolenText.public.incidentLocation,
          value: getPublicIncidentLocation(
            stolenCase,
            stolenText.public.unknownLocation
          ),
        },
        {
          label: stolenText.public.incidentDate,
          value: getPublicDateValue(
            stolenCase.incidentDate,
            stolenText.public.unknownDate
          ),
        },
      ],
      actions: [
        {
          label: t.stolen.actionContactAuthorities,
          href: `/${lang}/contact-authorities?registryId=${encodeURIComponent(
            request.reference
          )}&caseId=${encodeURIComponent(stolenCase.caseReference)}`,
          style: "danger",
        },
        {
          label: t.registeredVerified.actionViewPassport,
          href: `/${lang}/passport/${encodeURIComponent(request.reference)}`,
          style: "secondary",
        },
      ],
    };
  }

  const registryStatus = getRegistryAssetStatus(
    request.dynamicFields,
    "passport_issued"
  );

  if (registryStatus === "history_unknown") {
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
          href: `/${lang}/passport/${encodeURIComponent(request.reference)}`,
          style: "secondary",
        },
      ],
    };
  }

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
    ],
    actions: [
      {
        label: t.registeredVerified.actionViewPassport,
        href: `/${lang}/passport/${encodeURIComponent(request.reference)}`,
        style: "primary",
      },
    ],
  };
}

async function getStatus(serial: string, lang: Lang): Promise<Status> {
  const storedStatus = await getStoredStatus(serial, lang);
  return storedStatus ?? getDemoStatus(serial, lang);
}

export default async function Home({ params, searchParams }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = repairMojibakeDeep(getPublicHomeText(safeLang));
  const dir = getLangDir(safeLang);
  const isRtl = dir === "rtl";
  const textAlignClass = isRtl ? "text-right" : "text-left";
  const query = searchParams ? await searchParams : undefined;
  const serial = query?.serial?.trim() || "";
  const normalizedSerial = serial ? normalizeLookupSerial(serial) : "";
  const status = normalizedSerial
    ? await getStatus(serial, safeLang)
    : null;
  const l = getLandingText(safeLang);
  const passportFields = ['Caterpillar', '980 Wheel Loader', '2021'];
  const demoHref = `/${lang}/passport/ER-REG-001`;

  return (
    <>
      <div className={styles.header}><SiteHeader lang={lang} serial={normalizedSerial} /></div>
      <main dir={dir} className={styles.landing}>
        <section className={styles.hero} aria-labelledby="landing-title">
          <Image src="/landing/hero.png" alt="" fill priority sizes="100vw" className={styles.heroImage} />
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div className={styles.copy}>
              <h1 id="landing-title">{(safeLang === 'nl' ? 'Elk bezit heeft een eigen identiteit. De geschiedenis ervan verdient dat ook.' : t.hero.title).split(/(?<=[.।])\s+/u).map(sentence => <span key={sentence}>{sentence}</span>)}</h1>
              <p>{t.hero.subtitle}</p>
              <p>{t.hero.supportingText}</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href={`/${lang}/register`}>{l.register}<span aria-hidden="true">→</span></Link>
                <a className={styles.secondary} href="#demo">{l.example}</a>
              </div>
              <p className={styles.price}><span>{l.price}</span><strong>€ 9,95</strong></p>
            </div>
            <div className={styles.phone}>
              <Image className={styles.phoneLogo} src="/equipregistry_logo.png" width={150} height={35} alt="EquipRegistry" />
              <h2>{l.passport}</h2>
              <span className={styles.badge}>DEMO</span>
              <div className={styles.document}><strong>ER-REG-001</strong><small>Caterpillar 980 Wheel Loader</small></div>
              <dl>{l.fields.map((field,i) => <div key={field}><dt>{field}</dt><dd>{passportFields[i]}</dd></div>)}</dl>
              <p>{l.demoText}</p>
              <a href="#demo" className={styles.phoneLink}>{l.example} →</a>
            </div>
          </div>
        </section>

        <section id="verify" className={styles.lookup} aria-labelledby="verify-title">
          <div className={styles.wrap}>
            <div className={styles.lookupRow}>
              <div><h2 id="verify-title">{l.searchTitle}</h2><p>{t.hero.placeholder}</p></div>
              <form method="GET" action={`/${lang}`}>
                <label htmlFor="asset-serial" className="sr-only">{t.hero.placeholder}</label>
                <input id="asset-serial" name="serial" dir="auto" defaultValue={normalizedSerial} placeholder={t.hero.placeholder} required />
                <button className={styles.primary} type="submit">{t.hero.search}</button>
              </form>
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


        <section className={styles.section} aria-labelledby="categories-title">
          <div className={styles.wrap}>
            <h2 id="categories-title">{l.categoriesTitle}</h2>
            <p className={styles.intro}>{l.categoriesIntro}</p>
            <div className={styles.grid}>
              {l.categories.map((category,i) => <Link href={`/${lang}/register`} className={styles.card} key={category}>
                <div aria-hidden="true" className={styles.categoryImage} style={{backgroundPosition: `${([51,208,366,523,680,837][i] / 884) * 100}% 48.6014%`}} />
                <div className={styles.cardBody}><h3>{category}</h3><p>{l.descriptions[i]}</p><span className={styles.arrow} aria-hidden="true">→</span></div>
              </Link>)}
            </div>
          </div>
        </section>

        <section id="how" className={`${styles.section} ${styles.how}`} aria-labelledby="how-title">
          <div className={`${styles.wrap} ${styles.howGrid}`}>
            <div>
              <h2 id="how-title">{l.how}</h2><p className={styles.intro}>{l.howIntro}</p>
              <ol className={styles.steps}>{l.steps.map((step,i) => <li className={styles.step} key={step}><span className={styles.number} aria-hidden="true">{i+1}</span><h3>{step}</h3><p>{l.stepText[i]}</p></li>)}</ol>
            </div>
            <article id="demo" className={styles.demo} aria-labelledby="demo-title">
              <span className={styles.badge}>DEMO</span><h3 id="demo-title">{l.passport}</h3><strong>ER-REG-001</strong>
              <dl>{l.fields.map((field,i) => <div key={field}><dt>{field}</dt><dd>{passportFields[i]}</dd></div>)}</dl>
              <p>{l.demoText}</p>
              <Link className={styles.secondary} href={demoHref}>{l.open} <span aria-hidden="true">→</span></Link>
            </article>
          </div>
        </section>
        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.camper} aria-hidden="true" />
          <div className={`${styles.wrap} ${styles.closingInner}`}><div className={styles.closingCopy}>
            <h2 id="closing-title">{l.end}</h2><p>{l.endText}</p>
            <div className={styles.actions}><Link className={styles.primary} href={`/${lang}/register`}>{l.register}<span aria-hidden="true">→</span></Link></div>
          </div></div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {lang} = await params;
  if (!isValidLang(lang)) return {};
  const text = repairMojibakeDeep(getPublicHomeText(lang));
  return {title: 'EquipRegistry | ' + getLandingText(lang).passport, description: text.hero.subtitle};
}
