import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomerDashboardNav from "@/components/dashboard/customer-dashboard-nav";
import OwnerStolenReportPanel from "@/components/registry/owner-stolen-report-panel";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import ReviewFlowActions from "@/components/registry/review-flow-actions";
import StolenCasePanel from "@/components/registry/stolen-case-panel";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { MAILBOXES } from "@/lib/email/addresses";
import {
  getRegistrationStatusDisplay,
  getStolenCaseRecord,
} from "@/lib/registry/request-meta";
import { canManageStolenCase } from "@/lib/registry/stolen-case";
import { ApplicantType } from "@/lib/registry/workflow";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getStolenCustomerActionsText } from "@/lib/i18n/stolen-customer-actions";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import {
  getRequiredDocumentsForContext,
  type RegistrationDocumentKey,
  type RegistrationDocumentMap,
} from "@/lib/registry/document-rules";
import {
  formatDateForLang,
  getLocalizedApplicantTypeLabel,
} from "@/lib/i18n/registry-display";
import { getOfficialPassportNumber } from "@/lib/registry/reference";
import { buildStoredUploadAccessUrl } from "@/lib/registry/uploads";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type DynamicFields = Partial<{
  solarPanelSerialNumbers: string[];
  batterySerialNumbers: string[];
  bikeBatterySerialNumbers: string[];
  capacity: string;
  powerRating: string;
  batchLotNumber: string;
  installationLocation: string;
  hoursOfOperation: string;
  deviceId: string;
  certification: string;
  ownerOrganisation: string;
}>;

type DetailTexts = {
  backToAdminRegistrations: string;
  backToRegistrations: string;
  reviewWorkflowTitle: string;
  reviewWorkflowDescription: string;
  detailsTitle: string;
  dynamicFieldsTitle: string;
  documentsTitle: string;
  noAdditionalData: string;
  noDocuments: string;
  paymentCompleted: string;
  paymentPending: string;
  labels: {
    passportNumber: string;
    applicantType: string;
    assetName: string;
    category: string;
    subcategory: string;
    brand: string;
    model: string;
    serialNumber: string;
    owner: string;
    ownerEmail: string;
    created: string;
    updated: string;
    payment: string;
    completenessScore: string;
    solarPanelSerialNumbers: string;
    batterySerialNumbers: string;
    bikeBatterySerialNumbers: string;
    capacity: string;
    powerRating: string;
    batchLotNumber: string;
    installationLocation: string;
    hoursOfOperation: string;
    deviceId: string;
    certification: string;
    ownerOrganisation: string;
  };
  actions: {
    viewDocument: string;
    downloadDocument: string;
  };
};

type DetailDictionarySection = Partial<
  Omit<DetailTexts, "labels"> & {
    labels?: Partial<DetailTexts["labels"]>;
    backAdmin?: string;
    back?: string;
  }
>;

type DetailDictionary = {
  dashboard?: {
    registrationDetail?: DetailDictionarySection;
    registrationDetails?: DetailDictionarySection;
    requestDetail?: DetailDictionarySection;
  };
};

const PAYMENT_PENDING_TEXT: Partial<Record<Lang, string>> = {
  en: "No checkout required",
  es: "Checkout no requerido",
  de: "Kein Checkout erforderlich",
  fr: "Checkout non requis",
  it: "Checkout non richiesto",
  nl: "Geen checkout vereist",
  pt: "Checkout nao necessario",
  pl: "Checkout niewymagany",
  sv: "Ingen checkout kravs",
  da: "Checkout ikke paakraevet",
  no: "Checkout ikke paakrevd",
};

const DOCUMENTS_TITLE_TEXT: Record<Lang, string> = {
  en: "Uploaded documents",
  es: "Documentos cargados",
  de: "Hochgeladene Dokumente",
  fr: "Documents televerses",
  it: "Documenti caricati",
  nl: "Geuploade documenten",
  pt: "Documentos carregados",
  pl: "Przeslane dokumenty",
  sv: "Uppladdade dokument",
  da: "Uploadede dokumenter",
  no: "Opplastede dokumenter",
  ru: "Zagruzhennye dokumenty",
  zh: "Yishangchuan wenjian",
  hi: "Uploaded documents",
  ar: "Alwathayiq almarfuea",
};

const NO_DOCUMENTS_TEXT: Record<Lang, string> = {
  en: "No uploaded documents available.",
  es: "No hay documentos cargados disponibles.",
  de: "Keine hochgeladenen Dokumente verfuegbar.",
  fr: "Aucun document televerse disponible.",
  it: "Nessun documento caricato disponibile.",
  nl: "Geen geuploade documenten beschikbaar.",
  pt: "Nenhum documento carregado disponivel.",
  pl: "Brak przeslanych dokumentow.",
  sv: "Inga uppladdade dokument tillgangliga.",
  da: "Ingen uploadede dokumenter tilgaengelige.",
  no: "Ingen opplastede dokumenter tilgjengelige.",
  ru: "Zagruzhennye dokumenty otsutstvuyut.",
  zh: "Meiyou keyong de yishangchuan wenjian.",
  hi: "Koi uploaded documents upalabdh nahin hain.",
  ar: "La tujad wathayiq marfuea mutaha.",
};

const VIEW_DOCUMENT_TEXT: Record<Lang, string> = {
  en: "View",
  es: "Ver",
  de: "Ansehen",
  fr: "Voir",
  it: "Apri",
  nl: "Bekijken",
  pt: "Ver",
  pl: "Otworz",
  sv: "Visa",
  da: "Vis",
  no: "Vis",
  ru: "Открыть",
  zh: "查看",
  hi: "देखें",
  ar: "عرض",
};

const DOWNLOAD_DOCUMENT_TEXT: Record<Lang, string> = {
  en: "Download",
  es: "Descargar",
  de: "Download",
  fr: "Telecharger",
  it: "Scarica",
  nl: "Downloaden",
  pt: "Transferir",
  pl: "Pobierz",
  sv: "Ladda ned",
  da: "Download",
  no: "Last ned",
  ru: "Скачать",
  zh: "下载",
  hi: "डाउनलोड",
  ar: "تنزيل",
};

function parseDynamicFields(value: unknown): DynamicFields {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const raw = value as Record<string, unknown>;

  const toStringArray = (input: unknown): string[] | undefined => {
    if (!Array.isArray(input)) return undefined;

    const cleaned = input
      .map((item) => (typeof item === "string" ? item.trim() : String(item ?? "").trim()))
      .filter(Boolean);

    return cleaned.length > 0 ? cleaned : undefined;
  };

  const toStringValue = (input: unknown): string | undefined => {
    if (input === null || input === undefined) return undefined;
    const value = String(input).trim();
    return value ? value : undefined;
  };

  return repairMojibakeDeep({
    solarPanelSerialNumbers: toStringArray(raw.solarPanelSerialNumbers),
    batterySerialNumbers: toStringArray(raw.batterySerialNumbers),
    bikeBatterySerialNumbers: toStringArray(raw.bikeBatterySerialNumbers),
    capacity: toStringValue(raw.capacity),
    powerRating: toStringValue(raw.powerRating),
    batchLotNumber: toStringValue(raw.batchLotNumber),
    installationLocation: toStringValue(raw.installationLocation),
    hoursOfOperation: toStringValue(raw.hoursOfOperation),
    deviceId: toStringValue(raw.deviceId),
    certification: toStringValue(raw.certification),
    ownerOrganisation: toStringValue(raw.ownerOrganisation),
  });
}

function parseDocumentMap(value: unknown): RegistrationDocumentMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as RegistrationDocumentMap;
}

function humanizeDocumentKey(key: string) {
  return key
    .split("_")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function hasRenderableValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return value !== null && value !== undefined;
}

function getDetailTexts(lang: Lang, dictionary: unknown): DetailTexts {
  const dict = dictionary as DetailDictionary;

  const section =
    dict?.dashboard?.registrationDetail ??
    dict?.dashboard?.registrationDetails ??
    dict?.dashboard?.requestDetail ??
    {};

  const labels = section?.labels ?? {};

  return {
    backToAdminRegistrations:
      section?.backToAdminRegistrations ??
      section?.backAdmin ??
      "Back to admin registrations",
    backToRegistrations:
      section?.backToRegistrations ??
      section?.back ??
      "Back to registrations",
    reviewWorkflowTitle: section?.reviewWorkflowTitle ?? "Review workflow",
    reviewWorkflowDescription:
      section?.reviewWorkflowDescription ??
      "Move the registration through review, approval, and final passport issuance.",
    detailsTitle: section?.detailsTitle ?? "Registration details",
    dynamicFieldsTitle: section?.dynamicFieldsTitle ?? "Additional asset data",
    documentsTitle: DOCUMENTS_TITLE_TEXT[lang] ?? "Uploaded documents",
    noAdditionalData: section?.noAdditionalData ?? "No additional data available.",
    noDocuments: NO_DOCUMENTS_TEXT[lang] ?? "No uploaded documents available.",
    paymentCompleted: section?.paymentCompleted ?? "Completed / Cleared",
    paymentPending:
      PAYMENT_PENDING_TEXT[lang] ?? section?.paymentPending ?? "Not completed",
    labels: {
      passportNumber: labels?.passportNumber ?? "Passport Number",
      applicantType: labels?.applicantType ?? "Applicant Type",
      assetName: labels?.assetName ?? "Asset Name",
      category: labels?.category ?? "Category",
      subcategory: labels?.subcategory ?? "Subcategory",
      brand: labels?.brand ?? "Brand",
      model: labels?.model ?? "Model",
      serialNumber: labels?.serialNumber ?? "Serial Number",
      owner: labels?.owner ?? "Owner",
      ownerEmail: labels?.ownerEmail ?? "Owner Email",
      created: labels?.created ?? "Created",
      updated: labels?.updated ?? "Updated",
      payment: labels?.payment ?? "Payment",
      completenessScore: labels?.completenessScore ?? "Completeness Score",
      solarPanelSerialNumbers:
        labels?.solarPanelSerialNumbers ?? "Solar Panel Serial Numbers",
      batterySerialNumbers:
        labels?.batterySerialNumbers ?? "Battery Serial Numbers",
      bikeBatterySerialNumbers:
        labels?.bikeBatterySerialNumbers ?? "Bike Battery Serial Numbers",
      capacity: labels?.capacity ?? "Capacity",
      powerRating: labels?.powerRating ?? "Power Rating",
      batchLotNumber: labels?.batchLotNumber ?? "Batch / Lot Number",
      installationLocation:
        labels?.installationLocation ?? "Installation Location",
      hoursOfOperation: labels?.hoursOfOperation ?? "Hours of Operation",
      deviceId: labels?.deviceId ?? "Device ID",
      certification: labels?.certification ?? "Certification",
      ownerOrganisation: labels?.ownerOrganisation ?? "Owner Organisation",
    },
    actions: {
      viewDocument: VIEW_DOCUMENT_TEXT[lang] ?? "View",
      downloadDocument: DOWNLOAD_DOCUMENT_TEXT[lang] ?? "Download",
    },
  };
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-zinc-900">{value}</p>
    </div>
  );
}

function DynamicFieldItem({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) {
  const isArray = Array.isArray(value);

  return (
    <div className={isArray ? "sm:col-span-2" : undefined}>
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>

      {isArray ? (
        <ul className="mt-2 space-y-1">
          {value.map((item, index) => (
            <li
              key={`${label}-${index}-${item}`}
              className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-sm font-medium text-zinc-900">{value}</p>
      )}
    </div>
  );
}

function RegistrationDetailsCard({
  request,
  texts,
  lang,
  enableDocumentActions = false,
}: {
  request: {
    id: string;
    reference: string;
    applicantType: ApplicantType;
    assetName: string;
    category: string;
    subcategory: string;
    brand: string;
    model: string;
    serialNumber: string;
    ownerName: string;
    ownerEmail: string;
    createdAt: Date;
    updatedAt: Date;
    paymentCompleted: boolean;
    completenessScore: number;
    dynamicFields: unknown;
    documents: unknown;
  };
  texts: DetailTexts;
  lang: Lang;
  enableDocumentActions?: boolean;
}) {
  const dynamicFields = parseDynamicFields(request.dynamicFields);
  const documents = parseDocumentMap(request.documents);
  const officialPassportNumber = getOfficialPassportNumber(
    request.reference,
    request.category,
    request.subcategory
  );
  const localizedCategory =
    getCategoryByValue(request.category, lang)?.label ?? request.category;
  const localizedSubcategory =
    getSubcategoryByValue(
      request.category,
      request.subcategory,
      lang
    )?.label ?? request.subcategory;

  const dynamicFieldEntries: Array<{ label: string; value: string | string[] }> = [
    {
      label: texts.labels.solarPanelSerialNumbers,
      value: dynamicFields.solarPanelSerialNumbers ?? [],
    },
    {
      label: texts.labels.batterySerialNumbers,
      value: dynamicFields.batterySerialNumbers ?? [],
    },
    {
      label: texts.labels.bikeBatterySerialNumbers,
      value: dynamicFields.bikeBatterySerialNumbers ?? [],
    },
    {
      label: texts.labels.capacity,
      value: dynamicFields.capacity ?? "",
    },
    {
      label: texts.labels.powerRating,
      value: dynamicFields.powerRating ?? "",
    },
    {
      label: texts.labels.batchLotNumber,
      value: dynamicFields.batchLotNumber ?? "",
    },
    {
      label: texts.labels.installationLocation,
      value: dynamicFields.installationLocation ?? "",
    },
    {
      label: texts.labels.hoursOfOperation,
      value: dynamicFields.hoursOfOperation ?? "",
    },
    {
      label: texts.labels.deviceId,
      value: dynamicFields.deviceId ?? "",
    },
    {
      label: texts.labels.certification,
      value: dynamicFields.certification ?? "",
    },
    {
      label: texts.labels.ownerOrganisation,
      value: dynamicFields.ownerOrganisation ?? "",
    },
  ].filter((entry) => hasRenderableValue(entry.value));
  const documentDefinitions = new Map(
    getRequiredDocumentsForContext(
      request.applicantType,
      request.category,
      lang
    ).map((document) => [document.key, document.label])
  );
  const documentEntries = Object.entries(documents)
    .map(([key, state]) => ({
      key,
      label:
        documentDefinitions.get(key as RegistrationDocumentKey) ??
        humanizeDocumentKey(key),
      files: Array.isArray(state?.files) ? state.files : [],
    }))
    .filter((entry) => entry.files.length > 0);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900">{texts.detailsTitle}</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <DetailItem
          label={texts.labels.passportNumber}
          value={officialPassportNumber}
        />
        <DetailItem
          label={texts.labels.applicantType}
          value={getLocalizedApplicantTypeLabel(request.applicantType, lang)}
        />
        <DetailItem label={texts.labels.assetName} value={request.assetName} />
        <DetailItem label={texts.labels.category} value={localizedCategory} />
        <DetailItem
          label={texts.labels.subcategory}
          value={localizedSubcategory}
        />
        <DetailItem label={texts.labels.brand} value={request.brand} />
        <DetailItem label={texts.labels.model} value={request.model} />
        <DetailItem label={texts.labels.serialNumber} value={request.serialNumber} />
        <DetailItem label={texts.labels.owner} value={request.ownerName} />
        <DetailItem label={texts.labels.ownerEmail} value={request.ownerEmail} />
        <DetailItem
          label={texts.labels.created}
          value={formatDateForLang(request.createdAt, lang)}
        />
        <DetailItem
          label={texts.labels.updated}
          value={formatDateForLang(request.updatedAt, lang)}
        />
        <DetailItem
          label={texts.labels.payment}
          value={request.paymentCompleted ? texts.paymentCompleted : texts.paymentPending}
        />
        <DetailItem
          label={texts.labels.completenessScore}
          value={`${request.completenessScore}%`}
        />
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-base font-semibold text-zinc-900">
          {texts.dynamicFieldsTitle}
        </h3>

        {dynamicFieldEntries.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {dynamicFieldEntries.map((entry) => (
              <DynamicFieldItem
                key={entry.label}
                label={entry.label}
                value={entry.value}
              />
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-600">{texts.noAdditionalData}</p>
        )}
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h3 className="text-base font-semibold text-zinc-900">
          {texts.documentsTitle}
        </h3>

        {documentEntries.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {documentEntries.map((entry) => (
              <div
                key={entry.key}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {entry.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {entry.files.map((file) => (
                    <li
                      key={file.id}
                      className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span className="break-all font-medium text-zinc-900">
                          {file.originalName}
                        </span>

                        {enableDocumentActions ? (
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={buildStoredUploadAccessUrl({
                                requestId: request.id,
                                fileId: file.id,
                              })}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                            >
                              {texts.actions.viewDocument}
                            </a>
                            <a
                              href={buildStoredUploadAccessUrl({
                                requestId: request.id,
                                fileId: file.id,
                                download: true,
                              })}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
                            >
                              {texts.actions.downloadDocument}
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-zinc-600">{texts.noDocuments}</p>
        )}
      </div>
    </section>
  );
}

export default async function RegistrationRequestDetailPage({
  params,
}: Props) {
  const { lang, id } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = repairMojibakeDeep(await getDictionary(lang as Lang));
  const customerDashboardText = repairMojibakeDeep(
    getCustomerDashboardText(lang as Lang)
  );
  const customerStolenReportText = repairMojibakeDeep(
    getCustomerStolenReportText(lang as Lang)
  );
  const customerStolenActionsText = repairMojibakeDeep(
    getStolenCustomerActionsText(lang as Lang)
  );
  const texts = getDetailTexts(lang as Lang, dictionary);

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/registrations/${id}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  const isAdmin = user?.role === "admin";

  if (isAdmin) {
    const request = await prisma.registrationRequest.findFirst({
      where: { id },
    });

    if (!request) {
      notFound();
    }

    const showReviewActions =
      request.requestStatus === "submitted" ||
      request.requestStatus === "under_review" ||
      request.requestStatus === "approved";
    const stolenCase = getStolenCaseRecord(request.dynamicFields);
    const requestDisplayStatus = getRegistrationStatusDisplay(
      request.dynamicFields,
      request.requestStatus
    );
    const showStolenCasePanel = canManageStolenCase(
      request.requestStatus,
      Boolean(stolenCase)
    );

    return (
      <>
        <SiteHeader lang={lang} />

        <main
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="min-h-screen bg-white"
        >
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link
                href={`/${lang}/dashboard/admin/registrations`}
                className="text-sm font-medium text-zinc-600 underline underline-offset-4"
              >
                {texts.backToAdminRegistrations}
              </Link>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {request.reference}
            </h1>

            <div className="mt-4">
              <RequestStatusBadge status={requestDisplayStatus} lang={lang} />
            </div>

            {request.requestStatus === "passport_issued" ? (
              <div className="mt-4">
                <Link
                  href={`/${lang}/passport/${request.reference}`}
                  className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  {dictionary.statuses.registeredVerified.actionViewPassport}
                </Link>
              </div>
            ) : null}
          </div>

            <RegistrationDetailsCard
              request={request}
              texts={texts}
              lang={lang as Lang}
              enableDocumentActions
            />

            {showReviewActions ? (
              <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {texts.reviewWorkflowTitle}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    {texts.reviewWorkflowDescription}
                  </p>
                </div>

                <ReviewFlowActions
                  registrationId={request.id}
                  lang={lang}
                  requestStatus={request.requestStatus}
                />
              </div>
            ) : null}

            {showStolenCasePanel ? (
              <StolenCasePanel
                registrationId={request.id}
                lang={lang}
                existingCase={stolenCase}
              />
            ) : null}
          </div>
        </main>

        <SiteFooter lang={lang} />
      </>
    );
  }

  const ownRequest = await prisma.registrationRequest.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!ownRequest) {
    notFound();
  }

  const ownStolenCase = getStolenCaseRecord(ownRequest.dynamicFields);
  const ownDisplayStatus = getRegistrationStatusDisplay(
    ownRequest.dynamicFields,
    ownRequest.requestStatus
  );
  const ownerReportPending = ownStolenCase?.status === "pending_review";
  const ownerReportedStolen =
    ownStolenCase?.isStolen && ownStolenCase.status === "open";

  return (
    <>
      <SiteHeader lang={lang} />

      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white"
      >
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <CustomerDashboardNav lang={lang as Lang} active="dashboard" />

          <div className="mb-8">
            <Link
              href={`/${lang}/dashboard/registrations`}
              className="text-sm font-medium text-zinc-600 underline underline-offset-4"
            >
              {customerDashboardText.backToDashboard}
            </Link>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {ownRequest.reference}
            </h1>

            <div className="mt-4">
              <RequestStatusBadge status={ownDisplayStatus} lang={lang} />
            </div>

            {ownRequest.requestStatus === "passport_issued" ? (
              <div className="mt-4">
                <Link
                  href={`/${lang}/passport/${ownRequest.reference}`}
                  className="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  {dictionary.statuses.registeredVerified.actionViewPassport}
                </Link>
              </div>
            ) : null}
          </div>

          <RegistrationDetailsCard
            request={ownRequest}
            texts={texts}
            lang={lang as Lang}
          />

          {ownRequest.requestStatus === "passport_issued" ? (
            <section
              id="owner-incident-report"
              className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <div className="max-w-2xl">
                <h2 className="text-lg font-semibold text-zinc-900">
                  {customerStolenReportText.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  {customerStolenReportText.description}
                </p>
              </div>

              {ownerReportPending ? (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {customerStolenReportText.pendingDescription}
                </div>
              ) : ownerReportedStolen ? (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {customerStolenReportText.activeDescription}
                </div>
              ) : (
                <div className="mt-5">
                  <OwnerStolenReportPanel
                    registrationId={ownRequest.id}
                    lang={lang}
                    existingCase={ownStolenCase}
                  />
                </div>
              )}
            </section>
          ) : null}

          {ownerReportPending || ownerReportedStolen ? (
            <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-lg font-semibold text-emerald-900">
                {customerStolenActionsText.recoveredTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-emerald-800">
                {customerStolenActionsText.recoveredDescription}
              </p>
              <div className="mt-4">
                <a
                  href={`mailto:${MAILBOXES.support}?subject=${encodeURIComponent(`${customerStolenActionsText.recoveredTitle} - ${ownRequest.reference}`)}`}
                  className="inline-flex items-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100"
                >
                  {customerStolenActionsText.recoveredAction}
                </a>
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
