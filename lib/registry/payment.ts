// lib/registry/payment.ts

import { ApplicantType } from "@/lib/registry/workflow";
import { Language } from "@/lib/i18n/config";

type LocalizedText = Record<Language, string>;

function getLocalizedText(
  text: LocalizedText,
  lang: string
): string {
  if (lang in text) {
    return text[lang as Language];
  }

  return text.en;
}

export const MANUAL_PAYMENT_DETAILS = {
  accountHolder: "EquipRegistry",
  iban: "ES89 2100 1460 6002 0010 3972",
  bic: "CAIXESBBXXX",
  bankName: "CAIXABANK",
  currency: "EUR",

  registrationFeeText: {
    en: "€ 25.00 incl. VAT",
    es: "€ 25,00 IVA incl.",
    de: "25,00 € inkl. MwSt.",
    fr: "25,00 € TTC",
    it: "€ 25,00 IVA inclusa",
    nl: "€ 25,00 incl. BTW",
    pt: "€ 25,00 com IVA incluído",
  } satisfies LocalizedText,

  processingText: {
    en: "After payment, your registration will be processed and validated within 24 hours.",
    es: "Después del pago, tu registro será procesado y validado en un plazo de 24 horas.",
    de: "Nach Zahlung wird deine Registrierung innerhalb von 24 Stunden bearbeitet und validiert.",
    fr: "Après le paiement, votre enregistrement sera traité et validé sous 24 heures.",
    it: "Dopo il pagamento, la tua registrazione sarà elaborata e convalidata entro 24 ore.",
    nl: "Na betaling wordt je registratie binnen 24 uur verwerkt en gevalideerd.",
    pt: "Após o pagamento, o teu registo será processado e validado no prazo de 24 horas.",
  } satisfies LocalizedText,

  title: {
    en: "Complete payment by bank transfer",
    es: "Completa el pago mediante transferencia bancaria",
    de: "Zahlung per Banküberweisung abschließen",
    fr: "Finalisez le paiement par virement bancaire",
    it: "Completa il pagamento tramite bonifico bancario",
    nl: "Voltooi de betaling via bankoverschrijving",
    pt: "Conclui o pagamento por transferência bancária",
  } satisfies LocalizedText,

  introText: {
    en: "Your registration file has been created, but processing will only continue after payment has been received and matched to your passport number.",
    es: "Tu expediente de registro ha sido creado, pero el procesamiento solo continuará una vez recibido el pago y asociado a tu número de pasaporte.",
    de: "Deine Registrierungsakte wurde erstellt, die Bearbeitung wird jedoch erst fortgesetzt, nachdem die Zahlung eingegangen ist und deiner Passnummer zugeordnet wurde.",
    fr: "Votre dossier d’enregistrement a été créé, mais le traitement ne continuera qu’après réception du paiement et son association à votre numéro de passeport.",
    it: "Il tuo fascicolo di registrazione è stato creato, ma l’elaborazione continuerà solo dopo aver ricevuto il pagamento e averlo associato al numero del passaporto.",
    nl: "Je registratiedossier is aangemaakt, maar de verwerking gaat pas verder zodra de betaling is ontvangen en gekoppeld is aan je paspoortnummer.",
    pt: "O teu processo de registo foi criado, mas o processamento só continuará depois de o pagamento ser recebido e associado ao teu número de passaporte.",
  } satisfies LocalizedText,

  paymentPendingLabel: {
    en: "Payment Pending",
    es: "Pago pendiente",
    de: "Zahlung ausstehend",
    fr: "Paiement en attente",
    it: "Pagamento in sospeso",
    nl: "Betaling in afwachting",
    pt: "Pagamento pendente",
  } satisfies LocalizedText,

  accountHolderLabel: {
    en: "Account Holder",
    es: "Titular de la cuenta",
    de: "Kontoinhaber",
    fr: "Titulaire du compte",
    it: "Intestatario del conto",
    nl: "Rekeninghouder",
    pt: "Titular da conta",
  } satisfies LocalizedText,

  ibanLabel: {
    en: "IBAN",
    es: "IBAN",
    de: "IBAN",
    fr: "IBAN",
    it: "IBAN",
    nl: "IBAN",
    pt: "IBAN",
  } satisfies LocalizedText,

  bicLabel: {
    en: "BIC / SWIFT",
    es: "BIC / SWIFT",
    de: "BIC / SWIFT",
    fr: "BIC / SWIFT",
    it: "BIC / SWIFT",
    nl: "BIC / SWIFT",
    pt: "BIC / SWIFT",
  } satisfies LocalizedText,

  currencyLabel: {
    en: "Currency",
    es: "Moneda",
    de: "Währung",
    fr: "Devise",
    it: "Valuta",
    nl: "Valuta",
    pt: "Moeda",
  } satisfies LocalizedText,

  referenceLabel: {
    en: "Payment Reference / Passport Number",
    es: "Referencia de pago / Número de pasaporte",
    de: "Zahlungsreferenz / Passnummer",
    fr: "Référence de paiement / Numéro de passeport",
    it: "Riferimento di pagamento / Numero passaporto",
    nl: "Betalingsreferentie / Paspoortnummer",
    pt: "Referência de pagamento / Número do passaporte",
  } satisfies LocalizedText,

  referenceHelpText: {
    en: "Use this exact reference in your bank transfer. This number remains permanently linked to your future EquipRegistry passport.",
    es: "Usa esta referencia exacta en tu transferencia bancaria. Este número permanecerá vinculado permanentemente a tu futuro pasaporte EquipRegistry.",
    de: "Verwende diese exakte Referenz bei deiner Banküberweisung. Diese Nummer bleibt dauerhaft mit deinem zukünftigen EquipRegistry-Pass verknüpft.",
    fr: "Utilisez cette référence exacte dans votre virement bancaire. Ce numéro restera lié en permanence à votre futur passeport EquipRegistry.",
    it: "Usa questo riferimento esatto nel tuo bonifico bancario. Questo numero rimarrà collegato in modo permanente al tuo futuro passaporto EquipRegistry.",
    nl: "Gebruik exact deze referentie bij je bankoverschrijving. Dit nummer blijft permanent gekoppeld aan je toekomstige EquipRegistry-paspoort.",
    pt: "Usa esta referência exata na tua transferência bancária. Este número permanecerá permanentemente ligado ao teu futuro passaporte EquipRegistry.",
  } satisfies LocalizedText,

  feeLabel: {
    en: "Fee",
    es: "Tarifa",
    de: "Gebühr",
    fr: "Frais",
    it: "Tariffa",
    nl: "Kosten",
    pt: "Taxa",
  } satisfies LocalizedText,
};

export function usesManualIbanPayment(applicantType: ApplicantType) {
  return applicantType === "private" || applicantType === "sme";
}

export function getManualPaymentText(lang: string) {
  return {
    registrationFeeText: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.registrationFeeText,
      lang
    ),
    processingText: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.processingText,
      lang
    ),
    title: getLocalizedText(MANUAL_PAYMENT_DETAILS.title, lang),
    introText: getLocalizedText(MANUAL_PAYMENT_DETAILS.introText, lang),
    paymentPendingLabel: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.paymentPendingLabel,
      lang
    ),
    accountHolderLabel: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.accountHolderLabel,
      lang
    ),
    ibanLabel: getLocalizedText(MANUAL_PAYMENT_DETAILS.ibanLabel, lang),
    bicLabel: getLocalizedText(MANUAL_PAYMENT_DETAILS.bicLabel, lang),
    currencyLabel: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.currencyLabel,
      lang
    ),
    referenceLabel: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.referenceLabel,
      lang
    ),
    referenceHelpText: getLocalizedText(
      MANUAL_PAYMENT_DETAILS.referenceHelpText,
      lang
    ),
    feeLabel: getLocalizedText(MANUAL_PAYMENT_DETAILS.feeLabel, lang),
  };
}