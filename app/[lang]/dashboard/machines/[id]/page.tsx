import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

export default async function MachineDetailPage({ params }: Props) {
  const { lang, id } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login`);
  }

  const machine = await prisma.machine.findUnique({
    where: { id },
  });

  if (!machine || machine.ownerId !== session.user.id) {
    notFound();
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-6">{machine.registryId}</h1>

        <div className="grid gap-4">
          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Merk</p>
            <p className="font-medium">{machine.brand}</p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Model</p>
            <p className="font-medium">{machine.model}</p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Jaar</p>
            <p className="font-medium">{machine.year ?? "-"}</p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium">{machine.status}</p>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}