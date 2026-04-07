"use client";

import { use, useEffect, useMemo, useState, type FormEvent } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

type ApplicantType = "private" | "sme";
type Category =
  | "vehicle"
  | "equipment"
  | "bikelightmobility"
  | "trailer"
  | "energy"
  | "agriculture"
  | "medical"
  | "industrial"
  | "other";

type SubmitState = "idle" | "submitting" | "success" | "error";

type RegisterTexts = {
  heroTitle: string;
  heroSubtitle: string;

  applicantTitle: string;
  applicantSubtitle: string;
  applicantTypeLabel: string;
  applicantTypePrivate: string;
  applicantTypeSme: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  passwordLabel: string;
  companyLabel: string;
  companyPlaceholder: string;
  vatLabel: string;
  vatPlaceholder: string;

  assetTitle: string;
  assetSubtitle: string;
  assetNameLabel: string;
  assetNamePlaceholder: string;
  categoryLabel: string;
  subcategoryLabel: string;
  brandLabel: string;
  brandPlaceholder: string;
  modelLabel: string;
  modelPlaceholder: string;
  vinLabel: string;
  vinPlaceholder: string;

  riskTitle: string;
  riskText: string;

  submit: string;
  submitting: string;
  success: string;
  error: string;

  categories: Record<Category, string>;
  subcategories: {
    passengerCar: string;
    van: string;
    truck: string;
    motorcycle: string;
    bus: string;
    constructionMachine: string;
    generator: string;
    compressor: string;
    forklift: string;
    excavator: string;
    bike: string;
    ebike: string;
    scooter: string;
    trailer: string;
    caravan: string;
    solar: string;
    battery: string;
    tractor: string;
    harvester: string;
    medicalDevice: string;
    industrialMachine: string;
    other: string;
  };
};

const TEXTS: Record<Lang, RegisterTexts> = {
  en: {
    heroTitle: "Register asset",
    heroSubtitle:
      "Start a registration request for an asset and create your account immediately.",
    applicantTitle: "Applicant",
    applicantSubtitle:
      "Enter your basic details. We use this to create your account and link the registration to your profile.",
    applicantTypeLabel: "Applicant type",
    applicantTypePrivate: "Private",
    applicantTypeSme: "Business",
    nameLabel: "Name",
    namePlaceholder: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    companyLabel: "Company name (optional)",
    companyPlaceholder: "Company name",
    vatLabel: "VAT number (optional)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Asset details",
    assetSubtitle:
      "Enter the basic details of the asset. Further verification and documents can be added later.",
    assetNameLabel: "Asset name",
    assetNamePlaceholder:
      "E.g. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
    categoryLabel: "Category",
    subcategoryLabel: "Subcategory",
    brandLabel: "Brand",
    brandPlaceholder: "E.g. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Model",
    modelPlaceholder: "E.g. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Vehicle identification number / serial / frame number",
    riskTitle: "Risk profile: Cross-border fraud risk",
    riskText:
      "This category is monitored for ownership verification, theft signals and cross-border fraud risk.",
    submit: "Create account and continue",
    submitting: "Submitting...",
    success: "Registration request created successfully.",
    error: "Something went wrong. Please try again.",
    categories: {
      vehicle: "Vehicles",
      equipment: "Machines",
      bikelightmobility: "Bikes",
      trailer: "Trailers",
      energy: "Energy",
      agriculture: "Agriculture",
      medical: "Medical",
      industrial: "Industry",
      other: "Other",
    },
    subcategories: {
      passengerCar: "Passenger Car",
      van: "Van",
      truck: "Truck",
      motorcycle: "Motorcycle",
      bus: "Bus",
      constructionMachine: "Construction Machine",
      generator: "Generator",
      compressor: "Compressor",
      forklift: "Forklift",
      excavator: "Excavator",
      bike: "Bicycle",
      ebike: "E-bike",
      scooter: "Electric Scooter",
      trailer: "Trailer",
      caravan: "Caravan",
      solar: "Solar Panel",
      battery: "Battery System",
      tractor: "Tractor",
      harvester: "Harvester",
      medicalDevice: "Medical Device",
      industrialMachine: "Industrial Machine",
      other: "Other",
    },
  },

  es: {
    heroTitle: "Registrar activo",
    heroSubtitle:
      "Inicie una solicitud de registro para un activo y cree su cuenta de inmediato.",
    applicantTitle: "Solicitante",
    applicantSubtitle:
      "Introduzca sus datos básicos. Con esto creamos su cuenta y vinculamos el registro a su perfil.",
    applicantTypeLabel: "Tipo de solicitante",
    applicantTypePrivate: "Particular",
    applicantTypeSme: "Empresa",
    nameLabel: "Nombre",
    namePlaceholder: "Nombre completo",
    emailLabel: "Correo electrónico",
    passwordLabel: "Contraseña",
    companyLabel: "Nombre de la empresa (opcional)",
    companyPlaceholder: "Nombre de la empresa",
    vatLabel: "Número de IVA (opcional)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Datos del activo",
    assetSubtitle:
      "Introduzca los datos básicos del activo. La verificación adicional y los documentos pueden añadirse más tarde.",
    assetNameLabel: "Nombre del activo",
    assetNamePlaceholder:
      "P. ej. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Generador Atlas Copco",
    categoryLabel: "Categoría",
    subcategoryLabel: "Subcategoría",
    brandLabel: "Marca",
    brandPlaceholder: "P. ej. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Modelo",
    modelPlaceholder: "P. ej. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Número de identificación / serie / bastidor",
    riskTitle: "Perfil de riesgo: Riesgo de fraude transfronterizo",
    riskText:
      "Esta categoría se supervisa para verificación de propiedad, señales de robo y riesgo de fraude transfronterizo.",
    submit: "Crear cuenta y continuar",
    submitting: "Enviando...",
    success: "Solicitud de registro creada correctamente.",
    error: "Algo salió mal. Inténtelo de nuevo.",
    categories: {
      vehicle: "Vehículos",
      equipment: "Máquinas",
      bikelightmobility: "Bicicletas",
      trailer: "Remolques",
      energy: "Energía",
      agriculture: "Agricultura",
      medical: "Médico",
      industrial: "Industria",
      other: "Otro",
    },
    subcategories: {
      passengerCar: "Turismo",
      van: "Furgoneta",
      truck: "Camión",
      motorcycle: "Motocicleta",
      bus: "Autobús",
      constructionMachine: "Máquina de construcción",
      generator: "Generador",
      compressor: "Compresor",
      forklift: "Carretilla elevadora",
      excavator: "Excavadora",
      bike: "Bicicleta",
      ebike: "Bicicleta eléctrica",
      scooter: "Patinete eléctrico",
      trailer: "Remolque",
      caravan: "Caravana",
      solar: "Panel solar",
      battery: "Sistema de batería",
      tractor: "Tractor",
      harvester: "Cosechadora",
      medicalDevice: "Dispositivo médico",
      industrialMachine: "Máquina industrial",
      other: "Otro",
    },
  },

  de: {
    heroTitle: "Asset registrieren",
    heroSubtitle:
      "Starten Sie eine Registrierungsanfrage für ein Asset und erstellen Sie sofort Ihr Konto.",
    applicantTitle: "Antragsteller",
    applicantSubtitle:
      "Geben Sie Ihre Basisdaten ein. Damit erstellen wir Ihr Konto und verknüpfen die Registrierung mit Ihrem Profil.",
    applicantTypeLabel: "Antragstellertyp",
    applicantTypePrivate: "Privat",
    applicantTypeSme: "Unternehmen",
    nameLabel: "Name",
    namePlaceholder: "Vollständiger Name",
    emailLabel: "E-Mail",
    passwordLabel: "Passwort",
    companyLabel: "Firmenname (optional)",
    companyPlaceholder: "Firmenname",
    vatLabel: "USt-IdNr. (optional)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Asset-Daten",
    assetSubtitle:
      "Geben Sie die Basisdaten des Assets ein. Weitere Verifizierung und Dokumente können später hinzugefügt werden.",
    assetNameLabel: "Asset-Name",
    assetNamePlaceholder:
      "Z. B. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
    categoryLabel: "Kategorie",
    subcategoryLabel: "Unterkategorie",
    brandLabel: "Marke",
    brandPlaceholder: "Z. B. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Modell",
    modelPlaceholder: "Z. B. Corsa / 320D / WA380 / ST3",
    vinLabel: "FIN",
    vinPlaceholder: "Fahrzeug-Identnummer / Seriennummer / Rahmennummer",
    riskTitle: "Risikoprofil: Grenzüberschreitendes Betrugsrisiko",
    riskText:
      "Diese Kategorie wird auf Eigentumsprüfung, Diebstahlsignale und grenzüberschreitendes Betrugsrisiko überwacht.",
    submit: "Konto erstellen und fortfahren",
    submitting: "Wird gesendet...",
    success: "Registrierungsanfrage erfolgreich erstellt.",
    error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    categories: {
      vehicle: "Fahrzeuge",
      equipment: "Maschinen",
      bikelightmobility: "Fahrräder",
      trailer: "Anhänger",
      energy: "Energie",
      agriculture: "Landwirtschaft",
      medical: "Medizinisch",
      industrial: "Industrie",
      other: "Andere",
    },
    subcategories: {
      passengerCar: "Pkw",
      van: "Transporter",
      truck: "Lkw",
      motorcycle: "Motorrad",
      bus: "Bus",
      constructionMachine: "Baumaschine",
      generator: "Generator",
      compressor: "Kompressor",
      forklift: "Gabelstapler",
      excavator: "Bagger",
      bike: "Fahrrad",
      ebike: "E-Bike",
      scooter: "E-Scooter",
      trailer: "Anhänger",
      caravan: "Wohnwagen",
      solar: "Solarmodul",
      battery: "Batteriesystem",
      tractor: "Traktor",
      harvester: "Mähdrescher",
      medicalDevice: "Medizinisches Gerät",
      industrialMachine: "Industriemaschine",
      other: "Andere",
    },
  },

  fr: {
    heroTitle: "Enregistrer l’actif",
    heroSubtitle:
      "Commencez une demande d’enregistrement pour un actif et créez immédiatement votre compte.",
    applicantTitle: "Demandeur",
    applicantSubtitle:
      "Saisissez vos informations de base. Nous les utilisons pour créer votre compte et lier l’enregistrement à votre profil.",
    applicantTypeLabel: "Type de demandeur",
    applicantTypePrivate: "Particulier",
    applicantTypeSme: "Entreprise",
    nameLabel: "Nom",
    namePlaceholder: "Nom complet",
    emailLabel: "E-mail",
    passwordLabel: "Mot de passe",
    companyLabel: "Nom de l’entreprise (optionnel)",
    companyPlaceholder: "Nom de l’entreprise",
    vatLabel: "Numéro de TVA (optionnel)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Détails de l’actif",
    assetSubtitle:
      "Saisissez les données de base de l’actif. La vérification complémentaire et les documents peuvent être ajoutés plus tard.",
    assetNameLabel: "Nom de l’actif",
    assetNamePlaceholder:
      "Ex. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Générateur Atlas Copco",
    categoryLabel: "Catégorie",
    subcategoryLabel: "Sous-catégorie",
    brandLabel: "Marque",
    brandPlaceholder: "Ex. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Modèle",
    modelPlaceholder: "Ex. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Numéro d’identification / série / cadre",
    riskTitle: "Profil de risque : risque de fraude transfrontalière",
    riskText:
      "Cette catégorie est surveillée pour la vérification de propriété, les signaux de vol et le risque de fraude transfrontalière.",
    submit: "Créer un compte et continuer",
    submitting: "Envoi en cours...",
    success: "Demande d’enregistrement créée avec succès.",
    error: "Une erreur s’est produite. Veuillez réessayer.",
    categories: {
      vehicle: "Véhicules",
      equipment: "Machines",
      bikelightmobility: "Vélos",
      trailer: "Remorques",
      energy: "Énergie",
      agriculture: "Agriculture",
      medical: "Médical",
      industrial: "Industrie",
      other: "Autre",
    },
    subcategories: {
      passengerCar: "Voiture particulière",
      van: "Fourgonnette",
      truck: "Camion",
      motorcycle: "Moto",
      bus: "Bus",
      constructionMachine: "Machine de chantier",
      generator: "Générateur",
      compressor: "Compresseur",
      forklift: "Chariot élévateur",
      excavator: "Excavatrice",
      bike: "Vélo",
      ebike: "Vélo électrique",
      scooter: "Trottinette électrique",
      trailer: "Remorque",
      caravan: "Caravane",
      solar: "Panneau solaire",
      battery: "Système de batterie",
      tractor: "Tracteur",
      harvester: "Moissonneuse",
      medicalDevice: "Dispositif médical",
      industrialMachine: "Machine industrielle",
      other: "Autre",
    },
  },

  it: {
    heroTitle: "Registra asset",
    heroSubtitle:
      "Avvia una richiesta di registrazione per un asset e crea subito il tuo account.",
    applicantTitle: "Richiedente",
    applicantSubtitle:
      "Inserisci i tuoi dati di base. Li usiamo per creare il tuo account e collegare la registrazione al tuo profilo.",
    applicantTypeLabel: "Tipo di richiedente",
    applicantTypePrivate: "Privato",
    applicantTypeSme: "Azienda",
    nameLabel: "Nome",
    namePlaceholder: "Nome completo",
    emailLabel: "E-mail",
    passwordLabel: "Password",
    companyLabel: "Nome azienda (opzionale)",
    companyPlaceholder: "Nome azienda",
    vatLabel: "Partita IVA (opzionale)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Dettagli dell’asset",
    assetSubtitle:
      "Inserisci i dati di base dell’asset. Ulteriori verifiche e documenti possono essere aggiunti successivamente.",
    assetNameLabel: "Nome dell’asset",
    assetNamePlaceholder:
      "Es. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Generatore Atlas Copco",
    categoryLabel: "Categoria",
    subcategoryLabel: "Sottocategoria",
    brandLabel: "Marca",
    brandPlaceholder: "Es. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Modello",
    modelPlaceholder: "Es. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Numero identificativo / seriale / telaio",
    riskTitle: "Profilo di rischio: rischio di frode transfrontaliera",
    riskText:
      "Questa categoria è monitorata per la verifica della proprietà, segnali di furto e rischio di frode transfrontaliera.",
    submit: "Crea account e continua",
    submitting: "Invio in corso...",
    success: "Richiesta di registrazione creata con successo.",
    error: "Si è verificato un errore. Riprova.",
    categories: {
      vehicle: "Veicoli",
      equipment: "Macchine",
      bikelightmobility: "Biciclette",
      trailer: "Rimorchi",
      energy: "Energia",
      agriculture: "Agricoltura",
      medical: "Medicale",
      industrial: "Industria",
      other: "Altro",
    },
    subcategories: {
      passengerCar: "Autovettura",
      van: "Furgone",
      truck: "Camion",
      motorcycle: "Motocicletta",
      bus: "Autobus",
      constructionMachine: "Macchina da costruzione",
      generator: "Generatore",
      compressor: "Compressore",
      forklift: "Muletto",
      excavator: "Escavatore",
      bike: "Bicicletta",
      ebike: "Bici elettrica",
      scooter: "Monopattino elettrico",
      trailer: "Rimorchio",
      caravan: "Caravan",
      solar: "Pannello solare",
      battery: "Sistema di batteria",
      tractor: "Trattore",
      harvester: "Mietitrebbia",
      medicalDevice: "Dispositivo medico",
      industrialMachine: "Macchina industriale",
      other: "Altro",
    },
  },

  nl: {
    heroTitle: "Asset registreren",
    heroSubtitle:
      "Start een registratieaanvraag voor een asset en maak direct je account aan.",
    applicantTitle: "Aanvrager",
    applicantSubtitle:
      "Vul je basisgegevens in. Hiermee maken we je account en koppelen we de registratie aan jouw profiel.",
    applicantTypeLabel: "Aanvragerstype",
    applicantTypePrivate: "Particulier",
    applicantTypeSme: "Bedrijf",
    nameLabel: "Naam",
    namePlaceholder: "Volledige naam",
    emailLabel: "E-mail",
    passwordLabel: "Wachtwoord",
    companyLabel: "Bedrijfsnaam (optioneel)",
    companyPlaceholder: "Naam bedrijf",
    vatLabel: "BTW nummer (optioneel)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Assetgegevens",
    assetSubtitle:
      "Geef de basisgegevens van het asset op. Verdere verificatie en documenten kunnen later worden toegevoegd.",
    assetNameLabel: "Asset naam",
    assetNamePlaceholder:
      "Bijv. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
    categoryLabel: "Categorie",
    subcategoryLabel: "Subcategorie",
    brandLabel: "Merk",
    brandPlaceholder: "Bijv. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Model",
    modelPlaceholder: "Bijv. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Voertuigidentificatienummer / serienummer / framenummer",
    riskTitle: "Risicoprofiel: Grensoverschrijdend frauderisico",
    riskText:
      "Deze categorie wordt gemonitord op eigendomsverificatie, diefstalsignalen en grensoverschrijdend frauderisico.",
    submit: "Account aanmaken en doorgaan",
    submitting: "Bezig met verzenden...",
    success: "Registratieaanvraag succesvol aangemaakt.",
    error: "Er is iets misgegaan. Probeer het opnieuw.",
    categories: {
      vehicle: "Voertuigen",
      equipment: "Machines",
      bikelightmobility: "Fietsen",
      trailer: "Aanhangers",
      energy: "Energie",
      agriculture: "Landbouw",
      medical: "Medisch",
      industrial: "Industrie",
      other: "Overig",
    },
    subcategories: {
      passengerCar: "Personenauto",
      van: "Bestelwagen",
      truck: "Vrachtwagen",
      motorcycle: "Motorfiets",
      bus: "Bus",
      constructionMachine: "Bouwmachine",
      generator: "Generator",
      compressor: "Compressor",
      forklift: "Heftruck",
      excavator: "Graafmachine",
      bike: "Fiets",
      ebike: "E-bike",
      scooter: "Elektrische step",
      trailer: "Aanhanger",
      caravan: "Caravan",
      solar: "Zonnepaneel",
      battery: "Batterijsysteem",
      tractor: "Tractor",
      harvester: "Oogstmachine",
      medicalDevice: "Medisch apparaat",
      industrialMachine: "Industriële machine",
      other: "Overig",
    },
  },

  pt: {
    heroTitle: "Registar ativo",
    heroSubtitle:
      "Inicie um pedido de registo para um ativo e crie a sua conta imediatamente.",
    applicantTitle: "Requerente",
    applicantSubtitle:
      "Introduza os seus dados básicos. Utilizamos estas informações para criar a sua conta e associar o registo ao seu perfil.",
    applicantTypeLabel: "Tipo de requerente",
    applicantTypePrivate: "Particular",
    applicantTypeSme: "Empresa",
    nameLabel: "Nome",
    namePlaceholder: "Nome completo",
    emailLabel: "E-mail",
    passwordLabel: "Palavra-passe",
    companyLabel: "Nome da empresa (opcional)",
    companyPlaceholder: "Nome da empresa",
    vatLabel: "Número de IVA (opcional)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Detalhes do ativo",
    assetSubtitle:
      "Introduza os dados básicos do ativo. Verificação adicional e documentos podem ser adicionados mais tarde.",
    assetNameLabel: "Nome do ativo",
    assetNamePlaceholder:
      "Ex.: Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Gerador Atlas Copco",
    categoryLabel: "Categoria",
    subcategoryLabel: "Subcategoria",
    brandLabel: "Marca",
    brandPlaceholder: "Ex.: Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Modelo",
    modelPlaceholder: "Ex.: Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Número de identificação / série / quadro",
    riskTitle: "Perfil de risco: risco de fraude transfronteiriça",
    riskText:
      "Esta categoria é monitorizada para verificação de propriedade, sinais de roubo e risco de fraude transfronteiriça.",
    submit: "Criar conta e continuar",
    submitting: "A enviar...",
    success: "Pedido de registo criado com sucesso.",
    error: "Algo correu mal. Tente novamente.",
    categories: {
      vehicle: "Veículos",
      equipment: "Máquinas",
      bikelightmobility: "Bicicletas",
      trailer: "Reboques",
      energy: "Energia",
      agriculture: "Agricultura",
      medical: "Médico",
      industrial: "Indústria",
      other: "Outro",
    },
    subcategories: {
      passengerCar: "Automóvel de passageiros",
      van: "Carrinha",
      truck: "Camião",
      motorcycle: "Motociclo",
      bus: "Autocarro",
      constructionMachine: "Máquina de construção",
      generator: "Gerador",
      compressor: "Compressor",
      forklift: "Empilhador",
      excavator: "Escavadora",
      bike: "Bicicleta",
      ebike: "Bicicleta elétrica",
      scooter: "Trotinete elétrica",
      trailer: "Reboque",
      caravan: "Caravana",
      solar: "Painel solar",
      battery: "Sistema de bateria",
      tractor: "Trator",
      harvester: "Ceifeira",
      medicalDevice: "Dispositivo médico",
      industrialMachine: "Máquina industrial",
      other: "Outro",
    },
  },

  ru: {
    heroTitle: "Зарегистрировать актив",
    heroSubtitle:
      "Начните заявку на регистрацию актива и сразу создайте свою учетную запись.",
    applicantTitle: "Заявитель",
    applicantSubtitle:
      "Введите основные данные. Мы используем их для создания учетной записи и привязки регистрации к вашему профилю.",
    applicantTypeLabel: "Тип заявителя",
    applicantTypePrivate: "Частное лицо",
    applicantTypeSme: "Компания",
    nameLabel: "Имя",
    namePlaceholder: "Полное имя",
    emailLabel: "Эл. почта",
    passwordLabel: "Пароль",
    companyLabel: "Название компании (необязательно)",
    companyPlaceholder: "Название компании",
    vatLabel: "Номер НДС (необязательно)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "Данные актива",
    assetSubtitle:
      "Введите основные данные актива. Дополнительная проверка и документы могут быть добавлены позже.",
    assetNameLabel: "Название актива",
    assetNamePlaceholder:
      "Напр. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Генератор Atlas Copco",
    categoryLabel: "Категория",
    subcategoryLabel: "Подкатегория",
    brandLabel: "Бренд",
    brandPlaceholder: "Напр. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "Модель",
    modelPlaceholder: "Напр. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "Идентификационный / серийный / рамный номер",
    riskTitle: "Профиль риска: трансграничный риск мошенничества",
    riskText:
      "Эта категория отслеживается для проверки права собственности, сигналов о краже и риска трансграничного мошенничества.",
    submit: "Создать учетную запись и продолжить",
    submitting: "Отправка...",
    success: "Заявка на регистрацию успешно создана.",
    error: "Что-то пошло не так. Попробуйте снова.",
    categories: {
      vehicle: "Транспорт",
      equipment: "Машины",
      bikelightmobility: "Велосипеды",
      trailer: "Прицепы",
      energy: "Энергия",
      agriculture: "Сельское хозяйство",
      medical: "Медицинский",
      industrial: "Промышленность",
      other: "Другое",
    },
    subcategories: {
      passengerCar: "Легковой автомобиль",
      van: "Фургон",
      truck: "Грузовик",
      motorcycle: "Мотоцикл",
      bus: "Автобус",
      constructionMachine: "Строительная машина",
      generator: "Генератор",
      compressor: "Компрессор",
      forklift: "Погрузчик",
      excavator: "Экскаватор",
      bike: "Велосипед",
      ebike: "Электровелосипед",
      scooter: "Электросамокат",
      trailer: "Прицеп",
      caravan: "Караван",
      solar: "Солнечная панель",
      battery: "Аккумуляторная система",
      tractor: "Трактор",
      harvester: "Комбайн",
      medicalDevice: "Медицинское устройство",
      industrialMachine: "Промышленная машина",
      other: "Другое",
    },
  },

  zh: {
    heroTitle: "注册资产",
    heroSubtitle: "开始提交资产注册申请，并立即创建您的账户。",
    applicantTitle: "申请人",
    applicantSubtitle:
      "请输入您的基本信息。我们将使用这些信息创建您的账户，并将注册与您的个人资料关联。",
    applicantTypeLabel: "申请人类型",
    applicantTypePrivate: "个人",
    applicantTypeSme: "企业",
    nameLabel: "姓名",
    namePlaceholder: "完整姓名",
    emailLabel: "电子邮箱",
    passwordLabel: "密码",
    companyLabel: "公司名称（可选）",
    companyPlaceholder: "公司名称",
    vatLabel: "增值税号（可选）",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "资产信息",
    assetSubtitle: "请输入资产的基本信息。后续可补充进一步验证和文件。",
    assetNameLabel: "资产名称",
    assetNamePlaceholder:
      "例如：Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco 发电机",
    categoryLabel: "类别",
    subcategoryLabel: "子类别",
    brandLabel: "品牌",
    brandPlaceholder: "例如：Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "型号",
    modelPlaceholder: "例如：Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "车辆识别号 / 序列号 / 车架号",
    riskTitle: "风险概况：跨境欺诈风险",
    riskText: "该类别将监控所有权验证、盗窃信号以及跨境欺诈风险。",
    submit: "创建账户并继续",
    submitting: "提交中...",
    success: "注册申请已成功创建。",
    error: "出现错误。请重试。",
    categories: {
      vehicle: "车辆",
      equipment: "机械",
      bikelightmobility: "自行车",
      trailer: "拖车",
      energy: "能源",
      agriculture: "农业",
      medical: "医疗",
      industrial: "工业",
      other: "其他",
    },
    subcategories: {
      passengerCar: "乘用车",
      van: "厢式车",
      truck: "卡车",
      motorcycle: "摩托车",
      bus: "巴士",
      constructionMachine: "工程机械",
      generator: "发电机",
      compressor: "压缩机",
      forklift: "叉车",
      excavator: "挖掘机",
      bike: "自行车",
      ebike: "电动自行车",
      scooter: "电动滑板车",
      trailer: "拖车",
      caravan: "房车拖挂",
      solar: "太阳能板",
      battery: "电池系统",
      tractor: "拖拉机",
      harvester: "收割机",
      medicalDevice: "医疗设备",
      industrialMachine: "工业机器",
      other: "其他",
    },
  },

  hi: {
    heroTitle: "एसेट पंजीकृत करें",
    heroSubtitle:
      "किसी एसेट के लिए पंजीकरण अनुरोध शुरू करें और तुरंत अपना खाता बनाएं।",
    applicantTitle: "आवेदक",
    applicantSubtitle:
      "अपनी मूल जानकारी दर्ज करें। हम इसका उपयोग आपका खाता बनाने और पंजीकरण को आपकी प्रोफ़ाइल से जोड़ने के लिए करते हैं।",
    applicantTypeLabel: "आवेदक प्रकार",
    applicantTypePrivate: "व्यक्तिगत",
    applicantTypeSme: "व्यवसाय",
    nameLabel: "नाम",
    namePlaceholder: "पूरा नाम",
    emailLabel: "ईमेल",
    passwordLabel: "पासवर्ड",
    companyLabel: "कंपनी का नाम (वैकल्पिक)",
    companyPlaceholder: "कंपनी का नाम",
    vatLabel: "VAT नंबर (वैकल्पिक)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "एसेट विवरण",
    assetSubtitle:
      "एसेट की मूल जानकारी दर्ज करें। आगे का सत्यापन और दस्तावेज़ बाद में जोड़े जा सकते हैं।",
    assetNameLabel: "एसेट नाम",
    assetNamePlaceholder:
      "उदा. Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
    categoryLabel: "श्रेणी",
    subcategoryLabel: "उपश्रेणी",
    brandLabel: "ब्रांड",
    brandPlaceholder: "उदा. Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "मॉडल",
    modelPlaceholder: "उदा. Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "वाहन पहचान / सीरियल / फ्रेम नंबर",
    riskTitle: "जोखिम प्रोफ़ाइल: सीमा-पार धोखाधड़ी जोखिम",
    riskText:
      "इस श्रेणी की निगरानी स्वामित्व सत्यापन, चोरी संकेतों और सीमा-पार धोखाधड़ी जोखिम के लिए की जाती है।",
    submit: "खाता बनाएं और आगे बढ़ें",
    submitting: "भेजा जा रहा है...",
    success: "पंजीकरण अनुरोध सफलतापूर्वक बनाया गया।",
    error: "कुछ गलत हो गया। कृपया फिर से प्रयास करें।",
    categories: {
      vehicle: "वाहन",
      equipment: "मशीनें",
      bikelightmobility: "साइकिलें",
      trailer: "ट्रेलर",
      energy: "ऊर्जा",
      agriculture: "कृषि",
      medical: "मेडिकल",
      industrial: "उद्योग",
      other: "अन्य",
    },
    subcategories: {
      passengerCar: "पैसेंजर कार",
      van: "वैन",
      truck: "ट्रक",
      motorcycle: "मोटरसाइकिल",
      bus: "बस",
      constructionMachine: "निर्माण मशीन",
      generator: "जेनरेटर",
      compressor: "कंप्रेसर",
      forklift: "फोर्कलिफ्ट",
      excavator: "एक्सकेवेटर",
      bike: "साइकिल",
      ebike: "ई-बाइक",
      scooter: "इलेक्ट्रिक स्कूटर",
      trailer: "ट्रेलर",
      caravan: "कारवां",
      solar: "सोलर पैनल",
      battery: "बैटरी सिस्टम",
      tractor: "ट्रैक्टर",
      harvester: "हार्वेस्टर",
      medicalDevice: "मेडिकल डिवाइस",
      industrialMachine: "औद्योगिक मशीन",
      other: "अन्य",
    },
  },

  ar: {
    heroTitle: "تسجيل الأصل",
    heroSubtitle: "ابدأ طلب تسجيل لأصل وأنشئ حسابك فورًا.",
    applicantTitle: "مقدم الطلب",
    applicantSubtitle:
      "أدخل بياناتك الأساسية. نستخدمها لإنشاء حسابك وربط التسجيل بملفك الشخصي.",
    applicantTypeLabel: "نوع مقدم الطلب",
    applicantTypePrivate: "فرد",
    applicantTypeSme: "شركة",
    nameLabel: "الاسم",
    namePlaceholder: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    companyLabel: "اسم الشركة (اختياري)",
    companyPlaceholder: "اسم الشركة",
    vatLabel: "رقم ضريبة القيمة المضافة (اختياري)",
    vatPlaceholder: "ESB12345678 / NL123456789B01",
    assetTitle: "تفاصيل الأصل",
    assetSubtitle:
      "أدخل البيانات الأساسية للأصل. يمكن إضافة التحقق الإضافي والمستندات لاحقًا.",
    assetNameLabel: "اسم الأصل",
    assetNamePlaceholder:
      "مثال: Opel Corsa 1.2 / CAT 320D / Stromer ST3 / Atlas Copco Generator",
    categoryLabel: "الفئة",
    subcategoryLabel: "الفئة الفرعية",
    brandLabel: "العلامة التجارية",
    brandPlaceholder: "مثال: Opel / Caterpillar / Komatsu / Trek",
    modelLabel: "الطراز",
    modelPlaceholder: "مثال: Corsa / 320D / WA380 / ST3",
    vinLabel: "VIN",
    vinPlaceholder: "رقم التعريف / الرقم التسلسلي / رقم الهيكل",
    riskTitle: "ملف المخاطر: مخاطر الاحتيال عبر الحدود",
    riskText:
      "تتم مراقبة هذه الفئة للتحقق من الملكية وإشارات السرقة ومخاطر الاحتيال عبر الحدود.",
    submit: "إنشاء الحساب والمتابعة",
    submitting: "جارٍ الإرسال...",
    success: "تم إنشاء طلب التسجيل بنجاح.",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    categories: {
      vehicle: "مركبات",
      equipment: "آلات",
      bikelightmobility: "دراجات",
      trailer: "مقطورات",
      energy: "طاقة",
      agriculture: "زراعة",
      medical: "طبي",
      industrial: "صناعة",
      other: "أخرى",
    },
    subcategories: {
      passengerCar: "سيارة ركاب",
      van: "فان",
      truck: "شاحنة",
      motorcycle: "دراجة نارية",
      bus: "حافلة",
      constructionMachine: "آلة بناء",
      generator: "مولد",
      compressor: "ضاغط",
      forklift: "رافعة شوكية",
      excavator: "حفارة",
      bike: "دراجة",
      ebike: "دراجة كهربائية",
      scooter: "سكوتر كهربائي",
      trailer: "مقطورة",
      caravan: "كرفان",
      solar: "لوح شمسي",
      battery: "نظام بطارية",
      tractor: "جرار",
      harvester: "حصادة",
      medicalDevice: "جهاز طبي",
      industrialMachine: "آلة صناعية",
      other: "أخرى",
    },
  },
};

function getSubcategoryOptions(category: Category) {
  switch (category) {
    case "vehicle":
      return ["passengerCar", "van", "truck", "motorcycle", "bus"] as const;
    case "equipment":
      return [
        "constructionMachine",
        "generator",
        "compressor",
        "forklift",
        "excavator",
      ] as const;
    case "bikelightmobility":
      return ["bike", "ebike", "scooter"] as const;
    case "trailer":
      return ["trailer", "caravan"] as const;
    case "energy":
      return ["solar", "battery"] as const;
    case "agriculture":
      return ["tractor", "harvester"] as const;
    case "medical":
      return ["medicalDevice"] as const;
    case "industrial":
      return ["industrialMachine"] as const;
    default:
      return ["other"] as const;
  }
}

export default function RegisterPage({ params }: Props) {
  const { lang } = use(params);

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const t = TEXTS[currentLang];

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const [applicantType, setApplicantType] = useState<ApplicantType>("private");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");

  const [category, setCategory] = useState<Category>("vehicle");
  const [assetName, setAssetName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");

  const subcategoryOptions = useMemo(
    () => getSubcategoryOptions(category),
    [category]
  );
  const [subcategory, setSubcategory] = useState<string>("passengerCar");

  useEffect(() => {
    const firstOption = getSubcategoryOptions(category)[0];
    if (!subcategoryOptions.includes(subcategory as never)) {
      setSubcategory(firstOption);
    }
  }, [category, subcategory, subcategoryOptions]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");

    const payload = {
      applicantType,
      name,
      email,
      password,
      companyName,
      vatNumber,
      assetName,
      category,
      subcategory,
      brand,
      model,
      vin,
      lang: currentLang,
      declarationAccepted: true,
    };

    try {
      const response = await fetch("/api/register-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("REGISTER ERROR", {
          status: response.status,
          data,
          payload,
        });
        throw new Error(data?.error || data?.message || "Request failed");
      }

      console.log("REGISTER SUCCESS", data);
      setSubmitState("success");
    } catch (error) {
      console.error("REGISTER SUBMIT FAILED", error);
      setSubmitState("error");
    }
  }

  return (
    <>
      <SiteHeader lang={currentLang} />

      <PageHero title={t.heroTitle} subtitle={t.heroSubtitle} />

      <section className="bg-[#f7f7f8] py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-black/20 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {t.applicantTitle}
                </h2>
                <p className="mt-1 text-sm text-black/60">
                  {t.applicantSubtitle}
                </p>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.applicantTypeLabel}{" "}
                    <span className="text-black/70">*</span>
                  </label>
                  <select
                    value={applicantType}
                    onChange={(e) =>
                      setApplicantType(e.target.value as ApplicantType)
                    }
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/40"
                  >
                    <option value="private">{t.applicantTypePrivate}</option>
                    <option value="sme">{t.applicantTypeSme}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.nameLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.emailLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/15 bg-[#edf2fb] px-3 text-sm outline-none transition focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.passwordLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/15 bg-[#edf2fb] px-3 text-sm outline-none transition focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.companyPlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.vatLabel}
                  </label>
                  <input
                    type="text"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    placeholder={t.vatPlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                  />
                </div>
              </div>

              <div className="pt-2">
                <h2 className="text-xl font-semibold text-black">
                  {t.assetTitle}
                </h2>
                <p className="mt-1 text-sm text-black/60">{t.assetSubtitle}</p>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.assetNameLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    placeholder={t.assetNamePlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.categoryLabel} <span className="text-black/70">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/40"
                  >
                    <option value="vehicle">{t.categories.vehicle}</option>
                    <option value="equipment">{t.categories.equipment}</option>
                    <option value="bikelightmobility">
                      {t.categories.bikelightmobility}
                    </option>
                    <option value="trailer">{t.categories.trailer}</option>
                    <option value="energy">{t.categories.energy}</option>
                    <option value="agriculture">{t.categories.agriculture}</option>
                    <option value="medical">{t.categories.medical}</option>
                    <option value="industrial">{t.categories.industrial}</option>
                    <option value="other">{t.categories.other}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.subcategoryLabel}{" "}
                    <span className="text-black/70">*</span>
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black/40"
                  >
                    {subcategoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {t.subcategories[option]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border border-[#d7deea] bg-[#f2f6fc] px-4 py-3">
                  <p className="text-sm font-semibold text-black">
                    {t.riskTitle}
                  </p>
                  <p className="mt-1 text-sm text-black/65">{t.riskText}</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.brandLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder={t.brandPlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.modelLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder={t.modelPlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    {t.vinLabel} <span className="text-black/70">*</span>
                  </label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder={t.vinPlaceholder}
                    className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/40"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitState === "submitting" ? t.submitting : t.submit}
                </button>

                {submitState === "success" && (
                  <p className="mt-3 text-sm text-green-700">{t.success}</p>
                )}

                {submitState === "error" && (
                  <p className="mt-3 text-sm text-red-700">{t.error}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter lang={currentLang} />
    </>
  );
}