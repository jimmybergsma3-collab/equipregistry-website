import {
  RegistrationRequestStatus,
  getRequestStatusClasses,
  getRequestStatusKey,
  getRequestStatusLabel,
} from "@/lib/registry/workflow";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  status: RegistrationRequestStatus;
  lang: string;
};

export default function RequestStatusBadge({ status, lang }: Props) {
  const dict = getDictionary(lang);
  const key = getRequestStatusKey(status);

  const label =
    key === "draft"
      ? dict.dashboard.requestStatuses.draft
      : key === "incomplete"
      ? dict.dashboard.requestStatuses.incomplete
      : key === "ready_for_submission" || key === "payment_required"
      ? getRequestStatusLabel(status)
      : key === "submitted"
      ? dict.dashboard.requestStatuses.submitted
      : key === "under_review"
      ? dict.dashboard.requestStatuses.underReview
      : key === "more_info_required"
      ? dict.dashboard.requestStatuses.moreInfoRequired
      : key === "approved"
      ? dict.dashboard.requestStatuses.approved
      : key === "rejected"
      ? dict.dashboard.requestStatuses.rejected
      : key === "passport_issued"
      ? dict.dashboard.requestStatuses.passportIssued
      : dict.dashboard.requestStatuses.unknown;

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
