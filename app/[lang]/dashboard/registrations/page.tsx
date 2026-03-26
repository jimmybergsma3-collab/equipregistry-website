import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import DashboardRequestTable from "@/components/registry/dashboard-request-table";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function RegistrationsPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/registrations`);
  }

  const requests = await prisma.registrationRequest.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const mappedRequests = requests.map((item) => ({
    id: item.id,
    reference: item.reference,
    assetName: item.assetName,
    category: item.category,
    subcategory: item.subcategory,
    applicantType: item.applicantType,
    requestStatus: item.requestStatus,
    passportStatus: null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    paymentCompleted: item.paymentCompleted,
    completeness: {
      isComplete: item.completenessScore === 100,
      missingFields: [],
      missingDocuments: [],
      missingDynamicFields: [],
      score: item.completenessScore,
    },
  }));

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                EquipRegistry
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Registration requests
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/dashboard/admin/registrations`}
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                Admin overview
              </Link>

              <Link
                href={`/${lang}/dashboard/register`}
                className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                New registration
              </Link>
            </div>
          </div>

          <DashboardRequestTable lang={lang} requests={mappedRequests} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}