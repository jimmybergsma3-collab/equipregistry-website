// components/registry/request-status-badge.tsx

import {
  RegistrationRequestStatus,
  getRequestStatusClasses,
  getRequestStatusLabel,
} from "@/lib/registry/workflow";

type Props = {
  status: RegistrationRequestStatus;
};

export default function RequestStatusBadge({ status }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        getRequestStatusClasses(status),
      ].join(" ")}
    >
      {getRequestStatusLabel(status)}
    </span>
  );
}