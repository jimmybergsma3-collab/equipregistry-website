"use client";

import {
  RegistrationDocumentMap,
  RegistrationDocumentState,
  getRequiredDocumentsForContext,
} from "@/lib/registry/document-rules";
import { ApplicantType, RegistrationFileStatus } from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
  applicantType: ApplicantType;
  category: string;
  documents: RegistrationDocumentMap;
  onChange: (key: string, value: RegistrationDocumentState) => void;
};

const TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    required: string;
    optional: string;
    status: string;
    fileName: string;
    placeholder: string;
    statuses: Record<RegistrationFileStatus, string>;
  }
> = {
  en: {
    title: "Supporting documents",
    subtitle:
      "Required documents change based on applicant type and selected category.",
    required: "Required",
    optional: "Optional",
    status: "Status",
    fileName: "File name",
    placeholder: "example-file.pdf",
    statuses: {
      missing: "Missing",
      uploaded: "Uploaded",
      accepted: "Accepted",
      rejected: "Rejected",
    },
  },
  es: {
    title: "Documentos de soporte",
    subtitle:
      "Los documentos requeridos cambian según el tipo de solicitante y la categoría seleccionada.",
    required: "Obligatorio",
    optional: "Opcional",
    status: "Estado",
    fileName: "Nombre del archivo",
    placeholder: "ejemplo-archivo.pdf",
    statuses: {
      missing: "Falta",
      uploaded: "Subido",
      accepted: "Aceptado",
      rejected: "Rechazado",
    },
  },
  de: {
    title: "Unterlagen",
    subtitle:
      "Erforderliche Dokumente hängen vom Antragstyp und der gewählten Kategorie ab.",
    required: "Erforderlich",
    optional: "Optional",
    status: "Status",
    fileName: "Dateiname",
    placeholder: "beispiel-datei.pdf",
    statuses: {
      missing: "Fehlt",
      uploaded: "Hochgeladen",
      accepted: "Akzeptiert",
      rejected: "Abgelehnt",
    },
  },
  fr: {
    title: "Documents justificatifs",
    subtitle:
      "Les documents requis varient selon le type de demandeur et la catégorie sélectionnée.",
    required: "Obligatoire",
    optional: "Optionnel",
    status: "Statut",
    fileName: "Nom du fichier",
    placeholder: "exemple-fichier.pdf",
    statuses: {
      missing: "Manquant",
      uploaded: "Téléversé",
      accepted: "Accepté",
      rejected: "Rejeté",
    },
  },
  it: {
    title: "Documenti di supporto",
    subtitle:
      "I documenti richiesti variano in base al tipo di richiedente e alla categoria selezionata.",
    required: "Obbligatorio",
    optional: "Opzionale",
    status: "Stato",
    fileName: "Nome file",
    placeholder: "esempio-file.pdf",
    statuses: {
      missing: "Mancante",
      uploaded: "Caricato",
      accepted: "Accettato",
      rejected: "Rifiutato",
    },
  },
  nl: {
    title: "Ondersteunende documenten",
    subtitle:
      "Vereiste documenten veranderen op basis van het type aanvrager en de gekozen categorie.",
    required: "Verplicht",
    optional: "Optioneel",
    status: "Status",
    fileName: "Bestandsnaam",
    placeholder: "voorbeeld-bestand.pdf",
    statuses: {
      missing: "Ontbreekt",
      uploaded: "Geüpload",
      accepted: "Geaccepteerd",
      rejected: "Afgekeurd",
    },
  },
  pt: {
    title: "Documentos de suporte",
    subtitle:
      "Os documentos necessários variam conforme o tipo de requerente e a categoria selecionada.",
    required: "Obrigatório",
    optional: "Opcional",
    status: "Estado",
    fileName: "Nome do ficheiro",
    placeholder: "exemplo-ficheiro.pdf",
    statuses: {
      missing: "Em falta",
      uploaded: "Carregado",
      accepted: "Aceite",
      rejected: "Rejeitado",
    },
  },
};

function getStatusClasses(status: RegistrationFileStatus) {
  switch (status) {
    case "accepted":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "uploaded":
      return "border border-sky-200 bg-sky-50 text-sky-700";
    case "rejected":
      return "border border-red-200 bg-red-50 text-red-700";
    default:
      return "border border-amber-200 bg-amber-50 text-amber-700";
  }
}

export default function DocumentRequirementsPanel({
  lang,
  applicantType,
  category,
  documents,
  onChange,
}: Props) {
  const text = TEXT[lang];
  const requiredDocuments = getRequiredDocumentsForContext(applicantType, category);

  if (requiredDocuments.length === 0) return null;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-zinc-900">
          {text.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          {text.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const current = documents[doc.key] ?? { status: "missing" as const };
          const badgeClass = getStatusClasses(current.status);

          return (
            <div key={doc.key} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900">
                      {doc.label}
                    </p>

                    <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium border border-zinc-200 bg-white text-zinc-600">
                      {doc.required ? text.required : text.optional}
                    </span>

                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}>
                      {text.statuses[current.status]}
                    </span>
                  </div>

                  {doc.description && (
                    <p className="mt-2 text-sm text-zinc-600">
                      {doc.description}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:w-[420px]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      {text.status}
                    </label>
                    <select
                      value={current.status}
                      onChange={(e) =>
                        onChange(doc.key, {
                          ...current,
                          status: e.target.value as RegistrationFileStatus,
                        })
                      }
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm"
                    >
                      {Object.entries(text.statuses).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      {text.fileName}
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
                      placeholder={text.placeholder}
                      className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm"
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