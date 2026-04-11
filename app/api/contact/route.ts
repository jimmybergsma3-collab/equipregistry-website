import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactType = "general" | "business" | "support";

function getTargetEmail(contactType: ContactType) {
  switch (contactType) {
    case "business":
      return process.env.CONTACT_BUSINESS_EMAIL || "business@equipregistry.com";
    case "support":
      return process.env.CONTACT_SUPPORT_EMAIL || "support@equipregistry.com";
    default:
      return process.env.CONTACT_GENERAL_EMAIL || "info@equipregistry.com";
  }
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

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  return new Resend(apiKey);
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

    const to = getTargetEmail(contactType);
    const from =
      process.env.CONTACT_FROM_EMAIL || "contact@equipregistry.com";
    const finalSubject = subject || getDefaultSubject(contactType);
    const resend = getResendClient();

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111827;">
        <h2>New contact form submission</h2>
        <p><strong>Type:</strong> ${contactType}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${finalSubject}</p>
        <hr style="margin: 24px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
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

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: finalSubject,
      html,
      text,
    });

    if (error) {
      console.error("CONTACT EMAIL ERROR:", error);
      return NextResponse.json(
        { error: "Email could not be sent." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "RESEND_API_KEY is missing."
    ) {
      return NextResponse.json(
        { error: "Contact email is not configured. Missing RESEND_API_KEY." },
        { status: 503 }
      );
    }

    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
