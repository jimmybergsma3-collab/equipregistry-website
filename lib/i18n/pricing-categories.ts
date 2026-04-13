import type { Lang } from "@/lib/i18n/config";
import type { AssetPricingCategory } from "@/lib/registry/pricing";

type PricingCategoryContent = {
  name: string;
  description: string;
};

type PricingCatalogPageContent = {
  subtitle: string;
};

const PRICING_CATEGORY_CONTENT: Record<
  Lang,
  Record<AssetPricingCategory, PricingCategoryContent>
> = {
  en: {
    light_mobility: {
      name: "Light Mobility Registration",
      description:
        "Light Mobility: Digital registration of light mobility assets including bicycles, e-bikes, and electric scooters. Includes verification and digital asset passport.",
    },
    vehicles: {
      name: "Vehicle Registration",
      description:
        "Vehicles: Digital registration of vehicles including cars, vans, trucks, and campers. Includes ownership verification, history validation, and a digital asset passport.",
    },
    machines: {
      name: "Machine Registration",
      description:
        "Machines: Digital registration of machinery and equipment. Includes ownership verification, origin validation, and a digital asset passport.",
    },
    agriculture: {
      name: "Agricultural Equipment Registration",
      description:
        "Agriculture: Digital registration of agricultural equipment and machinery. Includes ownership verification, origin validation, and a digital asset passport.",
    },
    construction: {
      name: "Construction Equipment Registration",
      description:
        "Construction: Digital registration of construction equipment and machinery. Includes ownership verification, origin validation, and a digital asset passport.",
    },
    marine: {
      name: "Marine Asset Registration",
      description:
        "Marine: Digital registration of marine assets including boats and watercraft. Includes ownership verification and a digital asset passport.",
    },
    energy: {
      name: "Energy Asset Registration",
      description:
        "Energy: Digital registration of energy-related assets such as solar panels, battery systems, and installations. Includes verification and a digital asset passport.",
    },
    industry: {
      name: "Industrial Equipment Registration",
      description:
        "Industry: Digital registration of industrial equipment and machinery. Includes ownership verification, origin validation, and a digital asset passport.",
    },
  },
  es: {
    light_mobility: {
      name: "Registro de movilidad ligera",
      description:
        "Movilidad ligera: Registro digital de activos de movilidad ligera, incluidas bicicletas, bicicletas eléctricas y patinetes eléctricos. Incluye verificación y pasaporte digital del activo.",
    },
    vehicles: {
      name: "Registro de vehículos",
      description:
        "Vehículos: Registro digital de vehículos, incluidos coches, furgonetas, camiones y campers. Incluye verificación de titularidad, validación de historial y pasaporte digital del activo.",
    },
    machines: {
      name: "Registro de maquinaria",
      description:
        "Máquinas: Registro digital de maquinaria y equipos. Incluye verificación de titularidad, validación de origen y pasaporte digital del activo.",
    },
    agriculture: {
      name: "Registro de equipos agrícolas",
      description:
        "Agricultura: Registro digital de equipos y maquinaria agrícola. Incluye verificación de titularidad, validación de origen y pasaporte digital del activo.",
    },
    construction: {
      name: "Registro de equipos de construcción",
      description:
        "Construcción: Registro digital de equipos y maquinaria de construcción. Incluye verificación de titularidad, validación de origen y pasaporte digital del activo.",
    },
    marine: {
      name: "Registro de activos marinos",
      description:
        "Marino: Registro digital de activos marinos, incluidas embarcaciones y otros vehículos acuáticos. Incluye verificación de titularidad y pasaporte digital del activo.",
    },
    energy: {
      name: "Registro de activos energéticos",
      description:
        "Energía: Registro digital de activos relacionados con la energía, como paneles solares, sistemas de baterías e instalaciones. Incluye verificación y pasaporte digital del activo.",
    },
    industry: {
      name: "Registro de equipos industriales",
      description:
        "Industria: Registro digital de equipos y maquinaria industrial. Incluye verificación de titularidad, validación de origen y pasaporte digital del activo.",
    },
  },
  de: {
    light_mobility: {
      name: "Registrierung für leichte Mobilität",
      description:
        "Leichte Mobilität: Digitale Registrierung von Assets der leichten Mobilität einschließlich Fahrrädern, E-Bikes und E-Scootern. Einschließlich Verifizierung und digitalem Asset-Pass.",
    },
    vehicles: {
      name: "Fahrzeugregistrierung",
      description:
        "Fahrzeuge: Digitale Registrierung von Fahrzeugen einschließlich Autos, Transportern, Lkw und Campern. Einschließlich Eigentumsprüfung, Historienvalidierung und digitalem Asset-Pass.",
    },
    machines: {
      name: "Maschinenregistrierung",
      description:
        "Maschinen: Digitale Registrierung von Maschinen und Ausrüstung. Einschließlich Eigentumsprüfung, Herkunftsvalidierung und digitalem Asset-Pass.",
    },
    agriculture: {
      name: "Registrierung landwirtschaftlicher Geräte",
      description:
        "Landwirtschaft: Digitale Registrierung landwirtschaftlicher Geräte und Maschinen. Einschließlich Eigentumsprüfung, Herkunftsvalidierung und digitalem Asset-Pass.",
    },
    construction: {
      name: "Registrierung von Baugeräten",
      description:
        "Bauwesen: Digitale Registrierung von Baugeräten und Baumaschinen. Einschließlich Eigentumsprüfung, Herkunftsvalidierung und digitalem Asset-Pass.",
    },
    marine: {
      name: "Registrierung maritimer Assets",
      description:
        "Marine: Digitale Registrierung maritimer Assets einschließlich Boote und Wasserfahrzeuge. Einschließlich Eigentumsprüfung und digitalem Asset-Pass.",
    },
    energy: {
      name: "Registrierung von Energie-Assets",
      description:
        "Energie: Digitale Registrierung energiebezogener Assets wie Solarpanels, Batteriesysteme und Installationen. Einschließlich Verifizierung und digitalem Asset-Pass.",
    },
    industry: {
      name: "Registrierung industrieller Ausrüstung",
      description:
        "Industrie: Digitale Registrierung industrieller Ausrüstung und Maschinen. Einschließlich Eigentumsprüfung, Herkunftsvalidierung und digitalem Asset-Pass.",
    },
  },
  fr: {
    light_mobility: {
      name: "Enregistrement mobilité légère",
      description:
        "Mobilité légère : Enregistrement numérique des actifs de mobilité légère, y compris les vélos, vélos électriques et trottinettes électriques. Comprend la vérification et un passeport numérique de l’actif.",
    },
    vehicles: {
      name: "Enregistrement de véhicule",
      description:
        "Véhicules : Enregistrement numérique des véhicules, y compris voitures, fourgons, camions et camping-cars. Comprend la vérification de propriété, la validation de l’historique et un passeport numérique de l’actif.",
    },
    machines: {
      name: "Enregistrement de machine",
      description:
        "Machines : Enregistrement numérique des machines et équipements. Comprend la vérification de propriété, la validation de l’origine et un passeport numérique de l’actif.",
    },
    agriculture: {
      name: "Enregistrement d’équipement agricole",
      description:
        "Agriculture : Enregistrement numérique des équipements et machines agricoles. Comprend la vérification de propriété, la validation de l’origine et un passeport numérique de l’actif.",
    },
    construction: {
      name: "Enregistrement d’équipement de construction",
      description:
        "Construction : Enregistrement numérique des équipements et machines de construction. Comprend la vérification de propriété, la validation de l’origine et un passeport numérique de l’actif.",
    },
    marine: {
      name: "Enregistrement d’actif marin",
      description:
        "Marine : Enregistrement numérique des actifs marins, y compris les bateaux et embarcations. Comprend la vérification de propriété et un passeport numérique de l’actif.",
    },
    energy: {
      name: "Enregistrement d’actif énergétique",
      description:
        "Énergie : Enregistrement numérique des actifs liés à l’énergie, tels que panneaux solaires, systèmes de batteries et installations. Comprend la vérification et un passeport numérique de l’actif.",
    },
    industry: {
      name: "Enregistrement d’équipement industriel",
      description:
        "Industrie : Enregistrement numérique des équipements et machines industriels. Comprend la vérification de propriété, la validation de l’origine et un passeport numérique de l’actif.",
    },
  },
  it: {
    light_mobility: {
      name: "Registrazione mobilità leggera",
      description:
        "Mobilità leggera: Registrazione digitale di asset per la mobilità leggera, comprese biciclette, e-bike e monopattini elettrici. Include verifica e passaporto digitale dell’asset.",
    },
    vehicles: {
      name: "Registrazione veicolo",
      description:
        "Veicoli: Registrazione digitale di veicoli, comprese auto, furgoni, camion e camper. Include verifica della proprietà, validazione dello storico e passaporto digitale dell’asset.",
    },
    machines: {
      name: "Registrazione macchina",
      description:
        "Macchine: Registrazione digitale di macchinari e attrezzature. Include verifica della proprietà, validazione dell’origine e passaporto digitale dell’asset.",
    },
    agriculture: {
      name: "Registrazione attrezzature agricole",
      description:
        "Agricoltura: Registrazione digitale di attrezzature e macchinari agricoli. Include verifica della proprietà, validazione dell’origine e passaporto digitale dell’asset.",
    },
    construction: {
      name: "Registrazione attrezzature da costruzione",
      description:
        "Costruzioni: Registrazione digitale di attrezzature e macchinari da costruzione. Include verifica della proprietà, validazione dell’origine e passaporto digitale dell’asset.",
    },
    marine: {
      name: "Registrazione asset marino",
      description:
        "Marina: Registrazione digitale di asset marini, comprese barche e mezzi nautici. Include verifica della proprietà e passaporto digitale dell’asset.",
    },
    energy: {
      name: "Registrazione asset energetico",
      description:
        "Energia: Registrazione digitale di asset legati all’energia come pannelli solari, sistemi di batterie e installazioni. Include verifica e passaporto digitale dell’asset.",
    },
    industry: {
      name: "Registrazione attrezzature industriali",
      description:
        "Industria: Registrazione digitale di attrezzature e macchinari industriali. Include verifica della proprietà, validazione dell’origine e passaporto digitale dell’asset.",
    },
  },
  nl: {
    light_mobility: {
      name: "Registratie lichte mobiliteit",
      description:
        "Lichte mobiliteit: Digitale registratie van lichte mobiliteitsassets zoals fietsen, e-bikes en elektrische steps. Inclusief verificatie en een digitaal assetpaspoort.",
    },
    vehicles: {
      name: "Voertuigregistratie",
      description:
        "Voertuigen: Digitale registratie van voertuigen zoals auto’s, bestelwagens, vrachtwagens en campers. Inclusief eigendomsverificatie, validatie van de historie en een digitaal assetpaspoort.",
    },
    machines: {
      name: "Machineregistratie",
      description:
        "Machines: Digitale registratie van machines en materieel. Inclusief eigendomsverificatie, validatie van de herkomst en een digitaal assetpaspoort.",
    },
    agriculture: {
      name: "Registratie van landbouwmaterieel",
      description:
        "Landbouw: Digitale registratie van landbouwmaterieel en landbouwmachines. Inclusief eigendomsverificatie, validatie van de herkomst en een digitaal assetpaspoort.",
    },
    construction: {
      name: "Registratie van bouwmaterieel",
      description:
        "Bouw: Digitale registratie van bouwmaterieel en bouwmachines. Inclusief eigendomsverificatie, validatie van de herkomst en een digitaal assetpaspoort.",
    },
    marine: {
      name: "Registratie van maritieme assets",
      description:
        "Maritiem: Digitale registratie van maritieme assets zoals boten en vaartuigen. Inclusief eigendomsverificatie en een digitaal assetpaspoort.",
    },
    energy: {
      name: "Registratie van energie-assets",
      description:
        "Energie: Digitale registratie van energiegerelateerde assets zoals zonnepanelen, batterijsystemen en installaties. Inclusief verificatie en een digitaal assetpaspoort.",
    },
    industry: {
      name: "Registratie van industriële apparatuur",
      description:
        "Industrie: Digitale registratie van industriële apparatuur en machines. Inclusief eigendomsverificatie, validatie van de herkomst en een digitaal assetpaspoort.",
    },
  },
  pt: {
    light_mobility: {
      name: "Registo de mobilidade leve",
      description:
        "Mobilidade leve: Registo digital de ativos de mobilidade leve, incluindo bicicletas, bicicletas elétricas e trotinetes elétricas. Inclui verificação e passaporte digital do ativo.",
    },
    vehicles: {
      name: "Registo de veículo",
      description:
        "Veículos: Registo digital de veículos, incluindo carros, carrinhas, camiões e autocaravanas. Inclui verificação de propriedade, validação de histórico e passaporte digital do ativo.",
    },
    machines: {
      name: "Registo de máquina",
      description:
        "Máquinas: Registo digital de maquinaria e equipamento. Inclui verificação de propriedade, validação de origem e passaporte digital do ativo.",
    },
    agriculture: {
      name: "Registo de equipamento agrícola",
      description:
        "Agricultura: Registo digital de equipamento e maquinaria agrícola. Inclui verificação de propriedade, validação de origem e passaporte digital do ativo.",
    },
    construction: {
      name: "Registo de equipamento de construção",
      description:
        "Construção: Registo digital de equipamento e maquinaria de construção. Inclui verificação de propriedade, validação de origem e passaporte digital do ativo.",
    },
    marine: {
      name: "Registo de ativo marítimo",
      description:
        "Marítimo: Registo digital de ativos marítimos, incluindo barcos e embarcações. Inclui verificação de propriedade e passaporte digital do ativo.",
    },
    energy: {
      name: "Registo de ativo energético",
      description:
        "Energia: Registo digital de ativos relacionados com energia, como painéis solares, sistemas de baterias e instalações. Inclui verificação e passaporte digital do ativo.",
    },
    industry: {
      name: "Registo de equipamento industrial",
      description:
        "Indústria: Registo digital de equipamento e maquinaria industrial. Inclui verificação de propriedade, validação de origem e passaporte digital do ativo.",
    },
  },
  ru: {
    light_mobility: {
      name: "Регистрация легкой мобильности",
      description:
        "Легкая мобильность: цифровая регистрация средств легкой мобильности, включая велосипеды, электровелосипеды и электросамокаты. Включает проверку и цифровой паспорт актива.",
    },
    vehicles: {
      name: "Регистрация транспортного средства",
      description:
        "Транспорт: цифровая регистрация транспортных средств, включая автомобили, фургоны, грузовики и кемперы. Включает проверку права собственности, проверку истории и цифровой паспорт актива.",
    },
    machines: {
      name: "Регистрация машины",
      description:
        "Машины: цифровая регистрация техники и оборудования. Включает проверку права собственности, проверку происхождения и цифровой паспорт актива.",
    },
    agriculture: {
      name: "Регистрация сельскохозяйственного оборудования",
      description:
        "Сельское хозяйство: цифровая регистрация сельскохозяйственной техники и оборудования. Включает проверку права собственности, проверку происхождения и цифровой паспорт актива.",
    },
    construction: {
      name: "Регистрация строительного оборудования",
      description:
        "Строительство: цифровая регистрация строительной техники и оборудования. Включает проверку права собственности, проверку происхождения и цифровой паспорт актива.",
    },
    marine: {
      name: "Регистрация морского актива",
      description:
        "Морская категория: цифровая регистрация морских активов, включая лодки и водную технику. Включает проверку права собственности и цифровой паспорт актива.",
    },
    energy: {
      name: "Регистрация энергетического актива",
      description:
        "Энергетика: цифровая регистрация активов, связанных с энергетикой, таких как солнечные панели, аккумуляторные системы и установки. Включает проверку и цифровой паспорт актива.",
    },
    industry: {
      name: "Регистрация промышленного оборудования",
      description:
        "Промышленность: цифровая регистрация промышленного оборудования и техники. Включает проверку права собственности, проверку происхождения и цифровой паспорт актива.",
    },
  },
  zh: {
    light_mobility: {
      name: "轻型出行注册",
      description:
        "轻型出行：对轻型出行资产进行数字注册，包括自行车、电动自行车和电动滑板车。包含核验和数字资产护照。",
    },
    vehicles: {
      name: "车辆注册",
      description:
        "车辆：对车辆进行数字注册，包括汽车、厢式车、卡车和房车。包含所有权核验、历史验证和数字资产护照。",
    },
    machines: {
      name: "机械注册",
      description:
        "机械：对机械和设备进行数字注册。包含所有权核验、来源验证和数字资产护照。",
    },
    agriculture: {
      name: "农业设备注册",
      description:
        "农业：对农业设备和机械进行数字注册。包含所有权核验、来源验证和数字资产护照。",
    },
    construction: {
      name: "建筑设备注册",
      description:
        "建筑：对建筑设备和机械进行数字注册。包含所有权核验、来源验证和数字资产护照。",
    },
    marine: {
      name: "海事资产注册",
      description:
        "海事：对海事资产进行数字注册，包括船只和各类水上交通工具。包含所有权核验和数字资产护照。",
    },
    energy: {
      name: "能源资产注册",
      description:
        "能源：对能源相关资产进行数字注册，例如太阳能板、电池系统和安装设备。包含核验和数字资产护照。",
    },
    industry: {
      name: "工业设备注册",
      description:
        "工业：对工业设备和机械进行数字注册。包含所有权核验、来源验证和数字资产护照。",
    },
  },
  hi: {
    light_mobility: {
      name: "हल्की गतिशीलता पंजीकरण",
      description:
        "हल्की गतिशीलता: साइकिल, ई-बाइक और इलेक्ट्रिक स्कूटर सहित हल्की गतिशीलता परिसंपत्तियों का डिजिटल पंजीकरण। इसमें सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    vehicles: {
      name: "वाहन पंजीकरण",
      description:
        "वाहन: कार, वैन, ट्रक और कैंपर सहित वाहनों का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन, इतिहास सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    machines: {
      name: "मशीन पंजीकरण",
      description:
        "मशीनें: मशीनरी और उपकरणों का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन, उत्पत्ति सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    agriculture: {
      name: "कृषि उपकरण पंजीकरण",
      description:
        "कृषि: कृषि उपकरण और मशीनरी का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन, उत्पत्ति सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    construction: {
      name: "निर्माण उपकरण पंजीकरण",
      description:
        "निर्माण: निर्माण उपकरण और मशीनरी का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन, उत्पत्ति सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    marine: {
      name: "समुद्री परिसंपत्ति पंजीकरण",
      description:
        "समुद्री: नावों और जलयान सहित समुद्री परिसंपत्तियों का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    energy: {
      name: "ऊर्जा परिसंपत्ति पंजीकरण",
      description:
        "ऊर्जा: सौर पैनल, बैटरी सिस्टम और इंस्टॉलेशन जैसी ऊर्जा-संबंधित परिसंपत्तियों का डिजिटल पंजीकरण। इसमें सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
    industry: {
      name: "औद्योगिक उपकरण पंजीकरण",
      description:
        "उद्योग: औद्योगिक उपकरण और मशीनरी का डिजिटल पंजीकरण। इसमें स्वामित्व सत्यापन, उत्पत्ति सत्यापन और डिजिटल एसेट पासपोर्ट शामिल है।",
    },
  },
  ar: {
    light_mobility: {
      name: "تسجيل التنقل الخفيف",
      description:
        "التنقل الخفيف: تسجيل رقمي لأصول التنقل الخفيف بما في ذلك الدراجات والدراجات الكهربائية والسكوترات الكهربائية. يشمل التحقق وجواز أصل رقمي.",
    },
    vehicles: {
      name: "تسجيل المركبات",
      description:
        "المركبات: تسجيل رقمي للمركبات بما في ذلك السيارات والفانات والشاحنات والسيارات الترفيهية. يشمل التحقق من الملكية والتحقق من السجل وجواز أصل رقمي.",
    },
    machines: {
      name: "تسجيل الآلات",
      description:
        "الآلات: تسجيل رقمي للآلات والمعدات. يشمل التحقق من الملكية والتحقق من المنشأ وجواز أصل رقمي.",
    },
    agriculture: {
      name: "تسجيل المعدات الزراعية",
      description:
        "الزراعة: تسجيل رقمي للمعدات والآلات الزراعية. يشمل التحقق من الملكية والتحقق من المنشأ وجواز أصل رقمي.",
    },
    construction: {
      name: "تسجيل معدات البناء",
      description:
        "الإنشاءات: تسجيل رقمي لمعدات وآلات البناء. يشمل التحقق من الملكية والتحقق من المنشأ وجواز أصل رقمي.",
    },
    marine: {
      name: "تسجيل الأصول البحرية",
      description:
        "البحري: تسجيل رقمي للأصول البحرية بما في ذلك القوارب والمركبات المائية. يشمل التحقق من الملكية وجواز أصل رقمي.",
    },
    energy: {
      name: "تسجيل أصول الطاقة",
      description:
        "الطاقة: تسجيل رقمي للأصول المرتبطة بالطاقة مثل الألواح الشمسية وأنظمة البطاريات والتركيبات. يشمل التحقق وجواز أصل رقمي.",
    },
    industry: {
      name: "تسجيل المعدات الصناعية",
      description:
        "الصناعة: تسجيل رقمي للمعدات والآلات الصناعية. يشمل التحقق من الملكية والتحقق من المنشأ وجواز أصل رقمي.",
    },
  },
};

const PRICING_CATALOG_PAGE_CONTENT: Record<Lang, PricingCatalogPageContent> = {
  en: {
    subtitle:
      "Registration fees are shown by asset category so you can select the correct EquipRegistry registration before secure checkout.",
  },
  es: {
    subtitle:
      "Las tarifas de registro se muestran por categoría de activo para que puedas seleccionar el registro correcto de EquipRegistry antes del pago seguro.",
  },
  de: {
    subtitle:
      "Die Registrierungsgebühren werden nach Asset-Kategorie angezeigt, damit Sie vor dem sicheren Checkout die passende EquipRegistry-Registrierung auswählen können.",
  },
  fr: {
    subtitle:
      "Les frais d’enregistrement sont affichés par catégorie d’actif afin de sélectionner la bonne inscription EquipRegistry avant le paiement sécurisé.",
  },
  it: {
    subtitle:
      "Le tariffe di registrazione sono mostrate per categoria di asset, così puoi selezionare la registrazione EquipRegistry corretta prima del checkout sicuro.",
  },
  nl: {
    subtitle:
      "De registratiekosten worden per assetcategorie getoond zodat je vóór de beveiligde checkout de juiste EquipRegistry-registratie kunt kiezen.",
  },
  pt: {
    subtitle:
      "As taxas de registo são apresentadas por categoria de ativo para que possas selecionar o registo EquipRegistry correto antes do checkout seguro.",
  },
  ru: {
    subtitle:
      "Регистрационные сборы показаны по категориям активов, чтобы вы могли выбрать правильную регистрацию EquipRegistry перед безопасной оплатой.",
  },
  zh: {
    subtitle:
      "注册费用按资产类别显示，方便您在安全结账前选择正确的 EquipRegistry 注册类型。",
  },
  hi: {
    subtitle:
      "पंजीकरण शुल्क परिसंपत्ति श्रेणी के अनुसार दिखाए जाते हैं ताकि आप सुरक्षित चेकआउट से पहले सही EquipRegistry पंजीकरण चुन सकें।",
  },
  ar: {
    subtitle:
      "تُعرض رسوم التسجيل حسب فئة الأصل حتى تتمكن من اختيار تسجيل EquipRegistry الصحيح قبل إتمام الدفع الآمن.",
  },
};

export function getPricingCategoryContent(
  lang: Lang,
  category: AssetPricingCategory
) {
  return (
    PRICING_CATEGORY_CONTENT[lang]?.[category] ??
    PRICING_CATEGORY_CONTENT.en[category]
  );
}

export function getPricingCatalogSubtitle(lang: Lang) {
  return (
    PRICING_CATALOG_PAGE_CONTENT[lang]?.subtitle ??
    PRICING_CATALOG_PAGE_CONTENT.en.subtitle
  );
}
