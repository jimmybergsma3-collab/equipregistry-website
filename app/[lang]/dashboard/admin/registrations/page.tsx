import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RequestStatusFilter from "@/components/registry/request-status-filter";
import AdminRequestTable from "@/components/registry/admin-request-table";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import {
  RegistrationRequestStatus,
  getRequestStatusLabel,
} from "@/lib/registry/workflow";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    status?: string;
  }>;
};

const ALLOWED_STATUSES: RegistrationRequestStatus[] = [
  "draft",
  "incomplete",
  "ready_for_submission",
  "payment_required",
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "more_info_required",
  "passport_issued",
];

export default async function AdminRegistrationsPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;
  const { status } = await searchParams;

  if (!isValidLang(lang)) {
    notFound();
  }

  await requireAdminSession(lang);

  const validStatus =
    status && ALLOWED_STATUSES.includes(status as RegistrationRequestStatus)
      ? (status as RegistrationRequestStatus)
      : null;

  const requests = await prisma.registrationRequest.findMany({
    where: validStatus
      ? {
          requestStatus: validStatus,
        }
      : undefined,
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
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
    paymentCompleted: item.paymentCompleted,
    ownerName: item.ownerName,
    ownerEmail: item.ownerEmail,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
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
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                EquipRegistry Admin
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Registration management
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                {validStatus
                  ? `Showing registrations filtered by: ${getRequestStatusLabel(
                      validStatus
                    )}`
                  : "Showing all registrations across the current system view."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RequestStatusFilter currentStatus={validStatus ?? "all"} />

              <Link
                href={`/${lang}/dashboard/register`}
                className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                New registration
              </Link>
            </div>
          </div>

          <AdminRequestTable lang={lang} requests={mappedRequests} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
