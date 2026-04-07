import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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
      },
    });

    if (!user) {
      return NextResponse.json({ loggedIn: false });
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