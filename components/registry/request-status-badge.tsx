import {
  RegistrationRequestStatus,
  getRequestStatusClasses,
} from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getLocalizedRequestStatusLabel } from "@/lib/i18n/registry-display";

type Props = {
  status: RegistrationRequestStatus;
  lang: string;
};

export default function RequestStatusBadge({ status, lang }: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const label = getLocalizedRequestStatusLabel(status, safeLang);

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        getRequestStatusClasses(status),
      ].join(" ")}
    >
      {label}
    </span>
  );
}
