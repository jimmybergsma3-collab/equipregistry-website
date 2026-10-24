import type { Lang } from "@/lib/i18n/config";

type LegalUiText = {
  back: string;
  responsiblePerson: string;
  email: string;
  address: string;
  taxId: string;
};

const TEXT: Record<Lang, LegalUiText> = {
  en: {
    back: "Back to home",
    responsiblePerson: "Responsible person",
    email: "Email",
    address: "Address",
    taxId: "Tax / ID number",
  },
  es: {
    back: "Volver al inicio",
    responsiblePerson: "Persona responsable",
    email: "Correo electronico",
    address: "Direccion",
    taxId: "Numero fiscal / ID",
  },
  de: {
    back: "Zurueck zur Startseite",
    responsiblePerson: "Verantwortliche Person",
    email: "E-Mail",
    address: "Adresse",
    taxId: "Steuer- / ID-Nummer",
  },
  fr: {
    back: "Retour a l'accueil",
    responsiblePerson: "Personne responsable",
    email: "E-mail",
    address: "Adresse",
    taxId: "Numero fiscal / ID",
  },
  it: {
    back: "Torna alla home",
    responsiblePerson: "Persona responsabile",
    email: "E-mail",
    address: "Indirizzo",
    taxId: "Numero fiscale / ID",
  },
  nl: {
    back: "Terug naar home",
    responsiblePerson: "Verantwoordelijke persoon",
    email: "E-mail",
    address: "Adres",
    taxId: "Fiscale / ID-nummer",
  },
  pt: {
    back: "Voltar ao inicio",
    responsiblePerson: "Pessoa responsavel",
    email: "E-mail",
    address: "Morada",
    taxId: "Numero fiscal / ID",
  },
  pl: {
    back: "Powrot do strony glownej",
    responsiblePerson: "Osoba odpowiedzialna",
    email: "E-mail",
    address: "Adres",
    taxId: "Numer podatkowy / ID",
  },
  sv: {
    back: "Tillbaka till startsidan",
    responsiblePerson: "Ansvarig person",
    email: "E-post",
    address: "Adress",
    taxId: "Skatte- / ID-nummer",
  },
  da: {
    back: "Tilbage til forsiden",
    responsiblePerson: "Ansvarlig person",
    email: "E-mail",
    address: "Adresse",
    taxId: "Skatte- / ID-nummer",
  },
  no: {
    back: "Tilbake til startsiden",
    responsiblePerson: "Ansvarlig person",
    email: "E-post",
    address: "Adresse",
    taxId: "Skatte- / ID-nummer",
  },
  ru: {
    back: "Nazad na glavnuyu",
    responsiblePerson: "Otvetstvennoe litso",
    email: "E-mail",
    address: "Adres",
    taxId: "Nalogovyy / ID nomer",
  },
  zh: {
    back: "Fan hui shouye",
    responsiblePerson: "Fuzeren",
    email: "Dianzi youjian",
    address: "Dizhi",
    taxId: "Shuihao / ID",
  },
  hi: {
    back: "Homepage par wapas",
    responsiblePerson: "Jimmedar vyakti",
    email: "Email",
    address: "Pata",
    taxId: "Tax / ID number",
  },
  ar: {
    back: "Aleawdat ila alraisiya",
    responsiblePerson: "Alshakhs almasul",
    email: "Albarid al'iiliktiruni",
    address: "Aleunwan",
    taxId: "Raqm aldariba / alhuwia",
  },
};

export function getLegalUiText(lang: Lang): LegalUiText {
  return TEXT[lang] ?? TEXT.en;
}
