"use client";

import { useRouter, usePathname } from "next/navigation";

const LANGS = ["en", "es", "de", "fr", "it", "nl", "pt"] as const;

const LABELS: Record<(typeof LANGS)[number], string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
  nl: "NL",
  pt: "PT",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const hasLang =
    segments.length > 0 &&
    LANGS.includes(segments[0] as (typeof LANGS)[number]);

  const currentLang = hasLang
    ? (segments[0] as (typeof LANGS)[number])
    : "en";

  const rest = hasLang ? segments.slice(1) : segments;

  function handleChange(nextLang: string) {
    const nextPath = `/${nextLang}${rest.length ? `/${rest.join("/")}` : ""}`;
    router.push(nextPath);
  }

  return (
    <div className="relative">
      <select
        value={currentLang}
        onChange={(e) => handleChange(e.target.value)}
        className="
          h-9
          rounded-lg
          border border-zinc-300
          bg-white
          px-3 pr-8
          text-sm
          text-zinc-900
          outline-none
          hover:border-zinc-400
          focus:border-blue-600
          cursor-pointer
          appearance-none
        "
        aria-label="Select language"
      >
        {LANGS.map((lang) => (
          <option key={lang} value={lang}>
            {LABELS[lang]}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500">
        ▼
      </div>
    </div>
  );
}