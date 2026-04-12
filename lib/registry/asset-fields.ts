import type { Lang } from "@/lib/i18n/config";

type LocalizedText = Partial<Record<Lang, string>> & { en: string };

export type AssetFieldDefinition = {
  key: string;
  label: string;
  required: boolean;
  type: "text" | "list";
  maxItems?: number;
};

function pickText(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.en;
}

type AssetFieldConfig = {
  key: string;
  label: LocalizedText;
  required?: boolean;
  type?: "text" | "list";
  maxItems?: number;
};

const fieldCatalog = {
  vin: {
    key: "vin",
    label: {
      en: "VIN / Chassis number",
      es: "VIN / Numero de chasis",
      de: "VIN / Fahrgestellnummer",
      fr: "VIN / Numero de chassis",
      it: "VIN / Numero di telaio",
      nl: "VIN / Chassisnummer",
      pt: "VIN / Numero do chassis",
      ru: "VIN / Nomer shassi",
      zh: "VIN / Chejiahao",
      hi: "VIN / Chassis number",
      ar: "VIN / Raqm alshasih",
    },
    required: true,
  },
  registrationNumber: {
    key: "registrationNumber",
    label: {
      en: "Registration number",
      es: "Matricula",
      de: "Kennzeichen",
      fr: "Numero d'immatriculation",
      it: "Numero di immatricolazione",
      nl: "Kenteken",
      pt: "Matricula",
      ru: "Registratsionnyy nomer",
      zh: "Cheliang dengji hao",
      hi: "Registration number",
      ar: "Raqm altasjeel",
    },
  },
  fuelType: {
    key: "fuelType",
    label: {
      en: "Fuel type",
      es: "Tipo de combustible",
      de: "Kraftstoffart",
      fr: "Type de carburant",
      it: "Tipo di alimentazione",
      nl: "Brandstoftype",
      pt: "Tipo de combustivel",
      ru: "Tip topliva",
      zh: "Ranliao leixing",
      hi: "Fuel type",
      ar: "Naw altshaheel",
    },
  },
  engineSerialNumber: {
    key: "engineSerialNumber",
    label: {
      en: "Engine serial number",
      es: "Numero de serie del motor",
      de: "Motor-Seriennummer",
      fr: "Numero de serie du moteur",
      it: "Numero di serie del motore",
      nl: "Motorserienummer",
      pt: "Numero de serie do motor",
      ru: "Seriynyy nomer dvigatelya",
      zh: "Fadongji xuliehao",
      hi: "Engine serial number",
      ar: "Raqm tasalsul almuharik",
    },
  },
  chassisNumber: {
    key: "chassisNumber",
    label: {
      en: "Secondary chassis / frame number",
      es: "Numero secundario de chasis / bastidor",
      de: "Zweite Fahrgestell- / Rahmennummer",
      fr: "Numero secondaire de chassis / cadre",
      it: "Numero secondario di telaio",
      nl: "Secundair chassis- / framenummer",
      pt: "Numero secundario do chassis / quadro",
      ru: "Vtorichnyy nomer shassi / ramy",
      zh: "Fu chejia / chekuang hao",
      hi: "Secondary chassis / frame number",
      ar: "Raqm thanawi lilshasih / alitaar",
    },
  },
  hoursOfOperation: {
    key: "hoursOfOperation",
    label: {
      en: "Hours of operation",
      es: "Horas de funcionamiento",
      de: "Betriebsstunden",
      fr: "Heures de fonctionnement",
      it: "Ore di utilizzo",
      nl: "Bedrijfsuren",
      pt: "Horas de funcionamento",
      ru: "Chasy ekspluatatsii",
      zh: "Yunxing xiaoshi",
      hi: "Hours of operation",
      ar: "Sa'at alttashgheel",
    },
  },
  unitType: {
    key: "unitType",
    label: {
      en: "Unit type",
      es: "Tipo de unidad",
      de: "Anlagentyp",
      fr: "Type d'unite",
      it: "Tipo di unita",
      nl: "Type unit",
      pt: "Tipo de unidade",
      ru: "Tip ustanovki",
      zh: "Danwei leixing",
      hi: "Unit type",
      ar: "Naw alwahda",
    },
    required: true,
  },
  internalReference: {
    key: "internalReference",
    label: {
      en: "Internal reference",
      es: "Referencia interna",
      de: "Interne Referenz",
      fr: "Reference interne",
      it: "Riferimento interno",
      nl: "Interne referentie",
      pt: "Referencia interna",
      ru: "Vnutrennyaya ssylka",
      zh: "Neibu cankao",
      hi: "Internal reference",
      ar: "Marja dakhili",
    },
  },
  solarPanelSerialNumbers: {
    key: "solarPanelSerialNumbers",
    label: {
      en: "Solar panel serial numbers",
      es: "Numeros de serie de paneles solares",
      de: "Seriennummern der Solarmodule",
      fr: "Numeros de serie des panneaux solaires",
      it: "Numeri di serie dei pannelli solari",
      nl: "Serienummers van zonnepanelen",
      pt: "Numeros de serie dos paineis solares",
      ru: "Seriynye nomera solnechnykh paneley",
      zh: "Taiyangneng ban xuliehao",
      hi: "Solar panel serial numbers",
      ar: "Arqam tasalsul alalwah alshamsia",
    },
    required: true,
    type: "list",
  },
  batterySerialNumbers: {
    key: "batterySerialNumbers",
    label: {
      en: "Battery serial numbers",
      es: "Numeros de serie de baterias",
      de: "Seriennummern der Batterien",
      fr: "Numeros de serie des batteries",
      it: "Numeri di serie delle batterie",
      nl: "Serienummers van batterijen",
      pt: "Numeros de serie das baterias",
      ru: "Seriynye nomera batarey",
      zh: "Dianchi xuliehao",
      hi: "Battery serial numbers",
      ar: "Arqam tasalsul albatariat",
    },
    type: "list",
  },
  capacity: {
    key: "capacity",
    label: {
      en: "Capacity",
      es: "Capacidad",
      de: "Kapazitat",
      fr: "Capacite",
      it: "Capacita",
      nl: "Capaciteit",
      pt: "Capacidade",
      ru: "Emkost",
      zh: "Rongliang",
      hi: "Capacity",
      ar: "Alsaea",
    },
  },
  powerRating: {
    key: "powerRating",
    label: {
      en: "Power rating",
      es: "Potencia nominal",
      de: "Nennleistung",
      fr: "Puissance nominale",
      it: "Potenza nominale",
      nl: "Vermogen",
      pt: "Potencia nominal",
      ru: "Moshchnost",
      zh: "Gonglv dengji",
      hi: "Power rating",
      ar: "Alqudra alismia",
    },
  },
  batchLotNumber: {
    key: "batchLotNumber",
    label: {
      en: "Batch / lot number",
      es: "Numero de lote",
      de: "Chargen- / Losnummer",
      fr: "Numero de lot",
      it: "Numero di lotto",
      nl: "Batch- / lotnummer",
      pt: "Numero do lote",
      ru: "Nomer partii",
      zh: "Pici / pici hao",
      hi: "Batch / lot number",
      ar: "Raqm aldafaa / allot",
    },
  },
  installationLocation: {
    key: "installationLocation",
    label: {
      en: "Installation location",
      es: "Ubicacion de instalacion",
      de: "Installationsort",
      fr: "Lieu d'installation",
      it: "Luogo di installazione",
      nl: "Installatielocatie",
      pt: "Local de instalacao",
      ru: "Mesto ustanovki",
      zh: "Anzhuang didian",
      hi: "Installation location",
      ar: "Mawqie altarkeeb",
    },
  },
  frameNumber: {
    key: "frameNumber",
    label: {
      en: "Frame number",
      es: "Numero de cuadro",
      de: "Rahmennummer",
      fr: "Numero de cadre",
      it: "Numero di telaio",
      nl: "Framenummer",
      pt: "Numero do quadro",
      ru: "Nomer ramy",
      zh: "Chejiahao",
      hi: "Frame number",
      ar: "Raqm alitaar",
    },
    required: true,
  },
  secondBatterySerialNumber: {
    key: "secondBatterySerialNumber",
    label: {
      en: "Second battery serial number",
      es: "Numero de serie de la segunda bateria",
      de: "Seriennummer der zweiten Batterie",
      fr: "Numero de serie de la deuxieme batterie",
      it: "Numero di serie della seconda batteria",
      nl: "Serienummer van tweede batterij",
      pt: "Numero de serie da segunda bateria",
      ru: "Seriynyy nomer vtoroy batarei",
      zh: "Dier dianchi xuliehao",
      hi: "Second battery serial number",
      ar: "Raqm tasalsul albataria althania",
    },
  },
  deviceId: {
    key: "deviceId",
    label: {
      en: "Device ID",
      es: "ID del dispositivo",
      de: "Gerate-ID",
      fr: "ID de l'appareil",
      it: "ID dispositivo",
      nl: "Apparaat-ID",
      pt: "ID do dispositivo",
      ru: "ID ustroystva",
      zh: "Shebei ID",
      hi: "Device ID",
      ar: "Muarif aljihaz",
    },
  },
  certification: {
    key: "certification",
    label: {
      en: "Certification",
      es: "Certificacion",
      de: "Zertifizierung",
      fr: "Certification",
      it: "Certificazione",
      nl: "Certificering",
      pt: "Certificacao",
      ru: "Sertifikatsiya",
      zh: "Renzheng",
      hi: "Certification",
      ar: "Alshahada",
    },
  },
  ownerOrganisation: {
    key: "ownerOrganisation",
    label: {
      en: "Owner organisation",
      es: "Organizacion propietaria",
      de: "Eigentumerorganisation",
      fr: "Organisation proprietaire",
      it: "Organizzazione proprietaria",
      nl: "Eigenaarorganisatie",
      pt: "Organizacao proprietaria",
      ru: "Organizatsiya-vladelets",
      zh: "Suoyouzhe jigou",
      hi: "Owner organisation",
      ar: "Aljihah almalika",
    },
  },
  customCategory: {
    key: "customCategory",
    label: {
      en: "Custom category description",
      es: "Descripcion personalizada de la categoria",
      de: "Freie Kategoriebeschreibung",
      fr: "Description personnalisee de la categorie",
      it: "Descrizione personalizzata della categoria",
      nl: "Aangepaste categoriebeschrijving",
      pt: "Descricao personalizada da categoria",
      ru: "Polzovatelskoye opisaniye kategorii",
      zh: "Zidingyi leibie shuoming",
      hi: "Custom category description",
      ar: "Wasf mukhasas lilfiea",
    },
    required: true,
  },
} satisfies Record<string, AssetFieldConfig>;

function buildFields(
  configs: AssetFieldConfig[],
  lang: Lang
): AssetFieldDefinition[] {
  return configs.map((config) => ({
    key: config.key,
    label: pickText(config.label, lang),
    required: config.required ?? false,
    type: config.type ?? "text",
    maxItems: config.maxItems,
  }));
}

export function getDynamicFieldsForCategory(
  category: string,
  subcategory: string,
  lang: Lang = "en"
): AssetFieldDefinition[] {
  if (!category) {
    return [];
  }

  if (category === "vehicles") {
    return buildFields(
      [fieldCatalog.registrationNumber, fieldCatalog.fuelType],
      lang
    );
  }

  if (category === "machines" || category === "construction") {
    return buildFields(
      [fieldCatalog.engineSerialNumber, fieldCatalog.chassisNumber],
      lang
    );
  }

  if (category === "agriculture") {
    return buildFields(
      [
        fieldCatalog.engineSerialNumber,
        fieldCatalog.chassisNumber,
        fieldCatalog.hoursOfOperation,
      ],
      lang
    );
  }

  if (category === "industry") {
    return buildFields(
      [fieldCatalog.unitType, fieldCatalog.internalReference],
      lang
    );
  }

  if (category === "marine") {
    return buildFields(
      [fieldCatalog.chassisNumber, fieldCatalog.engineSerialNumber],
      lang
    );
  }

  if (category === "energy") {
    const fields: AssetFieldConfig[] = [
      {
        ...fieldCatalog.solarPanelSerialNumbers,
        required: subcategory === "solar_unit",
      },
      {
        ...fieldCatalog.batterySerialNumbers,
        required: subcategory === "battery_system",
      },
      fieldCatalog.capacity,
      fieldCatalog.powerRating,
      fieldCatalog.batchLotNumber,
      fieldCatalog.installationLocation,
    ];

    return buildFields(fields, lang);
  }

  if (category === "other") {
    const fields: AssetFieldConfig[] = [];

    if (
      subcategory === "bicycle" ||
      subcategory === "ebike" ||
      subcategory === "electric_scooter"
    ) {
      fields.push(fieldCatalog.frameNumber);

      if (subcategory === "ebike" || subcategory === "electric_scooter") {
        fields.push({
          ...fieldCatalog.batterySerialNumbers,
          required: true,
          maxItems: 2,
        });
        fields.push({ ...fieldCatalog.secondBatterySerialNumber });
      }
    }

    if (subcategory === "medical_device") {
      fields.push(
        fieldCatalog.deviceId,
        fieldCatalog.certification,
        fieldCatalog.ownerOrganisation
      );
    }

    if (subcategory === "other_asset") {
      fields.push(fieldCatalog.customCategory);
    }

    return buildFields(fields, lang);
  }

  return [];
}

export function getRequiredDynamicFieldKeys(
  category: string,
  subcategory = ""
): string[] {
  return getDynamicFieldsForCategory(category, subcategory, "en")
    .filter((field) => field.required)
    .map((field) => field.key);
}
