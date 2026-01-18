import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("er_session", "", { path: "/", httpOnly: true, maxAge: 0 });
  return res;
}
