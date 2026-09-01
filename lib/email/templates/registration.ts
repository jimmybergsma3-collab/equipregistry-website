// lib/email/templates/registration.ts
import { COMPANY_EMAIL_FOOTER_TEXT } from "@/lib/company-details";

type BaseTemplateParams = {
  ownerName: string;
  passportNumber: string;
  assetName: string;
};

type PaymentRequiredParams = BaseTemplateParams & {
  feeText: string;
};

type InternalRequestNotificationParams = {
  reference: string;
  assetName: string;
  ownerName: string;
  ownerEmail: string;
  category: string;
  subcategory?: string;
  applicantType: string;
  source: "dashboard_submit" | "stripe_confirmed";
  lang: string;
};

function wrapEmailHtml(content: string) {
  return `
    <div style="margin:0; padding:32px; background:#f4f4f5; font-family:Arial, Helvetica, sans-serif; color:#18181b;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e4e4e7; border-radius:16px; overflow:hidden;">
        <div style="padding:24px 28px; background:#09090b; color:#ffffff;">
          <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; color:#a1a1aa;">
            EquipRegistry
          </div>
          <div style="margin-top:10px; font-size:24px; font-weight:700;">
            Registration Update
          </div>
        </div>

        <div style="padding:28px;">
          ${content}
        </div>

        <div style="padding:20px 28px; border-top:1px solid #e4e4e7; font-size:12px; color:#71717a;">
          This is an automated EquipRegistry notification.<br />
          &copy; ${new Date().getFullYear()} ${COMPANY_EMAIL_FOOTER_TEXT}
        </div>
      </div>
    </div>
  `;
}

export function buildDraftSavedEmail(params: BaseTemplateParams) {
  const subject = `EquipRegistry draft saved – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry registration draft has been saved.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `You can return later to continue or complete your registration.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry registration draft has been saved.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #e4e4e7; border-radius:12px; background:#fafafa;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Passport Number</div>
      <div style="margin-top:6px; font-size:18px; font-weight:700;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      You can return later to continue or complete your registration.
    </p>
  `);

  return { subject, text, html };
}

export function buildPaymentRequiredEmail(params: PaymentRequiredParams) {
  const subject = `Payment required – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry registration file has been created.`,
    `Processing will continue after your payment has been completed through Stripe Checkout.`,
    ``,
    `Passport Number / Reference: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    `Fee: ${params.feeText}`,
    ``,
    `Sign in to your EquipRegistry dashboard to complete payment securely.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry registration file has been created. Processing will continue after your payment has been completed through Stripe Checkout.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #fdba74; border-radius:12px; background:#fff7ed;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#9a3412;">Passport Number / Reference</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>
      <div style="margin-top:12px; font-size:14px; color:#44403c;">
        Use your dashboard payment button to continue this registration securely.
      </div>
    </div>

    <div style="margin:20px 0; padding:18px; border:1px solid #e4e4e7; border-radius:12px; background:#fafafa;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600;">${params.assetName}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Fee</div>
      <div style="margin-top:6px; font-size:15px;">${params.feeText}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      Sign in to your EquipRegistry dashboard to complete payment securely.
    </p>
  `);

  return { subject, text, html };
}

export function buildPartnerSubmittedEmail(params: BaseTemplateParams) {
  const subject = `Registration submitted – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry registration has been submitted successfully.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `Your file is now ready for review and further processing.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry registration has been submitted successfully.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #86efac; border-radius:12px; background:#f0fdf4;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Passport Number</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600; color:#18181b;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      Your file is now ready for review and further processing.
    </p>
  `);

  return { subject, text, html };
}

export function buildPaymentConfirmedEmail(params: BaseTemplateParams) {
  const subject = `Payment received – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `We have received your payment for your EquipRegistry registration.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `Your registration file has now moved forward for review and processing.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      We have received your payment for your EquipRegistry registration.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #86efac; border-radius:12px; background:#f0fdf4;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Passport Number</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600; color:#18181b;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      Your registration file has now moved forward for review and processing.
    </p>
  `);

  return { subject, text, html };
}

export function buildUnderReviewEmail(params: BaseTemplateParams) {
  const subject = `Under review – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry registration is now under review.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `We will notify you again when the review has been completed.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry registration is now under review.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #c4b5fd; border-radius:12px; background:#f5f3ff;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#6d28d9;">Passport Number</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#6d28d9;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600; color:#18181b;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      We will notify you again when the review has been completed.
    </p>
  `);

  return { subject, text, html };
}

export function buildApprovedEmail(params: BaseTemplateParams) {
  const subject = `Approved – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry registration has been approved.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `The file has been approved and is ready for passport issuance.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry registration has been approved.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #86efac; border-radius:12px; background:#f0fdf4;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Passport Number</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#166534;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600; color:#18181b;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      The file has been approved and is ready for passport issuance.
    </p>
  `);

  return { subject, text, html };
}

export function buildPassportIssuedEmail(params: BaseTemplateParams) {
  const subject = `Passport issued – ${params.passportNumber}`;

  const text = [
    `Hello ${params.ownerName},`,
    ``,
    `Your EquipRegistry passport has now been issued.`,
    `Passport Number: ${params.passportNumber}`,
    `Asset: ${params.assetName}`,
    ``,
    `Your passport is now available in your account.`,
    ``,
    `EquipRegistry`,
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">Hello ${params.ownerName},</p>
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      Your EquipRegistry passport has now been issued.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #0ea5e9; border-radius:12px; background:#f0f9ff;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#0369a1;">Passport Number</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.passportNumber}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#0369a1;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600; color:#18181b;">${params.assetName}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      Your passport is now available in your account.
    </p>
  `);

  return { subject, text, html };
}

export function buildInternalRequestNotificationEmail(
  params: InternalRequestNotificationParams
) {
  const sourceLabel =
    params.source === "stripe_confirmed"
      ? "Stripe checkout confirmed"
      : "Dashboard submission";
  const categoryLine = params.subcategory?.trim()
    ? `${params.category} / ${params.subcategory.trim()}`
    : params.category;
  const subject = `New EquipRegistry request - ${params.reference}`;

  const text = [
    "EquipRegistry internal request notification",
    "",
    `Reference: ${params.reference}`,
    `Source: ${sourceLabel}`,
    `Asset: ${params.assetName}`,
    `Category: ${categoryLine}`,
    `Applicant type: ${params.applicantType}`,
    `Owner: ${params.ownerName}`,
    `Owner email: ${params.ownerEmail}`,
    `Language: ${params.lang}`,
    "",
    "Review this request in the EquipRegistry admin dashboard.",
  ].join("\n");

  const html = wrapEmailHtml(`
    <p style="margin:0 0 16px; font-size:15px; line-height:1.7;">
      EquipRegistry internal request notification.
    </p>

    <div style="margin:20px 0; padding:18px; border:1px solid #e4e4e7; border-radius:12px; background:#fafafa;">
      <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Reference</div>
      <div style="margin-top:6px; font-size:20px; font-weight:700; color:#18181b;">${params.reference}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Source</div>
      <div style="margin-top:6px; font-size:15px;">${sourceLabel}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Asset</div>
      <div style="margin-top:6px; font-size:15px; font-weight:600;">${params.assetName}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Category</div>
      <div style="margin-top:6px; font-size:15px;">${categoryLine}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Applicant</div>
      <div style="margin-top:6px; font-size:15px;">${params.applicantType}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Owner</div>
      <div style="margin-top:6px; font-size:15px;">${params.ownerName}</div>

      <div style="margin-top:16px; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:#71717a;">Owner email</div>
      <div style="margin-top:6px; font-size:15px;">${params.ownerEmail}</div>
    </div>

    <p style="margin:0; font-size:15px; line-height:1.7;">
      Review this request in the EquipRegistry admin dashboard.
    </p>
  `);

  return { subject, text, html };
}
