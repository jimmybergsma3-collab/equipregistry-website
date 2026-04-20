import type { Lang } from "@/lib/i18n/config";

export type AuthorityContact = {
  countryCode: string;
  countryName: string;
  emergencyNumber: string;
  policeNumber?: string | null;
  notes?: string;
};

const LANGUAGE_COUNTRY_FALLBACKS: Record<Lang, string> = {
  en: "US",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
  nl: "NL",
  pt: "PT",
  pl: "PL",
  sv: "SE",
  da: "DK",
  no: "NO",
  ru: "RU",
  zh: "CN",
  hi: "IN",
  ar: "AE",
};

const AUTHORITY_DIRECTORY: Record<string, AuthorityContact> = {
  AR: { countryCode: "AR", countryName: "Argentina", emergencyNumber: "911", policeNumber: "101" },
  AT: { countryCode: "AT", countryName: "Austria", emergencyNumber: "112", policeNumber: "133" },
  AU: { countryCode: "AU", countryName: "Australia", emergencyNumber: "000", policeNumber: "000" },
  BE: { countryCode: "BE", countryName: "Belgium", emergencyNumber: "112", policeNumber: "101" },
  BR: { countryCode: "BR", countryName: "Brazil", emergencyNumber: "190", policeNumber: "190" },
  CA: { countryCode: "CA", countryName: "Canada", emergencyNumber: "911", policeNumber: "911" },
  CH: { countryCode: "CH", countryName: "Switzerland", emergencyNumber: "112", policeNumber: "117" },
  CN: { countryCode: "CN", countryName: "China", emergencyNumber: "110", policeNumber: "110" },
  DE: { countryCode: "DE", countryName: "Germany", emergencyNumber: "112", policeNumber: "110" },
  DK: { countryCode: "DK", countryName: "Denmark", emergencyNumber: "112", policeNumber: "114" },
  EG: { countryCode: "EG", countryName: "Egypt", emergencyNumber: "122", policeNumber: "122" },
  ES: { countryCode: "ES", countryName: "Spain", emergencyNumber: "112", policeNumber: "091" },
  FI: { countryCode: "FI", countryName: "Finland", emergencyNumber: "112", policeNumber: "112" },
  FR: { countryCode: "FR", countryName: "France", emergencyNumber: "112", policeNumber: "17" },
  GB: { countryCode: "GB", countryName: "United Kingdom", emergencyNumber: "999", policeNumber: "999" },
  IE: { countryCode: "IE", countryName: "Ireland", emergencyNumber: "112", policeNumber: "999" },
  IN: { countryCode: "IN", countryName: "India", emergencyNumber: "112", policeNumber: "100" },
  IT: { countryCode: "IT", countryName: "Italy", emergencyNumber: "112", policeNumber: "112" },
  JP: { countryCode: "JP", countryName: "Japan", emergencyNumber: "110", policeNumber: "110" },
  KR: { countryCode: "KR", countryName: "South Korea", emergencyNumber: "112", policeNumber: "112" },
  MX: { countryCode: "MX", countryName: "Mexico", emergencyNumber: "911", policeNumber: "911" },
  NL: { countryCode: "NL", countryName: "Netherlands", emergencyNumber: "112", policeNumber: "112" },
  NO: {
    countryCode: "NO",
    countryName: "Norway",
    emergencyNumber: "112",
    policeNumber: "02800",
    notes: "Use 02800 for non-urgent police contact.",
  },
  NZ: { countryCode: "NZ", countryName: "New Zealand", emergencyNumber: "111", policeNumber: "111" },
  PL: { countryCode: "PL", countryName: "Poland", emergencyNumber: "112", policeNumber: "997" },
  PT: { countryCode: "PT", countryName: "Portugal", emergencyNumber: "112", policeNumber: "112" },
  RU: { countryCode: "RU", countryName: "Russia", emergencyNumber: "112", policeNumber: "102" },
  SA: { countryCode: "SA", countryName: "Saudi Arabia", emergencyNumber: "999", policeNumber: "999" },
  SE: {
    countryCode: "SE",
    countryName: "Sweden",
    emergencyNumber: "112",
    policeNumber: "114 14",
    notes: "Use 114 14 for non-urgent police contact.",
  },
  SG: { countryCode: "SG", countryName: "Singapore", emergencyNumber: "999", policeNumber: "999" },
  TR: { countryCode: "TR", countryName: "Turkey", emergencyNumber: "112", policeNumber: "112" },
  UA: { countryCode: "UA", countryName: "Ukraine", emergencyNumber: "112", policeNumber: "102" },
  US: { countryCode: "US", countryName: "United States", emergencyNumber: "911", policeNumber: "911" },
  ZA: { countryCode: "ZA", countryName: "South Africa", emergencyNumber: "10111", policeNumber: "10111" },
  AE: { countryCode: "AE", countryName: "United Arab Emirates", emergencyNumber: "999", policeNumber: "999" },
};

function normalizeCountryCode(value: string | null | undefined) {
  const normalized = value?.trim().toUpperCase();
  if (!normalized || !/^[A-Z]{2}$/.test(normalized)) {
    return null;
  }

  return normalized;
}

function extractCountryCodeFromLocale(locale: string | null | undefined) {
  if (!locale) {
    return null;
  }

  const parts = locale.split("-").map((part) => part.trim()).filter(Boolean);

  for (const part of parts.slice(1)) {
    const countryCode = normalizeCountryCode(part);
    if (countryCode) {
      return countryCode;
    }
  }

  return null;
}

export function inferCountryCodeFromAcceptLanguage(
  acceptLanguage: string | null,
  lang: Lang
) {
  const locales =
    acceptLanguage
      ?.split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean) ?? [];

  for (const locale of locales) {
    const countryCode = extractCountryCodeFromLocale(locale);
    if (countryCode) {
      return countryCode;
    }
  }

  return LANGUAGE_COUNTRY_FALLBACKS[lang] ?? "US";
}

export function inferCountryCodeFromLocale(
  locale: string | null | undefined,
  lang: Lang
) {
  return extractCountryCodeFromLocale(locale) ?? LANGUAGE_COUNTRY_FALLBACKS[lang] ?? "US";
}

export function getAuthorityContact(countryCode: string | null | undefined) {
  const normalized = normalizeCountryCode(countryCode);

  if (!normalized) {
    return null;
  }

  return AUTHORITY_DIRECTORY[normalized] ?? null;
}

export function getCountryNameForDisplay(
  countryCode: string | null | undefined,
  lang: Lang,
  fallbackCountryName?: string | null
) {
  const normalized = normalizeCountryCode(countryCode);

  if (!normalized) {
    return fallbackCountryName ?? null;
  }

  try {
    const displayNames = new Intl.DisplayNames([lang], { type: "region" });
    return (
      displayNames.of(normalized) ??
      fallbackCountryName ??
      AUTHORITY_DIRECTORY[normalized]?.countryName ??
      normalized
    );
  } catch {
    return (
      fallbackCountryName ??
      AUTHORITY_DIRECTORY[normalized]?.countryName ??
      normalized
    );
  }
}

export function buildNearbyPoliceMapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/police/@${lat},${lng},15z`;
}

export function buildFallbackPoliceMapsUrl(countryName?: string | null) {
  const query = countryName
    ? `police station ${countryName}`
    : "police station near me";

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
