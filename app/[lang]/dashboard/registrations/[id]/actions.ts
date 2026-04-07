"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertAdminAction } from "@/lib/auth/assert-admin-action";
import {
  sendApprovedEmail,
  sendPaymentConfirmedEmail,
  sendPassportIssuedEmail,
  sendUnderReviewEmail,
} from "@/lib/email/send-registration-email";

type ActionResult = {
  success: boolean;
  message: string;
};

async function getRequestById(registrationId: string) {
  return prisma.registrationRequest.findFirst({
    where: {
      id: registrationId,
    },
  });
}

export async function markRegistrationAsPaid(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return { success: false, message: "Registration not found." };
  }

  if (request.paymentCompleted) {
    return {
      success: false,
      message: "Payment has already been marked as completed.",
    };
  }

  if (request.requestStatus !== "payment_required") {
    return {
      success: false,
      message: "This registration is not waiting for payment confirmation.",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      paymentCompleted: true,
      requestStatus: "submitted",
    },
  });

  if (updated.ownerEmail?.trim()) {
    await sendPaymentConfirmedEmail({
      to: updated.ownerEmail,
      ownerName: updated.ownerName || "Customer",
      passportNumber: updated.reference,
      assetName: updated.assetName || "Unnamed asset",
    });
  }

  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);

  return {
    success: true,
    message: "Payment marked as received. Registration moved to submitted.",
  };
}

export async function moveRegistrationToReview(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return { success: false, message: "Registration not found." };
  }

  if (request.requestStatus !== "submitted") {
    return {
      success: false,
      message: "Only submitted registrations can be moved to review.",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "under_review",
    },
  });

  if (updated.ownerEmail?.trim()) {
    await sendUnderReviewEmail({
      to: updated.ownerEmail,
      ownerName: updated.ownerName || "Customer",
      passportNumber: updated.reference,
      assetName: updated.assetName || "Unnamed asset",
    });
  }

  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);

  return {
    success: true,
    message: "Registration moved to under review.",
  };
}

export async function approveRegistration(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return { success: false, message: "Registration not found." };
  }

  if (request.requestStatus !== "under_review") {
    return {
      success: false,
      message: "Only registrations under review can be approved.",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "approved",
    },
  });

  if (updated.ownerEmail?.trim()) {
    await sendApprovedEmail({
      to: updated.ownerEmail,
      ownerName: updated.ownerName || "Customer",
      passportNumber: updated.reference,
      assetName: updated.assetName || "Unnamed asset",
    });
  }

  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);

  return {
    success: true,
    message: "Registration approved.",
  };
}

export async function issuePassport(
  registrationId: string,
  lang: string
): Promise<ActionResult> {
  const auth = await assertAdminAction();

  if (!auth.ok) {
    return { success: false, message: auth.message };
  }

  const request = await getRequestById(registrationId);

  if (!request) {
    return { success: false, message: "Registration not found." };
  }

  if (request.requestStatus !== "approved") {
    return {
      success: false,
      message: "Only approved registrations can issue a passport.",
    };
  }

  const updated = await prisma.registrationRequest.update({
    where: { id: request.id },
    data: {
      requestStatus: "passport_issued",
    },
  });

  if (updated.ownerEmail?.trim()) {
    await sendPassportIssuedEmail({
      to: updated.ownerEmail,
      ownerName: updated.ownerName || "Customer",
      passportNumber: updated.reference,
      assetName: updated.assetName || "Unnamed asset",
    });
  }

  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationId}`);
  revalidatePath(`/${lang}/passport/${updated.reference}`);

  return {
    success: true,
    message: "Passport issued successfully.",
  };
}