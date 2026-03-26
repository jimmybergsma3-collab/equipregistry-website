// components/registry/registration-readiness-panel.tsx

"use client";

import {
  ApplicantType,
  RegistrationCompletenessResult,
  getNextSubmitAction,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";

function prettifyKey(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type Props = {
  applicantType: ApplicantType;
  completeness: RegistrationCompletenessResult;
  paymentCompleted: boolean;
};

export default function RegistrationReadinessPanel({
  applicantType,
  completeness,
  paymentCompleted,
}: Props) {
  const nextAction = getNextSubmitAction(
    applicantType,
    completeness.isComplete,
    paymentCompleted
  );

  const readinessClass = completeness.isComplete
    ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border border-amber-200 bg-amber-50 text-amber-700";

  let nextStepText = "Complete all required information.";
  if (nextAction === "go_to_payment") {
    nextStepText =
      "Your file is complete. Continue to payment to activate submission.";
  }
  if (nextAction === "submit_registration") {
    nextStepText = "Your file is complete and ready to be submitted.";
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            Registration readiness
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Applicant type: {getApplicantTypeLabel(applicantType)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">{nextStepText}</p>
        </div>

        <span
          className={[
            "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
            readinessClass,
          ].join(" ")}
        >
          {completeness.isComplete
            ? `Complete (${completeness.score}%)`
            : `Incomplete (${completeness.score}%)`}
        </span>
      </div>

      {completeness.missingFields.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-zinc-900">Missing fields</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingFields.map((field) => (
              <span
                key={field}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              >
                {prettifyKey(field)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {completeness.missingDynamicFields.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-zinc-900">
            Missing category-specific fields
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingDynamicFields.map((field) => (
              <span
                key={field}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              >
                {prettifyKey(field)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {completeness.missingDocuments.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-zinc-900">Missing documents</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingDocuments.map((doc) => (
              <span
                key={doc}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
              >
                {prettifyKey(doc)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900">Payment status</p>
            <p className="mt-1 text-sm text-zinc-600">
              {paymentCompleted
                ? "Payment completed or not required for this partner type."
                : "Payment has not been completed yet."}
            </p>
          </div>

          <span
            className={[
              "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
              paymentCompleted
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-orange-200 bg-orange-50 text-orange-700",
            ].join(" ")}
          >
            {paymentCompleted ? "Paid / Cleared" : "Payment pending"}
          </span>
        </div>
      </div>
    </section>
  );
}