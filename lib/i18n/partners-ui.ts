import type { Lang } from "@/lib/i18n/config";

type PartnersUiText = {
  menuLabel: string;
  title: string;
  subtitle: string;
};

const TEXT: Record<Lang, PartnersUiText> = {
  en: {
    menuLabel: "For partners",
    title: "For partners",
    subtitle:
      "EquipRegistry supports insurers, financiers, rental operators, terminals, and other operational partners with trusted registry status signals.",
  },
  es: {
    menuLabel: "Para socios",
    title: "Para socios",
    subtitle:
      "EquipRegistry ayuda a aseguradoras, financiadores, operadores de alquiler, terminales y otros socios operativos con senales de estado registral fiables.",
  },
  de: {
    menuLabel: "Fuer Partner",
    title: "Fuer Partner",
    subtitle:
      "EquipRegistry unterstuetzt Versicherer, Finanzierer, Vermieter, Terminals und weitere operative Partner mit verlaesslichen Registerstatus-Signalen.",
  },
  fr: {
    menuLabel: "Pour les partenaires",
    title: "Pour les partenaires",
    subtitle:
      "EquipRegistry aide les assureurs, financeurs, operateurs de location, terminaux et autres partenaires operationnels avec des signaux de statut fiables.",
  },
  it: {
    menuLabel: "Per partner",
    title: "Per partner",
    subtitle:
      "EquipRegistry supporta assicuratori, finanziatori, operatori rental, terminali e altri partner operativi con segnali affidabili di stato del registro.",
  },
  nl: {
    menuLabel: "Voor partners",
    title: "Voor partners",
    subtitle:
      "EquipRegistry ondersteunt verzekeraars, financiers, verhuurders, terminals en andere operationele partners met betrouwbare registrystatus-signalen.",
  },
  pt: {
    menuLabel: "Para parceiros",
    title: "Para parceiros",
    subtitle:
      "A EquipRegistry apoia seguradoras, financiadores, operadores de aluguer, terminais e outros parceiros operacionais com sinais de estado fiaveis.",
  },
  pl: {
    menuLabel: "Dla partnerow",
    title: "Dla partnerow",
    subtitle:
      "EquipRegistry wspiera ubezpieczycieli, finansujacych, operatorow wynajmu, terminale i innych partnerow operacyjnych wiarygodnymi sygnalami statusu rejestrowego.",
  },
  sv: {
    menuLabel: "For partner",
    title: "For partner",
    subtitle:
      "EquipRegistry stoder forsakrare, finansiella aktorer, uthyrningsoperatorer, terminaler och andra partner med tillforlitliga registersstatussignaler.",
  },
  da: {
    menuLabel: "For partnere",
    title: "For partnere",
    subtitle:
      "EquipRegistry stotter forsikringsselskaber, finansieringspartnere, udlejningsoperatoerer, terminaler og andre partnere med paalidelige registersignaler.",
  },
  no: {
    menuLabel: "For partnere",
    title: "For partnere",
    subtitle:
      "EquipRegistry stotter forsikringsselskaper, finanspartnere, utleieoperatorer, terminaler og andre operative partnere med paalitelige registersignaler.",
  },
  ru: {
    menuLabel: "Для партнеров",
    title: "Для партнеров",
    subtitle:
      "EquipRegistry помогает страховщикам, финансовым партнерам, операторам аренды, терминалам и другим операционным партнерам надежными сигналами статуса реестра.",
  },
  zh: {
    menuLabel: "合作伙伴",
    title: "合作伙伴",
    subtitle:
      "EquipRegistry 为保险、融资、租赁、终端以及其他运营合作伙伴提供可靠的登记状态信号。",
  },
  hi: {
    menuLabel: "साझेदारों के लिए",
    title: "साझेदारों के लिए",
    subtitle:
      "EquipRegistry बीमा, वित्त, किराया, टर्मिनल और अन्य परिचालन साझेदारों को विश्वसनीय रजिस्ट्री स्थिति संकेत प्रदान करता है।",
  },
  ar: {
    menuLabel: "للشركاء",
    title: "للشركاء",
    subtitle:
      "تقدم EquipRegistry دعماً لشركات التأمين والتمويل والتأجير والمحطات وغيرهم من الشركاء التشغيليين عبر إشارات موثوقة لحالة السجل.",
  },
};

export function getPartnersUiText(lang: Lang): PartnersUiText {
  return TEXT[lang] ?? TEXT.en;
}
