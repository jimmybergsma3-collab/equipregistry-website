import type { Lang } from "./config";

export type PassportPageContent = {
  eyebrow: string;
  documentTitle: string;
  publicNote: string;
  statusLabel: string;
  qrTitle: string;
  qrText: string;
  qrAlt: string;
  verificationPanelTitle: string;
  verificationPanelText: string;
  verificationUrlLabel: string;
  fields: {
    passportNumber: string;
    assetName: string;
    category: string;
    subcategory: string;
    brand: string;
    model: string;
    year: string;
    country: string;
    serialNumber: string;
  };
  unavailable: string;
};

const PASSPORT_PAGE_CONTENT: Record<Lang, PassportPageContent> = {
  en: {
    eyebrow: "EquipRegistry",
    documentTitle: "Asset Passport",
    publicNote:
      "This public passport is the official EquipRegistry record for the approved asset registration.",
    statusLabel: "Status",
    qrTitle: "Scan QR code",
    qrText:
      "Scan the QR code to open this public passport directly in EquipRegistry for verification and printed record use.",
    qrAlt: "QR code linking to the public EquipRegistry passport",
    verificationPanelTitle: "Official verification",
    verificationPanelText:
      "This passport remains permanently linked to the approved registration number and asset record in EquipRegistry.",
    verificationUrlLabel: "Verification URL",
    fields: {
      passportNumber: "Passport number",
      assetName: "Asset name",
      category: "Category",
      subcategory: "Subcategory",
      brand: "Brand",
      model: "Model",
      year: "Year",
      country: "Country",
      serialNumber: "Serial number",
    },
    unavailable: "Not available",
  },
  es: {
    eyebrow: "EquipRegistry",
    documentTitle: "Pasaporte del activo",
    publicNote:
      "Este pasaporte público es el registro oficial de EquipRegistry para la inscripción aprobada del activo.",
    statusLabel: "Estado",
    qrTitle: "Escanear código QR",
    qrText:
      "Escanee el código QR para abrir este pasaporte público directamente en EquipRegistry para verificación y uso en impresión.",
    qrAlt: "Código QR vinculado al pasaporte público de EquipRegistry",
    verificationPanelTitle: "Verificación oficial",
    verificationPanelText:
      "Este pasaporte permanece vinculado de forma permanente al número de registro aprobado y al expediente del activo en EquipRegistry.",
    verificationUrlLabel: "URL de verificación",
    fields: {
      passportNumber: "Número de pasaporte",
      assetName: "Nombre del activo",
      category: "Categoría",
      subcategory: "Subcategoría",
      brand: "Marca",
      model: "Modelo",
      year: "Año",
      country: "País",
      serialNumber: "Número de serie",
    },
    unavailable: "No disponible",
  },
  de: {
    eyebrow: "EquipRegistry",
    documentTitle: "Asset-Pass",
    publicNote:
      "Dieser öffentliche Pass ist der offizielle EquipRegistry-Datensatz für die genehmigte Asset-Registrierung.",
    statusLabel: "Status",
    qrTitle: "QR-Code scannen",
    qrText:
      "Scannen Sie den QR-Code, um diesen öffentlichen Pass direkt in EquipRegistry zur Verifikation und für Druckunterlagen zu öffnen.",
    qrAlt: "QR-Code zum öffentlichen EquipRegistry-Pass",
    verificationPanelTitle: "Offizielle Verifikation",
    verificationPanelText:
      "Dieser Pass bleibt dauerhaft mit der genehmigten Registrierungsnummer und dem Asset-Datensatz in EquipRegistry verknüpft.",
    verificationUrlLabel: "Verifikations-URL",
    fields: {
      passportNumber: "Passnummer",
      assetName: "Asset-Name",
      category: "Kategorie",
      subcategory: "Unterkategorie",
      brand: "Marke",
      model: "Modell",
      year: "Jahr",
      country: "Land",
      serialNumber: "Seriennummer",
    },
    unavailable: "Nicht verfügbar",
  },
  fr: {
    eyebrow: "EquipRegistry",
    documentTitle: "Passeport de l’actif",
    publicNote:
      "Ce passeport public est l’enregistrement officiel d’EquipRegistry pour l’inscription approuvée de l’actif.",
    statusLabel: "Statut",
    qrTitle: "Scanner le code QR",
    qrText:
      "Scannez le code QR pour ouvrir ce passeport public directement dans EquipRegistry pour la vérification et l’impression.",
    qrAlt: "Code QR lié au passeport public EquipRegistry",
    verificationPanelTitle: "Vérification officielle",
    verificationPanelText:
      "Ce passeport reste lié de manière permanente au numéro d’enregistrement approuvé et au dossier de l’actif dans EquipRegistry.",
    verificationUrlLabel: "URL de vérification",
    fields: {
      passportNumber: "Numéro de passeport",
      assetName: "Nom de l’actif",
      category: "Catégorie",
      subcategory: "Sous-catégorie",
      brand: "Marque",
      model: "Modèle",
      year: "Année",
      country: "Pays",
      serialNumber: "Numéro de série",
    },
    unavailable: "Non disponible",
  },
  it: {
    eyebrow: "EquipRegistry",
    documentTitle: "Passaporto dell’asset",
    publicNote:
      "Questo passaporto pubblico è il record ufficiale di EquipRegistry per la registrazione approvata dell’asset.",
    statusLabel: "Stato",
    qrTitle: "Scansiona il codice QR",
    qrText:
      "Scansiona il codice QR per aprire questo passaporto pubblico direttamente in EquipRegistry per verifica e stampa.",
    qrAlt: "Codice QR collegato al passaporto pubblico EquipRegistry",
    verificationPanelTitle: "Verifica ufficiale",
    verificationPanelText:
      "Questo passaporto rimane collegato in modo permanente al numero di registrazione approvato e al record dell’asset in EquipRegistry.",
    verificationUrlLabel: "URL di verifica",
    fields: {
      passportNumber: "Numero passaporto",
      assetName: "Nome dell’asset",
      category: "Categoria",
      subcategory: "Sottocategoria",
      brand: "Marchio",
      model: "Modello",
      year: "Anno",
      country: "Paese",
      serialNumber: "Numero di serie",
    },
    unavailable: "Non disponibile",
  },
  nl: {
    eyebrow: "EquipRegistry",
    documentTitle: "Assetpaspoort",
    publicNote:
      "Dit publieke paspoort is het officiële EquipRegistry-record voor de goedgekeurde assetregistratie.",
    statusLabel: "Status",
    qrTitle: "QR-code scannen",
    qrText:
      "Scan de QR-code om dit publieke paspoort rechtstreeks in EquipRegistry te openen voor verificatie en printgebruik.",
    qrAlt: "QR-code gekoppeld aan het publieke EquipRegistry-paspoort",
    verificationPanelTitle: "Officiële verificatie",
    verificationPanelText:
      "Dit paspoort blijft permanent gekoppeld aan het goedgekeurde registratienummer en het assetdossier in EquipRegistry.",
    verificationUrlLabel: "Verificatie-URL",
    fields: {
      passportNumber: "Paspoortnummer",
      assetName: "Assetnaam",
      category: "Categorie",
      subcategory: "Subcategorie",
      brand: "Merk",
      model: "Model",
      year: "Jaar",
      country: "Land",
      serialNumber: "Serienummer",
    },
    unavailable: "Niet beschikbaar",
  },
  pt: {
    eyebrow: "EquipRegistry",
    documentTitle: "Passaporte do ativo",
    publicNote:
      "Este passaporte público é o registo oficial da EquipRegistry para o registo aprovado do ativo.",
    statusLabel: "Estado",
    qrTitle: "Digitalizar código QR",
    qrText:
      "Digitalize o código QR para abrir este passaporte público diretamente na EquipRegistry para verificação e impressão.",
    qrAlt: "Código QR ligado ao passaporte público da EquipRegistry",
    verificationPanelTitle: "Verificação oficial",
    verificationPanelText:
      "Este passaporte permanece permanentemente ligado ao número de registo aprovado e ao registo do ativo na EquipRegistry.",
    verificationUrlLabel: "URL de verificação",
    fields: {
      passportNumber: "Número do passaporte",
      assetName: "Nome do ativo",
      category: "Categoria",
      subcategory: "Subcategoria",
      brand: "Marca",
      model: "Modelo",
      year: "Ano",
      country: "País",
      serialNumber: "Número de série",
    },
    unavailable: "Não disponível",
  },
  ru: {
    eyebrow: "EquipRegistry",
    documentTitle: "Паспорт актива",
    publicNote:
      "Этот публичный паспорт является официальной записью EquipRegistry для утвержденной регистрации актива.",
    statusLabel: "Статус",
    qrTitle: "Сканировать QR-код",
    qrText:
      "Сканируйте QR-код, чтобы открыть этот публичный паспорт напрямую в EquipRegistry для проверки и печатного использования.",
    qrAlt: "QR-код со ссылкой на публичный паспорт EquipRegistry",
    verificationPanelTitle: "Официальная проверка",
    verificationPanelText:
      "Этот паспорт постоянно связан с утвержденным регистрационным номером и записью актива в EquipRegistry.",
    verificationUrlLabel: "URL проверки",
    fields: {
      passportNumber: "Номер паспорта",
      assetName: "Наименование актива",
      category: "Категория",
      subcategory: "Подкатегория",
      brand: "Бренд",
      model: "Модель",
      year: "Год",
      country: "Страна",
      serialNumber: "Серийный номер",
    },
    unavailable: "Недоступно",
  },
  zh: {
    eyebrow: "EquipRegistry",
    documentTitle: "资产护照",
    publicNote:
      "该公开护照是 EquipRegistry 针对已批准资产登记的正式记录。",
    statusLabel: "状态",
    qrTitle: "扫描二维码",
    qrText:
      "扫描二维码可直接在 EquipRegistry 中打开此公开护照，用于验证和打印记录。",
    qrAlt: "链接到 EquipRegistry 公开护照的二维码",
    verificationPanelTitle: "官方验证",
    verificationPanelText:
      "该护照会永久关联到已批准的登记编号以及 EquipRegistry 中的资产记录。",
    verificationUrlLabel: "验证链接",
    fields: {
      passportNumber: "护照编号",
      assetName: "资产名称",
      category: "类别",
      subcategory: "子类别",
      brand: "品牌",
      model: "型号",
      year: "年份",
      country: "国家",
      serialNumber: "序列号",
    },
    unavailable: "暂无信息",
  },
  hi: {
    eyebrow: "EquipRegistry",
    documentTitle: "एसेट पासपोर्ट",
    publicNote:
      "यह सार्वजनिक पासपोर्ट स्वीकृत एसेट पंजीकरण के लिए EquipRegistry का आधिकारिक रिकॉर्ड है।",
    statusLabel: "स्थिति",
    qrTitle: "QR कोड स्कैन करें",
    qrText:
      "सत्यापन और प्रिंट उपयोग के लिए इस सार्वजनिक पासपोर्ट को सीधे EquipRegistry में खोलने हेतु QR कोड स्कैन करें।",
    qrAlt: "EquipRegistry के सार्वजनिक पासपोर्ट से जुड़ा QR कोड",
    verificationPanelTitle: "आधिकारिक सत्यापन",
    verificationPanelText:
      "यह पासपोर्ट स्वीकृत पंजीकरण संख्या और EquipRegistry में एसेट रिकॉर्ड से स्थायी रूप से जुड़ा रहता है।",
    verificationUrlLabel: "सत्यापन URL",
    fields: {
      passportNumber: "पासपोर्ट नंबर",
      assetName: "एसेट नाम",
      category: "श्रेणी",
      subcategory: "उपश्रेणी",
      brand: "ब्रांड",
      model: "मॉडल",
      year: "वर्ष",
      country: "देश",
      serialNumber: "सीरियल नंबर",
    },
    unavailable: "उपलब्ध नहीं",
  },
  ar: {
    eyebrow: "EquipRegistry",
    documentTitle: "جواز الأصل",
    publicNote:
      "هذا الجواز العام هو السجل الرسمي في EquipRegistry لطلب تسجيل الأصل المعتمد.",
    statusLabel: "الحالة",
    qrTitle: "امسح رمز QR",
    qrText:
      "امسح رمز QR لفتح هذا الجواز العام مباشرة داخل EquipRegistry لأغراض التحقق والطباعة.",
    qrAlt: "رمز QR مرتبط بالجواز العام في EquipRegistry",
    verificationPanelTitle: "التحقق الرسمي",
    verificationPanelText:
      "يبقى هذا الجواز مرتبطًا بشكل دائم برقم التسجيل المعتمد وسجل الأصل داخل EquipRegistry.",
    verificationUrlLabel: "رابط التحقق",
    fields: {
      passportNumber: "رقم الجواز",
      assetName: "اسم الأصل",
      category: "الفئة",
      subcategory: "الفئة الفرعية",
      brand: "العلامة التجارية",
      model: "الطراز",
      year: "السنة",
      country: "الدولة",
      serialNumber: "الرقم التسلسلي",
    },
    unavailable: "غير متاح",
  },
};

export function getPassportPageContent(lang: Lang) {
  return PASSPORT_PAGE_CONTENT[lang] ?? PASSPORT_PAGE_CONTENT.en;
}
