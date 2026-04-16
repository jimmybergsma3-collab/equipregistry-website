import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import CustomerDashboardNav from "@/components/dashboard/customer-dashboard-nav";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import { getSession } from "@/lib/auth/getSession";
import { prisma } from "@/lib/db";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import { getCustomerDashboardText } from "@/lib/i18n/customer-dashboard";
import { getStolenCaseRecord } from "@/lib/registry/request-meta";
import { getCategoryByValue, getSubcategoriesByCategory } from "@/lib/registry/categories";
import { formatDateForLang } from "@/lib/i18n/registry-display";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function DashboardPassportsPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/passports`);
  }

  if (session.user.role === "admin") {
    redirect(`/${lang}/dashboard/admin/registrations`);
  }

  const passports = await prisma.registrationRequest.findMany({
    where: {
      userId: session.user.id,
      requestStatus: "passport_issued",
      deletedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const text = getCustomerDashboardText(lang as Lang);
  const stolenReportText = getCustomerStolenReportText(lang as Lang);

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
              {text.passportsTitle}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              {text.passportsSubtitle}
            </p>
          </div>

          <CustomerDashboardNav lang={lang as Lang} active="passports" />

          {passports.length === 0 ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-zinc-900">
                {text.noPassportsTitle}
              </h2>
              <p className="mt-2 text-sm text-zinc-600">{text.noPassportsText}</p>
            </section>
          ) : (
            <div className="grid gap-5">
              {passports.map((passport) => {
                const stolenCase = getStolenCaseRecord(passport.dynamicFields);
                const ownerReportPending = stolenCase?.status === "pending_review";
                const isReportedStolen =
                  stolenCase?.isStolen && stolenCase.status === "open";
                const localizedCategory =
                  getCategoryByValue(passport.category, lang as Lang)?.label ??
                  passport.category;
                const localizedSubcategory =
                  getSubcategoriesByCategory(passport.category, lang as Lang).find(
                    (item) => item.value === passport.subcategory
                  )?.label ?? passport.subcategory;

                return (
                  <section
                    key={passport.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                          {passport.reference}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-zinc-900">
                          {passport.assetName}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600">
                          {localizedCategory} / {localizedSubcategory}
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                          {formatDateForLang(passport.updatedAt, lang as Lang)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <RequestStatusBadge status="passport_issued" lang={lang} />

                        {ownerReportPending ? (
                          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                            {stolenReportText.pendingBadge}
                          </span>
                        ) : null}

                        {isReportedStolen ? (
                          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                            {stolenReportText.activeBadge}
                          </span>
                        ) : null}

                        <Link
                          href={`/${lang}/passport/${passport.reference}`}
                          className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                        >
                          {text.viewPassport}
                        </Link>
                        <Link
                          href={`/${lang}/dashboard/registrations/${passport.id}`}
                          className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                        >
                          {text.openRequest}
                        </Link>

                        {!ownerReportPending && !isReportedStolen ? (
                          <Link
                            href={`/${lang}/dashboard/registrations/${passport.id}#owner-incident-report`}
                            className="inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                          >
                            {stolenReportText.reportAction}
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    {ownerReportPending ? (
                      <p className="mt-4 text-sm text-amber-700">
                        {stolenReportText.pendingDescription}
                      </p>
                    ) : null}

                    {isReportedStolen ? (
                      <p className="mt-4 text-sm text-red-700">
                        {stolenReportText.activeDescription}
                      </p>
                    ) : null}
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
