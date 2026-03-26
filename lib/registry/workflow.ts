// lib/registry/workflow.ts

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
  | "approved"
  | "rejected"
  | "more_info_required"
  | "passport_issued";

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

export type DynamicAssetFieldValues = Record<string, string>;

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

export function requiresDirectPayment(applicantType: ApplicantType): boolean {
  return applicantType === "private" || applicantType === "sme";
}

export function getRequiredFieldLabels(): Array<keyof RegistrationDraft> {
  return [
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
}

export function evaluateRegistrationCompleteness(
  draft: RegistrationDraft
): RegistrationCompletenessResult {
  const missingFields: string[] = [];
  const missingDocuments: string[] = [];
  const missingDynamicFields: string[] = [];

  const requiredFields = getRequiredFieldLabels();

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

  const requiredDynamicFieldKeys = getRequiredDynamicFieldKeys(draft.category);

  for (const fieldKey of requiredDynamicFieldKeys) {
    const value = draft.dynamicFields[fieldKey];

    if (!value || value.trim() === "") {
      missingDynamicFields.push(fieldKey);
    }
  }

  const requiredDocuments = getRequiredDocumentsForContext(
    draft.applicantType,
    draft.category
  );

  for (const documentDefinition of requiredDocuments) {
    if (!documentDefinition.required) continue;

    const state = draft.documents[documentDefinition.key];

    if (!state || state.status === "missing" || state.status === "rejected") {
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
  paymentCompleted: boolean
): RegistrationRequestStatus {
  const completeness = evaluateRegistrationCompleteness(draft);

  if (!completeness.isComplete) {
    return "incomplete";
  }

  if (requiresDirectPayment(draft.applicantType) && !paymentCompleted) {
    return "payment_required";
  }

  return "ready_for_submission";
}

export function canSubmitRegistration(
  draft: RegistrationDraft,
  paymentCompleted: boolean
): boolean {
  const status = deriveRequestStatus(draft, paymentCompleted);
  return status === "ready_for_submission";
}

export function getNextSubmitAction(
  applicantType: ApplicantType,
  isComplete: boolean,
  paymentCompleted: boolean
): "complete_required" | "go_to_payment" | "submit_registration" {
  if (!isComplete) {
    return "complete_required";
  }

  if (requiresDirectPayment(applicantType) && !paymentCompleted) {
    return "go_to_payment";
  }

  return "submit_registration";
}

export function isVisibleInDashboard(
  requestStatus: RegistrationRequestStatus
): boolean {
  return requestStatus !== "draft";
}

export function getRequestStatusLabel(
  status: RegistrationRequestStatus
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
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "more_info_required":
      return "More information required";
    case "passport_issued":
      return "Passport available";
    default:
      return "Unknown";
  }
}

export function getRequestStatusClasses(
  status: RegistrationRequestStatus
): string {
  switch (status) {
    case "draft":
      return "border border-zinc-200 bg-zinc-100 text-zinc-700";
    case "incomplete":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "ready_for_submission":
      return "border border-blue-200 bg-blue-50 text-blue-700";
    case "payment_required":
      return "border border-orange-200 bg-orange-50 text-orange-700";
    case "submitted":
      return "border border-sky-200 bg-sky-50 text-sky-700";
    case "under_review":
      return "border border-violet-200 bg-violet-50 text-violet-700";
    case "approved":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "rejected":
      return "border border-red-200 bg-red-50 text-red-700";
    case "more_info_required":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "passport_issued":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
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
    applicantType,
    declarationAccepted: false,
    documents: createEmptyDocumentMap(),
    dynamicFields: {},
  };
}

export type { RegistrationDocumentKey };