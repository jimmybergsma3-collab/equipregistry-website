// proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LANG,
  isActiveLaunchLang,
  isKnownLang,
} from "@/lib/i18n/config";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "";

  if (lang && isKnownLang(lang) && !isActiveLaunchLang(lang)) {
    const url = req.nextUrl.clone();
    const rest = segments.slice(1).join("/");

    url.pathname = `/${DEFAULT_LANG}${rest ? `/${rest}` : ""}`;

    return NextResponse.redirect(url);
  }

  const isAdminRoute = isActiveLaunchLang(lang) && segments[1] === "admin";

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const session = req.cookies.get("er_session")?.value;

  if (!session) {
    return NextResponse.redirect(
      new URL(`/${lang}/secure-admin-access`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:lang/:path*"],
};
