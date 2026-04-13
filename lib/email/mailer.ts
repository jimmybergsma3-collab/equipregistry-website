import { Resend } from "resend";
import { MAILBOXES } from "@/lib/email/addresses";

function maskEmailAddress(email: string) {
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");

  if (atIndex <= 1) return trimmed;

  return `${trimmed.slice(0, 2)}***${trimmed.slice(atIndex)}`;
}

function maskRecipients(to: string | string[]) {
  const list = Array.isArray(to) ? to : [to];
  return list.map((email) => maskEmailAddress(email));
}

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  return {
    apiKey,
    isConfigured: Boolean(apiKey),
    missingKeys: apiKey ? [] : ["RESEND_API_KEY"],
  };
}

let resendClient: Resend | null = null;

function getResendClient() {
  const config = getResendApiKey();

  if (!config.apiKey) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(config.apiKey);
  }

  return resendClient;
}

export type EmailSendResult =
  | {
      success: true;
      skipped: false;
      messageId: string;
    }
  | {
      success: false;
      skipped: true;
      reason: "config_invalid" | "send_failed";
      message: string;
      missingKeys?: string[];
      errorCode?: string;
      responseCode?: number;
      command?: string;
    };

export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  from?: string;
  replyTo?: string;
}): Promise<EmailSendResult> {
  const config = getResendApiKey();

  if (!config.isConfigured) {
    console.error("MAIL_CONFIG_INVALID", {
      provider: "resend",
      missingKeys: config.missingKeys,
      to: maskRecipients(params.to),
      subject: params.subject,
    });

    return {
      success: false,
      skipped: true,
      reason: "config_invalid",
      message: `Resend configuration is incomplete: ${config.missingKeys.join(", ")}`,
      missingKeys: config.missingKeys,
    };
  }

  const resend = getResendClient();

  if (!resend) {
    return {
      success: false,
      skipped: true,
      reason: "config_invalid",
      message: "Resend client could not be initialized.",
      missingKeys: ["RESEND_API_KEY"],
    };
  }

  const from = params.from?.trim() || MAILBOXES.transactionalFrom;

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: params.to,
      replyTo: params.replyTo?.trim() || undefined,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    if (error) {
      console.error("MAIL_SEND_FAILED", {
        provider: "resend",
        from,
        to: maskRecipients(params.to),
        subject: params.subject,
        errorCode: error.name,
        responseCode:
          "statusCode" in error && typeof error.statusCode === "number"
            ? error.statusCode
            : undefined,
        message: error.message,
      });

      return {
        success: false,
        skipped: true,
        reason: "send_failed",
        message: error.message,
        errorCode: error.name,
        responseCode:
          "statusCode" in error && typeof error.statusCode === "number"
            ? error.statusCode
            : undefined,
      };
    }

    return {
      success: true,
      skipped: false,
      messageId: data?.id ?? "",
    };
  } catch (error) {
    const mailError = error as Error & {
      code?: string;
      statusCode?: number;
    };

    console.error("MAIL_SEND_FAILED", {
      provider: "resend",
      from,
      to: maskRecipients(params.to),
      subject: params.subject,
      errorCode: mailError.code,
      responseCode: mailError.statusCode,
      message: mailError.message,
    });

    return {
      success: false,
      skipped: true,
      reason: "send_failed",
      message: mailError.message,
      errorCode: mailError.code,
      responseCode: mailError.statusCode,
    };
  }
}
