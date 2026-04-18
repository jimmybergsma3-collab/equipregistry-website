"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  lang: string;
};

type ApplicantType = "private" | "sme";

type Category =
  | "Vehicles"
  | "Machines"
  | "Industry"
  | "Bikes"
  | "Trailers"
  | "Energy"
  | "Agriculture"
  | "Medical"
  | "Other";

type DerivedAssetType =
  | "Vehicle"
  | "Equipment"
  | "BikeLightMobility"
  | "Trailer"
  | "Energy"
  | "Agriculture"
  | "Medical"
  | "Industrial"
  | "Other";

type Texts = {
  pageTitle: string;
  pageSubtitle: string;
  applicantTitle: string;
  applicantSubtitle: string;
  applicantTypeLabel: string;
  applicantTypePrivate: string;
  applicantTypeSme: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  companyNameLabel: string;
  companyNameOptional: string;
  companyNamePlaceholder: string;
  vatNumberLabel: string;
  vatNumberPlaceholder: string;
  assetTitle: string;
  assetSubtitle: string;
  assetNameLabel: string;
  assetNamePlaceholder: string;
  categoryLabel: string;
  subcategoryLabel: string;
  subcategoryPlaceholder: string;
  brandLabel: string;
  brandPlaceholder: string;
  modelLabel: string;
  modelPlaceholder: string;
  yearLabel: string;
  yearPlaceholder: string;
  countryLabel: string;
  countryPlaceholder: string;
  declarationText: string;
  submitIdle: string;
  submitLoading: string;
  errorAcceptDeclaration: string;
  errorRegisterFailed: string;
  errorServer: string;
  riskProfileTitle: string;
  riskProfileText: string;
  riskLabels: {
    standard: string;
    theft: string;
    export: string;
    highValue: string;
    crossBorder: string;
  };
  serialNumberLabel: string;
  vinLabel: string;
  engineNumberLabel: string;
  frameNumberLabel: string;
  batterySerialNumberLabel: string;
  solarPanelSerialNumbersLabel: string;
  serialNumbersHintPanels: string;
  serialNumbersHintBatteries: string;
  serialNumbersHintBikeBatteries: string;
  capacityLabel: string;
  powerRatingLabel: string;
  batchLotNumberLabel: string;
  installationLocationLabel: string;
  hoursOfOperationLabel: string;
  deviceIdLabel: string;
  certificationLabel: string;
  ownerOrganisationLabel: string;
  serialNumberPlaceholder: string;
  vinPlaceholder: string;
  engineNumberPlaceholder: string;
  frameNumberPlaceholder: string;
  batterySerialNumberPlaceholder: string;
  solarPanelSerialNumberPlaceholder: string;
  capacityPlaceholder: string;
  powerRatingPlaceholder: string;
  batchLotNumberPlaceholder: string;
  installationLocationPlaceholder: string;
  hoursOfOperationPlaceholder: string;
  deviceIdPlaceholder: string;
  certificationPlaceholder: string;
  ownerOrganisationPlaceholder: string;
  removeButton: string;
  categoryOptions: Record<Category, string>;
  subcategoryOptions: Record<Category, string[]>;
  identifierLabel: Record<DerivedAssetType, string>;
  identifierPlaceholder: Record<DerivedAssetType, string>;
};

const baseEnglish: Texts = {
  pageTitle: "Register asset",
  pageSubtitle:
    "Start a registration request for an asset and create your account immediately.",
  applicantTitle: "Applicant",
  applicantSubtitle:
    "Enter your basic details. We use this to create your account and link the registration to your profile.",
  applicantTypeLabel: "Applicant type *",
  applicantTypePrivate: "Private",
  applicantTypeSme: "SME / Business",
  nameLabel: "Name *",
  namePlaceholder: "Full name",
  emailLabel: "Email *",
  emailPlaceholder: "name@company.com",
  passwordLabel: "Password *",
  passwordPlaceholder: "Minimum 6 characters",
  companyNameLabel: "Company name",
  companyNameOptional: "(optional)",
  companyNamePlaceholder: "Company name",
  vatNumberLabel: "VAT number (optional)",
  vatNumberPlaceholder: "ESB12345678 / NL123456789B01",
  assetTitle: "Asset details",
  assetSubtitle:
    "Enter the basic details of the asset. Further verification and documents can be added later.",
  assetNameLabel: "Asset name *",
  assetNamePlaceholder:
    "E.g. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
  categoryLabel: "Category *",
  subcategoryLabel: "Subcategory *",
  subcategoryPlaceholder: "Select subcategory",
  brandLabel: "Brand *",
  brandPlaceholder: "E.g. Opel / Caterpillar / Komatsu / Trek",
  modelLabel: "Model *",
  modelPlaceholder: "E.g. Corsa / 320D / WA380 / ST3",
  yearLabel: "Year",
  yearPlaceholder: "2021",
  countryLabel: "Country",
  countryPlaceholder: "E.g. Spain / Netherlands / Germany",
  declarationText:
    "I declare that the information provided is truthful and that I am authorized to submit this registration request.",
  submitIdle: "Start registration",
  submitLoading: "Processing...",
  errorAcceptDeclaration: "You must accept the declaration first.",
  errorRegisterFailed: "Registration failed.",
  errorServer: "Server error during registration.",
  riskProfileTitle: "Risk profile",
  riskProfileText:
    "This category is monitored for ownership verification, theft signals and cross-border fraud risk.",
  riskLabels: {
    standard: "Standard risk",
    theft: "High theft risk",
    export: "High export and resale risk",
    highValue: "High value asset",
    crossBorder: "Cross-border fraud risk",
  },
  serialNumberLabel: "Serial number",
  vinLabel: "VIN / Chassis number",
  engineNumberLabel: "Engine number",
  frameNumberLabel: "Frame number",
  batterySerialNumberLabel: "Battery serial number",
  solarPanelSerialNumbersLabel: "Solar panel serial numbers",
  serialNumbersHintPanels:
    "Press Enter after a serial number to add another panel.",
  serialNumbersHintBatteries:
    "Press Enter after a serial number to add another battery.",
  serialNumbersHintBikeBatteries:
    "Press Enter after a serial number to add another battery.",
  capacityLabel: "Capacity",
  powerRatingLabel: "Power rating",
  batchLotNumberLabel: "Batch / lot number",
  installationLocationLabel: "Installation location",
  hoursOfOperationLabel: "Hours of operation",
  deviceIdLabel: "Device ID",
  certificationLabel: "Certification",
  ownerOrganisationLabel: "Hospital / owner organisation",
  serialNumberPlaceholder: "Primary serial number",
  vinPlaceholder: "Vehicle or chassis number",
  engineNumberPlaceholder: "Engine identifier",
  frameNumberPlaceholder: "Frame number",
  batterySerialNumberPlaceholder: "Battery serial number",
  solarPanelSerialNumberPlaceholder: "Solar panel serial number",
  capacityPlaceholder: "Example: 5 kWh",
  powerRatingPlaceholder: "Example: 450 Wp / 10 kW",
  batchLotNumberPlaceholder: "Batch or production lot",
  installationLocationPlaceholder: "Site or installation address",
  hoursOfOperationPlaceholder: "Example: 4,230 hours",
  deviceIdPlaceholder: "Internal device or asset ID",
  certificationPlaceholder: "Example: CE / FDA",
  ownerOrganisationPlaceholder: "Hospital, clinic, leasing company or owner",
  removeButton: "×",
  categoryOptions: {
    Vehicles: "Vehicles",
    Machines: "Machines",
    Industry: "Industry",
    Bikes: "Bikes / Light mobility",
    Trailers: "Trailers",
    Energy: "Solar / Battery systems",
    Agriculture: "Agricultural equipment",
    Medical: "Medical / Hospital equipment",
    Other: "Other",
  },
  subcategoryOptions: {
    Vehicles: [
      "Passenger Car",
      "Camper",
      "Van",
      "Truck",
      "Classic Car",
      "Motorcycle",
    ],
    Machines: [
      "Excavator",
      "Wheel Loader",
      "Skid Steer",
      "Telehandler",
      "Bulldozer",
      "Mini Excavator",
      "Generator",
      "Small Tool",
    ],
    Industry: [
      "Factory Machine",
      "Production Line Equipment",
      "Warehouse Equipment",
      "Industrial Generator",
      "Industrial Battery",
      "Container",
      "Workshop Equipment",
    ],
    Bikes: [
      "Bicycle",
      "E-Bike",
      "Electric Scooter",
      "Cargo Bike",
      "Moped / Light Mobility",
    ],
    Trailers: [
      "Trailer",
      "Semi Trailer",
      "Car Transporter",
      "Horse Trailer",
      "Caravan",
    ],
    Energy: [
      "Solar Panel",
      "Inverter",
      "Battery Storage",
      "Charging Station",
      "Hybrid Energy Unit",
    ],
    Agriculture: [
      "Tractor",
      "Harvester",
      "Sprayer",
      "Baler",
      "Plough",
      "Seeder",
      "Irrigation System",
      "Agricultural Attachment",
    ],
    Medical: [
      "MRI",
      "CT Scanner",
      "X-Ray",
      "Ultrasound",
      "Patient Monitor",
      "Ventilator",
      "Surgical Equipment",
      "Hospital Bed",
      "Mobile Medical Unit",
    ],
    Other: ["Asset with serial", "Tool", "Attachment", "Other"],
  },
  identifierLabel: {
    Vehicle: "VIN *",
    Equipment: "Serial number *",
    BikeLightMobility: "Frame number / Serial number *",
    Trailer: "Chassis number / VIN *",
    Energy: "Serial number *",
    Agriculture: "VIN / Serial number *",
    Medical: "Serial number / Device ID *",
    Industrial: "Serial number *",
    Other: "Serial number *",
  },
  identifierPlaceholder: {
    Vehicle: "Enter VIN",
    Equipment: "Enter machine serial number",
    BikeLightMobility: "Enter frame number or serial number",
    Trailer: "Enter chassis number or VIN",
    Energy: "Enter serial number",
    Agriculture: "Enter VIN or serial number",
    Medical: "Enter serial number or device ID",
    Industrial: "Enter serial number",
    Other: "Enter identifier",
  },
};

const textsByLang: Record<string, Texts> = {
  en: baseEnglish,
  es: {
    ...baseEnglish,
    pageTitle: "Registrar activo",
    pageSubtitle:
      "Inicie una solicitud de registro para un activo y cree su cuenta de inmediato.",
    applicantTitle: "Solicitante",
    applicantSubtitle:
      "Introduzca sus datos básicos. Con esto creamos su cuenta y vinculamos el registro a su perfil.",
    applicantTypeLabel: "Tipo de solicitante *",
    applicantTypePrivate: "Particular",
    applicantTypeSme: "PyME / Empresa",
    nameLabel: "Nombre *",
    namePlaceholder: "Nombre completo",
    emailLabel: "Correo electrónico *",
    emailPlaceholder: "nombre@empresa.com",
    passwordLabel: "Contraseña *",
    passwordPlaceholder: "Mínimo 6 caracteres",
    companyNameLabel: "Nombre de la empresa",
    companyNameOptional: "(opcional)",
    companyNamePlaceholder: "Nombre de la empresa",
    vatNumberLabel: "Número de IVA (opcional)",
    vatNumberPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Datos del activo",
    assetSubtitle:
      "Introduzca los datos básicos del activo. La verificación adicional y los documentos pueden añadirse más tarde.",
    assetNameLabel: "Nombre del activo *",
    categoryLabel: "Categoría *",
    subcategoryLabel: "Subcategoría *",
    subcategoryPlaceholder: "Seleccione subcategoría",
    brandLabel: "Marca *",
    modelLabel: "Modelo *",
    yearLabel: "Año",
    countryLabel: "País",
    declarationText:
      "Declaro que la información facilitada es veraz y que estoy autorizado para presentar esta solicitud de registro.",
    submitIdle: "Iniciar registro",
    submitLoading: "Procesando...",
    errorAcceptDeclaration: "Debe aceptar primero la declaración.",
    errorRegisterFailed: "El registro ha fallado.",
    errorServer: "Error del servidor durante el registro.",
    riskProfileTitle: "Perfil de riesgo",
    riskProfileText:
      "Esta categoría se supervisa para verificación de propiedad, señales de robo y riesgo de fraude transfronterizo.",
    riskLabels: {
      standard: "Riesgo estándar",
      theft: "Alto riesgo de robo",
      export: "Alto riesgo de exportación y reventa",
      highValue: "Activo de alto valor",
      crossBorder: "Riesgo de fraude transfronterizo",
    },
    serialNumberLabel: "Número de serie",
    vinLabel: "VIN / Número de chasis",
    engineNumberLabel: "Número de motor",
    frameNumberLabel: "Número de cuadro",
    batterySerialNumberLabel: "Número de serie de la batería",
    solarPanelSerialNumbersLabel: "Números de serie de paneles solares",
    serialNumbersHintPanels:
      "Pulse Enter después de un número de serie para añadir otro panel.",
    serialNumbersHintBatteries:
      "Pulse Enter después de un número de serie para añadir otra batería.",
    serialNumbersHintBikeBatteries:
      "Pulse Enter después de un número de serie para añadir otra batería.",
    capacityLabel: "Capacidad",
    powerRatingLabel: "Potencia nominal",
    batchLotNumberLabel: "Número de lote",
    installationLocationLabel: "Ubicación de la instalación",
    hoursOfOperationLabel: "Horas de funcionamiento",
    deviceIdLabel: "ID del dispositivo",
    certificationLabel: "Certificación",
    ownerOrganisationLabel: "Hospital / organización propietaria",
    serialNumberPlaceholder: "Número de serie principal",
    vinPlaceholder: "Número de vehículo o chasis",
    engineNumberPlaceholder: "Identificador del motor",
    frameNumberPlaceholder: "Número de cuadro",
    batterySerialNumberPlaceholder: "Número de serie de la batería",
    solarPanelSerialNumberPlaceholder: "Número de serie del panel solar",
    capacityPlaceholder: "Ejemplo: 5 kWh",
    powerRatingPlaceholder: "Ejemplo: 450 Wp / 10 kW",
    batchLotNumberPlaceholder: "Lote o producción",
    installationLocationPlaceholder: "Ubicación o dirección de instalación",
    hoursOfOperationPlaceholder: "Ejemplo: 4.230 horas",
    deviceIdPlaceholder: "ID interno del equipo o activo",
    certificationPlaceholder: "Ejemplo: CE / FDA",
    ownerOrganisationPlaceholder:
      "Hospital, clínica, empresa de leasing o propietario",
    removeButton: "×",
    categoryOptions: {
      Vehicles: "Vehículos",
      Machines: "Máquinas",
      Industry: "Industria",
      Bikes: "Bicis / movilidad ligera",
      Trailers: "Remolques",
      Energy: "Sistemas solares / baterías",
      Agriculture: "Equipo agrícola",
      Medical: "Equipo médico / hospitalario",
      Other: "Otro",
    },
    subcategoryOptions: {
      Vehicles: [
        "Turismo",
        "Camper",
        "Furgoneta",
        "Camión",
        "Coche clásico",
        "Motocicleta",
      ],
      Machines: [
        "Excavadora",
        "Cargadora de ruedas",
        "Minicargadora",
        "Manipulador telescópico",
        "Bulldozer",
        "Mini excavadora",
        "Generador",
        "Herramienta pequeña",
      ],
      Industry: [
        "Máquina de fábrica",
        "Equipo de línea de producción",
        "Equipo de almacén",
        "Generador industrial",
        "Batería industrial",
        "Contenedor",
        "Equipo de taller",
      ],
      Bikes: [
        "Bicicleta",
        "E-Bike",
        "Patinete eléctrico",
        "Bicicleta de carga",
        "Ciclomotor / movilidad ligera",
      ],
      Trailers: [
        "Remolque",
        "Semirremolque",
        "Portacoches",
        "Remolque para caballos",
        "Caravana",
      ],
      Energy: [
        "Panel solar",
        "Inversor",
        "Almacenamiento de batería",
        "Punto de carga",
        "Unidad híbrida de energía",
      ],
      Agriculture: [
        "Tractor",
        "Cosechadora",
        "Pulverizador",
        "Empacadora",
        "Arado",
        "Sembradora",
        "Sistema de riego",
        "Accesorio agrícola",
      ],
      Medical: [
        "MRI",
        "Escáner CT",
        "Rayos X",
        "Ultrasonido",
        "Monitor de paciente",
        "Ventilador",
        "Equipo quirúrgico",
        "Cama hospitalaria",
        "Unidad médica móvil",
      ],
      Other: ["Activo con serie", "Herramienta", "Accesorio", "Otro"],
    },
    identifierLabel: {
      Vehicle: "VIN *",
      Equipment: "Número de serie *",
      BikeLightMobility: "Número de cuadro / Número de serie *",
      Trailer: "Número de chasis / VIN *",
      Energy: "Número de serie *",
      Agriculture: "VIN / Número de serie *",
      Medical: "Número de serie / ID del dispositivo *",
      Industrial: "Número de serie *",
      Other: "Número de serie *",
    },
    identifierPlaceholder: {
      Vehicle: "Introduzca VIN",
      Equipment: "Introduzca número de serie de máquina",
      BikeLightMobility: "Introduzca número de cuadro o número de serie",
      Trailer: "Introduzca número de chasis o VIN",
      Energy: "Introduzca número de serie",
      Agriculture: "Introduzca VIN o número de serie",
      Medical: "Introduzca número de serie o ID del dispositivo",
      Industrial: "Introduzca número de serie",
      Other: "Introduzca identificador",
    },
  },
  de: {
    ...baseEnglish,
    pageTitle: "Asset registrieren",
  },
  fr: {
    ...baseEnglish,
    pageTitle: "Enregistrer l’actif",
  },
  it: {
    ...baseEnglish,
    pageTitle: "Registra asset",
  },
  nl: {
    ...baseEnglish,
    pageTitle: "Asset registreren",
    pageSubtitle:
      "Start een registratieaanvraag voor een asset en maak direct je account aan.",
    applicantTitle: "Aanvrager",
    applicantSubtitle:
      "Vul je basisgegevens in. Hiermee maken we je account en koppelen we de registratie aan jouw profiel.",
    applicantTypeLabel: "Aanvragerstype *",
    applicantTypePrivate: "Particulier",
    applicantTypeSme: "MKB / Zakelijk",
    nameLabel: "Naam *",
    namePlaceholder: "Volledige naam",
    emailLabel: "E-mail *",
    emailPlaceholder: "naam@bedrijf.com",
    passwordLabel: "Wachtwoord *",
    passwordPlaceholder: "Minimaal 6 tekens",
    companyNameLabel: "Bedrijfsnaam",
    companyNameOptional: "(optioneel)",
    companyNamePlaceholder: "Naam bedrijf",
    vatNumberLabel: "BTW nummer (optioneel)",
    vatNumberPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Assetgegevens",
    assetSubtitle:
      "Geef de basisgegevens van het asset op. Verdere verificatie en documenten kunnen later worden aangevuld.",
    assetNameLabel: "Asset naam *",
    categoryLabel: "Categorie *",
    subcategoryLabel: "Subcategorie *",
    subcategoryPlaceholder: "Selecteer subcategorie",
    brandLabel: "Merk *",
    modelLabel: "Model *",
    yearLabel: "Jaar",
    countryLabel: "Land",
    declarationText:
      "Ik verklaar dat de verstrekte gegevens naar waarheid zijn ingevuld en dat ik gerechtigd ben om deze registratieaanvraag in te dienen.",
    submitIdle: "Registratie starten",
    submitLoading: "Bezig...",
    errorAcceptDeclaration: "Je moet eerst de verklaring accepteren.",
    errorRegisterFailed: "Registreren mislukt.",
    errorServer: "Serverfout tijdens registreren.",
    riskProfileTitle: "Risicoprofiel",
    riskProfileText:
      "Deze categorie wordt gemonitord op eigendomsverificatie, diefstalsignalen en grensoverschrijdend frauderisico.",
    riskLabels: {
      standard: "Standaard risico",
      theft: "Hoog diefstalrisico",
      export: "Hoog export- en doorverkooprisico",
      highValue: "Hoogwaardig asset",
      crossBorder: "Grensoverschrijdend frauderisico",
    },
    serialNumberLabel: "Serienummer",
    vinLabel: "VIN / Chassisnummer",
    engineNumberLabel: "Motornummer",
    frameNumberLabel: "Framenummer",
    batterySerialNumberLabel: "Accu serienummer",
    solarPanelSerialNumbersLabel: "Solarpaneel serienummers",
    serialNumbersHintPanels:
      "Druk op Enter na een serienummer om een extra paneel toe te voegen.",
    serialNumbersHintBatteries:
      "Druk op Enter na een serienummer om een extra accu toe te voegen.",
    serialNumbersHintBikeBatteries:
      "Druk op Enter na een serienummer om een extra accu toe te voegen.",
    capacityLabel: "Capaciteit",
    powerRatingLabel: "Vermogen",
    batchLotNumberLabel: "Batch / lotnummer",
    installationLocationLabel: "Installatielocatie",
    hoursOfOperationLabel: "Bedrijfsuren",
    deviceIdLabel: "Device ID",
    certificationLabel: "Certificering",
    ownerOrganisationLabel: "Ziekenhuis / eigenaar organisatie",
    serialNumberPlaceholder: "Primair serienummer",
    vinPlaceholder: "Voertuig- of chassisnummer",
    engineNumberPlaceholder: "Motor identificatie",
    frameNumberPlaceholder: "Framenummer",
    batterySerialNumberPlaceholder: "Accu serienummer",
    solarPanelSerialNumberPlaceholder: "Solarpaneel serienummer",
    capacityPlaceholder: "Bijvoorbeeld: 5 kWh",
    powerRatingPlaceholder: "Bijvoorbeeld: 450 Wp / 10 kW",
    batchLotNumberPlaceholder: "Batch of productielot",
    installationLocationPlaceholder: "Locatie of installatieadres",
    hoursOfOperationPlaceholder: "Bijvoorbeeld: 4.230 uur",
    deviceIdPlaceholder: "Interne apparaat- of asset-ID",
    certificationPlaceholder: "Bijvoorbeeld: CE / FDA",
    ownerOrganisationPlaceholder:
      "Ziekenhuis, kliniek, leasebedrijf of eigenaar",
    removeButton: "×",
    categoryOptions: {
      Vehicles: "Voertuigen",
      Machines: "Machines",
      Industry: "Industrie",
      Bikes: "Fietsen / lichte mobiliteit",
      Trailers: "Trailers",
      Energy: "Solar / batterijsystemen",
      Agriculture: "Agrarisch materieel",
      Medical: "Medisch / ziekenhuis equipment",
      Other: "Overig",
    },
    subcategoryOptions: {
      Vehicles: [
        "Personenauto",
        "Camper",
        "Bestelwagen",
        "Vrachtwagen",
        "Classic Car",
        "Motorfiets",
      ],
      Machines: [
        "Graafmachine",
        "Wiellader",
        "Skid Steer",
        "Verreiker",
        "Bulldozer",
        "Mini graafmachine",
        "Generator",
        "Klein gereedschap",
      ],
      Industry: [
        "Fabrieksmachine",
        "Productielijn equipment",
        "Magazijn equipment",
        "Industriële generator",
        "Industriële batterij",
        "Container",
        "Werkplaats equipment",
      ],
      Bikes: [
        "Fiets",
        "E-Bike",
        "Elektrische step",
        "Bakfiets",
        "Brommer / lichte mobiliteit",
      ],
      Trailers: [
        "Trailer",
        "Oplegger",
        "Autotransporter",
        "Paardentrailer",
        "Caravan",
      ],
      Energy: [
        "Solarpaneel",
        "Omvormer",
        "Batterijopslag",
        "Laadstation",
        "Hybride energie-unit",
      ],
      Agriculture: [
        "Tractor",
        "Combine",
        "Spuitmachine",
        "Balenpers",
        "Ploeg",
        "Zaaimachine",
        "Irrigatiesysteem",
        "Agrarisch aanbouwdeel",
      ],
      Medical: [
        "MRI",
        "CT Scanner",
        "Röntgen",
        "Ultrasound",
        "Patiëntmonitor",
        "Beademingsapparaat",
        "Chirurgisch equipment",
        "Ziekenhuisbed",
        "Mobiele medische unit",
      ],
      Other: ["Asset met serienummer", "Gereedschap", "Aanbouwdeel", "Overig"],
    },
    identifierLabel: {
      Vehicle: "VIN *",
      Equipment: "Serienummer *",
      BikeLightMobility: "Framenummer / Serienummer *",
      Trailer: "Chassisnummer / VIN *",
      Energy: "Serienummer *",
      Agriculture: "VIN / Serienummer *",
      Medical: "Serienummer / Device ID *",
      Industrial: "Serienummer *",
      Other: "Serienummer *",
    },
    identifierPlaceholder: {
      Vehicle: "Voer VIN in",
      Equipment: "Voer machineserienummer in",
      BikeLightMobility: "Voer framenummer of serienummer in",
      Trailer: "Voer chassisnummer of VIN in",
      Energy: "Voer serienummer in",
      Agriculture: "Voer VIN of serienummer in",
      Medical: "Voer serienummer of device ID in",
      Industrial: "Voer serienummer in",
      Other: "Voer identifier in",
    },
  },
  pt: {
    ...baseEnglish,
    pageTitle: "Registar ativo",
  },
  ru: {
    ...baseEnglish,
    pageTitle: "Register asset",
  },
  zh: {
    ...baseEnglish,
    pageTitle: "Register asset",
  },
  hi: {
    ...baseEnglish,
    pageTitle: "Register asset",
  },
  ar: {
    ...baseEnglish,
    pageTitle: "Register asset",
  },

  pl: baseEnglish,
  sv: baseEnglish,
  da: baseEnglish,
  no: baseEnglish,};

function getRiskKey(category: Category): keyof Texts["riskLabels"] {
  switch (category) {
    case "Energy":
    case "Machines":
      return "theft";
    case "Agriculture":
      return "export";
    case "Medical":
      return "highValue";
    case "Vehicles":
    case "Trailers":
      return "crossBorder";
    default:
      return "standard";
  }
}

function updateArrayField(
  setter: React.Dispatch<React.SetStateAction<string[]>>,
  index: number,
  value: string
) {
  setter((prev) => {
    const next = [...prev];
    next[index] = value;
    return next;
  });
}

function handleArrayFieldKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  values: string[],
  setter: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (e.key !== "Enter") return;

  e.preventDefault();

  const currentValue = (e.currentTarget.value || "").trim();
  const lastIndex = values.length - 1;

  if (currentValue && e.currentTarget.dataset.index === String(lastIndex)) {
    setter((prev) => [...prev, ""]);
  }
}

function removeArrayField(
  setter: React.Dispatch<React.SetStateAction<string[]>>,
  index: number
) {
  setter((prev) => {
    if (prev.length === 1) return [""];
    return prev.filter((_, i) => i !== index);
  });
}

function getFilledValues(values: string[]) {
  return values.map((v) => v.trim()).filter(Boolean);
}

function getDerivedAssetType(category: Category): DerivedAssetType {
  switch (category) {
    case "Vehicles":
      return "Vehicle";
    case "Machines":
      return "Equipment";
    case "Bikes":
      return "BikeLightMobility";
    case "Trailers":
      return "Trailer";
    case "Energy":
      return "Energy";
    case "Agriculture":
      return "Agriculture";
    case "Medical":
      return "Medical";
    case "Industry":
      return "Industrial";
    case "Other":
    default:
      return "Other";
  }
}

export default function RegisterPageClient({ lang }: Props) {
  const router = useRouter();
  const t = textsByLang[lang] ?? textsByLang.en;

  const [applicantType, setApplicantType] = useState<ApplicantType>("private");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");

  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState<Category>("Vehicles");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");

  const [vin, setVin] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [frameNumber, setFrameNumber] = useState("");

  const [solarPanelSerialNumbers, setSolarPanelSerialNumbers] = useState<
    string[]
  >([""]);
  const [batterySerialNumbers, setBatterySerialNumbers] = useState<string[]>([
    "",
  ]);
  const [bikeBatterySerialNumbers, setBikeBatterySerialNumbers] = useState<
    string[]
  >([""]);

  const [capacity, setCapacity] = useState("");
  const [powerRating, setPowerRating] = useState("");
  const [batchLotNumber, setBatchLotNumber] = useState("");
  const [installationLocation, setInstallationLocation] = useState("");
  const [hoursOfOperation, setHoursOfOperation] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [certification, setCertification] = useState("");
  const [ownerOrganisation, setOwnerOrganisation] = useState("");

  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const assetType = useMemo<DerivedAssetType>(() => {
    return getDerivedAssetType(category);
  }, [category]);

  const identifierLabel = useMemo(() => {
    return t.identifierLabel[assetType];
  }, [assetType, t]);

  const identifierPlaceholder = useMemo(() => {
    return t.identifierPlaceholder[assetType];
  }, [assetType, t]);

  const subcategoryOptions = useMemo(() => {
    return t.subcategoryOptions[category] ?? [];
  }, [category, t]);

  const riskLabel = useMemo(() => {
    return t.riskLabels[getRiskKey(category)];
  }, [category, t]);

  useEffect(() => {
    const options = t.subcategoryOptions[category] ?? [];
    if (!options.includes(subcategory)) {
      setSubcategory(options[0] ?? "");
    }
  }, [category, subcategory, t]);

  const isVehicleLike =
    category === "Vehicles" ||
    category === "Trailers" ||
    category === "Agriculture";

  const isBikeLike = category === "Bikes";
  const isEnergy = category === "Energy";
  const isMedical = category === "Medical";
  const isIndustrial = category === "Industry";
  const isMachine = category === "Machines";
  const isAgriculture = category === "Agriculture";

  function handleCategoryChange(nextCategory: Category) {
    setCategory(nextCategory);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!declarationAccepted) {
      setError(t.errorAcceptDeclaration);
      return;
    }

    const filledSolarPanelSerialNumbers = getFilledValues(
      solarPanelSerialNumbers
    );
    const filledBatterySerialNumbers = getFilledValues(batterySerialNumbers);
    const filledBikeBatterySerialNumbers = getFilledValues(
      bikeBatterySerialNumbers
    );

    const primaryIdentifier =
      serialNumber ||
      vin ||
      frameNumber ||
      filledSolarPanelSerialNumbers[0] ||
      filledBatterySerialNumbers[0] ||
      filledBikeBatterySerialNumbers[0] ||
      deviceId;

    setLoading(true);

    try {
      const res = await fetch("/api/register-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantType,
          name,
          email,
          password,
          companyName,
          vatNumber,
          assetType,
          assetName,
          category,
          subcategory,
          brand,
          model,
          serialNumber: primaryIdentifier,
          year,
          country,
          declarationAccepted,
          vin,
          engineNumber,
          frameNumber,
          solarPanelSerialNumbers: filledSolarPanelSerialNumbers,
          batterySerialNumbers: filledBatterySerialNumbers,
          bikeBatterySerialNumbers: filledBikeBatterySerialNumbers,
          capacity,
          powerRating,
          batchLotNumber,
          installationLocation,
          hoursOfOperation,
          deviceId,
          certification,
          ownerOrganisation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (
          data?.error === "VERIFICATION_EMAIL_SEND_FAILED" ||
          data?.error === "SERVER_ERROR"
        ) {
          setError(t.errorServer);
        } else {
          setError(data?.error || t.errorRegisterFailed);
        }
        return;
      }

      if (data?.verificationRequired) {
        router.push(`/${lang}/verify-email?status=sent`);
        router.refresh();
        return;
      }

      router.push(`/${lang}/dashboard/registrations`);
      router.refresh();
    } catch {
      setError(t.errorServer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="mb-4 text-4xl font-bold">{t.pageTitle}</h1>
        <p className="text-slate-600">{t.pageSubtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border bg-white p-8"
      >
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">{t.applicantTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">{t.applicantSubtitle}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.applicantTypeLabel}
            </label>
            <select
              value={applicantType}
              onChange={(e) => setApplicantType(e.target.value as ApplicantType)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="private">{t.applicantTypePrivate}</option>
              <option value="sme">{t.applicantTypeSme}</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t.nameLabel}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t.emailLabel}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.emailPlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.passwordPlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.companyNameLabel}{" "}
              {applicantType === "sme" ? "*" : t.companyNameOptional}
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.companyNamePlaceholder}
              required={applicantType === "sme"}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.vatNumberLabel}
            </label>
            <input
              value={vatNumber}
              onChange={(e) => setVatNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.vatNumberPlaceholder}
            />
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">{t.assetTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">{t.assetSubtitle}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.assetNameLabel}
            </label>
            <input
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.assetNamePlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.categoryLabel}
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="Vehicles">{t.categoryOptions.Vehicles}</option>
              <option value="Machines">{t.categoryOptions.Machines}</option>
              <option value="Industry">{t.categoryOptions.Industry}</option>
              <option value="Bikes">{t.categoryOptions.Bikes}</option>
              <option value="Trailers">{t.categoryOptions.Trailers}</option>
              <option value="Energy">{t.categoryOptions.Energy}</option>
              <option value="Agriculture">{t.categoryOptions.Agriculture}</option>
              <option value="Medical">{t.categoryOptions.Medical}</option>
              <option value="Other">{t.categoryOptions.Other}</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.subcategoryLabel}
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              required
            >
              <option value="">{t.subcategoryPlaceholder}</option>
              {subcategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {t.riskProfileTitle}: {riskLabel}
            </p>
            <p className="mt-1 text-sm text-slate-600">{t.riskProfileText}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t.brandLabel}</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.brandPlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">{t.modelLabel}</label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.modelPlaceholder}
              required
            />
          </div>

          {!isEnergy && !isBikeLike ? (
            <div>
              <label className="mb-2 block text-sm font-medium">
                {identifierLabel}
              </label>
              <input
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                placeholder={identifierPlaceholder}
                required
              />
            </div>
          ) : null}

          {isVehicleLike ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.vinLabel}
                </label>
                <input
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.vinPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.engineNumberLabel}
                </label>
                <input
                  value={engineNumber}
                  onChange={(e) => setEngineNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.engineNumberPlaceholder}
                />
              </div>
            </>
          ) : null}

          {isBikeLike ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.frameNumberLabel}
                </label>
                <input
                  value={frameNumber}
                  onChange={(e) => setFrameNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.frameNumberPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.batterySerialNumberLabel}
                </label>
                <div className="space-y-2">
                  {bikeBatterySerialNumbers.map((value, index) => (
                    <div key={`bike-battery-${index}`} className="flex gap-2">
                      <input
                        data-index={index}
                        value={value}
                        onChange={(e) =>
                          updateArrayField(
                            setBikeBatterySerialNumbers,
                            index,
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleArrayFieldKeyDown(
                            e,
                            bikeBatterySerialNumbers,
                            setBikeBatterySerialNumbers
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder={`${t.batterySerialNumberPlaceholder} ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(setBikeBatterySerialNumbers, index)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        {t.removeButton}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {t.serialNumbersHintBikeBatteries}
                </p>
              </div>
            </>
          ) : null}

          {isEnergy ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.solarPanelSerialNumbersLabel}
                </label>
                <div className="space-y-2">
                  {solarPanelSerialNumbers.map((value, index) => (
                    <div key={`solar-panel-${index}`} className="flex gap-2">
                      <input
                        data-index={index}
                        value={value}
                        onChange={(e) =>
                          updateArrayField(
                            setSolarPanelSerialNumbers,
                            index,
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleArrayFieldKeyDown(
                            e,
                            solarPanelSerialNumbers,
                            setSolarPanelSerialNumbers
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder={`${t.solarPanelSerialNumberPlaceholder} ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(setSolarPanelSerialNumbers, index)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        {t.removeButton}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {t.serialNumbersHintPanels}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.batterySerialNumberLabel}
                </label>
                <div className="space-y-2">
                  {batterySerialNumbers.map((value, index) => (
                    <div key={`battery-${index}`} className="flex gap-2">
                      <input
                        data-index={index}
                        value={value}
                        onChange={(e) =>
                          updateArrayField(
                            setBatterySerialNumbers,
                            index,
                            e.target.value
                          )
                        }
                        onKeyDown={(e) =>
                          handleArrayFieldKeyDown(
                            e,
                            batterySerialNumbers,
                            setBatterySerialNumbers
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder={`${t.batterySerialNumberPlaceholder} ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField(setBatterySerialNumbers, index)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                      >
                        {t.removeButton}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {t.serialNumbersHintBatteries}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.capacityLabel}
                </label>
                <input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.capacityPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.powerRatingLabel}
                </label>
                <input
                  value={powerRating}
                  onChange={(e) => setPowerRating(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.powerRatingPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.batchLotNumberLabel}
                </label>
                <input
                  value={batchLotNumber}
                  onChange={(e) => setBatchLotNumber(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.batchLotNumberPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.installationLocationLabel}
                </label>
                <input
                  value={installationLocation}
                  onChange={(e) => setInstallationLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.installationLocationPlaceholder}
                />
              </div>
            </>
          ) : null}

          {isAgriculture ? (
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.hoursOfOperationLabel}
              </label>
              <input
                value={hoursOfOperation}
                onChange={(e) => setHoursOfOperation(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                placeholder={t.hoursOfOperationPlaceholder}
              />
            </div>
          ) : null}

          {isMedical ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.deviceIdLabel}
                </label>
                <input
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.deviceIdPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.certificationLabel}
                </label>
                <input
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.certificationPlaceholder}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  {t.ownerOrganisationLabel}
                </label>
                <input
                  value={ownerOrganisation}
                  onChange={(e) => setOwnerOrganisation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  placeholder={t.ownerOrganisationPlaceholder}
                />
              </div>
            </>
          ) : null}

          {isMachine || isIndustrial ? (
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t.serialNumberLabel}
              </label>
              <input
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                placeholder={t.serialNumberPlaceholder}
              />
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-medium">{t.yearLabel}</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.yearPlaceholder}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t.countryLabel}
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder={t.countryPlaceholder}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>{t.declarationText}</span>
            </label>
          </div>
        </section>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? t.submitLoading : t.submitIdle}
        </button>
      </form>
    </>
  );
}
