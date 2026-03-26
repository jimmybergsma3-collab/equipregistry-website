import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function DashboardPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard`);
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-slate-600 mb-6">
          Je bent ingelogd als {session.user.email}.
        </p>

        <div className="rounded-2xl border p-6 bg-white">
  <p className="font-medium">Rol: {session.user.role}</p>
  <p className="text-sm text-slate-500 mt-2 mb-6">
    Dit is nu je eerste echte beveiligde pagina.
  </p>

  <Link
    href={`/${lang}/dashboard/registrations`}
    className="inline-flex rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800"
  >
    Bekijk registraties
  </Link>
</div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}