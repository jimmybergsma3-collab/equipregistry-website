import { ApplicantType, RegistrationFileStatus } from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";
import type { StoredUpload } from "@/lib/registry/upload-types";

export type RegistrationDocumentKey =
  | "proof_of_ownership"
  | "applicant_id"
  | "invoice_purchase_proof"
  | "asset_overview_photo"
  | "serial_plate_photo"
  | "vin_chassis_photo"
  | "registration_document"
  | "hull_id_photo"
  | "engine_serial_photo"
  | "proof_of_address"
  | "additional_supporting_document";

export type RegistrationDocumentDefinition = {
  key: RegistrationDocumentKey;
  label: string;
  description?: string;
  required: boolean;
};

export type RegistrationDocumentState = {
  status: RegistrationFileStatus;
  fileName?: string;
  files?: StoredUpload[];
};

export type RegistrationDocumentMap = Partial<
  Record<RegistrationDocumentKey, RegistrationDocumentState>
>;

const MULTI_FILE_DOCUMENT_KEYS: RegistrationDocumentKey[] = [
  "applicant_id",
  "invoice_purchase_proof",
  "asset_overview_photo",
  "serial_plate_photo",
  "vin_chassis_photo",
  "hull_id_photo",
  "engine_serial_photo",
  "additional_supporting_document",
];

export type DocumentText = {
  label: string;
  description?: string;
};

const DOCUMENT_TEXT: Record<Lang, Record<RegistrationDocumentKey, DocumentText>> = {
  en: {
    proof_of_ownership: {
      label: "Proof of Ownership",
      description: "Ownership certificate, title, or equivalent legal proof.",
    },
    applicant_id: {
      label: "Applicant ID",
      description: "Passport, ID card, or legal identity document.",
    },
    invoice_purchase_proof: {
      label: "Invoice / Purchase Proof",
      description: "Invoice, sales contract, or purchase receipt.",
    },
    asset_overview_photo: {
      label: "Asset Overview Photo",
      description: "Photo showing the asset clearly.",
    },
    serial_plate_photo: {
      label: "Serial Plate Photo",
      description: "Photo of serial plate or identification plate.",
    },
    vin_chassis_photo: {
      label: "VIN / Chassis Photo",
      description: "Clear photo of VIN or chassis identifier.",
    },
    registration_document: {
      label: "Registration Document",
      description: "Official registration paper if available.",
    },
    hull_id_photo: {
      label: "Hull ID / HIN Photo",
      description: "Photo of hull ID or HIN marking.",
    },
    engine_serial_photo: {
      label: "Engine Serial Photo",
      description: "Photo of engine serial number if applicable.",
    },
    proof_of_address: {
      label: "Proof of Address",
      description: "Recent proof of residential or business address.",
    },
    additional_supporting_document: {
      label: "Additional Supporting Document",
      description: "Any supporting file needed for verification.",
    },
  },

  es: {
    proof_of_ownership: {
      label: "Prueba de propiedad",
      description: "Certificado de propiedad, título o prueba legal equivalente.",
    },
    applicant_id: {
      label: "Documento de identidad del solicitante",
      description: "Pasaporte, DNI u otro documento legal de identidad.",
    },
    invoice_purchase_proof: {
      label: "Factura / Prueba de compra",
      description: "Factura, contrato de compraventa o recibo de compra.",
    },
    asset_overview_photo: {
      label: "Foto general del activo",
      description: "Foto que muestre claramente el activo.",
    },
    serial_plate_photo: {
      label: "Foto de la placa de serie",
      description: "Foto de la placa de serie o de identificación.",
    },
    vin_chassis_photo: {
      label: "Foto del VIN / chasis",
      description: "Foto clara del VIN o identificador del chasis.",
    },
    registration_document: {
      label: "Documento de matriculación",
      description: "Documento oficial de matriculación si está disponible.",
    },
    hull_id_photo: {
      label: "Foto del número de casco / HIN",
      description: "Foto del número de casco o marcado HIN.",
    },
    engine_serial_photo: {
      label: "Foto del número de serie del motor",
      description: "Foto del número de serie del motor si corresponde.",
    },
    proof_of_address: {
      label: "Comprobante de domicilio",
      description: "Prueba reciente de domicilio particular o comercial.",
    },
    additional_supporting_document: {
      label: "Documento adicional de soporte",
      description: "Cualquier archivo adicional necesario para la verificación.",
    },
  },

  de: {
    proof_of_ownership: {
      label: "Eigentumsnachweis",
      description: "Eigentumszertifikat, Titel oder gleichwertiger rechtlicher Nachweis.",
    },
    applicant_id: {
      label: "Ausweis des Antragstellers",
      description: "Reisepass, Personalausweis oder anderes legales Identitätsdokument.",
    },
    invoice_purchase_proof: {
      label: "Rechnung / Kaufnachweis",
      description: "Rechnung, Kaufvertrag oder Kaufbeleg.",
    },
    asset_overview_photo: {
      label: "Übersichtsfoto des Assets",
      description: "Foto, das das Asset klar zeigt.",
    },
    serial_plate_photo: {
      label: "Foto des Typenschilds / Serienschilds",
      description: "Foto des Serien- oder Identifikationsschilds.",
    },
    vin_chassis_photo: {
      label: "VIN- / Fahrgestellfoto",
      description: "Klares Foto der VIN oder Fahrgestellnummer.",
    },
    registration_document: {
      label: "Zulassungsdokument",
      description: "Offizielles Zulassungsdokument, falls vorhanden.",
    },
    hull_id_photo: {
      label: "Foto der Rumpfnummer / HIN",
      description: "Foto der Rumpfnummer oder HIN-Kennzeichnung.",
    },
    engine_serial_photo: {
      label: "Foto der Motor-Seriennummer",
      description: "Foto der Motorseriennummer, falls zutreffend.",
    },
    proof_of_address: {
      label: "Adressnachweis",
      description: "Aktueller Nachweis der Wohn- oder Geschäftsadresse.",
    },
    additional_supporting_document: {
      label: "Zusätzliches Belegdokument",
      description: "Beliebige zusätzliche Datei zur Verifizierung.",
    },
  },

  fr: {
    proof_of_ownership: {
      label: "Preuve de propriété",
      description: "Certificat de propriété, titre ou preuve légale équivalente.",
    },
    applicant_id: {
      label: "Pièce d’identité du demandeur",
      description: "Passeport, carte d’identité ou document légal d’identité.",
    },
    invoice_purchase_proof: {
      label: "Facture / preuve d’achat",
      description: "Facture, contrat de vente ou reçu d’achat.",
    },
    asset_overview_photo: {
      label: "Photo générale de l’actif",
      description: "Photo montrant clairement l’actif.",
    },
    serial_plate_photo: {
      label: "Photo de la plaque signalétique",
      description: "Photo de la plaque de série ou d’identification.",
    },
    vin_chassis_photo: {
      label: "Photo du VIN / châssis",
      description: "Photo claire du VIN ou de l’identifiant de châssis.",
    },
    registration_document: {
      label: "Document d’immatriculation",
      description: "Document officiel d’immatriculation si disponible.",
    },
    hull_id_photo: {
      label: "Photo du numéro de coque / HIN",
      description: "Photo du numéro de coque ou du marquage HIN.",
    },
    engine_serial_photo: {
      label: "Photo du numéro de série moteur",
      description: "Photo du numéro de série moteur si applicable.",
    },
    proof_of_address: {
      label: "Justificatif de domicile",
      description: "Justificatif récent d’adresse résidentielle ou professionnelle.",
    },
    additional_supporting_document: {
      label: "Document justificatif supplémentaire",
      description: "Tout fichier supplémentaire nécessaire à la vérification.",
    },
  },

  it: {
    proof_of_ownership: {
      label: "Prova di proprietà",
      description: "Certificato di proprietà, titolo o prova legale equivalente.",
    },
    applicant_id: {
      label: "Documento d’identità del richiedente",
      description: "Passaporto, carta d’identità o altro documento legale.",
    },
    invoice_purchase_proof: {
      label: "Fattura / prova d’acquisto",
      description: "Fattura, contratto di vendita o ricevuta di acquisto.",
    },
    asset_overview_photo: {
      label: "Foto panoramica dell’asset",
      description: "Foto che mostri chiaramente l’asset.",
    },
    serial_plate_photo: {
      label: "Foto targhetta seriale",
      description: "Foto della targhetta seriale o identificativa.",
    },
    vin_chassis_photo: {
      label: "Foto VIN / telaio",
      description: "Foto chiara del VIN o identificativo del telaio.",
    },
    registration_document: {
      label: "Documento di registrazione",
      description: "Documento ufficiale di registrazione, se disponibile.",
    },
    hull_id_photo: {
      label: "Foto Hull ID / HIN",
      description: "Foto dell’Hull ID o della marcatura HIN.",
    },
    engine_serial_photo: {
      label: "Foto numero seriale motore",
      description: "Foto del numero seriale del motore, se applicabile.",
    },
    proof_of_address: {
      label: "Prova di indirizzo",
      description: "Prova recente dell’indirizzo residenziale o aziendale.",
    },
    additional_supporting_document: {
      label: "Documento di supporto aggiuntivo",
      description: "Qualsiasi file aggiuntivo necessario per la verifica.",
    },
  },

  nl: {
    proof_of_ownership: {
      label: "Bewijs van eigendom",
      description: "Eigendomsbewijs, titel of gelijkwaardig juridisch bewijs.",
    },
    applicant_id: {
      label: "Identiteitsbewijs aanvrager",
      description: "Paspoort, identiteitskaart of ander juridisch identiteitsdocument.",
    },
    invoice_purchase_proof: {
      label: "Factuur / aankoopbewijs",
      description: "Factuur, koopcontract of aankoopbewijs.",
    },
    asset_overview_photo: {
      label: "Overzichtsfoto van het asset",
      description: "Foto waarop het asset duidelijk zichtbaar is.",
    },
    serial_plate_photo: {
      label: "Foto van typeplaat / serienplaat",
      description: "Foto van serienplaat of identificatieplaat.",
    },
    vin_chassis_photo: {
      label: "Foto van VIN / chassis",
      description: "Duidelijke foto van VIN of chassisidentificatie.",
    },
    registration_document: {
      label: "Registratiedocument",
      description: "Officieel registratiedocument indien beschikbaar.",
    },
    hull_id_photo: {
      label: "Foto van rompnummer / HIN",
      description: "Foto van rompnummer of HIN-markering.",
    },
    engine_serial_photo: {
      label: "Foto van motorserienummer",
      description: "Foto van motorserienummer indien van toepassing.",
    },
    proof_of_address: {
      label: "Adresbewijs",
      description: "Recent bewijs van woon- of bedrijfsadres.",
    },
    additional_supporting_document: {
      label: "Aanvullend ondersteunend document",
      description: "Elk extra bestand dat nodig is voor verificatie.",
    },
  },

  pt: {
    proof_of_ownership: {
      label: "Comprovativo de propriedade",
      description: "Certificado de propriedade, título ou prova legal equivalente.",
    },
    applicant_id: {
      label: "Documento de identificação do requerente",
      description: "Passaporte, cartão de identidade ou outro documento legal.",
    },
    invoice_purchase_proof: {
      label: "Fatura / comprovativo de compra",
      description: "Fatura, contrato de compra e venda ou recibo.",
    },
    asset_overview_photo: {
      label: "Fotografia geral do ativo",
      description: "Fotografia que mostre claramente o ativo.",
    },
    serial_plate_photo: {
      label: "Fotografia da chapa de série",
      description: "Fotografia da chapa de série ou de identificação.",
    },
    vin_chassis_photo: {
      label: "Fotografia do VIN / chassis",
      description: "Fotografia clara do VIN ou identificador do chassis.",
    },
    registration_document: {
      label: "Documento de registo",
      description: "Documento oficial de registo, se disponível.",
    },
    hull_id_photo: {
      label: "Fotografia do número do casco / HIN",
      description: "Fotografia do número do casco ou marcação HIN.",
    },
    engine_serial_photo: {
      label: "Fotografia do número de série do motor",
      description: "Fotografia do número de série do motor, se aplicável.",
    },
    proof_of_address: {
      label: "Comprovativo de morada",
      description: "Comprovativo recente de morada residencial ou comercial.",
    },
    additional_supporting_document: {
      label: "Documento adicional de suporte",
      description: "Qualquer ficheiro adicional necessário para verificação.",
    },
  },

  ru: {
    proof_of_ownership: {
      label: "Подтверждение права собственности",
      description: "Свидетельство о собственности, титул или эквивалентное юридическое подтверждение.",
    },
    applicant_id: {
      label: "Удостоверение личности заявителя",
      description: "Паспорт, ID-карта или иной официальный документ.",
    },
    invoice_purchase_proof: {
      label: "Счёт / подтверждение покупки",
      description: "Счёт, договор купли-продажи или чек.",
    },
    asset_overview_photo: {
      label: "Общее фото актива",
      description: "Фото, на котором актив хорошо виден.",
    },
    serial_plate_photo: {
      label: "Фото серийной / идентификационной таблички",
      description: "Фото серийной или идентификационной таблички.",
    },
    vin_chassis_photo: {
      label: "Фото VIN / шасси",
      description: "Чёткое фото VIN или идентификатора шасси.",
    },
    registration_document: {
      label: "Регистрационный документ",
      description: "Официальный регистрационный документ, если имеется.",
    },
    hull_id_photo: {
      label: "Фото номера корпуса / HIN",
      description: "Фото номера корпуса или маркировки HIN.",
    },
    engine_serial_photo: {
      label: "Фото серийного номера двигателя",
      description: "Фото серийного номера двигателя, если применимо.",
    },
    proof_of_address: {
      label: "Подтверждение адреса",
      description: "Свежий документ, подтверждающий адрес проживания или бизнеса.",
    },
    additional_supporting_document: {
      label: "Дополнительный подтверждающий документ",
      description: "Любой дополнительный файл, необходимый для проверки.",
    },
  },

  zh: {
    proof_of_ownership: {
      label: "所有权证明",
      description: "所有权证书、产权文件或同等法律证明。",
    },
    applicant_id: {
      label: "申请人身份证明",
      description: "护照、身份证或其他合法身份证明文件。",
    },
    invoice_purchase_proof: {
      label: "发票 / 购买证明",
      description: "发票、买卖合同或购买收据。",
    },
    asset_overview_photo: {
      label: "资产整体照片",
      description: "清晰显示资产整体的照片。",
    },
    serial_plate_photo: {
      label: "铭牌 / 序列号牌照片",
      description: "序列号铭牌或识别铭牌的照片。",
    },
    vin_chassis_photo: {
      label: "VIN / 底盘照片",
      description: "清晰的 VIN 或底盘识别照片。",
    },
    registration_document: {
      label: "注册文件",
      description: "如有，请提供官方注册文件。",
    },
    hull_id_photo: {
      label: "船体编号 / HIN 照片",
      description: "船体编号或 HIN 标记照片。",
    },
    engine_serial_photo: {
      label: "发动机序列号照片",
      description: "如适用，请提供发动机序列号照片。",
    },
    proof_of_address: {
      label: "地址证明",
      description: "近期的居住地址或营业地址证明。",
    },
    additional_supporting_document: {
      label: "附加支持文件",
      description: "验证所需的任何附加文件。",
    },
  },

  hi: {
    proof_of_ownership: {
      label: "स्वामित्व प्रमाण",
      description: "स्वामित्व प्रमाणपत्र, टाइटल या समकक्ष कानूनी प्रमाण।",
    },
    applicant_id: {
      label: "आवेदक पहचान दस्तावेज़",
      description: "पासपोर्ट, आईडी कार्ड या अन्य कानूनी पहचान दस्तावेज़।",
    },
    invoice_purchase_proof: {
      label: "इनवॉइस / खरीद प्रमाण",
      description: "इनवॉइस, बिक्री अनुबंध या खरीद रसीद।",
    },
    asset_overview_photo: {
      label: "एसेट ओवरव्यू फोटो",
      description: "एसेट को स्पष्ट रूप से दिखाने वाली फोटो।",
    },
    serial_plate_photo: {
      label: "सीरियल प्लेट फोटो",
      description: "सीरियल प्लेट या पहचान प्लेट की फोटो।",
    },
    vin_chassis_photo: {
      label: "VIN / चेसिस फोटो",
      description: "VIN या चेसिस पहचान की स्पष्ट फोटो।",
    },
    registration_document: {
      label: "पंजीकरण दस्तावेज़",
      description: "यदि उपलब्ध हो तो आधिकारिक पंजीकरण दस्तावेज़।",
    },
    hull_id_photo: {
      label: "हुल आईडी / HIN फोटो",
      description: "हुल आईडी या HIN मार्किंग की फोटो।",
    },
    engine_serial_photo: {
      label: "इंजन सीरियल फोटो",
      description: "यदि लागू हो तो इंजन सीरियल नंबर की फोटो।",
    },
    proof_of_address: {
      label: "पते का प्रमाण",
      description: "निवासी या व्यवसायिक पते का हालिया प्रमाण।",
    },
    additional_supporting_document: {
      label: "अतिरिक्त सहायक दस्तावेज़",
      description: "सत्यापन के लिए आवश्यक कोई भी अतिरिक्त फ़ाइल।",
    },
  },

  ar: {
    proof_of_ownership: {
      label: "إثبات الملكية",
      description: "شهادة ملكية أو سند أو أي إثبات قانوني مكافئ.",
    },
    applicant_id: {
      label: "هوية مقدم الطلب",
      description: "جواز سفر أو بطاقة هوية أو وثيقة هوية قانونية أخرى.",
    },
    invoice_purchase_proof: {
      label: "فاتورة / إثبات الشراء",
      description: "فاتورة أو عقد بيع أو إيصال شراء.",
    },
    asset_overview_photo: {
      label: "صورة عامة للأصل",
      description: "صورة تُظهر الأصل بوضوح.",
    },
    serial_plate_photo: {
      label: "صورة لوحة الرقم التسلسلي",
      description: "صورة للوحة الرقم التسلسلي أو لوحة التعريف.",
    },
    vin_chassis_photo: {
      label: "صورة VIN / الهيكل",
      description: "صورة واضحة لرقم VIN أو معرّف الهيكل.",
    },
    registration_document: {
      label: "وثيقة التسجيل",
      description: "وثيقة التسجيل الرسمية إن وجدت.",
    },
    hull_id_photo: {
      label: "صورة رقم الهيكل / HIN",
      description: "صورة لرقم الهيكل أو علامة HIN.",
    },
    engine_serial_photo: {
      label: "صورة الرقم التسلسلي للمحرك",
      description: "صورة للرقم التسلسلي للمحرك إن وجد.",
    },
    proof_of_address: {
      label: "إثبات العنوان",
      description: "إثبات حديث لعنوان السكن أو عنوان النشاط التجاري.",
    },
    additional_supporting_document: {
      label: "مستند داعم إضافي",
      description: "أي ملف إضافي مطلوب للتحقق.",
    },
  },
};

function t(lang: Lang, key: RegistrationDocumentKey): DocumentText {
  return DOCUMENT_TEXT[lang]?.[key] ?? DOCUMENT_TEXT.en[key];
}

export function getDocumentText(
  lang: Lang,
  key: RegistrationDocumentKey
): DocumentText {
  return t(lang, key);
}

function createDocument(
  lang: Lang,
  key: RegistrationDocumentKey,
  required: boolean,
  override?: Partial<DocumentText>
): RegistrationDocumentDefinition {
  const base = t(lang, key);

  return {
    key,
    required,
    label: override?.label ?? base.label,
    description: override?.description ?? base.description,
  };
}

export function getBaseDocumentsForApplicantType(
  applicantType: ApplicantType,
  lang: Lang
): RegistrationDocumentDefinition[] {
  if (applicantType === "private" || applicantType === "sme") {
    return [
      createDocument(lang, "proof_of_ownership", true),
      createDocument(lang, "invoice_purchase_proof", true),
    ];
  }

  return [
    createDocument(lang, "proof_of_ownership", true, {
      description:
        lang === "nl"
          ? "Eigendomsbewijs of door partner geautoriseerde registratiebasis."
          : lang === "es"
          ? "Prueba de propiedad o base de registro autorizada por el socio."
          : lang === "de"
          ? "Eigentumsnachweis oder vom Partner autorisierte Registrierungsgrundlage."
          : lang === "fr"
          ? "Preuve de propriété ou base d’enregistrement autorisée par le partenaire."
          : lang === "it"
          ? "Prova di proprietà o base di registrazione autorizzata dal partner."
          : lang === "pt"
          ? "Comprovativo de propriedade ou base de registo autorizada pelo parceiro."
          : lang === "ru"
          ? "Подтверждение собственности или основание регистрации, авторизованное партнёром."
          : lang === "zh"
          ? "所有权证明或合作伙伴授权的注册依据。"
          : lang === "hi"
          ? "स्वामित्व प्रमाण या पार्टनर द्वारा अधिकृत पंजीकरण आधार।"
          : lang === "ar"
          ? "إثبات الملكية أو أساس تسجيل معتمد من الشريك."
          : "Ownership or partner-authorized registration basis.",
    }),
    ];
}

export function getCategoryDocuments(
  category: string | null | undefined,
  lang: Lang
): RegistrationDocumentDefinition[] {
  if (!category) return [];

  switch (category) {
    case "vehicles":
      return [
        createDocument(lang, "vin_chassis_photo", true),
        createDocument(lang, "registration_document", false, {
          description:
            lang === "nl"
              ? "Voertuigregistratiebewijs indien beschikbaar."
              : lang === "es"
              ? "Documento de matriculación del vehículo si está disponible."
              : lang === "de"
              ? "Fahrzeugzulassung, falls vorhanden."
              : lang === "fr"
              ? "Document d’immatriculation du véhicule si disponible."
              : lang === "it"
              ? "Documento di immatricolazione del veicolo se disponibile."
              : lang === "pt"
              ? "Documento de registo do veículo, se disponível."
              : lang === "ru"
              ? "Регистрационный документ транспортного средства, если имеется."
              : lang === "zh"
              ? "如有，请提供车辆注册文件。"
              : lang === "hi"
              ? "यदि उपलब्ध हो तो वाहन पंजीकरण दस्तावेज़।"
              : lang === "ar"
              ? "وثيقة تسجيل المركبة إن وجدت."
              : "Vehicle registration paper if available.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto voertuig"
              : lang === "es"
              ? "Foto general del vehículo"
              : lang === "de"
              ? "Übersichtsfoto des Fahrzeugs"
              : lang === "fr"
              ? "Photo générale du véhicule"
              : lang === "it"
              ? "Foto generale del veicolo"
              : lang === "pt"
              ? "Fotografia geral do veículo"
              : lang === "ru"
              ? "Общее фото транспортного средства"
              : lang === "zh"
              ? "车辆整体照片"
              : lang === "hi"
              ? "वाहन की समग्र फोटो"
              : lang === "ar"
              ? "صورة عامة للمركبة"
              : "Vehicle Overview Photo",
          description:
            lang === "nl"
              ? "Algemene foto waarop het voertuig zichtbaar is."
              : lang === "es"
              ? "Foto general que muestre el vehículo."
              : lang === "de"
              ? "Allgemeines Foto, das das Fahrzeug zeigt."
              : lang === "fr"
              ? "Photo générale montrant le véhicule."
              : lang === "it"
              ? "Foto generale che mostri il veicolo."
              : lang === "pt"
              ? "Fotografia geral do veículo."
              : lang === "ru"
              ? "Общее фото, на котором видно транспортное средство."
              : lang === "zh"
              ? "显示整辆车辆的整体照片。"
              : lang === "hi"
              ? "वाहन को दिखाने वाली सामान्य फोटो।"
              : lang === "ar"
              ? "صورة عامة تُظهر المركبة."
              : "General photo showing the vehicle.",
        }),
      ];

    case "machines":
      return [
        createDocument(lang, "serial_plate_photo", true, {
          description:
            lang === "nl"
              ? "Foto van serienplaat of identificatieplaat van de machine."
              : lang === "es"
              ? "Foto de la placa de serie o identificación de la máquina."
              : lang === "de"
              ? "Foto des Serien- oder Identifikationsschilds der Maschine."
              : lang === "fr"
              ? "Photo de la plaque de série ou d’identification de la machine."
              : lang === "it"
              ? "Foto della targhetta seriale o identificativa della macchina."
              : lang === "pt"
              ? "Fotografia da chapa de série ou identificação da máquina."
              : lang === "ru"
              ? "Фото серийной или идентификационной таблички машины."
              : lang === "zh"
              ? "机器序列号牌或识别铭牌照片。"
              : lang === "hi"
              ? "मशीन की सीरियल प्लेट या पहचान प्लेट की फोटो।"
              : lang === "ar"
              ? "صورة لوحة الرقم التسلسلي أو لوحة تعريف الآلة."
              : "Photo of machine serial plate or ID plate.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto machine"
              : lang === "es"
              ? "Foto general de la máquina"
              : lang === "de"
              ? "Übersichtsfoto der Maschine"
              : lang === "fr"
              ? "Photo générale de la machine"
              : lang === "it"
              ? "Foto generale della macchina"
              : lang === "pt"
              ? "Fotografia geral da máquina"
              : lang === "ru"
              ? "Общее фото машины"
              : lang === "zh"
              ? "机器整体照片"
              : lang === "hi"
              ? "मशीन की समग्र फोटो"
              : lang === "ar"
              ? "صورة عامة للآلة"
              : "Machine Overview Photo",
          description:
            lang === "nl"
              ? "Algemene foto van de machine."
              : lang === "es"
              ? "Foto general de la máquina."
              : lang === "de"
              ? "Allgemeines Foto der Maschine."
              : lang === "fr"
              ? "Photo générale de la machine."
              : lang === "it"
              ? "Foto generale della macchina."
              : lang === "pt"
              ? "Fotografia geral da máquina."
              : lang === "ru"
              ? "Общее фото машины."
              : lang === "zh"
              ? "显示整台机器的整体照片。"
              : lang === "hi"
              ? "मशीन की सामान्य फोटो।"
              : lang === "ar"
              ? "صورة عامة للآلة."
              : "General photo of the machine.",
        }),
      ];

    case "industry":
      return [
        createDocument(lang, "serial_plate_photo", true, {
          label:
            lang === "nl"
              ? "Foto typeplaat / serienplaat"
              : lang === "es"
              ? "Foto de placa de tipo / serie"
              : lang === "de"
              ? "Foto des Typenschilds / Serienschilds"
              : lang === "fr"
              ? "Photo de plaque signalétique / série"
              : lang === "it"
              ? "Foto targhetta tipo / seriale"
              : lang === "pt"
              ? "Fotografia da placa de tipo / série"
              : lang === "ru"
              ? "Фото типовой / серийной таблички"
              : lang === "zh"
              ? "铭牌 / 序列号牌照片"
              : lang === "hi"
              ? "टाइप प्लेट / सीरियल प्लेट फोटो"
              : lang === "ar"
              ? "صورة لوحة النوع / الرقم التسلسلي"
              : "Type Plate / Serial Plate Photo",
          description:
            lang === "nl"
              ? "Foto van de industriële typeplaat of serienplaat."
              : lang === "es"
              ? "Foto de la placa industrial de tipo o serie."
              : lang === "de"
              ? "Foto des industriellen Typenschilds oder Serienschilds."
              : lang === "fr"
              ? "Photo de la plaque signalétique industrielle ou de série."
              : lang === "it"
              ? "Foto della targhetta industriale di tipo o seriale."
              : lang === "pt"
              ? "Fotografia da placa industrial de tipo ou série."
              : lang === "ru"
              ? "Фото промышленной типовой или серийной таблички."
              : lang === "zh"
              ? "工业设备铭牌或序列号牌照片。"
              : lang === "hi"
              ? "औद्योगिक टाइप प्लेट या सीरियल प्लेट की फोटो।"
              : lang === "ar"
              ? "صورة لوحة النوع الصناعية أو لوحة الرقم التسلسلي."
              : "Photo of the industrial type plate or serial plate.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto unit"
              : lang === "es"
              ? "Foto general de la unidad"
              : lang === "de"
              ? "Übersichtsfoto der Einheit"
              : lang === "fr"
              ? "Photo générale de l’unité"
              : lang === "it"
              ? "Foto generale dell’unità"
              : lang === "pt"
              ? "Fotografia geral da unidade"
              : lang === "ru"
              ? "Общее фото установки"
              : lang === "zh"
              ? "设备整体照片"
              : lang === "hi"
              ? "यूनिट की समग्र फोटो"
              : lang === "ar"
              ? "صورة عامة للوحدة"
              : "Unit Overview Photo",
          description:
            lang === "nl"
              ? "Foto waarop de volledige unit zichtbaar is."
              : lang === "es"
              ? "Foto que muestre la unidad completa."
              : lang === "de"
              ? "Foto, das die gesamte Einheit zeigt."
              : lang === "fr"
              ? "Photo montrant l’unité complète."
              : lang === "it"
              ? "Foto che mostri l’unità completa."
              : lang === "pt"
              ? "Fotografia que mostre a unidade completa."
              : lang === "ru"
              ? "Фото, на котором видна вся установка."
              : lang === "zh"
              ? "显示完整设备单元的照片。"
              : lang === "hi"
              ? "पूरी यूनिट दिखाने वाली फोटो।"
              : lang === "ar"
              ? "صورة تُظهر الوحدة بالكامل."
              : "Photo showing the full unit.",
        }),
      ];

    case "agriculture":
      return [
        createDocument(lang, "serial_plate_photo", true, {
          description:
            lang === "nl"
              ? "Foto van serieplaat of typeplaat."
              : lang === "es"
              ? "Foto de la placa de serie o tipo."
              : lang === "de"
              ? "Foto des Serien- oder Typenschilds."
              : lang === "fr"
              ? "Photo de la plaque de série ou de type."
              : lang === "it"
              ? "Foto della targhetta seriale o di tipo."
              : lang === "pt"
              ? "Fotografia da placa de série ou tipo."
              : lang === "ru"
              ? "Фото серийной или типовой таблички."
              : lang === "zh"
              ? "序列号牌或型号铭牌照片。"
              : lang === "hi"
              ? "सीरियल प्लेट या टाइप प्लेट की फोटो।"
              : lang === "ar"
              ? "صورة لوحة الرقم التسلسلي أو لوحة النوع."
              : "Photo of serial or type plate.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto landbouwmaterieel"
              : lang === "es"
              ? "Foto general del equipo agrícola"
              : lang === "de"
              ? "Übersichtsfoto der landwirtschaftlichen Einheit"
              : lang === "fr"
              ? "Photo générale de l’équipement agricole"
              : lang === "it"
              ? "Foto generale dell’unità agricola"
              : lang === "pt"
              ? "Fotografia geral do equipamento agrícola"
              : lang === "ru"
              ? "Общее фото сельскохозяйственной единицы"
              : lang === "zh"
              ? "农业设备整体照片"
              : lang === "hi"
              ? "कृषि उपकरण की समग्र फोटो"
              : lang === "ar"
              ? "صورة عامة للمعدة الزراعية"
              : "Equipment Overview Photo",
          description:
            lang === "nl"
              ? "Foto waarop de volledige landbouwunit zichtbaar is."
              : lang === "es"
              ? "Foto que muestre la unidad agrícola completa."
              : lang === "de"
              ? "Foto, das die gesamte landwirtschaftliche Einheit zeigt."
              : lang === "fr"
              ? "Photo montrant l’unité agricole complète."
              : lang === "it"
              ? "Foto che mostri l’unità agricola completa."
              : lang === "pt"
              ? "Fotografia que mostre a unidade agrícola completa."
              : lang === "ru"
              ? "Фото, на котором видна вся сельскохозяйственная единица."
              : lang === "zh"
              ? "显示完整农业设备的照片。"
              : lang === "hi"
              ? "पूरी कृषि इकाई दिखाने वाली फोटो।"
              : lang === "ar"
              ? "صورة تُظهر المعدة الزراعية بالكامل."
              : "Photo showing the full agricultural unit.",
        }),
      ];

    case "construction":
      return [
        createDocument(lang, "serial_plate_photo", true, {
          description:
            lang === "nl"
              ? "Foto van serieplaat of identificatieplaat."
              : lang === "es"
              ? "Foto de la placa de serie o identificación."
              : lang === "de"
              ? "Foto des Serien- oder Identifikationsschilds."
              : lang === "fr"
              ? "Photo de la plaque de série ou d’identification."
              : lang === "it"
              ? "Foto della targhetta seriale o identificativa."
              : lang === "pt"
              ? "Fotografia da placa de série ou identificação."
              : lang === "ru"
              ? "Фото серийной или идентификационной таблички."
              : lang === "zh"
              ? "序列号牌或识别铭牌照片。"
              : lang === "hi"
              ? "सीरियल प्लेट या पहचान प्लेट की फोटो।"
              : lang === "ar"
              ? "صورة لوحة الرقم التسلسلي أو لوحة التعريف."
              : "Photo of serial or identification plate.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto bouwmaterieel"
              : lang === "es"
              ? "Foto general del equipo de construcción"
              : lang === "de"
              ? "Übersichtsfoto des Baugeräts"
              : lang === "fr"
              ? "Photo générale de l’équipement de construction"
              : lang === "it"
              ? "Foto generale dell’attrezzatura da costruzione"
              : lang === "pt"
              ? "Fotografia geral do equipamento de construção"
              : lang === "ru"
              ? "Общее фото строительной техники"
              : lang === "zh"
              ? "建筑设备整体照片"
              : lang === "hi"
              ? "निर्माण उपकरण की समग्र फोटो"
              : lang === "ar"
              ? "صورة عامة لمعدة البناء"
              : "Equipment Overview Photo",
          description:
            lang === "nl"
              ? "Foto waarop het volledige bouwasset zichtbaar is."
              : lang === "es"
              ? "Foto que muestre claramente el activo de construcción completo."
              : lang === "de"
              ? "Foto, das das vollständige Bau-Asset zeigt."
              : lang === "fr"
              ? "Photo montrant l’actif de construction complet."
              : lang === "it"
              ? "Foto che mostri l’intero asset da costruzione."
              : lang === "pt"
              ? "Fotografia que mostre o ativo de construção completo."
              : lang === "ru"
              ? "Фото, на котором виден весь строительный объект."
              : lang === "zh"
              ? "显示完整建筑设备的照片。"
              : lang === "hi"
              ? "पूरा निर्माण एसेट दिखाने वाली फोटो।"
              : lang === "ar"
              ? "صورة تُظهر أصل البناء بالكامل."
              : "Photo showing the full construction asset.",
        }),
      ];

    case "marine":
      return [
        createDocument(lang, "hull_id_photo", true),
        createDocument(lang, "engine_serial_photo", false),
        createDocument(lang, "registration_document", false, {
          description:
            lang === "nl"
              ? "Registratiebewijs van de boot indien beschikbaar."
              : lang === "es"
              ? "Documento de registro de la embarcación si está disponible."
              : lang === "de"
              ? "Bootszulassung, falls vorhanden."
              : lang === "fr"
              ? "Document d’enregistrement du bateau si disponible."
              : lang === "it"
              ? "Documento di registrazione dell’imbarcazione se disponibile."
              : lang === "pt"
              ? "Documento de registo da embarcação, se disponível."
              : lang === "ru"
              ? "Регистрационный документ судна, если имеется."
              : lang === "zh"
              ? "如有，请提供船只注册文件。"
              : lang === "hi"
              ? "यदि उपलब्ध हो तो नाव पंजीकरण दस्तावेज़।"
              : lang === "ar"
              ? "وثيقة تسجيل القارب إن وجدت."
              : "Boat registration paper if available.",
        }),
      ];

    case "energy":
      return [
        createDocument(lang, "serial_plate_photo", true, {
          label:
            lang === "nl"
              ? "Foto unitplaat"
              : lang === "es"
              ? "Foto de la placa de la unidad"
              : lang === "de"
              ? "Foto des Geräteschilds"
              : lang === "fr"
              ? "Photo de la plaque de l’unité"
              : lang === "it"
              ? "Foto della targhetta dell’unità"
              : lang === "pt"
              ? "Fotografia da placa da unidade"
              : lang === "ru"
              ? "Фото таблички устройства"
              : lang === "zh"
              ? "设备铭牌照片"
              : lang === "hi"
              ? "यूनिट प्लेट फोटो"
              : lang === "ar"
              ? "صورة لوحة الوحدة"
              : "Unit Plate Photo",
          description:
            lang === "nl"
              ? "Foto van de plaat met identificatie van de unit."
              : lang === "es"
              ? "Foto de la placa que muestra la identificación de la unidad."
              : lang === "de"
              ? "Foto des Schilds mit der Geräteidentifikation."
              : lang === "fr"
              ? "Photo de la plaque montrant l’identification de l’unité."
              : lang === "it"
              ? "Foto della targhetta che mostra l’identificazione dell’unità."
              : lang === "pt"
              ? "Fotografia da placa com a identificação da unidade."
              : lang === "ru"
              ? "Фото таблички с идентификацией устройства."
              : lang === "zh"
              ? "显示设备识别信息的铭牌照片。"
              : lang === "hi"
              ? "यूनिट पहचान दिखाने वाली प्लेट की फोटो।"
              : lang === "ar"
              ? "صورة للوحة التي تُظهر تعريف الوحدة."
              : "Photo of plate showing unit identification.",
        }),
        createDocument(lang, "asset_overview_photo", false, {
          label:
            lang === "nl"
              ? "Overzichtsfoto installatie / unit"
              : lang === "es"
              ? "Foto general de la instalación / unidad"
              : lang === "de"
              ? "Übersichtsfoto der Anlage / Einheit"
              : lang === "fr"
              ? "Photo générale de l’installation / unité"
              : lang === "it"
              ? "Foto generale dell’installazione / unità"
              : lang === "pt"
              ? "Fotografia geral da instalação / unidade"
              : lang === "ru"
              ? "Общее фото установки / блока"
              : lang === "zh"
              ? "安装 / 设备整体照片"
              : lang === "hi"
              ? "इंस्टॉलेशन / यूनिट ओवरव्यू फोटो"
              : lang === "ar"
              ? "صورة عامة للتركيب / الوحدة"
              : "Installation / Unit Overview Photo",
          description:
            lang === "nl"
              ? "Foto waarop de volledige unit of installatie zichtbaar is."
              : lang === "es"
              ? "Foto que muestre la unidad o instalación completa."
              : lang === "de"
              ? "Foto, das die vollständige Einheit oder Anlage zeigt."
              : lang === "fr"
              ? "Photo montrant l’unité ou l’installation complète."
              : lang === "it"
              ? "Foto che mostri l’unità o l’installazione completa."
              : lang === "pt"
              ? "Fotografia que mostre a unidade ou instalação completa."
              : lang === "ru"
              ? "Фото, на котором видна вся установка или блок."
              : lang === "zh"
              ? "显示完整设备或安装的照片。"
              : lang === "hi"
              ? "पूरी यूनिट या इंस्टॉलेशन दिखाने वाली फोटो।"
              : lang === "ar"
              ? "صورة تُظهر الوحدة أو التركيب بالكامل."
              : "Photo showing the complete unit or installation.",
        }),
      ];

    case "other":
      return [
        createDocument(lang, "asset_overview_photo", true),
        createDocument(lang, "additional_supporting_document", false),
      ];

    default:
      return [];
  }
}

export function getRequiredDocumentsForContext(
  applicantType: ApplicantType,
  category: string | null | undefined,
  lang: Lang
): RegistrationDocumentDefinition[] {
  const merged = [
    ...getBaseDocumentsForApplicantType(applicantType, lang),
    ...getCategoryDocuments(category, lang),
  ];

  const unique = new Map<RegistrationDocumentKey, RegistrationDocumentDefinition>();

  for (const doc of merged) {
    const existing = unique.get(doc.key);

    if (!existing) {
      unique.set(doc.key, doc);
      continue;
    }

    unique.set(doc.key, {
      ...existing,
      required: existing.required || doc.required,
      description: existing.description ?? doc.description,
    });
  }

  return Array.from(unique.values());
}

export function documentSupportsMultipleFiles(key: RegistrationDocumentKey) {
  return MULTI_FILE_DOCUMENT_KEYS.includes(key);
}

export function createEmptyDocumentMap(): RegistrationDocumentMap {
  return {};
}
