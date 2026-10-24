import Link from "next/link";
import { portalEnabled } from "@/lib/business/portal";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomerDashboardNav from "@/components/dashboard/customer-dashboard-nav";
import DashboardRequestTable from "@/components/registry/dashboard-request-table";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";
import { normalizeRequestStatus } from "@/lib/registry/workflow";
import { getRegistrationStatusDisplay } from "@/lib/registry/request-meta";

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

  if (session.user.role === "admin") {
    redirect(`/${lang}/admin`);
  }

  const text = repairMojibakeDeep(getCustomerDashboardText(lang as Lang));

  const requests = await prisma.registrationRequest.findMany({
    where: {
      userId: session.user.id,
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const mappedRequests = requests.map((item) => {
    const requestStatus = normalizeRequestStatus(item.requestStatus);

    return {
      id: item.id,
      reference: item.reference,
      assetName: item.assetName,
      category: item.category,
      subcategory: item.subcategory,
      applicantType: item.applicantType,
      requestStatus,
      displayStatus: getRegistrationStatusDisplay(
        item.dynamicFields,
        requestStatus
      ),
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
    };
  });

  return (
    <>
      <SiteHeader lang={lang} />

      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                EquipRegistry
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                {text.dashboardTitle}
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-zinc-600">
                {text.dashboardSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/dashboard/register`}
                className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                {text.newRegistration}
              </Link>
            </div>
          </div>

          <CustomerDashboardNav lang={lang as Lang} active="dashboard" />
          {portalEnabled() ? <Link href={`/${lang}/dashboard/business`} className="mb-6 inline-flex rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium">Business workspace (English)</Link> : null}

          <DashboardRequestTable lang={lang} requests={mappedRequests} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
