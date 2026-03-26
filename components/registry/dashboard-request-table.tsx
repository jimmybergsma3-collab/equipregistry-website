// components/registry/dashboard-request-table.tsx

import Link from "next/link";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import {
  RegistrationRequestSummary,
  getApplicantTypeLabel,
  isVisibleInDashboard,
} from "@/lib/registry/workflow";

type Props = {
  lang: string;
  requests: RegistrationRequestSummary[];
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

export default function DashboardRequestTable({ lang, requests }: Props) {
  const visibleRequests = requests.filter((item) =>
    isVisibleInDashboard(item.requestStatus)
  );

  if (visibleRequests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
  Your registered assets
</h2>
        <p className="mt-2 text-sm text-zinc-600">
          No active registration requests are visible yet.
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
          Requests become visible in the dashboard once they move beyond draft.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
  Passport Number
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
                Completeness
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {visibleRequests.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                  {item.reference}
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
                  <RequestStatusBadge status={item.requestStatus} />
                </td>
                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.completeness.score}%
                </td>
                <td className="px-6 py-4 text-sm text-zinc-700">
                  {formatDate(item.updatedAt)}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <Link
                    href={`/${lang}/dashboard/registrations/${item.id}`}
                    className="font-medium text-zinc-900 underline underline-offset-4"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}