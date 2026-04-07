"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES, type Lang } from "@/lib/i18n/config";

const LABELS: Record<Lang, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
  nl: "NL",
  pt: "PT",
  ru: "RU",
  zh: "中文",
  hi: "HI",
  ar: "AR",
};

type Props = {
  currentLang?: string;
};

export default function LanguageSwitcher({ currentLang }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  const hasLang =
    segments.length > 0 && LANGUAGES.includes(segments[0] as Lang);

  const activeLang = currentLang
    ? (currentLang as Lang)
    : hasLang
      ? (segments[0] as Lang)
      : "en";

  const rest = hasLang ? segments.slice(1) : segments;

  function changeLanguage(nextLang: Lang) {
    setOpen(false);
    const nextPath = `/${nextLang}${rest.length ? `/${rest.join("/")}` : ""}`;
    router.push(nextPath);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 min-w-[84px] items-center justify-between rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{LABELS[activeLang]}</span>
        <span
          className={`ml-3 text-[10px] text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[84px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <ul role="listbox" className="py-1">
            {LANGUAGES.map((lang) => {
              const isActive = lang === activeLang;

              return (
                <li key={lang}>
                  <button
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    className={`flex w-full items-center justify-start px-3 py-2 text-left text-sm transition ${
                      isActive
                        ? "bg-zinc-100 font-semibold text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                    role="option"
                    aria-selected={isActive}
                  >
                    {LABELS[lang]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}