"use client";

import { useState, useTransition } from "react";
import {
  approveRegistration,
  issuePassport,
  moveRegistrationToReview,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import { RegistrationRequestStatus } from "@/lib/registry/workflow";

type Props = {
  registrationId: string;
  lang: string;
  requestStatus: RegistrationRequestStatus;
};

export default function ReviewFlowActions({
  registrationId,
  lang,
  requestStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function runAction(
    action: (registrationId: string, lang: string) => Promise<{
      success: boolean;
      message: string;
    }>
  ) {
    setMessage("");

    startTransition(async () => {
      const result = await action(registrationId, lang);
      setMessage(result.message);
      setIsSuccess(result.success);
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
            {isPending ? "Processing..." : "Move to review"}
          </button>
        ) : null}

        {requestStatus === "under_review" ? (
          <button
            type="button"
            onClick={() => runAction(approveRegistration)}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Processing..." : "Approve registration"}
          </button>
        ) : null}

        {requestStatus === "approved" ? (
          <button
            type="button"
            onClick={() => runAction(issuePassport)}
            disabled={isPending}
            className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Processing..." : "Issue passport"}
          </button>
        ) : null}
      </div>

      {message ? (
        <div
          className={[
            "rounded-xl border px-4 py-3 text-sm",
            isSuccess
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700",
          ].join(" ")}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
}