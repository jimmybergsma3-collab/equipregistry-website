import type { Lang } from "./config";

export type CookieTexts = {
  title: string;
  description: string;
  accept: string;
  decline: string;
  policy: string;
};

export const cookieTexts: Record<Lang, CookieTexts> = {
  en: {
    title: "Cookies",
    description:
      "EquipRegistry uses necessary cookies for security and site functionality. We only use optional analytics cookies if you give consent.",
    accept: "Accept",
    decline: "Decline",
    policy: "Cookie Policy",
  },
  es: {
    title: "Cookies",
    description:
      "EquipRegistry utiliza cookies necesarias para la seguridad y el funcionamiento del sitio. Solo usamos cookies analíticas opcionales si das tu consentimiento.",
    accept: "Aceptar",
    decline: "Rechazar",
    policy: "Política de Cookies",
  },
  de: {
    title: "Cookies",
    description:
      "EquipRegistry verwendet notwendige Cookies für Sicherheit und Website-Funktionalität. Optionale Analyse-Cookies verwenden wir nur mit deiner Zustimmung.",
    accept: "Akzeptieren",
    decline: "Ablehnen",
    policy: "Cookie-Richtlinie",
  },
  fr: {
    title: "Cookies",
    description:
      "EquipRegistry utilise des cookies nécessaires pour la sécurité et le bon fonctionnement du site. Nous n’utilisons des cookies analytiques optionnels qu’avec votre consentement.",
    accept: "Accepter",
    decline: "Refuser",
    policy: "Politique relative aux cookies",
  },
  it: {
    title: "Cookie",
    description:
      "EquipRegistry utilizza cookie necessari per la sicurezza e il corretto funzionamento del sito. Utilizziamo cookie analitici opzionali solo con il tuo consenso.",
    accept: "Accetta",
    decline: "Rifiuta",
    policy: "Politica sui cookie",
  },
  nl: {
    title: "Cookies",
    description:
      "EquipRegistry gebruikt noodzakelijke cookies voor beveiliging en het functioneren van de website. Optionele analytische cookies gebruiken wij alleen met jouw toestemming.",
    accept: "Accepteren",
    decline: "Weigeren",
    policy: "Cookiebeleid",
  },
  pt: {
    title: "Cookies",
    description:
      "A EquipRegistry utiliza cookies necessários para a segurança e o funcionamento do site. Só utilizamos cookies analíticos opcionais com o seu consentimento.",
    accept: "Aceitar",
    decline: "Recusar",
    policy: "Política de Cookies",
  },
  ru: {
    title: "Файлы cookie",
    description:
      "EquipRegistry использует необходимые файлы cookie для безопасности и корректной работы сайта. Дополнительные аналитические cookie используются только с вашего согласия.",
    accept: "Принять",
    decline: "Отклонить",
    policy: "Политика cookie",
  },
  hi: {
    title: "कुकीज़",
    description:
      "EquipRegistry सुरक्षा और वेबसाइट के सही कामकाज के लिए आवश्यक कुकीज़ का उपयोग करता है। वैकल्पिक एनालिटिक्स कुकीज़ केवल आपकी सहमति के बाद ही उपयोग की जाती हैं।",
    accept: "स्वीकार करें",
    decline: "अस्वीकार करें",
    policy: "कुकी नीति",
  },
  ar: {
    title: "ملفات تعريف الارتباط",
    description:
      "تستخدم EquipRegistry ملفات تعريف الارتباط الضرورية للأمان ولتشغيل الموقع بشكل صحيح. ولا نستخدم ملفات تعريف الارتباط التحليلية الاختيارية إلا بعد موافقتك.",
    accept: "قبول",
    decline: "رفض",
    policy: "سياسة ملفات تعريف الارتباط",
  },
  zh: {
    title: "Cookie",
    description:
      "EquipRegistry 使用网站安全和正常运行所必需的 Cookie。只有在您同意的情况下，我们才会使用可选的分析 Cookie。",
    accept: "接受",
    decline: "拒绝",
    policy: "Cookie 政策",
  },

  pl: {
    title: "Cookies",
    description:
      "EquipRegistry uzywa niezbednych plikow cookie do zapewnienia bezpieczenstwa i prawidlowego dzialania strony. Opcjonalnych plikow cookie analitycznych uzywamy tylko za Twoja zgoda.",
    accept: "Akceptuj",
    decline: "Odrzuc",
    policy: "Polityka plikow cookie",
  },
  sv: {
    title: "Cookies",
    description:
      "EquipRegistry anvander nodvandiga cookies for sakerhet och webbplatsens funktionalitet. Vi anvander endast valfria analyscookies om du ger ditt samtycke.",
    accept: "Acceptera",
    decline: "Avboj",
    policy: "Cookiepolicy",
  },
  da: {
    title: "Cookies",
    description:
      "EquipRegistry bruger nodvendige cookies til sikkerhed og funktionalitet pa siden. Vi bruger kun valgfrie analysecookies, hvis du giver samtykke.",
    accept: "Accepter",
    decline: "Afvis",
    policy: "Cookiepolitik",
  },
  no: {
    title: "Cookies",
    description:
      "EquipRegistry bruker nodvendige informasjonskapsler for sikkerhet og nettstedets funksjonalitet. Vi bruker bare valgfrie analyseinformasjonskapsler hvis du gir samtykke.",
    accept: "Godta",
    decline: "Avsla",
    policy: "Retningslinjer for informasjonskapsler",
  },
};

export function getCookieTexts(lang: Lang): CookieTexts {
  return cookieTexts[lang] ?? cookieTexts.en;
}
