import {
  RegistrationStatusDisplay,
  getRequestStatusClasses,
} from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getLocalizedRequestStatusLabel } from "@/lib/i18n/registry-display";

type Props = {
  status: RegistrationStatusDisplay;
  lang: string;
  compact?: boolean;
};

export default function RequestStatusBadge({
  status,
  lang,
  compact = false,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const label = getLocalizedRequestStatusLabel(status, safeLang);

  return (
    <span
      className={[
        compact
          ? "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-4"
          : "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        getRequestStatusClasses(status),
      ].join(" ")}
    >
      {label}
    </span>
  );
}
