import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const jar = await cookies();
    const raw = jar.get("er_session")?.value;

    if (!raw) {
      return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
    }

    const userId = Number(raw);

    if (!Number.isFinite(userId)) {
      return NextResponse.json({ error: "Ongeldige sessie." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Gebruiker niet gevonden." }, { status: 401 });
    }

    const { registryId, brand, model, year, status } = await req.json();

    if (!registryId || !brand || !model || !status) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 }
      );
    }

    const existing = await prisma.machine.findUnique({
      where: { registryId },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Registry ID bestaat al." },
        { status: 409 }
      );
    }

    const machine = await prisma.machine.create({
      data: {
        registryId,
        brand,
        model,
        year: year ? Number(year) : null,
        status,
        ownerId: user.id,
      },
    });

    return NextResponse.json({ success: true, machineId: machine.id });
  } catch (error) {
    console.error("CREATE MACHINE ERROR:", error);
    return NextResponse.json({ error: "Serverfout." }, { status: 500 });
  }
}