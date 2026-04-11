import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidLang } from "@/lib/i18n/config";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getLang(value: string | null) {
  return value && isValidLang(value) ? value : "en";
}

function buildStatusUrl(request: Request, lang: string, status: string) {
  return new URL(`/${lang}/verify-email?status=${status}`, request.url);
}

function buildDestination(lang: string, requestId: string | null) {
  if (requestId && requestId.trim().length > 0) {
    return `/${lang}/dashboard/registrations/${requestId.trim()}?verified=1`;
  }

  return `/${lang}/dashboard/register?verified=1`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawToken = url.searchParams.get("token")?.trim() ?? "";
  const requestId = url.searchParams.get("requestId");
  const lang = getLang(url.searchParams.get("lang"));

  if (!rawToken) {
    return NextResponse.redirect(buildStatusUrl(request, lang, "invalid"));
  }

  const tokenHash = hashToken(rawToken);
  const token = await prisma.emailVerificationToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          role: true,
          emailVerifiedAt: true,
        },
      },
    },
  });

  if (!token) {
    return NextResponse.redirect(buildStatusUrl(request, lang, "invalid"));
  }

  if (token.usedAt) {
    return NextResponse.redirect(buildStatusUrl(request, lang, "invalid"));
  }

  if (token.expiresAt.getTime() < Date.now()) {
    await prisma.emailVerificationToken.update({
      where: { id: token.id },
      data: { usedAt: new Date() },
    });

    return NextResponse.redirect(buildStatusUrl(request, lang, "expired"));
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: token.userId },
      data: {
        emailVerifiedAt: token.user.emailVerifiedAt ?? new Date(),
      },
    }),
    prisma.emailVerificationToken.update({
      where: { id: token.id },
      data: {
        usedAt: new Date(),
      },
    }),
  ]);

  const response = NextResponse.redirect(
    new URL(buildDestination(lang, requestId), request.url)
  );

  response.cookies.set("er_session", token.user.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
