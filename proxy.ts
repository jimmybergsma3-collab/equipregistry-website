// proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute =
    pathname === "/en/admin" ||
    pathname.startsWith("/en/admin/") ||
    pathname === "/es/admin" ||
    pathname.startsWith("/es/admin/") ||
    pathname === "/de/admin" ||
    pathname.startsWith("/de/admin/") ||
    pathname === "/fr/admin" ||
    pathname.startsWith("/fr/admin/") ||
    pathname === "/it/admin" ||
    pathname.startsWith("/it/admin/") ||
    pathname === "/nl/admin" ||
    pathname.startsWith("/nl/admin/") ||
    pathname === "/pt/admin" ||
    pathname.startsWith("/pt/admin/") ||
    pathname === "/ru/admin" ||
    pathname.startsWith("/ru/admin/") ||
    pathname === "/zh/admin" ||
    pathname.startsWith("/zh/admin/") ||
    pathname === "/hi/admin" ||
    pathname.startsWith("/hi/admin/") ||
    pathname === "/ar/admin" ||
    pathname.startsWith("/ar/admin/");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const session = req.cookies.get("er_session")?.value;

  if (!session) {
    const segments = pathname.split("/").filter(Boolean);
    const lang = segments[0] || "en";

    return NextResponse.redirect(
      new URL(`/${lang}/secure-admin-access`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:lang/admin/:path*"],
};