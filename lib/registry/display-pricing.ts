import type { Lang } from "@/lib/i18n/config";
import { formatPricingAmount } from "@/lib/registry/pricing";

const GEO_COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
] as const;

const EUROZONE_COUNTRIES = new Set([
  "AT",
  "BE",
  "CY",
  "DE",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PT",
  "SI",
  "SK",
]);

const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  AE: "AED",
  AR: "ARS",
  AU: "AUD",
  BG: "BGN",
  BR: "BRL",
  CA: "CAD",
  CH: "CHF",
  CL: "CLP",
  CN: "CNY",
  CO: "COP",
  CZ: "CZK",
  DK: "DKK",
  EG: "EGP",
  GB: "GBP",
  HK: "HKD",
  HU: "HUF",
  ID: "IDR",
  IL: "ILS",
  IN: "INR",
  JP: "JPY",
  KE: "KES",
  KR: "KRW",
  KW: "KWD",
  MX: "MXN",
  MY: "MYR",
  NG: "NGN",
  NO: "NOK",
  NZ: "NZD",
  PE: "PEN",
  PH: "PHP",
  PL: "PLN",
  QA: "QAR",
  RO: "RON",
  RU: "RUB",
  SA: "SAR",
  SE: "SEK",
  SG: "SGD",
  TH: "THB",
  TR: "TRY",
  UA: "UAH",
  US: "USD",
  VN: "VND",
  ZA: "ZAR",
};

export type LocalizedPricingDisplay = {
  currency: string;
  locale: string;
  exchangeRate: number;
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
  }

  return null;
}

function getCurrencyForCountry(countryCode: string | null) {
  if (!countryCode) {
    return "EUR";
  }

  if (EUROZONE_COUNTRIES.has(countryCode)) {
    return "EUR";
  }

  return COUNTRY_CURRENCY_MAP[countryCode] ?? "EUR";
}

async function getExchangeRate(currency: string) {
  if (currency === "EUR") {
    return 1;
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rate/EUR/${currency}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 6,
        },
        signal: AbortSignal.timeout(1500),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { rate?: number };

    return typeof data.rate === "number" && Number.isFinite(data.rate) && data.rate > 0
      ? data.rate
      : null;
  } catch {
    return null;
  }
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
  const exchangeRate = await getExchangeRate(currency);

  if (exchangeRate === null) {
    return {
      currency: "EUR",
      locale,
      exchangeRate: 1,
      usedFallback: true,
    };
  }

  return {
    currency,
    locale,
    exchangeRate,
    usedFallback: false,
  };
}

export function formatLocalizedPricingAmount(
  amountInEur: number,
  display: LocalizedPricingDisplay
) {
  if (display.usedFallback) {
    return formatPricingAmount(amountInEur, display.locale);
  }

  return new Intl.NumberFormat(display.locale, {
    style: "currency",
    currency: display.currency,
  }).format(amountInEur * display.exchangeRate);
}
