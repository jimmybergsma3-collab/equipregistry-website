import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { canUseAuthenticatedApp } from "@/lib/auth/email-verification";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "REQUIRED_FIELDS_MISSING" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        passwordHash: true,
        role: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }

    if (!canUseAuthenticatedApp(user)) {
      return NextResponse.json(
        { error: "EMAIL_NOT_VERIFIED" },
        { status: 403 }
      );
    }

    const redirectTo =
      user.role === "admin" ? "/admin" : "/dashboard";

    const res = NextResponse.json({
      success: true,
      role: user.role,
      redirectTo,
    });

    res.cookies.set("er_session", user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
