// lib/auth/get-current-user.ts

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("er_session")?.value;

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  });

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}