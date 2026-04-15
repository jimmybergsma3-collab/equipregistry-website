import type { Lang } from "@/lib/i18n/config";

export type RegistryCategoryKey =
  | "industry"
  | "vehicles"
  | "machines"
  | "agriculture"
  | "construction"
  | "marine"
  | "energy"
  | "other";

export type RegistrySubcategory = {
  value: string;
  label: string;
};

export type RegistryCategory = {
  value: RegistryCategoryKey;
  label: string;
  subcategories: RegistrySubcategory[];
};

type CategoryText = {
  label: string;
  subcategories: Record<string, string>;
};

const CATEGORY_TEXT: Record<Lang, Record<RegistryCategoryKey, CategoryText>> = {
  en: {
    industry: {
      label: "Industry",
      subcategories: {
        generator: "Generator",
        compressor: "Compressor",
        pump: "Pump",
        welding_equipment: "Welding Equipment",
        industrial_cleaner: "Industrial Cleaner",
        air_treatment_unit: "Air Treatment Unit",
        pressure_washer: "Pressure Washer",
        conveyor: "Conveyor",
        machine_tool: "Machine Tool",
        production_line_unit: "Production Line Unit",
        other_industry: "Other Industry Equipment",
      },
    },
    vehicles: {
      label: "Vehicles",
      subcategories: {
        passenger_car: "Passenger Car",
        van: "Van",
        truck: "Truck",
        trailer: "Trailer",
        camper: "Camper / Motorhome",
        caravan: "Caravan",
        motorcycle: "Motorcycle",
        scooter: "Scooter",
        bus: "Bus",
        pickup: "Pickup",
        special_vehicle: "Special Vehicle",
        other_vehicle: "Other Vehicle",
      },
    },
    machines: {
      label: "Machines",
      subcategories: {
        excavator: "Excavator",
        mini_excavator: "Mini Excavator",
        wheel_loader: "Wheel Loader / Shovel",
        backhoe_loader: "Backhoe Loader",
        skid_steer: "Skid Steer Loader",
        bulldozer: "Bulldozer",
        forklift: "Forklift",
        telehandler: "Telehandler",
        roller: "Roller",
        crane: "Crane",
        dumper: "Dumper",
        plate_compactor: "Plate Compactor",
        compactor: "Compactor",
        breaker: "Hydraulic Breaker",
        drilling_rig: "Drilling Rig",
        other_machine: "Other Machine",
      },
    },
    agriculture: {
      label: "Agriculture",
      subcategories: {
        tractor: "Tractor",
        harvester: "Harvester",
        sprayer: "Sprayer",
        plough: "Plough",
        baler: "Baler",
        seeder: "Seeder",
        cultivator: "Cultivator",
        mower: "Mower",
        trailer_agri: "Agricultural Trailer",
        other_agriculture: "Other Agricultural Equipment",
      },
    },
    construction: {
      label: "Construction",
      subcategories: {
        concrete_mixer: "Concrete Mixer",
        scissor_lift: "Scissor Lift",
        boom_lift: "Boom Lift",
        compactor: "Compactor",
        plate_compactor: "Plate Compactor",
        rammer: "Rammer",
        site_generator: "Site Generator",
        tower_light: "Tower Light",
        concrete_pump: "Concrete Pump",
        saw: "Construction Saw",
        other_construction: "Other Construction Equipment",
      },
    },
    marine: {
      label: "Marine",
      subcategories: {
        jet_ski: "Jet Ski",
        work_boat: "Work Boat",
        outboard_engine: "Outboard Engine",
        trailerable_boat: "Trailerable Boat",
        yacht: "Yacht",
        rib: "RIB / Inflatable Boat",
        sailboat: "Sailboat",
        other_marine: "Other Marine Equipment",
      },
    },
    energy: {
      label: "Energy",
      subcategories: {
        battery_system: "Battery System",
        solar_unit: "Solar Unit",
        transformer: "Transformer",
        power_module: "Power Module",
        inverter: "Inverter",
        charging_station: "Charging Station",
        generator_set: "Generator Set",
        other_energy: "Other Energy Equipment",
      },
    },
    other: {
      label: "Light Mobility & Other Assets",
      subcategories: {
        bicycle: "Bicycle",
        ebike: "E-Bike",
        electric_scooter: "Electric Scooter",
        tool: "Tool",
        medical_device: "Medical Device",
        office_equipment: "Office Equipment",
        other_asset: "Other Asset",
      },
    },
  },

  es: {
    industry: {
      label: "Industria",
      subcategories: {
        generator: "Generador",
        compressor: "Compresor",
        pump: "Bomba",
        welding_equipment: "Equipo de soldadura",
        industrial_cleaner: "Limpiador industrial",
        air_treatment_unit: "Unidad de tratamiento de aire",
        pressure_washer: "Hidrolimpiadora",
        conveyor: "Transportador",
        machine_tool: "Máquina herramienta",
        production_line_unit: "Unidad de línea de producción",
        other_industry: "Otro equipo industrial",
      },
    },
    vehicles: {
      label: "Vehículos",
      subcategories: {
        passenger_car: "Turismo",
        van: "Furgoneta",
        truck: "Camión",
        trailer: "Remolque",
        camper: "Camper / Autocaravana",
        caravan: "Caravana",
        motorcycle: "Motocicleta",
        scooter: "Scooter",
        bus: "Autobús",
        pickup: "Pickup",
        special_vehicle: "Vehículo especial",
        other_vehicle: "Otro vehículo",
      },
    },
    machines: {
      label: "Máquinas",
      subcategories: {
        excavator: "Excavadora",
        mini_excavator: "Mini excavadora",
        wheel_loader: "Pala cargadora / shovel",
        backhoe_loader: "Retroexcavadora",
        skid_steer: "Minicargadora",
        bulldozer: "Bulldozer",
        forklift: "Carretilla elevadora",
        telehandler: "Manipulador telescópico",
        roller: "Rodillo",
        crane: "Grúa",
        dumper: "Dumper",
        plate_compactor: "Placa compactadora",
        compactor: "Compactadora",
        breaker: "Martillo hidráulico",
        drilling_rig: "Perforadora",
        other_machine: "Otra máquina",
      },
    },
    agriculture: {
      label: "Agricultura",
      subcategories: {
        tractor: "Tractor",
        harvester: "Cosechadora",
        sprayer: "Pulverizador",
        plough: "Arado",
        baler: "Empacadora",
        seeder: "Sembradora",
        cultivator: "Cultivador",
        mower: "Segadora",
        trailer_agri: "Remolque agrícola",
        other_agriculture: "Otro equipo agrícola",
      },
    },
    construction: {
      label: "Construcción",
      subcategories: {
        concrete_mixer: "Hormigonera",
        scissor_lift: "Plataforma de tijera",
        boom_lift: "Plataforma articulada",
        compactor: "Compactadora",
        plate_compactor: "Placa compactadora",
        rammer: "Pisón",
        site_generator: "Generador de obra",
        tower_light: "Torre de iluminación",
        concrete_pump: "Bomba de hormigón",
        saw: "Sierra de construcción",
        other_construction: "Otro equipo de construcción",
      },
    },
    marine: {
      label: "Marina",
      subcategories: {
        jet_ski: "Moto de agua",
        work_boat: "Barco de trabajo",
        outboard_engine: "Motor fueraborda",
        trailerable_boat: "Barco remolcable",
        yacht: "Yate",
        rib: "Semirrígida / neumática",
        sailboat: "Velero",
        other_marine: "Otro equipo marino",
      },
    },
    energy: {
      label: "Energía",
      subcategories: {
        battery_system: "Sistema de baterías",
        solar_unit: "Unidad solar",
        transformer: "Transformador",
        power_module: "Módulo de potencia",
        inverter: "Inversor",
        charging_station: "Punto de carga",
        generator_set: "Grupo electrógeno",
        other_energy: "Otro equipo energético",
      },
    },
    other: {
      label: "Movilidad ligera y otros activos",
      subcategories: {
        bicycle: "Bicicleta",
        ebike: "Bicicleta eléctrica",
        electric_scooter: "Patinete eléctrico",
        tool: "Herramienta",
        medical_device: "Dispositivo médico",
        office_equipment: "Equipo de oficina",
        other_asset: "Otro activo",
      },
    },
  },

  de: {
    industry: {
      label: "Industrie",
      subcategories: {
        generator: "Generator",
        compressor: "Kompressor",
        pump: "Pumpe",
        welding_equipment: "Schweißgerät",
        industrial_cleaner: "Industrie-Reinigungsgerät",
        air_treatment_unit: "Luftaufbereitungsanlage",
        pressure_washer: "Hochdruckreiniger",
        conveyor: "Förderband",
        machine_tool: "Werkzeugmaschine",
        production_line_unit: "Produktionslinien-Einheit",
        other_industry: "Sonstige Industrieausrüstung",
      },
    },
    vehicles: {
      label: "Fahrzeuge",
      subcategories: {
        passenger_car: "Pkw",
        van: "Transporter",
        truck: "Lkw",
        trailer: "Anhänger",
        camper: "Camper / Wohnmobil",
        caravan: "Wohnwagen",
        motorcycle: "Motorrad",
        scooter: "Roller",
        bus: "Bus",
        pickup: "Pickup",
        special_vehicle: "Sonderfahrzeug",
        other_vehicle: "Sonstiges Fahrzeug",
      },
    },
    machines: {
      label: "Maschinen",
      subcategories: {
        excavator: "Bagger",
        mini_excavator: "Minibagger",
        wheel_loader: "Radlader / Schaufel",
        backhoe_loader: "Baggerlader",
        skid_steer: "Kompaktlader",
        bulldozer: "Planierraupe",
        forklift: "Gabelstapler",
        telehandler: "Teleskoplader",
        roller: "Walze",
        crane: "Kran",
        dumper: "Dumper",
        plate_compactor: "Rüttelplatte",
        compactor: "Verdichter",
        breaker: "Hydraulikhammer",
        drilling_rig: "Bohranlage",
        other_machine: "Sonstige Maschine",
      },
    },
    agriculture: {
      label: "Landwirtschaft",
      subcategories: {
        tractor: "Traktor",
        harvester: "Erntemaschine",
        sprayer: "Spritze",
        plough: "Pflug",
        baler: "Ballenpresse",
        seeder: "Sämaschine",
        cultivator: "Grubber",
        mower: "Mähwerk",
        trailer_agri: "Landwirtschaftlicher Anhänger",
        other_agriculture: "Sonstige Landtechnik",
      },
    },
    construction: {
      label: "Bauwesen",
      subcategories: {
        concrete_mixer: "Betonmischer",
        scissor_lift: "Scherenbühne",
        boom_lift: "Teleskopbühne",
        compactor: "Verdichter",
        plate_compactor: "Rüttelplatte",
        rammer: "Stampfer",
        site_generator: "Baustellengenerator",
        tower_light: "Lichtmast",
        concrete_pump: "Betonpumpe",
        saw: "Bausäge",
        other_construction: "Sonstige Bauausrüstung",
      },
    },
    marine: {
      label: "Marine",
      subcategories: {
        jet_ski: "Jet-Ski",
        work_boat: "Arbeitsboot",
        outboard_engine: "Außenbordmotor",
        trailerable_boat: "Trailerbares Boot",
        yacht: "Yacht",
        rib: "RIB / Schlauchboot",
        sailboat: "Segelboot",
        other_marine: "Sonstige Marineausrüstung",
      },
    },
    energy: {
      label: "Energie",
      subcategories: {
        battery_system: "Batteriesystem",
        solar_unit: "Solareinheit",
        transformer: "Transformator",
        power_module: "Leistungsmodul",
        inverter: "Wechselrichter",
        charging_station: "Ladestation",
        generator_set: "Stromerzeuger",
        other_energy: "Sonstige Energieausrüstung",
      },
    },
    other: {
      label: "Leichtmobilitaet und sonstige Assets",
      subcategories: {
        bicycle: "Fahrrad",
        ebike: "E-Bike",
        electric_scooter: "E-Scooter",
        tool: "Werkzeug",
        medical_device: "Medizinisches Gerät",
        office_equipment: "Büroausrüstung",
        other_asset: "Sonstiges Asset",
      },
    },
  },

  fr: {
    industry: {
      label: "Industrie",
      subcategories: {
        generator: "Générateur",
        compressor: "Compresseur",
        pump: "Pompe",
        welding_equipment: "Équipement de soudage",
        industrial_cleaner: "Nettoyeur industriel",
        air_treatment_unit: "Unité de traitement d’air",
        pressure_washer: "Nettoyeur haute pression",
        conveyor: "Convoyeur",
        machine_tool: "Machine-outil",
        production_line_unit: "Unité de ligne de production",
        other_industry: "Autre équipement industriel",
      },
    },
    vehicles: {
      label: "Véhicules",
      subcategories: {
        passenger_car: "Voiture particulière",
        van: "Fourgon",
        truck: "Camion",
        trailer: "Remorque",
        camper: "Camping-car",
        caravan: "Caravane",
        motorcycle: "Moto",
        scooter: "Scooter",
        bus: "Bus",
        pickup: "Pickup",
        special_vehicle: "Véhicule spécial",
        other_vehicle: "Autre véhicule",
      },
    },
    machines: {
      label: "Machines",
      subcategories: {
        excavator: "Excavatrice",
        mini_excavator: "Mini-pelle",
        wheel_loader: "Chargeuse sur pneus / shovel",
        backhoe_loader: "Tractopelle",
        skid_steer: "Mini-chargeuse",
        bulldozer: "Bulldozer",
        forklift: "Chariot élévateur",
        telehandler: "Chariot télescopique",
        roller: "Rouleau",
        crane: "Grue",
        dumper: "Dumper",
        plate_compactor: "Plaque vibrante",
        compactor: "Compacteur",
        breaker: "Brise-roche hydraulique",
        drilling_rig: "Foreuse",
        other_machine: "Autre machine",
      },
    },
    agriculture: {
      label: "Agriculture",
      subcategories: {
        tractor: "Tracteur",
        harvester: "Moissonneuse",
        sprayer: "Pulvérisateur",
        plough: "Charrue",
        baler: "Presse à balles",
        seeder: "Semoir",
        cultivator: "Cultivateur",
        mower: "Faucheuse",
        trailer_agri: "Remorque agricole",
        other_agriculture: "Autre équipement agricole",
      },
    },
    construction: {
      label: "Construction",
      subcategories: {
        concrete_mixer: "Bétonnière",
        scissor_lift: "Nacelle ciseaux",
        boom_lift: "Nacelle articulée",
        compactor: "Compacteur",
        plate_compactor: "Plaque vibrante",
        rammer: "Pilonneuse",
        site_generator: "Générateur de chantier",
        tower_light: "Tour d’éclairage",
        concrete_pump: "Pompe à béton",
        saw: "Scie de chantier",
        other_construction: "Autre équipement de construction",
      },
    },
    marine: {
      label: "Marine",
      subcategories: {
        jet_ski: "Jet-ski",
        work_boat: "Bateau de travail",
        outboard_engine: "Moteur hors-bord",
        trailerable_boat: "Bateau remorquable",
        yacht: "Yacht",
        rib: "Semi-rigide",
        sailboat: "Voilier",
        other_marine: "Autre équipement marin",
      },
    },
    energy: {
      label: "Énergie",
      subcategories: {
        battery_system: "Système de batteries",
        solar_unit: "Unité solaire",
        transformer: "Transformateur",
        power_module: "Module de puissance",
        inverter: "Onduleur",
        charging_station: "Borne de recharge",
        generator_set: "Groupe électrogène",
        other_energy: "Autre équipement énergétique",
      },
    },
    other: {
      label: "Mobilite legere et autres actifs",
      subcategories: {
        bicycle: "Vélo",
        ebike: "Vélo électrique",
        electric_scooter: "Trottinette électrique",
        tool: "Outil",
        medical_device: "Appareil médical",
        office_equipment: "Équipement de bureau",
        other_asset: "Autre actif",
      },
    },
  },

  it: {
    industry: {
      label: "Industria",
      subcategories: {
        generator: "Generatore",
        compressor: "Compressore",
        pump: "Pompa",
        welding_equipment: "Attrezzatura per saldatura",
        industrial_cleaner: "Pulitore industriale",
        air_treatment_unit: "Unità trattamento aria",
        pressure_washer: "Idropulitrice",
        conveyor: "Trasportatore",
        machine_tool: "Macchina utensile",
        production_line_unit: "Unità linea produttiva",
        other_industry: "Altra attrezzatura industriale",
      },
    },
    vehicles: {
      label: "Veicoli",
      subcategories: {
        passenger_car: "Autovettura",
        van: "Furgone",
        truck: "Camion",
        trailer: "Rimorchio",
        camper: "Camper",
        caravan: "Caravan",
        motorcycle: "Moto",
        scooter: "Scooter",
        bus: "Autobus",
        pickup: "Pickup",
        special_vehicle: "Veicolo speciale",
        other_vehicle: "Altro veicolo",
      },
    },
    machines: {
      label: "Macchine",
      subcategories: {
        excavator: "Escavatore",
        mini_excavator: "Mini escavatore",
        wheel_loader: "Pala gommata / shovel",
        backhoe_loader: "Terna",
        skid_steer: "Minipala",
        bulldozer: "Bulldozer",
        forklift: "Carrello elevatore",
        telehandler: "Sollevatore telescopico",
        roller: "Rullo",
        crane: "Gru",
        dumper: "Dumper",
        plate_compactor: "Piastra vibrante",
        compactor: "Compattatore",
        breaker: "Martello idraulico",
        drilling_rig: "Perforatrice",
        other_machine: "Altra macchina",
      },
    },
    agriculture: {
      label: "Agricoltura",
      subcategories: {
        tractor: "Trattore",
        harvester: "Mietitrebbia",
        sprayer: "Irroratrice",
        plough: "Aratro",
        baler: "Imballatrice",
        seeder: "Seminatrice",
        cultivator: "Coltivatore",
        mower: "Falciatrice",
        trailer_agri: "Rimorchio agricolo",
        other_agriculture: "Altra attrezzatura agricola",
      },
    },
    construction: {
      label: "Costruzioni",
      subcategories: {
        concrete_mixer: "Betoniera",
        scissor_lift: "Piattaforma a forbice",
        boom_lift: "Piattaforma a braccio",
        compactor: "Compattatore",
        plate_compactor: "Piastra vibrante",
        rammer: "Costipatore",
        site_generator: "Generatore da cantiere",
        tower_light: "Torre faro",
        concrete_pump: "Pompa per calcestruzzo",
        saw: "Sega da cantiere",
        other_construction: "Altra attrezzatura da costruzione",
      },
    },
    marine: {
      label: "Marina",
      subcategories: {
        jet_ski: "Moto d’acqua",
        work_boat: "Barca da lavoro",
        outboard_engine: "Motore fuoribordo",
        trailerable_boat: "Barca trasportabile su rimorchio",
        yacht: "Yacht",
        rib: "Gommone",
        sailboat: "Barca a vela",
        other_marine: "Altra attrezzatura marina",
      },
    },
    energy: {
      label: "Energia",
      subcategories: {
        battery_system: "Sistema batterie",
        solar_unit: "Unità solare",
        transformer: "Trasformatore",
        power_module: "Modulo di potenza",
        inverter: "Inverter",
        charging_station: "Stazione di ricarica",
        generator_set: "Gruppo elettrogeno",
        other_energy: "Altra attrezzatura energetica",
      },
    },
    other: {
      label: "Mobilita leggera e altri asset",
      subcategories: {
        bicycle: "Bicicletta",
        ebike: "Bici elettrica",
        electric_scooter: "Monopattino elettrico",
        tool: "Utensile",
        medical_device: "Dispositivo medico",
        office_equipment: "Attrezzatura da ufficio",
        other_asset: "Altro asset",
      },
    },
  },

  nl: {
    industry: {
      label: "Industrie",
      subcategories: {
        generator: "Generator",
        compressor: "Compressor",
        pump: "Pomp",
        welding_equipment: "Lasapparatuur",
        industrial_cleaner: "Industriële reiniger",
        air_treatment_unit: "Luchtbehandelingsunit",
        pressure_washer: "Hogedrukreiniger",
        conveyor: "Transportband",
        machine_tool: "Machinegereedschap",
        production_line_unit: "Productielijn-unit",
        other_industry: "Overige industriële apparatuur",
      },
    },
    vehicles: {
      label: "Voertuigen",
      subcategories: {
        passenger_car: "Personenauto",
        van: "Bestelbus",
        truck: "Vrachtwagen",
        trailer: "Aanhanger",
        camper: "Camper",
        caravan: "Caravan",
        motorcycle: "Motorfiets",
        scooter: "Scooter",
        bus: "Bus",
        pickup: "Pick-up",
        special_vehicle: "Speciaal voertuig",
        other_vehicle: "Overig voertuig",
      },
    },
    machines: {
      label: "Machines",
      subcategories: {
        excavator: "Graafmachine",
        mini_excavator: "Mini graver",
        wheel_loader: "Shovel / wiellader",
        backhoe_loader: "Graaflaadmachine",
        skid_steer: "Schranklader",
        bulldozer: "Bulldozer",
        forklift: "Heftruck",
        telehandler: "Verreiker",
        roller: "Wals",
        crane: "Kraan",
        dumper: "Dumper",
        plate_compactor: "Trilplaat",
        compactor: "Verdichter",
        breaker: "Hydraulische hamer",
        drilling_rig: "Boorinstallatie",
        other_machine: "Overige machine",
      },
    },
    agriculture: {
      label: "Landbouw",
      subcategories: {
        tractor: "Tractor",
        harvester: "Oogstmachine",
        sprayer: "Spuitmachine",
        plough: "Ploeg",
        baler: "Balenpers",
        seeder: "Zaaimachine",
        cultivator: "Cultivator",
        mower: "Maaier",
        trailer_agri: "Landbouwaanhanger",
        other_agriculture: "Overige landbouwapparatuur",
      },
    },
    construction: {
      label: "Bouw",
      subcategories: {
        concrete_mixer: "Betonmolen",
        scissor_lift: "Schaarhoogwerker",
        boom_lift: "Knik-/telescoophoogwerker",
        compactor: "Verdichter",
        plate_compactor: "Trilplaat",
        rammer: "Stamper",
        site_generator: "Bouwplaatsgenerator",
        tower_light: "Lichtmast",
        concrete_pump: "Betonpomp",
        saw: "Bouwzaag",
        other_construction: "Overige bouwapparatuur",
      },
    },
    marine: {
      label: "Maritiem",
      subcategories: {
        jet_ski: "Jetski",
        work_boat: "Werkboot",
        outboard_engine: "Buitenboordmotor",
        trailerable_boat: "Trailerbare boot",
        yacht: "Jacht",
        rib: "RIB / opblaasboot",
        sailboat: "Zeilboot",
        other_marine: "Overige maritieme apparatuur",
      },
    },
    energy: {
      label: "Energie",
      subcategories: {
        battery_system: "Batterijsysteem",
        solar_unit: "Zonne-unit",
        transformer: "Transformator",
        power_module: "Vermogensmodule",
        inverter: "Omvormer",
        charging_station: "Laadstation",
        generator_set: "Generatorset",
        other_energy: "Overige energieapparatuur",
      },
    },
    other: {
      label: "Lichte mobiliteit en overige assets",
      subcategories: {
        bicycle: "Fiets",
        ebike: "E-bike",
        electric_scooter: "Elektrische step",
        tool: "Gereedschap",
        medical_device: "Medisch apparaat",
        office_equipment: "Kantoorapparatuur",
        other_asset: "Overig asset",
      },
    },
  },

  pt: {
    industry: {
      label: "Indústria",
      subcategories: {
        generator: "Gerador",
        compressor: "Compressor",
        pump: "Bomba",
        welding_equipment: "Equipamento de soldadura",
        industrial_cleaner: "Limpador industrial",
        air_treatment_unit: "Unidade de tratamento de ar",
        pressure_washer: "Lavadora de pressão",
        conveyor: "Transportador",
        machine_tool: "Máquina-ferramenta",
        production_line_unit: "Unidade de linha de produção",
        other_industry: "Outro equipamento industrial",
      },
    },
    vehicles: {
      label: "Veículos",
      subcategories: {
        passenger_car: "Automóvel ligeiro",
        van: "Carrinha",
        truck: "Camião",
        trailer: "Reboque",
        camper: "Camper / autocaravana",
        caravan: "Caravana",
        motorcycle: "Motociclo",
        scooter: "Scooter",
        bus: "Autocarro",
        pickup: "Pickup",
        special_vehicle: "Veículo especial",
        other_vehicle: "Outro veículo",
      },
    },
    machines: {
      label: "Máquinas",
      subcategories: {
        excavator: "Escavadora",
        mini_excavator: "Mini escavadora",
        wheel_loader: "Pá carregadora / shovel",
        backhoe_loader: "Retroescavadora",
        skid_steer: "Mini carregadora",
        bulldozer: "Bulldozer",
        forklift: "Empilhador",
        telehandler: "Manipulador telescópico",
        roller: "Rolo",
        crane: "Grua",
        dumper: "Dumper",
        plate_compactor: "Placa vibratória",
        compactor: "Compactador",
        breaker: "Martelo hidráulico",
        drilling_rig: "Perfuradora",
        other_machine: "Outra máquina",
      },
    },
    agriculture: {
      label: "Agricultura",
      subcategories: {
        tractor: "Trator",
        harvester: "Ceifeira",
        sprayer: "Pulverizador",
        plough: "Arado",
        baler: "Enfardadeira",
        seeder: "Semeadora",
        cultivator: "Cultivador",
        mower: "Corta-relva / segadora",
        trailer_agri: "Reboque agrícola",
        other_agriculture: "Outro equipamento agrícola",
      },
    },
    construction: {
      label: "Construção",
      subcategories: {
        concrete_mixer: "Betoneira",
        scissor_lift: "Plataforma tesoura",
        boom_lift: "Plataforma articulada",
        compactor: "Compactador",
        plate_compactor: "Placa vibratória",
        rammer: "Compactador de percussão",
        site_generator: "Gerador de obra",
        tower_light: "Torre de iluminação",
        concrete_pump: "Bomba de betão",
        saw: "Serra de construção",
        other_construction: "Outro equipamento de construção",
      },
    },
    marine: {
      label: "Marítimo",
      subcategories: {
        jet_ski: "Moto de água",
        work_boat: "Barco de trabalho",
        outboard_engine: "Motor fora de borda",
        trailerable_boat: "Barco rebocável",
        yacht: "Iate",
        rib: "Semirrígido / insuflável",
        sailboat: "Veleiro",
        other_marine: "Outro equipamento marítimo",
      },
    },
    energy: {
      label: "Energia",
      subcategories: {
        battery_system: "Sistema de baterias",
        solar_unit: "Unidade solar",
        transformer: "Transformador",
        power_module: "Módulo de potência",
        inverter: "Inversor",
        charging_station: "Posto de carregamento",
        generator_set: "Grupo gerador",
        other_energy: "Outro equipamento energético",
      },
    },
    other: {
      label: "Mobilidade leve e outros ativos",
      subcategories: {
        bicycle: "Bicicleta",
        ebike: "Bicicleta elétrica",
        electric_scooter: "Trotinete elétrica",
        tool: "Ferramenta",
        medical_device: "Dispositivo médico",
        office_equipment: "Equipamento de escritório",
        other_asset: "Outro ativo",
      },
    },
  },

  ru: {
    industry: {
      label: "Промышленность",
      subcategories: {
        generator: "Генератор",
        compressor: "Компрессор",
        pump: "Насос",
        welding_equipment: "Сварочное оборудование",
        industrial_cleaner: "Промышленный очиститель",
        air_treatment_unit: "Установка обработки воздуха",
        pressure_washer: "Мойка высокого давления",
        conveyor: "Конвейер",
        machine_tool: "Станок",
        production_line_unit: "Узел производственной линии",
        other_industry: "Другое промышленное оборудование",
      },
    },
    vehicles: {
      label: "Транспорт",
      subcategories: {
        passenger_car: "Легковой автомобиль",
        van: "Фургон",
        truck: "Грузовик",
        trailer: "Прицеп",
        camper: "Кемпер / автодом",
        caravan: "Караван",
        motorcycle: "Мотоцикл",
        scooter: "Скутер",
        bus: "Автобус",
        pickup: "Пикап",
        special_vehicle: "Спецтранспорт",
        other_vehicle: "Другой транспорт",
      },
    },
    machines: {
      label: "Машины",
      subcategories: {
        excavator: "Экскаватор",
        mini_excavator: "Мини-экскаватор",
        wheel_loader: "Фронтальный погрузчик / shovel",
        backhoe_loader: "Экскаватор-погрузчик",
        skid_steer: "Мини-погрузчик",
        bulldozer: "Бульдозер",
        forklift: "Погрузчик",
        telehandler: "Телескопический погрузчик",
        roller: "Каток",
        crane: "Кран",
        dumper: "Самосвал-думпер",
        plate_compactor: "Виброплита",
        compactor: "Уплотнитель",
        breaker: "Гидромолот",
        drilling_rig: "Буровая установка",
        other_machine: "Другая машина",
      },
    },
    agriculture: {
      label: "Сельское хозяйство",
      subcategories: {
        tractor: "Трактор",
        harvester: "Комбайн",
        sprayer: "Опрыскиватель",
        plough: "Плуг",
        baler: "Пресс-подборщик",
        seeder: "Сеялка",
        cultivator: "Культиватор",
        mower: "Косилка",
        trailer_agri: "Сельхозприцеп",
        other_agriculture: "Другое сельхозоборудование",
      },
    },
    construction: {
      label: "Строительство",
      subcategories: {
        concrete_mixer: "Бетономешалка",
        scissor_lift: "Ножничный подъёмник",
        boom_lift: "Коленчатый подъёмник",
        compactor: "Уплотнитель",
        plate_compactor: "Виброплита",
        rammer: "Трамбовка",
        site_generator: "Строительный генератор",
        tower_light: "Осветительная мачта",
        concrete_pump: "Бетононасос",
        saw: "Строительная пила",
        other_construction: "Другое строительное оборудование",
      },
    },
    marine: {
      label: "Морская техника",
      subcategories: {
        jet_ski: "Гидроцикл",
        work_boat: "Рабочая лодка",
        outboard_engine: "Подвесной мотор",
        trailerable_boat: "Лодка на прицепе",
        yacht: "Яхта",
        rib: "RIB / надувная лодка",
        sailboat: "Парусная лодка",
        other_marine: "Другое морское оборудование",
      },
    },
    energy: {
      label: "Энергетика",
      subcategories: {
        battery_system: "Батарейная система",
        solar_unit: "Солнечная установка",
        transformer: "Трансформатор",
        power_module: "Силовой модуль",
        inverter: "Инвертор",
        charging_station: "Зарядная станция",
        generator_set: "Генераторная установка",
        other_energy: "Другое энергетическое оборудование",
      },
    },
    other: {
      label: "Легкая мобильность и прочие активы",
      subcategories: {
        bicycle: "Велосипед",
        ebike: "Электровелосипед",
        electric_scooter: "Электросамокат",
        tool: "Инструмент",
        medical_device: "Медицинское устройство",
        office_equipment: "Офисное оборудование",
        other_asset: "Другой актив",
      },
    },
  },

  zh: {
    industry: {
      label: "工业",
      subcategories: {
        generator: "发电机",
        compressor: "压缩机",
        pump: "泵",
        welding_equipment: "焊接设备",
        industrial_cleaner: "工业清洁设备",
        air_treatment_unit: "空气处理设备",
        pressure_washer: "高压清洗机",
        conveyor: "输送机",
        machine_tool: "机床",
        production_line_unit: "生产线单元",
        other_industry: "其他工业设备",
      },
    },
    vehicles: {
      label: "车辆",
      subcategories: {
        passenger_car: "乘用车",
        van: "厢式车",
        truck: "卡车",
        trailer: "拖车",
        camper: "房车",
        caravan: "旅行拖挂",
        motorcycle: "摩托车",
        scooter: "踏板车",
        bus: "巴士",
        pickup: "皮卡",
        special_vehicle: "特种车辆",
        other_vehicle: "其他车辆",
      },
    },
    machines: {
      label: "机械",
      subcategories: {
        excavator: "挖掘机",
        mini_excavator: "小型挖掘机",
        wheel_loader: "装载机 / shovel",
        backhoe_loader: "挖掘装载机",
        skid_steer: "滑移装载机",
        bulldozer: "推土机",
        forklift: "叉车",
        telehandler: "伸缩臂叉装车",
        roller: "压路机",
        crane: "起重机",
        dumper: "翻斗车",
        plate_compactor: "平板夯",
        compactor: "压实机",
        breaker: "液压破碎锤",
        drilling_rig: "钻机",
        other_machine: "其他机械",
      },
    },
    agriculture: {
      label: "农业",
      subcategories: {
        tractor: "拖拉机",
        harvester: "收割机",
        sprayer: "喷雾机",
        plough: "犁",
        baler: "打包机",
        seeder: "播种机",
        cultivator: "中耕机",
        mower: "割草机",
        trailer_agri: "农业拖车",
        other_agriculture: "其他农业设备",
      },
    },
    construction: {
      label: "建筑",
      subcategories: {
        concrete_mixer: "混凝土搅拌机",
        scissor_lift: "剪叉式升降机",
        boom_lift: "曲臂 / 直臂升降机",
        compactor: "压实机",
        plate_compactor: "平板夯",
        rammer: "冲击夯",
        site_generator: "工地发电机",
        tower_light: "照明灯塔",
        concrete_pump: "混凝土泵",
        saw: "建筑锯",
        other_construction: "其他建筑设备",
      },
    },
    marine: {
      label: "船舶",
      subcategories: {
        jet_ski: "摩托艇",
        work_boat: "工作船",
        outboard_engine: "舷外发动机",
        trailerable_boat: "可拖挂船只",
        yacht: "游艇",
        rib: "充气艇 / RIB",
        sailboat: "帆船",
        other_marine: "其他船舶设备",
      },
    },
    energy: {
      label: "能源",
      subcategories: {
        battery_system: "电池系统",
        solar_unit: "太阳能单元",
        transformer: "变压器",
        power_module: "电源模块",
        inverter: "逆变器",
        charging_station: "充电站",
        generator_set: "发电机组",
        other_energy: "其他能源设备",
      },
    },
    other: {
      label: "轻型出行与其他资产",
      subcategories: {
        bicycle: "自行车",
        ebike: "电动自行车",
        electric_scooter: "电动滑板车",
        tool: "工具",
        medical_device: "医疗设备",
        office_equipment: "办公设备",
        other_asset: "其他资产",
      },
    },
  },

  hi: {
    industry: {
      label: "उद्योग",
      subcategories: {
        generator: "जनरेटर",
        compressor: "कंप्रेसर",
        pump: "पंप",
        welding_equipment: "वेल्डिंग उपकरण",
        industrial_cleaner: "औद्योगिक क्लीनर",
        air_treatment_unit: "एयर ट्रीटमेंट यूनिट",
        pressure_washer: "प्रेशर वॉशर",
        conveyor: "कन्वेयर",
        machine_tool: "मशीन टूल",
        production_line_unit: "प्रोडक्शन लाइन यूनिट",
        other_industry: "अन्य औद्योगिक उपकरण",
      },
    },
    vehicles: {
      label: "वाहन",
      subcategories: {
        passenger_car: "पैसेंजर कार",
        van: "वैन",
        truck: "ट्रक",
        trailer: "ट्रेलर",
        camper: "कैंपर / मोटरहोम",
        caravan: "कारवां",
        motorcycle: "मोटरसाइकिल",
        scooter: "स्कूटर",
        bus: "बस",
        pickup: "पिकअप",
        special_vehicle: "विशेष वाहन",
        other_vehicle: "अन्य वाहन",
      },
    },
    machines: {
      label: "मशीनें",
      subcategories: {
        excavator: "एक्स्कवेटर",
        mini_excavator: "मिनी एक्स्कवेटर",
        wheel_loader: "व्हील लोडर / shovel",
        backhoe_loader: "बैकहो लोडर",
        skid_steer: "स्किड स्टीयर लोडर",
        bulldozer: "बुलडोज़र",
        forklift: "फोर्कलिफ्ट",
        telehandler: "टेलीहैंडलर",
        roller: "रोलर",
        crane: "क्रेन",
        dumper: "डम्पर",
        plate_compactor: "प्लेट कम्पैक्टर",
        compactor: "कम्पैक्टर",
        breaker: "हाइड्रोलिक ब्रेकर",
        drilling_rig: "ड्रिलिंग रिग",
        other_machine: "अन्य मशीन",
      },
    },
    agriculture: {
      label: "कृषि",
      subcategories: {
        tractor: "ट्रैक्टर",
        harvester: "हार्वेस्टर",
        sprayer: "स्प्रेयर",
        plough: "हल",
        baler: "बेलर",
        seeder: "सीडर",
        cultivator: "कल्टीवेटर",
        mower: "मॉवर",
        trailer_agri: "कृषि ट्रेलर",
        other_agriculture: "अन्य कृषि उपकरण",
      },
    },
    construction: {
      label: "निर्माण",
      subcategories: {
        concrete_mixer: "कंक्रीट मिक्सर",
        scissor_lift: "सिज़र लिफ्ट",
        boom_lift: "बूम लिफ्ट",
        compactor: "कम्पैक्टर",
        plate_compactor: "प्लेट कम्पैक्टर",
        rammer: "रैमर",
        site_generator: "साइट जनरेटर",
        tower_light: "टॉवर लाइट",
        concrete_pump: "कंक्रीट पंप",
        saw: "निर्माण आरी",
        other_construction: "अन्य निर्माण उपकरण",
      },
    },
    marine: {
      label: "समुद्री",
      subcategories: {
        jet_ski: "जेट स्की",
        work_boat: "वर्क बोट",
        outboard_engine: "आउटबोर्ड इंजन",
        trailerable_boat: "ट्रेलर योग्य नाव",
        yacht: "यॉट",
        rib: "RIB / इन्फ्लेटेबल बोट",
        sailboat: "सेलबोट",
        other_marine: "अन्य समुद्री उपकरण",
      },
    },
    energy: {
      label: "ऊर्जा",
      subcategories: {
        battery_system: "बैटरी सिस्टम",
        solar_unit: "सोलर यूनिट",
        transformer: "ट्रांसफॉर्मर",
        power_module: "पावर मॉड्यूल",
        inverter: "इन्वर्टर",
        charging_station: "चार्जिंग स्टेशन",
        generator_set: "जनरेटर सेट",
        other_energy: "अन्य ऊर्जा उपकरण",
      },
    },
    other: {
      label: "हल्की गतिशीलता और अन्य एसेट",
      subcategories: {
        bicycle: "साइकिल",
        ebike: "ई-बाइक",
        electric_scooter: "इलेक्ट्रिक स्कूटर",
        tool: "उपकरण",
        medical_device: "मेडिकल डिवाइस",
        office_equipment: "ऑफिस उपकरण",
        other_asset: "अन्य एसेट",
      },
    },
  },

  ar: {
    industry: {
      label: "الصناعة",
      subcategories: {
        generator: "مولد",
        compressor: "ضاغط",
        pump: "مضخة",
        welding_equipment: "معدات لحام",
        industrial_cleaner: "منظف صناعي",
        air_treatment_unit: "وحدة معالجة الهواء",
        pressure_washer: "غسالة ضغط",
        conveyor: "ناقل",
        machine_tool: "آلة صناعية",
        production_line_unit: "وحدة خط إنتاج",
        other_industry: "معدات صناعية أخرى",
      },
    },
    vehicles: {
      label: "المركبات",
      subcategories: {
        passenger_car: "سيارة ركاب",
        van: "فان",
        truck: "شاحنة",
        trailer: "مقطورة",
        camper: "كامبر / منزل متنقل",
        caravan: "كارافان",
        motorcycle: "دراجة نارية",
        scooter: "سكوتر",
        bus: "حافلة",
        pickup: "بيك أب",
        special_vehicle: "مركبة خاصة",
        other_vehicle: "مركبة أخرى",
      },
    },
    machines: {
      label: "الآلات",
      subcategories: {
        excavator: "حفارة",
        mini_excavator: "حفارة صغيرة",
        wheel_loader: "شيول / لودر",
        backhoe_loader: "حفار لودر",
        skid_steer: "لودر انزلاقي",
        bulldozer: "بلدوزر",
        forklift: "رافعة شوكية",
        telehandler: "مناور تلسكوبي",
        roller: "مدحلة",
        crane: "رافعة",
        dumper: "دامبر",
        plate_compactor: "هراس لوحي",
        compactor: "ضاغط",
        breaker: "مطرقة هيدروليكية",
        drilling_rig: "منصة حفر",
        other_machine: "آلة أخرى",
      },
    },
    agriculture: {
      label: "الزراعة",
      subcategories: {
        tractor: "جرار",
        harvester: "حصادة",
        sprayer: "رشاش",
        plough: "محراث",
        baler: "مكبس بالات",
        seeder: "بذارة",
        cultivator: "عزاقة",
        mower: "جزازة",
        trailer_agri: "مقطورة زراعية",
        other_agriculture: "معدات زراعية أخرى",
      },
    },
    construction: {
      label: "الإنشاءات",
      subcategories: {
        concrete_mixer: "خلاطة خرسانة",
        scissor_lift: "رافعة مقصية",
        boom_lift: "رافعة ذراع",
        compactor: "ضاغط",
        plate_compactor: "هراس لوحي",
        rammer: "دكاك",
        site_generator: "مولد موقع",
        tower_light: "برج إنارة",
        concrete_pump: "مضخة خرسانة",
        saw: "منشار بناء",
        other_construction: "معدات إنشاءات أخرى",
      },
    },
    marine: {
      label: "البحري",
      subcategories: {
        jet_ski: "جيت سكي",
        work_boat: "قارب عمل",
        outboard_engine: "محرك خارجي",
        trailerable_boat: "قارب قابل للسحب",
        yacht: "يخت",
        rib: "قارب مطاطي / RIB",
        sailboat: "قارب شراعي",
        other_marine: "معدات بحرية أخرى",
      },
    },
    energy: {
      label: "الطاقة",
      subcategories: {
        battery_system: "نظام بطاريات",
        solar_unit: "وحدة شمسية",
        transformer: "محول",
        power_module: "وحدة طاقة",
        inverter: "عاكس",
        charging_station: "محطة شحن",
        generator_set: "مجموعة مولدات",
        other_energy: "معدات طاقة أخرى",
      },
    },
    other: {
      label: "التنقل الخفيف والأصول الأخرى",
      subcategories: {
        bicycle: "دراجة",
        ebike: "دراجة كهربائية",
        electric_scooter: "سكوتر كهربائي",
        tool: "أداة",
        medical_device: "جهاز طبي",
        office_equipment: "معدات مكتبية",
        other_asset: "أصل آخر",
      },
    },
  },
};

const CATEGORY_ORDER: RegistryCategoryKey[] = [
  "industry",
  "vehicles",
  "machines",
  "agriculture",
  "construction",
  "marine",
  "energy",
  "other",
];

const CATEGORY_ALIASES: Record<string, RegistryCategoryKey> = {
  industry: "industry",
  industrial: "industry",
  vehicle: "vehicles",
  vehicles: "vehicles",
  trailer: "vehicles",
  trailers: "vehicles",
  machine: "machines",
  machines: "machines",
  equipment: "machines",
  agriculture: "agriculture",
  construction: "construction",
  marine: "marine",
  energy: "energy",
  bike: "other",
  bikes: "other",
  bikelightmobility: "other",
  light_mobility: "other",
  medical: "other",
  other: "other",
};

function normalizeRegistryValue(value: string | null | undefined) {
  return value
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") ?? "";
}

function resolveCategoryKey(value: string | null | undefined) {
  const normalized = normalizeRegistryValue(value);

  if (!normalized) {
    return null;
  }

  if (normalized in CATEGORY_ALIASES) {
    return CATEGORY_ALIASES[normalized];
  }

  return CATEGORY_ORDER.find((category) => category === normalized) ?? null;
}

function buildCategories(lang: Lang): RegistryCategory[] {
  return CATEGORY_ORDER.map((categoryKey) => {
    const entry = CATEGORY_TEXT[lang]?.[categoryKey] ?? CATEGORY_TEXT.en[categoryKey];

    return {
      value: categoryKey,
      label: entry.label,
      subcategories: Object.entries(entry.subcategories).map(([value, label]) => ({
        value,
        label,
      })),
    };
  });
}

export function getRegistryCategories(lang: Lang): RegistryCategory[] {
  return buildCategories(lang);
}

export function getCategoryByValue(value: string | null | undefined, lang: Lang) {
  const resolvedCategory = resolveCategoryKey(value);

  if (!resolvedCategory) return null;

  return (
    getRegistryCategories(lang).find(
      (category) => category.value === resolvedCategory
    ) ?? null
  );
}

export function getSubcategoriesByCategory(
  value: string | null | undefined,
  lang: Lang
) {
  return getCategoryByValue(value, lang)?.subcategories ?? [];
}

export function getSubcategoryByValue(
  category: string | null | undefined,
  subcategory: string | null | undefined,
  lang: Lang
) {
  const normalizedSubcategory = normalizeRegistryValue(subcategory);

  if (!normalizedSubcategory) {
    return null;
  }

  return (
    getSubcategoriesByCategory(category, lang).find(
      (item) => normalizeRegistryValue(item.value) === normalizedSubcategory
    ) ?? null
  );
}
