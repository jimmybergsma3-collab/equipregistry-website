import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";
import { prisma } from "@/lib/db";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function MachinesPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/machines`);
  }

  const machines = await prisma.machine.findMany({
    where: {
      ownerId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="max-w-6xl mx-auto py-20 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Machines</h1>
            <p className="text-slate-600 mt-2">
              Overzicht van jouw geregistreerde machines.
            </p>
          </div>

          <Link
            href={`/${lang}/register`}
            className="rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Nieuwe machine registreren
          </Link>
        </div>

        {machines.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8">
            <p className="text-slate-700 font-medium mb-2">
              Nog geen machines gevonden.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Registreer je eerste machine om je dashboard op te bouwen.
            </p>

            <Link
              href={`/${lang}/register`}
              className="inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Ga naar registreren
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold">Registry ID</th>
                  <th className="px-4 py-3 text-sm font-semibold">Merk</th>
                  <th className="px-4 py-3 text-sm font-semibold">Model</th>
                  <th className="px-4 py-3 text-sm font-semibold">Jaar</th>
                  <th className="px-4 py-3 text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold">Actie</th>
                </tr>
              </thead>

              <tbody>
                {machines.map((machine) => (
                  <tr key={machine.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/${lang}/dashboard/machines/${machine.id}`}
                        className="text-blue-700 hover:underline"
                      >
                        {machine.registryId}
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm">{machine.brand}</td>
                    <td className="px-4 py-3 text-sm">{machine.model}</td>
                    <td className="px-4 py-3 text-sm">{machine.year ?? "-"}</td>
                    <td className="px-4 py-3 text-sm">{machine.status}</td>

                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/${lang}/passport/${machine.registryId}`}
                        className="inline-flex rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-50"
                      >
                        View Passport
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}