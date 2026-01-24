import { NextResponse } from "next/server";

function makeCaseId() {
  const d = new Date();
  const y = d.getFullYear();
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  return `ER-CASE-${y}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const registryId = String(body.registryId ?? "").trim();
    const note = String(body.note ?? "").slice(0, 500);
    const coords = body.coords ?? null;

    if (!registryId) {
      return NextResponse.json({ ok: false, error: "Missing registryId" }, { status: 400 });
    }

    const caseId = makeCaseId();

    // DEMO logging (later: save to DB / notify team)
    console.log("[EquipRegistry DEMO] Sighting report received", {
      caseId,
      registryId,
      note,
      coords,
      at: new Date().toISOString(),
      userAgent: req.headers.get("user-agent"),
      ipHint: req.headers.get("x-forwarded-for"),
    });

    return NextResponse.json({ ok: true, caseId });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
