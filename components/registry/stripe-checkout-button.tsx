"use client";

import { useState, useTransition } from "react";
import { getStripePaymentText } from "@/lib/i18n/stripe-payment";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  registrationId: string;
  lang: string;
};

export default function StripeCheckoutButton({ registrationId, lang }: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = getStripePaymentText(safeLang);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleCheckout() {
    setMessage("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationId,
            lang: safeLang,
          }),
        });

        const payload = (await response.json().catch(() => null)) as
          | {
              url?: string;
              message?: string;
            }
          | null;

        if (!response.ok || !payload?.url) {
          setMessage(payload?.message ?? text.genericError);
          return;
        }

        window.location.assign(payload.url);
      } catch {
        setMessage(text.genericError);
      }
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isPending}
        className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? text.processing : text.payButton}
      </button>

      {message ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </div>
      ) : null}
    </div>
  );
}
