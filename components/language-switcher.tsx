"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ACTIVE_LAUNCH_LANGUAGES,
  DEFAULT_LANG,
  getLangDir,
  isActiveLaunchLang,
  isKnownLang,
  type Lang,
} from "@/lib/i18n/config";

const LABELS: Record<Lang, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
  nl: "NL",
  pt: "PT",
  pl: "PL",
  sv: "SV",
  da: "DA",
  no: "NO",
  ru: "RU",
  zh: "ZH",
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
    segments.length > 0 && isKnownLang(segments[0]);
  const activeLang = currentLang
    ? isActiveLaunchLang(currentLang)
      ? currentLang
      : DEFAULT_LANG
    : hasLang && isActiveLaunchLang(segments[0])
      ? (segments[0] as Lang)
      : DEFAULT_LANG;
  const dir = getLangDir(activeLang);
  const isRtl = dir === "rtl";
  const rest = hasLang ? segments.slice(1) : segments;
  const orderedLanguages = ACTIVE_LAUNCH_LANGUAGES.map((lang) => ({
    code: lang,
    label: LABELS[lang],
  }));

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
    <div ref={wrapperRef} className="relative" dir={dir}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 min-w-[84px] items-center justify-between rounded-xl border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{LABELS[activeLang]}</span>
        <span
          className={`${isRtl ? "mr-3" : "ml-3"} text-[10px] text-zinc-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          v
        </span>
      </button>

      {open ? (
        <div
          className={`absolute top-[calc(100%+8px)] z-50 min-w-[84px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg ${
            isRtl ? "left-0" : "right-0"
          }`}
        >
          <ul role="listbox" className="py-1">
            {orderedLanguages.map(({ code, label }) => {
              const lang = code;
              const isActive = lang === activeLang;

              return (
                <li key={lang}>
                  <button
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    className={`flex w-full items-center justify-start px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-zinc-100 font-semibold text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-50"
                    } ${isRtl ? "text-right" : "text-left"}`}
                    role="option"
                    aria-selected={isActive}
                  >
                    {label}
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
