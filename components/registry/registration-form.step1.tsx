"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import CategorySelects from "@/components/registry/category-selects";
import DynamicAssetFields from "@/components/registry/dynamic-asset-fields";
import DocumentRequirementsPanel from "@/components/registry/document-requirements-panel";
import RegistrationReadinessPanel from "@/components/registry/registration-readiness-panel";
import {
  ApplicantType,
  RegistrationDraft,
  createEmptyRegistrationDraft,
  deriveRequestStatus,
  evaluateRegistrationCompleteness,
  getApplicantTypeLabel,
  requiresDirectPayment,
} from "@/lib/registry/workflow";
import { RegistrationDocumentState } from "@/lib/registry/document-rules";
import {
  saveRegistrationDraft,
  submitRegistrationRequest,
} from "@/app/[lang]/dashboard/register/actions";

type Props = {
  initialApplicantType?: ApplicantType;
};

const APPLICANT_TYPE_OPTIONS: ApplicantType[] = [
  "private",
  "sme",
  "insurer_partner",
  "bank_partner",
  "dealer_partner",
  "rental_partner",
];

const initialActionState = {
  success: false,
  message: "",
};

export default function RegistrationFormStep1({
  initialApplicantType = "private",
}: Props) {
  const [draft, setDraft] = useState<RegistrationDraft>(
    createEmptyRegistrationDraft(initialApplicantType)
  );
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const [saveState, saveAction, savePending] = useActionState(
    saveRegistrationDraft,
    initialActionState
  );

  const [submitState, submitAction, submitPending] = useActionState(
    submitRegistrationRequest,
    initialActionState
  );

  const completeness = useMemo(
    () => evaluateRegistrationCompleteness(draft),
    [draft]
  );

  const requestStatus = useMemo(
    () => deriveRequestStatus(draft, paymentCompleted),
    [draft, paymentCompleted]
  );

  function updateField<K extends keyof RegistrationDraft>(
    key: K,
    value: RegistrationDraft[K]
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateDynamicField(key: string, value: string) {
    setDraft((prev) => ({
      ...prev,
      dynamicFields: {
        ...prev.dynamicFields,
        [key]: value,
      },
    }));
  }

  function updateDocumentField(key: string, value: RegistrationDocumentState) {
    setDraft((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [key]: value,
      },
    }));
  }

  function handleCategoryChange(value: string) {
    setDraft((prev) => ({
      ...prev,
      category: value,
      subcategory: "",
      dynamicFields: {},
      documents: {},
    }));
  }

  function handleSubcategoryChange(value: string) {
    setDraft((prev) => ({
      ...prev,
      subcategory: value,
    }));
  }

  function handleApplicantTypeChange(value: ApplicantType) {
    updateField("applicantType", value);
    setPaymentCompleted(
      value === "insurer_partner" ||
        value === "bank_partner" ||
        value === "dealer_partner" ||
        value === "rental_partner"
    );
  }

  const requiresPayment = requiresDirectPayment(draft.applicantType);

  return (
    <div className="space-y-8">
      <form action={saveAction} className="space-y-8">
        <input type="hidden" name="assetName" value={draft.assetName} />
        <input type="hidden" name="category" value={draft.category} />
        <input type="hidden" name="subcategory" value={draft.subcategory} />
        <input type="hidden" name="brand" value={draft.brand} />
        <input type="hidden" name="model" value={draft.model} />
        <input type="hidden" name="serialNumber" value={draft.serialNumber} />
        <input type="hidden" name="year" value={draft.year ?? ""} />
        <input type="hidden" name="country" value={draft.country ?? ""} />
        <input type="hidden" name="ownerName" value={draft.ownerName} />
        <input type="hidden" name="ownerEmail" value={draft.ownerEmail} />
        <input type="hidden" name="applicantType" value={draft.applicantType} />
        <input
          type="hidden"
          name="declarationAccepted"
          value={draft.declarationAccepted ? "true" : "false"}
        />
        <input
          type="hidden"
          name="dynamicFields"
          value={JSON.stringify(draft.dynamicFields)}
        />
        <input
          type="hidden"
          name="documents"
          value={JSON.stringify(draft.documents)}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-zinc-900">
              Registration foundation
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Complete all required data before the request can move to payment or submission.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="applicantType" className="mb-2 block text-sm font-medium text-zinc-900">
                Applicant Type
              </label>
              <select
                id="applicantType"
                value={draft.applicantType}
                onChange={(e) => handleApplicantTypeChange(e.target.value as ApplicantType)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              >
                {APPLICANT_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {getApplicantTypeLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assetName" className="mb-2 block text-sm font-medium text-zinc-900">
                Asset Name
              </label>
              <input
                id="assetName"
                type="text"
                value={draft.assetName}
                onChange={(e) => updateField("assetName", e.target.value)}
                placeholder="e.g. Opel Corsa / Komatsu WA380"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>
          </div>

          <div className="mt-5">
            <CategorySelects
              category={draft.category}
              subcategory={draft.subcategory}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="brand" className="mb-2 block text-sm font-medium text-zinc-900">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                value={draft.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                placeholder="e.g. Opel"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="model" className="mb-2 block text-sm font-medium text-zinc-900">
                Model
              </label>
              <input
                id="model"
                type="text"
                value={draft.model}
                onChange={(e) => updateField("model", e.target.value)}
                placeholder="e.g. Corsa"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="serialNumber" className="mb-2 block text-sm font-medium text-zinc-900">
                Serial Number / Main ID
              </label>
              <input
                id="serialNumber"
                type="text"
                value={draft.serialNumber}
                onChange={(e) => updateField("serialNumber", e.target.value)}
                placeholder="Enter serial number or main identifier"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="year" className="mb-2 block text-sm font-medium text-zinc-900">
                Year
              </label>
              <input
                id="year"
                type="text"
                value={draft.year ?? ""}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="e.g. 2019"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-zinc-900">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={draft.country ?? ""}
                onChange={(e) => updateField("country", e.target.value)}
                placeholder="e.g. Spain"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="ownerName" className="mb-2 block text-sm font-medium text-zinc-900">
                Owner Name
              </label>
              <input
                id="ownerName"
                type="text"
                value={draft.ownerName}
                onChange={(e) => updateField("ownerName", e.target.value)}
                placeholder="Full legal owner name"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="ownerEmail" className="mb-2 block text-sm font-medium text-zinc-900">
                Owner Email
              </label>
              <input
                id="ownerEmail"
                type="email"
                value={draft.ownerEmail}
                onChange={(e) => updateField("ownerEmail", e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>
          </div>
        </section>

        <DynamicAssetFields
          category={draft.category}
          values={draft.dynamicFields}
          onChange={updateDynamicField}
        />

        <DocumentRequirementsPanel
          applicantType={draft.applicantType}
          category={draft.category}
          documents={draft.documents}
          onChange={updateDocumentField}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={draft.declarationAccepted}
              onChange={(e) => updateField("declarationAccepted", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span className="text-sm text-zinc-700">
              I confirm that the submitted data is complete and may be processed for registration assessment.
            </span>
          </label>
        </section>

        <RegistrationReadinessPanel
          applicantType={draft.applicantType}
          completeness={completeness}
          paymentCompleted={paymentCompleted}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                Workflow result
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Current internal request status: <strong>{requestStatus}</strong>
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {requiresPayment
                  ? "Retail and SME applicants must pay before final submission."
                  : "Partner applicant type can submit directly."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                disabled={savePending}
              >
                {savePending ? "Saving..." : "Save draft"}
              </button>
            </div>
          </div>

          {saveState.message ? (
            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              {saveState.message}
            </div>
          ) : null}
        </section>
      </form>

      <form action={submitAction}>
        <input type="hidden" name="assetName" value={draft.assetName} />
        <input type="hidden" name="category" value={draft.category} />
        <input type="hidden" name="subcategory" value={draft.subcategory} />
        <input type="hidden" name="brand" value={draft.brand} />
        <input type="hidden" name="model" value={draft.model} />
        <input type="hidden" name="serialNumber" value={draft.serialNumber} />
        <input type="hidden" name="year" value={draft.year ?? ""} />
        <input type="hidden" name="country" value={draft.country ?? ""} />
        <input type="hidden" name="ownerName" value={draft.ownerName} />
        <input type="hidden" name="ownerEmail" value={draft.ownerEmail} />
        <input type="hidden" name="applicantType" value={draft.applicantType} />
        <input
          type="hidden"
          name="declarationAccepted"
          value={draft.declarationAccepted ? "true" : "false"}
        />
        <input
          type="hidden"
          name="dynamicFields"
          value={JSON.stringify(draft.dynamicFields)}
        />
        <input
          type="hidden"
          name="documents"
          value={JSON.stringify(draft.documents)}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              disabled={submitPending}
            >
              {submitPending
                ? "Submitting..."
                : requiresPayment
                ? "Create request"
                : "Submit registration"}
            </button>
          </div>

          {submitState.message ? (
            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              {submitState.message}
            </div>
          ) : null}
        </section>
      </form>
    </div>
  );
}