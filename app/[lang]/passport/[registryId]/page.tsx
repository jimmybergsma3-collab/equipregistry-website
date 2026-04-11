import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import OfficialPassport from "@/components/passport/official-passport";
import { getDictionary } from "@/lib/i18n/dictionary";
import {
  getLangDir,
  isRTL,
  isValidLang,
  type Lang,
} from "@/lib/i18n/config";
import { getPassportPageContent } from "@/lib/i18n/passport-page";
import {
  getCategoryByValue,
  getSubcategoriesByCategory,
} from "@/lib/registry/categories";

type Props = {
  params: Promise<{
    lang: string;
    registryId: string;
  }>;
};

function maskSerial(serial: string | null, unavailable: string) {
  if (!serial) return unavailable;

  if (serial.length <= 6) {
    return `${serial.slice(0, 2)}***`;
  }

  return `${serial.slice(0, 4)}*****${serial.slice(-2)}`;
}

function getDisplayValue(
  value: string | null | undefined,
  unavailable: string
) {
  const normalized = value?.trim();
  return normalized ? normalized : unavailable;
}

function getAppOrigin(
  headerList: Headers,
  lang: Lang,
  registryId: string
) {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost ?? headerList.get("host");
  const proto =
    headerList.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");

  if (host) {
    return `${proto}://${host}`.replace(/\/+$/, "");
  }

  return `/${lang}/passport/${encodeURIComponent(registryId)}`;
}

export default async function PassportPage({ params }: Props) {
  const { lang, registryId } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const headerList = await headers();
  const content = getPassportPageContent(safeLang);
  const dictionary = getDictionary(safeLang);
  const direction = getLangDir(safeLang);
  const rtl = isRTL(safeLang);
  const alignClassName = rtl ? "text-right" : "text-left";

  const request = await prisma.registrationRequest.findFirst({
    where: {
      reference: registryId,
      requestStatus: "passport_issued",
      deletedAt: null,
    },
    select: {
      reference: true,
      assetName: true,
      category: true,
      subcategory: true,
      brand: true,
      model: true,
      serialNumber: true,
      year: true,
      country: true,
    },
  });

  if (!request) {
    notFound();
  }

  const localizedCategory =
    getCategoryByValue(request.category, safeLang)?.label ??
    getDisplayValue(request.category, content.unavailable);
  const localizedSubcategory =
    getSubcategoriesByCategory(request.category, safeLang).find(
      (item) => item.value === request.subcategory
    )?.label ?? getDisplayValue(request.subcategory, content.unavailable);
  const appOrigin = getAppOrigin(headerList, safeLang, request.reference);
  const publicPassportUrl =
    appOrigin.startsWith("/")
      ? appOrigin
      : `${appOrigin}/${safeLang}/passport/${encodeURIComponent(request.reference)}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?format=svg&size=320x320&margin=0&data=${encodeURIComponent(
    publicPassportUrl
  )}`;
  const passportFields = [
    {
      label: content.fields.passportNumber,
      value: request.reference,
    },
    {
      label: content.fields.assetName,
      value: getDisplayValue(request.assetName, content.unavailable),
    },
    {
      label: content.fields.category,
      value: localizedCategory,
    },
    {
      label: content.fields.subcategory,
      value: localizedSubcategory,
    },
    {
      label: content.fields.brand,
      value: getDisplayValue(request.brand, content.unavailable),
    },
    {
      label: content.fields.model,
      value: getDisplayValue(request.model, content.unavailable),
    },
    {
      label: content.fields.year,
      value: getDisplayValue(request.year, content.unavailable),
    },
    {
      label: content.fields.country,
      value: getDisplayValue(request.country, content.unavailable),
    },
    {
      label: content.fields.serialNumber,
      value: maskSerial(request.serialNumber, content.unavailable),
    },
  ];

  return (
    <>
      <SiteHeader lang={safeLang} />

      <main className="min-h-screen bg-zinc-50" dir={direction}>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <OfficialPassport
            direction={direction}
            alignClassName={alignClassName}
            eyebrow={content.eyebrow}
            documentTitle={content.documentTitle}
            publicNote={content.publicNote}
            passportNumberLabel={content.fields.passportNumber}
            passportNumber={request.reference}
            statusLabel={content.statusLabel}
            statusValue={dictionary.dashboard.requestStatuses.passportIssued}
            verificationSummaryTitle={
              dictionary.statuses.registeredVerified.label
            }
            verificationSummaryMessage={
              dictionary.statuses.registeredVerified.message
            }
            verificationSummaryWhy={dictionary.statuses.registeredVerified.why}
            verificationPanelTitle={content.verificationPanelTitle}
            verificationPanelText={content.verificationPanelText}
            verificationUrlLabel={content.verificationUrlLabel}
            verificationUrl={publicPassportUrl}
            qrTitle={content.qrTitle}
            qrText={content.qrText}
            qrAlt={content.qrAlt}
            qrImageUrl={qrImageUrl}
            fields={passportFields}
          />
        </div>
      </main>

      <SiteFooter lang={safeLang} />
    </>
  );
}
