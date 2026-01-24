// app/dashboard/insurance/machines/page.tsx
import InsuranceMachinesTable from "@/components/insurance/InsuranceMachinesTable";

export const metadata = {
  title: "Insurance Dashboard — Machines",
};

export default function InsuranceMachinesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Insurance Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Machines portfolio (demo). Filters + status badges. (No changes to the public site.)
        </p>
      </div>

      <InsuranceMachinesTable />
    </main>
  );
}
