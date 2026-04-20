import type { Lang } from "@/lib/i18n/config";

type HomeCounterText = {
  eyebrow: string;
  label: string;
  description: string;
};

const TEXT: Record<Lang, HomeCounterText> = {
  en: {
    eyebrow: "Registry signal",
    label: "Issued passports",
    description:
      "Live count of passports already issued in the active EquipRegistry system.",
  },
  es: {
    eyebrow: "Señal del registro",
    label: "Pasaportes emitidos",
    description:
      "Conteo actual de los pasaportes ya emitidos dentro del sistema activo de EquipRegistry.",
  },
  de: {
    eyebrow: "Registersignal",
    label: "Ausgestellte Pässe",
    description:
      "Aktuelle Anzahl der bereits im aktiven EquipRegistry-System ausgestellten Pässe.",
  },
  fr: {
    eyebrow: "Signal du registre",
    label: "Passeports émis",
    description:
      "Compteur actuel des passeports déjà émis dans le système EquipRegistry actif.",
  },
  it: {
    eyebrow: "Segnale del registro",
    label: "Passaporti emessi",
    description:
      "Conteggio attuale dei passaporti già emessi nel sistema attivo EquipRegistry.",
  },
  nl: {
    eyebrow: "Registrysignaal",
    label: "Uitgegeven paspoorten",
    description:
      "Actuele teller van paspoorten die al binnen het actieve EquipRegistry-systeem zijn uitgegeven.",
  },
  pt: {
    eyebrow: "Sinal do registo",
    label: "Passaportes emitidos",
    description:
      "Contagem atual dos passaportes já emitidos no sistema ativo EquipRegistry.",
  },
  pl: {
    eyebrow: "Sygnał rejestru",
    label: "Wydane paszporty",
    description:
      "Aktualna liczba paszportów wydanych już w aktywnym systemie EquipRegistry.",
  },
  sv: {
    eyebrow: "Registersignal",
    label: "Utfärdade pass",
    description:
      "Aktuell räkning över pass som redan har utfärdats i det aktiva EquipRegistry-systemet.",
  },
  da: {
    eyebrow: "Registersignal",
    label: "Udstedte pas",
    description:
      "Aktuel optælling af pas, der allerede er udstedt i det aktive EquipRegistry-system.",
  },
  no: {
    eyebrow: "Registersignal",
    label: "Utstedte pass",
    description:
      "Oppdatert telling av pass som allerede er utstedt i det aktive EquipRegistry-systemet.",
  },
  ru: {
    eyebrow: "Сигнал реестра",
    label: "Выданные паспорта",
    description:
      "Актуальный счётчик паспортов, уже выданных в активной системе EquipRegistry.",
  },
  zh: {
    eyebrow: "注册信号",
    label: "已签发护照",
    description:
      "当前 EquipRegistry 活跃系统中已签发护照的实时数量。",
  },
  hi: {
    eyebrow: "रजिस्ट्री संकेत",
    label: "जारी किए गए पासपोर्ट",
    description:
      "सक्रिय EquipRegistry सिस्टम में अब तक जारी किए गए पासपोर्ट की वर्तमान संख्या।",
  },
  ar: {
    eyebrow: "إشارة السجل",
    label: "الجوازات الصادرة",
    description:
      "عدد محدث للجوازات التي صدرت بالفعل داخل نظام EquipRegistry النشط.",
  },
};

export function getHomeCounterText(lang: Lang): HomeCounterText {
  return TEXT[lang] ?? TEXT.en;
}
