import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getPricingCategoryContent } from "@/lib/i18n/pricing-categories";
import { getStripePaymentText } from "@/lib/i18n/stripe-payment";
import {
  getPricing,
  getPricingCategory,
} from "@/lib/registry/pricing";
import {
  getLocalizedPricingDisplay,
  getLocalizedPricingMinorUnitAmount,
  getVisitorCountryCodeFromHeaders,
} from "@/lib/registry/display-pricing";
import {
  setStripePaymentMeta,
} from "@/lib/registry/request-meta";
import { getAppBaseUrl, getStripeClient } from "@/lib/stripe/server";

type CheckoutPayload = {
  registrationId?: string;
  lang?: string;
};

export async function POST(request: Request) {
  let payload: CheckoutPayload = {};

  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    payload = {};
  }

  const safeLang: Lang =
    typeof payload.lang === "string" && isValidLang(payload.lang)
      ? payload.lang
      : "en";
  const text = getStripePaymentText(safeLang);

  const session = await getSession();

  if (!session.isAuthenticated) {
    return NextResponse.json(
      { message: text.authRequired },
      { status: 401 }
    );
  }

  const registrationId = typeof payload.registrationId === "string"
    ? payload.registrationId.trim()
    : "";

  if (!registrationId) {
    return NextResponse.json(
      { message: text.requestMissing },
      { status: 404 }
    );
  }

  const registrationRequest = await prisma.registrationRequest.findFirst({
    where:
      session.user.role === "admin"
        ? {
            id: registrationId,
            deletedAt: null,
          }
        : {
            id: registrationId,
            userId: session.user.id,
            deletedAt: null,
          },
  });

  if (!registrationRequest) {
    return NextResponse.json(
      { message: text.requestMissing },
      { status: 404 }
    );
  }

  if (registrationRequest.paymentCompleted) {
    return NextResponse.json(
      { message: text.alreadyPaid },
      { status: 400 }
    );
  }

  if (registrationRequest.requestStatus !== "payment_required") {
    return NextResponse.json(
      { message: text.notPayable },
      { status: 400 }
    );
  }

  const pricingCategory = getPricingCategory(
    registrationRequest.category,
    registrationRequest.subcategory
  );
  const pricing = getPricing(
    registrationRequest.category,
    registrationRequest.subcategory
  );
  const pricingDisplay = await getLocalizedPricingDisplay({
    lang: safeLang,
    acceptLanguage: request.headers.get("accept-language"),
    countryCode: getVisitorCountryCodeFromHeaders(request.headers),
  });
  const categoryContent = getPricingCategoryContent(safeLang, pricingCategory);
  const baseUrl = getAppBaseUrl(request);
  const stripe = getStripeClient();
  const checkoutCurrency = pricingDisplay.currency.toLowerCase();
  const checkoutAmount = getLocalizedPricingMinorUnitAmount(
    pricing.registration,
    pricingDisplay
  );
  const metadata = {
    referenceNumber: registrationRequest.reference,
    requestId: registrationRequest.id,
    registrationId: registrationRequest.id,
    category: registrationRequest.category,
    subcategory: registrationRequest.subcategory,
    pricingCategory,
    applicantType: registrationRequest.applicantType,
    lang: safeLang,
  } satisfies Record<string, string>;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${baseUrl}/${safeLang}/dashboard/registrations/${registrationRequest.id}?payment=stripe_success`,
    cancel_url: `${baseUrl}/${safeLang}/dashboard/registrations/${registrationRequest.id}?payment=stripe_cancel`,
    automatic_tax: {
      enabled: true,
    },
    allow_promotion_codes: true,
    invoice_creation: {
      enabled: true,
    },
    customer_email:
      registrationRequest.ownerEmail?.trim() || session.user.email,
    locale: "auto",
    client_reference_id: registrationRequest.reference,
    metadata,
    payment_intent_data: {
      metadata,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: checkoutCurrency,
          unit_amount: checkoutAmount,
          product_data: {
            name: categoryContent.name,
            description: categoryContent.description,
          },
        },
      },
    ],
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      { message: text.sessionUnavailable },
      { status: 500 }
    );
  }

  const updatedDynamicFields = setStripePaymentMeta(
    registrationRequest.dynamicFields,
    {
      provider: "stripe",
      status: "pending",
      checkoutSessionId: checkoutSession.id,
      amountTotal: checkoutAmount,
      currency: checkoutCurrency,
    }
  );

  await prisma.registrationRequest.update({
    where: {
      id: registrationRequest.id,
    },
    data: {
      dynamicFields: updatedDynamicFields as Prisma.InputJsonObject,
    },
  });

  return NextResponse.json({
    url: checkoutSession.url,
  });
}
