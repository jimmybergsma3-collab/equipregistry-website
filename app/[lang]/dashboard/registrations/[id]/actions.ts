"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { assertAdminAction } from "@/lib/auth/assert-admin-action";
import { getSession } from "@/lib/auth/getSession";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import { getStolenCaseText } from "@/lib/i18n/stolen-case";
import { getStolenReviewText } from "@/lib/i18n/stolen-review";
import {
  getStolenCaseRecord,
  setRegistryAssetStatus,
  setStolenCaseRecord,
  type StolenCaseRecord,
} from "@/lib/registry/request-meta";
import {
  canManageStolenCase,
  createOrUpdateStolenCaseRecord,
  getPreviousRegistryStatus,
  getResolvedRegistryStatus,
  getStolenRegistryStatus,
  parseStolenCaseInput,
  resolveStolenCaseRecord,
} from "@/lib/registry/stolen-case";
import type { StoredUpload } from "@/lib/registry/upload-types";

type ActionResult = {
  success: boolean;
  message: string;
  tone?: "success" | "warning" | "error";
  refresh?: boolean;
};

type RegistrationRequestRecord = NonNullable<
  Awaited<ReturnType<typeof getRequestById>>
>;

type PassportMachineSource = Pick<
  RegistrationRequestRecord,
  | "reference"
  | "serialNumber"
  | "brand"
  | "model"
  | "year"
  | "category"
  | "userId"
> & {
  dynamicFields: unknown;
};

class PassportIssuanceError extends Error {}

async function getRequestById(registrationId: string) {
  return prisma.registrationRequest.findFirst({
    where: {
      id: registrationId,
      deletedAt: null,
    },
  });
}

function revalidateRegistrationPaths(
  lang: string,
  registrationId: string,
  reference?: string,
  machineId?: string
) {
  revalidatePath(`/${lang}`);
  revalidatePath(`/${lang}/admin`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/passports`);
  revalidatePath(`/${lang}/dashboard/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);
  revalidatePath(`/${lang}/dashboard/machines`);

  if (machineId) {
    revalidatePath(`/${lang}/dashboard/machines/${machineId}`);
  }

  if (reference) {
    revalidatePath(`/${lang}/passport/${reference}`);
  }
}

function normalizeOptionalValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

function normalizeOptionalDate(value: string | null | undefined) {
  const normalized = normalizeOptionalValue(value);

  if (!normalized) {
    return null;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(normalized) ? normalized : null;
}

function hasCaseReviewEvidence(
  caseRecord:
    | Pick<
        StolenCaseRecord,
        | "evidenceFiles"
        | "policeReportFiles"
        | "supportingDocumentReferences"
      >
    | null
) {
  if (!caseRecord) {
    return false;
  }

  return (
    caseRecord.evidenceFiles.length > 0 ||
    caseRecord.policeReportFiles.length > 0 ||
    caseRecord.supportingDocumentReferences.length > 0
  );
}

type OwnerStolenReportPayload = {
  policeReportNumber?: string;
  incidentDate?: string;
  incidentCountry?: string;
  incidentDescription?: string;
  evidenceFiles?: StoredUpload[];
};

function getMachineStatusForIssuedRequest(
  dynamicFields: unknown,
  existingMachineStatus?: string | null
) {
  const caseRecord = getStolenCaseRecord(dynamicFields);

  if (caseRecord?.isStolen && caseRecord.status === "open") {
    return getStolenRegistryStatus(caseRecord.previousRegistryStatus);
  }

  return normalizeOptionalValue(existingMachineStatus) ?? "passport_issued";
}

async function createOrSyncPassportMachine(
  tx: Prisma.TransactionClient,
  request: PassportMachineSource
) {
  const existingMachine = await tx.machine.findUnique({
    where: {
      registryId: request.reference,
    },
  });

  if (existingMachine && existingMachine.ownerId !== request.userId) {
    throw new PassportIssuanceError(
      "A passport record already exists for this registration with a different owner. Resolve that record before approving again."
    );
  }

  const machineData = {
    registryId: request.reference,
    serialNumber: request.serialNumber,
    brand: normalizeOptionalValue(request.brand),
    model: normalizeOptionalValue(request.model),
    year: normalizeOptionalValue(request.year),
    category: normalizeOptionalValue(request.category),
    status: getMachineStatusForIssuedRequest(
      request.dynamicFields,
      existingMachine?.status
    ),
    ownerId: request.userId,
  };

  if (existingMachine) {
    return tx.machine.update({
      where: {
        id: existingMachine.id,
      },
      data: machineData,
    });
  }

  return tx.machine.create({
    data: machineData,
  });
}

async function issuePassportRecordForRequest(
  tx: Prisma.TransactionClient,
  registrationId: string,
  entryStatus: "under_review" | "approved"
) {
  const request = await tx.registrationRequest.findFirst({
    where: {
      id: registrationId,
      deletedAt: null,
    },
  });

  if (!request) {
    throw new PassportIssuanceError("Registration not found.");
  }

  if (request.requestStatus !== entryStatus) {
    throw new PassportIssuanceError(
      entryStatus === "under_review"
        ? "This registration is no longer under review. Refresh the page and try again."
        : "Only approved registrations can issue a passport."
    );
  }

  if (entryStatus === "under_review") {
    await tx.registrationRequest.update({
      where: {
        id: request.id,
      },
      data: {
        requestStatus: "approved",
      },
    });
  }

  const existingCase = getStolenCaseRecord(request.dynamicFields);
  const nextDynamicFields =
    existingCase?.isStolen && existingCase.status === "open"
      ? setRegistryAssetStatus(
          setStolenCaseRecord(request.dynamicFields, {
            ...existingCase,
            previousRegistryStatus: "registered_verified",
            previousMachineStatus:
              normalizeOptionalValue(existingCase.previousMachineStatus) ??
              "passport_issued",
          }),
          "verified_stolen"
        )
      : request.dynamicFields;

  const machine = await createOrSyncPassportMachine(tx, {
    ...request,
    dynamicFields: nextDynamicFields,
  });
  const updatedRequest = await tx.registrationRequest.update({
    where: {
      id: request.id,
    },
    data: {
      requestStatus: "passport_issued",
      dynamicFields: nextDynamicFields as Prisma.InputJsonObject,
    },
  });

  return {
    machine,
    updatedRequest,
  };
}

function getPassportIssuanceMessage(error: unknown) {
  if (error instanceof PassportIssuanceError) {
    return error.message;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return "A passport record already exists for this registration. Refresh the page and verify the issued passport before retrying.";
  }

  return "Passport creation failed. The registration was not updated. Please resolve the issue and try again.";
}

async function runNotification(
  actionName: string,
  sendNotification: () => Promise<{ success: boolean } | void>
) {
  const deliveryUnavailableMessage =
    "Notification email could not be sent because email delivery is unavailable.";

  try {
    const result = await sendNotification();

    if (
      result &&
      typeof result === "object" &&
      "success" in result &&
      result.success === false
    ) {
      return deliveryUnavailableMessage;
    }

    return null;
  } catch (error) {
    const mailError = error as Error & {
      code?: string;
      command?: string;
      responseCode?: number;
    };

    console.error(`${actionName}_NOTIFICATION_FAILED`, {
      errorCode: mailError.code,
      responseCode: mailError.responseCode,
      command: mailError.command,
      message: mailError.message,
    });

    return deliveryUnavailableMessage;
  }
}

export async function moveRegistrationToReview(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  if (
    request.requestStatus !== "submitted" &&
    request.requestStatus !== "more_info_required"
  ) {
    return {
      success: false,
      message:
        "Only submitted or more info required registrations can be moved to review.",
      tone: "error",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "under_review",
    },
  });

  let message =
    request.requestStatus === "more_info_required"
      ? "Registration moved back to under review."
      : "Registration moved to under review.";
  let tone: ActionResult["tone"] = "success";

  if (updated.ownerEmail?.trim()) {
    const mailWarning = await runNotification(
      "MOVE_REGISTRATION_TO_REVIEW",
      async () => {
        const { sendUnderReviewEmail } = await import(
          "@/lib/email/send-registration-email"
        );

        await sendUnderReviewEmail({
          to: updated.ownerEmail,
          ownerName: updated.ownerName || "Customer",
          passportNumber: updated.reference,
          assetName: updated.assetName || "Unnamed asset",
        });
      }
    );

    if (mailWarning) {
      message = `${message} ${mailWarning}`;
      tone = "warning";
    }
  }

  revalidateRegistrationPaths(lang, registrationId);

  return {
    success: true,
    message,
    tone,
    refresh: true,
  };
}

export async function approveRegistration(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  if (request.requestStatus !== "under_review") {
    return {
      success: false,
      message: "Only registrations under review can be approved.",
      tone: "error",
    };
  }

  let updated: Awaited<
    ReturnType<typeof issuePassportRecordForRequest>
  >["updatedRequest"];
  let machine: Awaited<ReturnType<typeof issuePassportRecordForRequest>>["machine"];

  try {
    const issued = await prisma.$transaction((tx) =>
      issuePassportRecordForRequest(tx, request.id, "under_review")
    );

    updated = issued.updatedRequest;
    machine = issued.machine;
  } catch (error) {
    console.error("APPROVE_REGISTRATION_PASSPORT_FAILED", {
      registrationId,
      message: error instanceof Error ? error.message : "Unknown error",
      code:
        error instanceof Prisma.PrismaClientKnownRequestError
          ? error.code
          : undefined,
    });

    return {
      success: false,
      message: getPassportIssuanceMessage(error),
      tone: "error",
    };
  }

  let message = "Registration approved and passport issued.";
  let tone: ActionResult["tone"] = "success";

  if (updated.ownerEmail?.trim()) {
    const mailWarning = await runNotification(
      "APPROVE_REGISTRATION",
      async () => {
        const { sendPassportIssuedEmail } = await import(
          "@/lib/email/send-registration-email"
        );

        await sendPassportIssuedEmail({
          to: updated.ownerEmail,
          ownerName: updated.ownerName || "Customer",
          passportNumber: updated.reference,
          assetName: updated.assetName || "Unnamed asset",
        });
      }
    );

    if (mailWarning) {
      message = `${message} ${mailWarning}`;
      tone = "warning";
    }
  }

  revalidateRegistrationPaths(lang, registrationId, updated.reference, machine.id);

  return {
    success: true,
    message,
    tone,
    refresh: true,
  };
}

export async function requestMoreInformation(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  if (
    request.requestStatus !== "submitted" &&
    request.requestStatus !== "under_review"
  ) {
    return {
      success: false,
      message:
        "Only submitted or under review registrations can request more information.",
      tone: "error",
    };
  }

  await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "more_info_required",
    },
  });

  revalidateRegistrationPaths(lang, registrationId);

  return {
    success: true,
    message: "Registration marked as more info required.",
    tone: "success",
    refresh: true,
  };
}

export async function rejectRegistration(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  if (
    request.requestStatus !== "under_review" &&
    request.requestStatus !== "more_info_required"
  ) {
    return {
      success: false,
      message:
        "Only registrations under review or waiting for more information can be rejected.",
      tone: "error",
    };
  }

  await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "rejected",
    },
  });

  revalidateRegistrationPaths(lang, registrationId);

  return {
    success: true,
    message: "Registration rejected.",
    tone: "success",
    refresh: true,
  };
}

export async function issuePassport(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  if (request.requestStatus !== "approved") {
    return {
      success: false,
      message: "Only approved registrations can issue a passport.",
      tone: "error",
    };
  }

  let updated: Awaited<
    ReturnType<typeof issuePassportRecordForRequest>
  >["updatedRequest"];
  let machine: Awaited<ReturnType<typeof issuePassportRecordForRequest>>["machine"];

  try {
    const issued = await prisma.$transaction((tx) =>
      issuePassportRecordForRequest(tx, request.id, "approved")
    );

    updated = issued.updatedRequest;
    machine = issued.machine;
  } catch (error) {
    console.error("ISSUE_PASSPORT_FAILED", {
      registrationId,
      message: error instanceof Error ? error.message : "Unknown error",
      code:
        error instanceof Prisma.PrismaClientKnownRequestError
          ? error.code
          : undefined,
    });

    return {
      success: false,
      message: getPassportIssuanceMessage(error),
      tone: "error",
    };
  }

  let message = "Passport issued successfully.";
  let tone: ActionResult["tone"] = "success";

  if (updated.ownerEmail?.trim()) {
    const mailWarning = await runNotification(
      "ISSUE_PASSPORT",
      async () => {
        const { sendPassportIssuedEmail } = await import(
          "@/lib/email/send-registration-email"
        );

        await sendPassportIssuedEmail({
          to: updated.ownerEmail,
          ownerName: updated.ownerName || "Customer",
          passportNumber: updated.reference,
          assetName: updated.assetName || "Unnamed asset",
        });
      }
    );

    if (mailWarning) {
      message = `${message} ${mailWarning}`;
      tone = "warning";
    }
  }

  revalidateRegistrationPaths(lang, registrationId, updated.reference, machine.id);

  return {
    success: true,
    message,
    tone,
    refresh: true,
  };
}

export async function saveStolenCase(
  registrationId: string,
  lang: string,
  formData: FormData
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const text = getStolenCaseText(lang);
  const reviewText = getStolenReviewText(lang);
  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: text.admin.messages.requestMissing,
      tone: "error",
    };
  }

  const existingCase = getStolenCaseRecord(request.dynamicFields);

  if (!canManageStolenCase(request.requestStatus, Boolean(existingCase))) {
    return {
      success: false,
      message: text.admin.messages.notEligible,
      tone: "error",
    };
  }

  const input = parseStolenCaseInput(formData);

  if (!input.incidentDescription) {
    return {
      success: false,
      message: text.admin.messages.missingDescription,
      tone: "error",
    };
  }

  const previousRegistryStatus =
    existingCase?.previousRegistryStatus ??
    getPreviousRegistryStatus(request.dynamicFields, request.requestStatus);
  const machine =
    request.requestStatus === "passport_issued"
      ? await prisma.machine.findUnique({
          where: {
            registryId: request.reference,
          },
        })
      : null;
  const nextStatus =
    existingCase?.status === "open" ? "open" : "pending_review";
  const nextCase = createOrUpdateStolenCaseRecord({
    existingCase,
    registrationReference: request.reference,
    previousRegistryStatus,
    previousMachineStatus: normalizeOptionalValue(
      existingCase?.previousMachineStatus ?? machine?.status
    ),
    actorUserId: auth.session.user.id,
    input,
    nextStatus,
  });
  const updatedDynamicFields = setRegistryAssetStatus(
    setStolenCaseRecord(request.dynamicFields, nextCase),
    nextStatus === "open"
      ? getStolenRegistryStatus(previousRegistryStatus)
      : previousRegistryStatus
  );

  await prisma.$transaction(async (tx) => {
    await tx.registrationRequest.update({
      where: {
        id: request.id,
      },
      data: {
        dynamicFields: updatedDynamicFields as Prisma.InputJsonObject,
      },
    });

    if (machine && nextStatus === "open") {
      await tx.machine.update({
        where: {
          id: machine.id,
        },
        data: {
          status: getStolenRegistryStatus(nextCase.previousRegistryStatus),
        },
      });
    }
  });

  revalidateRegistrationPaths(
    lang,
    registrationId,
    request.reference,
    machine?.id
  );

  return {
    success: true,
    message:
      nextStatus === "open"
        ? text.admin.messages.saved
        : reviewText.messages.pendingSaved,
    tone: "success",
    refresh: true,
  };
}

export async function submitOwnerStolenReport(
  registrationId: string,
  lang: string,
  payload: OwnerStolenReportPayload
): Promise<ActionResult> {
  const session = await getSession();
  const text = getCustomerStolenReportText(lang);

  if (!session.isAuthenticated) {
    return {
      success: false,
      message: text.messages.authRequired,
      tone: "error",
    };
  }

  const request = await prisma.registrationRequest.findFirst({
    where: {
      id: registrationId,
      userId: session.user.id,
      deletedAt: null,
    },
  });

  if (!request) {
    return {
      success: false,
      message: text.messages.requestMissing,
      tone: "error",
    };
  }

  if (request.requestStatus !== "passport_issued") {
    return {
      success: false,
      message: text.messages.notEligible,
      tone: "error",
    };
  }

  const existingCase = getStolenCaseRecord(request.dynamicFields);

  if (existingCase?.status === "pending_review") {
    return {
      success: false,
      message: text.messages.alreadyPending,
      tone: "warning",
    };
  }

  if (existingCase?.isStolen && existingCase.status === "open") {
    return {
      success: false,
      message: text.messages.alreadyActive,
      tone: "warning",
    };
  }

  const incidentDescription = payload.incidentDescription?.trim() ?? "";

  if (!incidentDescription) {
    return {
      success: false,
      message: text.validation.descriptionRequired,
      tone: "error",
    };
  }

  const evidenceFiles = Array.isArray(payload.evidenceFiles)
    ? payload.evidenceFiles.filter(
        (file): file is StoredUpload =>
          Boolean(
            file &&
              typeof file.id === "string" &&
              typeof file.originalName === "string" &&
              typeof file.relativePath === "string"
          )
      )
    : [];

  if (evidenceFiles.length === 0) {
    return {
      success: false,
      message: text.validation.uploadsRequired,
      tone: "error",
    };
  }

  const previousRegistryStatus =
    existingCase?.previousRegistryStatus ??
    getPreviousRegistryStatus(request.dynamicFields, request.requestStatus);
  const machine = await prisma.machine.findUnique({
    where: {
      registryId: request.reference,
    },
  });
  const supportingDocumentReferences = Array.from(
    new Set(
      evidenceFiles
        .map((file) => file.originalName.trim())
        .filter(Boolean)
    )
  );
  const reusableCase = existingCase?.status === "resolved" ? null : existingCase;
  const nextCase = createOrUpdateStolenCaseRecord({
    existingCase: reusableCase,
    registrationReference: request.reference,
    previousRegistryStatus,
    previousMachineStatus: normalizeOptionalValue(
      reusableCase?.previousMachineStatus ?? machine?.status
    ),
    actorUserId: session.user.id,
    input: {
      policeReportNumber: normalizeOptionalValue(payload.policeReportNumber),
      policeReportDate: null,
      country: normalizeOptionalValue(payload.incidentCountry),
      cityRegion: null,
      incidentDate: normalizeOptionalDate(payload.incidentDate),
      incidentDescription,
      supportingDocumentReferences,
      caseNotes: null,
    },
    nextStatus: "pending_review",
    evidenceFiles,
  });
  const updatedDynamicFields = setRegistryAssetStatus(
    setStolenCaseRecord(request.dynamicFields, nextCase),
    previousRegistryStatus
  );

  await prisma.$transaction(async (tx) => {
    await tx.registrationRequest.update({
      where: {
        id: request.id,
      },
      data: {
        dynamicFields: updatedDynamicFields as Prisma.InputJsonObject,
      },
    });
  });

  revalidateRegistrationPaths(
    lang,
    registrationId,
    request.reference,
    machine?.id
  );

  return {
    success: true,
    message: text.messages.success,
    tone: "success",
    refresh: true,
  };
}

export async function activateStolenCase(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const text = getStolenCaseText(lang);
  const reviewText = getStolenReviewText(lang);
  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: reviewText.messages.caseMissing,
      tone: "error",
    };
  }

  const existingCase = getStolenCaseRecord(request.dynamicFields);

  if (!existingCase) {
    return {
      success: false,
      message: reviewText.messages.caseMissing,
      tone: "error",
    };
  }

  if (existingCase.status !== "pending_review") {
    return {
      success: false,
      message: reviewText.messages.notPending,
      tone: "warning",
    };
  }

  if (request.requestStatus !== "passport_issued") {
    return {
      success: false,
      message: text.admin.messages.notEligible,
      tone: "error",
    };
  }

  if (!hasCaseReviewEvidence(existingCase)) {
    return {
      success: false,
      message: reviewText.messages.missingEvidence,
      tone: "error",
    };
  }

  const machine =
    request.requestStatus === "passport_issued"
      ? await prisma.machine.findUnique({
          where: {
            registryId: request.reference,
          },
        })
      : null;
  const activatedCase = createOrUpdateStolenCaseRecord({
    existingCase,
    registrationReference: request.reference,
    previousRegistryStatus: existingCase.previousRegistryStatus,
    previousMachineStatus: normalizeOptionalValue(
      existingCase.previousMachineStatus ?? machine?.status
    ),
    actorUserId: auth.session.user.id,
    input: {
      policeReportNumber: existingCase.policeReportNumber,
      policeReportDate: existingCase.policeReportDate,
      country: existingCase.country,
      cityRegion: existingCase.cityRegion,
      incidentDate: existingCase.incidentDate,
      incidentDescription: existingCase.incidentDescription,
      supportingDocumentReferences: existingCase.supportingDocumentReferences,
      caseNotes: existingCase.caseNotes,
    },
    nextStatus: "open",
    evidenceFiles: existingCase.evidenceFiles,
    policeReportFiles: existingCase.policeReportFiles,
  });
  const stolenRegistryStatus = getStolenRegistryStatus(
    activatedCase.previousRegistryStatus
  );
  const updatedDynamicFields = setRegistryAssetStatus(
    setStolenCaseRecord(request.dynamicFields, activatedCase),
    stolenRegistryStatus
  );

  await prisma.$transaction(async (tx) => {
    await tx.registrationRequest.update({
      where: {
        id: request.id,
      },
      data: {
        dynamicFields: updatedDynamicFields as Prisma.InputJsonObject,
      },
    });

    if (machine) {
      await tx.machine.update({
        where: {
          id: machine.id,
        },
        data: {
          status: stolenRegistryStatus,
        },
      });
    }
  });

  revalidateRegistrationPaths(
    lang,
    registrationId,
    request.reference,
    machine?.id
  );

  return {
    success: true,
    message: reviewText.messages.activated,
    tone: "success",
    refresh: true,
  };
}

export async function resolveStolenCase(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const text = getStolenCaseText(lang);
  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: text.admin.messages.requestMissing,
      tone: "error",
    };
  }

  const existingCase = getStolenCaseRecord(request.dynamicFields);

  if (!existingCase) {
    return {
      success: false,
      message: text.admin.messages.caseMissing,
      tone: "error",
    };
  }

  if (!canManageStolenCase(request.requestStatus, true)) {
    return {
      success: false,
      message: text.admin.messages.notEligible,
      tone: "error",
    };
  }

  const machine =
    request.requestStatus === "passport_issued"
      ? await prisma.machine.findUnique({
          where: {
            registryId: request.reference,
          },
        })
      : null;
  const restoredRegistryStatus = getResolvedRegistryStatus({
    existingCase,
    requestStatus: request.requestStatus,
    machineCreatedAt: machine?.createdAt ?? null,
  });
  const resolvedCase = resolveStolenCaseRecord(
    existingCase,
    auth.session.user.id
  );
  const updatedDynamicFields = setRegistryAssetStatus(
    setStolenCaseRecord(request.dynamicFields, resolvedCase),
    restoredRegistryStatus
  );

  await prisma.$transaction(async (tx) => {
    await tx.registrationRequest.update({
      where: {
        id: request.id,
      },
      data: {
        dynamicFields: updatedDynamicFields as Prisma.InputJsonObject,
      },
    });

    if (machine) {
      await tx.machine.update({
        where: {
          id: machine.id,
        },
        data: {
          status:
            normalizeOptionalValue(existingCase.previousMachineStatus) ??
            "passport_issued",
        },
      });
    }
  });

  revalidateRegistrationPaths(
    lang,
    registrationId,
    request.reference,
    machine?.id
  );

  return {
    success: true,
    message: text.admin.messages.resolved,
    tone: "success",
    refresh: true,
  };
}

export async function deleteRegistrationAsAdmin(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message, tone: "error" };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return {
      success: false,
      message: "Registration not found.",
      tone: "error",
    };
  }

  await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidateRegistrationPaths(lang, registrationId, request.reference);

  return {
    success: true,
    message: "Registration deleted.",
    tone: "success",
    refresh: true,
  };
}
