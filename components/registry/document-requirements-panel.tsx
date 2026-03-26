// components/registry/document-requirements-panel.tsx

"use client";

import {
  RegistrationDocumentMap,
  RegistrationDocumentState,
  getRequiredDocumentsForContext,
} from "@/lib/registry/document-rules";
import { ApplicantType, RegistrationFileStatus } from "@/lib/registry/workflow";

type Props = {
  applicantType: ApplicantType;
  category: string;
  documents: RegistrationDocumentMap;
  onChange: (key: string, value: RegistrationDocumentState) => void;
};

const DOCUMENT_STATUS_OPTIONS: Array<{
  value: RegistrationFileStatus;
  label: string;
}> = [
  { value: "missing", label: "Missing" },
  { value: "uploaded", label: "Uploaded" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

function getStatusClasses(status: RegistrationFileStatus) {
  switch (status) {
    case "accepted":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "uploaded":
      return "border border-sky-200 bg-sky-50 text-sky-700";
    case "rejected":
      return "border border-red-200 bg-red-50 text-red-700";
    case "missing":
    default:
      return "border border-amber-200 bg-amber-50 text-amber-700";
  }
}

export default function DocumentRequirementsPanel({
  applicantType,
  category,
  documents,
  onChange,
}: Props) {
  const requiredDocuments = getRequiredDocumentsForContext(applicantType, category);

  if (requiredDocuments.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-zinc-900">
          Supporting documents
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          Required documents change based on applicant type and selected category.
        </p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const current = documents[doc.key] ?? { status: "missing" as const };
          const badgeClass = getStatusClasses(current.status);

          return (
            <div
              key={doc.key}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900">
                      {doc.label}
                    </p>

                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        doc.required
                          ? "border border-red-200 bg-red-50 text-red-700"
                          : "border border-zinc-200 bg-white text-zinc-600",
                      ].join(" ")}
                    >
                      {doc.required ? "Required" : "Optional"}
                    </span>

                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        badgeClass,
                      ].join(" ")}
                    >
                      {current.status}
                    </span>
                  </div>

                  {doc.description ? (
                    <p className="mt-2 text-sm text-zinc-600">
                      {doc.description}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      Status
                    </label>
                    <select
                      value={current.status}
                      onChange={(e) =>
                        onChange(doc.key, {
                          ...current,
                          status: e.target.value as RegistrationFileStatus,
                        })
                      }
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                    >
                      {DOCUMENT_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      File name
                    </label>
                    <input
                      type="text"
                      value={current.fileName ?? ""}
                      onChange={(e) =>
                        onChange(doc.key, {
                          ...current,
                          fileName: e.target.value,
                        })
                      }
                      placeholder="example-file.pdf"
                      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}