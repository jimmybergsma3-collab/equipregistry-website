"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markRegistrationAsPaid } from "@/app/[lang]/dashboard/registrations/[id]/actions";

type Props = {
  registrationId: string;
  lang: string;
};

export default function MarkPaidButton({ registrationId, lang }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "warning" | "error">("success");

  function handleClick() {
    setMessage("");

    startTransition(async () => {
      const result = await markRegistrationAsPaid(registrationId, lang);
      setMessage(result.message);
      setTone(result.tone ?? (result.success ? "success" : "error"));

      if (result.refresh) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Processing..." : "Mark as paid"}
      </button>

      {message ? (
        <div
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : tone === "warning"
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-red-200 bg-red-50 text-red-700",
          ].join(" ")}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}
