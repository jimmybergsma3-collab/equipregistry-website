"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "@/lib/registry/workflow";
import {
  RegistrationDocumentKey,
  RegistrationDocumentMap,
  RegistrationDocumentState,
  getDocumentText,
} from "@/lib/registry/document-rules";
import {
  saveRegistrationDraft,
  submitRegistrationRequest,
} from "@/app/[lang]/dashboard/register/actions";
import type { Lang } from "@/lib/i18n/config";
import { getRegistryUploadText } from "@/lib/i18n/registry-upload";
import { uploadFilesForBucket, ClientUploadError } from "@/lib/registry/client-uploads";
import { getLocalizedRequestStatusLabel } from "@/lib/i18n/registry-display";
import {
  ALLOWED_UPLOAD_ACCEPT,
  stripHeavyUploadPayloads,
  type StoredUpload,
} from "@/lib/registry/upload-types";
import SearchableCountrySelect from "@/components/registry/searchable-country-select";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

type Props = {
  lang: Lang;
  initialApplicantType?: ApplicantType;
  ownerIdentity?: {
    name: string;
    email: string;
  } | null;
};

type StandardApplicantTypeOption = "private" | "sme_business";

type ProofDocumentKey = "applicant_id" | "proof_of_address";
type StolenDocumentKey = "stolen_supporting_document";
type RegistrationDocumentMapWithStolen = RegistrationDocumentMap &
  Partial<Record<StolenDocumentKey, RegistrationDocumentState>>;

type StolenAssetIntakeState = {
  enabled: boolean;
  policeReportNumber: string;
  incidentDate: string;
  country: string;
  incidentDescription: string;
  supportingDocuments: StoredUpload[];
};

const APPLICANT_TYPE_OPTIONS: StandardApplicantTypeOption[] = [
  "private",
  "sme_business",
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
    assetName: "Asset name (for example bike, vehicle, or equipment)",
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
    assetName: "Nombre del activo (por ejemplo bicicleta, vehiculo o equipo)",
    assetNamePlaceholder: "p. ej. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "p. ej. Opel",
    model: "Modelo",
    modelPlaceholder: "p. ej. Corsa",
    serialNumber: "Número de serie / ID principal",
    serialNumberPlaceholder:
      "Introduzca el número de serie o identificador principal",
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
    assetName: "Name des Assets (z. B. Fahrrad, Fahrzeug oder Geraet)",
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
    ownerNamePlaceholder:
      "Vollständiger rechtlicher Name des Eigentümers",
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
    assetName: "Nom de l’actif (par exemple velo, vehicule ou equipement)",
    assetNamePlaceholder: "ex. Opel Corsa / Komatsu WA380",
    brand: "Marque",
    brandPlaceholder: "ex. Opel",
    model: "Modèle",
    modelPlaceholder: "ex. Corsa",
    serialNumber: "Numéro de série / ID principal",
    serialNumberPlaceholder:
      "Entrez le numéro de série ou l’identifiant principal",
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
    assetName: "Nome dell’asset (ad esempio bici, veicolo o attrezzatura)",
    assetNamePlaceholder: "es. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "es. Opel",
    model: "Modello",
    modelPlaceholder: "es. Corsa",
    serialNumber: "Numero di serie / ID principale",
    serialNumberPlaceholder:
      "Inserisci numero di serie o identificativo principale",
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
    assetName: "Naam van het asset (bijvoorbeeld fiets, voertuig of materieel)",
    assetNamePlaceholder: "bijv. Opel Corsa / Komatsu WA380",
    brand: "Merk",
    brandPlaceholder: "bijv. Opel",
    model: "Model",
    modelPlaceholder: "bijv. Corsa",
    serialNumber: "Serienummer / hoofd-ID",
    serialNumberPlaceholder:
      "Voer serienummer of hoofdidentificatie in",
    year: "Bouwjaar",
    yearPlaceholder: "bijv. 2019",
    country: "Land",
    countryPlaceholder: "bijv. Spanje",
    ownerName: "Naam eigenaar",
    ownerNamePlaceholder:
      "Volledige juridische naam van de eigenaar",
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
    assetName: "Nome do ativo (por exemplo bicicleta, veiculo ou equipamento)",
    assetNamePlaceholder: "ex. Opel Corsa / Komatsu WA380",
    brand: "Marca",
    brandPlaceholder: "ex. Opel",
    model: "Modelo",
    modelPlaceholder: "ex. Corsa",
    serialNumber: "Número de série / ID principal",
    serialNumberPlaceholder:
      "Introduza o número de série ou identificador principal",
    year: "Ano",
    yearPlaceholder: "ex. 2019",
    country: "País",
    countryPlaceholder: "ex. Espanha",
    ownerName: "Nome do proprietário",
    ownerNamePlaceholder:
      "Nome legal completo do proprietário",
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
  ru: {
    foundationTitle: "Основа регистрации",
    foundationText:
      "Заполните все обязательные данные, прежде чем запрос сможет перейти к оплате или отправке.",
    applicantType: "Тип заявителя",
    assetName: "Название актива (например, велосипед, транспорт или оборудование)",
    assetNamePlaceholder: "например, Opel Corsa / Komatsu WA380",
    brand: "Марка",
    brandPlaceholder: "например, Opel",
    model: "Модель",
    modelPlaceholder: "например, Corsa",
    serialNumber: "Серийный номер / основной ID",
    serialNumberPlaceholder:
      "Введите серийный номер или основной идентификатор",
    year: "Год",
    yearPlaceholder: "например, 2019",
    country: "Страна",
    countryPlaceholder: "например, Испания",
    ownerName: "Имя владельца",
    ownerNamePlaceholder: "Полное юридическое имя владельца",
    ownerEmail: "Email владельца",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "Я подтверждаю, что предоставленные данные полны и могут быть обработаны для оценки регистрации.",
    workflowTitle: "Результат процесса",
    workflowStatus: "Текущий внутренний статус запроса:",
    retailPaymentNote:
      "Частные лица и МСП должны оплатить до окончательной отправки.",
    partnerNote: "Партнёрские типы заявителей могут отправлять напрямую.",
    saveDraft: "Сохранить черновик",
    saving: "Сохранение...",
    submitting: "Отправка...",
    createRequest: "Создать запрос",
    submitRegistration: "Отправить регистрацию",
    applicantTypeLabels: {
      private: "Частное лицо",
      sme: "МСП",
      insurer_partner: "Страховой партнёр",
      bank_partner: "Банковский партнёр",
      dealer_partner: "Партнёр-дилер",
      rental_partner: "Партнёр по аренде",
    },
  },
  zh: {
    foundationTitle: "注册基础信息",
    foundationText:
      "在请求进入付款或提交之前，请完成所有必填数据。",
    applicantType: "申请人类型",
    assetName: "资产名称（例如自行车、车辆或设备）",
    assetNamePlaceholder: "例如 Opel Corsa / Komatsu WA380",
    brand: "品牌",
    brandPlaceholder: "例如 Opel",
    model: "型号",
    modelPlaceholder: "例如 Corsa",
    serialNumber: "序列号 / 主要标识",
    serialNumberPlaceholder: "输入序列号或主要标识",
    year: "年份",
    yearPlaceholder: "例如 2019",
    country: "国家",
    countryPlaceholder: "例如 西班牙",
    ownerName: "所有者姓名",
    ownerNamePlaceholder: "所有者的完整法定姓名",
    ownerEmail: "所有者邮箱",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "我确认所提交的数据完整，并可用于注册评估处理。",
    workflowTitle: "流程结果",
    workflowStatus: "当前内部请求状态：",
    retailPaymentNote:
      "个人和中小企业申请人必须在最终提交前付款。",
    partnerNote: "合作伙伴类型申请人可以直接提交。",
    saveDraft: "保存草稿",
    saving: "正在保存...",
    submitting: "正在提交...",
    createRequest: "创建请求",
    submitRegistration: "提交注册",
    applicantTypeLabels: {
      private: "个人",
      sme: "中小企业",
      insurer_partner: "保险合作伙伴",
      bank_partner: "银行合作伙伴",
      dealer_partner: "经销商合作伙伴",
      rental_partner: "租赁合作伙伴",
    },
  },
  hi: {
    foundationTitle: "पंजीकरण की बुनियाद",
    foundationText:
      "अनुरोध को भुगतान या सबमिशन तक ले जाने से पहले सभी आवश्यक डेटा पूरा करें।",
    applicantType: "आवेदक प्रकार",
    assetName: "एसेट नाम (उदाहरण: साइकिल, वाहन या उपकरण)",
    assetNamePlaceholder: "जैसे Opel Corsa / Komatsu WA380",
    brand: "ब्रांड",
    brandPlaceholder: "जैसे Opel",
    model: "मॉडल",
    modelPlaceholder: "जैसे Corsa",
    serialNumber: "सीरियल नंबर / मुख्य आईडी",
    serialNumberPlaceholder:
      "सीरियल नंबर या मुख्य पहचान दर्ज करें",
    year: "वर्ष",
    yearPlaceholder: "जैसे 2019",
    country: "देश",
    countryPlaceholder: "जैसे Spain",
    ownerName: "मालिक का नाम",
    ownerNamePlaceholder: "मालिक का पूरा कानूनी नाम",
    ownerEmail: "मालिक का ईमेल",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "मैं पुष्टि करता हूँ कि जमा किया गया डेटा पूर्ण है और पंजीकरण मूल्यांकन के लिए प्रोसेस किया जा सकता है।",
    workflowTitle: "वर्कफ़्लो परिणाम",
    workflowStatus: "वर्तमान आंतरिक अनुरोध स्थिति:",
    retailPaymentNote:
      "निजी और SME आवेदकों को अंतिम सबमिशन से पहले भुगतान करना होगा।",
    partnerNote: "पार्टनर आवेदक प्रकार सीधे जमा कर सकता है।",
    saveDraft: "ड्राफ्ट सहेजें",
    saving: "सहेजा जा रहा है...",
    submitting: "जमा किया जा रहा है...",
    createRequest: "अनुरोध बनाएं",
    submitRegistration: "पंजीकरण जमा करें",
    applicantTypeLabels: {
      private: "निजी",
      sme: "SME",
      insurer_partner: "बीमा भागीदार",
      bank_partner: "बैंक भागीदार",
      dealer_partner: "डीलर भागीदार",
      rental_partner: "रेंटल भागीदार",
    },
  },
  ar: {
    foundationTitle: "أساس التسجيل",
    foundationText:
      "أكمل جميع البيانات المطلوبة قبل أن ينتقل الطلب إلى الدفع أو الإرسال.",
    applicantType: "نوع مقدم الطلب",
    assetName: "اسم الأصل (مثال: دراجة أو مركبة أو معدات)",
    assetNamePlaceholder: "مثال: Opel Corsa / Komatsu WA380",
    brand: "العلامة التجارية",
    brandPlaceholder: "مثال: Opel",
    model: "الطراز",
    modelPlaceholder: "مثال: Corsa",
    serialNumber: "الرقم التسلسلي / المعرّف الرئيسي",
    serialNumberPlaceholder:
      "أدخل الرقم التسلسلي أو المعرّف الرئيسي",
    year: "السنة",
    yearPlaceholder: "مثال: 2019",
    country: "الدولة",
    countryPlaceholder: "مثال: إسبانيا",
    ownerName: "اسم المالك",
    ownerNamePlaceholder: "الاسم القانوني الكامل للمالك",
    ownerEmail: "بريد المالك الإلكتروني",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "أؤكد أن البيانات المقدمة كاملة ويمكن معالجتها لتقييم التسجيل.",
    workflowTitle: "نتيجة سير العمل",
    workflowStatus: "الحالة الداخلية الحالية للطلب:",
    retailPaymentNote:
      "يجب على المتقدمين من الأفراد والشركات الصغيرة والمتوسطة الدفع قبل الإرسال النهائي.",
    partnerNote: "يمكن لأنواع الشركاء التقديم مباشرة.",
    saveDraft: "حفظ المسودة",
    saving: "جارٍ الحفظ...",
    submitting: "جارٍ الإرسال...",
    createRequest: "إنشاء طلب",
    submitRegistration: "إرسال التسجيل",
    applicantTypeLabels: {
      private: "فرد",
      sme: "شركة صغيرة أو متوسطة",
      insurer_partner: "شريك تأمين",
      bank_partner: "شريك بنكي",
      dealer_partner: "شريك وكيل",
      rental_partner: "شريك تأجير",
    },
  },

  pl: {
    foundationTitle: "Podstawa rejestracji",
    foundationText:
      "Uzupelnij wszystkie wymagane dane, zanim zgloszenie przejdzie do platnosci lub wyslania.",
    applicantType: "Typ wnioskodawcy",
    assetName: "Nazwa assetu (np. rower, pojazd lub sprzet)",
    assetNamePlaceholder: "np. Opel Corsa / Komatsu WA380",
    brand: "Marka",
    brandPlaceholder: "np. Opel",
    model: "Model",
    modelPlaceholder: "np. Corsa",
    serialNumber: "Numer seryjny / glowny identyfikator",
    serialNumberPlaceholder: "Wpisz numer seryjny lub glowny identyfikator",
    year: "Rok",
    yearPlaceholder: "np. 2019",
    country: "Kraj",
    countryPlaceholder: "np. Spain",
    ownerName: "Nazwa wlasciciela",
    ownerNamePlaceholder: "Pelna prawna nazwa wlasciciela",
    ownerEmail: "E-mail wlasciciela",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "Potwierdzam, ze przeslane dane sa kompletne i moga byc przetwarzane w celu oceny rejestracji.",
    workflowTitle: "Wynik workflow",
    workflowStatus: "Aktualny wewnetrzny status zgloszenia:",
    retailPaymentNote:
      "Wnioskodawcy detaliczni i MSP musza zaplacic przed ostatecznym wyslaniem.",
    partnerNote: "Typ wnioskodawcy partner moze wyslac bezposrednio.",
    saveDraft: "Zapisz szkic",
    saving: "Zapisywanie...",
    submitting: "Wysylanie...",
    createRequest: "Utworz zgloszenie",
    submitRegistration: "Wyslij rejestracje",
    applicantTypeLabels: {
      private: "Prywatny",
      sme: "SME",
      insurer_partner: "Partner ubezpieczeniowy",
      bank_partner: "Partner bankowy",
      dealer_partner: "Partner dealerski",
      rental_partner: "Partner wynajmu",
    },
  },
  sv: {
    foundationTitle: "Registreringsgrund",
    foundationText:
      "Fyll i all obligatorisk data innan arendet kan ga vidare till betalning eller inlamning.",
    applicantType: "Sokandetyp",
    assetName: "Assetnamn (t.ex. cykel, fordon eller utrustning)",
    assetNamePlaceholder: "t.ex. Opel Corsa / Komatsu WA380",
    brand: "Marke",
    brandPlaceholder: "t.ex. Opel",
    model: "Model",
    modelPlaceholder: "t.ex. Corsa",
    serialNumber: "Serienummer / huvud-ID",
    serialNumberPlaceholder: "Ange serienummer eller huvudidentifierare",
    year: "Ar",
    yearPlaceholder: "t.ex. 2019",
    country: "Land",
    countryPlaceholder: "t.ex. Spain",
    ownerName: "Agarens namn",
    ownerNamePlaceholder: "Fullstandigt juridiskt agarnamn",
    ownerEmail: "Agarens e-post",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "Jag bekraftar att de inskickade uppgifterna ar kompletta och far behandlas for registreringsbedomning.",
    workflowTitle: "Workflow-resultat",
    workflowStatus: "Nuvarande intern status for arendet:",
    retailPaymentNote:
      "Detalj- och SME-sokande maste betala fore slutlig inlamning.",
    partnerNote: "Partnertypen kan skicka in direkt.",
    saveDraft: "Spara utkast",
    saving: "Sparar...",
    submitting: "Skickar in...",
    createRequest: "Skapa arende",
    submitRegistration: "Skicka in registrering",
    applicantTypeLabels: {
      private: "Privat",
      sme: "SME",
      insurer_partner: "Forsakringspartner",
      bank_partner: "Bankpartner",
      dealer_partner: "Aterforsaljarpartner",
      rental_partner: "Uthyrningspartner",
    },
  },
  da: {
    foundationTitle: "Registreringsgrundlag",
    foundationText:
      "Udfyld alle obligatoriske data, for anmodningen kan ga videre til betaling eller indsendelse.",
    applicantType: "Ansogertype",
    assetName: "Assetnavn (f.eks. cykel, koretoj eller udstyr)",
    assetNamePlaceholder: "f.eks. Opel Corsa / Komatsu WA380",
    brand: "Maerke",
    brandPlaceholder: "f.eks. Opel",
    model: "Model",
    modelPlaceholder: "f.eks. Corsa",
    serialNumber: "Serienummer / hoved-ID",
    serialNumberPlaceholder: "Indtast serienummer eller hovedidentifikator",
    year: "Ar",
    yearPlaceholder: "f.eks. 2019",
    country: "Land",
    countryPlaceholder: "f.eks. Spain",
    ownerName: "Ejerens navn",
    ownerNamePlaceholder: "Fuldt juridisk ejernavn",
    ownerEmail: "Ejerens e-mail",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "Jeg bekraefter, at de indsendte data er komplette og ma behandles til registreringsvurdering.",
    workflowTitle: "Workflow-resultat",
    workflowStatus: "Nuvaerende interne anmodningsstatus:",
    retailPaymentNote:
      "Detail- og SME-ansogere skal betale for endelig indsendelse.",
    partnerNote: "Partnertypen kan indsende direkte.",
    saveDraft: "Gem kladde",
    saving: "Gemmer...",
    submitting: "Indsender...",
    createRequest: "Opret anmodning",
    submitRegistration: "Indsend registrering",
    applicantTypeLabels: {
      private: "Privat",
      sme: "SME",
      insurer_partner: "Forsikringspartner",
      bank_partner: "Bankpartner",
      dealer_partner: "Forhandlerpartner",
      rental_partner: "Udlejningspartner",
    },
  },
  no: {
    foundationTitle: "Registreringsgrunnlag",
    foundationText:
      "Fyll ut alle obligatoriske data for foresporselen kan ga videre til betaling eller innsending.",
    applicantType: "Sokertype",
    assetName: "Assetnavn (f.eks. sykkel, kjoretoy eller utstyr)",
    assetNamePlaceholder: "f.eks. Opel Corsa / Komatsu WA380",
    brand: "Merke",
    brandPlaceholder: "f.eks. Opel",
    model: "Model",
    modelPlaceholder: "f.eks. Corsa",
    serialNumber: "Serienummer / hoved-ID",
    serialNumberPlaceholder: "Skriv inn serienummer eller hovedidentifikator",
    year: "Ar",
    yearPlaceholder: "f.eks. 2019",
    country: "Land",
    countryPlaceholder: "f.eks. Spain",
    ownerName: "Eiernavn",
    ownerNamePlaceholder: "Fullt juridisk eiernavn",
    ownerEmail: "Eierens e-post",
    ownerEmailPlaceholder: "name@example.com",
    declaration:
      "Jeg bekrefter at de innsendte dataene er komplette og kan behandles for registreringsvurdering.",
    workflowTitle: "Workflow-resultat",
    workflowStatus: "Navaerende intern foresporselsstatus:",
    retailPaymentNote:
      "Detalj- og SME-sokere ma betale for endelig innsending.",
    partnerNote: "Partnertypen kan sende inn direkte.",
    saveDraft: "Lagre kladd",
    saving: "Lagrer...",
    submitting: "Sender inn...",
    createRequest: "Opprett foresporsel",
    submitRegistration: "Send inn registrering",
    applicantTypeLabels: {
      private: "Privat",
      sme: "SME",
      insurer_partner: "Forsikringspartner",
      bank_partner: "Bankpartner",
      dealer_partner: "Forhandlerpartner",
      rental_partner: "Utleiepartner",
    },
  },
};

const EXTRA_FORM_TEXT: Record<
  Lang,
  {
    applicantTypeOptionLabels: Record<StandardApplicantTypeOption, string>;
    proofTitle: string;
    proofSubtitle: string;
    proofPrivateHint: string;
    proofBusinessHint: string;
    redactionHint: string;
    stolenTitle: string;
    stolenSubtitle: string;
    stolenToggle: string;
    policeReportNumber: string;
    incidentDate: string;
    incidentCountry: string;
    incidentCountryPlaceholder: string;
    incidentDescription: string;
    incidentDescriptionPlaceholder: string;
    supportingDocuments: string;
    supportingDocumentsDescription: string;
  }
> = {
  en: {
    applicantTypeOptionLabels: {
      private: "Private",
      sme_business: "SME / Business",
    },
    proofTitle: "Proof of applicant",
    proofSubtitle:
      "Optional first-step proof for private and SME / business registrations.",
    proofPrivateHint:
      "Upload only the minimum identity pages needed to confirm the applicant.",
    proofBusinessHint:
      "If useful, add proof for the authorized contact or business address.",
    redactionHint:
      "Please mask or redact unnecessary sensitive fields before upload.",
    stolenTitle: "WARNING: check this only if this asset is already stolen",
    stolenSubtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    stolenToggle: "This asset has already been reported stolen",
    policeReportNumber: "Police report number",
    incidentDate: "Incident date",
    incidentCountry: "Incident country",
    incidentCountryPlaceholder: "e.g. Spain",
    incidentDescription: "Incident description",
    incidentDescriptionPlaceholder:
      "Add the known theft details, location, and any safe references.",
    supportingDocuments: "Supporting documents",
    supportingDocumentsDescription:
      "Upload only safe, relevant case files or other supporting evidence.",
  },
  es: {
    applicantTypeOptionLabels: {
      private: "Particular",
      sme_business: "PYME / Empresa",
    },
    proofTitle: "Prueba del solicitante",
    proofSubtitle:
      "Primer paso opcional para particulares y registros PYME / empresa.",
    proofPrivateHint:
      "Suba solo las paginas minimas de identidad necesarias para confirmar al solicitante.",
    proofBusinessHint:
      "Si ayuda, anada prueba del contacto autorizado o de la direccion comercial.",
    redactionHint:
      "Enmascare o tache los campos sensibles no necesarios antes de subirlos.",
    stolenTitle:
      "ATENCION: marque esto solo si este activo ya fue reportado como robado",
    stolenSubtitle:
      "Use esto solo cuando registre un activo que ya haya sido reportado como robado. Para un registro normal, dejelo sin marcar.",
    stolenToggle: "Este activo ya fue reportado como robado",
    policeReportNumber: "Numero de denuncia policial",
    incidentDate: "Fecha del incidente",
    incidentCountry: "Pais del incidente",
    incidentCountryPlaceholder: "p. ej. Espana",
    incidentDescription: "Descripcion del incidente",
    incidentDescriptionPlaceholder:
      "Anada los detalles conocidos del robo, la ubicacion y referencias seguras.",
    supportingDocuments: "Documentos de soporte",
    supportingDocumentsDescription:
      "Suba solo archivos del caso seguros y relevantes u otras pruebas de apoyo.",
  },
  de: {
    applicantTypeOptionLabels: {
      private: "Privat",
      sme_business: "KMU / Unternehmen",
    },
    proofTitle: "Nachweis des Antragstellers",
    proofSubtitle:
      "Optionaler erster Nachweis fur Privat- und KMU / Unternehmensregistrierungen.",
    proofPrivateHint:
      "Laden Sie nur die minimal erforderlichen Identitatsseiten hoch.",
    proofBusinessHint:
      "Falls hilfreich, fugen Sie Nachweise fur den bevollmachtigten Kontakt oder die Geschaftsadresse hinzu.",
    redactionHint:
      "Schwarzen Sie unnotige sensible Felder vor dem Upload ab.",
    stolenTitle:
      "ACHTUNG: nur ankreuzen, wenn dieses Asset bereits als gestohlen gemeldet ist",
    stolenSubtitle:
      "Nur verwenden, wenn Sie ein Asset registrieren, das bereits als gestohlen gemeldet wurde. Fur eine normale Registrierung nicht ankreuzen.",
    stolenToggle: "Dieses Asset wurde bereits als gestohlen gemeldet",
    policeReportNumber: "Polizeiberichtsnummer",
    incidentDate: "Vorfallsdatum",
    incidentCountry: "Land des Vorfalls",
    incidentCountryPlaceholder: "z. B. Spanien",
    incidentDescription: "Vorfallsbeschreibung",
    incidentDescriptionPlaceholder:
      "Fugen Sie bekannte Diebstahlangaben, Ort und sichere Referenzen hinzu.",
    supportingDocuments: "Unterstutzende Dokumente",
    supportingDocumentsDescription:
      "Laden Sie nur sichere, relevante Falldateien oder weitere Nachweise hoch.",
  },
  fr: {
    applicantTypeOptionLabels: {
      private: "Particulier",
      sme_business: "PME / Entreprise",
    },
    proofTitle: "Preuve du demandeur",
    proofSubtitle:
      "Premiere preuve optionnelle pour les inscriptions particulier et PME / entreprise.",
    proofPrivateHint:
      "Televersez seulement les pages d'identite minimales necessaires.",
    proofBusinessHint:
      "Si utile, ajoutez une preuve du contact autorise ou de l'adresse professionnelle.",
    redactionHint:
      "Masquez les champs sensibles non necessaires avant le televersement.",
    stolenTitle:
      "ATTENTION : cochez uniquement si cet actif est deja signale comme vole",
    stolenSubtitle:
      "Utilisez ceci uniquement lorsque vous enregistrez un actif deja signale comme vole. Pour un enregistrement normal, laissez cette case decochee.",
    stolenToggle: "Cet actif a deja ete signale comme vole",
    policeReportNumber: "Numero de rapport de police",
    incidentDate: "Date de l'incident",
    incidentCountry: "Pays de l'incident",
    incidentCountryPlaceholder: "ex. Espagne",
    incidentDescription: "Description de l'incident",
    incidentDescriptionPlaceholder:
      "Ajoutez les details connus du vol, le lieu et des references sures.",
    supportingDocuments: "Documents justificatifs",
    supportingDocumentsDescription:
      "Televersez uniquement des fichiers de dossier pertinents et surs ou d'autres justificatifs.",
  },
  it: {
    applicantTypeOptionLabels: {
      private: "Privato",
      sme_business: "PMI / Azienda",
    },
    proofTitle: "Prova del richiedente",
    proofSubtitle:
      "Primo passaggio opzionale per registrazioni private e PMI / azienda.",
    proofPrivateHint:
      "Carica solo le pagine di identita minime necessarie per confermare il richiedente.",
    proofBusinessHint:
      "Se utile, aggiungi prova del contatto autorizzato o dell'indirizzo aziendale.",
    redactionHint:
      "Oscura i campi sensibili non necessari prima del caricamento.",
    stolenTitle:
      "ATTENZIONE: seleziona solo se questo asset risulta gia rubato",
    stolenSubtitle:
      "Usa questa opzione solo quando registri un asset gia segnalato come rubato. Per una registrazione normale, lascia deselezionato.",
    stolenToggle: "Questo asset e gia stato segnalato come rubato",
    policeReportNumber: "Numero del rapporto di polizia",
    incidentDate: "Data dell'incidente",
    incidentCountry: "Paese dell'incidente",
    incidentCountryPlaceholder: "es. Spagna",
    incidentDescription: "Descrizione dell'incidente",
    incidentDescriptionPlaceholder:
      "Aggiungi i dettagli noti del furto, la localita e riferimenti sicuri.",
    supportingDocuments: "Documenti di supporto",
    supportingDocumentsDescription:
      "Carica solo file del caso sicuri e pertinenti o altre prove di supporto.",
  },
  nl: {
    applicantTypeOptionLabels: {
      private: "Particulier",
      sme_business: "MKB / Bedrijf",
    },
    proofTitle: "Bewijs van aanvrager",
    proofSubtitle:
      "Optionele eerste stap voor particuliere en MKB / bedrijfsregistraties.",
    proofPrivateHint:
      "Upload alleen de minimale identiteitsbladen die nodig zijn om de aanvrager te bevestigen.",
    proofBusinessHint:
      "Voeg indien nuttig bewijs toe van de bevoegde contactpersoon of het bedrijfsadres.",
    redactionHint:
      "Maskeer onnodige gevoelige velden voor het uploaden.",
    stolenTitle: "LET OP: alleen aanvinken als dit asset al gestolen is",
    stolenSubtitle:
      "Gebruik dit alleen wanneer je een asset registreert dat al als gestolen is gemeld. Voor een normale registratie laat je dit uitgevinkt.",
    stolenToggle: "Dit asset is al als gestolen gemeld",
    policeReportNumber: "Politierapportnummer",
    incidentDate: "Datum van incident",
    incidentCountry: "Land van incident",
    incidentCountryPlaceholder: "bijv. Spanje",
    incidentDescription: "Beschrijving van incident",
    incidentDescriptionPlaceholder:
      "Voeg bekende diefstalgegevens, locatie en veilige referenties toe.",
    supportingDocuments: "Ondersteunende documenten",
    supportingDocumentsDescription:
      "Upload alleen veilige, relevante zaakdocumenten of ander ondersteunend bewijs.",
  },
  pt: {
    applicantTypeOptionLabels: {
      private: "Particular",
      sme_business: "PME / Empresa",
    },
    proofTitle: "Prova do requerente",
    proofSubtitle:
      "Primeiro passo opcional para registos particulares e PME / empresa.",
    proofPrivateHint:
      "Carregue apenas as paginas minimas de identidade necessarias para confirmar o requerente.",
    proofBusinessHint:
      "Se ajudar, adicione prova do contacto autorizado ou da morada comercial.",
    redactionHint:
      "Mascare campos sensiveis desnecessarios antes do carregamento.",
    stolenTitle:
      "ATENCAO: marque apenas se este ativo ja foi reportado como roubado",
    stolenSubtitle:
      "Use isto apenas quando estiver a registar um ativo ja reportado como roubado. Para um registo normal, deixe desmarcado.",
    stolenToggle: "Este ativo ja foi reportado como roubado",
    policeReportNumber: "Numero do relatorio policial",
    incidentDate: "Data do incidente",
    incidentCountry: "Pais do incidente",
    incidentCountryPlaceholder: "ex. Espanha",
    incidentDescription: "Descricao do incidente",
    incidentDescriptionPlaceholder:
      "Adicione detalhes conhecidos do roubo, local e referencias seguras.",
    supportingDocuments: "Documentos de suporte",
    supportingDocumentsDescription:
      "Carregue apenas ficheiros de caso seguros e relevantes ou outras provas de suporte.",
  },
  ru: {
    applicantTypeOptionLabels: {
      private: "Chastnoye litso",
      sme_business: "MSP / Biznes",
    },
    proofTitle: "Podtverzhdeniye zayavitelya",
    proofSubtitle:
      "Neobyazatelnyy pervyy shag dlya chastnykh i biznes / MSP registratsiy.",
    proofPrivateHint:
      "Zagruzite tolko minimalno neobkhodimyye stranitsy udostovereniya lichnosti.",
    proofBusinessHint:
      "Pri neobkhodimosti dobavte dokazatelstvo dlya upolnomochennogo kontakta ili adresa biznesa.",
    redactionHint:
      "Skroyte lishniye chuvstvitelnyye polya pered zagruzkoy.",
    stolenTitle:
      "Vnimaniye: otmette tolko esli etot aktiv uzhe zayavlen kak pokhishchennyy",
    stolenSubtitle:
      "Ispolzuyte eto tolko pri registratsii aktiva, kotoryy uzhe zayavlen kak pokhishchennyy. Dlya obychnoy registratsii ostavte bez otmetki.",
    stolenToggle: "Etot aktiv uzhe zayavlen kak pokhishchennyy",
    policeReportNumber: "Nomer politseskogo otcheta",
    incidentDate: "Data intsidenta",
    incidentCountry: "Strana intsidenta",
    incidentCountryPlaceholder: "naprimer, Ispaniya",
    incidentDescription: "Opisaniye intsidenta",
    incidentDescriptionPlaceholder:
      "Dobavte izvestnyye detali krazhi, mesto i bezopasnyye ssylki.",
    supportingDocuments: "Podderzhivayushchiye dokumenty",
    supportingDocumentsDescription:
      "Zagruzite otreduaktirovannyye fayly po politsii ili bezopasnoye podtverzhdeniye.",
  },
  zh: {
    applicantTypeOptionLabels: {
      private: "Siren",
      sme_business: "Zhongxiao qiye / Gongsi",
    },
    proofTitle: "Shenqingren zhengming",
    proofSubtitle:
      "Siren he zhongxiao qiye / gongsi zhuce de kexuan chubu zhengming.",
    proofPrivateHint:
      "Zhi shangchuan queren shenqingren suo bixu de zuixiao shenfen yemian.",
    proofBusinessHint:
      "Ruguo you bangzhu, keyi buchong shouquan lianxiren huo gongsi dizhi zhengming.",
    redactionHint:
      "Shangchuan qian qing zhedang bu bixu de mingan ziduan.",
    stolenTitle: "注意：仅当该资产已被报告为被盗时才勾选",
    stolenSubtitle:
      "仅在登记已被报告为被盗的资产时使用。普通登记请保持未勾选。",
    stolenToggle: "该资产已被报告为被盗",
    policeReportNumber: "Baoan bianhao",
    incidentDate: "Shijian riqi",
    incidentCountry: "Shijian guojia",
    incidentCountryPlaceholder: "li ru Xibanya",
    incidentDescription: "Shijian shuoming",
    incidentDescriptionPlaceholder:
      "Tianxie yizhi de daoqie xiangqing, didian he anquan cankao.",
    supportingDocuments: "Zhichi wenjian",
    supportingDocumentsDescription:
      "Shangchuan yi zhedang de baoan xiangguan wenjian huo anquan zhichi zhengju.",
  },
  hi: {
    applicantTypeOptionLabels: {
      private: "Niji",
      sme_business: "SME / Vyavsay",
    },
    proofTitle: "Aavedak ka praman",
    proofSubtitle:
      "Private aur SME / vyavsay registrations ke liye ek optional pehla step.",
    proofPrivateHint:
      "Sirf utne hi pahchan panne upload karen jitne aavedak ki pushti ke liye zaruri hon.",
    proofBusinessHint:
      "Zarurat ho to adhikrit sampark ya vyavsayik pate ka praman bhi joden.",
    redactionHint:
      "Upload se pehle gair-zaruri samvedanshil fields ko chhupa den.",
    stolenTitle:
      "ध्यान दें: केवल तभी चुनें जब यह एसेट पहले से चोरी रिपोर्ट हो",
    stolenSubtitle:
      "इसे केवल तब उपयोग करें जब आप ऐसा एसेट पंजीकृत कर रहे हों जिसे पहले से चोरी रिपोर्ट किया गया हो। सामान्य पंजीकरण के लिए इसे अनचेक छोड़ें।",
    stolenToggle: "यह एसेट पहले से चोरी रिपोर्ट किया जा चुका है",
    policeReportNumber: "Police report sankhya",
    incidentDate: "Ghatna ki tarikh",
    incidentCountry: "Ghatna ka desh",
    incidentCountryPlaceholder: "jaise Spain",
    incidentDescription: "Ghatna ka varnan",
    incidentDescriptionPlaceholder:
      "Chori ki jani hui details, jagah aur surakshit references joden.",
    supportingDocuments: "Sahayak dastavez",
    supportingDocumentsDescription:
      "Chhupai gayi police-sambandhit files ya surakshit sahayak saboot upload karen.",
  },
  ar: {
    applicantTypeOptionLabels: {
      private: "Fard",
      sme_business: "SME / Sharika",
    },
    proofTitle: "Ithbat muqaddim alttalab",
    proofSubtitle:
      "Khutwa awalya ikhtiyariya litasjilat alafrad wa SME / alsharikat.",
    proofPrivateHint:
      "Arfiq faqat safahat alhuwia aladna aldaruria litaakid muqaddim alttalab.",
    proofBusinessHint:
      "Idha kan mufidan, arfiq ithbatan liljihah almufawada aw alunwan altijari.",
    redactionHint:
      "Ihجب alhuqul alhassasa ghayr aldaruria qabl alraf.",
    stolenTitle: "Tasjil asl masruq",
    stolenSubtitle:
      "Idha kan hadha alasl qad utabir masruqan min qabl, faadkhil huna tafasil alqadiya alawaliya. Yumkin lilidara istikmal alqadiya لاحqan.",
    stolenToggle: "Hatha altasjil yakhuss aslan masruqan min qabl",
    policeReportNumber: "Raqm taqrir alshurta",
    incidentDate: "Tarikh alhadith",
    incidentCountry: "Dawlat alhadith",
    incidentCountryPlaceholder: "mithal: Isbaniya",
    incidentDescription: "Wasf alhadith",
    incidentDescriptionPlaceholder:
      "Adif tafasil alsariqa almaerufa walmakan wa almajiat alamina.",
    supportingDocuments: "Mustanadat daima",
    supportingDocumentsDescription:
      "Arfiq malafat mutaaliqa bitaqrir alshurta aw adilla daima amina baada alikhfa.",
  },

  pl: {
    applicantTypeOptionLabels: {
      private: "Private",
      sme_business: "SME / Business",
    },
    proofTitle: "Proof of applicant",
    proofSubtitle:
      "Optional first-step proof for private and SME / business registrations.",
    proofPrivateHint:
      "Upload only the minimum identity pages needed to confirm the applicant.",
    proofBusinessHint:
      "If useful, add proof for the authorized contact or business address.",
    redactionHint:
      "Please mask or redact unnecessary sensitive fields before upload.",
    stolenTitle: "WARNING: check this only if this asset is already stolen",
    stolenSubtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    stolenToggle: "This asset has already been reported stolen",
    policeReportNumber: "Police report number",
    incidentDate: "Incident date",
    incidentCountry: "Incident country",
    incidentCountryPlaceholder: "e.g. Spain",
    incidentDescription: "Incident description",
    incidentDescriptionPlaceholder:
      "Add the known theft details, location, and any safe references.",
    supportingDocuments: "Supporting documents",
    supportingDocumentsDescription:
      "Upload only safe, relevant case files or other supporting evidence.",
  },
  sv: {
    applicantTypeOptionLabels: {
      private: "Private",
      sme_business: "SME / Business",
    },
    proofTitle: "Proof of applicant",
    proofSubtitle:
      "Optional first-step proof for private and SME / business registrations.",
    proofPrivateHint:
      "Upload only the minimum identity pages needed to confirm the applicant.",
    proofBusinessHint:
      "If useful, add proof for the authorized contact or business address.",
    redactionHint:
      "Please mask or redact unnecessary sensitive fields before upload.",
    stolenTitle: "WARNING: check this only if this asset is already stolen",
    stolenSubtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    stolenToggle: "This asset has already been reported stolen",
    policeReportNumber: "Police report number",
    incidentDate: "Incident date",
    incidentCountry: "Incident country",
    incidentCountryPlaceholder: "e.g. Spain",
    incidentDescription: "Incident description",
    incidentDescriptionPlaceholder:
      "Add the known theft details, location, and any safe references.",
    supportingDocuments: "Supporting documents",
    supportingDocumentsDescription:
      "Upload only safe, relevant case files or other supporting evidence.",
  },
  da: {
    applicantTypeOptionLabels: {
      private: "Private",
      sme_business: "SME / Business",
    },
    proofTitle: "Proof of applicant",
    proofSubtitle:
      "Optional first-step proof for private and SME / business registrations.",
    proofPrivateHint:
      "Upload only the minimum identity pages needed to confirm the applicant.",
    proofBusinessHint:
      "If useful, add proof for the authorized contact or business address.",
    redactionHint:
      "Please mask or redact unnecessary sensitive fields before upload.",
    stolenTitle: "WARNING: check this only if this asset is already stolen",
    stolenSubtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    stolenToggle: "This asset has already been reported stolen",
    policeReportNumber: "Police report number",
    incidentDate: "Incident date",
    incidentCountry: "Incident country",
    incidentCountryPlaceholder: "e.g. Spain",
    incidentDescription: "Incident description",
    incidentDescriptionPlaceholder:
      "Add the known theft details, location, and any safe references.",
    supportingDocuments: "Supporting documents",
    supportingDocumentsDescription:
      "Upload only safe, relevant case files or other supporting evidence.",
  },
  no: {
    applicantTypeOptionLabels: {
      private: "Private",
      sme_business: "SME / Business",
    },
    proofTitle: "Proof of applicant",
    proofSubtitle:
      "Optional first-step proof for private and SME / business registrations.",
    proofPrivateHint:
      "Upload only the minimum identity pages needed to confirm the applicant.",
    proofBusinessHint:
      "If useful, add proof for the authorized contact or business address.",
    redactionHint:
      "Please mask or redact unnecessary sensitive fields before upload.",
    stolenTitle: "WARNING: check this only if this asset is already stolen",
    stolenSubtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    stolenToggle: "This asset has already been reported stolen",
    policeReportNumber: "Police report number",
    incidentDate: "Incident date",
    incidentCountry: "Incident country",
    incidentCountryPlaceholder: "e.g. Spain",
    incidentDescription: "Incident description",
    incidentDescriptionPlaceholder:
      "Add the known theft details, location, and any safe references.",
    supportingDocuments: "Supporting documents",
    supportingDocumentsDescription:
      "Upload only safe, relevant case files or other supporting evidence.",
  },
};

const VAT_LABELS: Record<Lang, string> = {
  en: "VAT number",
  es: "Numero de IVA",
  de: "USt-IdNr.",
  fr: "Numero de TVA",
  it: "Partita IVA",
  nl: "BTW-nummer",
  pt: "Numero de IVA",
  ru: "Nomer NDS",
  zh: "VAT / zengzhishui hao",
  hi: "VAT number",
  ar: "Raqm daribat alqima almudafa",
  pl: "Numer VAT",
  sv: "Momsnummer",
  da: "Momsnummer",
  no: "MVA-nummer",
};

const VAT_PLACEHOLDER = "ESB12345678 / NL123456789B01";

const WORKFLOW_STATUS_TEXT: Record<Lang, string> = {
  en: "Current dashboard status:",
  es: "Estado actual del dashboard:",
  de: "Aktueller Dashboard-Status:",
  fr: "Statut actuel du tableau de bord :",
  it: "Stato attuale del dashboard:",
  nl: "Huidige dashboardstatus:",
  pt: "Estado atual do painel:",
  ru: "Tekushchiy status dashboard:",
  zh: "Dangqian dashboard zhuangtai:",
  hi: "Vartaman dashboard sthiti:",
  ar: "Halat aldashboard alhali:",

  pl: "Current dashboard status:",
  sv: "Current dashboard status:",
  da: "Current dashboard status:",
  no: "Current dashboard status:",
};

type RegistrationUxGuidanceText = {
  title: string;
  checklist: [string, string, string, string];
  note: string;
  categoryHint: string;
  documentHelp: string;
  documentHelpInvoice: string;
  documentHelpOwnership: string;
};

type StolenWarningText = {
  title: string;
  subtitle: string;
  toggle: string;
};

const REGISTRATION_UX_GUIDANCE_TEXT: Record<Lang, RegistrationUxGuidanceText> = {
  en: {
    title: "What do you need?",
    checklist: [
      "Serial number, VIN, or another unique identifier",
      "Photo of the asset, for example bike, vehicle, or equipment (optional)",
      "Invoice or proof of purchase (required if available)",
      "Proof of ownership or transfer, where applicable",
    ],
    note:
      "Keep these details ready before you start. This prevents having to search again or upload documents later.",
    categoryHint:
      "Select what you want to register, for example bike, car, trailer, machine, or equipment.",
    documentHelp:
      "An invoice or proof of purchase can also serve as proof of ownership.",
    documentHelpInvoice: "Invoice / proof of purchase: required if available.",
    documentHelpOwnership:
      "Extra proof of ownership or transfer: optional, only if you have this separately.",
  },
  es: {
    title: "¿Qué necesitas?",
    checklist: [
      "Numero de serie, VIN u otro identificador unico",
      "Foto del activo, por ejemplo bicicleta, vehiculo o equipo (opcional)",
      "Factura o comprobante de compra (obligatorio si esta disponible)",
      "Prueba de propiedad o de transferencia, cuando corresponda",
    ],
    note:
      "Ten estos datos a mano antes de empezar. Asi evitaras tener que volver a buscar o subir documentos mas tarde.",
    categoryHint:
      "Selecciona lo que quieres registrar, por ejemplo bicicleta, coche, remolque, maquina o equipo.",
    documentHelp:
      "Una factura o comprobante de compra tambien puede servir como prueba de propiedad.",
    documentHelpInvoice:
      "Factura / comprobante de compra: obligatorio si esta disponible.",
    documentHelpOwnership:
      "Prueba adicional de propiedad o transferencia: opcional, solo si la tienes por separado.",
  },
  de: {
    title: "Was benötigen Sie?",
    checklist: [
      "Seriennummer, VIN oder eine andere eindeutige Identifikationsnummer",
      "Foto des Assets, zum Beispiel Fahrrad, Fahrzeug oder Geraet (optional)",
      "Rechnung oder Kaufnachweis (verpflichtend, sofern vorhanden)",
      "Eigentums- oder Uebertragungsnachweis, falls zutreffend",
    ],
    note:
      "Halten Sie diese Angaben bereit, bevor Sie starten. So vermeiden Sie, spaeter erneut suchen oder Dokumente hochladen zu muessen.",
    categoryHint:
      "Waehlen Sie aus, was Sie registrieren moechten, z. B. Fahrrad, Auto, Anhaenger, Maschine oder Geraet.",
    documentHelp:
      "Eine Rechnung oder ein Kaufnachweis kann auch als Eigentumsnachweis dienen.",
    documentHelpInvoice:
      "Rechnung / Kaufnachweis: verpflichtend, sofern vorhanden.",
    documentHelpOwnership:
      "Zusaetzlicher Eigentums- oder Uebertragungsnachweis: optional, nur wenn separat vorhanden.",
  },
  fr: {
    title: "De quoi avez-vous besoin ?",
    checklist: [
      "Numero de serie, VIN ou autre identifiant unique",
      "Photo de l’actif, par exemple velo, vehicule ou equipement (optionnel)",
      "Facture ou preuve d’achat (obligatoire si disponible)",
      "Preuve de propriete ou de transfert, le cas echeant",
    ],
    note:
      "Gardez ces informations a portee de main avant de commencer. Cela evite de devoir rechercher a nouveau ou televerser des documents plus tard.",
    categoryHint:
      "Selectionnez ce que vous souhaitez enregistrer, par exemple velo, voiture, remorque, machine ou equipement.",
    documentHelp:
      "Une facture ou une preuve d’achat peut aussi servir de preuve de propriete.",
    documentHelpInvoice: "Facture / preuve d’achat : obligatoire si disponible.",
    documentHelpOwnership:
      "Preuve supplementaire de propriete ou de transfert : optionnelle, uniquement si vous l’avez separement.",
  },
  it: {
    title: "Di cosa hai bisogno?",
    checklist: [
      "Numero di serie, VIN o altro identificativo univoco",
      "Foto dell’asset, ad esempio bici, veicolo o attrezzatura (opzionale)",
      "Fattura o prova d’acquisto (obbligatoria se disponibile)",
      "Prova di proprieta o di trasferimento, se applicabile",
    ],
    note:
      "Tieni questi dati a portata di mano prima di iniziare. Cosi eviti di dover cercare di nuovo o caricare documenti piu tardi.",
    categoryHint:
      "Seleziona cosa vuoi registrare, ad esempio bici, auto, rimorchio, macchina o attrezzatura.",
    documentHelp:
      "Una fattura o prova d’acquisto puo anche valere come prova di proprieta.",
    documentHelpInvoice:
      "Fattura / prova d’acquisto: obbligatoria se disponibile.",
    documentHelpOwnership:
      "Prova aggiuntiva di proprieta o trasferimento: opzionale, solo se la possiedi separatamente.",
  },
  nl: {
    title: "Wat heb je nodig?",
    checklist: [
      "Serienummer, VIN of ander uniek identificatienummer",
      "Foto van het asset, bijvoorbeeld fiets, voertuig of materieel (optioneel)",
      "Factuur of aankoopbewijs (verplicht indien beschikbaar)",
      "Bewijs van eigendom of overdracht, indien van toepassing",
    ],
    note:
      "Zorg dat je deze gegevens bij de hand hebt voordat je begint. Dit voorkomt dat je later opnieuw moet zoeken of documenten moet uploaden.",
    categoryHint:
      "Selecteer wat je wilt registreren, bijvoorbeeld fiets, auto, trailer, machine of materieel.",
    documentHelp:
      "Een factuur of aankoopbewijs kan ook dienen als bewijs van eigendom.",
    documentHelpInvoice:
      "Factuur / aankoopbewijs: verplicht indien beschikbaar.",
    documentHelpOwnership:
      "Extra bewijs van eigendom of overdracht: optioneel, alleen indien je dit apart hebt.",
  },
  pt: {
    title: "Do que precisa?",
    checklist: [
      "Numero de serie, VIN ou outro identificador unico",
      "Foto do ativo, por exemplo bicicleta, veiculo ou equipamento (opcional)",
      "Fatura ou comprovativo de compra (obrigatorio se disponivel)",
      "Comprovativo de propriedade ou transferencia, quando aplicavel",
    ],
    note:
      "Tenha estes dados a mao antes de comecar. Assim evita ter de procurar novamente ou carregar documentos mais tarde.",
    categoryHint:
      "Selecione o que pretende registar, por exemplo bicicleta, carro, reboque, maquina ou equipamento.",
    documentHelp:
      "Uma fatura ou comprovativo de compra tambem pode servir como comprovativo de propriedade.",
    documentHelpInvoice:
      "Fatura / comprovativo de compra: obrigatorio se disponivel.",
    documentHelpOwnership:
      "Comprovativo adicional de propriedade ou transferencia: opcional, apenas se o tiver em separado.",
  },
  ru: {
    title: "Chto vam nuzhno?",
    checklist: [
      "Seriynyy nomer, VIN ili drugoy unikalnyy identifikator",
      "Foto aktiva, naprimer velosiped, transport ili oborudovaniye (neobyazatelno)",
      "Schet ili podtverzhdeniye pokupki (obyazatelno, esli est)",
      "Podtverzhdeniye prava sobstvennosti ili peredachi, esli primenimo",
    ],
    note:
      "Derzhite eti dannyye pod rukoy pered nachalom. Eto pomozhet ne iskat ikh zanovo i ne zagruzhat dokumenty pozhe.",
    categoryHint:
      "Vyberite, chto vy khotite zaregistrirovat, naprimer velosiped, avtomobil, pritsep, mashinu ili oborudovaniye.",
    documentHelp:
      "Schet ili podtverzhdeniye pokupki takzhe mozhet sluzhit podtverzhdeniyem prava sobstvennosti.",
    documentHelpInvoice:
      "Schet / podtverzhdeniye pokupki: obyazatelno, esli est.",
    documentHelpOwnership:
      "Dopolnitelnoye podtverzhdeniye prava sobstvennosti ili peredachi: neobyazatelno, tolko esli yest otdelno.",
  },
  zh: {
    title: "您需要什么？",
    checklist: [
      "序列号、VIN 或其他唯一识别号",
      "资产照片，例如自行车、车辆或设备（可选）",
      "发票或购买凭证（如有则必填）",
      "所有权或转让证明（如适用）",
    ],
    note:
      "开始前请准备好这些信息。这样可以避免后续再次查找或重新上传文件。",
    categoryHint: "请选择要登记的类型，例如自行车、汽车、拖车、机器或设备。",
    documentHelp: "发票或购买凭证也可作为所有权证明。",
    documentHelpInvoice: "发票 / 购买凭证：如有则必填。",
    documentHelpOwnership:
      "额外的所有权或转让证明：可选，仅在您单独持有时提供。",
  },
  hi: {
    title: "आपको क्या चाहिए?",
    checklist: [
      "सीरियल नंबर, VIN या कोई अन्य यूनिक पहचान नंबर",
      "एसेट की फोटो, जैसे साइकिल, वाहन या उपकरण (वैकल्पिक)",
      "इनवॉइस या खरीद प्रमाण (उपलब्ध हो तो अनिवार्य)",
      "मालिकाना या ट्रांसफर का प्रमाण, यदि लागू हो",
    ],
    note:
      "शुरू करने से पहले ये विवरण अपने पास रखें। इससे बाद में फिर से खोजने या दस्तावेज़ दोबारा अपलोड करने की जरूरत नहीं पड़ेगी।",
    categoryHint:
      "आप क्या रजिस्टर करना चाहते हैं चुनें, जैसे साइकिल, कार, ट्रेलर, मशीन या उपकरण।",
    documentHelp:
      "इनवॉइस या खरीद प्रमाण मालिकाना प्रमाण के रूप में भी काम कर सकता है।",
    documentHelpInvoice:
      "इनवॉइस / खरीद प्रमाण: उपलब्ध हो तो अनिवार्य।",
    documentHelpOwnership:
      "अतिरिक्त मालिकाना या ट्रांसफर प्रमाण: वैकल्पिक, केवल यदि यह अलग से उपलब्ध हो।",
  },
  ar: {
    title: "ما الذي تحتاجه؟",
    checklist: [
      "الرقم التسلسلي أو VIN أو أي مُعرّف فريد آخر",
      "صورة للأصل، مثل دراجة أو مركبة أو معدات (اختياري)",
      "فاتورة أو إثبات شراء (مطلوب إذا كان متاحًا)",
      "إثبات ملكية أو نقل، عند الاقتضاء",
    ],
    note:
      "جهّز هذه البيانات قبل البدء. هذا يمنع الحاجة للبحث مرة أخرى أو رفع المستندات لاحقًا.",
    categoryHint:
      "اختر ما تريد تسجيله، مثل دراجة أو سيارة أو مقطورة أو آلة أو معدات.",
    documentHelp:
      "يمكن أن تعمل الفاتورة أو إثبات الشراء أيضًا كإثبات ملكية.",
    documentHelpInvoice:
      "فاتورة / إثبات شراء: مطلوب إذا كان متاحًا.",
    documentHelpOwnership:
      "إثبات إضافي للملكية أو النقل: اختياري، فقط إذا كان متوفرًا لديك بشكل منفصل.",
  },
  pl: {
    title: "What do you need?",
    checklist: [
      "Serial number, VIN, or another unique identifier",
      "Photo of the asset, for example bike, vehicle, or equipment (optional)",
      "Invoice or proof of purchase (required if available)",
      "Proof of ownership or transfer, where applicable",
    ],
    note:
      "Keep these details ready before you start. This prevents having to search again or upload documents later.",
    categoryHint:
      "Select what you want to register, for example bike, car, trailer, machine, or equipment.",
    documentHelp:
      "An invoice or proof of purchase can also serve as proof of ownership.",
    documentHelpInvoice: "Invoice / proof of purchase: required if available.",
    documentHelpOwnership:
      "Extra proof of ownership or transfer: optional, only if you have this separately.",
  },
  sv: {
    title: "What do you need?",
    checklist: [
      "Serial number, VIN, or another unique identifier",
      "Photo of the asset, for example bike, vehicle, or equipment (optional)",
      "Invoice or proof of purchase (required if available)",
      "Proof of ownership or transfer, where applicable",
    ],
    note:
      "Keep these details ready before you start. This prevents having to search again or upload documents later.",
    categoryHint:
      "Select what you want to register, for example bike, car, trailer, machine, or equipment.",
    documentHelp:
      "An invoice or proof of purchase can also serve as proof of ownership.",
    documentHelpInvoice: "Invoice / proof of purchase: required if available.",
    documentHelpOwnership:
      "Extra proof of ownership or transfer: optional, only if you have this separately.",
  },
  da: {
    title: "What do you need?",
    checklist: [
      "Serial number, VIN, or another unique identifier",
      "Photo of the asset, for example bike, vehicle, or equipment (optional)",
      "Invoice or proof of purchase (required if available)",
      "Proof of ownership or transfer, where applicable",
    ],
    note:
      "Keep these details ready before you start. This prevents having to search again or upload documents later.",
    categoryHint:
      "Select what you want to register, for example bike, car, trailer, machine, or equipment.",
    documentHelp:
      "An invoice or proof of purchase can also serve as proof of ownership.",
    documentHelpInvoice: "Invoice / proof of purchase: required if available.",
    documentHelpOwnership:
      "Extra proof of ownership or transfer: optional, only if you have this separately.",
  },
  no: {
    title: "What do you need?",
    checklist: [
      "Serial number, VIN, or another unique identifier",
      "Photo of the asset, for example bike, vehicle, or equipment (optional)",
      "Invoice or proof of purchase (required if available)",
      "Proof of ownership or transfer, where applicable",
    ],
    note:
      "Keep these details ready before you start. This prevents having to search again or upload documents later.",
    categoryHint:
      "Select what you want to register, for example bike, car, trailer, machine, or equipment.",
    documentHelp:
      "An invoice or proof of purchase can also serve as proof of ownership.",
    documentHelpInvoice: "Invoice / proof of purchase: required if available.",
    documentHelpOwnership:
      "Extra proof of ownership or transfer: optional, only if you have this separately.",
  },
};

const STOLEN_WARNING_TEXT: Record<Lang, StolenWarningText> = {
  en: {
    title: "WARNING: check this only if this asset is already stolen",
    subtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    toggle: "This asset has already been reported stolen",
  },
  es: {
    title: "ATENCION: marque esto solo si este activo ya fue reportado como robado",
    subtitle:
      "Use esto solo cuando registre un activo que ya haya sido reportado como robado. Para un registro normal, dejelo sin marcar.",
    toggle: "Este activo ya fue reportado como robado",
  },
  de: {
    title:
      "ACHTUNG: nur ankreuzen, wenn dieses Asset bereits als gestohlen gemeldet ist",
    subtitle:
      "Nur verwenden, wenn Sie ein Asset registrieren, das bereits als gestohlen gemeldet wurde. Fur eine normale Registrierung nicht ankreuzen.",
    toggle: "Dieses Asset wurde bereits als gestohlen gemeldet",
  },
  fr: {
    title: "ATTENTION : cochez uniquement si cet actif est deja signale comme vole",
    subtitle:
      "Utilisez ceci uniquement lorsque vous enregistrez un actif deja signale comme vole. Pour un enregistrement normal, laissez cette case decochee.",
    toggle: "Cet actif a deja ete signale comme vole",
  },
  it: {
    title: "ATTENZIONE: seleziona solo se questo asset risulta gia rubato",
    subtitle:
      "Usa questa opzione solo quando registri un asset gia segnalato come rubato. Per una registrazione normale, lascia deselezionato.",
    toggle: "Questo asset e gia stato segnalato come rubato",
  },
  nl: {
    title: "LET OP: alleen aanvinken als dit asset al gestolen is",
    subtitle:
      "Gebruik dit alleen wanneer je een asset registreert dat al als gestolen is gemeld. Voor een normale registratie laat je dit uitgevinkt.",
    toggle: "Dit asset is al als gestolen gemeld",
  },
  pt: {
    title: "ATENCAO: marque apenas se este ativo ja foi reportado como roubado",
    subtitle:
      "Use isto apenas quando estiver a registar um ativo ja reportado como roubado. Para um registo normal, deixe desmarcado.",
    toggle: "Este ativo ja foi reportado como roubado",
  },
  ru: {
    title:
      "Vnimaniye: otmette tolko esli etot aktiv uzhe zayavlen kak pokhishchennyy",
    subtitle:
      "Ispolzuyte eto tolko pri registratsii aktiva, kotoryy uzhe zayavlen kak pokhishchennyy. Dlya obychnoy registratsii ostavte bez otmetki.",
    toggle: "Etot aktiv uzhe zayavlen kak pokhishchennyy",
  },
  zh: {
    title: "注意：仅当该资产已被报告为被盗时才勾选",
    subtitle: "仅在登记已被报告为被盗的资产时使用。普通登记请保持未勾选。",
    toggle: "该资产已被报告为被盗",
  },
  hi: {
    title: "ध्यान दें: केवल तभी चुनें जब यह एसेट पहले से चोरी रिपोर्ट हो",
    subtitle:
      "इसे केवल तब उपयोग करें जब आप ऐसा एसेट पंजीकृत कर रहे हों जिसे पहले से चोरी रिपोर्ट किया गया हो। सामान्य पंजीकरण के लिए इसे अनचेक छोड़ें।",
    toggle: "यह एसेट पहले से चोरी रिपोर्ट किया जा चुका है",
  },
  ar: {
    title:
      "تنبيه: فعّل هذا الخيار فقط إذا كان هذا الأصل مُبلّغًا عنه كمسروق بالفعل",
    subtitle:
      "استخدم هذا فقط عند تسجيل أصل تم الإبلاغ عنه مسبقًا كمسروق. للتسجيل العادي اتركه بدون تحديد.",
    toggle: "تم الإبلاغ عن هذا الأصل كمسروق بالفعل",
  },
  pl: {
    title: "WARNING: check this only if this asset is already stolen",
    subtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    toggle: "This asset has already been reported stolen",
  },
  sv: {
    title: "WARNING: check this only if this asset is already stolen",
    subtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    toggle: "This asset has already been reported stolen",
  },
  da: {
    title: "WARNING: check this only if this asset is already stolen",
    subtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    toggle: "This asset has already been reported stolen",
  },
  no: {
    title: "WARNING: check this only if this asset is already stolen",
    subtitle:
      "Use this only when registering an asset that has already been reported stolen. For a normal registration, leave this unchecked.",
    toggle: "This asset has already been reported stolen",
  },
};

function normalizeStandardApplicantType(
  value: ApplicantType
): Extract<ApplicantType, "private" | "sme"> {
  return value === "sme" ? "sme" : "private";
}

function getApplicantTypeOption(
  value: ApplicantType
): StandardApplicantTypeOption {
  return value === "sme" ? "sme_business" : "private";
}

function toApplicantType(
  value: StandardApplicantTypeOption
): Extract<ApplicantType, "private" | "sme"> {
  return value === "sme_business" ? "sme" : "private";
}

function createInitialStolenAssetIntake(): StolenAssetIntakeState {
  return {
    enabled: false,
    policeReportNumber: "",
    incidentDate: "",
    country: "",
    incidentDescription: "",
    supportingDocuments: [],
  };
}

function buildSubmissionDocuments(
  documents: RegistrationDocumentMap,
  proofDocuments: Partial<Record<ProofDocumentKey, RegistrationDocumentState>>,
  applicantType: ApplicantType,
  stolenAssetIntake: StolenAssetIntakeState
): RegistrationDocumentMapWithStolen {
  const nextDocuments: RegistrationDocumentMapWithStolen = { ...documents };

  if (proofDocuments.applicant_id?.files?.length) {
    nextDocuments.applicant_id = proofDocuments.applicant_id;
  } else {
    delete nextDocuments.applicant_id;
  }

  if (applicantType === "sme" && proofDocuments.proof_of_address?.files?.length) {
    nextDocuments.proof_of_address = proofDocuments.proof_of_address;
  } else {
    delete nextDocuments.proof_of_address;
  }

  if (stolenAssetIntake.enabled && stolenAssetIntake.supportingDocuments.length > 0) {
    nextDocuments.stolen_supporting_document = {
      status: "uploaded",
      fileName: stolenAssetIntake.supportingDocuments[0]?.originalName ?? "",
      files: stolenAssetIntake.supportingDocuments,
    };
  } else {
    delete nextDocuments.stolen_supporting_document;
  }

  return nextDocuments;
}

function buildSubmissionDynamicFields(
  dynamicFields: RegistrationDraft["dynamicFields"],
  stolenAssetIntake: StolenAssetIntakeState
) {
  const nextFields = { ...dynamicFields };

  if (!stolenAssetIntake.enabled) {
    delete nextFields.stolenAssetIntake;
    return nextFields;
  }

  nextFields.stolenAssetIntake = {
    enabled: true,
    policeReportNumber: stolenAssetIntake.policeReportNumber.trim(),
    incidentDate: stolenAssetIntake.incidentDate,
    country: stolenAssetIntake.country.trim(),
    incidentDescription: stolenAssetIntake.incidentDescription.trim(),
    supportingDocuments: stolenAssetIntake.supportingDocuments,
    supportingDocumentReferences: stolenAssetIntake.supportingDocuments.map(
      (file) => file.originalName
    ),
  };

  return nextFields;
}

type UploadFieldCardProps = {
  lang: Lang;
  inputId: string;
  label: string;
  description?: string;
  bucket: RegistrationDocumentKey | "stolen_supporting_document";
  multiple?: boolean;
  files: StoredUpload[];
  onChange: (files: StoredUpload[]) => void;
};

function UploadFieldCard({
  lang,
  inputId,
  label,
  description,
  bucket,
  multiple = false,
  files,
  onChange,
}: UploadFieldCardProps) {
  const uploadText = getRegistryUploadText(lang);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) {
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploads = await uploadFilesForBucket(bucket, Array.from(fileList));
      const nextFiles = multiple ? [...files, ...uploads] : uploads;
      onChange(nextFiles);
    } catch (uploadError) {
      const localizedError =
        uploadError instanceof ClientUploadError &&
        (uploadError.code === "file_too_large" ||
          uploadError.code === "invalid_file_type")
          ? uploadText.sizeHelp
          : uploadText.uploadFailed;

      setError(localizedError);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-zinc-900">{label}</p>
          {description ? (
            <p className="mt-2 text-sm text-zinc-600">{description}</p>
          ) : null}
        </div>

        <div className="lg:w-[440px]">
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor={inputId}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
              {uploading
                ? uploadText.uploading
                : files.length > 0
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
                  // TODO: investigate reported issue where upload/re-render may clear entered form data.
                  void handleUpload(event.target.files);
                  event.currentTarget.value = "";
                }}
              />

            {files.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  onChange([]);
                  setError("");
                }}
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                {uploadText.clearFiles}
              </button>
            ) : null}
          </div>

          <p className="mt-3 text-xs text-zinc-500">{uploadText.sizeHelp}</p>

          <div className="mt-4">
            {files.length > 0 ? (
              <ul className="space-y-2">
                {files.map((file) => (
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

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function RegistrationFormStep1({
  lang,
  initialApplicantType = "private",
  ownerIdentity = null,
}: Props) {
  const normalizedInitialApplicantType =
    normalizeStandardApplicantType(initialApplicantType);
  const [draft, setDraft] = useState<RegistrationDraft>(() => {
    const initialDraft = createEmptyRegistrationDraft(normalizedInitialApplicantType);

    if (ownerIdentity) {
      initialDraft.ownerName = ownerIdentity.name ?? "";
      initialDraft.ownerEmail = ownerIdentity.email ?? "";
    }

    return initialDraft;
  });
  const [proofDocuments, setProofDocuments] = useState<
    Partial<Record<ProofDocumentKey, RegistrationDocumentState>>
  >({});
  const [stolenAssetIntake, setStolenAssetIntake] = useState<StolenAssetIntakeState>(
    createInitialStolenAssetIntake
  );

  const paymentCompleted =
    draft.applicantType === "insurer_partner" ||
    draft.applicantType === "bank_partner" ||
    draft.applicantType === "dealer_partner" ||
    draft.applicantType === "rental_partner";

  const [saveState, saveAction, savePending] = useActionState(
    saveRegistrationDraft,
    initialActionState
  );

  const [submitState, submitAction, submitPending] = useActionState(
    submitRegistrationRequest,
    initialActionState
  );
  const [submitLocked, setSubmitLocked] = useState(false);

  useEffect(() => {
    if (!submitPending && !submitState.success) {
      setSubmitLocked(false);
    }
  }, [submitPending, submitState.success, submitState.message]);

  const submissionDynamicFields = useMemo(
    () => buildSubmissionDynamicFields(draft.dynamicFields, stolenAssetIntake),
    [draft.dynamicFields, stolenAssetIntake]
  );

  const submissionDocuments = useMemo(
    () =>
      buildSubmissionDocuments(
        draft.documents,
        proofDocuments,
        draft.applicantType,
        stolenAssetIntake
      ),
    [draft.documents, proofDocuments, draft.applicantType, stolenAssetIntake]
  );

  const safeSubmissionDynamicFields = useMemo(
    () => stripHeavyUploadPayloads(submissionDynamicFields) as typeof submissionDynamicFields,
    [submissionDynamicFields]
  );

  const safeSubmissionDocuments = useMemo(
    () =>
      stripHeavyUploadPayloads(
        submissionDocuments
      ) as RegistrationDocumentMapWithStolen,
    [submissionDocuments]
  );

  const composedDraft = useMemo(
    () => ({
      ...draft,
      dynamicFields: safeSubmissionDynamicFields,
      documents: safeSubmissionDocuments,
    }),
    [draft, safeSubmissionDynamicFields, safeSubmissionDocuments]
  );

  const completeness = useMemo(
    () => evaluateRegistrationCompleteness(composedDraft),
    [composedDraft]
  );

  const requestStatus = useMemo(
    () => deriveRequestStatus(composedDraft),
    [composedDraft]
  );

  const text = repairMojibakeDeep(FORM_TEXT[lang]);
  const extraText = repairMojibakeDeep(EXTRA_FORM_TEXT[lang]);
  const uxGuidanceText = repairMojibakeDeep(REGISTRATION_UX_GUIDANCE_TEXT[lang]);
  const stolenWarningText = repairMojibakeDeep(STOLEN_WARNING_TEXT[lang]);
  const uploadText = repairMojibakeDeep(getRegistryUploadText(lang));
  const applicantIdText = repairMojibakeDeep(
    getDocumentText(lang, "applicant_id")
  );
  const proofOfAddressText = repairMojibakeDeep(
    getDocumentText(lang, "proof_of_address")
  );
  const assetPhotoText = repairMojibakeDeep(
    getDocumentText(lang, "asset_overview_photo")
  );
  const vatLabel = repairMojibakeDeep(VAT_LABELS[lang]);

  function updateField<K extends keyof RegistrationDraft>(
    key: K,
    value: RegistrationDraft[K]
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateDynamicField(key: string, value: unknown) {
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

  function updateUploadedDocumentField(
    key: RegistrationDocumentKey,
    files: StoredUpload[]
  ) {
    updateDocumentField(
      key,
      files.length > 0
        ? {
            status: "uploaded",
            fileName: files[0]?.originalName ?? "",
            files,
          }
        : {
            status: "missing",
            fileName: "",
            files: [],
          }
    );
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

  function updateProofDocumentField(
    key: ProofDocumentKey,
    files: StoredUpload[]
  ) {
    setProofDocuments((prev) => ({
      ...prev,
      [key]:
        files.length > 0
          ? {
              status: "uploaded",
              fileName: files[0]?.originalName ?? "",
              files,
            }
          : undefined,
    }));
  }

  function updateStolenAssetIntake<K extends keyof StolenAssetIntakeState>(
    key: K,
    value: StolenAssetIntakeState[K]
  ) {
    setStolenAssetIntake((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleApplicantTypeChange(value: StandardApplicantTypeOption) {
    updateField("applicantType", toApplicantType(value));
  }

  const applicantTypeOption = getApplicantTypeOption(draft.applicantType);
  const showProofOfApplicant =
    draft.applicantType === "private" || draft.applicantType === "sme";
  const ownerIdentityLocked = Boolean(ownerIdentity);

  return (
    <div className="space-y-8">
      <form action={saveAction} className="space-y-8">
        <input type="hidden" name="lang" value={lang} />
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
        <input type="hidden" name="vatNumber" value={draft.vatNumber ?? ""} />
        <input
          type="hidden"
          name="applicantType"
          value={draft.applicantType}
        />
        <input
          type="hidden"
          name="declarationAccepted"
          value={draft.declarationAccepted ? "true" : "false"}
        />
        <input
          type="hidden"
          name="dynamicFields"
          value={JSON.stringify(safeSubmissionDynamicFields)}
        />
        <input
          type="hidden"
          name="documents"
          value={JSON.stringify(safeSubmissionDocuments)}
        />

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            {uxGuidanceText.title}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            {uxGuidanceText.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-zinc-600">{uxGuidanceText.note}</p>
        </section>

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
              <label
                htmlFor="applicantType"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
                {text.applicantType}
              </label>
              <select
                id="applicantType"
                value={applicantTypeOption}
                onChange={(e) =>
                  handleApplicantTypeChange(
                    e.target.value as StandardApplicantTypeOption
                  )
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              >
                {APPLICANT_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {extraText.applicantTypeOptionLabels[option]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="assetName"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
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
            <p className="mt-2 text-sm text-zinc-600">
              {uxGuidanceText.categoryHint}
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
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
              <label
                htmlFor="model"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
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
              <label
                htmlFor="serialNumber"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
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
              <label
                htmlFor="year"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
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
              <label
                htmlFor="country"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
                {text.country}
              </label>
              <SearchableCountrySelect
                id="country"
                lang={lang}
                value={draft.country ?? ""}
                onChange={(value) => updateField("country", value)}
                placeholder={text.countryPlaceholder}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>

            {!ownerIdentityLocked ? (
              <>
                <div>
                  <label
                    htmlFor="ownerName"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
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
                  <label
                    htmlFor="ownerEmail"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
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
              </>
            ) : null}

            {draft.applicantType === "sme" ? (
              <div className="sm:col-span-2">
                <label
                  htmlFor="vatNumber"
                  className="mb-2 block text-sm font-medium text-zinc-900"
                >
                  {vatLabel}
                </label>
                <input
                  id="vatNumber"
                  type="text"
                  value={draft.vatNumber ?? ""}
                  onChange={(e) => updateField("vatNumber", e.target.value)}
                  placeholder={VAT_PLACEHOLDER}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              {stolenWarningText.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              {stolenWarningText.subtitle}
            </p>
            <p className="mt-2 text-xs text-zinc-500">{uploadText.privacyNote}</p>
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={stolenAssetIntake.enabled}
              onChange={(event) =>
                updateStolenAssetIntake("enabled", event.target.checked)
              }
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span className="text-sm text-zinc-700">
              {stolenWarningText.toggle}
            </span>
          </label>

          {stolenAssetIntake.enabled ? (
            <div className="mt-5 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="policeReportNumber"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
                    {extraText.policeReportNumber}
                  </label>
                  <input
                    id="policeReportNumber"
                    type="text"
                    value={stolenAssetIntake.policeReportNumber}
                    onChange={(event) =>
                      updateStolenAssetIntake(
                        "policeReportNumber",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="incidentDate"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
                    {extraText.incidentDate}
                  </label>
                  <input
                    id="incidentDate"
                    type="date"
                    value={stolenAssetIntake.incidentDate}
                    onChange={(event) =>
                      updateStolenAssetIntake("incidentDate", event.target.value)
                    }
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="incidentCountry"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
                    {extraText.incidentCountry}
                  </label>
                  <SearchableCountrySelect
                    id="incidentCountry"
                    lang={lang}
                    value={stolenAssetIntake.country}
                    onChange={(value) =>
                      updateStolenAssetIntake("country", value)
                    }
                    placeholder={extraText.incidentCountryPlaceholder}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="incidentDescription"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                  >
                    {extraText.incidentDescription}
                  </label>
                  <textarea
                    id="incidentDescription"
                    value={stolenAssetIntake.incidentDescription}
                    onChange={(event) =>
                      updateStolenAssetIntake(
                        "incidentDescription",
                        event.target.value
                      )
                    }
                    placeholder={extraText.incidentDescriptionPlaceholder}
                    rows={4}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                  />
                </div>
              </div>

              <UploadFieldCard
                lang={lang}
                inputId="stolen-supporting-documents"
                label={extraText.supportingDocuments}
                description={extraText.supportingDocumentsDescription}
                bucket="stolen_supporting_document"
                multiple
                files={stolenAssetIntake.supportingDocuments}
                onChange={(files) =>
                  updateStolenAssetIntake("supportingDocuments", files)
                }
              />
            </div>
          ) : null}
        </section>

        <DynamicAssetFields
          lang={lang}
          category={draft.category}
          subcategory={draft.subcategory}
          values={draft.dynamicFields}
          onChange={updateDynamicField}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              {assetPhotoText.label}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              {assetPhotoText.description}
            </p>
            <p className="mt-2 text-xs text-zinc-500">{uploadText.privacyNote}</p>
          </div>

          <UploadFieldCard
            lang={lang}
            inputId="asset-overview-photo-upload"
            label={assetPhotoText.label}
            description={assetPhotoText.description}
            bucket="asset_overview_photo"
            multiple
            files={draft.documents.asset_overview_photo?.files ?? []}
            onChange={(files) =>
              updateUploadedDocumentField("asset_overview_photo", files)
            }
          />
        </section>

        {showProofOfApplicant ? (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-zinc-900">
                {extraText.proofTitle}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                {extraText.proofSubtitle}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                {extraText.redactionHint}
              </p>
            </div>

            <div className="space-y-4">
              <UploadFieldCard
                lang={lang}
                inputId="applicant-proof-upload"
                label={applicantIdText.label}
                description={`${extraText.proofPrivateHint} ${applicantIdText.description ?? ""}`.trim()}
                bucket="applicant_id"
                multiple
                files={proofDocuments.applicant_id?.files ?? []}
                onChange={(files) => updateProofDocumentField("applicant_id", files)}
              />

              {draft.applicantType === "sme" ? (
                <UploadFieldCard
                  lang={lang}
                  inputId="business-proof-upload"
                  label={proofOfAddressText.label}
                  description={`${extraText.proofBusinessHint} ${proofOfAddressText.description ?? ""}`.trim()}
                  bucket="proof_of_address"
                  files={proofDocuments.proof_of_address?.files ?? []}
                  onChange={(files) =>
                    updateProofDocumentField("proof_of_address", files)
                  }
                />
              ) : null}
            </div>
          </section>
        ) : null}

        <DocumentRequirementsPanel
          lang={lang}
          applicantType={draft.applicantType}
          category={draft.category}
          documents={draft.documents}
          onChange={updateDocumentField}
          hiddenKeys={["asset_overview_photo"]}
        />

        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <p className="text-sm text-zinc-700">{uxGuidanceText.documentHelp}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            <li>{uxGuidanceText.documentHelpInvoice}</li>
            <li>{uxGuidanceText.documentHelpOwnership}</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={draft.declarationAccepted}
              onChange={(e) =>
                updateField("declarationAccepted", e.target.checked)
              }
              className="mt-1 h-4 w-4 rounded border-zinc-300"
            />
            <span className="text-sm text-zinc-700">{text.declaration}</span>
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
                {repairMojibakeDeep(WORKFLOW_STATUS_TEXT[lang])}{" "}
                <strong>{getLocalizedRequestStatusLabel(requestStatus, lang)}</strong>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                disabled={savePending || submitPending || submitLocked}
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

      <form
        action={submitAction}
        onSubmitCapture={() => {
          setSubmitLocked(true);
        }}
      >
        <input type="hidden" name="lang" value={lang} />
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
        <input type="hidden" name="vatNumber" value={draft.vatNumber ?? ""} />
        <input
          type="hidden"
          name="applicantType"
          value={draft.applicantType}
        />
        <input
          type="hidden"
          name="declarationAccepted"
          value={draft.declarationAccepted ? "true" : "false"}
        />
        <input
          type="hidden"
          name="dynamicFields"
          value={JSON.stringify(safeSubmissionDynamicFields)}
        />
        <input
          type="hidden"
          name="documents"
          value={JSON.stringify(safeSubmissionDocuments)}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              disabled={submitPending || submitLocked}
            >
              {submitPending ? text.submitting : text.submitRegistration}
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
