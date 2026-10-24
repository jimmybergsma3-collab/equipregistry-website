import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { revalidatePath } from "next/cache";

const ALLOWED_DELETE_STATUSES = ["draft", "incomplete", "submitted"] as const;

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session.isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;

    const request = await prisma.registrationRequest.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        requestStatus: true,
        deletedAt: true,
      },
    });

    if (!request) {
      return NextResponse.json(
        { error: "Registration not found." },
        { status: 404 }
      );
    }

    if (request.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    if (request.deletedAt) {
      return NextResponse.json(
        { error: "Registration already deleted." },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_DELETE_STATUSES.includes(
        request.requestStatus as (typeof ALLOWED_DELETE_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "This registration can no longer be deleted." },
        { status: 400 }
      );
    }

    await prisma.registrationRequest.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    revalidatePath("/");
    revalidatePath("/nl/dashboard/registrations");
    revalidatePath("/en/dashboard/registrations");
    revalidatePath("/es/dashboard/registrations");
    revalidatePath("/de/dashboard/registrations");
    revalidatePath("/fr/dashboard/registrations");
    revalidatePath("/it/dashboard/registrations");
    revalidatePath("/pt/dashboard/registrations");
    revalidatePath("/ru/dashboard/registrations");
    revalidatePath("/zh/dashboard/registrations");
    revalidatePath("/hi/dashboard/registrations");
    revalidatePath("/ar/dashboard/registrations");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE_REGISTRATION_REQUEST_ERROR", error);
    return NextResponse.json(
      { error: "Failed to delete registration." },
      { status: 500 }
    );
  }
}