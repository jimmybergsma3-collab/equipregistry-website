import Link from "next/link";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import {
  RegistrationRequestStatus,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";

type RequestRow = {
  id: string;
  reference: string;
  assetName: string;
  category: string;
  subcategory: string;
  applicantType: string;
  requestStatus: RegistrationRequestStatus;
  paymentCompleted: boolean;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  lang: string;
  requests: RequestRow[];
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

export default function AdminRequestTable({ lang, requests }: Props) {
  if (requests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Registration management
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          No registrations found for the selected filter.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
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
                Owner
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
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {requests.map((item) => (
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
                  <div className="font-medium text-zinc-900">{item.ownerName || "—"}</div>
                  <div className="text-zinc-500">{item.ownerEmail || "—"}</div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {getApplicantTypeLabel(item.applicantType as any)}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <RequestStatusBadge status={item.requestStatus} />
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                      item.paymentCompleted
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-orange-200 bg-orange-50 text-orange-700",
                    ].join(" ")}
                  >
                    {item.paymentCompleted ? "Paid" : "Pending"}
                  </span>
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