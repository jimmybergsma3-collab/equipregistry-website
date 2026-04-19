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
    description: "Live count of passports already issued in the active EquipRegistry system.",
  },
  es: {
    eyebrow: "Senal del registro",
    label: "Pasaportes emitidos",
    description: "Conteo actual de los pasaportes ya emitidos dentro del sistema activo de EquipRegistry.",
  },
  de: {
    eyebrow: "Registersignal",
    label: "Ausgestellte Paesse",
    description: "Aktuelle Anzahl der bereits im aktiven EquipRegistry-System ausgestellten Paesse.",
  },
  fr: {
    eyebrow: "Signal du registre",
    label: "Passeports emis",
    description: "Compteur actuel des passeports deja emis dans le systeme EquipRegistry actif.",
  },
  it: {
    eyebrow: "Segnale del registro",
    label: "Passaporti emessi",
    description: "Conteggio attuale dei passaporti gia emessi nel sistema attivo EquipRegistry.",
  },
  nl: {
    eyebrow: "Registrysignaal",
    label: "Uitgegeven paspoorten",
    description: "Actuele teller van paspoorten die al binnen het actieve EquipRegistry-systeem zijn uitgegeven.",
  },
  pt: {
    eyebrow: "Sinal do registo",
    label: "Passaportes emitidos",
    description: "Contagem atual dos passaportes ja emitidos no sistema ativo EquipRegistry.",
  },
  pl: {
    eyebrow: "Sygnal rejestru",
    label: "Wydane paszporty",
    description: "Aktualna liczba paszportow wydanych juz w aktywnym systemie EquipRegistry.",
  },
  sv: {
    eyebrow: "Registersignal",
    label: "Utfardade pass",
    description: "Aktuell rakning over pass som redan har utfardats i det aktiva EquipRegistry-systemet.",
  },
  da: {
    eyebrow: "Registersignal",
    label: "Udstedte pas",
    description: "Aktuel optaelling af pas, der allerede er udstedt i det aktive EquipRegistry-system.",
  },
  no: {
    eyebrow: "Registersignal",
    label: "Utstedte pass",
    description: "Oppdatert telling av pass som allerede er utstedt i det aktive EquipRegistry-systemet.",
  },
  ru: {
    eyebrow: "Signal reestra",
    label: "Vydannye pasporta",
    description: "Aktualnyy schetchik pasportov, uzhe vydannykh v aktivnoy sisteme EquipRegistry.",
  },
  zh: {
    eyebrow: "Zhucedengji xinhao",
    label: "Yi qianfa huzhao",
    description: "Dangqian EquipRegistry huoyue xitong zhong yi qianfa huzhao de shishi shuliang.",
  },
  hi: {
    eyebrow: "Registry signal",
    label: "Issued passports",
    description: "Active EquipRegistry system me ab tak issue hue passports ki vartaman sankhya.",
  },
  ar: {
    eyebrow: "Isharat alsijil",
    label: "Aljawazat almasdara",
    description: "Eadad muhaddath lialjawazat allati sudirat mudmna alnizam alnaeil li EquipRegistry.",
  },
};

export function getHomeCounterText(lang: Lang): HomeCounterText {
  return TEXT[lang] ?? TEXT.en;
}
