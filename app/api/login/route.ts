import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/dashboard");

  const user = await prisma.user.findUnique({ where: { email } });

  // DEMO: plain password (later vervangen door hashing)
  if (!user || user.password !== password) {
    return NextResponse.redirect(new URL(`/login?error=1&next=${encodeURIComponent(next)}`, req.url));
  }

  const res = NextResponse.redirect(new URL(next, req.url));
  res.cookies.set("er_session", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
