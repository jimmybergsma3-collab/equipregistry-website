import type { Lang } from "@/lib/i18n/config";
import { MAILBOXES } from "@/lib/email/addresses";
import { sendEmail } from "@/lib/email/mailer";
import { buildAccountVerificationEmail } from "@/lib/email/templates/account-verification";
import {
  buildApprovedEmail,
  buildDraftSavedEmail,
  buildInternalRequestNotificationEmail,
  buildPartnerSubmittedEmail,
  buildPaymentConfirmedEmail,
  buildPaymentRequiredEmail,
  buildPassportIssuedEmail,
  buildUnderReviewEmail,
} from "@/lib/email/templates/registration";
import { formatPricingAmount, getPricing } from "@/lib/registry/pricing";

export async function sendAccountVerificationEmail(params: {
  to: string;
  ownerName: string;
  verifyUrl: string;
  lang: Lang;
}) {
  const email = buildAccountVerificationEmail(params);

  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendDraftSavedEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildDraftSavedEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendPaymentRequiredEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
  category: string;
  subcategory?: string;
}) {
  const feeText = formatPricingAmount(
    getPricing(params.category, params.subcategory).registration,
    "en"
  );

  const email = buildPaymentRequiredEmail({
    ...params,
    feeText,
  });

  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendPartnerSubmittedEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildPartnerSubmittedEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendPaymentConfirmedEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildPaymentConfirmedEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendUnderReviewEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildUnderReviewEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendApprovedEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildApprovedEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendPassportIssuedEmail(params: {
  to: string;
  ownerName: string;
  passportNumber: string;
  assetName: string;
}) {
  const email = buildPassportIssuedEmail(params);
  return sendEmail({
    to: params.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}

export async function sendRegistrationRequestNotificationEmail(params: {
  reference: string;
  assetName: string;
  ownerName: string;
  ownerEmail: string;
  category: string;
  subcategory?: string;
  applicantType: string;
  source: "dashboard_submit" | "stripe_confirmed";
  lang: string;
}) {
  const email = buildInternalRequestNotificationEmail(params);

  return sendEmail({
    to: MAILBOXES.internalRequests,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
}
