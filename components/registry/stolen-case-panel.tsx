"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  activateStolenCase,
  resolveStolenCase,
  saveStolenCase,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getStolenCaseText } from "@/lib/i18n/stolen-case";
import { getStolenReviewText } from "@/lib/i18n/stolen-review";
import { formatDateForLang } from "@/lib/i18n/registry-display";
import type { StolenCaseRecord } from "@/lib/registry/request-meta";
import { formatSupportingDocumentReferences } from "@/lib/registry/stolen-case";
import SearchableCountrySelect from "@/components/registry/searchable-country-select";

type Props = {
  registrationId: string;
  lang: string;
  existingCase: StolenCaseRecord | null;
};

type ActionResult = {
  success: boolean;
  message: string;
  tone?: "success" | "warning" | "error";
  refresh?: boolean;
};

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-zinc-900">{value}</p>
    </div>
  );
}

function UploadedFileList({
  title,
  emptyText,
  files,
}: {
  title: string;
  emptyText: string;
  files: Array<{ id: string; originalName: string }>;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{title}</p>

      {files.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              {file.originalName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-zinc-500">{emptyText}</p>
      )}
    </div>
  );
}

export default function StolenCasePanel({
  registrationId,
  lang,
  existingCase,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = getStolenCaseText(safeLang);
  const reviewText = getStolenReviewText(safeLang);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "warning" | "error">("success");
  const [country, setCountry] = useState(existingCase?.country ?? "");

  function applyResult(result: ActionResult) {
    setMessage(result.message);
    setTone(result.tone ?? (result.success ? "success" : "error"));

    if (result.refresh) {
      router.refresh();
    }
  }

  function handleSubmit(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const result = await saveStolenCase(registrationId, lang, formData);
      applyResult(result);
    });
  }

  function handleResolve() {
    setMessage("");

    startTransition(async () => {
      const result = await resolveStolenCase(registrationId, lang);
      applyResult(result);
    });
  }

  function handleActivate() {
    setMessage("");

    if (
      !window.confirm(
        safeLang === "nl"
          ? "Ja, dit object als gestolen markeren en de publieke waarschuwing activeren?"
          : reviewText.activateDescription
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await activateStolenCase(registrationId, lang);
      applyResult(result);
    });
  }

  function handleReject() {
    setMessage("");

    if (
      !window.confirm(
        safeLang === "nl"
          ? "Nee, deze melding niet als gestolen markeren? De publieke waarschuwing blijft uit."
          : "Do not mark this asset as stolen? The public warning will remain inactive."
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await resolveStolenCase(registrationId, lang);
      applyResult(result);
    });
  }

  const summaryValues = existingCase
    ? [
        {
          label: text.admin.fields.caseReference,
          value: existingCase.caseReference,
        },
        {
          label: text.admin.statusLabel,
          value:
            existingCase.status === "pending_review"
              ? reviewText.pendingReview
              : existingCase.status === "open"
              ? text.admin.open
              : text.admin.resolved,
        },
        {
          label: text.admin.fields.createdAt,
          value: formatDateForLang(existingCase.createdAt, safeLang),
        },
        {
          label: text.admin.fields.updatedAt,
          value: formatDateForLang(existingCase.updatedAt, safeLang),
        },
      ]
    : [];

  if (existingCase?.resolvedAt) {
    summaryValues.push({
      label: text.admin.fields.resolvedAt,
      value: formatDateForLang(existingCase.resolvedAt, safeLang),
    });
  }

  const toneClassName =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">{text.admin.title}</h2>
        <p className="mt-1 text-sm text-zinc-600">{text.admin.description}</p>
      </div>

      {summaryValues.length > 0 ? (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summaryValues.map((item) => (
            <SummaryItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      ) : null}

      <form action={handleSubmit} className="space-y-5">
        {existingCase ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <UploadedFileList
              title={reviewText.evidenceFiles}
              emptyText={reviewText.noEvidenceFiles}
              files={existingCase.evidenceFiles}
            />
            <UploadedFileList
              title={reviewText.policeReportFiles}
              emptyText={reviewText.noPoliceReportFiles}
              files={existingCase.policeReportFiles}
            />
          </div>
        ) : null}

        {existingCase?.status === "pending_review" ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
            <h3 className="text-sm font-semibold text-amber-900">
              {reviewText.activateTitle}
            </h3>
            <p className="mt-1 text-sm text-amber-800">
              {reviewText.activateDescription}
            </p>
          </div>
        ) : null}

        {existingCase?.status === "pending_review" ? (
          <details className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-zinc-800">
              {safeLang === "nl"
                ? "Gegevens aanpassen (optioneel)"
                : "Adjust details (optional)"}
            </summary>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.policeReportNumber}
                </span>
                <input
                  type="text"
                  name="policeReportNumber"
                  defaultValue={existingCase?.policeReportNumber ?? ""}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.policeReportDate}
                </span>
                <input
                  type="date"
                  name="policeReportDate"
                  defaultValue={existingCase?.policeReportDate ?? ""}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.country}
                </span>
                <SearchableCountrySelect
                  id="stolen-case-country"
                  name="country"
                  lang={safeLang}
                  value={country}
                  onChange={setCountry}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.cityRegion}
                </span>
                <input
                  type="text"
                  name="cityRegion"
                  defaultValue={existingCase?.cityRegion ?? ""}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.incidentDate}
                </span>
                <input
                  type="date"
                  name="incidentDate"
                  defaultValue={existingCase?.incidentDate ?? ""}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.incidentDescription}
                </span>
                <textarea
                  name="incidentDescription"
                  defaultValue={existingCase?.incidentDescription ?? ""}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.supportingDocumentReferences}
                </span>
                <textarea
                  name="supportingDocumentReferences"
                  defaultValue={formatSupportingDocumentReferences(
                    existingCase?.supportingDocumentReferences ?? []
                  )}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-zinc-700">
                  {text.admin.fields.caseNotes}
                </span>
                <textarea
                  name="caseNotes"
                  defaultValue={existingCase?.caseNotes ?? ""}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="mt-5 inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? text.admin.processing : text.admin.update}
            </button>
          </details>
        ) : null}

        {existingCase?.status !== "pending_review" ? <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.policeReportNumber}
            </span>
            <input
              type="text"
              name="policeReportNumber"
              defaultValue={existingCase?.policeReportNumber ?? ""}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.policeReportDate}
            </span>
            <input
              type="date"
              name="policeReportDate"
              defaultValue={existingCase?.policeReportDate ?? ""}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.country}
            </span>
            <SearchableCountrySelect
              id="stolen-case-country"
              name="country"
              lang={safeLang}
              value={country}
              onChange={setCountry}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.cityRegion}
            </span>
            <input
              type="text"
              name="cityRegion"
              defaultValue={existingCase?.cityRegion ?? ""}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.incidentDate}
            </span>
            <input
              type="date"
              name="incidentDate"
              defaultValue={existingCase?.incidentDate ?? ""}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.incidentDescription}
            </span>
            <textarea
              name="incidentDescription"
              defaultValue={existingCase?.incidentDescription ?? ""}
              rows={4}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.supportingDocumentReferences}
            </span>
            <textarea
              name="supportingDocumentReferences"
              defaultValue={formatSupportingDocumentReferences(
                existingCase?.supportingDocumentReferences ?? []
              )}
              rows={4}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
            <p className="mt-2 text-xs text-zinc-500">{text.admin.refsHint}</p>
            <p className="mt-1 text-xs text-zinc-500">{text.admin.uploadNote}</p>
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-zinc-700">
              {text.admin.fields.caseNotes}
            </span>
            <textarea
              name="caseNotes"
              defaultValue={existingCase?.caseNotes ?? ""}
              rows={4}
              className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </label>
        </div> : null}

        <div className="flex flex-wrap gap-3">
          {existingCase?.status !== "pending_review" ? (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? text.admin.processing
                : existingCase
                ? text.admin.update
                : text.admin.save}
            </button>
          ) : null}

          {existingCase?.status === "pending_review" ? (
            <>
              <button
                type="button"
                disabled={isPending}
                onClick={handleActivate}
                className="inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending
                  ? reviewText.activating
                  : safeLang === "nl"
                  ? "Ja, als gestolen markeren"
                  : reviewText.activate}
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleReject}
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? text.admin.processing : safeLang === "nl" ? "Nee" : text.admin.resolve}
              </button>
            </>
          ) : null}

          {existingCase?.status === "open" ? (
            <button
              type="button"
              disabled={isPending}
              onClick={handleResolve}
              className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? text.admin.processing : text.admin.resolve}
            </button>
          ) : null}
        </div>

        {message ? (
          <div className={`rounded-xl border px-4 py-3 text-sm ${toneClassName}`}>
            {message}
          </div>
        ) : null}
      </form>
    </section>
  );
}
