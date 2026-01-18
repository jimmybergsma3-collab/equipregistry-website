import Link from "next/link";
import { getDashboardMachines } from "@/lib/queries/machines";
import { getStatusUI } from "@/lib/machineStatus";
import StatusBadge from "@/components/ui/StatusBadge";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const statusFilter = (sp.status ?? "").trim().toUpperCase();

  const machines = await getDashboardMachines();

  const filtered = machines.filter((m) => {
    const matchesQ =
      !q ||
      m.registryId.toLowerCase().includes(q.toLowerCase()) ||
      `${m.brand} ${m.model}`.toLowerCase().includes(q.toLowerCase());

    const canon = (m.status ?? "").toString().toUpperCase();
    const matchesStatus = !statusFilter || canon === statusFilter;

    return matchesQ && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Machines</h1>
          <p className="text-sm text-slate-600">
            Database-backed dashboard. Click a machine to view details and passport.
          </p>
        </div>

        <form className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search registry ID, brand, model..."
            className="w-full sm:w-72 rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />

          <select
            name="status"
            defaultValue={statusFilter}
            className="w-full sm:w-56 rounded-xl border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All statuses</option>
            <option value="REGISTERED_VERIFIED">Registered & Verified</option>
            <option value="HISTORY_UNKNOWN">History Unknown</option>
            <option value="NOT_REGISTERED">Not Registered</option>
            <option value="STOLEN">Stolen / Red Flag</option>
          </select>

          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Filter
          </button>
        </form>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50 text-slate-700">
              <tr>
                <th className="px-5 py-3 text-left font-semibold">Registry ID</th>
                <th className="px-5 py-3 text-left font-semibold">Machine</th>
                <th className="px-5 py-3 text-left font-semibold">Status</th>
                <th className="px-5 py-3 text-left font-semibold">Owner</th>
                <th className="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => {
                const ui = getStatusUI(m.status) as {
  label: string;
  tone?: "green" | "orange" | "red" | "gray";
  color?: "green" | "orange" | "red" | "gray";
};

const tone = ui.tone ?? ui.color ?? "gray";

                return (
                  <tr key={m.id} className="border-b last:border-b-0">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {m.registryId}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {m.brand} {m.model} {m.year ? `(${m.year})` : ""}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge tone={tone}>{ui.label}</StatusBadge>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {m.owner?.email ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/dashboard/machines/${m.id}`}
                        className="inline-flex items-center justify-center rounded-xl border bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                    No machines match your filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Tip: Use the public passport route for authorities:{" "}
        <span className="font-medium">/passport/ER-REG-001</span>
      </p>
    </div>
  );
}
