import type { StoredUpload } from "@/lib/registry/upload-types";

export type RegistryAssetStatus =
  | "history_unknown"
  | "registered_verified"
  | "stolen"
  | "verified_stolen";

export type StripePaymentMeta = {
  provider: "stripe";
  status: "pending" | "paid";
  checkoutSessionId?: string;
  paymentIntentId?: string;
  invoiceId?: string;
  invoiceNumber?: string;
  invoiceHostedUrl?: string;
  invoicePdfUrl?: string;
  amountTotal?: number;
  currency?: string;
  paidAt?: string;
};

export type StolenAssetMeta = {
  status: "stolen" | "verified_stolen";
  summary: string;
  reportedAt: string;
  evidenceFiles: StoredUpload[];
  policeReportFiles: StoredUpload[];
};

type DynamicFieldsRecord = Record<string, unknown>;

const META_KEYS = {
  registryStatus: "__registryStatus",
  payment: "__payment",
  stolen: "__stolen",
} as const;

function isRecord(value: unknown): value is DynamicFieldsRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function getDynamicFieldsRecord(value: unknown): DynamicFieldsRecord {
  if (!isRecord(value)) {
    return {};
  }

  return { ...value };
}

export function getVisibleDynamicFields(value: unknown): DynamicFieldsRecord {
  const record = getDynamicFieldsRecord(value);

  delete record[META_KEYS.registryStatus];
  delete record[META_KEYS.payment];
  delete record[META_KEYS.stolen];

  return record;
}

export function getRegistryAssetStatus(
  value: unknown,
  requestStatus?: string | null
): RegistryAssetStatus {
  const record = getDynamicFieldsRecord(value);
  const stored = record[META_KEYS.registryStatus];

  if (
    stored === "history_unknown" ||
    stored === "registered_verified" ||
    stored === "stolen" ||
    stored === "verified_stolen"
  ) {
    return stored;
  }

  if (requestStatus === "passport_issued") {
    return "registered_verified";
  }

  return "history_unknown";
}

export function setRegistryAssetStatus(
  value: unknown,
  status: RegistryAssetStatus
): DynamicFieldsRecord {
  return {
    ...getDynamicFieldsRecord(value),
    [META_KEYS.registryStatus]: status,
  };
}

export function getStripePaymentMeta(value: unknown): StripePaymentMeta | null {
  const record = getDynamicFieldsRecord(value);
  const payment = record[META_KEYS.payment];

  if (!isRecord(payment) || payment.provider !== "stripe") {
    return null;
  }

  return {
    provider: "stripe",
    status: payment.status === "paid" ? "paid" : "pending",
    checkoutSessionId:
      typeof payment.checkoutSessionId === "string"
        ? payment.checkoutSessionId
        : undefined,
    paymentIntentId:
      typeof payment.paymentIntentId === "string"
        ? payment.paymentIntentId
        : undefined,
    invoiceId:
      typeof payment.invoiceId === "string" ? payment.invoiceId : undefined,
    invoiceNumber:
      typeof payment.invoiceNumber === "string"
        ? payment.invoiceNumber
        : undefined,
    invoiceHostedUrl:
      typeof payment.invoiceHostedUrl === "string"
        ? payment.invoiceHostedUrl
        : undefined,
    invoicePdfUrl:
      typeof payment.invoicePdfUrl === "string"
        ? payment.invoicePdfUrl
        : undefined,
    amountTotal:
      typeof payment.amountTotal === "number" ? payment.amountTotal : undefined,
    currency:
      typeof payment.currency === "string" ? payment.currency : undefined,
    paidAt: typeof payment.paidAt === "string" ? payment.paidAt : undefined,
  };
}

export function setStripePaymentMeta(
  value: unknown,
  payment: StripePaymentMeta
): DynamicFieldsRecord {
  return {
    ...getDynamicFieldsRecord(value),
    [META_KEYS.payment]: payment,
  };
}

export function getStolenAssetMeta(value: unknown): StolenAssetMeta | null {
  const record = getDynamicFieldsRecord(value);
  const stolen = record[META_KEYS.stolen];

  if (!isRecord(stolen)) {
    return null;
  }

  const evidenceFiles = Array.isArray(stolen.evidenceFiles)
    ? (stolen.evidenceFiles as StoredUpload[])
    : [];
  const policeReportFiles = Array.isArray(stolen.policeReportFiles)
    ? (stolen.policeReportFiles as StoredUpload[])
    : [];

  const status =
    stolen.status === "verified_stolen" ? "verified_stolen" : "stolen";

  if (typeof stolen.summary !== "string" || typeof stolen.reportedAt !== "string") {
    return null;
  }

  return {
    status,
    summary: stolen.summary,
    reportedAt: stolen.reportedAt,
    evidenceFiles,
    policeReportFiles,
  };
}

export function setStolenAssetMeta(
  value: unknown,
  meta: StolenAssetMeta
): DynamicFieldsRecord {
  return {
    ...getDynamicFieldsRecord(value),
    [META_KEYS.stolen]: meta,
  };
}
