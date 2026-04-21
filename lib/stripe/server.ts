import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function getStripeWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  if (!webhookSecret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }

  return webhookSecret;
}

function getRequestBaseUrl(request: Request) {
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const host =
    forwardedHost ||
    request.headers.get("host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const url = new URL(request.url);
  const protocol = forwardedProto || url.protocol.replace(/:$/, "") || "https";

  if (host) {
    return `${protocol}://${host}`.replace(/\/+$/, "");
  }

  return url.origin.replace(/\/+$/, "");
}

export function getAppBaseUrl(request: Request) {
  const requestUrl = getRequestBaseUrl(request);

  if (requestUrl) {
    return requestUrl;
  }

  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  return new URL(request.url).origin.replace(/\/+$/, "");
}
