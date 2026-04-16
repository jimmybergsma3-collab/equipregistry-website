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
import { getStolenCaseRecord } from "@/lib/registry/request-meta";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import {
  getPublicDateValue,
  getPublicIncidentLocation,
} from "@/lib/registry/stolen-case";
import { getPublicPassportUrl } from "@/lib/passport/public-url";
import { getOfficialPassportNumber } from "@/lib/registry/reference";

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

export default async function PassportPage({ params }: Props) {
  const { lang, registryId } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const headerList = await headers();
  const content = getPassportPageContent(safeLang);
  const dictionary = getDictionary(safeLang);
  const stolenText = getStolenCaseText(safeLang);
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
      dynamicFields: true,
    },
  });

  if (!request) {
    notFound();
  }

  const stolenCase = getStolenCaseRecord(request.dynamicFields);
  const isPubliclyStolen = Boolean(
    stolenCase?.isStolen && stolenCase.status === "open"
  );

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
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?format=svg&size=320x320&margin=0&data=${encodeURIComponent(
    publicPassportUrl
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
      <SiteHeader lang={safeLang} />

      <main className="min-h-screen bg-white" dir={direction}>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
            statusValue={
              isPubliclyStolen
                ? dictionary.statuses.stolen.label
                : dictionary.dashboard.requestStatuses.passportIssued
            }
            statusTone={isPubliclyStolen ? "danger" : "default"}
            verificationSummaryTitle={
              isPubliclyStolen
                ? dictionary.statuses.stolen.label
                : dictionary.statuses.registeredVerified.label
            }
            verificationSummaryMessage={
              isPubliclyStolen
                ? dictionary.statuses.stolen.message
                : dictionary.statuses.registeredVerified.message
            }
            verificationSummaryWhy={
              isPubliclyStolen
                ? dictionary.statuses.stolen.why
                : dictionary.statuses.registeredVerified.why
            }
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
            <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
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

      <SiteFooter lang={safeLang} />
    </>
  );
}
