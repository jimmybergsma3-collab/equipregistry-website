"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteRequestButton from "@/components/registry/delete-request-button";
import {
  approveRegistration,
  issuePassport,
  moveRegistrationToReview,
  rejectRegistration,
  requestMoreInformation,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import type { RegistrationRequestStatus } from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  registrationId: string;
  lang: string;
  requestStatus: RegistrationRequestStatus;
};

type ActionHandler = (
  registrationId: string,
  lang: string
) => Promise<{
  success: boolean;
  message: string;
  tone?: "success" | "warning" | "error";
  refresh?: boolean;
}>;

const TEXT: Record<
  Lang,
  {
    open: string;
    processing: string;
    markPaid: string;
    markReviewed: string;
    approve: string;
    requestInfo: string;
    reject: string;
    issuePassport: string;
    delete: string;
    deleting: string;
    confirmDelete: string;
    deleteError: string;
  }
> = {
  en: {
    open: "Open",
    processing: "Processing...",
    markPaid: "Mark paid",
    markReviewed: "Mark reviewed",
    approve: "Approve",
    requestInfo: "Request info",
    reject: "Reject",
    issuePassport: "Issue passport",
    delete: "Delete",
    deleting: "Deleting...",
    confirmDelete: "Are you sure you want to delete this registration?",
    deleteError: "Failed to delete registration.",
  },
  es: {
    open: "Abrir",
    processing: "Procesando...",
    markPaid: "Marcar pago",
    markReviewed: "Marcar revisado",
    approve: "Aprobar",
    requestInfo: "Solicitar info",
    reject: "Rechazar",
    issuePassport: "Emitir pasaporte",
    delete: "Eliminar",
    deleting: "Eliminando...",
    confirmDelete: "¿Seguro que desea eliminar este registro?",
    deleteError: "No se pudo eliminar el registro.",
  },
  de: {
    open: "Oeffnen",
    processing: "Verarbeitung...",
    markPaid: "Zahlung bestaetigen",
    markReviewed: "Als geprueft markieren",
    approve: "Genehmigen",
    requestInfo: "Info anfordern",
    reject: "Ablehnen",
    issuePassport: "Pass ausstellen",
    delete: "Loeschen",
    deleting: "Loeschen...",
    confirmDelete: "Moechten Sie diese Registrierung wirklich loeschen?",
    deleteError: "Registrierung konnte nicht geloescht werden.",
  },
  fr: {
    open: "Ouvrir",
    processing: "Traitement...",
    markPaid: "Marquer paye",
    markReviewed: "Marquer revise",
    approve: "Approuver",
    requestInfo: "Demander info",
    reject: "Rejeter",
    issuePassport: "Emettre le passeport",
    delete: "Supprimer",
    deleting: "Suppression...",
    confirmDelete: "Voulez-vous vraiment supprimer cet enregistrement ?",
    deleteError: "Impossible de supprimer l'enregistrement.",
  },
  it: {
    open: "Apri",
    processing: "Elaborazione...",
    markPaid: "Segna pagato",
    markReviewed: "Segna revisionato",
    approve: "Approva",
    requestInfo: "Richiedi info",
    reject: "Rifiuta",
    issuePassport: "Emetti passaporto",
    delete: "Elimina",
    deleting: "Eliminazione...",
    confirmDelete: "Vuole davvero eliminare questa registrazione?",
    deleteError: "Impossibile eliminare la registrazione.",
  },
  nl: {
    open: "Openen",
    processing: "Verwerken...",
    markPaid: "Markeer betaald",
    markReviewed: "Markeer beoordeeld",
    approve: "Goedkeuren",
    requestInfo: "Info vragen",
    reject: "Afwijzen",
    issuePassport: "Paspoort uitgeven",
    delete: "Verwijderen",
    deleting: "Verwijderen...",
    confirmDelete: "Weet je zeker dat je deze registratie wilt verwijderen?",
    deleteError: "Registratie verwijderen mislukt.",
  },
  pt: {
    open: "Abrir",
    processing: "A processar...",
    markPaid: "Marcar pago",
    markReviewed: "Marcar revisto",
    approve: "Aprovar",
    requestInfo: "Pedir info",
    reject: "Rejeitar",
    issuePassport: "Emitir passaporte",
    delete: "Eliminar",
    deleting: "A eliminar...",
    confirmDelete: "Tem a certeza de que pretende eliminar este registo?",
    deleteError: "Nao foi possivel eliminar o registo.",
  },
  ru: {
    open: "Открыть",
    processing: "Обработка...",
    markPaid: "Отметить оплату",
    markReviewed: "Отметить как проверенное",
    approve: "Одобрить",
    requestInfo: "Запросить данные",
    reject: "Отклонить",
    issuePassport: "Выдать паспорт",
    delete: "Удалить",
    deleting: "Удаление...",
    confirmDelete: "Вы уверены, что хотите удалить эту регистрацию?",
    deleteError: "Не удалось удалить регистрацию.",
  },
  zh: {
    open: "打开",
    processing: "处理中...",
    markPaid: "标记付款",
    markReviewed: "标记已审核",
    approve: "批准",
    requestInfo: "请求信息",
    reject: "拒绝",
    issuePassport: "签发护照",
    delete: "删除",
    deleting: "删除中...",
    confirmDelete: "确定要删除此注册吗？",
    deleteError: "删除注册失败。",
  },
  hi: {
    open: "खोलें",
    processing: "प्रसंस्करण...",
    markPaid: "भुगतान चिह्नित करें",
    markReviewed: "समीक्षित चिह्नित करें",
    approve: "स्वीकृत करें",
    requestInfo: "जानकारी मांगें",
    reject: "अस्वीकार करें",
    issuePassport: "पासपोर्ट जारी करें",
    delete: "हटाएं",
    deleting: "हटाया जा रहा है...",
    confirmDelete: "क्या आप वाकई इस पंजीकरण को हटाना चाहते हैं?",
    deleteError: "पंजीकरण हटाया नहीं जा सका।",
  },
  ar: {
    open: "فتح",
    processing: "جارٍ المعالجة...",
    markPaid: "تأكيد الدفع",
    markReviewed: "تحديد كمراجع",
    approve: "موافقة",
    requestInfo: "طلب معلومات",
    reject: "رفض",
    issuePassport: "إصدار الجواز",
    delete: "حذف",
    deleting: "جارٍ الحذف...",
    confirmDelete: "هل أنت متأكد من حذف هذا التسجيل؟",
    deleteError: "تعذر حذف التسجيل.",
  },
};

function actionButtonClassName(tone: "primary" | "secondary" | "neutral") {
  switch (tone) {
    case "primary":
      return "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800";
    case "secondary":
      return "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100";
    default:
      return "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50";
  }
}

function ActionButton({
  label,
  tone = "neutral",
  disabled = false,
  onClick,
}: {
  label: string;
  tone?: "primary" | "secondary" | "neutral";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium leading-4 transition disabled:cursor-not-allowed disabled:opacity-60",
        actionButtonClassName(tone),
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function AdminRequestRowActions({
  registrationId,
  lang,
  requestStatus,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = TEXT[safeLang];
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "warning" | "error">("error");

  function runAction(action: ActionHandler) {
    setMessage("");

    startTransition(async () => {
      const result = await action(registrationId, lang);
      setTone(result.tone ?? (result.success ? "success" : "error"));

      if (!result.success && !result.refresh) {
        setMessage(result.message);
        return;
      }

      if (result.message) {
        setMessage(result.message);
      }

      if (result.refresh) {
        router.refresh();
      }
    });
  }

  function messageClassName() {
    switch (tone) {
      case "success":
        return "text-emerald-700";
      case "warning":
        return "text-amber-700";
      default:
        return "text-red-600";
    }
  }

  function handleAction(action: ActionHandler) {
    runAction(action);
  }

  const canMarkReviewed =
    requestStatus === "submitted" || requestStatus === "more_info_required";
  const canApprove = requestStatus === "under_review";
  const canRequestInfo =
    requestStatus === "submitted" || requestStatus === "under_review";
  const canReject =
    requestStatus === "under_review" ||
    requestStatus === "more_info_required";
  const canIssuePassport = requestStatus === "approved";

  return (
    <div className="space-y-0.5">
      <div className="flex max-w-[17rem] flex-wrap gap-0.5">
        <Link
          href={`/${lang}/dashboard/registrations/${registrationId}`}
          className="inline-flex items-center rounded-md border border-zinc-300 bg-white px-2 py-0.5 text-[10px] font-semibold leading-4 text-zinc-800 transition hover:bg-zinc-50"
        >
          {text.open}
        </Link>

        {canMarkReviewed ? (
          <ActionButton
            label={isPending ? text.processing : text.markReviewed}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(moveRegistrationToReview)}
          />
        ) : null}

        {canApprove ? (
          <ActionButton
            label={isPending ? text.processing : text.approve}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(approveRegistration)}
          />
        ) : null}

        {canRequestInfo ? (
          <ActionButton
            label={isPending ? text.processing : text.requestInfo}
            tone="secondary"
            disabled={isPending}
            onClick={() => handleAction(requestMoreInformation)}
          />
        ) : null}

        {canReject ? (
          <ActionButton
            label={isPending ? text.processing : text.reject}
            tone="neutral"
            disabled={isPending}
            onClick={() => handleAction(rejectRegistration)}
          />
        ) : null}

        {canIssuePassport ? (
          <ActionButton
            label={isPending ? text.processing : text.issuePassport}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(issuePassport)}
          />
        ) : null}

        <span className="[&_button]:border-zinc-200 [&_button]:bg-white [&_button]:px-2 [&_button]:py-0.5 [&_button]:text-[10px] [&_button]:font-medium [&_button]:text-red-600 [&_button]:hover:bg-red-50">
          <DeleteRequestButton
            id={registrationId}
            lang={lang}
            admin
            label={text.delete}
            deletingText={text.deleting}
            confirmText={text.confirmDelete}
            errorText={text.deleteError}
          />
        </span>
      </div>

      {message ? (
        <p className={`text-[10px] font-medium ${messageClassName()}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
