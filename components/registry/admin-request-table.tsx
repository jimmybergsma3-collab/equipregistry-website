import RequestStatusBadge from "@/components/registry/request-status-badge";
import AdminRequestRowActions from "@/components/registry/admin-request-row-actions";
import {
  RegistrationRequestSummary,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";

type AdminRegistrationRequest = RegistrationRequestSummary & {
  ownerName: string;
  ownerEmail: string;
};

type Props = {
  lang: string;
  requests: AdminRegistrationRequest[];
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getStatusDotClass(status: RegistrationRequestSummary["requestStatus"]) {
  switch (status) {
    case "passport_issued":
    case "approved":
      return "bg-emerald-500";
    case "under_review":
    case "more_info_required":
    case "payment_required":
      return "bg-amber-500";
    case "rejected":
      return "bg-red-500";
    case "submitted":
      return "bg-blue-500";
    default:
      return "bg-zinc-400";
  }
}

export default function AdminRequestTable({ lang, requests }: Props) {
  if (requests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Registration requests
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          No registrations match the current admin view.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Registration requests
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Review, approve, request more information, confirm payment, or delete registrations directly from the overview.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Completeness
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {requests.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-900">{item.reference}</div>
                  <div className="mt-1 text-zinc-600">{item.ownerName}</div>
                  <div className="text-zinc-500">{item.ownerEmail}</div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-900">{item.assetName}</div>
                  <div className="text-zinc-500">
                    {item.category} / {item.subcategory}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {getApplicantTypeLabel(item.applicantType)}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block size-2.5 rounded-full ${getStatusDotClass(
                        item.requestStatus
                      )}`}
                      aria-hidden="true"
                    />
                    <RequestStatusBadge status={item.requestStatus} lang={lang} />
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.paymentCompleted ? "Paid" : "Pending"}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.completeness.score}%
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {formatDate(item.updatedAt)}
                </td>

                <td className="px-6 py-4">
                  <AdminRequestRowActions
                    registrationId={item.id}
                    lang={lang}
                    requestStatus={item.requestStatus}
                    paymentCompleted={item.paymentCompleted}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
