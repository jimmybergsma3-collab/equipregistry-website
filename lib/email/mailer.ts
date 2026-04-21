import nodemailer from "nodemailer";
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

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = portValue ? Number(portValue) : NaN;
  const missingKeys = [
    !host ? "SMTP_HOST" : null,
    !portValue || !Number.isFinite(port) ? "SMTP_PORT" : null,
    !user ? "SMTP_USER" : null,
    !pass ? "SMTP_PASS" : null,
  ].filter((key): key is string => Boolean(key));

  return {
    host,
    port,
    user,
    pass,
    from: process.env.SMTP_FROM?.trim(),
    isConfigured: missingKeys.length === 0,
    missingKeys,
  };
}

let smtpTransporter: nodemailer.Transporter | null = null;

function getSmtpTransporter() {
  const config = getSmtpConfig();

  if (!config.isConfigured) {
    return null;
  }

  if (!smtpTransporter) {
    smtpTransporter = nodemailer.createTransport({
      host: config.host!,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user!,
        pass: config.pass!,
      },
    });
  }

  return smtpTransporter;
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
  const resendConfig = getResendApiKey();
  const smtpConfig = getSmtpConfig();
  const from =
    params.from?.trim() ||
    smtpConfig.from ||
    MAILBOXES.transactionalFrom;

  if (!resendConfig.isConfigured && !smtpConfig.isConfigured) {
    const missingKeys = [
      ...resendConfig.missingKeys,
      ...smtpConfig.missingKeys,
    ];

    console.error("MAIL_CONFIG_INVALID", {
      provider: "resend_or_smtp",
      missingKeys,
      to: maskRecipients(params.to),
      subject: params.subject,
    });

    return {
      success: false,
      skipped: true,
      reason: "config_invalid",
      message: `Email configuration is incomplete: ${missingKeys.join(", ")}`,
      missingKeys,
    };
  }

  const resend = resendConfig.isConfigured ? getResendClient() : null;

  if (resendConfig.isConfigured && !resend) {
    return {
      success: false,
      skipped: true,
      reason: "config_invalid",
      message: "Resend client could not be initialized.",
      missingKeys: ["RESEND_API_KEY"],
    };
  }

  if (resend) {
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
        if (smtpConfig.isConfigured) {
          console.warn("MAIL_RESEND_SEND_FAILED_TRYING_SMTP", {
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
        } else {
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
      } else {
        return {
          success: true,
          skipped: false,
          messageId: data?.id ?? "",
        };
      }
    } catch (error) {
      const mailError = error as Error & {
        code?: string;
        statusCode?: number;
      };

      if (smtpConfig.isConfigured) {
        console.warn("MAIL_RESEND_SEND_FAILED_TRYING_SMTP", {
          provider: "resend",
          from,
          to: maskRecipients(params.to),
          subject: params.subject,
          errorCode: mailError.code,
          responseCode: mailError.statusCode,
          message: mailError.message,
        });
      } else {
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
  }

  const smtpTransporter = getSmtpTransporter();

  if (!smtpTransporter) {
    return {
      success: false,
      skipped: true,
      reason: "config_invalid",
      message: "SMTP client could not be initialized.",
      missingKeys: smtpConfig.missingKeys,
    };
  }

  try {
    const result = await smtpTransporter.sendMail({
      from,
      to: params.to,
      replyTo: params.replyTo?.trim() || undefined,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    return {
      success: true,
      skipped: false,
      messageId: result.messageId ?? "",
    };
  } catch (error) {
    const mailError = error as Error & {
      code?: string;
      statusCode?: number;
    };

    console.error("MAIL_SEND_FAILED", {
      provider: "smtp",
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
