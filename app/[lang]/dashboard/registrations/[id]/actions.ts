"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { assertAdminAction } from "@/lib/auth/assert-admin-action";

type ActionResult = {
  success: boolean;
  message: string;
  tone?: "success" | "warning" | "error";
  refresh?: boolean;
};

type RegistrationRequestRecord = NonNullable<
  Awaited<ReturnType<typeof getRequestById>>
>;

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
  revalidatePath(`/${lang}/admin`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
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

async function createOrSyncPassportMachine(
  tx: Prisma.TransactionClient,
  request: RegistrationRequestRecord
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
    status: normalizeOptionalValue(existingMachine?.status) ?? "passport_issued",
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

  const machine = await createOrSyncPassportMachine(tx, request);
  const updatedRequest = await tx.registrationRequest.update({
    where: {
      id: request.id,
    },
    data: {
      requestStatus: "passport_issued",
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
  try {
    const result = await sendNotification();

    if (
      result &&
      typeof result === "object" &&
      "success" in result &&
      result.success === false
    ) {
      return "Notification email could not be sent because SMTP delivery is misconfigured or unavailable.";
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

    return "Notification email could not be sent because SMTP delivery is misconfigured or unavailable.";
  }
}

export async function markRegistrationAsPaid(
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

  if (request.paymentCompleted) {
    return {
      success: false,
      message: "Payment has already been marked as completed.",
      tone: "error",
    };
  }

  if (request.requestStatus !== "payment_required") {
    return {
      success: false,
      message: "This registration is not waiting for payment confirmation.",
      tone: "error",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      paymentCompleted: true,
      requestStatus: "submitted",
    },
  });

  let message =
    "Payment marked as received. Registration moved to submitted.";
  let tone: ActionResult["tone"] = "success";

  if (updated.ownerEmail?.trim()) {
    const mailWarning = await runNotification(
      "MARK_REGISTRATION_AS_PAID",
      async () => {
        const { sendPaymentConfirmedEmail } = await import(
          "@/lib/email/send-registration-email"
        );

        await sendPaymentConfirmedEmail({
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
