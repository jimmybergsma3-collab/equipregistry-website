import type { Lang } from "@/lib/i18n/config";
import { COMPANY_DETAILS } from "@/lib/company-details";

export type PrivacyText = {
  backToHome: string;
  title: string;
  subtitle: string;
  lastUpdated: string;

  sections: {
    whoWeAre: string;
    dataWeCollect: string;
    howWeUseData: string;
    publicPrivate: string;
    legalBasis: string;
    sharing: string;
    payments: string;
    retention: string;
    security: string;
    rights: string;
    cookies: string;
    transfers: string;
    futureFeatures: string;
    changes: string;
    contact: string;
  };

  whoWeAre: {
    intro: string;
    controller: string;
  };

  dataWeCollect: {
    intro: string;
    personalTitle: string;
    personalItems: string[];
    accountTitle: string;
    accountItems: string[];
    assetTitle: string;
    assetItems: string[];
    technicalTitle: string;
    technicalItems: string[];
  };

  howWeUseData: {
    intro: string;
    items: string[];
  };

  publicPrivate: {
    intro: string;
    publicTitle: string;
    publicItems: string[];
    privateTitle: string;
    privateItems: string[];
    note: string;
  };

  legalBasis: {
    intro: string;
    items: string[];
  };

  sharing: {
    intro: string;
    items: string[];
    note: string;
  };

  payments: {
    intro: string;
    items: string[];
  };

  retention: {
    intro: string;
    items: string[];
  };

  security: {
    intro: string;
    items: string[];
    note: string;
  };

  rights: {
    intro: string;
    items: string[];
    note: string;
  };

  cookies: {
    intro: string;
    items: string[];
  };

  transfers: {
    intro: string;
  };

  futureFeatures: {
    intro: string;
    items: string[];
  };

  changes: {
    intro: string;
  };

  contact: {
    intro: string;
    emailLabel: string;
    ownerLabel: string;
    addressLabel: string;
    taxLabel: string;
  };
};

export const PRIVACY_CONTACT = {
  company: COMPANY_DETAILS.company,
  owner: COMPANY_DETAILS.owner,
  addressLine1: COMPANY_DETAILS.addressLine1,
  addressLine2: COMPANY_DETAILS.addressLine2,
  addressLine3: COMPANY_DETAILS.addressLine3,
  taxId: COMPANY_DETAILS.taxId,
  email: COMPANY_DETAILS.email,
  phone: COMPANY_DETAILS.phone,
  whatsapp: COMPANY_DETAILS.whatsapp,
};

const BASE_EN: PrivacyText = {
  backToHome: "Back to home",
  title: "Privacy Policy",
  subtitle:
    "How EquipRegistry collects, uses, stores, and protects personal and asset-related data.",
  lastUpdated: "Last updated: April 2026",
  sections: {
    whoWeAre: "1. Who we are",
    dataWeCollect: "2. What data we collect",
    howWeUseData: "3. How we use your data",
    publicPrivate: "4. Public and private data",
    legalBasis: "5. Legal basis for processing",
    sharing: "6. Data sharing",
    payments: "7. Payments and invoicing",
    retention: "8. Data retention",
    security: "9. Data security",
    rights: "10. Your rights",
    cookies: "11. Cookies and analytics",
    transfers: "12. International data transfers",
    futureFeatures: "13. Future features and data use",
    changes: "14. Changes to this policy",
    contact: "15. Contact",
  },
  whoWeAre: {
    intro:
      "EquipRegistry is a digital asset registration and verification platform designed to help prevent theft, fraud, ownership disputes, and double financing of vehicles, equipment, bicycles, e-bikes, electric scooters, trailers, machinery, energy assets, and other registered assets.",
    controller: "The data controller is:",
  },
  dataWeCollect: {
    intro:
      "We collect personal data and asset-related data necessary to provide our services.",
    personalTitle: "Personal data",
    personalItems: [
      "Full name",
      "Email address",
      "Phone number, if provided",
      "Address, if provided",
      "Company details, if applicable",
      "VAT number or tax details, if applicable",
    ],
    accountTitle: "Account data",
    accountItems: [
      "Login credentials",
      "Encrypted password",
      "Session and authentication data",
      "User role such as private user, SME, insurer, partner, dealer, rental company, bank, or admin",
    ],
    assetTitle: "Asset and registration data",
    assetItems: [
      "Serial number, VIN, frame number, battery number, passport number, or other identifiers",
      "Brand, model, category, and specifications",
      "Ownership and registration data",
      "Registration reference and passport number",
      "Uploaded documents such as invoices, proof of ownership, or police reports",
      "Registration, review, and verification history",
      "Status data such as Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired, or Not Registered",
      "Ownership transfer and data freshness information where applicable",
    ],
    technicalTitle: "Technical and usage data",
    technicalItems: [
      "IP address",
      "Browser and device information",
      "Visited pages and interaction data",
      "Analytics data through privacy-friendly analytics tools",
    ],
  },
  howWeUseData: {
    intro: "We use your data to:",
    items: [
      "Create and manage user accounts",
      "Register and verify assets",
      "Generate digital asset passports",
      "Support fraud prevention, theft detection, and dispute handling",
      "Provide public verification services",
      "Process payments and invoices",
      "Respond to support requests and service communications",
      "Enable ownership transfer, validation reminders, and data freshness workflows",
      "Meet legal, tax, and compliance obligations",
    ],
  },
  publicPrivate: {
    intro:
      "EquipRegistry uses a layered access model to balance transparency and privacy.",
    publicTitle: "Public data",
    publicItems: [
      "Asset status",
      "Limited identification data",
      "Passport or registry reference number",
      "Selected public passport information needed for verification",
    ],
    privateTitle: "Private or restricted data",
    privateItems: [
      "Owner identity",
      "Full contact details",
      "Full asset details",
      "Uploaded documents",
      "Internal registration and validation history",
    ],
    note:
      "Public search and verification are intentionally limited to protect users while still allowing third parties to verify key asset information.",
  },
  legalBasis: {
    intro:
      "We process personal data under one or more of the following legal bases under the GDPR:",
    items: [
      "Performance of a contract",
      "Compliance with legal obligations",
      "Legitimate interests, including fraud prevention, platform security, asset verification, and business continuity",
      "Consent, where required",
    ],
  },
  sharing: {
    intro: "We may share data with:",
    items: [
      "Insurance companies",
      "Banks or finance providers",
      "Rental and leasing companies",
      "Trusted partners involved in verification or registration workflows",
      "Hosting, analytics, payment, email, invoicing, and technical service providers",
      "Law enforcement or public authorities when legally required or justified",
    ],
    note: "We do not sell personal data.",
  },
  payments: {
    intro:
      "Payments may be processed through third-party payment providers such as Stripe or temporary manual payment workflows where applicable.",
    items: [
      "EquipRegistry does not store full card or payment details",
      "Payment providers process payment information under their own compliance frameworks",
      "Invoices may be generated for customers",
      "VAT handling may be automated where applicable, including VAT number validation for business customers",
    ],
  },
  retention: {
    intro:
      "We retain personal data only as long as necessary for the relevant purpose.",
    items: [
      "Account data may be kept while the account remains active",
      "Registration and passport data may be kept while the passport exists or remains relevant for verification, audit, fraud prevention, or ownership history purposes",
      "Tax and invoice records may be kept for the legally required period",
      "Fraud, theft, dispute, and law-enforcement related records may be kept longer where justified",
    ],
  },
  security: {
    intro:
      "We apply appropriate technical and organisational security measures, including:",
    items: [
      "Encrypted passwords",
      "Access control and role-based access",
      "Secure hosting and infrastructure",
      "Logging and monitoring where appropriate",
    ],
    note:
      "No system is completely risk-free, but we take reasonable measures to protect data.",
  },
  rights: {
    intro: "Depending on applicable law, you may have the right to:",
    items: [
      "Access your personal data",
      "Correct inaccurate data",
      "Request deletion",
      "Restrict processing",
      "Object to processing",
      "Receive a copy of your data where applicable",
    ],
    note: "To exercise your rights, contact us at info@equipregistry.com.",
  },
  cookies: {
    intro:
      "EquipRegistry may use essential cookies and limited analytics technologies.",
    items: [
      "Essential cookies for login and session handling",
      "Privacy-friendly analytics tools to understand platform usage and performance",
      "We do not use advertising cookies without the required legal basis",
    ],
  },
  transfers: {
    intro:
      "Because EquipRegistry is intended to operate internationally, some data may be processed outside the European Economic Area through service providers that apply appropriate safeguards where required.",
  },
  futureFeatures: {
    intro: "As the platform grows, EquipRegistry may introduce features such as:",
    items: [
      "Ownership transfer workflows",
      "Verification renewal reminders and expiry statuses",
      "Partner dashboards for insurers, banks, dealers, or rental companies",
      "API access for enterprise users",
      "QR-based passport verification",
      "Fraud alerts, sightings, and theft-related reporting flows",
    ],
  },
  changes: {
    intro:
      "We may update this Privacy Policy from time to time. The latest version will always be published on this page with the updated date.",
  },
  contact: {
    intro: "For privacy-related questions or requests, please contact:",
    emailLabel: "Email",
    ownerLabel: "Responsible person",
    addressLabel: "Address",
    taxLabel: "Tax / ID number",
  },
};

export const PRIVACY_TEXT: Record<Lang, PrivacyText> = {
  en: BASE_EN,

  es: {
    ...BASE_EN,
    backToHome: "Volver al inicio",
    title: "Política de Privacidad",
    subtitle:
      "Cómo EquipRegistry recopila, utiliza, almacena y protege los datos personales y los datos relacionados con activos.",
    lastUpdated: "Última actualización: abril de 2026",
    sections: {
      whoWeAre: "1. Quiénes somos",
      dataWeCollect: "2. Qué datos recopilamos",
      howWeUseData: "3. Cómo utilizamos sus datos",
      publicPrivate: "4. Datos públicos y privados",
      legalBasis: "5. Base jurídica del tratamiento",
      sharing: "6. Cesión de datos",
      payments: "7. Pagos y facturación",
      retention: "8. Conservación de datos",
      security: "9. Seguridad de los datos",
      rights: "10. Sus derechos",
      cookies: "11. Cookies y analítica",
      transfers: "12. Transferencias internacionales de datos",
      futureFeatures: "13. Funciones futuras y uso de datos",
      changes: "14. Cambios en esta política",
      contact: "15. Contacto",
    },
    whoWeAre: {
      intro:
        "EquipRegistry es una plataforma digital de registro y verificación de activos diseñada para ayudar a prevenir robos, fraudes, disputas de propiedad y doble financiación de vehículos, maquinaria, bicicletas, bicicletas eléctricas, patinetes eléctricos, remolques, activos energéticos y otros activos registrados.",
      controller: "El responsable del tratamiento es:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Recopilamos los datos personales y los datos relacionados con activos necesarios para prestar nuestros servicios.",
      personalTitle: "Datos personales",
      personalItems: [
        "Nombre completo",
        "Dirección de correo electrónico",
        "Número de teléfono, si se facilita",
        "Dirección, si se facilita",
        "Datos de empresa, si procede",
        "Número de IVA o datos fiscales, si procede",
      ],
      accountTitle: "Datos de cuenta",
      accountItems: [
        "Credenciales de acceso",
        "Contraseña cifrada",
        "Datos de sesión y autenticación",
        "Rol de usuario, como usuario particular, pyme, aseguradora, socio, concesionario, empresa de alquiler, banco o administrador",
      ],
      assetTitle: "Datos del activo y del registro",
      assetItems: [
        "Número de serie, VIN, número de bastidor, número de batería, número de pasaporte u otros identificadores",
        "Marca, modelo, categoría y especificaciones",
        "Datos de propiedad y registro",
        "Referencia de registro y número de pasaporte",
        "Documentos subidos como facturas, prueba de propiedad o denuncias policiales",
        "Historial de registro, revisión y verificación",
        "Datos de estado como Registrado y Verificado, Historial Desconocido, Robado / Alerta Roja, Verificación Caducada o No Registrado",
        "Información sobre transferencia de propiedad y actualización de datos cuando proceda",
      ],
      technicalTitle: "Datos técnicos y de uso",
      technicalItems: [
        "Dirección IP",
        "Información del navegador y del dispositivo",
        "Páginas visitadas y datos de interacción",
        "Datos analíticos mediante herramientas respetuosas con la privacidad",
      ],
    },
    howWeUseData: {
      intro: "Utilizamos sus datos para:",
      items: [
        "Crear y gestionar cuentas de usuario",
        "Registrar y verificar activos",
        "Generar pasaportes digitales de activos",
        "Apoyar la prevención del fraude, la detección de robos y la gestión de disputas",
        "Prestar servicios públicos de verificación",
        "Procesar pagos y facturas",
        "Responder a solicitudes de soporte y comunicaciones del servicio",
        "Permitir transferencias de titularidad, recordatorios de validación y flujos de actualización de datos",
        "Cumplir obligaciones legales, fiscales y normativas",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry utiliza un modelo de acceso por capas para equilibrar transparencia y privacidad.",
      publicTitle: "Datos públicos",
      publicItems: [
        "Estado del activo",
        "Datos de identificación limitados",
        "Número de referencia del pasaporte o del registro",
        "Información pública seleccionada del pasaporte necesaria para la verificación",
      ],
      privateTitle: "Datos privados o restringidos",
      privateItems: [
        "Identidad del propietario",
        "Datos de contacto completos",
        "Datos completos del activo",
        "Documentos subidos",
        "Historial interno de registro y validación",
      ],
      note:
        "La búsqueda y la verificación públicas están limitadas intencionadamente para proteger a los usuarios y, al mismo tiempo, permitir a terceros verificar información clave del activo.",
    },
    legalBasis: {
      intro:
        "Tratamos datos personales sobre una o varias de las siguientes bases jurídicas conforme al RGPD:",
      items: [
        "Ejecución de un contrato",
        "Cumplimiento de obligaciones legales",
        "Interés legítimo, incluida la prevención del fraude, la seguridad de la plataforma, la verificación de activos y la continuidad del negocio",
        "Consentimiento, cuando sea necesario",
      ],
    },
    sharing: {
      intro: "Podemos compartir datos con:",
      items: [
        "Compañías de seguros",
        "Bancos o entidades financieras",
        "Empresas de alquiler o leasing",
        "Socios de confianza implicados en procesos de verificación o registro",
        "Proveedores de alojamiento, analítica, pagos, correo electrónico, facturación y servicios técnicos",
        "Fuerzas y cuerpos de seguridad o autoridades públicas cuando exista obligación legal o justificación suficiente",
      ],
      note: "No vendemos datos personales.",
    },
    payments: {
      intro:
        "Los pagos pueden procesarse a través de proveedores externos como Stripe o mediante flujos temporales de pago manual cuando proceda.",
      items: [
        "EquipRegistry no almacena los datos completos de tarjetas o pagos",
        "Los proveedores de pago tratan la información de pago bajo sus propios marcos de cumplimiento",
        "Se pueden generar facturas para los clientes",
        "La gestión del IVA puede automatizarse cuando proceda, incluida la validación del número de IVA para clientes empresariales",
      ],
    },
    retention: {
      intro:
        "Conservamos los datos personales solo durante el tiempo necesario para la finalidad correspondiente.",
      items: [
        "Los datos de cuenta pueden conservarse mientras la cuenta permanezca activa",
        "Los datos de registro y del pasaporte pueden conservarse mientras el pasaporte exista o siga siendo relevante para verificación, auditoría, prevención del fraude o historial de titularidad",
        "Los registros fiscales y de facturación pueden conservarse durante el plazo legalmente exigido",
        "Los registros relacionados con fraude, robo, disputas o autoridades pueden conservarse durante más tiempo cuando esté justificado",
      ],
    },
    security: {
      intro:
        "Aplicamos medidas técnicas y organizativas adecuadas, entre ellas:",
      items: [
        "Contraseñas cifradas",
        "Control de acceso y permisos por roles",
        "Alojamiento e infraestructura seguros",
        "Registro y supervisión cuando proceda",
      ],
      note:
        "Ningún sistema está completamente libre de riesgos, pero adoptamos medidas razonables para proteger los datos.",
    },
    rights: {
      intro: "Según la normativa aplicable, usted puede tener derecho a:",
      items: [
        "Acceder a sus datos personales",
        "Rectificar datos inexactos",
        "Solicitar la supresión",
        "Limitar el tratamiento",
        "Oponerse al tratamiento",
        "Recibir una copia de sus datos cuando proceda",
      ],
      note:
        "Para ejercer sus derechos, contacte con nosotros en info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry puede utilizar cookies esenciales y tecnologías de analítica limitadas.",
      items: [
        "Cookies esenciales para el inicio de sesión y la gestión de la sesión",
        "Herramientas analíticas respetuosas con la privacidad para entender el uso y el rendimiento de la plataforma",
        "No utilizamos cookies publicitarias sin la base jurídica necesaria",
      ],
    },
    transfers: {
      intro:
        "Dado que EquipRegistry está previsto para operar internacionalmente, algunos datos pueden tratarse fuera del Espacio Económico Europeo a través de proveedores de servicios que apliquen las garantías adecuadas cuando sea necesario.",
    },
    futureFeatures: {
      intro:
        "A medida que la plataforma crezca, EquipRegistry podrá incorporar funciones como:",
      items: [
        "Procesos de transferencia de titularidad",
        "Recordatorios de renovación de verificación y estados de caducidad",
        "Paneles para aseguradoras, bancos, concesionarios o empresas de alquiler",
        "Acceso API para usuarios empresariales",
        "Verificación del pasaporte mediante QR",
        "Alertas de fraude, avistamientos y flujos de reporte relacionados con robos",
      ],
    },
    changes: {
      intro:
        "Podemos actualizar esta Política de Privacidad periódicamente. La versión más reciente estará siempre publicada en esta página con la fecha actualizada.",
    },
    contact: {
      intro:
        "Para cualquier consulta o solicitud relacionada con la privacidad, contacte con:",
      emailLabel: "Correo electrónico",
      ownerLabel: "Responsable",
      addressLabel: "Dirección",
      taxLabel: "NIF / NIE",
    },
  },

  de: {
    ...BASE_EN,
    backToHome: "Zurück zur Startseite",
    title: "Datenschutzerklärung",
    subtitle:
      "Wie EquipRegistry personenbezogene und vermögensbezogene Daten erhebt, nutzt, speichert und schützt.",
    lastUpdated: "Zuletzt aktualisiert: April 2026",
    sections: {
      whoWeAre: "1. Wer wir sind",
      dataWeCollect: "2. Welche Daten wir erheben",
      howWeUseData: "3. Wie wir Ihre Daten verwenden",
      publicPrivate: "4. Öffentliche und private Daten",
      legalBasis: "5. Rechtsgrundlagen der Verarbeitung",
      sharing: "6. Weitergabe von Daten",
      payments: "7. Zahlungen und Rechnungsstellung",
      retention: "8. Speicherdauer",
      security: "9. Datensicherheit",
      rights: "10. Ihre Rechte",
      cookies: "11. Cookies und Analysen",
      transfers: "12. Internationale Datenübermittlungen",
      futureFeatures: "13. Zukünftige Funktionen und Datennutzung",
      changes: "14. Änderungen dieser Richtlinie",
      contact: "15. Kontakt",
    },
    whoWeAre: {
      intro:
        "EquipRegistry ist eine digitale Plattform zur Registrierung und Verifizierung von Vermögenswerten, die dazu dient, Diebstahl, Betrug, Eigentumsstreitigkeiten und Doppelfinanzierungen von Fahrzeugen, Maschinen, Fahrrädern, E-Bikes, E-Scootern, Anhängern, Energieanlagen und anderen registrierten Vermögenswerten zu verhindern.",
      controller: "Verantwortlicher für die Datenverarbeitung ist:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Wir erheben personenbezogene Daten und vermögensbezogene Daten, die zur Erbringung unserer Dienstleistungen erforderlich sind.",
      personalTitle: "Personenbezogene Daten",
      personalItems: [
        "Vollständiger Name",
        "E-Mail-Adresse",
        "Telefonnummer, sofern angegeben",
        "Adresse, sofern angegeben",
        "Unternehmensdaten, sofern zutreffend",
        "Umsatzsteuer- oder Steuerdaten, sofern zutreffend",
      ],
      accountTitle: "Kontodaten",
      accountItems: [
        "Anmeldedaten",
        "Verschlüsseltes Passwort",
        "Sitzungs- und Authentifizierungsdaten",
        "Benutzerrolle wie Privatnutzer, KMU, Versicherer, Partner, Händler, Vermieter, Bank oder Administrator",
      ],
      assetTitle: "Daten zum Vermögenswert und zur Registrierung",
      assetItems: [
        "Seriennummer, VIN, Rahmennummer, Batterienummer, Passnummer oder andere Kennungen",
        "Marke, Modell, Kategorie und Spezifikationen",
        "Eigentums- und Registrierungsdaten",
        "Registrierungsreferenz und Passnummer",
        "Hochgeladene Dokumente wie Rechnungen, Eigentumsnachweise oder Polizeiberichte",
        "Registrierungs-, Prüfungs- und Verifizierungsverlauf",
        "Statusdaten wie Registriert & Verifiziert, Historie unbekannt, Gestohlen / Red Flag, Verifizierung abgelaufen oder Nicht registriert",
        "Informationen zu Eigentumsübertragungen und Datenaktualität, soweit zutreffend",
      ],
      technicalTitle: "Technische Nutzungsdaten",
      technicalItems: [
        "IP-Adresse",
        "Browser- und Geräteinformationen",
        "Besuchte Seiten und Interaktionsdaten",
        "Analysedaten über datenschutzfreundliche Analysewerkzeuge",
      ],
    },
    howWeUseData: {
      intro: "Wir verwenden Ihre Daten, um:",
      items: [
        "Benutzerkonten zu erstellen und zu verwalten",
        "Vermögenswerte zu registrieren und zu verifizieren",
        "Digitale Vermögenspässe zu erstellen",
        "Betrugsprävention, Diebstahlerkennung und Streitfallbearbeitung zu unterstützen",
        "Öffentliche Verifizierungsdienste bereitzustellen",
        "Zahlungen und Rechnungen zu verarbeiten",
        "Supportanfragen und Servicemitteilungen zu bearbeiten",
        "Eigentumsübertragungen, Validierungserinnerungen und Prozesse zur Datenaktualität zu ermöglichen",
        "Gesetzliche, steuerliche und regulatorische Pflichten zu erfüllen",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry verwendet ein gestuftes Zugriffsmodell, um Transparenz und Datenschutz in Einklang zu bringen.",
      publicTitle: "Öffentliche Daten",
      publicItems: [
        "Status des Vermögenswerts",
        "Begrenzte Identifikationsdaten",
        "Pass- oder Registrierungsreferenznummer",
        "Ausgewählte öffentliche Passinformationen, die für die Verifizierung erforderlich sind",
      ],
      privateTitle: "Private oder eingeschränkte Daten",
      privateItems: [
        "Identität des Eigentümers",
        "Vollständige Kontaktdaten",
        "Vollständige Daten zum Vermögenswert",
        "Hochgeladene Dokumente",
        "Interner Registrierungs- und Validierungsverlauf",
      ],
      note:
        "Die öffentliche Suche und Verifizierung ist bewusst begrenzt, um Nutzer zu schützen und Dritten dennoch die Prüfung wesentlicher Vermögensinformationen zu ermöglichen.",
    },
    legalBasis: {
      intro:
        "Wir verarbeiten personenbezogene Daten auf einer oder mehreren der folgenden Rechtsgrundlagen gemäß DSGVO:",
      items: [
        "Vertragserfüllung",
        "Einhaltung gesetzlicher Verpflichtungen",
        "Berechtigte Interessen, einschließlich Betrugsprävention, Plattformsicherheit, Vermögenswert-Verifizierung und Geschäftskontinuität",
        "Einwilligung, soweit erforderlich",
      ],
    },
    sharing: {
      intro: "Wir können Daten weitergeben an:",
      items: [
        "Versicherungsunternehmen",
        "Banken oder Finanzierungsanbieter",
        "Miet- und Leasingunternehmen",
        "Vertrauenswürdige Partner in Verifizierungs- oder Registrierungsprozessen",
        "Hosting-, Analyse-, Zahlungs-, E-Mail-, Rechnungs- und technische Dienstleister",
        "Strafverfolgungsbehörden oder öffentliche Stellen, wenn dies gesetzlich erforderlich oder gerechtfertigt ist",
      ],
      note: "Wir verkaufen keine personenbezogenen Daten.",
    },
    payments: {
      intro:
        "Zahlungen können über Drittanbieter wie Stripe oder über vorübergehende manuelle Zahlungsabläufe abgewickelt werden, soweit zutreffend.",
      items: [
        "EquipRegistry speichert keine vollständigen Karten- oder Zahlungsdaten",
        "Zahlungsanbieter verarbeiten Zahlungsinformationen im Rahmen ihrer eigenen Compliance-Vorgaben",
        "Für Kunden können Rechnungen erstellt werden",
        "Die Umsatzsteuerbehandlung kann, soweit anwendbar, automatisiert werden, einschließlich der Prüfung von Umsatzsteuer-Identifikationsnummern bei Geschäftskunden",
      ],
    },
    retention: {
      intro:
        "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist.",
      items: [
        "Kontodaten können gespeichert werden, solange das Konto aktiv ist",
        "Registrierungs- und Passdaten können gespeichert werden, solange der Pass besteht oder für Verifizierung, Prüfung, Betrugsprävention oder Eigentumshistorie relevant bleibt",
        "Steuer- und Rechnungsunterlagen können für die gesetzlich vorgeschriebene Dauer gespeichert werden",
        "Unterlagen im Zusammenhang mit Betrug, Diebstahl, Streitfällen oder Behörden können bei berechtigtem Anlass länger gespeichert werden",
      ],
    },
    security: {
      intro:
        "Wir setzen angemessene technische und organisatorische Sicherheitsmaßnahmen ein, darunter:",
      items: [
        "Verschlüsselte Passwörter",
        "Zugriffskontrolle und rollenbasierter Zugriff",
        "Sicheres Hosting und sichere Infrastruktur",
        "Protokollierung und Überwachung, soweit angemessen",
      ],
      note:
        "Kein System ist völlig risikofrei, aber wir treffen angemessene Maßnahmen zum Schutz der Daten.",
    },
    rights: {
      intro: "Je nach anwendbarem Recht haben Sie möglicherweise das Recht auf:",
      items: [
        "Zugang zu Ihren personenbezogenen Daten",
        "Berichtigung unrichtiger Daten",
        "Löschung",
        "Einschränkung der Verarbeitung",
        "Widerspruch gegen die Verarbeitung",
        "Erhalt einer Kopie Ihrer Daten, soweit anwendbar",
      ],
      note:
        "Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry kann notwendige Cookies und begrenzte Analysetechnologien verwenden.",
      items: [
        "Notwendige Cookies für Login- und Sitzungsverwaltung",
        "Datenschutzfreundliche Analysetools zur Auswertung von Nutzung und Leistung der Plattform",
        "Wir verwenden keine Werbe-Cookies ohne die erforderliche Rechtsgrundlage",
      ],
    },
    transfers: {
      intro:
        "Da EquipRegistry international betrieben werden soll, können einige Daten außerhalb des Europäischen Wirtschaftsraums über Dienstleister verarbeitet werden, die erforderlichenfalls angemessene Schutzmaßnahmen anwenden.",
    },
    futureFeatures: {
      intro:
        "Mit dem Wachstum der Plattform kann EquipRegistry Funktionen einführen wie:",
      items: [
        "Abläufe zur Eigentumsübertragung",
        "Erinnerungen an Verifizierungserneuerungen und Ablaufstatus",
        "Partner-Dashboards für Versicherer, Banken, Händler oder Vermieter",
        "API-Zugang für Unternehmenskunden",
        "QR-basierte Passverifizierung",
        "Betrugswarnungen, Sichtungsmeldungen und diebstahlbezogene Meldeprozesse",
      ],
    },
    changes: {
      intro:
        "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Die jeweils aktuelle Version wird stets mit dem aktualisierten Datum auf dieser Seite veröffentlicht.",
    },
    contact: {
      intro:
        "Bei Fragen oder Anfragen zum Datenschutz kontaktieren Sie bitte:",
      emailLabel: "E-Mail",
      ownerLabel: "Verantwortliche Person",
      addressLabel: "Adresse",
      taxLabel: "Steuer- / ID-Nummer",
    },
  },

  fr: {
    ...BASE_EN,
    backToHome: "Retour à l’accueil",
    title: "Politique de confidentialité",
    subtitle:
      "Comment EquipRegistry collecte, utilise, stocke et protège les données personnelles et les données liées aux actifs.",
    lastUpdated: "Dernière mise à jour : avril 2026",
    sections: {
      whoWeAre: "1. Qui nous sommes",
      dataWeCollect: "2. Quelles données nous collectons",
      howWeUseData: "3. Comment nous utilisons vos données",
      publicPrivate: "4. Données publiques et privées",
      legalBasis: "5. Base juridique du traitement",
      sharing: "6. Partage des données",
      payments: "7. Paiements et facturation",
      retention: "8. Conservation des données",
      security: "9. Sécurité des données",
      rights: "10. Vos droits",
      cookies: "11. Cookies et analyses",
      transfers: "12. Transferts internationaux de données",
      futureFeatures: "13. Fonctionnalités futures et utilisation des données",
      changes: "14. Modifications de cette politique",
      contact: "15. Contact",
    },
    whoWeAre: {
      intro:
        "EquipRegistry est une plateforme numérique d’enregistrement et de vérification des actifs conçue pour aider à prévenir le vol, la fraude, les litiges de propriété et le double financement de véhicules, d’équipements, de vélos, de vélos électriques, de trottinettes électriques, de remorques, d’actifs énergétiques et d’autres actifs enregistrés.",
      controller: "Le responsable du traitement est :",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Nous collectons les données personnelles et les données liées aux actifs nécessaires à la fourniture de nos services.",
      personalTitle: "Données personnelles",
      personalItems: [
        "Nom complet",
        "Adresse e-mail",
        "Numéro de téléphone, le cas échéant",
        "Adresse, le cas échéant",
        "Données de société, le cas échéant",
        "Numéro de TVA ou données fiscales, le cas échéant",
      ],
      accountTitle: "Données de compte",
      accountItems: [
        "Identifiants de connexion",
        "Mot de passe chiffré",
        "Données de session et d’authentification",
        "Rôle utilisateur tel que particulier, PME, assureur, partenaire, concessionnaire, loueur, banque ou administrateur",
      ],
      assetTitle: "Données sur l’actif et l’enregistrement",
      assetItems: [
        "Numéro de série, VIN, numéro de cadre, numéro de batterie, numéro de passeport ou autres identifiants",
        "Marque, modèle, catégorie et spécifications",
        "Données de propriété et d’enregistrement",
        "Référence d’enregistrement et numéro de passeport",
        "Documents téléchargés tels que factures, preuve de propriété ou rapports de police",
        "Historique d’enregistrement, de révision et de vérification",
        "Données de statut telles que Enregistré et vérifié, Historique inconnu, Volé / Alerte rouge, Vérification expirée ou Non enregistré",
        "Informations de transfert de propriété et de mise à jour des données, le cas échéant",
      ],
      technicalTitle: "Données techniques et d’utilisation",
      technicalItems: [
        "Adresse IP",
        "Informations sur le navigateur et l’appareil",
        "Pages visitées et données d’interaction",
        "Données analytiques via des outils respectueux de la vie privée",
      ],
    },
    howWeUseData: {
      intro: "Nous utilisons vos données pour :",
      items: [
        "Créer et gérer des comptes utilisateurs",
        "Enregistrer et vérifier des actifs",
        "Générer des passeports numériques d’actifs",
        "Soutenir la prévention de la fraude, la détection de vol et le traitement des litiges",
        "Fournir des services publics de vérification",
        "Traiter les paiements et les factures",
        "Répondre aux demandes d’assistance et aux communications de service",
        "Permettre les transferts de propriété, les rappels de validation et les processus de mise à jour des données",
        "Respecter les obligations légales, fiscales et réglementaires",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry utilise un modèle d’accès par niveaux afin d’équilibrer transparence et confidentialité.",
      publicTitle: "Données publiques",
      publicItems: [
        "Statut de l’actif",
        "Données d’identification limitées",
        "Numéro de référence du passeport ou du registre",
        "Informations publiques sélectionnées du passeport nécessaires à la vérification",
      ],
      privateTitle: "Données privées ou restreintes",
      privateItems: [
        "Identité du propriétaire",
        "Coordonnées complètes",
        "Détails complets sur l’actif",
        "Documents téléchargés",
        "Historique interne d’enregistrement et de validation",
      ],
      note:
        "La recherche et la vérification publiques sont volontairement limitées afin de protéger les utilisateurs tout en permettant aux tiers de vérifier les informations essentielles sur l’actif.",
    },
    legalBasis: {
      intro:
        "Nous traitons les données personnelles sur la base d’un ou plusieurs fondements juridiques suivants au titre du RGPD :",
      items: [
        "Exécution d’un contrat",
        "Respect d’obligations légales",
        "Intérêts légitimes, notamment la prévention de la fraude, la sécurité de la plateforme, la vérification des actifs et la continuité des activités",
        "Consentement, lorsque cela est requis",
      ],
    },
    sharing: {
      intro: "Nous pouvons partager des données avec :",
      items: [
        "Compagnies d’assurance",
        "Banques ou organismes de financement",
        "Sociétés de location ou de leasing",
        "Partenaires de confiance impliqués dans les processus de vérification ou d’enregistrement",
        "Prestataires d’hébergement, d’analyse, de paiement, d’e-mail, de facturation et de services techniques",
        "Forces de l’ordre ou autorités publiques lorsque cela est légalement requis ou justifié",
      ],
      note: "Nous ne vendons pas de données personnelles.",
    },
    payments: {
      intro:
        "Les paiements peuvent être traités via des prestataires tiers tels que Stripe ou via des processus temporaires de paiement manuel lorsque cela s’applique.",
      items: [
        "EquipRegistry ne stocke pas les données complètes de carte ou de paiement",
        "Les prestataires de paiement traitent les informations de paiement selon leurs propres cadres de conformité",
        "Des factures peuvent être générées pour les clients",
        "La gestion de la TVA peut être automatisée le cas échéant, y compris la validation du numéro de TVA pour les clients professionnels",
      ],
    },
    retention: {
      intro:
        "Nous conservons les données personnelles uniquement pendant la durée nécessaire à la finalité concernée.",
      items: [
        "Les données de compte peuvent être conservées tant que le compte reste actif",
        "Les données d’enregistrement et de passeport peuvent être conservées tant que le passeport existe ou reste pertinent pour la vérification, l’audit, la prévention de la fraude ou l’historique de propriété",
        "Les documents fiscaux et de facturation peuvent être conservés pendant la durée légalement requise",
        "Les dossiers liés à la fraude, au vol, aux litiges ou aux autorités peuvent être conservés plus longtemps lorsque cela est justifié",
      ],
    },
    security: {
      intro:
        "Nous appliquons des mesures techniques et organisationnelles appropriées, notamment :",
      items: [
        "Mots de passe chiffrés",
        "Contrôle d’accès et gestion des rôles",
        "Hébergement et infrastructure sécurisés",
        "Journalisation et surveillance lorsque cela est approprié",
      ],
      note:
        "Aucun système n’est totalement exempt de risque, mais nous prenons des mesures raisonnables pour protéger les données.",
    },
    rights: {
      intro: "Selon la législation applicable, vous pouvez avoir le droit de :",
      items: [
        "Accéder à vos données personnelles",
        "Corriger des données inexactes",
        "Demander leur suppression",
        "Limiter le traitement",
        "Vous opposer au traitement",
        "Recevoir une copie de vos données lorsque cela s’applique",
      ],
      note:
        "Pour exercer vos droits, contactez-nous à info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry peut utiliser des cookies essentiels et des technologies d’analyse limitées.",
      items: [
        "Cookies essentiels pour la connexion et la gestion de session",
        "Outils d’analyse respectueux de la vie privée pour comprendre l’usage et les performances de la plateforme",
        "Nous n’utilisons pas de cookies publicitaires sans base légale requise",
      ],
    },
    transfers: {
      intro:
        "Étant donné qu’EquipRegistry est destiné à fonctionner à l’international, certaines données peuvent être traitées en dehors de l’Espace économique européen par des prestataires appliquant les garanties appropriées lorsque cela est requis.",
    },
    futureFeatures: {
      intro:
        "À mesure que la plateforme évolue, EquipRegistry peut introduire des fonctionnalités telles que :",
      items: [
        "Processus de transfert de propriété",
        "Rappels de renouvellement de vérification et statuts d’expiration",
        "Tableaux de bord partenaires pour assureurs, banques, concessionnaires ou loueurs",
        "Accès API pour les utilisateurs professionnels",
        "Vérification des passeports par QR",
        "Alertes fraude, signalements et flux liés au vol",
      ],
    },
    changes: {
      intro:
        "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version la plus récente sera toujours publiée sur cette page avec la date mise à jour.",
    },
    contact: {
      intro:
        "Pour toute question ou demande relative à la confidentialité, veuillez nous contacter :",
      emailLabel: "E-mail",
      ownerLabel: "Responsable",
      addressLabel: "Adresse",
      taxLabel: "Numéro fiscal / ID",
    },
  },

  it: {
    ...BASE_EN,
    backToHome: "Torna alla home",
    title: "Informativa sulla privacy",
    subtitle:
      "Come EquipRegistry raccoglie, utilizza, conserva e protegge i dati personali e i dati relativi ai beni.",
    lastUpdated: "Ultimo aggiornamento: aprile 2026",
    sections: {
      whoWeAre: "1. Chi siamo",
      dataWeCollect: "2. Quali dati raccogliamo",
      howWeUseData: "3. Come utilizziamo i tuoi dati",
      publicPrivate: "4. Dati pubblici e privati",
      legalBasis: "5. Base giuridica del trattamento",
      sharing: "6. Condivisione dei dati",
      payments: "7. Pagamenti e fatturazione",
      retention: "8. Conservazione dei dati",
      security: "9. Sicurezza dei dati",
      rights: "10. I tuoi diritti",
      cookies: "11. Cookie e analisi",
      transfers: "12. Trasferimenti internazionali di dati",
      futureFeatures: "13. Funzionalità future e uso dei dati",
      changes: "14. Modifiche a questa informativa",
      contact: "15. Contatti",
    },
    whoWeAre: {
      intro:
        "EquipRegistry è una piattaforma digitale di registrazione e verifica di beni progettata per aiutare a prevenire furti, frodi, controversie sulla proprietà e doppio finanziamento di veicoli, attrezzature, biciclette, e-bike, monopattini elettrici, rimorchi, beni energetici e altri beni registrati.",
      controller: "Il titolare del trattamento è:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Raccogliamo dati personali e dati relativi ai beni necessari per fornire i nostri servizi.",
      personalTitle: "Dati personali",
      personalItems: [
        "Nome completo",
        "Indirizzo e-mail",
        "Numero di telefono, se fornito",
        "Indirizzo, se fornito",
        "Dati aziendali, se applicabili",
        "Numero di partita IVA o dati fiscali, se applicabili",
      ],
      accountTitle: "Dati dell’account",
      accountItems: [
        "Credenziali di accesso",
        "Password crittografata",
        "Dati di sessione e autenticazione",
        "Ruolo utente come privato, PMI, assicuratore, partner, concessionario, società di noleggio, banca o amministratore",
      ],
      assetTitle: "Dati del bene e della registrazione",
      assetItems: [
        "Numero di serie, VIN, numero di telaio, numero della batteria, numero del passaporto o altri identificativi",
        "Marca, modello, categoria e specifiche",
        "Dati di proprietà e registrazione",
        "Riferimento di registrazione e numero del passaporto",
        "Documenti caricati come fatture, prove di proprietà o rapporti di polizia",
        "Cronologia di registrazione, revisione e verifica",
        "Dati di stato come Registrato e verificato, Cronologia sconosciuta, Rubato / Allerta rossa, Verifica scaduta o Non registrato",
        "Informazioni sul trasferimento di proprietà e sull’aggiornamento dei dati, se applicabili",
      ],
      technicalTitle: "Dati tecnici e di utilizzo",
      technicalItems: [
        "Indirizzo IP",
        "Informazioni sul browser e sul dispositivo",
        "Pagine visitate e dati di interazione",
        "Dati analitici tramite strumenti rispettosi della privacy",
      ],
    },
    howWeUseData: {
      intro: "Utilizziamo i tuoi dati per:",
      items: [
        "Creare e gestire account utente",
        "Registrare e verificare beni",
        "Generare passaporti digitali dei beni",
        "Supportare la prevenzione delle frodi, il rilevamento dei furti e la gestione delle controversie",
        "Fornire servizi pubblici di verifica",
        "Elaborare pagamenti e fatture",
        "Rispondere alle richieste di assistenza e alle comunicazioni di servizio",
        "Consentire trasferimenti di proprietà, promemoria di validazione e processi di aggiornamento dati",
        "Adempiere a obblighi legali, fiscali e normativi",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry utilizza un modello di accesso a livelli per bilanciare trasparenza e privacy.",
      publicTitle: "Dati pubblici",
      publicItems: [
        "Stato del bene",
        "Dati identificativi limitati",
        "Numero di riferimento del passaporto o del registro",
        "Informazioni pubbliche selezionate del passaporto necessarie per la verifica",
      ],
      privateTitle: "Dati privati o riservati",
      privateItems: [
        "Identità del proprietario",
        "Dati di contatto completi",
        "Dettagli completi del bene",
        "Documenti caricati",
        "Cronologia interna di registrazione e validazione",
      ],
      note:
        "La ricerca pubblica e la verifica sono volutamente limitate per proteggere gli utenti consentendo comunque a terzi di verificare le informazioni essenziali sul bene.",
    },
    legalBasis: {
      intro:
        "Trattiamo i dati personali sulla base di una o più delle seguenti basi giuridiche ai sensi del GDPR:",
      items: [
        "Esecuzione di un contratto",
        "Adempimento di obblighi legali",
        "Interessi legittimi, inclusi prevenzione delle frodi, sicurezza della piattaforma, verifica dei beni e continuità operativa",
        "Consenso, ove richiesto",
      ],
    },
    sharing: {
      intro: "Possiamo condividere i dati con:",
      items: [
        "Compagnie assicurative",
        "Banche o fornitori di finanziamenti",
        "Società di noleggio o leasing",
        "Partner affidabili coinvolti nei flussi di verifica o registrazione",
        "Fornitori di hosting, analisi, pagamenti, e-mail, fatturazione e servizi tecnici",
        "Forze dell’ordine o autorità pubbliche quando legalmente richiesto o giustificato",
      ],
      note: "Non vendiamo dati personali.",
    },
    payments: {
      intro:
        "I pagamenti possono essere elaborati tramite fornitori terzi come Stripe o tramite flussi temporanei di pagamento manuale, ove applicabili.",
      items: [
        "EquipRegistry non memorizza i dati completi della carta o di pagamento",
        "I fornitori di pagamento trattano le informazioni di pagamento secondo i propri quadri di conformità",
        "Possono essere generate fatture per i clienti",
        "La gestione dell’IVA può essere automatizzata ove applicabile, inclusa la convalida del numero IVA per i clienti business",
      ],
    },
    retention: {
      intro:
        "Conserviamo i dati personali solo per il tempo necessario alla finalità pertinente.",
      items: [
        "I dati dell’account possono essere conservati finché l’account rimane attivo",
        "I dati di registrazione e del passaporto possono essere conservati finché il passaporto esiste o rimane rilevante per verifica, audit, prevenzione delle frodi o storico di proprietà",
        "I registri fiscali e di fatturazione possono essere conservati per il periodo legalmente richiesto",
        "I registri relativi a frodi, furti, controversie o autorità possono essere conservati più a lungo quando giustificato",
      ],
    },
    security: {
      intro:
        "Applichiamo adeguate misure tecniche e organizzative di sicurezza, tra cui:",
      items: [
        "Password crittografate",
        "Controllo degli accessi e accesso basato sui ruoli",
        "Hosting e infrastruttura sicuri",
        "Registrazione e monitoraggio quando opportuno",
      ],
      note:
        "Nessun sistema è completamente privo di rischi, ma adottiamo misure ragionevoli per proteggere i dati.",
    },
    rights: {
      intro: "A seconda della legge applicabile, potresti avere il diritto di:",
      items: [
        "Accedere ai tuoi dati personali",
        "Correggere dati inesatti",
        "Richiedere la cancellazione",
        "Limitare il trattamento",
        "Opporti al trattamento",
        "Ricevere una copia dei tuoi dati, ove applicabile",
      ],
      note:
        "Per esercitare i tuoi diritti, contattaci all’indirizzo info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry può utilizzare cookie essenziali e tecnologie analitiche limitate.",
      items: [
        "Cookie essenziali per login e gestione della sessione",
        "Strumenti analitici rispettosi della privacy per comprendere uso e prestazioni della piattaforma",
        "Non utilizziamo cookie pubblicitari senza la base giuridica richiesta",
      ],
    },
    transfers: {
      intro:
        "Poiché EquipRegistry è destinato a operare a livello internazionale, alcuni dati possono essere trattati al di fuori dello Spazio economico europeo tramite fornitori di servizi che applicano adeguate garanzie ove richiesto.",
    },
    futureFeatures: {
      intro:
        "Con la crescita della piattaforma, EquipRegistry potrebbe introdurre funzionalità come:",
      items: [
        "Flussi di trasferimento di proprietà",
        "Promemoria di rinnovo della verifica e stati di scadenza",
        "Dashboard partner per assicuratori, banche, concessionari o società di noleggio",
        "Accesso API per utenti enterprise",
        "Verifica del passaporto tramite QR",
        "Avvisi antifrode, segnalazioni e flussi relativi ai furti",
      ],
    },
    changes: {
      intro:
        "Possiamo aggiornare periodicamente questa Informativa sulla privacy. La versione più recente sarà sempre pubblicata su questa pagina con la data aggiornata.",
    },
    contact: {
      intro:
        "Per domande o richieste relative alla privacy, contattaci:",
      emailLabel: "E-mail",
      ownerLabel: "Responsabile",
      addressLabel: "Indirizzo",
      taxLabel: "Numero fiscale / ID",
    },
  },

  nl: {
    ...BASE_EN,
    backToHome: "Terug naar home",
    title: "Privacybeleid",
    subtitle:
      "Hoe EquipRegistry persoonsgegevens en gegevens over assets verzamelt, gebruikt, opslaat en beschermt.",
    lastUpdated: "Laatst bijgewerkt: april 2026",
    sections: {
      whoWeAre: "1. Wie wij zijn",
      dataWeCollect: "2. Welke gegevens wij verzamelen",
      howWeUseData: "3. Hoe wij uw gegevens gebruiken",
      publicPrivate: "4. Openbare en privégegevens",
      legalBasis: "5. Rechtsgrond voor verwerking",
      sharing: "6. Delen van gegevens",
      payments: "7. Betalingen en facturatie",
      retention: "8. Bewaartermijn",
      security: "9. Beveiliging van gegevens",
      rights: "10. Uw rechten",
      cookies: "11. Cookies en analytics",
      transfers: "12. Internationale doorgifte van gegevens",
      futureFeatures: "13. Toekomstige functies en gebruik van gegevens",
      changes: "14. Wijzigingen in dit beleid",
      contact: "15. Contact",
    },
    whoWeAre: {
      intro:
        "EquipRegistry is een digitaal registratie- en verificatieplatform voor assets, ontworpen om diefstal, fraude, eigendomsgeschillen en dubbele financiering te helpen voorkomen van voertuigen, machines, fietsen, e-bikes, elektrische steps, trailers, energie-assets en andere geregistreerde assets.",
      controller: "De verwerkingsverantwoordelijke is:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Wij verzamelen persoonsgegevens en assetgerelateerde gegevens die nodig zijn om onze diensten te leveren.",
      personalTitle: "Persoonsgegevens",
      personalItems: [
        "Volledige naam",
        "E-mailadres",
        "Telefoonnummer, indien verstrekt",
        "Adres, indien verstrekt",
        "Bedrijfsgegevens, indien van toepassing",
        "Btw-nummer of fiscale gegevens, indien van toepassing",
      ],
      accountTitle: "Accountgegevens",
      accountItems: [
        "Inloggegevens",
        "Versleuteld wachtwoord",
        "Sessie- en authenticatiegegevens",
        "Gebruikersrol zoals particulier, mkb, verzekeraar, partner, dealer, verhuurbedrijf, bank of admin",
      ],
      assetTitle: "Asset- en registratiegegevens",
      assetItems: [
        "Serienummer, VIN, framenummer, batterijnummer, paspoortnummer of andere identificatoren",
        "Merk, model, categorie en specificaties",
        "Eigendoms- en registratiegegevens",
        "Registratiereferentie en paspoortnummer",
        "Geüploade documenten zoals facturen, eigendomsbewijs of politierapporten",
        "Registratie-, beoordelings- en verificatiegeschiedenis",
        "Statusgegevens zoals Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired of Not Registered",
        "Gegevens over eigendomsoverdracht en actualiteit van data waar van toepassing",
      ],
      technicalTitle: "Technische en gebruiksgegevens",
      technicalItems: [
        "IP-adres",
        "Browser- en apparaatgegevens",
        "Bezochte pagina’s en interactiegegevens",
        "Analytische gegevens via privacyvriendelijke analysetools",
      ],
    },
    howWeUseData: {
      intro: "Wij gebruiken uw gegevens om:",
      items: [
        "Gebruikersaccounts aan te maken en te beheren",
        "Assets te registreren en te verifiëren",
        "Digitale assetpaspoorten te genereren",
        "Fraudepreventie, diefstaldetectie en geschilafhandeling te ondersteunen",
        "Openbare verificatiediensten aan te bieden",
        "Betalingen en facturen te verwerken",
        "Te reageren op supportverzoeken en servicecommunicatie",
        "Eigendomsoverdracht, validatieherinneringen en workflows voor data-actualiteit mogelijk te maken",
        "Te voldoen aan wettelijke, fiscale en complianceverplichtingen",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry gebruikt een gelaagd toegangsmodel om transparantie en privacy in balans te brengen.",
      publicTitle: "Openbare gegevens",
      publicItems: [
        "Assetstatus",
        "Beperkte identificatiegegevens",
        "Paspoort- of registratiereferentienummer",
        "Geselecteerde openbare paspoortinformatie die nodig is voor verificatie",
      ],
      privateTitle: "Privé- of afgeschermde gegevens",
      privateItems: [
        "Identiteit van de eigenaar",
        "Volledige contactgegevens",
        "Volledige assetgegevens",
        "Geüploade documenten",
        "Interne registratie- en validatiegeschiedenis",
      ],
      note:
        "Openbaar zoeken en verifiëren is bewust beperkt om gebruikers te beschermen en tegelijk derden in staat te stellen essentiële assetinformatie te controleren.",
    },
    legalBasis: {
      intro:
        "Wij verwerken persoonsgegevens op basis van een of meer van de volgende grondslagen onder de AVG:",
      items: [
        "Uitvoering van een overeenkomst",
        "Naleving van wettelijke verplichtingen",
        "Gerechtvaardigde belangen, waaronder fraudepreventie, platformbeveiliging, assetverificatie en bedrijfscontinuïteit",
        "Toestemming, waar vereist",
      ],
    },
    sharing: {
      intro: "Wij kunnen gegevens delen met:",
      items: [
        "Verzekeraars",
        "Banken of financieringsverstrekkers",
        "Verhuur- en leasemaatschappijen",
        "Vertrouwde partners die betrokken zijn bij verificatie- of registratieprocessen",
        "Hosting-, analytics-, betalings-, e-mail-, facturatie- en technische dienstverleners",
        "Opsporingsdiensten of overheidsinstanties wanneer dit wettelijk vereist of gerechtvaardigd is",
      ],
      note: "Wij verkopen geen persoonsgegevens.",
    },
    payments: {
      intro:
        "Betalingen kunnen worden verwerkt via externe betalingsproviders zoals Stripe of via tijdelijke handmatige betalingsprocessen waar van toepassing.",
      items: [
        "EquipRegistry slaat geen volledige kaart- of betaalgegevens op",
        "Betalingsproviders verwerken betaalinformatie onder hun eigen compliancekaders",
        "Facturen kunnen voor klanten worden gegenereerd",
        "Btw-afhandeling kan waar van toepassing worden geautomatiseerd, inclusief validatie van btw-nummers voor zakelijke klanten",
      ],
    },
    retention: {
      intro:
        "Wij bewaren persoonsgegevens alleen zolang als nodig is voor het relevante doel.",
      items: [
        "Accountgegevens kunnen worden bewaard zolang het account actief blijft",
        "Registratie- en paspoortgegevens kunnen worden bewaard zolang het paspoort bestaat of relevant blijft voor verificatie, audit, fraudepreventie of eigendomsgeschiedenis",
        "Belasting- en factuurgegevens kunnen worden bewaard gedurende de wettelijk verplichte termijn",
        "Gegevens met betrekking tot fraude, diefstal, geschillen of autoriteiten kunnen langer worden bewaard wanneer dat gerechtvaardigd is",
      ],
    },
    security: {
      intro:
        "Wij passen passende technische en organisatorische beveiligingsmaatregelen toe, waaronder:",
      items: [
        "Versleutelde wachtwoorden",
        "Toegangscontrole en rolgebaseerde toegang",
        "Veilige hosting en infrastructuur",
        "Logging en monitoring waar passend",
      ],
      note:
        "Geen enkel systeem is volledig risicoloos, maar wij nemen redelijke maatregelen om gegevens te beschermen.",
    },
    rights: {
      intro: "Afhankelijk van de toepasselijke wetgeving heeft u mogelijk het recht om:",
      items: [
        "Inzage te krijgen in uw persoonsgegevens",
        "Onjuiste gegevens te corrigeren",
        "Verwijdering te verzoeken",
        "Verwerking te beperken",
        "Bezwaar te maken tegen verwerking",
        "Een kopie van uw gegevens te ontvangen waar van toepassing",
      ],
      note:
        "Om uw rechten uit te oefenen, kunt u contact opnemen via info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry kan essentiële cookies en beperkte analysetechnologieën gebruiken.",
      items: [
        "Essentiële cookies voor login- en sessiebeheer",
        "Privacyvriendelijke analysetools om gebruik en prestaties van het platform te begrijpen",
        "Wij gebruiken geen advertentiecookies zonder de vereiste rechtsgrond",
      ],
    },
    transfers: {
      intro:
        "Omdat EquipRegistry internationaal bedoeld is, kunnen sommige gegevens buiten de Europese Economische Ruimte worden verwerkt via dienstverleners die waar nodig passende waarborgen toepassen.",
    },
    futureFeatures: {
      intro:
        "Naarmate het platform groeit, kan EquipRegistry functies introduceren zoals:",
      items: [
        "Workflows voor eigendomsoverdracht",
        "Herinneringen voor verlenging van verificatie en vervalstatussen",
        "Partnerdashboards voor verzekeraars, banken, dealers of verhuurbedrijven",
        "API-toegang voor enterprisegebruikers",
        "QR-gebaseerde paspoortverificatie",
        "Fraudealerts, sightings en diefstalgerelateerde meldingsstromen",
      ],
    },
    changes: {
      intro:
        "Wij kunnen dit Privacybeleid van tijd tot tijd bijwerken. De meest recente versie wordt altijd op deze pagina gepubliceerd met de bijgewerkte datum.",
    },
    contact: {
      intro:
        "Voor privacygerelateerde vragen of verzoeken kunt u contact opnemen via:",
      emailLabel: "E-mail",
      ownerLabel: "Verantwoordelijke",
      addressLabel: "Adres",
      taxLabel: "Belasting- / ID-nummer",
    },
  },

  pt: {
    ...BASE_EN,
    backToHome: "Voltar ao início",
    title: "Política de Privacidade",
    subtitle:
      "Como a EquipRegistry recolhe, utiliza, armazena e protege dados pessoais e dados relacionados com ativos.",
    lastUpdated: "Última atualização: abril de 2026",
    sections: {
      whoWeAre: "1. Quem somos",
      dataWeCollect: "2. Que dados recolhemos",
      howWeUseData: "3. Como utilizamos os seus dados",
      publicPrivate: "4. Dados públicos e privados",
      legalBasis: "5. Base legal do tratamento",
      sharing: "6. Partilha de dados",
      payments: "7. Pagamentos e faturação",
      retention: "8. Conservação dos dados",
      security: "9. Segurança dos dados",
      rights: "10. Os seus direitos",
      cookies: "11. Cookies e analítica",
      transfers: "12. Transferências internacionais de dados",
      futureFeatures: "13. Funcionalidades futuras e utilização de dados",
      changes: "14. Alterações a esta política",
      contact: "15. Contacto",
    },
    whoWeAre: {
      intro:
        "A EquipRegistry é uma plataforma digital de registo e verificação de ativos concebida para ajudar a prevenir roubo, fraude, disputas de propriedade e duplo financiamento de veículos, equipamentos, bicicletas, bicicletas elétricas, trotinetes elétricas, reboques, ativos energéticos e outros ativos registados.",
      controller: "O responsável pelo tratamento é:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Recolhemos dados pessoais e dados relacionados com ativos necessários para prestar os nossos serviços.",
      personalTitle: "Dados pessoais",
      personalItems: [
        "Nome completo",
        "Endereço de e-mail",
        "Número de telefone, se fornecido",
        "Morada, se fornecida",
        "Dados da empresa, se aplicável",
        "Número de IVA ou dados fiscais, se aplicável",
      ],
      accountTitle: "Dados da conta",
      accountItems: [
        "Credenciais de início de sessão",
        "Palavra-passe encriptada",
        "Dados de sessão e autenticação",
        "Função do utilizador, como particular, PME, seguradora, parceiro, concessionário, empresa de aluguer, banco ou administrador",
      ],
      assetTitle: "Dados do ativo e do registo",
      assetItems: [
        "Número de série, VIN, número de quadro, número da bateria, número do passaporte ou outros identificadores",
        "Marca, modelo, categoria e especificações",
        "Dados de propriedade e registo",
        "Referência de registo e número do passaporte",
        "Documentos carregados, como faturas, prova de propriedade ou relatórios policiais",
        "Histórico de registo, revisão e verificação",
        "Dados de estado como Registado e Verificado, Histórico Desconhecido, Roubado / Alerta Vermelho, Verificação Expirada ou Não Registado",
        "Informações sobre transferência de propriedade e atualização de dados, quando aplicável",
      ],
      technicalTitle: "Dados técnicos e de utilização",
      technicalItems: [
        "Endereço IP",
        "Informações do navegador e do dispositivo",
        "Páginas visitadas e dados de interação",
        "Dados analíticos através de ferramentas respeitadoras da privacidade",
      ],
    },
    howWeUseData: {
      intro: "Utilizamos os seus dados para:",
      items: [
        "Criar e gerir contas de utilizador",
        "Registar e verificar ativos",
        "Gerar passaportes digitais de ativos",
        "Apoiar a prevenção de fraude, deteção de roubo e gestão de disputas",
        "Prestar serviços públicos de verificação",
        "Processar pagamentos e faturas",
        "Responder a pedidos de apoio e comunicações de serviço",
        "Permitir transferências de propriedade, lembretes de validação e fluxos de atualização de dados",
        "Cumprir obrigações legais, fiscais e regulamentares",
      ],
    },
    publicPrivate: {
      intro:
        "A EquipRegistry utiliza um modelo de acesso em camadas para equilibrar transparência e privacidade.",
      publicTitle: "Dados públicos",
      publicItems: [
        "Estado do ativo",
        "Dados de identificação limitados",
        "Número de referência do passaporte ou do registo",
        "Informação pública selecionada do passaporte necessária para verificação",
      ],
      privateTitle: "Dados privados ou restritos",
      privateItems: [
        "Identidade do proprietário",
        "Dados de contacto completos",
        "Detalhes completos do ativo",
        "Documentos carregados",
        "Histórico interno de registo e validação",
      ],
      note:
        "A pesquisa e verificação públicas são intencionalmente limitadas para proteger os utilizadores, permitindo ao mesmo tempo que terceiros confirmem informações essenciais do ativo.",
    },
    legalBasis: {
      intro:
        "Tratamos dados pessoais com base em uma ou mais das seguintes bases legais ao abrigo do RGPD:",
      items: [
        "Execução de um contrato",
        "Cumprimento de obrigações legais",
        "Interesses legítimos, incluindo prevenção de fraude, segurança da plataforma, verificação de ativos e continuidade do negócio",
        "Consentimento, quando necessário",
      ],
    },
    sharing: {
      intro: "Podemos partilhar dados com:",
      items: [
        "Companhias de seguros",
        "Bancos ou entidades financiadoras",
        "Empresas de aluguer ou leasing",
        "Parceiros de confiança envolvidos em fluxos de verificação ou registo",
        "Prestadores de alojamento, analítica, pagamentos, e-mail, faturação e serviços técnicos",
        "Autoridades policiais ou públicas quando legalmente exigido ou justificado",
      ],
      note: "Não vendemos dados pessoais.",
    },
    payments: {
      intro:
        "Os pagamentos podem ser processados através de prestadores terceiros como a Stripe ou através de fluxos temporários de pagamento manual, quando aplicável.",
      items: [
        "A EquipRegistry não armazena dados completos de cartão ou pagamento",
        "Os prestadores de pagamento tratam a informação de pagamento nos termos dos seus próprios quadros de conformidade",
        "Podem ser geradas faturas para os clientes",
        "O tratamento do IVA pode ser automatizado quando aplicável, incluindo a validação do número de IVA para clientes empresariais",
      ],
    },
    retention: {
      intro:
        "Conservamos os dados pessoais apenas durante o tempo necessário para a finalidade relevante.",
      items: [
        "Os dados da conta podem ser mantidos enquanto a conta permanecer ativa",
        "Os dados de registo e do passaporte podem ser mantidos enquanto o passaporte existir ou continuar relevante para verificação, auditoria, prevenção de fraude ou histórico de propriedade",
        "Os registos fiscais e de faturação podem ser mantidos pelo período legalmente exigido",
        "Os registos relacionados com fraude, roubo, disputas ou autoridades podem ser mantidos por mais tempo quando justificado",
      ],
    },
    security: {
      intro:
        "Aplicamos medidas técnicas e organizacionais adequadas, incluindo:",
      items: [
        "Palavras-passe encriptadas",
        "Controlo de acesso e acesso baseado em funções",
        "Alojamento e infraestrutura seguros",
        "Registo e monitorização quando apropriado",
      ],
      note:
        "Nenhum sistema é totalmente isento de risco, mas adotamos medidas razoáveis para proteger os dados.",
    },
    rights: {
      intro: "Dependendo da legislação aplicável, poderá ter o direito de:",
      items: [
        "Aceder aos seus dados pessoais",
        "Corrigir dados incorretos",
        "Solicitar eliminação",
        "Restringir o tratamento",
        "Opor-se ao tratamento",
        "Receber uma cópia dos seus dados quando aplicável",
      ],
      note:
        "Para exercer os seus direitos, contacte-nos através de info@equipregistry.com.",
    },
    cookies: {
      intro:
        "A EquipRegistry pode utilizar cookies essenciais e tecnologias analíticas limitadas.",
      items: [
        "Cookies essenciais para início de sessão e gestão de sessão",
        "Ferramentas analíticas respeitadoras da privacidade para compreender a utilização e desempenho da plataforma",
        "Não utilizamos cookies publicitários sem a base legal necessária",
      ],
    },
    transfers: {
      intro:
        "Como a EquipRegistry se destina a operar internacionalmente, alguns dados podem ser tratados fora do Espaço Económico Europeu através de prestadores de serviços que aplicam salvaguardas adequadas quando exigido.",
    },
    futureFeatures: {
      intro:
        "À medida que a plataforma cresce, a EquipRegistry pode introduzir funcionalidades como:",
      items: [
        "Fluxos de transferência de propriedade",
        "Lembretes de renovação de verificação e estados de expiração",
        "Painéis de parceiros para seguradoras, bancos, concessionários ou empresas de aluguer",
        "Acesso API para utilizadores empresariais",
        "Verificação de passaporte baseada em QR",
        "Alertas de fraude, sightings e fluxos de reporte relacionados com roubo",
      ],
    },
    changes: {
      intro:
        "Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente será sempre publicada nesta página com a data atualizada.",
    },
    contact: {
      intro:
        "Para questões ou pedidos relacionados com privacidade, contacte-nos:",
      emailLabel: "E-mail",
      ownerLabel: "Responsável",
      addressLabel: "Morada",
      taxLabel: "Número fiscal / ID",
    },
  },

  ru: {
    ...BASE_EN,
    backToHome: "Назад на главную",
    title: "Политика конфиденциальности",
    subtitle:
      "Как EquipRegistry собирает, использует, хранит и защищает персональные данные и данные, связанные с активами.",
    lastUpdated: "Последнее обновление: апрель 2026",
    sections: {
      whoWeAre: "1. Кто мы",
      dataWeCollect: "2. Какие данные мы собираем",
      howWeUseData: "3. Как мы используем ваши данные",
      publicPrivate: "4. Публичные и частные данные",
      legalBasis: "5. Правовые основания обработки",
      sharing: "6. Передача данных",
      payments: "7. Платежи и выставление счетов",
      retention: "8. Срок хранения данных",
      security: "9. Безопасность данных",
      rights: "10. Ваши права",
      cookies: "11. Cookies и аналитика",
      transfers: "12. Международная передача данных",
      futureFeatures: "13. Будущие функции и использование данных",
      changes: "14. Изменения в этой политике",
      contact: "15. Контакты",
    },
    whoWeAre: {
      intro:
        "EquipRegistry — это цифровая платформа регистрации и проверки активов, предназначенная для предотвращения краж, мошенничества, споров о праве собственности и двойного финансирования транспортных средств, оборудования, велосипедов, электровелосипедов, электросамокатов, прицепов, энергетических активов и других зарегистрированных активов.",
      controller: "Оператором персональных данных является:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "Мы собираем персональные данные и данные, связанные с активами, необходимые для предоставления наших услуг.",
      personalTitle: "Персональные данные",
      personalItems: [
        "Полное имя",
        "Адрес электронной почты",
        "Номер телефона, если указан",
        "Адрес, если указан",
        "Данные компании, если применимо",
        "Номер НДС или налоговые данные, если применимо",
      ],
      accountTitle: "Данные учетной записи",
      accountItems: [
        "Данные для входа",
        "Зашифрованный пароль",
        "Данные сессии и аутентификации",
        "Роль пользователя, например частное лицо, МСП, страховая компания, партнер, дилер, прокатная компания, банк или администратор",
      ],
      assetTitle: "Данные об активе и регистрации",
      assetItems: [
        "Серийный номер, VIN, номер рамы, номер батареи, номер паспорта или другие идентификаторы",
        "Марка, модель, категория и характеристики",
        "Данные о собственности и регистрации",
        "Регистрационная ссылка и номер паспорта",
        "Загруженные документы, такие как счета, подтверждение собственности или полицейские отчеты",
        "История регистрации, проверки и верификации",
        "Статусы, такие как Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired или Not Registered",
        "Информация о передаче собственности и актуальности данных, где применимо",
      ],
      technicalTitle: "Технические данные и данные об использовании",
      technicalItems: [
        "IP-адрес",
        "Информация о браузере и устройстве",
        "Посещенные страницы и данные взаимодействия",
        "Аналитические данные с использованием инструментов, уважающих конфиденциальность",
      ],
    },
    howWeUseData: {
      intro: "Мы используем ваши данные для того, чтобы:",
      items: [
        "Создавать и управлять учетными записями пользователей",
        "Регистрировать и проверять активы",
        "Создавать цифровые паспорта активов",
        "Поддерживать предотвращение мошенничества, выявление краж и урегулирование споров",
        "Предоставлять публичные сервисы проверки",
        "Обрабатывать платежи и счета",
        "Отвечать на запросы в поддержку и сервисные сообщения",
        "Обеспечивать передачу собственности, напоминания о валидации и процессы актуализации данных",
        "Соблюдать юридические, налоговые и нормативные обязательства",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry использует многоуровневую модель доступа для баланса между прозрачностью и конфиденциальностью.",
      publicTitle: "Публичные данные",
      publicItems: [
        "Статус актива",
        "Ограниченные идентификационные данные",
        "Номер паспорта или регистрационный номер",
        "Выбранная публичная информация паспорта, необходимая для проверки",
      ],
      privateTitle: "Частные или ограниченные данные",
      privateItems: [
        "Личность владельца",
        "Полные контактные данные",
        "Полные данные об активе",
        "Загруженные документы",
        "Внутренняя история регистрации и валидации",
      ],
      note:
        "Публичный поиск и проверка намеренно ограничены для защиты пользователей, при этом позволяя третьим лицам подтверждать ключевую информацию об активе.",
    },
    legalBasis: {
      intro:
        "Мы обрабатываем персональные данные на одном или нескольких следующих правовых основаниях в соответствии с GDPR:",
      items: [
        "Исполнение договора",
        "Соблюдение юридических обязательств",
        "Законные интересы, включая предотвращение мошенничества, безопасность платформы, верификацию активов и непрерывность бизнеса",
        "Согласие, когда это требуется",
      ],
    },
    sharing: {
      intro: "Мы можем передавать данные:",
      items: [
        "Страховым компаниям",
        "Банкам или финансовым организациям",
        "Лизинговым и прокатным компаниям",
        "Надежным партнерам, участвующим в процессах проверки или регистрации",
        "Поставщикам хостинга, аналитики, платежей, электронной почты, выставления счетов и технических услуг",
        "Правоохранительным органам или государственным органам, если это требуется законом или обосновано",
      ],
      note: "Мы не продаем персональные данные.",
    },
    payments: {
      intro:
        "Платежи могут обрабатываться через сторонних поставщиков платежей, таких как Stripe, или через временные ручные платежные процессы, где это применимо.",
      items: [
        "EquipRegistry не хранит полные данные банковских карт или платежные реквизиты",
        "Платежные провайдеры обрабатывают платежную информацию в рамках собственных требований соответствия",
        "Для клиентов могут формироваться счета",
        "Обработка НДС может быть автоматизирована, где это применимо, включая проверку VAT-номеров для бизнес-клиентов",
      ],
    },
    retention: {
      intro:
        "Мы храним персональные данные только столько, сколько это необходимо для соответствующей цели.",
      items: [
        "Данные учетной записи могут храниться, пока учетная запись активна",
        "Данные регистрации и паспорта могут храниться, пока паспорт существует или остается актуальным для проверки, аудита, предотвращения мошенничества или истории собственности",
        "Налоговые и счетные документы могут храниться в течение установленного законом срока",
        "Данные, связанные с мошенничеством, кражей, спорами или государственными органами, могут храниться дольше, если это оправдано",
      ],
    },
    security: {
      intro:
        "Мы применяем соответствующие технические и организационные меры безопасности, включая:",
      items: [
        "Зашифрованные пароли",
        "Контроль доступа и ролевой доступ",
        "Безопасный хостинг и инфраструктуру",
        "Логирование и мониторинг, где это уместно",
      ],
      note:
        "Ни одна система не является полностью безрисковой, но мы принимаем разумные меры для защиты данных.",
    },
    rights: {
      intro:
        "В зависимости от применимого законодательства вы можете иметь право:",
      items: [
        "Получить доступ к своим персональным данным",
        "Исправить неточные данные",
        "Потребовать удаление",
        "Ограничить обработку",
        "Возразить против обработки",
        "Получить копию своих данных, где это применимо",
      ],
      note:
        "Чтобы воспользоваться своими правами, свяжитесь с нами по адресу info@equipregistry.com.",
    },
    cookies: {
      intro:
        "EquipRegistry может использовать необходимые cookies и ограниченные аналитические технологии.",
      items: [
        "Необходимые cookies для входа и управления сессией",
        "Аналитические инструменты, уважающие конфиденциальность, для понимания использования и производительности платформы",
        "Мы не используем рекламные cookies без необходимого правового основания",
      ],
    },
    transfers: {
      intro:
        "Поскольку EquipRegistry предназначен для международной работы, некоторые данные могут обрабатываться за пределами Европейской экономической зоны через поставщиков услуг, применяющих соответствующие гарантии, где это требуется.",
    },
    futureFeatures: {
      intro:
        "По мере роста платформы EquipRegistry может внедрять такие функции, как:",
      items: [
        "Процессы передачи собственности",
        "Напоминания о продлении верификации и статусы истечения срока",
        "Партнерские панели для страховщиков, банков, дилеров или прокатных компаний",
        "API-доступ для корпоративных пользователей",
        "Проверка паспорта по QR-коду",
        "Оповещения о мошенничестве, sightings и процессы отчетности, связанные с кражами",
      ],
    },
    changes: {
      intro:
        "Мы можем время от времени обновлять эту Политику конфиденциальности. Актуальная версия всегда будет опубликована на этой странице с обновленной датой.",
    },
    contact: {
      intro:
        "По вопросам конфиденциальности или соответствующим запросам, пожалуйста, свяжитесь с нами:",
      emailLabel: "Электронная почта",
      ownerLabel: "Ответственное лицо",
      addressLabel: "Адрес",
      taxLabel: "Налоговый / ID номер",
    },
  },

  zh: {
    ...BASE_EN,
    backToHome: "返回首页",
    title: "隐私政策",
    subtitle:
      "EquipRegistry 如何收集、使用、存储和保护个人数据及与资产相关的数据。",
    lastUpdated: "最后更新：2026年4月",
    sections: {
      whoWeAre: "1. 我们是谁",
      dataWeCollect: "2. 我们收集哪些数据",
      howWeUseData: "3. 我们如何使用您的数据",
      publicPrivate: "4. 公开数据与私人数据",
      legalBasis: "5. 数据处理的法律依据",
      sharing: "6. 数据共享",
      payments: "7. 支付与开票",
      retention: "8. 数据保存期限",
      security: "9. 数据安全",
      rights: "10. 您的权利",
      cookies: "11. Cookies 与分析",
      transfers: "12. 国际数据传输",
      futureFeatures: "13. 未来功能与数据使用",
      changes: "14. 本政策的变更",
      contact: "15. 联系方式",
    },
    whoWeAre: {
      intro:
        "EquipRegistry 是一个数字化资产注册与验证平台，旨在帮助防止车辆、设备、自行车、电动自行车、电动滑板车、拖车、能源资产及其他已注册资产的盗窃、欺诈、所有权纠纷和重复融资。",
      controller: "数据控制者为：",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "我们收集为提供服务所必需的个人数据和与资产相关的数据。",
      personalTitle: "个人数据",
      personalItems: [
        "姓名",
        "电子邮箱地址",
        "电话号码（如提供）",
        "地址（如提供）",
        "公司信息（如适用）",
        "增值税号或税务信息（如适用）",
      ],
      accountTitle: "账户数据",
      accountItems: [
        "登录凭证",
        "加密密码",
        "会话与身份验证数据",
        "用户角色，例如个人用户、中小企业、保险公司、合作伙伴、经销商、租赁公司、银行或管理员",
      ],
      assetTitle: "资产与注册数据",
      assetItems: [
        "序列号、VIN、车架号、电池编号、护照编号或其他识别码",
        "品牌、型号、类别和规格",
        "所有权和注册数据",
        "注册参考号和护照编号",
        "上传的文件，例如发票、所有权证明或警方报告",
        "注册、审核和验证历史",
        "状态数据，例如 Registered & Verified、History Unknown、Stolen / Red Flag、Verification Expired 或 Not Registered",
        "适用时的所有权转移和数据新鲜度信息",
      ],
      technicalTitle: "技术与使用数据",
      technicalItems: [
        "IP 地址",
        "浏览器和设备信息",
        "访问页面和交互数据",
        "通过注重隐私的分析工具获得的分析数据",
      ],
    },
    howWeUseData: {
      intro: "我们使用您的数据用于：",
      items: [
        "创建和管理用户账户",
        "注册和验证资产",
        "生成数字资产护照",
        "支持防欺诈、防盗和争议处理",
        "提供公开验证服务",
        "处理付款和发票",
        "回应支持请求和服务沟通",
        "启用所有权转移、验证提醒和数据更新流程",
        "履行法律、税务和合规义务",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry 采用分层访问模型，以平衡透明度和隐私保护。",
      publicTitle: "公开数据",
      publicItems: [
        "资产状态",
        "有限的识别数据",
        "护照或注册参考号",
        "验证所需的部分公开护照信息",
      ],
      privateTitle: "私人或受限数据",
      privateItems: [
        "所有者身份",
        "完整联系方式",
        "完整资产详情",
        "上传的文件",
        "内部注册与验证历史",
      ],
      note:
        "公开搜索和验证经过有意限制，以在保护用户隐私的同时，让第三方能够核实关键资产信息。",
    },
    legalBasis: {
      intro:
        "根据 GDPR，我们基于以下一种或多种法律依据处理个人数据：",
      items: [
        "履行合同",
        "遵守法律义务",
        "合法利益，包括防欺诈、平台安全、资产验证和业务连续性",
        "在需要时获得的同意",
      ],
    },
    sharing: {
      intro: "我们可能会与以下对象共享数据：",
      items: [
        "保险公司",
        "银行或金融服务提供商",
        "租赁和融资租赁公司",
        "参与验证或注册流程的可信合作伙伴",
        "托管、分析、支付、电子邮件、开票及技术服务提供商",
        "在法律要求或有正当理由时的执法机构或公共机关",
      ],
      note: "我们不会出售个人数据。",
    },
    payments: {
      intro:
        "付款可通过 Stripe 等第三方支付服务提供商处理，或在适用时通过临时手动付款流程处理。",
      items: [
        "EquipRegistry 不存储完整的银行卡或支付详情",
        "支付服务提供商根据其自身合规框架处理支付信息",
        "可以为客户生成发票",
        "在适用情况下，可自动处理增值税，包括对企业客户的 VAT 编号进行验证",
      ],
    },
    retention: {
      intro:
        "我们仅在实现相关目的所必需的期间内保存个人数据。",
      items: [
        "账户数据可在账户保持活跃期间保存",
        "注册和护照数据可在护照存在或仍与验证、审计、防欺诈或所有权历史相关时保存",
        "税务和发票记录可按法律要求的期限保存",
        "与欺诈、盗窃、争议或执法机关有关的记录在有正当理由时可保存更长时间",
      ],
    },
    security: {
      intro:
        "我们采取适当的技术和组织安全措施，包括：",
      items: [
        "加密密码",
        "访问控制和基于角色的访问",
        "安全托管和基础设施",
        "在适当情况下进行日志记录和监控",
      ],
      note:
        "没有任何系统是完全无风险的，但我们会采取合理措施保护数据。",
    },
    rights: {
      intro: "根据适用法律，您可能享有以下权利：",
      items: [
        "访问您的个人数据",
        "更正不准确的数据",
        "请求删除",
        "限制处理",
        "反对处理",
        "在适用时获取您的数据副本",
      ],
      note:
        "如需行使您的权利，请通过 info@equipregistry.com 联系我们。",
    },
    cookies: {
      intro:
        "EquipRegistry 可能会使用必要的 cookies 和有限的分析技术。",
      items: [
        "用于登录和会话管理的必要 cookies",
        "用于了解平台使用情况和性能的隐私友好型分析工具",
        "在没有所需法律依据的情况下，我们不会使用广告 cookies",
      ],
    },
    transfers: {
      intro:
        "由于 EquipRegistry 计划在国际范围内运营，部分数据可能会通过在必要时采取适当保障措施的服务提供商，在欧洲经济区之外进行处理。",
    },
    futureFeatures: {
      intro:
        "随着平台发展，EquipRegistry 可能会引入以下功能：",
      items: [
        "所有权转移流程",
        "验证续期提醒和到期状态",
        "面向保险公司、银行、经销商或租赁公司的合作伙伴仪表板",
        "面向企业用户的 API 访问",
        "基于二维码的护照验证",
        "欺诈警报、sightings 以及与盗窃相关的报告流程",
      ],
    },
    changes: {
      intro:
        "我们可能会不时更新本隐私政策。最新版本将始终发布在本页面，并附上更新日期。",
    },
    contact: {
      intro:
        "如有与隐私相关的问题或请求，请联系我们：",
      emailLabel: "电子邮箱",
      ownerLabel: "负责人",
      addressLabel: "地址",
      taxLabel: "税号 / 身份号码",
    },
  },

  hi: {
    ...BASE_EN,
    backToHome: "होम पर वापस जाएँ",
    title: "गोपनीयता नीति",
    subtitle:
      "EquipRegistry व्यक्तिगत डेटा और एसेट-संबंधित डेटा को कैसे एकत्रित, उपयोग, संग्रहीत और सुरक्षित करता है।",
    lastUpdated: "अंतिम अपडेट: अप्रैल 2026",
    sections: {
      whoWeAre: "1. हम कौन हैं",
      dataWeCollect: "2. हम कौन-सा डेटा एकत्र करते हैं",
      howWeUseData: "3. हम आपके डेटा का उपयोग कैसे करते हैं",
      publicPrivate: "4. सार्वजनिक और निजी डेटा",
      legalBasis: "5. प्रोसेसिंग का कानूनी आधार",
      sharing: "6. डेटा साझा करना",
      payments: "7. भुगतान और इनवॉइसिंग",
      retention: "8. डेटा संरक्षण अवधि",
      security: "9. डेटा सुरक्षा",
      rights: "10. आपके अधिकार",
      cookies: "11. कुकीज़ और एनालिटिक्स",
      transfers: "12. अंतरराष्ट्रीय डेटा ट्रांसफर",
      futureFeatures: "13. भविष्य की सुविधाएँ और डेटा उपयोग",
      changes: "14. इस नीति में परिवर्तन",
      contact: "15. संपर्क",
    },
    whoWeAre: {
      intro:
        "EquipRegistry एक डिजिटल एसेट रजिस्ट्रेशन और वेरिफिकेशन प्लेटफ़ॉर्म है, जिसे वाहनों, उपकरणों, साइकिलों, ई-बाइकों, इलेक्ट्रिक स्कूटरों, ट्रेलरों, ऊर्जा एसेट्स और अन्य पंजीकृत एसेट्स की चोरी, धोखाधड़ी, स्वामित्व विवाद और डबल फाइनेंसिंग को रोकने में मदद के लिए बनाया गया है।",
      controller: "डेटा नियंत्रक है:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "हम अपनी सेवाएँ प्रदान करने के लिए आवश्यक व्यक्तिगत डेटा और एसेट-संबंधित डेटा एकत्र करते हैं।",
      personalTitle: "व्यक्तिगत डेटा",
      personalItems: [
        "पूरा नाम",
        "ईमेल पता",
        "फ़ोन नंबर, यदि प्रदान किया गया हो",
        "पता, यदि प्रदान किया गया हो",
        "कंपनी विवरण, यदि लागू हो",
        "VAT नंबर या टैक्स विवरण, यदि लागू हो",
      ],
      accountTitle: "अकाउंट डेटा",
      accountItems: [
        "लॉगिन क्रेडेंशियल्स",
        "एन्क्रिप्टेड पासवर्ड",
        "सेशन और ऑथेंटिकेशन डेटा",
        "उपयोगकर्ता भूमिका जैसे निजी उपयोगकर्ता, SME, बीमाकर्ता, पार्टनर, डीलर, रेंटल कंपनी, बैंक या एडमिन",
      ],
      assetTitle: "एसेट और रजिस्ट्रेशन डेटा",
      assetItems: [
        "सीरियल नंबर, VIN, फ्रेम नंबर, बैटरी नंबर, पासपोर्ट नंबर या अन्य पहचानकर्ता",
        "ब्रांड, मॉडल, श्रेणी और विनिर्देश",
        "स्वामित्व और रजिस्ट्रेशन डेटा",
        "रजिस्ट्रेशन रेफरेंस और पासपोर्ट नंबर",
        "अपलोड किए गए दस्तावेज़ जैसे इनवॉइस, स्वामित्व प्रमाण या पुलिस रिपोर्ट",
        "रजिस्ट्रेशन, समीक्षा और वेरिफिकेशन इतिहास",
        "स्थिति डेटा जैसे Registered & Verified, History Unknown, Stolen / Red Flag, Verification Expired या Not Registered",
        "जहाँ लागू हो, स्वामित्व हस्तांतरण और डेटा ताजगी से संबंधित जानकारी",
      ],
      technicalTitle: "तकनीकी और उपयोग डेटा",
      technicalItems: [
        "IP पता",
        "ब्राउज़र और डिवाइस की जानकारी",
        "देखे गए पेज और इंटरैक्शन डेटा",
        "गोपनीयता-अनुकूल एनालिटिक्स टूल्स के माध्यम से प्राप्त विश्लेषणात्मक डेटा",
      ],
    },
    howWeUseData: {
      intro: "हम आपके डेटा का उपयोग इन उद्देश्यों के लिए करते हैं:",
      items: [
        "उपयोगकर्ता खाते बनाना और प्रबंधित करना",
        "एसेट्स को रजिस्टर और वेरिफाई करना",
        "डिजिटल एसेट पासपोर्ट बनाना",
        "धोखाधड़ी रोकथाम, चोरी की पहचान और विवाद समाधान में सहायता करना",
        "सार्वजनिक वेरिफिकेशन सेवाएँ प्रदान करना",
        "भुगतान और इनवॉइस प्रोसेस करना",
        "सपोर्ट अनुरोधों और सेवा संचार का जवाब देना",
        "स्वामित्व हस्तांतरण, वेलिडेशन रिमाइंडर और डेटा अपडेट वर्कफ़्लो सक्षम करना",
        "कानूनी, कर और अनुपालन दायित्वों को पूरा करना",
      ],
    },
    publicPrivate: {
      intro:
        "EquipRegistry पारदर्शिता और गोपनीयता के बीच संतुलन बनाने के लिए एक लेयर्ड एक्सेस मॉडल का उपयोग करता है।",
      publicTitle: "सार्वजनिक डेटा",
      publicItems: [
        "एसेट की स्थिति",
        "सीमित पहचान संबंधी डेटा",
        "पासपोर्ट या रजिस्ट्री संदर्भ संख्या",
        "वेरिफिकेशन के लिए आवश्यक चुनी हुई सार्वजनिक पासपोर्ट जानकारी",
      ],
      privateTitle: "निजी या प्रतिबंधित डेटा",
      privateItems: [
        "मालिक की पहचान",
        "पूर्ण संपर्क विवरण",
        "एसेट का पूरा विवरण",
        "अपलोड किए गए दस्तावेज़",
        "आंतरिक रजिस्ट्रेशन और वेलिडेशन इतिहास",
      ],
      note:
        "सार्वजनिक खोज और वेरिफिकेशन जानबूझकर सीमित रखे गए हैं ताकि उपयोगकर्ताओं की सुरक्षा हो सके और फिर भी तीसरे पक्ष मुख्य एसेट जानकारी की पुष्टि कर सकें।",
    },
    legalBasis: {
      intro:
        "GDPR के तहत हम निम्नलिखित में से एक या अधिक कानूनी आधारों पर व्यक्तिगत डेटा प्रोसेस करते हैं:",
      items: [
        "कॉन्ट्रैक्ट का निष्पादन",
        "कानूनी दायित्वों का पालन",
        "वैध हित, जिनमें धोखाधड़ी रोकथाम, प्लेटफ़ॉर्म सुरक्षा, एसेट वेरिफिकेशन और व्यवसाय निरंतरता शामिल हैं",
        "जहाँ आवश्यक हो, सहमति",
      ],
    },
    sharing: {
      intro: "हम डेटा निम्न पक्षों के साथ साझा कर सकते हैं:",
      items: [
        "बीमा कंपनियाँ",
        "बैंक या वित्त प्रदाता",
        "रेंटल और लीज़िंग कंपनियाँ",
        "वेरिफिकेशन या रजिस्ट्रेशन वर्कफ़्लो में शामिल विश्वसनीय पार्टनर्स",
        "होस्टिंग, एनालिटिक्स, भुगतान, ईमेल, इनवॉइसिंग और तकनीकी सेवा प्रदाता",
        "कानूनी रूप से आवश्यक या उचित होने पर कानून प्रवर्तन या सार्वजनिक प्राधिकरण",
      ],
      note: "हम व्यक्तिगत डेटा नहीं बेचते।",
    },
    payments: {
      intro:
        "भुगतान Stripe जैसे तृतीय-पक्ष भुगतान प्रदाताओं या जहाँ लागू हो वहाँ अस्थायी मैनुअल भुगतान प्रक्रियाओं के माध्यम से किए जा सकते हैं।",
      items: [
        "EquipRegistry पूर्ण कार्ड या भुगतान विवरण संग्रहीत नहीं करता",
        "भुगतान प्रदाता अपने स्वयं के अनुपालन ढाँचों के तहत भुगतान जानकारी प्रोसेस करते हैं",
        "ग्राहकों के लिए इनवॉइस बनाए जा सकते हैं",
        "जहाँ लागू हो, VAT हैंडलिंग को स्वचालित किया जा सकता है, जिसमें व्यावसायिक ग्राहकों के लिए VAT नंबर सत्यापन शामिल है",
      ],
    },
    retention: {
      intro:
        "हम व्यक्तिगत डेटा केवल उतनी अवधि तक रखते हैं जितनी संबंधित उद्देश्य के लिए आवश्यक हो।",
      items: [
        "अकाउंट डेटा तब तक रखा जा सकता है जब तक अकाउंट सक्रिय रहता है",
        "रजिस्ट्रेशन और पासपोर्ट डेटा तब तक रखा जा सकता है जब तक पासपोर्ट मौजूद है या वेरिफिकेशन, ऑडिट, धोखाधड़ी रोकथाम या स्वामित्व इतिहास के लिए प्रासंगिक है",
        "कर और इनवॉइस रिकॉर्ड कानूनी रूप से आवश्यक अवधि तक रखे जा सकते हैं",
        "धोखाधड़ी, चोरी, विवाद या अधिकारियों से संबंधित रिकॉर्ड उचित होने पर अधिक समय तक रखे जा सकते हैं",
      ],
    },
    security: {
      intro:
        "हम उपयुक्त तकनीकी और संगठनात्मक सुरक्षा उपाय लागू करते हैं, जिनमें शामिल हैं:",
      items: [
        "एन्क्रिप्टेड पासवर्ड",
        "एक्सेस कंट्रोल और रोल-आधारित एक्सेस",
        "सुरक्षित होस्टिंग और इन्फ्रास्ट्रक्चर",
        "जहाँ उचित हो, लॉगिंग और मॉनिटरिंग",
      ],
      note:
        "कोई भी सिस्टम पूरी तरह जोखिम-मुक्त नहीं होता, लेकिन हम डेटा की सुरक्षा के लिए उचित उपाय अपनाते हैं।",
    },
    rights: {
      intro:
        "लागू कानून के अनुसार, आपको निम्न अधिकार प्राप्त हो सकते हैं:",
      items: [
        "अपने व्यक्तिगत डेटा तक पहुँच",
        "गलत डेटा को सही कराना",
        "डेटा हटाने का अनुरोध",
        "प्रोसेसिंग को सीमित करना",
        "प्रोसेसिंग का विरोध करना",
        "जहाँ लागू हो, अपने डेटा की प्रति प्राप्त करना",
      ],
      note:
        "अपने अधिकारों का उपयोग करने के लिए हमसे info@equipregistry.com पर संपर्क करें।",
    },
    cookies: {
      intro:
        "EquipRegistry आवश्यक कुकीज़ और सीमित एनालिटिक्स तकनीकों का उपयोग कर सकता है।",
      items: [
        "लॉगिन और सेशन प्रबंधन के लिए आवश्यक कुकीज़",
        "प्लेटफ़ॉर्म के उपयोग और प्रदर्शन को समझने के लिए गोपनीयता-अनुकूल एनालिटिक्स टूल्स",
        "हम आवश्यक कानूनी आधार के बिना विज्ञापन कुकीज़ का उपयोग नहीं करते",
      ],
    },
    transfers: {
      intro:
        "क्योंकि EquipRegistry का उद्देश्य अंतरराष्ट्रीय स्तर पर संचालन करना है, कुछ डेटा यूरोपीय आर्थिक क्षेत्र के बाहर उन सेवा प्रदाताओं के माध्यम से प्रोसेस किया जा सकता है जो आवश्यक होने पर उपयुक्त सुरक्षा उपाय लागू करते हैं।",
    },
    futureFeatures: {
      intro:
        "जैसे-जैसे प्लेटफ़ॉर्म बढ़ेगा, EquipRegistry निम्न सुविधाएँ जोड़ सकता है:",
      items: [
        "स्वामित्व हस्तांतरण वर्कफ़्लो",
        "वेरिफिकेशन नवीनीकरण रिमाइंडर और समाप्ति स्थिति",
        "बीमाकर्ताओं, बैंकों, डीलरों या रेंटल कंपनियों के लिए पार्टनर डैशबोर्ड",
        "एंटरप्राइज़ उपयोगकर्ताओं के लिए API एक्सेस",
        "QR-आधारित पासपोर्ट वेरिफिकेशन",
        "धोखाधड़ी अलर्ट, sightings और चोरी-संबंधित रिपोर्टिंग फ्लो",
      ],
    },
    changes: {
      intro:
        "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। नवीनतम संस्करण हमेशा इस पेज पर अद्यतन तिथि के साथ प्रकाशित किया जाएगा।",
    },
    contact: {
      intro:
        "गोपनीयता से संबंधित प्रश्नों या अनुरोधों के लिए कृपया हमसे संपर्क करें:",
      emailLabel: "ईमेल",
      ownerLabel: "जिम्मेदार व्यक्ति",
      addressLabel: "पता",
      taxLabel: "टैक्स / ID नंबर",
    },
  },

  ar: {
    ...BASE_EN,
    backToHome: "العودة إلى الصفحة الرئيسية",
    title: "سياسة الخصوصية",
    subtitle:
      "كيف تقوم EquipRegistry بجمع البيانات الشخصية وبيانات الأصول واستخدامها وتخزينها وحمايتها.",
    lastUpdated: "آخر تحديث: أبريل 2026",
    sections: {
      whoWeAre: "1. من نحن",
      dataWeCollect: "2. ما البيانات التي نجمعها",
      howWeUseData: "3. كيف نستخدم بياناتك",
      publicPrivate: "4. البيانات العامة والخاصة",
      legalBasis: "5. الأساس القانوني للمعالجة",
      sharing: "6. مشاركة البيانات",
      payments: "7. المدفوعات والفوترة",
      retention: "8. الاحتفاظ بالبيانات",
      security: "9. أمن البيانات",
      rights: "10. حقوقك",
      cookies: "11. ملفات تعريف الارتباط والتحليلات",
      transfers: "12. نقل البيانات الدولي",
      futureFeatures: "13. الميزات المستقبلية واستخدام البيانات",
      changes: "14. التغييرات على هذه السياسة",
      contact: "15. الاتصال",
    },
    whoWeAre: {
      intro:
        "EquipRegistry هي منصة رقمية لتسجيل الأصول والتحقق منها، صُممت للمساعدة في منع السرقة والاحتيال والنزاعات على الملكية والتمويل المزدوج للمركبات والمعدات والدراجات والدراجات الكهربائية والسكوترات الكهربائية والمقطورات وأصول الطاقة وغيرها من الأصول المسجلة.",
      controller: "المتحكم في البيانات هو:",
    },
    dataWeCollect: {
      ...BASE_EN.dataWeCollect,
      intro:
        "نقوم بجمع البيانات الشخصية والبيانات المتعلقة بالأصول اللازمة لتقديم خدماتنا.",
      personalTitle: "البيانات الشخصية",
      personalItems: [
        "الاسم الكامل",
        "عنوان البريد الإلكتروني",
        "رقم الهاتف، إذا تم تقديمه",
        "العنوان، إذا تم تقديمه",
        "بيانات الشركة، إذا كانت تنطبق",
        "رقم ضريبة القيمة المضافة أو البيانات الضريبية، إذا كانت تنطبق",
      ],
      accountTitle: "بيانات الحساب",
      accountItems: [
        "بيانات تسجيل الدخول",
        "كلمة مرور مشفرة",
        "بيانات الجلسة والمصادقة",
        "دور المستخدم مثل مستخدم خاص أو شركة صغيرة أو متوسطة أو شركة تأمين أو شريك أو تاجر أو شركة تأجير أو بنك أو مسؤول",
      ],
      assetTitle: "بيانات الأصل والتسجيل",
      assetItems: [
        "الرقم التسلسلي أو VIN أو رقم الهيكل أو رقم البطارية أو رقم الجواز أو غيرها من المعرفات",
        "العلامة التجارية والطراز والفئة والمواصفات",
        "بيانات الملكية والتسجيل",
        "مرجع التسجيل ورقم الجواز",
        "المستندات المرفوعة مثل الفواتير أو إثبات الملكية أو تقارير الشرطة",
        "سجل التسجيل والمراجعة والتحقق",
        "بيانات الحالة مثل Registered & Verified أو History Unknown أو Stolen / Red Flag أو Verification Expired أو Not Registered",
        "معلومات نقل الملكية وتحديث البيانات عند الاقتضاء",
      ],
      technicalTitle: "البيانات التقنية وبيانات الاستخدام",
      technicalItems: [
        "عنوان IP",
        "معلومات المتصفح والجهاز",
        "الصفحات التي تمت زيارتها وبيانات التفاعل",
        "بيانات التحليلات من خلال أدوات تراعي الخصوصية",
      ],
    },
    howWeUseData: {
      intro: "نستخدم بياناتك من أجل:",
      items: [
        "إنشاء حسابات المستخدمين وإدارتها",
        "تسجيل الأصول والتحقق منها",
        "إصدار جوازات رقمية للأصول",
        "دعم منع الاحتيال وكشف السرقة ومعالجة النزاعات",
        "تقديم خدمات التحقق العامة",
        "معالجة المدفوعات والفواتير",
        "الرد على طلبات الدعم والاتصالات المتعلقة بالخدمة",
        "تمكين نقل الملكية وتذكيرات التحقق وتحديثات البيانات",
        "الوفاء بالالتزامات القانونية والضريبية والتنظيمية",
      ],
    },
    publicPrivate: {
      intro:
        "تستخدم EquipRegistry نموذج وصول متعدد الطبقات لتحقيق التوازن بين الشفافية والخصوصية.",
      publicTitle: "البيانات العامة",
      publicItems: [
        "حالة الأصل",
        "بيانات تعريف محدودة",
        "رقم مرجع الجواز أو السجل",
        "معلومات عامة مختارة من الجواز مطلوبة للتحقق",
      ],
      privateTitle: "البيانات الخاصة أو المقيدة",
      privateItems: [
        "هوية المالك",
        "بيانات الاتصال الكاملة",
        "تفاصيل الأصل الكاملة",
        "المستندات المرفوعة",
        "سجل التسجيل والتحقق الداخلي",
      ],
      note:
        "تم تقييد البحث والتحقق العامين بشكل مقصود لحماية المستخدمين مع السماح للأطراف الثالثة بالتحقق من المعلومات الأساسية عن الأصل.",
    },
    legalBasis: {
      intro:
        "نقوم بمعالجة البيانات الشخصية استنادًا إلى واحد أو أكثر من الأسس القانونية التالية بموجب اللائحة العامة لحماية البيانات GDPR:",
      items: [
        "تنفيذ عقد",
        "الامتثال للالتزامات القانونية",
        "المصالح المشروعة، بما في ذلك منع الاحتيال وأمن المنصة والتحقق من الأصول واستمرارية الأعمال",
        "الموافقة، عند الحاجة",
      ],
    },
    sharing: {
      intro: "قد نشارك البيانات مع:",
      items: [
        "شركات التأمين",
        "البنوك أو مزودي التمويل",
        "شركات التأجير أو التأجير التمويلي",
        "الشركاء الموثوقين المشاركين في سير عمل التحقق أو التسجيل",
        "مزودي خدمات الاستضافة والتحليلات والدفع والبريد الإلكتروني والفوترة والخدمات التقنية",
        "جهات إنفاذ القانون أو السلطات العامة عندما يكون ذلك مطلوبًا قانونًا أو مبررًا",
      ],
      note: "نحن لا نبيع البيانات الشخصية.",
    },
    payments: {
      intro:
        "قد تتم معالجة المدفوعات عبر مزودي خدمات دفع من جهات خارجية مثل Stripe أو عبر تدفقات دفع يدوية مؤقتة حيثما ينطبق ذلك.",
      items: [
        "لا تقوم EquipRegistry بتخزين بيانات البطاقات أو بيانات الدفع الكاملة",
        "يعالج مزودو الدفع معلومات الدفع وفقًا لأطر الامتثال الخاصة بهم",
        "قد يتم إنشاء فواتير للعملاء",
        "قد تتم أتمتة معالجة ضريبة القيمة المضافة عند الاقتضاء، بما في ذلك التحقق من أرقام ضريبة القيمة المضافة للعملاء التجاريين",
      ],
    },
    retention: {
      intro:
        "نحتفظ بالبيانات الشخصية فقط طالما كان ذلك ضروريًا للغرض ذي الصلة.",
      items: [
        "قد يتم الاحتفاظ ببيانات الحساب طالما ظل الحساب نشطًا",
        "قد يتم الاحتفاظ ببيانات التسجيل والجواز طالما أن الجواز موجود أو لا يزال ذا صلة لأغراض التحقق أو التدقيق أو منع الاحتيال أو سجل الملكية",
        "قد يتم الاحتفاظ بالسجلات الضريبية وسجلات الفواتير للفترة المطلوبة قانونًا",
        "قد يتم الاحتفاظ بالسجلات المتعلقة بالاحتيال أو السرقة أو النزاعات أو السلطات لفترة أطول عندما يكون ذلك مبررًا",
      ],
    },
    security: {
      intro:
        "نطبق تدابير أمنية تقنية وتنظيمية مناسبة، بما في ذلك:",
      items: [
        "كلمات مرور مشفرة",
        "التحكم في الوصول والوصول القائم على الأدوار",
        "استضافة وبنية تحتية آمنة",
        "التسجيل والمراقبة عند الاقتضاء",
      ],
      note:
        "لا يوجد نظام خالٍ تمامًا من المخاطر، لكننا نتخذ تدابير معقولة لحماية البيانات.",
    },
    rights: {
      intro:
        "اعتمادًا على القانون المعمول به، قد يكون لك الحق في:",
      items: [
        "الوصول إلى بياناتك الشخصية",
        "تصحيح البيانات غير الدقيقة",
        "طلب الحذف",
        "تقييد المعالجة",
        "الاعتراض على المعالجة",
        "الحصول على نسخة من بياناتك عند الاقتضاء",
      ],
      note:
        "لممارسة حقوقك، يرجى التواصل معنا عبر info@equipregistry.com.",
    },
    cookies: {
      intro:
        "قد تستخدم EquipRegistry ملفات تعريف الارتباط الأساسية وتقنيات تحليل محدودة.",
      items: [
        "ملفات تعريف الارتباط الأساسية لتسجيل الدخول وإدارة الجلسة",
        "أدوات تحليل تراعي الخصوصية لفهم استخدام المنصة وأدائها",
        "لا نستخدم ملفات تعريف ارتباط إعلانية دون الأساس القانوني المطلوب",
      ],
    },
    transfers: {
      intro:
        "نظرًا لأن EquipRegistry مخصصة للعمل دوليًا، فقد تتم معالجة بعض البيانات خارج المنطقة الاقتصادية الأوروبية من خلال مزودي خدمات يطبقون الضمانات المناسبة عند الاقتضاء.",
    },
    futureFeatures: {
      intro:
        "مع نمو المنصة، قد تقدم EquipRegistry ميزات مثل:",
      items: [
        "سير عمل نقل الملكية",
        "تذكيرات تجديد التحقق وحالات انتهاء الصلاحية",
        "لوحات تحكم للشركاء لشركات التأمين أو البنوك أو التجار أو شركات التأجير",
        "وصول API للمستخدمين من الشركات",
        "التحقق من الجواز عبر رمز QR",
        "تنبيهات الاحتيال و sightings ومسارات الإبلاغ المتعلقة بالسرقة",
      ],
    },
    changes: {
      intro:
        "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. وسيتم دائمًا نشر أحدث نسخة على هذه الصفحة مع التاريخ المحدّث.",
    },
    contact: {
      intro:
        "لأي أسئلة أو طلبات تتعلق بالخصوصية، يرجى التواصل معنا:",
      emailLabel: "البريد الإلكتروني",
      ownerLabel: "الشخص المسؤول",
      addressLabel: "العنوان",
      taxLabel: "الرقم الضريبي / رقم الهوية",
    },
  },

  pl: BASE_EN,
  sv: BASE_EN,
  da: BASE_EN,
  no: BASE_EN,
};

export function getPrivacyText(lang: Lang): PrivacyText {
  return PRIVACY_TEXT[lang] ?? PRIVACY_TEXT.en;
}
