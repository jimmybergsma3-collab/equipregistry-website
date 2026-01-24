import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const role = body?.role;

  if (role !== "owner" && role !== "insurance") {
    return NextResponse.json({ ok: false, error: "Invalid role" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, role });

  // cookie: 30 days, dashboard only
  res.cookies.set("er_role", role, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
