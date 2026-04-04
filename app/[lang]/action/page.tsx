import Link from "next/link";
import { notFound } from "next/navigation";
import AuthoritiesClient from "@/app/[lang]/action/authorities/AuthoritiesClient";
import ReportSightingClient from "@/app/[lang]/action/report/ReportSightingClient";
import LoginRequiredButton from "@/components/auth/login-required-button";
import { isValidLang, type Lang } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    type?: string;
    registryId?: string;
    caseId?: string;
  }>;
}

const ACTION_TEXT: Record<
  Lang,
  {
    verify: {
      title: string;
      intro: string;
      registryId: string;
      nextTitle: string;
      steps: string[];
      login: string;
      back: string;
    };
    register: {
      title: string;
      intro: string;
      whoTitle: string;
      who: string[];
      includesTitle: string;
      includes: string[];
      login: string;
      back: string;
    };
    report: {
  title: string;
  intro: string;
  registryId: string;
  whyTitle: string;
  why: string[];
  login: string;
  back: string;
};
    authorities: {
      title: string;
      intro: string;
      emergencyTitle: string;
      emergencyText: string;
      login: string;
      back: string;
    };
    fallback: {
      title: string;
      text: string;
      back: string;
    };
  }
> = {
  en: {
    verify: {
      title: "Verify registration",
      intro: "Check the current EquipRegistry status of this asset.",
      registryId: "Registry ID",
      nextTitle: "What happens next",
      steps: [
        "Review the current registration status.",
        "Check whether more details become available after login.",
        "Use the information to decide your next step.",
      ],
      login: "Login to continue",
      back: "Back",
    },
    register: {
      title: "Register asset",
      intro: "Create a registration request for this asset.",
      whoTitle: "Who can register",
      who: [
        "Private owners",
        "Companies",
        "Insurers",
        "Partners",
      ],
      includesTitle: "What this includes",
      includes: [
        "Basic asset identification",
        "Ownership details",
        "Supporting documents",
      ],
      login: "Login to continue",
      back: "Back",
    },
    report: {
  title: "Report sighting",
  intro: "Submit a sighting related to this asset.",
  registryId: "Registry ID",
  whyTitle: "Why this matters",
  why: [
    "A sighting may help recover a stolen asset.",
    "Authorities and relevant parties can use this information.",
  ],
  login: "Login to continue",
  back: "Back",
},
    authorities: {
      title: "Contact authorities",
      intro:
        "If this asset may be stolen or suspicious, contact the appropriate authorities first.",
      emergencyTitle: "Emergency",
      emergencyText:
        "If there is immediate danger or a crime in progress, call the local emergency number immediately.",
      login: "Login to continue",
      back: "Back",
    },
    fallback: {
      title: "Action not available",
      text: "This action is currently not available.",
      back: "Back",
    },
  },

  es: {
    verify: {
      title: "Verificar registro",
      intro: "Consulta el estado actual de este activo en EquipRegistry.",
      registryId: "ID de registro",
      nextTitle: "Qué ocurre después",
      steps: [
        "Revisa el estado actual del registro.",
        "Comprueba si hay más detalles disponibles después de iniciar sesión.",
        "Usa la información para decidir el siguiente paso.",
      ],
      login: "Iniciar sesión para continuar",
      back: "Volver",
    },
    register: {
      title: "Registrar activo",
      intro: "Crea una solicitud de registro para este activo.",
      whoTitle: "Quién puede registrar",
      who: [
        "Propietarios particulares",
        "Empresas",
        "Aseguradoras",
        "Socios",
      ],
      includesTitle: "Qué incluye",
      includes: [
        "Identificación básica del activo",
        "Datos de propiedad",
        "Documentos de respaldo",
      ],
      login: "Iniciar sesión para continuar",
      back: "Volver",
    },
    report: {
  title: "Reportar avistamiento",
  intro: "Envía un aviso relacionado con este activo.",
  registryId: "ID de registro",
  whyTitle: "Por qué es importante",
  why: [
    "Un avistamiento puede ayudar a recuperar un activo robado.",
    "Las autoridades y las partes relevantes pueden usar esta información.",
  ],
  login: "Iniciar sesión para continuar",
  back: "Volver",
},
    authorities: {
      title: "Contactar a las autoridades",
      intro:
        "Si este activo puede ser robado o sospechoso, contacta primero con las autoridades competentes.",
      emergencyTitle: "Emergencia",
      emergencyText:
        "Si existe un peligro inmediato o un delito en curso, llama de inmediato al número local de emergencias.",
      login: "Iniciar sesión para continuar",
      back: "Volver",
    },
    fallback: {
      title: "Acción no disponible",
      text: "Esta acción no está disponible en este momento.",
      back: "Volver",
    },
  },

  de: {
    verify: {
      title: "Registrierung prüfen",
      intro: "Prüfen Sie den aktuellen EquipRegistry-Status dieses Objekts.",
      registryId: "Register-ID",
      nextTitle: "Wie es weitergeht",
      steps: [
        "Prüfen Sie den aktuellen Registrierungsstatus.",
        "Prüfen Sie, ob nach dem Login weitere Details verfügbar sind.",
        "Nutzen Sie die Informationen für den nächsten Schritt.",
      ],
      login: "Anmelden, um fortzufahren",
      back: "Zurück",
    },
    register: {
      title: "Objekt registrieren",
      intro: "Erstellen Sie eine Registrierungsanfrage für dieses Objekt.",
      whoTitle: "Wer registrieren kann",
      who: [
        "Private Eigentümer",
        "Unternehmen",
        "Versicherer",
        "Partner",
      ],
      includesTitle: "Was enthalten ist",
      includes: [
        "Grundlegende Identifikation des Objekts",
        "Eigentumsangaben",
        "Nachweisdokumente",
      ],
      login: "Anmelden, um fortzufahren",
      back: "Zurück",
    },
    report: {
  title: "Sichtung melden",
  intro: "Übermitteln Sie eine Sichtung zu diesem Objekt.",
  registryId: "Register-ID",
  whyTitle: "Warum das wichtig ist",
  why: [
    "Eine Sichtung kann helfen, ein gestohlenes Objekt wiederzufinden.",
    "Behörden und relevante Parteien können diese Informationen nutzen.",
  ],
  login: "Anmelden, um fortzufahren",
  back: "Zurück",
},
    authorities: {
      title: "Behörden kontaktieren",
      intro:
        "Wenn dieses Objekt gestohlen oder verdächtig sein könnte, kontaktieren Sie zuerst die zuständigen Behörden.",
      emergencyTitle: "Notfall",
      emergencyText:
        "Wenn unmittelbare Gefahr besteht oder eine Straftat im Gange ist, rufen Sie sofort die örtliche Notrufnummer an.",
      login: "Anmelden, um fortzufahren",
      back: "Zurück",
    },
    fallback: {
      title: "Aktion nicht verfügbar",
      text: "Diese Aktion ist derzeit nicht verfügbar.",
      back: "Zurück",
    },
  },

  fr: {
    verify: {
      title: "Vérifier l’enregistrement",
      intro: "Consultez le statut actuel de cet actif dans EquipRegistry.",
      registryId: "ID d’enregistrement",
      nextTitle: "Étapes suivantes",
      steps: [
        "Vérifiez le statut actuel de l’enregistrement.",
        "Vérifiez si plus de détails sont disponibles après connexion.",
        "Utilisez ces informations pour décider de la suite.",
      ],
      login: "Se connecter pour continuer",
      back: "Retour",
    },
    register: {
      title: "Enregistrer l’actif",
      intro: "Créez une demande d’enregistrement pour cet actif.",
      whoTitle: "Qui peut enregistrer",
      who: [
        "Propriétaires privés",
        "Entreprises",
        "Assureurs",
        "Partenaires",
      ],
      includesTitle: "Ce qui est inclus",
      includes: [
        "Identification de base de l’actif",
        "Détails de propriété",
        "Documents justificatifs",
      ],
      login: "Se connecter pour continuer",
      back: "Retour",
    },
    report: {
  title: "Signaler une observation",
  intro: "Soumettez une observation liée à cet actif.",
  registryId: "ID d’enregistrement",
  whyTitle: "Pourquoi c’est important",
  why: [
    "Une observation peut aider à récupérer un actif volé.",
    "Les autorités et les parties concernées peuvent utiliser ces informations.",
  ],
  login: "Se connecter pour continuer",
  back: "Retour",
},
    authorities: {
      title: "Contacter les autorités",
      intro:
        "Si cet actif semble volé ou suspect, contactez d’abord les autorités compétentes.",
      emergencyTitle: "Urgence",
      emergencyText:
        "En cas de danger immédiat ou de crime en cours, appelez immédiatement le numéro d’urgence local.",
      login: "Se connecter pour continuer",
      back: "Retour",
    },
    fallback: {
      title: "Action non disponible",
      text: "Cette action n’est actuellement pas disponible.",
      back: "Retour",
    },
  },

  it: {
    verify: {
      title: "Verifica registrazione",
      intro: "Controlla lo stato attuale di questo bene in EquipRegistry.",
      registryId: "ID registro",
      nextTitle: "Cosa succede dopo",
      steps: [
        "Controlla lo stato attuale della registrazione.",
        "Verifica se sono disponibili ulteriori dettagli dopo l’accesso.",
        "Usa le informazioni per decidere il passo successivo.",
      ],
      login: "Accedi per continuare",
      back: "Indietro",
    },
    register: {
      title: "Registra bene",
      intro: "Crea una richiesta di registrazione per questo bene.",
      whoTitle: "Chi può registrare",
      who: [
        "Proprietari privati",
        "Aziende",
        "Assicuratori",
        "Partner",
      ],
      includesTitle: "Cosa include",
      includes: [
        "Identificazione base del bene",
        "Dettagli di proprietà",
        "Documenti di supporto",
      ],
      login: "Accedi per continuare",
      back: "Indietro",
    },
    report: {
  title: "Segnala avvistamento",
  intro: "Invia un avvistamento relativo a questo bene.",
  registryId: "ID registro",
  whyTitle: "Perché è importante",
  why: [
    "Un avvistamento può aiutare a recuperare un bene rubato.",
    "Le autorità e le parti competenti possono usare queste informazioni.",
  ],
  login: "Accedi per continuare",
  back: "Indietro",
},
    authorities: {
      title: "Contatta le autorità",
      intro:
        "Se questo bene potrebbe essere rubato o sospetto, contatta prima le autorità competenti.",
      emergencyTitle: "Emergenza",
      emergencyText:
        "Se c’è un pericolo immediato o un reato in corso, chiama subito il numero locale di emergenza.",
      login: "Accedi per continuare",
      back: "Indietro",
    },
    fallback: {
      title: "Azione non disponibile",
      text: "Questa azione non è attualmente disponibile.",
      back: "Indietro",
    },
  },

  nl: {
    verify: {
      title: "Registratie verifiëren",
      intro: "Controleer de huidige EquipRegistry-status van dit object.",
      registryId: "Registratie-ID",
      nextTitle: "Wat gebeurt hierna",
      steps: [
        "Bekijk de huidige registratiestatus.",
        "Controleer of er na het inloggen meer details beschikbaar zijn.",
        "Gebruik de informatie om je volgende stap te bepalen.",
      ],
      login: "Inloggen om door te gaan",
      back: "Terug",
    },
    register: {
      title: "Object registreren",
      intro: "Maak een registratieaanvraag voor dit object.",
      whoTitle: "Wie kan registreren",
      who: [
        "Particuliere eigenaren",
        "Bedrijven",
        "Verzekeraars",
        "Partners",
      ],
      includesTitle: "Wat dit omvat",
      includes: [
        "Basisidentificatie van het object",
        "Eigendomsgegevens",
        "Ondersteunende documenten",
      ],
      login: "Inloggen om door te gaan",
      back: "Terug",
    },
    report: {
  title: "Waarneming melden",
  intro: "Dien een melding in over dit object.",
  registryId: "Registratie-ID",
  whyTitle: "Waarom dit belangrijk is",
  why: [
    "Een waarneming kan helpen bij het terugvinden van een gestolen object.",
    "Autoriteiten en relevante partijen kunnen deze informatie gebruiken.",
  ],
  login: "Inloggen om door te gaan",
  back: "Terug",
},
    authorities: {
      title: "Autoriteiten contacteren",
      intro:
        "Als dit object mogelijk gestolen of verdacht is, neem dan eerst contact op met de bevoegde autoriteiten.",
      emergencyTitle: "Noodgeval",
      emergencyText:
        "Als er direct gevaar is of een misdrijf aan de gang is, bel dan onmiddellijk het lokale alarmnummer.",
      login: "Inloggen om door te gaan",
      back: "Terug",
    },
    fallback: {
      title: "Actie niet beschikbaar",
      text: "Deze actie is momenteel niet beschikbaar.",
      back: "Terug",
    },
  },

  pt: {
    verify: {
      title: "Verificar registo",
      intro: "Consulte o estado atual deste ativo no EquipRegistry.",
      registryId: "ID de registo",
      nextTitle: "O que acontece a seguir",
      steps: [
        "Verifique o estado atual do registo.",
        "Confirme se há mais detalhes disponíveis após iniciar sessão.",
        "Use a informação para decidir o próximo passo.",
      ],
      login: "Iniciar sessão para continuar",
      back: "Voltar",
    },
    register: {
      title: "Registar ativo",
      intro: "Crie um pedido de registo para este ativo.",
      whoTitle: "Quem pode registar",
      who: [
        "Proprietários particulares",
        "Empresas",
        "Seguradoras",
        "Parceiros",
      ],
      includesTitle: "O que isto inclui",
      includes: [
        "Identificação básica do ativo",
        "Dados de propriedade",
        "Documentos de suporte",
      ],
      login: "Iniciar sessão para continuar",
      back: "Voltar",
    },
    report: {
  title: "Reportar avistamento",
  intro: "Submeta um avistamento relacionado com este ativo.",
  registryId: "ID de registo",
  whyTitle: "Porque isto é importante",
  why: [
    "Um avistamento pode ajudar a recuperar um ativo roubado.",
    "As autoridades e as partes relevantes podem usar esta informação.",
  ],
  login: "Iniciar sessão para continuar",
  back: "Voltar",
},
    authorities: {
      title: "Contactar autoridades",
      intro:
        "Se este ativo puder ser roubado ou suspeito, contacte primeiro as autoridades competentes.",
      emergencyTitle: "Emergência",
      emergencyText:
        "Se existir perigo imediato ou um crime em curso, ligue imediatamente para o número local de emergência.",
      login: "Iniciar sessão para continuar",
      back: "Voltar",
    },
    fallback: {
      title: "Ação indisponível",
      text: "Esta ação não está disponível neste momento.",
      back: "Voltar",
    },
  },

  ru: {
    verify: {
      title: "Проверить регистрацию",
      intro: "Проверьте текущий статус этого объекта в EquipRegistry.",
      registryId: "ID реестра",
      nextTitle: "Что дальше",
      steps: [
        "Проверьте текущий статус регистрации.",
        "Посмотрите, появятся ли дополнительные сведения после входа.",
        "Используйте информацию, чтобы определить следующий шаг.",
      ],
      login: "Войти, чтобы продолжить",
      back: "Назад",
    },
    register: {
      title: "Зарегистрировать объект",
      intro: "Создайте заявку на регистрацию этого объекта.",
      whoTitle: "Кто может зарегистрировать",
      who: [
        "Частные владельцы",
        "Компании",
        "Страховые компании",
        "Партнёры",
      ],
      includesTitle: "Что входит",
      includes: [
        "Базовая идентификация объекта",
        "Данные о владельце",
        "Подтверждающие документы",
      ],
      login: "Войти, чтобы продолжить",
      back: "Назад",
    },
    report: {
  title: "Сообщить о замеченном объекте",
  intro: "Отправьте сообщение о замеченном объекте.",
  registryId: "ID реестра",
  whyTitle: "Почему это важно",
  why: [
    "Сообщение может помочь вернуть украденный объект.",
    "Эту информацию могут использовать власти и заинтересованные стороны.",
  ],
  login: "Войти, чтобы продолжить",
  back: "Назад",
},
    authorities: {
      title: "Связаться с властями",
      intro:
        "Если этот объект может быть украденным или подозрительным, сначала свяжитесь с компетентными органами.",
      emergencyTitle: "Экстренная ситуация",
      emergencyText:
        "Если существует непосредственная опасность или совершается преступление, немедленно позвоните по местному номеру экстренной помощи.",
      login: "Войти, чтобы продолжить",
      back: "Назад",
    },
    fallback: {
      title: "Действие недоступно",
      text: "Это действие в данный момент недоступно.",
      back: "Назад",
    },
  },

  zh: {
    verify: {
      title: "验证注册",
      intro: "查看该资产在 EquipRegistry 中的当前状态。",
      registryId: "注册 ID",
      nextTitle: "接下来会发生什么",
      steps: [
        "查看当前注册状态。",
        "检查登录后是否可查看更多详细信息。",
        "根据这些信息决定下一步操作。",
      ],
      login: "登录以继续",
      back: "返回",
    },
    register: {
      title: "注册资产",
      intro: "为该资产创建注册申请。",
      whoTitle: "谁可以注册",
      who: [
        "私人所有者",
        "公司",
        "保险公司",
        "合作伙伴",
      ],
      includesTitle: "包含内容",
      includes: [
        "资产基本识别信息",
        "所有权信息",
        "证明文件",
      ],
      login: "登录以继续",
      back: "返回",
    },
    report: {
  title: "报告目击信息",
  intro: "提交与该资产相关的目击信息。",
  registryId: "注册 ID",
  whyTitle: "为什么这很重要",
  why: [
    "目击信息可能有助于找回被盗资产。",
    "有关部门和相关方可以使用这些信息。",
  ],
  login: "登录以继续",
  back: "返回",
},
    authorities: {
      title: "联系有关部门",
      intro:
        "如果该资产可能被盗或存在可疑情况，请先联系相关主管部门。",
      emergencyTitle: "紧急情况",
      emergencyText:
        "如果存在直接危险或正在发生犯罪行为，请立即拨打当地紧急电话。",
      login: "登录以继续",
      back: "返回",
    },
    fallback: {
      title: "操作不可用",
      text: "此操作当前不可用。",
      back: "返回",
    },
  },

  hi: {
    verify: {
      title: "पंजीकरण सत्यापित करें",
      intro: "इस संपत्ति की वर्तमान EquipRegistry स्थिति देखें।",
      registryId: "रजिस्ट्री आईडी",
      nextTitle: "आगे क्या होगा",
      steps: [
        "वर्तमान पंजीकरण स्थिति देखें।",
        "जांचें कि लॉगिन के बाद अधिक विवरण उपलब्ध हैं या नहीं।",
        "अगला कदम तय करने के लिए जानकारी का उपयोग करें।",
      ],
      login: "जारी रखने के लिए लॉगिन करें",
      back: "वापस",
    },
    register: {
      title: "संपत्ति पंजीकृत करें",
      intro: "इस संपत्ति के लिए पंजीकरण अनुरोध बनाएं।",
      whoTitle: "कौन पंजीकरण कर सकता है",
      who: [
        "निजी मालिक",
        "कंपनियाँ",
        "बीमाकर्ता",
        "साझेदार",
      ],
      includesTitle: "इसमें क्या शामिल है",
      includes: [
        "संपत्ति की मूल पहचान",
        "स्वामित्व विवरण",
        "समर्थन दस्तावेज़",
      ],
      login: "जारी रखने के लिए लॉगिन करें",
      back: "वापस",
    },
    report: {
  title: "देखे जाने की रिपोर्ट करें",
  intro: "इस संपत्ति से संबंधित देखे जाने की सूचना भेजें।",
  registryId: "रजिस्ट्री आईडी",
  whyTitle: "यह क्यों महत्वपूर्ण है",
  why: [
    "देखे जाने की सूचना चोरी हुई संपत्ति को वापस पाने में मदद कर सकती है।",
    "अधिकारी और संबंधित पक्ष इस जानकारी का उपयोग कर सकते हैं।",
  ],
  login: "जारी रखने के लिए लॉगिन करें",
  back: "वापस",
},
    authorities: {
      title: "अधिकारियों से संपर्क करें",
      intro:
        "यदि यह संपत्ति चोरी की गई या संदिग्ध हो सकती है, तो पहले संबंधित अधिकारियों से संपर्क करें।",
      emergencyTitle: "आपातकाल",
      emergencyText:
        "यदि तत्काल खतरा हो या अपराध चल रहा हो, तो तुरंत स्थानीय आपातकालीन नंबर पर कॉल करें।",
      login: "जारी रखने के लिए लॉगिन करें",
      back: "वापस",
    },
    fallback: {
      title: "कार्रवाई उपलब्ध नहीं है",
      text: "यह कार्रवाई इस समय उपलब्ध नहीं है।",
      back: "वापस",
    },
  },

  ar: {
    verify: {
      title: "التحقق من التسجيل",
      intro: "تحقق من الحالة الحالية لهذا الأصل في EquipRegistry.",
      registryId: "معرّف السجل",
      nextTitle: "ماذا يحدث بعد ذلك",
      steps: [
        "راجع حالة التسجيل الحالية.",
        "تحقق مما إذا كانت هناك تفاصيل إضافية متاحة بعد تسجيل الدخول.",
        "استخدم المعلومات لتحديد الخطوة التالية.",
      ],
      login: "تسجيل الدخول للمتابعة",
      back: "رجوع",
    },
    register: {
      title: "تسجيل الأصل",
      intro: "أنشئ طلب تسجيل لهذا الأصل.",
      whoTitle: "من يمكنه التسجيل",
      who: [
        "المالكون الأفراد",
        "الشركات",
        "شركات التأمين",
        "الشركاء",
      ],
      includesTitle: "ما الذي يشمله ذلك",
      includes: [
        "التعريف الأساسي بالأصل",
        "تفاصيل الملكية",
        "المستندات الداعمة",
      ],
      login: "تسجيل الدخول للمتابعة",
      back: "رجوع",
    },
    report: {
  title: "الإبلاغ عن مشاهدة",
  intro: "أرسل بلاغًا عن مشاهدة مرتبطة بهذا الأصل.",
  registryId: "معرّف السجل",
  whyTitle: "لماذا هذا مهم",
  why: [
    "قد تساعد المشاهدة في استعادة أصل مسروق.",
    "يمكن للسلطات والأطراف المعنية استخدام هذه المعلومات.",
  ],
  login: "تسجيل الدخول للمتابعة",
  back: "رجوع",
},
    authorities: {
      title: "الاتصال بالسلطات",
      intro:
        "إذا كان هذا الأصل قد يكون مسروقًا أو مشبوهًا، فاتصل أولاً بالسلطات المختصة.",
      emergencyTitle: "حالة طارئة",
      emergencyText:
        "إذا كان هناك خطر فوري أو جريمة جارية، فاتصل فورًا برقم الطوارئ المحلي.",
      login: "تسجيل الدخول للمتابعة",
      back: "رجوع",
    },
    fallback: {
      title: "الإجراء غير متاح",
      text: "هذا الإجراء غير متاح حاليًا.",
      back: "رجوع",
    },
  },
};

export default async function ActionPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { type, registryId, caseId } = await searchParams;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = ACTION_TEXT[safeLang];

  const nextTarget = registryId
    ? `/${safeLang}/passport/${encodeURIComponent(registryId)}`
    : `/${safeLang}/dashboard`;

  const backToSearchHref = `/${safeLang}`;

  if (type === "verify") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.verify.title}</h1>

          <p style={styles.text}>{t.verify.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.verify.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.verify.nextTitle}</h3>
            <ul style={styles.list}>
              {t.verify.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div style={styles.actions}>
            <LoginRequiredButton
              lang={safeLang}
              next={nextTarget}
              label={t.verify.login}
              className="inline-block rounded-[10px] bg-[#1f4fd8] px-5 py-3 text-sm font-semibold text-white"
            />

            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.verify.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "register") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.register.title}</h1>

          <p style={styles.text}>{t.register.intro}</p>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.register.whoTitle}</h3>
            <ul style={styles.list}>
              {t.register.who.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.register.includesTitle}</h3>
            <ul style={styles.list}>
              {t.register.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.actions}>
            <LoginRequiredButton
              lang={safeLang}
              next={nextTarget}
              label={t.register.login}
              className="inline-block rounded-[10px] bg-[#1f4fd8] px-5 py-3 text-sm font-semibold text-white"
            />

            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.register.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "report") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.report.title}</h1>

          <p style={styles.text}>{t.report.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.report.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.warning}>
            <strong>{t.report.important}</strong>
            <p style={{ marginTop: 6 }}>{t.report.importantText}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.report.nextTitle}</h3>
            <ul style={styles.list}>
              {t.report.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ReportSightingClient lang={safeLang} />

          <div style={styles.actions}>
            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.report.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "authorities") {
    const resolvedCaseId = caseId ?? "ER-CASE-2026-00123";

    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.authorities.title}</h1>

          <p style={styles.text}>{t.authorities.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.authorities.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <p style={styles.registryId}>
            {t.authorities.caseId}: <strong>{resolvedCaseId}</strong>
          </p>

          <AuthoritiesClient registryId={registryId} caseId={resolvedCaseId} />

          <div style={styles.warning}>
            <strong>{t.authorities.important}</strong>
            <p style={{ marginTop: 6 }}>{t.authorities.importantText}</p>
          </div>

          <div style={styles.actions}>
            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.authorities.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t.fallback.title}</h1>

        <p style={styles.text}>{t.fallback.intro}</p>

        <Link href={backToSearchHref} style={styles.primaryButton}>
          {t.fallback.back}
        </Link>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },

  card: {
    maxWidth: 540,
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 1.6,
  },

  registryId: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 20,
  },

  warning: {
    border: "1px solid #fca5a5",
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 14,
    fontSize: 13,
    color: "#7f1d1d",
    marginBottom: 20,
  },

  section: {
    marginTop: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  list: {
    paddingLeft: 18,
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#1f4fd8",
    color: "#ffffff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#f1f5f9",
    color: "#1f2937",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
};