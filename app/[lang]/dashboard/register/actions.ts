"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { reserveNextPassportNumber } from "@/lib/registry/passport-number";
import {
  ApplicantType,
  RegistrationDraft,
  RegistrationRequestStatus,
  deriveRequestStatus,
  evaluateRegistrationCompleteness,
  isPartnerApplicantType,
} from "@/lib/registry/workflow";
import {
  sendDraftSavedEmail,
  sendPartnerSubmittedEmail,
  sendPaymentRequiredEmail,
} from "@/lib/email/send-registration-email";

type ActionResult = {
  success: boolean;
  message: string;
  requestId?: string;
  requestStatus?: RegistrationRequestStatus;
  passportNumber?: string;
};

function normalizeString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseJsonField(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function buildDraftFromFormData(formData: FormData): RegistrationDraft {
  return {
    assetName: normalizeString(formData.get("assetName")),
    category: normalizeString(formData.get("category")),
    subcategory: normalizeString(formData.get("subcategory")),
    brand: normalizeString(formData.get("brand")),
    model: normalizeString(formData.get("model")),
    serialNumber: normalizeString(formData.get("serialNumber")),
    year: normalizeString(formData.get("year")),
    country: normalizeString(formData.get("country")),
    ownerName: normalizeString(formData.get("ownerName")),
    ownerEmail: normalizeString(formData.get("ownerEmail")),
    applicantType: normalizeString(formData.get("applicantType")) as ApplicantType,
    declarationAccepted: formData.get("declarationAccepted") === "true",
    dynamicFields: parseJsonField(formData.get("dynamicFields")),
    documents: parseJsonField(formData.get("documents")),
  };
}

function getEmailRecipient(draft: RegistrationDraft) {
  return draft.ownerEmail.trim();
}

export async function saveRegistrationDraft(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();

  if (!session.isAuthenticated) {
    return {
      success: false,
      message: "You must be logged in to save a registration draft.",
    };
  }

  const draft = buildDraftFromFormData(formData);
  const completeness = evaluateRegistrationCompleteness(draft);
  const { passportNumber } = await reserveNextPassportNumber();

  const request = await prisma.registrationRequest.create({
    data: {
      reference: passportNumber,
      userId: session.user.id,
      assetName: draft.assetName,
      category: draft.category,
      subcategory: draft.subcategory,
      brand: draft.brand,
      model: draft.model,
      serialNumber: draft.serialNumber,
      year: draft.year || null,
      country: draft.country || null,
      ownerName: draft.ownerName,
      ownerEmail: draft.ownerEmail,
      applicantType: draft.applicantType,
      requestStatus: "draft",
      paymentCompleted: false,
      declarationAccepted: draft.declarationAccepted,
      dynamicFields: draft.dynamicFields,
      documents: draft.documents,
      completenessScore: completeness.score,
    },
  });

  const to = getEmailRecipient(draft);
  if (to) {
    await sendDraftSavedEmail({
      to,
      ownerName: draft.ownerName || "Customer",
      passportNumber,
      assetName: draft.assetName || "Unnamed asset",
    });
  }

  revalidatePath("/");
  revalidatePath("/dashboard/registrations");

  return {
    success: true,
    message: `Draft saved successfully. Passport number reserved: ${passportNumber}`,
    requestId: request.id,
    requestStatus: "draft",
    passportNumber,
  };
}

export async function submitRegistrationRequest(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();

  if (!session.isAuthenticated) {
    return {
      success: false,
      message: "You must be logged in to submit a registration.",
    };
  }

  const draft = buildDraftFromFormData(formData);
  const completeness = evaluateRegistrationCompleteness(draft);

  if (!completeness.isComplete) {
    return {
      success: false,
      message: "Registration is incomplete. Fill all required fields and documents first.",
      requestStatus: "incomplete",
    };
  }

  const partner = isPartnerApplicantType(draft.applicantType);
  const paymentCompleted = partner ? true : false;

  const derivedStatus = deriveRequestStatus(draft, paymentCompleted);
  const finalStatus: RegistrationRequestStatus = partner ? "submitted" : derivedStatus;

  const { passportNumber } = await reserveNextPassportNumber();

  const request = await prisma.registrationRequest.create({
    data: {
      reference: passportNumber,
      userId: session.user.id,
      assetName: draft.assetName,
      category: draft.category,
      subcategory: draft.subcategory,
      brand: draft.brand,
      model: draft.model,
      serialNumber: draft.serialNumber,
      year: draft.year || null,
      country: draft.country || null,
      ownerName: draft.ownerName,
      ownerEmail: draft.ownerEmail,
      applicantType: draft.applicantType,
      requestStatus: finalStatus,
      paymentCompleted,
      declarationAccepted: draft.declarationAccepted,
      dynamicFields: draft.dynamicFields,
      documents: draft.documents,
      completenessScore: completeness.score,
    },
  });

  const to = getEmailRecipient(draft);
  if (to) {
    if (partner) {
      await sendPartnerSubmittedEmail({
        to,
        ownerName: draft.ownerName || "Customer",
        passportNumber,
        assetName: draft.assetName || "Unnamed asset",
      });
    } else {
      await sendPaymentRequiredEmail({
        to,
        ownerName: draft.ownerName || "Customer",
        passportNumber,
        assetName: draft.assetName || "Unnamed asset",
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/dashboard/registrations");

  return {
    success: true,
    message: partner
      ? `Registration submitted successfully under passport number ${passportNumber}.`
      : `Registration created under passport number ${passportNumber}. Payment is required before processing continues.`,
    requestId: request.id,
    requestStatus: finalStatus,
    passportNumber,
  };
}