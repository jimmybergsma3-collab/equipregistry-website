import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "Vul e-mail en wachtwoord in." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Ongeldige gegevens." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return NextResponse.json(
        { error: "Ongeldige gegevens." },
        { status: 401 }
      );
    }

    const redirectTo =
      user.role === "admin"
        ? "/dashboard/admin"
        : "/dashboard/registrations";

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

    return NextResponse.json({ error: "Serverfout." }, { status: 500 });
  }
}