import type { Lang } from "@/lib/i18n/config";
import { formatPricingAmount } from "@/lib/registry/pricing";

const GEO_COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
] as const;

const LANGUAGE_COUNTRY_FALLBACKS: Record<string, string> = {
  da: "DK",
  de: "DE",
  es: "ES",
  fr: "FR",
  nl: "NL",
  no: "NO",
  pl: "PL",
  sv: "SE",
};

type SupportedCurrency = "DKK" | "EUR" | "NOK" | "PLN" | "SEK" | "USD";

const COUNTRY_CURRENCY_MAP: Record<string, SupportedCurrency> = {
  DE: "EUR",
  DK: "DKK",
  ES: "EUR",
  FR: "EUR",
  NL: "EUR",
  NO: "NOK",
  PL: "PLN",
  SE: "SEK",
  US: "USD",
};

const COUNTRY_LOCALE_MAP: Record<string, string> = {
  DE: "de-DE",
  DK: "da-DK",
  ES: "es-ES",
  FR: "fr-FR",
  NL: "nl-NL",
  NO: "nb-NO",
  PL: "pl-PL",
  SE: "sv-SE",
  US: "en-US",
};

const FIXED_EUR_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  DKK: 7.46,
  EUR: 1,
  NOK: 11.72,
  PLN: 4.31,
  SEK: 11.45,
  USD: 1.09,
};

export type LocalizedPricingDisplay = {
  currency: SupportedCurrency;
  locale: string;
  exchangeRate: number;
  countryCode: string | null;
  usedFallback: boolean;
};

type LocalizedPricingDisplayOptions = {
  acceptLanguage: string | null;
  countryCode: string | null;
  lang: Lang;
};

function normalizeCountryCode(value: string | null | undefined) {
  const normalized = value?.trim().toUpperCase();

  if (!normalized || !/^[A-Z]{2}$/.test(normalized)) {
    return null;
  }

  return normalized;
}

function getPrimaryLocale(acceptLanguage: string | null, lang: Lang) {
  const locale = acceptLanguage
    ?.split(",")
    .map((part) => part.split(";")[0]?.trim())
    .find(Boolean);

  return locale || lang;
}

function getCountryCodeFromAcceptLanguage(acceptLanguage: string | null) {
  const locales =
    acceptLanguage
      ?.split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean) ?? [];

  for (const locale of locales) {
    const parts = locale.split("-");

    for (const part of parts.slice(1)) {
      const countryCode = normalizeCountryCode(part);

      if (countryCode) {
        return countryCode;
      }
    }

    const languageCode = locale.split("-")[0]?.trim().toLowerCase();

    if (languageCode && LANGUAGE_COUNTRY_FALLBACKS[languageCode]) {
      return LANGUAGE_COUNTRY_FALLBACKS[languageCode];
    }
  }

  return null;
}

function getCurrencyForCountry(countryCode: string | null) {
  return countryCode ? COUNTRY_CURRENCY_MAP[countryCode] ?? "EUR" : "EUR";
}

function getDisplayLocale(
  countryCode: string | null,
  acceptLanguage: string | null,
  lang: Lang
) {
  if (countryCode && COUNTRY_LOCALE_MAP[countryCode]) {
    return COUNTRY_LOCALE_MAP[countryCode];
  }

  return getPrimaryLocale(acceptLanguage, lang);
}

function getExchangeRate(currency: SupportedCurrency) {
  return FIXED_EUR_EXCHANGE_RATES[currency] ?? 1;
}

export function getVisitorCountryCodeFromHeaders(headerList: Headers) {
  for (const headerName of GEO_COUNTRY_HEADERS) {
    const countryCode = normalizeCountryCode(headerList.get(headerName));

    if (countryCode) {
      return countryCode;
    }
  }

  return null;
}

export async function getLocalizedPricingDisplay(
  options: LocalizedPricingDisplayOptions
): Promise<LocalizedPricingDisplay> {
  const locale = getPrimaryLocale(options.acceptLanguage, options.lang);
  const countryCode =
    normalizeCountryCode(options.countryCode) ??
    getCountryCodeFromAcceptLanguage(options.acceptLanguage);
  const currency = getCurrencyForCountry(countryCode);
  const resolvedLocale = getDisplayLocale(
    countryCode,
    options.acceptLanguage,
    options.lang
  );
  const exchangeRate = getExchangeRate(currency);
  const hasMappedCountry = Boolean(countryCode && COUNTRY_CURRENCY_MAP[countryCode]);

  return {
    currency,
    locale: resolvedLocale || locale,
    exchangeRate,
    countryCode,
    usedFallback: !hasMappedCountry,
  };
}

export function getLocalizedPricingAmount(
  amountInEur: number,
  display: LocalizedPricingDisplay
) {
  const amountInMinorUnits = Math.round(amountInEur * display.exchangeRate * 100);
  return amountInMinorUnits / 100;
}

export function getLocalizedPricingMinorUnitAmount(
  amountInEur: number,
  display: LocalizedPricingDisplay
) {
  return Math.round(amountInEur * display.exchangeRate * 100);
}

export function formatLocalizedPricingAmount(
  amountInEur: number,
  display: LocalizedPricingDisplay
) {
  if (display.usedFallback) {
    return formatPricingAmount(amountInEur, display.locale);
  }

  const localizedAmount = getLocalizedPricingAmount(amountInEur, display);

  return new Intl.NumberFormat(display.locale, {
    style: "currency",
    currency: display.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(localizedAmount);
}
