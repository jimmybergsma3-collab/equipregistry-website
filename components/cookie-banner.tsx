"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCookieTexts } from "@/lib/i18n/cookie-text";

type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "er_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const lang: Lang = useMemo(() => {
    const segment = pathname?.split("/")[1];
    if (segment && isValidLang(segment)) return segment;
    return "en";
  }, [pathname]);

  const texts = useMemo(() => getCookieTexts(lang), [lang]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function saveConsent(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value);

    window.dispatchEvent(
      new CustomEvent("er_cookie_consent_updated", {
        detail: { consent: value },
      })
    );

    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4">
      <div
        className={[
          "mx-auto max-w-6xl rounded-2xl border border-white/10 bg-neutral-900 text-white shadow-2xl",
          lang === "ar" ? "text-right" : "text-left",
        ].join(" ")}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-end md:justify-between">
          
          {/* TEXT */}
          <div className="max-w-3xl">
            <h3 className="text-base font-semibold sm:text-lg">
              {texts.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/80">
              {texts.description}
            </p>

            <div className="mt-3">
              <Link
                href={`/${lang}/cookies`}
                className="text-sm font-medium underline underline-offset-4 text-white/90 hover:text-white"
              >
                {texts.policy}
              </Link>
            </div>
          </div>

          {/* BUTTONS */}
          <div
            className={[
              "flex flex-col gap-2 sm:flex-row",
              lang === "ar" ? "md:flex-row-reverse" : "",
            ].join(" ")}
          >
            {/* Decline */}
            <button
              type="button"
              onClick={() => saveConsent("declined")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {texts.decline}
            </button>

            {/* Accept */}
            <button
  type="button"
  onClick={() => saveConsent("accepted")}
  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white bg-white px-5 py-2.5 text-sm font-semibold hover:bg-gray-100"
  style={{ color: "#000000" }}
>
  <span style={{ color: "#000000" }}>{texts.accept}</span>
</button>
          </div>

        </div>
      </div>
    </div>
  );
}