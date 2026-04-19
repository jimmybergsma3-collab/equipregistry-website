"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitOwnerStolenReport } from "@/app/[lang]/dashboard/registrations/[id]/actions";
import SearchableCountrySelect from "@/components/registry/searchable-country-select";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getCustomerStolenReportText } from "@/lib/i18n/customer-stolen-report";
import { getStolenCustomerActionsText } from "@/lib/i18n/stolen-customer-actions";
import { getRegistryUploadText } from "@/lib/i18n/registry-upload";
import {
  ClientUploadError,
  uploadFilesForBucket,
} from "@/lib/registry/client-uploads";
import type { StolenCaseRecord } from "@/lib/registry/request-meta";
import {
  ALLOWED_UPLOAD_ACCEPT,
  type StoredUpload,
} from "@/lib/registry/upload-types";

type Props = {
  registrationId: string;
  lang: string;
  existingCase: StolenCaseRecord | null;
};

export default function OwnerStolenReportPanel({
  registrationId,
  lang,
  existingCase,
}: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = getCustomerStolenReportText(safeLang);
  const actionText = getStolenCustomerActionsText(safeLang);
  const uploadText = getRegistryUploadText(safeLang);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [policeReportNumber, setPoliceReportNumber] = useState(
    existingCase?.policeReportNumber ?? ""
  );
  const [incidentDate, setIncidentDate] = useState(
    existingCase?.incidentDate ?? ""
  );
  const [incidentCountry, setIncidentCountry] = useState(
    existingCase?.country ?? ""
  );
  const [incidentDescription, setIncidentDescription] = useState(
    existingCase?.incidentDescription ?? ""
  );
  const [supportingDocuments, setSupportingDocuments] = useState<StoredUpload[]>(
    existingCase?.evidenceFiles ?? []
  );
  const [policeReportFiles, setPoliceReportFiles] = useState<StoredUpload[]>(
    existingCase?.policeReportFiles ?? []
  );

  async function handleUpload(
    bucket: "stolen_supporting_document" | "stolen_police_report",
    fileList: FileList | null
  ) {
    if (!fileList || fileList.length === 0) {
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const uploads = await uploadFilesForBucket(bucket, Array.from(fileList));

      if (bucket === "stolen_police_report") {
        setPoliceReportFiles((current) => [...current, ...uploads]);
      } else {
        setSupportingDocuments((current) => [...current, ...uploads]);
      }
    } catch (error) {
      setUploadError(
        error instanceof ClientUploadError &&
          (error.code === "file_too_large" ||
            error.code === "invalid_file_type")
          ? uploadText.sizeHelp
          : uploadText.uploadFailed
      );
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!incidentDescription.trim()) {
      setFormError(text.validation.descriptionRequired);
      return;
    }

    if (
      supportingDocuments.length === 0 &&
      policeReportFiles.length === 0
    ) {
      setFormError(text.validation.uploadsRequired);
      return;
    }

    if (!window.confirm(text.confirmMessage)) {
      return;
    }

    startTransition(async () => {
      const result = await submitOwnerStolenReport(registrationId, safeLang, {
        policeReportNumber,
        incidentDate,
        incidentCountry,
        incidentDescription,
        evidenceFiles: supportingDocuments,
        policeReportFiles,
      });

      if (!result.success) {
        setFormError(result.message);
        return;
      }

      if (result.refresh) {
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {text.fields.policeReportNumber}
          </span>
          <input
            type="text"
            value={policeReportNumber}
            onChange={(event) => setPoliceReportNumber(event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-zinc-700">
            {text.fields.incidentDate}
          </span>
          <input
            type="date"
            value={incidentDate}
            onChange={(event) => setIncidentDate(event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">
            {text.fields.incidentCountry}
          </span>
          <SearchableCountrySelect
            id="owner-incident-country"
            lang={safeLang}
            value={incidentCountry}
            placeholder={text.fields.incidentCountryPlaceholder}
            onChange={setIncidentCountry}
            className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-zinc-700">
            {text.fields.incidentDescription}
          </span>
          <textarea
            value={incidentDescription}
            onChange={(event) => setIncidentDescription(event.target.value)}
            rows={4}
            placeholder={text.fields.incidentDescriptionPlaceholder}
            className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900">
              {text.fields.supportingDocuments}
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              {text.fields.supportingDocumentsDescription}
            </p>
            <p className="mt-2 text-xs text-zinc-500">{uploadText.privacyNote}</p>
          </div>

          <div className="lg:w-[440px]">
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="owner-stolen-supporting-documents"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                {uploading
                  ? uploadText.uploading
                  : supportingDocuments.length > 0
                  ? uploadText.addFiles
                  : uploadText.chooseFile}
              </label>

              <input
                id="owner-stolen-supporting-documents"
                type="file"
                multiple
                accept={ALLOWED_UPLOAD_ACCEPT}
                className="hidden"
                onChange={(event) => {
                  void handleUpload(
                    "stolen_supporting_document",
                    event.target.files
                  );
                  event.currentTarget.value = "";
                }}
              />

              {supportingDocuments.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setSupportingDocuments([]);
                    setUploadError("");
                  }}
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
                >
                  {uploadText.clearFiles}
                </button>
              ) : null}
            </div>

            <p className="mt-3 text-xs text-zinc-500">{uploadText.sizeHelp}</p>

            <div className="mt-4">
              {supportingDocuments.length > 0 ? (
                <ul className="space-y-2">
                  {supportingDocuments.map((file) => (
                    <li
                      key={file.id}
                      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                    >
                      {file.originalName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">{uploadText.noFileSelected}</p>
              )}
            </div>

            {uploadError ? (
              <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {uploadError}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900">
              {actionText.policeFilesTitle}
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              {actionText.policeFilesDescription}
            </p>
            <p className="mt-2 text-xs text-zinc-500">{uploadText.privacyNote}</p>
          </div>

          <div className="lg:w-[440px]">
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="owner-stolen-police-report-files"
                className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
              >
                {uploading
                  ? uploadText.uploading
                  : policeReportFiles.length > 0
                  ? uploadText.addFiles
                  : uploadText.chooseFile}
              </label>

              <input
                id="owner-stolen-police-report-files"
                type="file"
                multiple
                accept={ALLOWED_UPLOAD_ACCEPT}
                className="hidden"
                onChange={(event) => {
                  void handleUpload("stolen_police_report", event.target.files);
                  event.currentTarget.value = "";
                }}
              />

              {policeReportFiles.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setPoliceReportFiles([]);
                    setUploadError("");
                  }}
                  className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
                >
                  {uploadText.clearFiles}
                </button>
              ) : null}
            </div>

            <p className="mt-3 text-xs text-zinc-500">{uploadText.sizeHelp}</p>

            <div className="mt-4">
              {policeReportFiles.length > 0 ? (
                <ul className="space-y-2">
                  {policeReportFiles.map((file) => (
                    <li
                      key={file.id}
                      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                    >
                      {file.originalName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">{uploadText.noFileSelected}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {formError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="inline-flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? text.processing : text.submit}
        </button>
      </div>
    </form>
  );
}
