import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const jar = await cookies();
    const raw = jar.get("er_session")?.value;

    if (!raw) {
      return NextResponse.json({ error: "NOT_LOGGED_IN" }, { status: 401 });
    }

    const userId = Number(raw);

    if (!Number.isFinite(userId)) {
      return NextResponse.json({ error: "INVALID_SESSION" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 401 });
    }

    const { registryId, serialNumber, brand, model, year, status } =
      await req.json();

    if (!registryId || !serialNumber || !brand || !model || !status) {
      return NextResponse.json(
        { error: "REQUIRED_FIELDS_MISSING" },
        { status: 400 }
      );
    }

    const existing = await prisma.machine.findUnique({
      where: { registryId },
    });

    if (existing) {
      return NextResponse.json({ error: "REGISTRY_ID_EXISTS" }, { status: 409 });
    }

    const machine = await prisma.machine.create({
      data: {
        registryId,
        serialNumber,
        brand,
        model,
        year: year ? String(year) : null,
        status,
        ownerId: user.id,
      },
    });

    return NextResponse.json({ success: true, machineId: machine.id });
  } catch (error) {
    console.error("CREATE MACHINE ERROR:", error);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}