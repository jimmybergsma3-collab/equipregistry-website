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
    noFileSelected: string;
    chooseFile: string;
    replaceFile: string;
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
    noFileSelected: "No file selected",
    chooseFile: "Choose file",
    replaceFile: "Replace file",
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
    noFileSelected: "Ningún archivo seleccionado",
    chooseFile: "Seleccionar archivo",
    replaceFile: "Reemplazar archivo",
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
    noFileSelected: "Keine Datei ausgewählt",
    chooseFile: "Datei auswählen",
    replaceFile: "Datei ersetzen",
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
    noFileSelected: "Aucun fichier sélectionné",
    chooseFile: "Choisir un fichier",
    replaceFile: "Remplacer le fichier",
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
    noFileSelected: "Nessun file selezionato",
    chooseFile: "Scegli file",
    replaceFile: "Sostituisci file",
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
    noFileSelected: "Geen bestand geselecteerd",
    chooseFile: "Bestand kiezen",
    replaceFile: "Bestand vervangen",
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
    noFileSelected: "Nenhum ficheiro selecionado",
    chooseFile: "Escolher ficheiro",
    replaceFile: "Substituir ficheiro",
    statuses: {
      missing: "Em falta",
      uploaded: "Carregado",
      accepted: "Aceite",
      rejected: "Rejeitado",
    },
  },
  ru: {
    title: "Подтверждающие документы",
    subtitle:
      "Необходимые документы зависят от типа заявителя и выбранной категории.",
    required: "Обязательно",
    optional: "Необязательно",
    status: "Статус",
    fileName: "Имя файла",
    noFileSelected: "Файл не выбран",
    chooseFile: "Выбрать файл",
    replaceFile: "Заменить файл",
    statuses: {
      missing: "Отсутствует",
      uploaded: "Загружен",
      accepted: "Принят",
      rejected: "Отклонён",
    },
  },
  zh: {
    title: "支持文件",
    subtitle: "所需文件会根据申请人类型和所选类别而变化。",
    required: "必填",
    optional: "可选",
    status: "状态",
    fileName: "文件名",
    noFileSelected: "未选择文件",
    chooseFile: "选择文件",
    replaceFile: "替换文件",
    statuses: {
      missing: "缺失",
      uploaded: "已上传",
      accepted: "已接受",
      rejected: "已拒绝",
    },
  },
  hi: {
    title: "सहायक दस्तावेज़",
    subtitle:
      "आवश्यक दस्तावेज़ आवेदक के प्रकार और चुनी गई श्रेणी के आधार पर बदलते हैं।",
    required: "अनिवार्य",
    optional: "वैकल्पिक",
    status: "स्थिति",
    fileName: "फ़ाइल नाम",
    noFileSelected: "कोई फ़ाइल चयनित नहीं",
    chooseFile: "फ़ाइल चुनें",
    replaceFile: "फ़ाइल बदलें",
    statuses: {
      missing: "अनुपस्थित",
      uploaded: "अपलोड किया गया",
      accepted: "स्वीकृत",
      rejected: "अस्वीकृत",
    },
  },
  ar: {
    title: "المستندات الداعمة",
    subtitle:
      "تختلف المستندات المطلوبة حسب نوع مقدم الطلب والفئة المختارة.",
    required: "إلزامي",
    optional: "اختياري",
    status: "الحالة",
    fileName: "اسم الملف",
    noFileSelected: "لم يتم اختيار ملف",
    chooseFile: "اختر ملفًا",
    replaceFile: "استبدال الملف",
    statuses: {
      missing: "مفقود",
      uploaded: "تم الرفع",
      accepted: "مقبول",
      rejected: "مرفوض",
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
  const requiredDocuments = getRequiredDocumentsForContext(
  applicantType,
  category,
  lang
);

  if (requiredDocuments.length === 0) return null;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-zinc-900">{text.title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{text.subtitle}</p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const current = documents[doc.key] ?? { status: "missing" as const };
          const badgeClass = getStatusClasses(current.status);
          const inputId = `document-upload-${doc.key}`;

          return (
            <div
              key={doc.key}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900">
                      {doc.label}
                    </p>

                    <span className="inline-flex rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600">
                      {doc.required ? text.required : text.optional}
                    </span>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}
                    >
                      {text.statuses[current.status]}
                    </span>
                  </div>

                  {doc.description ? (
                    <p className="mt-2 text-sm text-zinc-600">
                      {doc.description}
                    </p>
                  ) : null}
                </div>

                <div className="lg:w-[420px]">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      {text.fileName}
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label
                        htmlFor={inputId}
                        className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                      >
                        {current.fileName ? text.replaceFile : text.chooseFile}
                      </label>

                      <input
                        id={inputId}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) {
                            onChange(doc.key, {
                              ...current,
                              status: "missing",
                              fileName: "",
                            });
                            return;
                          }

                          onChange(doc.key, {
                            ...current,
                            status: "uploaded",
                            fileName: file.name,
                          });
                        }}
                      />

                      <span className="min-w-0 truncate text-sm text-zinc-600">
                        {current.fileName || text.noFileSelected}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="mb-2 block text-sm font-medium text-zinc-900">
                      {text.status}
                    </label>
                    <div
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}
                    >
                      {text.statuses[current.status]}
                    </div>
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