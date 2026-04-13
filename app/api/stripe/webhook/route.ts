import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { isValidLang } from "@/lib/i18n/config";
import { setStripePaymentMeta } from "@/lib/registry/request-meta";
import {
  getStripeClient,
  getStripeWebhookSecret,
} from "@/lib/stripe/server";

export const runtime = "nodejs";

async function resolveInvoiceDetails(
  stripe: Stripe,
  invoice: string | Stripe.Invoice | Stripe.DeletedInvoice | null
) {
  if (!invoice) {
    return null;
  }

  if (typeof invoice === "string") {
    try {
      const resolved = await stripe.invoices.retrieve(invoice);
      return "deleted" in resolved && resolved.deleted ? null : resolved;
    } catch {
      return null;
    }
  }

  return "deleted" in invoice && invoice.deleted ? null : invoice;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const requestId = session.metadata?.requestId?.trim();

  if (!requestId) {
    return;
  }

  const registrationRequest = await prisma.registrationRequest.findFirst({
    where: {
      id: requestId,
      deletedAt: null,
    },
  });

  if (!registrationRequest) {
    return;
  }

  const stripe = getStripeClient();
  const invoice = await resolveInvoiceDetails(stripe, session.invoice ?? null);
  const paymentMeta = setStripePaymentMeta(registrationRequest.dynamicFields, {
    provider: "stripe",
    status: "paid",
    checkoutSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : undefined,
    invoiceId: invoice?.id,
    invoiceNumber: invoice?.number ?? undefined,
    invoiceHostedUrl: invoice?.hosted_invoice_url ?? undefined,
    invoicePdfUrl: invoice?.invoice_pdf ?? undefined,
    amountTotal:
      typeof session.amount_total === "number" ? session.amount_total : undefined,
    currency: session.currency ?? undefined,
    paidAt: new Date().toISOString(),
  });

  const shouldSendNotification = !registrationRequest.paymentCompleted;
  const shouldNotifyInternalRequest =
    shouldSendNotification &&
    registrationRequest.requestStatus === "payment_required";

  await prisma.registrationRequest.update({
    where: {
      id: registrationRequest.id,
    },
    data: {
      paymentCompleted: true,
      requestStatus:
        registrationRequest.requestStatus === "payment_required"
          ? "submitted"
          : registrationRequest.requestStatus,
      dynamicFields: paymentMeta as Prisma.InputJsonObject,
    },
  });

  const lang = isValidLang(session.metadata?.lang ?? "")
    ? session.metadata!.lang
    : "en";

  revalidatePath(`/${lang}/dashboard/registrations`);
  revalidatePath(`/${lang}/dashboard/admin/registrations`);
  revalidatePath(`/${lang}/dashboard/registrations/${registrationRequest.id}`);

  if (shouldSendNotification || shouldNotifyInternalRequest) {
    try {
      const { sendPaymentConfirmedEmail, sendRegistrationRequestNotificationEmail } = await import(
        "@/lib/email/send-registration-email"
      );

      if (shouldSendNotification && registrationRequest.ownerEmail?.trim()) {
        await sendPaymentConfirmedEmail({
          to: registrationRequest.ownerEmail,
          ownerName: registrationRequest.ownerName || "Customer",
          passportNumber: registrationRequest.reference,
          assetName: registrationRequest.assetName || "Unnamed asset",
        });
      }

      if (shouldNotifyInternalRequest) {
        const internalResult =
          await sendRegistrationRequestNotificationEmail({
            reference: registrationRequest.reference,
            assetName: registrationRequest.assetName || "Unnamed asset",
            ownerName: registrationRequest.ownerName || "Customer",
            ownerEmail: registrationRequest.ownerEmail,
            category: registrationRequest.category,
            subcategory: registrationRequest.subcategory || undefined,
            applicantType: registrationRequest.applicantType,
            source: "stripe_confirmed",
            lang,
          });

        if (!internalResult.success) {
          console.warn("STRIPE_INTERNAL_REQUEST_NOTIFICATION_SKIPPED", {
            requestId: registrationRequest.id,
            reason: internalResult.reason,
            message: internalResult.message,
            missingKeys: internalResult.missingKeys,
            errorCode: internalResult.errorCode,
            responseCode: internalResult.responseCode,
          });
        }
      }
    } catch (error) {
      console.error("STRIPE_PAYMENT_EMAIL_FLOW_FAILED", {
        requestId: registrationRequest.id,
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { message: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const payload = await request.text();
  const stripe = getStripeClient();
  const webhookSecret = getStripeWebhookSecret();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Invalid Stripe event.",
      },
      { status: 400 }
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;

    if (
      event.type === "checkout.session.async_payment_succeeded" ||
      checkoutSession.payment_status === "paid"
    ) {
      await handleCheckoutCompleted(checkoutSession);
    }
  }

  return NextResponse.json({ received: true });
}
