import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import OfficialPassport from "@/components/passport/official-passport";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getStolenCaseText } from "@/lib/i18n/stolen-case";
import {
  getLangDir,
  isRTL,
  isValidLang,
  type Lang,
} from "@/lib/i18n/config";
import { getPassportPageContent } from "@/lib/i18n/passport-page";
import {
  getRegistrationStatusDisplay,
  getRegistryAssetStatus,
  getStolenCaseRecord,
} from "@/lib/registry/request-meta";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";
import {
  getPublicDateValue,
  getPublicIncidentLocation,
} from "@/lib/registry/stolen-case";
import {
  getPublicPassportScanUrl,
  getPublicPassportUrl,
} from "@/lib/passport/public-url";
import { getOfficialPassportNumber } from "@/lib/registry/reference";
import { getLocalizedRequestStatusLabel } from "@/lib/i18n/registry-display";

type Props = {
  params: Promise<{
    lang: string;
    registryId: string;
  }>;
};

function getDisplayValue(
  value: string | null | undefined,
  unavailable: string
) {
  const normalized = value?.trim();
  return normalized ? normalized : unavailable;
}

type PublicPassportRecord = {
  reference: string;
  assetName: string | null;
  category: string;
  subcategory: string;
  brand: string | null;
  model: string | null;
  serialNumber: string | null;
  year: string | null;
  country: string | null;
  dynamicFields: unknown;
  publicStatus?: "registered_verified" | "history_unknown";
};

function getDemoPublicPassportRecord(
  registryId: string
): PublicPassportRecord | null {
  const normalized = registryId.trim().toUpperCase();

  if (normalized === "ER-REG-001") {
    return {
      reference: normalized,
      assetName: "Caterpillar 980 Wheel Loader",
      category: "machines",
      subcategory: "wheel_loader",
      brand: "Caterpillar",
      model: "980 Wheel Loader",
      serialNumber: normalized,
      year: "2021",
      country: "EU",
      dynamicFields: {},
      publicStatus: "registered_verified",
    };
  }

  if (normalized === "ER-HIS-404") {
    return {
      reference: normalized,
      assetName: "Volvo L90H Wheel Loader",
      category: "machines",
      subcategory: "wheel_loader",
      brand: "Volvo",
      model: "L90H Wheel Loader",
      serialNumber: normalized,
      year: "2014",
      country: "EU",
      dynamicFields: {},
      publicStatus: "history_unknown",
    };
  }

  return null;
}

export default async function PassportPage({ params }: Props) {
  const { lang, registryId } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const headerList = await headers();
  const content = getPassportPageContent(safeLang);
  const dictionary = repairMojibakeDeep(getDictionary(safeLang));
  const stolenText = repairMojibakeDeep(getStolenCaseText(safeLang));
  const direction = getLangDir(safeLang);
  const rtl = isRTL(safeLang);
  const alignClassName = rtl ? "text-right" : "text-left";

  const storedRequest = await prisma.registrationRequest.findFirst({
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
      dynamicFields: true,
    },
  });

  const request: PublicPassportRecord | null =
    storedRequest ?? getDemoPublicPassportRecord(registryId);

  if (!request) {
    notFound();
  }

  const stolenCase = getStolenCaseRecord(request.dynamicFields);
  const statusDisplay = getRegistrationStatusDisplay(
    request.dynamicFields,
    "passport_issued"
  );
  const isPendingReview = statusDisplay === "stolen_pending_review";
  const isPubliclyStolen = statusDisplay === "stolen_confirmed";

  const localizedCategory =
    getCategoryByValue(request.category, safeLang)?.label ??
    getDisplayValue(request.category, content.unavailable);
  const localizedSubcategory =
    getSubcategoryByValue(
      request.category,
      request.subcategory,
      safeLang
    )?.label ?? getDisplayValue(request.subcategory, content.unavailable);
  const officialPassportNumber = getOfficialPassportNumber(
    request.reference,
    request.category,
    request.subcategory
  );
  const publicPassportUrl = getPublicPassportUrl(
    headerList,
    safeLang,
    request.reference
  );
  const publicPassportScanUrl = getPublicPassportScanUrl(
    headerList,
    request.reference
  );
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?format=svg&size=320x320&margin=0&data=${encodeURIComponent(
    publicPassportScanUrl
  )}`;
  const passportFields = [
    {
      label: content.fields.passportNumber,
      value: officialPassportNumber,
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
      value: getDisplayValue(request.serialNumber, content.unavailable),
    },
  ];
  const publicCaseReference = isPubliclyStolen
    ? stolenCase?.caseReference ?? request.reference
    : null;
  const publicIncidentLocation = isPubliclyStolen
    ? getPublicIncidentLocation(
        stolenCase!,
        stolenText.public.unknownLocation
      )
    : null;
  const publicIncidentDate = isPubliclyStolen
    ? getPublicDateValue(stolenCase?.incidentDate, stolenText.public.unknownDate)
    : null;
  const publicPoliceReportDate = isPubliclyStolen
    ? getPublicDateValue(
        stolenCase?.policeReportDate,
        stolenText.public.unknownDate
      )
    : null;
  const publicRegistryStatus =
    request.publicStatus ??
    getRegistryAssetStatus(request.dynamicFields, "passport_issued");
  const isHistoryUnknown = publicRegistryStatus === "history_unknown";
  const verificationSummaryTitle = isPubliclyStolen
    ? dictionary.statuses.stolen.label
    : isHistoryUnknown
    ? dictionary.statuses.historyUnknown.label
    : dictionary.statuses.registeredVerified.label;
  const verificationSummaryMessage = isPubliclyStolen
    ? dictionary.statuses.stolen.message
    : isHistoryUnknown
    ? dictionary.statuses.historyUnknown.message
    : dictionary.statuses.registeredVerified.message;
  const verificationSummaryWhy = isPubliclyStolen
    ? dictionary.statuses.stolen.why
    : isHistoryUnknown
    ? dictionary.statuses.historyUnknown.why
    : dictionary.statuses.registeredVerified.why;
  const statusValue = isPubliclyStolen
    ? getLocalizedRequestStatusLabel("stolen_confirmed", safeLang)
    : isPendingReview
    ? getLocalizedRequestStatusLabel("stolen_pending_review", safeLang)
    : request.publicStatus
    ? verificationSummaryTitle
    : dictionary.dashboard.requestStatuses.passportIssued;

  if (isPubliclyStolen && publicCaseReference) {
    passportFields.push({
      label: stolenText.public.caseReference,
      value: publicCaseReference,
    });
  }

  if (isPubliclyStolen && publicIncidentLocation) {
    passportFields.push({
      label: stolenText.public.incidentLocation,
      value: publicIncidentLocation,
    });
  }

  if (isPubliclyStolen && publicIncidentDate) {
    passportFields.push({
      label: stolenText.public.incidentDate,
      value: publicIncidentDate,
    });
  }

  if (isPubliclyStolen && publicPoliceReportDate) {
    passportFields.push({
      label: stolenText.public.policeReportDate,
      value: publicPoliceReportDate,
    });
  }

  return (
    <>
      <div className="print:hidden">
        <SiteHeader lang={safeLang} />
      </div>

      <main
        className="min-h-screen bg-white print:min-h-0 print:bg-white"
        dir={direction}
      >
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 print:max-w-[190mm] print:px-0 print:py-0">
          <OfficialPassport
            lang={safeLang}
            direction={direction}
            alignClassName={alignClassName}
            eyebrow={content.eyebrow}
            documentTitle={content.documentTitle}
            publicNote={content.publicNote}
            passportNumberLabel={content.fields.passportNumber}
            passportNumber={officialPassportNumber}
            statusLabel={content.statusLabel}
            statusValue={statusValue}
            statusTone={
              isPubliclyStolen
                ? "danger"
                : isPendingReview
                ? "warning"
                : "default"
            }
            verificationSummaryTitle={verificationSummaryTitle}
            verificationSummaryMessage={verificationSummaryMessage}
            verificationSummaryWhy={verificationSummaryWhy}
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

          {isPubliclyStolen && publicCaseReference ? (
            <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 print:hidden">
              <h2 className="text-lg font-semibold text-red-800">
                {stolenText.public.warningTitle}
              </h2>
              <p className="mt-2 text-sm font-medium text-red-700">
                {dictionary.statuses.stolen.warning}
              </p>
              <p className="mt-3 text-sm text-red-700">
                {stolenText.public.limitedInfo}
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-red-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-red-500">
                    {stolenText.public.caseReference}
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">
                    {publicCaseReference}
                  </p>
                </div>

                <div className="rounded-xl border border-red-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-red-500">
                    {stolenText.public.incidentLocation}
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">
                    {publicIncidentLocation}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`/${safeLang}/contact-authorities?registryId=${encodeURIComponent(
                    request.reference
                  )}&caseId=${encodeURIComponent(publicCaseReference)}`}
                  className="inline-flex items-center rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  {dictionary.statuses.stolen.actionContactAuthorities}
                </a>

                <a
                  href={`/${safeLang}/report-sighting?registryId=${encodeURIComponent(
                    request.reference
                  )}&caseId=${encodeURIComponent(publicCaseReference)}`}
                  className="inline-flex items-center rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  {dictionary.statuses.stolen.actionReportSighting}
                </a>
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter lang={safeLang} />
      </div>
    </>
  );
}
