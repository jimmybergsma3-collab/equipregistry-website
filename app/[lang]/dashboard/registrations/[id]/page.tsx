import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import ManualPaymentPanel from "@/components/registry/manual-payment-panel";
import MarkPaidButton from "@/components/registry/mark-paid-button";
import ReviewFlowActions from "@/components/registry/review-flow-actions";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth/getSession";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { usesManualIbanPayment } from "@/lib/registry/payment";
import { getApplicantTypeLabel } from "@/lib/registry/workflow";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

export default async function RegistrationRequestDetailPage({ params }: Props) {
  const { lang, id } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard/registrations/${id}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  const isAdmin = user?.role === "admin";

  if (isAdmin) {
    const request = await prisma.registrationRequest.findFirst({
      where: { id },
    });

    if (!request) {
      notFound();
    }

    const showManualPaymentPanel =
      usesManualIbanPayment(request.applicantType) &&
      request.requestStatus === "payment_required" &&
      !request.paymentCompleted;

    const showMarkPaidButton =
      usesManualIbanPayment(request.applicantType) &&
      request.requestStatus === "payment_required" &&
      !request.paymentCompleted;

    const showReviewActions =
      request.requestStatus === "submitted" ||
      request.requestStatus === "under_review" ||
      request.requestStatus === "approved";

    return (
      <>
        <SiteHeader lang={lang} />

        <main className="min-h-screen bg-zinc-50">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Link
                href={`/${lang}/dashboard/admin/registrations`}
                className="text-sm font-medium text-zinc-600 underline underline-offset-4"
              >
                Back to admin registrations
              </Link>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
                {request.reference}
              </h1>

              <div className="mt-4">
                <RequestStatusBadge status={request.requestStatus} />
              </div>
            </div>

            {showManualPaymentPanel ? (
              <div className="mb-6">
<ManualPaymentPanel passportNumber={request.reference} lang={lang} />              </div>
            ) : null}

            {showMarkPaidButton ? (
              <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Admin payment confirmation
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    After you have confirmed the bank transfer manually, mark this registration as paid.
                  </p>
                </div>

                <MarkPaidButton registrationId={request.id} lang={lang} />
              </div>
            ) : null}

            {showReviewActions ? (
              <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Review workflow
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">
                    Move the registration through review, approval, and final passport issuance.
                  </p>
                </div>

                <ReviewFlowActions
                  registrationId={request.id}
                  lang={lang}
                  requestStatus={request.requestStatus}
                />
              </div>
            ) : null}

            <section className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Passport Number</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.reference}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Applicant Type</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    {getApplicantTypeLabel(request.applicantType)}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset Name</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.assetName}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Category</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.category}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Subcategory</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.subcategory}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Brand</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.brand}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Model</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.model}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Serial Number</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.serialNumber}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Owner</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.ownerName}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Owner Email</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{request.ownerEmail}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Created</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{formatDate(request.createdAt)}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Updated</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">{formatDate(request.updatedAt)}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Payment</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    {request.paymentCompleted ? "Completed / Cleared" : "Pending"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Completeness Score</p>
                  <p className="mt-1 text-sm font-medium text-zinc-900">
                    {request.completenessScore}%
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <SiteFooter lang={lang} />
      </>
    );
  }

  const ownRequest = await prisma.registrationRequest.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!ownRequest) {
    notFound();
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={`/${lang}/dashboard/registrations`}
              className="text-sm font-medium text-zinc-600 underline underline-offset-4"
            >
              Back to registrations
            </Link>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {ownRequest.reference}
            </h1>

            <div className="mt-4">
              <RequestStatusBadge status={ownRequest.requestStatus} />
            </div>
          </div>

          {usesManualIbanPayment(ownRequest.applicantType) &&
          ownRequest.requestStatus === "payment_required" &&
          !ownRequest.paymentCompleted ? (
            <div className="mb-6">
<ManualPaymentPanel passportNumber={ownRequest.reference} lang={lang} />            </div>
          ) : null}

          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Passport Number</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.reference}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Applicant Type</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {getApplicantTypeLabel(ownRequest.applicantType)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset Name</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.assetName}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Category</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.category}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Subcategory</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.subcategory}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Brand</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.brand}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Model</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.model}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Serial Number</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.serialNumber}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Owner</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.ownerName}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Owner Email</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{ownRequest.ownerEmail}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Created</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{formatDate(ownRequest.createdAt)}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Updated</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{formatDate(ownRequest.updatedAt)}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Payment</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {ownRequest.paymentCompleted ? "Completed / Cleared" : "Pending"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Completeness Score</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {ownRequest.completenessScore}%
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}