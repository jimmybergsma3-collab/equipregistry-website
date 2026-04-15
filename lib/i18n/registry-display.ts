import type {
  ApplicantType,
  RegistrationRequestStatus,
} from "@/lib/registry/workflow";
import type { Lang } from "./config";
import { getDictionary } from "./dictionary";

const LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-GB",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  nl: "nl-NL",
  pt: "pt-PT",
  ru: "ru-RU",
  zh: "zh-CN",
  hi: "hi-IN",
  ar: "ar-SA",
};

const APPLICANT_TYPE_LABELS: Record<Lang, Record<ApplicantType, string>> = {
  en: {
    private: "Private",
    sme: "SME",
    insurer_partner: "Insurer",
    bank_partner: "Bank",
    dealer_partner: "Dealer",
    rental_partner: "Rental company",
  },
  es: {
    private: "Privado",
    sme: "PyME",
    insurer_partner: "Aseguradora",
    bank_partner: "Banco",
    dealer_partner: "Concesionario",
    rental_partner: "Empresa de alquiler",
  },
  de: {
    private: "Privat",
    sme: "KMU",
    insurer_partner: "Versicherer",
    bank_partner: "Bank",
    dealer_partner: "Haendler",
    rental_partner: "Vermietungsunternehmen",
  },
  fr: {
    private: "Prive",
    sme: "PME",
    insurer_partner: "Assureur",
    bank_partner: "Banque",
    dealer_partner: "Concessionnaire",
    rental_partner: "Societe de location",
  },
  it: {
    private: "Privato",
    sme: "PMI",
    insurer_partner: "Assicuratore",
    bank_partner: "Banca",
    dealer_partner: "Rivenditore",
    rental_partner: "Societa di noleggio",
  },
  nl: {
    private: "Particulier",
    sme: "MKB",
    insurer_partner: "Verzekeraar",
    bank_partner: "Bank",
    dealer_partner: "Dealer",
    rental_partner: "Verhuurbedrijf",
  },
  pt: {
    private: "Privado",
    sme: "PME",
    insurer_partner: "Seguradora",
    bank_partner: "Banco",
    dealer_partner: "Concessionario",
    rental_partner: "Empresa de aluguer",
  },
  ru: {
    private: "Частное лицо",
    sme: "МСП",
    insurer_partner: "Страховщик",
    bank_partner: "Банк",
    dealer_partner: "Дилер",
    rental_partner: "Арендная компания",
  },
  zh: {
    private: "个人",
    sme: "中小企业",
    insurer_partner: "保险公司",
    bank_partner: "银行",
    dealer_partner: "经销商",
    rental_partner: "租赁公司",
  },
  hi: {
    private: "निजी",
    sme: "एसएमई",
    insurer_partner: "बीमाकर्ता",
    bank_partner: "बैंक",
    dealer_partner: "डीलर",
    rental_partner: "किराया कंपनी",
  },
  ar: {
    private: "فردي",
    sme: "شركة صغيرة أو متوسطة",
    insurer_partner: "شركة تأمين",
    bank_partner: "بنك",
    dealer_partner: "تاجر",
    rental_partner: "شركة تأجير",
  },
};

const EXTRA_STATUS_LABELS: Record<
  Lang,
  Pick<Record<RegistrationRequestStatus | "unknown", string>, "ready_for_submission" | "payment_required" | "unknown">
> = {
  en: {
    ready_for_submission: "Ready for submission",
    payment_required: "Ready for checkout",
    unknown: "Unknown",
  },
  es: {
    ready_for_submission: "Listo para enviar",
    payment_required: "Listo para checkout",
    unknown: "Desconocido",
  },
  de: {
    ready_for_submission: "Bereit zur Einreichung",
    payment_required: "Bereit fuer Checkout",
    unknown: "Unbekannt",
  },
  fr: {
    ready_for_submission: "Pret pour soumission",
    payment_required: "Pret pour le checkout",
    unknown: "Inconnu",
  },
  it: {
    ready_for_submission: "Pronto per l'invio",
    payment_required: "Pronto per il checkout",
    unknown: "Sconosciuto",
  },
  nl: {
    ready_for_submission: "Klaar voor indiening",
    payment_required: "Klaar voor checkout",
    unknown: "Onbekend",
  },
  pt: {
    ready_for_submission: "Pronto para envio",
    payment_required: "Pronto para checkout",
    unknown: "Desconhecido",
  },
  ru: {
    ready_for_submission: "Готово к отправке",
    payment_required: "Требуется оплата",
    unknown: "Неизвестно",
  },
  zh: {
    ready_for_submission: "可提交",
    payment_required: "需要付款",
    unknown: "未知",
  },
  hi: {
    ready_for_submission: "जमा करने के लिए तैयार",
    payment_required: "भुगतान आवश्यक",
    unknown: "अज्ञात",
  },
  ar: {
    ready_for_submission: "جاهز للإرسال",
    payment_required: "الدفع مطلوب",
    unknown: "غير معروف",
  },
};

const PAYMENT_REQUIRED_LABEL_OVERRIDES: Record<Lang, string> = {
  en: "Ready for checkout",
  es: "Listo para checkout",
  de: "Bereit fuer Checkout",
  fr: "Pret pour le checkout",
  it: "Pronto per il checkout",
  nl: "Klaar voor checkout",
  pt: "Pronto para checkout",
  ru: "Gotovo k checkout",
  zh: "Zhunbei checkout",
  hi: "Checkout ke liye taiyar",
  ar: "Jahiz lilcheckout",
};

export function formatDateForLang(value: Date | string, lang: Lang) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(LOCALE_BY_LANG[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getLocalizedApplicantTypeLabel(
  applicantType: ApplicantType,
  lang: Lang
) {
  return APPLICANT_TYPE_LABELS[lang]?.[applicantType] ?? applicantType;
}

export function getLocalizedRequestStatusLabel(
  status: RegistrationRequestStatus,
  lang: Lang
) {
  const dict = getDictionary(lang);
  const extra = EXTRA_STATUS_LABELS[lang] ?? EXTRA_STATUS_LABELS.en;

  switch (status) {
    case "draft":
      return dict.dashboard.requestStatuses.draft;
    case "incomplete":
      return dict.dashboard.requestStatuses.incomplete;
    case "ready_for_submission":
      return extra.ready_for_submission;
    case "payment_required":
      return PAYMENT_REQUIRED_LABEL_OVERRIDES[lang] ?? extra.payment_required;
    case "submitted":
      return dict.dashboard.requestStatuses.submitted;
    case "under_review":
      return dict.dashboard.requestStatuses.underReview;
    case "more_info_required":
      return dict.dashboard.requestStatuses.moreInfoRequired;
    case "approved":
      return dict.dashboard.requestStatuses.approved;
    case "rejected":
      return dict.dashboard.requestStatuses.rejected;
    case "passport_issued":
      return dict.dashboard.requestStatuses.passportIssued;
    default:
      return extra.unknown;
  }
}
