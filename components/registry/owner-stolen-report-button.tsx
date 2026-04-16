"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { reportOwnAssetAsStolenOrMissing } from "@/app/[lang]/dashboard/registrations/[id]/actions";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";

type Props = {
  registrationId: string;
  lang: string;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60";

export default function OwnerStolenReportButton({
  registrationId,
  lang,
  className,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = getCustomerStolenReportText(safeLang);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const confirmed = window.confirm(text.confirmMessage);

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result = await reportOwnAssetAsStolenOrMissing(
        registrationId,
        safeLang
      );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      if (result.refresh) {
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={className ?? DEFAULT_CLASS_NAME}
    >
      {isPending ? text.processing : text.action}
    </button>
  );
}
