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
    assetName: "Nom de l’actif",
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
    assetName: "Nome dell’asset",
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
    assetName: "Naam van het asset",
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
    assetName: "Nome do ativo",
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
    assetName: "Название актива",
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
    assetName: "资产名称",
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
    assetName: "एसेट नाम",
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
    assetName: "اسم الأصل",
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
};

export default function RegistrationFormStep1({
  lang,
  initialApplicantType = "private",
}: Props) {
  const [draft, setDraft] = useState<RegistrationDraft>(
    createEmptyRegistrationDraft(initialApplicantType)
  );

  const paymentCompleted = true;

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
    () => deriveRequestStatus(draft),
    [draft]
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
  }

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
              <label
                htmlFor="applicantType"
                className="mb-2 block text-sm font-medium text-zinc-900"
              >
                {text.applicantType}
              </label>
              <select
                id="applicantType"
                value={draft.applicantType}
                onChange={(e) =>
                  handleApplicantTypeChange(e.target.value as ApplicantType)
                }
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
                {text.workflowStatus} <strong>{requestStatus}</strong>
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
