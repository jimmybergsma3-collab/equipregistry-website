import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import ManualPaymentPanel from "@/components/registry/manual-payment-panel";
import MarkPaidButton from "@/components/registry/mark-paid-button";
import ReviewFlowActions from "@/components/registry/review-flow-actions";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { usesManualIbanPayment } from "@/lib/registry/payment";
import {
  ApplicantType,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
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

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

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
      "After you have confirmed the bank transfer manually, mark this registration as paid.",
    reviewWorkflowTitle: section?.reviewWorkflowTitle ?? "Review workflow",
    reviewWorkflowDescription:
      section?.reviewWorkflowDescription ??
      "Move the registration through review, approval, and final passport issuance.",
    detailsTitle: section?.detailsTitle ?? "Registration details",
    dynamicFieldsTitle: section?.dynamicFieldsTitle ?? "Additional asset data",
    noAdditionalData: section?.noAdditionalData ?? "No additional data available.",
    paymentCompleted: section?.paymentCompleted ?? "Completed / Cleared",
    paymentPending: section?.paymentPending ?? "Pending",
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
}) {
  const dynamicFields = parseDynamicFields(request.dynamicFields);

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
        <DetailItem label={texts.labels.passportNumber} value={request.reference} />
        <DetailItem
          label={texts.labels.applicantType}
          value={getApplicantTypeLabel(request.applicantType)}
        />
        <DetailItem label={texts.labels.assetName} value={request.assetName} />
        <DetailItem label={texts.labels.category} value={request.category} />
        <DetailItem label={texts.labels.subcategory} value={request.subcategory} />
        <DetailItem label={texts.labels.brand} value={request.brand} />
        <DetailItem label={texts.labels.model} value={request.model} />
        <DetailItem label={texts.labels.serialNumber} value={request.serialNumber} />
        <DetailItem label={texts.labels.owner} value={request.ownerName} />
        <DetailItem label={texts.labels.ownerEmail} value={request.ownerEmail} />
        <DetailItem label={texts.labels.created} value={formatDate(request.createdAt)} />
        <DetailItem label={texts.labels.updated} value={formatDate(request.updatedAt)} />
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

export default async function RegistrationRequestDetailPage({ params }: Props) {
  const { lang, id } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang as Lang);
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

    const showManualPaymentPanel =
      usesManualIbanPayment(request.applicantType) &&
      request.requestStatus === "payment_required" &&
      !request.paymentCompleted;

    const showMarkPaidButton =
      usesManualIbanPayment(request.applicantType) &&
      request.requestStatus === "payment_required" &&
      !request.paymentCompleted;

    const showReviewActions =
      request.requestStatus === "submitted" ||
      request.requestStatus === "under_review" ||
      request.requestStatus === "approved";

    return (
      <>
        <SiteHeader lang={lang} />

        <main className="min-h-screen bg-zinc-50">
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
            </div>

            {showManualPaymentPanel ? (
              <div className="mb-6">
                <ManualPaymentPanel
                  passportNumber={request.reference}
                  lang={lang}
                  category={request.category}
                  subcategory={request.subcategory}
                />
              </div>
            ) : null}

            {showMarkPaidButton ? (
              <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {texts.adminPaymentConfirmationTitle}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    {texts.adminPaymentConfirmationDescription}
                  </p>
                </div>

                <MarkPaidButton registrationId={request.id} lang={lang} />
              </div>
            ) : null}

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

            <RegistrationDetailsCard request={request} texts={texts} />
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

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={`/${lang}/dashboard/registrations`}
              className="text-sm font-medium text-zinc-600 underline underline-offset-4"
            >
              {texts.backToRegistrations}
            </Link>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {ownRequest.reference}
            </h1>

            <div className="mt-4">
              <RequestStatusBadge status={ownRequest.requestStatus} lang={lang} />
            </div>
          </div>

          {usesManualIbanPayment(ownRequest.applicantType) &&
          ownRequest.requestStatus === "payment_required" &&
          !ownRequest.paymentCompleted ? (
            <div className="mb-6">
              <ManualPaymentPanel
                passportNumber={ownRequest.reference}
                lang={lang}
                category={ownRequest.category}
                subcategory={ownRequest.subcategory}
              />
            </div>
          ) : null}

          <RegistrationDetailsCard request={ownRequest} texts={texts} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
