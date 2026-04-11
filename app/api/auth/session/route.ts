import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { canUseAuthenticatedApp } from "@/lib/auth/email-verification";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("er_session")?.value;

    if (!userId) {
      return NextResponse.json({ loggedIn: false });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      const response = NextResponse.json({ loggedIn: false });
      response.cookies.set("er_session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
      });
      return response;
    }

    if (!canUseAuthenticatedApp(user)) {
      const response = NextResponse.json({ loggedIn: false });
      response.cookies.set("er_session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
      });
      return response;
    }

    return NextResponse.json({
      loggedIn: true,
      role: user.role,
      email: user.email,
    });
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return NextResponse.json({ loggedIn: false });
  }
}
