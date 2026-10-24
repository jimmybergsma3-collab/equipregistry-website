import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import AuthoritiesClient from "./authorities/AuthoritiesClient";
import ReportSightingClient from "./ReportSightingClient";
import LoginRequiredButton from "@/components/auth/login-required-button";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

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

type ActionText = {
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
    important: string;
    importantText: string;
    nextTitle: string;
    next: string[];
    back: string;
  };
  authorities: {
    title: string;
    intro: string;
    registryId: string;
    caseId: string;
    emergencyTitle: string;
    emergencyText: string;
    important: string;
    importantText: string;
    back: string;
  };
  fallback: {
    title: string;
    text: string;
    back: string;
  };
};

const ACTION_TEXT: Partial<Record<Lang, ActionText>> = {
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
      who: ["Private owners", "Companies", "Insurers", "Partners"],
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
      important: "Important",
      importantText:
        "Only submit information that is accurate and relevant. In urgent situations, contact the authorities first.",
      nextTitle: "What happens next",
      next: [
        "Submit the available details about the sighting.",
        "EquipRegistry can pass the information to relevant parties where applicable.",
        "Keep any photo, location, or time details ready if requested later.",
      ],
      back: "Back",
    },
    authorities: {
      title: "Contact authorities",
      intro:
        "If this asset may be stolen or suspicious, contact the appropriate authorities first.",
      registryId: "Registry ID",
      caseId: "Case ID",
      emergencyTitle: "Emergency",
      emergencyText:
        "If there is immediate danger or a crime in progress, call the local emergency number immediately.",
      important: "Important",
      importantText:
        "EquipRegistry does not replace law enforcement. Always contact official authorities first in urgent or criminal situations.",
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
      important: "Importante",
      importantText:
        "Envía únicamente información precisa y relevante. En situaciones urgentes, contacta primero con las autoridades.",
      nextTitle: "Qué ocurre después",
      next: [
        "Envía los detalles disponibles sobre el avistamiento.",
        "EquipRegistry puede compartir la información con las partes relevantes cuando corresponda.",
        "Guarda fotos, ubicación y hora por si se solicitan más tarde.",
      ],
      back: "Volver",
    },
    authorities: {
      title: "Contactar a las autoridades",
      intro:
        "Si este activo puede ser robado o sospechoso, contacta primero con las autoridades competentes.",
      registryId: "ID de registro",
      caseId: "ID del caso",
      emergencyTitle: "Emergencia",
      emergencyText:
        "Si existe un peligro inmediato o un delito en curso, llama de inmediato al número local de emergencias.",
      important: "Importante",
      importantText:
        "EquipRegistry no sustituye a las fuerzas del orden. En situaciones urgentes o delictivas, contacta siempre primero con las autoridades oficiales.",
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
      important: "Wichtig",
      importantText:
        "Übermitteln Sie nur genaue und relevante Informationen. In dringenden Situationen wenden Sie sich zuerst an die Behörden.",
      nextTitle: "Wie es weitergeht",
      next: [
        "Übermitteln Sie die verfügbaren Details zur Sichtung.",
        "EquipRegistry kann die Informationen gegebenenfalls an relevante Stellen weitergeben.",
        "Halten Sie Fotos, Standort und Uhrzeit bereit, falls diese später angefordert werden.",
      ],
      back: "Zurück",
    },
    authorities: {
      title: "Behörden kontaktieren",
      intro:
        "Wenn dieses Objekt gestohlen oder verdächtig sein könnte, kontaktieren Sie zuerst die zuständigen Behörden.",
      registryId: "Register-ID",
      caseId: "Fall-ID",
      emergencyTitle: "Notfall",
      emergencyText:
        "Wenn unmittelbare Gefahr besteht oder eine Straftat im Gange ist, rufen Sie sofort die örtliche Notrufnummer an.",
      important: "Wichtig",
      importantText:
        "EquipRegistry ersetzt keine Strafverfolgungsbehörde. In dringenden oder strafrechtlichen Situationen wenden Sie sich immer zuerst an die offiziellen Behörden.",
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
      important: "Important",
      importantText:
        "Soumettez uniquement des informations exactes et pertinentes. En cas d’urgence, contactez d’abord les autorités.",
      nextTitle: "Étapes suivantes",
      next: [
        "Soumettez les détails disponibles concernant l’observation.",
        "EquipRegistry peut transmettre les informations aux parties concernées lorsque cela s’applique.",
        "Conservez les photos, le lieu et l’heure si ces éléments sont demandés ultérieurement.",
      ],
      back: "Retour",
    },
    authorities: {
      title: "Contacter les autorités",
      intro:
        "Si cet actif semble volé ou suspect, contactez d’abord les autorités compétentes.",
      registryId: "ID d’enregistrement",
      caseId: "ID du dossier",
      emergencyTitle: "Urgence",
      emergencyText:
        "En cas de danger immédiat ou de crime en cours, appelez immédiatement le numéro d’urgence local.",
      important: "Important",
      importantText:
        "EquipRegistry ne remplace pas les forces de l’ordre. En cas de situation urgente ou criminelle, contactez toujours d’abord les autorités officielles.",
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
      who: ["Proprietari privati", "Aziende", "Assicuratori", "Partner"],
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
      important: "Importante",
      importantText:
        "Invia solo informazioni accurate e pertinenti. In situazioni urgenti, contatta prima le autorità.",
      nextTitle: "Cosa succede dopo",
      next: [
        "Invia i dettagli disponibili sull’avvistamento.",
        "EquipRegistry può condividere le informazioni con le parti rilevanti quando applicabile.",
        "Tieni pronte foto, posizione e orario nel caso vengano richiesti successivamente.",
      ],
      back: "Indietro",
    },
    authorities: {
      title: "Contatta le autorità",
      intro:
        "Se questo bene potrebbe essere rubato o sospetto, contatta prima le autorità competenti.",
      registryId: "ID registro",
      caseId: "ID caso",
      emergencyTitle: "Emergenza",
      emergencyText:
        "Se c’è un pericolo immediato o un reato in corso, chiama subito il numero locale di emergenza.",
      important: "Importante",
      importantText:
        "EquipRegistry non sostituisce le forze dell’ordine. In situazioni urgenti o criminali, contatta sempre prima le autorità ufficiali.",
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
      important: "Belangrijk",
      importantText:
        "Dien alleen juiste en relevante informatie in. Neem in urgente situaties eerst contact op met de autoriteiten.",
      nextTitle: "Wat gebeurt hierna",
      next: [
        "Dien de beschikbare details van de waarneming in.",
        "EquipRegistry kan de informatie waar relevant doorgeven aan betrokken partijen.",
        "Bewaar foto’s, locatie en tijdstip voor het geval die later nodig zijn.",
      ],
      back: "Terug",
    },
    authorities: {
      title: "Autoriteiten contacteren",
      intro:
        "Als dit object mogelijk gestolen of verdacht is, neem dan eerst contact op met de bevoegde autoriteiten.",
      registryId: "Registratie-ID",
      caseId: "Zaak-ID",
      emergencyTitle: "Noodgeval",
      emergencyText:
        "Als er direct gevaar is of een misdrijf aan de gang is, bel dan onmiddellijk het lokale alarmnummer.",
      important: "Belangrijk",
      importantText:
        "EquipRegistry vervangt de politie of andere opsporingsdiensten niet. Neem in urgente of strafrechtelijke situaties altijd eerst contact op met de officiële autoriteiten.",
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
      important: "Importante",
      importantText:
        "Submeta apenas informações precisas e relevantes. Em situações urgentes, contacte primeiro as autoridades.",
      nextTitle: "O que acontece a seguir",
      next: [
        "Submeta os detalhes disponíveis sobre o avistamento.",
        "A EquipRegistry pode partilhar a informação com as partes relevantes quando aplicável.",
        "Guarde fotos, localização e hora caso sejam solicitadas mais tarde.",
      ],
      back: "Voltar",
    },
    authorities: {
      title: "Contactar autoridades",
      intro:
        "Se este ativo puder ser roubado ou suspeito, contacte primeiro as autoridades competentes.",
      registryId: "ID de registo",
      caseId: "ID do caso",
      emergencyTitle: "Emergência",
      emergencyText:
        "Se existir perigo imediato ou um crime em curso, ligue imediatamente para o número local de emergência.",
      important: "Importante",
      importantText:
        "A EquipRegistry não substitui as autoridades policiais. Em situações urgentes ou criminais, contacte sempre primeiro as autoridades oficiais.",
      back: "Voltar",
    },
    fallback: {
      title: "Ação indisponível",
      text: "Esta ação não está disponível neste momento.",
      back: "Voltar",
    },
  },

  pl: {
    verify: {
      title: "Zweryfikuj rejestracje",
      intro: "Sprawdz aktualny status EquipRegistry tego assetu.",
      registryId: "Registry ID",
      nextTitle: "Co dalej",
      steps: [
        "Sprawdz aktualny status rejestracji.",
        "Sprawdz, czy po zalogowaniu beda dostepne dodatkowe szczegoly.",
        "Wykorzystaj informacje, aby zdecydowac o kolejnym kroku.",
      ],
      login: "Zaloguj sie, aby kontynuowac",
      back: "Wroc",
    },
    register: {
      title: "Zarejestruj asset",
      intro: "Utworz zgloszenie rejestracji dla tego assetu.",
      whoTitle: "Kto moze zarejestrowac",
      who: ["Prywatni wlasciciele", "Firmy", "Ubezpieczyciele", "Partnerzy"],
      includesTitle: "Co obejmuje",
      includes: [
        "Podstawowa identyfikacja assetu",
        "Dane wlasnosci",
        "Dokumenty potwierdzajace",
      ],
      login: "Zaloguj sie, aby kontynuowac",
      back: "Wroc",
    },
    report: {
      title: "Zglos obserwacje",
      intro: "Przeslij obserwacje dotyczaca tego assetu.",
      registryId: "Registry ID",
      whyTitle: "Dlaczego to wazne",
      why: [
        "Obserwacja moze pomoc odzyskac skradziony asset.",
        "Wladze i odpowiednie strony moga wykorzystac te informacje.",
      ],
      important: "Wazne",
      importantText:
        "Przesylaj tylko dokladne i istotne informacje. W sytuacjach pilnych najpierw skontaktuj sie z odpowiednimi sluzbami.",
      nextTitle: "Co dalej",
      next: [
        "Przeslij dostepne szczegoly dotyczace obserwacji.",
        "EquipRegistry moze przekazac informacje odpowiednim stronom, jesli ma to zastosowanie.",
        "Zachowaj zdjecia, lokalizacje lub informacje o czasie na wypadek pozniejszej prosby.",
      ],
      back: "Wroc",
    },
    authorities: {
      title: "Skontaktuj sie z wladzami",
      intro:
        "Jesli ten asset moze byc skradziony lub podejrzany, najpierw skontaktuj sie z odpowiednimi wladzami.",
      registryId: "Registry ID",
      caseId: "Case ID",
      emergencyTitle: "Nagly przypadek",
      emergencyText:
        "Jesli istnieje bezposrednie zagrozenie lub przestepstwo trwa, natychmiast zadzwon pod lokalny numer alarmowy.",
      important: "Wazne",
      importantText:
        "EquipRegistry nie zastepuje organow scigania. W sytuacjach naglych lub kryminalnych zawsze najpierw kontaktuj sie z oficjalnymi sluzbami.",
      back: "Wroc",
    },
    fallback: {
      title: "Akcja niedostepna",
      text: "Ta akcja jest obecnie niedostepna.",
      back: "Wroc",
    },
  },
  sv: {
    verify: {
      title: "Verifiera registrering",
      intro: "Kontrollera aktuell EquipRegistry-status for denna asset.",
      registryId: "Registry ID",
      nextTitle: "Vad hander nu",
      steps: [
        "Granska den aktuella registreringsstatusen.",
        "Kontrollera om fler detaljer blir tillgangliga efter inloggning.",
        "Anvand informationen for att avgora ditt nasta steg.",
      ],
      login: "Logga in for att fortsatta",
      back: "Tillbaka",
    },
    register: {
      title: "Registrera asset",
      intro: "Skapa ett registreringsarende for denna asset.",
      whoTitle: "Vem kan registrera",
      who: ["Privata agare", "Foretag", "Forsakrare", "Partner"],
      includesTitle: "Detta ingar",
      includes: [
        "Grundlaggande identifikation av asseten",
        "Agaruppgifter",
        "Stodjande dokument",
      ],
      login: "Logga in for att fortsatta",
      back: "Tillbaka",
    },
    report: {
      title: "Rapportera observation",
      intro: "Skicka in en observation som galler denna asset.",
      registryId: "Registry ID",
      whyTitle: "Varfor detta ar viktigt",
      why: [
        "En observation kan hjalpa till att aterfa en stulen asset.",
        "Myndigheter och relevanta parter kan anvanda denna information.",
      ],
      important: "Viktigt",
      importantText:
        "Skicka bara in information som ar korrekt och relevant. Vid akuta situationer ska du kontakta myndigheterna forst.",
      nextTitle: "Vad hander nu",
      next: [
        "Skicka in de tillgangliga detaljerna om observationen.",
        "EquipRegistry kan vidarebefordra informationen till relevanta parter dar det ar tillampligt.",
        "Ha foto, plats eller tidsuppgifter redo om de efterfragas senare.",
      ],
      back: "Tillbaka",
    },
    authorities: {
      title: "Kontakta myndigheter",
      intro:
        "Om denna asset kan vara stulen eller misstankt ska du forst kontakta relevanta myndigheter.",
      registryId: "Registry ID",
      caseId: "Case ID",
      emergencyTitle: "Nodsituation",
      emergencyText:
        "Om det finns omedelbar fara eller ett brott pagar ska du omedelbart ringa det lokala nodnumret.",
      important: "Viktigt",
      importantText:
        "EquipRegistry ersatter inte brottsbekampande myndigheter. Kontakta alltid officiella myndigheter forst vid akuta eller brottsliga situationer.",
      back: "Tillbaka",
    },
    fallback: {
      title: "Atgarden ar inte tillganglig",
      text: "Denna atgard ar for narvarande inte tillganglig.",
      back: "Tillbaka",
    },
  },
  da: {
    verify: {
      title: "Verificer registrering",
      intro: "Kontroller den aktuelle EquipRegistry-status for dette asset.",
      registryId: "Registry ID",
      nextTitle: "Hvad sker der nu",
      steps: [
        "Gennemga den aktuelle registreringsstatus.",
        "Kontroller om flere detaljer bliver tilgaengelige efter login.",
        "Brug oplysningerne til at beslutte dit naeste skridt.",
      ],
      login: "Log ind for at fortsaette",
      back: "Tilbage",
    },
    register: {
      title: "Registrer asset",
      intro: "Opret en registreringsanmodning for dette asset.",
      whoTitle: "Hvem kan registrere",
      who: ["Private ejere", "Virksomheder", "Forsikringsselskaber", "Partnere"],
      includesTitle: "Dette omfatter",
      includes: [
        "Grundlaeggende assetidentifikation",
        "Ejerskabsoplysninger",
        "Stottedokumenter",
      ],
      login: "Log ind for at fortsaette",
      back: "Tilbage",
    },
    report: {
      title: "Rapporter observation",
      intro: "Indsend en observation relateret til dette asset.",
      registryId: "Registry ID",
      whyTitle: "Hvorfor det betyder noget",
      why: [
        "En observation kan hjaelpe med at genfinde et stjalet asset.",
        "Myndigheder og relevante parter kan bruge disse oplysninger.",
      ],
      important: "Vigtigt",
      importantText:
        "Indsend kun oplysninger, der er korrekte og relevante. I hastesituationer skal du kontakte myndighederne forst.",
      nextTitle: "Hvad sker der nu",
      next: [
        "Indsend de tilgaengelige detaljer om observationen.",
        "EquipRegistry kan videregive oplysningerne til relevante parter, hvor det er relevant.",
        "Hav foto-, lokations- eller tidsoplysninger klar, hvis de eftersporges senere.",
      ],
      back: "Tilbage",
    },
    authorities: {
      title: "Kontakt myndigheder",
      intro:
        "Hvis dette asset kan vaere stjalet eller mistankeligt, skal du forst kontakte de relevante myndigheder.",
      registryId: "Registry ID",
      caseId: "Case ID",
      emergencyTitle: "Nodsituation",
      emergencyText:
        "Hvis der er umiddelbar fare eller en forbrydelse i gang, skal du straks ringe til det lokale alarmnummer.",
      important: "Vigtigt",
      importantText:
        "EquipRegistry erstatter ikke retshandhaevelse. Kontakt altid officielle myndigheder forst i hastende eller kriminelle situationer.",
      back: "Tilbage",
    },
    fallback: {
      title: "Handling ikke tilgaengelig",
      text: "Denne handling er i ojeblikket ikke tilgaengelig.",
      back: "Tilbage",
    },
  },
  no: {
    verify: {
      title: "Verifiser registrering",
      intro: "Kontroller gjeldende EquipRegistry-status for denne asseten.",
      registryId: "Registry ID",
      nextTitle: "Hva skjer na",
      steps: [
        "Ga gjennom gjeldende registreringsstatus.",
        "Kontroller om flere detaljer blir tilgjengelige etter innlogging.",
        "Bruk informasjonen til a bestemme neste steg.",
      ],
      login: "Logg inn for a fortsette",
      back: "Tilbake",
    },
    register: {
      title: "Registrer asset",
      intro: "Opprett en registreringsforesporsel for denne asseten.",
      whoTitle: "Hvem kan registrere",
      who: ["Private eiere", "Selskaper", "Forsikrere", "Partnere"],
      includesTitle: "Dette inkluderer",
      includes: [
        "Grunnleggende identifikasjon av asseten",
        "Eierskapsdetaljer",
        "Stottedokumenter",
      ],
      login: "Logg inn for a fortsette",
      back: "Tilbake",
    },
    report: {
      title: "Rapporter observasjon",
      intro: "Send inn en observasjon knyttet til denne asseten.",
      registryId: "Registry ID",
      whyTitle: "Hvorfor dette er viktig",
      why: [
        "En observasjon kan bidra til a fa tilbake en stjalet asset.",
        "Myndigheter og relevante parter kan bruke denne informasjonen.",
      ],
      important: "Viktig",
      importantText:
        "Send bare inn informasjon som er korrekt og relevant. I akutte situasjoner skal du kontakte myndighetene forst.",
      nextTitle: "Hva skjer na",
      next: [
        "Send inn de tilgjengelige detaljene om observasjonen.",
        "EquipRegistry kan videreformidle informasjonen til relevante parter der det er aktuelt.",
        "Ha foto, lokasjon eller tidsdetaljer klare hvis de etterspors senere.",
      ],
      back: "Tilbake",
    },
    authorities: {
      title: "Kontakt myndigheter",
      intro:
        "Hvis denne asseten kan vaere stjalet eller mistenkelig, skal du forst kontakte relevante myndigheter.",
      registryId: "Registry ID",
      caseId: "Case ID",
      emergencyTitle: "Nodsituasjon",
      emergencyText:
        "Hvis det er umiddelbar fare eller en forbrytelse pagar, ring det lokale nodnummeret med en gang.",
      important: "Viktig",
      importantText:
        "EquipRegistry erstatter ikke politi eller andre myndigheter. Kontakt alltid offisielle myndigheter forst i akutte eller kriminelle situasjoner.",
      back: "Tilbake",
    },
    fallback: {
      title: "Handling ikke tilgjengelig",
      text: "Denne handlingen er for oyeblikket ikke tilgjengelig.",
      back: "Tilbake",
    },
  },
};

const EN_FALLBACK = ACTION_TEXT.en!;

export default async function ActionPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { type, registryId, caseId } = await searchParams;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = repairMojibakeDeep(ACTION_TEXT[safeLang] ?? EN_FALLBACK);

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

          {registryId ? (
            <p style={styles.registryId}>
              {t.verify.registryId}: <strong>{registryId}</strong>
            </p>
          ) : null}

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

          <p style={styles.text}>{t.fallback.text}</p>

          {registryId ? (
            <p style={styles.registryId}>
              {t.report.registryId}: <strong>{registryId}</strong>
            </p>
          ) : null}

          <div style={styles.warning}>
            <strong>{t.fallback.title}</strong>
            <p style={{ marginTop: 6 }}>{t.report.importantText}</p>
          </div>

          <ReportSightingClient
            lang={safeLang}
            registryId={registryId}
            caseId={caseId}
          />

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
    const resolvedCaseId = caseId?.trim() || "";

    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.authorities.title}</h1>

          <p style={styles.text}>{t.authorities.intro}</p>

          {registryId ? (
            <p style={styles.registryId}>
              {t.authorities.registryId}: <strong>{registryId}</strong>
            </p>
          ) : null}

          <p style={styles.registryId}>
            {t.authorities.caseId}: <strong>{resolvedCaseId}</strong>
          </p>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.authorities.emergencyTitle}</h3>
            <p style={styles.text}>{t.authorities.emergencyText}</p>
          </div>

          <AuthoritiesClient
  lang={safeLang}
  registryId={registryId}
  caseId={resolvedCaseId}
/>

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

        <p style={styles.text}>{t.fallback.text}</p>

        <Link href={backToSearchHref} style={styles.primaryButton}>
          {t.fallback.back}
        </Link>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
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
