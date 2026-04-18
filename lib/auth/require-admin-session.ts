import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";

export async function requireAdminSession(lang: string) {
  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/admin`);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user || user.role !== "admin") {
    redirect(`/${lang}/dashboard`);
  }

  return user;
}
