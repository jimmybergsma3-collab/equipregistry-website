import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export type Session =
  | { isAuthenticated: false; user: null }
  | { isAuthenticated: true; user: { id: number; email: string; role: string } };

export async function getSession(): Promise<Session> {
  const jar = await cookies();
  const raw = jar.get("er_session")?.value;

  if (!raw) return { isAuthenticated: false, user: null };

  const userId = Number(raw);
  if (!Number.isFinite(userId)) return { isAuthenticated: false, user: null };

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  if (!user) return { isAuthenticated: false, user: null };

  return { isAuthenticated: true, user };
}
