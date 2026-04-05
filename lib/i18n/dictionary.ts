import type { Lang } from "./config";

type Dictionary = {
  nav: {
    howItWorks: string;
    login: string;
  };
  menu: {
    home: string;
    verifyAsset: string;
    registerAsset: string;
    reportSighting: string;
    partners: string;
    contact: string;
  };
  common: {
    goToHomepageSearch: string;
    publicVerification: string;
    whySightingsMatter: string;
    contactEquipRegistry: string;
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
    };
    contact: {
      title: string;
      subtitle: string;
      introTitle: string;
      introText: string;
      note: string;
    };
    disclaimer: {
      title: string;
      intro: string;
      liability: string;
      data: string;
      future: string;
      contact: string;
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
  },
  menu: {
    home: "Home",
    verifyAsset: "Verify Asset",
    registerAsset: "Register Asset",
    reportSighting: "Report Sighting",
    partners: "For Insurers / Partners",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Go to homepage search",
    publicVerification: "Public verification",
    whySightingsMatter: "Why sightings matter",
    contactEquipRegistry: "Contact EquipRegistry",
  },
  pages: {
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
        "EquipRegistry is designed to support insurers, rental companies, banks and other trusted ecosystem partners.",
      insurersTitle: "Insurers",
      insurersText:
        "Support underwriting, recovery, validation cycles and fraud prevention.",
      rentalTitle: "Rental companies",
      rentalText:
        "Improve fleet visibility, proof of ownership and cross-border trust.",
      financeTitle: "Financial institutions",
      financeText:
        "Reduce fraud risk and improve trust around financed movable assets.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Get in touch regarding partnerships, insurance use cases, pilot discussions or strategic collaboration.",
      introTitle: "Contact EquipRegistry",
      introText:
        "This page can later hold your contact form, business email addresses, regional contact details and partnership requests.",
      note:
        "For now, we are creating the structure first so the frontend already feels like a real product.",
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
  },
  menu: {
    home: "Inicio",
    verifyAsset: "Verificar activo",
    registerAsset: "Registrar activo",
    reportSighting: "Reportar avistamiento",
    partners: "Para aseguradoras / socios",
    contact: "Contacto",
  },
  common: {
    goToHomepageSearch: "Ir a la búsqueda de inicio",
    publicVerification: "Verificación pública",
    whySightingsMatter: "Por qué los avistamientos importan",
    contactEquipRegistry: "Contactar con EquipRegistry",
  },
  pages: {
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
        "EquipRegistry está diseñado para apoyar a aseguradoras, empresas de alquiler, bancos y otros socios de confianza del ecosistema.",
      insurersTitle: "Aseguradoras",
      insurersText:
        "Apoyo a suscripción, recuperación, ciclos de validación y prevención de fraude.",
      rentalTitle: "Empresas de alquiler",
      rentalText:
        "Mejorar visibilidad de flota, prueba de propiedad y confianza transfronteriza.",
      financeTitle: "Entidades financieras",
      financeText:
        "Reducir riesgo de fraude y mejorar la confianza en activos muebles financiados.",
    },
    contact: {
      title: "Contacto",
      subtitle:
        "Póngase en contacto para colaboraciones, casos de uso con aseguradoras, pilotos o cooperación estratégica.",
      introTitle: "Contactar con EquipRegistry",
      introText:
        "Esta página podrá incluir más adelante su formulario de contacto, correos empresariales, datos regionales y solicitudes de colaboración.",
      note:
        "Por ahora, estamos creando primero la estructura para que el frontend ya se sienta como un producto real.",
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
  },
  menu: {
    home: "Startseite",
    verifyAsset: "Asset prüfen",
    registerAsset: "Asset registrieren",
    reportSighting: "Sichtung melden",
    partners: "Für Versicherer / Partner",
    contact: "Kontakt",
  },
  common: {
    goToHomepageSearch: "Zur Startseiten-Suche",
    publicVerification: "Öffentliche Verifizierung",
    whySightingsMatter: "Warum Sichtungen wichtig sind",
    contactEquipRegistry: "EquipRegistry kontaktieren",
  },
  pages: {
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
        "EquipRegistry wurde entwickelt, um Versicherer, Vermieter, Banken und andere vertrauenswürdige Ökosystempartner zu unterstützen.",
      insurersTitle: "Versicherer",
      insurersText:
        "Unterstützung für Underwriting, Rückgewinnung, Validierungszyklen und Betrugsprävention.",
      rentalTitle: "Vermietunternehmen",
      rentalText:
        "Verbesserung von Flottenübersicht, Eigentumsnachweis und grenzüberschreitendem Vertrauen.",
      financeTitle: "Finanzinstitute",
      financeText:
        "Betrugsrisiken senken und Vertrauen bei finanzierten beweglichen Vermögenswerten stärken.",
    },
    contact: {
      title: "Kontakt",
      subtitle:
        "Kontaktieren Sie uns zu Partnerschaften, Versicherungsanwendungen, Pilotprojekten oder strategischer Zusammenarbeit.",
      introTitle: "EquipRegistry kontaktieren",
      introText:
        "Diese Seite kann später Ihr Kontaktformular, geschäftliche E-Mail-Adressen, regionale Kontaktdaten und Partnerschaftsanfragen enthalten.",
      note:
        "Im Moment erstellen wir zuerst die Struktur, damit sich das Frontend bereits wie ein echtes Produkt anfühlt.",
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
  },
  menu: {
    home: "Accueil",
    verifyAsset: "Vérifier l’actif",
    registerAsset: "Enregistrer l’actif",
    reportSighting: "Signaler un repérage",
    partners: "Pour assureurs / partenaires",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Aller à la recherche d’accueil",
    publicVerification: "Vérification publique",
    whySightingsMatter: "Pourquoi les repérages comptent",
    contactEquipRegistry: "Contacter EquipRegistry",
  },
  pages: {
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
        "EquipRegistry est conçu pour soutenir les assureurs, loueurs, banques et autres partenaires de confiance de l’écosystème.",
      insurersTitle: "Assureurs",
      insurersText:
        "Soutien à la souscription, au recouvrement, aux cycles de validation et à la prévention de la fraude.",
      rentalTitle: "Sociétés de location",
      rentalText:
        "Améliorer la visibilité des flottes, la preuve de propriété et la confiance transfrontalière.",
      financeTitle: "Institutions financières",
      financeText:
        "Réduire le risque de fraude et renforcer la confiance autour des actifs mobiliers financés.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Prenez contact pour des partenariats, des cas d’usage assurance, des pilotes ou une collaboration stratégique.",
      introTitle: "Contacter EquipRegistry",
      introText:
        "Cette page pourra plus tard contenir votre formulaire de contact, vos e-mails professionnels, vos coordonnées régionales et vos demandes de partenariat.",
      note:
        "Pour l’instant, nous construisons d’abord la structure afin que le frontend donne déjà l’impression d’un vrai produit.",
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
  },
  menu: {
    home: "Home",
    verifyAsset: "Verifica asset",
    registerAsset: "Registra asset",
    reportSighting: "Segnala avvistamento",
    partners: "Per assicuratori / partner",
    contact: "Contatto",
  },
  common: {
    goToHomepageSearch: "Vai alla ricerca homepage",
    publicVerification: "Verifica pubblica",
    whySightingsMatter: "Perché gli avvistamenti contano",
    contactEquipRegistry: "Contatta EquipRegistry",
  },
  pages: {
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
        "EquipRegistry è progettato per supportare assicuratori, società di noleggio, banche e altri partner fidati dell’ecosistema.",
      insurersTitle: "Assicuratori",
      insurersText:
        "Supporto per underwriting, recupero, cicli di validazione e prevenzione frodi.",
      rentalTitle: "Società di noleggio",
      rentalText:
        "Migliorare visibilità flotta, prova di proprietà e fiducia transfrontaliera.",
      financeTitle: "Istituzioni finanziarie",
      financeText:
        "Ridurre il rischio di frode e migliorare la fiducia sugli asset mobili finanziati.",
    },
    contact: {
      title: "Contatto",
      subtitle:
        "Contattaci per partnership, casi d’uso assicurativi, progetti pilota o collaborazione strategica.",
      introTitle: "Contatta EquipRegistry",
      introText:
        "Questa pagina potrà in seguito contenere il tuo modulo di contatto, email aziendali, dettagli regionali e richieste di partnership.",
      note:
        "Per ora, stiamo creando prima la struttura così che il frontend sembri già un prodotto reale.",
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
  },
  menu: {
    home: "Home",
    verifyAsset: "Asset verifiëren",
    registerAsset: "Asset registreren",
    reportSighting: "Melding doen",
    partners: "Voor verzekeraars / partners",
    contact: "Contact",
  },
  common: {
    goToHomepageSearch: "Ga naar homepage zoekfunctie",
    publicVerification: "Publieke verificatie",
    whySightingsMatter: "Waarom meldingen belangrijk zijn",
    contactEquipRegistry: "Neem contact op met EquipRegistry",
  },
  pages: {
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
        "EquipRegistry is ontworpen om verzekeraars, verhuurbedrijven, banken en andere vertrouwde ecosysteempartners te ondersteunen.",
      insurersTitle: "Verzekeraars",
      insurersText:
        "Ondersteuning voor underwriting, recovery, validatiecycli en fraudepreventie.",
      rentalTitle: "Verhuurbedrijven",
      rentalText:
        "Verbeter vlootzichtbaarheid, eigendomsbewijs en grensoverschrijdend vertrouwen.",
      financeTitle: "Financiële instellingen",
      financeText:
        "Verlaag frauderisico en verbeter vertrouwen rond gefinancierde roerende assets.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Neem contact op over partnerships, use cases voor verzekeraars, pilots of strategische samenwerking.",
      introTitle: "Neem contact op met EquipRegistry",
      introText:
        "Deze pagina kan later je contactformulier, zakelijke e-mailadressen, regionale contactgegevens en partneraanvragen bevatten.",
      note:
        "Voor nu bouwen we eerst de structuur zodat de frontend al aanvoelt als een echt product.",
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
  },
  menu: {
    home: "Início",
    verifyAsset: "Verificar ativo",
    registerAsset: "Registar ativo",
    reportSighting: "Reportar avistamento",
    partners: "Para seguradoras / parceiros",
    contact: "Contacto",
  },
  common: {
    goToHomepageSearch: "Ir para a pesquisa da homepage",
    publicVerification: "Verificação pública",
    whySightingsMatter: "Porque os avistamentos importam",
    contactEquipRegistry: "Contactar EquipRegistry",
  },
  pages: {
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
        "EquipRegistry foi concebido para apoiar seguradoras, empresas de aluguer, bancos e outros parceiros fiáveis do ecossistema.",
      insurersTitle: "Seguradoras",
      insurersText:
        "Apoio a subscrição, recuperação, ciclos de validação e prevenção de fraude.",
      rentalTitle: "Empresas de aluguer",
      rentalText:
        "Melhorar visibilidade da frota, prova de propriedade e confiança transfronteiriça.",
      financeTitle: "Instituições financeiras",
      financeText:
        "Reduzir o risco de fraude e melhorar a confiança em ativos móveis financiados.",
    },
    contact: {
      title: "Contacto",
      subtitle:
        "Entre em contacto sobre parcerias, casos de uso com seguradoras, pilotos ou colaboração estratégica.",
      introTitle: "Contactar EquipRegistry",
      introText:
        "Esta página poderá mais tarde incluir o seu formulário de contacto, endereços de email empresariais, detalhes regionais e pedidos de parceria.",
      note:
        "Por agora, estamos a criar primeiro a estrutura para que o frontend já pareça um produto real.",
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
  ...en,
  nav: {
    howItWorks: "Как это работает",
    login: "Войти",
  },
  menu: {
    home: "Главная",
    verifyAsset: "Проверить актив",
    registerAsset: "Зарегистрировать актив",
    reportSighting: "Сообщить о наблюдении",
    partners: "Для страховщиков / партнёров",
    contact: "Контакт",
  },
  common: {
    goToHomepageSearch: "Перейти к поиску на главной странице",
    publicVerification: "Публичная проверка",
    whySightingsMatter: "Почему сообщения о наблюдении важны",
    contactEquipRegistry: "Связаться с EquipRegistry",
  },
  pages: {
    ...en.pages,
    contact: {
      title: "Контакт",
      subtitle:
        "Свяжитесь с нами по вопросам партнёрства, страховых сценариев, пилотных проектов или стратегического сотрудничества.",
      introTitle: "Связаться с EquipRegistry",
      introText:
        "Позже на этой странице могут быть размещены контактная форма, рабочие адреса электронной почты, региональные контакты и запросы на партнёрство.",
      note:
        "Сейчас мы сначала создаём структуру, чтобы фронтенд уже выглядел как настоящий продукт.",
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
  },
  result: {
    whyThisMatters: "Почему это важно",
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
        bikeBatterySerialNumbers:
          "Серийные номера велосипедных батарей",
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
  ...en,
  nav: {
    howItWorks: "运作方式",
    login: "登录",
  },
  menu: {
    home: "首页",
    verifyAsset: "验证资产",
    registerAsset: "注册资产",
    reportSighting: "报告发现",
    partners: "面向保险公司 / 合作伙伴",
    contact: "联系",
  },
  common: {
    goToHomepageSearch: "前往首页搜索",
    publicVerification: "公开验证",
    whySightingsMatter: "为什么发现报告很重要",
    contactEquipRegistry: "联系 EquipRegistry",
  },
  pages: {
    ...en.pages,
    contact: {
      title: "联系",
      subtitle:
        "如需洽谈合作、保险使用场景、试点项目或战略合作，请与我们联系。",
      introTitle: "联系 EquipRegistry",
      introText:
        "此页面之后可放置联系表单、商务邮箱、区域联系方式和合作申请。",
      note:
        "目前我们先把结构搭好，让前端看起来已经像一个真正的产品。",
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
  },
  result: {
    whyThisMatters: "这为什么重要",
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
  ...en,
  nav: {
    howItWorks: "यह कैसे काम करता है",
    login: "लॉगिन",
  },
  menu: {
    home: "होम",
    verifyAsset: "एसेट सत्यापित करें",
    registerAsset: "एसेट पंजीकृत करें",
    reportSighting: "देखे जाने की रिपोर्ट करें",
    partners: "बीमाकर्ताओं / भागीदारों के लिए",
    contact: "संपर्क",
  },
  common: {
    goToHomepageSearch: "होमपेज खोज पर जाएँ",
    publicVerification: "सार्वजनिक सत्यापन",
    whySightingsMatter: "देखे जाने की रिपोर्ट क्यों महत्वपूर्ण है",
    contactEquipRegistry: "EquipRegistry से संपर्क करें",
  },
  pages: {
    ...en.pages,
    contact: {
      title: "संपर्क",
      subtitle:
        "भागीदारी, बीमा उपयोग मामलों, पायलट चर्चाओं या रणनीतिक सहयोग के लिए संपर्क करें।",
      introTitle: "EquipRegistry से संपर्क करें",
      introText:
        "इस पेज पर बाद में आपका संपर्क फ़ॉर्म, बिज़नेस ईमेल, क्षेत्रीय संपर्क विवरण और पार्टनरशिप अनुरोध रखे जा सकते हैं।",
      note:
        "फ़िलहाल हम पहले संरचना बना रहे हैं ताकि फ्रंटएंड पहले से ही एक असली प्रोडक्ट जैसा लगे।",
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
  },
  result: {
    whyThisMatters: "यह क्यों महत्वपूर्ण है",
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
  ...en,
  nav: {
    howItWorks: "كيف يعمل",
    login: "تسجيل الدخول",
  },
  menu: {
    home: "الرئيسية",
    verifyAsset: "التحقق من الأصل",
    registerAsset: "تسجيل الأصل",
    reportSighting: "الإبلاغ عن مشاهدة",
    partners: "لشركات التأمين / الشركاء",
    contact: "اتصال",
  },
  common: {
    goToHomepageSearch: "الانتقال إلى بحث الصفحة الرئيسية",
    publicVerification: "تحقق عام",
    whySightingsMatter: "لماذا تعتبر المشاهدات مهمة",
    contactEquipRegistry: "الاتصال بـ EquipRegistry",
  },
  pages: {
    ...en.pages,
    contact: {
      title: "اتصال",
      subtitle:
        "تواصل معنا بخصوص الشراكات أو حالات الاستخدام التأمينية أو المشاريع التجريبية أو التعاون الاستراتيجي.",
      introTitle: "الاتصال بـ EquipRegistry",
      introText:
        "يمكن أن تحتوي هذه الصفحة لاحقًا على نموذج الاتصال وعناوين البريد الإلكتروني الخاصة بالأعمال وبيانات الاتصال الإقليمية وطلبات الشراكة.",
      note:
        "في الوقت الحالي نقوم أولاً ببناء الهيكل حتى يبدو الواجهة الأمامية بالفعل كمنتج حقيقي.",
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
  },
  result: {
    whyThisMatters: "لماذا هذا مهم",
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
        bikeBatterySerialNumbers:
          "الأرقام التسلسلية لبطاريات الدراجات",
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
};

export function getDictionary(lang: string) {
  return dictionary[lang as Lang] ?? dictionary.en;
}