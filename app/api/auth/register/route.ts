import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Lang } from "@/lib/i18n/config";
import { sendAccountVerificationEmail } from "@/lib/email/send-registration-email";

const ALLOWED_LANGS = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "nl",
  "pt",
  "ru",
  "zh",
  "hi",
  "ar",
] as const;

function createVerificationToken() {
  return randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getBaseUrl(request: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  return new URL(request.url).origin.replace(/\/+$/, "");
}

function isLang(value: string): value is Lang {
  return ALLOWED_LANGS.includes(value as Lang);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const companyName = String(body.companyName || "").trim();
    const vatNumber = String(body.vatNumber || "").trim();
    const termsAccepted =
      body.termsAccepted === true || body.termsAccepted === "true";
    const langValue = String(body.lang || "en").trim().toLowerCase();
    const lang: Lang = isLang(langValue) ? langValue : "en";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "REQUIRED_FIELDS_MISSING" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "PASSWORD_TOO_SHORT" },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "TERMS_ACCEPTANCE_REQUIRED" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerifiedAt: true,
        role: true,
      },
    });

    if (existingUser?.emailVerifiedAt || existingUser?.role === "admin") {
      return NextResponse.json(
        { error: "EMAIL_ALREADY_EXISTS" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const rawToken = createVerificationToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const userId = existingUser
      ? (
          await prisma.$transaction(async (tx) => {
            const user = await tx.user.update({
              where: { id: existingUser.id },
              data: {
                name,
                passwordHash,
                companyName: companyName || null,
                vatNumber: vatNumber || null,
              },
              select: { id: true },
            });

            await tx.emailVerificationToken.updateMany({
              where: {
                userId: user.id,
                usedAt: null,
              },
              data: {
                usedAt: new Date(),
              },
            });

            await tx.emailVerificationToken.create({
              data: {
                userId: user.id,
                tokenHash,
                expiresAt,
              },
            });

            return user.id;
          })
        )
      : (
          await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
              data: {
                name,
                email,
                passwordHash,
                companyName: companyName || null,
                vatNumber: vatNumber || null,
                role: "user",
              },
              select: { id: true },
            });

            await tx.emailVerificationToken.create({
              data: {
                userId: user.id,
                tokenHash,
                expiresAt,
              },
            });

            return user.id;
          })
        );

    const baseUrl = getBaseUrl(request);
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(
      rawToken
    )}&lang=${encodeURIComponent(lang)}`;
    let verificationEmailSent = false;

    try {
      const emailResult = await sendAccountVerificationEmail({
        to: email,
        ownerName: name,
        verifyUrl,
        lang,
      });

      verificationEmailSent = emailResult.success;

      if (!emailResult.success) {
        console.warn("AUTH_REGISTER_VERIFICATION_EMAIL_SKIPPED", {
          userId,
          reason: emailResult.reason,
          message: emailResult.message,
          missingKeys: emailResult.missingKeys,
          errorCode: emailResult.errorCode,
          responseCode: emailResult.responseCode,
        });
      }
    } catch (error) {
      const mailError =
        error instanceof Error ? error : new Error("Unknown mail error");

      console.error("AUTH_REGISTER_VERIFICATION_EMAIL_FAILED_UNEXPECTED", {
        userId,
        message: mailError.message,
      });
    }

    return NextResponse.json({
      success: true,
      verificationRequired: verificationEmailSent,
      emailDeliverySkipped: !verificationEmailSent,
      userId,
      message: verificationEmailSent
        ? "VERIFY_EMAIL_REQUIRED"
        : "REGISTERED_EMAIL_SKIPPED",
    });
  } catch (error) {
    console.error("AUTH_REGISTER_ERROR", error);

    return NextResponse.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
