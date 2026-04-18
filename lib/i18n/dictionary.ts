import type { Lang } from "./config";

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
      title: "For Insurers / Partners",
      subtitle:
        "EquipRegistry is designed as a trust layer for insurers, rental companies, financial institutions and logistics terminals.",
      insurersTitle: "Insurance companies",
      insurersText:
        "Improve underwriting, reduce fraud and accelerate recovery. EquipRegistry enables real-time validation of ownership, asset history and risk status. Detect stolen assets instantly and prevent claims on fraudulent equipment.",
      rentalTitle: "Rental companies",
      rentalText:
        "Gain full visibility over your fleet across borders. Prevent fraud, verify customers and protect your assets against theft, duplicate registrations and illegal resale.",
      financeTitle: "Banks & financial institutions",
      financeText:
        "Prevent double financing and asset fraud. EquipRegistry allows lenders to verify if an asset is already financed, registered or flagged. Reduce risk in asset-based lending and leasing structures.",
      financeRiskTitle: "Double financing risk",
      financeRiskText:
        "The same asset can be used as collateral multiple times across different institutions or countries. Without a shared trust layer, this creates hidden exposure, fraud risk and potential financial loss.",
      financeVerificationTitle: "Verification before financing",
      financeVerificationText:
        "Confirm whether an asset is already registered, financed, flagged, or associated with a risk event before approving a lease or loan.",
      financeTrustTitle: "Cross-border trust",
      financeTrustText:
        "Support safer international transactions involving machines, vehicles, trailers and other movable assets used in financing structures.",
      terminalsTitle: "Ports & logistics terminals",
      terminalsText:
        "Verify incoming and outgoing equipment in real-time. Detect stolen or flagged assets before they enter or leave your terminal. Support customs, inspections and cross-border compliance.",
      rentalVisibilityTitle: "Fleet visibility",
      rentalVisibilityText:
        "Keep a clearer overview of equipment identity, status and risk across multiple countries and operating locations.",
      rentalPreventionTitle: "Theft prevention",
      rentalPreventionText:
        "Support faster flagging and stronger fraud prevention around stolen, missing or illegally resold assets.",
      rentalOriginTitle: "Proof of origin",
      rentalOriginText:
        "Improve ownership proof and trust for insurers, buyers, partners, and cross-border stakeholders.",
      terminalsEntryTitle: "Entry and exit control",
      terminalsEntryText:
        "Add an extra verification layer before equipment enters or leaves secure operational zones.",
      terminalsCustomsTitle: "Customs and inspections",
      terminalsCustomsText:
        "Support customs, terminal checks and compliance processes with stronger asset identification and risk visibility.",
      ctaText:
        "EquipRegistry is built to support trusted partners across insurance, rental, finance, logistics and recovery workflows.",
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
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verify any vehicle or equipment worldwide",
    subtitle:
      "Check ownership, history, and risk status using VIN, serial number or registry ID.",
    placeholder: "Enter VIN, serial number or registry ID",
    search: "Search",
    demoSerials: "Demo serials:",
    loggedInMessage:
      "You’re logged in. You can use search normally and still access private passports.",
    goToDashboard: "Go to dashboard",
    supportedAssetsTitle: "Supported assets",
    supportedAssetsItems: [
      "Vehicles (cars, trucks and classic vehicles)",
      "Equipment and machinery",
      "Bikes and light mobility",
    ],
  },
  result: {
    whyThisMatters: "Why this matters",
  },
  howItWorks: {
    title: "How EquipRegistry Works",
    step1Title: "1. Check",
    step1Text:
      "Enter a VIN, serial number or registry ID to instantly check registration status.",
    step2Title: "2. Verify",
    step2Text:
      "Review ownership history, documents and validation level where available.",
    step3Title: "3. Register",
    step3Text:
      "Register vehicles, equipment or other assets and add supporting records.",
    step4Title: "4. Use",
    step4Text:
      "Use the registry passport for insurance, rental, resale, recovery or compliance.",
  },
  trust: {
    title: "Built for Trust at Global Scale",
    subtitle:
      "EquipRegistry is designed as neutral infrastructure for vehicles, equipment and other valuable assets — supporting insurers, rental companies, professional owners and cross-border transactions.",
    card1Title: "Insurance-ready",
    card1Text:
      "Structured to support underwriting, validation cycles and risk-based decision making.",
    card2Title: "Independent & Neutral",
    card2Text:
      "Not tied to manufacturers, dealers or jurisdictions — one global source of trust.",
    card3Title: "Designed to Scale",
    card3Text:
      "From single assets to global fleets, built for multi-country adoption.",
  },
  footer: {
    copyright: "EquipRegistry — Digital asset trust infrastructure",
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
      label: "Stolen Asset – Red Flag",
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
    howItWorks: "Cómo funciona",
    login: "Acceso",
    dashboard: "Panel",
    logout: "Cerrar sesión",
    menu: "Menú",
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
    goToHomepageSearch: "Ir a la búsqueda de inicio",
    publicVerification: "Verificación pública",
    whySightingsMatter: "Por qué los avistamientos importan",
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
        "Busque un número de serie y compruebe si el equipo está registrado, verificado, marcado o desconocido.",
      introTitle: "Verificación pública",
      introText:
        "Esta página será la ruta pública dedicada a la verificación. Por ahora, la búsqueda en vivo sigue estando en la página principal.",
    },
    register: {
      title: "Registrar activo",
      subtitle:
        "Inicie el flujo de registro para equipos, vehículos o remolques y prepare el activo para un pasaporte digital de registro.",
      vehicleTitle: "Vehículo",
      vehicleText:
        "Coches, camiones, furgonetas, campers y otros activos de carretera con VIN o referencia de serie.",
      equipmentTitle: "Equipo",
      equipmentText:
        "Maquinaria de construcción, agrícola, industrial y de alquiler con número de serie de máquina.",
      trailerTitle: "Remolque",
      trailerText:
        "Remolques y activos remolcados que requieren identidad, procedencia y visibilidad de confianza.",
    },
    reportSighting: {
      title: "Reportar avistamiento",
      subtitle:
        "Reporte un avistamiento de equipo marcado o robado y ayude a mejorar la visibilidad transfronteriza.",
      introTitle: "Por qué los avistamientos importan",
      introText:
        "Los reportes públicos de avistamiento pueden ayudar a aseguradoras, autoridades y propietarios legítimos a actuar más rápido cuando un equipo está marcado, robado o bajo investigación.",
    },
    partners: {
      title: "Para aseguradoras / socios",
      subtitle:
        "EquipRegistry está diseñado como una capa de confianza para aseguradoras, empresas de alquiler, entidades financieras y terminales logísticos.",
      insurersTitle: "Aseguradoras",
      insurersText:
        "Mejore la suscripción, reduzca el fraude y acelere la recuperación. EquipRegistry permite validar en tiempo real la propiedad, el historial y el estado de riesgo. Detecte activos robados al instante y evite reclamaciones sobre equipos fraudulentos.",
      rentalTitle: "Empresas de alquiler",
      rentalText:
        "Obtenga visibilidad total de su flota a nivel internacional. Prevenga fraude, verifique clientes y proteja sus activos contra robo, registros duplicados y reventa ilegal.",
      financeTitle: "Bancos e instituciones financieras",
      financeText:
        "Evite la doble financiación y el fraude de activos. EquipRegistry permite verificar si un activo ya está financiado, registrado o señalado. Reduzca el riesgo en estructuras de leasing y financiación basada en activos.",
      financeRiskTitle: "Riesgo de doble financiación",
      financeRiskText:
        "El mismo activo puede utilizarse como garantía varias veces en diferentes entidades o países. Sin una capa de confianza compartida, esto crea exposición oculta, riesgo de fraude y posibles pérdidas financieras.",
      financeVerificationTitle: "Verificación antes de financiar",
      financeVerificationText:
        "Confirme si un activo ya está registrado, financiado, señalado o vinculado a un incidente de riesgo antes de aprobar un leasing o un préstamo.",
      financeTrustTitle: "Confianza transfronteriza",
      financeTrustText:
        "Impulse transacciones internacionales más seguras relacionadas con maquinaria, vehículos, remolques y otros activos móviles utilizados en estructuras de financiación.",
      terminalsTitle: "Puertos y terminales logísticos",
      terminalsText:
        "Verifique equipos entrantes y salientes en tiempo real. Detecte activos robados o marcados antes de que entren o salgan de su terminal. Apoye aduanas, inspecciones y cumplimiento transfronterizo.",
      rentalVisibilityTitle: "Visibilidad de la flota",
      rentalVisibilityText:
        "Mantenga una visión más clara de la identidad, el estado y el riesgo del equipo en varios países y ubicaciones operativas.",
      rentalPreventionTitle: "Prevención del robo",
      rentalPreventionText:
        "Facilite un marcado más rápido y una prevención más sólida del fraude en torno a activos robados, desaparecidos o revendidos ilegalmente.",
      rentalOriginTitle: "Prueba de procedencia",
      rentalOriginText:
        "Refuerce la prueba de propiedad y la confianza para aseguradoras, compradores, socios y actores transfronterizos.",
      terminalsEntryTitle: "Control de entrada y salida",
      terminalsEntryText:
        "Añada una capa extra de verificación antes de que el equipo entre o salga de zonas operativas seguras.",
      terminalsCustomsTitle: "Aduanas e inspecciones",
      terminalsCustomsText:
        "Apoye los controles aduaneros, las revisiones en terminales y los procesos de cumplimiento con una identificación de activos y una visibilidad del riesgo más sólidas.",
      ctaText:
        "EquipRegistry está diseñado para apoyar a socios de confianza en flujos de seguros, alquiler, financiación, logística y recuperación.",
    },
   contact: {
  title: "Contacto",
  subtitle:
    "Póngase en contacto para colaboraciones, casos de uso con aseguradoras, pilotos o cooperación estratégica.",
  generalTitle: "Consultas generales",
  generalText:
    "Para preguntas generales sobre EquipRegistry, la plataforma, la verificación pública o cómo funciona el registro.",
  businessTitle: "Empresas y colaboraciones",
  businessText:
    "Para aseguradoras, empresas de alquiler, bancos, terminales y organizaciones interesadas en colaboración, proyectos piloto o integración.",
  supportTitle: "Soporte",
  supportText:
    "Para ayuda relacionada con registros, pasaportes del registro, datos enviados o cuestiones de la plataforma.",
  emailLabel: "Correo electrónico",
  formTitle: "Formulario de contacto",
  formIntro:
    "Elija el tipo de contacto correcto para que su mensaje llegue directamente al buzón adecuado de EquipRegistry.",
  typeLabel: "Tipo de contacto",
  typeGeneral: "Consulta general",
  typeBusiness: "Empresas / Colaboraciones",
  typeSupport: "Soporte",
  namePlaceholder: "Su nombre",
  emailPlaceholder: "Su correo electrónico",
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
        "EquipRegistry proporciona una infraestructura digital de registro para vehículos, equipos, remolques y otros activos elegibles.",
      liability:
        "EquipRegistry no garantiza la exactitud, integridad o validez legal de los datos enviados, mostrados o importados. El uso de la plataforma es bajo su propia responsabilidad.",
      data:
        "Los datos pueden ser aportados por usuarios, socios, aseguradoras, autoridades, entidades financieras y futuros sistemas integrados.",
      future:
        "Las futuras integraciones podrán incluir aseguradoras, autoridades, flujos transfronterizos, transferencias de propiedad, sistemas de pago y capas de validación.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, España. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifique cualquier vehículo o equipo en todo el mundo",
    subtitle:
      "Compruebe titularidad, historial y nivel de riesgo usando VIN, número de serie o ID de registro.",
    placeholder: "Introduzca VIN, número de serie o ID de registro",
    search: "Buscar",
    demoSerials: "Series demo:",
    loggedInMessage:
      "Ha iniciado sesión. Puede usar la búsqueda normalmente y acceder a pasaportes privados.",
    goToDashboard: "Ir al panel",
    supportedAssetsTitle: "Activos compatibles",
    supportedAssetsItems: [
      "Vehículos (coches, camiones y vehículos clásicos)",
      "Equipos y maquinaria",
      "Bicicletas y movilidad ligera",
    ],
  },
  result: {
    whyThisMatters: "Por qué es importante",
  },
  howItWorks: {
    title: "Cómo funciona EquipRegistry",
    step1Title: "1. Consultar",
    step1Text:
      "Introduzca un VIN, número de serie o ID de registro para comprobar al instante el estado del registro.",
    step2Title: "2. Verificar",
    step2Text:
      "Revise historial de titularidad, documentos y nivel de validación cuando estén disponibles.",
    step3Title: "3. Registrar",
    step3Text:
      "Registre vehículos, equipos u otros activos y añada documentación de soporte.",
    step4Title: "4. Utilizar",
    step4Text:
      "Utilice el pasaporte registral para seguros, alquiler, reventa, recuperación o cumplimiento.",
  },
  trust: {
    title: "Diseñado para generar confianza a escala global",
    subtitle:
      "EquipRegistry está diseñado como infraestructura neutral para vehículos, equipos y otros activos valiosos, apoyando a aseguradoras, empresas de alquiler, propietarios profesionales y transacciones transfronterizas.",
    card1Title: "Preparado para seguros",
    card1Text:
      "Estructurado para respaldar suscripción, ciclos de validación y decisiones basadas en riesgo.",
    card2Title: "Independiente y neutral",
    card2Text:
      "No está vinculado a fabricantes, distribuidores ni jurisdicciones: una fuente global de confianza.",
    card3Title: "Diseñado para escalar",
    card3Text:
      "Desde un solo activo hasta flotas globales, preparado para adopción multi-país.",
  },
  footer: {
    copyright:
      "EquipRegistry — Infraestructura digital de confianza para activos",
    privacy: "Política de privacidad",
    terms: "Términos y condiciones",
    disclaimer: "Aviso legal",
  },
  statuses: {
    registeredVerified: {
      label: "Registrado y verificado",
      message:
        "Este activo está registrado en EquipRegistry y su origen legal ha sido verificado.",
      why:
        "Este activo tiene un origen legal verificado y un pasaporte registral activo.",
      metadataStatus: "Estado",
      metadataPassport: "Pasaporte registral",
      metadataValidation: "Última validación",
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
      actionRequestVerification: "Solicitar verificación",
      actionRegisterDocuments: "Registrar documentos",
    },
    stolen: {
      label: "Activo robado – Alerta roja",
      message:
        "Este activo ha sido reportado oficialmente como robado y está activamente bloqueado en EquipRegistry.",
      warning:
        "NO compre, asegure, alquile, transporte ni acepte la transferencia de este activo.",
      why:
        "Cualquier transacción con un activo robado puede generar consecuencias legales y financieras.",
      metadataStatus: "Estado",
      metadataRisk: "Nivel de riesgo",
      metadataReportedBy: "Reportado por",
      metadataJurisdiction: "Jurisdicción",
      metadataReportDate: "Fecha del reporte",
      actionReportSighting: "Reportar avistamiento",
      actionContactAuthorities: "Contactar autoridades",
      actionVerifyCaseId: "Verificar ID del caso",
    },
    notRegistered: {
      label: "No registrado",
      message: "Este identificador no está registrado en EquipRegistry.",
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
  underReview: "En revisión",
  moreInfoRequired: "Se requiere más información",
  approved: "Aprobado",
  rejected: "Rechazado",
  passportIssued: "Pasaporte disponible",
  unknown: "Desconocido",
},
    registrationDetail: {
      backToAdminRegistrations: "Volver a registros de administración",
      backToRegistrations: "Volver a registros",
      adminPaymentConfirmationTitle: "Confirmación administrativa del pago",
      adminPaymentConfirmationDescription:
        "Después de confirmar manualmente la transferencia bancaria, marque este registro como pagado.",
      reviewWorkflowTitle: "Flujo de revisión",
      reviewWorkflowDescription:
        "Mueva el registro a través de revisión, aprobación y emisión final del pasaporte.",
      detailsTitle: "Detalles del registro",
      dynamicFieldsTitle: "Datos adicionales del activo",
      noAdditionalData: "No hay datos adicionales disponibles.",
      paymentCompleted: "Completado / Confirmado",
      paymentPending: "Pendiente",
      labels: {
        passportNumber: "Número de pasaporte",
        applicantType: "Tipo de solicitante",
        assetName: "Nombre del activo",
        category: "Categoría",
        subcategory: "Subcategoría",
        brand: "Marca",
        model: "Modelo",
        serialNumber: "Número de serie",
        owner: "Propietario",
        ownerEmail: "Correo del propietario",
        created: "Creado",
        updated: "Actualizado",
        payment: "Pago",
        completenessScore: "Nivel de completitud",
        solarPanelSerialNumbers: "Números de serie de paneles solares",
        batterySerialNumbers: "Números de serie de baterías",
        bikeBatterySerialNumbers:
          "Números de serie de baterías de bicicleta",
        capacity: "Capacidad",
        powerRating: "Potencia",
        batchLotNumber: "Número de lote / partida",
        installationLocation: "Ubicación de instalación",
        hoursOfOperation: "Horas de funcionamiento",
        deviceId: "ID del dispositivo",
        certification: "Certificación",
        ownerOrganisation: "Organización propietaria",
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
    menu: "Menü",
  },
  menu: {
    home: "Startseite",
    verifyAsset: "Asset prüfen",
    registerAsset: "Asset registrieren",
    pricing: "Preise",
    reportSighting: "Sichtung melden",
    partners: "Für Versicherer / Partner",
    contact: "Kontakt",
  },
  common: {
    goToHomepageSearch: "Zur Startseiten-Suche",
    publicVerification: "Öffentliche Verifizierung",
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
      title: "Asset prüfen",
      subtitle:
        "Suchen Sie nach einer Seriennummer und prüfen Sie, ob das Gerät registriert, verifiziert, markiert oder unbekannt ist.",
      introTitle: "Öffentliche Verifizierung",
      introText:
        "Diese Seite wird zur dedizierten öffentlichen Verifizierungsroute. Vorerst bleibt Ihre Live-Suche auf der Startseite.",
    },
    register: {
      title: "Asset registrieren",
      subtitle:
        "Starten Sie den Registrierungsprozess für Geräte, Fahrzeuge oder Anhänger und bereiten Sie das Asset für einen digitalen Registerpass vor.",
      vehicleTitle: "Fahrzeug",
      vehicleText:
        "Autos, Lkw, Vans, Camper und andere Straßenfahrzeuge mit VIN oder Serienreferenz.",
      equipmentTitle: "Gerät",
      equipmentText:
        "Bau-, Landwirtschafts-, Industrie- und Mietgeräte mit Maschinennummer.",
      trailerTitle: "Anhänger",
      trailerText:
        "Anhänger und gezogene Assets, die Identität, Herkunft und Vertrauenssichtbarkeit benötigen.",
    },
    reportSighting: {
      title: "Sichtung melden",
      subtitle:
        "Melden Sie eine Sichtung von markiertem oder gestohlenem Gerät und helfen Sie, die grenzüberschreitende Sichtbarkeit zu verbessern.",
      introTitle: "Warum Sichtungen wichtig sind",
      introText:
        "Öffentliche Sichtungsmeldungen können Versicherern, Behörden und rechtmäßigen Eigentümern helfen, schneller zu handeln, wenn Geräte markiert, gestohlen oder in Untersuchung sind.",
    },
    partners: {
      title: "Für Versicherer / Partner",
      subtitle:
        "EquipRegistry wurde als Vertrauensebene für Versicherer, Vermieter, Finanzinstitute und Logistikterminals entwickelt.",
      insurersTitle: "Versicherungsunternehmen",
      insurersText:
        "Verbessern Sie das Underwriting, reduzieren Sie Betrug und beschleunigen Sie die Wiederbeschaffung. EquipRegistry ermöglicht die Echtzeitvalidierung von Eigentum, Asset-Historie und Risikostatus. Erkennen Sie gestohlene Assets sofort und verhindern Sie Schäden bei betrügerischem Equipment.",
      rentalTitle: "Vermietunternehmen",
      rentalText:
        "Erhalten Sie volle Transparenz über Ihre Flotte über Ländergrenzen hinweg. Verhindern Sie Betrug, prüfen Sie Kunden und schützen Sie Ihre Assets vor Diebstahl, Doppelregistrierungen und illegalem Weiterverkauf.",
      financeTitle: "Banken & Finanzinstitute",
      financeText:
        "Verhindern Sie Doppelfinanzierung und Asset-Betrug. EquipRegistry ermöglicht es Kreditgebern zu prüfen, ob ein Asset bereits finanziert, registriert oder markiert ist. Reduzieren Sie Risiken in Leasing- und assetbasierten Finanzierungsstrukturen.",
      financeRiskTitle: "Doppelfinanzierungsrisiko",
      financeRiskText:
        "Dasselbe Asset kann bei verschiedenen Instituten oder in mehreren Ländern mehrfach als Sicherheit eingesetzt werden. Ohne eine gemeinsame Vertrauensebene entstehen verdeckte Exponierung, Betrugsrisiken und potenzielle finanzielle Verluste.",
      financeVerificationTitle: "Prüfung vor der Finanzierung",
      financeVerificationText:
        "Prüfen Sie vor der Freigabe von Leasing oder Kredit, ob ein Asset bereits registriert, finanziert, markiert oder mit einem Risikofall verbunden ist.",
      financeTrustTitle: "Grenzüberschreitendes Vertrauen",
      financeTrustText:
        "Unterstützen Sie sicherere internationale Transaktionen mit Maschinen, Fahrzeugen, Anhängern und anderen beweglichen Assets in Finanzierungsstrukturen.",
      terminalsTitle: "Häfen & Logistikterminals",
      terminalsText:
        "Verifizieren Sie ein- und ausgehendes Equipment in Echtzeit. Erkennen Sie gestohlene oder markierte Assets, bevor sie Ihr Terminal betreten oder verlassen. Unterstützen Sie Zoll, Inspektionen und grenzüberschreitende Compliance.",
      rentalVisibilityTitle: "Flottentransparenz",
      rentalVisibilityText:
        "Behalten Sie Identität, Status und Risiko Ihres Equipments über mehrere Länder und Einsatzorte hinweg besser im Blick.",
      rentalPreventionTitle: "Diebstahlprävention",
      rentalPreventionText:
        "Ermöglichen Sie schnelleres Flagging und stärkere Betrugsprävention bei gestohlenen, vermissten oder illegal weiterverkauften Assets.",
      rentalOriginTitle: "Herkunftsnachweis",
      rentalOriginText:
        "Verbessern Sie Eigentumsnachweis und Vertrauen für Versicherer, Käufer, Partner und grenzüberschreitende Beteiligte.",
      terminalsEntryTitle: "Ein- und Ausgangskontrolle",
      terminalsEntryText:
        "Fügen Sie eine zusätzliche Verifizierungsebene hinzu, bevor Equipment geschützte Betriebszonen betritt oder verlässt.",
      terminalsCustomsTitle: "Zoll und Inspektionen",
      terminalsCustomsText:
        "Unterstützen Sie Zoll-, Terminal- und Compliance-Prozesse mit stärkerer Asset-Identifikation und besserer Risikotransparenz.",
      ctaText:
        "EquipRegistry wurde entwickelt, um vertrauenswürdige Partner in Versicherungs-, Vermietungs-, Finanzierungs-, Logistik- und Wiederbeschaffungsprozessen zu unterstützen.",
    },
    contact: {
  title: "Kontakt",
  subtitle:
    "Kontaktieren Sie uns zu Partnerschaften, Versicherungsanwendungen, Pilotprojekten oder strategischer Zusammenarbeit.",
  generalTitle: "Allgemeine Anfragen",
  generalText:
    "Für allgemeine Fragen zu EquipRegistry, der Plattform, der öffentlichen Verifizierung oder zur Funktionsweise des Registers.",
  businessTitle: "Business & Partnerschaften",
  businessText:
    "Für Versicherer, Vermietunternehmen, Banken, Terminals und andere Organisationen mit Interesse an Zusammenarbeit, Pilotprojekten oder Integration.",
  supportTitle: "Support",
  supportText:
    "Für Hilfe zu Registrierungen, Registerpässen, eingereichten Daten oder plattformbezogenen Fragen.",
  emailLabel: "E-Mail",
  formTitle: "Kontaktformular",
  formIntro:
    "Wählen Sie den richtigen Kontakttyp, damit Ihre Nachricht direkt im richtigen EquipRegistry-Postfach landet.",
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
        "EquipRegistry stellt eine digitale Registerinfrastruktur für Fahrzeuge, Geräte, Anhänger und andere zulässige Vermögenswerte bereit.",
      liability:
        "EquipRegistry übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder rechtliche Gültigkeit eingereichter, angezeigter oder importierter Daten. Die Nutzung erfolgt auf eigenes Risiko.",
      data:
        "Daten können von Nutzern, Partnern, Versicherern, Behörden, Finanzinstituten und künftigen integrierten Systemen bereitgestellt werden.",
      future:
        "Künftige Integrationen können Versicherer, Behörden, grenzüberschreitende Abläufe, Eigentumsübertragungen, Zahlungssysteme und zusätzliche Validierungsebenen umfassen.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spanien. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Jedes Fahrzeug oder Gerät weltweit prüfen",
    subtitle:
      "Prüfen Sie Eigentum, Historie und Risikostatus anhand von VIN, Seriennummer oder Register-ID.",
    placeholder: "VIN, Seriennummer oder Register-ID eingeben",
    search: "Suchen",
    demoSerials: "Demo-Seriennummern:",
    loggedInMessage:
      "Sie sind eingeloggt. Sie können die Suche normal nutzen und weiterhin auf private Pässe zugreifen.",
    goToDashboard: "Zum Dashboard",
    supportedAssetsTitle: "Unterstützte Assets",
    supportedAssetsItems: [
      "Fahrzeuge (Autos, Lkw und Oldtimer)",
      "Geräte und Maschinen",
      "Fahrräder und leichte Mobilität",
    ],
  },
  result: {
    whyThisMatters: "Warum das wichtig ist",
  },
  howItWorks: {
    title: "So funktioniert EquipRegistry",
    step1Title: "1. Prüfen",
    step1Text:
      "Geben Sie eine VIN, Seriennummer oder Register-ID ein, um den Registrierungsstatus sofort zu prüfen.",
    step2Title: "2. Verifizieren",
    step2Text:
      "Prüfen Sie Eigentumshistorie, Dokumente und Validierungsstufe, sofern verfügbar.",
    step3Title: "3. Registrieren",
    step3Text:
      "Registrieren Sie Fahrzeuge, Geräte oder andere Assets und fügen Sie unterstützende Nachweise hinzu.",
    step4Title: "4. Nutzen",
    step4Text:
      "Nutzen Sie den Registerpass für Versicherung, Vermietung, Wiederverkauf, Recovery oder Compliance.",
  },
  trust: {
    title: "Für Vertrauen im globalen Maßstab gebaut",
    subtitle:
      "EquipRegistry ist als neutrale Infrastruktur für Fahrzeuge, Geräte und andere wertvolle Assets konzipiert und unterstützt Versicherer, Vermieter, professionelle Eigentümer und grenzüberschreitende Transaktionen.",
    card1Title: "Versicherungsfähig",
    card1Text:
      "Strukturiert zur Unterstützung von Underwriting, Validierungszyklen und risikobasierten Entscheidungen.",
    card2Title: "Unabhängig & neutral",
    card2Text:
      "Nicht an Hersteller, Händler oder Rechtsräume gebunden — eine globale Vertrauensquelle.",
    card3Title: "Für Skalierung gebaut",
    card3Text:
      "Von einzelnen Assets bis zu globalen Flotten, ausgelegt für länderübergreifende Einführung.",
  },
  footer: {
    copyright:
      "EquipRegistry — Digitale Vertrauensinfrastruktur für Assets",
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
        "Dieses Asset ist im Register vorhanden, aber seine vollständige Eigentumshistorie konnte nicht verifiziert werden.",
      why:
        "Eine unvollständige Eigentumshistorie erhöht Betrugs-, Versicherungs- und Compliance-Risiken.",
      metadataStatus: "Status",
      metadataRisk: "Risikostufe",
      actionViewPassport: "Pass ansehen (eingeschränkt)",
      actionRequestVerification: "Verifizierung anfordern",
      actionRegisterDocuments: "Dokumente registrieren",
    },
    stolen: {
      label: "Gestohlenes Asset – Warnstufe Rot",
      message:
        "Dieses Asset wurde offiziell als gestohlen gemeldet und ist in EquipRegistry aktiv gesperrt.",
      warning:
        "Dieses Asset NICHT kaufen, versichern, mieten, transportieren oder übernehmen.",
      why:
        "Jede Transaktion mit einem gestohlenen Asset kann rechtliche und finanzielle Folgen haben.",
      metadataStatus: "Status",
      metadataRisk: "Risikostufe",
      metadataReportedBy: "Gemeldet von",
      metadataJurisdiction: "Jurisdiktion",
      metadataReportDate: "Meldedatum",
      actionReportSighting: "Sichtung melden",
      actionContactAuthorities: "Behörden kontaktieren",
      actionVerifyCaseId: "Fall-ID prüfen",
    },
    notRegistered: {
      label: "Nicht registriert",
      message: "Diese Kennung ist nicht in EquipRegistry registriert.",
      why:
        "Ein nicht registriertes Asset verfügt nicht über einen verifizierten Eigentums- und Verlaufseintrag.",
      actionRegister: "Dieses Asset registrieren",
    },
    metadataValues: {
      active: "Aktiv",
      full: "Vollständig",
      lastValidation2025: "2025",
      limitedPassport: "Eingeschränkter Pass",
      medium: "Mittel",
      blacklisted: "Gesperrt",
      high: "Hoch",
      insurancePartner: "Versicherungspartner",
      euCrossBorderAlert: "EU / Grenzüberschreitende Warnung",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Entwurf",
  incomplete: "Unvollständig",
  submitted: "Eingereicht",
  underReview: "In Prüfung",
  moreInfoRequired: "Weitere Informationen erforderlich",
  approved: "Genehmigt",
  rejected: "Abgelehnt",
  passportIssued: "Pass verfügbar",
  unknown: "Unbekannt",
},
    registrationDetail: {
      backToAdminRegistrations: "Zurück zu Admin-Registrierungen",
      backToRegistrations: "Zurück zu Registrierungen",
      adminPaymentConfirmationTitle: "Admin-Zahlungsbestätigung",
      adminPaymentConfirmationDescription:
        "Nachdem Sie die Banküberweisung manuell bestätigt haben, markieren Sie diese Registrierung als bezahlt.",
      reviewWorkflowTitle: "Prüfungsworkflow",
      reviewWorkflowDescription:
        "Führen Sie die Registrierung durch Prüfung, Genehmigung und endgültige Passausstellung.",
      detailsTitle: "Registrierungsdetails",
      dynamicFieldsTitle: "Zusätzliche Asset-Daten",
      noAdditionalData: "Keine zusätzlichen Daten verfügbar.",
      paymentCompleted: "Abgeschlossen / Bestätigt",
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
        owner: "Eigentümer",
        ownerEmail: "E-Mail des Eigentümers",
        created: "Erstellt",
        updated: "Aktualisiert",
        payment: "Zahlung",
        completenessScore: "Vollständigkeitsgrad",
        solarPanelSerialNumbers: "Seriennummern der Solarmodule",
        batterySerialNumbers: "Seriennummern der Batterien",
        bikeBatterySerialNumbers: "Seriennummern der Fahrradakkus",
        capacity: "Kapazität",
        powerRating: "Leistung",
        batchLotNumber: "Chargen- / Losnummer",
        installationLocation: "Installationsort",
        hoursOfOperation: "Betriebsstunden",
        deviceId: "Geräte-ID",
        certification: "Zertifizierung",
        ownerOrganisation: "Eigentümerorganisation",
      },
    },
  },
};

const fr: Dictionary = {
  nav: {
    howItWorks: "Fonctionnement",
    login: "Connexion",
    dashboard: "Tableau de bord",
    logout: "Déconnexion",
    menu: "Menu",
  },
  menu: {
    home: "Accueil",
    verifyAsset: "Vérifier l’actif",
    registerAsset: "Enregistrer l’actif",
    pricing: "Tarifs",
    reportSighting: "Signaler un repérage",
    partners: "Pour assureurs / partenaires",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Aller à la recherche d’accueil",
    publicVerification: "Vérification publique",
    whySightingsMatter: "Pourquoi les repérages comptent",
    contactEquipRegistry: "Contacter EquipRegistry",
    print: "Imprimer",
    downloadPdf: "Télécharger PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Demandes d’enregistrement",
    newRegistration: "Nouvel enregistrement",
  },
},
    verify: {
      title: "Vérifier l’actif",
      subtitle:
        "Recherchez un numéro de série et vérifiez si l’équipement est enregistré, vérifié, signalé ou inconnu.",
      introTitle: "Vérification publique",
      introText:
        "Cette page deviendra l’itinéraire public dédié à la vérification. Pour le moment, votre recherche en direct reste sur la page d’accueil.",
    },
    register: {
      title: "Enregistrer l’actif",
      subtitle:
        "Démarrez le processus d’enregistrement pour les équipements, véhicules ou remorques et préparez l’actif pour un passeport numérique de registre.",
      vehicleTitle: "Véhicule",
      vehicleText:
        "Voitures, camions, fourgons, camping-cars et autres actifs routiers avec VIN ou référence série.",
      equipmentTitle: "Équipement",
      equipmentText:
        "Équipements de construction, agricoles, industriels et de location avec numéro de série machine.",
      trailerTitle: "Remorque",
      trailerText:
        "Remorques et actifs tractés nécessitant identité, provenance et visibilité de confiance.",
    },
    reportSighting: {
      title: "Signaler un repérage",
      subtitle:
        "Signalez un repérage d’équipement signalé ou volé et contribuez à améliorer la visibilité transfrontalière.",
      introTitle: "Pourquoi les repérages comptent",
      introText:
        "Les signalements publics peuvent aider les assureurs, les autorités et les propriétaires légitimes à agir plus vite lorsqu’un équipement est signalé, volé ou sous enquête.",
    },
    partners: {
      title: "Pour assureurs / partenaires",
      subtitle:
        "EquipRegistry est conçu comme une couche de confiance pour les assureurs, les sociétés de location, les institutions financières et les terminaux logistiques.",
      insurersTitle: "Compagnies d’assurance",
      insurersText:
        "Améliorez la souscription, réduisez la fraude et accélérez la récupération. EquipRegistry permet une validation en temps réel de la propriété, de l’historique de l’actif et du niveau de risque. Détectez immédiatement les actifs volés et évitez les sinistres liés à des équipements frauduleux.",
      rentalTitle: "Sociétés de location",
      rentalText:
        "Obtenez une visibilité complète de votre flotte au-delà des frontières. Prévenez la fraude, vérifiez les clients et protégez vos actifs contre le vol, les doubles enregistrements et la revente illégale.",
      financeTitle: "Banques et institutions financières",
      financeText:
        "Prévenez le double financement et la fraude liée aux actifs. EquipRegistry permet aux prêteurs de vérifier si un actif est déjà financé, enregistré ou signalé. Réduisez les risques dans les structures de leasing et de financement adossé à des actifs.",
      financeRiskTitle: "Risque de double financement",
      financeRiskText:
        "Le même actif peut être utilisé comme garantie plusieurs fois auprès d’institutions ou dans différents pays. Sans couche de confiance partagée, cela crée une exposition cachée, un risque de fraude et des pertes financières potentielles.",
      financeVerificationTitle: "Vérification avant financement",
      financeVerificationText:
        "Vérifiez si un actif est déjà enregistré, financé, signalé ou associé à un événement de risque avant d’approuver un leasing ou un prêt.",
      financeTrustTitle: "Confiance transfrontalière",
      financeTrustText:
        "Soutenez des transactions internationales plus sûres impliquant des machines, des véhicules, des remorques et d’autres actifs mobiles utilisés dans des structures de financement.",
      terminalsTitle: "Ports et terminaux logistiques",
      terminalsText:
        "Vérifiez les équipements entrants et sortants en temps réel. Détectez les actifs volés ou signalés avant qu’ils n’entrent ou ne quittent votre terminal. Soutenez les douanes, les inspections et la conformité transfrontalière.",
      rentalVisibilityTitle: "Visibilité de flotte",
      rentalVisibilityText:
        "Gardez une vue plus claire de l’identité, du statut et du risque des équipements dans plusieurs pays et sites d’exploitation.",
      rentalPreventionTitle: "Prévention du vol",
      rentalPreventionText:
        "Permettez un signalement plus rapide et une prévention renforcée de la fraude autour des actifs volés, manquants ou revendus illégalement.",
      rentalOriginTitle: "Preuve de provenance",
      rentalOriginText:
        "Renforcez la preuve de propriété et la confiance pour les assureurs, acheteurs, partenaires et acteurs transfrontaliers.",
      terminalsEntryTitle: "Contrôle des entrées et sorties",
      terminalsEntryText:
        "Ajoutez une couche de vérification supplémentaire avant que l’équipement n’entre ou ne sorte de zones opérationnelles sécurisées.",
      terminalsCustomsTitle: "Douanes et inspections",
      terminalsCustomsText:
        "Soutenez les contrôles douaniers, les vérifications terminalaires et les processus de conformité grâce à une identification des actifs et une visibilité du risque renforcées.",
      ctaText:
        "EquipRegistry est conçu pour soutenir des partenaires de confiance dans les flux d’assurance, de location, de financement, de logistique et de récupération.",
    },
    contact: {
  title: "Contact",
  subtitle:
    "Prenez contact pour des partenariats, des cas d’usage assurance, des pilotes ou une collaboration stratégique.",
  generalTitle: "Demandes générales",
  generalText:
    "Pour toute question générale sur EquipRegistry, la plateforme, la vérification publique ou le fonctionnement du registre.",
  businessTitle: "Business & partenariats",
  businessText:
    "Pour les assureurs, sociétés de location, banques, terminaux et autres organisations intéressées par une collaboration, un projet pilote ou une intégration.",
  supportTitle: "Support",
  supportText:
    "Pour obtenir de l’aide concernant les enregistrements, les passeports du registre, les données soumises ou les questions liées à la plateforme.",
  emailLabel: "E-mail",
  formTitle: "Formulaire de contact",
  formIntro:
    "Choisissez le bon type de contact afin que votre message soit envoyé directement à la bonne boîte EquipRegistry.",
  typeLabel: "Type de contact",
  typeGeneral: "Demande générale",
  typeBusiness: "Business / partenariats",
  typeSupport: "Support",
  namePlaceholder: "Votre nom",
  emailPlaceholder: "Votre e-mail",
  subjectPlaceholder: "Objet",
  messagePlaceholder: "Votre message",
  sendButton: "Envoyer le message",
  sendingButton: "Envoi en cours...",
successMessage: "Votre message a été envoyé avec succès.",
errorMessage: "Une erreur s’est produite lors de l’envoi de votre message.",
},
    disclaimer: {
      title: "Avertissement",
      intro:
        "EquipRegistry fournit une infrastructure numérique de registre pour les véhicules, équipements, remorques et autres actifs éligibles.",
      liability:
        "EquipRegistry ne garantit pas l’exactitude, l’exhaustivité ou la validité juridique des données soumises, affichées ou importées. L’utilisation de la plateforme se fait aux risques de l’utilisateur.",
      data:
        "Les données peuvent être fournies par des utilisateurs, partenaires, assureurs, autorités, institutions financières et futurs systèmes intégrés.",
      future:
        "Les futures intégrations pourront inclure des assureurs, autorités, flux transfrontaliers, transferts de propriété, systèmes de paiement et couches de validation.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Espagne. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Vérifiez tout véhicule ou équipement dans le monde entier",
    subtitle:
      "Vérifiez la propriété, l’historique et le niveau de risque à l’aide du VIN, du numéro de série ou de l’identifiant de registre.",
    placeholder: "Entrez le VIN, le numéro de série ou l’identifiant de registre",
    search: "Rechercher",
    demoSerials: "Numéros de démonstration :",
    loggedInMessage:
      "Vous êtes connecté. Vous pouvez utiliser la recherche normalement et accéder aux passeports privés.",
    goToDashboard: "Aller au tableau de bord",
    supportedAssetsTitle: "Actifs pris en charge",
    supportedAssetsItems: [
      "Véhicules (voitures, camions et véhicules de collection)",
      "Équipements et machines",
      "Vélos et mobilité légère",
    ],
  },
  result: {
    whyThisMatters: "Pourquoi c’est important",
  },
  howItWorks: {
    title: "Comment fonctionne EquipRegistry",
    step1Title: "1. Vérifier",
    step1Text:
      "Entrez un VIN, un numéro de série ou un identifiant de registre pour vérifier instantanément le statut d’enregistrement.",
    step2Title: "2. Contrôler",
    step2Text:
      "Examinez l’historique de propriété, les documents et le niveau de validation lorsqu’ils sont disponibles.",
    step3Title: "3. Enregistrer",
    step3Text:
      "Enregistrez des véhicules, des équipements ou d’autres actifs et ajoutez les justificatifs nécessaires.",
    step4Title: "4. Utiliser",
    step4Text:
      "Utilisez le passeport du registre pour l’assurance, la location, la revente, la récupération ou la conformité.",
  },
  trust: {
    title: "Conçu pour la confiance à l’échelle mondiale",
    subtitle:
      "EquipRegistry est conçu comme une infrastructure neutre pour les véhicules, les équipements et d’autres actifs de valeur, au service des assureurs, loueurs, propriétaires professionnels et transactions transfrontalières.",
    card1Title: "Prêt pour l’assurance",
    card1Text:
      "Structuré pour soutenir la souscription, les cycles de validation et les décisions fondées sur le risque.",
    card2Title: "Indépendant & neutre",
    card2Text:
      "Non lié aux fabricants, revendeurs ou juridictions — une source mondiale de confiance.",
    card3Title: "Conçu pour évoluer",
    card3Text:
      "D’un seul actif à des flottes mondiales, pensé pour une adoption multi-pays.",
  },
  footer: {
    copyright:
      "EquipRegistry — Infrastructure numérique de confiance pour les actifs",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales",
    disclaimer: "Avertissement",
  },
  statuses: {
    registeredVerified: {
      label: "Enregistré et vérifié",
      message:
        "Cet actif est enregistré dans EquipRegistry et son origine légale a été vérifiée.",
      why:
        "Cet actif possède une origine légale vérifiée et un passeport actif dans le registre.",
      metadataStatus: "Statut",
      metadataPassport: "Passeport registre",
      metadataValidation: "Dernière validation",
      actionViewPassport: "Voir le passeport",
    },
    historyUnknown: {
      label: "Historique inconnu",
      message:
        "Cet actif existe dans le registre, mais son historique complet de propriété n’a pas pu être vérifié.",
      why:
        "Un historique de propriété incomplet augmente les risques de fraude, d’assurance et de conformité.",
      metadataStatus: "Statut",
      metadataRisk: "Niveau de risque",
      actionViewPassport: "Voir le passeport (limité)",
      actionRequestVerification: "Demander une vérification",
      actionRegisterDocuments: "Enregistrer des documents",
    },
    stolen: {
      label: "Actif volé – Alerte rouge",
      message:
        "Cet actif a été officiellement signalé volé et est activement bloqué dans EquipRegistry.",
      warning:
        "NE PAS acheter, assurer, louer, transporter ni accepter le transfert de cet actif.",
      why:
        "Toute transaction impliquant un actif volé peut entraîner des conséquences juridiques et financières.",
      metadataStatus: "Statut",
      metadataRisk: "Niveau de risque",
      metadataReportedBy: "Signalé par",
      metadataJurisdiction: "Juridiction",
      metadataReportDate: "Date du signalement",
      actionReportSighting: "Signaler un repérage",
      actionContactAuthorities: "Contacter les autorités",
      actionVerifyCaseId: "Vérifier l’ID du dossier",
    },
    notRegistered: {
      label: "Non enregistré",
      message: "Cet identifiant n’est pas enregistré dans EquipRegistry.",
      why:
        "Un actif non enregistré ne dispose pas d’un historique et d’une propriété vérifiés.",
      actionRegister: "Enregistrer cet actif",
    },
    metadataValues: {
      active: "Actif",
      full: "Complet",
      lastValidation2025: "2025",
      limitedPassport: "Passeport limité",
      medium: "Moyen",
      blacklisted: "Bloqué",
      high: "Élevé",
      insurancePartner: "Partenaire assureur",
      euCrossBorderAlert: "UE / Alerte transfrontalière",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Brouillon",
  incomplete: "Incomplet",
  submitted: "Soumis",
  underReview: "En cours de traitement",
  moreInfoRequired: "Informations supplémentaires requises",
  approved: "Approuvé",
  rejected: "Rejeté",
  passportIssued: "Passeport disponible",
  unknown: "Inconnu",
},
    registrationDetail: {
      backToAdminRegistrations: "Retour aux enregistrements admin",
      backToRegistrations: "Retour aux enregistrements",
      adminPaymentConfirmationTitle: "Confirmation administrative du paiement",
      adminPaymentConfirmationDescription:
        "Après avoir confirmé manuellement le virement bancaire, marquez cet enregistrement comme payé.",
      reviewWorkflowTitle: "Flux de révision",
      reviewWorkflowDescription:
        "Faites passer l’enregistrement par la révision, l’approbation et l’émission finale du passeport.",
      detailsTitle: "Détails de l’enregistrement",
      dynamicFieldsTitle: "Données supplémentaires de l’actif",
      noAdditionalData: "Aucune donnée supplémentaire disponible.",
      paymentCompleted: "Terminé / Confirmé",
      paymentPending: "En attente",
      labels: {
        passportNumber: "Numéro de passeport",
        applicantType: "Type de demandeur",
        assetName: "Nom de l’actif",
        category: "Catégorie",
        subcategory: "Sous-catégorie",
        brand: "Marque",
        model: "Modèle",
        serialNumber: "Numéro de série",
        owner: "Propriétaire",
        ownerEmail: "E-mail du propriétaire",
        created: "Créé",
        updated: "Mis à jour",
        payment: "Paiement",
        completenessScore: "Niveau de complétude",
        solarPanelSerialNumbers: "Numéros de série des panneaux solaires",
        batterySerialNumbers: "Numéros de série des batteries",
        bikeBatterySerialNumbers:
          "Numéros de série des batteries de vélo",
        capacity: "Capacité",
        powerRating: "Puissance",
        batchLotNumber: "Numéro de lot / batch",
        installationLocation: "Lieu d’installation",
        hoursOfOperation: "Heures de fonctionnement",
        deviceId: "ID de l’appareil",
        certification: "Certification",
        ownerOrganisation: "Organisation propriétaire",
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
    whySightingsMatter: "Perché gli avvistamenti contano",
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
        "Cerca un numero di serie e controlla se l’attrezzatura è registrata, verificata, segnalata o sconosciuta.",
      introTitle: "Verifica pubblica",
      introText:
        "Questa pagina diventerà il percorso pubblico dedicato alla verifica. Per ora, la tua esperienza di ricerca live rimane sulla homepage.",
    },
    register: {
      title: "Registra asset",
      subtitle:
        "Avvia il flusso di registrazione per attrezzature, veicoli o rimorchi e prepara l’asset per un passaporto digitale di registro.",
      vehicleTitle: "Veicolo",
      vehicleText:
        "Auto, camion, furgoni, camper e altri asset stradali con VIN o riferimento seriale.",
      equipmentTitle: "Attrezzatura",
      equipmentText:
        "Attrezzature da costruzione, agricole, industriali e a noleggio con numero di serie macchina.",
      trailerTitle: "Rimorchio",
      trailerText:
        "Rimorchi e asset trainati che richiedono identità, provenienza e visibilità di fiducia.",
    },
    reportSighting: {
      title: "Segnala avvistamento",
      subtitle:
        "Segnala l’avvistamento di attrezzature segnalate o rubate e contribuisci a migliorare la visibilità transfrontaliera.",
      introTitle: "Perché gli avvistamenti contano",
      introText:
        "Le segnalazioni pubbliche di avvistamento possono aiutare assicuratori, autorità e proprietari legittimi ad agire più rapidamente quando un’attrezzatura è segnalata, rubata o sotto indagine.",
    },
    partners: {
      title: "Per assicuratori / partner",
      subtitle:
        "EquipRegistry è progettato come un livello di fiducia per assicuratori, società di noleggio, istituzioni finanziarie e terminal logistici.",
      insurersTitle: "Compagnie assicurative",
      insurersText:
        "Migliora l’underwriting, riduci le frodi e accelera il recupero. EquipRegistry consente la validazione in tempo reale di proprietà, storico dell’asset e stato di rischio. Rileva immediatamente gli asset rubati e previeni sinistri su attrezzature fraudolente.",
      rentalTitle: "Società di noleggio",
      rentalText:
        "Ottieni piena visibilità della tua flotta oltre i confini. Previeni frodi, verifica i clienti e proteggi i tuoi asset da furti, registrazioni duplicate e rivendita illegale.",
      financeTitle: "Banche e istituzioni finanziarie",
      financeText:
        "Previeni doppio finanziamento e frode sugli asset. EquipRegistry consente ai finanziatori di verificare se un asset è già finanziato, registrato o segnalato. Riduci il rischio nelle strutture di leasing e finanziamento basato su asset.",
      financeRiskTitle: "Rischio di doppio finanziamento",
      financeRiskText:
        "Lo stesso asset può essere usato come garanzia più volte presso istituti o paesi diversi. Senza un livello di fiducia condiviso, ciò crea esposizione nascosta, rischio di frode e potenziali perdite finanziarie.",
      financeVerificationTitle: "Verifica prima del finanziamento",
      financeVerificationText:
        "Conferma se un asset è già registrato, finanziato, segnalato o associato a un evento di rischio prima di approvare un leasing o un prestito.",
      financeTrustTitle: "Fiducia transfrontaliera",
      financeTrustText:
        "Supporta transazioni internazionali più sicure che coinvolgono macchine, veicoli, rimorchi e altri asset mobili usati in strutture di finanziamento.",
      terminalsTitle: "Porti e terminal logistici",
      terminalsText:
        "Verifica attrezzature in entrata e in uscita in tempo reale. Rileva asset rubati o segnalati prima che entrino o escano dal terminal. Supporta dogane, ispezioni e conformità transfrontaliera.",
      rentalVisibilityTitle: "Visibilità della flotta",
      rentalVisibilityText:
        "Mantieni una visione più chiara dell’identità, dello stato e del rischio delle attrezzature in più paesi e sedi operative.",
      rentalPreventionTitle: "Prevenzione dei furti",
      rentalPreventionText:
        "Supporta segnalazioni più rapide e una prevenzione più forte delle frodi su asset rubati, scomparsi o rivenduti illegalmente.",
      rentalOriginTitle: "Prova di provenienza",
      rentalOriginText:
        "Rafforza la prova di proprietà e la fiducia per assicuratori, acquirenti, partner e soggetti transfrontalieri.",
      terminalsEntryTitle: "Controllo in entrata e uscita",
      terminalsEntryText:
        "Aggiungi un ulteriore livello di verifica prima che le attrezzature entrino o escano da aree operative protette.",
      terminalsCustomsTitle: "Dogane e ispezioni",
      terminalsCustomsText:
        "Supporta controlli doganali, verifiche terminali e processi di conformità con un’identificazione degli asset e una visibilità del rischio più forti.",
      ctaText:
        "EquipRegistry è progettato per supportare partner affidabili nei flussi assicurativi, di noleggio, finanziari, logistici e di recupero.",
    },
    contact: {
  title: "Contatto",
  subtitle:
    "Contattaci per partnership, casi d’uso assicurativi, progetti pilota o collaborazione strategica.",
  generalTitle: "Richieste generali",
  generalText:
    "Per domande generali su EquipRegistry, sulla piattaforma, sulla verifica pubblica o su come funziona il registro.",
  businessTitle: "Business e partnership",
  businessText:
    "Per assicuratori, società di noleggio, banche, terminali e altre organizzazioni interessate a collaborazione, progetti pilota o integrazione.",
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
successMessage: "Il tuo messaggio è stato inviato correttamente.",
errorMessage: "Si è verificato un errore durante l’invio del messaggio.",
},
    disclaimer: {
      title: "Disclaimer",
      intro:
        "EquipRegistry fornisce un’infrastruttura digitale di registro per veicoli, attrezzature, rimorchi e altri asset idonei.",
      liability:
        "EquipRegistry non garantisce l’accuratezza, la completezza o la validità legale dei dati inviati, mostrati o importati. L’uso della piattaforma avviene a proprio rischio.",
      data:
        "I dati possono essere forniti da utenti, partner, assicuratori, autorità, istituzioni finanziarie e futuri sistemi integrati.",
      future:
        "Le future integrazioni potranno includere assicuratori, autorità, flussi transfrontalieri, trasferimenti di proprietà, sistemi di pagamento e livelli di validazione.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spagna. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifica qualsiasi veicolo o attrezzatura in tutto il mondo",
    subtitle:
      "Controlla proprietà, cronologia e livello di rischio usando VIN, numero di serie o ID di registro.",
    placeholder: "Inserisci VIN, numero di serie o ID di registro",
    search: "Cerca",
    demoSerials: "Seriali demo:",
    loggedInMessage:
      "Hai effettuato l’accesso. Puoi usare la ricerca normalmente e accedere ai passaporti privati.",
    goToDashboard: "Vai alla dashboard",
    supportedAssetsTitle: "Asset supportati",
    supportedAssetsItems: [
      "Veicoli (auto, camion e veicoli d'epoca)",
      "Attrezzature e macchinari",
      "Biciclette e mobilità leggera",
    ],
  },
  result: {
    whyThisMatters: "Perché è importante",
  },
  howItWorks: {
    title: "Come funziona EquipRegistry",
    step1Title: "1. Controlla",
    step1Text:
      "Inserisci un VIN, numero di serie o ID di registro per verificare subito lo stato di registrazione.",
    step2Title: "2. Verifica",
    step2Text:
      "Controlla la cronologia di proprietà, i documenti e il livello di validazione quando disponibili.",
    step3Title: "3. Registra",
    step3Text:
      "Registra veicoli, attrezzature o altri asset e aggiungi documentazione di supporto.",
    step4Title: "4. Usa",
    step4Text:
      "Usa il passaporto del registro per assicurazione, noleggio, rivendita, recupero o conformità.",
  },
  trust: {
    title: "Costruito per la fiducia su scala globale",
    subtitle:
      "EquipRegistry è progettato come infrastruttura neutrale per veicoli, attrezzature e altri asset di valore, a supporto di assicuratori, noleggiatori, proprietari professionali e transazioni transfrontaliere.",
    card1Title: "Pronto per le assicurazioni",
    card1Text:
      "Strutturato per supportare underwriting, cicli di validazione e decisioni basate sul rischio.",
    card2Title: "Indipendente e neutrale",
    card2Text:
      "Non legato a produttori, concessionari o giurisdizioni — un’unica fonte globale di fiducia.",
    card3Title: "Progettato per scalare",
    card3Text:
      "Da un singolo asset a flotte globali, pensato per un’adozione multi-paese.",
  },
  footer: {
    copyright:
      "EquipRegistry — Infrastruttura digitale di fiducia per gli asset",
    privacy: "Privacy Policy",
    terms: "Termini e condizioni",
    disclaimer: "Disclaimer",
  },
  statuses: {
    registeredVerified: {
      label: "Registrato e verificato",
      message:
        "Questo asset è registrato in EquipRegistry e la sua origine legale è stata verificata.",
      why:
        "Questo asset ha un’origine legale verificata e un passaporto di registro attivo.",
      metadataStatus: "Stato",
      metadataPassport: "Passaporto registro",
      metadataValidation: "Ultima validazione",
      actionViewPassport: "Vedi passaporto",
    },
    historyUnknown: {
      label: "Cronologia sconosciuta",
      message:
        "Questo asset è presente nel registro, ma la sua cronologia completa di proprietà non ha potuto essere verificata.",
      why:
        "Una cronologia di proprietà incompleta aumenta il rischio di frode, assicurazione e conformità.",
      metadataStatus: "Stato",
      metadataRisk: "Livello di rischio",
      actionViewPassport: "Vedi passaporto (limitato)",
      actionRequestVerification: "Richiedi verifica",
      actionRegisterDocuments: "Registra documenti",
    },
    stolen: {
      label: "Asset rubato – Allerta rossa",
      message:
        "Questo asset è stato ufficialmente segnalato come rubato ed è attivamente bloccato in EquipRegistry.",
      warning:
        "NON acquistare, assicurare, noleggiare, trasportare o accettare il trasferimento di questo asset.",
      why:
        "Qualsiasi transazione che coinvolga un asset rubato può avere conseguenze legali e finanziarie.",
      metadataStatus: "Stato",
      metadataRisk: "Livello di rischio",
      metadataReportedBy: "Segnalato da",
      metadataJurisdiction: "Giurisdizione",
      metadataReportDate: "Data segnalazione",
      actionReportSighting: "Segnala avvistamento",
      actionContactAuthorities: "Contatta autorità",
      actionVerifyCaseId: "Verifica ID caso",
    },
    notRegistered: {
      label: "Non registrato",
      message: "Questo identificatore non è registrato in EquipRegistry.",
      why:
        "Un asset non registrato non ha una cronologia e una titolarità verificate.",
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
  moreInfoRequired: "Sono necessarie più informazioni",
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
      dynamicFieldsTitle: "Dati aggiuntivi dell’asset",
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
        capacity: "Capacità",
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
    verifyAsset: "Asset verifiëren",
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
      title: "Asset verifiëren",
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
        "Auto’s, vrachtwagens, bestelwagens, campers en andere weggebonden assets met VIN of serienummer.",
      equipmentTitle: "Equipment",
      equipmentText:
        "Bouw-, landbouw-, industriële en verhuur-equipment met een machineserienummer.",
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
        "EquipRegistry is ontwikkeld als vertrouwenslaag voor verzekeraars, verhuurbedrijven, financiële instellingen en logistieke terminals.",
      insurersTitle: "Verzekeringsmaatschappijen",
      insurersText:
        "Verbeter underwriting, verminder fraude en versnel recovery. EquipRegistry maakt realtime validatie mogelijk van eigendom, assethistorie en risicostatus. Detecteer gestolen assets direct en voorkom claims op frauduleus equipment.",
      rentalTitle: "Verhuurbedrijven",
      rentalText:
        "Krijg volledige zichtbaarheid over je vloot over grenzen heen. Voorkom fraude, verifieer klanten en bescherm je assets tegen diefstal, dubbele registraties en illegale doorverkoop.",
      financeTitle: "Banken & financiële instellingen",
      financeText:
        "Voorkom dubbele financiering en assetfraude. EquipRegistry laat financiers controleren of een asset al gefinancierd, geregistreerd of gemarkeerd is. Verlaag risico in lease- en asset based finance-structuren.",
      financeRiskTitle: "Risico op dubbele financiering",
      financeRiskText:
        "Hetzelfde asset kan meerdere keren als onderpand worden gebruikt bij verschillende instellingen of in verschillende landen. Zonder een gedeelde vertrouwenslaag ontstaat verborgen blootstelling, frauderisico en potentieel financieel verlies.",
      financeVerificationTitle: "Verificatie vóór financiering",
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
        "EquipRegistry garandeert niet de juistheid, volledigheid of juridische geldigheid van aangeleverde, getoonde of geïmporteerde gegevens. Gebruik van het platform is volledig op eigen risico.",
      data:
        "Gegevens kunnen afkomstig zijn van gebruikers, partners, verzekeraars, autoriteiten, financiële instellingen en toekomstige geïntegreerde systemen.",
      future:
        "Toekomstige integraties kunnen verzekeraars, autoriteiten, grensoverschrijdende flows, eigendomsoverdracht, betaalsystemen en extra validatielagen omvatten.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spanje. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifieer elk voertuig of stuk equipment wereldwijd",
    subtitle:
      "Controleer eigendom, historie en risicostatus met VIN, serienummer of registry-ID.",
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
    step2Title: "2. Verifiëren",
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
      "Niet gekoppeld aan fabrikanten, dealers of jurisdicties — één mondiale bron van vertrouwen.",
    card3Title: "Ontworpen om te schalen",
    card3Text:
      "Van losse assets tot wereldwijde vloten, gebouwd voor multi-country adoptie.",
  },
  footer: {
    copyright:
      "EquipRegistry — Digitale vertrouwensinfrastructuur voor assets",
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
        "Een onvolledige eigendomshistorie verhoogt fraude-, verzekerings- en compliance-risico’s.",
      metadataStatus: "Status",
      metadataRisk: "Risiconiveau",
      actionViewPassport: "Bekijk paspoort (beperkt)",
      actionRequestVerification: "Vraag verificatie aan",
      actionRegisterDocuments: "Registreer documenten",
    },
    stolen: {
      label: "Gestolen asset – Rode vlag",
      message:
        "Dit asset is officieel als gestolen gemeld en staat actief op de zwarte lijst in EquipRegistry.",
      warning:
        "Koop, verzeker, huur, transporteer of accepteer de overdracht van dit asset NIET.",
      why:
        "Elke transactie met een gestolen asset kan leiden tot juridische en financiële gevolgen.",
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
    logout: "Terminar sessão",
    menu: "Menu",
  },
  menu: {
    home: "Início",
    verifyAsset: "Verificar ativo",
    registerAsset: "Registar ativo",
    pricing: "Preços",
    reportSighting: "Reportar avistamento",
    partners: "Para seguradoras / parceiros",
    contact: "Contacto",
  },
  common: {
    goToHomepageSearch: "Ir para a pesquisa da homepage",
    publicVerification: "Verificação pública",
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
        "Pesquise um número de série e verifique se o equipamento está registado, verificado, sinalizado ou desconhecido.",
      introTitle: "Verificação pública",
      introText:
        "Esta página tornar-se-á a rota pública dedicada à verificação. Por enquanto, a experiência de pesquisa em direto continua na homepage.",
    },
    register: {
      title: "Registar ativo",
      subtitle:
        "Inicie o fluxo de registo para equipamentos, veículos ou reboques e prepare o ativo para um passaporte digital de registo.",
      vehicleTitle: "Veículo",
      vehicleText:
        "Automóveis, camiões, carrinhas, autocaravanas e outros ativos rodoviários com VIN ou referência serial.",
      equipmentTitle: "Equipamento",
      equipmentText:
        "Equipamentos de construção, agrícolas, industriais e de aluguer com número de série da máquina.",
      trailerTitle: "Reboque",
      trailerText:
        "Reboques e ativos rebocados que exigem identidade, proveniência e visibilidade de confiança.",
    },
    reportSighting: {
      title: "Reportar avistamento",
      subtitle:
        "Reporte o avistamento de equipamento sinalizado ou roubado e ajude a melhorar a visibilidade transfronteiriça.",
      introTitle: "Porque os avistamentos importam",
      introText:
        "Os relatórios públicos de avistamento podem ajudar seguradoras, autoridades e proprietários legítimos a agir mais rapidamente quando o equipamento está sinalizado, roubado ou sob investigação.",
    },
    partners: {
      title: "Para seguradoras / parceiros",
      subtitle:
        "EquipRegistry foi concebido como uma camada de confiança para seguradoras, empresas de aluguer, instituições financeiras e terminais logísticos.",
      insurersTitle: "Seguradoras",
      insurersText:
        "Melhore a subscrição, reduza a fraude e acelere a recuperação. A EquipRegistry permite validação em tempo real da titularidade, histórico do ativo e estado de risco. Detete ativos roubados instantaneamente e evite sinistros sobre equipamento fraudulento.",
      rentalTitle: "Empresas de aluguer",
      rentalText:
        "Obtenha visibilidade total sobre a sua frota além-fronteiras. Previna fraude, verifique clientes e proteja os seus ativos contra roubo, registos duplicados e revenda ilegal.",
      financeTitle: "Bancos e instituições financeiras",
      financeText:
        "Previna duplo financiamento e fraude de ativos. A EquipRegistry permite aos financiadores verificar se um ativo já está financiado, registado ou sinalizado. Reduza o risco em estruturas de leasing e financiamento baseado em ativos.",
      financeRiskTitle: "Risco de duplo financiamento",
      financeRiskText:
        "O mesmo ativo pode ser usado como garantia várias vezes em diferentes instituições ou países. Sem uma camada de confiança partilhada, isso cria exposição oculta, risco de fraude e potenciais perdas financeiras.",
      financeVerificationTitle: "Verificação antes do financiamento",
      financeVerificationText:
        "Confirme se um ativo já está registado, financiado, sinalizado ou associado a um evento de risco antes de aprovar um leasing ou um empréstimo.",
      financeTrustTitle: "Confiança transfronteiriça",
      financeTrustText:
        "Apoie transações internacionais mais seguras envolvendo máquinas, veículos, reboques e outros ativos móveis usados em estruturas de financiamento.",
      terminalsTitle: "Portos e terminais logísticos",
      terminalsText:
        "Verifique equipamento de entrada e saída em tempo real. Detete ativos roubados ou sinalizados antes de entrarem ou saírem do seu terminal. Apoie alfândegas, inspeções e conformidade transfronteiriça.",
      rentalVisibilityTitle: "Visibilidade da frota",
      rentalVisibilityText:
        "Mantenha uma visão mais clara da identidade, do estado e do risco do equipamento em vários países e localizações operacionais.",
      rentalPreventionTitle: "Prevenção de roubo",
      rentalPreventionText:
        "Apoie uma sinalização mais rápida e uma prevenção de fraude mais forte em torno de ativos roubados, desaparecidos ou revendidos ilegalmente.",
      rentalOriginTitle: "Prova de origem",
      rentalOriginText:
        "Reforce a prova de titularidade e a confiança para seguradoras, compradores, parceiros e intervenientes transfronteiriços.",
      terminalsEntryTitle: "Controlo de entrada e saída",
      terminalsEntryText:
        "Adicione uma camada extra de verificação antes de o equipamento entrar ou sair de zonas operacionais seguras.",
      terminalsCustomsTitle: "Alfândegas e inspeções",
      terminalsCustomsText:
        "Apoie controlos aduaneiros, verificações terminais e processos de conformidade com uma identificação de ativos e visibilidade de risco mais fortes.",
      ctaText:
        "A EquipRegistry foi concebida para apoiar parceiros de confiança em fluxos de seguros, aluguer, financiamento, logística e recuperação.",
    },
   contact: {
  title: "Contacto",
  subtitle:
    "Entre em contacto sobre parcerias, casos de uso com seguradoras, pilotos ou colaboração estratégica.",
  generalTitle: "Questões gerais",
  generalText:
    "Para perguntas gerais sobre a EquipRegistry, a plataforma, a verificação pública ou o funcionamento do registo.",
  businessTitle: "Negócios e parcerias",
  businessText:
    "Para seguradoras, empresas de aluguer, bancos, terminais e outras organizações interessadas em colaboração, projetos piloto ou integração.",
  supportTitle: "Suporte",
  supportText:
    "Para ajuda relacionada com registos, passaportes de registo, dados enviados ou questões relacionadas com a plataforma.",
  emailLabel: "Email",
  formTitle: "Formulário de contacto",
  formIntro:
    "Escolha o tipo de contacto correto para que a sua mensagem seja enviada diretamente para a caixa certa da EquipRegistry.",
  typeLabel: "Tipo de contacto",
  typeGeneral: "Questão geral",
  typeBusiness: "Negócios / Parcerias",
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
      title: "Isenção de responsabilidade",
      intro:
        "A EquipRegistry fornece uma infraestrutura digital de registo para veículos, equipamentos, reboques e outros ativos elegíveis.",
      liability:
        "A EquipRegistry não garante a exatidão, integridade ou validade legal dos dados enviados, exibidos ou importados. A utilização da plataforma é por conta e risco do utilizador.",
      data:
        "Os dados podem ser fornecidos por utilizadores, parceiros, seguradoras, autoridades, instituições financeiras e futuros sistemas integrados.",
      future:
        "As futuras integrações poderão incluir seguradoras, autoridades, fluxos transfronteiriços, transferências de propriedade, sistemas de pagamento e camadas de validação.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Espanha. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Verifique qualquer veículo ou equipamento em todo o mundo",
    subtitle:
      "Verifique propriedade, histórico e nível de risco usando VIN, número de série ou ID de registo.",
    placeholder: "Introduza VIN, número de série ou ID de registo",
    search: "Pesquisar",
    demoSerials: "Números demo:",
    loggedInMessage:
      "Tem sessão iniciada. Pode usar a pesquisa normalmente e continuar a aceder a passaportes privados.",
    goToDashboard: "Ir para o painel",
    supportedAssetsTitle: "Ativos suportados",
    supportedAssetsItems: [
      "Veículos (carros, camiões e veículos clássicos)",
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
      "Introduza um VIN, número de série ou ID de registo para verificar instantaneamente o estado do registo.",
    step2Title: "2. Validar",
    step2Text:
      "Reveja o histórico de propriedade, os documentos e o nível de validação quando disponíveis.",
    step3Title: "3. Registar",
    step3Text:
      "Registe veículos, equipamentos ou outros ativos e adicione documentação de suporte.",
    step4Title: "4. Utilizar",
    step4Text:
      "Use o passaporte do registo para seguro, aluguer, revenda, recuperação ou conformidade.",
  },
  trust: {
    title: "Construído para confiança à escala global",
    subtitle:
      "EquipRegistry foi concebido como infraestrutura neutra para veículos, equipamentos e outros ativos valiosos, apoiando seguradoras, empresas de aluguer, proprietários profissionais e transações transfronteiriças.",
    card1Title: "Preparado para seguros",
    card1Text:
      "Estruturado para suportar subscrição, ciclos de validação e decisões baseadas no risco.",
    card2Title: "Independente e neutro",
    card2Text:
      "Não ligado a fabricantes, distribuidores ou jurisdições — uma fonte global de confiança.",
    card3Title: "Concebido para escalar",
    card3Text:
      "De um único ativo a frotas globais, preparado para adoção em vários países.",
  },
  footer: {
    copyright:
      "EquipRegistry — Infraestrutura digital de confiança para ativos",
    privacy: "Política de privacidade",
    terms: "Termos e condições",
    disclaimer: "Isenção de responsabilidade",
  },
  statuses: {
    registeredVerified: {
      label: "Registado e verificado",
      message:
        "Este ativo está registado no EquipRegistry e a sua origem legal foi verificada.",
      why:
        "Este ativo tem origem legal verificada e um passaporte de registo ativo.",
      metadataStatus: "Estado",
      metadataPassport: "Passaporte de registo",
      metadataValidation: "Última validação",
      actionViewPassport: "Ver passaporte",
    },
    historyUnknown: {
      label: "Histórico desconhecido",
      message:
        "Este ativo existe no registo, mas o seu histórico completo de propriedade não pôde ser verificado.",
      why:
        "Um histórico de propriedade incompleto aumenta o risco de fraude, seguro e conformidade.",
      metadataStatus: "Estado",
      metadataRisk: "Nível de risco",
      actionViewPassport: "Ver passaporte (limitado)",
      actionRequestVerification: "Solicitar verificação",
      actionRegisterDocuments: "Registar documentos",
    },
    stolen: {
      label: "Ativo roubado – Alerta vermelho",
      message:
        "Este ativo foi oficialmente reportado como roubado e está ativamente bloqueado no EquipRegistry.",
      warning:
        "NÃO compre, assegure, alugue, transporte nem aceite a transferência deste ativo.",
      why:
        "Qualquer transação envolvendo um ativo roubado pode levar a consequências legais e financeiras.",
      metadataStatus: "Estado",
      metadataRisk: "Nível de risco",
      metadataReportedBy: "Reportado por",
      metadataJurisdiction: "Jurisdição",
      metadataReportDate: "Data do reporte",
      actionReportSighting: "Reportar avistamento",
      actionContactAuthorities: "Contactar autoridades",
      actionVerifyCaseId: "Verificar ID do caso",
    },
    notRegistered: {
      label: "Não registado",
      message: "Este identificador não está registado no EquipRegistry.",
      why:
        "Um ativo não registado não possui histórico e titularidade verificados.",
      actionRegister: "Registar este ativo",
    },
    metadataValues: {
      active: "Ativo",
      full: "Completo",
      lastValidation2025: "2025",
      limitedPassport: "Passaporte limitado",
      medium: "Médio",
      blacklisted: "Bloqueado",
      high: "Alto",
      insurancePartner: "Parceiro segurador",
      euCrossBorderAlert: "UE / Alerta transfronteiriço",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
  draft: "Rascunho",
  incomplete: "Incompleto",
  submitted: "Enviado",
  underReview: "Em análise",
  moreInfoRequired: "Mais informações necessárias",
  approved: "Aprovado",
  rejected: "Rejeitado",
  passportIssued: "Passaporte disponível",
  unknown: "Desconhecido",
},
    registrationDetail: {
      backToAdminRegistrations: "Voltar aos registos de administração",
      backToRegistrations: "Voltar aos registos",
      adminPaymentConfirmationTitle: "Confirmação administrativa do pagamento",
      adminPaymentConfirmationDescription:
        "Depois de confirmar manualmente a transferência bancária, marque este registo como pago.",
      reviewWorkflowTitle: "Fluxo de revisão",
      reviewWorkflowDescription:
        "Mova o registo através da revisão, aprovação e emissão final do passaporte.",
      detailsTitle: "Detalhes do registo",
      dynamicFieldsTitle: "Dados adicionais do ativo",
      noAdditionalData: "Não existem dados adicionais disponíveis.",
      paymentCompleted: "Concluído / Confirmado",
      paymentPending: "Pendente",
      labels: {
        passportNumber: "Número do passaporte",
        applicantType: "Tipo de requerente",
        assetName: "Nome do ativo",
        category: "Categoria",
        subcategory: "Subcategoria",
        brand: "Marca",
        model: "Modelo",
        serialNumber: "Número de série",
        owner: "Proprietário",
        ownerEmail: "Email do proprietário",
        created: "Criado",
        updated: "Atualizado",
        payment: "Pagamento",
        completenessScore: "Nível de completude",
        solarPanelSerialNumbers: "Números de série dos painéis solares",
        batterySerialNumbers: "Números de série das baterias",
        bikeBatterySerialNumbers:
          "Números de série das baterias de bicicleta",
        capacity: "Capacidade",
        powerRating: "Potência",
        batchLotNumber: "Número de lote / batch",
        installationLocation: "Local de instalação",
        hoursOfOperation: "Horas de operação",
        deviceId: "ID do dispositivo",
        certification: "Certificação",
        ownerOrganisation: "Organização proprietária",
      },
    },
  },
};

const ru: Dictionary = {
  nav: {
    howItWorks: "Как это работает",
    login: "Войти",
    dashboard: "Панель",
    logout: "Выход",
    menu: "Меню",
  },
  menu: {
    home: "Главная",
    verifyAsset: "Проверить актив",
    registerAsset: "Зарегистрировать актив",
    pricing: "Цены",
    reportSighting: "Сообщить о наблюдении",
    partners: "Для страховщиков / партнёров",
    contact: "Контакт",
  },
  common: {
    goToHomepageSearch: "Перейти к поиску на главной странице",
    publicVerification: "Публичная проверка",
    whySightingsMatter: "Почему сообщения о наблюдении важны",
    contactEquipRegistry: "Связаться с EquipRegistry",
    print: "Печать",
    downloadPdf: "Скачать PDF",
  },
  pages: {
    dashboard: {
  registrations: {
    eyebrow: "EquipRegistry",
    title: "Заявки на регистрацию",
    newRegistration: "Новая регистрация",
  },
},
    verify: {
      title: "Проверить актив",
      subtitle:
        "Введите серийный номер и проверьте, зарегистрировано ли оборудование, подтверждено, отмечено или имеет неизвестную историю.",
      introTitle: "Публичная проверка",
      introText:
        "Эта страница станет отдельным публичным маршрутом проверки. Пока что живая проверка по-прежнему доступна на главной странице.",
    },
    register: {
      title: "Зарегистрировать актив",
      subtitle:
        "Начните процесс регистрации оборудования, транспортных средств или прицепов и подготовьте актив к цифровому паспорту реестра.",
      vehicleTitle: "Транспортное средство",
      vehicleText:
        "Автомобили, грузовики, фургоны, автодома и другие дорожные активы с VIN или серийной ссылкой.",
      equipmentTitle: "Оборудование",
      equipmentText:
        "Строительное, сельскохозяйственное, промышленное и арендное оборудование с серийным номером машины.",
      trailerTitle: "Прицеп",
      trailerText:
        "Прицепы и буксируемые активы, которым необходимы идентификация, происхождение и доверительная видимость.",
    },
    reportSighting: {
      title: "Сообщить о наблюдении",
      subtitle:
        "Сообщите о замеченном отмеченном или украденном оборудовании и помогите улучшить трансграничную видимость.",
      introTitle: "Почему сообщения о наблюдении важны",
      introText:
        "Публичные сообщения о наблюдении могут помочь страховщикам, властям и законным владельцам быстрее реагировать, когда оборудование отмечено, украдено или находится под расследованием.",
    },
    partners: {
      title: "Для страховщиков / партнёров",
      subtitle:
        "EquipRegistry разработан как уровень доверия для страховщиков, арендных компаний, финансовых учреждений и логистических терминалов.",
      insurersTitle: "Страховые компании",
      insurersText:
        "Улучшайте андеррайтинг, снижайте мошенничество и ускоряйте возврат активов. EquipRegistry позволяет в реальном времени проверять право собственности, историю актива и уровень риска. Мгновенно выявляйте украденные активы и предотвращайте страховые случаи по мошенническому оборудованию.",
      rentalTitle: "Арендные компании",
      rentalText:
        "Получайте полную видимость вашей техники через границы. Предотвращайте мошенничество, проверяйте клиентов и защищайте активы от кражи, двойной регистрации и незаконной перепродажи.",
      financeTitle: "Банки и финансовые учреждения",
      financeText:
        "Предотвращайте двойное финансирование и мошенничество с активами. EquipRegistry позволяет кредиторам проверять, не финансируется ли актив уже, не зарегистрирован ли он и не помечен ли как рискованный. Снижайте риск в структурах лизинга и финансирования под залог активов.",
      financeRiskTitle: "Риск двойного финансирования",
      financeRiskText:
        "Один и тот же актив может использоваться как залог несколько раз в разных организациях или странах. Без общего уровня доверия это создаёт скрытую экспозицию, риск мошенничества и возможные финансовые потери.",
      financeVerificationTitle: "Проверка перед финансированием",
      financeVerificationText:
        "Перед одобрением лизинга или кредита проверьте, не зарегистрирован ли актив, не профинансирован ли он уже, не помечен ли он и не связан ли с рисковым событием.",
      financeTrustTitle: "Трансграничное доверие",
      financeTrustText:
        "Поддерживайте более безопасные международные сделки с машинами, транспортом, прицепами и другими движимыми активами, используемыми в финансовых структурах.",
      terminalsTitle: "Порты и логистические терминалы",
      terminalsText:
        "Проверяйте входящее и исходящее оборудование в реальном времени. Выявляйте украденные или помеченные активы до того, как они войдут на ваш терминал или покинут его. Поддерживайте таможню, инспекции и трансграничное соответствие.",
      rentalVisibilityTitle: "Прозрачность парка",
      rentalVisibilityText:
        "Сохраняйте более ясное представление об идентичности, статусе и рисках оборудования в разных странах и на разных площадках.",
      rentalPreventionTitle: "Предотвращение краж",
      rentalPreventionText:
        "Обеспечьте более быстрое выставление флага и более сильную защиту от мошенничества вокруг украденных, пропавших или незаконно перепроданных активов.",
      rentalOriginTitle: "Подтверждение происхождения",
      rentalOriginText:
        "Укрепляйте подтверждение права собственности и доверие для страховщиков, покупателей, партнёров и трансграничных участников.",
      terminalsEntryTitle: "Контроль въезда и выезда",
      terminalsEntryText:
        "Добавьте дополнительный уровень проверки до того, как оборудование войдёт в защищённые операционные зоны или покинет их.",
      terminalsCustomsTitle: "Таможня и инспекции",
      terminalsCustomsText:
        "Поддерживайте таможенные проверки, терминальные проверки и процессы комплаенса за счёт более сильной идентификации активов и видимости рисков.",
      ctaText:
        "EquipRegistry создан для поддержки надёжных партнёров в страховых, арендных, финансовых, логистических и восстановительных процессах.",
    },
    contact: {
      title: "Контакт",
      subtitle:
        "Свяжитесь с нами по вопросам партнёрства, страховых сценариев, пилотных проектов или стратегического сотрудничества.",
      generalTitle: "Общие вопросы",
      generalText:
        "Для общих вопросов об EquipRegistry, платформе, публичной проверке или о том, как работает реестр.",
      businessTitle: "Бизнес и партнёрства",
      businessText:
        "Для страховых компаний, арендных компаний, банков, терминалов и других организаций, заинтересованных в сотрудничестве, пилотных проектах или интеграции.",
      supportTitle: "Поддержка",
      supportText:
        "Для помощи по регистрациям, паспортам реестра, отправленным данным или вопросам, связанным с платформой.",
      emailLabel: "Электронная почта",
      formTitle: "Контактная форма",
      formIntro:
        "Выберите правильный тип обращения, чтобы ваше сообщение сразу попало в нужный почтовый ящик EquipRegistry.",
      typeLabel: "Тип обращения",
      typeGeneral: "Общий вопрос",
      typeBusiness: "Бизнес / Партнёрства",
      typeSupport: "Поддержка",
      namePlaceholder: "Ваше имя",
      emailPlaceholder: "Ваш email",
      subjectPlaceholder: "Тема",
      messagePlaceholder: "Ваше сообщение",
      sendButton: "Отправить сообщение",
      sendingButton: "Отправка...",
      successMessage: "Ваше сообщение успешно отправлено.",
      errorMessage: "Произошла ошибка при отправке сообщения.",
    },
    disclaimer: {
      title: "Отказ от ответственности",
      intro:
        "EquipRegistry предоставляет цифровую инфраструктуру реестра для транспортных средств, оборудования, прицепов и других допустимых активов.",
      liability:
        "EquipRegistry не гарантирует точность, полноту или юридическую действительность отправленных, отображаемых или импортированных данных. Использование платформы осуществляется на ваш собственный риск.",
      data:
        "Данные могут предоставляться пользователями, партнёрами, страховщиками, органами власти, финансовыми учреждениями и будущими интегрированными системами.",
      future:
        "Будущие интеграции могут включать страховые компании, правоохранительные органы, трансграничные процессы, передачу собственности, платёжные системы и уровни валидации.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "Проверяйте любые транспортные средства и оборудование по всему миру",
    subtitle:
      "Проверяйте право собственности, историю и уровень риска по VIN, серийному номеру или ID реестра.",
    placeholder: "Введите VIN, серийный номер или ID реестра",
    search: "Поиск",
    demoSerials: "Демо-серийные номера:",
    loggedInMessage:
      "Вы вошли в систему. Вы можете пользоваться поиском как обычно и получать доступ к приватным паспортам.",
    goToDashboard: "Перейти в панель",
    supportedAssetsTitle: "Поддерживаемые активы",
    supportedAssetsItems: [
      "Транспортные средства (автомобили, грузовики и классические автомобили)",
      "Оборудование и техника",
      "Велосипеды и лёгкая мобильность",
    ],
  },
  result: {
    whyThisMatters: "Почему это важно",
  },
  howItWorks: {
    title: "Как работает EquipRegistry",
    step1Title: "1. Проверить",
    step1Text:
      "Введите VIN, серийный номер или ID реестра, чтобы мгновенно проверить статус регистрации.",
    step2Title: "2. Подтвердить",
    step2Text:
      "Просмотрите историю владения, документы и уровень проверки, если они доступны.",
    step3Title: "3. Зарегистрировать",
    step3Text:
      "Зарегистрируйте транспортные средства, оборудование или другие активы и добавьте подтверждающие документы.",
    step4Title: "4. Использовать",
    step4Text:
      "Используйте паспорт реестра для страхования, аренды, перепродажи, возврата или соответствия требованиям.",
  },
  trust: {
    title: "Создано для доверия в глобальном масштабе",
    subtitle:
      "EquipRegistry разработан как нейтральная инфраструктура для транспортных средств, оборудования и других ценных активов, поддерживая страховщиков, арендные компании, профессиональных владельцев и трансграничные сделки.",
    card1Title: "Готово для страхования",
    card1Text:
      "Структурировано для поддержки андеррайтинга, циклов валидации и решений, основанных на риске.",
    card2Title: "Независимо и нейтрально",
    card2Text:
      "Не связано с производителями, дистрибьюторами или юрисдикциями — глобальный источник доверия.",
    card3Title: "Создано для масштабирования",
    card3Text:
      "От одного актива до глобальных парков — готово к внедрению в разных странах.",
  },
  footer: {
    copyright:
      "EquipRegistry — цифровая инфраструктура доверия для активов",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    disclaimer: "Отказ от ответственности",
  },
  statuses: {
    registeredVerified: {
      label: "Зарегистрировано и подтверждено",
      message:
        "Этот актив зарегистрирован в EquipRegistry, и его законное происхождение подтверждено.",
      why:
        "Этот актив имеет подтверждённое законное происхождение и активный паспорт реестра.",
      metadataStatus: "Статус",
      metadataPassport: "Паспорт реестра",
      metadataValidation: "Последняя проверка",
      actionViewPassport: "Открыть паспорт",
    },
    historyUnknown: {
      label: "История неизвестна",
      message:
        "Этот актив существует в реестре, но его полную историю владения не удалось подтвердить.",
      why:
        "Неполная история владения увеличивает риск мошенничества, страховых проблем и несоответствия требованиям.",
      metadataStatus: "Статус",
      metadataRisk: "Уровень риска",
      actionViewPassport: "Открыть паспорт (ограниченный)",
      actionRequestVerification: "Запросить проверку",
      actionRegisterDocuments: "Зарегистрировать документы",
    },
    stolen: {
      label: "Украденный актив – Красный флаг",
      message:
        "Этот актив официально заявлен как украденный и активно внесён в чёрный список EquipRegistry.",
      warning:
        "НЕ покупайте, НЕ страхуйте, НЕ арендуйте, НЕ перевозите и НЕ принимайте передачу этого актива.",
      why:
        "Любая сделка с украденным активом может привести к юридическим и финансовым последствиям.",
      metadataStatus: "Статус",
      metadataRisk: "Уровень риска",
      metadataReportedBy: "Сообщил",
      metadataJurisdiction: "Юрисдикция",
      metadataReportDate: "Дата сообщения",
      actionReportSighting: "Сообщить о наблюдении",
      actionContactAuthorities: "Связаться с властями",
      actionVerifyCaseId: "Проверить ID дела",
    },
    notRegistered: {
      label: "Не зарегистрировано",
      message: "Этот идентификатор не зарегистрирован в EquipRegistry.",
      why:
        "Незарегистрированный актив не имеет подтверждённой истории владения и происхождения.",
      actionRegister: "Зарегистрировать этот актив",
    },
    metadataValues: {
      active: "Активно",
      full: "Полный",
      lastValidation2025: "2025",
      limitedPassport: "Ограниченный паспорт",
      medium: "Средний",
      blacklisted: "В чёрном списке",
      high: "Высокий",
      insurancePartner: "Страховой партнёр",
      euCrossBorderAlert: "ЕС / Трансграничное предупреждение",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "Черновик",
      incomplete: "Неполный",
      submitted: "Отправлено",
      underReview: "На рассмотрении",
      moreInfoRequired: "Требуется дополнительная информация",
      approved: "Одобрено",
      rejected: "Отклонено",
      passportIssued: "Паспорт доступен",
      unknown: "Неизвестно",
    },
    registrationDetail: {
      backToAdminRegistrations: "Назад к административным регистрациям",
      backToRegistrations: "Назад к регистрациям",
      adminPaymentConfirmationTitle: "Административное подтверждение оплаты",
      adminPaymentConfirmationDescription:
        "После ручного подтверждения банковского перевода отметьте эту регистрацию как оплаченную.",
      reviewWorkflowTitle: "Процесс проверки",
      reviewWorkflowDescription:
        "Переведите регистрацию через этапы проверки, одобрения и окончательной выдачи паспорта.",
      detailsTitle: "Детали регистрации",
      dynamicFieldsTitle: "Дополнительные данные актива",
      noAdditionalData: "Дополнительные данные отсутствуют.",
      paymentCompleted: "Завершено / Подтверждено",
      paymentPending: "Ожидается",
      labels: {
        passportNumber: "Номер паспорта",
        applicantType: "Тип заявителя",
        assetName: "Название актива",
        category: "Категория",
        subcategory: "Подкатегория",
        brand: "Бренд",
        model: "Модель",
        serialNumber: "Серийный номер",
        owner: "Владелец",
        ownerEmail: "Email владельца",
        created: "Создано",
        updated: "Обновлено",
        payment: "Оплата",
        completenessScore: "Уровень полноты",
        solarPanelSerialNumbers: "Серийные номера солнечных панелей",
        batterySerialNumbers: "Серийные номера батарей",
        bikeBatterySerialNumbers: "Серийные номера велосипедных батарей",
        capacity: "Ёмкость",
        powerRating: "Мощность",
        batchLotNumber: "Номер партии / лота",
        installationLocation: "Место установки",
        hoursOfOperation: "Часы эксплуатации",
        deviceId: "ID устройства",
        certification: "Сертификация",
        ownerOrganisation: "Организация-владелец",
      },
    },
  },
};

const zh: Dictionary = {
  nav: {
    howItWorks: "运作方式",
    login: "登录",
    dashboard: "控制台",
    logout: "退出登录",
    menu: "菜单",
  },
  menu: {
    home: "首页",
    verifyAsset: "验证资产",
    registerAsset: "注册资产",
    pricing: "价格",
    reportSighting: "报告发现",
    partners: "面向保险公司 / 合作伙伴",
    contact: "联系",
  },
  common: {
    goToHomepageSearch: "前往首页搜索",
    publicVerification: "公开验证",
    whySightingsMatter: "为什么发现报告很重要",
    contactEquipRegistry: "联系 EquipRegistry",
    print: "打印",
    downloadPdf: "下载 PDF",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "注册请求",
        newRegistration: "新建注册",
      },
    },
    verify: {
      title: "验证资产",
      subtitle:
        "搜索序列号，检查设备是否已注册、已验证、被标记或历史未知。",
      introTitle: "公开验证",
      introText:
        "该页面将成为专门的公开验证路由。目前，实时搜索体验仍保留在首页。",
    },
    register: {
      title: "注册资产",
      subtitle:
        "开始设备、车辆或拖车的注册流程，并为该资产准备数字注册护照。",
      vehicleTitle: "车辆",
      vehicleText:
        "汽车、卡车、厢式车、房车及其他带有 VIN 或序列号参考的道路资产。",
      equipmentTitle: "设备",
      equipmentText:
        "具有机器序列号的建筑、农业、工业和租赁设备。",
      trailerTitle: "拖车",
      trailerText:
        "需要身份、来源和信任可见性的拖车及被牵引资产。",
    },
    reportSighting: {
      title: "报告发现",
      subtitle:
        "报告被标记或被盗设备的发现情况，帮助提升跨境可见性。",
      introTitle: "为什么发现报告很重要",
      introText:
        "公开的发现报告可以帮助保险公司、主管部门和合法所有者在设备被标记、被盗或处于调查中时更快采取行动。",
    },
    partners: {
      title: "面向保险公司 / 合作伙伴",
      subtitle:
        "EquipRegistry 被设计为保险公司、租赁公司、金融机构和物流码头的信任层。",
      insurersTitle: "保险公司",
      insurersText:
        "提升承保质量，减少欺诈，加快追回流程。EquipRegistry 可实时验证所有权、资产历史和风险状态。即时识别被盗资产，防止欺诈设备产生理赔。",
      rentalTitle: "租赁公司",
      rentalText:
        "获得跨境车队和设备的完整可视化。防止欺诈、核验客户，并保护资产免受盗窃、重复注册和非法转售。",
      financeTitle: "银行与金融机构",
      financeText:
        "防止重复融资和资产欺诈。EquipRegistry 允许贷款方核实某项资产是否已被融资、注册或标记。降低租赁和资产融资结构中的风险。",
      financeRiskTitle: "重复融资风险",
      financeRiskText:
        "同一资产可能在不同机构或不同国家被多次用作抵押。如果没有共享的信任层，就会带来隐藏敞口、欺诈风险和潜在财务损失。",
      financeVerificationTitle: "融资前核验",
      financeVerificationText:
        "在批准租赁或贷款之前，确认资产是否已经登记、融资、被标记，或与某个风险事件有关。",
      financeTrustTitle: "跨境信任",
      financeTrustText:
        "为融资结构中使用的机械、车辆、拖车及其他可移动资产提供更安全的国际交易支持。",
      terminalsTitle: "港口与物流码头",
      terminalsText:
        "实时核验进出设备。在资产进出码头之前识别被盗或被标记的资产。支持海关、检查和跨境合规。",
      rentalVisibilityTitle: "车队可视性",
      rentalVisibilityText:
        "更清晰地掌握设备在多个国家和运营地点的身份、状态和风险。",
      rentalPreventionTitle: "防盗防诈",
      rentalPreventionText:
        "为被盗、丢失或被非法转售的资产提供更快的标记能力和更强的欺诈防范。",
      rentalOriginTitle: "来源证明",
      rentalOriginText:
        "加强面向保险公司、买方、合作伙伴和跨境相关方的所有权证明与信任。",
      terminalsEntryTitle: "进出控制",
      terminalsEntryText:
        "在设备进入或离开受保护的作业区域之前，增加一层额外的核验。",
      terminalsCustomsTitle: "海关与检查",
      terminalsCustomsText:
        "通过更强的资产识别和风险可见性，支持海关、码头检查和合规流程。",
      ctaText:
        "EquipRegistry 旨在为保险、租赁、融资、物流和追回流程中的可信合作伙伴提供支持。",
    },
    contact: {
      title: "联系",
      subtitle:
        "如需洽谈合作、保险使用场景、试点项目或战略合作，请与我们联系。",
      generalTitle: "一般咨询",
      generalText:
        "如需了解 EquipRegistry、平台、公开验证或注册系统如何运作的一般问题，请通过这里联系。",
      businessTitle: "商务与合作",
      businessText:
        "适用于保险公司、租赁公司、银行、码头及其他有意开展合作、试点项目或系统集成的机构。",
      supportTitle: "支持",
      supportText:
        "如需注册、注册护照、已提交数据或平台相关问题的帮助，请通过这里联系。",
      emailLabel: "电子邮箱",
      formTitle: "联系表单",
      formIntro:
        "请选择正确的联系类型，以便您的消息直接发送到 EquipRegistry 的对应邮箱。",
      typeLabel: "联系类型",
      typeGeneral: "一般咨询",
      typeBusiness: "商务 / 合作",
      typeSupport: "支持",
      namePlaceholder: "您的姓名",
      emailPlaceholder: "您的电子邮箱",
      subjectPlaceholder: "主题",
      messagePlaceholder: "您的留言",
      sendButton: "发送消息",
      sendingButton: "发送中...",
      successMessage: "您的消息已成功发送。",
      errorMessage: "发送您的消息时出现错误。",
    },
    disclaimer: {
      title: "免责声明",
      intro:
        "EquipRegistry 为车辆、设备、拖车及其他符合条件的资产提供数字注册基础设施。",
      liability:
        "EquipRegistry 不保证提交、展示或导入数据的准确性、完整性或法律有效性。用户使用本平台须自行承担风险。",
      data:
        "数据可能由用户、合作伙伴、保险公司、主管机构、金融机构及未来集成系统提供。",
      future:
        "未来可能集成保险机构、执法部门、跨境流程、所有权转移、支付系统和验证层。",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "在全球范围验证任何车辆或设备",
    subtitle:
      "通过 VIN、序列号或注册 ID 检查所有权、历史记录和风险状态。",
    placeholder: "输入 VIN、序列号或注册 ID",
    search: "搜索",
    demoSerials: "演示序列号：",
    loggedInMessage:
      "您已登录。您可以正常使用搜索，并继续访问私有护照。",
    goToDashboard: "前往仪表板",
    supportedAssetsTitle: "支持的资产",
    supportedAssetsItems: [
      "车辆（汽车、卡车和经典车辆）",
      "设备和机械",
      "自行车与轻型出行设备",
    ],
  },
  result: {
    whyThisMatters: "这为什么重要",
  },
  howItWorks: {
    title: "EquipRegistry 如何运作",
    step1Title: "1. 验证",
    step1Text:
      "输入 VIN、序列号或注册 ID，即可立即检查注册状态。",
    step2Title: "2. 核实",
    step2Text:
      "在可用时查看所有权历史、文件和验证级别。",
    step3Title: "3. 注册",
    step3Text:
      "注册车辆、设备或其他资产，并添加支持文件。",
    step4Title: "4. 使用",
    step4Text:
      "将注册护照用于保险、租赁、转售、追回或合规。",
  },
  trust: {
    title: "为全球规模的信任而打造",
    subtitle:
      "EquipRegistry 被设计为车辆、设备及其他高价值资产的中立基础设施，支持保险公司、租赁公司、专业所有者和跨境交易。",
    card1Title: "保险就绪",
    card1Text:
      "其结构可支持承保、验证周期和基于风险的决策。",
    card2Title: "独立且中立",
    card2Text:
      "不隶属于制造商、分销商或司法辖区——全球信任来源。",
    card3Title: "为扩展而设计",
    card3Text:
      "从单一资产到全球车队，已为多国采用做好准备。",
  },
  footer: {
    copyright: "EquipRegistry — 资产数字信任基础设施",
    privacy: "隐私政策",
    terms: "条款与条件",
    disclaimer: "免责声明",
  },
  statuses: {
    registeredVerified: {
      label: "已注册并已验证",
      message:
        "该资产已在 EquipRegistry 中注册，其合法来源已被验证。",
      why:
        "该资产拥有已验证的合法来源，并具有有效的注册护照。",
      metadataStatus: "状态",
      metadataPassport: "注册护照",
      metadataValidation: "最后验证",
      actionViewPassport: "查看护照",
    },
    historyUnknown: {
      label: "历史未知",
      message:
        "该资产存在于注册系统中，但其完整所有权历史无法被验证。",
      why:
        "不完整的所有权历史会增加欺诈、保险和合规风险。",
      metadataStatus: "状态",
      metadataRisk: "风险级别",
      actionViewPassport: "查看护照（有限）",
      actionRequestVerification: "请求验证",
      actionRegisterDocuments: "登记文件",
    },
    stolen: {
      label: "被盗资产 – 红色警报",
      message:
        "该资产已被正式报告为被盗，并已在 EquipRegistry 中被主动列入黑名单。",
      warning:
        "请勿购买、投保、租赁、运输或接受该资产的转让。",
      why:
        "任何涉及被盗资产的交易都可能导致法律和财务后果。",
      metadataStatus: "状态",
      metadataRisk: "风险级别",
      metadataReportedBy: "报告方",
      metadataJurisdiction: "司法管辖区",
      metadataReportDate: "报告日期",
      actionReportSighting: "报告发现",
      actionContactAuthorities: "联系有关部门",
      actionVerifyCaseId: "验证案件编号",
    },
    notRegistered: {
      label: "未注册",
      message: "该标识符未在 EquipRegistry 中注册。",
      why:
        "未注册资产缺少已验证的所有权和历史记录。",
      actionRegister: "注册此资产",
    },
    metadataValues: {
      active: "有效",
      full: "完整",
      lastValidation2025: "2025",
      limitedPassport: "有限护照",
      medium: "中等",
      blacklisted: "已列入黑名单",
      high: "高",
      insurancePartner: "保险合作伙伴",
      euCrossBorderAlert: "欧盟 / 跨境警报",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "草稿",
      incomplete: "不完整",
      submitted: "已提交",
      underReview: "审核中",
      moreInfoRequired: "需要更多信息",
      approved: "已批准",
      rejected: "已拒绝",
      passportIssued: "护照可用",
      unknown: "未知",
    },
    registrationDetail: {
      backToAdminRegistrations: "返回管理员注册列表",
      backToRegistrations: "返回注册列表",
      adminPaymentConfirmationTitle: "管理员付款确认",
      adminPaymentConfirmationDescription:
        "在手动确认银行转账后，将此注册标记为已付款。",
      reviewWorkflowTitle: "审核流程",
      reviewWorkflowDescription:
        "将注册推进至审核、批准和最终护照签发阶段。",
      detailsTitle: "注册详情",
      dynamicFieldsTitle: "附加资产数据",
      noAdditionalData: "没有可用的附加数据。",
      paymentCompleted: "已完成 / 已确认",
      paymentPending: "待处理",
      labels: {
        passportNumber: "护照编号",
        applicantType: "申请人类型",
        assetName: "资产名称",
        category: "类别",
        subcategory: "子类别",
        brand: "品牌",
        model: "型号",
        serialNumber: "序列号",
        owner: "所有者",
        ownerEmail: "所有者邮箱",
        created: "创建时间",
        updated: "更新时间",
        payment: "付款",
        completenessScore: "完整度评分",
        solarPanelSerialNumbers: "太阳能板序列号",
        batterySerialNumbers: "电池序列号",
        bikeBatterySerialNumbers: "自行车电池序列号",
        capacity: "容量",
        powerRating: "功率",
        batchLotNumber: "批次 / 批号",
        installationLocation: "安装位置",
        hoursOfOperation: "运行小时数",
        deviceId: "设备 ID",
        certification: "认证",
        ownerOrganisation: "所有者组织",
      },
    },
  },
};

const hi: Dictionary = {
  nav: {
    howItWorks: "यह कैसे काम करता है",
    login: "लॉगिन",
    dashboard: "डैशबोर्ड",
    logout: "लॉग आउट",
    menu: "मेनू",
  },
  menu: {
    home: "होम",
    verifyAsset: "एसेट सत्यापित करें",
    registerAsset: "एसेट पंजीकृत करें",
    pricing: "मूल्य",
    reportSighting: "देखे जाने की रिपोर्ट करें",
    partners: "बीमाकर्ताओं / भागीदारों के लिए",
    contact: "संपर्क",
  },
  common: {
    goToHomepageSearch: "होमपेज खोज पर जाएँ",
    publicVerification: "सार्वजनिक सत्यापन",
    whySightingsMatter: "देखे जाने की रिपोर्ट क्यों महत्वपूर्ण है",
    contactEquipRegistry: "EquipRegistry से संपर्क करें",
    print: "प्रिंट",
    downloadPdf: "PDF डाउनलोड करें",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "पंजीकरण अनुरोध",
        newRegistration: "नया पंजीकरण",
      },
    },
    verify: {
      title: "एसेट सत्यापित करें",
      subtitle:
        "सीरियल नंबर खोजें और जाँचें कि उपकरण पंजीकृत, सत्यापित, फ़्लैग किया गया है या उसका इतिहास अज्ञात है।",
      introTitle: "सार्वजनिक सत्यापन",
      introText:
        "यह पेज आगे चलकर सार्वजनिक सत्यापन के लिए समर्पित रूट बनेगा। फिलहाल लाइव खोज अनुभव होमपेज पर ही उपलब्ध है।",
    },
    register: {
      title: "एसेट पंजीकृत करें",
      subtitle:
        "उपकरण, वाहन या ट्रेलर के लिए पंजीकरण प्रक्रिया शुरू करें और एसेट को डिजिटल रजिस्ट्री पासपोर्ट के लिए तैयार करें।",
      vehicleTitle: "वाहन",
      vehicleText:
        "कारें, ट्रक, वैन, मोटरहोम और अन्य सड़क एसेट जिनमें VIN या सीरियल संदर्भ हो।",
      equipmentTitle: "उपकरण",
      equipmentText:
        "निर्माण, कृषि, औद्योगिक और रेंटल उपकरण जिनमें मशीन सीरियल नंबर हो।",
      trailerTitle: "ट्रेलर",
      trailerText:
        "ट्रेलर और खींचे जाने वाले एसेट जिन्हें पहचान, उत्पत्ति और भरोसेमंद दृश्यता की आवश्यकता होती है।",
    },
    reportSighting: {
      title: "देखे जाने की रिपोर्ट करें",
      subtitle:
        "फ़्लैग किए गए या चोरी हुए उपकरण के देखे जाने की रिपोर्ट करें और सीमा-पार दृश्यता को बेहतर बनाने में मदद करें।",
      introTitle: "देखे जाने की रिपोर्ट क्यों महत्वपूर्ण है",
      introText:
        "सार्वजनिक रूप से दी गई देखे जाने की रिपोर्ट बीमाकर्ताओं, प्राधिकरणों और वैध मालिकों को तेजी से कार्रवाई करने में मदद कर सकती है जब उपकरण फ़्लैग, चोरी या जांच के अधीन हो।",
    },
    partners: {
      title: "बीमाकर्ताओं / भागीदारों के लिए",
      subtitle:
        "EquipRegistry को बीमाकर्ताओं, रेंटल कंपनियों, वित्तीय संस्थानों और लॉजिस्टिक टर्मिनलों के लिए एक ट्रस्ट लेयर के रूप में बनाया गया है।",
      insurersTitle: "बीमा कंपनियाँ",
      insurersText:
        "अंडरराइटिंग बेहतर करें, धोखाधड़ी कम करें और रिकवरी तेज़ करें। EquipRegistry स्वामित्व, एसेट इतिहास और जोखिम स्थिति की रियल-टाइम वैलिडेशन देता है। चोरी हुए एसेट तुरंत पहचानें और फर्जी उपकरण पर क्लेम रोकें।",
      rentalTitle: "रेंटल कंपनियाँ",
      rentalText:
        "सीमा-पार अपनी फ्लीट पर पूर्ण दृश्यता पाएँ। धोखाधड़ी रोकें, ग्राहकों को सत्यापित करें और अपने एसेट को चोरी, डुप्लिकेट रजिस्ट्रेशन और अवैध रीसेल से बचाएँ।",
      financeTitle: "बैंक और वित्तीय संस्थान",
      financeText:
        "डबल फाइनेंसिंग और एसेट फ्रॉड रोकें। EquipRegistry ऋणदाताओं को यह जाँचने देता है कि कोई एसेट पहले से वित्तपोषित, पंजीकृत या फ्लैग तो नहीं है। एसेट आधारित फाइनेंस और लीज संरचनाओं में जोखिम घटाएँ।",
      financeRiskTitle: "दोहरी वित्तपोषण का जोखिम",
      financeRiskText:
        "एक ही एसेट को अलग-अलग संस्थानों या देशों में कई बार गिरवी रखा जा सकता है। साझा ट्रस्ट लेयर के बिना इससे छिपी हुई एक्सपोज़र, धोखाधड़ी का जोखिम और संभावित वित्तीय नुकसान पैदा होता है।",
      financeVerificationTitle: "वित्तपोषण से पहले सत्यापन",
      financeVerificationText:
        "लीज़ या ऋण स्वीकृत करने से पहले पुष्टि करें कि एसेट पहले से पंजीकृत, वित्तपोषित, फ्लैग किया गया या किसी जोखिम घटना से जुड़ा तो नहीं है।",
      financeTrustTitle: "सीमापार भरोसा",
      financeTrustText:
        "वित्तीय संरचनाओं में उपयोग होने वाली मशीनों, वाहनों, ट्रेलरों और अन्य चल संपत्तियों से जुड़ी अधिक सुरक्षित अंतरराष्ट्रीय लेनदेन का समर्थन करें।",
      terminalsTitle: "पोर्ट और लॉजिस्टिक टर्मिनल",
      terminalsText:
        "आने-जाने वाले उपकरण को रियल-टाइम में सत्यापित करें। चोरी या फ्लैग किए गए एसेट को टर्मिनल में आने या जाने से पहले पहचानें। कस्टम्स, निरीक्षण और सीमा-पार अनुपालन का समर्थन करें।",
      rentalVisibilityTitle: "फ्लीट दृश्यता",
      rentalVisibilityText:
        "कई देशों और परिचालन स्थलों में उपकरण की पहचान, स्थिति और जोखिम का अधिक स्पष्ट अवलोकन बनाए रखें।",
      rentalPreventionTitle: "चोरी की रोकथाम",
      rentalPreventionText:
        "चोरी हुए, लापता या अवैध रूप से दोबारा बेचे गए एसेट्स पर तेज़ फ्लैगिंग और मजबूत धोखाधड़ी रोकथाम का समर्थन करें।",
      rentalOriginTitle: "उत्पत्ति का प्रमाण",
      rentalOriginText:
        "बीमाकर्ताओं, खरीदारों, भागीदारों और सीमापार हितधारकों के लिए स्वामित्व प्रमाण और भरोसा मजबूत करें।",
      terminalsEntryTitle: "प्रवेश और निकास नियंत्रण",
      terminalsEntryText:
        "उपकरण के सुरक्षित परिचालन क्षेत्रों में प्रवेश करने या बाहर जाने से पहले एक अतिरिक्त सत्यापन परत जोड़ें।",
      terminalsCustomsTitle: "सीमा शुल्क और निरीक्षण",
      terminalsCustomsText:
        "मज़बूत एसेट पहचान और जोखिम दृश्यता के साथ सीमा शुल्क, टर्मिनल जाँच और अनुपालन प्रक्रियाओं का समर्थन करें।",
      ctaText:
        "EquipRegistry को बीमा, रेंटल, वित्तपोषण, लॉजिस्टिक्स और पुनर्प्राप्ति प्रक्रियाओं में भरोसेमंद भागीदारों का समर्थन करने के लिए बनाया गया है।",
    },
    contact: {
      title: "संपर्क",
      subtitle:
        "भागीदारी, बीमा उपयोग मामलों, पायलट चर्चाओं या रणनीतिक सहयोग के लिए संपर्क करें।",
      generalTitle: "सामान्य पूछताछ",
      generalText:
        "EquipRegistry, प्लेटफ़ॉर्म, सार्वजनिक सत्यापन या रजिस्ट्री कैसे काम करती है, इस बारे में सामान्य प्रश्नों के लिए।",
      businessTitle: "व्यावसायिक एवं भागीदारी",
      businessText:
        "बीमाकर्ताओं, रेंटल कंपनियों, बैंकों, टर्मिनलों और अन्य संगठनों के लिए जो सहयोग, पायलट प्रोजेक्ट या इंटीग्रेशन में रुचि रखते हैं।",
      supportTitle: "सहायता",
      supportText:
        "पंजीकरण, रजिस्ट्री पासपोर्ट, जमा किए गए डेटा या प्लेटफ़ॉर्म से जुड़े प्रश्नों में सहायता के लिए।",
      emailLabel: "ईमेल",
      formTitle: "संपर्क फ़ॉर्म",
      formIntro:
        "सही संपर्क प्रकार चुनें ताकि आपका संदेश सीधे सही EquipRegistry इनबॉक्स में पहुँचे।",
      typeLabel: "संपर्क प्रकार",
      typeGeneral: "सामान्य पूछताछ",
      typeBusiness: "व्यवसाय / भागीदारी",
      typeSupport: "सहायता",
      namePlaceholder: "आपका नाम",
      emailPlaceholder: "आपका ईमेल",
      subjectPlaceholder: "विषय",
      messagePlaceholder: "आपका संदेश",
      sendButton: "संदेश भेजें",
      sendingButton: "भेजा जा रहा है...",
      successMessage: "आपका संदेश सफलतापूर्वक भेज दिया गया है।",
      errorMessage: "आपका संदेश भेजते समय कुछ गलत हो गया।",
    },
    disclaimer: {
      title: "अस्वीकरण",
      intro:
        "EquipRegistry वाहनों, उपकरणों, ट्रेलरों और अन्य पात्र एसेट्स के लिए डिजिटल रजिस्ट्री इन्फ्रास्ट्रक्चर प्रदान करता है।",
      liability:
        "EquipRegistry जमा किए गए, दिखाए गए या आयात किए गए डेटा की सटीकता, पूर्णता या कानूनी वैधता की गारंटी नहीं देता। प्लेटफ़ॉर्म का उपयोग आपके अपने जोखिम पर है।",
      data:
        "डेटा उपयोगकर्ताओं, भागीदारों, बीमाकर्ताओं, प्राधिकरणों, वित्तीय संस्थानों और भविष्य की एकीकृत प्रणालियों द्वारा प्रदान किया जा सकता है।",
      future:
        "भविष्य के एकीकरणों में बीमाकर्ता, कानून प्रवर्तन, सीमा-पार वर्कफ़्लो, स्वामित्व हस्तांतरण, भुगतान सिस्टम और वैलिडेशन लेयर शामिल हो सकती हैं।",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "दुनिया भर में किसी भी वाहन या उपकरण को सत्यापित करें",
    subtitle:
      "VIN, सीरियल नंबर या रजिस्ट्री आईडी का उपयोग करके स्वामित्व, इतिहास और जोखिम स्थिति जाँचें।",
    placeholder: "VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें",
    search: "खोजें",
    demoSerials: "डेमो सीरियल नंबर:",
    loggedInMessage:
      "आप लॉग इन हैं। आप सामान्य रूप से खोज का उपयोग कर सकते हैं और निजी पासपोर्ट तक पहुँच सकते हैं।",
    goToDashboard: "डैशबोर्ड पर जाएँ",
    supportedAssetsTitle: "समर्थित एसेट्स",
    supportedAssetsItems: [
      "वाहन (कारें, ट्रक और क्लासिक वाहन)",
      "उपकरण और मशीनरी",
      "साइकिलें और हल्की मोबिलिटी",
    ],
  },
  result: {
    whyThisMatters: "यह क्यों महत्वपूर्ण है",
  },
  howItWorks: {
    title: "EquipRegistry कैसे काम करता है",
    step1Title: "1. सत्यापित करें",
    step1Text:
      "पंजीकरण स्थिति तुरंत जाँचने के लिए VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें।",
    step2Title: "2. मान्य करें",
    step2Text:
      "जहाँ उपलब्ध हो, स्वामित्व इतिहास, दस्तावेज़ और सत्यापन स्तर की समीक्षा करें।",
    step3Title: "3. पंजीकृत करें",
    step3Text:
      "वाहनों, उपकरणों या अन्य एसेट्स को पंजीकृत करें और सहायक दस्तावेज़ जोड़ें।",
    step4Title: "4. उपयोग करें",
    step4Text:
      "रजिस्ट्री पासपोर्ट का उपयोग बीमा, रेंटल, पुनर्विक्रय, रिकवरी या अनुपालन के लिए करें।",
  },
  trust: {
    title: "वैश्विक स्तर पर भरोसे के लिए निर्मित",
    subtitle:
      "EquipRegistry को वाहनों, उपकरणों और अन्य मूल्यवान एसेट्स के लिए एक तटस्थ इन्फ्रास्ट्रक्चर के रूप में बनाया गया है, जो बीमाकर्ताओं, रेंटल कंपनियों, पेशेवर मालिकों और सीमा-पार लेनदेन का समर्थन करता है।",
    card1Title: "बीमा के लिए तैयार",
    card1Text:
      "अंडरराइटिंग, वैलिडेशन चक्रों और जोखिम-आधारित निर्णयों का समर्थन करने के लिए संरचित।",
    card2Title: "स्वतंत्र और तटस्थ",
    card2Text:
      "निर्माताओं, वितरकों या न्यायक्षेत्रों से जुड़ा नहीं — एक वैश्विक भरोसे का स्रोत।",
    card3Title: "स्केल के लिए डिज़ाइन किया गया",
    card3Text:
      "एक एसेट से लेकर वैश्विक फ्लीट तक, बहु-देशीय अपनाने के लिए तैयार।",
  },
  footer: {
    copyright:
      "EquipRegistry — एसेट्स के लिए डिजिटल ट्रस्ट इंफ्रास्ट्रक्चर",
    privacy: "गोपनीयता नीति",
    terms: "नियम और शर्तें",
    disclaimer: "अस्वीकरण",
  },
  statuses: {
    registeredVerified: {
      label: "पंजीकृत और सत्यापित",
      message:
        "यह एसेट EquipRegistry में पंजीकृत है और इसकी कानूनी उत्पत्ति सत्यापित की गई है।",
      why:
        "इस एसेट की कानूनी उत्पत्ति सत्यापित है और इसका सक्रिय रजिस्ट्री पासपोर्ट है।",
      metadataStatus: "स्थिति",
      metadataPassport: "रजिस्ट्री पासपोर्ट",
      metadataValidation: "अंतिम सत्यापन",
      actionViewPassport: "पासपोर्ट देखें",
    },
    historyUnknown: {
      label: "इतिहास अज्ञात",
      message:
        "यह एसेट रजिस्ट्री में मौजूद है, लेकिन इसका पूरा स्वामित्व इतिहास सत्यापित नहीं किया जा सका।",
      why:
        "अधूरा स्वामित्व इतिहास धोखाधड़ी, बीमा और अनुपालन जोखिम बढ़ाता है।",
      metadataStatus: "स्थिति",
      metadataRisk: "जोखिम स्तर",
      actionViewPassport: "पासपोर्ट देखें (सीमित)",
      actionRequestVerification: "सत्यापन का अनुरोध करें",
      actionRegisterDocuments: "दस्तावेज़ पंजीकृत करें",
    },
    stolen: {
      label: "चोरी किया गया एसेट – रेड फ्लैग",
      message:
        "इस एसेट को आधिकारिक रूप से चोरी की रिपोर्ट में दर्ज किया गया है और इसे EquipRegistry में सक्रिय रूप से ब्लैकलिस्ट किया गया है।",
      warning:
        "इस एसेट को खरीदें नहीं, बीमा न करें, किराये पर न लें, परिवहन न करें और इसका हस्तांतरण स्वीकार न करें।",
      why:
        "चोरी किए गए एसेट से जुड़ा कोई भी लेनदेन कानूनी और वित्तीय परिणाम ला सकता है।",
      metadataStatus: "स्थिति",
      metadataRisk: "जोखिम स्तर",
      metadataReportedBy: "रिपोर्ट करने वाला",
      metadataJurisdiction: "अधिकार क्षेत्र",
      metadataReportDate: "रिपोर्ट की तारीख",
      actionReportSighting: "देखे जाने की रिपोर्ट करें",
      actionContactAuthorities: "प्राधिकरणों से संपर्क करें",
      actionVerifyCaseId: "केस आईडी सत्यापित करें",
    },
    notRegistered: {
      label: "पंजीकृत नहीं",
      message: "यह पहचानकर्ता EquipRegistry में पंजीकृत नहीं है।",
      why:
        "अ-पंजीकृत एसेट के पास सत्यापित स्वामित्व और इतिहास रिकॉर्ड नहीं होता।",
      actionRegister: "इस एसेट को पंजीकृत करें",
    },
    metadataValues: {
      active: "सक्रिय",
      full: "पूर्ण",
      lastValidation2025: "2025",
      limitedPassport: "सीमित पासपोर्ट",
      medium: "मध्यम",
      blacklisted: "ब्लैकलिस्टेड",
      high: "उच्च",
      insurancePartner: "बीमा भागीदार",
      euCrossBorderAlert: "EU / सीमा-पार चेतावनी",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "ड्राफ्ट",
      incomplete: "अपूर्ण",
      submitted: "जमा किया गया",
      underReview: "समीक्षा में",
      moreInfoRequired: "अधिक जानकारी आवश्यक है",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
      passportIssued: "पासपोर्ट उपलब्ध",
      unknown: "अज्ञात",
    },
    registrationDetail: {
      backToAdminRegistrations: "एडमिन पंजीकरणों पर वापस जाएँ",
      backToRegistrations: "पंजीकरणों पर वापस जाएँ",
      adminPaymentConfirmationTitle: "एडमिन भुगतान पुष्टि",
      adminPaymentConfirmationDescription:
        "बैंक ट्रांसफर की मैन्युअल पुष्टि के बाद, इस पंजीकरण को भुगतान किया गया चिह्नित करें।",
      reviewWorkflowTitle: "समीक्षा कार्यप्रवाह",
      reviewWorkflowDescription:
        "पंजीकरण को समीक्षा, अनुमोदन और अंतिम पासपोर्ट जारी करने की प्रक्रिया से आगे बढ़ाएँ।",
      detailsTitle: "पंजीकरण विवरण",
      dynamicFieldsTitle: "अतिरिक्त एसेट डेटा",
      noAdditionalData: "कोई अतिरिक्त डेटा उपलब्ध नहीं है।",
      paymentCompleted: "पूर्ण / पुष्टि किया गया",
      paymentPending: "लंबित",
      labels: {
        passportNumber: "पासपोर्ट नंबर",
        applicantType: "आवेदक प्रकार",
        assetName: "एसेट का नाम",
        category: "श्रेणी",
        subcategory: "उपश्रेणी",
        brand: "ब्रांड",
        model: "मॉडल",
        serialNumber: "सीरियल नंबर",
        owner: "मालिक",
        ownerEmail: "मालिक का ईमेल",
        created: "बनाया गया",
        updated: "अपडेट किया गया",
        payment: "भुगतान",
        completenessScore: "पूर्णता स्कोर",
        solarPanelSerialNumbers: "सोलर पैनल सीरियल नंबर",
        batterySerialNumbers: "बैटरी सीरियल नंबर",
        bikeBatterySerialNumbers: "साइकिल बैटरी सीरियल नंबर",
        capacity: "क्षमता",
        powerRating: "पावर रेटिंग",
        batchLotNumber: "बैच / लॉट नंबर",
        installationLocation: "स्थापना स्थान",
        hoursOfOperation: "संचालन के घंटे",
        deviceId: "डिवाइस आईडी",
        certification: "प्रमाणन",
        ownerOrganisation: "मालिक संगठन",
      },
    },
  },
};

const ar: Dictionary = {
  nav: {
    howItWorks: "كيف يعمل",
    login: "تسجيل الدخول",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج",
    menu: "القائمة",
  },
  menu: {
    home: "الرئيسية",
    verifyAsset: "التحقق من الأصل",
    registerAsset: "تسجيل الأصل",
    pricing: "الأسعار",
    reportSighting: "الإبلاغ عن مشاهدة",
    partners: "لشركات التأمين / الشركاء",
    contact: "اتصال",
  },
  common: {
    goToHomepageSearch: "الانتقال إلى بحث الصفحة الرئيسية",
    publicVerification: "تحقق عام",
    whySightingsMatter: "لماذا تعتبر المشاهدات مهمة",
    contactEquipRegistry: "الاتصال بـ EquipRegistry",
    print: "طباعة",
    downloadPdf: "تنزيل PDF",
  },
  pages: {
    dashboard: {
      registrations: {
        eyebrow: "EquipRegistry",
        title: "طلبات التسجيل",
        newRegistration: "تسجيل جديد",
      },
    },
    verify: {
      title: "التحقق من الأصل",
      subtitle:
        "ابحث باستخدام الرقم التسلسلي وتحقق مما إذا كانت المعدات مسجلة أو متحققًا منها أو مُعلّمة أو ذات سجل غير معروف.",
      introTitle: "تحقق عام",
      introText:
        "ستصبح هذه الصفحة لاحقًا المسار العام المخصص للتحقق. حاليًا، تبقى تجربة البحث المباشر متاحة على الصفحة الرئيسية.",
    },
    register: {
      title: "تسجيل الأصل",
      subtitle:
        "ابدأ عملية تسجيل المعدات أو المركبات أو المقطورات وقم بإعداد الأصل للحصول على جواز سجل رقمي.",
      vehicleTitle: "مركبة",
      vehicleText:
        "السيارات والشاحنات والفانات والمركبات السكنية وغيرها من الأصول الطرقية التي تحمل رقم VIN أو مرجعًا تسلسليًا.",
      equipmentTitle: "معدات",
      equipmentText:
        "معدات البناء والزراعة والصناعة والتأجير التي تحمل رقمًا تسلسليًا للآلة.",
      trailerTitle: "مقطورة",
      trailerText:
        "المقطورات والأصول المسحوبة التي تتطلب هوية ومنشأ ووضوحًا قائمًا على الثقة.",
    },
    reportSighting: {
      title: "الإبلاغ عن مشاهدة",
      subtitle:
        "أبلغ عن مشاهدة معدات مُعلّمة أو مسروقة وساعد في تحسين الرؤية عبر الحدود.",
      introTitle: "لماذا تعتبر المشاهدات مهمة",
      introText:
        "يمكن أن تساعد تقارير المشاهدة العامة شركات التأمين والسلطات والمالكين الشرعيين على التصرف بشكل أسرع عندما تكون المعدات مُعلّمة أو مسروقة أو قيد التحقيق.",
    },
    partners: {
      title: "لشركات التأمين / الشركاء",
      subtitle:
        "تم تصميم EquipRegistry كطبقة ثقة لشركات التأمين وشركات التأجير والمؤسسات المالية والمحطات اللوجستية.",
      insurersTitle: "شركات التأمين",
      insurersText:
        "حسّن الاكتتاب، وقلّل الاحتيال، وسرّع الاسترداد. يتيح EquipRegistry التحقق الفوري من الملكية وتاريخ الأصل وحالة المخاطر. اكتشف الأصول المسروقة فورًا وامنع المطالبات على المعدات الاحتيالية.",
      rentalTitle: "شركات التأجير",
      rentalText:
        "احصل على رؤية كاملة لأسطولك عبر الحدود. امنع الاحتيال، وتحقق من العملاء، واحمِ أصولك من السرقة والتسجيلات المكررة وإعادة البيع غير القانونية.",
      financeTitle: "البنوك والمؤسسات المالية",
      financeText:
        "امنع التمويل المزدوج والاحتيال على الأصول. يتيح EquipRegistry للممولين التحقق مما إذا كان الأصل ممولًا بالفعل أو مسجلًا أو مُعلّمًا. قلّل المخاطر في هياكل التأجير والتمويل القائم على الأصول.",
      financeRiskTitle: "مخاطر التمويل المزدوج",
      financeRiskText:
        "يمكن استخدام الأصل نفسه كضمان عدة مرات لدى مؤسسات أو دول مختلفة. ومن دون طبقة ثقة مشتركة، يؤدي ذلك إلى انكشاف خفي ومخاطر احتيال وخسائر مالية محتملة.",
      financeVerificationTitle: "التحقق قبل التمويل",
      financeVerificationText:
        "تحقق مما إذا كان الأصل مسجلاً أو ممولاً أو مُعلَّماً بالفعل أو مرتبطاً بحادثة مخاطر قبل الموافقة على عقد تأجير أو قرض.",
      financeTrustTitle: "ثقة عابرة للحدود",
      financeTrustText:
        "ادعم معاملات دولية أكثر أماناً تشمل الآلات والمركبات والمقطورات وغيرها من الأصول المنقولة المستخدمة في هياكل التمويل.",
      terminalsTitle: "الموانئ والمحطات اللوجستية",
      terminalsText:
        "تحقق من المعدات الداخلة والخارجة في الوقت الفعلي. اكتشف الأصول المسروقة أو المُعلّمة قبل دخولها إلى محطتك أو مغادرتها. ادعم الجمارك والتفتيش والامتثال عبر الحدود.",
      rentalVisibilityTitle: "رؤية الأسطول",
      rentalVisibilityText:
        "حافظ على صورة أوضح لهوية المعدات وحالتها ومخاطرها عبر عدة دول ومواقع تشغيلية.",
      rentalPreventionTitle: "الوقاية من السرقة",
      rentalPreventionText:
        "ادعم وضع العلامات بشكل أسرع وتعزيز الوقاية من الاحتيال حول الأصول المسروقة أو المفقودة أو المعاد بيعها بشكل غير قانوني.",
      rentalOriginTitle: "إثبات المنشأ",
      rentalOriginText:
        "عزّز إثبات الملكية والثقة لشركات التأمين والمشترين والشركاء والأطراف المعنية عبر الحدود.",
      terminalsEntryTitle: "التحكم في الدخول والخروج",
      terminalsEntryText:
        "أضف طبقة تحقق إضافية قبل دخول المعدات إلى المناطق التشغيلية الآمنة أو خروجها منها.",
      terminalsCustomsTitle: "الجمارك والتفتيش",
      terminalsCustomsText:
        "ادعم فحوصات الجمارك وعمليات التحقق في المحطات وإجراءات الامتثال من خلال تعريف أقوى للأصول ورؤية أوضح للمخاطر.",
      ctaText:
        "تم إنشاء EquipRegistry لدعم الشركاء الموثوقين عبر مسارات التأمين والتأجير والتمويل والخدمات اللوجستية والاسترداد.",
    },
    contact: {
      title: "اتصال",
      subtitle:
        "تواصل معنا بخصوص الشراكات أو حالات الاستخدام التأمينية أو المشاريع التجريبية أو التعاون الاستراتيجي.",
      generalTitle: "استفسارات عامة",
      generalText:
        "للأسئلة العامة حول EquipRegistry أو المنصة أو التحقق العام أو كيفية عمل السجل.",
      businessTitle: "الأعمال والشراكات",
      businessText:
        "لشركات التأمين وشركات التأجير والبنوك والمحطات وغيرها من الجهات المهتمة بالتعاون أو المشاريع التجريبية أو التكامل.",
      supportTitle: "الدعم",
      supportText:
        "للمساعدة المتعلقة بالتسجيلات أو جوازات السجل أو البيانات المرسلة أو الأسئلة المتعلقة بالمنصة.",
      emailLabel: "البريد الإلكتروني",
      formTitle: "نموذج الاتصال",
      formIntro:
        "اختر نوع الاتصال الصحيح حتى تصل رسالتك مباشرة إلى صندوق EquipRegistry المناسب.",
      typeLabel: "نوع الاتصال",
      typeGeneral: "استفسار عام",
      typeBusiness: "الأعمال / الشراكات",
      typeSupport: "الدعم",
      namePlaceholder: "اسمك",
      emailPlaceholder: "بريدك الإلكتروني",
      subjectPlaceholder: "الموضوع",
      messagePlaceholder: "رسالتك",
      sendButton: "إرسال الرسالة",
      sendingButton: "جارٍ الإرسال...",
      successMessage: "تم إرسال رسالتك بنجاح.",
      errorMessage: "حدث خطأ أثناء إرسال رسالتك.",
    },
    disclaimer: {
      title: "إخلاء المسؤولية",
      intro:
        "توفر EquipRegistry بنية تحتية رقمية للتسجيل للمركبات والمعدات والمقطورات وغيرها من الأصول المؤهلة.",
      liability:
        "لا تضمن EquipRegistry دقة أو اكتمال أو الصلاحية القانونية للبيانات المقدمة أو المعروضة أو المستوردة. استخدام المنصة يكون على مسؤوليتك الخاصة.",
      data:
        "قد يتم توفير البيانات من قبل المستخدمين والشركاء وشركات التأمين والسلطات والمؤسسات المالية والأنظمة المتكاملة مستقبلًا.",
      future:
        "قد تشمل التكاملات المستقبلية شركات التأمين وجهات إنفاذ القانون والعمليات العابرة للحدود ونقل الملكية وأنظمة الدفع وطبقات التحقق.",
      contact:
        "EquipRegistry — Jimmy Bergsma, Calle Murcia 111, 03420 Castalla, Alicante, Spain. Y8875740P. info@equipregistry.com",
    },
  },
  hero: {
    title: "تحقق من أي مركبة أو معدات في جميع أنحاء العالم",
    subtitle:
      "تحقق من الملكية والسجل وحالة المخاطر باستخدام رقم VIN أو الرقم التسلسلي أو معرف السجل.",
    placeholder: "أدخل رقم VIN أو الرقم التسلسلي أو معرف السجل",
    search: "بحث",
    demoSerials: "أرقام تسلسلية تجريبية:",
    loggedInMessage:
      "أنت مسجل الدخول. يمكنك استخدام البحث بشكل طبيعي والاستمرار في الوصول إلى الجوازات الخاصة.",
    goToDashboard: "الانتقال إلى لوحة التحكم",
    supportedAssetsTitle: "الأصول المدعومة",
    supportedAssetsItems: [
      "المركبات (السيارات والشاحنات والمركبات الكلاسيكية)",
      "المعدات والآلات",
      "الدراجات والتنقل الخفيف",
    ],
  },
  result: {
    whyThisMatters: "لماذا هذا مهم",
  },
  howItWorks: {
    title: "كيف يعمل EquipRegistry",
    step1Title: "1. تحقق",
    step1Text:
      "أدخل رقم VIN أو الرقم التسلسلي أو معرف السجل للتحقق فورًا من حالة التسجيل.",
    step2Title: "2. التحقق",
    step2Text:
      "راجع سجل الملكية والمستندات ومستوى التحقق عندما تكون متاحة.",
    step3Title: "3. التسجيل",
    step3Text:
      "سجّل المركبات أو المعدات أو الأصول الأخرى وأضف المستندات الداعمة.",
    step4Title: "4. الاستخدام",
    step4Text:
      "استخدم جواز السجل للتأمين أو التأجير أو إعادة البيع أو الاسترداد أو الامتثال.",
  },
  trust: {
    title: "مصمم للثقة على نطاق عالمي",
    subtitle:
      "تم تصميم EquipRegistry كبنية تحتية محايدة للمركبات والمعدات وغيرها من الأصول القيّمة، لدعم شركات التأمين وشركات التأجير والمالكين المحترفين والمعاملات العابرة للحدود.",
    card1Title: "جاهز للتأمين",
    card1Text:
      "مهيكل لدعم الاكتتاب ودورات التحقق والقرارات القائمة على المخاطر.",
    card2Title: "مستقل ومحايد",
    card2Text:
      "غير مرتبط بالمصنعين أو الموزعين أو الولايات القضائية — مصدر عالمي للثقة.",
    card3Title: "مصمم للتوسع",
    card3Text:
      "من أصل واحد إلى أساطيل عالمية، جاهز للاعتماد في عدة دول.",
  },
  footer: {
    copyright:
      "EquipRegistry — بنية تحتية رقمية للثقة الخاصة بالأصول",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    disclaimer: "إخلاء المسؤولية",
  },
  statuses: {
    registeredVerified: {
      label: "مسجل ومتحقق منه",
      message:
        "هذا الأصل مسجل في EquipRegistry وتم التحقق من مصدره القانوني.",
      why:
        "هذا الأصل له مصدر قانوني متحقق منه ولديه جواز سجل نشط.",
      metadataStatus: "الحالة",
      metadataPassport: "جواز السجل",
      metadataValidation: "آخر تحقق",
      actionViewPassport: "عرض الجواز",
    },
    historyUnknown: {
      label: "السجل غير معروف",
      message:
        "هذا الأصل موجود في السجل، ولكن لم يتم التحقق من سجل الملكية الكامل الخاص به.",
      why:
        "يزيد سجل الملكية غير المكتمل من مخاطر الاحتيال والتأمين والامتثال.",
      metadataStatus: "الحالة",
      metadataRisk: "مستوى المخاطر",
      actionViewPassport: "عرض الجواز (محدود)",
      actionRequestVerification: "طلب التحقق",
      actionRegisterDocuments: "تسجيل المستندات",
    },
    stolen: {
      label: "أصل مسروق – تحذير أحمر",
      message:
        "تم الإبلاغ رسميًا عن هذا الأصل على أنه مسروق وهو مدرج بنشاط في القائمة السوداء داخل EquipRegistry.",
      warning:
        "لا تقم بشراء هذا الأصل أو تأمينه أو استئجاره أو نقله أو قبول نقله.",
      why:
        "قد تؤدي أي معاملة تتعلق بأصل مسروق إلى عواقب قانونية ومالية.",
      metadataStatus: "الحالة",
      metadataRisk: "مستوى المخاطر",
      metadataReportedBy: "تم الإبلاغ بواسطة",
      metadataJurisdiction: "الاختصاص القضائي",
      metadataReportDate: "تاريخ البلاغ",
      actionReportSighting: "الإبلاغ عن مشاهدة",
      actionContactAuthorities: "الاتصال بالسلطات",
      actionVerifyCaseId: "التحقق من رقم القضية",
    },
    notRegistered: {
      label: "غير مسجل",
      message: "هذا المعرّف غير مسجل في EquipRegistry.",
      why:
        "الأصل غير المسجل يفتقر إلى سجل ملكية وتاريخ تم التحقق منهما.",
      actionRegister: "تسجيل هذا الأصل",
    },
    metadataValues: {
      active: "نشط",
      full: "كامل",
      lastValidation2025: "2025",
      limitedPassport: "جواز محدود",
      medium: "متوسط",
      blacklisted: "مدرج في القائمة السوداء",
      high: "مرتفع",
      insurancePartner: "شريك تأمين",
      euCrossBorderAlert: "الاتحاد الأوروبي / تنبيه عبر الحدود",
      reportDate: "2025-03-12",
    },
  },
  dashboard: {
    requestStatuses: {
      draft: "مسودة",
      incomplete: "غير مكتمل",
      submitted: "تم الإرسال",
      underReview: "قيد المراجعة",
      moreInfoRequired: "مطلوب مزيد من المعلومات",
      approved: "تمت الموافقة",
      rejected: "مرفوض",
      passportIssued: "جواز الأصل متاح",
      unknown: "غير معروف",
    },
    registrationDetail: {
      backToAdminRegistrations: "العودة إلى تسجيلات الإدارة",
      backToRegistrations: "العودة إلى التسجيلات",
      adminPaymentConfirmationTitle: "تأكيد الدفع الإداري",
      adminPaymentConfirmationDescription:
        "بعد تأكيد التحويل البنكي يدويًا، قم بتحديد هذا التسجيل على أنه مدفوع.",
      reviewWorkflowTitle: "سير عمل المراجعة",
      reviewWorkflowDescription:
        "انقل التسجيل عبر مراحل المراجعة والموافقة والإصدار النهائي للجواز.",
      detailsTitle: "تفاصيل التسجيل",
      dynamicFieldsTitle: "بيانات إضافية للأصل",
      noAdditionalData: "لا توجد بيانات إضافية متاحة.",
      paymentCompleted: "مكتمل / تم التأكيد",
      paymentPending: "قيد الانتظار",
      labels: {
        passportNumber: "رقم الجواز",
        applicantType: "نوع مقدم الطلب",
        assetName: "اسم الأصل",
        category: "الفئة",
        subcategory: "الفئة الفرعية",
        brand: "العلامة التجارية",
        model: "الطراز",
        serialNumber: "الرقم التسلسلي",
        owner: "المالك",
        ownerEmail: "بريد المالك الإلكتروني",
        created: "تاريخ الإنشاء",
        updated: "تاريخ التحديث",
        payment: "الدفع",
        completenessScore: "درجة الاكتمال",
        solarPanelSerialNumbers: "الأرقام التسلسلية للألواح الشمسية",
        batterySerialNumbers: "الأرقام التسلسلية للبطاريات",
        bikeBatterySerialNumbers: "الأرقام التسلسلية لبطاريات الدراجات",
        capacity: "السعة",
        powerRating: "القدرة",
        batchLotNumber: "رقم الدفعة / التشغيلة",
        installationLocation: "موقع التركيب",
        hoursOfOperation: "ساعات التشغيل",
        deviceId: "معرف الجهاز",
        certification: "الشهادة",
        ownerOrganisation: "الجهة المالكة",
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

export function getDictionary(lang: string) {
  return dictionary[lang as Lang] ?? dictionary.en;
}
