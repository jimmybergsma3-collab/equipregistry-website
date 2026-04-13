import type { Lang } from "@/lib/i18n/config";

type CustomerDashboardText = {
  dashboardTitle: string;
  dashboardSubtitle: string;
  dashboardLink: string;
  profileLink: string;
  passportsLink: string;
  newRegistration: string;
  backToDashboard: string;
  profileTitle: string;
  profileSubtitle: string;
  passportsTitle: string;
  passportsSubtitle: string;
  noPassportsTitle: string;
  noPassportsText: string;
  viewPassport: string;
  openRequest: string;
  profileLabels: {
    name: string;
    email: string;
    company: string;
    vat: string;
    verification: string;
    status: string;
  };
  verified: string;
  unverified: string;
  notProvided: string;
};

const TEXT: Record<Lang, CustomerDashboardText> = {
  en: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Manage your registrations, passports, and account details from one place.",
    dashboardLink: "Dashboard",
    profileLink: "My details",
    passportsLink: "My passports",
    newRegistration: "New registration",
    backToDashboard: "Back to dashboard",
    profileTitle: "My details",
    profileSubtitle: "Review the account details linked to your EquipRegistry profile.",
    passportsTitle: "My passports",
    passportsSubtitle: "Issued EquipRegistry passports linked to your account.",
    noPassportsTitle: "No passports available yet",
    noPassportsText:
      "Issued passports will appear here as soon as a registration reaches passport status.",
    viewPassport: "View passport",
    openRequest: "Open request",
    profileLabels: {
      name: "Name",
      email: "Email",
      company: "Company",
      vat: "VAT number",
      verification: "Email verification",
      status: "Status",
    },
    verified: "Verified",
    unverified: "Pending verification",
    notProvided: "Not provided",
  },
  es: {
    dashboardTitle: "Panel",
    dashboardSubtitle:
      "Gestione sus registros, pasaportes y datos de cuenta desde un solo lugar.",
    dashboardLink: "Panel",
    profileLink: "Mis datos",
    passportsLink: "Mis pasaportes",
    newRegistration: "Nuevo registro",
    backToDashboard: "Volver al panel",
    profileTitle: "Mis datos",
    profileSubtitle: "Revise los datos de cuenta vinculados a su perfil de EquipRegistry.",
    passportsTitle: "Mis pasaportes",
    passportsSubtitle: "Pasaportes emitidos de EquipRegistry vinculados a su cuenta.",
    noPassportsTitle: "Todavia no hay pasaportes",
    noPassportsText:
      "Los pasaportes emitidos apareceran aqui en cuanto un registro alcance estado de pasaporte.",
    viewPassport: "Ver pasaporte",
    openRequest: "Abrir solicitud",
    profileLabels: {
      name: "Nombre",
      email: "Correo electronico",
      company: "Empresa",
      vat: "Numero de IVA",
      verification: "Verificacion de correo",
      status: "Estado",
    },
    verified: "Verificado",
    unverified: "Verificacion pendiente",
    notProvided: "No facilitado",
  },
  de: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Verwalten Sie Ihre Registrierungen, Pässe und Kontodaten an einem Ort.",
    dashboardLink: "Dashboard",
    profileLink: "Meine Daten",
    passportsLink: "Meine Paesse",
    newRegistration: "Neue Registrierung",
    backToDashboard: "Zurueck zum Dashboard",
    profileTitle: "Meine Daten",
    profileSubtitle: "Pruefen Sie die Kontodaten Ihres EquipRegistry-Profils.",
    passportsTitle: "Meine Paesse",
    passportsSubtitle: "Ausgestellte EquipRegistry-Paesse in Ihrem Konto.",
    noPassportsTitle: "Noch keine Paesse verfuegbar",
    noPassportsText:
      "Ausgestellte Paesse erscheinen hier, sobald eine Registrierung den Passstatus erreicht.",
    viewPassport: "Pass ansehen",
    openRequest: "Anfrage oeffnen",
    profileLabels: {
      name: "Name",
      email: "E-Mail",
      company: "Firma",
      vat: "USt-Nummer",
      verification: "E-Mail-Bestaetigung",
      status: "Status",
    },
    verified: "Bestaetigt",
    unverified: "Bestaetigung ausstehend",
    notProvided: "Nicht angegeben",
  },
  fr: {
    dashboardTitle: "Tableau de bord",
    dashboardSubtitle:
      "Gerez vos enregistrements, passeports et informations de compte depuis un seul endroit.",
    dashboardLink: "Tableau de bord",
    profileLink: "Mes donnees",
    passportsLink: "Mes passeports",
    newRegistration: "Nouvel enregistrement",
    backToDashboard: "Retour au tableau de bord",
    profileTitle: "Mes donnees",
    profileSubtitle: "Consultez les informations de compte liees a votre profil EquipRegistry.",
    passportsTitle: "Mes passeports",
    passportsSubtitle: "Passeports EquipRegistry emis et lies a votre compte.",
    noPassportsTitle: "Aucun passeport disponible pour le moment",
    noPassportsText:
      "Les passeports emis apparaitront ici des qu'un enregistrement atteindra le statut passeport.",
    viewPassport: "Voir le passeport",
    openRequest: "Ouvrir la demande",
    profileLabels: {
      name: "Nom",
      email: "E-mail",
      company: "Entreprise",
      vat: "Numero de TVA",
      verification: "Verification e-mail",
      status: "Statut",
    },
    verified: "Verifie",
    unverified: "Verification en attente",
    notProvided: "Non renseigne",
  },
  it: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Gestisca registrazioni, passaporti e dati account da un unico punto.",
    dashboardLink: "Dashboard",
    profileLink: "I miei dati",
    passportsLink: "I miei passaporti",
    newRegistration: "Nuova registrazione",
    backToDashboard: "Torna alla dashboard",
    profileTitle: "I miei dati",
    profileSubtitle: "Controlli i dati account collegati al profilo EquipRegistry.",
    passportsTitle: "I miei passaporti",
    passportsSubtitle: "Passaporti EquipRegistry emessi e collegati al suo account.",
    noPassportsTitle: "Nessun passaporto disponibile",
    noPassportsText:
      "I passaporti emessi appariranno qui non appena una registrazione raggiungera lo stato passaporto.",
    viewPassport: "Vedi passaporto",
    openRequest: "Apri richiesta",
    profileLabels: {
      name: "Nome",
      email: "E-mail",
      company: "Azienda",
      vat: "Partita IVA",
      verification: "Verifica e-mail",
      status: "Stato",
    },
    verified: "Verificato",
    unverified: "Verifica in attesa",
    notProvided: "Non fornito",
  },
  nl: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Beheer je registraties, paspoorten en accountgegevens vanuit een plek.",
    dashboardLink: "Dashboard",
    profileLink: "Mijn gegevens",
    passportsLink: "Mijn paspoorten",
    newRegistration: "Nieuwe registratie",
    backToDashboard: "Terug naar dashboard",
    profileTitle: "Mijn gegevens",
    profileSubtitle: "Bekijk de accountgegevens die gekoppeld zijn aan je EquipRegistry-profiel.",
    passportsTitle: "Mijn paspoorten",
    passportsSubtitle: "Uitgegeven EquipRegistry-paspoorten die aan jouw account zijn gekoppeld.",
    noPassportsTitle: "Nog geen paspoorten beschikbaar",
    noPassportsText:
      "Uitgegeven paspoorten verschijnen hier zodra een registratie de paspoortstatus bereikt.",
    viewPassport: "Paspoort bekijken",
    openRequest: "Aanvraag openen",
    profileLabels: {
      name: "Naam",
      email: "E-mail",
      company: "Bedrijf",
      vat: "BTW-nummer",
      verification: "E-mailverificatie",
      status: "Status",
    },
    verified: "Geverifieerd",
    unverified: "Verificatie in afwachting",
    notProvided: "Niet opgegeven",
  },
  pt: {
    dashboardTitle: "Painel",
    dashboardSubtitle:
      "Gira os seus registos, passaportes e dados de conta num unico local.",
    dashboardLink: "Painel",
    profileLink: "Os meus dados",
    passportsLink: "Os meus passaportes",
    newRegistration: "Novo registo",
    backToDashboard: "Voltar ao painel",
    profileTitle: "Os meus dados",
    profileSubtitle: "Reveja os dados de conta ligados ao seu perfil EquipRegistry.",
    passportsTitle: "Os meus passaportes",
    passportsSubtitle: "Passaportes EquipRegistry emitidos e ligados a sua conta.",
    noPassportsTitle: "Ainda nao ha passaportes disponiveis",
    noPassportsText:
      "Os passaportes emitidos aparecerao aqui assim que um registo atingir estado de passaporte.",
    viewPassport: "Ver passaporte",
    openRequest: "Abrir pedido",
    profileLabels: {
      name: "Nome",
      email: "E-mail",
      company: "Empresa",
      vat: "Numero de IVA",
      verification: "Verificacao de e-mail",
      status: "Estado",
    },
    verified: "Verificado",
    unverified: "Verificacao pendente",
    notProvided: "Nao indicado",
  },
  ru: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Upravlyayte registratsiyami, pasportami i dannymi akkaunta v odnom meste.",
    dashboardLink: "Dashboard",
    profileLink: "Moi dannye",
    passportsLink: "Moi pasporta",
    newRegistration: "Novaya registratsiya",
    backToDashboard: "Nazad v dashboard",
    profileTitle: "Moi dannye",
    profileSubtitle: "Proverte dannye akkaunta, svyazannye s profilem EquipRegistry.",
    passportsTitle: "Moi pasporta",
    passportsSubtitle: "Vydannye pasporta EquipRegistry, svyazannye s vashim akkauntom.",
    noPassportsTitle: "Pasporta poka nedostupny",
    noPassportsText:
      "Vydannye pasporta poyavyatsya zdes, kak tolko registratsiya poluchit status pasporta.",
    viewPassport: "Otkryt pasport",
    openRequest: "Otkryt zapros",
    profileLabels: {
      name: "Imya",
      email: "Email",
      company: "Kompaniya",
      vat: "Nomer NDS",
      verification: "Podtverzhdeniye email",
      status: "Status",
    },
    verified: "Podtverzhden",
    unverified: "Podtverzhdeniye ozhidayetsya",
    notProvided: "Ne ukazano",
  },
  zh: {
    dashboardTitle: "Yibiao ban",
    dashboardSubtitle:
      "Zai yige difang guanli nin de zhuce, huxhao he zhanghu xinxi.",
    dashboardLink: "Yibiao ban",
    profileLink: "Wo de ziliao",
    passportsLink: "Wo de huxhao",
    newRegistration: "Xin zhuce",
    backToDashboard: "Fan hui yibiao ban",
    profileTitle: "Wo de ziliao",
    profileSubtitle: "Chakan yu nin EquipRegistry zhanghu guanlian de zhanghu xinxi.",
    passportsTitle: "Wo de huxhao",
    passportsSubtitle: "Yu nin zhanghu guanlian de yiqian EquipRegistry huxhao.",
    noPassportsTitle: "Hai mei you huxhao",
    noPassportsText:
      "Dang zhuce jinru huxhao zhuangtai hou, yiqian huxhao hui xianshi zai zheli.",
    viewPassport: "Chakan huxhao",
    openRequest: "Dak kai qingqiu",
    profileLabels: {
      name: "Xingming",
      email: "Email",
      company: "Gongsi",
      vat: "VAT hao",
      verification: "Email yanzheng",
      status: "Zhuangtai",
    },
    verified: "Yi yanzheng",
    unverified: "Dai yanzheng",
    notProvided: "Wei tigong",
  },
  hi: {
    dashboardTitle: "Dashboard",
    dashboardSubtitle:
      "Apni registrations, passports aur account details ek hi jagah se sambhalen.",
    dashboardLink: "Dashboard",
    profileLink: "Mere vivaran",
    passportsLink: "Mere passports",
    newRegistration: "Nayi registration",
    backToDashboard: "Dashboard par wapas",
    profileTitle: "Mere vivaran",
    profileSubtitle: "Apne EquipRegistry profile se jude account details dekhen.",
    passportsTitle: "Mere passports",
    passportsSubtitle: "Aapke account se jude jari kiye gaye EquipRegistry passports.",
    noPassportsTitle: "Abhi koi passport uplabdh nahin hai",
    noPassportsText:
      "Jab koi registration passport status tak pahunchti hai tab passports yahan dikhai denge.",
    viewPassport: "Passport dekhen",
    openRequest: "Anurodh kholen",
    profileLabels: {
      name: "Naam",
      email: "Email",
      company: "Company",
      vat: "VAT number",
      verification: "Email satyapan",
      status: "Sthiti",
    },
    verified: "Satyapit",
    unverified: "Satyapan baki hai",
    notProvided: "Pradan nahin kiya gaya",
  },
  ar: {
    dashboardTitle: "لوحة التحكم",
    dashboardSubtitle:
      "أدر تسجيلاتك وجوازاتك وبيانات الحساب من مكان واحد.",
    dashboardLink: "لوحة التحكم",
    profileLink: "بياناتي",
    passportsLink: "جوازاتي",
    newRegistration: "تسجيل جديد",
    backToDashboard: "العودة إلى لوحة التحكم",
    profileTitle: "بياناتي",
    profileSubtitle: "راجع بيانات الحساب المرتبطة بملف EquipRegistry الخاص بك.",
    passportsTitle: "جوازاتي",
    passportsSubtitle: "جوازات EquipRegistry الصادرة المرتبطة بحسابك.",
    noPassportsTitle: "لا توجد جوازات حتى الآن",
    noPassportsText:
      "ستظهر الجوازات الصادرة هنا بمجرد أن تصل أي تسجيلات إلى حالة الجواز.",
    viewPassport: "عرض الجواز",
    openRequest: "فتح الطلب",
    profileLabels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      company: "الشركة",
      vat: "رقم ضريبة القيمة المضافة",
      verification: "التحقق من البريد الإلكتروني",
      status: "الحالة",
    },
    verified: "تم التحقق",
    unverified: "بانتظار التحقق",
    notProvided: "غير متوفر",
  },
};

export function getCustomerDashboardText(lang: Lang) {
  return TEXT[lang] ?? TEXT.en;
}
