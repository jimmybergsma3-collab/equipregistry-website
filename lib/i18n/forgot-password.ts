import type { Lang } from "@/lib/i18n/config";

type ForgotPasswordText = {
  linkLabel: string;
  title: string;
  subtitle: string;
  description: string;
  supportCta: string;
  contactCta: string;
  backToLogin: string;
};

const TEXT: Record<Lang, ForgotPasswordText> = {
  en: {
    linkLabel: "Forgot password?",
    title: "Password help",
    subtitle: "Reset support for EquipRegistry accounts",
    description:
      "Self-service password reset is not available yet. Contact EquipRegistry support and include the email address used for your account.",
    supportCta: "Email support",
    contactCta: "Open contact page",
    backToLogin: "Back to login",
  },
  es: {
    linkLabel: "Olvido su contrasena?",
    title: "Ayuda con la contrasena",
    subtitle: "Soporte de restablecimiento para cuentas EquipRegistry",
    description:
      "El restablecimiento automatico aun no esta disponible. Contacte con el soporte de EquipRegistry e indique el correo usado en su cuenta.",
    supportCta: "Enviar correo a soporte",
    contactCta: "Abrir pagina de contacto",
    backToLogin: "Volver al inicio de sesion",
  },
  de: {
    linkLabel: "Passwort vergessen?",
    title: "Passwort-Hilfe",
    subtitle: "Unterstuetzung fuer EquipRegistry-Konten",
    description:
      "Ein Self-Service-Reset ist derzeit noch nicht verfuegbar. Kontaktieren Sie den EquipRegistry-Support und nennen Sie die E-Mail-Adresse Ihres Kontos.",
    supportCta: "Support per E-Mail",
    contactCta: "Kontaktseite oeffnen",
    backToLogin: "Zurueck zur Anmeldung",
  },
  fr: {
    linkLabel: "Mot de passe oublie ?",
    title: "Aide mot de passe",
    subtitle: "Assistance de reinitialisation pour les comptes EquipRegistry",
    description:
      "La reinitialisation en libre-service n'est pas encore disponible. Contactez le support EquipRegistry en indiquant l'adresse e-mail de votre compte.",
    supportCta: "Envoyer un e-mail au support",
    contactCta: "Ouvrir la page contact",
    backToLogin: "Retour a la connexion",
  },
  it: {
    linkLabel: "Password dimenticata?",
    title: "Aiuto password",
    subtitle: "Supporto di ripristino per account EquipRegistry",
    description:
      "Il reset self-service non e ancora disponibile. Contatti il supporto EquipRegistry e indichi l'e-mail usata per l'account.",
    supportCta: "Invia e-mail al supporto",
    contactCta: "Apri la pagina contatti",
    backToLogin: "Torna al login",
  },
  nl: {
    linkLabel: "Wachtwoord vergeten?",
    title: "Hulp bij wachtwoord",
    subtitle: "Resetondersteuning voor EquipRegistry-accounts",
    description:
      "Zelf wachtwoord resetten is nog niet beschikbaar. Neem contact op met EquipRegistry support en vermeld het e-mailadres van je account.",
    supportCta: "Mail support",
    contactCta: "Open contactpagina",
    backToLogin: "Terug naar login",
  },
  pt: {
    linkLabel: "Esqueceu-se da palavra-passe?",
    title: "Ajuda com a palavra-passe",
    subtitle: "Suporte de reposicao para contas EquipRegistry",
    description:
      "A reposicao em self-service ainda nao esta disponivel. Contacte o suporte EquipRegistry e indique o e-mail usado na conta.",
    supportCta: "Enviar e-mail ao suporte",
    contactCta: "Abrir pagina de contacto",
    backToLogin: "Voltar ao login",
  },
  pl: {
    linkLabel: "Nie pamietasz hasla?",
    title: "Pomoc z haslem",
    subtitle: "Wsparcie resetu dla kont EquipRegistry",
    description:
      "Samodzielny reset hasla nie jest jeszcze dostepny. Skontaktuj sie ze wsparciem EquipRegistry i podaj adres e-mail uzyty na koncie.",
    supportCta: "Napisz do wsparcia",
    contactCta: "Otworz strone kontaktowa",
    backToLogin: "Powrot do logowania",
  },
  sv: {
    linkLabel: "Glomt losenordet?",
    title: "Hjalp med losenord",
    subtitle: "Aterstallningsstod for EquipRegistry-konton",
    description:
      "Sjlvservice for losenordsaterstallning finns inte an. Kontakta EquipRegistry support och ange e-postadressen som hor till kontot.",
    supportCta: "Mejla support",
    contactCta: "Oppna kontaktsidan",
    backToLogin: "Tillbaka till inloggning",
  },
  da: {
    linkLabel: "Glemt adgangskoden?",
    title: "Hjaelp til adgangskode",
    subtitle: "Nulstillingshjaelp til EquipRegistry-konti",
    description:
      "Selvbetjent nulstilling er endnu ikke tilgaengelig. Kontakt EquipRegistry support og oplys den e-mailadresse, der bruges til kontoen.",
    supportCta: "Skriv til support",
    contactCta: "Aabn kontaktsiden",
    backToLogin: "Tilbage til login",
  },
  no: {
    linkLabel: "Glemt passordet?",
    title: "Hjelp med passord",
    subtitle: "Tilbakestillingshjelp for EquipRegistry-kontoer",
    description:
      "Selvbetjent tilbakestilling er ikke tilgjengelig enn. Kontakt EquipRegistry support og oppgi e-postadressen som brukes for kontoen.",
    supportCta: "Send e-post til support",
    contactCta: "Apne kontaktsiden",
    backToLogin: "Tilbake til innlogging",
  },
  ru: {
    linkLabel: "Zabyli parol?",
    title: "Pomoshch s parolem",
    subtitle: "Podderzhka sbrosa dlya akkauntov EquipRegistry",
    description:
      "Samostoyatelnyy sbros eshche nedostupen. Svjazhites s podderzhkoy EquipRegistry i ukazhite adres elektronnoy pochty akkaunta.",
    supportCta: "Napisat v podderzhku",
    contactCta: "Otkryt stranicu kontaktov",
    backToLogin: "Nazad ko vhodu",
  },
  zh: {
    linkLabel: "Wangji mima?",
    title: "Mima bangzhu",
    subtitle: "EquipRegistry zhanghu zhongzhi zhichi",
    description:
      "Muqian hai meiyou zizhu mima chongzhi. Qing lianxi EquipRegistry zhichi bing tigong zhanghu shiyong de dianzi youjian.",
    supportCta: "Gei zhichi fa youjian",
    contactCta: "Dak kai lianxi yemian",
    backToLogin: "Fan hui denglu",
  },
  hi: {
    linkLabel: "Password bhool gaye?",
    title: "Password sahayata",
    subtitle: "EquipRegistry khaton ke liye reset support",
    description:
      "Self-service password reset abhi upalabdh nahin hai. EquipRegistry support se sampark karen aur apne account wala email saath bhejen.",
    supportCta: "Support ko email karen",
    contactCta: "Contact page kholen",
    backToLogin: "Login par wapas",
  },
  ar: {
    linkLabel: "Hal nasita kalimat almurur?",
    title: "Musaeadat kalimat almurur",
    subtitle: "Daem iadat taeayin lihisabat EquipRegistry",
    description:
      "La yatavafar iadat taeayin dhati hatta alan. Tawasul mae daem EquipRegistry wa adhkur albarid al'iiliktiruni almustakhdam fi hesabik.",
    supportCta: "Murasalat aldaem",
    contactCta: "Fath safhat altawasul",
    backToLogin: "Aleawdat ila tudkhul",
  },
};

export function getForgotPasswordText(lang: Lang): ForgotPasswordText {
  return TEXT[lang] ?? TEXT.en;
}
