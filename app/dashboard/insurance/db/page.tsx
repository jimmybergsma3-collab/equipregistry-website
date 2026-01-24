import Link from "next/link";
import StatusBadge from "@/components/insurance/StatusBadge";
import { getMachines } from "@/lib/data/machines";

export default async function InsuranceDbPage() {
  const machines = await getMachines();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insurance DB View</h1>
          <p className="mt-1 text-sm text-slate-600">
            Read-only server data (JSON datastore). This is your “DB feel” demo.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/insurance"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/insurance/machines"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Demo machines
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 text-sm text-slate-700">
          Loaded <span className="font-semibold text-slate-900">{machines.length}</span> machine(s) from server datastore
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Registry ID</th>
                <th className="px-4 py-3">Machine</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Policy</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last verified</th>
                <th className="px-4 py-3 text-right">View</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {machines.map((m) => (
                <tr key={m.registryId} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-mono text-xs text-slate-900">{m.registryId}</td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{m.brand}</div>
                    <div className="text-xs text-slate-600">{m.model}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-900">{m.country}</td>
                  <td className="px-4 py-4 text-slate-900">{m.owner}</td>
                  <td className="px-4 py-4 font-mono text-xs text-slate-900">{m.policyNo}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={m.status as any} />
                  </td>
                  <td className="px-4 py-4 text-slate-900">{m.lastVerifiedAt}</td>
                  <td className="px-4 py-4 text-right">
                    <Link
                      href={`/passport/${m.registryId}`}
                      className="inline-flex items-center whitespace-nowrap rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Public passport
                    </Link>
                  </td>
                </tr>
              ))}

              {machines.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-600">
                    No machines found in datastore.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
