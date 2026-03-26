import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

function detectPreferredLanguage(acceptLanguage: string | null): Lang {
  if (!acceptLanguage) {
    return DEFAULT_LANG;
  }

  const browserLanguages = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const locale of browserLanguages) {
    const short = locale.split("-")[0];

    if (short && isValidLang(short)) {
      return short;
    }
  }

  return DEFAULT_LANG;
}

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  const lang = detectPreferredLanguage(acceptLanguage);

  redirect(`/${lang}`);
}