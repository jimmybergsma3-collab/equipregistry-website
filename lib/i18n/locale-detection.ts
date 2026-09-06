import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

export function detectPreferredLanguage(acceptLanguage: string | null): Lang {
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
