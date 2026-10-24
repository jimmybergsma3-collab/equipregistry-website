import { notFound, redirect } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import CustomerDashboardNav from "@/components/dashboard/customer-dashboard-nav";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-zinc-900">{value}</p>
    </div>
  );
}

export default async function DashboardProfilePage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/profile`);
  }

  if (session.user.role === "admin") {
    redirect(`/${lang}/admin`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      companyName: true,
      vatNumber: true,
      emailVerifiedAt: true,
    },
  });

  if (!user) {
    notFound();
  }

  const text = getCustomerDashboardText(lang as Lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {text.profileTitle}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              {text.profileSubtitle}
            </p>
          </div>

          <CustomerDashboardNav lang={lang as Lang} active="profile" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCard
              label={text.profileLabels.name}
              value={user.name?.trim() || text.notProvided}
            />
            <DetailCard label={text.profileLabels.email} value={user.email} />
            <DetailCard
              label={text.profileLabels.company}
              value={user.companyName?.trim() || text.notProvided}
            />
            <DetailCard
              label={text.profileLabels.vat}
              value={user.vatNumber?.trim() || text.notProvided}
            />
            <DetailCard
              label={text.profileLabels.verification}
              value={user.emailVerifiedAt ? text.verified : text.unverified}
            />
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
