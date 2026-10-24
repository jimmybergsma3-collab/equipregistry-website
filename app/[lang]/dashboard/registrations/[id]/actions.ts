"use server";

import { reportIncident, supplementIncident, transitionIncident, privateIncident, saveIncidentContext } from "@/lib/incidents/service";
import type { ReviewCommand } from "@/lib/incidents/private-model";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { assertAdminAction } from "@/lib/auth/assert-admin-action";
import { getSession } from "@/lib/auth/getSession";
import { MAILBOXES } from "@/lib/email/addresses";
import { sendEmail } from "@/lib/email/mailer";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import {
  getStolenCaseRecord,
  setRegistryAssetStatus,
  setStolenCaseRecord,
} from "@/lib/registry/request-meta";
import {
  createOrUpdateStolenCaseRecord,
  getPreviousRegistryStatus,
  getStolenRegistryStatus,
  parseStolenCaseInput,
} from "@/lib/registry/stolen-case";
import { assertIncomingUploadBindings, assertStoredUploadBindings, UPLOAD_BINDING_ERROR } from "@/lib/registry/upload-binding";
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
  const request = await prisma.registrationRequest.findFirst({
    where: {
      id: registrationId,
      deletedAt: null,
    },
  });
  if (request) assertStoredUploadBindings([request.documents, request.dynamicFields], request.userId);
  return request;
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

type OwnerStolenReportPayload = {
  incidentType: "STOLEN" | "MISSING";
  commandKey: string;
  policeReportNumber?: string;
  incidentDate?: string;
  incidentCountry?: string;
  incidentDescription?: string;
  evidenceFiles?: StoredUpload[];
  policeReportFiles?: StoredUpload[];
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

  assertStoredUploadBindings([request.documents, request.dynamicFields], request.userId);

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

        return sendUnderReviewEmail({
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

  await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "approved",
    },
  });

  const message = "Registration approved.";
  const tone: ActionResult["tone"] = "success";

  revalidateRegistrationPaths(lang, registrationId, request.reference);

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

        return sendPassportIssuedEmail({
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

export async function saveStolenCase(registrationId:string,lang:string,formData:FormData):Promise<ActionResult> {
  const auth = await assertAdminAction();
  if(!auth.ok) return {success:false,message:auth.message,tone:"error"};
  const request = await getRequestById(registrationId);
  if(!request) return {success:false,message:"Incident unavailable.",tone:"error"};
  const input = parseStolenCaseInput(formData);
  if(!input.incidentDescription) return {success:false,message:"Description required.",tone:"error"};
  try {
    await saveIncidentContext(registrationId,input);
    revalidateRegistrationPaths(lang,registrationId);
    return {success:true,message:"Incident details saved; alert state is unchanged.",refresh:true};
  } catch { return {success:false,message:"Incident unavailable or legacy review required.",tone:"error"}; }
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

  const currentIncident = await privateIncident(registrationId);

  const incidentDescription = payload.incidentDescription?.trim() ?? "";

  if (!incidentDescription) {
    return {
      success: false,
      message: text.validation.descriptionRequired,
      tone: "error",
    };
  }

  try {
    assertStoredUploadBindings([request.documents, request.dynamicFields], request.userId);
    assertIncomingUploadBindings(
      [payload.evidenceFiles, payload.policeReportFiles],
      session.user.id,
      [request.documents, request.dynamicFields]
    );
  } catch {
    return { success: false, message: UPLOAD_BINDING_ERROR, tone: "error" };
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
  const policeReportFiles = Array.isArray(payload.policeReportFiles)
    ? payload.policeReportFiles.filter(
        (file): file is StoredUpload =>
          Boolean(
            file &&
              typeof file.id === "string" &&
              typeof file.originalName === "string" &&
              typeof file.relativePath === "string"
          )
      )
    : [];

  if (evidenceFiles.length === 0 && policeReportFiles.length === 0) {
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
    policeReportFiles,
  });
  try {
    const intake = {draft:nextCase,expectedDynamicFields:request.dynamicFields};
    const evidenceFileIds = [...evidenceFiles,...policeReportFiles].map(f=>f.id);
    if(currentIncident && currentIncident.state !== "RESOLVED") {
      if(payload.incidentType !== currentIncident.type) throw new Error("Incident type is immutable.");
      await supplementIncident({registrationId,incidentId:currentIncident.id,expectedVersion:currentIncident.version,evidenceFileIds},intake);
    } else {
      await reportIncident({registrationId,type:payload.incidentType,evidenceFileIds,commandKey:payload.commandKey},intake);
    }
  } catch { return {success:false,message:"Report not saved. Refresh and verify the evidence; legacy records require separate review.",tone:"error"}; }

  try {
    const reporterName =
      request.ownerName?.trim() ||
      session.user.email.trim();
    const reporterEmail = session.user.email.trim();
    const assetName = request.assetName.trim() || "Unknown asset";
    const subject = `Incident report submitted - review required (${request.reference})`;
    const textBody = [
      "Incident report submitted - review required",
      "",
      `registryId: ${request.reference}`,
      `assetName: ${assetName}`,
      `user: ${reporterName} <${reporterEmail}>`,
    ].join("\n");
    const htmlBody = `
      <p><strong>Incident report submitted - review required</strong></p>
      <p><strong>registryId:</strong> ${request.reference}</p>
      <p><strong>assetName:</strong> ${assetName}</p>
      <p><strong>user:</strong> ${reporterName} &lt;${reporterEmail}&gt;</p>
    `;

    await sendEmail({
      to: MAILBOXES.support,
      subject,
      text: textBody,
      html: htmlBody,
    });
  } catch (error) {
    console.error("STOLEN_REPORT_SUPPORT_EMAIL_FAILED", {
      registrationId: request.id,
      reference: request.reference,
      message: error instanceof Error ? error.message : String(error),
    });
  }

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

export async function activateStolenCase(registrationId:string,lang:string,review?:ReviewCommand):Promise<ActionResult> {
  const auth = await assertAdminAction();
  if(!auth.ok) return {success:false,message:auth.message,tone:"error"};
  const request = await getRequestById(registrationId);
  const existingCase = getStolenCaseRecord(request?.dynamicFields);
  if(!request || !existingCase || !review) return {success:false,message:"An explicit incident review is required.",tone:"error"};
  // Keep the existing location review input unchanged; the service compares it under lock.
  const reviewContext = {
      policeReportDate: existingCase.policeReportDate,
      country: existingCase.country,
      cityRegion: existingCase.cityRegion,
      incidentDate: existingCase.incidentDate,
  };
  try {
    await transitionIncident({...review,registrationId,to:"ACTIVE",reason:undefined,reviewContext});
    revalidateRegistrationPaths(lang,registrationId,request.reference);
    return {success:true,message:"Active alert",refresh:true};
  } catch { return {success:false,message:"Review refused. Refresh the incident and review all current evidence.",tone:"error"}; }
}

export async function resolveStolenCase(registrationId:string,lang:string,review?:ReviewCommand):Promise<ActionResult> {
  const auth = await assertAdminAction();
  if(!auth.ok) return {success:false,message:auth.message,tone:"error"};
  if(!review) return {success:false,message:"An explicit resolution review is required.",tone:"error"};
  try {
    await transitionIncident({...review,registrationId,to:"RESOLVED"});
    const request=await getRequestById(registrationId);
    revalidateRegistrationPaths(lang,registrationId,request?.reference);
    return {success:true,message:"Alert resolved",refresh:true};
  } catch { return {success:false,message:"Resolution refused. Review current evidence and specify the outcome.",tone:"error"}; }
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
