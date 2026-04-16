import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomerDashboardNav from "@/components/dashboard/customer-dashboard-nav";
import OwnerStolenReportButton from "@/components/registry/owner-stolen-report-button";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import ReviewFlowActions from "@/components/registry/review-flow-actions";
import StolenCasePanel from "@/components/registry/stolen-case-panel";
import StripeCheckoutButton from "@/components/registry/stripe-checkout-button";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { getPricing, getPricingCategory } from "@/lib/registry/pricing";
import { getStolenCaseRecord } from "@/lib/registry/request-meta";
import { canManageStolenCase } from "@/lib/registry/stolen-case";
import { ApplicantType } from "@/lib/registry/workflow";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";
import { getPricingCategoryContent } from "@/lib/i18n/pricing-categories";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getStripePaymentText } from "@/lib/i18n/stripe-payment";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import {
  formatDateForLang,
  getLocalizedApplicantTypeLabel,
} from "@/lib/i18n/registry-display";
import { getOfficialPassportNumber } from "@/lib/registry/reference";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
  searchParams?: Promise<{
    payment?: string | string[] | undefined;
  }>;
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
  adminPaymentConfirmationTitle: string;
  adminPaymentConfirmationDescription: string;
  reviewWorkflowTitle: string;
  reviewWorkflowDescription: string;
  detailsTitle: string;
  dynamicFieldsTitle: string;
  noAdditionalData: string;
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
  en: "Not completed",
  es: "No completado",
  de: "Nicht abgeschlossen",
  fr: "Non finalise",
  it: "Non completato",
  nl: "Niet voltooid",
  pt: "Nao concluido",
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

  return {
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
  };
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
    adminPaymentConfirmationTitle:
      section?.adminPaymentConfirmationTitle ?? "Admin payment confirmation",
    adminPaymentConfirmationDescription:
      section?.adminPaymentConfirmationDescription ??
      "Payment is confirmed automatically after Stripe Checkout completes.",
    reviewWorkflowTitle: section?.reviewWorkflowTitle ?? "Review workflow",
    reviewWorkflowDescription:
      section?.reviewWorkflowDescription ??
      "Move the registration through review, approval, and final passport issuance.",
    detailsTitle: section?.detailsTitle ?? "Registration details",
    dynamicFieldsTitle: section?.dynamicFieldsTitle ?? "Additional asset data",
    noAdditionalData: section?.noAdditionalData ?? "No additional data available.",
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
}: {
  request: {
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
  };
  texts: DetailTexts;
  lang: Lang;
}) {
  const dynamicFields = parseDynamicFields(request.dynamicFields);
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
    </section>
  );
}

export default async function RegistrationRequestDetailPage({
  params,
  searchParams,
}: Props) {
  const { lang, id } = await params;
  const query = (await searchParams) ?? {};

  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang as Lang);
  const customerDashboardText = getCustomerDashboardText(lang as Lang);
  const customerStolenReportText = getCustomerStolenReportText(lang as Lang);
  const texts = getDetailTexts(lang as Lang, dictionary);
  const stripeText = getStripePaymentText(lang as Lang);
  const paymentReturnState = Array.isArray(query.payment)
    ? query.payment[0]
    : query.payment;

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
              <RequestStatusBadge status={request.requestStatus} lang={lang} />
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

            <RegistrationDetailsCard
              request={request}
              texts={texts}
              lang={lang as Lang}
            />
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

  const pricingCategory = getPricingCategory(
    ownRequest.category,
    ownRequest.subcategory
  );
  const pricingCategoryContent = getPricingCategoryContent(
    lang as Lang,
    pricingCategory
  );
  const pricing = getPricing(ownRequest.category, ownRequest.subcategory);
  const ownStolenCase = getStolenCaseRecord(ownRequest.dynamicFields);
  const ownerReportedStolen =
    ownStolenCase?.isStolen && ownStolenCase.status === "open";
  const paymentBannerTone =
    paymentReturnState === "stripe_success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : paymentReturnState === "stripe_cancel"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "";

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

            <div className="mt-4 flex flex-wrap gap-3">
              <RequestStatusBadge status={ownRequest.requestStatus} lang={lang} />

              {ownerReportedStolen ? (
                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                  {customerStolenReportText.activeBadge}
                </span>
              ) : null}
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

          {ownRequest.requestStatus === "passport_issued" ? (
            <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {customerStolenReportText.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    {ownerReportedStolen
                      ? customerStolenReportText.activeDescription
                      : customerStolenReportText.description}
                  </p>
                </div>

                {!ownerReportedStolen ? (
                  <OwnerStolenReportButton
                    registrationId={ownRequest.id}
                    lang={lang}
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          {paymentReturnState === "stripe_success" ||
          paymentReturnState === "stripe_cancel" ? (
            <div className={`mb-6 rounded-2xl border px-5 py-4 text-sm ${paymentBannerTone}`}>
              <p className="font-semibold">
                {paymentReturnState === "stripe_success"
                  ? stripeText.returnSuccessTitle
                  : stripeText.returnCancelTitle}
              </p>
              <p className="mt-1">
                {paymentReturnState === "stripe_success"
                  ? stripeText.returnSuccessText
                  : stripeText.returnCancelText}
              </p>
            </div>
          ) : null}

          {ownRequest.requestStatus === "payment_required" &&
          !ownRequest.paymentCompleted ? (
            <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-zinc-900">
                  {stripeText.checkoutTitle}
                </h2>
                <p className="mt-1 text-sm text-zinc-600">
                  {stripeText.checkoutDescription}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {stripeText.amountLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    {new Intl.NumberFormat(lang, {
                      style: "currency",
                      currency: "EUR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(pricing.registration)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {texts.labels.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900">
                    {pricingCategoryContent.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:col-span-2">
                  <p className="text-sm leading-6 text-zinc-700">
                    {pricingCategoryContent.description}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-600">{stripeText.webhookNote}</p>

              <div className="mt-5">
                <StripeCheckoutButton registrationId={ownRequest.id} lang={lang} />
              </div>
            </section>
          ) : null}

          <RegistrationDetailsCard
            request={ownRequest}
            texts={texts}
            lang={lang as Lang}
          />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
