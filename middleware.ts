import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply to dashboard routes
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  // In demo mode: DO NOT block access.
  // Role cookie is only used for UI (menu/default landing), not for security.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
