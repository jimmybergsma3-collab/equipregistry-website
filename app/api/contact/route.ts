import { NextResponse } from "next/server";
import {
  type ContactMailboxType,
  getContactRecipient,
  MAILBOXES,
} from "@/lib/email/addresses";
import { sendEmail } from "@/lib/email/mailer";

type ContactType = ContactMailboxType;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getDefaultSubject(contactType: ContactType) {
  switch (contactType) {
    case "business":
      return "Business inquiry";
    case "support":
      return "Support request";
    default:
      return "General inquiry";
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const contactType = String(body.contactType || "general") as ContactType;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!["general", "business", "support"].includes(contactType)) {
      return NextResponse.json(
        { error: "Invalid contact type." },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const to = getContactRecipient(contactType);
    const finalSubject = subject || getDefaultSubject(contactType);
    const safeContactType = escapeHtml(contactType);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(finalSubject);
    const safeMessage = escapeHtml(message);

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New contact form submission</h2>
        <p><strong>Type:</strong> ${safeContactType}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="margin: 24px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${safeMessage}</p>
      </div>
    `;

    const text = [
      "New contact form submission",
      `Type: ${contactType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${finalSubject}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const result = await sendEmail({
      from: MAILBOXES.contactFrom,
      to,
      replyTo: email,
      subject: finalSubject,
      html,
      text,
    });

    if (!result.success) {
      console.error("CONTACT EMAIL ERROR:", {
        to,
        subject: finalSubject,
        reason: result.reason,
        message: result.message,
        missingKeys: result.missingKeys,
        errorCode: result.errorCode,
        responseCode: result.responseCode,
      });

      if (result.reason === "config_invalid") {
        return NextResponse.json(
          { error: "Contact email is not configured. Missing RESEND_API_KEY." },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: "Email could not be sent." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
