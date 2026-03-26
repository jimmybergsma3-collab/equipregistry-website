export const LANGUAGES = ["en", "es", "de", "fr", "it", "nl", "pt"] as const;

export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "en";

export function isValidLang(value: string): value is Lang {
  return LANGUAGES.includes(value as Lang);
}