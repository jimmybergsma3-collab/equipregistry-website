"use client";

import { useState } from "react";
import {
  RegistrationDocumentKey,
  RegistrationDocumentMap,
  RegistrationDocumentState,
  documentSupportsMultipleFiles,
  getRequiredDocumentsForContext,
} from "@/lib/registry/document-rules";
import { ApplicantType, RegistrationFileStatus } from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";
import { getRegistryUploadText } from "@/lib/i18n/registry-upload";
import { uploadFilesForBucket, ClientUploadError } from "@/lib/registry/client-uploads";
import { ALLOWED_UPLOAD_ACCEPT } from "@/lib/registry/upload-types";

type Props = {
  lang: Lang;
  applicantType: ApplicantType;
  category: string;
  documents: RegistrationDocumentMap;
  onChange: (key: RegistrationDocumentKey, value: RegistrationDocumentState) => void;
  hiddenKeys?: RegistrationDocumentKey[];
};

const TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    required: string;
    optional: string;
    status: string;
    noFileSelected: string;
    chooseFile: string;
    addFiles: string;
    replaceFile: string;
    uploading: string;
    clearFiles: string;
    sizeHelp: string;
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
    noFileSelected: "No files uploaded yet",
    chooseFile: "Choose file",
    addFiles: "Add files",
    replaceFile: "Replace file",
    uploading: "Uploading...",
    clearFiles: "Clear",
    sizeHelp: "PDF, JPG, PNG, or WEBP. Max 10 MB per file.",
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
      "Los documentos requeridos cambian segun el tipo de solicitante y la categoria seleccionada.",
    required: "Obligatorio",
    optional: "Opcional",
    status: "Estado",
    noFileSelected: "Todavia no hay archivos",
    chooseFile: "Seleccionar archivo",
    addFiles: "Anadir archivos",
    replaceFile: "Reemplazar archivo",
    uploading: "Subiendo...",
    clearFiles: "Limpiar",
    sizeHelp: "PDF, JPG, PNG o WEBP. Maximo 10 MB por archivo.",
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
      "Erforderliche Dokumente hangen vom Antragstyp und der gewahlten Kategorie ab.",
    required: "Erforderlich",
    optional: "Optional",
    status: "Status",
    noFileSelected: "Noch keine Dateien hochgeladen",
    chooseFile: "Datei auswahlen",
    addFiles: "Dateien hinzufugen",
    replaceFile: "Datei ersetzen",
    uploading: "Wird hochgeladen...",
    clearFiles: "Leeren",
    sizeHelp: "PDF, JPG, PNG oder WEBP. Maximal 10 MB pro Datei.",
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
      "Les documents requis varient selon le type de demandeur et la categorie selectionnee.",
    required: "Obligatoire",
    optional: "Optionnel",
    status: "Statut",
    noFileSelected: "Aucun fichier televerse pour le moment",
    chooseFile: "Choisir un fichier",
    addFiles: "Ajouter des fichiers",
    replaceFile: "Remplacer le fichier",
    uploading: "Televersement...",
    clearFiles: "Effacer",
    sizeHelp: "PDF, JPG, PNG ou WEBP. Maximum 10 Mo par fichier.",
    statuses: {
      missing: "Manquant",
      uploaded: "Televerse",
      accepted: "Accepte",
      rejected: "Rejete",
    },
  },
  it: {
    title: "Documenti di supporto",
    subtitle:
      "I documenti richiesti variano in base al tipo di richiedente e alla categoria selezionata.",
    required: "Obbligatorio",
    optional: "Opzionale",
    status: "Stato",
    noFileSelected: "Nessun file caricato",
    chooseFile: "Scegli file",
    addFiles: "Aggiungi file",
    replaceFile: "Sostituisci file",
    uploading: "Caricamento...",
    clearFiles: "Cancella",
    sizeHelp: "PDF, JPG, PNG o WEBP. Massimo 10 MB per file.",
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
    noFileSelected: "Nog geen bestanden geupload",
    chooseFile: "Bestand kiezen",
    addFiles: "Bestanden toevoegen",
    replaceFile: "Bestand vervangen",
    uploading: "Uploaden...",
    clearFiles: "Wissen",
    sizeHelp: "PDF, JPG, PNG of WEBP. Maximaal 10 MB per bestand.",
    statuses: {
      missing: "Ontbreekt",
      uploaded: "Geupload",
      accepted: "Geaccepteerd",
      rejected: "Afgekeurd",
    },
  },
  pt: {
    title: "Documentos de suporte",
    subtitle:
      "Os documentos necessarios variam conforme o tipo de requerente e a categoria selecionada.",
    required: "Obrigatorio",
    optional: "Opcional",
    status: "Estado",
    noFileSelected: "Ainda nao ha ficheiros carregados",
    chooseFile: "Escolher ficheiro",
    addFiles: "Adicionar ficheiros",
    replaceFile: "Substituir ficheiro",
    uploading: "A carregar...",
    clearFiles: "Limpar",
    sizeHelp: "PDF, JPG, PNG ou WEBP. Maximo 10 MB por ficheiro.",
    statuses: {
      missing: "Em falta",
      uploaded: "Carregado",
      accepted: "Aceite",
      rejected: "Rejeitado",
    },
  },
  ru: {
    title: "Podtverzhdayushchiye dokumenty",
    subtitle:
      "Neobkhodimyye dokumenty zavisyat ot tipa zayavitelya i vybrannoy kategorii.",
    required: "Obyazatelno",
    optional: "Neobyazatelno",
    status: "Status",
    noFileSelected: "Fayly eshche ne zagruzheny",
    chooseFile: "Vybrat fayl",
    addFiles: "Dobavit fayly",
    replaceFile: "Zamenit fayl",
    uploading: "Zagruzka...",
    clearFiles: "Ochistit",
    sizeHelp: "PDF, JPG, PNG ili WEBP. Maksimum 10 MB na fayl.",
    statuses: {
      missing: "Otsutstvuet",
      uploaded: "Zagruzhen",
      accepted: "Prinyat",
      rejected: "Otkлонен",
    },
  },
  zh: {
    title: "Zhichi wenjian",
    subtitle: "Suoxu wenjian hui genju shenqingren leixing he leibie bianhua.",
    required: "Bixu",
    optional: "Kexuan",
    status: "Zhuangtai",
    noFileSelected: "Shangwei shangchuan wenjian",
    chooseFile: "Xuanze wenjian",
    addFiles: "Tianjia wenjian",
    replaceFile: "Tihuan wenjian",
    uploading: "Shangchuan zhong...",
    clearFiles: "Qingchu",
    sizeHelp: "PDF, JPG, PNG huo WEBP. Meige wenjian zui duo 10 MB.",
    statuses: {
      missing: "Que失",
      uploaded: "Yi shangchuan",
      accepted: "Yi jieshou",
      rejected: "Yi jujue",
    },
  },
  hi: {
    title: "Sahayak dastavez",
    subtitle:
      "Zaruri dastavez applicant type aur chuni hui category ke hisab se badalte hain.",
    required: "Zaruri",
    optional: "Vikalpik",
    status: "Sthiti",
    noFileSelected: "Abhi tak koi dastavez upload nahin hua",
    chooseFile: "Dastavez chunen",
    addFiles: "Dastavez joden",
    replaceFile: "Dastavez badlen",
    uploading: "Bheja ja raha hai...",
    clearFiles: "Saf karen",
    sizeHelp: "PDF, JPG, PNG, ya WEBP. Har dastavez 10 MB se chhota hona chahiye.",
    statuses: {
      missing: "Anupasthit",
      uploaded: "Bheja gaya",
      accepted: "Sweekrit",
      rejected: "Asweekrit",
    },
  },
  ar: {
    title: "Almustanadat aldaeima",
    subtitle:
      "Takhtalif almustanadat almatluba hasab naw muqaddim alttalab walfiea almukhtara.",
    required: "Ilzami",
    optional: "Ikhtiyari",
    status: "Alhala",
    noFileSelected: "Lam yutam raf eay malafat baed",
    chooseFile: "Ikhtar milafan",
    addFiles: "Idafat malafat",
    replaceFile: "Istibdal alfile",
    uploading: "Jari alraf...",
    clearFiles: "Masah",
    sizeHelp: "PDF, JPG, PNG aw WEBP. Alhadd alaqsa 10 MB likulli malaf.",
    statuses: {
      missing: "Mafqud",
      uploaded: "Tam alraf",
      accepted: "Maqbul",
      rejected: "Marfud",
    },
  },

  pl: {
    title: "Dokumenty pomocnicze",
    subtitle:
      "Wymagane dokumenty zmieniaja sie w zaleznosci od typu wnioskodawcy i wybranej kategorii.",
    required: "Wymagane",
    optional: "Opcjonalne",
    status: "Status",
    noFileSelected: "Nie przeslano jeszcze zadnych plikow",
    chooseFile: "Wybierz plik",
    addFiles: "Dodaj pliki",
    replaceFile: "Zamien plik",
    uploading: "Przesylanie...",
    clearFiles: "Wyczysc",
    sizeHelp: "PDF, JPG, PNG lub WEBP. Maks. 10 MB na plik.",
    statuses: {
      missing: "Brak",
      uploaded: "Przeslano",
      accepted: "Zaakceptowano",
      rejected: "Odrzucono",
    },
  },
  sv: {
    title: "Stoddokument",
    subtitle:
      "Vilka dokument som kravs andras beroende pa sokandetyp och vald kategori.",
    required: "Kravs",
    optional: "Valfritt",
    status: "Status",
    noFileSelected: "Inga filer har laddats upp an",
    chooseFile: "Valj fil",
    addFiles: "Lagg till filer",
    replaceFile: "Byt fil",
    uploading: "Laddar upp...",
    clearFiles: "Rensa",
    sizeHelp: "PDF, JPG, PNG eller WEBP. Max 10 MB per fil.",
    statuses: {
      missing: "Saknas",
      uploaded: "Uppladdad",
      accepted: "Godkand",
      rejected: "Avvisad",
    },
  },
  da: {
    title: "Understottende dokumenter",
    subtitle:
      "De kravede dokumenter aendres alt efter ansogertype og valgt kategori.",
    required: "Paakraevet",
    optional: "Valgfrit",
    status: "Status",
    noFileSelected: "Ingen filer er uploadet endnu",
    chooseFile: "Vaelg fil",
    addFiles: "Tilfoj filer",
    replaceFile: "Erstat fil",
    uploading: "Uploader...",
    clearFiles: "Ryd",
    sizeHelp: "PDF, JPG, PNG eller WEBP. Maks. 10 MB pr. fil.",
    statuses: {
      missing: "Mangler",
      uploaded: "Uploadet",
      accepted: "Godkendt",
      rejected: "Afvist",
    },
  },
  no: {
    title: "Stottedokumenter",
    subtitle:
      "Hvilke dokumenter som kreves endres etter sokertype og valgt kategori.",
    required: "Pakrevd",
    optional: "Valgfritt",
    status: "Status",
    noFileSelected: "Ingen filer er lastet opp ennå",
    chooseFile: "Velg fil",
    addFiles: "Legg til filer",
    replaceFile: "Bytt fil",
    uploading: "Laster opp...",
    clearFiles: "Tomm",
    sizeHelp: "PDF, JPG, PNG eller WEBP. Maks 10 MB per fil.",
    statuses: {
      missing: "Mangler",
      uploaded: "Lastet opp",
      accepted: "Godkjent",
      rejected: "Avvist",
    },
  },};

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
  hiddenKeys = [],
}: Props) {
  const text = TEXT[lang];
  const uploadText = getRegistryUploadText(lang);
  const requiredDocuments = getRequiredDocumentsForContext(applicantType, category, lang)
    .filter((document) => !hiddenKeys.includes(document.key));
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (requiredDocuments.length === 0) {
    return null;
  }

  async function uploadFiles(key: RegistrationDocumentKey, files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }

    const selectedFiles = Array.from(files);

    setUploadingKey(key);
    setErrors((prev) => ({ ...prev, [key]: "" }));

    try {
      const uploads = await uploadFilesForBucket(key, selectedFiles);

      const current = documents[key] ?? { status: "missing" as const, files: [] };
      const nextFiles = documentSupportsMultipleFiles(key)
        ? [...(current.files ?? []), ...uploads]
        : [...uploads];

      onChange(key, {
        status: "uploaded",
        fileName: nextFiles[0]?.originalName ?? "",
        files: nextFiles,
      });
    } catch (error) {
      const localizedError =
        error instanceof ClientUploadError &&
        (error.code === "file_too_large" || error.code === "invalid_file_type")
          ? uploadText.sizeHelp
          : uploadText.uploadFailed;

      setErrors((prev) => ({
        ...prev,
        [key]: localizedError,
      }));
    } finally {
      setUploadingKey(null);
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-zinc-900">{text.title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{text.subtitle}</p>
        <p className="mt-2 text-xs text-zinc-500">{uploadText.privacyNote}</p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((doc) => {
          const current = documents[doc.key] ?? {
            status: "missing" as const,
            files: [],
          };
          const optionalMissing = !doc.required && current.status === "missing";
          const badgeClass = optionalMissing
            ? "border border-zinc-200 bg-white text-zinc-600"
            : getStatusClasses(current.status);
          const statusLabel = optionalMissing
            ? lang === "nl"
              ? "Niet toegevoegd"
              : text.optional
            : text.statuses[current.status];
          const inputId = `document-upload-${doc.key}`;
          const multiple = documentSupportsMultipleFiles(doc.key);

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
                      {statusLabel}
                    </span>
                  </div>

                  {doc.description ? (
                    <p className="mt-2 text-sm text-zinc-600">
                      {doc.description}
                    </p>
                  ) : null}
                </div>

                <div className="lg:w-[440px]">
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor={inputId}
                      className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                    >
                      {uploadingKey === doc.key
                        ? uploadText.uploading
                        : current.files && current.files.length > 0
                        ? multiple
                          ? uploadText.addFiles
                          : uploadText.replaceFile
                        : uploadText.chooseFile}
                    </label>

                    <input
                      id={inputId}
                      type="file"
                      multiple={multiple}
                      accept={ALLOWED_UPLOAD_ACCEPT}
                      className="hidden"
                      onChange={(event) => {
                        void uploadFiles(doc.key, event.target.files);
                        event.currentTarget.value = "";
                      }}
                    />

                    {current.files && current.files.length > 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          onChange(doc.key, {
                            status: "missing",
                            fileName: "",
                            files: [],
                          })
                        }
                        className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
                      >
                        {uploadText.clearFiles}
                      </button>
                    ) : null}
                  </div>

                  <p className="mt-3 text-xs text-zinc-500">{uploadText.sizeHelp}</p>

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-zinc-900">
                      {text.status}
                    </p>

                    {current.files && current.files.length > 0 ? (
                      <ul className="space-y-2">
                        {current.files.map((file) => (
                          <li
                            key={file.id}
                            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                          >
                            {file.originalName}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-zinc-500">
                        {uploadText.noFileSelected}
                      </p>
                    )}
                  </div>

                  {errors[doc.key] ? (
                    <p className="mt-3 text-sm text-red-600">{errors[doc.key]}</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
