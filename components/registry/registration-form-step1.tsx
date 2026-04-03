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
  requiresDirectPayment,
} from "@/lib/registry/workflow";
import { RegistrationDocumentState } from "@/lib/registry/document-rules";
import {
  saveRegistrationDraft,
  submitRegistrationRequest,
} from "@/app/[lang]/dashboard/register/actions";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
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

const FORM_TEXT: Record<
  Lang,
  {
    foundationTitle: string;
    foundationText: string;
    applicantType: string;
    assetName: string;
    assetNamePlaceholder: string;
    brand: string;
    brandPlaceholder: string;
    model: string;
    modelPlaceholder: string;
    serialNumber: string;
    serialNumberPlaceholder: string;
    year: string;
    yearPlaceholder: string;
    country: string;
    countryPlaceholder: string;
    ownerName: string;
    ownerNamePlaceholder: string;
    ownerEmail: string;
    ownerEmailPlaceholder: string;
    declaration: string;
    workflowTitle: string;
    workflowStatus: string;
    retailPaymentNote: string;
    partnerNote: string;
    saveDraft: string;
    saving: string;
    submitting: string;
    createRequest: string;
    submitRegistration: string;
    applicantTypeLabels: Record<ApplicantType, string>;
  }
> = {
  en: {
    foundationTitle: "Registration foundation",
    foundationText:
      "Complete all required data before the request can move to payment or submission.",
    applicantType: "Applicant Type",
    assetName: "Asset Name",
    assetNamePlaceholder: "e.g. Opel Corsa / Komatsu WA380",
    brand: "Brand",
    brandPlaceholder: "e.g. Opel",
    model: "Model",
    modelPlaceholder: "e.g. Corsa",
    serialNumber: "Serial Number / Main ID",
    serialNumberPlaceholder: "Enter serial number or main identifier",
    year: "Year",
    yearPlaceholder: "e.g. 2019",
    country: "Country",
    countryPlaceholder: "e.g. Spain",
    ownerName: "Owner Name",
    ownerNamePlaceholder: "Full legal owner name",
    ownerEmail: "Owner Email",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "I confirm that the submitted data is complete and may be processed for registration assessment.",
    workflowTitle: "Workflow result",
    workflowStatus: "Current internal request status:",
    retailPaymentNote:
      "Retail and SME applicants must pay before final submission.",
    partnerNote: "Partner applicant type can submit directly.",
    saveDraft: "Save draft",
    saving: "Saving...",
    submitting: "Submitting...",
    createRequest: "Create request",
    submitRegistration: "Submit registration",
    applicantTypeLabels: {
      private: "Private",
      sme: "SME",
      insurer_partner: "Insurer Partner",
      bank_partner: "Bank Partner",
      dealer_partner: "Dealer Partner",
      rental_partner: "Rental Partner",
    },
  },
  es: {
    foundationTitle: "Base del registro",
    foundationText:
      "Complete todos los datos obligatorios antes de que la solicitud pueda pasar al pago o al envío.",
    applicantType: "Tipo de solicitante",
    assetName: "Nombre del activo",
    assetNamePlaceholder: "p. ej. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "p. ej. Opel",
    model: "Modelo",
    modelPlaceholder: "p. ej. Corsa",
    serialNumber: "Número de serie / ID principal",
    serialNumberPlaceholder: "Introduzca el número de serie o identificador principal",
    year: "Año",
    yearPlaceholder: "p. ej. 2019",
    country: "País",
    countryPlaceholder: "p. ej. España",
    ownerName: "Nombre del propietario",
    ownerNamePlaceholder: "Nombre legal completo del propietario",
    ownerEmail: "Correo del propietario",
    ownerEmailPlaceholder: "nombre@ejemplo.com",
    declaration:
      "Confirmo que los datos enviados están completos y pueden ser procesados para la evaluación del registro.",
    workflowTitle: "Resultado del flujo",
    workflowStatus: "Estado interno actual de la solicitud:",
    retailPaymentNote:
      "Los usuarios particulares y las pymes deben pagar antes del envío final.",
    partnerNote: "El tipo de solicitante socio puede enviar directamente.",
    saveDraft: "Guardar borrador",
    saving: "Guardando...",
    submitting: "Enviando...",
    createRequest: "Crear solicitud",
    submitRegistration: "Enviar registro",
    applicantTypeLabels: {
      private: "Particular",
      sme: "PYME",
      insurer_partner: "Socio asegurador",
      bank_partner: "Socio bancario",
      dealer_partner: "Socio distribuidor",
      rental_partner: "Socio de alquiler",
    },
  },
  de: {
    foundationTitle: "Registrierungsgrundlage",
    foundationText:
      "Vervollständigen Sie alle Pflichtdaten, bevor die Anfrage zur Zahlung oder Einreichung übergehen kann.",
    applicantType: "Antragstellertyp",
    assetName: "Asset-Name",
    assetNamePlaceholder: "z. B. Opel Corsa / Komatsu WA380",
    brand: "Marke",
    brandPlaceholder: "z. B. Opel",
    model: "Modell",
    modelPlaceholder: "z. B. Corsa",
    serialNumber: "Seriennummer / Haupt-ID",
    serialNumberPlaceholder: "Seriennummer oder Hauptkennzeichen eingeben",
    year: "Jahr",
    yearPlaceholder: "z. B. 2019",
    country: "Land",
    countryPlaceholder: "z. B. Spanien",
    ownerName: "Name des Eigentümers",
    ownerNamePlaceholder: "Vollständiger rechtlicher Name des Eigentümers",
    ownerEmail: "E-Mail des Eigentümers",
    ownerEmailPlaceholder: "name@beispiel.com",
    declaration:
      "Ich bestätige, dass die übermittelten Daten vollständig sind und für die Registrierungsprüfung verarbeitet werden dürfen.",
    workflowTitle: "Workflow-Ergebnis",
    workflowStatus: "Aktueller interner Anfragestatus:",
    retailPaymentNote:
      "Privatkunden und KMU müssen vor der endgültigen Einreichung bezahlen.",
    partnerNote: "Partnertypen können direkt einreichen.",
    saveDraft: "Entwurf speichern",
    saving: "Speichern...",
    submitting: "Wird eingereicht...",
    createRequest: "Anfrage erstellen",
    submitRegistration: "Registrierung einreichen",
    applicantTypeLabels: {
      private: "Privat",
      sme: "KMU",
      insurer_partner: "Versicherungspartner",
      bank_partner: "Bankpartner",
      dealer_partner: "Händlerpartner",
      rental_partner: "Vermietpartner",
    },
  },
  fr: {
    foundationTitle: "Base de l’enregistrement",
    foundationText:
      "Complétez toutes les données requises avant que la demande puisse passer au paiement ou à l’envoi.",
    applicantType: "Type de demandeur",
    assetName: "Nom de l’actif",
    assetNamePlaceholder: "ex. Opel Corsa / Komatsu WA380",
    brand: "Marque",
    brandPlaceholder: "ex. Opel",
    model: "Modèle",
    modelPlaceholder: "ex. Corsa",
    serialNumber: "Numéro de série / ID principal",
    serialNumberPlaceholder: "Entrez le numéro de série ou l’identifiant principal",
    year: "Année",
    yearPlaceholder: "ex. 2019",
    country: "Pays",
    countryPlaceholder: "ex. Espagne",
    ownerName: "Nom du propriétaire",
    ownerNamePlaceholder: "Nom légal complet du propriétaire",
    ownerEmail: "E-mail du propriétaire",
    ownerEmailPlaceholder: "nom@exemple.com",
    declaration:
      "Je confirme que les données soumises sont complètes et peuvent être traitées pour l’évaluation de l’enregistrement.",
    workflowTitle: "Résultat du workflow",
    workflowStatus: "Statut interne actuel de la demande :",
    retailPaymentNote:
      "Les utilisateurs particuliers et PME doivent payer avant l’envoi final.",
    partnerNote: "Les partenaires approuvés peuvent soumettre directement.",
    saveDraft: "Enregistrer le brouillon",
    saving: "Enregistrement...",
    submitting: "Envoi...",
    createRequest: "Créer la demande",
    submitRegistration: "Soumettre l’enregistrement",
    applicantTypeLabels: {
      private: "Particulier",
      sme: "PME",
      insurer_partner: "Partenaire assureur",
      bank_partner: "Partenaire bancaire",
      dealer_partner: "Partenaire distributeur",
      rental_partner: "Partenaire location",
    },
  },
  it: {
    foundationTitle: "Base della registrazione",
    foundationText:
      "Completa tutti i dati obbligatori prima che la richiesta possa passare al pagamento o all’invio.",
    applicantType: "Tipo di richiedente",
    assetName: "Nome dell’asset",
    assetNamePlaceholder: "es. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "es. Opel",
    model: "Modello",
    modelPlaceholder: "es. Corsa",
    serialNumber: "Numero di serie / ID principale",
    serialNumberPlaceholder: "Inserisci numero di serie o identificativo principale",
    year: "Anno",
    yearPlaceholder: "es. 2019",
    country: "Paese",
    countryPlaceholder: "es. Spagna",
    ownerName: "Nome del proprietario",
    ownerNamePlaceholder: "Nome legale completo del proprietario",
    ownerEmail: "Email del proprietario",
    ownerEmailPlaceholder: "nome@esempio.com",
    declaration:
      "Confermo che i dati inviati sono completi e possono essere trattati per la valutazione della registrazione.",
    workflowTitle: "Risultato del workflow",
    workflowStatus: "Stato interno attuale della richiesta:",
    retailPaymentNote:
      "Gli utenti privati e le PMI devono pagare prima dell’invio finale.",
    partnerNote: "I partner approvati possono inviare direttamente.",
    saveDraft: "Salva bozza",
    saving: "Salvataggio...",
    submitting: "Invio...",
    createRequest: "Crea richiesta",
    submitRegistration: "Invia registrazione",
    applicantTypeLabels: {
      private: "Privato",
      sme: "PMI",
      insurer_partner: "Partner assicurativo",
      bank_partner: "Partner bancario",
      dealer_partner: "Partner rivenditore",
      rental_partner: "Partner noleggio",
    },
  },
  nl: {
    foundationTitle: "Registratiebasis",
    foundationText:
      "Vul alle verplichte gegevens in voordat de aanvraag naar betaling of indiening kan doorgaan.",
    applicantType: "Type aanvrager",
    assetName: "Naam van het asset",
    assetNamePlaceholder: "bijv. Opel Corsa / Komatsu WA380",
    brand: "Merk",
    brandPlaceholder: "bijv. Opel",
    model: "Model",
    modelPlaceholder: "bijv. Corsa",
    serialNumber: "Serienummer / hoofd-ID",
    serialNumberPlaceholder: "Voer serienummer of hoofdidentificatie in",
    year: "Bouwjaar",
    yearPlaceholder: "bijv. 2019",
    country: "Land",
    countryPlaceholder: "bijv. Spanje",
    ownerName: "Naam eigenaar",
    ownerNamePlaceholder: "Volledige juridische naam van de eigenaar",
    ownerEmail: "E-mail eigenaar",
    ownerEmailPlaceholder: "naam@voorbeeld.com",
    declaration:
      "Ik bevestig dat de ingediende gegevens compleet zijn en verwerkt mogen worden voor de registratiebeoordeling.",
    workflowTitle: "Workflowresultaat",
    workflowStatus: "Huidige interne aanvraagstatus:",
    retailPaymentNote:
      "Particulieren en mkb-aanvragers moeten betalen vóór definitieve indiening.",
    partnerNote: "Partnertypes kunnen direct indienen.",
    saveDraft: "Concept opslaan",
    saving: "Opslaan...",
    submitting: "Indienen...",
    createRequest: "Aanvraag aanmaken",
    submitRegistration: "Registratie indienen",
    applicantTypeLabels: {
      private: "Particulier",
      sme: "MKB",
      insurer_partner: "Verzekeringspartner",
      bank_partner: "Bankpartner",
      dealer_partner: "Dealerpartner",
      rental_partner: "Verhuurpartner",
    },
  },
  pt: {
    foundationTitle: "Base do registo",
    foundationText:
      "Complete todos os dados obrigatórios antes de o pedido poder avançar para pagamento ou submissão.",
    applicantType: "Tipo de requerente",
    assetName: "Nome do ativo",
    assetNamePlaceholder: "ex. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "ex. Opel",
    model: "Modelo",
    modelPlaceholder: "ex. Corsa",
    serialNumber: "Número de série / ID principal",
    serialNumberPlaceholder: "Introduza o número de série ou identificador principal",
    year: "Ano",
    yearPlaceholder: "ex. 2019",
    country: "País",
    countryPlaceholder: "ex. Espanha",
    ownerName: "Nome do proprietário",
    ownerNamePlaceholder: "Nome legal completo do proprietário",
    ownerEmail: "Email do proprietário",
    ownerEmailPlaceholder: "nome@exemplo.com",
    declaration:
      "Confirmo que os dados submetidos estão completos e podem ser tratados para avaliação do registo.",
    workflowTitle: "Resultado do fluxo",
    workflowStatus: "Estado interno atual do pedido:",
    retailPaymentNote:
      "Utilizadores particulares e PME devem pagar antes da submissão final.",
    partnerNote: "Os parceiros aprovados podem submeter diretamente.",
    saveDraft: "Guardar rascunho",
    saving: "A guardar...",
    submitting: "A submeter...",
    createRequest: "Criar pedido",
    submitRegistration: "Submeter registo",
    applicantTypeLabels: {
      private: "Particular",
      sme: "PME",
      insurer_partner: "Parceiro segurador",
      bank_partner: "Parceiro bancário",
      dealer_partner: "Parceiro revendedor",
      rental_partner: "Parceiro de aluguer",
    },
  },
};

export default function RegistrationFormStep1({
  lang,
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

  const text = FORM_TEXT[lang];

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
              {text.foundationTitle}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              {text.foundationText}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="applicantType" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.applicantType}
              </label>
              <select
                id="applicantType"
                value={draft.applicantType}
                onChange={(e) => handleApplicantTypeChange(e.target.value as ApplicantType)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              >
                {APPLICANT_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {text.applicantTypeLabels[option]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="assetName" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.assetName}
              </label>
              <input
                id="assetName"
                type="text"
                value={draft.assetName}
                onChange={(e) => updateField("assetName", e.target.value)}
                placeholder={text.assetNamePlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>
          </div>

          <div className="mt-5">
            <CategorySelects
  lang={lang}
  category={draft.category}
  subcategory={draft.subcategory}
  onCategoryChange={handleCategoryChange}
  onSubcategoryChange={handleSubcategoryChange}
/>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="brand" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.brand}
              </label>
              <input
                id="brand"
                type="text"
                value={draft.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                placeholder={text.brandPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="model" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.model}
              </label>
              <input
                id="model"
                type="text"
                value={draft.model}
                onChange={(e) => updateField("model", e.target.value)}
                placeholder={text.modelPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="serialNumber" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.serialNumber}
              </label>
              <input
                id="serialNumber"
                type="text"
                value={draft.serialNumber}
                onChange={(e) => updateField("serialNumber", e.target.value)}
                placeholder={text.serialNumberPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="year" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.year}
              </label>
              <input
                id="year"
                type="text"
                value={draft.year ?? ""}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder={text.yearPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.country}
              </label>
              <input
                id="country"
                type="text"
                value={draft.country ?? ""}
                onChange={(e) => updateField("country", e.target.value)}
                placeholder={text.countryPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="ownerName" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.ownerName}
              </label>
              <input
                id="ownerName"
                type="text"
                value={draft.ownerName}
                onChange={(e) => updateField("ownerName", e.target.value)}
                placeholder={text.ownerNamePlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            <div>
              <label htmlFor="ownerEmail" className="mb-2 block text-sm font-medium text-zinc-900">
                {text.ownerEmail}
              </label>
              <input
                id="ownerEmail"
                type="email"
                value={draft.ownerEmail}
                onChange={(e) => updateField("ownerEmail", e.target.value)}
                placeholder={text.ownerEmailPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>
          </div>
        </section>

        <DynamicAssetFields
  lang={lang}
  category={draft.category}
  values={draft.dynamicFields}
  onChange={updateDynamicField}
/>

       <DocumentRequirementsPanel
  lang={lang}
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
              {text.declaration}
            </span>
          </label>
        </section>

        <RegistrationReadinessPanel
  lang={lang}
  applicantType={draft.applicantType}
  completeness={completeness}
  paymentCompleted={paymentCompleted}
/>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                {text.workflowTitle}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                {text.workflowStatus} <strong>{requestStatus}</strong>
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {requiresPayment ? text.retailPaymentNote : text.partnerNote}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                disabled={savePending}
              >
                {savePending ? text.saving : text.saveDraft}
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
                ? text.submitting
                : requiresPayment
                ? text.createRequest
                : text.submitRegistration}
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