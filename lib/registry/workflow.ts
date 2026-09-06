import { getRequiredDynamicFieldKeys } from "@/lib/registry/asset-fields";
import {
  RegistrationDocumentKey,
  RegistrationDocumentMap,
  createEmptyDocumentMap,
  getRequiredDocumentsForContext,
} from "@/lib/registry/document-rules";

export type ApplicantType =
  | "private"
  | "sme"
  | "insurer_partner"
  | "bank_partner"
  | "dealer_partner"
  | "rental_partner";

export type RegistrationRequestStatus =
  | "draft"
  | "incomplete"
  | "ready_for_submission"
  | "payment_required"
  | "submitted"
  | "under_review"
  | "more_info_required"
  | "approved"
  | "rejected"
  | "passport_issued";

export type RegistrationStatusDisplay =
  | RegistrationRequestStatus
  | "stolen_pending_review"
  | "stolen_confirmed";

export type PassportClassificationStatus =
  | "registered_verified"
  | "history_unknown"
  | "stolen_red_flag"
  | "not_registered";

export type RegistrationFileStatus =
  | "missing"
  | "uploaded"
  | "accepted"
  | "rejected";

export type DynamicAssetFieldValues = Record<string, unknown>;

export type RegistrationDraft = {
  assetName: string;
  category: string;
  subcategory: string;
  brand: string;
  model: string;
  serialNumber: string;
  year?: string;
  country?: string;
  ownerName: string;
  ownerEmail: string;
  vatNumber?: string;
  applicantType: ApplicantType;
  declarationAccepted: boolean;
  documents: RegistrationDocumentMap;
  dynamicFields: DynamicAssetFieldValues;
};

export type RegistrationCompletenessResult = {
  isComplete: boolean;
  missingFields: string[];
  missingDocuments: string[];
  missingDynamicFields: string[];
  score: number;
};

export type RegistrationRequestSummary = {
  id: string;
  reference: string;
  assetName: string;
  category: string;
  subcategory: string;
  applicantType: ApplicantType;
  requestStatus: RegistrationRequestStatus;
  displayStatus?: RegistrationStatusDisplay;
  passportStatus?: PassportClassificationStatus | null;
  createdAt: string;
  updatedAt: string;
  paymentCompleted: boolean;
  completeness: RegistrationCompletenessResult;
};

export function isPartnerApplicantType(applicantType: ApplicantType): boolean {
  return (
    applicantType === "insurer_partner" ||
    applicantType === "bank_partner" ||
    applicantType === "dealer_partner" ||
    applicantType === "rental_partner"
  );
}

export function getRequiredFieldLabels(
  applicantType?: ApplicantType
): Array<keyof RegistrationDraft> {
  const base: Array<keyof RegistrationDraft> = [
    "assetName",
    "category",
    "subcategory",
    "brand",
    "model",
    "serialNumber",
    "ownerName",
    "ownerEmail",
    "applicantType",
    "declarationAccepted",
  ];

  if (applicantType === "sme") {
    base.push("vatNumber");
  }

  return base;
}

export function evaluateRegistrationCompleteness(
  draft: RegistrationDraft
): RegistrationCompletenessResult {
  const missingFields: string[] = [];
  const missingDocuments: string[] = [];
  const missingDynamicFields: string[] = [];
  const dynamicFields =
    draft.dynamicFields &&
    typeof draft.dynamicFields === "object" &&
    !Array.isArray(draft.dynamicFields)
      ? draft.dynamicFields
      : {};
  const documents =
    draft.documents &&
    typeof draft.documents === "object" &&
    !Array.isArray(draft.documents)
      ? draft.documents
      : {};

  const requiredFields = getRequiredFieldLabels(draft.applicantType);

  for (const field of requiredFields) {
    const value = draft[field];

    if (field === "declarationAccepted") {
      if (value !== true) {
        missingFields.push("Declaration must be accepted");
      }
      continue;
    }

    if (typeof value === "string" && value.trim() === "") {
      missingFields.push(field);
    }
  }

  const requiredDynamicFieldKeys = getRequiredDynamicFieldKeys(
    draft.category,
    draft.subcategory
  );

  for (const fieldKey of requiredDynamicFieldKeys) {
    const value = dynamicFields[fieldKey];

    if (typeof value === "string" && value.trim() === "") {
      missingDynamicFields.push(fieldKey);
      continue;
    }

    if (Array.isArray(value) && value.filter(Boolean).length === 0) {
      missingDynamicFields.push(fieldKey);
      continue;
    }

    if (
      value === null ||
      value === undefined ||
      (typeof value !== "string" && !Array.isArray(value) && value === false)
    ) {
      missingDynamicFields.push(fieldKey);
    }
  }

  const requiredDocuments = getRequiredDocumentsForContext(
  draft.applicantType,
  draft.category,
  "en"
);

  for (const documentDefinition of requiredDocuments) {
    if (!documentDefinition.required) continue;

    const state = documents[documentDefinition.key];

    const hasFiles = Array.isArray(state?.files) && state.files.length > 0;

    if (
      !state ||
      state.status === "missing" ||
      state.status === "rejected" ||
      !hasFiles
    ) {
      missingDocuments.push(documentDefinition.key);
    }
  }

  const totalChecks =
    requiredFields.length +
    requiredDynamicFieldKeys.length +
    requiredDocuments.filter((doc) => doc.required).length;

  const failedChecks =
    missingFields.length +
    missingDynamicFields.length +
    missingDocuments.length;

  const passedChecks = Math.max(totalChecks - failedChecks, 0);
  const score =
    totalChecks === 0 ? 100 : Math.round((passedChecks / totalChecks) * 100);

  return {
    isComplete:
      missingFields.length === 0 &&
      missingDocuments.length === 0 &&
      missingDynamicFields.length === 0,
    missingFields,
    missingDocuments,
    missingDynamicFields,
    score,
  };
}

export function deriveRequestStatus(
  draft: RegistrationDraft,
  paymentCompleted = true
): RegistrationRequestStatus {
  const completeness = evaluateRegistrationCompleteness(draft);

  if (!completeness.isComplete) {
    return "incomplete";
  }

  if (!paymentCompleted) {
    return "payment_required";
  }

  return "submitted";
}

export function canSubmitRegistration(draft: RegistrationDraft): boolean {
  const status = deriveRequestStatus(draft);
  return status === "submitted";
}

export function getNextSubmitAction(
  applicantTypeOrIsComplete: ApplicantType | boolean,
  isCompleteArg?: boolean,
  paymentCompleted = true
): "complete_required" | "go_to_payment" | "submit_registration" {
  const isComplete =
    typeof applicantTypeOrIsComplete === "boolean"
      ? applicantTypeOrIsComplete
      : Boolean(isCompleteArg);

  if (!isComplete) {
    return "complete_required";
  }

  if (!paymentCompleted) {
    return "go_to_payment";
  }

  return "submit_registration";
}

export function isVisibleInDashboard(
  requestStatus: RegistrationRequestStatus
): boolean {
  return requestStatus !== "draft";
}

export function normalizeRequestStatus(
  status: string | null | undefined
): RegistrationRequestStatus {
  switch (status) {
    case "draft":
      return "draft";
    case "incomplete":
      return "incomplete";
    case "ready_for_submission":
      return "ready_for_submission";
    case "payment_required":
      return "payment_required";
    case "submitted":
      return "submitted";
    case "under_review":
      return "under_review";
    case "more_info_required":
      return "more_info_required";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "passport_issued":
      return "passport_issued";
    default:
      return "submitted";
  }
}

export function getRequestStatusKey(
  status: RegistrationRequestStatus
): string {
  switch (status) {
    case "draft":
      return "draft";
    case "incomplete":
      return "incomplete";
    case "ready_for_submission":
      return "ready_for_submission";
    case "payment_required":
      return "payment_required";
    case "submitted":
      return "submitted";
    case "under_review":
      return "under_review";
    case "more_info_required":
      return "more_info_required";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "passport_issued":
      return "passport_issued";
    default:
      return "unknown";
  }
}

export function getRequestStatusLabel(
  status: RegistrationStatusDisplay
): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "incomplete":
      return "Incomplete";
    case "ready_for_submission":
      return "Ready for submission";
    case "payment_required":
      return "Payment required";
    case "submitted":
      return "Submitted";
    case "under_review":
      return "Under review";
    case "more_info_required":
      return "More info required";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "passport_issued":
      return "Passport issued";
    case "stolen_pending_review":
      return "Under investigation";
    case "stolen_confirmed":
      return "Stolen / Red Flag";
    default:
      return "Unknown";
  }
}

export function getRequestStatusClasses(
  status: RegistrationStatusDisplay
): string {
  switch (status) {
    case "draft":
      return "border border-zinc-200 bg-zinc-100 text-zinc-700";
    case "incomplete":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "ready_for_submission":
      return "border border-sky-200 bg-sky-50 text-sky-700";
    case "payment_required":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "submitted":
      return "border border-blue-200 bg-blue-50 text-blue-700";
    case "under_review":
      return "border border-orange-200 bg-orange-50 text-orange-700";
    case "more_info_required":
      return "border border-red-200 bg-red-50 text-red-700";
    case "approved":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "rejected":
      return "border border-zinc-300 bg-zinc-100 text-zinc-700";
    case "passport_issued":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "stolen_pending_review":
      return "border border-orange-200 bg-orange-50 text-orange-700";
    case "stolen_confirmed":
      return "border border-red-200 bg-red-50 text-red-700";
    default:
      return "border border-zinc-200 bg-zinc-100 text-zinc-700";
  }
}

export function getApplicantTypeLabel(applicantType: ApplicantType): string {
  switch (applicantType) {
    case "private":
      return "Private";
    case "sme":
      return "SME";
    case "insurer_partner":
      return "Insurance Partner";
    case "bank_partner":
      return "Bank Partner";
    case "dealer_partner":
      return "Dealer Partner";
    case "rental_partner":
      return "Rental Partner";
    default:
      return "Unknown";
  }
}

export function createEmptyRegistrationDraft(
  applicantType: ApplicantType = "private"
): RegistrationDraft {
  return {
    assetName: "",
    category: "",
    subcategory: "",
    brand: "",
    model: "",
    serialNumber: "",
    year: "",
    country: "",
    ownerName: "",
    ownerEmail: "",
    vatNumber: "",
    applicantType,
    declarationAccepted: false,
    documents: createEmptyDocumentMap(),
    dynamicFields: {},
  };
}

export type { RegistrationDocumentKey };
