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
};

export const dictionary: Record<Lang, Dictionary> = {
  en: {
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
    },
    nav: {
      howItWorks: "How it works",
      login: "Login",
    },
    hero: {
      title: "Verify Equipment History Worldwide",
      subtitle:
        "A global registry to prevent equipment fraud, theft and insurance risk.",
      placeholder: "Enter serial number",
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
        "Enter the equipment serial number to instantly check registration status.",
      step2Title: "2. Verify",
      step2Text:
        "Review ownership history, documents and validation level.",
      step3Title: "3. Register",
      step3Text:
        "Register equipment and upload proof of legal origin where required.",
      step4Title: "4. Use",
      step4Text:
        "Use the registry passport for insurance, rental, resale or compliance.",
    },
    trust: {
      title: "Built for Trust at Global Scale",
      subtitle:
        "EquipRegistry is designed as neutral infrastructure for the equipment industry — supporting insurers, rental companies, professional owners and cross-border transactions.",
      card1Title: "Insurance-ready",
      card1Text:
        "Structured to support underwriting, validation cycles and risk-based decision making.",
      card2Title: "Independent & Neutral",
      card2Text:
        "Not tied to manufacturers, dealers or jurisdictions — one global source of truth.",
      card3Title: "Designed to Scale",
      card3Text:
        "From single machines to global fleets, built for high-volume, multi-country adoption.",
    },
    footer: {
      copyright:
        "EquipRegistry — Concept demo for investors & insurers",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      disclaimer: "Disclaimer",
    },
    statuses: {
      registeredVerified: {
        label: "Registered & Verified",
        message:
          "This machine is registered in EquipRegistry and its legal origin has been verified.",
        why:
          "This equipment has a verified legal origin and an active registry passport.",
        metadataStatus: "Status",
        metadataPassport: "Registry passport",
        metadataValidation: "Last validation",
        actionViewPassport: "View passport",
      },
      historyUnknown: {
        label: "History Unknown",
        message:
          "This machine exists in the registry, but its full ownership history could not be verified.",
        why:
          "Incomplete ownership history increases fraud, insurance and compliance risk.",
        metadataStatus: "Status",
        metadataRisk: "Risk level",
        actionViewPassport: "View passport (limited)",
        actionRequestVerification: "Request verification",
        actionRegisterDocuments: "Register documents",
      },
      stolen: {
        label: "Stolen Equipment – Red Flag",
        message:
          "This machine has been officially reported stolen and is actively blacklisted in EquipRegistry.",
        warning: "Do NOT purchase, insure, rent or transport this machine.",
        why:
          "Any transaction involving stolen equipment may lead to legal and financial consequences.",
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
        message: "This serial number is not registered in EquipRegistry.",
        why:
          "Unregistered equipment lacks a verified ownership and history record.",
        actionRegister: "Register this machine",
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
  },

    es: {
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
    },
    hero: {
      title: "Verifique el historial del equipo a nivel mundial",
      subtitle:
        "Un registro global para prevenir fraude, robo y riesgos de seguro en maquinaria y equipos.",
      placeholder: "Introduzca el número de serie",
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
        "Introduzca el número de serie para comprobar al instante el estado del registro.",
      step2Title: "2. Verificar",
      step2Text:
        "Revise el historial de propiedad, los documentos y el nivel de validación.",
      step3Title: "3. Registrar",
      step3Text:
        "Registre el equipo y cargue la prueba de origen legal cuando sea necesario.",
      step4Title: "4. Utilizar",
      step4Text:
        "Utilice el pasaporte registral para seguros, alquiler, reventa o cumplimiento.",
    },
    trust: {
      title: "Diseñado para generar confianza a escala global",
      subtitle:
        "EquipRegistry está diseñado como una infraestructura neutral para el sector del equipo y la maquinaria, apoyando a aseguradoras, empresas de alquiler, propietarios profesionales y transacciones transfronterizas.",
      card1Title: "Preparado para seguros",
      card1Text:
        "Estructurado para respaldar suscripción, ciclos de validación y decisiones basadas en riesgo.",
      card2Title: "Independiente y neutral",
      card2Text:
        "No está vinculado a fabricantes, distribuidores ni jurisdicciones: una fuente global de confianza.",
      card3Title: "Diseñado para escalar",
      card3Text:
        "Desde una sola máquina hasta flotas globales, preparado para adopción multi-país.",
    },
    footer: {
      copyright:
        "EquipRegistry — Demo conceptual para inversores y aseguradoras",
      privacy: "Política de privacidad",
      terms: "Términos y condiciones",
      disclaimer: "Aviso legal",
    },
    statuses: {
      registeredVerified: {
        label: "Registrado y verificado",
        message:
          "Esta máquina está registrada en EquipRegistry y su origen legal ha sido verificado.",
        why:
          "Este equipo tiene un origen legal verificado y un pasaporte registral activo.",
        metadataStatus: "Estado",
        metadataPassport: "Pasaporte registral",
        metadataValidation: "Última validación",
        actionViewPassport: "Ver pasaporte",
      },
      historyUnknown: {
        label: "Historial desconocido",
        message:
          "Esta máquina existe en el registro, pero no se pudo verificar todo su historial de propiedad.",
        why:
          "Un historial de propiedad incompleto aumenta el riesgo de fraude, seguros y cumplimiento.",
        metadataStatus: "Estado",
        metadataRisk: "Nivel de riesgo",
        actionViewPassport: "Ver pasaporte (limitado)",
        actionRequestVerification: "Solicitar verificación",
        actionRegisterDocuments: "Registrar documentos",
      },
      stolen: {
        label: "Equipo robado – Alerta roja",
        message:
          "Esta máquina ha sido reportada oficialmente como robada y está activamente bloqueada en EquipRegistry.",
        warning:
          "NO compre, asegure, alquile ni transporte esta máquina.",
        why:
          "Cualquier transacción con equipo robado puede generar consecuencias legales y financieras.",
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
        message: "Este número de serie no está registrado en EquipRegistry.",
        why:
          "Un equipo no registrado carece de un historial y una titularidad verificados.",
        actionRegister: "Registrar esta máquina",
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
  },

  de: {
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
    },
    nav: { howItWorks: "So funktioniert es", login: "Anmelden" },
    hero: {
      title: "Gerätehistorie weltweit prüfen",
      subtitle:
        "Ein globales Register zur Vermeidung von Betrug, Diebstahl und Versicherungsrisiken.",
      placeholder: "Seriennummer eingeben",
      search: "Suchen",
      demoSerials: "Demo-Seriennummern:",
      loggedInMessage:
        "Sie sind eingeloggt. Sie können die Suche normal nutzen und weiterhin auf private Pässe zugreifen.",
      goToDashboard: "Zum Dashboard",
    },
    result: { whyThisMatters: "Warum das wichtig ist" },
    howItWorks: {
      title: "So funktioniert EquipRegistry",
      step1Title: "1. Prüfen",
      step1Text:
        "Geben Sie die Seriennummer ein, um den Registrierungsstatus sofort zu prüfen.",
      step2Title: "2. Verifizieren",
      step2Text:
        "Prüfen Sie Eigentumshistorie, Dokumente und Validierungsstufe.",
      step3Title: "3. Registrieren",
      step3Text:
        "Registrieren Sie das Gerät und laden Sie bei Bedarf Nachweise zum legalen Ursprung hoch.",
      step4Title: "4. Nutzen",
      step4Text:
        "Nutzen Sie den Registerpass für Versicherung, Vermietung, Wiederverkauf oder Compliance.",
    },
    trust: {
      title: "Für Vertrauen im globalen Maßstab gebaut",
      subtitle:
        "EquipRegistry ist als neutrale Infrastruktur für die Gerätebranche konzipiert und unterstützt Versicherer, Vermieter, professionelle Eigentümer und grenzüberschreitende Transaktionen.",
      card1Title: "Versicherungsfähig",
      card1Text:
        "Strukturiert zur Unterstützung von Underwriting, Validierungszyklen und risikobasierten Entscheidungen.",
      card2Title: "Unabhängig & neutral",
      card2Text:
        "Nicht an Hersteller, Händler oder Rechtsräume gebunden — eine globale Vertrauensquelle.",
      card3Title: "Für Skalierung gebaut",
      card3Text:
        "Von einzelnen Maschinen bis zu globalen Flotten, ausgelegt für hohe Volumen und mehrere Länder.",
    },
    footer: {
      copyright:
        "EquipRegistry — Konzeptdemo für Investoren und Versicherer",
      privacy: "Datenschutz",
      terms: "AGB",
      disclaimer: "Haftungsausschluss",
    },
    statuses: {
      registeredVerified: {
        label: "Registriert & verifiziert",
        message:
          "Diese Maschine ist in EquipRegistry registriert und ihr legaler Ursprung wurde verifiziert.",
        why:
          "Dieses Gerät hat einen verifizierten legalen Ursprung und einen aktiven Registerpass.",
        metadataStatus: "Status",
        metadataPassport: "Registerpass",
        metadataValidation: "Letzte Validierung",
        actionViewPassport: "Pass ansehen",
      },
      historyUnknown: {
        label: "Historie unbekannt",
        message:
          "Diese Maschine ist im Register vorhanden, aber ihre vollständige Eigentumshistorie konnte nicht verifiziert werden.",
        why:
          "Eine unvollständige Eigentumshistorie erhöht Betrugs-, Versicherungs- und Compliance-Risiken.",
        metadataStatus: "Status",
        metadataRisk: "Risikostufe",
        actionViewPassport: "Pass ansehen (eingeschränkt)",
        actionRequestVerification: "Verifizierung anfordern",
        actionRegisterDocuments: "Dokumente registrieren",
      },
      stolen: {
        label: "Gestohlenes Gerät – Warnstufe Rot",
        message:
          "Diese Maschine wurde offiziell als gestohlen gemeldet und ist in EquipRegistry aktiv gesperrt.",
        warning:
          "Diese Maschine NICHT kaufen, versichern, mieten oder transportieren.",
        why:
          "Jede Transaktion mit gestohlenem Gerät kann rechtliche und finanzielle Folgen haben.",
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
        message:
          "Diese Seriennummer ist nicht in EquipRegistry registriert.",
        why:
          "Nicht registriertes Gerät verfügt nicht über einen verifizierten Eigentums- und Verlaufseintrag.",
        actionRegister: "Diese Maschine registrieren",
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
  },

  fr: {
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
    },
    nav: { howItWorks: "Fonctionnement", login: "Connexion" },
    hero: {
      title: "Vérifiez l’historique des équipements dans le monde entier",
      subtitle:
        "Un registre mondial pour prévenir la fraude, le vol et les risques d’assurance.",
      placeholder: "Entrez le numéro de série",
      search: "Rechercher",
      demoSerials: "Numéros de démonstration :",
      loggedInMessage:
        "Vous êtes connecté. Vous pouvez utiliser la recherche normalement et accéder aux passeports privés.",
      goToDashboard: "Aller au tableau de bord",
    },
    result: { whyThisMatters: "Pourquoi c’est important" },
    howItWorks: {
      title: "Comment fonctionne EquipRegistry",
      step1Title: "1. Vérifier",
      step1Text:
        "Entrez le numéro de série pour vérifier instantanément le statut d’enregistrement.",
      step2Title: "2. Contrôler",
      step2Text:
        "Examinez l’historique de propriété, les documents et le niveau de validation.",
      step3Title: "3. Enregistrer",
      step3Text:
        "Enregistrez l’équipement et téléchargez la preuve d’origine légale si nécessaire.",
      step4Title: "4. Utiliser",
      step4Text:
        "Utilisez le passeport du registre pour l’assurance, la location, la revente ou la conformité.",
    },
    trust: {
      title: "Conçu pour la confiance à l’échelle mondiale",
      subtitle:
        "EquipRegistry est conçu comme une infrastructure neutre pour le secteur des équipements, au service des assureurs, loueurs, propriétaires professionnels et transactions transfrontalières.",
      card1Title: "Prêt pour l’assurance",
      card1Text:
        "Structuré pour soutenir la souscription, les cycles de validation et les décisions fondées sur le risque.",
      card2Title: "Indépendant & neutre",
      card2Text:
        "Non lié aux fabricants, revendeurs ou juridictions — une source mondiale de confiance.",
      card3Title: "Conçu pour évoluer",
      card3Text:
        "D’une seule machine à des flottes mondiales, pensé pour un déploiement multi-pays.",
    },
    footer: {
      copyright:
        "EquipRegistry — Démo conceptuelle pour investisseurs et assureurs",
      privacy: "Politique de confidentialité",
      terms: "Conditions générales",
      disclaimer: "Avertissement",
    },
    statuses: {
      registeredVerified: {
        label: "Enregistré et vérifié",
        message:
          "Cette machine est enregistrée dans EquipRegistry et son origine légale a été vérifiée.",
        why:
          "Cet équipement possède une origine légale vérifiée et un passeport actif dans le registre.",
        metadataStatus: "Statut",
        metadataPassport: "Passeport registre",
        metadataValidation: "Dernière validation",
        actionViewPassport: "Voir le passeport",
      },
      historyUnknown: {
        label: "Historique inconnu",
        message:
          "Cette machine existe dans le registre, mais son historique complet de propriété n’a pas pu être vérifié.",
        why:
          "Un historique de propriété incomplet augmente les risques de fraude, d’assurance et de conformité.",
        metadataStatus: "Statut",
        metadataRisk: "Niveau de risque",
        actionViewPassport: "Voir le passeport (limité)",
        actionRequestVerification: "Demander une vérification",
        actionRegisterDocuments: "Enregistrer des documents",
      },
      stolen: {
        label: "Équipement volé – Alerte rouge",
        message:
          "Cette machine a été officiellement signalée volée et est activement bloquée dans EquipRegistry.",
        warning:
          "NE PAS acheter, assurer, louer ni transporter cette machine.",
        why:
          "Toute transaction impliquant un équipement volé peut entraîner des conséquences juridiques et financières.",
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
        message:
          "Ce numéro de série n’est pas enregistré dans EquipRegistry.",
        why:
          "Un équipement non enregistré ne dispose pas d’un historique et d’une propriété vérifiés.",
        actionRegister: "Enregistrer cette machine",
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
  },

  it: {
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
    },
    nav: { howItWorks: "Come funziona", login: "Accesso" },
    hero: {
      title: "Verifica la storia delle attrezzature a livello mondiale",
      subtitle:
        "Un registro globale per prevenire frodi, furti e rischi assicurativi.",
      placeholder: "Inserisci il numero di serie",
      search: "Cerca",
      demoSerials: "Seriali demo:",
      loggedInMessage:
        "Hai effettuato l’accesso. Puoi usare la ricerca normalmente e accedere ai passaporti privati.",
      goToDashboard: "Vai alla dashboard",
    },
    result: { whyThisMatters: "Perché è importante" },
    howItWorks: {
      title: "Come funziona EquipRegistry",
      step1Title: "1. Controlla",
      step1Text:
        "Inserisci il numero di serie per verificare subito lo stato di registrazione.",
      step2Title: "2. Verifica",
      step2Text:
        "Controlla la cronologia di proprietà, i documenti e il livello di validazione.",
      step3Title: "3. Registra",
      step3Text:
        "Registra l’attrezzatura e carica la prova di origine legale quando richiesto.",
      step4Title: "4. Usa",
      step4Text:
        "Usa il passaporto del registro per assicurazione, noleggio, rivendita o conformità.",
    },
    trust: {
      title: "Costruito per la fiducia su scala globale",
      subtitle:
        "EquipRegistry è progettato come infrastruttura neutrale per il settore delle attrezzature, a supporto di assicuratori, noleggiatori, proprietari professionali e transazioni transfrontaliere.",
      card1Title: "Pronto per le assicurazioni",
      card1Text:
        "Strutturato per supportare underwriting, cicli di validazione e decisioni basate sul rischio.",
      card2Title: "Indipendente e neutrale",
      card2Text:
        "Non legato a produttori, concessionari o giurisdizioni — un’unica fonte globale di fiducia.",
      card3Title: "Progettato per scalare",
      card3Text:
        "Da una singola macchina a flotte globali, pensato per un’adozione multi-paese.",
    },
    footer: {
      copyright:
        "EquipRegistry — Demo concettuale per investitori e assicuratori",
      privacy: "Privacy Policy",
      terms: "Termini e condizioni",
      disclaimer: "Disclaimer",
    },
    statuses: {
      registeredVerified: {
        label: "Registrato e verificato",
        message:
          "Questa macchina è registrata in EquipRegistry e la sua origine legale è stata verificata.",
        why:
          "Questa attrezzatura ha un’origine legale verificata e un passaporto di registro attivo.",
        metadataStatus: "Stato",
        metadataPassport: "Passaporto registro",
        metadataValidation: "Ultima validazione",
        actionViewPassport: "Vedi passaporto",
      },
      historyUnknown: {
        label: "Cronologia sconosciuta",
        message:
          "Questa macchina è presente nel registro, ma la sua cronologia completa di proprietà non ha potuto essere verificata.",
        why:
          "Una cronologia di proprietà incompleta aumenta il rischio di frode, assicurazione e conformità.",
        metadataStatus: "Stato",
        metadataRisk: "Livello di rischio",
        actionViewPassport: "Vedi passaporto (limitato)",
        actionRequestVerification: "Richiedi verifica",
        actionRegisterDocuments: "Registra documenti",
      },
      stolen: {
        label: "Attrezzatura rubata – Allerta rossa",
        message:
          "Questa macchina è stata ufficialmente segnalata come rubata ed è attivamente bloccata in EquipRegistry.",
        warning:
          "NON acquistare, assicurare, noleggiare o trasportare questa macchina.",
        why:
          "Qualsiasi transazione che coinvolga attrezzatura rubata può avere conseguenze legali e finanziarie.",
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
        message:
          "Questo numero di serie non è registrato in EquipRegistry.",
        why:
          "Un’attrezzatura non registrata non ha una cronologia e una titolarità verificate.",
        actionRegister: "Registra questa macchina",
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
  },

  nl: {
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
    },
    nav: { howItWorks: "Hoe het werkt", login: "Inloggen" },
    hero: {
      title: "Verifieer de historie van equipment wereldwijd",
      subtitle:
        "Een wereldwijd register om fraude, diefstal en verzekeringsrisico’s te voorkomen.",
      placeholder: "Voer serienummer in",
      search: "Zoeken",
      demoSerials: "Demo serienummers:",
      loggedInMessage:
        "Je bent ingelogd. Je kunt normaal zoeken en nog steeds private paspoorten openen.",
      goToDashboard: "Ga naar dashboard",
    },
    result: { whyThisMatters: "Waarom dit belangrijk is" },
    howItWorks: {
      title: "Hoe EquipRegistry werkt",
      step1Title: "1. Controleren",
      step1Text:
        "Voer het serienummer in om direct de registratiestatus te controleren.",
      step2Title: "2. Verifiëren",
      step2Text:
        "Bekijk eigendomshistorie, documenten en validatieniveau.",
      step3Title: "3. Registreren",
      step3Text:
        "Registreer equipment en upload waar nodig bewijs van legale herkomst.",
      step4Title: "4. Gebruiken",
      step4Text:
        "Gebruik het registry-paspoort voor verzekering, verhuur, doorverkoop of compliance.",
    },
    trust: {
      title: "Gebouwd voor vertrouwen op wereldschaal",
      subtitle:
        "EquipRegistry is ontworpen als neutrale infrastructuur voor de equipmentsector — ter ondersteuning van verzekeraars, verhuurbedrijven, professionele eigenaren en grensoverschrijdende transacties.",
      card1Title: "Insurance-ready",
      card1Text:
        "Gestructureerd om underwriting, validatiecycli en risicogebaseerde besluitvorming te ondersteunen.",
      card2Title: "Onafhankelijk & neutraal",
      card2Text:
        "Niet gekoppeld aan fabrikanten, dealers of jurisdicties — één mondiale bron van vertrouwen.",
      card3Title: "Ontworpen om te schalen",
      card3Text:
        "Van losse machines tot wereldwijde vloten, gebouwd voor multi-country adoptie.",
    },
    footer: {
      copyright:
        "EquipRegistry — Conceptdemo voor investeerders en verzekeraars",
      privacy: "Privacybeleid",
      terms: "Algemene voorwaarden",
      disclaimer: "Disclaimer",
    },
    statuses: {
      registeredVerified: {
        label: "Geregistreerd & geverifieerd",
        message:
          "Deze machine is geregistreerd in EquipRegistry en de legale herkomst is geverifieerd.",
        why:
          "Deze machine heeft een geverifieerde legale herkomst en een actief registry-paspoort.",
        metadataStatus: "Status",
        metadataPassport: "Registry paspoort",
        metadataValidation: "Laatste validatie",
        actionViewPassport: "Bekijk paspoort",
      },
      historyUnknown: {
        label: "Historie onbekend",
        message:
          "Deze machine staat in het register, maar de volledige eigendomshistorie kon niet worden geverifieerd.",
        why:
          "Een onvolledige eigendomshistorie verhoogt fraude-, verzekerings- en compliance-risico’s.",
        metadataStatus: "Status",
        metadataRisk: "Risiconiveau",
        actionViewPassport: "Bekijk paspoort (beperkt)",
        actionRequestVerification: "Vraag verificatie aan",
        actionRegisterDocuments: "Registreer documenten",
      },
      stolen: {
        label: "Gestolen equipment – Rode vlag",
        message:
          "Deze machine is officieel als gestolen gemeld en staat actief op de zwarte lijst in EquipRegistry.",
        warning:
          "Koop, verzeker, huur of transporteer deze machine NIET.",
        why:
          "Elke transactie met gestolen equipment kan leiden tot juridische en financiële gevolgen.",
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
        message:
          "Dit serienummer is niet geregistreerd in EquipRegistry.",
        why:
          "Niet-geregistreerd equipment heeft geen geverifieerde eigendoms- en historiegegevens.",
        actionRegister: "Registreer deze machine",
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
  },

  pt: {
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
    },
    nav: { howItWorks: "Como funciona", login: "Entrar" },
    hero: {
      title: "Verifique o histórico dos equipamentos em todo o mundo",
      subtitle:
        "Um registo global para prevenir fraude, roubo e risco segurador.",
      placeholder: "Introduza o número de série",
      search: "Pesquisar",
      demoSerials: "Números demo:",
      loggedInMessage:
        "Tem sessão iniciada. Pode usar a pesquisa normalmente e continuar a aceder a passaportes privados.",
      goToDashboard: "Ir para o painel",
    },
    result: { whyThisMatters: "Porque isto importa" },
    howItWorks: {
      title: "Como o EquipRegistry funciona",
      step1Title: "1. Verificar",
      step1Text:
        "Introduza o número de série para verificar instantaneamente o estado do registo.",
      step2Title: "2. Validar",
      step2Text:
        "Reveja o histórico de propriedade, os documentos e o nível de validação.",
      step3Title: "3. Registar",
      step3Text:
        "Registe o equipamento e carregue prova de origem legal quando necessário.",
      step4Title: "4. Utilizar",
      step4Text:
        "Use o passaporte do registo para seguro, aluguer, revenda ou conformidade.",
    },
    trust: {
      title: "Construído para confiança à escala global",
      subtitle:
        "EquipRegistry foi concebido como infraestrutura neutra para o setor dos equipamentos, apoiando seguradoras, empresas de aluguer, proprietários profissionais e transações transfronteiriças.",
      card1Title: "Preparado para seguros",
      card1Text:
        "Estruturado para suportar subscrição, ciclos de validação e decisões baseadas no risco.",
      card2Title: "Independente e neutro",
      card2Text:
        "Não ligado a fabricantes, distribuidores ou jurisdições — uma fonte global de confiança.",
      card3Title: "Concebido para escalar",
      card3Text:
        "De máquinas individuais a frotas globais, preparado para adoção em vários países.",
    },
    footer: {
      copyright:
        "EquipRegistry — Demonstração conceptual para investidores e seguradoras",
      privacy: "Política de privacidade",
      terms: "Termos e condições",
      disclaimer: "Declaração",
    },
    statuses: {
      registeredVerified: {
        label: "Registado e verificado",
        message:
          "Esta máquina está registada no EquipRegistry e a sua origem legal foi verificada.",
        why:
          "Este equipamento tem origem legal verificada e um passaporte de registo ativo.",
        metadataStatus: "Estado",
        metadataPassport: "Passaporte de registo",
        metadataValidation: "Última validação",
        actionViewPassport: "Ver passaporte",
      },
      historyUnknown: {
        label: "Histórico desconhecido",
        message:
          "Esta máquina existe no registo, mas o seu histórico completo de propriedade não pôde ser verificado.",
        why:
          "Um histórico de propriedade incompleto aumenta o risco de fraude, seguro e conformidade.",
        metadataStatus: "Estado",
        metadataRisk: "Nível de risco",
        actionViewPassport: "Ver passaporte (limitado)",
        actionRequestVerification: "Solicitar verificação",
        actionRegisterDocuments: "Registar documentos",
      },
      stolen: {
        label: "Equipamento roubado – Alerta vermelho",
        message:
          "Esta máquina foi oficialmente reportada como roubada e está ativamente bloqueada no EquipRegistry.",
        warning:
          "NÃO compre, assegure, alugue nem transporte esta máquina.",
        why:
          "Qualquer transação envolvendo equipamento roubado pode levar a consequências legais e financeiras.",
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
        message:
          "Este número de série não está registado no EquipRegistry.",
        why:
          "Equipamento não registado não possui histórico e titularidade verificados.",
        actionRegister: "Registar esta máquina",
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
  },
};

export function getDictionary(lang: Lang) {
  return dictionary[lang];
}