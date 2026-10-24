"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  approveRegistration,
  issuePassport,
  moveRegistrationToReview,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import { RegistrationRequestStatus } from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  registrationId: string;
  lang: string;
  requestStatus: RegistrationRequestStatus;
};

const TEXT: Record<
  Lang,
  {
    processing: string;
    moveToReview: string;
    approveRegistration: string;
    issuePassport: string;
  }
> = {
  en: {
    processing: "Processing...",
    moveToReview: "Move to review",
    approveRegistration: "Approve registration",
    issuePassport: "Issue passport",
  },
  es: {
    processing: "Procesando...",
    moveToReview: "Mover a revision",
    approveRegistration: "Aprobar registro",
    issuePassport: "Emitir pasaporte",
  },
  de: {
    processing: "Verarbeitung...",
    moveToReview: "In Pruefung verschieben",
    approveRegistration: "Registrierung genehmigen",
    issuePassport: "Pass ausstellen",
  },
  fr: {
    processing: "Traitement...",
    moveToReview: "Passer en revision",
    approveRegistration: "Approuver l'enregistrement",
    issuePassport: "Emettre le passeport",
  },
  it: {
    processing: "Elaborazione...",
    moveToReview: "Passa in revisione",
    approveRegistration: "Approva registrazione",
    issuePassport: "Emetti passaporto",
  },
  nl: {
    processing: "Verwerken...",
    moveToReview: "Naar beoordeling",
    approveRegistration: "Registratie goedkeuren",
    issuePassport: "Paspoort uitgeven",
  },
  pt: {
    processing: "A processar...",
    moveToReview: "Mover para revisao",
    approveRegistration: "Aprovar registo",
    issuePassport: "Emitir passaporte",
  },
  ru: {
    processing: "Обработка...",
    moveToReview: "Перевести на проверку",
    approveRegistration: "Одобрить регистрацию",
    issuePassport: "Выдать паспорт",
  },
  zh: {
    processing: "处理中...",
    moveToReview: "移至审核",
    approveRegistration: "批准注册",
    issuePassport: "签发护照",
  },
  hi: {
    processing: "प्रसंस्करण...",
    moveToReview: "समीक्षा में भेजें",
    approveRegistration: "पंजीकरण स्वीकृत करें",
    issuePassport: "पासपोर्ट जारी करें",
  },
  ar: {
    processing: "جارٍ المعالجة...",
    moveToReview: "نقل إلى المراجعة",
    approveRegistration: "الموافقة على التسجيل",
    issuePassport: "إصدار الجواز",
  },

  pl: {
    processing: "Przetwarzanie...",
    moveToReview: "Przenies do weryfikacji",
    approveRegistration: "Zatwierdz rejestracje",
    issuePassport: "Wydaj paszport",
  },
  sv: {
    processing: "Bearbetar...",
    moveToReview: "Flytta till granskning",
    approveRegistration: "Godkann registrering",
    issuePassport: "Utfarda pass",
  },
  da: {
    processing: "Behandler...",
    moveToReview: "Flyt til gennemgang",
    approveRegistration: "Godkend registrering",
    issuePassport: "Udsted pas",
  },
  no: {
    processing: "Behandler...",
    moveToReview: "Flytt til gjennomgang",
    approveRegistration: "Godkjenn registrering",
    issuePassport: "Utsted pass",
  },};

export default function ReviewFlowActions({
  registrationId,
  lang,
  requestStatus,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = TEXT[safeLang];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "warning" | "error">("success");

  function runAction(
    action: (registrationId: string, lang: string) => Promise<{
      success: boolean;
      message: string;
      tone?: "success" | "warning" | "error";
      refresh?: boolean;
    }>
  ) {
    setMessage("");

    startTransition(async () => {
      const result = await action(registrationId, lang);
      setMessage(result.message);
      setTone(result.tone ?? (result.success ? "success" : "error"));

      if (result.refresh) {
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {requestStatus === "submitted" ? (
          <button
            type="button"
            onClick={() => runAction(moveRegistrationToReview)}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? text.processing : text.moveToReview}
          </button>
        ) : null}

        {requestStatus === "under_review" ? (
          <button
            type="button"
            onClick={() => runAction(approveRegistration)}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? text.processing : text.approveRegistration}
          </button>
        ) : null}

        {requestStatus === "approved" ? (
          <button
            type="button"
            onClick={() => runAction(issuePassport)}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? text.processing : text.issuePassport}
          </button>
        ) : null}
      </div>

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
