import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export type Session =
  | { isAuthenticated: false; user: null }
  | {
      isAuthenticated: true;
      user: { id: string; email: string; role: "user" | "admin" };
    };

export async function getSession(): Promise<Session> {
  try {
    const jar = await cookies();
    const raw = jar.get("er_session")?.value;

    if (!raw || raw.trim() === "") {
      return { isAuthenticated: false, user: null };
    }

    const userId = raw.trim();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return { isAuthenticated: false, user: null };
    }

    return {
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("getSession failed:", error);
    return { isAuthenticated: false, user: null };
  }
}