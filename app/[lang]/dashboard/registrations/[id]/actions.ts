"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertAdminAction } from "@/lib/auth/assert-admin-action";

type ActionResult = {
  success: boolean;
  message: string;
  tone?: "success" | "warning" | "error";
  refresh?: boolean;
};

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
  reference?: string
) {
  revalidatePath(`/${lang}/admin`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);

  if (reference) {
    revalidatePath(`/${lang}/passport/${reference}`);
  }
}

async function runNotification(
  actionName: string,
  sendNotification: () => Promise<void>
) {
  try {
    await sendNotification();
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

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "approved",
    },
  });

  let message = "Registration approved.";
  let tone: ActionResult["tone"] = "success";

  if (updated.ownerEmail?.trim()) {
    const mailWarning = await runNotification(
      "APPROVE_REGISTRATION",
      async () => {
        const { sendApprovedEmail } = await import(
          "@/lib/email/send-registration-email"
        );

        await sendApprovedEmail({
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

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "passport_issued",
    },
  });

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

  revalidateRegistrationPaths(lang, registrationId, updated.reference);

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
