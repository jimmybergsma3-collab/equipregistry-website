import type { Lang } from "./config";

import { repairMojibakeDeep } from "./repair-mojibake";

type Dictionary = {
  nav: {
    howItWorks: string;
    login: string;
    dashboard: string;
    logout: string;
    menu: string;
  };
  menu: {
    home: string;
    verifyAsset: string;
    registerAsset: string;
    pricing: string;
    reportSighting: string;
    partners: string;
    contact: string;
  };
  common: {
    goToHomepageSearch: string;
    publicVerification: string;
    whySightingsMatter: string;
    contactEquipRegistry: string;
    print: string;
    downloadPdf: string;
  };
  pages: {
  verify: {
    title: string;
    subtitle: string;
    introTitle: string;
    introText: string;
  };
  register: {
    title: string;
    subtitle: string;
    vehicleTitle: string;
    vehicleText: string;
    equipmentTitle: string;
    equipmentText: string;
    trailerTitle: string;
    trailerText: string;
  };
  reportSighting: {
    title: string;
    subtitle: string;
    introTitle: string;
    introText: string;
  };
  partners: {
    title: string;
    subtitle: string;
    insurersTitle: string;
    insurersText: string;
    rentalTitle: string;
    rentalText: string;
    financeTitle: string;
    financeText: string;
    financeRiskTitle: string;
    financeRiskText: string;
    financeVerificationTitle: string;
    financeVerificationText: string;
    financeTrustTitle: string;
    financeTrustText: string;
    terminalsTitle: string;
    terminalsText: string;
    rentalVisibilityTitle: string;
    rentalVisibilityText: string;
    rentalPreventionTitle: string;
    rentalPreventionText: string;
    rentalOriginTitle: string;
    rentalOriginText: string;
    terminalsEntryTitle: string;
    terminalsEntryText: string;
    terminalsCustomsTitle: string;
    terminalsCustomsText: string;
    ctaText: string;
  };
  contact: {
    title: string;
    subtitle: string;
    generalTitle: string;
    generalText: string;
    businessTitle: string;
    businessText: string;
    supportTitle: string;
    supportText: string;
    emailLabel: string;
    formTitle: string;
    formIntro: string;
    typeLabel: string;
    typeGeneral: string;
    typeBusiness: string;
    typeSupport: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successMessage: string;
    errorMessage: string;
  };
  disclaimer: {
    title: string;
    intro: string;
    liability: string;
    data: string;
    future: string;
    contact: string;
  };
  dashboard: {
    registrations: {
      eyebrow: string;
      title: string;
      newRegistration: string;
    };
  };
};
  hero: {
    title: string;
    subtitle: string;
    placeholder: string;
    search: string;
    demoSerials: string;
    loggedInMessage: string;
    goToDashboard: string;
    supportedAssetsTitle: string;
    supportedAssetsItems: [string, string, string];
  };
  result: {
    whyThisMatters: string;
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
    step4Title: string;
    step4Text: string;
  };
  trust: {
    title: string;
    subtitle: string;
    card1Title: string;
    card1Text: string;
    card2Title: string;
    card2Text: string;
    card3Title: string;
    card3Text: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    disclaimer: string;
  };
  statuses: {
    registeredVerified: {
      label: string;
      message: string;
      why: string;
      metadataStatus: string;
      metadataPassport: string;
      metadataValidation: string;
      actionViewPassport: string;
    };
    historyUnknown: {
      label: string;
      message: string;
      why: string;
      metadataStatus: string;
      metadataRisk: string;
      actionViewPassport: string;
      actionRequestVerification: string;
      actionRegisterDocuments: string;
    };
    stolen: {
      label: string;
      message: string;
      warning: string;
      why: string;
      metadataStatus: string;
      metadataRisk: string;
      metadataReportedBy: string;
      metadataJurisdiction: string;
      metadataReportDate: string;
      actionReportSighting: string;
      actionContactAuthorities: string;
      actionVerifyCaseId: string;
    };
    notRegistered: {
      label: string;
      message: string;
      why: string;
      actionRegister: string;
    };
    metadataValues: {
      active: string;
      full: string;
      lastValidation2025: string;
      limitedPassport: string;
      medium: string;
      blacklisted: string;
      high: string;
      insurancePartner: string;
      euCrossBorderAlert: string;
      reportDate: string;
    };
  };
  dashboard: {
  requestStatuses: {
    draft: string;
    incomplete: string;
    submitted: string;
    underReview: string;
    moreInfoRequired: string;
    approved: string;
    rejected: string;
    passportIssued: string;
    unknown: string;
  };
  registrationDetail: {
      backToAdminRegistrations: string;
      backToRegistrations: string;
      adminPaymentConfirmationTitle: string;
      adminPaymentConfirmationDescription: string;
      reviewWorkflowTitle: string;
      reviewWorkflowDescription: string;
      detailsTitle: string;
      dynamicFieldsTitle: string;
      noAdditionalData: string;
      paymentCompleted: string;
      paymentPending: string;
      labels: {
        passportNumber: string;
        applicantType: string;
        assetName: string;
        category: string;
        subcategory: string;
        brand: string;
        model: string;
        serialNumber: string;
        owner: string;
        ownerEmail: string;
        created: string;
        updated: string;
        payment: string;
        completenessScore: string;
        solarPanelSerialNumbers: string;
        batterySerialNumbers: string;
        bikeBatterySerialNumbers: string;
        capacity: string;
        powerRating: string;
        batchLotNumber: string;
        installationLocation: string;
        hoursOfOperation: string;
        deviceId: string;
        certification: string;
        ownerOrganisation: string;
      };
    };
  };
};

const en: Dictionary = {
  nav: {
    howItWorks: "How it works",
    login: "Login",
    dashboard: "Dashboard",
    logout: "Logout",
    menu: "Menu",
  },
  menu: {
    home: "Home",
    verifyAsset: "Verify Asset",
    registerAsset: "Register Asset",
    pricing: "Pricing",
    reportSighting: "Report Sighting",
    partners: "For Insurers / Partners",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Go to homepage search",
    publicVerification: "Public verification",
    whySightingsMatter: "Why sightings matter",
    contactEquipRegistry: "Contact EquipRegistry",
    print: "Print",
    downloadPdf: "Download PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Registration requests",
    newRegistration: "New registration",
  },
},
    verify: {
      title: "Verify Asset",
      subtitle:
        "Search a serial number and check whether the equipment is registered, verified, flagged, or unknown.",
      introTitle: "Public verification",
      introText:
        "This page will become the dedicated public verification route. For now, your live search experience remains on the homepage.",
    },
    register: {
      title: "Register Asset",
      subtitle:
        "Start the registration flow for equipment, vehicles, or trailers and prepare the asset for a digital registry passport.",
      vehicleTitle: "Vehicle",
      vehicleText:
        "Cars, trucks, vans, campers and other road assets with a VIN or serial reference.",
      equipmentTitle: "Equipment",
      equipmentText:
        "Construction, agricultural, industrial and rental equipment with a machine serial number.",
      trailerTitle: "Trailer",
      trailerText:
        "Trailers and towed assets that require identity, provenance and trust visibility.",
    },
    reportSighting: {
      title: "Report Sighting",
      subtitle:
        "Report a sighting of flagged or stolen equipment and help improve cross-border visibility.",
      introTitle: "Why sightings matter",
      introText:
        "Public sighting reports can help insurers, authorities and legitimate owners act faster when equipment is flagged, stolen or under investigation.",
    },
    partners: {
      title: "For Insurers, Lenders and Asset Operators",
      subtitle:
        "EquipRegistry is a neutral trust layer for institutions that need a current, verifiable view of ownership, legal origin, theft risk and registry status across borders.",
      insurersTitle: "Insurers",
      insurersText:
        "Reduce claims uncertainty before underwriting, renewal or recovery. EquipRegistry helps insurers verify ownership signals, legal origin, theft and red-flag status, and the current registry record tied to a VIN, serial number or registry ID.",
      rentalTitle: "Rental companies",
      rentalText:
        "Protect fleet assets before handover, return, resale or export. EquipRegistry helps rental operators verify asset identity, detect theft and fraud signals, and maintain a stronger operational record across countries and depots.",
      financeTitle: "Banks & financial institutions",
      financeText:
        "Reduce lending exposure on movable assets. EquipRegistry helps lenders and lessors check whether an asset is already registered, financed, flagged or inconsistent before approval, refinancing or resale.",
      financeRiskTitle: "Collateral risk visibility",
      financeRiskText:
        "Movable assets can be pledged, resold or transferred across jurisdictions before hidden conflicts are discovered. A shared registry layer helps surface double financing, identity conflicts and red flags earlier.",
      financeVerificationTitle: "Verification before financing",
      financeVerificationText:
        "Check ownership signals, legal origin, registry passport status and theft alerts before approving a lease, loan or refinance.",
      financeTrustTitle: "Cross-border asset certainty",
      financeTrustText:
        "Support safer multi-country financing, repossession and remarketing workflows with a clearer operational record of the asset.",
      terminalsTitle: "Ports & logistics terminals",
      terminalsText:
        "Strengthen entry, exit and inspection controls for vehicles, equipment and other movable assets. EquipRegistry helps terminals detect stolen, flagged or mismatched assets before onward movement.",
      rentalVisibilityTitle: "Fleet identity control",
      rentalVisibilityText:
        "Maintain a current view of asset identity, registry status and verification history across depots, countries and partner networks.",
      rentalPreventionTitle: "Fraud and theft reduction",
      rentalPreventionText:
        "Flag suspicious assets sooner and reduce exposure to stolen equipment, swapped identities, duplicate registrations and unauthorized resale.",
      rentalOriginTitle: "Proof of origin for remarketing",
      rentalOriginText:
        "Strengthen resale, insurance and cross-border transfer decisions with clearer ownership verification and proof-of-origin records.",
      terminalsEntryTitle: "Entry and exit verification",
      terminalsEntryText:
        "Add a registry-based check before assets enter or leave controlled zones, yards or cross-dock operations.",
      terminalsCustomsTitle: "Customs and inspections",
      terminalsCustomsText:
        "Give inspection teams stronger asset identification, registry passport context and red-flag visibility during customs and compliance workflows.",
      ctaText:
        "EquipRegistry supports insurers, lenders, rental operators and logistics partners that need a neutral operational record for ownership verification, proof of origin, fraud reduction and cross-border trust.",
    },
    contact: {
  title: "Contact",
  subtitle:
    "Get in touch regarding partnerships, insurance use cases, pilot discussions or strategic collaboration.",
  generalTitle: "General inquiries",
  generalText:
    "For general questions about EquipRegistry, the platform, public verification or how the registry works.",
  businessTitle: "Business & partnerships",
  businessText:
    "For insurers, rental companies, banks, terminals and organisations interested in collaboration, pilot projects or integration.",
  supportTitle: "Support",
  supportText:
    "For help related to registrations, registry passports, submitted data or platform-related questions.",
  emailLabel: "Email",
  formTitle: "Contact form",
  formIntro:
    "Choose the right contact type so your message goes directly to the correct EquipRegistry inbox.",
  typeLabel: "Contact type",
  typeGeneral: "General inquiry",
  typeBusiness: "Business / Partnerships",
  typeSupport: "Support",
  namePlaceholder: "Your name",
  emailPlaceholder: "Your email",
  subjectPlaceholder: "Subject",
  messagePlaceholder: "Your message",
  sendButton: "Send message",
  sendingButton: "Sending...",
successMessage: "Your message has been sent successfully.",
errorMessage: "Something went wrong while sending your message.",
},
    disclaimer: {
      title: "Disclaimer",
      intro:
        "EquipRegistry provides a digital registry infrastructure for vehicles, equipment, trailers and other eligible assets.",
      liability:
        "EquipRegistry does not guarantee the accuracy, completeness or legal validity of submitted, displayed or imported data. Use of the platform is at your own risk.",
      data:
        "Data may be provided by users, partners, insurers, authorities, financial institutions and future integrated systems.",
      future:
        "Future integrations may include insurers, law enforcement, cross-border workflows, ownership transfer flows, payment systems and validation layers.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verify origin, status and risk of vehicles and equipment worldwide",
    subtitle:
      "Use VINs, serial numbers and registry IDs to verify origin, current status and risk signals before purchase, financing, insurance, rental or transfer.",
    placeholder: "Enter VIN, serial number or registry ID",
    search: "Verify asset",
    demoSerials: "Demo serials:",
    loggedInMessage:
      "Youâ€™re logged in. You can use search normally and still access private passports.",
    goToDashboard: "Go to dashboard",
    supportedAssetsTitle: "Asset classes covered by EquipRegistry",
    supportedAssetsItems: [
      "Road vehicles, trailers and fleet assets",
      "Construction, industrial, agricultural and energy equipment",
      "Bicycles, e-bikes and other light mobility assets",
    ],
  },
  result: {
    whyThisMatters: "Why this matters",
  },
  howItWorks: {
    title: "How EquipRegistry Works",
    step1Title: "1. Search",
    step1Text:
      "Check a VIN, serial number or registry ID before purchase, financing, insurance, rental or shipment.",
    step2Title: "2. Assess",
    step2Text:
      "Review current registry status, ownership signals, proof-of-origin records and theft or red-flag alerts where available.",
    step3Title: "3. Register",
    step3Text:
      "Create a stronger asset record with supporting documents, ownership evidence and a registry passport workflow.",
    step4Title: "4. Use operationally",
    step4Text:
      "Use the registry passport as an operational record for underwriting, lending, rental control, resale, recovery and cross-border compliance.",
  },
  trust: {
    title: "Built for Operational Trust at Global Scale",
    subtitle:
      "EquipRegistry provides a neutral registry layer for buyers, insurers, rental operators, lenders and cross-border teams that need a current, verifiable view of asset identity, ownership and risk.",
    card1Title: "Verification for live decisions",
    card1Text:
      "Support buying, underwriting, financing and resale decisions with ownership verification, proof of origin and registry passport records.",
    card2Title: "Fraud and theft visibility",
    card2Text:
      "Surface red flags, theft indicators and identity conflicts before an asset is insured, financed, rented or exported.",
    card3Title: "Infrastructure for multi-country operations",
    card3Text:
      "Support fleets, portfolios and partner workflows across jurisdictions with one neutral record tied to VINs, serial numbers and registry IDs.",
  },
  footer: {
    copyright: "EquipRegistry â€” Digital asset trust infrastructure",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    disclaimer: "Disclaimer",
  },
  statuses: {
    registeredVerified: {
      label: "Registered & Verified",
      message:
        "This asset is registered in EquipRegistry and its legal origin has been verified.",
      why:
        "This asset has a verified legal origin and an active registry passport.",
      metadataStatus: "Status",
      metadataPassport: "Registry passport",
      metadataValidation: "Last validation",
      actionViewPassport: "View passport",
    },
    historyUnknown: {
      label: "History Unknown",
      message:
        "This asset exists in the registry, but its full ownership history could not be verified.",
      why:
        "Incomplete ownership history increases fraud, insurance and compliance risk.",
      metadataStatus: "Status",
      metadataRisk: "Risk level",
      actionViewPassport: "View passport (limited)",
      actionRequestVerification: "Request verification",
      actionRegisterDocuments: "Register documents",
    },
    stolen: {
      label: "Stolen Asset â€“ Red Flag",
      message:
        "This asset has been officially reported stolen and is actively blacklisted in EquipRegistry.",
      warning:
        "Do NOT purchase, insure, rent, transport or accept transfer of this asset.",
      why:
        "Any transaction involving a stolen asset may lead to legal and financial consequences.",
      metadataStatus: "Status",
      metadataRisk: "Risk level",
      metadataReportedBy: "Reported by",
      metadataJurisdiction: "Jurisdiction",
      metadataReportDate: "Report date",
      actionReportSighting: "Report sighting",
      actionContactAuthorities: "Contact authorities",
      actionVerifyCaseId: "Verify case ID",
    },
    notRegistered: {
      label: "Not Registered",
      message: "This identifier is not registered in EquipRegistry.",
      why:
        "An unregistered asset lacks a verified ownership and history record.",
      actionRegister: "Register this asset",
    },
    metadataValues: {
      active: "Active",
      full: "Full",
      lastValidation2025: "2025",
      limitedPassport: "Limited passport",
      medium: "Medium",
      blacklisted: "Blacklisted",
      high: "High",
      insurancePartner: "Insurance partner",
      euCrossBorderAlert: "EU / Cross-border alert",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Draft",
  incomplete: "Incomplete",
  submitted: "Submitted",
  underReview: "Under review",
  moreInfoRequired: "More information required",
  approved: "Approved",
  rejected: "Rejected",
  passportIssued: "Passport available",
  unknown: "Unknown",
},
    registrationDetail: {
      backToAdminRegistrations: "Back to admin registrations",
      backToRegistrations: "Back to registrations",
      adminPaymentConfirmationTitle: "Admin payment confirmation",
      adminPaymentConfirmationDescription:
        "After you have confirmed the bank transfer manually, mark this registration as paid.",
      reviewWorkflowTitle: "Review workflow",
      reviewWorkflowDescription:
        "Move the registration through review, approval, and final passport issuance.",
      detailsTitle: "Registration details",
      dynamicFieldsTitle: "Additional asset data",
      noAdditionalData: "No additional data available.",
      paymentCompleted: "Completed / Cleared",
      paymentPending: "Pending",
      labels: {
        passportNumber: "Passport Number",
        applicantType: "Applicant Type",
        assetName: "Asset Name",
        category: "Category",
        subcategory: "Subcategory",
        brand: "Brand",
        model: "Model",
        serialNumber: "Serial Number",
        owner: "Owner",
        ownerEmail: "Owner Email",
        created: "Created",
        updated: "Updated",
        payment: "Payment",
        completenessScore: "Completeness Score",
        solarPanelSerialNumbers: "Solar Panel Serial Numbers",
        batterySerialNumbers: "Battery Serial Numbers",
        bikeBatterySerialNumbers: "Bike Battery Serial Numbers",
        capacity: "Capacity",
        powerRating: "Power Rating",
        batchLotNumber: "Batch / Lot Number",
        installationLocation: "Installation Location",
        hoursOfOperation: "Hours of Operation",
        deviceId: "Device ID",
        certification: "Certification",
        ownerOrganisation: "Owner Organisation",
      },
    },
  },
};

const es: Dictionary = {
  nav: {
    howItWorks: "CÃ³mo funciona",
    login: "Acceso",
    dashboard: "Panel",
    logout: "Cerrar sesiÃ³n",
    menu: "MenÃº",
  },
  menu: {
    home: "Inicio",
    verifyAsset: "Verificar activo",
    registerAsset: "Registrar activo",
    pricing: "Precios",
    reportSighting: "Reportar avistamiento",
    partners: "Para aseguradoras / socios",
    contact: "Contacto",
  },
  common: {
    goToHomepageSearch: "Ir a la bÃºsqueda de inicio",
    publicVerification: "VerificaciÃ³n pÃºblica",
    whySightingsMatter: "Por quÃ© los avistamientos importan",
    contactEquipRegistry: "Contactar con EquipRegistry",
    print: "Imprimir",
    downloadPdf: "Descargar PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Solicitudes de registro",
    newRegistration: "Nuevo registro",
  },
},
    verify: {
      title: "Verificar activo",
      subtitle:
        "Busque un nÃºmero de serie y compruebe si el equipo estÃ¡ registrado, verificado, marcado o desconocido.",
      introTitle: "VerificaciÃ³n pÃºblica",
      introText:
        "Esta pÃ¡gina serÃ¡ la ruta pÃºblica dedicada a la verificaciÃ³n. Por ahora, la bÃºsqueda en vivo sigue estando en la pÃ¡gina principal.",
    },
    register: {
      title: "Registrar activo",
      subtitle:
        "Inicie el flujo de registro para equipos, vehÃ­culos o remolques y prepare el activo para un pasaporte digital de registro.",
      vehicleTitle: "VehÃ­culo",
      vehicleText:
        "Coches, camiones, furgonetas, campers y otros activos de carretera con VIN o referencia de serie.",
      equipmentTitle: "Equipo",
      equipmentText:
        "Maquinaria de construcciÃ³n, agrÃ­cola, industrial y de alquiler con nÃºmero de serie de mÃ¡quina.",
      trailerTitle: "Remolque",
      trailerText:
        "Remolques y activos remolcados que requieren identidad, procedencia y visibilidad de confianza.",
    },
    reportSighting: {
      title: "Reportar avistamiento",
      subtitle:
        "Reporte un avistamiento de equipo marcado o robado y ayude a mejorar la visibilidad transfronteriza.",
      introTitle: "Por quÃ© los avistamientos importan",
      introText:
        "Los reportes pÃºblicos de avistamiento pueden ayudar a aseguradoras, autoridades y propietarios legÃ­timos a actuar mÃ¡s rÃ¡pido cuando un equipo estÃ¡ marcado, robado o bajo investigaciÃ³n.",
    },
    partners: {
      title: "Para aseguradoras / socios",
      subtitle:
        "EquipRegistry estÃ¡ diseÃ±ado como una capa de confianza para aseguradoras, empresas de alquiler, entidades financieras y terminales logÃ­sticos.",
      insurersTitle: "Aseguradoras",
      insurersText:
        "Mejore la suscripciÃ³n, reduzca el fraude y acelere la recuperaciÃ³n. EquipRegistry permite validar en tiempo real la propiedad, el historial y el estado de riesgo. Detecte activos robados al instante y evite reclamaciones sobre equipos fraudulentos.",
      rentalTitle: "Empresas de alquiler",
      rentalText:
        "Obtenga visibilidad total de su flota a nivel internacional. Prevenga fraude, verifique clientes y proteja sus activos contra robo, registros duplicados y reventa ilegal.",
      financeTitle: "Bancos e instituciones financieras",
      financeText:
        "Evite la doble financiaciÃ³n y el fraude de activos. EquipRegistry permite verificar si un activo ya estÃ¡ financiado, registrado o seÃ±alado. Reduzca el riesgo en estructuras de leasing y financiaciÃ³n basada en activos.",
      financeRiskTitle: "Riesgo de doble financiaciÃ³n",
      financeRiskText:
        "El mismo activo puede utilizarse como garantÃ­a varias veces en diferentes entidades o paÃ­ses. Sin una capa de confianza compartida, esto crea exposiciÃ³n oculta, riesgo de fraude y posibles pÃ©rdidas financieras.",
      financeVerificationTitle: "VerificaciÃ³n antes de financiar",
      financeVerificationText:
        "Confirme si un activo ya estÃ¡ registrado, financiado, seÃ±alado o vinculado a un incidente de riesgo antes de aprobar un leasing o un prÃ©stamo.",
      financeTrustTitle: "Confianza transfronteriza",
      financeTrustText:
        "Impulse transacciones internacionales mÃ¡s seguras relacionadas con maquinaria, vehÃ­culos, remolques y otros activos mÃ³viles utilizados en estructuras de financiaciÃ³n.",
      terminalsTitle: "Puertos y terminales logÃ­sticos",
      terminalsText:
        "Verifique equipos entrantes y salientes en tiempo real. Detecte activos robados o marcados antes de que entren o salgan de su terminal. Apoye aduanas, inspecciones y cumplimiento transfronterizo.",
      rentalVisibilityTitle: "Visibilidad de la flota",
      rentalVisibilityText:
        "Mantenga una visiÃ³n mÃ¡s clara de la identidad, el estado y el riesgo del equipo en varios paÃ­ses y ubicaciones operativas.",
      rentalPreventionTitle: "PrevenciÃ³n del robo",
      rentalPreventionText:
        "Facilite un marcado mÃ¡s rÃ¡pido y una prevenciÃ³n mÃ¡s sÃ³lida del fraude en torno a activos robados, desaparecidos o revendidos ilegalmente.",
      rentalOriginTitle: "Prueba de procedencia",
      rentalOriginText:
        "Refuerce la prueba de propiedad y la confianza para aseguradoras, compradores, socios y actores transfronterizos.",
      terminalsEntryTitle: "Control de entrada y salida",
      terminalsEntryText:
        "AÃ±ada una capa extra de verificaciÃ³n antes de que el equipo entre o salga de zonas operativas seguras.",
      terminalsCustomsTitle: "Aduanas e inspecciones",
      terminalsCustomsText:
        "Apoye los controles aduaneros, las revisiones en terminales y los procesos de cumplimiento con una identificaciÃ³n de activos y una visibilidad del riesgo mÃ¡s sÃ³lidas.",
      ctaText:
        "EquipRegistry estÃ¡ diseÃ±ado para apoyar a socios de confianza en flujos de seguros, alquiler, financiaciÃ³n, logÃ­stica y recuperaciÃ³n.",
    },
   contact: {
  title: "Contacto",
  subtitle:
    "PÃ³ngase en contacto para colaboraciones, casos de uso con aseguradoras, pilotos o cooperaciÃ³n estratÃ©gica.",
  generalTitle: "Consultas generales",
  generalText:
    "Para preguntas generales sobre EquipRegistry, la plataforma, la verificaciÃ³n pÃºblica o cÃ³mo funciona el registro.",
  businessTitle: "Empresas y colaboraciones",
  businessText:
    "Para aseguradoras, empresas de alquiler, bancos, terminales y organizaciones interesadas en colaboraciÃ³n, proyectos piloto o integraciÃ³n.",
  supportTitle: "Soporte",
  supportText:
    "Para ayuda relacionada con registros, pasaportes del registro, datos enviados o cuestiones de la plataforma.",
  emailLabel: "Correo electrÃ³nico",
  formTitle: "Formulario de contacto",
  formIntro:
    "Elija el tipo de contacto correcto para que su mensaje llegue directamente al buzÃ³n adecuado de EquipRegistry.",
  typeLabel: "Tipo de contacto",
  typeGeneral: "Consulta general",
  typeBusiness: "Empresas / Colaboraciones",
  typeSupport: "Soporte",
  namePlaceholder: "Su nombre",
  emailPlaceholder: "Su correo electrÃ³nico",
  subjectPlaceholder: "Asunto",
  messagePlaceholder: "Su mensaje",
  sendButton: "Enviar mensaje",
  sendingButton: "Enviando...",
successMessage: "Su mensaje se ha enviado correctamente.",
errorMessage: "Se ha producido un error al enviar su mensaje.",
},
    disclaimer: {
      title: "Aviso legal",
      intro:
        "EquipRegistry proporciona una infraestructura digital de registro para vehÃ­culos, equipos, remolques y otros activos elegibles.",
      liability:
        "EquipRegistry no garantiza la exactitud, integridad o validez legal de los datos enviados, mostrados o importados. El uso de la plataforma es bajo su propia responsabilidad.",
      data:
        "Los datos pueden ser aportados por usuarios, socios, aseguradoras, autoridades, entidades financieras y futuros sistemas integrados.",
      future:
        "Las futuras integraciones podrÃ¡n incluir aseguradoras, autoridades, flujos transfronterizos, transferencias de propiedad, sistemas de pago y capas de validaciÃ³n.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, EspaÃ±a. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifica el origen, el estado y los riesgos de vehículos y equipos en todo el mundo",
    subtitle:
      "Use VIN, números de serie e IDs de registro para verificar origen, estado actual y señales de riesgo antes de comprar, financiar, asegurar, alquilar o transferir un activo.",
    placeholder: "Introduzca VIN, nÃºmero de serie o ID de registro",
    search: "Buscar",
    demoSerials: "Series demo:",
    loggedInMessage:
      "Ha iniciado sesiÃ³n. Puede usar la bÃºsqueda normalmente y acceder a pasaportes privados.",
    goToDashboard: "Ir al panel",
    supportedAssetsTitle: "Activos compatibles",
    supportedAssetsItems: [
      "VehÃ­culos (coches, camiones y vehÃ­culos clÃ¡sicos)",
      "Equipos y maquinaria",
      "Bicicletas y movilidad ligera",
    ],
  },
  result: {
    whyThisMatters: "Por quÃ© es importante",
  },
  howItWorks: {
    title: "CÃ³mo funciona EquipRegistry",
    step1Title: "1. Consultar",
    step1Text:
      "Introduzca un VIN, nÃºmero de serie o ID de registro para comprobar al instante el estado del registro.",
    step2Title: "2. Verificar",
    step2Text:
      "Revise historial de titularidad, documentos y nivel de validaciÃ³n cuando estÃ©n disponibles.",
    step3Title: "3. Registrar",
    step3Text:
      "Registre vehÃ­culos, equipos u otros activos y aÃ±ada documentaciÃ³n de soporte.",
    step4Title: "4. Utilizar",
    step4Text:
      "Utilice el pasaporte registral para seguros, alquiler, reventa, recuperaciÃ³n o cumplimiento.",
  },
  trust: {
    title: "DiseÃ±ado para generar confianza a escala global",
    subtitle:
      "EquipRegistry estÃ¡ diseÃ±ado como infraestructura neutral para vehÃ­culos, equipos y otros activos valiosos, apoyando a aseguradoras, empresas de alquiler, propietarios profesionales y transacciones transfronterizas.",
    card1Title: "Preparado para seguros",
    card1Text:
      "Estructurado para respaldar suscripciÃ³n, ciclos de validaciÃ³n y decisiones basadas en riesgo.",
    card2Title: "Independiente y neutral",
    card2Text:
      "No estÃ¡ vinculado a fabricantes, distribuidores ni jurisdicciones: una fuente global de confianza.",
    card3Title: "DiseÃ±ado para escalar",
    card3Text:
      "Desde un solo activo hasta flotas globales, preparado para adopciÃ³n multi-paÃ­s.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Infraestructura digital de confianza para activos",
    privacy: "PolÃ­tica de privacidad",
    terms: "TÃ©rminos y condiciones",
    disclaimer: "Aviso legal",
  },
  statuses: {
    registeredVerified: {
      label: "Registrado y verificado",
      message:
        "Este activo estÃ¡ registrado en EquipRegistry y su origen legal ha sido verificado.",
      why:
        "Este activo tiene un origen legal verificado y un pasaporte registral activo.",
      metadataStatus: "Estado",
      metadataPassport: "Pasaporte registral",
      metadataValidation: "Ãšltima validaciÃ³n",
      actionViewPassport: "Ver pasaporte",
    },
    historyUnknown: {
      label: "Historial desconocido",
      message:
        "Este activo existe en el registro, pero no se pudo verificar todo su historial de titularidad.",
      why:
        "Un historial de titularidad incompleto aumenta el riesgo de fraude, seguros y cumplimiento.",
      metadataStatus: "Estado",
      metadataRisk: "Nivel de riesgo",
      actionViewPassport: "Ver pasaporte (limitado)",
      actionRequestVerification: "Solicitar verificaciÃ³n",
      actionRegisterDocuments: "Registrar documentos",
    },
    stolen: {
      label: "Activo robado â€“ Alerta roja",
      message:
        "Este activo ha sido reportado oficialmente como robado y estÃ¡ activamente bloqueado en EquipRegistry.",
      warning:
        "NO compre, asegure, alquile, transporte ni acepte la transferencia de este activo.",
      why:
        "Cualquier transacciÃ³n con un activo robado puede generar consecuencias legales y financieras.",
      metadataStatus: "Estado",
      metadataRisk: "Nivel de riesgo",
      metadataReportedBy: "Reportado por",
      metadataJurisdiction: "JurisdicciÃ³n",
      metadataReportDate: "Fecha del reporte",
      actionReportSighting: "Reportar avistamiento",
      actionContactAuthorities: "Contactar autoridades",
      actionVerifyCaseId: "Verificar ID del caso",
    },
    notRegistered: {
      label: "No registrado",
      message: "Este identificador no estÃ¡ registrado en EquipRegistry.",
      why:
        "Un activo no registrado carece de historial y titularidad verificados.",
      actionRegister: "Registrar este activo",
    },
    metadataValues: {
      active: "Activo",
      full: "Completo",
      lastValidation2025: "2025",
      limitedPassport: "Pasaporte limitado",
      medium: "Medio",
      blacklisted: "Bloqueado",
      high: "Alto",
      insurancePartner: "Aseguradora asociada",
      euCrossBorderAlert: "UE / Alerta transfronteriza",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Borrador",
  incomplete: "Incompleto",
  submitted: "Enviado",
  underReview: "En revisiÃ³n",
  moreInfoRequired: "Se requiere mÃ¡s informaciÃ³n",
  approved: "Aprobado",
  rejected: "Rechazado",
  passportIssued: "Pasaporte disponible",
  unknown: "Desconocido",
},
    registrationDetail: {
      backToAdminRegistrations: "Volver a registros de administraciÃ³n",
      backToRegistrations: "Volver a registros",
      adminPaymentConfirmationTitle: "ConfirmaciÃ³n administrativa del pago",
      adminPaymentConfirmationDescription:
        "DespuÃ©s de confirmar manualmente la transferencia bancaria, marque este registro como pagado.",
      reviewWorkflowTitle: "Flujo de revisiÃ³n",
      reviewWorkflowDescription:
        "Mueva el registro a travÃ©s de revisiÃ³n, aprobaciÃ³n y emisiÃ³n final del pasaporte.",
      detailsTitle: "Detalles del registro",
      dynamicFieldsTitle: "Datos adicionales del activo",
      noAdditionalData: "No hay datos adicionales disponibles.",
      paymentCompleted: "Completado / Confirmado",
      paymentPending: "Pendiente",
      labels: {
        passportNumber: "NÃºmero de pasaporte",
        applicantType: "Tipo de solicitante",
        assetName: "Nombre del activo",
        category: "CategorÃ­a",
        subcategory: "SubcategorÃ­a",
        brand: "Marca",
        model: "Modelo",
        serialNumber: "NÃºmero de serie",
        owner: "Propietario",
        ownerEmail: "Correo del propietario",
        created: "Creado",
        updated: "Actualizado",
        payment: "Pago",
        completenessScore: "Nivel de completitud",
        solarPanelSerialNumbers: "NÃºmeros de serie de paneles solares",
        batterySerialNumbers: "NÃºmeros de serie de baterÃ­as",
        bikeBatterySerialNumbers:
          "NÃºmeros de serie de baterÃ­as de bicicleta",
        capacity: "Capacidad",
        powerRating: "Potencia",
        batchLotNumber: "NÃºmero de lote / partida",
        installationLocation: "UbicaciÃ³n de instalaciÃ³n",
        hoursOfOperation: "Horas de funcionamiento",
        deviceId: "ID del dispositivo",
        certification: "CertificaciÃ³n",
        ownerOrganisation: "OrganizaciÃ³n propietaria",
      },
    },
  },
};

const de: Dictionary = {
  nav: {
    howItWorks: "So funktioniert es",
    login: "Anmelden",
    dashboard: "Dashboard",
    logout: "Abmelden",
    menu: "MenÃ¼",
  },
  menu: {
    home: "Startseite",
    verifyAsset: "Asset prÃ¼fen",
    registerAsset: "Asset registrieren",
    pricing: "Preise",
    reportSighting: "Sichtung melden",
    partners: "FÃ¼r Versicherer / Partner",
    contact: "Kontakt",
  },
  common: {
    goToHomepageSearch: "Zur Startseiten-Suche",
    publicVerification: "Ã–ffentliche Verifizierung",
    whySightingsMatter: "Warum Sichtungen wichtig sind",
    contactEquipRegistry: "EquipRegistry kontaktieren",
    print: "Drucken",
    downloadPdf: "PDF herunterladen",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Registrierungsanfragen",
    newRegistration: "Neue Registrierung",
  },
},
    verify: {
      title: "Asset prÃ¼fen",
      subtitle:
        "Suchen Sie nach einer Seriennummer und prÃ¼fen Sie, ob das GerÃ¤t registriert, verifiziert, markiert oder unbekannt ist.",
      introTitle: "Ã–ffentliche Verifizierung",
      introText:
        "Diese Seite wird zur dedizierten Ã¶ffentlichen Verifizierungsroute. Vorerst bleibt Ihre Live-Suche auf der Startseite.",
    },
    register: {
      title: "Asset registrieren",
      subtitle:
        "Starten Sie den Registrierungsprozess fÃ¼r GerÃ¤te, Fahrzeuge oder AnhÃ¤nger und bereiten Sie das Asset fÃ¼r einen digitalen Registerpass vor.",
      vehicleTitle: "Fahrzeug",
      vehicleText:
        "Autos, Lkw, Vans, Camper und andere StraÃŸenfahrzeuge mit VIN oder Serienreferenz.",
      equipmentTitle: "GerÃ¤t",
      equipmentText:
        "Bau-, Landwirtschafts-, Industrie- und MietgerÃ¤te mit Maschinennummer.",
      trailerTitle: "AnhÃ¤nger",
      trailerText:
        "AnhÃ¤nger und gezogene Assets, die IdentitÃ¤t, Herkunft und Vertrauenssichtbarkeit benÃ¶tigen.",
    },
    reportSighting: {
      title: "Sichtung melden",
      subtitle:
        "Melden Sie eine Sichtung von markiertem oder gestohlenem GerÃ¤t und helfen Sie, die grenzÃ¼berschreitende Sichtbarkeit zu verbessern.",
      introTitle: "Warum Sichtungen wichtig sind",
      introText:
        "Ã–ffentliche Sichtungsmeldungen kÃ¶nnen Versicherern, BehÃ¶rden und rechtmÃ¤ÃŸigen EigentÃ¼mern helfen, schneller zu handeln, wenn GerÃ¤te markiert, gestohlen oder in Untersuchung sind.",
    },
    partners: {
      title: "FÃ¼r Versicherer / Partner",
      subtitle:
        "EquipRegistry wurde als Vertrauensebene fÃ¼r Versicherer, Vermieter, Finanzinstitute und Logistikterminals entwickelt.",
      insurersTitle: "Versicherungsunternehmen",
      insurersText:
        "Verbessern Sie das Underwriting, reduzieren Sie Betrug und beschleunigen Sie die Wiederbeschaffung. EquipRegistry ermÃ¶glicht die Echtzeitvalidierung von Eigentum, Asset-Historie und Risikostatus. Erkennen Sie gestohlene Assets sofort und verhindern Sie SchÃ¤den bei betrÃ¼gerischem Equipment.",
      rentalTitle: "Vermietunternehmen",
      rentalText:
        "Erhalten Sie volle Transparenz Ã¼ber Ihre Flotte Ã¼ber LÃ¤ndergrenzen hinweg. Verhindern Sie Betrug, prÃ¼fen Sie Kunden und schÃ¼tzen Sie Ihre Assets vor Diebstahl, Doppelregistrierungen und illegalem Weiterverkauf.",
      financeTitle: "Banken & Finanzinstitute",
      financeText:
        "Verhindern Sie Doppelfinanzierung und Asset-Betrug. EquipRegistry ermÃ¶glicht es Kreditgebern zu prÃ¼fen, ob ein Asset bereits finanziert, registriert oder markiert ist. Reduzieren Sie Risiken in Leasing- und assetbasierten Finanzierungsstrukturen.",
      financeRiskTitle: "Doppelfinanzierungsrisiko",
      financeRiskText:
        "Dasselbe Asset kann bei verschiedenen Instituten oder in mehreren LÃ¤ndern mehrfach als Sicherheit eingesetzt werden. Ohne eine gemeinsame Vertrauensebene entstehen verdeckte Exponierung, Betrugsrisiken und potenzielle finanzielle Verluste.",
      financeVerificationTitle: "PrÃ¼fung vor der Finanzierung",
      financeVerificationText:
        "PrÃ¼fen Sie vor der Freigabe von Leasing oder Kredit, ob ein Asset bereits registriert, finanziert, markiert oder mit einem Risikofall verbunden ist.",
      financeTrustTitle: "GrenzÃ¼berschreitendes Vertrauen",
      financeTrustText:
        "UnterstÃ¼tzen Sie sicherere internationale Transaktionen mit Maschinen, Fahrzeugen, AnhÃ¤ngern und anderen beweglichen Assets in Finanzierungsstrukturen.",
      terminalsTitle: "HÃ¤fen & Logistikterminals",
      terminalsText:
        "Verifizieren Sie ein- und ausgehendes Equipment in Echtzeit. Erkennen Sie gestohlene oder markierte Assets, bevor sie Ihr Terminal betreten oder verlassen. UnterstÃ¼tzen Sie Zoll, Inspektionen und grenzÃ¼berschreitende Compliance.",
      rentalVisibilityTitle: "Flottentransparenz",
      rentalVisibilityText:
        "Behalten Sie IdentitÃ¤t, Status und Risiko Ihres Equipments Ã¼ber mehrere LÃ¤nder und Einsatzorte hinweg besser im Blick.",
      rentalPreventionTitle: "DiebstahlprÃ¤vention",
      rentalPreventionText:
        "ErmÃ¶glichen Sie schnelleres Flagging und stÃ¤rkere BetrugsprÃ¤vention bei gestohlenen, vermissten oder illegal weiterverkauften Assets.",
      rentalOriginTitle: "Herkunftsnachweis",
      rentalOriginText:
        "Verbessern Sie Eigentumsnachweis und Vertrauen fÃ¼r Versicherer, KÃ¤ufer, Partner und grenzÃ¼berschreitende Beteiligte.",
      terminalsEntryTitle: "Ein- und Ausgangskontrolle",
      terminalsEntryText:
        "FÃ¼gen Sie eine zusÃ¤tzliche Verifizierungsebene hinzu, bevor Equipment geschÃ¼tzte Betriebszonen betritt oder verlÃ¤sst.",
      terminalsCustomsTitle: "Zoll und Inspektionen",
      terminalsCustomsText:
        "UnterstÃ¼tzen Sie Zoll-, Terminal- und Compliance-Prozesse mit stÃ¤rkerer Asset-Identifikation und besserer Risikotransparenz.",
      ctaText:
        "EquipRegistry wurde entwickelt, um vertrauenswÃ¼rdige Partner in Versicherungs-, Vermietungs-, Finanzierungs-, Logistik- und Wiederbeschaffungsprozessen zu unterstÃ¼tzen.",
    },
    contact: {
  title: "Kontakt",
  subtitle:
    "Kontaktieren Sie uns zu Partnerschaften, Versicherungsanwendungen, Pilotprojekten oder strategischer Zusammenarbeit.",
  generalTitle: "Allgemeine Anfragen",
  generalText:
    "FÃ¼r allgemeine Fragen zu EquipRegistry, der Plattform, der Ã¶ffentlichen Verifizierung oder zur Funktionsweise des Registers.",
  businessTitle: "Business & Partnerschaften",
  businessText:
    "FÃ¼r Versicherer, Vermietunternehmen, Banken, Terminals und andere Organisationen mit Interesse an Zusammenarbeit, Pilotprojekten oder Integration.",
  supportTitle: "Support",
  supportText:
    "FÃ¼r Hilfe zu Registrierungen, RegisterpÃ¤ssen, eingereichten Daten oder plattformbezogenen Fragen.",
  emailLabel: "E-Mail",
  formTitle: "Kontaktformular",
  formIntro:
    "WÃ¤hlen Sie den richtigen Kontakttyp, damit Ihre Nachricht direkt im richtigen EquipRegistry-Postfach landet.",
  typeLabel: "Kontakttyp",
  typeGeneral: "Allgemeine Anfrage",
  typeBusiness: "Business / Partnerschaften",
  typeSupport: "Support",
  namePlaceholder: "Ihr Name",
  emailPlaceholder: "Ihre E-Mail",
  subjectPlaceholder: "Betreff",
  messagePlaceholder: "Ihre Nachricht",
  sendButton: "Nachricht senden",
  sendingButton: "Wird gesendet...",
successMessage: "Ihre Nachricht wurde erfolgreich gesendet.",
errorMessage: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.",
},
    disclaimer: {
      title: "Haftungsausschluss",
      intro:
        "EquipRegistry stellt eine digitale Registerinfrastruktur fÃ¼r Fahrzeuge, GerÃ¤te, AnhÃ¤nger und andere zulÃ¤ssige VermÃ¶genswerte bereit.",
      liability:
        "EquipRegistry Ã¼bernimmt keine GewÃ¤hr fÃ¼r die Richtigkeit, VollstÃ¤ndigkeit oder rechtliche GÃ¼ltigkeit eingereichter, angezeigter oder importierter Daten. Die Nutzung erfolgt auf eigenes Risiko.",
      data:
        "Daten kÃ¶nnen von Nutzern, Partnern, Versicherern, BehÃ¶rden, Finanzinstituten und kÃ¼nftigen integrierten Systemen bereitgestellt werden.",
      future:
        "KÃ¼nftige Integrationen kÃ¶nnen Versicherer, BehÃ¶rden, grenzÃ¼berschreitende AblÃ¤ufe, EigentumsÃ¼bertragungen, Zahlungssysteme und zusÃ¤tzliche Validierungsebenen umfassen.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spanien. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifizieren Sie Herkunft, Status und Risiken von Fahrzeugen und Geräten weltweit",
    subtitle:
      "Nutzen Sie VINs, Seriennummern und Register-IDs, um Herkunft, aktuellen Status und Risikosignale vor Kauf, Finanzierung, Versicherung, Vermietung oder Übertragung zu prüfen.",
    placeholder: "VIN, Seriennummer oder Register-ID eingeben",
    search: "Suchen",
    demoSerials: "Demo-Seriennummern:",
    loggedInMessage:
      "Sie sind eingeloggt. Sie kÃ¶nnen die Suche normal nutzen und weiterhin auf private PÃ¤sse zugreifen.",
    goToDashboard: "Zum Dashboard",
    supportedAssetsTitle: "UnterstÃ¼tzte Assets",
    supportedAssetsItems: [
      "Fahrzeuge (Autos, Lkw und Oldtimer)",
      "GerÃ¤te und Maschinen",
      "FahrrÃ¤der und leichte MobilitÃ¤t",
    ],
  },
  result: {
    whyThisMatters: "Warum das wichtig ist",
  },
  howItWorks: {
    title: "So funktioniert EquipRegistry",
    step1Title: "1. PrÃ¼fen",
    step1Text:
      "Geben Sie eine VIN, Seriennummer oder Register-ID ein, um den Registrierungsstatus sofort zu prÃ¼fen.",
    step2Title: "2. Verifizieren",
    step2Text:
      "PrÃ¼fen Sie Eigentumshistorie, Dokumente und Validierungsstufe, sofern verfÃ¼gbar.",
    step3Title: "3. Registrieren",
    step3Text:
      "Registrieren Sie Fahrzeuge, GerÃ¤te oder andere Assets und fÃ¼gen Sie unterstÃ¼tzende Nachweise hinzu.",
    step4Title: "4. Nutzen",
    step4Text:
      "Nutzen Sie den Registerpass fÃ¼r Versicherung, Vermietung, Wiederverkauf, Recovery oder Compliance.",
  },
  trust: {
    title: "FÃ¼r Vertrauen im globalen MaÃŸstab gebaut",
    subtitle:
      "EquipRegistry ist als neutrale Infrastruktur fÃ¼r Fahrzeuge, GerÃ¤te und andere wertvolle Assets konzipiert und unterstÃ¼tzt Versicherer, Vermieter, professionelle EigentÃ¼mer und grenzÃ¼berschreitende Transaktionen.",
    card1Title: "VersicherungsfÃ¤hig",
    card1Text:
      "Strukturiert zur UnterstÃ¼tzung von Underwriting, Validierungszyklen und risikobasierten Entscheidungen.",
    card2Title: "UnabhÃ¤ngig & neutral",
    card2Text:
      "Nicht an Hersteller, HÃ¤ndler oder RechtsrÃ¤ume gebunden â€” eine globale Vertrauensquelle.",
    card3Title: "FÃ¼r Skalierung gebaut",
    card3Text:
      "Von einzelnen Assets bis zu globalen Flotten, ausgelegt fÃ¼r lÃ¤nderÃ¼bergreifende EinfÃ¼hrung.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Digitale Vertrauensinfrastruktur fÃ¼r Assets",
    privacy: "Datenschutz",
    terms: "AGB",
    disclaimer: "Haftungsausschluss",
  },
  statuses: {
    registeredVerified: {
      label: "Registriert & verifiziert",
      message:
        "Dieses Asset ist in EquipRegistry registriert und sein legaler Ursprung wurde verifiziert.",
      why:
        "Dieses Asset hat einen verifizierten legalen Ursprung und einen aktiven Registerpass.",
      metadataStatus: "Status",
      metadataPassport: "Registerpass",
      metadataValidation: "Letzte Validierung",
      actionViewPassport: "Pass ansehen",
    },
    historyUnknown: {
      label: "Historie unbekannt",
      message:
        "Dieses Asset ist im Register vorhanden, aber seine vollstÃ¤ndige Eigentumshistorie konnte nicht verifiziert werden.",
      why:
        "Eine unvollstÃ¤ndige Eigentumshistorie erhÃ¶ht Betrugs-, Versicherungs- und Compliance-Risiken.",
      metadataStatus: "Status",
      metadataRisk: "Risikostufe",
      actionViewPassport: "Pass ansehen (eingeschrÃ¤nkt)",
      actionRequestVerification: "Verifizierung anfordern",
      actionRegisterDocuments: "Dokumente registrieren",
    },
    stolen: {
      label: "Gestohlenes Asset â€“ Warnstufe Rot",
      message:
        "Dieses Asset wurde offiziell als gestohlen gemeldet und ist in EquipRegistry aktiv gesperrt.",
      warning:
        "Dieses Asset NICHT kaufen, versichern, mieten, transportieren oder Ã¼bernehmen.",
      why:
        "Jede Transaktion mit einem gestohlenen Asset kann rechtliche und finanzielle Folgen haben.",
      metadataStatus: "Status",
      metadataRisk: "Risikostufe",
      metadataReportedBy: "Gemeldet von",
      metadataJurisdiction: "Jurisdiktion",
      metadataReportDate: "Meldedatum",
      actionReportSighting: "Sichtung melden",
      actionContactAuthorities: "BehÃ¶rden kontaktieren",
      actionVerifyCaseId: "Fall-ID prÃ¼fen",
    },
    notRegistered: {
      label: "Nicht registriert",
      message: "Diese Kennung ist nicht in EquipRegistry registriert.",
      why:
        "Ein nicht registriertes Asset verfÃ¼gt nicht Ã¼ber einen verifizierten Eigentums- und Verlaufseintrag.",
      actionRegister: "Dieses Asset registrieren",
    },
    metadataValues: {
      active: "Aktiv",
      full: "VollstÃ¤ndig",
      lastValidation2025: "2025",
      limitedPassport: "EingeschrÃ¤nkter Pass",
      medium: "Mittel",
      blacklisted: "Gesperrt",
      high: "Hoch",
      insurancePartner: "Versicherungspartner",
      euCrossBorderAlert: "EU / GrenzÃ¼berschreitende Warnung",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Entwurf",
  incomplete: "UnvollstÃ¤ndig",
  submitted: "Eingereicht",
  underReview: "In PrÃ¼fung",
  moreInfoRequired: "Weitere Informationen erforderlich",
  approved: "Genehmigt",
  rejected: "Abgelehnt",
  passportIssued: "Pass verfÃ¼gbar",
  unknown: "Unbekannt",
},
    registrationDetail: {
      backToAdminRegistrations: "ZurÃ¼ck zu Admin-Registrierungen",
      backToRegistrations: "ZurÃ¼ck zu Registrierungen",
      adminPaymentConfirmationTitle: "Admin-ZahlungsbestÃ¤tigung",
      adminPaymentConfirmationDescription:
        "Nachdem Sie die BankÃ¼berweisung manuell bestÃ¤tigt haben, markieren Sie diese Registrierung als bezahlt.",
      reviewWorkflowTitle: "PrÃ¼fungsworkflow",
      reviewWorkflowDescription:
        "FÃ¼hren Sie die Registrierung durch PrÃ¼fung, Genehmigung und endgÃ¼ltige Passausstellung.",
      detailsTitle: "Registrierungsdetails",
      dynamicFieldsTitle: "ZusÃ¤tzliche Asset-Daten",
      noAdditionalData: "Keine zusÃ¤tzlichen Daten verfÃ¼gbar.",
      paymentCompleted: "Abgeschlossen / BestÃ¤tigt",
      paymentPending: "Ausstehend",
      labels: {
        passportNumber: "Passnummer",
        applicantType: "Antragstyp",
        assetName: "Asset-Name",
        category: "Kategorie",
        subcategory: "Unterkategorie",
        brand: "Marke",
        model: "Modell",
        serialNumber: "Seriennummer",
        owner: "EigentÃ¼mer",
        ownerEmail: "E-Mail des EigentÃ¼mers",
        created: "Erstellt",
        updated: "Aktualisiert",
        payment: "Zahlung",
        completenessScore: "VollstÃ¤ndigkeitsgrad",
        solarPanelSerialNumbers: "Seriennummern der Solarmodule",
        batterySerialNumbers: "Seriennummern der Batterien",
        bikeBatterySerialNumbers: "Seriennummern der Fahrradakkus",
        capacity: "KapazitÃ¤t",
        powerRating: "Leistung",
        batchLotNumber: "Chargen- / Losnummer",
        installationLocation: "Installationsort",
        hoursOfOperation: "Betriebsstunden",
        deviceId: "GerÃ¤te-ID",
        certification: "Zertifizierung",
        ownerOrganisation: "EigentÃ¼merorganisation",
      },
    },
  },
};

const fr: Dictionary = {
  nav: {
    howItWorks: "Fonctionnement",
    login: "Connexion",
    dashboard: "Tableau de bord",
    logout: "DÃ©connexion",
    menu: "Menu",
  },
  menu: {
    home: "Accueil",
    verifyAsset: "VÃ©rifier lâ€™actif",
    registerAsset: "Enregistrer lâ€™actif",
    pricing: "Tarifs",
    reportSighting: "Signaler un repÃ©rage",
    partners: "Pour assureurs / partenaires",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Aller Ã  la recherche dâ€™accueil",
    publicVerification: "VÃ©rification publique",
    whySightingsMatter: "Pourquoi les repÃ©rages comptent",
    contactEquipRegistry: "Contacter EquipRegistry",
    print: "Imprimer",
    downloadPdf: "TÃ©lÃ©charger PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Demandes dâ€™enregistrement",
    newRegistration: "Nouvel enregistrement",
  },
},
    verify: {
      title: "VÃ©rifier lâ€™actif",
      subtitle:
        "Recherchez un numÃ©ro de sÃ©rie et vÃ©rifiez si lâ€™Ã©quipement est enregistrÃ©, vÃ©rifiÃ©, signalÃ© ou inconnu.",
      introTitle: "VÃ©rification publique",
      introText:
        "Cette page deviendra lâ€™itinÃ©raire public dÃ©diÃ© Ã  la vÃ©rification. Pour le moment, votre recherche en direct reste sur la page dâ€™accueil.",
    },
    register: {
      title: "Enregistrer lâ€™actif",
      subtitle:
        "DÃ©marrez le processus dâ€™enregistrement pour les Ã©quipements, vÃ©hicules ou remorques et prÃ©parez lâ€™actif pour un passeport numÃ©rique de registre.",
      vehicleTitle: "VÃ©hicule",
      vehicleText:
        "Voitures, camions, fourgons, camping-cars et autres actifs routiers avec VIN ou rÃ©fÃ©rence sÃ©rie.",
      equipmentTitle: "Ã‰quipement",
      equipmentText:
        "Ã‰quipements de construction, agricoles, industriels et de location avec numÃ©ro de sÃ©rie machine.",
      trailerTitle: "Remorque",
      trailerText:
        "Remorques et actifs tractÃ©s nÃ©cessitant identitÃ©, provenance et visibilitÃ© de confiance.",
    },
    reportSighting: {
      title: "Signaler un repÃ©rage",
      subtitle:
        "Signalez un repÃ©rage dâ€™Ã©quipement signalÃ© ou volÃ© et contribuez Ã  amÃ©liorer la visibilitÃ© transfrontaliÃ¨re.",
      introTitle: "Pourquoi les repÃ©rages comptent",
      introText:
        "Les signalements publics peuvent aider les assureurs, les autoritÃ©s et les propriÃ©taires lÃ©gitimes Ã  agir plus vite lorsquâ€™un Ã©quipement est signalÃ©, volÃ© ou sous enquÃªte.",
    },
    partners: {
      title: "Pour assureurs / partenaires",
      subtitle:
        "EquipRegistry est conÃ§u comme une couche de confiance pour les assureurs, les sociÃ©tÃ©s de location, les institutions financiÃ¨res et les terminaux logistiques.",
      insurersTitle: "Compagnies dâ€™assurance",
      insurersText:
        "AmÃ©liorez la souscription, rÃ©duisez la fraude et accÃ©lÃ©rez la rÃ©cupÃ©ration. EquipRegistry permet une validation en temps rÃ©el de la propriÃ©tÃ©, de lâ€™historique de lâ€™actif et du niveau de risque. DÃ©tectez immÃ©diatement les actifs volÃ©s et Ã©vitez les sinistres liÃ©s Ã  des Ã©quipements frauduleux.",
      rentalTitle: "SociÃ©tÃ©s de location",
      rentalText:
        "Obtenez une visibilitÃ© complÃ¨te de votre flotte au-delÃ  des frontiÃ¨res. PrÃ©venez la fraude, vÃ©rifiez les clients et protÃ©gez vos actifs contre le vol, les doubles enregistrements et la revente illÃ©gale.",
      financeTitle: "Banques et institutions financiÃ¨res",
      financeText:
        "PrÃ©venez le double financement et la fraude liÃ©e aux actifs. EquipRegistry permet aux prÃªteurs de vÃ©rifier si un actif est dÃ©jÃ  financÃ©, enregistrÃ© ou signalÃ©. RÃ©duisez les risques dans les structures de leasing et de financement adossÃ© Ã  des actifs.",
      financeRiskTitle: "Risque de double financement",
      financeRiskText:
        "Le mÃªme actif peut Ãªtre utilisÃ© comme garantie plusieurs fois auprÃ¨s dâ€™institutions ou dans diffÃ©rents pays. Sans couche de confiance partagÃ©e, cela crÃ©e une exposition cachÃ©e, un risque de fraude et des pertes financiÃ¨res potentielles.",
      financeVerificationTitle: "VÃ©rification avant financement",
      financeVerificationText:
        "VÃ©rifiez si un actif est dÃ©jÃ  enregistrÃ©, financÃ©, signalÃ© ou associÃ© Ã  un Ã©vÃ©nement de risque avant dâ€™approuver un leasing ou un prÃªt.",
      financeTrustTitle: "Confiance transfrontaliÃ¨re",
      financeTrustText:
        "Soutenez des transactions internationales plus sÃ»res impliquant des machines, des vÃ©hicules, des remorques et dâ€™autres actifs mobiles utilisÃ©s dans des structures de financement.",
      terminalsTitle: "Ports et terminaux logistiques",
      terminalsText:
        "VÃ©rifiez les Ã©quipements entrants et sortants en temps rÃ©el. DÃ©tectez les actifs volÃ©s ou signalÃ©s avant quâ€™ils nâ€™entrent ou ne quittent votre terminal. Soutenez les douanes, les inspections et la conformitÃ© transfrontaliÃ¨re.",
      rentalVisibilityTitle: "VisibilitÃ© de flotte",
      rentalVisibilityText:
        "Gardez une vue plus claire de lâ€™identitÃ©, du statut et du risque des Ã©quipements dans plusieurs pays et sites dâ€™exploitation.",
      rentalPreventionTitle: "PrÃ©vention du vol",
      rentalPreventionText:
        "Permettez un signalement plus rapide et une prÃ©vention renforcÃ©e de la fraude autour des actifs volÃ©s, manquants ou revendus illÃ©galement.",
      rentalOriginTitle: "Preuve de provenance",
      rentalOriginText:
        "Renforcez la preuve de propriÃ©tÃ© et la confiance pour les assureurs, acheteurs, partenaires et acteurs transfrontaliers.",
      terminalsEntryTitle: "ContrÃ´le des entrÃ©es et sorties",
      terminalsEntryText:
        "Ajoutez une couche de vÃ©rification supplÃ©mentaire avant que lâ€™Ã©quipement nâ€™entre ou ne sorte de zones opÃ©rationnelles sÃ©curisÃ©es.",
      terminalsCustomsTitle: "Douanes et inspections",
      terminalsCustomsText:
        "Soutenez les contrÃ´les douaniers, les vÃ©rifications terminalaires et les processus de conformitÃ© grÃ¢ce Ã  une identification des actifs et une visibilitÃ© du risque renforcÃ©es.",
      ctaText:
        "EquipRegistry est conÃ§u pour soutenir des partenaires de confiance dans les flux dâ€™assurance, de location, de financement, de logistique et de rÃ©cupÃ©ration.",
    },
    contact: {
  title: "Contact",
  subtitle:
    "Prenez contact pour des partenariats, des cas dâ€™usage assurance, des pilotes ou une collaboration stratÃ©gique.",
  generalTitle: "Demandes gÃ©nÃ©rales",
  generalText:
    "Pour toute question gÃ©nÃ©rale sur EquipRegistry, la plateforme, la vÃ©rification publique ou le fonctionnement du registre.",
  businessTitle: "Business & partenariats",
  businessText:
    "Pour les assureurs, sociÃ©tÃ©s de location, banques, terminaux et autres organisations intÃ©ressÃ©es par une collaboration, un projet pilote ou une intÃ©gration.",
  supportTitle: "Support",
  supportText:
    "Pour obtenir de lâ€™aide concernant les enregistrements, les passeports du registre, les donnÃ©es soumises ou les questions liÃ©es Ã  la plateforme.",
  emailLabel: "E-mail",
  formTitle: "Formulaire de contact",
  formIntro:
    "Choisissez le bon type de contact afin que votre message soit envoyÃ© directement Ã  la bonne boÃ®te EquipRegistry.",
  typeLabel: "Type de contact",
  typeGeneral: "Demande gÃ©nÃ©rale",
  typeBusiness: "Business / partenariats",
  typeSupport: "Support",
  namePlaceholder: "Votre nom",
  emailPlaceholder: "Votre e-mail",
  subjectPlaceholder: "Objet",
  messagePlaceholder: "Votre message",
  sendButton: "Envoyer le message",
  sendingButton: "Envoi en cours...",
successMessage: "Votre message a Ã©tÃ© envoyÃ© avec succÃ¨s.",
errorMessage: "Une erreur sâ€™est produite lors de lâ€™envoi de votre message.",
},
    disclaimer: {
      title: "Avertissement",
      intro:
        "EquipRegistry fournit une infrastructure numÃ©rique de registre pour les vÃ©hicules, Ã©quipements, remorques et autres actifs Ã©ligibles.",
      liability:
        "EquipRegistry ne garantit pas lâ€™exactitude, lâ€™exhaustivitÃ© ou la validitÃ© juridique des donnÃ©es soumises, affichÃ©es ou importÃ©es. Lâ€™utilisation de la plateforme se fait aux risques de lâ€™utilisateur.",
      data:
        "Les donnÃ©es peuvent Ãªtre fournies par des utilisateurs, partenaires, assureurs, autoritÃ©s, institutions financiÃ¨res et futurs systÃ¨mes intÃ©grÃ©s.",
      future:
        "Les futures intÃ©grations pourront inclure des assureurs, autoritÃ©s, flux transfrontaliers, transferts de propriÃ©tÃ©, systÃ¨mes de paiement et couches de validation.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Espagne. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Vérifiez l’origine, le statut et les risques des véhicules et équipements dans le monde entier",
    subtitle:
      "Utilisez les VIN, numéros de série et identifiants de registre pour vérifier l’origine, le statut actuel et les signaux de risque avant achat, financement, assurance, location ou transfert.",
    placeholder: "Entrez le VIN, le numÃ©ro de sÃ©rie ou lâ€™identifiant de registre",
    search: "Rechercher",
    demoSerials: "NumÃ©ros de dÃ©monstration :",
    loggedInMessage:
      "Vous Ãªtes connectÃ©. Vous pouvez utiliser la recherche normalement et accÃ©der aux passeports privÃ©s.",
    goToDashboard: "Aller au tableau de bord",
    supportedAssetsTitle: "Actifs pris en charge",
    supportedAssetsItems: [
      "VÃ©hicules (voitures, camions et vÃ©hicules de collection)",
      "Ã‰quipements et machines",
      "VÃ©los et mobilitÃ© lÃ©gÃ¨re",
    ],
  },
  result: {
    whyThisMatters: "Pourquoi câ€™est important",
  },
  howItWorks: {
    title: "Comment fonctionne EquipRegistry",
    step1Title: "1. VÃ©rifier",
    step1Text:
      "Entrez un VIN, un numÃ©ro de sÃ©rie ou un identifiant de registre pour vÃ©rifier instantanÃ©ment le statut dâ€™enregistrement.",
    step2Title: "2. ContrÃ´ler",
    step2Text:
      "Examinez lâ€™historique de propriÃ©tÃ©, les documents et le niveau de validation lorsquâ€™ils sont disponibles.",
    step3Title: "3. Enregistrer",
    step3Text:
      "Enregistrez des vÃ©hicules, des Ã©quipements ou dâ€™autres actifs et ajoutez les justificatifs nÃ©cessaires.",
    step4Title: "4. Utiliser",
    step4Text:
      "Utilisez le passeport du registre pour lâ€™assurance, la location, la revente, la rÃ©cupÃ©ration ou la conformitÃ©.",
  },
  trust: {
    title: "ConÃ§u pour la confiance Ã  lâ€™Ã©chelle mondiale",
    subtitle:
      "EquipRegistry est conÃ§u comme une infrastructure neutre pour les vÃ©hicules, les Ã©quipements et dâ€™autres actifs de valeur, au service des assureurs, loueurs, propriÃ©taires professionnels et transactions transfrontaliÃ¨res.",
    card1Title: "PrÃªt pour lâ€™assurance",
    card1Text:
      "StructurÃ© pour soutenir la souscription, les cycles de validation et les dÃ©cisions fondÃ©es sur le risque.",
    card2Title: "IndÃ©pendant & neutre",
    card2Text:
      "Non liÃ© aux fabricants, revendeurs ou juridictions â€” une source mondiale de confiance.",
    card3Title: "ConÃ§u pour Ã©voluer",
    card3Text:
      "Dâ€™un seul actif Ã  des flottes mondiales, pensÃ© pour une adoption multi-pays.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Infrastructure numÃ©rique de confiance pour les actifs",
    privacy: "Politique de confidentialitÃ©",
    terms: "Conditions gÃ©nÃ©rales",
    disclaimer: "Avertissement",
  },
  statuses: {
    registeredVerified: {
      label: "EnregistrÃ© et vÃ©rifiÃ©",
      message:
        "Cet actif est enregistrÃ© dans EquipRegistry et son origine lÃ©gale a Ã©tÃ© vÃ©rifiÃ©e.",
      why:
        "Cet actif possÃ¨de une origine lÃ©gale vÃ©rifiÃ©e et un passeport actif dans le registre.",
      metadataStatus: "Statut",
      metadataPassport: "Passeport registre",
      metadataValidation: "DerniÃ¨re validation",
      actionViewPassport: "Voir le passeport",
    },
    historyUnknown: {
      label: "Historique inconnu",
      message:
        "Cet actif existe dans le registre, mais son historique complet de propriÃ©tÃ© nâ€™a pas pu Ãªtre vÃ©rifiÃ©.",
      why:
        "Un historique de propriÃ©tÃ© incomplet augmente les risques de fraude, dâ€™assurance et de conformitÃ©.",
      metadataStatus: "Statut",
      metadataRisk: "Niveau de risque",
      actionViewPassport: "Voir le passeport (limitÃ©)",
      actionRequestVerification: "Demander une vÃ©rification",
      actionRegisterDocuments: "Enregistrer des documents",
    },
    stolen: {
      label: "Actif volÃ© â€“ Alerte rouge",
      message:
        "Cet actif a Ã©tÃ© officiellement signalÃ© volÃ© et est activement bloquÃ© dans EquipRegistry.",
      warning:
        "NE PAS acheter, assurer, louer, transporter ni accepter le transfert de cet actif.",
      why:
        "Toute transaction impliquant un actif volÃ© peut entraÃ®ner des consÃ©quences juridiques et financiÃ¨res.",
      metadataStatus: "Statut",
      metadataRisk: "Niveau de risque",
      metadataReportedBy: "SignalÃ© par",
      metadataJurisdiction: "Juridiction",
      metadataReportDate: "Date du signalement",
      actionReportSighting: "Signaler un repÃ©rage",
      actionContactAuthorities: "Contacter les autoritÃ©s",
      actionVerifyCaseId: "VÃ©rifier lâ€™ID du dossier",
    },
    notRegistered: {
      label: "Non enregistrÃ©",
      message: "Cet identifiant nâ€™est pas enregistrÃ© dans EquipRegistry.",
      why:
        "Un actif non enregistrÃ© ne dispose pas dâ€™un historique et dâ€™une propriÃ©tÃ© vÃ©rifiÃ©s.",
      actionRegister: "Enregistrer cet actif",
    },
    metadataValues: {
      active: "Actif",
      full: "Complet",
      lastValidation2025: "2025",
      limitedPassport: "Passeport limitÃ©",
      medium: "Moyen",
      blacklisted: "BloquÃ©",
      high: "Ã‰levÃ©",
      insurancePartner: "Partenaire assureur",
      euCrossBorderAlert: "UE / Alerte transfrontaliÃ¨re",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Brouillon",
  incomplete: "Incomplet",
  submitted: "Soumis",
  underReview: "En cours de traitement",
  moreInfoRequired: "Informations supplÃ©mentaires requises",
  approved: "ApprouvÃ©",
  rejected: "RejetÃ©",
  passportIssued: "Passeport disponible",
  unknown: "Inconnu",
},
    registrationDetail: {
      backToAdminRegistrations: "Retour aux enregistrements admin",
      backToRegistrations: "Retour aux enregistrements",
      adminPaymentConfirmationTitle: "Confirmation administrative du paiement",
      adminPaymentConfirmationDescription:
        "AprÃ¨s avoir confirmÃ© manuellement le virement bancaire, marquez cet enregistrement comme payÃ©.",
      reviewWorkflowTitle: "Flux de rÃ©vision",
      reviewWorkflowDescription:
        "Faites passer lâ€™enregistrement par la rÃ©vision, lâ€™approbation et lâ€™Ã©mission finale du passeport.",
      detailsTitle: "DÃ©tails de lâ€™enregistrement",
      dynamicFieldsTitle: "DonnÃ©es supplÃ©mentaires de lâ€™actif",
      noAdditionalData: "Aucune donnÃ©e supplÃ©mentaire disponible.",
      paymentCompleted: "TerminÃ© / ConfirmÃ©",
      paymentPending: "En attente",
      labels: {
        passportNumber: "NumÃ©ro de passeport",
        applicantType: "Type de demandeur",
        assetName: "Nom de lâ€™actif",
        category: "CatÃ©gorie",
        subcategory: "Sous-catÃ©gorie",
        brand: "Marque",
        model: "ModÃ¨le",
        serialNumber: "NumÃ©ro de sÃ©rie",
        owner: "PropriÃ©taire",
        ownerEmail: "E-mail du propriÃ©taire",
        created: "CrÃ©Ã©",
        updated: "Mis Ã  jour",
        payment: "Paiement",
        completenessScore: "Niveau de complÃ©tude",
        solarPanelSerialNumbers: "NumÃ©ros de sÃ©rie des panneaux solaires",
        batterySerialNumbers: "NumÃ©ros de sÃ©rie des batteries",
        bikeBatterySerialNumbers:
          "NumÃ©ros de sÃ©rie des batteries de vÃ©lo",
        capacity: "CapacitÃ©",
        powerRating: "Puissance",
        batchLotNumber: "NumÃ©ro de lot / batch",
        installationLocation: "Lieu dâ€™installation",
        hoursOfOperation: "Heures de fonctionnement",
        deviceId: "ID de lâ€™appareil",
        certification: "Certification",
        ownerOrganisation: "Organisation propriÃ©taire",
      },
    },
  },
};

const it: Dictionary = {
  nav: {
    howItWorks: "Come funziona",
    login: "Accesso",
    dashboard: "Dashboard",
    logout: "Disconnetti",
    menu: "Menu",
  },
  menu: {
    home: "Home",
    verifyAsset: "Verifica asset",
    registerAsset: "Registra asset",
    pricing: "Tariffe",
    reportSighting: "Segnala avvistamento",
    partners: "Per assicuratori / partner",
    contact: "Contatto",
  },
  common: {
    goToHomepageSearch: "Vai alla ricerca homepage",
    publicVerification: "Verifica pubblica",
    whySightingsMatter: "PerchÃ© gli avvistamenti contano",
    contactEquipRegistry: "Contatta EquipRegistry",
    print: "Stampa",
    downloadPdf: "Scarica PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Richieste di registrazione",
    newRegistration: "Nuova registrazione",
  },
},
    verify: {
      title: "Verifica asset",
      subtitle:
        "Cerca un numero di serie e controlla se lâ€™attrezzatura Ã¨ registrata, verificata, segnalata o sconosciuta.",
      introTitle: "Verifica pubblica",
      introText:
        "Questa pagina diventerÃ  il percorso pubblico dedicato alla verifica. Per ora, la tua esperienza di ricerca live rimane sulla homepage.",
    },
    register: {
      title: "Registra asset",
      subtitle:
        "Avvia il flusso di registrazione per attrezzature, veicoli o rimorchi e prepara lâ€™asset per un passaporto digitale di registro.",
      vehicleTitle: "Veicolo",
      vehicleText:
        "Auto, camion, furgoni, camper e altri asset stradali con VIN o riferimento seriale.",
      equipmentTitle: "Attrezzatura",
      equipmentText:
        "Attrezzature da costruzione, agricole, industriali e a noleggio con numero di serie macchina.",
      trailerTitle: "Rimorchio",
      trailerText:
        "Rimorchi e asset trainati che richiedono identitÃ , provenienza e visibilitÃ  di fiducia.",
    },
    reportSighting: {
      title: "Segnala avvistamento",
      subtitle:
        "Segnala lâ€™avvistamento di attrezzature segnalate o rubate e contribuisci a migliorare la visibilitÃ  transfrontaliera.",
      introTitle: "PerchÃ© gli avvistamenti contano",
      introText:
        "Le segnalazioni pubbliche di avvistamento possono aiutare assicuratori, autoritÃ  e proprietari legittimi ad agire piÃ¹ rapidamente quando unâ€™attrezzatura Ã¨ segnalata, rubata o sotto indagine.",
    },
    partners: {
      title: "Per assicuratori / partner",
      subtitle:
        "EquipRegistry Ã¨ progettato come un livello di fiducia per assicuratori, societÃ  di noleggio, istituzioni finanziarie e terminal logistici.",
      insurersTitle: "Compagnie assicurative",
      insurersText:
        "Migliora lâ€™underwriting, riduci le frodi e accelera il recupero. EquipRegistry consente la validazione in tempo reale di proprietÃ , storico dellâ€™asset e stato di rischio. Rileva immediatamente gli asset rubati e previeni sinistri su attrezzature fraudolente.",
      rentalTitle: "SocietÃ  di noleggio",
      rentalText:
        "Ottieni piena visibilitÃ  della tua flotta oltre i confini. Previeni frodi, verifica i clienti e proteggi i tuoi asset da furti, registrazioni duplicate e rivendita illegale.",
      financeTitle: "Banche e istituzioni finanziarie",
      financeText:
        "Previeni doppio finanziamento e frode sugli asset. EquipRegistry consente ai finanziatori di verificare se un asset Ã¨ giÃ  finanziato, registrato o segnalato. Riduci il rischio nelle strutture di leasing e finanziamento basato su asset.",
      financeRiskTitle: "Rischio di doppio finanziamento",
      financeRiskText:
        "Lo stesso asset puÃ² essere usato come garanzia piÃ¹ volte presso istituti o paesi diversi. Senza un livello di fiducia condiviso, ciÃ² crea esposizione nascosta, rischio di frode e potenziali perdite finanziarie.",
      financeVerificationTitle: "Verifica prima del finanziamento",
      financeVerificationText:
        "Conferma se un asset Ã¨ giÃ  registrato, finanziato, segnalato o associato a un evento di rischio prima di approvare un leasing o un prestito.",
      financeTrustTitle: "Fiducia transfrontaliera",
      financeTrustText:
        "Supporta transazioni internazionali piÃ¹ sicure che coinvolgono macchine, veicoli, rimorchi e altri asset mobili usati in strutture di finanziamento.",
      terminalsTitle: "Porti e terminal logistici",
      terminalsText:
        "Verifica attrezzature in entrata e in uscita in tempo reale. Rileva asset rubati o segnalati prima che entrino o escano dal terminal. Supporta dogane, ispezioni e conformitÃ  transfrontaliera.",
      rentalVisibilityTitle: "VisibilitÃ  della flotta",
      rentalVisibilityText:
        "Mantieni una visione piÃ¹ chiara dellâ€™identitÃ , dello stato e del rischio delle attrezzature in piÃ¹ paesi e sedi operative.",
      rentalPreventionTitle: "Prevenzione dei furti",
      rentalPreventionText:
        "Supporta segnalazioni piÃ¹ rapide e una prevenzione piÃ¹ forte delle frodi su asset rubati, scomparsi o rivenduti illegalmente.",
      rentalOriginTitle: "Prova di provenienza",
      rentalOriginText:
        "Rafforza la prova di proprietÃ  e la fiducia per assicuratori, acquirenti, partner e soggetti transfrontalieri.",
      terminalsEntryTitle: "Controllo in entrata e uscita",
      terminalsEntryText:
        "Aggiungi un ulteriore livello di verifica prima che le attrezzature entrino o escano da aree operative protette.",
      terminalsCustomsTitle: "Dogane e ispezioni",
      terminalsCustomsText:
        "Supporta controlli doganali, verifiche terminali e processi di conformitÃ  con unâ€™identificazione degli asset e una visibilitÃ  del rischio piÃ¹ forti.",
      ctaText:
        "EquipRegistry Ã¨ progettato per supportare partner affidabili nei flussi assicurativi, di noleggio, finanziari, logistici e di recupero.",
    },
    contact: {
  title: "Contatto",
  subtitle:
    "Contattaci per partnership, casi dâ€™uso assicurativi, progetti pilota o collaborazione strategica.",
  generalTitle: "Richieste generali",
  generalText:
    "Per domande generali su EquipRegistry, sulla piattaforma, sulla verifica pubblica o su come funziona il registro.",
  businessTitle: "Business e partnership",
  businessText:
    "Per assicuratori, societÃ  di noleggio, banche, terminali e altre organizzazioni interessate a collaborazione, progetti pilota o integrazione.",
  supportTitle: "Supporto",
  supportText:
    "Per assistenza relativa a registrazioni, passaporti di registro, dati inviati o domande relative alla piattaforma.",
  emailLabel: "Email",
  formTitle: "Modulo di contatto",
  formIntro:
    "Scegli il tipo di contatto corretto in modo che il tuo messaggio arrivi direttamente alla casella giusta di EquipRegistry.",
  typeLabel: "Tipo di contatto",
  typeGeneral: "Richiesta generale",
  typeBusiness: "Business / Partnership",
  typeSupport: "Supporto",
  namePlaceholder: "Il tuo nome",
  emailPlaceholder: "La tua email",
  subjectPlaceholder: "Oggetto",
  messagePlaceholder: "Il tuo messaggio",
  sendButton: "Invia messaggio",
  sendingButton: "Invio in corso...",
successMessage: "Il tuo messaggio Ã¨ stato inviato correttamente.",
errorMessage: "Si Ã¨ verificato un errore durante lâ€™invio del messaggio.",
},
    disclaimer: {
      title: "Disclaimer",
      intro:
        "EquipRegistry fornisce unâ€™infrastruttura digitale di registro per veicoli, attrezzature, rimorchi e altri asset idonei.",
      liability:
        "EquipRegistry non garantisce lâ€™accuratezza, la completezza o la validitÃ  legale dei dati inviati, mostrati o importati. Lâ€™uso della piattaforma avviene a proprio rischio.",
      data:
        "I dati possono essere forniti da utenti, partner, assicuratori, autoritÃ , istituzioni finanziarie e futuri sistemi integrati.",
      future:
        "Le future integrazioni potranno includere assicuratori, autoritÃ , flussi transfrontalieri, trasferimenti di proprietÃ , sistemi di pagamento e livelli di validazione.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spagna. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifica origine, stato e rischi di veicoli e attrezzature in tutto il mondo",
    subtitle:
      "Usa VIN, numeri di serie e ID di registro per verificare origine, stato attuale e segnali di rischio prima di acquisto, finanziamento, assicurazione, noleggio o trasferimento.",
    placeholder: "Inserisci VIN, numero di serie o ID di registro",
    search: "Cerca",
    demoSerials: "Seriali demo:",
    loggedInMessage:
      "Hai effettuato lâ€™accesso. Puoi usare la ricerca normalmente e accedere ai passaporti privati.",
    goToDashboard: "Vai alla dashboard",
    supportedAssetsTitle: "Asset supportati",
    supportedAssetsItems: [
      "Veicoli (auto, camion e veicoli d'epoca)",
      "Attrezzature e macchinari",
      "Biciclette e mobilitÃ  leggera",
    ],
  },
  result: {
    whyThisMatters: "PerchÃ© Ã¨ importante",
  },
  howItWorks: {
    title: "Come funziona EquipRegistry",
    step1Title: "1. Controlla",
    step1Text:
      "Inserisci un VIN, numero di serie o ID di registro per verificare subito lo stato di registrazione.",
    step2Title: "2. Verifica",
    step2Text:
      "Controlla la cronologia di proprietÃ , i documenti e il livello di validazione quando disponibili.",
    step3Title: "3. Registra",
    step3Text:
      "Registra veicoli, attrezzature o altri asset e aggiungi documentazione di supporto.",
    step4Title: "4. Usa",
    step4Text:
      "Usa il passaporto del registro per assicurazione, noleggio, rivendita, recupero o conformitÃ .",
  },
  trust: {
    title: "Costruito per la fiducia su scala globale",
    subtitle:
      "EquipRegistry Ã¨ progettato come infrastruttura neutrale per veicoli, attrezzature e altri asset di valore, a supporto di assicuratori, noleggiatori, proprietari professionali e transazioni transfrontaliere.",
    card1Title: "Pronto per le assicurazioni",
    card1Text:
      "Strutturato per supportare underwriting, cicli di validazione e decisioni basate sul rischio.",
    card2Title: "Indipendente e neutrale",
    card2Text:
      "Non legato a produttori, concessionari o giurisdizioni â€” unâ€™unica fonte globale di fiducia.",
    card3Title: "Progettato per scalare",
    card3Text:
      "Da un singolo asset a flotte globali, pensato per unâ€™adozione multi-paese.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Infrastruttura digitale di fiducia per gli asset",
    privacy: "Privacy Policy",
    terms: "Termini e condizioni",
    disclaimer: "Disclaimer",
  },
  statuses: {
    registeredVerified: {
      label: "Registrato e verificato",
      message:
        "Questo asset Ã¨ registrato in EquipRegistry e la sua origine legale Ã¨ stata verificata.",
      why:
        "Questo asset ha unâ€™origine legale verificata e un passaporto di registro attivo.",
      metadataStatus: "Stato",
      metadataPassport: "Passaporto registro",
      metadataValidation: "Ultima validazione",
      actionViewPassport: "Vedi passaporto",
    },
    historyUnknown: {
      label: "Cronologia sconosciuta",
      message:
        "Questo asset Ã¨ presente nel registro, ma la sua cronologia completa di proprietÃ  non ha potuto essere verificata.",
      why:
        "Una cronologia di proprietÃ  incompleta aumenta il rischio di frode, assicurazione e conformitÃ .",
      metadataStatus: "Stato",
      metadataRisk: "Livello di rischio",
      actionViewPassport: "Vedi passaporto (limitato)",
      actionRequestVerification: "Richiedi verifica",
      actionRegisterDocuments: "Registra documenti",
    },
    stolen: {
      label: "Asset rubato â€“ Allerta rossa",
      message:
        "Questo asset Ã¨ stato ufficialmente segnalato come rubato ed Ã¨ attivamente bloccato in EquipRegistry.",
      warning:
        "NON acquistare, assicurare, noleggiare, trasportare o accettare il trasferimento di questo asset.",
      why:
        "Qualsiasi transazione che coinvolga un asset rubato puÃ² avere conseguenze legali e finanziarie.",
      metadataStatus: "Stato",
      metadataRisk: "Livello di rischio",
      metadataReportedBy: "Segnalato da",
      metadataJurisdiction: "Giurisdizione",
      metadataReportDate: "Data segnalazione",
      actionReportSighting: "Segnala avvistamento",
      actionContactAuthorities: "Contatta autoritÃ ",
      actionVerifyCaseId: "Verifica ID caso",
    },
    notRegistered: {
      label: "Non registrato",
      message: "Questo identificatore non Ã¨ registrato in EquipRegistry.",
      why:
        "Un asset non registrato non ha una cronologia e una titolaritÃ  verificate.",
      actionRegister: "Registra questo asset",
    },
    metadataValues: {
      active: "Attivo",
      full: "Completo",
      lastValidation2025: "2025",
      limitedPassport: "Passaporto limitato",
      medium: "Medio",
      blacklisted: "Bloccato",
      high: "Alto",
      insurancePartner: "Partner assicurativo",
      euCrossBorderAlert: "UE / Allerta transfrontaliera",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Bozza",
  incomplete: "Incompleto",
  submitted: "Inviato",
  underReview: "In revisione",
  moreInfoRequired: "Sono necessarie piÃ¹ informazioni",
  approved: "Approvato",
  rejected: "Rifiutato",
  passportIssued: "Passaporto disponibile",
  unknown: "Sconosciuto",
},
    registrationDetail: {
      backToAdminRegistrations: "Torna alle registrazioni admin",
      backToRegistrations: "Torna alle registrazioni",
      adminPaymentConfirmationTitle: "Conferma amministrativa del pagamento",
      adminPaymentConfirmationDescription:
        "Dopo aver confermato manualmente il bonifico bancario, contrassegna questa registrazione come pagata.",
      reviewWorkflowTitle: "Flusso di revisione",
      reviewWorkflowDescription:
        "Fai avanzare la registrazione attraverso revisione, approvazione ed emissione finale del passaporto.",
      detailsTitle: "Dettagli registrazione",
      dynamicFieldsTitle: "Dati aggiuntivi dellâ€™asset",
      noAdditionalData: "Nessun dato aggiuntivo disponibile.",
      paymentCompleted: "Completato / Confermato",
      paymentPending: "In attesa",
      labels: {
        passportNumber: "Numero passaporto",
        applicantType: "Tipo richiedente",
        assetName: "Nome asset",
        category: "Categoria",
        subcategory: "Sottocategoria",
        brand: "Marca",
        model: "Modello",
        serialNumber: "Numero di serie",
        owner: "Proprietario",
        ownerEmail: "Email proprietario",
        created: "Creato",
        updated: "Aggiornato",
        payment: "Pagamento",
        completenessScore: "Livello di completezza",
        solarPanelSerialNumbers: "Numeri di serie dei pannelli solari",
        batterySerialNumbers: "Numeri di serie delle batterie",
        bikeBatterySerialNumbers:
          "Numeri di serie delle batterie per bici",
        capacity: "CapacitÃ ",
        powerRating: "Potenza",
        batchLotNumber: "Numero lotto / batch",
        installationLocation: "Luogo di installazione",
        hoursOfOperation: "Ore di funzionamento",
        deviceId: "ID dispositivo",
        certification: "Certificazione",
        ownerOrganisation: "Organizzazione proprietaria",
      },
    },
  },
};

const nl: Dictionary = {
  nav: {
    howItWorks: "Hoe het werkt",
    login: "Inloggen",
    dashboard: "Dashboard",
    logout: "Uitloggen",
    menu: "Menu",
  },
  menu: {
    home: "Home",
    verifyAsset: "Asset verifiÃ«ren",
    registerAsset: "Asset registreren",
    pricing: "Tarieven",
    reportSighting: "Melding doen",
    partners: "Voor verzekeraars / partners",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Ga naar homepage zoekfunctie",
    publicVerification: "Publieke verificatie",
    whySightingsMatter: "Waarom meldingen belangrijk zijn",
    contactEquipRegistry: "Neem contact op met EquipRegistry",
    print: "Printen",
    downloadPdf: "PDF downloaden",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Registratieaanvragen",
    newRegistration: "Nieuwe registratie",
  },
},
    verify: {
      title: "Asset verifiÃ«ren",
      subtitle:
        "Zoek op een serienummer en controleer of het equipment geregistreerd, geverifieerd, gemarkeerd of onbekend is.",
      introTitle: "Publieke verificatie",
      introText:
        "Deze pagina wordt de speciale publieke verificatieroute. Voor nu blijft de live zoekervaring op de homepage staan.",
    },
    register: {
      title: "Asset registreren",
      subtitle:
        "Start de registratiestroom voor equipment, voertuigen of trailers en bereid het asset voor op een digitaal registry-paspoort.",
      vehicleTitle: "Voertuig",
      vehicleText:
        "Autoâ€™s, vrachtwagens, bestelwagens, campers en andere weggebonden assets met VIN of serienummer.",
      equipmentTitle: "Equipment",
      equipmentText:
        "Bouw-, landbouw-, industriÃ«le en verhuur-equipment met een machineserienummer.",
      trailerTitle: "Trailer",
      trailerText:
        "Trailers en getrokken assets die identiteit, herkomst en vertrouwenszichtbaarheid nodig hebben.",
    },
    reportSighting: {
      title: "Melding doen",
      subtitle:
        "Meld een waarneming van gemarkeerd of gestolen equipment en help grensoverschrijdende zichtbaarheid te verbeteren.",
      introTitle: "Waarom meldingen belangrijk zijn",
      introText:
        "Publieke meldingen kunnen verzekeraars, autoriteiten en rechtmatige eigenaren helpen sneller te handelen wanneer equipment gemarkeerd, gestolen of in onderzoek is.",
    },
    partners: {
      title: "Voor verzekeraars / partners",
      subtitle:
        "EquipRegistry is ontwikkeld als vertrouwenslaag voor verzekeraars, verhuurbedrijven, financiÃ«le instellingen en logistieke terminals.",
      insurersTitle: "Verzekeringsmaatschappijen",
      insurersText:
        "Verbeter underwriting, verminder fraude en versnel recovery. EquipRegistry maakt realtime validatie mogelijk van eigendom, assethistorie en risicostatus. Detecteer gestolen assets direct en voorkom claims op frauduleus equipment.",
      rentalTitle: "Verhuurbedrijven",
      rentalText:
        "Krijg volledige zichtbaarheid over je vloot over grenzen heen. Voorkom fraude, verifieer klanten en bescherm je assets tegen diefstal, dubbele registraties en illegale doorverkoop.",
      financeTitle: "Banken & financiÃ«le instellingen",
      financeText:
        "Voorkom dubbele financiering en assetfraude. EquipRegistry laat financiers controleren of een asset al gefinancierd, geregistreerd of gemarkeerd is. Verlaag risico in lease- en asset based finance-structuren.",
      financeRiskTitle: "Risico op dubbele financiering",
      financeRiskText:
        "Hetzelfde asset kan meerdere keren als onderpand worden gebruikt bij verschillende instellingen of in verschillende landen. Zonder een gedeelde vertrouwenslaag ontstaat verborgen blootstelling, frauderisico en potentieel financieel verlies.",
      financeVerificationTitle: "Verificatie vÃ³Ã³r financiering",
      financeVerificationText:
        "Controleer voordat je een lease of lening goedkeurt of een asset al geregistreerd, gefinancierd, gemarkeerd of gekoppeld aan een risico-incident is.",
      financeTrustTitle: "Grensoverschrijdend vertrouwen",
      financeTrustText:
        "Ondersteun veiligere internationale transacties met machines, voertuigen, trailers en andere verplaatsbare assets binnen financieringsstructuren.",
      terminalsTitle: "Havens & logistieke terminals",
      terminalsText:
        "Verifieer inkomend en uitgaand equipment in realtime. Detecteer gestolen of gemarkeerde assets voordat ze je terminal binnenkomen of verlaten. Ondersteun douane, inspecties en grensoverschrijdende compliance.",
      rentalVisibilityTitle: "Vlootzichtbaarheid",
      rentalVisibilityText:
        "Houd beter overzicht op de identiteit, status en risico's van equipment over meerdere landen en operationele locaties.",
      rentalPreventionTitle: "Diefstalpreventie",
      rentalPreventionText:
        "Ondersteun snellere markering en sterkere fraudepreventie rond gestolen, vermiste of illegaal doorverkochte assets.",
      rentalOriginTitle: "Herkomstbewijs",
      rentalOriginText:
        "Versterk eigendomsbewijs en vertrouwen voor verzekeraars, kopers, partners en grensoverschrijdende stakeholders.",
      terminalsEntryTitle: "In- en uitgangscontrole",
      terminalsEntryText:
        "Voeg een extra verificatielaag toe voordat equipment beveiligde operationele zones binnenkomt of verlaat.",
      terminalsCustomsTitle: "Douane en inspecties",
      terminalsCustomsText:
        "Ondersteun douanecontroles, terminalchecks en complianceprocessen met sterkere asset-identificatie en beter inzicht in risico's.",
      ctaText:
        "EquipRegistry is gebouwd om vertrouwde partners te ondersteunen in verzekerings-, verhuur-, financierings-, logistieke en terughaalprocessen.",
    },
    contact: {
  title: "Contact",
  subtitle:
    "Neem contact op over partnerships, use cases voor verzekeraars, pilots of strategische samenwerking.",
  generalTitle: "Algemene vragen",
  generalText:
    "Voor algemene vragen over EquipRegistry, het platform, publieke verificatie of hoe het register werkt.",
  businessTitle: "Zakelijk & partnerships",
  businessText:
    "Voor verzekeraars, verhuurbedrijven, banken, terminals en andere organisaties die interesse hebben in samenwerking, pilotprojecten of integratie.",
  supportTitle: "Support",
  supportText:
    "Voor hulp met registraties, registry-paspoorten, aangeleverde gegevens of vragen over het platform.",
  emailLabel: "E-mail",
  formTitle: "Contactformulier",
  formIntro:
    "Kies het juiste contacttype zodat je bericht direct in de juiste EquipRegistry inbox terechtkomt.",
  typeLabel: "Type contact",
  typeGeneral: "Algemene vraag",
  typeBusiness: "Zakelijk / Partnerships",
  typeSupport: "Support",
  namePlaceholder: "Jouw naam",
  emailPlaceholder: "Jouw e-mailadres",
  subjectPlaceholder: "Onderwerp",
  messagePlaceholder: "Jouw bericht",
  sendButton: "Bericht verzenden",
  sendingButton: "Verzenden...",
successMessage: "Je bericht is succesvol verzonden.",
errorMessage: "Er ging iets mis bij het verzenden van je bericht.",
},
    disclaimer: {
      title: "Disclaimer",
      intro:
        "EquipRegistry biedt een digitale registerinfrastructuur voor voertuigen, equipment, trailers en andere toegestane assets.",
      liability:
        "EquipRegistry garandeert niet de juistheid, volledigheid of juridische geldigheid van aangeleverde, getoonde of geÃ¯mporteerde gegevens. Gebruik van het platform is volledig op eigen risico.",
      data:
        "Gegevens kunnen afkomstig zijn van gebruikers, partners, verzekeraars, autoriteiten, financiÃ«le instellingen en toekomstige geÃ¯ntegreerde systemen.",
      future:
        "Toekomstige integraties kunnen verzekeraars, autoriteiten, grensoverschrijdende flows, eigendomsoverdracht, betaalsystemen en extra validatielagen omvatten.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spanje. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifieer herkomst en risico van voertuigen en materieel wereldwijd",
    subtitle:
      "Controleer direct de herkomst, status en risico van elk asset wereldwijd.",
    placeholder: "Voer VIN, serienummer of registry-ID in",
    search: "Zoeken",
    demoSerials: "Demo serienummers:",
    loggedInMessage:
      "Je bent ingelogd. Je kunt normaal zoeken en nog steeds private paspoorten openen.",
    goToDashboard: "Ga naar dashboard",
    supportedAssetsTitle: "Ondersteunde assets",
    supportedAssetsItems: [
      "Voertuigen (auto's, vrachtwagens en klassieke voertuigen)",
      "Materieel en machines",
      "Fietsen en lichte mobiliteit",
    ],
  },
  result: {
    whyThisMatters: "Waarom dit belangrijk is",
  },
  howItWorks: {
    title: "Hoe EquipRegistry werkt",
    step1Title: "1. Controleren",
    step1Text:
      "Voer een VIN, serienummer of registry-ID in om direct de registratiestatus te controleren.",
    step2Title: "2. VerifiÃ«ren",
    step2Text:
      "Bekijk eigendomshistorie, documenten en validatieniveau wanneer beschikbaar.",
    step3Title: "3. Registreren",
    step3Text:
      "Registreer voertuigen, equipment of andere assets en voeg ondersteunende gegevens toe.",
    step4Title: "4. Gebruiken",
    step4Text:
      "Gebruik het registry-paspoort voor verzekering, verhuur, doorverkoop, recovery of compliance.",
  },
  trust: {
    title: "Gebouwd voor vertrouwen op wereldschaal",
    subtitle:
      "EquipRegistry is ontworpen als neutrale infrastructuur voor voertuigen, equipment en andere waardevolle assets, ter ondersteuning van verzekeraars, verhuurbedrijven, professionele eigenaren en grensoverschrijdende transacties.",
    card1Title: "Insurance-ready",
    card1Text:
      "Gestructureerd om underwriting, validatiecycli en risicogebaseerde besluitvorming te ondersteunen.",
    card2Title: "Onafhankelijk & neutraal",
    card2Text:
      "Niet gekoppeld aan fabrikanten, dealers of jurisdicties â€” Ã©Ã©n mondiale bron van vertrouwen.",
    card3Title: "Ontworpen om te schalen",
    card3Text:
      "Van losse assets tot wereldwijde vloten, gebouwd voor multi-country adoptie.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Digitale vertrouwensinfrastructuur voor assets",
    privacy: "Privacybeleid",
    terms: "Algemene voorwaarden",
    disclaimer: "Disclaimer",
  },
  statuses: {
    registeredVerified: {
      label: "Geregistreerd & geverifieerd",
      message:
        "Dit asset is geregistreerd in EquipRegistry en de legale herkomst is geverifieerd.",
      why:
        "Dit asset heeft een geverifieerde legale herkomst en een actief registry-paspoort.",
      metadataStatus: "Status",
      metadataPassport: "Registry paspoort",
      metadataValidation: "Laatste validatie",
      actionViewPassport: "Bekijk paspoort",
    },
    historyUnknown: {
      label: "Historie onbekend",
      message:
        "Dit asset staat in het register, maar de volledige eigendomshistorie kon niet worden geverifieerd.",
      why:
        "Een onvolledige eigendomshistorie verhoogt fraude-, verzekerings- en compliance-risicoâ€™s.",
      metadataStatus: "Status",
      metadataRisk: "Risiconiveau",
      actionViewPassport: "Bekijk paspoort (beperkt)",
      actionRequestVerification: "Vraag verificatie aan",
      actionRegisterDocuments: "Registreer documenten",
    },
    stolen: {
      label: "Gestolen asset â€“ Rode vlag",
      message:
        "Dit asset is officieel als gestolen gemeld en staat actief op de zwarte lijst in EquipRegistry.",
      warning:
        "Koop, verzeker, huur, transporteer of accepteer de overdracht van dit asset NIET.",
      why:
        "Elke transactie met een gestolen asset kan leiden tot juridische en financiÃ«le gevolgen.",
      metadataStatus: "Status",
      metadataRisk: "Risiconiveau",
      metadataReportedBy: "Gemeld door",
      metadataJurisdiction: "Jurisdictie",
      metadataReportDate: "Meldingsdatum",
      actionReportSighting: "Melding doen",
      actionContactAuthorities: "Autoriteiten contacteren",
      actionVerifyCaseId: "Verifieer case ID",
    },
    notRegistered: {
      label: "Niet geregistreerd",
      message: "Deze identifier is niet geregistreerd in EquipRegistry.",
      why:
        "Een niet-geregistreerd asset heeft geen geverifieerde eigendoms- en historiegegevens.",
      actionRegister: "Registreer dit asset",
    },
    metadataValues: {
      active: "Actief",
      full: "Volledig",
      lastValidation2025: "2025",
      limitedPassport: "Beperkt paspoort",
      medium: "Middel",
      blacklisted: "Zwarte lijst",
      high: "Hoog",
      insurancePartner: "Verzekeringspartner",
      euCrossBorderAlert: "EU / Grensoverschrijdende alert",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Concept",
  incomplete: "Onvolledig",
  submitted: "Ingediend",
  underReview: "In behandeling",
  moreInfoRequired: "Meer informatie nodig",
  approved: "Goedgekeurd",
  rejected: "Afgewezen",
  passportIssued: "Paspoort beschikbaar",
  unknown: "Onbekend",
},
    registrationDetail: {
      backToAdminRegistrations: "Terug naar admin registraties",
      backToRegistrations: "Terug naar registraties",
      adminPaymentConfirmationTitle: "Admin betalingsbevestiging",
      adminPaymentConfirmationDescription:
        "Nadat je de bankoverschrijving handmatig hebt gecontroleerd, kun je deze registratie als betaald markeren.",
      reviewWorkflowTitle: "Beoordelingsworkflow",
      reviewWorkflowDescription:
        "Verplaats de registratie door beoordeling, goedkeuring en uiteindelijke uitgifte van het paspoort.",
      detailsTitle: "Registratiegegevens",
      dynamicFieldsTitle: "Aanvullende assetgegevens",
      noAdditionalData: "Geen aanvullende gegevens beschikbaar.",
      paymentCompleted: "Voltooid / Verwerkt",
      paymentPending: "In afwachting",
      labels: {
        passportNumber: "Paspoortnummer",
        applicantType: "Type aanvrager",
        assetName: "Naam asset",
        category: "Categorie",
        subcategory: "Subcategorie",
        brand: "Merk",
        model: "Model",
        serialNumber: "Serienummer",
        owner: "Eigenaar",
        ownerEmail: "E-mail eigenaar",
        created: "Aangemaakt",
        updated: "Bijgewerkt",
        payment: "Betaling",
        completenessScore: "Volledigheidsscore",
        solarPanelSerialNumbers: "Serienummers zonnepanelen",
        batterySerialNumbers: "Serienummers batterijen",
        bikeBatterySerialNumbers: "Serienummers fietsbatterijen",
        capacity: "Capaciteit",
        powerRating: "Vermogen",
        batchLotNumber: "Batch- / lotnummer",
        installationLocation: "Installatielocatie",
        hoursOfOperation: "Bedrijfsuren",
        deviceId: "Apparaat-ID",
        certification: "Certificering",
        ownerOrganisation: "Eigenaar organisatie",
      },
    },
  },
};

const pt: Dictionary = {
  nav: {
    howItWorks: "Como funciona",
    login: "Entrar",
    dashboard: "Painel",
    logout: "Terminar sessÃ£o",
    menu: "Menu",
  },
  menu: {
    home: "InÃ­cio",
    verifyAsset: "Verificar ativo",
    registerAsset: "Registar ativo",
    pricing: "PreÃ§os",
    reportSighting: "Reportar avistamento",
    partners: "Para seguradoras / parceiros",
    contact: "Contacto",
  },
  common: {
    goToHomepageSearch: "Ir para a pesquisa da homepage",
    publicVerification: "VerificaÃ§Ã£o pÃºblica",
    whySightingsMatter: "Porque os avistamentos importam",
    contactEquipRegistry: "Contactar EquipRegistry",
    print: "Imprimir",
    downloadPdf: "Transferir PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Pedidos de registo",
    newRegistration: "Novo registo",
  },
},
    verify: {
      title: "Verificar ativo",
      subtitle:
        "Pesquise um nÃºmero de sÃ©rie e verifique se o equipamento estÃ¡ registado, verificado, sinalizado ou desconhecido.",
      introTitle: "VerificaÃ§Ã£o pÃºblica",
      introText:
        "Esta pÃ¡gina tornar-se-Ã¡ a rota pÃºblica dedicada Ã  verificaÃ§Ã£o. Por enquanto, a experiÃªncia de pesquisa em direto continua na homepage.",
    },
    register: {
      title: "Registar ativo",
      subtitle:
        "Inicie o fluxo de registo para equipamentos, veÃ­culos ou reboques e prepare o ativo para um passaporte digital de registo.",
      vehicleTitle: "VeÃ­culo",
      vehicleText:
        "AutomÃ³veis, camiÃµes, carrinhas, autocaravanas e outros ativos rodoviÃ¡rios com VIN ou referÃªncia serial.",
      equipmentTitle: "Equipamento",
      equipmentText:
        "Equipamentos de construÃ§Ã£o, agrÃ­colas, industriais e de aluguer com nÃºmero de sÃ©rie da mÃ¡quina.",
      trailerTitle: "Reboque",
      trailerText:
        "Reboques e ativos rebocados que exigem identidade, proveniÃªncia e visibilidade de confianÃ§a.",
    },
    reportSighting: {
      title: "Reportar avistamento",
      subtitle:
        "Reporte o avistamento de equipamento sinalizado ou roubado e ajude a melhorar a visibilidade transfronteiriÃ§a.",
      introTitle: "Porque os avistamentos importam",
      introText:
        "Os relatÃ³rios pÃºblicos de avistamento podem ajudar seguradoras, autoridades e proprietÃ¡rios legÃ­timos a agir mais rapidamente quando o equipamento estÃ¡ sinalizado, roubado ou sob investigaÃ§Ã£o.",
    },
    partners: {
      title: "Para seguradoras / parceiros",
      subtitle:
        "EquipRegistry foi concebido como uma camada de confianÃ§a para seguradoras, empresas de aluguer, instituiÃ§Ãµes financeiras e terminais logÃ­sticos.",
      insurersTitle: "Seguradoras",
      insurersText:
        "Melhore a subscriÃ§Ã£o, reduza a fraude e acelere a recuperaÃ§Ã£o. A EquipRegistry permite validaÃ§Ã£o em tempo real da titularidade, histÃ³rico do ativo e estado de risco. Detete ativos roubados instantaneamente e evite sinistros sobre equipamento fraudulento.",
      rentalTitle: "Empresas de aluguer",
      rentalText:
        "Obtenha visibilidade total sobre a sua frota alÃ©m-fronteiras. Previna fraude, verifique clientes e proteja os seus ativos contra roubo, registos duplicados e revenda ilegal.",
      financeTitle: "Bancos e instituiÃ§Ãµes financeiras",
      financeText:
        "Previna duplo financiamento e fraude de ativos. A EquipRegistry permite aos financiadores verificar se um ativo jÃ¡ estÃ¡ financiado, registado ou sinalizado. Reduza o risco em estruturas de leasing e financiamento baseado em ativos.",
      financeRiskTitle: "Risco de duplo financiamento",
      financeRiskText:
        "O mesmo ativo pode ser usado como garantia vÃ¡rias vezes em diferentes instituiÃ§Ãµes ou paÃ­ses. Sem uma camada de confianÃ§a partilhada, isso cria exposiÃ§Ã£o oculta, risco de fraude e potenciais perdas financeiras.",
      financeVerificationTitle: "VerificaÃ§Ã£o antes do financiamento",
      financeVerificationText:
        "Confirme se um ativo jÃ¡ estÃ¡ registado, financiado, sinalizado ou associado a um evento de risco antes de aprovar um leasing ou um emprÃ©stimo.",
      financeTrustTitle: "ConfianÃ§a transfronteiriÃ§a",
      financeTrustText:
        "Apoie transaÃ§Ãµes internacionais mais seguras envolvendo mÃ¡quinas, veÃ­culos, reboques e outros ativos mÃ³veis usados em estruturas de financiamento.",
      terminalsTitle: "Portos e terminais logÃ­sticos",
      terminalsText:
        "Verifique equipamento de entrada e saÃ­da em tempo real. Detete ativos roubados ou sinalizados antes de entrarem ou saÃ­rem do seu terminal. Apoie alfÃ¢ndegas, inspeÃ§Ãµes e conformidade transfronteiriÃ§a.",
      rentalVisibilityTitle: "Visibilidade da frota",
      rentalVisibilityText:
        "Mantenha uma visÃ£o mais clara da identidade, do estado e do risco do equipamento em vÃ¡rios paÃ­ses e localizaÃ§Ãµes operacionais.",
      rentalPreventionTitle: "PrevenÃ§Ã£o de roubo",
      rentalPreventionText:
        "Apoie uma sinalizaÃ§Ã£o mais rÃ¡pida e uma prevenÃ§Ã£o de fraude mais forte em torno de ativos roubados, desaparecidos ou revendidos ilegalmente.",
      rentalOriginTitle: "Prova de origem",
      rentalOriginText:
        "Reforce a prova de titularidade e a confianÃ§a para seguradoras, compradores, parceiros e intervenientes transfronteiriÃ§os.",
      terminalsEntryTitle: "Controlo de entrada e saÃ­da",
      terminalsEntryText:
        "Adicione uma camada extra de verificaÃ§Ã£o antes de o equipamento entrar ou sair de zonas operacionais seguras.",
      terminalsCustomsTitle: "AlfÃ¢ndegas e inspeÃ§Ãµes",
      terminalsCustomsText:
        "Apoie controlos aduaneiros, verificaÃ§Ãµes terminais e processos de conformidade com uma identificaÃ§Ã£o de ativos e visibilidade de risco mais fortes.",
      ctaText:
        "A EquipRegistry foi concebida para apoiar parceiros de confianÃ§a em fluxos de seguros, aluguer, financiamento, logÃ­stica e recuperaÃ§Ã£o.",
    },
   contact: {
  title: "Contacto",
  subtitle:
    "Entre em contacto sobre parcerias, casos de uso com seguradoras, pilotos ou colaboraÃ§Ã£o estratÃ©gica.",
  generalTitle: "QuestÃµes gerais",
  generalText:
    "Para perguntas gerais sobre a EquipRegistry, a plataforma, a verificaÃ§Ã£o pÃºblica ou o funcionamento do registo.",
  businessTitle: "NegÃ³cios e parcerias",
  businessText:
    "Para seguradoras, empresas de aluguer, bancos, terminais e outras organizaÃ§Ãµes interessadas em colaboraÃ§Ã£o, projetos piloto ou integraÃ§Ã£o.",
  supportTitle: "Suporte",
  supportText:
    "Para ajuda relacionada com registos, passaportes de registo, dados enviados ou questÃµes relacionadas com a plataforma.",
  emailLabel: "Email",
  formTitle: "FormulÃ¡rio de contacto",
  formIntro:
    "Escolha o tipo de contacto correto para que a sua mensagem seja enviada diretamente para a caixa certa da EquipRegistry.",
  typeLabel: "Tipo de contacto",
  typeGeneral: "QuestÃ£o geral",
  typeBusiness: "NegÃ³cios / Parcerias",
  typeSupport: "Suporte",
  namePlaceholder: "O seu nome",
  emailPlaceholder: "O seu email",
  subjectPlaceholder: "Assunto",
  messagePlaceholder: "A sua mensagem",
  sendButton: "Enviar mensagem",
  sendingButton: "A enviar...",
successMessage: "A sua mensagem foi enviada com sucesso.",
errorMessage: "Ocorreu um erro ao enviar a sua mensagem.",
},
    disclaimer: {
      title: "IsenÃ§Ã£o de responsabilidade",
      intro:
        "A EquipRegistry fornece uma infraestrutura digital de registo para veÃ­culos, equipamentos, reboques e outros ativos elegÃ­veis.",
      liability:
        "A EquipRegistry nÃ£o garante a exatidÃ£o, integridade ou validade legal dos dados enviados, exibidos ou importados. A utilizaÃ§Ã£o da plataforma Ã© por conta e risco do utilizador.",
      data:
        "Os dados podem ser fornecidos por utilizadores, parceiros, seguradoras, autoridades, instituiÃ§Ãµes financeiras e futuros sistemas integrados.",
      future:
        "As futuras integraÃ§Ãµes poderÃ£o incluir seguradoras, autoridades, fluxos transfronteiriÃ§os, transferÃªncias de propriedade, sistemas de pagamento e camadas de validaÃ§Ã£o.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Espanha. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifique a origem e o risco de veículos e equipamentos em todo o mundo",
    subtitle:
      "Use VIN, números de série e IDs de registo para verificar origem, estado atual e sinais de risco antes de compra, financiamento, seguro, aluguer ou transferência.",
    placeholder: "Introduza VIN, nÃºmero de sÃ©rie ou ID de registo",
    search: "Pesquisar",
    demoSerials: "NÃºmeros demo:",
    loggedInMessage:
      "Tem sessÃ£o iniciada. Pode usar a pesquisa normalmente e continuar a aceder a passaportes privados.",
    goToDashboard: "Ir para o painel",
    supportedAssetsTitle: "Ativos suportados",
    supportedAssetsItems: [
      "VeÃ­culos (carros, camiÃµes e veÃ­culos clÃ¡ssicos)",
      "Equipamentos e maquinaria",
      "Bicicletas e mobilidade ligeira",
    ],
  },
  result: {
    whyThisMatters: "Porque isto importa",
  },
  howItWorks: {
    title: "Como o EquipRegistry funciona",
    step1Title: "1. Verificar",
    step1Text:
      "Introduza um VIN, nÃºmero de sÃ©rie ou ID de registo para verificar instantaneamente o estado do registo.",
    step2Title: "2. Validar",
    step2Text:
      "Reveja o histÃ³rico de propriedade, os documentos e o nÃ­vel de validaÃ§Ã£o quando disponÃ­veis.",
    step3Title: "3. Registar",
    step3Text:
      "Registe veÃ­culos, equipamentos ou outros ativos e adicione documentaÃ§Ã£o de suporte.",
    step4Title: "4. Utilizar",
    step4Text:
      "Use o passaporte do registo para seguro, aluguer, revenda, recuperaÃ§Ã£o ou conformidade.",
  },
  trust: {
    title: "ConstruÃ­do para confianÃ§a Ã  escala global",
    subtitle:
      "EquipRegistry foi concebido como infraestrutura neutra para veÃ­culos, equipamentos e outros ativos valiosos, apoiando seguradoras, empresas de aluguer, proprietÃ¡rios profissionais e transaÃ§Ãµes transfronteiriÃ§as.",
    card1Title: "Preparado para seguros",
    card1Text:
      "Estruturado para suportar subscriÃ§Ã£o, ciclos de validaÃ§Ã£o e decisÃµes baseadas no risco.",
    card2Title: "Independente e neutro",
    card2Text:
      "NÃ£o ligado a fabricantes, distribuidores ou jurisdiÃ§Ãµes â€” uma fonte global de confianÃ§a.",
    card3Title: "Concebido para escalar",
    card3Text:
      "De um Ãºnico ativo a frotas globais, preparado para adoÃ§Ã£o em vÃ¡rios paÃ­ses.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Infraestrutura digital de confianÃ§a para ativos",
    privacy: "PolÃ­tica de privacidade",
    terms: "Termos e condiÃ§Ãµes",
    disclaimer: "IsenÃ§Ã£o de responsabilidade",
  },
  statuses: {
    registeredVerified: {
      label: "Registado e verificado",
      message:
        "Este ativo estÃ¡ registado no EquipRegistry e a sua origem legal foi verificada.",
      why:
        "Este ativo tem origem legal verificada e um passaporte de registo ativo.",
      metadataStatus: "Estado",
      metadataPassport: "Passaporte de registo",
      metadataValidation: "Ãšltima validaÃ§Ã£o",
      actionViewPassport: "Ver passaporte",
    },
    historyUnknown: {
      label: "HistÃ³rico desconhecido",
      message:
        "Este ativo existe no registo, mas o seu histÃ³rico completo de propriedade nÃ£o pÃ´de ser verificado.",
      why:
        "Um histÃ³rico de propriedade incompleto aumenta o risco de fraude, seguro e conformidade.",
      metadataStatus: "Estado",
      metadataRisk: "NÃ­vel de risco",
      actionViewPassport: "Ver passaporte (limitado)",
      actionRequestVerification: "Solicitar verificaÃ§Ã£o",
      actionRegisterDocuments: "Registar documentos",
    },
    stolen: {
      label: "Ativo roubado â€“ Alerta vermelho",
      message:
        "Este ativo foi oficialmente reportado como roubado e estÃ¡ ativamente bloqueado no EquipRegistry.",
      warning:
        "NÃƒO compre, assegure, alugue, transporte nem aceite a transferÃªncia deste ativo.",
      why:
        "Qualquer transaÃ§Ã£o envolvendo um ativo roubado pode levar a consequÃªncias legais e financeiras.",
      metadataStatus: "Estado",
      metadataRisk: "NÃ­vel de risco",
      metadataReportedBy: "Reportado por",
      metadataJurisdiction: "JurisdiÃ§Ã£o",
      metadataReportDate: "Data do reporte",
      actionReportSighting: "Reportar avistamento",
      actionContactAuthorities: "Contactar autoridades",
      actionVerifyCaseId: "Verificar ID do caso",
    },
    notRegistered: {
      label: "NÃ£o registado",
      message: "Este identificador nÃ£o estÃ¡ registado no EquipRegistry.",
      why:
        "Um ativo nÃ£o registado nÃ£o possui histÃ³rico e titularidade verificados.",
      actionRegister: "Registar este ativo",
    },
    metadataValues: {
      active: "Ativo",
      full: "Completo",
      lastValidation2025: "2025",
      limitedPassport: "Passaporte limitado",
      medium: "MÃ©dio",
      blacklisted: "Bloqueado",
      high: "Alto",
      insurancePartner: "Parceiro segurador",
      euCrossBorderAlert: "UE / Alerta transfronteiriÃ§o",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Rascunho",
  incomplete: "Incompleto",
  submitted: "Enviado",
  underReview: "Em anÃ¡lise",
  moreInfoRequired: "Mais informaÃ§Ãµes necessÃ¡rias",
  approved: "Aprovado",
  rejected: "Rejeitado",
  passportIssued: "Passaporte disponÃ­vel",
  unknown: "Desconhecido",
},
    registrationDetail: {
      backToAdminRegistrations: "Voltar aos registos de administraÃ§Ã£o",
      backToRegistrations: "Voltar aos registos",
      adminPaymentConfirmationTitle: "ConfirmaÃ§Ã£o administrativa do pagamento",
      adminPaymentConfirmationDescription:
        "Depois de confirmar manualmente a transferÃªncia bancÃ¡ria, marque este registo como pago.",
      reviewWorkflowTitle: "Fluxo de revisÃ£o",
      reviewWorkflowDescription:
        "Mova o registo atravÃ©s da revisÃ£o, aprovaÃ§Ã£o e emissÃ£o final do passaporte.",
      detailsTitle: "Detalhes do registo",
      dynamicFieldsTitle: "Dados adicionais do ativo",
      noAdditionalData: "NÃ£o existem dados adicionais disponÃ­veis.",
      paymentCompleted: "ConcluÃ­do / Confirmado",
      paymentPending: "Pendente",
      labels: {
        passportNumber: "NÃºmero do passaporte",
        applicantType: "Tipo de requerente",
        assetName: "Nome do ativo",
        category: "Categoria",
        subcategory: "Subcategoria",
        brand: "Marca",
        model: "Modelo",
        serialNumber: "NÃºmero de sÃ©rie",
        owner: "ProprietÃ¡rio",
        ownerEmail: "Email do proprietÃ¡rio",
        created: "Criado",
        updated: "Atualizado",
        payment: "Pagamento",
        completenessScore: "NÃ­vel de completude",
        solarPanelSerialNumbers: "NÃºmeros de sÃ©rie dos painÃ©is solares",
        batterySerialNumbers: "NÃºmeros de sÃ©rie das baterias",
        bikeBatterySerialNumbers:
          "NÃºmeros de sÃ©rie das baterias de bicicleta",
        capacity: "Capacidade",
        powerRating: "PotÃªncia",
        batchLotNumber: "NÃºmero de lote / batch",
        installationLocation: "Local de instalaÃ§Ã£o",
        hoursOfOperation: "Horas de operaÃ§Ã£o",
        deviceId: "ID do dispositivo",
        certification: "CertificaÃ§Ã£o",
        ownerOrganisation: "OrganizaÃ§Ã£o proprietÃ¡ria",
      },
    },
  },
};

const ru: Dictionary = {
  nav: {
    howItWorks: "ÐšÐ°Ðº ÑÑ‚Ð¾ Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚",
    login: "Ð’Ð¾Ð¹Ñ‚Ð¸",
    dashboard: "ÐŸÐ°Ð½ÐµÐ»ÑŒ",
    logout: "Ð’Ñ‹Ñ…Ð¾Ð´",
    menu: "ÐœÐµÐ½ÑŽ",
  },
  menu: {
    home: "Ð“Ð»Ð°Ð²Ð½Ð°Ñ",
    verifyAsset: "ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð°ÐºÑ‚Ð¸Ð²",
    registerAsset: "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð°ÐºÑ‚Ð¸Ð²",
    pricing: "Ð¦ÐµÐ½Ñ‹",
    reportSighting: "Ð¡Ð¾Ð¾Ð±Ñ‰Ð¸Ñ‚ÑŒ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸",
    partners: "Ð”Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ¾Ð² / Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€Ð¾Ð²",
    contact: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚",
  },
  common: {
    goToHomepageSearch: "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ð¿Ð¾Ð¸ÑÐºÑƒ Ð½Ð° Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ",
    publicVerification: "ÐŸÑƒÐ±Ð»Ð¸Ñ‡Ð½Ð°Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ°",
    whySightingsMatter: "ÐŸÐ¾Ñ‡ÐµÐ¼Ñƒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸ Ð²Ð°Ð¶Ð½Ñ‹",
    contactEquipRegistry: "Ð¡Ð²ÑÐ·Ð°Ñ‚ÑŒÑÑ Ñ EquipRegistry",
    print: "ÐŸÐµÑ‡Ð°Ñ‚ÑŒ",
    downloadPdf: "Ð¡ÐºÐ°Ñ‡Ð°Ñ‚ÑŒ PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Ð—Ð°ÑÐ²ÐºÐ¸ Ð½Ð° Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑŽ",
    newRegistration: "ÐÐ¾Ð²Ð°Ñ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ñ",
  },
},
    verify: {
      title: "ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ Ð°ÐºÑ‚Ð¸Ð²",
      subtitle:
        "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑŒÑ‚Ðµ, Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾ Ð»Ð¸ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ, Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¾, Ð¾Ñ‚Ð¼ÐµÑ‡ÐµÐ½Ð¾ Ð¸Ð»Ð¸ Ð¸Ð¼ÐµÐµÑ‚ Ð½ÐµÐ¸Ð·Ð²ÐµÑÑ‚Ð½ÑƒÑŽ Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑŽ.",
      introTitle: "ÐŸÑƒÐ±Ð»Ð¸Ñ‡Ð½Ð°Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ°",
      introText:
        "Ð­Ñ‚Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° ÑÑ‚Ð°Ð½ÐµÑ‚ Ð¾Ñ‚Ð´ÐµÐ»ÑŒÐ½Ñ‹Ð¼ Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ð¼ Ð¼Ð°Ñ€ÑˆÑ€ÑƒÑ‚Ð¾Ð¼ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸. ÐŸÐ¾ÐºÐ° Ñ‡Ñ‚Ð¾ Ð¶Ð¸Ð²Ð°Ñ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿Ð¾-Ð¿Ñ€ÐµÐ¶Ð½ÐµÐ¼Ñƒ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð° Ð½Ð° Ð³Ð»Ð°Ð²Ð½Ð¾Ð¹ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ.",
    },
    register: {
      title: "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð°ÐºÑ‚Ð¸Ð²",
      subtitle:
        "ÐÐ°Ñ‡Ð½Ð¸Ñ‚Ðµ Ð¿Ñ€Ð¾Ñ†ÐµÑÑ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ, Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ñ‹Ñ… ÑÑ€ÐµÐ´ÑÑ‚Ð² Ð¸Ð»Ð¸ Ð¿Ñ€Ð¸Ñ†ÐµÐ¿Ð¾Ð² Ð¸ Ð¿Ð¾Ð´Ð³Ð¾Ñ‚Ð¾Ð²ÑŒÑ‚Ðµ Ð°ÐºÑ‚Ð¸Ð² Ðº Ñ†Ð¸Ñ„Ñ€Ð¾Ð²Ð¾Ð¼Ñƒ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚Ñƒ Ñ€ÐµÐµÑÑ‚Ñ€Ð°.",
      vehicleTitle: "Ð¢Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ð¾Ðµ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð¾",
      vehicleText:
        "ÐÐ²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð»Ð¸, Ð³Ñ€ÑƒÐ·Ð¾Ð²Ð¸ÐºÐ¸, Ñ„ÑƒÑ€Ð³Ð¾Ð½Ñ‹, Ð°Ð²Ñ‚Ð¾Ð´Ð¾Ð¼Ð° Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ðµ Ð´Ð¾Ñ€Ð¾Ð¶Ð½Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹ Ñ VIN Ð¸Ð»Ð¸ ÑÐµÑ€Ð¸Ð¹Ð½Ð¾Ð¹ ÑÑÑ‹Ð»ÐºÐ¾Ð¹.",
      equipmentTitle: "ÐžÐ±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ",
      equipmentText:
        "Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ðµ, ÑÐµÐ»ÑŒÑÐºÐ¾Ñ…Ð¾Ð·ÑÐ¹ÑÑ‚Ð²ÐµÐ½Ð½Ð¾Ðµ, Ð¿Ñ€Ð¾Ð¼Ñ‹ÑˆÐ»ÐµÐ½Ð½Ð¾Ðµ Ð¸ Ð°Ñ€ÐµÐ½Ð´Ð½Ð¾Ðµ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ñ ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¼ Ð½Ð¾Ð¼ÐµÑ€Ð¾Ð¼ Ð¼Ð°ÑˆÐ¸Ð½Ñ‹.",
      trailerTitle: "ÐŸÑ€Ð¸Ñ†ÐµÐ¿",
      trailerText:
        "ÐŸÑ€Ð¸Ñ†ÐµÐ¿Ñ‹ Ð¸ Ð±ÑƒÐºÑÐ¸Ñ€ÑƒÐµÐ¼Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹, ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¼ Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ñ‹ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ, Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¸ Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð°Ñ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ.",
    },
    reportSighting: {
      title: "Ð¡Ð¾Ð¾Ð±Ñ‰Ð¸Ñ‚ÑŒ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸",
      subtitle:
        "Ð¡Ð¾Ð¾Ð±Ñ‰Ð¸Ñ‚Ðµ Ð¾ Ð·Ð°Ð¼ÐµÑ‡ÐµÐ½Ð½Ð¾Ð¼ Ð¾Ñ‚Ð¼ÐµÑ‡ÐµÐ½Ð½Ð¾Ð¼ Ð¸Ð»Ð¸ ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ð¾Ð¼ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ð¸ Ð¸ Ð¿Ð¾Ð¼Ð¾Ð³Ð¸Ñ‚Ðµ ÑƒÐ»ÑƒÑ‡ÑˆÐ¸Ñ‚ÑŒ Ñ‚Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½ÑƒÑŽ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ.",
      introTitle: "ÐŸÐ¾Ñ‡ÐµÐ¼Ñƒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸ Ð²Ð°Ð¶Ð½Ñ‹",
      introText:
        "ÐŸÑƒÐ±Ð»Ð¸Ñ‡Ð½Ñ‹Ðµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸ Ð¼Ð¾Ð³ÑƒÑ‚ Ð¿Ð¾Ð¼Ð¾Ñ‡ÑŒ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ°Ð¼, Ð²Ð»Ð°ÑÑ‚ÑÐ¼ Ð¸ Ð·Ð°ÐºÐ¾Ð½Ð½Ñ‹Ð¼ Ð²Ð»Ð°Ð´ÐµÐ»ÑŒÑ†Ð°Ð¼ Ð±Ñ‹ÑÑ‚Ñ€ÐµÐµ Ñ€ÐµÐ°Ð³Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ, ÐºÐ¾Ð³Ð´Ð° Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¾Ñ‚Ð¼ÐµÑ‡ÐµÐ½Ð¾, ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð¾ Ð¸Ð»Ð¸ Ð½Ð°Ñ…Ð¾Ð´Ð¸Ñ‚ÑÑ Ð¿Ð¾Ð´ Ñ€Ð°ÑÑÐ»ÐµÐ´Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼.",
    },
    partners: {
      title: "Ð”Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ¾Ð² / Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€Ð¾Ð²",
      subtitle:
        "EquipRegistry Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð½ ÐºÐ°Ðº ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ Ð´Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ¾Ð², Ð°Ñ€ÐµÐ½Ð´Ð½Ñ‹Ñ… ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¹, Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ñ… ÑƒÑ‡Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸Ð¹ Ð¸ Ð»Ð¾Ð³Ð¸ÑÑ‚Ð¸Ñ‡ÐµÑÐºÐ¸Ñ… Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð².",
      insurersTitle: "Ð¡Ñ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ðµ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸",
      insurersText:
        "Ð£Ð»ÑƒÑ‡ÑˆÐ°Ð¹Ñ‚Ðµ Ð°Ð½Ð´ÐµÑ€Ñ€Ð°Ð¹Ñ‚Ð¸Ð½Ð³, ÑÐ½Ð¸Ð¶Ð°Ð¹Ñ‚Ðµ Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð¸ ÑƒÑÐºÐ¾Ñ€ÑÐ¹Ñ‚Ðµ Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‚ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð². EquipRegistry Ð¿Ð¾Ð·Ð²Ð¾Ð»ÑÐµÑ‚ Ð² Ñ€ÐµÐ°Ð»ÑŒÐ½Ð¾Ð¼ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÑ‚ÑŒ Ð¿Ñ€Ð°Ð²Ð¾ ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸, Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑŽ Ð°ÐºÑ‚Ð¸Ð²Ð° Ð¸ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ñ€Ð¸ÑÐºÐ°. ÐœÐ³Ð½Ð¾Ð²ÐµÐ½Ð½Ð¾ Ð²Ñ‹ÑÐ²Ð»ÑÐ¹Ñ‚Ðµ ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹ Ð¸ Ð¿Ñ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‰Ð°Ð¹Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ðµ ÑÐ»ÑƒÑ‡Ð°Ð¸ Ð¿Ð¾ Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼Ñƒ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸ÑŽ.",
      rentalTitle: "ÐÑ€ÐµÐ½Ð´Ð½Ñ‹Ðµ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸",
      rentalText:
        "ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ð¹Ñ‚Ðµ Ð¿Ð¾Ð»Ð½ÑƒÑŽ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚ÑŒ Ð²Ð°ÑˆÐµÐ¹ Ñ‚ÐµÑ…Ð½Ð¸ÐºÐ¸ Ñ‡ÐµÑ€ÐµÐ· Ð³Ñ€Ð°Ð½Ð¸Ñ†Ñ‹. ÐŸÑ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‰Ð°Ð¹Ñ‚Ðµ Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾, Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÐ¹Ñ‚Ðµ ÐºÐ»Ð¸ÐµÐ½Ñ‚Ð¾Ð² Ð¸ Ð·Ð°Ñ‰Ð¸Ñ‰Ð°Ð¹Ñ‚Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹ Ð¾Ñ‚ ÐºÑ€Ð°Ð¶Ð¸, Ð´Ð²Ð¾Ð¹Ð½Ð¾Ð¹ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸ Ð¸ Ð½ÐµÐ·Ð°ÐºÐ¾Ð½Ð½Ð¾Ð¹ Ð¿ÐµÑ€ÐµÐ¿Ñ€Ð¾Ð´Ð°Ð¶Ð¸.",
      financeTitle: "Ð‘Ð°Ð½ÐºÐ¸ Ð¸ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ðµ ÑƒÑ‡Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸Ñ",
      financeText:
        "ÐŸÑ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‰Ð°Ð¹Ñ‚Ðµ Ð´Ð²Ð¾Ð¹Ð½Ð¾Ðµ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¸ Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ñ Ð°ÐºÑ‚Ð¸Ð²Ð°Ð¼Ð¸. EquipRegistry Ð¿Ð¾Ð·Ð²Ð¾Ð»ÑÐµÑ‚ ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð¾Ñ€Ð°Ð¼ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑÑ‚ÑŒ, Ð½Ðµ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€ÑƒÐµÑ‚ÑÑ Ð»Ð¸ Ð°ÐºÑ‚Ð¸Ð² ÑƒÐ¶Ðµ, Ð½Ðµ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð»Ð¸ Ð¾Ð½ Ð¸ Ð½Ðµ Ð¿Ð¾Ð¼ÐµÑ‡ÐµÐ½ Ð»Ð¸ ÐºÐ°Ðº Ñ€Ð¸ÑÐºÐ¾Ð²Ð°Ð½Ð½Ñ‹Ð¹. Ð¡Ð½Ð¸Ð¶Ð°Ð¹Ñ‚Ðµ Ñ€Ð¸ÑÐº Ð² ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð°Ñ… Ð»Ð¸Ð·Ð¸Ð½Ð³Ð° Ð¸ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¿Ð¾Ð´ Ð·Ð°Ð»Ð¾Ð³ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð².",
      financeRiskTitle: "Ð Ð¸ÑÐº Ð´Ð²Ð¾Ð¹Ð½Ð¾Ð³Ð¾ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ",
      financeRiskText:
        "ÐžÐ´Ð¸Ð½ Ð¸ Ñ‚Ð¾Ñ‚ Ð¶Ðµ Ð°ÐºÑ‚Ð¸Ð² Ð¼Ð¾Ð¶ÐµÑ‚ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒÑÑ ÐºÐ°Ðº Ð·Ð°Ð»Ð¾Ð³ Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ñ€Ð°Ð· Ð² Ñ€Ð°Ð·Ð½Ñ‹Ñ… Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸ÑÑ… Ð¸Ð»Ð¸ ÑÑ‚Ñ€Ð°Ð½Ð°Ñ…. Ð‘ÐµÐ· Ð¾Ð±Ñ‰ÐµÐ³Ð¾ ÑƒÑ€Ð¾Ð²Ð½Ñ Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ ÑÑ‚Ð¾ ÑÐ¾Ð·Ð´Ð°Ñ‘Ñ‚ ÑÐºÑ€Ñ‹Ñ‚ÑƒÑŽ ÑÐºÑÐ¿Ð¾Ð·Ð¸Ñ†Ð¸ÑŽ, Ñ€Ð¸ÑÐº Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð° Ð¸ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ñ‹Ðµ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ðµ Ð¿Ð¾Ñ‚ÐµÑ€Ð¸.",
      financeVerificationTitle: "ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¿ÐµÑ€ÐµÐ´ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼",
      financeVerificationText:
        "ÐŸÐµÑ€ÐµÐ´ Ð¾Ð´Ð¾Ð±Ñ€ÐµÐ½Ð¸ÐµÐ¼ Ð»Ð¸Ð·Ð¸Ð½Ð³Ð° Ð¸Ð»Ð¸ ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð° Ð¿Ñ€Ð¾Ð²ÐµÑ€ÑŒÑ‚Ðµ, Ð½Ðµ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð»Ð¸ Ð°ÐºÑ‚Ð¸Ð², Ð½Ðµ Ð¿Ñ€Ð¾Ñ„Ð¸Ð½Ð°Ð½ÑÐ¸Ñ€Ð¾Ð²Ð°Ð½ Ð»Ð¸ Ð¾Ð½ ÑƒÐ¶Ðµ, Ð½Ðµ Ð¿Ð¾Ð¼ÐµÑ‡ÐµÐ½ Ð»Ð¸ Ð¾Ð½ Ð¸ Ð½Ðµ ÑÐ²ÑÐ·Ð°Ð½ Ð»Ð¸ Ñ Ñ€Ð¸ÑÐºÐ¾Ð²Ñ‹Ð¼ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸ÐµÐ¼.",
      financeTrustTitle: "Ð¢Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ð¾Ðµ Ð´Ð¾Ð²ÐµÑ€Ð¸Ðµ",
      financeTrustText:
        "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°Ð¹Ñ‚Ðµ Ð±Ð¾Ð»ÐµÐµ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ñ‹Ðµ Ð¼ÐµÐ¶Ð´ÑƒÐ½Ð°Ñ€Ð¾Ð´Ð½Ñ‹Ðµ ÑÐ´ÐµÐ»ÐºÐ¸ Ñ Ð¼Ð°ÑˆÐ¸Ð½Ð°Ð¼Ð¸, Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð¾Ð¼, Ð¿Ñ€Ð¸Ñ†ÐµÐ¿Ð°Ð¼Ð¸ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ð¼Ð¸ Ð´Ð²Ð¸Ð¶Ð¸Ð¼Ñ‹Ð¼Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð°Ð¼Ð¸, Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼Ñ‹Ð¼Ð¸ Ð² Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ñ… ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð°Ñ….",
      terminalsTitle: "ÐŸÐ¾Ñ€Ñ‚Ñ‹ Ð¸ Ð»Ð¾Ð³Ð¸ÑÑ‚Ð¸Ñ‡ÐµÑÐºÐ¸Ðµ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ñ‹",
      terminalsText:
        "ÐŸÑ€Ð¾Ð²ÐµÑ€ÑÐ¹Ñ‚Ðµ Ð²Ñ…Ð¾Ð´ÑÑ‰ÐµÐµ Ð¸ Ð¸ÑÑ…Ð¾Ð´ÑÑ‰ÐµÐµ Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð² Ñ€ÐµÐ°Ð»ÑŒÐ½Ð¾Ð¼ Ð²Ñ€ÐµÐ¼ÐµÐ½Ð¸. Ð’Ñ‹ÑÐ²Ð»ÑÐ¹Ñ‚Ðµ ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ðµ Ð¸Ð»Ð¸ Ð¿Ð¾Ð¼ÐµÑ‡ÐµÐ½Ð½Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹ Ð´Ð¾ Ñ‚Ð¾Ð³Ð¾, ÐºÐ°Ðº Ð¾Ð½Ð¸ Ð²Ð¾Ð¹Ð´ÑƒÑ‚ Ð½Ð° Ð²Ð°Ñˆ Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð» Ð¸Ð»Ð¸ Ð¿Ð¾ÐºÐ¸Ð½ÑƒÑ‚ ÐµÐ³Ð¾. ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°Ð¹Ñ‚Ðµ Ñ‚Ð°Ð¼Ð¾Ð¶Ð½ÑŽ, Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¸ Ð¸ Ñ‚Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ð¾Ðµ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ðµ.",
      rentalVisibilityTitle: "ÐŸÑ€Ð¾Ð·Ñ€Ð°Ñ‡Ð½Ð¾ÑÑ‚ÑŒ Ð¿Ð°Ñ€ÐºÐ°",
      rentalVisibilityText:
        "Ð¡Ð¾Ñ…Ñ€Ð°Ð½ÑÐ¹Ñ‚Ðµ Ð±Ð¾Ð»ÐµÐµ ÑÑÐ½Ð¾Ðµ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¾Ð± Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ‡Ð½Ð¾ÑÑ‚Ð¸, ÑÑ‚Ð°Ñ‚ÑƒÑÐµ Ð¸ Ñ€Ð¸ÑÐºÐ°Ñ… Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ Ð² Ñ€Ð°Ð·Ð½Ñ‹Ñ… ÑÑ‚Ñ€Ð°Ð½Ð°Ñ… Ð¸ Ð½Ð° Ñ€Ð°Ð·Ð½Ñ‹Ñ… Ð¿Ð»Ð¾Ñ‰Ð°Ð´ÐºÐ°Ñ….",
      rentalPreventionTitle: "ÐŸÑ€ÐµÐ´Ð¾Ñ‚Ð²Ñ€Ð°Ñ‰ÐµÐ½Ð¸Ðµ ÐºÑ€Ð°Ð¶",
      rentalPreventionText:
        "ÐžÐ±ÐµÑÐ¿ÐµÑ‡ÑŒÑ‚Ðµ Ð±Ð¾Ð»ÐµÐµ Ð±Ñ‹ÑÑ‚Ñ€Ð¾Ðµ Ð²Ñ‹ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ñ„Ð»Ð°Ð³Ð° Ð¸ Ð±Ð¾Ð»ÐµÐµ ÑÐ¸Ð»ÑŒÐ½ÑƒÑŽ Ð·Ð°Ñ‰Ð¸Ñ‚Ñƒ Ð¾Ñ‚ Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð° Ð²Ð¾ÐºÑ€ÑƒÐ³ ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ñ…, Ð¿Ñ€Ð¾Ð¿Ð°Ð²ÑˆÐ¸Ñ… Ð¸Ð»Ð¸ Ð½ÐµÐ·Ð°ÐºÐ¾Ð½Ð½Ð¾ Ð¿ÐµÑ€ÐµÐ¿Ñ€Ð¾Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð².",
      rentalOriginTitle: "ÐŸÐ¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ",
      rentalOriginText:
        "Ð£ÐºÑ€ÐµÐ¿Ð»ÑÐ¹Ñ‚Ðµ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð°Ð²Ð° ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸ Ð¸ Ð´Ð¾Ð²ÐµÑ€Ð¸Ðµ Ð´Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ¾Ð², Ð¿Ð¾ÐºÑƒÐ¿Ð°Ñ‚ÐµÐ»ÐµÐ¹, Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€Ð¾Ð² Ð¸ Ñ‚Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ñ‹Ñ… ÑƒÑ‡Ð°ÑÑ‚Ð½Ð¸ÐºÐ¾Ð².",
      terminalsEntryTitle: "ÐšÐ¾Ð½Ñ‚Ñ€Ð¾Ð»ÑŒ Ð²ÑŠÐµÐ·Ð´Ð° Ð¸ Ð²Ñ‹ÐµÐ·Ð´Ð°",
      terminalsEntryText:
        "Ð”Ð¾Ð±Ð°Ð²ÑŒÑ‚Ðµ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ð¹ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð´Ð¾ Ñ‚Ð¾Ð³Ð¾, ÐºÐ°Ðº Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð²Ð¾Ð¹Ð´Ñ‘Ñ‚ Ð² Ð·Ð°Ñ‰Ð¸Ñ‰Ñ‘Ð½Ð½Ñ‹Ðµ Ð¾Ð¿ÐµÑ€Ð°Ñ†Ð¸Ð¾Ð½Ð½Ñ‹Ðµ Ð·Ð¾Ð½Ñ‹ Ð¸Ð»Ð¸ Ð¿Ð¾ÐºÐ¸Ð½ÐµÑ‚ Ð¸Ñ….",
      terminalsCustomsTitle: "Ð¢Ð°Ð¼Ð¾Ð¶Ð½Ñ Ð¸ Ð¸Ð½ÑÐ¿ÐµÐºÑ†Ð¸Ð¸",
      terminalsCustomsText:
        "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°Ð¹Ñ‚Ðµ Ñ‚Ð°Ð¼Ð¾Ð¶ÐµÐ½Ð½Ñ‹Ðµ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸, Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸ Ð¸ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÑ‹ ÐºÐ¾Ð¼Ð¿Ð»Ð°ÐµÐ½ÑÐ° Ð·Ð° ÑÑ‡Ñ‘Ñ‚ Ð±Ð¾Ð»ÐµÐµ ÑÐ¸Ð»ÑŒÐ½Ð¾Ð¹ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð² Ð¸ Ð²Ð¸Ð´Ð¸Ð¼Ð¾ÑÑ‚Ð¸ Ñ€Ð¸ÑÐºÐ¾Ð².",
      ctaText:
        "EquipRegistry ÑÐ¾Ð·Ð´Ð°Ð½ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ¸ Ð½Ð°Ð´Ñ‘Ð¶Ð½Ñ‹Ñ… Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€Ð¾Ð² Ð² ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ñ…, Ð°Ñ€ÐµÐ½Ð´Ð½Ñ‹Ñ…, Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ñ…, Ð»Ð¾Ð³Ð¸ÑÑ‚Ð¸Ñ‡ÐµÑÐºÐ¸Ñ… Ð¸ Ð²Ð¾ÑÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ñ… Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐ°Ñ….",
    },
    contact: {
      title: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚",
      subtitle:
        "Ð¡Ð²ÑÐ¶Ð¸Ñ‚ÐµÑÑŒ Ñ Ð½Ð°Ð¼Ð¸ Ð¿Ð¾ Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ°Ð¼ Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€ÑÑ‚Ð²Ð°, ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ñ… ÑÑ†ÐµÐ½Ð°Ñ€Ð¸ÐµÐ², Ð¿Ð¸Ð»Ð¾Ñ‚Ð½Ñ‹Ñ… Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð¾Ð² Ð¸Ð»Ð¸ ÑÑ‚Ñ€Ð°Ñ‚ÐµÐ³Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ ÑÐ¾Ñ‚Ñ€ÑƒÐ´Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð°.",
      generalTitle: "ÐžÐ±Ñ‰Ð¸Ðµ Ð²Ð¾Ð¿Ñ€Ð¾ÑÑ‹",
      generalText:
        "Ð”Ð»Ñ Ð¾Ð±Ñ‰Ð¸Ñ… Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ¾Ð² Ð¾Ð± EquipRegistry, Ð¿Ð»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ðµ, Ð¿ÑƒÐ±Ð»Ð¸Ñ‡Ð½Ð¾Ð¹ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐµ Ð¸Ð»Ð¸ Ð¾ Ñ‚Ð¾Ð¼, ÐºÐ°Ðº Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚ Ñ€ÐµÐµÑÑ‚Ñ€.",
      businessTitle: "Ð‘Ð¸Ð·Ð½ÐµÑ Ð¸ Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€ÑÑ‚Ð²Ð°",
      businessText:
        "Ð”Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ñ… ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¹, Ð°Ñ€ÐµÐ½Ð´Ð½Ñ‹Ñ… ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¹, Ð±Ð°Ð½ÐºÐ¾Ð², Ñ‚ÐµÑ€Ð¼Ð¸Ð½Ð°Ð»Ð¾Ð² Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ñ… Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ð¹, Ð·Ð°Ð¸Ð½Ñ‚ÐµÑ€ÐµÑÐ¾Ð²Ð°Ð½Ð½Ñ‹Ñ… Ð² ÑÐ¾Ñ‚Ñ€ÑƒÐ´Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ðµ, Ð¿Ð¸Ð»Ð¾Ñ‚Ð½Ñ‹Ñ… Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°Ñ… Ð¸Ð»Ð¸ Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ð¸.",
      supportTitle: "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°",
      supportText:
        "Ð”Ð»Ñ Ð¿Ð¾Ð¼Ð¾Ñ‰Ð¸ Ð¿Ð¾ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÐ¼, Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚Ð°Ð¼ Ñ€ÐµÐµÑÑ‚Ñ€Ð°, Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹Ð¼ Ð´Ð°Ð½Ð½Ñ‹Ð¼ Ð¸Ð»Ð¸ Ð²Ð¾Ð¿Ñ€Ð¾ÑÐ°Ð¼, ÑÐ²ÑÐ·Ð°Ð½Ð½Ñ‹Ð¼ Ñ Ð¿Ð»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ð¾Ð¹.",
      emailLabel: "Ð­Ð»ÐµÐºÑ‚Ñ€Ð¾Ð½Ð½Ð°Ñ Ð¿Ð¾Ñ‡Ñ‚Ð°",
      formTitle: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð½Ð°Ñ Ñ„Ð¾Ñ€Ð¼Ð°",
      formIntro:
        "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ñ‹Ð¹ Ñ‚Ð¸Ð¿ Ð¾Ð±Ñ€Ð°Ñ‰ÐµÐ½Ð¸Ñ, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð²Ð°ÑˆÐµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ ÑÑ€Ð°Ð·Ñƒ Ð¿Ð¾Ð¿Ð°Ð»Ð¾ Ð² Ð½ÑƒÐ¶Ð½Ñ‹Ð¹ Ð¿Ð¾Ñ‡Ñ‚Ð¾Ð²Ñ‹Ð¹ ÑÑ‰Ð¸Ðº EquipRegistry.",
      typeLabel: "Ð¢Ð¸Ð¿ Ð¾Ð±Ñ€Ð°Ñ‰ÐµÐ½Ð¸Ñ",
      typeGeneral: "ÐžÐ±Ñ‰Ð¸Ð¹ Ð²Ð¾Ð¿Ñ€Ð¾Ñ",
      typeBusiness: "Ð‘Ð¸Ð·Ð½ÐµÑ / ÐŸÐ°Ñ€Ñ‚Ð½Ñ‘Ñ€ÑÑ‚Ð²Ð°",
      typeSupport: "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ°",
      namePlaceholder: "Ð’Ð°ÑˆÐµ Ð¸Ð¼Ñ",
      emailPlaceholder: "Ð’Ð°Ñˆ email",
      subjectPlaceholder: "Ð¢ÐµÐ¼Ð°",
      messagePlaceholder: "Ð’Ð°ÑˆÐµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ",
      sendButton: "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ",
      sendingButton: "ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ°...",
      successMessage: "Ð’Ð°ÑˆÐµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ ÑƒÑÐ¿ÐµÑˆÐ½Ð¾ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾.",
      errorMessage: "ÐŸÑ€Ð¾Ð¸Ð·Ð¾ÑˆÐ»Ð° Ð¾ÑˆÐ¸Ð±ÐºÐ° Ð¿Ñ€Ð¸ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ.",
    },
    disclaimer: {
      title: "ÐžÑ‚ÐºÐ°Ð· Ð¾Ñ‚ Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸",
      intro:
        "EquipRegistry Ð¿Ñ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÑÐµÑ‚ Ñ†Ð¸Ñ„Ñ€Ð¾Ð²ÑƒÑŽ Ð¸Ð½Ñ„Ñ€Ð°ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ñƒ Ñ€ÐµÐµÑÑ‚Ñ€Ð° Ð´Ð»Ñ Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ñ‹Ñ… ÑÑ€ÐµÐ´ÑÑ‚Ð², Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ, Ð¿Ñ€Ð¸Ñ†ÐµÐ¿Ð¾Ð² Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ñ… Ð´Ð¾Ð¿ÑƒÑÑ‚Ð¸Ð¼Ñ‹Ñ… Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð².",
      liability:
        "EquipRegistry Ð½Ðµ Ð³Ð°Ñ€Ð°Ð½Ñ‚Ð¸Ñ€ÑƒÐµÑ‚ Ñ‚Ð¾Ñ‡Ð½Ð¾ÑÑ‚ÑŒ, Ð¿Ð¾Ð»Ð½Ð¾Ñ‚Ñƒ Ð¸Ð»Ð¸ ÑŽÑ€Ð¸Ð´Ð¸Ñ‡ÐµÑÐºÑƒÑŽ Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ÑÑ‚ÑŒ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð½Ñ‹Ñ…, Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÐ¼Ñ‹Ñ… Ð¸Ð»Ð¸ Ð¸Ð¼Ð¿Ð¾Ñ€Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ…. Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¿Ð»Ð°Ñ‚Ñ„Ð¾Ñ€Ð¼Ñ‹ Ð¾ÑÑƒÑ‰ÐµÑÑ‚Ð²Ð»ÑÐµÑ‚ÑÑ Ð½Ð° Ð²Ð°Ñˆ ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð½Ñ‹Ð¹ Ñ€Ð¸ÑÐº.",
      data:
        "Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð¼Ð¾Ð³ÑƒÑ‚ Ð¿Ñ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÑÑ‚ÑŒÑÑ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑÐ¼Ð¸, Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€Ð°Ð¼Ð¸, ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ°Ð¼Ð¸, Ð¾Ñ€Ð³Ð°Ð½Ð°Ð¼Ð¸ Ð²Ð»Ð°ÑÑ‚Ð¸, Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ð¼Ð¸ ÑƒÑ‡Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸ÑÐ¼Ð¸ Ð¸ Ð±ÑƒÐ´ÑƒÑ‰Ð¸Ð¼Ð¸ Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¼Ð¸ ÑÐ¸ÑÑ‚ÐµÐ¼Ð°Ð¼Ð¸.",
      future:
        "Ð‘ÑƒÐ´ÑƒÑ‰Ð¸Ðµ Ð¸Ð½Ñ‚ÐµÐ³Ñ€Ð°Ñ†Ð¸Ð¸ Ð¼Ð¾Ð³ÑƒÑ‚ Ð²ÐºÐ»ÑŽÑ‡Ð°Ñ‚ÑŒ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ðµ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸, Ð¿Ñ€Ð°Ð²Ð¾Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð¾Ñ€Ð³Ð°Ð½Ñ‹, Ñ‚Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ñ‹Ðµ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÑ‹, Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡Ñƒ ÑÐ¾Ð±ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸, Ð¿Ð»Ð°Ñ‚Ñ‘Ð¶Ð½Ñ‹Ðµ ÑÐ¸ÑÑ‚ÐµÐ¼Ñ‹ Ð¸ ÑƒÑ€Ð¾Ð²Ð½Ð¸ Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ð¸.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Проверьте происхождение, статус и риски транспортных средств и оборудования по всему миру",
    subtitle:
      "Используйте VIN, серийные номера и идентификаторы реестра, чтобы проверять происхождение, текущий статус и сигналы риска до покупки, финансирования, страхования, аренды или передачи.",
    placeholder: "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ VIN, ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ð¸Ð»Ð¸ ID Ñ€ÐµÐµÑÑ‚Ñ€Ð°",
    search: "ÐŸÐ¾Ð¸ÑÐº",
    demoSerials: "Ð”ÐµÐ¼Ð¾-ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ðµ Ð½Ð¾Ð¼ÐµÑ€Ð°:",
    loggedInMessage:
      "Ð’Ñ‹ Ð²Ð¾ÑˆÐ»Ð¸ Ð² ÑÐ¸ÑÑ‚ÐµÐ¼Ñƒ. Ð’Ñ‹ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒÑÑ Ð¿Ð¾Ð¸ÑÐºÐ¾Ð¼ ÐºÐ°Ðº Ð¾Ð±Ñ‹Ñ‡Ð½Ð¾ Ð¸ Ð¿Ð¾Ð»ÑƒÑ‡Ð°Ñ‚ÑŒ Ð´Ð¾ÑÑ‚ÑƒÐ¿ Ðº Ð¿Ñ€Ð¸Ð²Ð°Ñ‚Ð½Ñ‹Ð¼ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚Ð°Ð¼.",
    goToDashboard: "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ð² Ð¿Ð°Ð½ÐµÐ»ÑŒ",
    supportedAssetsTitle: "ÐŸÐ¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÐµÐ¼Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹",
    supportedAssetsItems: [
      "Ð¢Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ñ‹Ðµ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð° (Ð°Ð²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð»Ð¸, Ð³Ñ€ÑƒÐ·Ð¾Ð²Ð¸ÐºÐ¸ Ð¸ ÐºÐ»Ð°ÑÑÐ¸Ñ‡ÐµÑÐºÐ¸Ðµ Ð°Ð²Ñ‚Ð¾Ð¼Ð¾Ð±Ð¸Ð»Ð¸)",
      "ÐžÐ±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¸ Ñ‚ÐµÑ…Ð½Ð¸ÐºÐ°",
      "Ð’ÐµÐ»Ð¾ÑÐ¸Ð¿ÐµÐ´Ñ‹ Ð¸ Ð»Ñ‘Ð³ÐºÐ°Ñ Ð¼Ð¾Ð±Ð¸Ð»ÑŒÐ½Ð¾ÑÑ‚ÑŒ",
    ],
  },
  result: {
    whyThisMatters: "ÐŸÐ¾Ñ‡ÐµÐ¼Ñƒ ÑÑ‚Ð¾ Ð²Ð°Ð¶Ð½Ð¾",
  },
  howItWorks: {
    title: "ÐšÐ°Ðº Ñ€Ð°Ð±Ð¾Ñ‚Ð°ÐµÑ‚ EquipRegistry",
    step1Title: "1. ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ",
    step1Text:
      "Ð’Ð²ÐµÐ´Ð¸Ñ‚Ðµ VIN, ÑÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€ Ð¸Ð»Ð¸ ID Ñ€ÐµÐµÑÑ‚Ñ€Ð°, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¼Ð³Ð½Ð¾Ð²ÐµÐ½Ð½Ð¾ Ð¿Ñ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚ÑƒÑ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸.",
    step2Title: "2. ÐŸÐ¾Ð´Ñ‚Ð²ÐµÑ€Ð´Ð¸Ñ‚ÑŒ",
    step2Text:
      "ÐŸÑ€Ð¾ÑÐ¼Ð¾Ñ‚Ñ€Ð¸Ñ‚Ðµ Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑŽ Ð²Ð»Ð°Ð´ÐµÐ½Ð¸Ñ, Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹ Ð¸ ÑƒÑ€Ð¾Ð²ÐµÐ½ÑŒ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸, ÐµÑÐ»Ð¸ Ð¾Ð½Ð¸ Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹.",
    step3Title: "3. Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ",
    step3Text:
      "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€ÑƒÐ¹Ñ‚Ðµ Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ñ‹Ðµ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð°, Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¸Ð»Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ðµ Ð°ÐºÑ‚Ð¸Ð²Ñ‹ Ð¸ Ð´Ð¾Ð±Ð°Ð²ÑŒÑ‚Ðµ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´Ð°ÑŽÑ‰Ð¸Ðµ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹.",
    step4Title: "4. Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÑŒ",
    step4Text:
      "Ð˜ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐ¹Ñ‚Ðµ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚ Ñ€ÐµÐµÑÑ‚Ñ€Ð° Ð´Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ð°Ð½Ð¸Ñ, Ð°Ñ€ÐµÐ½Ð´Ñ‹, Ð¿ÐµÑ€ÐµÐ¿Ñ€Ð¾Ð´Ð°Ð¶Ð¸, Ð²Ð¾Ð·Ð²Ñ€Ð°Ñ‚Ð° Ð¸Ð»Ð¸ ÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸ÑÐ¼.",
  },
  trust: {
    title: "Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¾ Ð´Ð»Ñ Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ Ð² Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ð¾Ð¼ Ð¼Ð°ÑÑˆÑ‚Ð°Ð±Ðµ",
    subtitle:
      "EquipRegistry Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð½ ÐºÐ°Ðº Ð½ÐµÐ¹Ñ‚Ñ€Ð°Ð»ÑŒÐ½Ð°Ñ Ð¸Ð½Ñ„Ñ€Ð°ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð° Ð´Ð»Ñ Ñ‚Ñ€Ð°Ð½ÑÐ¿Ð¾Ñ€Ñ‚Ð½Ñ‹Ñ… ÑÑ€ÐµÐ´ÑÑ‚Ð², Ð¾Ð±Ð¾Ñ€ÑƒÐ´Ð¾Ð²Ð°Ð½Ð¸Ñ Ð¸ Ð´Ñ€ÑƒÐ³Ð¸Ñ… Ñ†ÐµÐ½Ð½Ñ‹Ñ… Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð², Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‰Ð¸ÐºÐ¾Ð², Ð°Ñ€ÐµÐ½Ð´Ð½Ñ‹Ðµ ÐºÐ¾Ð¼Ð¿Ð°Ð½Ð¸Ð¸, Ð¿Ñ€Ð¾Ñ„ÐµÑÑÐ¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð²Ð»Ð°Ð´ÐµÐ»ÑŒÑ†ÐµÐ² Ð¸ Ñ‚Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ñ‹Ðµ ÑÐ´ÐµÐ»ÐºÐ¸.",
    card1Title: "Ð“Ð¾Ñ‚Ð¾Ð²Ð¾ Ð´Ð»Ñ ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ð°Ð½Ð¸Ñ",
    card1Text:
      "Ð¡Ñ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾ Ð´Ð»Ñ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶ÐºÐ¸ Ð°Ð½Ð´ÐµÑ€Ñ€Ð°Ð¹Ñ‚Ð¸Ð½Ð³Ð°, Ñ†Ð¸ÐºÐ»Ð¾Ð² Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ð¸ Ð¸ Ñ€ÐµÑˆÐµÐ½Ð¸Ð¹, Ð¾ÑÐ½Ð¾Ð²Ð°Ð½Ð½Ñ‹Ñ… Ð½Ð° Ñ€Ð¸ÑÐºÐµ.",
    card2Title: "ÐÐµÐ·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾ Ð¸ Ð½ÐµÐ¹Ñ‚Ñ€Ð°Ð»ÑŒÐ½Ð¾",
    card2Text:
      "ÐÐµ ÑÐ²ÑÐ·Ð°Ð½Ð¾ Ñ Ð¿Ñ€Ð¾Ð¸Ð·Ð²Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑÐ¼Ð¸, Ð´Ð¸ÑÑ‚Ñ€Ð¸Ð±ÑŒÑŽÑ‚Ð¾Ñ€Ð°Ð¼Ð¸ Ð¸Ð»Ð¸ ÑŽÑ€Ð¸ÑÐ´Ð¸ÐºÑ†Ð¸ÑÐ¼Ð¸ â€” Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ð¸ÑÑ‚Ð¾Ñ‡Ð½Ð¸Ðº Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ.",
    card3Title: "Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¾ Ð´Ð»Ñ Ð¼Ð°ÑÑˆÑ‚Ð°Ð±Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ",
    card3Text:
      "ÐžÑ‚ Ð¾Ð´Ð½Ð¾Ð³Ð¾ Ð°ÐºÑ‚Ð¸Ð²Ð° Ð´Ð¾ Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð¿Ð°Ñ€ÐºÐ¾Ð² â€” Ð³Ð¾Ñ‚Ð¾Ð²Ð¾ Ðº Ð²Ð½ÐµÐ´Ñ€ÐµÐ½Ð¸ÑŽ Ð² Ñ€Ð°Ð·Ð½Ñ‹Ñ… ÑÑ‚Ñ€Ð°Ð½Ð°Ñ….",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Ñ†Ð¸Ñ„Ñ€Ð¾Ð²Ð°Ñ Ð¸Ð½Ñ„Ñ€Ð°ÑÑ‚Ñ€ÑƒÐºÑ‚ÑƒÑ€Ð° Ð´Ð¾Ð²ÐµÑ€Ð¸Ñ Ð´Ð»Ñ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð²",
    privacy: "ÐŸÐ¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸",
    terms: "Ð£ÑÐ»Ð¾Ð²Ð¸Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ",
    disclaimer: "ÐžÑ‚ÐºÐ°Ð· Ð¾Ñ‚ Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ð¾ÑÑ‚Ð¸",
  },
  statuses: {
    registeredVerified: {
      label: "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾ Ð¸ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¾",
      message:
        "Ð­Ñ‚Ð¾Ñ‚ Ð°ÐºÑ‚Ð¸Ð² Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð² EquipRegistry, Ð¸ ÐµÐ³Ð¾ Ð·Ð°ÐºÐ¾Ð½Ð½Ð¾Ðµ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¾.",
      why:
        "Ð­Ñ‚Ð¾Ñ‚ Ð°ÐºÑ‚Ð¸Ð² Ð¸Ð¼ÐµÐµÑ‚ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´Ñ‘Ð½Ð½Ð¾Ðµ Ð·Ð°ÐºÐ¾Ð½Ð½Ð¾Ðµ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚ Ñ€ÐµÐµÑÑ‚Ñ€Ð°.",
      metadataStatus: "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
      metadataPassport: "ÐŸÐ°ÑÐ¿Ð¾Ñ€Ñ‚ Ñ€ÐµÐµÑÑ‚Ñ€Ð°",
      metadataValidation: "ÐŸÐ¾ÑÐ»ÐµÐ´Ð½ÑÑ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ°",
      actionViewPassport: "ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚",
    },
    historyUnknown: {
      label: "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð½ÐµÐ¸Ð·Ð²ÐµÑÑ‚Ð½Ð°",
      message:
        "Ð­Ñ‚Ð¾Ñ‚ Ð°ÐºÑ‚Ð¸Ð² ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚ Ð² Ñ€ÐµÐµÑÑ‚Ñ€Ðµ, Ð½Ð¾ ÐµÐ³Ð¾ Ð¿Ð¾Ð»Ð½ÑƒÑŽ Ð¸ÑÑ‚Ð¾Ñ€Ð¸ÑŽ Ð²Ð»Ð°Ð´ÐµÐ½Ð¸Ñ Ð½Ðµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð´Ð¸Ñ‚ÑŒ.",
      why:
        "ÐÐµÐ¿Ð¾Ð»Ð½Ð°Ñ Ð¸ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð²Ð»Ð°Ð´ÐµÐ½Ð¸Ñ ÑƒÐ²ÐµÐ»Ð¸Ñ‡Ð¸Ð²Ð°ÐµÑ‚ Ñ€Ð¸ÑÐº Ð¼Ð¾ÑˆÐµÐ½Ð½Ð¸Ñ‡ÐµÑÑ‚Ð²Ð°, ÑÑ‚Ñ€Ð°Ñ…Ð¾Ð²Ñ‹Ñ… Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼ Ð¸ Ð½ÐµÑÐ¾Ð¾Ñ‚Ð²ÐµÑ‚ÑÑ‚Ð²Ð¸Ñ Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð½Ð¸ÑÐ¼.",
      metadataStatus: "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
      metadataRisk: "Ð£Ñ€Ð¾Ð²ÐµÐ½ÑŒ Ñ€Ð¸ÑÐºÐ°",
      actionViewPassport: "ÐžÑ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚ (Ð¾Ð³Ñ€Ð°Ð½Ð¸Ñ‡ÐµÐ½Ð½Ñ‹Ð¹)",
      actionRequestVerification: "Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÑƒ",
      actionRegisterDocuments: "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹",
    },
    stolen: {
      label: "Ð£ÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ð¹ Ð°ÐºÑ‚Ð¸Ð² â€“ ÐšÑ€Ð°ÑÐ½Ñ‹Ð¹ Ñ„Ð»Ð°Ð³",
      message:
        "Ð­Ñ‚Ð¾Ñ‚ Ð°ÐºÑ‚Ð¸Ð² Ð¾Ñ„Ð¸Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾ Ð·Ð°ÑÐ²Ð»ÐµÐ½ ÐºÐ°Ðº ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ð¹ Ð¸ Ð°ÐºÑ‚Ð¸Ð²Ð½Ð¾ Ð²Ð½ÐµÑÑ‘Ð½ Ð² Ñ‡Ñ‘Ñ€Ð½Ñ‹Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº EquipRegistry.",
      warning:
        "ÐÐ• Ð¿Ð¾ÐºÑƒÐ¿Ð°Ð¹Ñ‚Ðµ, ÐÐ• ÑÑ‚Ñ€Ð°Ñ…ÑƒÐ¹Ñ‚Ðµ, ÐÐ• Ð°Ñ€ÐµÐ½Ð´ÑƒÐ¹Ñ‚Ðµ, ÐÐ• Ð¿ÐµÑ€ÐµÐ²Ð¾Ð·Ð¸Ñ‚Ðµ Ð¸ ÐÐ• Ð¿Ñ€Ð¸Ð½Ð¸Ð¼Ð°Ð¹Ñ‚Ðµ Ð¿ÐµÑ€ÐµÐ´Ð°Ñ‡Ñƒ ÑÑ‚Ð¾Ð³Ð¾ Ð°ÐºÑ‚Ð¸Ð²Ð°.",
      why:
        "Ð›ÑŽÐ±Ð°Ñ ÑÐ´ÐµÐ»ÐºÐ° Ñ ÑƒÐºÑ€Ð°Ð´ÐµÐ½Ð½Ñ‹Ð¼ Ð°ÐºÑ‚Ð¸Ð²Ð¾Ð¼ Ð¼Ð¾Ð¶ÐµÑ‚ Ð¿Ñ€Ð¸Ð²ÐµÑÑ‚Ð¸ Ðº ÑŽÑ€Ð¸Ð´Ð¸Ñ‡ÐµÑÐºÐ¸Ð¼ Ð¸ Ñ„Ð¸Ð½Ð°Ð½ÑÐ¾Ð²Ñ‹Ð¼ Ð¿Ð¾ÑÐ»ÐµÐ´ÑÑ‚Ð²Ð¸ÑÐ¼.",
      metadataStatus: "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
      metadataRisk: "Ð£Ñ€Ð¾Ð²ÐµÐ½ÑŒ Ñ€Ð¸ÑÐºÐ°",
      metadataReportedBy: "Ð¡Ð¾Ð¾Ð±Ñ‰Ð¸Ð»",
      metadataJurisdiction: "Ð®Ñ€Ð¸ÑÐ´Ð¸ÐºÑ†Ð¸Ñ",
      metadataReportDate: "Ð”Ð°Ñ‚Ð° ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ",
      actionReportSighting: "Ð¡Ð¾Ð¾Ð±Ñ‰Ð¸Ñ‚ÑŒ Ð¾ Ð½Ð°Ð±Ð»ÑŽÐ´ÐµÐ½Ð¸Ð¸",
      actionContactAuthorities: "Ð¡Ð²ÑÐ·Ð°Ñ‚ÑŒÑÑ Ñ Ð²Ð»Ð°ÑÑ‚ÑÐ¼Ð¸",
      actionVerifyCaseId: "ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ñ‚ÑŒ ID Ð´ÐµÐ»Ð°",
    },
    notRegistered: {
      label: "ÐÐµ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¾",
      message: "Ð­Ñ‚Ð¾Ñ‚ Ð¸Ð´ÐµÐ½Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ‚Ð¾Ñ€ Ð½Ðµ Ð·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½ Ð² EquipRegistry.",
      why:
        "ÐÐµÐ·Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ð¹ Ð°ÐºÑ‚Ð¸Ð² Ð½Ðµ Ð¸Ð¼ÐµÐµÑ‚ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´Ñ‘Ð½Ð½Ð¾Ð¹ Ð¸ÑÑ‚Ð¾Ñ€Ð¸Ð¸ Ð²Ð»Ð°Ð´ÐµÐ½Ð¸Ñ Ð¸ Ð¿Ñ€Ð¾Ð¸ÑÑ…Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ.",
      actionRegister: "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ ÑÑ‚Ð¾Ñ‚ Ð°ÐºÑ‚Ð¸Ð²",
    },
    metadataValues: {
      active: "ÐÐºÑ‚Ð¸Ð²Ð½Ð¾",
      full: "ÐŸÐ¾Ð»Ð½Ñ‹Ð¹",
      lastValidation2025: "2025",
      limitedPassport: "ÐžÐ³Ñ€Ð°Ð½Ð¸Ñ‡ÐµÐ½Ð½Ñ‹Ð¹ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚",
      medium: "Ð¡Ñ€ÐµÐ´Ð½Ð¸Ð¹",
      blacklisted: "Ð’ Ñ‡Ñ‘Ñ€Ð½Ð¾Ð¼ ÑÐ¿Ð¸ÑÐºÐµ",
      high: "Ð’Ñ‹ÑÐ¾ÐºÐ¸Ð¹",
      insurancePartner: "Ð¡Ñ‚Ñ€Ð°Ñ…Ð¾Ð²Ð¾Ð¹ Ð¿Ð°Ñ€Ñ‚Ð½Ñ‘Ñ€",
      euCrossBorderAlert: "Ð•Ð¡ / Ð¢Ñ€Ð°Ð½ÑÐ³Ñ€Ð°Ð½Ð¸Ñ‡Ð½Ð¾Ðµ Ð¿Ñ€ÐµÐ´ÑƒÐ¿Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸Ðµ",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "Ð§ÐµÑ€Ð½Ð¾Ð²Ð¸Ðº",
      incomplete: "ÐÐµÐ¿Ð¾Ð»Ð½Ñ‹Ð¹",
      submitted: "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾",
      underReview: "ÐÐ° Ñ€Ð°ÑÑÐ¼Ð¾Ñ‚Ñ€ÐµÐ½Ð¸Ð¸",
      moreInfoRequired: "Ð¢Ñ€ÐµÐ±ÑƒÐµÑ‚ÑÑ Ð´Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð°Ñ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ",
      approved: "ÐžÐ´Ð¾Ð±Ñ€ÐµÐ½Ð¾",
      rejected: "ÐžÑ‚ÐºÐ»Ð¾Ð½ÐµÐ½Ð¾",
      passportIssued: "ÐŸÐ°ÑÐ¿Ð¾Ñ€Ñ‚ Ð´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½",
      unknown: "ÐÐµÐ¸Ð·Ð²ÐµÑÑ‚Ð½Ð¾",
    },
    registrationDetail: {
      backToAdminRegistrations: "ÐÐ°Ð·Ð°Ð´ Ðº Ð°Ð´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¼ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÐ¼",
      backToRegistrations: "ÐÐ°Ð·Ð°Ð´ Ðº Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑÐ¼",
      adminPaymentConfirmationTitle: "ÐÐ´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¸Ð²Ð½Ð¾Ðµ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ðµ Ð¾Ð¿Ð»Ð°Ñ‚Ñ‹",
      adminPaymentConfirmationDescription:
        "ÐŸÐ¾ÑÐ»Ðµ Ñ€ÑƒÑ‡Ð½Ð¾Ð³Ð¾ Ð¿Ð¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¸Ñ Ð±Ð°Ð½ÐºÐ¾Ð²ÑÐºÐ¾Ð³Ð¾ Ð¿ÐµÑ€ÐµÐ²Ð¾Ð´Ð° Ð¾Ñ‚Ð¼ÐµÑ‚ÑŒÑ‚Ðµ ÑÑ‚Ñƒ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑŽ ÐºÐ°Ðº Ð¾Ð¿Ð»Ð°Ñ‡ÐµÐ½Ð½ÑƒÑŽ.",
      reviewWorkflowTitle: "ÐŸÑ€Ð¾Ñ†ÐµÑÑ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸",
      reviewWorkflowDescription:
        "ÐŸÐµÑ€ÐµÐ²ÐµÐ´Ð¸Ñ‚Ðµ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸ÑŽ Ñ‡ÐµÑ€ÐµÐ· ÑÑ‚Ð°Ð¿Ñ‹ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸, Ð¾Ð´Ð¾Ð±Ñ€ÐµÐ½Ð¸Ñ Ð¸ Ð¾ÐºÐ¾Ð½Ñ‡Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ð¹ Ð²Ñ‹Ð´Ð°Ñ‡Ð¸ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚Ð°.",
      detailsTitle: "Ð”ÐµÑ‚Ð°Ð»Ð¸ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸",
      dynamicFieldsTitle: "Ð”Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð°",
      noAdditionalData: "Ð”Ð¾Ð¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¾Ñ‚ÑÑƒÑ‚ÑÑ‚Ð²ÑƒÑŽÑ‚.",
      paymentCompleted: "Ð—Ð°Ð²ÐµÑ€ÑˆÐµÐ½Ð¾ / ÐŸÐ¾Ð´Ñ‚Ð²ÐµÑ€Ð¶Ð´ÐµÐ½Ð¾",
      paymentPending: "ÐžÐ¶Ð¸Ð´Ð°ÐµÑ‚ÑÑ",
      labels: {
        passportNumber: "ÐÐ¾Ð¼ÐµÑ€ Ð¿Ð°ÑÐ¿Ð¾Ñ€Ñ‚Ð°",
        applicantType: "Ð¢Ð¸Ð¿ Ð·Ð°ÑÐ²Ð¸Ñ‚ÐµÐ»Ñ",
        assetName: "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð°",
        category: "ÐšÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ñ",
        subcategory: "ÐŸÐ¾Ð´ÐºÐ°Ñ‚ÐµÐ³Ð¾Ñ€Ð¸Ñ",
        brand: "Ð‘Ñ€ÐµÐ½Ð´",
        model: "ÐœÐ¾Ð´ÐµÐ»ÑŒ",
        serialNumber: "Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ð¹ Ð½Ð¾Ð¼ÐµÑ€",
        owner: "Ð’Ð»Ð°Ð´ÐµÐ»ÐµÑ†",
        ownerEmail: "Email Ð²Ð»Ð°Ð´ÐµÐ»ÑŒÑ†Ð°",
        created: "Ð¡Ð¾Ð·Ð´Ð°Ð½Ð¾",
        updated: "ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¾",
        payment: "ÐžÐ¿Ð»Ð°Ñ‚Ð°",
        completenessScore: "Ð£Ñ€Ð¾Ð²ÐµÐ½ÑŒ Ð¿Ð¾Ð»Ð½Ð¾Ñ‚Ñ‹",
        solarPanelSerialNumbers: "Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ðµ Ð½Ð¾Ð¼ÐµÑ€Ð° ÑÐ¾Ð»Ð½ÐµÑ‡Ð½Ñ‹Ñ… Ð¿Ð°Ð½ÐµÐ»ÐµÐ¹",
        batterySerialNumbers: "Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ðµ Ð½Ð¾Ð¼ÐµÑ€Ð° Ð±Ð°Ñ‚Ð°Ñ€ÐµÐ¹",
        bikeBatterySerialNumbers: "Ð¡ÐµÑ€Ð¸Ð¹Ð½Ñ‹Ðµ Ð½Ð¾Ð¼ÐµÑ€Ð° Ð²ÐµÐ»Ð¾ÑÐ¸Ð¿ÐµÐ´Ð½Ñ‹Ñ… Ð±Ð°Ñ‚Ð°Ñ€ÐµÐ¹",
        capacity: "ÐÐ¼ÐºÐ¾ÑÑ‚ÑŒ",
        powerRating: "ÐœÐ¾Ñ‰Ð½Ð¾ÑÑ‚ÑŒ",
        batchLotNumber: "ÐÐ¾Ð¼ÐµÑ€ Ð¿Ð°Ñ€Ñ‚Ð¸Ð¸ / Ð»Ð¾Ñ‚Ð°",
        installationLocation: "ÐœÐµÑÑ‚Ð¾ ÑƒÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ¸",
        hoursOfOperation: "Ð§Ð°ÑÑ‹ ÑÐºÑÐ¿Ð»ÑƒÐ°Ñ‚Ð°Ñ†Ð¸Ð¸",
        deviceId: "ID ÑƒÑÑ‚Ñ€Ð¾Ð¹ÑÑ‚Ð²Ð°",
        certification: "Ð¡ÐµÑ€Ñ‚Ð¸Ñ„Ð¸ÐºÐ°Ñ†Ð¸Ñ",
        ownerOrganisation: "ÐžÑ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ñ-Ð²Ð»Ð°Ð´ÐµÐ»ÐµÑ†",
      },
    },
  },
};

const zh: Dictionary = {
  nav: {
    howItWorks: "è¿ä½œæ–¹å¼",
    login: "ç™»å½•",
    dashboard: "æŽ§åˆ¶å°",
    logout: "é€€å‡ºç™»å½•",
    menu: "èœå•",
  },
  menu: {
    home: "é¦–é¡µ",
    verifyAsset: "éªŒè¯èµ„äº§",
    registerAsset: "æ³¨å†Œèµ„äº§",
    pricing: "ä»·æ ¼",
    reportSighting: "æŠ¥å‘Šå‘çŽ°",
    partners: "é¢å‘ä¿é™©å…¬å¸ / åˆä½œä¼™ä¼´",
    contact: "è”ç³»",
  },
  common: {
    goToHomepageSearch: "å‰å¾€é¦–é¡µæœç´¢",
    publicVerification: "å…¬å¼€éªŒè¯",
    whySightingsMatter: "ä¸ºä»€ä¹ˆå‘çŽ°æŠ¥å‘Šå¾ˆé‡è¦",
    contactEquipRegistry: "è”ç³» EquipRegistry",
    print: "æ‰“å°",
    downloadPdf: "ä¸‹è½½ PDF",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "æ³¨å†Œè¯·æ±‚",
        newRegistration: "æ–°å»ºæ³¨å†Œ",
      },
    },
    verify: {
      title: "éªŒè¯èµ„äº§",
      subtitle:
        "æœç´¢åºåˆ—å·ï¼Œæ£€æŸ¥è®¾å¤‡æ˜¯å¦å·²æ³¨å†Œã€å·²éªŒè¯ã€è¢«æ ‡è®°æˆ–åŽ†å²æœªçŸ¥ã€‚",
      introTitle: "å…¬å¼€éªŒè¯",
      introText:
        "è¯¥é¡µé¢å°†æˆä¸ºä¸“é—¨çš„å…¬å¼€éªŒè¯è·¯ç”±ã€‚ç›®å‰ï¼Œå®žæ—¶æœç´¢ä½“éªŒä»ä¿ç•™åœ¨é¦–é¡µã€‚",
    },
    register: {
      title: "æ³¨å†Œèµ„äº§",
      subtitle:
        "å¼€å§‹è®¾å¤‡ã€è½¦è¾†æˆ–æ‹–è½¦çš„æ³¨å†Œæµç¨‹ï¼Œå¹¶ä¸ºè¯¥èµ„äº§å‡†å¤‡æ•°å­—æ³¨å†ŒæŠ¤ç…§ã€‚",
      vehicleTitle: "è½¦è¾†",
      vehicleText:
        "æ±½è½¦ã€å¡è½¦ã€åŽ¢å¼è½¦ã€æˆ¿è½¦åŠå…¶ä»–å¸¦æœ‰ VIN æˆ–åºåˆ—å·å‚è€ƒçš„é“è·¯èµ„äº§ã€‚",
      equipmentTitle: "è®¾å¤‡",
      equipmentText:
        "å…·æœ‰æœºå™¨åºåˆ—å·çš„å»ºç­‘ã€å†œä¸šã€å·¥ä¸šå’Œç§Ÿèµè®¾å¤‡ã€‚",
      trailerTitle: "æ‹–è½¦",
      trailerText:
        "éœ€è¦èº«ä»½ã€æ¥æºå’Œä¿¡ä»»å¯è§æ€§çš„æ‹–è½¦åŠè¢«ç‰µå¼•èµ„äº§ã€‚",
    },
    reportSighting: {
      title: "æŠ¥å‘Šå‘çŽ°",
      subtitle:
        "æŠ¥å‘Šè¢«æ ‡è®°æˆ–è¢«ç›—è®¾å¤‡çš„å‘çŽ°æƒ…å†µï¼Œå¸®åŠ©æå‡è·¨å¢ƒå¯è§æ€§ã€‚",
      introTitle: "ä¸ºä»€ä¹ˆå‘çŽ°æŠ¥å‘Šå¾ˆé‡è¦",
      introText:
        "å…¬å¼€çš„å‘çŽ°æŠ¥å‘Šå¯ä»¥å¸®åŠ©ä¿é™©å…¬å¸ã€ä¸»ç®¡éƒ¨é—¨å’Œåˆæ³•æ‰€æœ‰è€…åœ¨è®¾å¤‡è¢«æ ‡è®°ã€è¢«ç›—æˆ–å¤„äºŽè°ƒæŸ¥ä¸­æ—¶æ›´å¿«é‡‡å–è¡ŒåŠ¨ã€‚",
    },
    partners: {
      title: "é¢å‘ä¿é™©å…¬å¸ / åˆä½œä¼™ä¼´",
      subtitle:
        "EquipRegistry è¢«è®¾è®¡ä¸ºä¿é™©å…¬å¸ã€ç§Ÿèµå…¬å¸ã€é‡‘èžæœºæž„å’Œç‰©æµç å¤´çš„ä¿¡ä»»å±‚ã€‚",
      insurersTitle: "ä¿é™©å…¬å¸",
      insurersText:
        "æå‡æ‰¿ä¿è´¨é‡ï¼Œå‡å°‘æ¬ºè¯ˆï¼ŒåŠ å¿«è¿½å›žæµç¨‹ã€‚EquipRegistry å¯å®žæ—¶éªŒè¯æ‰€æœ‰æƒã€èµ„äº§åŽ†å²å’Œé£Žé™©çŠ¶æ€ã€‚å³æ—¶è¯†åˆ«è¢«ç›—èµ„äº§ï¼Œé˜²æ­¢æ¬ºè¯ˆè®¾å¤‡äº§ç”Ÿç†èµ”ã€‚",
      rentalTitle: "ç§Ÿèµå…¬å¸",
      rentalText:
        "èŽ·å¾—è·¨å¢ƒè½¦é˜Ÿå’Œè®¾å¤‡çš„å®Œæ•´å¯è§†åŒ–ã€‚é˜²æ­¢æ¬ºè¯ˆã€æ ¸éªŒå®¢æˆ·ï¼Œå¹¶ä¿æŠ¤èµ„äº§å…å—ç›—çªƒã€é‡å¤æ³¨å†Œå’Œéžæ³•è½¬å”®ã€‚",
      financeTitle: "é“¶è¡Œä¸Žé‡‘èžæœºæž„",
      financeText:
        "é˜²æ­¢é‡å¤èžèµ„å’Œèµ„äº§æ¬ºè¯ˆã€‚EquipRegistry å…è®¸è´·æ¬¾æ–¹æ ¸å®žæŸé¡¹èµ„äº§æ˜¯å¦å·²è¢«èžèµ„ã€æ³¨å†Œæˆ–æ ‡è®°ã€‚é™ä½Žç§Ÿèµå’Œèµ„äº§èžèµ„ç»“æž„ä¸­çš„é£Žé™©ã€‚",
      financeRiskTitle: "é‡å¤èžèµ„é£Žé™©",
      financeRiskText:
        "åŒä¸€èµ„äº§å¯èƒ½åœ¨ä¸åŒæœºæž„æˆ–ä¸åŒå›½å®¶è¢«å¤šæ¬¡ç”¨ä½œæŠµæŠ¼ã€‚å¦‚æžœæ²¡æœ‰å…±äº«çš„ä¿¡ä»»å±‚ï¼Œå°±ä¼šå¸¦æ¥éšè—æ•žå£ã€æ¬ºè¯ˆé£Žé™©å’Œæ½œåœ¨è´¢åŠ¡æŸå¤±ã€‚",
      financeVerificationTitle: "èžèµ„å‰æ ¸éªŒ",
      financeVerificationText:
        "åœ¨æ‰¹å‡†ç§Ÿèµæˆ–è´·æ¬¾ä¹‹å‰ï¼Œç¡®è®¤èµ„äº§æ˜¯å¦å·²ç»ç™»è®°ã€èžèµ„ã€è¢«æ ‡è®°ï¼Œæˆ–ä¸ŽæŸä¸ªé£Žé™©äº‹ä»¶æœ‰å…³ã€‚",
      financeTrustTitle: "è·¨å¢ƒä¿¡ä»»",
      financeTrustText:
        "ä¸ºèžèµ„ç»“æž„ä¸­ä½¿ç”¨çš„æœºæ¢°ã€è½¦è¾†ã€æ‹–è½¦åŠå…¶ä»–å¯ç§»åŠ¨èµ„äº§æä¾›æ›´å®‰å…¨çš„å›½é™…äº¤æ˜“æ”¯æŒã€‚",
      terminalsTitle: "æ¸¯å£ä¸Žç‰©æµç å¤´",
      terminalsText:
        "å®žæ—¶æ ¸éªŒè¿›å‡ºè®¾å¤‡ã€‚åœ¨èµ„äº§è¿›å‡ºç å¤´ä¹‹å‰è¯†åˆ«è¢«ç›—æˆ–è¢«æ ‡è®°çš„èµ„äº§ã€‚æ”¯æŒæµ·å…³ã€æ£€æŸ¥å’Œè·¨å¢ƒåˆè§„ã€‚",
      rentalVisibilityTitle: "è½¦é˜Ÿå¯è§†æ€§",
      rentalVisibilityText:
        "æ›´æ¸…æ™°åœ°æŽŒæ¡è®¾å¤‡åœ¨å¤šä¸ªå›½å®¶å’Œè¿è¥åœ°ç‚¹çš„èº«ä»½ã€çŠ¶æ€å’Œé£Žé™©ã€‚",
      rentalPreventionTitle: "é˜²ç›—é˜²è¯ˆ",
      rentalPreventionText:
        "ä¸ºè¢«ç›—ã€ä¸¢å¤±æˆ–è¢«éžæ³•è½¬å”®çš„èµ„äº§æä¾›æ›´å¿«çš„æ ‡è®°èƒ½åŠ›å’Œæ›´å¼ºçš„æ¬ºè¯ˆé˜²èŒƒã€‚",
      rentalOriginTitle: "æ¥æºè¯æ˜Ž",
      rentalOriginText:
        "åŠ å¼ºé¢å‘ä¿é™©å…¬å¸ã€ä¹°æ–¹ã€åˆä½œä¼™ä¼´å’Œè·¨å¢ƒç›¸å…³æ–¹çš„æ‰€æœ‰æƒè¯æ˜Žä¸Žä¿¡ä»»ã€‚",
      terminalsEntryTitle: "è¿›å‡ºæŽ§åˆ¶",
      terminalsEntryText:
        "åœ¨è®¾å¤‡è¿›å…¥æˆ–ç¦»å¼€å—ä¿æŠ¤çš„ä½œä¸šåŒºåŸŸä¹‹å‰ï¼Œå¢žåŠ ä¸€å±‚é¢å¤–çš„æ ¸éªŒã€‚",
      terminalsCustomsTitle: "æµ·å…³ä¸Žæ£€æŸ¥",
      terminalsCustomsText:
        "é€šè¿‡æ›´å¼ºçš„èµ„äº§è¯†åˆ«å’Œé£Žé™©å¯è§æ€§ï¼Œæ”¯æŒæµ·å…³ã€ç å¤´æ£€æŸ¥å’Œåˆè§„æµç¨‹ã€‚",
      ctaText:
        "EquipRegistry æ—¨åœ¨ä¸ºä¿é™©ã€ç§Ÿèµã€èžèµ„ã€ç‰©æµå’Œè¿½å›žæµç¨‹ä¸­çš„å¯ä¿¡åˆä½œä¼™ä¼´æä¾›æ”¯æŒã€‚",
    },
    contact: {
      title: "è”ç³»",
      subtitle:
        "å¦‚éœ€æ´½è°ˆåˆä½œã€ä¿é™©ä½¿ç”¨åœºæ™¯ã€è¯•ç‚¹é¡¹ç›®æˆ–æˆ˜ç•¥åˆä½œï¼Œè¯·ä¸Žæˆ‘ä»¬è”ç³»ã€‚",
      generalTitle: "ä¸€èˆ¬å’¨è¯¢",
      generalText:
        "å¦‚éœ€äº†è§£ EquipRegistryã€å¹³å°ã€å…¬å¼€éªŒè¯æˆ–æ³¨å†Œç³»ç»Ÿå¦‚ä½•è¿ä½œçš„ä¸€èˆ¬é—®é¢˜ï¼Œè¯·é€šè¿‡è¿™é‡Œè”ç³»ã€‚",
      businessTitle: "å•†åŠ¡ä¸Žåˆä½œ",
      businessText:
        "é€‚ç”¨äºŽä¿é™©å…¬å¸ã€ç§Ÿèµå…¬å¸ã€é“¶è¡Œã€ç å¤´åŠå…¶ä»–æœ‰æ„å¼€å±•åˆä½œã€è¯•ç‚¹é¡¹ç›®æˆ–ç³»ç»Ÿé›†æˆçš„æœºæž„ã€‚",
      supportTitle: "æ”¯æŒ",
      supportText:
        "å¦‚éœ€æ³¨å†Œã€æ³¨å†ŒæŠ¤ç…§ã€å·²æäº¤æ•°æ®æˆ–å¹³å°ç›¸å…³é—®é¢˜çš„å¸®åŠ©ï¼Œè¯·é€šè¿‡è¿™é‡Œè”ç³»ã€‚",
      emailLabel: "ç”µå­é‚®ç®±",
      formTitle: "è”ç³»è¡¨å•",
      formIntro:
        "è¯·é€‰æ‹©æ­£ç¡®çš„è”ç³»ç±»åž‹ï¼Œä»¥ä¾¿æ‚¨çš„æ¶ˆæ¯ç›´æŽ¥å‘é€åˆ° EquipRegistry çš„å¯¹åº”é‚®ç®±ã€‚",
      typeLabel: "è”ç³»ç±»åž‹",
      typeGeneral: "ä¸€èˆ¬å’¨è¯¢",
      typeBusiness: "å•†åŠ¡ / åˆä½œ",
      typeSupport: "æ”¯æŒ",
      namePlaceholder: "æ‚¨çš„å§“å",
      emailPlaceholder: "æ‚¨çš„ç”µå­é‚®ç®±",
      subjectPlaceholder: "ä¸»é¢˜",
      messagePlaceholder: "æ‚¨çš„ç•™è¨€",
      sendButton: "å‘é€æ¶ˆæ¯",
      sendingButton: "å‘é€ä¸­...",
      successMessage: "æ‚¨çš„æ¶ˆæ¯å·²æˆåŠŸå‘é€ã€‚",
      errorMessage: "å‘é€æ‚¨çš„æ¶ˆæ¯æ—¶å‡ºçŽ°é”™è¯¯ã€‚",
    },
    disclaimer: {
      title: "å…è´£å£°æ˜Ž",
      intro:
        "EquipRegistry ä¸ºè½¦è¾†ã€è®¾å¤‡ã€æ‹–è½¦åŠå…¶ä»–ç¬¦åˆæ¡ä»¶çš„èµ„äº§æä¾›æ•°å­—æ³¨å†ŒåŸºç¡€è®¾æ–½ã€‚",
      liability:
        "EquipRegistry ä¸ä¿è¯æäº¤ã€å±•ç¤ºæˆ–å¯¼å…¥æ•°æ®çš„å‡†ç¡®æ€§ã€å®Œæ•´æ€§æˆ–æ³•å¾‹æœ‰æ•ˆæ€§ã€‚ç”¨æˆ·ä½¿ç”¨æœ¬å¹³å°é¡»è‡ªè¡Œæ‰¿æ‹…é£Žé™©ã€‚",
      data:
        "æ•°æ®å¯èƒ½ç”±ç”¨æˆ·ã€åˆä½œä¼™ä¼´ã€ä¿é™©å…¬å¸ã€ä¸»ç®¡æœºæž„ã€é‡‘èžæœºæž„åŠæœªæ¥é›†æˆç³»ç»Ÿæä¾›ã€‚",
      future:
        "æœªæ¥å¯èƒ½é›†æˆä¿é™©æœºæž„ã€æ‰§æ³•éƒ¨é—¨ã€è·¨å¢ƒæµç¨‹ã€æ‰€æœ‰æƒè½¬ç§»ã€æ”¯ä»˜ç³»ç»Ÿå’ŒéªŒè¯å±‚ã€‚",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "在全球范围内核验车辆和设备的来源、状态与风险",
    subtitle:
      "使用 VIN、序列号和登记编号，在购买、融资、保险、租赁或转移前核验来源、当前状态和风险信号。",
    placeholder: "è¾“å…¥ VINã€åºåˆ—å·æˆ–æ³¨å†Œ ID",
    search: "æœç´¢",
    demoSerials: "æ¼”ç¤ºåºåˆ—å·ï¼š",
    loggedInMessage:
      "æ‚¨å·²ç™»å½•ã€‚æ‚¨å¯ä»¥æ­£å¸¸ä½¿ç”¨æœç´¢ï¼Œå¹¶ç»§ç»­è®¿é—®ç§æœ‰æŠ¤ç…§ã€‚",
    goToDashboard: "å‰å¾€ä»ªè¡¨æ¿",
    supportedAssetsTitle: "æ”¯æŒçš„èµ„äº§",
    supportedAssetsItems: [
      "è½¦è¾†ï¼ˆæ±½è½¦ã€å¡è½¦å’Œç»å…¸è½¦è¾†ï¼‰",
      "è®¾å¤‡å’Œæœºæ¢°",
      "è‡ªè¡Œè½¦ä¸Žè½»åž‹å‡ºè¡Œè®¾å¤‡",
    ],
  },
  result: {
    whyThisMatters: "è¿™ä¸ºä»€ä¹ˆé‡è¦",
  },
  howItWorks: {
    title: "EquipRegistry å¦‚ä½•è¿ä½œ",
    step1Title: "1. éªŒè¯",
    step1Text:
      "è¾“å…¥ VINã€åºåˆ—å·æˆ–æ³¨å†Œ IDï¼Œå³å¯ç«‹å³æ£€æŸ¥æ³¨å†ŒçŠ¶æ€ã€‚",
    step2Title: "2. æ ¸å®ž",
    step2Text:
      "åœ¨å¯ç”¨æ—¶æŸ¥çœ‹æ‰€æœ‰æƒåŽ†å²ã€æ–‡ä»¶å’ŒéªŒè¯çº§åˆ«ã€‚",
    step3Title: "3. æ³¨å†Œ",
    step3Text:
      "æ³¨å†Œè½¦è¾†ã€è®¾å¤‡æˆ–å…¶ä»–èµ„äº§ï¼Œå¹¶æ·»åŠ æ”¯æŒæ–‡ä»¶ã€‚",
    step4Title: "4. ä½¿ç”¨",
    step4Text:
      "å°†æ³¨å†ŒæŠ¤ç…§ç”¨äºŽä¿é™©ã€ç§Ÿèµã€è½¬å”®ã€è¿½å›žæˆ–åˆè§„ã€‚",
  },
  trust: {
    title: "ä¸ºå…¨çƒè§„æ¨¡çš„ä¿¡ä»»è€Œæ‰“é€ ",
    subtitle:
      "EquipRegistry è¢«è®¾è®¡ä¸ºè½¦è¾†ã€è®¾å¤‡åŠå…¶ä»–é«˜ä»·å€¼èµ„äº§çš„ä¸­ç«‹åŸºç¡€è®¾æ–½ï¼Œæ”¯æŒä¿é™©å…¬å¸ã€ç§Ÿèµå…¬å¸ã€ä¸“ä¸šæ‰€æœ‰è€…å’Œè·¨å¢ƒäº¤æ˜“ã€‚",
    card1Title: "ä¿é™©å°±ç»ª",
    card1Text:
      "å…¶ç»“æž„å¯æ”¯æŒæ‰¿ä¿ã€éªŒè¯å‘¨æœŸå’ŒåŸºäºŽé£Žé™©çš„å†³ç­–ã€‚",
    card2Title: "ç‹¬ç«‹ä¸”ä¸­ç«‹",
    card2Text:
      "ä¸éš¶å±žäºŽåˆ¶é€ å•†ã€åˆ†é”€å•†æˆ–å¸æ³•è¾–åŒºâ€”â€”å…¨çƒä¿¡ä»»æ¥æºã€‚",
    card3Title: "ä¸ºæ‰©å±•è€Œè®¾è®¡",
    card3Text:
      "ä»Žå•ä¸€èµ„äº§åˆ°å…¨çƒè½¦é˜Ÿï¼Œå·²ä¸ºå¤šå›½é‡‡ç”¨åšå¥½å‡†å¤‡ã€‚",
  },
  footer: {
    copyright: "EquipRegistry â€” èµ„äº§æ•°å­—ä¿¡ä»»åŸºç¡€è®¾æ–½",
    privacy: "éšç§æ”¿ç­–",
    terms: "æ¡æ¬¾ä¸Žæ¡ä»¶",
    disclaimer: "å…è´£å£°æ˜Ž",
  },
  statuses: {
    registeredVerified: {
      label: "å·²æ³¨å†Œå¹¶å·²éªŒè¯",
      message:
        "è¯¥èµ„äº§å·²åœ¨ EquipRegistry ä¸­æ³¨å†Œï¼Œå…¶åˆæ³•æ¥æºå·²è¢«éªŒè¯ã€‚",
      why:
        "è¯¥èµ„äº§æ‹¥æœ‰å·²éªŒè¯çš„åˆæ³•æ¥æºï¼Œå¹¶å…·æœ‰æœ‰æ•ˆçš„æ³¨å†ŒæŠ¤ç…§ã€‚",
      metadataStatus: "çŠ¶æ€",
      metadataPassport: "æ³¨å†ŒæŠ¤ç…§",
      metadataValidation: "æœ€åŽéªŒè¯",
      actionViewPassport: "æŸ¥çœ‹æŠ¤ç…§",
    },
    historyUnknown: {
      label: "åŽ†å²æœªçŸ¥",
      message:
        "è¯¥èµ„äº§å­˜åœ¨äºŽæ³¨å†Œç³»ç»Ÿä¸­ï¼Œä½†å…¶å®Œæ•´æ‰€æœ‰æƒåŽ†å²æ— æ³•è¢«éªŒè¯ã€‚",
      why:
        "ä¸å®Œæ•´çš„æ‰€æœ‰æƒåŽ†å²ä¼šå¢žåŠ æ¬ºè¯ˆã€ä¿é™©å’Œåˆè§„é£Žé™©ã€‚",
      metadataStatus: "çŠ¶æ€",
      metadataRisk: "é£Žé™©çº§åˆ«",
      actionViewPassport: "æŸ¥çœ‹æŠ¤ç…§ï¼ˆæœ‰é™ï¼‰",
      actionRequestVerification: "è¯·æ±‚éªŒè¯",
      actionRegisterDocuments: "ç™»è®°æ–‡ä»¶",
    },
    stolen: {
      label: "è¢«ç›—èµ„äº§ â€“ çº¢è‰²è­¦æŠ¥",
      message:
        "è¯¥èµ„äº§å·²è¢«æ­£å¼æŠ¥å‘Šä¸ºè¢«ç›—ï¼Œå¹¶å·²åœ¨ EquipRegistry ä¸­è¢«ä¸»åŠ¨åˆ—å…¥é»‘åå•ã€‚",
      warning:
        "è¯·å‹¿è´­ä¹°ã€æŠ•ä¿ã€ç§Ÿèµã€è¿è¾“æˆ–æŽ¥å—è¯¥èµ„äº§çš„è½¬è®©ã€‚",
      why:
        "ä»»ä½•æ¶‰åŠè¢«ç›—èµ„äº§çš„äº¤æ˜“éƒ½å¯èƒ½å¯¼è‡´æ³•å¾‹å’Œè´¢åŠ¡åŽæžœã€‚",
      metadataStatus: "çŠ¶æ€",
      metadataRisk: "é£Žé™©çº§åˆ«",
      metadataReportedBy: "æŠ¥å‘Šæ–¹",
      metadataJurisdiction: "å¸æ³•ç®¡è¾–åŒº",
      metadataReportDate: "æŠ¥å‘Šæ—¥æœŸ",
      actionReportSighting: "æŠ¥å‘Šå‘çŽ°",
      actionContactAuthorities: "è”ç³»æœ‰å…³éƒ¨é—¨",
      actionVerifyCaseId: "éªŒè¯æ¡ˆä»¶ç¼–å·",
    },
    notRegistered: {
      label: "æœªæ³¨å†Œ",
      message: "è¯¥æ ‡è¯†ç¬¦æœªåœ¨ EquipRegistry ä¸­æ³¨å†Œã€‚",
      why:
        "æœªæ³¨å†Œèµ„äº§ç¼ºå°‘å·²éªŒè¯çš„æ‰€æœ‰æƒå’ŒåŽ†å²è®°å½•ã€‚",
      actionRegister: "æ³¨å†Œæ­¤èµ„äº§",
    },
    metadataValues: {
      active: "æœ‰æ•ˆ",
      full: "å®Œæ•´",
      lastValidation2025: "2025",
      limitedPassport: "æœ‰é™æŠ¤ç…§",
      medium: "ä¸­ç­‰",
      blacklisted: "å·²åˆ—å…¥é»‘åå•",
      high: "é«˜",
      insurancePartner: "ä¿é™©åˆä½œä¼™ä¼´",
      euCrossBorderAlert: "æ¬§ç›Ÿ / è·¨å¢ƒè­¦æŠ¥",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "è‰ç¨¿",
      incomplete: "ä¸å®Œæ•´",
      submitted: "å·²æäº¤",
      underReview: "å®¡æ ¸ä¸­",
      moreInfoRequired: "éœ€è¦æ›´å¤šä¿¡æ¯",
      approved: "å·²æ‰¹å‡†",
      rejected: "å·²æ‹’ç»",
      passportIssued: "æŠ¤ç…§å¯ç”¨",
      unknown: "æœªçŸ¥",
    },
    registrationDetail: {
      backToAdminRegistrations: "è¿”å›žç®¡ç†å‘˜æ³¨å†Œåˆ—è¡¨",
      backToRegistrations: "è¿”å›žæ³¨å†Œåˆ—è¡¨",
      adminPaymentConfirmationTitle: "ç®¡ç†å‘˜ä»˜æ¬¾ç¡®è®¤",
      adminPaymentConfirmationDescription:
        "åœ¨æ‰‹åŠ¨ç¡®è®¤é“¶è¡Œè½¬è´¦åŽï¼Œå°†æ­¤æ³¨å†Œæ ‡è®°ä¸ºå·²ä»˜æ¬¾ã€‚",
      reviewWorkflowTitle: "å®¡æ ¸æµç¨‹",
      reviewWorkflowDescription:
        "å°†æ³¨å†ŒæŽ¨è¿›è‡³å®¡æ ¸ã€æ‰¹å‡†å’Œæœ€ç»ˆæŠ¤ç…§ç­¾å‘é˜¶æ®µã€‚",
      detailsTitle: "æ³¨å†Œè¯¦æƒ…",
      dynamicFieldsTitle: "é™„åŠ èµ„äº§æ•°æ®",
      noAdditionalData: "æ²¡æœ‰å¯ç”¨çš„é™„åŠ æ•°æ®ã€‚",
      paymentCompleted: "å·²å®Œæˆ / å·²ç¡®è®¤",
      paymentPending: "å¾…å¤„ç†",
      labels: {
        passportNumber: "æŠ¤ç…§ç¼–å·",
        applicantType: "ç”³è¯·äººç±»åž‹",
        assetName: "èµ„äº§åç§°",
        category: "ç±»åˆ«",
        subcategory: "å­ç±»åˆ«",
        brand: "å“ç‰Œ",
        model: "åž‹å·",
        serialNumber: "åºåˆ—å·",
        owner: "æ‰€æœ‰è€…",
        ownerEmail: "æ‰€æœ‰è€…é‚®ç®±",
        created: "åˆ›å»ºæ—¶é—´",
        updated: "æ›´æ–°æ—¶é—´",
        payment: "ä»˜æ¬¾",
        completenessScore: "å®Œæ•´åº¦è¯„åˆ†",
        solarPanelSerialNumbers: "å¤ªé˜³èƒ½æ¿åºåˆ—å·",
        batterySerialNumbers: "ç”µæ± åºåˆ—å·",
        bikeBatterySerialNumbers: "è‡ªè¡Œè½¦ç”µæ± åºåˆ—å·",
        capacity: "å®¹é‡",
        powerRating: "åŠŸçŽ‡",
        batchLotNumber: "æ‰¹æ¬¡ / æ‰¹å·",
        installationLocation: "å®‰è£…ä½ç½®",
        hoursOfOperation: "è¿è¡Œå°æ—¶æ•°",
        deviceId: "è®¾å¤‡ ID",
        certification: "è®¤è¯",
        ownerOrganisation: "æ‰€æœ‰è€…ç»„ç»‡",
      },
    },
  },
};

const hi: Dictionary = {
  nav: {
    howItWorks: "à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ",
    login: "à¤²à¥‰à¤—à¤¿à¤¨",
    dashboard: "à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡",
    logout: "à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ",
    menu: "à¤®à¥‡à¤¨à¥‚",
  },
  menu: {
    home: "à¤¹à¥‹à¤®",
    verifyAsset: "à¤à¤¸à¥‡à¤Ÿ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    registerAsset: "à¤à¤¸à¥‡à¤Ÿ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
    pricing: "à¤®à¥‚à¤²à¥à¤¯",
    reportSighting: "à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",
    partners: "à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚ / à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤",
    contact: "à¤¸à¤‚à¤ªà¤°à¥à¤•",
  },
  common: {
    goToHomepageSearch: "à¤¹à¥‹à¤®à¤ªà¥‡à¤œ à¤–à¥‹à¤œ à¤ªà¤° à¤œà¤¾à¤à¤",
    publicVerification: "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨",
    whySightingsMatter: "à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥à¤¯à¥‹à¤‚ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¹à¥ˆ",
    contactEquipRegistry: "EquipRegistry à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚",
    print: "à¤ªà¥à¤°à¤¿à¤‚à¤Ÿ",
    downloadPdf: "PDF à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤…à¤¨à¥à¤°à¥‹à¤§",
        newRegistration: "à¤¨à¤¯à¤¾ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£",
      },
    },
    verify: {
      title: "à¤à¤¸à¥‡à¤Ÿ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
      subtitle:
        "à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤° à¤–à¥‹à¤œà¥‡à¤‚ à¤”à¤° à¤œà¤¾à¤à¤šà¥‡à¤‚ à¤•à¤¿ à¤‰à¤ªà¤•à¤°à¤£ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤, à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤, à¤«à¤¼à¥à¤²à¥ˆà¤— à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ à¤¯à¤¾ à¤‰à¤¸à¤•à¤¾ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤…à¤œà¥à¤žà¤¾à¤¤ à¤¹à¥ˆà¥¤",
      introTitle: "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨",
      introText:
        "à¤¯à¤¹ à¤ªà¥‡à¤œ à¤†à¤—à¥‡ à¤šà¤²à¤•à¤° à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤ à¤°à¥‚à¤Ÿ à¤¬à¤¨à¥‡à¤—à¤¾à¥¤ à¤«à¤¿à¤²à¤¹à¤¾à¤² à¤²à¤¾à¤‡à¤µ à¤–à¥‹à¤œ à¤…à¤¨à¥à¤­à¤µ à¤¹à¥‹à¤®à¤ªà¥‡à¤œ à¤ªà¤° à¤¹à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¹à¥ˆà¥¤",
    },
    register: {
      title: "à¤à¤¸à¥‡à¤Ÿ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
      subtitle:
        "à¤‰à¤ªà¤•à¤°à¤£, à¤µà¤¾à¤¹à¤¨ à¤¯à¤¾ à¤Ÿà¥à¤°à¥‡à¤²à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥‡ à¤²à¤¿à¤ à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¤°à¥‡à¤‚à¥¤",
      vehicleTitle: "à¤µà¤¾à¤¹à¤¨",
      vehicleText:
        "à¤•à¤¾à¤°à¥‡à¤‚, à¤Ÿà¥à¤°à¤•, à¤µà¥ˆà¤¨, à¤®à¥‹à¤Ÿà¤°à¤¹à¥‹à¤® à¤”à¤° à¤…à¤¨à¥à¤¯ à¤¸à¤¡à¤¼à¤• à¤à¤¸à¥‡à¤Ÿ à¤œà¤¿à¤¨à¤®à¥‡à¤‚ VIN à¤¯à¤¾ à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¸à¤‚à¤¦à¤°à¥à¤­ à¤¹à¥‹à¥¤",
      equipmentTitle: "à¤‰à¤ªà¤•à¤°à¤£",
      equipmentText:
        "à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£, à¤•à¥ƒà¤·à¤¿, à¤”à¤¦à¥à¤¯à¥‹à¤—à¤¿à¤• à¤”à¤° à¤°à¥‡à¤‚à¤Ÿà¤² à¤‰à¤ªà¤•à¤°à¤£ à¤œà¤¿à¤¨à¤®à¥‡à¤‚ à¤®à¤¶à¥€à¤¨ à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤° à¤¹à¥‹à¥¤",
      trailerTitle: "à¤Ÿà¥à¤°à¥‡à¤²à¤°",
      trailerText:
        "à¤Ÿà¥à¤°à¥‡à¤²à¤° à¤”à¤° à¤–à¥€à¤‚à¤šà¥‡ à¤œà¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤à¤¸à¥‡à¤Ÿ à¤œà¤¿à¤¨à¥à¤¹à¥‡à¤‚ à¤ªà¤¹à¤šà¤¾à¤¨, à¤‰à¤¤à¥à¤ªà¤¤à¥à¤¤à¤¿ à¤”à¤° à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾ à¤•à¥€ à¤†à¤µà¤¶à¥à¤¯à¤•à¤¤à¤¾ à¤¹à¥‹à¤¤à¥€ à¤¹à¥ˆà¥¤",
    },
    reportSighting: {
      title: "à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",
      subtitle:
        "à¤«à¤¼à¥à¤²à¥ˆà¤— à¤•à¤¿à¤ à¤—à¤ à¤¯à¤¾ à¤šà¥‹à¤°à¥€ à¤¹à¥à¤ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‡ à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾ à¤•à¥‹ à¤¬à¥‡à¤¹à¤¤à¤° à¤¬à¤¨à¤¾à¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤•à¤°à¥‡à¤‚à¥¤",
      introTitle: "à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥à¤¯à¥‹à¤‚ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¹à¥ˆ",
      introText:
        "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤°à¥‚à¤ª à¤¸à¥‡ à¤¦à¥€ à¤—à¤ˆ à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£à¥‹à¤‚ à¤”à¤° à¤µà¥ˆà¤§ à¤®à¤¾à¤²à¤¿à¤•à¥‹à¤‚ à¤•à¥‹ à¤¤à¥‡à¤œà¥€ à¤¸à¥‡ à¤•à¤¾à¤°à¥à¤°à¤µà¤¾à¤ˆ à¤•à¤°à¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤•à¤° à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆ à¤œà¤¬ à¤‰à¤ªà¤•à¤°à¤£ à¤«à¤¼à¥à¤²à¥ˆà¤—, à¤šà¥‹à¤°à¥€ à¤¯à¤¾ à¤œà¤¾à¤‚à¤š à¤•à¥‡ à¤…à¤§à¥€à¤¨ à¤¹à¥‹à¥¤",
    },
    partners: {
      title: "à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚ / à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤",
      subtitle:
        "EquipRegistry à¤•à¥‹ à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤°à¥‡à¤‚à¤Ÿà¤² à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¥‹à¤‚, à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤¨à¥‹à¤‚ à¤”à¤° à¤²à¥‰à¤œà¤¿à¤¸à¥à¤Ÿà¤¿à¤• à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤²à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤à¤• à¤Ÿà¥à¤°à¤¸à¥à¤Ÿ à¤²à¥‡à¤¯à¤° à¤•à¥‡ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",
      insurersTitle: "à¤¬à¥€à¤®à¤¾ à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¤¾à¤",
      insurersText:
        "à¤…à¤‚à¤¡à¤°à¤°à¤¾à¤‡à¤Ÿà¤¿à¤‚à¤— à¤¬à¥‡à¤¹à¤¤à¤° à¤•à¤°à¥‡à¤‚, à¤§à¥‹à¤–à¤¾à¤§à¤¡à¤¼à¥€ à¤•à¤® à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤°à¤¿à¤•à¤µà¤°à¥€ à¤¤à¥‡à¤œà¤¼ à¤•à¤°à¥‡à¤‚à¥¤ EquipRegistry à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ, à¤à¤¸à¥‡à¤Ÿ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤”à¤° à¤œà¥‹à¤–à¤¿à¤® à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤•à¥€ à¤°à¤¿à¤¯à¤²-à¤Ÿà¤¾à¤‡à¤® à¤µà¥ˆà¤²à¤¿à¤¡à¥‡à¤¶à¤¨ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤šà¥‹à¤°à¥€ à¤¹à¥à¤ à¤à¤¸à¥‡à¤Ÿ à¤¤à¥à¤°à¤‚à¤¤ à¤ªà¤¹à¤šà¤¾à¤¨à¥‡à¤‚ à¤”à¤° à¤«à¤°à¥à¤œà¥€ à¤‰à¤ªà¤•à¤°à¤£ à¤ªà¤° à¤•à¥à¤²à¥‡à¤® à¤°à¥‹à¤•à¥‡à¤‚à¥¤",
      rentalTitle: "à¤°à¥‡à¤‚à¤Ÿà¤² à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¤¾à¤",
      rentalText:
        "à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤…à¤ªà¤¨à¥€ à¤«à¥à¤²à¥€à¤Ÿ à¤ªà¤° à¤ªà¥‚à¤°à¥à¤£ à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾ à¤ªà¤¾à¤à¤à¥¤ à¤§à¥‹à¤–à¤¾à¤§à¤¡à¤¼à¥€ à¤°à¥‹à¤•à¥‡à¤‚, à¤—à¥à¤°à¤¾à¤¹à¤•à¥‹à¤‚ à¤•à¥‹ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤ªà¤¨à¥‡ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤šà¥‹à¤°à¥€, à¤¡à¥à¤ªà¥à¤²à¤¿à¤•à¥‡à¤Ÿ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥‡à¤¶à¤¨ à¤”à¤° à¤…à¤µà¥ˆà¤§ à¤°à¥€à¤¸à¥‡à¤² à¤¸à¥‡ à¤¬à¤šà¤¾à¤à¤à¥¤",
      financeTitle: "à¤¬à¥ˆà¤‚à¤• à¤”à¤° à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤¨",
      financeText:
        "à¤¡à¤¬à¤² à¤«à¤¾à¤‡à¤¨à¥‡à¤‚à¤¸à¤¿à¤‚à¤— à¤”à¤° à¤à¤¸à¥‡à¤Ÿ à¤«à¥à¤°à¥‰à¤¡ à¤°à¥‹à¤•à¥‡à¤‚à¥¤ EquipRegistry à¤‹à¤£à¤¦à¤¾à¤¤à¤¾à¤“à¤‚ à¤•à¥‹ à¤¯à¤¹ à¤œà¤¾à¤à¤šà¤¨à¥‡ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆ à¤•à¤¿ à¤•à¥‹à¤ˆ à¤à¤¸à¥‡à¤Ÿ à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤µà¤¿à¤¤à¥à¤¤à¤ªà¥‹à¤·à¤¿à¤¤, à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤¯à¤¾ à¤«à¥à¤²à¥ˆà¤— à¤¤à¥‹ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤à¤¸à¥‡à¤Ÿ à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤«à¤¾à¤‡à¤¨à¥‡à¤‚à¤¸ à¤”à¤° à¤²à¥€à¤œ à¤¸à¤‚à¤°à¤šà¤¨à¤¾à¤“à¤‚ à¤®à¥‡à¤‚ à¤œà¥‹à¤–à¤¿à¤® à¤˜à¤Ÿà¤¾à¤à¤à¥¤",
      financeRiskTitle: "à¤¦à¥‹à¤¹à¤°à¥€ à¤µà¤¿à¤¤à¥à¤¤à¤ªà¥‹à¤·à¤£ à¤•à¤¾ à¤œà¥‹à¤–à¤¿à¤®",
      financeRiskText:
        "à¤à¤• à¤¹à¥€ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤…à¤²à¤—-à¤…à¤²à¤— à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤¨à¥‹à¤‚ à¤¯à¤¾ à¤¦à¥‡à¤¶à¥‹à¤‚ à¤®à¥‡à¤‚ à¤•à¤ˆ à¤¬à¤¾à¤° à¤—à¤¿à¤°à¤µà¥€ à¤°à¤–à¤¾ à¤œà¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¸à¤¾à¤à¤¾ à¤Ÿà¥à¤°à¤¸à¥à¤Ÿ à¤²à¥‡à¤¯à¤° à¤•à¥‡ à¤¬à¤¿à¤¨à¤¾ à¤‡à¤¸à¤¸à¥‡ à¤›à¤¿à¤ªà¥€ à¤¹à¥à¤ˆ à¤à¤•à¥à¤¸à¤ªà¥‹à¤œà¤¼à¤°, à¤§à¥‹à¤–à¤¾à¤§à¤¡à¤¼à¥€ à¤•à¤¾ à¤œà¥‹à¤–à¤¿à¤® à¤”à¤° à¤¸à¤‚à¤­à¤¾à¤µà¤¿à¤¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¨à¥à¤•à¤¸à¤¾à¤¨ à¤ªà¥ˆà¤¦à¤¾ à¤¹à¥‹à¤¤à¤¾ à¤¹à¥ˆà¥¤",
      financeVerificationTitle: "à¤µà¤¿à¤¤à¥à¤¤à¤ªà¥‹à¤·à¤£ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨",
      financeVerificationText:
        "à¤²à¥€à¤œà¤¼ à¤¯à¤¾ à¤‹à¤£ à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤°à¥‡à¤‚ à¤•à¤¿ à¤à¤¸à¥‡à¤Ÿ à¤ªà¤¹à¤²à¥‡ à¤¸à¥‡ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤, à¤µà¤¿à¤¤à¥à¤¤à¤ªà¥‹à¤·à¤¿à¤¤, à¤«à¥à¤²à¥ˆà¤— à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¯à¤¾ à¤•à¤¿à¤¸à¥€ à¤œà¥‹à¤–à¤¿à¤® à¤˜à¤Ÿà¤¨à¤¾ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¤¾ à¤¤à¥‹ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
      financeTrustTitle: "à¤¸à¥€à¤®à¤¾à¤ªà¤¾à¤° à¤­à¤°à¥‹à¤¸à¤¾",
      financeTrustText:
        "à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¤‚à¤°à¤šà¤¨à¤¾à¤“à¤‚ à¤®à¥‡à¤‚ à¤‰à¤ªà¤¯à¥‹à¤— à¤¹à¥‹à¤¨à¥‡ à¤µà¤¾à¤²à¥€ à¤®à¤¶à¥€à¤¨à¥‹à¤‚, à¤µà¤¾à¤¹à¤¨à¥‹à¤‚, à¤Ÿà¥à¤°à¥‡à¤²à¤°à¥‹à¤‚ à¤”à¤° à¤…à¤¨à¥à¤¯ à¤šà¤² à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿à¤¯à¥‹à¤‚ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥€ à¤…à¤§à¤¿à¤• à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤…à¤‚à¤¤à¤°à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¥€à¤¯ à¤²à¥‡à¤¨à¤¦à¥‡à¤¨ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      terminalsTitle: "à¤ªà¥‹à¤°à¥à¤Ÿ à¤”à¤° à¤²à¥‰à¤œà¤¿à¤¸à¥à¤Ÿà¤¿à¤• à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤²",
      terminalsText:
        "à¤†à¤¨à¥‡-à¤œà¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‹ à¤°à¤¿à¤¯à¤²-à¤Ÿà¤¾à¤‡à¤® à¤®à¥‡à¤‚ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤ à¤šà¥‹à¤°à¥€ à¤¯à¤¾ à¤«à¥à¤²à¥ˆà¤— à¤•à¤¿à¤ à¤—à¤ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤² à¤®à¥‡à¤‚ à¤†à¤¨à¥‡ à¤¯à¤¾ à¤œà¤¾à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤ªà¤¹à¤šà¤¾à¤¨à¥‡à¤‚à¥¤ à¤•à¤¸à¥à¤Ÿà¤®à¥à¤¸, à¤¨à¤¿à¤°à¥€à¤•à¥à¤·à¤£ à¤”à¤° à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤…à¤¨à¥à¤ªà¤¾à¤²à¤¨ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      rentalVisibilityTitle: "à¤«à¥à¤²à¥€à¤Ÿ à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾",
      rentalVisibilityText:
        "à¤•à¤ˆ à¤¦à¥‡à¤¶à¥‹à¤‚ à¤”à¤° à¤ªà¤°à¤¿à¤šà¤¾à¤²à¤¨ à¤¸à¥à¤¥à¤²à¥‹à¤‚ à¤®à¥‡à¤‚ à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨, à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤”à¤° à¤œà¥‹à¤–à¤¿à¤® à¤•à¤¾ à¤…à¤§à¤¿à¤• à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤…à¤µà¤²à¥‹à¤•à¤¨ à¤¬à¤¨à¤¾à¤ à¤°à¤–à¥‡à¤‚à¥¤",
      rentalPreventionTitle: "à¤šà¥‹à¤°à¥€ à¤•à¥€ à¤°à¥‹à¤•à¤¥à¤¾à¤®",
      rentalPreventionText:
        "à¤šà¥‹à¤°à¥€ à¤¹à¥à¤, à¤²à¤¾à¤ªà¤¤à¤¾ à¤¯à¤¾ à¤…à¤µà¥ˆà¤§ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤¬à¥‡à¤šà¥‡ à¤—à¤ à¤à¤¸à¥‡à¤Ÿà¥à¤¸ à¤ªà¤° à¤¤à¥‡à¤œà¤¼ à¤«à¥à¤²à¥ˆà¤—à¤¿à¤‚à¤— à¤”à¤° à¤®à¤œà¤¬à¥‚à¤¤ à¤§à¥‹à¤–à¤¾à¤§à¤¡à¤¼à¥€ à¤°à¥‹à¤•à¤¥à¤¾à¤® à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      rentalOriginTitle: "à¤‰à¤¤à¥à¤ªà¤¤à¥à¤¤à¤¿ à¤•à¤¾ à¤ªà¥à¤°à¤®à¤¾à¤£",
      rentalOriginText:
        "à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤–à¤°à¥€à¤¦à¤¾à¤°à¥‹à¤‚, à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥‹à¤‚ à¤”à¤° à¤¸à¥€à¤®à¤¾à¤ªà¤¾à¤° à¤¹à¤¿à¤¤à¤§à¤¾à¤°à¤•à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤ªà¥à¤°à¤®à¤¾à¤£ à¤”à¤° à¤­à¤°à¥‹à¤¸à¤¾ à¤®à¤œà¤¬à¥‚à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",
      terminalsEntryTitle: "à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤”à¤° à¤¨à¤¿à¤•à¤¾à¤¸ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£",
      terminalsEntryText:
        "à¤‰à¤ªà¤•à¤°à¤£ à¤•à¥‡ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤ªà¤°à¤¿à¤šà¤¾à¤²à¤¨ à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¥‹à¤‚ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤•à¤°à¤¨à¥‡ à¤¯à¤¾ à¤¬à¤¾à¤¹à¤° à¤œà¤¾à¤¨à¥‡ à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤à¤• à¤…à¤¤à¤¿à¤°à¤¿à¤•à¥à¤¤ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤ªà¤°à¤¤ à¤œà¥‹à¤¡à¤¼à¥‡à¤‚à¥¤",
      terminalsCustomsTitle: "à¤¸à¥€à¤®à¤¾ à¤¶à¥à¤²à¥à¤• à¤”à¤° à¤¨à¤¿à¤°à¥€à¤•à¥à¤·à¤£",
      terminalsCustomsText:
        "à¤®à¤œà¤¼à¤¬à¥‚à¤¤ à¤à¤¸à¥‡à¤Ÿ à¤ªà¤¹à¤šà¤¾à¤¨ à¤”à¤° à¤œà¥‹à¤–à¤¿à¤® à¤¦à¥ƒà¤¶à¥à¤¯à¤¤à¤¾ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¥€à¤®à¤¾ à¤¶à¥à¤²à¥à¤•, à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤² à¤œà¤¾à¤à¤š à¤”à¤° à¤…à¤¨à¥à¤ªà¤¾à¤²à¤¨ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾à¤“à¤‚ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      ctaText:
        "EquipRegistry à¤•à¥‹ à¤¬à¥€à¤®à¤¾, à¤°à¥‡à¤‚à¤Ÿà¤², à¤µà¤¿à¤¤à¥à¤¤à¤ªà¥‹à¤·à¤£, à¤²à¥‰à¤œà¤¿à¤¸à¥à¤Ÿà¤¿à¤•à¥à¤¸ à¤”à¤° à¤ªà¥à¤¨à¤°à¥à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤à¤¿ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾à¤“à¤‚ à¤®à¥‡à¤‚ à¤­à¤°à¥‹à¤¸à¥‡à¤®à¤‚à¤¦ à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥‹à¤‚ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",
    },
    contact: {
      title: "à¤¸à¤‚à¤ªà¤°à¥à¤•",
      subtitle:
        "à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€, à¤¬à¥€à¤®à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤®à¤¾à¤®à¤²à¥‹à¤‚, à¤ªà¤¾à¤¯à¤²à¤Ÿ à¤šà¤°à¥à¤šà¤¾à¤“à¤‚ à¤¯à¤¾ à¤°à¤£à¤¨à¥€à¤¤à¤¿à¤• à¤¸à¤¹à¤¯à¥‹à¤— à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚à¥¤",
      generalTitle: "à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¥‚à¤›à¤¤à¤¾à¤›",
      generalText:
        "EquipRegistry, à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤®, à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤¯à¤¾ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¥€ à¤¹à¥ˆ, à¤‡à¤¸ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¥à¤°à¤¶à¥à¤¨à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤à¥¤",
      businessTitle: "à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤• à¤à¤µà¤‚ à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€",
      businessText:
        "à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤°à¥‡à¤‚à¤Ÿà¤² à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¥‹à¤‚, à¤¬à¥ˆà¤‚à¤•à¥‹à¤‚, à¤Ÿà¤°à¥à¤®à¤¿à¤¨à¤²à¥‹à¤‚ à¤”à¤° à¤…à¤¨à¥à¤¯ à¤¸à¤‚à¤—à¤ à¤¨à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤œà¥‹ à¤¸à¤¹à¤¯à¥‹à¤—, à¤ªà¤¾à¤¯à¤²à¤Ÿ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤¯à¤¾ à¤‡à¤‚à¤Ÿà¥€à¤—à¥à¤°à¥‡à¤¶à¤¨ à¤®à¥‡à¤‚ à¤°à¥à¤šà¤¿ à¤°à¤–à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
      supportTitle: "à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾",
      supportText:
        "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£, à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ, à¤œà¤®à¤¾ à¤•à¤¿à¤ à¤—à¤ à¤¡à¥‡à¤Ÿà¤¾ à¤¯à¤¾ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¥‡ à¤ªà¥à¤°à¤¶à¥à¤¨à¥‹à¤‚ à¤®à¥‡à¤‚ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤•à¥‡ à¤²à¤¿à¤à¥¤",
      emailLabel: "à¤ˆà¤®à¥‡à¤²",
      formTitle: "à¤¸à¤‚à¤ªà¤°à¥à¤• à¤«à¤¼à¥‰à¤°à¥à¤®",
      formIntro:
        "à¤¸à¤¹à¥€ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤ªà¥à¤°à¤•à¤¾à¤° à¤šà¥à¤¨à¥‡à¤‚ à¤¤à¤¾à¤•à¤¿ à¤†à¤ªà¤•à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¸à¥€à¤§à¥‡ à¤¸à¤¹à¥€ EquipRegistry à¤‡à¤¨à¤¬à¥‰à¤•à¥à¤¸ à¤®à¥‡à¤‚ à¤ªà¤¹à¥à¤à¤šà¥‡à¥¤",
      typeLabel: "à¤¸à¤‚à¤ªà¤°à¥à¤• à¤ªà¥à¤°à¤•à¤¾à¤°",
      typeGeneral: "à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤ªà¥‚à¤›à¤¤à¤¾à¤›",
      typeBusiness: "à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯ / à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥€",
      typeSupport: "à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾",
      namePlaceholder: "à¤†à¤ªà¤•à¤¾ à¤¨à¤¾à¤®",
      emailPlaceholder: "à¤†à¤ªà¤•à¤¾ à¤ˆà¤®à¥‡à¤²",
      subjectPlaceholder: "à¤µà¤¿à¤·à¤¯",
      messagePlaceholder: "à¤†à¤ªà¤•à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶",
      sendButton: "à¤¸à¤‚à¤¦à¥‡à¤¶ à¤­à¥‡à¤œà¥‡à¤‚",
      sendingButton: "à¤­à¥‡à¤œà¤¾ à¤œà¤¾ à¤°à¤¹à¤¾ à¤¹à¥ˆ...",
      successMessage: "à¤†à¤ªà¤•à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤¸à¤«à¤²à¤¤à¤¾à¤ªà¥‚à¤°à¥à¤µà¤• à¤­à¥‡à¤œ à¤¦à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",
      errorMessage: "à¤†à¤ªà¤•à¤¾ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤­à¥‡à¤œà¤¤à¥‡ à¤¸à¤®à¤¯ à¤•à¥à¤› à¤—à¤²à¤¤ à¤¹à¥‹ à¤—à¤¯à¤¾à¥¤",
    },
    disclaimer: {
      title: "à¤…à¤¸à¥à¤µà¥€à¤•à¤°à¤£",
      intro:
        "EquipRegistry à¤µà¤¾à¤¹à¤¨à¥‹à¤‚, à¤‰à¤ªà¤•à¤°à¤£à¥‹à¤‚, à¤Ÿà¥à¤°à¥‡à¤²à¤°à¥‹à¤‚ à¤”à¤° à¤…à¤¨à¥à¤¯ à¤ªà¤¾à¤¤à¥à¤° à¤à¤¸à¥‡à¤Ÿà¥à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤‡à¤¨à¥à¤«à¥à¤°à¤¾à¤¸à¥à¤Ÿà¥à¤°à¤•à¥à¤šà¤° à¤ªà¥à¤°à¤¦à¤¾à¤¨ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤",
      liability:
        "EquipRegistry à¤œà¤®à¤¾ à¤•à¤¿à¤ à¤—à¤, à¤¦à¤¿à¤–à¤¾à¤ à¤—à¤ à¤¯à¤¾ à¤†à¤¯à¤¾à¤¤ à¤•à¤¿à¤ à¤—à¤ à¤¡à¥‡à¤Ÿà¤¾ à¤•à¥€ à¤¸à¤Ÿà¥€à¤•à¤¤à¤¾, à¤ªà¥‚à¤°à¥à¤£à¤¤à¤¾ à¤¯à¤¾ à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤µà¥ˆà¤§à¤¤à¤¾ à¤•à¥€ à¤—à¤¾à¤°à¤‚à¤Ÿà¥€ à¤¨à¤¹à¥€à¤‚ à¤¦à¥‡à¤¤à¤¾à¥¤ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤® à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤†à¤ªà¤•à¥‡ à¤…à¤ªà¤¨à¥‡ à¤œà¥‹à¤–à¤¿à¤® à¤ªà¤° à¤¹à¥ˆà¥¤",
      data:
        "à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤¯à¥‹à¤—à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°à¥‹à¤‚, à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£à¥‹à¤‚, à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¤‚à¤¸à¥à¤¥à¤¾à¤¨à¥‹à¤‚ à¤”à¤° à¤­à¤µà¤¿à¤·à¥à¤¯ à¤•à¥€ à¤à¤•à¥€à¤•à¥ƒà¤¤ à¤ªà¥à¤°à¤£à¤¾à¤²à¤¿à¤¯à¥‹à¤‚ à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤ªà¥à¤°à¤¦à¤¾à¤¨ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤",
      future:
        "à¤­à¤µà¤¿à¤·à¥à¤¯ à¤•à¥‡ à¤à¤•à¥€à¤•à¤°à¤£à¥‹à¤‚ à¤®à¥‡à¤‚ à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾, à¤•à¤¾à¤¨à¥‚à¤¨ à¤ªà¥à¤°à¤µà¤°à¥à¤¤à¤¨, à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤µà¤°à¥à¤•à¤«à¤¼à¥à¤²à¥‹, à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤¹à¤¸à¥à¤¤à¤¾à¤‚à¤¤à¤°à¤£, à¤­à¥à¤—à¤¤à¤¾à¤¨ à¤¸à¤¿à¤¸à¥à¤Ÿà¤® à¤”à¤° à¤µà¥ˆà¤²à¤¿à¤¡à¥‡à¤¶à¤¨ à¤²à¥‡à¤¯à¤° à¤¶à¤¾à¤®à¤¿à¤² à¤¹à¥‹ à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆà¤‚à¥¤",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "दुनियाभर में वाहनों और उपकरणों की उत्पत्ति, स्थिति और जोखिम सत्यापित करें",
    subtitle:
      "VIN, सीरियल नंबर और रजिस्ट्री आईडी का उपयोग करके खरीद, वित्तपोषण, बीमा, किराये या हस्तांतरण से पहले उत्पत्ति, वर्तमान स्थिति और जोखिम संकेतों की जांच करें।",
    placeholder: "VIN, à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤° à¤¯à¤¾ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤†à¤ˆà¤¡à¥€ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
    search: "à¤–à¥‹à¤œà¥‡à¤‚",
    demoSerials: "à¤¡à¥‡à¤®à¥‹ à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤°:",
    loggedInMessage:
      "à¤†à¤ª à¤²à¥‰à¤— à¤‡à¤¨ à¤¹à¥ˆà¤‚à¥¤ à¤†à¤ª à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤°à¥‚à¤ª à¤¸à¥‡ à¤–à¥‹à¤œ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤° à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚ à¤”à¤° à¤¨à¤¿à¤œà¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¤à¤• à¤ªà¤¹à¥à¤à¤š à¤¸à¤•à¤¤à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    goToDashboard: "à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡ à¤ªà¤° à¤œà¤¾à¤à¤",
    supportedAssetsTitle: "à¤¸à¤®à¤°à¥à¤¥à¤¿à¤¤ à¤à¤¸à¥‡à¤Ÿà¥à¤¸",
    supportedAssetsItems: [
      "à¤µà¤¾à¤¹à¤¨ (à¤•à¤¾à¤°à¥‡à¤‚, à¤Ÿà¥à¤°à¤• à¤”à¤° à¤•à¥à¤²à¤¾à¤¸à¤¿à¤• à¤µà¤¾à¤¹à¤¨)",
      "à¤‰à¤ªà¤•à¤°à¤£ à¤”à¤° à¤®à¤¶à¥€à¤¨à¤°à¥€",
      "à¤¸à¤¾à¤‡à¤•à¤¿à¤²à¥‡à¤‚ à¤”à¤° à¤¹à¤²à¥à¤•à¥€ à¤®à¥‹à¤¬à¤¿à¤²à¤¿à¤Ÿà¥€",
    ],
  },
  result: {
    whyThisMatters: "à¤¯à¤¹ à¤•à¥à¤¯à¥‹à¤‚ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¹à¥ˆ",
  },
  howItWorks: {
    title: "EquipRegistry à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ",
    step1Title: "1. à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    step1Text:
      "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤¤à¥à¤°à¤‚à¤¤ à¤œà¤¾à¤à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ VIN, à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤° à¤¯à¤¾ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤†à¤ˆà¤¡à¥€ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚à¥¤",
    step2Title: "2. à¤®à¤¾à¤¨à¥à¤¯ à¤•à¤°à¥‡à¤‚",
    step2Text:
      "à¤œà¤¹à¤¾à¤ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¹à¥‹, à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸, à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤”à¤° à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤¸à¥à¤¤à¤° à¤•à¥€ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚à¥¤",
    step3Title: "3. à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
    step3Text:
      "à¤µà¤¾à¤¹à¤¨à¥‹à¤‚, à¤‰à¤ªà¤•à¤°à¤£à¥‹à¤‚ à¤¯à¤¾ à¤…à¤¨à¥à¤¯ à¤à¤¸à¥‡à¤Ÿà¥à¤¸ à¤•à¥‹ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¸à¤¹à¤¾à¤¯à¤• à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤œà¥‹à¤¡à¤¼à¥‡à¤‚à¥¤",
    step4Title: "4. à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚",
    step4Text:
      "à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤¬à¥€à¤®à¤¾, à¤°à¥‡à¤‚à¤Ÿà¤², à¤ªà¥à¤¨à¤°à¥à¤µà¤¿à¤•à¥à¤°à¤¯, à¤°à¤¿à¤•à¤µà¤°à¥€ à¤¯à¤¾ à¤…à¤¨à¥à¤ªà¤¾à¤²à¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¤°à¥‡à¤‚à¥¤",
  },
  trust: {
    title: "à¤µà¥ˆà¤¶à¥à¤µà¤¿à¤• à¤¸à¥à¤¤à¤° à¤ªà¤° à¤­à¤°à¥‹à¤¸à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤",
    subtitle:
      "EquipRegistry à¤•à¥‹ à¤µà¤¾à¤¹à¤¨à¥‹à¤‚, à¤‰à¤ªà¤•à¤°à¤£à¥‹à¤‚ à¤”à¤° à¤…à¤¨à¥à¤¯ à¤®à¥‚à¤²à¥à¤¯à¤µà¤¾à¤¨ à¤à¤¸à¥‡à¤Ÿà¥à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤à¤• à¤¤à¤Ÿà¤¸à¥à¤¥ à¤‡à¤¨à¥à¤«à¥à¤°à¤¾à¤¸à¥à¤Ÿà¥à¤°à¤•à¥à¤šà¤° à¤•à¥‡ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ, à¤œà¥‹ à¤¬à¥€à¤®à¤¾à¤•à¤°à¥à¤¤à¤¾à¤“à¤‚, à¤°à¥‡à¤‚à¤Ÿà¤² à¤•à¤‚à¤ªà¤¨à¤¿à¤¯à¥‹à¤‚, à¤ªà¥‡à¤¶à¥‡à¤µà¤° à¤®à¤¾à¤²à¤¿à¤•à¥‹à¤‚ à¤”à¤° à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤²à¥‡à¤¨à¤¦à¥‡à¤¨ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤",
    card1Title: "à¤¬à¥€à¤®à¤¾ à¤•à¥‡ à¤²à¤¿à¤ à¤¤à¥ˆà¤¯à¤¾à¤°",
    card1Text:
      "à¤…à¤‚à¤¡à¤°à¤°à¤¾à¤‡à¤Ÿà¤¿à¤‚à¤—, à¤µà¥ˆà¤²à¤¿à¤¡à¥‡à¤¶à¤¨ à¤šà¤•à¥à¤°à¥‹à¤‚ à¤”à¤° à¤œà¥‹à¤–à¤¿à¤®-à¤†à¤§à¤¾à¤°à¤¿à¤¤ à¤¨à¤¿à¤°à¥à¤£à¤¯à¥‹à¤‚ à¤•à¤¾ à¤¸à¤®à¤°à¥à¤¥à¤¨ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤‚à¤°à¤šà¤¿à¤¤à¥¤",
    card2Title: "à¤¸à¥à¤µà¤¤à¤‚à¤¤à¥à¤° à¤”à¤° à¤¤à¤Ÿà¤¸à¥à¤¥",
    card2Text:
      "à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾à¤“à¤‚, à¤µà¤¿à¤¤à¤°à¤•à¥‹à¤‚ à¤¯à¤¾ à¤¨à¥à¤¯à¤¾à¤¯à¤•à¥à¤·à¥‡à¤¤à¥à¤°à¥‹à¤‚ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¤¾ à¤¨à¤¹à¥€à¤‚ â€” à¤à¤• à¤µà¥ˆà¤¶à¥à¤µà¤¿à¤• à¤­à¤°à¥‹à¤¸à¥‡ à¤•à¤¾ à¤¸à¥à¤°à¥‹à¤¤à¥¤",
    card3Title: "à¤¸à¥à¤•à¥‡à¤² à¤•à¥‡ à¤²à¤¿à¤ à¤¡à¤¿à¤œà¤¼à¤¾à¤‡à¤¨ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾",
    card3Text:
      "à¤à¤• à¤à¤¸à¥‡à¤Ÿ à¤¸à¥‡ à¤²à¥‡à¤•à¤° à¤µà¥ˆà¤¶à¥à¤µà¤¿à¤• à¤«à¥à¤²à¥€à¤Ÿ à¤¤à¤•, à¤¬à¤¹à¥-à¤¦à¥‡à¤¶à¥€à¤¯ à¤…à¤ªà¤¨à¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¤à¥ˆà¤¯à¤¾à¤°à¥¤",
  },
  footer: {
    copyright:
      "EquipRegistry â€” à¤à¤¸à¥‡à¤Ÿà¥à¤¸ à¤•à¥‡ à¤²à¤¿à¤ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤Ÿà¥à¤°à¤¸à¥à¤Ÿ à¤‡à¤‚à¤«à¥à¤°à¤¾à¤¸à¥à¤Ÿà¥à¤°à¤•à¥à¤šà¤°",
    privacy: "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤¨à¥€à¤¤à¤¿",
    terms: "à¤¨à¤¿à¤¯à¤® à¤”à¤° à¤¶à¤°à¥à¤¤à¥‡à¤‚",
    disclaimer: "à¤…à¤¸à¥à¤µà¥€à¤•à¤°à¤£",
  },
  statuses: {
    registeredVerified: {
      label: "à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤”à¤° à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤",
      message:
        "à¤¯à¤¹ à¤à¤¸à¥‡à¤Ÿ EquipRegistry à¤®à¥‡à¤‚ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤¹à¥ˆ à¤”à¤° à¤‡à¤¸à¤•à¥€ à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤‰à¤¤à¥à¤ªà¤¤à¥à¤¤à¤¿ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¥€ à¤—à¤ˆ à¤¹à¥ˆà¥¤",
      why:
        "à¤‡à¤¸ à¤à¤¸à¥‡à¤Ÿ à¤•à¥€ à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤‰à¤¤à¥à¤ªà¤¤à¥à¤¤à¤¿ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¹à¥ˆ à¤”à¤° à¤‡à¤¸à¤•à¤¾ à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¹à¥ˆà¥¤",
      metadataStatus: "à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
      metadataPassport: "à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ",
      metadataValidation: "à¤…à¤‚à¤¤à¤¿à¤® à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨",
      actionViewPassport: "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¦à¥‡à¤–à¥‡à¤‚",
    },
    historyUnknown: {
      label: "à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤…à¤œà¥à¤žà¤¾à¤¤",
      message:
        "à¤¯à¤¹ à¤à¤¸à¥‡à¤Ÿ à¤°à¤œà¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€ à¤®à¥‡à¤‚ à¤®à¥Œà¤œà¥‚à¤¦ à¤¹à¥ˆ, à¤²à¥‡à¤•à¤¿à¤¨ à¤‡à¤¸à¤•à¤¾ à¤ªà¥‚à¤°à¤¾ à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤•à¤¿à¤¯à¤¾ à¤œà¤¾ à¤¸à¤•à¤¾à¥¤",
      why:
        "à¤…à¤§à¥‚à¤°à¤¾ à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤§à¥‹à¤–à¤¾à¤§à¤¡à¤¼à¥€, à¤¬à¥€à¤®à¤¾ à¤”à¤° à¤…à¤¨à¥à¤ªà¤¾à¤²à¤¨ à¤œà¥‹à¤–à¤¿à¤® à¤¬à¤¢à¤¼à¤¾à¤¤à¤¾ à¤¹à¥ˆà¥¤",
      metadataStatus: "à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
      metadataRisk: "à¤œà¥‹à¤–à¤¿à¤® à¤¸à¥à¤¤à¤°",
      actionViewPassport: "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¦à¥‡à¤–à¥‡à¤‚ (à¤¸à¥€à¤®à¤¿à¤¤)",
      actionRequestVerification: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤•à¤¾ à¤…à¤¨à¥à¤°à¥‹à¤§ à¤•à¤°à¥‡à¤‚",
      actionRegisterDocuments: "à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
    },
    stolen: {
      label: "à¤šà¥‹à¤°à¥€ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤à¤¸à¥‡à¤Ÿ â€“ à¤°à¥‡à¤¡ à¤«à¥à¤²à¥ˆà¤—",
      message:
        "à¤‡à¤¸ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤°à¥‚à¤ª à¤¸à¥‡ à¤šà¥‹à¤°à¥€ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤®à¥‡à¤‚ à¤¦à¤°à¥à¤œ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆ à¤”à¤° à¤‡à¤¸à¥‡ EquipRegistry à¤®à¥‡à¤‚ à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤°à¥‚à¤ª à¤¸à¥‡ à¤¬à¥à¤²à¥ˆà¤•à¤²à¤¿à¤¸à¥à¤Ÿ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤¹à¥ˆà¥¤",
      warning:
        "à¤‡à¤¸ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤–à¤°à¥€à¤¦à¥‡à¤‚ à¤¨à¤¹à¥€à¤‚, à¤¬à¥€à¤®à¤¾ à¤¨ à¤•à¤°à¥‡à¤‚, à¤•à¤¿à¤°à¤¾à¤¯à¥‡ à¤ªà¤° à¤¨ à¤²à¥‡à¤‚, à¤ªà¤°à¤¿à¤µà¤¹à¤¨ à¤¨ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤‡à¤¸à¤•à¤¾ à¤¹à¤¸à¥à¤¤à¤¾à¤‚à¤¤à¤°à¤£ à¤¸à¥à¤µà¥€à¤•à¤¾à¤° à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
      why:
        "à¤šà¥‹à¤°à¥€ à¤•à¤¿à¤ à¤—à¤ à¤à¤¸à¥‡à¤Ÿ à¤¸à¥‡ à¤œà¥à¤¡à¤¼à¤¾ à¤•à¥‹à¤ˆ à¤­à¥€ à¤²à¥‡à¤¨à¤¦à¥‡à¤¨ à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤”à¤° à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤²à¤¾ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆà¥¤",
      metadataStatus: "à¤¸à¥à¤¥à¤¿à¤¤à¤¿",
      metadataRisk: "à¤œà¥‹à¤–à¤¿à¤® à¤¸à¥à¤¤à¤°",
      metadataReportedBy: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤µà¤¾à¤²à¤¾",
      metadataJurisdiction: "à¤…à¤§à¤¿à¤•à¤¾à¤° à¤•à¥à¤·à¥‡à¤¤à¥à¤°",
      metadataReportDate: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥€ à¤¤à¤¾à¤°à¥€à¤–",
      actionReportSighting: "à¤¦à¥‡à¤–à¥‡ à¤œà¤¾à¤¨à¥‡ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",
      actionContactAuthorities: "à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£à¥‹à¤‚ à¤¸à¥‡ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‡à¤‚",
      actionVerifyCaseId: "à¤•à¥‡à¤¸ à¤†à¤ˆà¤¡à¥€ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    },
    notRegistered: {
      label: "à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤¨à¤¹à¥€à¤‚",
      message: "à¤¯à¤¹ à¤ªà¤¹à¤šà¤¾à¤¨à¤•à¤°à¥à¤¤à¤¾ EquipRegistry à¤®à¥‡à¤‚ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
      why:
        "à¤…-à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¸à¥à¤µà¤¾à¤®à¤¿à¤¤à¥à¤µ à¤”à¤° à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤°à¤¿à¤•à¥‰à¤°à¥à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹à¤¤à¤¾à¥¤",
      actionRegister: "à¤‡à¤¸ à¤à¤¸à¥‡à¤Ÿ à¤•à¥‹ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
    },
    metadataValues: {
      active: "à¤¸à¤•à¥à¤°à¤¿à¤¯",
      full: "à¤ªà¥‚à¤°à¥à¤£",
      lastValidation2025: "2025",
      limitedPassport: "à¤¸à¥€à¤®à¤¿à¤¤ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ",
      medium: "à¤®à¤§à¥à¤¯à¤®",
      blacklisted: "à¤¬à¥à¤²à¥ˆà¤•à¤²à¤¿à¤¸à¥à¤Ÿà¥‡à¤¡",
      high: "à¤‰à¤šà¥à¤š",
      insurancePartner: "à¤¬à¥€à¤®à¤¾ à¤­à¤¾à¤—à¥€à¤¦à¤¾à¤°",
      euCrossBorderAlert: "EU / à¤¸à¥€à¤®à¤¾-à¤ªà¤¾à¤° à¤šà¥‡à¤¤à¤¾à¤µà¤¨à¥€",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "à¤¡à¥à¤°à¤¾à¤«à¥à¤Ÿ",
      incomplete: "à¤…à¤ªà¥‚à¤°à¥à¤£",
      submitted: "à¤œà¤®à¤¾ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾",
      underReview: "à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤®à¥‡à¤‚",
      moreInfoRequired: "à¤…à¤§à¤¿à¤• à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤†à¤µà¤¶à¥à¤¯à¤• à¤¹à¥ˆ",
      approved: "à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤",
      rejected: "à¤…à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤",
      passportIssued: "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤‰à¤ªà¤²à¤¬à¥à¤§",
      unknown: "à¤…à¤œà¥à¤žà¤¾à¤¤",
    },
    registrationDetail: {
      backToAdminRegistrations: "à¤à¤¡à¤®à¤¿à¤¨ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£à¥‹à¤‚ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤",
      backToRegistrations: "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£à¥‹à¤‚ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤",
      adminPaymentConfirmationTitle: "à¤à¤¡à¤®à¤¿à¤¨ à¤­à¥à¤—à¤¤à¤¾à¤¨ à¤ªà¥à¤·à¥à¤Ÿà¤¿",
      adminPaymentConfirmationDescription:
        "à¤¬à¥ˆà¤‚à¤• à¤Ÿà¥à¤°à¤¾à¤‚à¤¸à¤«à¤° à¤•à¥€ à¤®à¥ˆà¤¨à¥à¤¯à¥à¤…à¤² à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¥‡ à¤¬à¤¾à¤¦, à¤‡à¤¸ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¥‹ à¤­à¥à¤—à¤¤à¤¾à¤¨ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾ à¤šà¤¿à¤¹à¥à¤¨à¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",
      reviewWorkflowTitle: "à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¤¾à¤°à¥à¤¯à¤ªà¥à¤°à¤µà¤¾à¤¹",
      reviewWorkflowDescription:
        "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¥‹ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾, à¤…à¤¨à¥à¤®à¥‹à¤¦à¤¨ à¤”à¤° à¤…à¤‚à¤¤à¤¿à¤® à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤œà¤¾à¤°à¥€ à¤•à¤°à¤¨à¥‡ à¤•à¥€ à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¸à¥‡ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¾à¤à¤à¥¤",
      detailsTitle: "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤µà¤¿à¤µà¤°à¤£",
      dynamicFieldsTitle: "à¤…à¤¤à¤¿à¤°à¤¿à¤•à¥à¤¤ à¤à¤¸à¥‡à¤Ÿ à¤¡à¥‡à¤Ÿà¤¾",
      noAdditionalData: "à¤•à¥‹à¤ˆ à¤…à¤¤à¤¿à¤°à¤¿à¤•à¥à¤¤ à¤¡à¥‡à¤Ÿà¤¾ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
      paymentCompleted: "à¤ªà¥‚à¤°à¥à¤£ / à¤ªà¥à¤·à¥à¤Ÿà¤¿ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾",
      paymentPending: "à¤²à¤‚à¤¬à¤¿à¤¤",
      labels: {
        passportNumber: "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¨à¤‚à¤¬à¤°",
        applicantType: "à¤†à¤µà¥‡à¤¦à¤• à¤ªà¥à¤°à¤•à¤¾à¤°",
        assetName: "à¤à¤¸à¥‡à¤Ÿ à¤•à¤¾ à¤¨à¤¾à¤®",
        category: "à¤¶à¥à¤°à¥‡à¤£à¥€",
        subcategory: "à¤‰à¤ªà¤¶à¥à¤°à¥‡à¤£à¥€",
        brand: "à¤¬à¥à¤°à¤¾à¤‚à¤¡",
        model: "à¤®à¥‰à¤¡à¤²",
        serialNumber: "à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤°",
        owner: "à¤®à¤¾à¤²à¤¿à¤•",
        ownerEmail: "à¤®à¤¾à¤²à¤¿à¤• à¤•à¤¾ à¤ˆà¤®à¥‡à¤²",
        created: "à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾",
        updated: "à¤…à¤ªà¤¡à¥‡à¤Ÿ à¤•à¤¿à¤¯à¤¾ à¤—à¤¯à¤¾",
        payment: "à¤­à¥à¤—à¤¤à¤¾à¤¨",
        completenessScore: "à¤ªà¥‚à¤°à¥à¤£à¤¤à¤¾ à¤¸à¥à¤•à¥‹à¤°",
        solarPanelSerialNumbers: "à¤¸à¥‹à¤²à¤° à¤ªà¥ˆà¤¨à¤² à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤°",
        batterySerialNumbers: "à¤¬à¥ˆà¤Ÿà¤°à¥€ à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤°",
        bikeBatterySerialNumbers: "à¤¸à¤¾à¤‡à¤•à¤¿à¤² à¤¬à¥ˆà¤Ÿà¤°à¥€ à¤¸à¥€à¤°à¤¿à¤¯à¤² à¤¨à¤‚à¤¬à¤°",
        capacity: "à¤•à¥à¤·à¤®à¤¤à¤¾",
        powerRating: "à¤ªà¤¾à¤µà¤° à¤°à¥‡à¤Ÿà¤¿à¤‚à¤—",
        batchLotNumber: "à¤¬à¥ˆà¤š / à¤²à¥‰à¤Ÿ à¤¨à¤‚à¤¬à¤°",
        installationLocation: "à¤¸à¥à¤¥à¤¾à¤ªà¤¨à¤¾ à¤¸à¥à¤¥à¤¾à¤¨",
        hoursOfOperation: "à¤¸à¤‚à¤šà¤¾à¤²à¤¨ à¤•à¥‡ à¤˜à¤‚à¤Ÿà¥‡",
        deviceId: "à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤†à¤ˆà¤¡à¥€",
        certification: "à¤ªà¥à¤°à¤®à¤¾à¤£à¤¨",
        ownerOrganisation: "à¤®à¤¾à¤²à¤¿à¤• à¤¸à¤‚à¤—à¤ à¤¨",
      },
    },
  },
};

const ar: Dictionary = {
  nav: {
    howItWorks: "ÙƒÙŠÙ ÙŠØ¹Ù…Ù„",
    login: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„",
    dashboard: "Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…",
    logout: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬",
    menu: "Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©",
  },
  menu: {
    home: "Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    verifyAsset: "Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø£ØµÙ„",
    registerAsset: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø£ØµÙ„",
    pricing: "Ø§Ù„Ø£Ø³Ø¹Ø§Ø±",
    reportSighting: "Ø§Ù„Ø¥Ø¨Ù„Ø§Øº Ø¹Ù† Ù…Ø´Ø§Ù‡Ø¯Ø©",
    partners: "Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† / Ø§Ù„Ø´Ø±ÙƒØ§Ø¡",
    contact: "Ø§ØªØµØ§Ù„",
  },
  common: {
    goToHomepageSearch: "Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ø¨Ø­Ø« Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©",
    publicVerification: "ØªØ­Ù‚Ù‚ Ø¹Ø§Ù…",
    whySightingsMatter: "Ù„Ù…Ø§Ø°Ø§ ØªØ¹ØªØ¨Ø± Ø§Ù„Ù…Ø´Ø§Ù‡Ø¯Ø§Øª Ù…Ù‡Ù…Ø©",
    contactEquipRegistry: "Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ù€ EquipRegistry",
    print: "Ø·Ø¨Ø§Ø¹Ø©",
    downloadPdf: "ØªÙ†Ø²ÙŠÙ„ PDF",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØªØ³Ø¬ÙŠÙ„",
        newRegistration: "ØªØ³Ø¬ÙŠÙ„ Ø¬Ø¯ÙŠØ¯",
      },
    },
    verify: {
      title: "Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø£ØµÙ„",
      subtitle:
        "Ø§Ø¨Ø­Ø« Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠ ÙˆØªØ­Ù‚Ù‚ Ù…Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ù…Ø³Ø¬Ù„Ø© Ø£Ùˆ Ù…ØªØ­Ù‚Ù‚Ù‹Ø§ Ù…Ù†Ù‡Ø§ Ø£Ùˆ Ù…ÙØ¹Ù„Ù‘Ù…Ø© Ø£Ùˆ Ø°Ø§Øª Ø³Ø¬Ù„ ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ.",
      introTitle: "ØªØ­Ù‚Ù‚ Ø¹Ø§Ù…",
      introText:
        "Ø³ØªØµØ¨Ø­ Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø© Ù„Ø§Ø­Ù‚Ù‹Ø§ Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„Ø¹Ø§Ù… Ø§Ù„Ù…Ø®ØµØµ Ù„Ù„ØªØ­Ù‚Ù‚. Ø­Ø§Ù„ÙŠÙ‹Ø§ØŒ ØªØ¨Ù‚Ù‰ ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø¨Ø­Ø« Ø§Ù„Ù…Ø¨Ø§Ø´Ø± Ù…ØªØ§Ø­Ø© Ø¹Ù„Ù‰ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.",
    },
    register: {
      title: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø£ØµÙ„",
      subtitle:
        "Ø§Ø¨Ø¯Ø£ Ø¹Ù…Ù„ÙŠØ© ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ø£Ùˆ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø£Ùˆ Ø§Ù„Ù…Ù‚Ø·ÙˆØ±Ø§Øª ÙˆÙ‚Ù… Ø¨Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø£ØµÙ„ Ù„Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ø¬ÙˆØ§Ø² Ø³Ø¬Ù„ Ø±Ù‚Ù…ÙŠ.",
      vehicleTitle: "Ù…Ø±ÙƒØ¨Ø©",
      vehicleText:
        "Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª ÙˆØ§Ù„Ø´Ø§Ø­Ù†Ø§Øª ÙˆØ§Ù„ÙØ§Ù†Ø§Øª ÙˆØ§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø§Ù„Ø³ÙƒÙ†ÙŠØ© ÙˆØºÙŠØ±Ù‡Ø§ Ù…Ù† Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ø·Ø±Ù‚ÙŠØ© Ø§Ù„ØªÙŠ ØªØ­Ù…Ù„ Ø±Ù‚Ù… VIN Ø£Ùˆ Ù…Ø±Ø¬Ø¹Ù‹Ø§ ØªØ³Ù„Ø³Ù„ÙŠÙ‹Ø§.",
      equipmentTitle: "Ù…Ø¹Ø¯Ø§Øª",
      equipmentText:
        "Ù…Ø¹Ø¯Ø§Øª Ø§Ù„Ø¨Ù†Ø§Ø¡ ÙˆØ§Ù„Ø²Ø±Ø§Ø¹Ø© ÙˆØ§Ù„ØµÙ†Ø§Ø¹Ø© ÙˆØ§Ù„ØªØ£Ø¬ÙŠØ± Ø§Ù„ØªÙŠ ØªØ­Ù…Ù„ Ø±Ù‚Ù…Ù‹Ø§ ØªØ³Ù„Ø³Ù„ÙŠÙ‹Ø§ Ù„Ù„Ø¢Ù„Ø©.",
      trailerTitle: "Ù…Ù‚Ø·ÙˆØ±Ø©",
      trailerText:
        "Ø§Ù„Ù…Ù‚Ø·ÙˆØ±Ø§Øª ÙˆØ§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø³Ø­ÙˆØ¨Ø© Ø§Ù„ØªÙŠ ØªØªØ·Ù„Ø¨ Ù‡ÙˆÙŠØ© ÙˆÙ…Ù†Ø´Ø£ ÙˆÙˆØ¶ÙˆØ­Ù‹Ø§ Ù‚Ø§Ø¦Ù…Ù‹Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø«Ù‚Ø©.",
    },
    reportSighting: {
      title: "Ø§Ù„Ø¥Ø¨Ù„Ø§Øº Ø¹Ù† Ù…Ø´Ø§Ù‡Ø¯Ø©",
      subtitle:
        "Ø£Ø¨Ù„Øº Ø¹Ù† Ù…Ø´Ø§Ù‡Ø¯Ø© Ù…Ø¹Ø¯Ø§Øª Ù…ÙØ¹Ù„Ù‘Ù…Ø© Ø£Ùˆ Ù…Ø³Ø±ÙˆÙ‚Ø© ÙˆØ³Ø§Ø¹Ø¯ ÙÙŠ ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø±Ø¤ÙŠØ© Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¯ÙˆØ¯.",
      introTitle: "Ù„Ù…Ø§Ø°Ø§ ØªØ¹ØªØ¨Ø± Ø§Ù„Ù…Ø´Ø§Ù‡Ø¯Ø§Øª Ù…Ù‡Ù…Ø©",
      introText:
        "ÙŠÙ…ÙƒÙ† Ø£Ù† ØªØ³Ø§Ø¹Ø¯ ØªÙ‚Ø§Ø±ÙŠØ± Ø§Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© Ø§Ù„Ø¹Ø§Ù…Ø© Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ§Ù„Ø³Ù„Ø·Ø§Øª ÙˆØ§Ù„Ù…Ø§Ù„ÙƒÙŠÙ† Ø§Ù„Ø´Ø±Ø¹ÙŠÙŠÙ† Ø¹Ù„Ù‰ Ø§Ù„ØªØµØ±Ù Ø¨Ø´ÙƒÙ„ Ø£Ø³Ø±Ø¹ Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒÙˆÙ† Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ù…ÙØ¹Ù„Ù‘Ù…Ø© Ø£Ùˆ Ù…Ø³Ø±ÙˆÙ‚Ø© Ø£Ùˆ Ù‚ÙŠØ¯ Ø§Ù„ØªØ­Ù‚ÙŠÙ‚.",
    },
    partners: {
      title: "Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† / Ø§Ù„Ø´Ø±ÙƒØ§Ø¡",
      subtitle:
        "ØªÙ… ØªØµÙ…ÙŠÙ… EquipRegistry ÙƒØ·Ø¨Ù‚Ø© Ø«Ù‚Ø© Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ù…Ø§Ù„ÙŠØ© ÙˆØ§Ù„Ù…Ø­Ø·Ø§Øª Ø§Ù„Ù„ÙˆØ¬Ø³ØªÙŠØ©.",
      insurersTitle: "Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ†",
      insurersText:
        "Ø­Ø³Ù‘Ù† Ø§Ù„Ø§ÙƒØªØªØ§Ø¨ØŒ ÙˆÙ‚Ù„Ù‘Ù„ Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ØŒ ÙˆØ³Ø±Ù‘Ø¹ Ø§Ù„Ø§Ø³ØªØ±Ø¯Ø§Ø¯. ÙŠØªÙŠØ­ EquipRegistry Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„ÙÙˆØ±ÙŠ Ù…Ù† Ø§Ù„Ù…Ù„ÙƒÙŠØ© ÙˆØªØ§Ø±ÙŠØ® Ø§Ù„Ø£ØµÙ„ ÙˆØ­Ø§Ù„Ø© Ø§Ù„Ù…Ø®Ø§Ø·Ø±. Ø§ÙƒØªØ´Ù Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø³Ø±ÙˆÙ‚Ø© ÙÙˆØ±Ù‹Ø§ ÙˆØ§Ù…Ù†Ø¹ Ø§Ù„Ù…Ø·Ø§Ù„Ø¨Ø§Øª Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ÙŠØ©.",
      rentalTitle: "Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ø¬ÙŠØ±",
      rentalText:
        "Ø§Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø±Ø¤ÙŠØ© ÙƒØ§Ù…Ù„Ø© Ù„Ø£Ø³Ø·ÙˆÙ„Ùƒ Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¯ÙˆØ¯. Ø§Ù…Ù†Ø¹ Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ØŒ ÙˆØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ØŒ ÙˆØ§Ø­Ù…Ù Ø£ØµÙˆÙ„Ùƒ Ù…Ù† Ø§Ù„Ø³Ø±Ù‚Ø© ÙˆØ§Ù„ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„Ù…ÙƒØ±Ø±Ø© ÙˆØ¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø¨ÙŠØ¹ ØºÙŠØ± Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ©.",
      financeTitle: "Ø§Ù„Ø¨Ù†ÙˆÙƒ ÙˆØ§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ù…Ø§Ù„ÙŠØ©",
      financeText:
        "Ø§Ù…Ù†Ø¹ Ø§Ù„ØªÙ…ÙˆÙŠÙ„ Ø§Ù„Ù…Ø²Ø¯ÙˆØ¬ ÙˆØ§Ù„Ø§Ø­ØªÙŠØ§Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ø£ØµÙˆÙ„. ÙŠØªÙŠØ­ EquipRegistry Ù„Ù„Ù…Ù…ÙˆÙ„ÙŠÙ† Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ø£ØµÙ„ Ù…Ù…ÙˆÙ„Ù‹Ø§ Ø¨Ø§Ù„ÙØ¹Ù„ Ø£Ùˆ Ù…Ø³Ø¬Ù„Ù‹Ø§ Ø£Ùˆ Ù…ÙØ¹Ù„Ù‘Ù…Ù‹Ø§. Ù‚Ù„Ù‘Ù„ Ø§Ù„Ù…Ø®Ø§Ø·Ø± ÙÙŠ Ù‡ÙŠØ§ÙƒÙ„ Ø§Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ§Ù„ØªÙ…ÙˆÙŠÙ„ Ø§Ù„Ù‚Ø§Ø¦Ù… Ø¹Ù„Ù‰ Ø§Ù„Ø£ØµÙˆÙ„.",
      financeRiskTitle: "Ù…Ø®Ø§Ø·Ø± Ø§Ù„ØªÙ…ÙˆÙŠÙ„ Ø§Ù„Ù…Ø²Ø¯ÙˆØ¬",
      financeRiskText:
        "ÙŠÙ…ÙƒÙ† Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø£ØµÙ„ Ù†ÙØ³Ù‡ ÙƒØ¶Ù…Ø§Ù† Ø¹Ø¯Ø© Ù…Ø±Ø§Øª Ù„Ø¯Ù‰ Ù…Ø¤Ø³Ø³Ø§Øª Ø£Ùˆ Ø¯ÙˆÙ„ Ù…Ø®ØªÙ„ÙØ©. ÙˆÙ…Ù† Ø¯ÙˆÙ† Ø·Ø¨Ù‚Ø© Ø«Ù‚Ø© Ù…Ø´ØªØ±ÙƒØ©ØŒ ÙŠØ¤Ø¯ÙŠ Ø°Ù„Ùƒ Ø¥Ù„Ù‰ Ø§Ù†ÙƒØ´Ø§Ù Ø®ÙÙŠ ÙˆÙ…Ø®Ø§Ø·Ø± Ø§Ø­ØªÙŠØ§Ù„ ÙˆØ®Ø³Ø§Ø¦Ø± Ù…Ø§Ù„ÙŠØ© Ù…Ø­ØªÙ…Ù„Ø©.",
      financeVerificationTitle: "Ø§Ù„ØªØ­Ù‚Ù‚ Ù‚Ø¨Ù„ Ø§Ù„ØªÙ…ÙˆÙŠÙ„",
      financeVerificationText:
        "ØªØ­Ù‚Ù‚ Ù…Ù…Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ø£ØµÙ„ Ù…Ø³Ø¬Ù„Ø§Ù‹ Ø£Ùˆ Ù…Ù…ÙˆÙ„Ø§Ù‹ Ø£Ùˆ Ù…ÙØ¹Ù„Ù‘ÙŽÙ…Ø§Ù‹ Ø¨Ø§Ù„ÙØ¹Ù„ Ø£Ùˆ Ù…Ø±ØªØ¨Ø·Ø§Ù‹ Ø¨Ø­Ø§Ø¯Ø«Ø© Ù…Ø®Ø§Ø·Ø± Ù‚Ø¨Ù„ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„Ù‰ Ø¹Ù‚Ø¯ ØªØ£Ø¬ÙŠØ± Ø£Ùˆ Ù‚Ø±Ø¶.",
      financeTrustTitle: "Ø«Ù‚Ø© Ø¹Ø§Ø¨Ø±Ø© Ù„Ù„Ø­Ø¯ÙˆØ¯",
      financeTrustText:
        "Ø§Ø¯Ø¹Ù… Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø¯ÙˆÙ„ÙŠØ© Ø£ÙƒØ«Ø± Ø£Ù…Ø§Ù†Ø§Ù‹ ØªØ´Ù…Ù„ Ø§Ù„Ø¢Ù„Ø§Øª ÙˆØ§Ù„Ù…Ø±ÙƒØ¨Ø§Øª ÙˆØ§Ù„Ù…Ù‚Ø·ÙˆØ±Ø§Øª ÙˆØºÙŠØ±Ù‡Ø§ Ù…Ù† Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ù†Ù‚ÙˆÙ„Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø© ÙÙŠ Ù‡ÙŠØ§ÙƒÙ„ Ø§Ù„ØªÙ…ÙˆÙŠÙ„.",
      terminalsTitle: "Ø§Ù„Ù…ÙˆØ§Ù†Ø¦ ÙˆØ§Ù„Ù…Ø­Ø·Ø§Øª Ø§Ù„Ù„ÙˆØ¬Ø³ØªÙŠØ©",
      terminalsText:
        "ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ø§Ù„Ø¯Ø§Ø®Ù„Ø© ÙˆØ§Ù„Ø®Ø§Ø±Ø¬Ø© ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„ÙØ¹Ù„ÙŠ. Ø§ÙƒØªØ´Ù Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø³Ø±ÙˆÙ‚Ø© Ø£Ùˆ Ø§Ù„Ù…ÙØ¹Ù„Ù‘Ù…Ø© Ù‚Ø¨Ù„ Ø¯Ø®ÙˆÙ„Ù‡Ø§ Ø¥Ù„Ù‰ Ù…Ø­Ø·ØªÙƒ Ø£Ùˆ Ù…ØºØ§Ø¯Ø±ØªÙ‡Ø§. Ø§Ø¯Ø¹Ù… Ø§Ù„Ø¬Ù…Ø§Ø±Ùƒ ÙˆØ§Ù„ØªÙØªÙŠØ´ ÙˆØ§Ù„Ø§Ù…ØªØ«Ø§Ù„ Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¯ÙˆØ¯.",
      rentalVisibilityTitle: "Ø±Ø¤ÙŠØ© Ø§Ù„Ø£Ø³Ø·ÙˆÙ„",
      rentalVisibilityText:
        "Ø­Ø§ÙØ¸ Ø¹Ù„Ù‰ ØµÙˆØ±Ø© Ø£ÙˆØ¶Ø­ Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø¹Ø¯Ø§Øª ÙˆØ­Ø§Ù„ØªÙ‡Ø§ ÙˆÙ…Ø®Ø§Ø·Ø±Ù‡Ø§ Ø¹Ø¨Ø± Ø¹Ø¯Ø© Ø¯ÙˆÙ„ ÙˆÙ…ÙˆØ§Ù‚Ø¹ ØªØ´ØºÙŠÙ„ÙŠØ©.",
      rentalPreventionTitle: "Ø§Ù„ÙˆÙ‚Ø§ÙŠØ© Ù…Ù† Ø§Ù„Ø³Ø±Ù‚Ø©",
      rentalPreventionText:
        "Ø§Ø¯Ø¹Ù… ÙˆØ¶Ø¹ Ø§Ù„Ø¹Ù„Ø§Ù…Ø§Øª Ø¨Ø´ÙƒÙ„ Ø£Ø³Ø±Ø¹ ÙˆØªØ¹Ø²ÙŠØ² Ø§Ù„ÙˆÙ‚Ø§ÙŠØ© Ù…Ù† Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ Ø­ÙˆÙ„ Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø³Ø±ÙˆÙ‚Ø© Ø£Ùˆ Ø§Ù„Ù…ÙÙ‚ÙˆØ¯Ø© Ø£Ùˆ Ø§Ù„Ù…Ø¹Ø§Ø¯ Ø¨ÙŠØ¹Ù‡Ø§ Ø¨Ø´ÙƒÙ„ ØºÙŠØ± Ù‚Ø§Ù†ÙˆÙ†ÙŠ.",
      rentalOriginTitle: "Ø¥Ø«Ø¨Ø§Øª Ø§Ù„Ù…Ù†Ø´Ø£",
      rentalOriginText:
        "Ø¹Ø²Ù‘Ø² Ø¥Ø«Ø¨Ø§Øª Ø§Ù„Ù…Ù„ÙƒÙŠØ© ÙˆØ§Ù„Ø«Ù‚Ø© Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ§Ù„Ù…Ø´ØªØ±ÙŠÙ† ÙˆØ§Ù„Ø´Ø±ÙƒØ§Ø¡ ÙˆØ§Ù„Ø£Ø·Ø±Ø§Ù Ø§Ù„Ù…Ø¹Ù†ÙŠØ© Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¯ÙˆØ¯.",
      terminalsEntryTitle: "Ø§Ù„ØªØ­ÙƒÙ… ÙÙŠ Ø§Ù„Ø¯Ø®ÙˆÙ„ ÙˆØ§Ù„Ø®Ø±ÙˆØ¬",
      terminalsEntryText:
        "Ø£Ø¶Ù Ø·Ø¨Ù‚Ø© ØªØ­Ù‚Ù‚ Ø¥Ø¶Ø§ÙÙŠØ© Ù‚Ø¨Ù„ Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ø¥Ù„Ù‰ Ø§Ù„Ù…Ù†Ø§Ø·Ù‚ Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠØ© Ø§Ù„Ø¢Ù…Ù†Ø© Ø£Ùˆ Ø®Ø±ÙˆØ¬Ù‡Ø§ Ù…Ù†Ù‡Ø§.",
      terminalsCustomsTitle: "Ø§Ù„Ø¬Ù…Ø§Ø±Ùƒ ÙˆØ§Ù„ØªÙØªÙŠØ´",
      terminalsCustomsText:
        "Ø§Ø¯Ø¹Ù… ÙØ­ÙˆØµØ§Øª Ø§Ù„Ø¬Ù…Ø§Ø±Ùƒ ÙˆØ¹Ù…Ù„ÙŠØ§Øª Ø§Ù„ØªØ­Ù‚Ù‚ ÙÙŠ Ø§Ù„Ù…Ø­Ø·Ø§Øª ÙˆØ¥Ø¬Ø±Ø§Ø¡Ø§Øª Ø§Ù„Ø§Ù…ØªØ«Ø§Ù„ Ù…Ù† Ø®Ù„Ø§Ù„ ØªØ¹Ø±ÙŠÙ Ø£Ù‚ÙˆÙ‰ Ù„Ù„Ø£ØµÙˆÙ„ ÙˆØ±Ø¤ÙŠØ© Ø£ÙˆØ¶Ø­ Ù„Ù„Ù…Ø®Ø§Ø·Ø±.",
      ctaText:
        "ØªÙ… Ø¥Ù†Ø´Ø§Ø¡ EquipRegistry Ù„Ø¯Ø¹Ù… Ø§Ù„Ø´Ø±ÙƒØ§Ø¡ Ø§Ù„Ù…ÙˆØ«ÙˆÙ‚ÙŠÙ† Ø¹Ø¨Ø± Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ§Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ§Ù„ØªÙ…ÙˆÙŠÙ„ ÙˆØ§Ù„Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù„ÙˆØ¬Ø³ØªÙŠØ© ÙˆØ§Ù„Ø§Ø³ØªØ±Ø¯Ø§Ø¯.",
    },
    contact: {
      title: "Ø§ØªØµØ§Ù„",
      subtitle:
        "ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¨Ø®ØµÙˆØµ Ø§Ù„Ø´Ø±Ø§ÙƒØ§Øª Ø£Ùˆ Ø­Ø§Ù„Ø§Øª Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„ØªØ£Ù…ÙŠÙ†ÙŠØ© Ø£Ùˆ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ø£Ùˆ Ø§Ù„ØªØ¹Ø§ÙˆÙ† Ø§Ù„Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠ.",
      generalTitle: "Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø¹Ø§Ù…Ø©",
      generalText:
        "Ù„Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø¹Ø§Ù…Ø© Ø­ÙˆÙ„ EquipRegistry Ø£Ùˆ Ø§Ù„Ù…Ù†ØµØ© Ø£Ùˆ Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„Ø¹Ø§Ù… Ø£Ùˆ ÙƒÙŠÙÙŠØ© Ø¹Ù…Ù„ Ø§Ù„Ø³Ø¬Ù„.",
      businessTitle: "Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ ÙˆØ§Ù„Ø´Ø±Ø§ÙƒØ§Øª",
      businessText:
        "Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ§Ù„Ø¨Ù†ÙˆÙƒ ÙˆØ§Ù„Ù…Ø­Ø·Ø§Øª ÙˆØºÙŠØ±Ù‡Ø§ Ù…Ù† Ø§Ù„Ø¬Ù‡Ø§Øª Ø§Ù„Ù…Ù‡ØªÙ…Ø© Ø¨Ø§Ù„ØªØ¹Ø§ÙˆÙ† Ø£Ùˆ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ Ø§Ù„ØªØ¬Ø±ÙŠØ¨ÙŠØ© Ø£Ùˆ Ø§Ù„ØªÙƒØ§Ù…Ù„.",
      supportTitle: "Ø§Ù„Ø¯Ø¹Ù…",
      supportText:
        "Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…ØªØ¹Ù„Ù‚Ø© Ø¨Ø§Ù„ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø£Ùˆ Ø¬ÙˆØ§Ø²Ø§Øª Ø§Ù„Ø³Ø¬Ù„ Ø£Ùˆ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø±Ø³Ù„Ø© Ø£Ùˆ Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…ØªØ¹Ù„Ù‚Ø© Ø¨Ø§Ù„Ù…Ù†ØµØ©.",
      emailLabel: "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
      formTitle: "Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø§ØªØµØ§Ù„",
      formIntro:
        "Ø§Ø®ØªØ± Ù†ÙˆØ¹ Ø§Ù„Ø§ØªØµØ§Ù„ Ø§Ù„ØµØ­ÙŠØ­ Ø­ØªÙ‰ ØªØµÙ„ Ø±Ø³Ø§Ù„ØªÙƒ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¥Ù„Ù‰ ØµÙ†Ø¯ÙˆÙ‚ EquipRegistry Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.",
      typeLabel: "Ù†ÙˆØ¹ Ø§Ù„Ø§ØªØµØ§Ù„",
      typeGeneral: "Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ø§Ù…",
      typeBusiness: "Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ / Ø§Ù„Ø´Ø±Ø§ÙƒØ§Øª",
      typeSupport: "Ø§Ù„Ø¯Ø¹Ù…",
      namePlaceholder: "Ø§Ø³Ù…Ùƒ",
      emailPlaceholder: "Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
      subjectPlaceholder: "Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹",
      messagePlaceholder: "Ø±Ø³Ø§Ù„ØªÙƒ",
      sendButton: "Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©",
      sendingButton: "Ø¬Ø§Ø±Ù Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...",
      successMessage: "ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø±Ø³Ø§Ù„ØªÙƒ Ø¨Ù†Ø¬Ø§Ø­.",
      errorMessage: "Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø¥Ø±Ø³Ø§Ù„ Ø±Ø³Ø§Ù„ØªÙƒ.",
    },
    disclaimer: {
      title: "Ø¥Ø®Ù„Ø§Ø¡ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ©",
      intro:
        "ØªÙˆÙØ± EquipRegistry Ø¨Ù†ÙŠØ© ØªØ­ØªÙŠØ© Ø±Ù‚Ù…ÙŠØ© Ù„Ù„ØªØ³Ø¬ÙŠÙ„ Ù„Ù„Ù…Ø±ÙƒØ¨Ø§Øª ÙˆØ§Ù„Ù…Ø¹Ø¯Ø§Øª ÙˆØ§Ù„Ù…Ù‚Ø·ÙˆØ±Ø§Øª ÙˆØºÙŠØ±Ù‡Ø§ Ù…Ù† Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø¤Ù‡Ù„Ø©.",
      liability:
        "Ù„Ø§ ØªØ¶Ù…Ù† EquipRegistry Ø¯Ù‚Ø© Ø£Ùˆ Ø§ÙƒØªÙ…Ø§Ù„ Ø£Ùˆ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ù„Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ù‚Ø¯Ù…Ø© Ø£Ùˆ Ø§Ù„Ù…Ø¹Ø±ÙˆØ¶Ø© Ø£Ùˆ Ø§Ù„Ù…Ø³ØªÙˆØ±Ø¯Ø©. Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù…Ù†ØµØ© ÙŠÙƒÙˆÙ† Ø¹Ù„Ù‰ Ù…Ø³Ø¤ÙˆÙ„ÙŠØªÙƒ Ø§Ù„Ø®Ø§ØµØ©.",
      data:
        "Ù‚Ø¯ ÙŠØªÙ… ØªÙˆÙÙŠØ± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ù‚Ø¨Ù„ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† ÙˆØ§Ù„Ø´Ø±ÙƒØ§Ø¡ ÙˆØ´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ§Ù„Ø³Ù„Ø·Ø§Øª ÙˆØ§Ù„Ù…Ø¤Ø³Ø³Ø§Øª Ø§Ù„Ù…Ø§Ù„ÙŠØ© ÙˆØ§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ù…ØªÙƒØ§Ù…Ù„Ø© Ù…Ø³ØªÙ‚Ø¨Ù„Ù‹Ø§.",
      future:
        "Ù‚Ø¯ ØªØ´Ù…Ù„ Ø§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª Ø§Ù„Ù…Ø³ØªÙ‚Ø¨Ù„ÙŠØ© Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ¬Ù‡Ø§Øª Ø¥Ù†ÙØ§Ø° Ø§Ù„Ù‚Ø§Ù†ÙˆÙ† ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø¹Ø§Ø¨Ø±Ø© Ù„Ù„Ø­Ø¯ÙˆØ¯ ÙˆÙ†Ù‚Ù„ Ø§Ù„Ù…Ù„ÙƒÙŠØ© ÙˆØ£Ù†Ø¸Ù…Ø© Ø§Ù„Ø¯ÙØ¹ ÙˆØ·Ø¨Ù‚Ø§Øª Ø§Ù„ØªØ­Ù‚Ù‚.",
      contact:
        "EquipRegistry â€” Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "تحقق من مصدر المركبات والمعدات وحالتها ومخاطرها حول العالم",
    subtitle:
      "استخدم VIN والأرقام التسلسلية ومعرّفات السجل للتحقق من المصدر والحالة الحالية وإشارات المخاطر قبل الشراء أو التمويل أو التأمين أو التأجير أو النقل.",
    placeholder: "Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… VIN Ø£Ùˆ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠ Ø£Ùˆ Ù…Ø¹Ø±Ù Ø§Ù„Ø³Ø¬Ù„",
    search: "Ø¨Ø­Ø«",
    demoSerials: "Ø£Ø±Ù‚Ø§Ù… ØªØ³Ù„Ø³Ù„ÙŠØ© ØªØ¬Ø±ÙŠØ¨ÙŠØ©:",
    loggedInMessage:
      "Ø£Ù†Øª Ù…Ø³Ø¬Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„. ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ø¨Ø­Ø« Ø¨Ø´ÙƒÙ„ Ø·Ø¨ÙŠØ¹ÙŠ ÙˆØ§Ù„Ø§Ø³ØªÙ…Ø±Ø§Ø± ÙÙŠ Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¬ÙˆØ§Ø²Ø§Øª Ø§Ù„Ø®Ø§ØµØ©.",
    goToDashboard: "Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ…",
    supportedAssetsTitle: "Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù…Ø¯Ø¹ÙˆÙ…Ø©",
    supportedAssetsItems: [
      "Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª (Ø§Ù„Ø³ÙŠØ§Ø±Ø§Øª ÙˆØ§Ù„Ø´Ø§Ø­Ù†Ø§Øª ÙˆØ§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø§Ù„ÙƒÙ„Ø§Ø³ÙŠÙƒÙŠØ©)",
      "Ø§Ù„Ù…Ø¹Ø¯Ø§Øª ÙˆØ§Ù„Ø¢Ù„Ø§Øª",
      "Ø§Ù„Ø¯Ø±Ø§Ø¬Ø§Øª ÙˆØ§Ù„ØªÙ†Ù‚Ù„ Ø§Ù„Ø®ÙÙŠÙ",
    ],
  },
  result: {
    whyThisMatters: "Ù„Ù…Ø§Ø°Ø§ Ù‡Ø°Ø§ Ù…Ù‡Ù…",
  },
  howItWorks: {
    title: "ÙƒÙŠÙ ÙŠØ¹Ù…Ù„ EquipRegistry",
    step1Title: "1. ØªØ­Ù‚Ù‚",
    step1Text:
      "Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… VIN Ø£Ùˆ Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠ Ø£Ùˆ Ù…Ø¹Ø±Ù Ø§Ù„Ø³Ø¬Ù„ Ù„Ù„ØªØ­Ù‚Ù‚ ÙÙˆØ±Ù‹Ø§ Ù…Ù† Ø­Ø§Ù„Ø© Ø§Ù„ØªØ³Ø¬ÙŠÙ„.",
    step2Title: "2. Ø§Ù„ØªØ­Ù‚Ù‚",
    step2Text:
      "Ø±Ø§Ø¬Ø¹ Ø³Ø¬Ù„ Ø§Ù„Ù…Ù„ÙƒÙŠØ© ÙˆØ§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙˆÙ…Ø³ØªÙˆÙ‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒÙˆÙ† Ù…ØªØ§Ø­Ø©.",
    step3Title: "3. Ø§Ù„ØªØ³Ø¬ÙŠÙ„",
    step3Text:
      "Ø³Ø¬Ù‘Ù„ Ø§Ù„Ù…Ø±ÙƒØ¨Ø§Øª Ø£Ùˆ Ø§Ù„Ù…Ø¹Ø¯Ø§Øª Ø£Ùˆ Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ø£Ø®Ø±Ù‰ ÙˆØ£Ø¶Ù Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ø¯Ø§Ø¹Ù…Ø©.",
    step4Title: "4. Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…",
    step4Text:
      "Ø§Ø³ØªØ®Ø¯Ù… Ø¬ÙˆØ§Ø² Ø§Ù„Ø³Ø¬Ù„ Ù„Ù„ØªØ£Ù…ÙŠÙ† Ø£Ùˆ Ø§Ù„ØªØ£Ø¬ÙŠØ± Ø£Ùˆ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø¨ÙŠØ¹ Ø£Ùˆ Ø§Ù„Ø§Ø³ØªØ±Ø¯Ø§Ø¯ Ø£Ùˆ Ø§Ù„Ø§Ù…ØªØ«Ø§Ù„.",
  },
  trust: {
    title: "Ù…ØµÙ…Ù… Ù„Ù„Ø«Ù‚Ø© Ø¹Ù„Ù‰ Ù†Ø·Ø§Ù‚ Ø¹Ø§Ù„Ù…ÙŠ",
    subtitle:
      "ØªÙ… ØªØµÙ…ÙŠÙ… EquipRegistry ÙƒØ¨Ù†ÙŠØ© ØªØ­ØªÙŠØ© Ù…Ø­Ø§ÙŠØ¯Ø© Ù„Ù„Ù…Ø±ÙƒØ¨Ø§Øª ÙˆØ§Ù„Ù…Ø¹Ø¯Ø§Øª ÙˆØºÙŠØ±Ù‡Ø§ Ù…Ù† Ø§Ù„Ø£ØµÙˆÙ„ Ø§Ù„Ù‚ÙŠÙ‘Ù…Ø©ØŒ Ù„Ø¯Ø¹Ù… Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ´Ø±ÙƒØ§Øª Ø§Ù„ØªØ£Ø¬ÙŠØ± ÙˆØ§Ù„Ù…Ø§Ù„ÙƒÙŠÙ† Ø§Ù„Ù…Ø­ØªØ±ÙÙŠÙ† ÙˆØ§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ø¹Ø§Ø¨Ø±Ø© Ù„Ù„Ø­Ø¯ÙˆØ¯.",
    card1Title: "Ø¬Ø§Ù‡Ø² Ù„Ù„ØªØ£Ù…ÙŠÙ†",
    card1Text:
      "Ù…Ù‡ÙŠÙƒÙ„ Ù„Ø¯Ø¹Ù… Ø§Ù„Ø§ÙƒØªØªØ§Ø¨ ÙˆØ¯ÙˆØ±Ø§Øª Ø§Ù„ØªØ­Ù‚Ù‚ ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø®Ø§Ø·Ø±.",
    card2Title: "Ù…Ø³ØªÙ‚Ù„ ÙˆÙ…Ø­Ø§ÙŠØ¯",
    card2Text:
      "ØºÙŠØ± Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„Ù…ØµÙ†Ø¹ÙŠÙ† Ø£Ùˆ Ø§Ù„Ù…ÙˆØ²Ø¹ÙŠÙ† Ø£Ùˆ Ø§Ù„ÙˆÙ„Ø§ÙŠØ§Øª Ø§Ù„Ù‚Ø¶Ø§Ø¦ÙŠØ© â€” Ù…ØµØ¯Ø± Ø¹Ø§Ù„Ù…ÙŠ Ù„Ù„Ø«Ù‚Ø©.",
    card3Title: "Ù…ØµÙ…Ù… Ù„Ù„ØªÙˆØ³Ø¹",
    card3Text:
      "Ù…Ù† Ø£ØµÙ„ ÙˆØ§Ø­Ø¯ Ø¥Ù„Ù‰ Ø£Ø³Ø§Ø·ÙŠÙ„ Ø¹Ø§Ù„Ù…ÙŠØ©ØŒ Ø¬Ø§Ù‡Ø² Ù„Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ ÙÙŠ Ø¹Ø¯Ø© Ø¯ÙˆÙ„.",
  },
  footer: {
    copyright:
      "EquipRegistry â€” Ø¨Ù†ÙŠØ© ØªØ­ØªÙŠØ© Ø±Ù‚Ù…ÙŠØ© Ù„Ù„Ø«Ù‚Ø© Ø§Ù„Ø®Ø§ØµØ© Ø¨Ø§Ù„Ø£ØµÙˆÙ„",
    privacy: "Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©",
    terms: "Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…",
    disclaimer: "Ø¥Ø®Ù„Ø§Ø¡ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ©",
  },
  statuses: {
    registeredVerified: {
      label: "Ù…Ø³Ø¬Ù„ ÙˆÙ…ØªØ­Ù‚Ù‚ Ù…Ù†Ù‡",
      message:
        "Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„ Ù…Ø³Ø¬Ù„ ÙÙŠ EquipRegistry ÙˆØªÙ… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ù…ØµØ¯Ø±Ù‡ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ.",
      why:
        "Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„ Ù„Ù‡ Ù…ØµØ¯Ø± Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù…ØªØ­Ù‚Ù‚ Ù…Ù†Ù‡ ÙˆÙ„Ø¯ÙŠÙ‡ Ø¬ÙˆØ§Ø² Ø³Ø¬Ù„ Ù†Ø´Ø·.",
      metadataStatus: "Ø§Ù„Ø­Ø§Ù„Ø©",
      metadataPassport: "Ø¬ÙˆØ§Ø² Ø§Ù„Ø³Ø¬Ù„",
      metadataValidation: "Ø¢Ø®Ø± ØªØ­Ù‚Ù‚",
      actionViewPassport: "Ø¹Ø±Ø¶ Ø§Ù„Ø¬ÙˆØ§Ø²",
    },
    historyUnknown: {
      label: "Ø§Ù„Ø³Ø¬Ù„ ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ",
      message:
        "Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„ Ù…ÙˆØ¬ÙˆØ¯ ÙÙŠ Ø§Ù„Ø³Ø¬Ù„ØŒ ÙˆÙ„ÙƒÙ† Ù„Ù… ÙŠØªÙ… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø³Ø¬Ù„ Ø§Ù„Ù…Ù„ÙƒÙŠØ© Ø§Ù„ÙƒØ§Ù…Ù„ Ø§Ù„Ø®Ø§Øµ Ø¨Ù‡.",
      why:
        "ÙŠØ²ÙŠØ¯ Ø³Ø¬Ù„ Ø§Ù„Ù…Ù„ÙƒÙŠØ© ØºÙŠØ± Ø§Ù„Ù…ÙƒØªÙ…Ù„ Ù…Ù† Ù…Ø®Ø§Ø·Ø± Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ ÙˆØ§Ù„ØªØ£Ù…ÙŠÙ† ÙˆØ§Ù„Ø§Ù…ØªØ«Ø§Ù„.",
      metadataStatus: "Ø§Ù„Ø­Ø§Ù„Ø©",
      metadataRisk: "Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù…Ø®Ø§Ø·Ø±",
      actionViewPassport: "Ø¹Ø±Ø¶ Ø§Ù„Ø¬ÙˆØ§Ø² (Ù…Ø­Ø¯ÙˆØ¯)",
      actionRequestVerification: "Ø·Ù„Ø¨ Ø§Ù„ØªØ­Ù‚Ù‚",
      actionRegisterDocuments: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª",
    },
    stolen: {
      label: "Ø£ØµÙ„ Ù…Ø³Ø±ÙˆÙ‚ â€“ ØªØ­Ø°ÙŠØ± Ø£Ø­Ù…Ø±",
      message:
        "ØªÙ… Ø§Ù„Ø¥Ø¨Ù„Ø§Øº Ø±Ø³Ù…ÙŠÙ‹Ø§ Ø¹Ù† Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„ Ø¹Ù„Ù‰ Ø£Ù†Ù‡ Ù…Ø³Ø±ÙˆÙ‚ ÙˆÙ‡Ùˆ Ù…Ø¯Ø±Ø¬ Ø¨Ù†Ø´Ø§Ø· ÙÙŠ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø³ÙˆØ¯Ø§Ø¡ Ø¯Ø§Ø®Ù„ EquipRegistry.",
      warning:
        "Ù„Ø§ ØªÙ‚Ù… Ø¨Ø´Ø±Ø§Ø¡ Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„ Ø£Ùˆ ØªØ£Ù…ÙŠÙ†Ù‡ Ø£Ùˆ Ø§Ø³ØªØ¦Ø¬Ø§Ø±Ù‡ Ø£Ùˆ Ù†Ù‚Ù„Ù‡ Ø£Ùˆ Ù‚Ø¨ÙˆÙ„ Ù†Ù‚Ù„Ù‡.",
      why:
        "Ù‚Ø¯ ØªØ¤Ø¯ÙŠ Ø£ÙŠ Ù…Ø¹Ø§Ù…Ù„Ø© ØªØªØ¹Ù„Ù‚ Ø¨Ø£ØµÙ„ Ù…Ø³Ø±ÙˆÙ‚ Ø¥Ù„Ù‰ Ø¹ÙˆØ§Ù‚Ø¨ Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆÙ…Ø§Ù„ÙŠØ©.",
      metadataStatus: "Ø§Ù„Ø­Ø§Ù„Ø©",
      metadataRisk: "Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù…Ø®Ø§Ø·Ø±",
      metadataReportedBy: "ØªÙ… Ø§Ù„Ø¥Ø¨Ù„Ø§Øº Ø¨ÙˆØ§Ø³Ø·Ø©",
      metadataJurisdiction: "Ø§Ù„Ø§Ø®ØªØµØ§Øµ Ø§Ù„Ù‚Ø¶Ø§Ø¦ÙŠ",
      metadataReportDate: "ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¨Ù„Ø§Øº",
      actionReportSighting: "Ø§Ù„Ø¥Ø¨Ù„Ø§Øº Ø¹Ù† Ù…Ø´Ø§Ù‡Ø¯Ø©",
      actionContactAuthorities: "Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø³Ù„Ø·Ø§Øª",
      actionVerifyCaseId: "Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø±Ù‚Ù… Ø§Ù„Ù‚Ø¶ÙŠØ©",
    },
    notRegistered: {
      label: "ØºÙŠØ± Ù…Ø³Ø¬Ù„",
      message: "Ù‡Ø°Ø§ Ø§Ù„Ù…Ø¹Ø±Ù‘Ù ØºÙŠØ± Ù…Ø³Ø¬Ù„ ÙÙŠ EquipRegistry.",
      why:
        "Ø§Ù„Ø£ØµÙ„ ØºÙŠØ± Ø§Ù„Ù…Ø³Ø¬Ù„ ÙŠÙØªÙ‚Ø± Ø¥Ù„Ù‰ Ø³Ø¬Ù„ Ù…Ù„ÙƒÙŠØ© ÙˆØªØ§Ø±ÙŠØ® ØªÙ… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù†Ù‡Ù…Ø§.",
      actionRegister: "ØªØ³Ø¬ÙŠÙ„ Ù‡Ø°Ø§ Ø§Ù„Ø£ØµÙ„",
    },
    metadataValues: {
      active: "Ù†Ø´Ø·",
      full: "ÙƒØ§Ù…Ù„",
      lastValidation2025: "2025",
      limitedPassport: "Ø¬ÙˆØ§Ø² Ù…Ø­Ø¯ÙˆØ¯",
      medium: "Ù…ØªÙˆØ³Ø·",
      blacklisted: "Ù…Ø¯Ø±Ø¬ ÙÙŠ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø³ÙˆØ¯Ø§Ø¡",
      high: "Ù…Ø±ØªÙØ¹",
      insurancePartner: "Ø´Ø±ÙŠÙƒ ØªØ£Ù…ÙŠÙ†",
      euCrossBorderAlert: "Ø§Ù„Ø§ØªØ­Ø§Ø¯ Ø§Ù„Ø£ÙˆØ±ÙˆØ¨ÙŠ / ØªÙ†Ø¨ÙŠÙ‡ Ø¹Ø¨Ø± Ø§Ù„Ø­Ø¯ÙˆØ¯",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "Ù…Ø³ÙˆØ¯Ø©",
      incomplete: "ØºÙŠØ± Ù…ÙƒØªÙ…Ù„",
      submitted: "ØªÙ… Ø§Ù„Ø¥Ø±Ø³Ø§Ù„",
      underReview: "Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©",
      moreInfoRequired: "Ù…Ø·Ù„ÙˆØ¨ Ù…Ø²ÙŠØ¯ Ù…Ù† Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª",
      approved: "ØªÙ…Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©",
      rejected: "Ù…Ø±ÙÙˆØ¶",
      passportIssued: "Ø¬ÙˆØ§Ø² Ø§Ù„Ø£ØµÙ„ Ù…ØªØ§Ø­",
      unknown: "ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ",
    },
    registrationDetail: {
      backToAdminRegistrations: "Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©",
      backToRegistrations: "Ø§Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„ØªØ³Ø¬ÙŠÙ„Ø§Øª",
      adminPaymentConfirmationTitle: "ØªØ£ÙƒÙŠØ¯ Ø§Ù„Ø¯ÙØ¹ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ",
      adminPaymentConfirmationDescription:
        "Ø¨Ø¹Ø¯ ØªØ£ÙƒÙŠØ¯ Ø§Ù„ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¨Ù†ÙƒÙŠ ÙŠØ¯ÙˆÙŠÙ‹Ø§ØŒ Ù‚Ù… Ø¨ØªØ­Ø¯ÙŠØ¯ Ù‡Ø°Ø§ Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ø¹Ù„Ù‰ Ø£Ù†Ù‡ Ù…Ø¯ÙÙˆØ¹.",
      reviewWorkflowTitle: "Ø³ÙŠØ± Ø¹Ù…Ù„ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©",
      reviewWorkflowDescription:
        "Ø§Ù†Ù‚Ù„ Ø§Ù„ØªØ³Ø¬ÙŠÙ„ Ø¹Ø¨Ø± Ù…Ø±Ø§Ø­Ù„ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø© ÙˆØ§Ù„Ø¥ØµØ¯Ø§Ø± Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ Ù„Ù„Ø¬ÙˆØ§Ø².",
      detailsTitle: "ØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªØ³Ø¬ÙŠÙ„",
      dynamicFieldsTitle: "Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© Ù„Ù„Ø£ØµÙ„",
      noAdditionalData: "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© Ù…ØªØ§Ø­Ø©.",
      paymentCompleted: "Ù…ÙƒØªÙ…Ù„ / ØªÙ… Ø§Ù„ØªØ£ÙƒÙŠØ¯",
      paymentPending: "Ù‚ÙŠØ¯ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±",
      labels: {
        passportNumber: "Ø±Ù‚Ù… Ø§Ù„Ø¬ÙˆØ§Ø²",
        applicantType: "Ù†ÙˆØ¹ Ù…Ù‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø¨",
        assetName: "Ø§Ø³Ù… Ø§Ù„Ø£ØµÙ„",
        category: "Ø§Ù„ÙØ¦Ø©",
        subcategory: "Ø§Ù„ÙØ¦Ø© Ø§Ù„ÙØ±Ø¹ÙŠØ©",
        brand: "Ø§Ù„Ø¹Ù„Ø§Ù…Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©",
        model: "Ø§Ù„Ø·Ø±Ø§Ø²",
        serialNumber: "Ø§Ù„Ø±Ù‚Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠ",
        owner: "Ø§Ù„Ù…Ø§Ù„Ùƒ",
        ownerEmail: "Ø¨Ø±ÙŠØ¯ Ø§Ù„Ù…Ø§Ù„Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
        created: "ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ù†Ø´Ø§Ø¡",
        updated: "ØªØ§Ø±ÙŠØ® Ø§Ù„ØªØ­Ø¯ÙŠØ«",
        payment: "Ø§Ù„Ø¯ÙØ¹",
        completenessScore: "Ø¯Ø±Ø¬Ø© Ø§Ù„Ø§ÙƒØªÙ…Ø§Ù„",
        solarPanelSerialNumbers: "Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠØ© Ù„Ù„Ø£Ù„ÙˆØ§Ø­ Ø§Ù„Ø´Ù…Ø³ÙŠØ©",
        batterySerialNumbers: "Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠØ© Ù„Ù„Ø¨Ø·Ø§Ø±ÙŠØ§Øª",
        bikeBatterySerialNumbers: "Ø§Ù„Ø£Ø±Ù‚Ø§Ù… Ø§Ù„ØªØ³Ù„Ø³Ù„ÙŠØ© Ù„Ø¨Ø·Ø§Ø±ÙŠØ§Øª Ø§Ù„Ø¯Ø±Ø§Ø¬Ø§Øª",
        capacity: "Ø§Ù„Ø³Ø¹Ø©",
        powerRating: "Ø§Ù„Ù‚Ø¯Ø±Ø©",
        batchLotNumber: "Ø±Ù‚Ù… Ø§Ù„Ø¯ÙØ¹Ø© / Ø§Ù„ØªØ´ØºÙŠÙ„Ø©",
        installationLocation: "Ù…ÙˆÙ‚Ø¹ Ø§Ù„ØªØ±ÙƒÙŠØ¨",
        hoursOfOperation: "Ø³Ø§Ø¹Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„",
        deviceId: "Ù…Ø¹Ø±Ù Ø§Ù„Ø¬Ù‡Ø§Ø²",
        certification: "Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©",
        ownerOrganisation: "Ø§Ù„Ø¬Ù‡Ø© Ø§Ù„Ù…Ø§Ù„ÙƒØ©",
      },
    },
  },
};

export const dictionary: Record<Lang, Dictionary> = {
  en,
  es,
  de,
  fr,
  it,
  nl,
  pt,
  ru,
  zh,
  hi,
  ar,

  pl: en,
  sv: en,
  da: en,
  no: en,
};

const dictionaryCache = new Map<Lang, Dictionary>();

export function getDictionary(lang: string) {
  const requestedLang = lang as Lang;
  const safeLang = requestedLang in dictionary ? requestedLang : "en";

  if (!dictionaryCache.has(safeLang)) {
    dictionaryCache.set(
      safeLang,
      repairMojibakeDeep(dictionary[safeLang] ?? dictionary.en)
    );
  }

  return dictionaryCache.get(safeLang) ?? dictionary.en;
}
