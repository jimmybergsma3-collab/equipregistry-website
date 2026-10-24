import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Missing lat or lon" },
      { status: 400 }
    );
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("zoom", "3");
    url.searchParams.set("addressdetails", "1");

    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "EquipRegistry/1.0 (reverse-country lookup)",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Reverse geocoding failed" },
        { status: 502 }
      );
    }

    const data = await response.json();

    const countryCode =
      data?.address?.country_code?.toUpperCase?.() || null;
    const country =
      data?.address?.country || null;

    return NextResponse.json({
      countryCode,
      country,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected reverse geocoding error" },
      { status: 500 }
    );
  }
}