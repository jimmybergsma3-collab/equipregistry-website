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
    menuLabel: "Dlya partnerov",
    title: "Dlya partnerov",
    subtitle:
      "EquipRegistry podderzhivaet strakhovshchikov, finansovykh partnerov, arendnykh operatorov, terminaly i drugikh partnerov nadezhnymi signalami statusa reestra.",
  },
  zh: {
    menuLabel: "Gong hezuo huoban",
    title: "Gong hezuo huoban",
    subtitle:
      "EquipRegistry wei baoxian, rongzi, zulin, zhongduan he qita yunyin huoban tigong kekaode zhucedengji zhuangtai xinhao.",
  },
  hi: {
    menuLabel: "Partners ke liye",
    title: "Partners ke liye",
    subtitle:
      "EquipRegistry bima, finance, rental, terminal aur anya operational partners ko bharosemand registry status signals deta hai.",
  },
  ar: {
    menuLabel: "Lilshuraka",
    title: "Lilshuraka",
    subtitle:
      "Tuqaddim EquipRegistry daeman lisharikat altaamin walttamwil wal'ijar walmawanie wa ghayriha min alshuraka b'isharat mawthuqa lihalat alsijil.",
  },
};

export function getPartnersUiText(lang: Lang): PartnersUiText {
  return TEXT[lang] ?? TEXT.en;
}
