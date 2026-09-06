"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";
import { reserveNextPassportNumber } from "@/lib/registry/passport-number";
import {
  ApplicantType,
  RegistrationDraft,
  RegistrationRequestStatus,
  deriveRequestStatus,
  evaluateRegistrationCompleteness,
} from "@/lib/registry/workflow";
import {
  sendDraftSavedEmail,
  sendPartnerSubmittedEmail,
  sendRegistrationRequestNotificationEmail,
} from "@/lib/email/send-registration-email";
import { stripHeavyUploadPayloads } from "@/lib/registry/upload-types";

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

function parseJsonObjectField(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) return {};
  try {
    const parsed = JSON.parse(value);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const sanitized = stripHeavyUploadPayloads(parsed);

    if (!sanitized || typeof sanitized !== "object" || Array.isArray(sanitized)) {
      return {};
    }

    return sanitized;
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
    vatNumber: normalizeString(formData.get("vatNumber")),
    applicantType: normalizeString(formData.get("applicantType")) as ApplicantType,
    declarationAccepted: formData.get("declarationAccepted") === "true",
    dynamicFields: parseJsonObjectField(
      formData.get("dynamicFields")
    ) as RegistrationDraft["dynamicFields"],
    documents: parseJsonObjectField(
      formData.get("documents")
    ) as RegistrationDraft["documents"],
  };
}

async function getAuthenticatedOwnerIdentity(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ownerName: user.name.trim(),
    ownerEmail: user.email.trim(),
  };
}

function applyOwnerIdentityToDraft(
  draft: RegistrationDraft,
  ownerIdentity: { ownerName: string; ownerEmail: string }
): RegistrationDraft {
  return {
    ...draft,
    ownerName: ownerIdentity.ownerName,
    ownerEmail: ownerIdentity.ownerEmail,
  };
}

async function persistUserVatNumber(userId: string, draft: RegistrationDraft) {
  if (draft.applicantType !== "sme") {
    return;
  }

  const vatNumber = draft.vatNumber?.trim() ?? "";

  if (!vatNumber) {
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { vatNumber },
  });
}

function getEmailRecipient(draft: RegistrationDraft) {
  return draft.ownerEmail.trim();
}

async function findRecentDuplicateSubmittedRequest(
  userId: string,
  draft: RegistrationDraft
) {
  const recentWindow = new Date(Date.now() - 5 * 60 * 1000);

  return prisma.registrationRequest.findFirst({
    where: {
      deletedAt: null,
      userId,
      applicantType: draft.applicantType,
      assetName: draft.assetName,
      category: draft.category,
      subcategory: draft.subcategory,
      brand: draft.brand,
      model: draft.model,
      serialNumber: draft.serialNumber,
      ownerName: draft.ownerName,
      ownerEmail: draft.ownerEmail,
      createdAt: {
        gte: recentWindow,
      },
      requestStatus: {
        notIn: ["draft", "incomplete"],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      reference: true,
      requestStatus: true,
    },
  });
}

async function logEmailAttempt(
  event: string,
  context: Record<string, unknown>,
  send: () => ReturnType<typeof sendDraftSavedEmail>
) {
  try {
    const result = await send();

    if (!result.success) {
      console.warn(event, {
        ...context,
        reason: result.reason,
        message: result.message,
        missingKeys: result.missingKeys,
        errorCode: result.errorCode,
        responseCode: result.responseCode,
      });
    }
  } catch (error) {
    console.error(`${event}_UNEXPECTED`, {
      ...context,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
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

  if (session.user.role === "admin") {
    return {
      success: false,
      message: "Admin users cannot create customer registrations from this flow.",
    };
  }

  const ownerIdentity = await getAuthenticatedOwnerIdentity(session.user.id);

  if (!ownerIdentity) {
    return {
      success: false,
      message: "Unable to load account owner details.",
    };
  }

  const draft = applyOwnerIdentityToDraft(
    buildDraftFromFormData(formData),
    ownerIdentity
  );
  const langValue = normalizeString(formData.get("lang")).toLowerCase();
  const lang = isValidLang(langValue) ? langValue : "en";
  const completeness = evaluateRegistrationCompleteness(draft);
  const { passportNumber } = await reserveNextPassportNumber(
    draft.category,
    draft.subcategory
  );
  const dynamicFields = draft.dynamicFields as Prisma.InputJsonValue;
  const documents = draft.documents as Prisma.InputJsonValue;

  await persistUserVatNumber(session.user.id, draft);

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
      dynamicFields,
      documents,
      completenessScore: completeness.score,
    },
  });

  const to = getEmailRecipient(draft);
  if (to) {
    await logEmailAttempt(
      "REGISTRATION_DRAFT_EMAIL_SKIPPED",
      {
        passportNumber,
        requestId: request.id,
      },
      () =>
        sendDraftSavedEmail({
          to,
          ownerName: draft.ownerName || "Customer",
          passportNumber,
          assetName: draft.assetName || "Unnamed asset",
        })
    );
  }

  revalidatePath("/");
  revalidatePath(`/${lang}/admin`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath("/dashboard/registrations");
  revalidatePath(`/${lang}/dashboard/registrations`);
  revalidatePath(`/${lang}/dashboard/register`);

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

  if (session.user.role === "admin") {
    return {
      success: false,
      message: "Admin users cannot create customer registrations from this flow.",
    };
  }

  const ownerIdentity = await getAuthenticatedOwnerIdentity(session.user.id);

  if (!ownerIdentity) {
    return {
      success: false,
      message: "Unable to load account owner details.",
    };
  }

  const draft = applyOwnerIdentityToDraft(
    buildDraftFromFormData(formData),
    ownerIdentity
  );
  const langValue = normalizeString(formData.get("lang")).toLowerCase();
  const lang = isValidLang(langValue) ? langValue : "en";
  const completeness = evaluateRegistrationCompleteness(draft);

  if (!completeness.isComplete) {
    return {
      success: false,
      message: "Registration is incomplete. Fill all required fields and documents first.",
      requestStatus: "incomplete",
    };
  }

  const paymentCompleted = true;
  const existingRequest = await findRecentDuplicateSubmittedRequest(
    session.user.id,
    draft
  );

  if (existingRequest) {
    redirect(`/${lang}/dashboard/registrations/${existingRequest.id}`);
  }

  const finalStatus: RegistrationRequestStatus = deriveRequestStatus(
    draft,
    paymentCompleted
  );

  const { passportNumber } = await reserveNextPassportNumber(
    draft.category,
    draft.subcategory
  );
  const dynamicFields = draft.dynamicFields as Prisma.InputJsonValue;
  const documents = draft.documents as Prisma.InputJsonValue;

  await persistUserVatNumber(session.user.id, draft);

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
      dynamicFields,
      documents,
      completenessScore: completeness.score,
    },
  });

  const to = getEmailRecipient(draft);
  if (to) {
    await logEmailAttempt(
      "REGISTRATION_SUBMITTED_EMAIL_SKIPPED",
      {
        passportNumber,
        requestId: request.id,
      },
      () =>
        sendPartnerSubmittedEmail({
          to,
          ownerName: draft.ownerName || "Customer",
          passportNumber,
          assetName: draft.assetName || "Unnamed asset",
        })
    );
  }

  await logEmailAttempt(
    "INTERNAL_REQUEST_NOTIFICATION_SKIPPED",
    {
      passportNumber,
      requestId: request.id,
      destination: "request@equipregistry.com",
    },
    () =>
      sendRegistrationRequestNotificationEmail({
        reference: passportNumber,
        assetName: draft.assetName || "Unnamed asset",
        ownerName: draft.ownerName || "Customer",
        ownerEmail: draft.ownerEmail || "",
        category: draft.category,
        subcategory: draft.subcategory || undefined,
        applicantType: draft.applicantType,
        source: "dashboard_submit",
        lang,
      })
  );

  revalidatePath("/");
  revalidatePath(`/${lang}/admin`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath("/dashboard/registrations");
  revalidatePath(`/${lang}/dashboard/registrations`);
  revalidatePath(`/${lang}/dashboard/register`);

  redirect(`/${lang}/dashboard/registrations/${request.id}`);
}
