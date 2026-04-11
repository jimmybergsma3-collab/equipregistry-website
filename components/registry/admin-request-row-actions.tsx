"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteRequestButton from "@/components/registry/delete-request-button";
import {
  approveRegistration,
  issuePassport,
  markRegistrationAsPaid,
  moveRegistrationToReview,
  rejectRegistration,
  requestMoreInformation,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import type { RegistrationRequestStatus } from "@/lib/registry/workflow";

type Props = {
  registrationId: string;
  lang: string;
  requestStatus: RegistrationRequestStatus;
  paymentCompleted: boolean;
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
        "inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
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
  paymentCompleted,
}: Props) {
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

  const canMarkPaid =
    requestStatus === "payment_required" && paymentCompleted === false;
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
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/${lang}/dashboard/registrations/${registrationId}`}
          className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Open
        </Link>

        {canMarkPaid ? (
          <ActionButton
            label={isPending ? "Processing..." : "Mark paid"}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(markRegistrationAsPaid)}
          />
        ) : null}

        {canMarkReviewed ? (
          <ActionButton
            label={isPending ? "Processing..." : "Mark reviewed"}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(moveRegistrationToReview)}
          />
        ) : null}

        {canApprove ? (
          <ActionButton
            label={isPending ? "Processing..." : "Approve"}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(approveRegistration)}
          />
        ) : null}

        {canRequestInfo ? (
          <ActionButton
            label={isPending ? "Processing..." : "Request info"}
            tone="secondary"
            disabled={isPending}
            onClick={() => handleAction(requestMoreInformation)}
          />
        ) : null}

        {canReject ? (
          <ActionButton
            label={isPending ? "Processing..." : "Reject"}
            tone="neutral"
            disabled={isPending}
            onClick={() => handleAction(rejectRegistration)}
          />
        ) : null}

        {canIssuePassport ? (
          <ActionButton
            label={isPending ? "Processing..." : "Issue passport"}
            tone="primary"
            disabled={isPending}
            onClick={() => handleAction(issuePassport)}
          />
        ) : null}

        <DeleteRequestButton
          id={registrationId}
          lang={lang}
          admin
          label="Delete"
          deletingText="Deleting..."
          confirmText="Are you sure you want to delete this registration?"
          errorText="Failed to delete registration."
        />
      </div>

      {message ? (
        <p className={`text-xs font-medium ${messageClassName()}`}>{message}</p>
      ) : null}
    </div>
  );
}
