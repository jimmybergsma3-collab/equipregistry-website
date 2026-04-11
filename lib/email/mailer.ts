import nodemailer from "nodemailer";

const DEFAULT_SMTP_PORT = 465;

function maskEmailAddress(email: string) {
  const trimmed = email.trim();
  const atIndex = trimmed.indexOf("@");

  if (atIndex <= 1) return trimmed;

  return `${trimmed.slice(0, 2)}***${trimmed.slice(atIndex)}`;
}

function extractEmailAddress(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).trim().toLowerCase();
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT?.trim() || DEFAULT_SMTP_PORT);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM?.trim();
  const isValidPort = Number.isFinite(port) && port > 0;
  const missingKeys = [
    !host ? "SMTP_HOST" : null,
    !isValidPort ? "SMTP_PORT" : null,
    !user ? "SMTP_USER" : null,
    !pass ? "SMTP_PASS" : null,
    !from ? "SMTP_FROM" : null,
  ].filter((key): key is string => key !== null);
  const fromAddress = from ? extractEmailAddress(from) : "";
  const authenticatedAddress = user?.toLowerCase() ?? "";

  return {
    host,
    port: isValidPort ? port : DEFAULT_SMTP_PORT,
    user,
    pass,
    from,
    fromAddress,
    authenticatedAddress,
    fromMatchesUser:
      Boolean(fromAddress) && fromAddress === authenticatedAddress,
    isConfigured: missingKeys.length === 0,
    missingKeys,
  };
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const config = getSmtpConfig();

  if (!config.isConfigured) {
    console.error("MAIL_CONFIG_INVALID", {
      missingKeys: config.missingKeys,
      to: maskEmailAddress(params.to),
      subject: params.subject,
    });

    throw new Error(
      `SMTP configuration is incomplete: ${config.missingKeys.join(", ")}`
    );
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === DEFAULT_SMTP_PORT,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  try {
    const info = await transporter.sendMail({
      from: config.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });

    return { success: true, skipped: false, messageId: info.messageId };
  } catch (error) {
    const smtpError = error as Error & {
      code?: string;
      command?: string;
      responseCode?: number;
    };

    console.error("MAIL_SEND_FAILED", {
      to: maskEmailAddress(params.to),
      subject: params.subject,
      host: config.host,
      port: config.port,
      fromAddress: config.fromAddress,
      authenticatedAddress: config.authenticatedAddress,
      fromMatchesUser: config.fromMatchesUser,
      errorCode: smtpError.code,
      responseCode: smtpError.responseCode,
      command: smtpError.command,
      message: smtpError.message,
    });

    throw smtpError;
  }
}
