import nodemailer from "nodemailer";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  const isConfigured = Boolean(host && port && user && pass && from);

  return {
    host,
    port,
    user,
    pass,
    from,
    isConfigured,
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
    console.log("SMTP not configured. Email not sent.");
    console.log(params);
    return { success: false, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true, // belangrijk!
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });

  return { success: true, skipped: false };
}