import type { Lang } from "./config";

type PricingSectionContent = {
  title: string;
  description: string;
  examples: string[];
};

type PricingInfoContent = {
  title: string;
  text: string;
};

export type PricingPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: {
    registration: string;
    yearly: string;
    examples: string;
    estimatedLocalCurrency: string;
  };
  sections: Record<string, PricingSectionContent>;
  info: {
    afterPayment: PricingInfoContent;
    passport: PricingInfoContent;
    historyUnknown: PricingInfoContent;
    annualValidation: PricingInfoContent;
  };
  actions: {
    startRegistration: string;
    contact: string;
  };
};

export const PRICING_PAGE_CONTENT: Record<Lang, PricingPageContent> = {
  en: {
    eyebrow: "EquipRegistry",
    title: "Pricing",
    subtitle:
      "Pricing is structured by asset category, with a one-time registration fee and a yearly validation fee from one centralized pricing model.",
    labels: {
      registration: "Registration",
      yearly: "Yearly",
      examples: "Examples",
      estimatedLocalCurrency:
        "Estimated in your local currency. Final amount shown at checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Light mobility / step",
        description:
          "For compact personal mobility assets that fall within the light-mobility pricing tier.",
        examples: ["Electric scooter", "Moped / light mobility"],
      },
      bike: {
        title: "Bike",
        description:
          "For bicycle registrations that use the dedicated bike pricing tier instead of the light-mobility tier.",
        examples: ["Bicycle", "E-bike", "Cargo bike"],
      },
      standard_vehicle: {
        title: "Standard vehicle",
        description:
          "For road-going vehicles and trailer-based assets that belong to the standard vehicle pricing tier.",
        examples: [
          "Passenger car",
          "Van",
          "Truck",
          "Trailer",
          "Caravan",
        ],
      },
      heavy_asset: {
        title: "Heavy asset",
        description:
          "For industrial, machinery, agricultural, medical, energy, and other heavier asset categories.",
        examples: [
          "Excavator",
          "Generator",
          "Battery storage",
          "Tractor",
          "MRI",
          "Workshop equipment",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "What happens after payment",
        text: "After payment is confirmed, the registration request moves into review. Submitted documents remain visible in the dashboard while validation is underway.",
      },
      passport: {
        title: "Passport explanation",
        text: "The EquipRegistry passport is the registry record issued after approval. It links the registration reference, core asset data, and validated status in one operational record.",
      },
      historyUnknown: {
        title: "History unknown",
        text: "This status means the asset exists in the registry, but a verified ownership history has not yet been established. It signals limited historical certainty, not an automatic refusal.",
      },
      annualValidation: {
        title: "Annual validation",
        text: "Annual validation keeps the registry passport current and supports document refresh, ownership continuity, and long-term status confidence.",
      },
    },
    actions: {
      startRegistration: "Start registration",
      contact: "Contact",
    },
  },
  es: {
    eyebrow: "EquipRegistry",
    title: "Precios",
    subtitle:
      "La tarificación se organiza por categoría de activo, con una tarifa única de registro y una tarifa anual de validación desde un modelo centralizado.",
    labels: {
      registration: "Registro",
      yearly: "Anual",
      examples: "Ejemplos",
      estimatedLocalCurrency:
        "Estimado en tu moneda local. El importe final se muestra en el checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Movilidad ligera / patinete",
        description:
          "Para activos compactos de movilidad personal que entran en el nivel tarifario de movilidad ligera.",
        examples: ["Patinete eléctrico", "Ciclomotor / movilidad ligera"],
      },
      bike: {
        title: "Bicicleta",
        description:
          "Para registros de bicicletas que utilizan la categoría tarifaria específica de bicicletas y no la de movilidad ligera.",
        examples: ["Bicicleta", "Bicicleta eléctrica", "Bicicleta de carga"],
      },
      standard_vehicle: {
        title: "Vehículo estándar",
        description:
          "Para vehículos de carretera y activos basados en remolque que pertenecen al nivel tarifario de vehículo estándar.",
        examples: [
          "Turismo",
          "Furgoneta",
          "Camión",
          "Remolque",
          "Caravana",
        ],
      },
      heavy_asset: {
        title: "Activo pesado",
        description:
          "Para categorías de registro industriales, de maquinaria, agrícolas, médicas, energéticas y otros activos de mayor peso.",
        examples: [
          "Excavadora",
          "Generador",
          "Almacenamiento en baterías",
          "Tractor",
          "Resonancia magnética",
          "Equipo de taller",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Qué ocurre después del pago",
        text: "Tras la confirmación del pago, la solicitud de registro pasa a revisión. Los documentos enviados siguen visibles en el panel mientras se realiza la validación.",
      },
      passport: {
        title: "Explicación del pasaporte",
        text: "El pasaporte EquipRegistry es el registro emitido tras la aprobación. Vincula la referencia de registro, los datos esenciales del activo y el estado validado en un único registro operativo.",
      },
      historyUnknown: {
        title: "Historial desconocido",
        text: "Este estado significa que el activo existe en el registro, pero todavía no se ha establecido un historial de titularidad verificado. Señala una certeza histórica limitada, no un rechazo automático.",
      },
      annualValidation: {
        title: "Validación anual",
        text: "La validación anual mantiene actualizado el pasaporte registral y respalda la actualización documental, la continuidad de la titularidad y la confianza en el estado a largo plazo.",
      },
    },
    actions: {
      startRegistration: "Iniciar registro",
      contact: "Contactar",
    },
  },
  de: {
    eyebrow: "EquipRegistry",
    title: "Preise",
    subtitle:
      "Die Preisstruktur richtet sich nach der Asset-Kategorie, mit einer einmaligen Registrierungsgebühr und einer jährlichen Validierungsgebühr aus einem zentralen Preismodell.",
    labels: {
      registration: "Registrierung",
      yearly: "Jährlich",
      examples: "Beispiele",
      estimatedLocalCurrency:
        "Geschätzt in Ihrer lokalen Währung. Der endgültige Betrag wird im Checkout angezeigt.",
    },
    sections: {
      light_mobility_step: {
        title: "Leichtmobilität / E-Step",
        description:
          "Für kompakte persönliche Mobilitäts-Assets innerhalb der Preisstufe für Leichtmobilität.",
        examples: ["E-Scooter", "Moped / Leichtmobilität"],
      },
      bike: {
        title: "Fahrrad",
        description:
          "Für Fahrradregistrierungen, die die eigene Fahrrad-Preisstaffel und nicht die Leichtmobilitätsstufe nutzen.",
        examples: ["Fahrrad", "E-Bike", "Lastenrad"],
      },
      standard_vehicle: {
        title: "Standardfahrzeug",
        description:
          "Für straßengebundene Fahrzeuge und anhängerbasierte Assets innerhalb der Preisstufe für Standardfahrzeuge.",
        examples: ["Pkw", "Transporter", "Lkw", "Anhänger", "Wohnwagen"],
      },
      heavy_asset: {
        title: "Schweres Asset",
        description:
          "Für industrielle, maschinelle, landwirtschaftliche, medizinische, energetische und andere schwerere Asset-Kategorien.",
        examples: [
          "Bagger",
          "Generator",
          "Batteriespeicher",
          "Traktor",
          "MRT",
          "Werkstattausrüstung",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Was nach der Zahlung geschieht",
        text: "Nach bestätigter Zahlung geht der Registrierungsantrag in die Prüfung. Eingereichte Unterlagen bleiben während der Validierung im Dashboard sichtbar.",
      },
      passport: {
        title: "Pass-Erklärung",
        text: "Der EquipRegistry-Pass ist der Registereintrag, der nach Freigabe ausgestellt wird. Er verbindet die Registrierungsreferenz, die Kerndaten des Assets und den validierten Status in einem operativen Datensatz.",
      },
      historyUnknown: {
        title: "Historie unbekannt",
        text: "Dieser Status bedeutet, dass das Asset im Register vorhanden ist, aber noch keine verifizierte Eigentumshistorie festgestellt wurde. Er weist auf eine begrenzte historische Sicherheit hin, nicht auf eine automatische Ablehnung.",
      },
      annualValidation: {
        title: "Jährliche Validierung",
        text: "Die jährliche Validierung hält den Registerpass aktuell und unterstützt Dokumentenaktualisierung, Eigentumskontinuität und langfristige Statussicherheit.",
      },
    },
    actions: {
      startRegistration: "Registrierung starten",
      contact: "Kontakt",
    },
  },
  fr: {
    eyebrow: "EquipRegistry",
    title: "Tarifs",
    subtitle:
      "La tarification est structurée par catégorie d’actif, avec des frais d’enregistrement uniques et des frais annuels de validation issus d’un modèle tarifaire centralisé.",
    labels: {
      registration: "Enregistrement",
      yearly: "Annuel",
      examples: "Exemples",
      estimatedLocalCurrency:
        "Estimation dans votre devise locale. Le montant final est indiqué au moment du paiement.",
    },
    sections: {
      light_mobility_step: {
        title: "Mobilité légère / trottinette",
        description:
          "Pour les actifs compacts de mobilité personnelle relevant du niveau tarifaire de mobilité légère.",
        examples: ["Trottinette électrique", "Cyclomoteur / mobilité légère"],
      },
      bike: {
        title: "Vélo",
        description:
          "Pour les enregistrements de vélos relevant du niveau tarifaire dédié au vélo plutôt qu’à la mobilité légère.",
        examples: ["Vélo", "Vélo électrique", "Vélo cargo"],
      },
      standard_vehicle: {
        title: "Véhicule standard",
        description:
          "Pour les véhicules routiers et les actifs basés sur remorque appartenant au niveau tarifaire des véhicules standard.",
        examples: ["Voiture particulière", "Fourgon", "Camion", "Remorque", "Caravane"],
      },
      heavy_asset: {
        title: "Actif lourd",
        description:
          "Pour les catégories d’actifs industrielles, mécaniques, agricoles, médicales, énergétiques et autres catégories plus lourdes.",
        examples: [
          "Excavatrice",
          "Générateur",
          "Stockage par batterie",
          "Tracteur",
          "IRM",
          "Équipement d’atelier",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Ce qui se passe après le paiement",
        text: "Après confirmation du paiement, la demande d’enregistrement passe en revue. Les documents soumis restent visibles dans le tableau de bord pendant la validation.",
      },
      passport: {
        title: "Explication du passeport",
        text: "Le passeport EquipRegistry est l’enregistrement de registre émis après approbation. Il relie la référence d’enregistrement, les données essentielles de l’actif et le statut validé dans un seul enregistrement opérationnel.",
      },
      historyUnknown: {
        title: "Historique inconnu",
        text: "Ce statut signifie que l’actif existe dans le registre, mais qu’un historique de propriété vérifié n’a pas encore été établi. Il indique une certitude historique limitée, et non un refus automatique.",
      },
      annualValidation: {
        title: "Validation annuelle",
        text: "La validation annuelle maintient le passeport de registre à jour et soutient la mise à jour documentaire, la continuité de propriété et la fiabilité du statut dans la durée.",
      },
    },
    actions: {
      startRegistration: "Démarrer l’enregistrement",
      contact: "Contact",
    },
  },
  it: {
    eyebrow: "EquipRegistry",
    title: "Tariffe",
    subtitle:
      "La tariffazione è organizzata per categoria di asset, con una quota unica di registrazione e una quota annuale di validazione da un modello centralizzato.",
    labels: {
      registration: "Registrazione",
      yearly: "Annuale",
      examples: "Esempi",
      estimatedLocalCurrency:
        "Stimato nella tua valuta locale. L'importo finale viene mostrato al checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Mobilità leggera / monopattino",
        description:
          "Per asset compatti di mobilità personale che rientrano nella fascia tariffaria della mobilità leggera.",
        examples: ["Monopattino elettrico", "Ciclomotore / mobilità leggera"],
      },
      bike: {
        title: "Bicicletta",
        description:
          "Per registrazioni di biciclette che utilizzano la fascia tariffaria dedicata alle biciclette invece di quella della mobilità leggera.",
        examples: ["Bicicletta", "Bicicletta elettrica", "Cargo bike"],
      },
      standard_vehicle: {
        title: "Veicolo standard",
        description:
          "Per veicoli stradali e asset basati su rimorchio che rientrano nella fascia tariffaria del veicolo standard.",
        examples: ["Autovettura", "Furgone", "Camion", "Rimorchio", "Caravan"],
      },
      heavy_asset: {
        title: "Asset pesante",
        description:
          "Per categorie di asset industriali, meccaniche, agricole, mediche, energetiche e altre categorie più pesanti.",
        examples: [
          "Escavatore",
          "Generatore",
          "Accumulo a batteria",
          "Trattore",
          "Risonanza magnetica",
          "Attrezzatura da officina",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Cosa succede dopo il pagamento",
        text: "Dopo la conferma del pagamento, la richiesta di registrazione passa in revisione. I documenti inviati restano visibili nella dashboard durante la validazione.",
      },
      passport: {
        title: "Spiegazione del passaporto",
        text: "Il passaporto EquipRegistry è il record di registro emesso dopo l’approvazione. Collega il riferimento di registrazione, i dati essenziali dell’asset e lo stato validato in un unico record operativo.",
      },
      historyUnknown: {
        title: "Storico sconosciuto",
        text: "Questo stato significa che l’asset esiste nel registro, ma non è ancora stata stabilita una cronologia di proprietà verificata. Indica una certezza storica limitata, non un rifiuto automatico.",
      },
      annualValidation: {
        title: "Validazione annuale",
        text: "La validazione annuale mantiene aggiornato il passaporto di registro e supporta l’aggiornamento documentale, la continuità della titolarità e l’affidabilità dello stato nel tempo.",
      },
    },
    actions: {
      startRegistration: "Avvia la registrazione",
      contact: "Contatto",
    },
  },
  nl: {
    eyebrow: "EquipRegistry",
    title: "Tarieven",
    subtitle:
      "De prijsstelling is georganiseerd per assetcategorie, met een eenmalige registratiekost en een jaarlijkse validatiekost uit één gecentraliseerd prijsmodel.",
    labels: {
      registration: "Registratie",
      yearly: "Jaarlijks",
      examples: "Voorbeelden",
      estimatedLocalCurrency:
        "Geschat in je lokale valuta. Het definitieve bedrag wordt bij het afrekenen getoond.",
    },
    sections: {
      light_mobility_step: {
        title: "Lichte mobiliteit / step",
        description:
          "Voor compacte persoonlijke mobiliteitsassets die binnen het prijstarief voor lichte mobiliteit vallen.",
        examples: ["Elektrische step", "Bromfiets / lichte mobiliteit"],
      },
      bike: {
        title: "Fiets",
        description:
          "Voor fietsregistraties die het specifieke fietstarief gebruiken in plaats van het tarief voor lichte mobiliteit.",
        examples: ["Fiets", "E-bike", "Bakfiets"],
      },
      standard_vehicle: {
        title: "Standaardvoertuig",
        description:
          "Voor wegvoertuigen en aanhangergebonden assets die onder het prijstarief voor standaardvoertuigen vallen.",
        examples: ["Personenauto", "Bestelwagen", "Truck", "Aanhanger", "Caravan"],
      },
      heavy_asset: {
        title: "Zware asset",
        description:
          "Voor industriële, mechanische, agrarische, medische, energiegerelateerde en andere zwaardere assetcategorieën.",
        examples: [
          "Graafmachine",
          "Generator",
          "Batterijopslag",
          "Tractor",
          "MRI",
          "Werkplaatsuitrusting",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Wat er gebeurt na betaling",
        text: "Na bevestiging van de betaling gaat de registratieaanvraag in review. Ingediende documenten blijven zichtbaar in het dashboard zolang de validatie loopt.",
      },
      passport: {
        title: "Paspoortuitleg",
        text: "Het EquipRegistry-paspoort is het registerrecord dat na goedkeuring wordt uitgegeven. Het verbindt de registratiereferentie, de kerngegevens van de asset en de gevalideerde status in één operationeel dossier.",
      },
      historyUnknown: {
        title: "Historie onbekend",
        text: "Deze status betekent dat de asset in het register bestaat, maar dat er nog geen geverifieerde eigendomsgeschiedenis is vastgesteld. Het wijst op beperkte historische zekerheid en is geen automatische afwijzing.",
      },
      annualValidation: {
        title: "Jaarlijkse validatie",
        text: "Jaarlijkse validatie houdt het registerpaspoort actueel en ondersteunt documentvernieuwing, eigendomscontinuïteit en duurzaam vertrouwen in de status.",
      },
    },
    actions: {
      startRegistration: "Registratie starten",
      contact: "Contact",
    },
  },
  pt: {
    eyebrow: "EquipRegistry",
    title: "Preços",
    subtitle:
      "A tarifação está organizada por categoria de ativo, com uma taxa única de registo e uma taxa anual de validação a partir de um modelo centralizado.",
    labels: {
      registration: "Registo",
      yearly: "Anual",
      examples: "Exemplos",
      estimatedLocalCurrency:
        "Estimado na tua moeda local. O montante final é mostrado no checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Mobilidade leve / trotinete",
        description:
          "Para ativos compactos de mobilidade pessoal que se enquadram no nível de preço de mobilidade leve.",
        examples: ["Trotinete elétrica", "Ciclomotor / mobilidade leve"],
      },
      bike: {
        title: "Bicicleta",
        description:
          "Para registos de bicicletas que usam o nível tarifário específico de bicicletas em vez do nível de mobilidade leve.",
        examples: ["Bicicleta", "Bicicleta elétrica", "Bicicleta de carga"],
      },
      standard_vehicle: {
        title: "Veículo padrão",
        description:
          "Para veículos rodoviários e ativos baseados em reboque que pertencem ao nível tarifário de veículo padrão.",
        examples: ["Automóvel", "Carrinha", "Camião", "Reboque", "Caravana"],
      },
      heavy_asset: {
        title: "Ativo pesado",
        description:
          "Para categorias de ativos industriais, mecânicos, agrícolas, médicos, energéticos e outras categorias mais pesadas.",
        examples: [
          "Escavadora",
          "Gerador",
          "Armazenamento por bateria",
          "Trator",
          "Ressonância magnética",
          "Equipamento de oficina",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "O que acontece após o pagamento",
        text: "Depois de confirmado o pagamento, o pedido de registo entra em revisão. Os documentos submetidos permanecem visíveis no painel enquanto decorre a validação.",
      },
      passport: {
        title: "Explicação do passaporte",
        text: "O passaporte EquipRegistry é o registo emitido após aprovação. Liga a referência de registo, os dados essenciais do ativo e o estado validado num único registo operacional.",
      },
      historyUnknown: {
        title: "Histórico desconhecido",
        text: "Este estado significa que o ativo existe no registo, mas ainda não foi estabelecido um histórico de titularidade verificado. Indica certeza histórica limitada, não uma recusa automática.",
      },
      annualValidation: {
        title: "Validação anual",
        text: "A validação anual mantém o passaporte de registo atualizado e apoia renovação documental, continuidade de titularidade e confiança no estado a longo prazo.",
      },
    },
    actions: {
      startRegistration: "Iniciar registo",
      contact: "Contacto",
    },
  },
  ru: {
    eyebrow: "EquipRegistry",
    title: "Цены",
    subtitle:
      "Тарификация организована по категориям активов: единоразовый регистрационный сбор и ежегодный сбор за валидацию берутся из одной централизованной модели.",
    labels: {
      registration: "Регистрация",
      yearly: "Ежегодно",
      examples: "Примеры",
      estimatedLocalCurrency:
        "Оценка в вашей местной валюте. Окончательная сумма будет показана при оплате.",
    },
    sections: {
      light_mobility_step: {
        title: "Лёгкая мобильность / самокат",
        description:
          "Для компактных персональных средств мобильности, относящихся к тарифной категории лёгкой мобильности.",
        examples: ["Электросамокат", "Мопед / лёгкая мобильность"],
      },
      bike: {
        title: "Велосипед",
        description:
          "Для регистраций велосипедов, использующих отдельную тарифную категорию для велосипедов, а не категорию лёгкой мобильности.",
        examples: ["Велосипед", "Электровелосипед", "Грузовой велосипед"],
      },
      standard_vehicle: {
        title: "Стандартное транспортное средство",
        description:
          "Для дорожных транспортных средств и прицепных активов, относящихся к стандартной транспортной категории.",
        examples: [
          "Легковой автомобиль",
          "Фургон",
          "Грузовик",
          "Прицеп",
          "Караван",
        ],
      },
      heavy_asset: {
        title: "Тяжёлый актив",
        description:
          "Для промышленных, машинных, сельскохозяйственных, медицинских, энергетических и других более тяжёлых категорий активов.",
        examples: [
          "Экскаватор",
          "Генератор",
          "Система хранения энергии",
          "Трактор",
          "МРТ",
          "Мастерское оборудование",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Что происходит после оплаты",
        text: "После подтверждения оплаты регистрационная заявка переходит в проверку. Поданные документы остаются видимыми в панели управления на протяжении валидации.",
      },
      passport: {
        title: "Пояснение к паспорту",
        text: "Паспорт EquipRegistry — это запись в реестре, которая выпускается после одобрения. Он связывает регистрационную ссылку, основные данные актива и подтверждённый статус в одной операционной записи.",
      },
      historyUnknown: {
        title: "История неизвестна",
        text: "Этот статус означает, что актив существует в реестре, но подтверждённая история владения ещё не установлена. Он указывает на ограниченную историческую определённость, а не на автоматический отказ.",
      },
      annualValidation: {
        title: "Ежегодная валидация",
        text: "Ежегодная валидация поддерживает актуальность паспорта реестра и помогает обновлять документы, подтверждать непрерывность владения и сохранять долгосрочное доверие к статусу.",
      },
    },
    actions: {
      startRegistration: "Начать регистрацию",
      contact: "Связаться",
    },
  },
  zh: {
    eyebrow: "EquipRegistry",
    title: "价格",
    subtitle:
      "定价按资产类别统一管理，包含一次性注册费用和年度验证费用，全部来自集中式定价模型。",
    labels: {
      registration: "注册",
      yearly: "年费",
      examples: "示例",
      estimatedLocalCurrency: "按您的本地货币估算。最终金额将在结账时显示。",
    },
    sections: {
      light_mobility_step: {
        title: "轻型出行 / 滑板车",
        description:
          "适用于归入轻型出行定价档位的紧凑型个人出行资产。",
        examples: ["电动滑板车", "轻便摩托 / 轻型出行"],
      },
      bike: {
        title: "自行车",
        description:
          "适用于使用自行车专属定价档位而非轻型出行档位的自行车注册。",
        examples: ["自行车", "电动自行车", "货运自行车"],
      },
      standard_vehicle: {
        title: "标准车辆",
        description:
          "适用于归入标准车辆定价档位的道路车辆及拖挂类资产。",
        examples: ["乘用车", "厢式车", "卡车", "拖车", "房车"],
      },
      heavy_asset: {
        title: "重型资产",
        description:
          "适用于工业、机械、农业、医疗、能源以及其他较重资产类别的注册。",
        examples: [
          "挖掘机",
          "发电机",
          "电池储能系统",
          "拖拉机",
          "核磁共振设备",
          "车间设备",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "付款后会发生什么",
        text: "付款确认后，注册申请将进入审核阶段。提交的文件在验证期间仍会继续显示在仪表板中。",
      },
      passport: {
        title: "护照说明",
        text: "EquipRegistry 护照是获批后签发的注册记录。它将注册参考编号、资产核心数据和已验证状态整合到同一份运营记录中。",
      },
      historyUnknown: {
        title: "历史未知",
        text: "该状态表示资产已存在于注册系统中，但尚未建立经过验证的所有权历史。它反映的是历史确定性有限，而不是自动拒绝。",
      },
      annualValidation: {
        title: "年度验证",
        text: "年度验证可保持注册护照的时效性，并支持文件更新、所有权连续性以及长期状态可信度。",
      },
    },
    actions: {
      startRegistration: "开始注册",
      contact: "联系",
    },
  },
  hi: {
    eyebrow: "EquipRegistry",
    title: "मूल्य",
    subtitle:
      "मूल्य निर्धारण अब एसेट श्रेणी के अनुसार व्यवस्थित है, जिसमें एक बार का पंजीकरण शुल्क और वार्षिक सत्यापन शुल्क एक ही केंद्रीकृत मूल्य मॉडल से लिया जाता है।",
    labels: {
      registration: "पंजीकरण",
      yearly: "वार्षिक",
      examples: "उदाहरण",
      estimatedLocalCurrency:
        "आपकी स्थानीय मुद्रा में अनुमानित। अंतिम राशि चेकआउट पर दिखाई जाएगी।",
    },
    sections: {
      light_mobility_step: {
        title: "हल्की मोबिलिटी / स्कूटर",
        description:
          "ऐसे कॉम्पैक्ट व्यक्तिगत मोबिलिटी एसेट्स के लिए जो हल्की मोबिलिटी मूल्य श्रेणी में आते हैं।",
        examples: ["इलेक्ट्रिक स्कूटर", "मोपेड / हल्की मोबिलिटी"],
      },
      bike: {
        title: "साइकिल",
        description:
          "ऐसी साइकिल पंजीकरण के लिए जो हल्की मोबिलिटी के बजाय समर्पित साइकिल मूल्य श्रेणी का उपयोग करती हैं।",
        examples: ["साइकिल", "ई-बाइक", "कार्गो बाइक"],
      },
      standard_vehicle: {
        title: "मानक वाहन",
        description:
          "ऐसे सड़क वाहन और ट्रेलर-आधारित एसेट्स के लिए जो मानक वाहन मूल्य श्रेणी में आते हैं।",
        examples: ["कार", "वैन", "ट्रक", "ट्रेलर", "कारवां"],
      },
      heavy_asset: {
        title: "भारी एसेट",
        description:
          "औद्योगिक, मशीनरी, कृषि, चिकित्सा, ऊर्जा और अन्य भारी एसेट श्रेणियों के लिए।",
        examples: [
          "एक्सकेवेटर",
          "जेनरेटर",
          "बैटरी स्टोरेज",
          "ट्रैक्टर",
          "एमआरआई",
          "वर्कशॉप उपकरण",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "भुगतान के बाद क्या होता है",
        text: "भुगतान की पुष्टि के बाद पंजीकरण अनुरोध समीक्षा में चला जाता है। सत्यापन के दौरान जमा किए गए दस्तावेज़ डैशबोर्ड में दिखाई देते रहते हैं।",
      },
      passport: {
        title: "पासपोर्ट का अर्थ",
        text: "EquipRegistry पासपोर्ट वह रजिस्ट्री रिकॉर्ड है जो स्वीकृति के बाद जारी किया जाता है। यह पंजीकरण संदर्भ, एसेट का मुख्य डेटा और सत्यापित स्थिति को एक ही परिचालन रिकॉर्ड में जोड़ता है।",
      },
      historyUnknown: {
        title: "इतिहास अज्ञात",
        text: "इस स्थिति का अर्थ है कि एसेट रजिस्ट्री में मौजूद है, लेकिन अभी तक सत्यापित स्वामित्व इतिहास स्थापित नहीं हुआ है। यह सीमित ऐतिहासिक निश्चितता का संकेत है, स्वचालित अस्वीकृति नहीं।",
      },
      annualValidation: {
        title: "वार्षिक सत्यापन",
        text: "वार्षिक सत्यापन रजिस्ट्री पासपोर्ट को अद्यतन रखता है और दस्तावेज़ नवीनीकरण, स्वामित्व निरंतरता तथा दीर्घकालिक स्थिति-विश्वास का समर्थन करता है।",
      },
    },
    actions: {
      startRegistration: "पंजीकरण शुरू करें",
      contact: "संपर्क करें",
    },
  },
  ar: {
    eyebrow: "EquipRegistry",
    title: "الأسعار",
    subtitle:
      "يُنظَّم التسعير بحسب فئة الأصل، مع رسم تسجيل لمرة واحدة ورسم تحقق سنوي من نموذج تسعير مركزي واحد.",
    labels: {
      registration: "التسجيل",
      yearly: "سنوي",
      examples: "أمثلة",
      estimatedLocalCurrency:
        "تقديريًا بعملتك المحلية. سيظهر المبلغ النهائي عند إتمام الدفع.",
    },
    sections: {
      light_mobility_step: {
        title: "التنقل الخفيف / السكوتر",
        description:
          "للأصول الشخصية صغيرة الحجم التي تندرج ضمن فئة تسعير التنقل الخفيف.",
        examples: ["سكوتر كهربائي", "دراجة نارية خفيفة / تنقل خفيف"],
      },
      bike: {
        title: "الدراجة",
        description:
          "لتسجيلات الدراجات التي تستخدم فئة تسعير الدراجات المخصصة بدلاً من فئة التنقل الخفيف.",
        examples: ["دراجة", "دراجة كهربائية", "دراجة شحن"],
      },
      standard_vehicle: {
        title: "المركبة القياسية",
        description:
          "للمركبات الطرقية والأصول القائمة على المقطورات التي تندرج ضمن فئة المركبات القياسية.",
        examples: ["سيارة ركاب", "فان", "شاحنة", "مقطورة", "كرفان"],
      },
      heavy_asset: {
        title: "الأصل الثقيل",
        description:
          "للفئات الصناعية والآلية والزراعية والطبية وقطاع الطاقة وغيرها من فئات الأصول الأثقل.",
        examples: [
          "حفارة",
          "مولد",
          "نظام تخزين بطاريات",
          "جرار",
          "جهاز رنين مغناطيسي",
          "معدات ورشة",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "ماذا يحدث بعد الدفع",
        text: "بعد تأكيد الدفع ينتقل طلب التسجيل إلى المراجعة. وتبقى المستندات المرسلة ظاهرة في لوحة التحكم أثناء التحقق.",
      },
      passport: {
        title: "شرح الجواز",
        text: "جواز EquipRegistry هو السجل الذي يصدر بعد الموافقة. ويربط مرجع التسجيل وبيانات الأصل الأساسية والحالة المعتمدة ضمن سجل تشغيلي واحد.",
      },
      historyUnknown: {
        title: "السجل غير المعروف",
        text: "تعني هذه الحالة أن الأصل موجود في السجل، لكن لم يتم بعد إثبات تاريخ ملكية موثق. وهي تشير إلى محدودية اليقين التاريخي وليست رفضًا تلقائيًا.",
      },
      annualValidation: {
        title: "التحقق السنوي",
        text: "يحافظ التحقق السنوي على تحديث جواز السجل ويدعم تحديث المستندات واستمرارية الملكية والثقة طويلة الأمد في الحالة.",
      },
    },
    actions: {
      startRegistration: "بدء التسجيل",
      contact: "اتصل بنا",
    },
  },

  pl: {
    eyebrow: "EquipRegistry",
    title: "Cennik",
    subtitle:
      "Cennik jest uporzadkowany wedlug kategorii assetu i obejmuje jednorazowa oplata rejestracyjna oraz roczna oplata walidacyjna w jednym centralnym modelu cenowym.",
    labels: {
      registration: "Rejestracja",
      yearly: "Rocznie",
      examples: "Przyklady",
      estimatedLocalCurrency:
        "Szacunkowo w Twojej lokalnej walucie. Ostateczna kwota zostanie pokazana przy checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Lekka mobilnosc / step",
        description:
          "Dla kompaktowych assetow mobilnosci osobistej, ktore naleza do taryfy lekkiej mobilnosci.",
        examples: ["Hulajnoga elektryczna", "Motorower / lekka mobilnosc"],
      },
      bike: {
        title: "Rower",
        description:
          "Dla rejestracji rowerow, ktore korzystaja z osobnej taryfy rowerowej zamiast taryfy lekkiej mobilnosci.",
        examples: ["Rower", "E-bike", "Rower cargo"],
      },
      standard_vehicle: {
        title: "Standardowy pojazd",
        description:
          "Dla pojazdow drogowych i assetow opartych na przyczepie, ktore naleza do standardowej taryfy pojazdow.",
        examples: [
          "Samochod osobowy",
          "Van",
          "Ciezarowka",
          "Przyczepa",
          "Przyczepa kempingowa",
        ],
      },
      heavy_asset: {
        title: "Ciezki asset",
        description:
          "Dla kategorii assetow przemyslowych, maszynowych, rolniczych, medycznych, energetycznych i innych ciezszych typow assetow.",
        examples: [
          "Koparka",
          "Generator",
          "Magazyn energii",
          "Traktor",
          "MRI",
          "Wyposazenie warsztatu",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Co dzieje sie po platnosci",
        text: "Po potwierdzeniu platnosci zgloszenie rejestracyjne przechodzi do przegladu. Przeslane dokumenty pozostaja widoczne w panelu podczas walidacji.",
      },
      passport: {
        title: "Wyjasnienie paszportu",
        text: "Paszport EquipRegistry to rekord rejestrowy wydawany po zatwierdzeniu. Laczy referencje rejestracji, podstawowe dane assetu i zweryfikowany status w jednym rekordzie operacyjnym.",
      },
      historyUnknown: {
        title: "Historia nieznana",
        text: "Ten status oznacza, ze asset istnieje w rejestrze, ale nie ustalono jeszcze zweryfikowanej historii wlasnosci. Oznacza ograniczona pewnosc historyczna, a nie automatyczna odmowe.",
      },
      annualValidation: {
        title: "Roczna walidacja",
        text: "Roczna walidacja utrzymuje paszport rejestrowy na biezaco i wspiera odswiezanie dokumentow, ciaglosc wlasnosci oraz dlugoterminowa wiarygodnosc statusu.",
      },
    },
    actions: {
      startRegistration: "Rozpocznij rejestracje",
      contact: "Kontakt",
    },
  },
  sv: {
    eyebrow: "EquipRegistry",
    title: "Priser",
    subtitle:
      "Prissattningen ar strukturerad efter assetkategori med en engangsavgift for registrering och en arlig valideringsavgift i en central prismodell.",
    labels: {
      registration: "Registrering",
      yearly: "Arlig",
      examples: "Exempel",
      estimatedLocalCurrency:
        "Beraknat i din lokala valuta. Slutligt belopp visas vid checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Latt mobilitet / step",
        description:
          "For kompakta assets for personlig mobilitet som tillhor prisnivan for latt mobilitet.",
        examples: ["Elsparkcykel", "Moped / latt mobilitet"],
      },
      bike: {
        title: "Cykel",
        description:
          "For cykelregistreringar som anvander den sarskilda cykelprissattningen i stallet for prisnivan for latt mobilitet.",
        examples: ["Cykel", "E-bike", "Lastcykel"],
      },
      standard_vehicle: {
        title: "Standardfordon",
        description:
          "For vaggaende fordon och trailerbaserade assets som tillhor den vanliga fordonsprissattningen.",
        examples: [
          "Personbil",
          "Van",
          "Lastbil",
          "Slap",
          "Husvagn",
        ],
      },
      heavy_asset: {
        title: "Tungt asset",
        description:
          "For industriella, maskinella, jordbruksrelaterade, medicinska, energianknutna och andra tyngre assetkategorier.",
        examples: [
          "Gravmaskin",
          "Generator",
          "Batterilager",
          "Traktor",
          "MRI",
          "Verkstadsutrustning",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Vad hander efter betalning",
        text: "Nar betalningen har bekraftats gar registreringsarendet vidare till granskning. Insandda dokument forblir synliga i instrumentpanelen medan valideringen pagar.",
      },
      passport: {
        title: "Forklaring av passet",
        text: "EquipRegistry-passet ar den registerpost som utfardas efter godkannande. Det sammanfor registreringsreferensen, grundlaggande assetdata och validerad status i en operativ post.",
      },
      historyUnknown: {
        title: "Historik okand",
        text: "Denna status betyder att asseten finns i registret, men att en verifierad agarhistorik annu inte har faststallts. Den signalerar begransad historisk sakerhet, inte ett automatiskt avslag.",
      },
      annualValidation: {
        title: "Arlig validering",
        text: "Arlig validering haller registerpasset aktuellt och stoder uppdatering av dokument, agarfortsattning och langsiktig tilltro till statusen.",
      },
    },
    actions: {
      startRegistration: "Starta registrering",
      contact: "Kontakt",
    },
  },
  da: {
    eyebrow: "EquipRegistry",
    title: "Priser",
    subtitle:
      "Priserne er struktureret efter assetkategori med et engangsregistreringsgebyr og et arligt valideringsgebyr i en central prismodel.",
    labels: {
      registration: "Registrering",
      yearly: "Arlig",
      examples: "Eksempler",
      estimatedLocalCurrency:
        "Anslat i din lokale valuta. Det endelige belob vises ved checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Let mobilitet / step",
        description:
          "For kompakte assets til personlig mobilitet, der falder inden for prisnivaet for let mobilitet.",
        examples: ["Elektrisk lobehjul", "Moped / let mobilitet"],
      },
      bike: {
        title: "Cykel",
        description:
          "For cykelregistreringer, der bruger den dedikerede cykelpris i stedet for prisnivaet for let mobilitet.",
        examples: ["Cykel", "E-bike", "Ladcykel"],
      },
      standard_vehicle: {
        title: "Standardkoretoj",
        description:
          "For vejgaende koretojer og trailerbaserede assets, der tilhorer standardprisen for koretojer.",
        examples: [
          "Personbil",
          "Van",
          "Lastbil",
          "Trailer",
          "Campingvogn",
        ],
      },
      heavy_asset: {
        title: "Tungt asset",
        description:
          "For industrielle, maskinelle, landbrugsmassige, medicinske, energirelaterede og andre tungere assetkategorier.",
        examples: [
          "Gravemaskine",
          "Generator",
          "Batterilager",
          "Traktor",
          "MRI",
          "Vaerkstedsudstyr",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Hvad sker der efter betaling",
        text: "Nar betalingen er bekraeftet, gar registreringsanmodningen videre til gennemgang. Indsendte dokumenter forbliver synlige i dashboardet, mens valideringen er i gang.",
      },
      passport: {
        title: "Forklaring af passet",
        text: "EquipRegistry-passet er den registerpost, der udstedes efter godkendelse. Det forbinder registreringsreferencen, de centrale assetdata og den validerede status i en operationel post.",
      },
      historyUnknown: {
        title: "Historik ukendt",
        text: "Denne status betyder, at assetet findes i registret, men at en verificeret ejerskabshistorik endnu ikke er fastlagt. Den signalerer begraenset historisk sikkerhed, ikke et automatisk afslag.",
      },
      annualValidation: {
        title: "Arlig validering",
        text: "Arlig validering holder registerpasset opdateret og understotter dokumentfornyelse, ejerskabskontinuitet og langsigtet tillid til statusen.",
      },
    },
    actions: {
      startRegistration: "Start registrering",
      contact: "Kontakt",
    },
  },
  no: {
    eyebrow: "EquipRegistry",
    title: "Priser",
    subtitle:
      "Prisene er strukturert etter assetkategori med et engangsgebyr for registrering og et arlig gebyr for validering i en sentral prismodell.",
    labels: {
      registration: "Registrering",
      yearly: "Arlig",
      examples: "Eksempler",
      estimatedLocalCurrency:
        "Anslatt i din lokale valuta. Endelig belop vises ved checkout.",
    },
    sections: {
      light_mobility_step: {
        title: "Lett mobilitet / step",
        description:
          "For kompakte assets for personlig mobilitet som faller innenfor prisnivaet for lett mobilitet.",
        examples: ["Elektrisk sparkesykkel", "Moped / lett mobilitet"],
      },
      bike: {
        title: "Sykkel",
        description:
          "For sykkelregistreringer som bruker den dedikerte sykkelprisen i stedet for prisnivaet for lett mobilitet.",
        examples: ["Sykkel", "E-bike", "Lastesykkel"],
      },
      standard_vehicle: {
        title: "Standardkjoretoy",
        description:
          "For veggaende kjoretoy og trailerbaserte assets som tilhorer standardprisen for kjoretoy.",
        examples: [
          "Personbil",
          "Van",
          "Lastebil",
          "Tilhenger",
          "Campingvogn",
        ],
      },
      heavy_asset: {
        title: "Tungt asset",
        description:
          "For industrielle, maskinelle, landbruksrelaterte, medisinske, energirelaterte og andre tyngre assetkategorier.",
        examples: [
          "Gravemaskin",
          "Generator",
          "Batterilager",
          "Traktor",
          "MRI",
          "Verkstedutstyr",
        ],
      },
    },
    info: {
      afterPayment: {
        title: "Hva skjer etter betaling",
        text: "Nar betalingen er bekreftet, gar registreringsforesporselen videre til gjennomgang. Innsendte dokumenter forblir synlige i dashbordet mens valideringen pagar.",
      },
      passport: {
        title: "Forklaring av passet",
        text: "EquipRegistry-passet er registerposten som utstedes etter godkjenning. Det kobler registreringsreferansen, grunnleggende assetdata og validert status i en operativ post.",
      },
      historyUnknown: {
        title: "Historikk ukjent",
        text: "Denne statusen betyr at assetet finnes i registret, men at en verifisert eierskapshistorikk enna ikke er etablert. Den signaliserer begrenset historisk sikkerhet, ikke et automatisk avslag.",
      },
      annualValidation: {
        title: "Arlig validering",
        text: "Arlig validering holder registerpasset oppdatert og stotter dokumentfornyelse, kontinuitet i eierskap og langsiktig tillit til statusen.",
      },
    },
    actions: {
      startRegistration: "Start registrering",
      contact: "Kontakt",
    },
  },
};

export function getPricingPageContent(lang: Lang) {
  return PRICING_PAGE_CONTENT[lang] ?? PRICING_PAGE_CONTENT.en;
}
