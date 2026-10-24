"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";

export async function deleteRegistrationRequest(id: string) {
  const session = await getSession();

  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    await prisma.registrationRequest.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Delete failed" };
  }
}