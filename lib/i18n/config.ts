export const LANGUAGES = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "nl",
  "pt",
  "pl",
  "sv",
  "da",
  "no",
  "ru",
  "zh",
  "hi",
  "ar",
] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "en";

export const ACTIVE_LAUNCH_LANGUAGES = [
  "nl",
  "en",
  "es",
  "de",
  "fr",
  "it",
  "pt",
] as const satisfies readonly Lang[];

export const RTL_LANGUAGES = ["ar"] as const;

export function isKnownLang(value: string): value is Lang {
  return LANGUAGES.includes(value as Lang);
}

export function isActiveLaunchLang(value: string): value is Lang {
  return ACTIVE_LAUNCH_LANGUAGES.includes(
    value as (typeof ACTIVE_LAUNCH_LANGUAGES)[number]
  );
}

export function isValidLang(value: string): value is Lang {
  return isActiveLaunchLang(value);
}

export function isRTL(lang: Lang): boolean {
  return RTL_LANGUAGES.includes(lang as (typeof RTL_LANGUAGES)[number]);
}

export function getLangDir(lang: Lang): "ltr" | "rtl" {
  return isRTL(lang) ? "rtl" : "ltr";
}
