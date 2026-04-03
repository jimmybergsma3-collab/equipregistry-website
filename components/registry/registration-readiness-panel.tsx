"use client";

import {
  ApplicantType,
  RegistrationCompletenessResult,
  getNextSubmitAction,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";

function prettifyKey(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type Props = {
  lang: Lang;
  applicantType: ApplicantType;
  completeness: RegistrationCompletenessResult;
  paymentCompleted: boolean;
};

const TEXT: Record<
  Lang,
  {
    title: string;
    applicantType: string;
    complete: string;
    incomplete: string;
    nextSteps: {
      incomplete: string;
      payment: string;
      ready: string;
    };
    missingFields: string;
    missingDynamic: string;
    missingDocuments: string;
    paymentStatus: string;
    paymentDone: string;
    paymentPending: string;
    paid: string;
    pending: string;
  }
> = {
  en: {
    title: "Registration readiness",
    applicantType: "Applicant type",
    complete: "Complete",
    incomplete: "Incomplete",
    nextSteps: {
      incomplete: "Complete all required information.",
      payment:
        "Your file is complete. Continue to payment to activate submission.",
      ready: "Your file is complete and ready to be submitted.",
    },
    missingFields: "Missing fields",
    missingDynamic: "Missing category-specific fields",
    missingDocuments: "Missing documents",
    paymentStatus: "Payment status",
    paymentDone:
      "Payment completed or not required for this partner type.",
    paymentPending: "Payment has not been completed yet.",
    paid: "Paid / Cleared",
    pending: "Payment pending",
  },
  es: {
    title: "Estado de registro",
    applicantType: "Tipo de solicitante",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Complete toda la información requerida.",
      payment:
        "El expediente está completo. Continúe al pago para activar el envío.",
      ready: "El expediente está completo y listo para enviar.",
    },
    missingFields: "Campos faltantes",
    missingDynamic: "Campos específicos faltantes",
    missingDocuments: "Documentos faltantes",
    paymentStatus: "Estado del pago",
    paymentDone:
      "Pago completado o no requerido para este tipo de socio.",
    paymentPending: "El pago aún no se ha completado.",
    paid: "Pagado",
    pending: "Pago pendiente",
  },
  de: {
    title: "Registrierungsstatus",
    applicantType: "Antragstyp",
    complete: "Vollständig",
    incomplete: "Unvollständig",
    nextSteps: {
      incomplete: "Alle erforderlichen Angaben ausfüllen.",
      payment:
        "Die Daten sind vollständig. Fahren Sie mit der Zahlung fort.",
      ready: "Die Daten sind vollständig und bereit zur Einreichung.",
    },
    missingFields: "Fehlende Felder",
    missingDynamic: "Fehlende kategoriespezifische Felder",
    missingDocuments: "Fehlende Dokumente",
    paymentStatus: "Zahlungsstatus",
    paymentDone: "Zahlung abgeschlossen oder nicht erforderlich.",
    paymentPending: "Zahlung noch nicht abgeschlossen.",
    paid: "Bezahlt",
    pending: "Zahlung ausstehend",
  },
  fr: {
    title: "État de l’enregistrement",
    applicantType: "Type de demandeur",
    complete: "Complet",
    incomplete: "Incomplet",
    nextSteps: {
      incomplete: "Complétez toutes les informations requises.",
      payment:
        "Le dossier est complet. Passez au paiement pour activer l’envoi.",
      ready: "Le dossier est complet et prêt à être soumis.",
    },
    missingFields: "Champs manquants",
    missingDynamic: "Champs spécifiques manquants",
    missingDocuments: "Documents manquants",
    paymentStatus: "Statut du paiement",
    paymentDone: "Paiement effectué ou non requis.",
    paymentPending: "Le paiement n’est pas encore effectué.",
    paid: "Payé",
    pending: "Paiement en attente",
  },
  it: {
    title: "Stato registrazione",
    applicantType: "Tipo richiedente",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Completa tutte le informazioni richieste.",
      payment:
        "Il file è completo. Procedi al pagamento per attivare l’invio.",
      ready: "Il file è completo e pronto per essere inviato.",
    },
    missingFields: "Campi mancanti",
    missingDynamic: "Campi specifici mancanti",
    missingDocuments: "Documenti mancanti",
    paymentStatus: "Stato pagamento",
    paymentDone: "Pagamento completato o non richiesto.",
    paymentPending: "Pagamento non ancora completato.",
    paid: "Pagato",
    pending: "In attesa",
  },
  nl: {
    title: "Registratie status",
    applicantType: "Type aanvrager",
    complete: "Compleet",
    incomplete: "Incompleet",
    nextSteps: {
      incomplete: "Vul alle verplichte gegevens in.",
      payment:
        "Je dossier is compleet. Ga door naar betaling om te activeren.",
      ready: "Je dossier is compleet en klaar om in te dienen.",
    },
    missingFields: "Ontbrekende velden",
    missingDynamic: "Ontbrekende categorievelden",
    missingDocuments: "Ontbrekende documenten",
    paymentStatus: "Betalingsstatus",
    paymentDone: "Betaling voltooid of niet vereist.",
    paymentPending: "Betaling nog niet voltooid.",
    paid: "Betaald",
    pending: "Betaling openstaand",
  },
  pt: {
    title: "Estado do registo",
    applicantType: "Tipo de requerente",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Preencha todas as informações obrigatórias.",
      payment:
        "O ficheiro está completo. Continue para pagamento.",
      ready: "O ficheiro está completo e pronto para envio.",
    },
    missingFields: "Campos em falta",
    missingDynamic: "Campos específicos em falta",
    missingDocuments: "Documentos em falta",
    paymentStatus: "Estado do pagamento",
    paymentDone: "Pagamento concluído ou não necessário.",
    paymentPending: "Pagamento ainda não concluído.",
    paid: "Pago",
    pending: "Pendente",
  },
};

export default function RegistrationReadinessPanel({
  lang,
  applicantType,
  completeness,
  paymentCompleted,
}: Props) {
  const text = TEXT[lang];

  const nextAction = getNextSubmitAction(
    applicantType,
    completeness.isComplete,
    paymentCompleted
  );

  let nextStepText = text.nextSteps.incomplete;
  if (nextAction === "go_to_payment") {
    nextStepText = text.nextSteps.payment;
  }
  if (nextAction === "submit_registration") {
    nextStepText = text.nextSteps.ready;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {text.title}
          </h3>
          <p className="text-sm text-zinc-600">
            {text.applicantType}: {getApplicantTypeLabel(applicantType)}
          </p>
          <p className="text-sm text-zinc-600">{nextStepText}</p>
        </div>

        <span className="text-sm font-medium">
          {completeness.isComplete
            ? `${text.complete} (${completeness.score}%)`
            : `${text.incomplete} (${completeness.score}%)`}
        </span>
      </div>

      {!!completeness.missingFields.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingFields}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {completeness.missingFields.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      {!!completeness.missingDynamicFields.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingDynamic}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {completeness.missingDynamicFields.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      {!!completeness.missingDocuments.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingDocuments}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {completeness.missingDocuments.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <p className="text-sm font-medium">{text.paymentStatus}</p>
        <p className="text-sm text-zinc-600">
          {paymentCompleted ? text.paymentDone : text.paymentPending}
        </p>
        <p className="text-sm font-medium mt-2">
          {paymentCompleted ? text.paid : text.pending}
        </p>
      </div>
    </section>
  );
}