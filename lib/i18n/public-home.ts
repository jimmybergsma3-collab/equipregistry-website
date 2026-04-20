import type { Lang } from "@/lib/i18n/config";
import { PUBLIC_HOME_NATIVE_OVERRIDES } from "@/lib/i18n/public-home-native";

type HeroText = {
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

type ResultText = {
  whyThisMatters: string;
};

type HowItWorksText = {
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

type TrustText = {
  title: string;
  subtitle: string;
  card1Title: string;
  card1Text: string;
  card2Title: string;
  card2Text: string;
  card3Title: string;
  card3Text: string;
};

type StatusTexts = {
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

export type PublicHomeText = {
  hero: HeroText;
  result: ResultText;
  howItWorks: HowItWorksText;
  trust: TrustText;
  statuses: StatusTexts;
};

const TEXT: Partial<Record<Lang, PublicHomeText>> = {
  en: {
    hero: {
      title: "Verify ownership and fraud risk on vehicles and equipment worldwide",
      subtitle:
        "Use VINs, serial numbers and registry IDs to check legal origin, theft alerts and registry status before purchase, financing, insurance, rental or cross-border transfer.",
      placeholder: "Enter VIN, serial number or registry ID",
      search: "Verify asset",
      demoSerials: "Demo serials:",
      loggedInMessage:
        "You are logged in. You can use search normally and still access private passports.",
      goToDashboard: "Go to dashboard",
      supportedAssetsTitle: "Asset classes covered by EquipRegistry",
      supportedAssetsItems: [
        "Road vehicles, trailers and fleet assets",
        "Construction, industrial, agricultural and rental equipment",
        "Bikes, batteries, energy systems and other serialised assets",
      ],
    },
    result: { whyThisMatters: "Why this matters" },
    howItWorks: {
      title: "How EquipRegistry works",
      step1Title: "1. Search",
      step1Text: "Enter a VIN, serial number or registry ID to check the current status instantly.",
      step2Title: "2. Verify",
      step2Text: "Review registry signals, ownership context and passport visibility when available.",
      step3Title: "3. Register",
      step3Text: "Register vehicles, equipment or other assets and add supporting documents.",
      step4Title: "4. Use",
      step4Text: "Use the registry passport in insurance, rental, resale, recovery and compliance workflows.",
    },
    trust: {
      title: "Built for trusted asset verification",
      subtitle:
        "EquipRegistry helps owners, insurers, financiers, rental operators and buyers verify legal origin and status with one consistent public search layer.",
      card1Title: "Insurance-ready",
      card1Text: "Supports underwriting, validation checks and risk-based decision making.",
      card2Title: "Independent",
      card2Text: "Designed as a neutral verification layer across operators, markets and borders.",
      card3Title: "Scalable",
      card3Text: "Works from single assets to large fleets with the same public verification approach.",
    },
    statuses: {
      registeredVerified: {
        label: "Registered and verified",
        message:
          "This asset is registered in EquipRegistry and its legal origin has been verified.",
        why:
          "This improves trust for purchase, financing, insurance and cross-border handling.",
        metadataStatus: "Status",
        metadataPassport: "Registry passport",
        metadataValidation: "Last validation",
        actionViewPassport: "View passport",
      },
      historyUnknown: {
        label: "History limited",
        message:
          "This asset appears in the registry, but the complete ownership history is not yet fully verified.",
        why:
          "A limited history increases uncertainty and should be reviewed before transaction or onboarding.",
        metadataStatus: "Status",
        metadataRisk: "Risk level",
        actionViewPassport: "View limited passport",
        actionRegisterDocuments: "Register documents",
      },
      stolen: {
        label: "Stolen asset - red flag",
        message:
          "This asset has been officially reported as stolen and remains actively flagged in EquipRegistry.",
        warning:
          "Do not buy, insure, rent, move or accept transfer of this asset.",
        why:
          "Any transaction involving a stolen asset can create legal, financial and compliance exposure.",
        metadataStatus: "Status",
        metadataRisk: "Risk level",
        metadataReportedBy: "Reported by",
        metadataJurisdiction: "Jurisdiction",
        metadataReportDate: "Report date",
        actionReportSighting: "Report sighting",
        actionContactAuthorities: "Contact authorities",
      },
      notRegistered: {
        label: "Not registered",
        message: "This identifier is not registered in EquipRegistry.",
        why:
          "An unregistered asset has no verified registry record, ownership trail or public passport.",
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
        euCrossBorderAlert: "EU / cross-border alert",
        reportDate: "2025-03-12",
      },
    },
  },
  es: {
    hero: {
      title: "Verifique propiedad y riesgo de fraude en vehiculos y equipos en todo el mundo",
      subtitle:
        "Use VIN, numeros de serie e IDs de registro para comprobar origen legal, alertas de robo y estado registral antes de comprar, financiar, asegurar, alquilar o transferir un activo.",
      placeholder: "Introduzca VIN, numero de serie o ID de registro",
      search: "Verificar activo",
      demoSerials: "Series demo:",
      loggedInMessage:
        "Ha iniciado sesion. Puede usar la busqueda con normalidad y seguir accediendo a pasaportes privados.",
      goToDashboard: "Ir al panel",
      supportedAssetsTitle: "Tipos de activos cubiertos por EquipRegistry",
      supportedAssetsItems: [
        "Vehiculos, remolques y activos de flota",
        "Equipos de construccion, industriales, agricolas y de alquiler",
        "Bicicletas, baterias, sistemas energeticos y otros activos serializados",
      ],
    },
    result: { whyThisMatters: "Por que importa" },
    howItWorks: {
      title: "Como funciona EquipRegistry",
      step1Title: "1. Buscar",
      step1Text: "Introduzca un VIN, numero de serie o ID de registro para ver el estado actual al instante.",
      step2Title: "2. Verificar",
      step2Text: "Revise senales registrales, contexto de propiedad y visibilidad del pasaporte cuando exista.",
      step3Title: "3. Registrar",
      step3Text: "Registre vehiculos, equipos u otros activos y anada documentacion de respaldo.",
      step4Title: "4. Usar",
      step4Text: "Use el pasaporte registral en seguros, alquiler, reventa, recuperacion y cumplimiento.",
    },
    trust: {
      title: "Creado para una verificacion fiable de activos",
      subtitle:
        "EquipRegistry ayuda a propietarios, aseguradoras, financiadores, operadores de alquiler y compradores a verificar origen legal y estado desde una capa publica coherente.",
      card1Title: "Listo para seguros",
      card1Text: "Apoya suscripcion, validacion y decisiones basadas en riesgo.",
      card2Title: "Independiente",
      card2Text: "Disenado como capa neutral de verificacion entre operadores, mercados y fronteras.",
      card3Title: "Escalable",
      card3Text: "Funciona igual para activos individuales y grandes flotas.",
    },
    statuses: {
      registeredVerified: {
        label: "Registrado y verificado",
        message: "Este activo esta registrado en EquipRegistry y su origen legal ha sido verificado.",
        why:
          "Esto mejora la confianza para compra, financiacion, seguro y gestion transfronteriza.",
        metadataStatus: "Estado",
        metadataPassport: "Pasaporte registral",
        metadataValidation: "Ultima validacion",
        actionViewPassport: "Ver pasaporte",
      },
      historyUnknown: {
        label: "Historial limitado",
        message:
          "Este activo aparece en el registro, pero el historial completo de propiedad aun no esta totalmente verificado.",
        why:
          "Un historial limitado aumenta la incertidumbre y debe revisarse antes de una transaccion o alta.",
        metadataStatus: "Estado",
        metadataRisk: "Nivel de riesgo",
        actionViewPassport: "Ver pasaporte limitado",
        actionRegisterDocuments: "Registrar documentos",
      },
      stolen: {
        label: "Activo robado - alerta roja",
        message:
          "Este activo ha sido denunciado oficialmente como robado y sigue marcado activamente en EquipRegistry.",
        warning:
          "No compre, asegure, alquile, mueva ni acepte la transferencia de este activo.",
        why:
          "Cualquier transaccion con un activo robado puede generar riesgo legal, financiero y de cumplimiento.",
        metadataStatus: "Estado",
        metadataRisk: "Nivel de riesgo",
        metadataReportedBy: "Reportado por",
        metadataJurisdiction: "Jurisdiccion",
        metadataReportDate: "Fecha del reporte",
        actionReportSighting: "Reportar avistamiento",
        actionContactAuthorities: "Contactar autoridades",
      },
      notRegistered: {
        label: "No registrado",
        message: "Este identificador no esta registrado en EquipRegistry.",
        why:
          "Un activo no registrado no tiene historial verificado, trazabilidad de propiedad ni pasaporte publico.",
        actionRegister: "Registrar este activo",
      },
      metadataValues: {
        active: "Activo",
        full: "Completo",
        lastValidation2025: "2025",
        limitedPassport: "Pasaporte limitado",
        medium: "Medio",
        blacklisted: "En lista negra",
        high: "Alto",
        insurancePartner: "Socio asegurador",
        euCrossBorderAlert: "Alerta UE / transfronteriza",
        reportDate: "2025-03-12",
      },
    },
  },
  de: {
    hero: {
      title: "Eigentum und Betrugsrisiko bei Fahrzeugen und Geraeten weltweit pruefen",
      subtitle:
        "Nutzen Sie VINs, Seriennummern und Register-IDs, um rechtliche Herkunft, Diebstahlwarnungen und Registerstatus vor Kauf, Finanzierung, Versicherung, Vermietung oder Uebertragung zu pruefen.",
      placeholder: "VIN, Seriennummer oder Register-ID eingeben",
      search: "Asset pruefen",
      demoSerials: "Demo-Serien:",
      loggedInMessage:
        "Sie sind angemeldet. Sie koennen die Suche normal nutzen und weiterhin auf private Paesse zugreifen.",
      goToDashboard: "Zum Dashboard",
      supportedAssetsTitle: "Von EquipRegistry abgedeckte Asset-Klassen",
      supportedAssetsItems: [
        "Strassenfahrzeuge, Anhaenger und Flottenassets",
        "Bau-, Industrie-, Landwirtschafts- und Mietgeraete",
        "Fahrraeder, Batterien, Energiesysteme und andere serialisierte Assets",
      ],
    },
    result: { whyThisMatters: "Warum das wichtig ist" },
    howItWorks: {
      title: "So funktioniert EquipRegistry",
      step1Title: "1. Suchen",
      step1Text: "Geben Sie VIN, Seriennummer oder Register-ID ein, um den aktuellen Status sofort zu sehen.",
      step2Title: "2. Pruefen",
      step2Text: "Pruefen Sie Registersignale, Eigentumskontext und Sichtbarkeit des Passes, sofern vorhanden.",
      step3Title: "3. Registrieren",
      step3Text: "Registrieren Sie Fahrzeuge, Geraete oder andere Assets und fuegen Sie Belegdokumente hinzu.",
      step4Title: "4. Nutzen",
      step4Text: "Nutzen Sie den Registerpass fuer Versicherung, Vermietung, Wiederverkauf, Rueckholung und Compliance.",
    },
    trust: {
      title: "Fuer vertrauenswuerdige Asset-Pruefung entwickelt",
      subtitle:
        "EquipRegistry hilft Eigentuemern, Versicherern, Finanzierern, Vermietern und Kaeufern, rechtliche Herkunft und Status ueber eine einheitliche oeffentliche Suche zu pruefen.",
      card1Title: "Versicherungsbereit",
      card1Text: "Unterstuetzt Underwriting, Validierung und risikobasierte Entscheidungen.",
      card2Title: "Unabhaengig",
      card2Text: "Als neutrale Pruefschicht ueber Betreiber, Maerkte und Grenzen hinweg konzipiert.",
      card3Title: "Skalierbar",
      card3Text: "Funktioniert fuer Einzelassets wie auch fuer grosse Flotten mit demselben Suchansatz.",
    },
    statuses: {
      registeredVerified: {
        label: "Registriert und verifiziert",
        message: "Dieses Asset ist in EquipRegistry registriert und seine rechtliche Herkunft wurde geprueft.",
        why:
          "Das verbessert Vertrauen bei Kauf, Finanzierung, Versicherung und grenzueberschreitender Nutzung.",
        metadataStatus: "Status",
        metadataPassport: "Registerpass",
        metadataValidation: "Letzte Validierung",
        actionViewPassport: "Pass anzeigen",
      },
      historyUnknown: {
        label: "Historie eingeschraenkt",
        message:
          "Dieses Asset erscheint im Register, aber die vollstaendige Eigentumshistorie ist noch nicht vollstaendig verifiziert.",
        why:
          "Eine eingeschraenkte Historie erhoeht die Unsicherheit und sollte vor Transaktion oder Onboarding geprueft werden.",
        metadataStatus: "Status",
        metadataRisk: "Risikostufe",
        actionViewPassport: "Eingeschraenkten Pass anzeigen",
        actionRegisterDocuments: "Dokumente registrieren",
      },
      stolen: {
        label: "Gestohlenes Asset - rote Warnung",
        message:
          "Dieses Asset wurde offiziell als gestohlen gemeldet und bleibt in EquipRegistry aktiv markiert.",
        warning:
          "Kaufen, versichern, vermieten, bewegen oder uebernehmen Sie dieses Asset nicht.",
        why:
          "Jede Transaktion mit einem gestohlenen Asset kann rechtliche, finanzielle und Compliance-Risiken ausloesen.",
        metadataStatus: "Status",
        metadataRisk: "Risikostufe",
        metadataReportedBy: "Gemeldet von",
        metadataJurisdiction: "Zustaendigkeit",
        metadataReportDate: "Meldedatum",
        actionReportSighting: "Sichtung melden",
        actionContactAuthorities: "Behoerden kontaktieren",
      },
      notRegistered: {
        label: "Nicht registriert",
        message: "Diese Kennung ist nicht in EquipRegistry registriert.",
        why:
          "Ein nicht registriertes Asset hat keinen verifizierten Registereintrag, Eigentumsnachweis oder oeffentlichen Pass.",
        actionRegister: "Dieses Asset registrieren",
      },
      metadataValues: {
        active: "Aktiv",
        full: "Vollstaendig",
        lastValidation2025: "2025",
        limitedPassport: "Eingeschraenkter Pass",
        medium: "Mittel",
        blacklisted: "Schwarzgelistet",
        high: "Hoch",
        insurancePartner: "Versicherungspartner",
        euCrossBorderAlert: "EU / grenzueberschreitende Warnung",
        reportDate: "2025-03-12",
      },
    },
  },
  nl: {
    hero: {
      title: "Controleer eigendom en frauderisico op voertuigen en equipment wereldwijd",
      subtitle:
        "Gebruik VIN's, serienummers en registry-ID's om juridische herkomst, diefstalalerts en registrystatus te controleren voor aankoop, financiering, verzekering, verhuur of grensoverschrijdende overdracht.",
      placeholder: "Vul VIN, serienummer of registry-ID in",
      search: "Asset verifieren",
      demoSerials: "Demo-serials:",
      loggedInMessage:
        "Je bent ingelogd. Je kunt de zoekfunctie normaal gebruiken en nog steeds private paspoorten openen.",
      goToDashboard: "Naar dashboard",
      supportedAssetsTitle: "Assetcategorieen die EquipRegistry ondersteunt",
      supportedAssetsItems: [
        "Wegvoertuigen, trailers en vlootassets",
        "Bouw-, industrie-, landbouw- en verhuurmachines",
        "Fietsen, batterijen, energiesystemen en andere geserialiseerde assets",
      ],
    },
    result: { whyThisMatters: "Waarom dit belangrijk is" },
    howItWorks: {
      title: "Hoe EquipRegistry werkt",
      step1Title: "1. Zoeken",
      step1Text: "Vul een VIN, serienummer of registry-ID in om direct de actuele status te zien.",
      step2Title: "2. Verifieren",
      step2Text: "Bekijk registrysignalen, eigendomscontext en paspoortzichtbaarheid wanneer beschikbaar.",
      step3Title: "3. Registreren",
      step3Text: "Registreer voertuigen, equipment of andere assets en voeg ondersteunende documenten toe.",
      step4Title: "4. Gebruiken",
      step4Text: "Gebruik het registrypassport in verzekering, verhuur, doorverkoop, recovery en compliance.",
    },
    trust: {
      title: "Gebouwd voor betrouwbare assetverificatie",
      subtitle:
        "EquipRegistry helpt eigenaren, verzekeraars, financiers, verhuurders en kopers om juridische herkomst en status via een consistente publieke zoeklaag te controleren.",
      card1Title: "Insurance-ready",
      card1Text: "Ondersteunt underwriting, validatiechecks en risicogebaseerde beslissingen.",
      card2Title: "Onafhankelijk",
      card2Text: "Ontworpen als neutrale verificatielaag over operators, markten en grenzen heen.",
      card3Title: "Schaalbaar",
      card3Text: "Werkt voor losse assets en grote vlootportefeuilles met dezelfde verificatielaag.",
    },
    statuses: {
      registeredVerified: {
        label: "Geregistreerd en geverifieerd",
        message: "Deze asset staat in EquipRegistry geregistreerd en de juridische herkomst is geverifieerd.",
        why:
          "Dat verhoogt vertrouwen bij aankoop, financiering, verzekering en grensoverschrijdende afhandeling.",
        metadataStatus: "Status",
        metadataPassport: "Registrypassport",
        metadataValidation: "Laatste validatie",
        actionViewPassport: "Bekijk paspoort",
      },
      historyUnknown: {
        label: "Beperkte historie",
        message:
          "Deze asset komt voor in het register, maar de volledige eigendomshistorie is nog niet volledig geverifieerd.",
        why:
          "Een beperkte historie verhoogt de onzekerheid en moet worden beoordeeld voor transactie of onboarding.",
        metadataStatus: "Status",
        metadataRisk: "Risiconiveau",
        actionViewPassport: "Bekijk beperkt paspoort",
        actionRegisterDocuments: "Registreer documenten",
      },
      stolen: {
        label: "Gestolen asset - rode vlag",
        message:
          "Deze asset is officieel als gestolen gemeld en staat actief gemarkeerd in EquipRegistry.",
        warning:
          "Koop, verzeker, verhuur, verplaats of accepteer de overdracht van deze asset niet.",
        why:
          "Elke transactie rond een gestolen asset kan leiden tot juridische, financiele en compliance-risico's.",
        metadataStatus: "Status",
        metadataRisk: "Risiconiveau",
        metadataReportedBy: "Gemeld door",
        metadataJurisdiction: "Jurisdictie",
        metadataReportDate: "Meldingsdatum",
        actionReportSighting: "Meld waarneming",
        actionContactAuthorities: "Contacteer autoriteiten",
      },
      notRegistered: {
        label: "Niet geregistreerd",
        message: "Deze identificatie staat niet geregistreerd in EquipRegistry.",
        why:
          "Een niet-geregistreerde asset heeft geen geverifieerd registerrecord, eigendomsspoor of publiek paspoort.",
        actionRegister: "Registreer deze asset",
      },
      metadataValues: {
        active: "Actief",
        full: "Volledig",
        lastValidation2025: "2025",
        limitedPassport: "Beperkt paspoort",
        medium: "Gemiddeld",
        blacklisted: "Blacklisted",
        high: "Hoog",
        insurancePartner: "Verzekeringspartner",
        euCrossBorderAlert: "EU / grensoverschrijdende alert",
        reportDate: "2025-03-12",
      },
    },
  },
  pt: {
    hero: {
      title: "Verifique propriedade e risco de fraude em veiculos e equipamentos a nivel global",
      subtitle:
        "Use VIN, numeros de serie e IDs de registo para verificar origem legal, alertas de roubo e estado do registo antes de compra, financiamento, seguro, aluguer ou transferencia.",
      placeholder: "Introduza VIN, numero de serie ou ID de registo",
      search: "Verificar ativo",
      demoSerials: "Seriais demo:",
      loggedInMessage:
        "Tem sessao iniciada. Pode usar a pesquisa normalmente e continuar a aceder a passaportes privados.",
      goToDashboard: "Ir para o painel",
      supportedAssetsTitle: "Tipos de ativos cobertos pela EquipRegistry",
      supportedAssetsItems: [
        "Veiculos rodoviarios, reboques e ativos de frota",
        "Equipamentos de construcao, industriais, agricolas e de aluguer",
        "Bicicletas, baterias, sistemas energeticos e outros ativos serializados",
      ],
    },
    result: { whyThisMatters: "Porque isto importa" },
    howItWorks: {
      title: "Como funciona a EquipRegistry",
      step1Title: "1. Pesquisar",
      step1Text: "Introduza um VIN, numero de serie ou ID de registo para ver imediatamente o estado atual.",
      step2Title: "2. Verificar",
      step2Text: "Reveja sinais do registo, contexto de propriedade e visibilidade do passaporte quando disponivel.",
      step3Title: "3. Registar",
      step3Text: "Registe veiculos, equipamentos ou outros ativos e adicione documentos de suporte.",
      step4Title: "4. Utilizar",
      step4Text: "Use o passaporte do registo em seguro, aluguer, revenda, recuperacao e conformidade.",
    },
    trust: {
      title: "Criado para verificacao fiavel de ativos",
      subtitle:
        "A EquipRegistry ajuda proprietarios, seguradoras, financiadores, operadores de aluguer e compradores a verificar origem legal e estado com uma pesquisa publica coerente.",
      card1Title: "Preparado para seguros",
      card1Text: "Suporta subscricao, validacao e decisoes baseadas em risco.",
      card2Title: "Independente",
      card2Text: "Desenhado como camada neutra de verificacao entre operadores, mercados e fronteiras.",
      card3Title: "Escalavel",
      card3Text: "Funciona de ativos individuais a grandes frotas com a mesma abordagem publica.",
    },
    statuses: {
      registeredVerified: {
        label: "Registado e verificado",
        message: "Este ativo esta registado na EquipRegistry e a sua origem legal foi verificada.",
        why:
          "Isto aumenta a confianca para compra, financiamento, seguro e operacoes transfronteiricas.",
        metadataStatus: "Estado",
        metadataPassport: "Passaporte do registo",
        metadataValidation: "Ultima validacao",
        actionViewPassport: "Ver passaporte",
      },
      historyUnknown: {
        label: "Historico limitado",
        message:
          "Este ativo aparece no registo, mas o historico completo de propriedade ainda nao esta totalmente verificado.",
        why:
          "Um historico limitado aumenta a incerteza e deve ser revisto antes de transacao ou integracao.",
        metadataStatus: "Estado",
        metadataRisk: "Nivel de risco",
        actionViewPassport: "Ver passaporte limitado",
        actionRegisterDocuments: "Registar documentos",
      },
      stolen: {
        label: "Ativo roubado - alerta vermelho",
        message:
          "Este ativo foi oficialmente reportado como roubado e continua marcado ativamente na EquipRegistry.",
        warning:
          "Nao compre, assegure, alugue, mova nem aceite a transferencia deste ativo.",
        why:
          "Qualquer transacao com um ativo roubado pode criar exposicao legal, financeira e de conformidade.",
        metadataStatus: "Estado",
        metadataRisk: "Nivel de risco",
        metadataReportedBy: "Reportado por",
        metadataJurisdiction: "Jurisdicao",
        metadataReportDate: "Data do reporte",
        actionReportSighting: "Reportar avistamento",
        actionContactAuthorities: "Contactar autoridades",
      },
      notRegistered: {
        label: "Nao registado",
        message: "Este identificador nao esta registado na EquipRegistry.",
        why:
          "Um ativo nao registado nao tem registo verificado, trilho de propriedade ou passaporte publico.",
        actionRegister: "Registar este ativo",
      },
      metadataValues: {
        active: "Ativo",
        full: "Completo",
        lastValidation2025: "2025",
        limitedPassport: "Passaporte limitado",
        medium: "Medio",
        blacklisted: "Lista negra",
        high: "Alto",
        insurancePartner: "Parceiro segurador",
        euCrossBorderAlert: "Alerta UE / transfronteirico",
        reportDate: "2025-03-12",
      },
    },
  },
  ru: {
    hero: {
      title: "Проверьте право собственности и риск мошенничества для техники и транспорта по всему миру",
      subtitle:
        "Используйте VIN, серийные номера и идентификаторы реестра, чтобы проверить законное происхождение, сигналы о краже и статус до покупки, финансирования, страхования, аренды или передачи.",
      placeholder: "Введите VIN, серийный номер или ID реестра",
      search: "Проверить актив",
      demoSerials: "Демо-серии:",
      loggedInMessage:
        "Вы вошли в систему. Поиск работает как обычно, и вы по-прежнему можете открывать частные паспорта.",
      goToDashboard: "Перейти в кабинет",
      supportedAssetsTitle: "Категории активов в EquipRegistry",
      supportedAssetsItems: [
        "Дорожный транспорт, прицепы и флотские активы",
        "Строительная, промышленная, сельскохозяйственная и арендная техника",
        "Велосипеды, батареи, энергетические системы и другие сериализованные активы",
      ],
    },
    result: { whyThisMatters: "Почему это важно" },
    howItWorks: {
      title: "Как работает EquipRegistry",
      step1Title: "1. Поиск",
      step1Text: "Введите VIN, серийный номер или ID реестра, чтобы сразу увидеть текущий статус.",
      step2Title: "2. Проверка",
      step2Text: "Просмотрите сигналы реестра, контекст собственности и видимость паспорта, если они доступны.",
      step3Title: "3. Регистрация",
      step3Text: "Регистрируйте транспорт, технику и другие активы и добавляйте подтверждающие документы.",
      step4Title: "4. Использование",
      step4Text: "Используйте паспорт реестра для страхования, аренды, перепродажи, возврата и соответствия требованиям.",
    },
    trust: {
      title: "Создано для надежной проверки активов",
      subtitle:
        "EquipRegistry помогает владельцам, страховщикам, финансовым партнерам, операторам аренды и покупателям проверять законное происхождение и статус через единый публичный слой поиска.",
      card1Title: "Готово для страхования",
      card1Text: "Поддерживает андеррайтинг, проверки валидации и риск-ориентированные решения.",
      card2Title: "Независимо",
      card2Text: "Спроектировано как нейтральный слой проверки между операторами, рынками и юрисдикциями.",
      card3Title: "Масштабируемо",
      card3Text: "Подходит как для одного актива, так и для крупных парков по одной и той же публичной модели.",
    },
    statuses: {
      registeredVerified: {
        label: "Зарегистрирован и подтвержден",
        message: "Этот актив зарегистрирован в EquipRegistry, а его законное происхождение подтверждено.",
        why:
          "Это повышает доверие при покупке, финансировании, страховании и трансграничной передаче.",
        metadataStatus: "Статус",
        metadataPassport: "Паспорт реестра",
        metadataValidation: "Последняя проверка",
        actionViewPassport: "Открыть паспорт",
      },
      historyUnknown: {
        label: "История ограничена",
        message:
          "Этот актив присутствует в реестре, но полная история собственности пока не подтверждена полностью.",
        why:
          "Ограниченная история повышает неопределенность и требует дополнительной проверки перед сделкой или onboarding.",
        metadataStatus: "Статус",
        metadataRisk: "Уровень риска",
        actionViewPassport: "Открыть ограниченный паспорт",
        actionRegisterDocuments: "Зарегистрировать документы",
      },
      stolen: {
        label: "Украденный актив - красный флаг",
        message:
          "Этот актив официально заявлен как украденный и остается активно отмеченным в EquipRegistry.",
        warning:
          "Не покупайте, не страхуйте, не арендуйте, не перемещайте и не принимайте передачу этого актива.",
        why:
          "Любая операция с украденным активом может привести к юридическим, финансовым и комплаенс-рискам.",
        metadataStatus: "Статус",
        metadataRisk: "Уровень риска",
        metadataReportedBy: "Сообщил",
        metadataJurisdiction: "Юрисдикция",
        metadataReportDate: "Дата сообщения",
        actionReportSighting: "Сообщить о наблюдении",
        actionContactAuthorities: "Связаться с властями",
      },
      notRegistered: {
        label: "Не зарегистрирован",
        message: "Этот идентификатор не зарегистрирован в EquipRegistry.",
        why:
          "Незарегистрированный актив не имеет подтвержденной записи, истории собственности или публичного паспорта.",
        actionRegister: "Зарегистрировать этот актив",
      },
      metadataValues: {
        active: "Активный",
        full: "Полный",
        lastValidation2025: "2025",
        limitedPassport: "Ограниченный паспорт",
        medium: "Средний",
        blacklisted: "В черном списке",
        high: "Высокий",
        insurancePartner: "Страховой партнер",
        euCrossBorderAlert: "Предупреждение ЕС / трансграничное",
        reportDate: "2025-03-12",
      },
    },
  },
  zh: {
    hero: {
      title: "在全球范围内核验车辆与设备的所有权和欺诈风险",
      subtitle:
        "使用 VIN、序列号和登记编号，在购买、融资、保险、租赁或转移之前核验合法来源、失窃警报和登记状态。",
      placeholder: "输入 VIN、序列号或登记编号",
      search: "核验资产",
      demoSerials: "演示编号：",
      loggedInMessage:
        "您已登录。您可以正常使用搜索，并继续访问私有护照。",
      goToDashboard: "前往控制台",
      supportedAssetsTitle: "EquipRegistry 覆盖的资产类别",
      supportedAssetsItems: [
        "道路车辆、拖车和车队资产",
        "建筑、工业、农业和租赁设备",
        "自行车、电池、能源系统和其他带序列号的资产",
      ],
    },
    result: { whyThisMatters: "这为什么重要" },
    howItWorks: {
      title: "EquipRegistry 的工作方式",
      step1Title: "1. 搜索",
      step1Text: "输入 VIN、序列号或登记编号，即可立即查看当前状态。",
      step2Title: "2. 核验",
      step2Text: "查看登记信号、所有权背景以及护照可见性（如有）。",
      step3Title: "3. 登记",
      step3Text: "登记车辆、设备或其他资产，并上传支持文件。",
      step4Title: "4. 使用",
      step4Text: "在保险、租赁、转售、追回和合规流程中使用登记护照。",
    },
    trust: {
      title: "为可信资产核验而设计",
      subtitle:
        "EquipRegistry 帮助所有者、保险机构、融资方、租赁运营方和买方通过统一的公开搜索层核验合法来源和状态。",
      card1Title: "适用于保险",
      card1Text: "支持核保、验证检查和基于风险的决策。",
      card2Title: "独立中立",
      card2Text: "作为跨运营方、市场和司法辖区的中立核验层而构建。",
      card3Title: "可扩展",
      card3Text: "既适用于单个资产，也适用于大型车队和设备池。",
    },
    statuses: {
      registeredVerified: {
        label: "已登记并已核验",
        message: "该资产已在 EquipRegistry 中登记，其合法来源已完成核验。",
        why:
          "这会提升购买、融资、保险和跨境流转中的信任度。",
        metadataStatus: "状态",
        metadataPassport: "登记护照",
        metadataValidation: "最近核验",
        actionViewPassport: "查看护照",
      },
      historyUnknown: {
        label: "历史记录有限",
        message:
          "该资产已出现在登记系统中，但完整的所有权历史尚未完全核验。",
        why:
          "有限历史会增加不确定性，交易或接收前应进一步核查。",
        metadataStatus: "状态",
        metadataRisk: "风险等级",
        actionViewPassport: "查看有限护照",
        actionRegisterDocuments: "登记文件",
      },
      stolen: {
        label: "失窃资产 - 红色警报",
        message:
          "该资产已被正式报告为失窃，并在 EquipRegistry 中保持主动标记。",
        warning:
          "请勿购买、投保、租赁、移动或接受该资产的转移。",
        why:
          "任何涉及失窃资产的交易都可能带来法律、财务和合规风险。",
        metadataStatus: "状态",
        metadataRisk: "风险等级",
        metadataReportedBy: "报告方",
        metadataJurisdiction: "司法辖区",
        metadataReportDate: "报告日期",
        actionReportSighting: "报告目击",
        actionContactAuthorities: "联系执法机构",
      },
      notRegistered: {
        label: "未登记",
        message: "该标识尚未在 EquipRegistry 中登记。",
        why:
          "未登记资产没有经过核验的登记记录、所有权轨迹或公开护照。",
        actionRegister: "登记该资产",
      },
      metadataValues: {
        active: "有效",
        full: "完整",
        lastValidation2025: "2025",
        limitedPassport: "有限护照",
        medium: "中等",
        blacklisted: "黑名单",
        high: "高",
        insurancePartner: "保险合作方",
        euCrossBorderAlert: "欧盟 / 跨境警报",
        reportDate: "2025-03-12",
      },
    },
  },
  hi: {
    hero: {
      title: "वाहनों और उपकरणों के स्वामित्व तथा धोखाधड़ी जोखिम को वैश्विक स्तर पर सत्यापित करें",
      subtitle:
        "खरीद, वित्तपोषण, बीमा, किराये या हस्तांतरण से पहले कानूनी मूल, चोरी अलर्ट और रजिस्ट्री स्थिति जांचने के लिए VIN, सीरियल नंबर और रजिस्ट्री आईडी का उपयोग करें।",
      placeholder: "VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें",
      search: "एसेट सत्यापित करें",
      demoSerials: "डेमो सीरियल:",
      loggedInMessage:
        "आप लॉग इन हैं। आप सामान्य रूप से खोज का उपयोग कर सकते हैं और निजी पासपोर्ट भी देख सकते हैं।",
      goToDashboard: "डैशबोर्ड पर जाएँ",
      supportedAssetsTitle: "EquipRegistry द्वारा समर्थित एसेट श्रेणियाँ",
      supportedAssetsItems: [
        "सड़क वाहन, ट्रेलर और फ्लीट एसेट",
        "निर्माण, औद्योगिक, कृषि और किराये के उपकरण",
        "साइकिल, बैटरियां, ऊर्जा प्रणालियां और अन्य सीरियलयुक्त एसेट",
      ],
    },
    result: { whyThisMatters: "यह क्यों महत्वपूर्ण है" },
    howItWorks: {
      title: "EquipRegistry कैसे काम करता है",
      step1Title: "1. खोजें",
      step1Text: "वर्तमान स्थिति तुरंत देखने के लिए VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें।",
      step2Title: "2. सत्यापित करें",
      step2Text: "रजिस्ट्री संकेत, स्वामित्व संदर्भ और पासपोर्ट दृश्यता देखें जब उपलब्ध हो।",
      step3Title: "3. पंजीकरण करें",
      step3Text: "वाहन, उपकरण या अन्य एसेट पंजीकृत करें और सहायक दस्तावेज जोड़ें।",
      step4Title: "4. उपयोग करें",
      step4Text: "रजिस्ट्री पासपोर्ट का उपयोग बीमा, किराये, पुनर्विक्रय, रिकवरी और अनुपालन में करें।",
    },
    trust: {
      title: "विश्वसनीय एसेट सत्यापन के लिए बनाया गया",
      subtitle:
        "EquipRegistry मालिकों, बीमाकर्ताओं, वित्तीय भागीदारों, किराये संचालकों और खरीदारों को एकसमान सार्वजनिक खोज परत के माध्यम से कानूनी मूल और स्थिति सत्यापित करने में मदद करता है।",
      card1Title: "बीमा के लिए तैयार",
      card1Text: "अंडरराइटिंग, वैलिडेशन जांच और जोखिम-आधारित निर्णयों का समर्थन करता है।",
      card2Title: "स्वतंत्र",
      card2Text: "ऑपरेटरों, बाजारों और सीमाओं के पार एक तटस्थ सत्यापन परत के रूप में तैयार किया गया।",
      card3Title: "स्केलेबल",
      card3Text: "एकल एसेट से लेकर बड़े फ्लीट तक एक ही सार्वजनिक मॉडल के साथ काम करता है।",
    },
    statuses: {
      registeredVerified: {
        label: "पंजीकृत और सत्यापित",
        message: "यह एसेट EquipRegistry में पंजीकृत है और इसकी कानूनी उत्पत्ति सत्यापित की जा चुकी है।",
        why:
          "इससे खरीद, वित्तपोषण, बीमा और सीमा-पार संचालन में भरोसा बढ़ता है।",
        metadataStatus: "स्थिति",
        metadataPassport: "रजिस्ट्री पासपोर्ट",
        metadataValidation: "अंतिम सत्यापन",
        actionViewPassport: "पासपोर्ट देखें",
      },
      historyUnknown: {
        label: "सीमित इतिहास",
        message:
          "यह एसेट रजिस्ट्री में दिखाई देता है, लेकिन पूर्ण स्वामित्व इतिहास अभी पूरी तरह सत्यापित नहीं है।",
        why:
          "सीमित इतिहास अनिश्चितता बढ़ाता है और लेनदेन या ऑनबोर्डिंग से पहले इसकी समीक्षा की जानी चाहिए।",
        metadataStatus: "स्थिति",
        metadataRisk: "जोखिम स्तर",
        actionViewPassport: "सीमित पासपोर्ट देखें",
        actionRegisterDocuments: "दस्तावेज पंजीकृत करें",
      },
      stolen: {
        label: "चोरी किया गया एसेट - लाल चेतावनी",
        message:
          "इस एसेट को आधिकारिक रूप से चोरी की रिपोर्ट के रूप में दर्ज किया गया है और यह EquipRegistry में सक्रिय रूप से चिह्नित है।",
        warning:
          "इस एसेट को न खरीदें, न बीमा करें, न किराये पर लें, न स्थानांतरित करें और न ही इसका हस्तांतरण स्वीकार करें।",
        why:
          "चोरी हुए एसेट से जुड़ा कोई भी लेनदेन कानूनी, वित्तीय और अनुपालन जोखिम पैदा कर सकता है।",
        metadataStatus: "स्थिति",
        metadataRisk: "जोखिम स्तर",
        metadataReportedBy: "रिपोर्ट करने वाला",
        metadataJurisdiction: "क्षेत्राधिकार",
        metadataReportDate: "रिपोर्ट तिथि",
        actionReportSighting: "देखे जाने की रिपोर्ट करें",
        actionContactAuthorities: "अधिकारियों से संपर्क करें",
      },
      notRegistered: {
        label: "पंजीकृत नहीं",
        message: "यह पहचान EquipRegistry में पंजीकृत नहीं है।",
        why:
          "एक अपंजीकृत एसेट के पास सत्यापित रजिस्ट्री रिकॉर्ड, स्वामित्व ट्रेल या सार्वजनिक पासपोर्ट नहीं होता।",
        actionRegister: "इस एसेट को पंजीकृत करें",
      },
      metadataValues: {
        active: "सक्रिय",
        full: "पूर्ण",
        lastValidation2025: "2025",
        limitedPassport: "सीमित पासपोर्ट",
        medium: "मध्यम",
        blacklisted: "काली सूची में",
        high: "उच्च",
        insurancePartner: "बीमा भागीदार",
        euCrossBorderAlert: "ईयू / सीमा-पार अलर्ट",
        reportDate: "2025-03-12",
      },
    },
  },
  ar: {
    hero: {
      title: "تحقق من الملكية ومخاطر الاحتيال للمركبات والمعدات على مستوى عالمي",
      subtitle:
        "استخدم VIN والأرقام التسلسلية ومعرّفات السجل للتحقق من المصدر القانوني وتنبيهات السرقة وحالة السجل قبل الشراء أو التمويل أو التأمين أو التأجير أو النقل.",
      placeholder: "أدخل VIN أو الرقم التسلسلي أو معرّف السجل",
      search: "تحقق من الأصل",
      demoSerials: "أرقام تجريبية:",
      loggedInMessage:
        "أنت مسجل الدخول. يمكنك استخدام البحث بشكل طبيعي والاستمرار في الوصول إلى الجوازات الخاصة.",
      goToDashboard: "الانتقال إلى لوحة التحكم",
      supportedAssetsTitle: "فئات الأصول التي يغطيها EquipRegistry",
      supportedAssetsItems: [
        "المركبات البرية والمقطورات وأصول الأساطيل",
        "معدات البناء والصناعة والزراعة والتأجير",
        "الدراجات والبطاريات وأنظمة الطاقة وغيرها من الأصول ذات الأرقام التسلسلية",
      ],
    },
    result: { whyThisMatters: "لماذا هذا مهم" },
    howItWorks: {
      title: "كيف يعمل EquipRegistry",
      step1Title: "1. ابحث",
      step1Text: "أدخل VIN أو الرقم التسلسلي أو معرّف السجل لرؤية الحالة الحالية فوراً.",
      step2Title: "2. تحقق",
      step2Text: "راجع إشارات السجل وسياق الملكية وظهور الجواز عندما يكون متاحاً.",
      step3Title: "3. سجّل",
      step3Text: "سجّل المركبات أو المعدات أو الأصول الأخرى وأضف المستندات الداعمة.",
      step4Title: "4. استخدم",
      step4Text: "استخدم جواز السجل في التأمين والتأجير وإعادة البيع والاسترداد والامتثال.",
    },
    trust: {
      title: "مصمم للتحقق الموثوق من الأصول",
      subtitle:
        "يساعد EquipRegistry المالكين وشركات التأمين والجهات الممولة ومشغلي التأجير والمشترين على التحقق من المصدر القانوني والحالة عبر طبقة بحث عامة متسقة.",
      card1Title: "جاهز للتأمين",
      card1Text: "يدعم الاكتتاب وفحوصات التحقق والقرارات القائمة على المخاطر.",
      card2Title: "مستقل",
      card2Text: "تم تصميمه كطبقة تحقق محايدة عبر المشغلين والأسواق والحدود.",
      card3Title: "قابل للتوسع",
      card3Text: "يعمل للأصل الواحد وللأساطيل الكبيرة بنفس نموذج البحث العام.",
    },
    statuses: {
      registeredVerified: {
        label: "مسجل ومتحقق منه",
        message:
          "هذا الأصل مسجل في EquipRegistry وتم التحقق من مصدره القانوني.",
        why:
          "هذا يعزز الثقة عند الشراء والتمويل والتأمين والتعامل عبر الحدود.",
        metadataStatus: "الحالة",
        metadataPassport: "جواز السجل",
        metadataValidation: "آخر تحقق",
        actionViewPassport: "عرض الجواز",
      },
      historyUnknown: {
        label: "سجل محدود",
        message:
          "يظهر هذا الأصل في السجل، لكن سجل الملكية الكامل لم يتم التحقق منه بالكامل بعد.",
        why:
          "السجل المحدود يزيد من عدم اليقين ويجب مراجعته قبل أي معاملة أو اعتماد.",
        metadataStatus: "الحالة",
        metadataRisk: "مستوى المخاطر",
        actionViewPassport: "عرض الجواز المحدود",
        actionRegisterDocuments: "تسجيل المستندات",
      },
      stolen: {
        label: "أصل مسروق - تحذير أحمر",
        message:
          "تم الإبلاغ رسمياً عن هذا الأصل على أنه مسروق ولا يزال مميزاً بشكل نشط داخل EquipRegistry.",
        warning:
          "لا تشترِ هذا الأصل ولا تؤمّنه ولا تؤجره ولا تنقله ولا تقبل نقله.",
        why:
          "أي معاملة تتعلق بأصل مسروق قد تؤدي إلى مخاطر قانونية ومالية ومخاطر امتثال.",
        metadataStatus: "الحالة",
        metadataRisk: "مستوى المخاطر",
        metadataReportedBy: "تم الإبلاغ بواسطة",
        metadataJurisdiction: "الاختصاص القضائي",
        metadataReportDate: "تاريخ البلاغ",
        actionReportSighting: "الإبلاغ عن مشاهدة",
        actionContactAuthorities: "الاتصال بالسلطات",
      },
      notRegistered: {
        label: "غير مسجل",
        message: "هذا المعرّف غير مسجل في EquipRegistry.",
        why:
          "الأصل غير المسجل لا يملك سجلاً موثقاً ولا مسار ملكية ولا جوازاً عاماً.",
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
        euCrossBorderAlert: "تنبيه أوروبي / عابر للحدود",
        reportDate: "2025-03-12",
      },
    },
  },
};

export function getPublicHomeText(lang: Lang): PublicHomeText {
  const fallback = TEXT.en as PublicHomeText;
  return PUBLIC_HOME_NATIVE_OVERRIDES[lang] ?? TEXT[lang] ?? fallback;
}
