"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  resolveStolenCase,
  saveStolenCase,
} from "@/app/[lang]/dashboard/registrations/[id]/actions";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getStolenCaseText } from "@/lib/i18n/stolen-case";
import { formatDateForLang } from "@/lib/i18n/registry-display";
import type { StolenCaseRecord } from "@/lib/registry/request-meta";
import { formatSupportingDocumentReferences } from "@/lib/registry/stolen-case";

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

export default function StolenCasePanel({
  registrationId,
  lang,
  existingCase,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = getStolenCaseText(safeLang);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"success" | "warning" | "error">("success");

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

  const summaryValues = existingCase
    ? [
        {
          label: text.admin.fields.caseReference,
          value: existingCase.caseReference,
        },
        {
          label: text.admin.statusLabel,
          value:
            existingCase.status === "open" ? text.admin.open : text.admin.resolved,
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
        <div className="grid gap-5 sm:grid-cols-2">
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
            <input
              type="text"
              name="country"
              defaultValue={existingCase?.country ?? ""}
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
        </div>

        <div className="flex flex-wrap gap-3">
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
