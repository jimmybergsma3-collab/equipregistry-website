import { NextResponse } from "next/server";

const UNAVAILABLE_MESSAGE =
  "Sighting reporting is currently unavailable. Contact the relevant authorities directly.";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "SIGHTING_REPORTING_UNAVAILABLE",
      message: UNAVAILABLE_MESSAGE,
    },
    { status: 503 }
  );
}
