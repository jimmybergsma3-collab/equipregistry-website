import type { Lang } from "@/lib/i18n/config";
import type { PublicHomeText } from "@/lib/i18n/public-home";

export const PUBLIC_HOME_NATIVE_OVERRIDES: Partial<
  Record<Lang, PublicHomeText>
> = {
  fr: {
    hero: {
      title:
        "Vérifiez l’origine, le statut et les risques des véhicules et équipements dans le monde entier",
      subtitle:
        "Utilisez les VIN, numéros de série et identifiants de registre pour vérifier l’origine, le statut actuel et les signaux de risque avant achat, financement, assurance, location ou transfert.",
      placeholder: "Saisissez un VIN, un numéro de série ou un identifiant de registre",
      search: "Vérifier l’actif",
      demoSerials: "Séries démo :",
      loggedInMessage:
        "Vous êtes connecté. Vous pouvez utiliser la recherche normalement et continuer à accéder aux passeports privés.",
      goToDashboard: "Aller au tableau de bord",
      supportedAssetsTitle: "Catégories d’actifs couvertes par EquipRegistry",
      supportedAssetsItems: [
        "Véhicules routiers, remorques et actifs de flotte",
        "Équipements de construction, industriels, agricoles et de location",
        "Vélos, batteries, systèmes énergétiques et autres actifs sérialisés",
      ],
    },
    result: { whyThisMatters: "Pourquoi c’est important" },
    howItWorks: {
      title: "Comment fonctionne EquipRegistry",
      step1Title: "1. Rechercher",
      step1Text:
        "Saisissez un VIN, un numéro de série ou un identifiant de registre pour voir immédiatement le statut actuel.",
      step2Title: "2. Vérifier",
      step2Text:
        "Consultez les signaux du registre, le contexte de propriété et la visibilité du passeport lorsqu’ils sont disponibles.",
      step3Title: "3. Enregistrer",
      step3Text:
        "Enregistrez véhicules, équipements ou autres actifs et ajoutez les documents justificatifs.",
      step4Title: "4. Utiliser",
      step4Text:
        "Utilisez le passeport de registre dans les workflows d’assurance, de location, de revente, de récupération et de conformité.",
    },
    trust: {
      title: "Conçu pour une vérification fiable des actifs",
      subtitle:
        "EquipRegistry aide les propriétaires, assureurs, financeurs, opérateurs de location et acheteurs à vérifier l’origine légale et le statut via une couche de recherche publique cohérente.",
      card1Title: "Prêt pour l’assurance",
      card1Text:
        "Prend en charge la souscription, les contrôles de validation et les décisions basées sur le risque.",
      card2Title: "Indépendant",
      card2Text:
        "Conçu comme une couche de vérification neutre entre opérateurs, marchés et juridictions.",
      card3Title: "Évolutif",
      card3Text:
        "Fonctionne aussi bien pour un actif unique que pour de grandes flottes avec la même couche publique.",
    },
    statuses: {
      registeredVerified: {
        label: "Enregistré et vérifié",
        message:
          "Cet actif est enregistré dans EquipRegistry et son origine légale a été vérifiée.",
        why:
          "Cela renforce la confiance pour l’achat, le financement, l’assurance et les traitements transfrontaliers.",
        metadataStatus: "Statut",
        metadataPassport: "Passeport de registre",
        metadataValidation: "Dernière vérification",
        actionViewPassport: "Voir le passeport",
      },
      historyUnknown: {
        label: "Historique limité",
        message:
          "Cet actif apparaît dans le registre, mais l’historique complet de propriété n’est pas encore entièrement vérifié.",
        why:
          "Un historique limité augmente l’incertitude et doit être revu avant transaction ou intégration.",
        metadataStatus: "Statut",
        metadataRisk: "Niveau de risque",
        actionViewPassport: "Voir le passeport limité",
        actionRegisterDocuments: "Enregistrer des documents",
      },
      stolen: {
        label: "Actif volé - alerte rouge",
        message:
          "Cet actif a été officiellement signalé comme volé et reste activement marqué dans EquipRegistry.",
        warning:
          "N’achetez pas, n’assurez pas, ne louez pas, ne déplacez pas et n’acceptez pas le transfert de cet actif.",
        why:
          "Toute transaction impliquant un actif volé peut créer un risque juridique, financier et de conformité.",
        metadataStatus: "Statut",
        metadataRisk: "Niveau de risque",
        metadataReportedBy: "Signalé par",
        metadataJurisdiction: "Juridiction",
        metadataReportDate: "Date du signalement",
        actionReportSighting: "Signaler une observation",
        actionContactAuthorities: "Contacter les autorités",
      },
      notRegistered: {
        label: "Non enregistré",
        message: "Cet identifiant n’est pas enregistré dans EquipRegistry.",
        why:
          "Un actif non enregistré ne dispose d’aucun enregistrement vérifié, d’aucune traçabilité de propriété ni d’aucun passeport public.",
        actionRegister: "Enregistrer cet actif",
      },
      metadataValues: {
        active: "Actif",
        full: "Complet",
        lastValidation2025: "2025",
        limitedPassport: "Passeport limité",
        medium: "Moyen",
        blacklisted: "Liste noire",
        high: "Élevé",
        insurancePartner: "Partenaire assurance",
        euCrossBorderAlert: "Alerte UE / transfrontalière",
        reportDate: "2025-03-12",
      },
    },
  },
  it: {
    hero: {
      title:
        "Verifica origine, stato e rischi di veicoli e attrezzature in tutto il mondo",
      subtitle:
        "Usa VIN, numeri di serie e ID di registro per verificare origine, stato attuale e segnali di rischio prima di acquisto, finanziamento, assicurazione, noleggio o trasferimento.",
      placeholder: "Inserisci VIN, numero di serie o ID di registro",
      search: "Verifica asset",
      demoSerials: "Serial demo:",
      loggedInMessage:
        "Hai effettuato l’accesso. Puoi usare la ricerca normalmente e continuare ad accedere ai passaporti privati.",
      goToDashboard: "Vai alla dashboard",
      supportedAssetsTitle: "Categorie di asset coperte da EquipRegistry",
      supportedAssetsItems: [
        "Veicoli stradali, rimorchi e asset di flotta",
        "Attrezzature da costruzione, industriali, agricole e a noleggio",
        "Biciclette, batterie, sistemi energetici e altri asset serializzati",
      ],
    },
    result: { whyThisMatters: "Perché è importante" },
    howItWorks: {
      title: "Come funziona EquipRegistry",
      step1Title: "1. Cerca",
      step1Text:
        "Inserisci un VIN, un numero di serie o un ID di registro per vedere subito lo stato attuale.",
      step2Title: "2. Verifica",
      step2Text:
        "Controlla segnali di registro, contesto di proprietà e visibilità del passaporto quando disponibili.",
      step3Title: "3. Registra",
      step3Text:
        "Registra veicoli, attrezzature o altri asset e aggiungi documenti di supporto.",
      step4Title: "4. Usa",
      step4Text:
        "Usa il passaporto di registro nei flussi di assicurazione, noleggio, rivendita, recupero e compliance.",
    },
    trust: {
      title: "Progettato per una verifica affidabile degli asset",
      subtitle:
        "EquipRegistry aiuta proprietari, assicuratori, finanziatori, operatori di noleggio e acquirenti a verificare origine legale e stato tramite un unico livello di ricerca pubblica.",
      card1Title: "Pronto per l’assicurazione",
      card1Text:
        "Supporta underwriting, controlli di validazione e decisioni basate sul rischio.",
      card2Title: "Indipendente",
      card2Text:
        "Progettato come livello neutrale di verifica tra operatori, mercati e giurisdizioni.",
      card3Title: "Scalabile",
      card3Text:
        "Funziona per singoli asset e grandi flotte con lo stesso modello pubblico.",
    },
    statuses: {
      registeredVerified: {
        label: "Registrato e verificato",
        message:
          "Questo asset è registrato in EquipRegistry e la sua origine legale è stata verificata.",
        why:
          "Questo aumenta la fiducia per acquisto, finanziamento, assicurazione e trasferimenti transfrontalieri.",
        metadataStatus: "Stato",
        metadataPassport: "Passaporto di registro",
        metadataValidation: "Ultima verifica",
        actionViewPassport: "Visualizza passaporto",
      },
      historyUnknown: {
        label: "Storico limitato",
        message:
          "Questo asset appare nel registro, ma la cronologia completa di proprietà non è ancora pienamente verificata.",
        why:
          "Uno storico limitato aumenta l’incertezza e va rivisto prima di una transazione o dell’onboarding.",
        metadataStatus: "Stato",
        metadataRisk: "Livello di rischio",
        actionViewPassport: "Visualizza passaporto limitato",
        actionRegisterDocuments: "Registra documenti",
      },
      stolen: {
        label: "Asset rubato - allerta rossa",
        message:
          "Questo asset è stato ufficialmente segnalato come rubato e resta attivamente marcato in EquipRegistry.",
        warning:
          "Non acquistare, non assicurare, non noleggiare, non spostare e non accettare il trasferimento di questo asset.",
        why:
          "Qualsiasi transazione che coinvolga un asset rubato può creare rischi legali, finanziari e di compliance.",
        metadataStatus: "Stato",
        metadataRisk: "Livello di rischio",
        metadataReportedBy: "Segnalato da",
        metadataJurisdiction: "Giurisdizione",
        metadataReportDate: "Data della segnalazione",
        actionReportSighting: "Segnala avvistamento",
        actionContactAuthorities: "Contatta le autorità",
      },
      notRegistered: {
        label: "Non registrato",
        message: "Questo identificatore non è registrato in EquipRegistry.",
        why:
          "Un asset non registrato non ha un record verificato, una traccia di proprietà o un passaporto pubblico.",
        actionRegister: "Registra questo asset",
      },
      metadataValues: {
        active: "Attivo",
        full: "Completo",
        lastValidation2025: "2025",
        limitedPassport: "Passaporto limitato",
        medium: "Medio",
        blacklisted: "In blacklist",
        high: "Alto",
        insurancePartner: "Partner assicurativo",
        euCrossBorderAlert: "Allerta UE / transfrontaliera",
        reportDate: "2025-03-12",
      },
    },
  },
  pl: {
    hero: {
      title:
        "Sprawdź własność i ryzyko oszustwa dla pojazdów oraz sprzętu na całym świecie",
      subtitle:
        "Użyj VIN, numerów seryjnych i identyfikatorów rejestru, aby sprawdzić legalne pochodzenie, alerty kradzieży i status rejestru przed zakupem, finansowaniem, ubezpieczeniem, wynajmem lub transferem.",
      placeholder: "Wpisz VIN, numer seryjny lub identyfikator rejestru",
      search: "Zweryfikuj aktywo",
      demoSerials: "Numery demo:",
      loggedInMessage:
        "Jesteś zalogowany. Możesz normalnie korzystać z wyszukiwania i nadal otwierać prywatne paszporty.",
      goToDashboard: "Przejdź do panelu",
      supportedAssetsTitle: "Kategorie aktywów obsługiwane przez EquipRegistry",
      supportedAssetsItems: [
        "Pojazdy drogowe, przyczepy i aktywa flotowe",
        "Sprzęt budowlany, przemysłowy, rolniczy i wynajmowany",
        "Rowery, baterie, systemy energetyczne i inne aktywa seryjne",
      ],
    },
    result: { whyThisMatters: "Dlaczego to ważne" },
    howItWorks: {
      title: "Jak działa EquipRegistry",
      step1Title: "1. Szukaj",
      step1Text:
        "Wpisz VIN, numer seryjny lub identyfikator rejestru, aby natychmiast zobaczyć aktualny status.",
      step2Title: "2. Weryfikuj",
      step2Text:
        "Sprawdź sygnały rejestru, kontekst własności i widoczność paszportu, gdy są dostępne.",
      step3Title: "3. Rejestruj",
      step3Text:
        "Rejestruj pojazdy, sprzęt lub inne aktywa i dodawaj dokumenty potwierdzające.",
      step4Title: "4. Używaj",
      step4Text:
        "Korzystaj z paszportu rejestru w procesach ubezpieczenia, wynajmu, odsprzedaży, odzysku i zgodności.",
    },
    trust: {
      title: "Stworzony do wiarygodnej weryfikacji aktywów",
      subtitle:
        "EquipRegistry pomaga właścicielom, ubezpieczycielom, finansującym, operatorom wynajmu i kupującym weryfikować legalne pochodzenie i status przez spójną publiczną warstwę wyszukiwania.",
      card1Title: "Gotowe dla ubezpieczeń",
      card1Text:
        "Wspiera underwriting, kontrole walidacyjne i decyzje oparte na ryzyku.",
      card2Title: "Niezależne",
      card2Text:
        "Zaprojektowane jako neutralna warstwa weryfikacji między operatorami, rynkami i jurysdykcjami.",
      card3Title: "Skalowalne",
      card3Text:
        "Działa zarówno dla pojedynczych aktywów, jak i dużych flot w tym samym modelu publicznym.",
    },
    statuses: {
      registeredVerified: {
        label: "Zarejestrowane i zweryfikowane",
        message:
          "To aktywo jest zarejestrowane w EquipRegistry, a jego legalne pochodzenie zostało zweryfikowane.",
        why:
          "To zwiększa zaufanie przy zakupie, finansowaniu, ubezpieczeniu i obsłudze transgranicznej.",
        metadataStatus: "Status",
        metadataPassport: "Paszport rejestru",
        metadataValidation: "Ostatnia weryfikacja",
        actionViewPassport: "Zobacz paszport",
      },
      historyUnknown: {
        label: "Ograniczona historia",
        message:
          "To aktywo pojawia się w rejestrze, ale pełna historia własności nie została jeszcze w pełni zweryfikowana.",
        why:
          "Ograniczona historia zwiększa niepewność i powinna zostać sprawdzona przed transakcją lub wdrożeniem.",
        metadataStatus: "Status",
        metadataRisk: "Poziom ryzyka",
        actionViewPassport: "Zobacz ograniczony paszport",
        actionRegisterDocuments: "Zarejestruj dokumenty",
      },
      stolen: {
        label: "Skradzione aktywo - czerwony alarm",
        message:
          "To aktywo zostało oficjalnie zgłoszone jako skradzione i pozostaje aktywnie oznaczone w EquipRegistry.",
        warning:
          "Nie kupuj, nie ubezpieczaj, nie wynajmuj, nie przemieszczaj i nie przyjmuj transferu tego aktywa.",
        why:
          "Każda transakcja związana ze skradzionym aktywem może powodować ryzyko prawne, finansowe i zgodności.",
        metadataStatus: "Status",
        metadataRisk: "Poziom ryzyka",
        metadataReportedBy: "Zgłoszone przez",
        metadataJurisdiction: "Jurysdykcja",
        metadataReportDate: "Data zgłoszenia",
        actionReportSighting: "Zgłoś obserwację",
        actionContactAuthorities: "Skontaktuj się z władzami",
      },
      notRegistered: {
        label: "Niezarejestrowane",
        message: "Ten identyfikator nie jest zarejestrowany w EquipRegistry.",
        why:
          "Niezarejestrowane aktywo nie ma zweryfikowanego wpisu, ścieżki własności ani publicznego paszportu.",
        actionRegister: "Zarejestruj to aktywo",
      },
      metadataValues: {
        active: "Aktywne",
        full: "Pełny",
        lastValidation2025: "2025",
        limitedPassport: "Ograniczony paszport",
        medium: "Średni",
        blacklisted: "Na czarnej liście",
        high: "Wysoki",
        insurancePartner: "Partner ubezpieczeniowy",
        euCrossBorderAlert: "Alert UE / transgraniczny",
        reportDate: "2025-03-12",
      },
    },
  },
  sv: {
    hero: {
      title:
        "Kontrollera ägande och bedrägeririsk för fordon och utrustning världen över",
      subtitle:
        "Använd VIN, serienummer och register-ID för att kontrollera lagligt ursprung, stöldvarningar och registerstatus före köp, finansiering, försäkring, uthyrning eller överföring.",
      placeholder: "Ange VIN, serienummer eller register-ID",
      search: "Verifiera tillgång",
      demoSerials: "Demoserier:",
      loggedInMessage:
        "Du är inloggad. Du kan använda sökningen som vanligt och fortsätta öppna privata pass.",
      goToDashboard: "Gå till översikt",
      supportedAssetsTitle: "Tillgångsklasser som täcks av EquipRegistry",
      supportedAssetsItems: [
        "Vägfordon, släp och flottillgångar",
        "Bygg-, industri-, jordbruks- och uthyrningsutrustning",
        "Cyklar, batterier, energisystem och andra serialiserade tillgångar",
      ],
    },
    result: { whyThisMatters: "Varför detta är viktigt" },
    howItWorks: {
      title: "Så fungerar EquipRegistry",
      step1Title: "1. Sök",
      step1Text:
        "Ange VIN, serienummer eller register-ID för att direkt se aktuell status.",
      step2Title: "2. Verifiera",
      step2Text:
        "Granska registersignaler, ägandekontext och passynlighet när den finns tillgänglig.",
      step3Title: "3. Registrera",
      step3Text:
        "Registrera fordon, utrustning eller andra tillgångar och lägg till stödjande dokument.",
      step4Title: "4. Använd",
      step4Text:
        "Använd registerpasset i försäkring, uthyrning, återförsäljning, återhämtning och compliance-flöden.",
    },
    trust: {
      title: "Byggt för tillförlitlig tillgångsverifiering",
      subtitle:
        "EquipRegistry hjälper ägare, försäkringsgivare, finansiärer, uthyrningsoperatörer och köpare att verifiera lagligt ursprung och status genom ett enhetligt offentligt söklager.",
      card1Title: "Försäkringsklart",
      card1Text:
        "Stödjer underwriting, valideringskontroller och riskbaserade beslut.",
      card2Title: "Oberoende",
      card2Text:
        "Utformat som ett neutralt verifieringslager mellan operatörer, marknader och jurisdiktioner.",
      card3Title: "Skalbart",
      card3Text:
        "Fungerar för enskilda tillgångar och stora flottor med samma offentliga modell.",
    },
    statuses: {
      registeredVerified: {
        label: "Registrerad och verifierad",
        message:
          "Denna tillgång är registrerad i EquipRegistry och dess lagliga ursprung har verifierats.",
        why:
          "Detta ökar förtroendet vid köp, finansiering, försäkring och gränsöverskridande hantering.",
        metadataStatus: "Status",
        metadataPassport: "Registerpass",
        metadataValidation: "Senaste verifiering",
        actionViewPassport: "Visa pass",
      },
      historyUnknown: {
        label: "Begränsad historik",
        message:
          "Denna tillgång finns i registret, men den fullständiga ägarhistoriken är ännu inte helt verifierad.",
        why:
          "Begränsad historik ökar osäkerheten och bör granskas före transaktion eller onboarding.",
        metadataStatus: "Status",
        metadataRisk: "Risknivå",
        actionViewPassport: "Visa begränsat pass",
        actionRegisterDocuments: "Registrera dokument",
      },
      stolen: {
        label: "Stulen tillgång - röd varning",
        message:
          "Denna tillgång har officiellt rapporterats som stulen och är fortfarande aktivt markerad i EquipRegistry.",
        warning:
          "Köp, försäkra, hyr, flytta eller acceptera inte överföring av denna tillgång.",
        why:
          "Varje transaktion som involverar en stulen tillgång kan skapa juridisk, finansiell och compliance-relaterad risk.",
        metadataStatus: "Status",
        metadataRisk: "Risknivå",
        metadataReportedBy: "Rapporterad av",
        metadataJurisdiction: "Jurisdiktion",
        metadataReportDate: "Rapportdatum",
        actionReportSighting: "Rapportera observation",
        actionContactAuthorities: "Kontakta myndigheter",
      },
      notRegistered: {
        label: "Inte registrerad",
        message: "Denna identifierare är inte registrerad i EquipRegistry.",
        why:
          "En oregistrerad tillgång har inget verifierat registerspår, ägarhistorik eller offentligt pass.",
        actionRegister: "Registrera denna tillgång",
      },
      metadataValues: {
        active: "Aktiv",
        full: "Fullständig",
        lastValidation2025: "2025",
        limitedPassport: "Begränsat pass",
        medium: "Medel",
        blacklisted: "Svartlistad",
        high: "Hög",
        insurancePartner: "Försäkringspartner",
        euCrossBorderAlert: "EU / gränsöverskridande varning",
        reportDate: "2025-03-12",
      },
    },
  },
  da: {
    hero: {
      title:
        "Kontrollér ejerskab og svindelrisiko for køretøjer og udstyr verden over",
      subtitle:
        "Brug VIN, serienumre og register-ID’er til at kontrollere lovligt ophav, tyveriadvarsler og registerstatus før køb, finansiering, forsikring, udlejning eller overførsel.",
      placeholder: "Indtast VIN, serienummer eller register-ID",
      search: "Verificér aktiv",
      demoSerials: "Demo-serier:",
      loggedInMessage:
        "Du er logget ind. Du kan bruge søgningen som normalt og stadig åbne private pas.",
      goToDashboard: "Gå til dashboard",
      supportedAssetsTitle: "Aktivklasser dækket af EquipRegistry",
      supportedAssetsItems: [
        "Køretøjer, trailere og flådeaktiver",
        "Bygge-, industri-, landbrugs- og udlejningsudstyr",
        "Cykler, batterier, energisystemer og andre serialiserede aktiver",
      ],
    },
    result: { whyThisMatters: "Hvorfor det betyder noget" },
    howItWorks: {
      title: "Sådan fungerer EquipRegistry",
      step1Title: "1. Søg",
      step1Text:
        "Indtast VIN, serienummer eller register-ID for straks at se den aktuelle status.",
      step2Title: "2. Verificér",
      step2Text:
        "Gennemgå registersignaler, ejerskabskontekst og passynlighed, når den er tilgængelig.",
      step3Title: "3. Registrér",
      step3Text:
        "Registrér køretøjer, udstyr eller andre aktiver og tilføj understøttende dokumenter.",
      step4Title: "4. Brug",
      step4Text:
        "Brug registerpasset i forsikring, udlejning, videresalg, recovery og compliance-forløb.",
    },
    trust: {
      title: "Bygget til troværdig aktivverifikation",
      subtitle:
        "EquipRegistry hjælper ejere, forsikringsselskaber, finansieringspartnere, udlejningsoperatører og købere med at verificere lovligt ophav og status via et ensartet offentligt søgelag.",
      card1Title: "Klar til forsikring",
      card1Text:
        "Understøtter underwriting, valideringskontroller og risikobaserede beslutninger.",
      card2Title: "Uafhængig",
      card2Text:
        "Udformet som et neutralt verifikationslag på tværs af operatører, markeder og jurisdiktioner.",
      card3Title: "Skalerbar",
      card3Text:
        "Virker for enkelte aktiver og store flåder med den samme offentlige model.",
    },
    statuses: {
      registeredVerified: {
        label: "Registreret og verificeret",
        message:
          "Dette aktiv er registreret i EquipRegistry, og dets lovlige ophav er verificeret.",
        why:
          "Det øger tilliden ved køb, finansiering, forsikring og grænseoverskridende håndtering.",
        metadataStatus: "Status",
        metadataPassport: "Registerpas",
        metadataValidation: "Seneste verifikation",
        actionViewPassport: "Se pas",
      },
      historyUnknown: {
        label: "Begrænset historik",
        message:
          "Dette aktiv vises i registret, men den fulde ejerskabshistorik er endnu ikke fuldt verificeret.",
        why:
          "Begrænset historik øger usikkerheden og bør gennemgås før transaktion eller onboarding.",
        metadataStatus: "Status",
        metadataRisk: "Risikonivå",
        actionViewPassport: "Se begrænset pas",
        actionRegisterDocuments: "Registrér dokumenter",
      },
      stolen: {
        label: "Stjålet aktiv - rød advarsel",
        message:
          "Dette aktiv er officielt meldt stjålet og er fortsat aktivt markeret i EquipRegistry.",
        warning:
          "Køb, forsikr, udlej, flyt eller accepter ikke overførsel af dette aktiv.",
        why:
          "Enhver transaktion med et stjålet aktiv kan skabe juridisk, finansiel og compliance-relateret risiko.",
        metadataStatus: "Status",
        metadataRisk: "Risikonivå",
        metadataReportedBy: "Rapporteret af",
        metadataJurisdiction: "Jurisdiktion",
        metadataReportDate: "Rapportdato",
        actionReportSighting: "Rapportér observation",
        actionContactAuthorities: "Kontakt myndigheder",
      },
      notRegistered: {
        label: "Ikke registreret",
        message: "Denne identifikator er ikke registreret i EquipRegistry.",
        why:
          "Et uregistreret aktiv har ingen verificeret registreringspost, ejerskabsspor eller offentligt pas.",
        actionRegister: "Registrér dette aktiv",
      },
      metadataValues: {
        active: "Aktiv",
        full: "Fuld",
        lastValidation2025: "2025",
        limitedPassport: "Begrænset pas",
        medium: "Mellem",
        blacklisted: "Sortlistet",
        high: "Høj",
        insurancePartner: "Forsikringspartner",
        euCrossBorderAlert: "EU / grænseoverskridende advarsel",
        reportDate: "2025-03-12",
      },
    },
  },
  no: {
    hero: {
      title:
        "Kontroller eierskap og svindelrisiko for kjøretøy og utstyr over hele verden",
      subtitle:
        "Bruk VIN, serienumre og register-ID-er for å kontrollere lovlig opprinnelse, tyverivarsler og registerstatus før kjøp, finansiering, forsikring, utleie eller overføring.",
      placeholder: "Skriv inn VIN, serienummer eller register-ID",
      search: "Verifiser aktivum",
      demoSerials: "Demo-serier:",
      loggedInMessage:
        "Du er logget inn. Du kan bruke søket som normalt og fortsatt åpne private pass.",
      goToDashboard: "Gå til dashboard",
      supportedAssetsTitle: "Aktivaklasser dekket av EquipRegistry",
      supportedAssetsItems: [
        "Kjøretøy, tilhengere og flåteaktiva",
        "Bygge-, industri-, landbruks- og utleieutstyr",
        "Sykler, batterier, energisystemer og andre serialiserte aktiva",
      ],
    },
    result: { whyThisMatters: "Hvorfor dette er viktig" },
    howItWorks: {
      title: "Slik fungerer EquipRegistry",
      step1Title: "1. Søk",
      step1Text:
        "Skriv inn VIN, serienummer eller register-ID for å se gjeldende status med en gang.",
      step2Title: "2. Verifiser",
      step2Text:
        "Se gjennom registersignaler, eierskapskontekst og passynlighet når den er tilgjengelig.",
      step3Title: "3. Registrer",
      step3Text:
        "Registrer kjøretøy, utstyr eller andre aktiva og legg til støttedokumenter.",
      step4Title: "4. Bruk",
      step4Text:
        "Bruk registerpasset i forsikring, utleie, videresalg, recovery og compliance-arbeidsflyter.",
    },
    trust: {
      title: "Bygget for pålitelig aktivaverifisering",
      subtitle:
        "EquipRegistry hjelper eiere, forsikringsselskaper, finansieringspartnere, utleieoperatører og kjøpere med å verifisere lovlig opprinnelse og status gjennom et konsistent offentlig søkelag.",
      card1Title: "Klar for forsikring",
      card1Text:
        "Støtter underwriting, valideringskontroller og risikobaserte beslutninger.",
      card2Title: "Uavhengig",
      card2Text:
        "Utformet som et nøytralt verifikasjonslag på tvers av operatører, markeder og jurisdiksjoner.",
      card3Title: "Skalerbar",
      card3Text:
        "Fungerer for enkeltaktiva og store flåter med den samme offentlige modellen.",
    },
    statuses: {
      registeredVerified: {
        label: "Registrert og verifisert",
        message:
          "Dette aktivumet er registrert i EquipRegistry, og dets lovlige opprinnelse er verifisert.",
        why:
          "Dette øker tilliten ved kjøp, finansiering, forsikring og grensekryssende håndtering.",
        metadataStatus: "Status",
        metadataPassport: "Registerpass",
        metadataValidation: "Siste verifisering",
        actionViewPassport: "Se pass",
      },
      historyUnknown: {
        label: "Begrenset historikk",
        message:
          "Dette aktivumet vises i registeret, men den fullstendige eierskapshistorikken er ennå ikke fullt verifisert.",
        why:
          "Begrenset historikk øker usikkerheten og bør gjennomgås før transaksjon eller onboarding.",
        metadataStatus: "Status",
        metadataRisk: "Risikonivå",
        actionViewPassport: "Se begrenset pass",
        actionRegisterDocuments: "Registrer dokumenter",
      },
      stolen: {
        label: "Stjålet aktivum - rødt varsel",
        message:
          "Dette aktivumet er offisielt meldt stjålet og er fortsatt aktivt markert i EquipRegistry.",
        warning:
          "Ikke kjøp, forsikre, lei ut, flytt eller aksepter overføring av dette aktivumet.",
        why:
          "Enhver transaksjon som involverer et stjålet aktivum kan skape juridisk, finansiell og compliance-relatert risiko.",
        metadataStatus: "Status",
        metadataRisk: "Risikonivå",
        metadataReportedBy: "Rapportert av",
        metadataJurisdiction: "Jurisdiksjon",
        metadataReportDate: "Rapportdato",
        actionReportSighting: "Rapporter observasjon",
        actionContactAuthorities: "Kontakt myndigheter",
      },
      notRegistered: {
        label: "Ikke registrert",
        message: "Denne identifikatoren er ikke registrert i EquipRegistry.",
        why:
          "Et uregistrert aktivum har ingen verifisert registerpost, eierhistorikk eller offentlig pass.",
        actionRegister: "Registrer dette aktivumet",
      },
      metadataValues: {
        active: "Aktiv",
        full: "Full",
        lastValidation2025: "2025",
        limitedPassport: "Begrenset pass",
        medium: "Middels",
        blacklisted: "Svartelistet",
        high: "Høy",
        insurancePartner: "Forsikringspartner",
        euCrossBorderAlert: "EU / grensekryssende varsel",
        reportDate: "2025-03-12",
      },
    },
  },
  ru: {
    hero: {
      title:
        "Проверьте происхождение, статус и риски транспортных средств и оборудования по всему миру",
      subtitle:
        "Используйте VIN, серийные номера и идентификаторы реестра, чтобы проверять происхождение, текущий статус и сигналы риска до покупки, финансирования, страхования, аренды или передачи.",
      placeholder: "Введите VIN, серийный номер или ID реестра",
      search: "Проверить актив",
      demoSerials: "Демо-серии:",
      loggedInMessage:
        "Вы вошли в систему. Поиск работает как обычно, и вы по-прежнему можете открывать частные паспорта.",
      goToDashboard: "Перейти в кабинет",
      supportedAssetsTitle: "Категории активов в EquipRegistry",
      supportedAssetsItems: [
        "Дорожный транспорт, прицепы и активы автопарка",
        "Строительная, промышленная, сельскохозяйственная и арендная техника",
        "Велосипеды, батареи, энергетические системы и другие сериализованные активы",
      ],
    },
    result: { whyThisMatters: "Почему это важно" },
    howItWorks: {
      title: "Как работает EquipRegistry",
      step1Title: "1. Поиск",
      step1Text:
        "Введите VIN, серийный номер или ID реестра, чтобы сразу увидеть текущий статус.",
      step2Title: "2. Проверка",
      step2Text:
        "Просмотрите сигналы реестра, контекст собственности и видимость паспорта, если они доступны.",
      step3Title: "3. Регистрация",
      step3Text:
        "Регистрируйте транспорт, технику и другие активы и добавляйте подтверждающие документы.",
      step4Title: "4. Использование",
      step4Text:
        "Используйте паспорт реестра для страхования, аренды, перепродажи, возврата и соответствия требованиям.",
    },
    trust: {
      title: "Создано для надёжной проверки активов",
      subtitle:
        "EquipRegistry помогает владельцам, страховщикам, финансовым партнёрам, операторам аренды и покупателям проверять законное происхождение и статус через единый публичный слой поиска.",
      card1Title: "Готово для страхования",
      card1Text:
        "Поддерживает андеррайтинг, проверки валидации и риск-ориентированные решения.",
      card2Title: "Независимо",
      card2Text:
        "Спроектировано как нейтральный слой проверки между операторами, рынками и юрисдикциями.",
      card3Title: "Масштабируемо",
      card3Text:
        "Подходит как для одного актива, так и для крупных парков по одной и той же публичной модели.",
    },
    statuses: {
      registeredVerified: {
        label: "Зарегистрирован и подтверждён",
        message:
          "Этот актив зарегистрирован в EquipRegistry, а его законное происхождение подтверждено.",
        why:
          "Это повышает доверие при покупке, финансировании, страховании и трансграничной передаче.",
        metadataStatus: "Статус",
        metadataPassport: "Паспорт реестра",
        metadataValidation: "Последняя проверка",
        actionViewPassport: "Открыть паспорт",
      },
      historyUnknown: {
        label: "История ограничена",
        message:
          "Этот актив присутствует в реестре, но полная история собственности пока не подтверждена полностью.",
        why:
          "Ограниченная история повышает неопределённость и требует дополнительной проверки перед сделкой или подключением.",
        metadataStatus: "Статус",
        metadataRisk: "Уровень риска",
        actionViewPassport: "Открыть ограниченный паспорт",
        actionRegisterDocuments: "Зарегистрировать документы",
      },
      stolen: {
        label: "Украденный актив - красный флаг",
        message:
          "Этот актив официально заявлен как украденный и остаётся активно отмеченным в EquipRegistry.",
        warning:
          "Не покупайте, не страхуйте, не арендуйте, не перемещайте и не принимайте передачу этого актива.",
        why:
          "Любая операция с украденным активом может привести к юридическим, финансовым и комплаенс-рискам.",
        metadataStatus: "Статус",
        metadataRisk: "Уровень риска",
        metadataReportedBy: "Сообщил",
        metadataJurisdiction: "Юрисдикция",
        metadataReportDate: "Дата сообщения",
        actionReportSighting: "Сообщить о наблюдении",
        actionContactAuthorities: "Связаться с властями",
      },
      notRegistered: {
        label: "Не зарегистрирован",
        message: "Этот идентификатор не зарегистрирован в EquipRegistry.",
        why:
          "Незарегистрированный актив не имеет подтверждённой записи, истории собственности или публичного паспорта.",
        actionRegister: "Зарегистрировать этот актив",
      },
      metadataValues: {
        active: "Активный",
        full: "Полный",
        lastValidation2025: "2025",
        limitedPassport: "Ограниченный паспорт",
        medium: "Средний",
        blacklisted: "В чёрном списке",
        high: "Высокий",
        insurancePartner: "Страховой партнёр",
        euCrossBorderAlert: "Предупреждение ЕС / трансграничное",
        reportDate: "2025-03-12",
      },
    },
  },
  zh: {
    hero: {
      title: "在全球范围内核验车辆和设备的来源、状态与风险",
      subtitle:
        "使用 VIN、序列号和登记编号，在购买、融资、保险、租赁或转移前核验来源、当前状态和风险信号。",
      placeholder: "输入 VIN、序列号或登记编号",
      search: "核验资产",
      demoSerials: "演示编号：",
      loggedInMessage:
        "您已登录。您可以正常使用搜索，并继续访问私有护照。",
      goToDashboard: "前往控制台",
      supportedAssetsTitle: "EquipRegistry 覆盖的资产类别",
      supportedAssetsItems: [
        "道路车辆、拖车和车队资产",
        "建筑、工业、农业和租赁设备",
        "自行车、电池、能源系统和其他带序列号的资产",
      ],
    },
    result: { whyThisMatters: "这为什么重要" },
    howItWorks: {
      title: "EquipRegistry 的工作方式",
      step1Title: "1. 搜索",
      step1Text: "输入 VIN、序列号或登记编号，即可立即查看当前状态。",
      step2Title: "2. 核验",
      step2Text:
        "查看登记信号、所有权背景以及护照可见性（如有）。",
      step3Title: "3. 登记",
      step3Text: "登记车辆、设备或其他资产，并上传支持文件。",
      step4Title: "4. 使用",
      step4Text:
        "在保险、租赁、转售、追回和合规流程中使用登记护照。",
    },
    trust: {
      title: "为可信资产核验而设计",
      subtitle:
        "EquipRegistry 帮助所有者、保险机构、融资方、租赁运营方和买方通过统一的公开搜索层核验合法来源和状态。",
      card1Title: "适用于保险",
      card1Text: "支持核保、验证检查和基于风险的决策。",
      card2Title: "独立中立",
      card2Text: "作为跨运营方、市场和司法辖区的中立核验层而构建。",
      card3Title: "可扩展",
      card3Text: "既适用于单个资产，也适用于大型车队和设备池。",
    },
    statuses: {
      registeredVerified: {
        label: "已登记并已核验",
        message:
          "该资产已在 EquipRegistry 中登记，其合法来源已完成核验。",
        why:
          "这会提升购买、融资、保险和跨境流转中的信任度。",
        metadataStatus: "状态",
        metadataPassport: "登记护照",
        metadataValidation: "最近核验",
        actionViewPassport: "查看护照",
      },
      historyUnknown: {
        label: "历史记录有限",
        message:
          "该资产已出现在登记系统中，但完整的所有权历史尚未完全核验。",
        why:
          "有限历史会增加不确定性，交易或接收前应进一步核查。",
        metadataStatus: "状态",
        metadataRisk: "风险等级",
        actionViewPassport: "查看有限护照",
        actionRegisterDocuments: "登记文件",
      },
      stolen: {
        label: "失窃资产 - 红色警报",
        message:
          "该资产已被正式报告为失窃，并在 EquipRegistry 中保持主动标记。",
        warning:
          "请勿购买、投保、租赁、移动或接受该资产的转移。",
        why:
          "任何涉及失窃资产的交易都可能带来法律、财务和合规风险。",
        metadataStatus: "状态",
        metadataRisk: "风险等级",
        metadataReportedBy: "报告方",
        metadataJurisdiction: "司法辖区",
        metadataReportDate: "报告日期",
        actionReportSighting: "报告目击",
        actionContactAuthorities: "联系执法机构",
      },
      notRegistered: {
        label: "未登记",
        message: "该标识尚未在 EquipRegistry 中登记。",
        why:
          "未登记资产没有经过核验的登记记录、所有权轨迹或公开护照。",
        actionRegister: "登记该资产",
      },
      metadataValues: {
        active: "有效",
        full: "完整",
        lastValidation2025: "2025",
        limitedPassport: "有限护照",
        medium: "中等",
        blacklisted: "黑名单",
        high: "高",
        insurancePartner: "保险合作方",
        euCrossBorderAlert: "欧盟 / 跨境警报",
        reportDate: "2025-03-12",
      },
    },
  },
  hi: {
    hero: {
      title:
        "दुनियाभर में वाहनों और उपकरणों की उत्पत्ति, स्थिति और जोखिम सत्यापित करें",
      subtitle:
        "VIN, सीरियल नंबर और रजिस्ट्री आईडी का उपयोग करके खरीद, वित्तपोषण, बीमा, किराये या हस्तांतरण से पहले उत्पत्ति, वर्तमान स्थिति और जोखिम संकेतों की जांच करें।",
      placeholder: "VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें",
      search: "एसेट सत्यापित करें",
      demoSerials: "डेमो सीरियल:",
      loggedInMessage:
        "आप लॉग इन हैं। आप सामान्य रूप से खोज का उपयोग कर सकते हैं और निजी पासपोर्ट भी देख सकते हैं।",
      goToDashboard: "डैशबोर्ड पर जाएँ",
      supportedAssetsTitle: "EquipRegistry द्वारा समर्थित एसेट श्रेणियाँ",
      supportedAssetsItems: [
        "सड़क वाहन, ट्रेलर और फ्लीट एसेट",
        "निर्माण, औद्योगिक, कृषि और किराये के उपकरण",
        "साइकिल, बैटरी, ऊर्जा प्रणालियाँ और अन्य सीरियलयुक्त एसेट",
      ],
    },
    result: { whyThisMatters: "यह क्यों महत्वपूर्ण है" },
    howItWorks: {
      title: "EquipRegistry कैसे काम करता है",
      step1Title: "1. खोजें",
      step1Text:
        "वर्तमान स्थिति तुरंत देखने के लिए VIN, सीरियल नंबर या रजिस्ट्री आईडी दर्ज करें।",
      step2Title: "2. सत्यापित करें",
      step2Text:
        "उपलब्ध होने पर रजिस्ट्री संकेत, स्वामित्व संदर्भ और पासपोर्ट दृश्यता की समीक्षा करें।",
      step3Title: "3. पंजीकरण करें",
      step3Text:
        "वाहन, उपकरण या अन्य एसेट पंजीकृत करें और सहायक दस्तावेज़ जोड़ें।",
      step4Title: "4. उपयोग करें",
      step4Text:
        "बीमा, किराये, पुनर्विक्रय, रिकवरी और अनुपालन कार्यप्रवाह में रजिस्ट्री पासपोर्ट का उपयोग करें।",
    },
    trust: {
      title: "विश्वसनीय एसेट सत्यापन के लिए बनाया गया",
      subtitle:
        "EquipRegistry मालिकों, बीमाकर्ताओं, वित्तीय भागीदारों, किराया ऑपरेटरों और खरीदारों को एक समान सार्वजनिक खोज परत के माध्यम से कानूनी मूल और स्थिति सत्यापित करने में मदद करता है।",
      card1Title: "बीमा-तैयार",
      card1Text:
        "अंडरराइटिंग, वैलिडेशन जांच और जोखिम-आधारित निर्णयों का समर्थन करता है।",
      card2Title: "स्वतंत्र",
      card2Text:
        "ऑपरेटरों, बाजारों और सीमाओं के पार एक तटस्थ सत्यापन परत के रूप में बनाया गया है।",
      card3Title: "स्केलेबल",
      card3Text:
        "एकल एसेट से लेकर बड़े फ्लीट तक एक ही सार्वजनिक मॉडल के साथ काम करता है।",
    },
    statuses: {
      registeredVerified: {
        label: "पंजीकृत और सत्यापित",
        message:
          "यह एसेट EquipRegistry में पंजीकृत है और इसका कानूनी मूल सत्यापित किया जा चुका है।",
        why:
          "इससे खरीद, वित्तपोषण, बीमा और सीमा-पार संचालन में भरोसा बढ़ता है।",
        metadataStatus: "स्थिति",
        metadataPassport: "रजिस्ट्री पासपोर्ट",
        metadataValidation: "अंतिम सत्यापन",
        actionViewPassport: "पासपोर्ट देखें",
      },
      historyUnknown: {
        label: "सीमित इतिहास",
        message:
          "यह एसेट रजिस्ट्री में दिखाई देता है, लेकिन पूर्ण स्वामित्व इतिहास अभी पूरी तरह सत्यापित नहीं है।",
        why:
          "सीमित इतिहास अनिश्चितता बढ़ाता है और लेनदेन या ऑनबोर्डिंग से पहले इसकी समीक्षा की जानी चाहिए।",
        metadataStatus: "स्थिति",
        metadataRisk: "जोखिम स्तर",
        actionViewPassport: "सीमित पासपोर्ट देखें",
        actionRegisterDocuments: "दस्तावेज़ पंजीकृत करें",
      },
      stolen: {
        label: "चोरी किया गया एसेट - लाल चेतावनी",
        message:
          "इस एसेट को आधिकारिक रूप से चोरी के रूप में रिपोर्ट किया गया है और यह EquipRegistry में सक्रिय रूप से चिह्नित है।",
        warning:
          "इस एसेट को न खरीदें, न बीमा करें, न किराये पर लें, न स्थानांतरित करें और न ही इसका हस्तांतरण स्वीकार करें।",
        why:
          "चोरी हुए एसेट से जुड़ा कोई भी लेनदेन कानूनी, वित्तीय और अनुपालन जोखिम पैदा कर सकता है।",
        metadataStatus: "स्थिति",
        metadataRisk: "जोखिम स्तर",
        metadataReportedBy: "रिपोर्ट करने वाला",
        metadataJurisdiction: "अधिकार-क्षेत्र",
        metadataReportDate: "रिपोर्ट तिथि",
        actionReportSighting: "देखे जाने की रिपोर्ट करें",
        actionContactAuthorities: "अधिकारियों से संपर्क करें",
      },
      notRegistered: {
        label: "पंजीकृत नहीं",
        message: "यह पहचान EquipRegistry में पंजीकृत नहीं है।",
        why:
          "एक अपंजीकृत एसेट के पास सत्यापित रजिस्ट्री रिकॉर्ड, स्वामित्व ट्रेल या सार्वजनिक पासपोर्ट नहीं होता।",
        actionRegister: "इस एसेट को पंजीकृत करें",
      },
      metadataValues: {
        active: "सक्रिय",
        full: "पूर्ण",
        lastValidation2025: "2025",
        limitedPassport: "सीमित पासपोर्ट",
        medium: "मध्यम",
        blacklisted: "काली सूची में",
        high: "उच्च",
        insurancePartner: "बीमा भागीदार",
        euCrossBorderAlert: "ईयू / सीमा-पार अलर्ट",
        reportDate: "2025-03-12",
      },
    },
  },
  ar: {
    hero: {
      title:
        "تحقق من مصدر المركبات والمعدات وحالتها ومخاطرها حول العالم",
      subtitle:
        "استخدم VIN والأرقام التسلسلية ومعرّفات السجل للتحقق من المصدر والحالة الحالية وإشارات المخاطر قبل الشراء أو التمويل أو التأمين أو التأجير أو النقل.",
      placeholder: "أدخل VIN أو الرقم التسلسلي أو معرّف السجل",
      search: "تحقق من الأصل",
      demoSerials: "أرقام تجريبية:",
      loggedInMessage:
        "أنت مسجل الدخول. يمكنك استخدام البحث بشكل طبيعي والاستمرار في الوصول إلى الجوازات الخاصة.",
      goToDashboard: "الانتقال إلى لوحة التحكم",
      supportedAssetsTitle: "فئات الأصول التي يغطيها EquipRegistry",
      supportedAssetsItems: [
        "المركبات البرية والمقطورات وأصول الأساطيل",
        "معدات البناء والصناعة والزراعة والتأجير",
        "الدراجات والبطاريات وأنظمة الطاقة وغيرها من الأصول ذات الأرقام التسلسلية",
      ],
    },
    result: { whyThisMatters: "لماذا هذا مهم" },
    howItWorks: {
      title: "كيف يعمل EquipRegistry",
      step1Title: "1. ابحث",
      step1Text:
        "أدخل VIN أو الرقم التسلسلي أو معرّف السجل لرؤية الحالة الحالية فوراً.",
      step2Title: "2. تحقق",
      step2Text:
        "راجع إشارات السجل وسياق الملكية وظهور الجواز عندما يكون متاحاً.",
      step3Title: "3. سجّل",
      step3Text:
        "سجّل المركبات أو المعدات أو الأصول الأخرى وأضف المستندات الداعمة.",
      step4Title: "4. استخدم",
      step4Text:
        "استخدم جواز السجل في التأمين والتأجير وإعادة البيع والاسترداد والامتثال.",
    },
    trust: {
      title: "مصمم للتحقق الموثوق من الأصول",
      subtitle:
        "يساعد EquipRegistry المالكين وشركات التأمين والجهات الممولة ومشغلي التأجير والمشترين على التحقق من المصدر القانوني والحالة عبر طبقة بحث عامة متسقة.",
      card1Title: "جاهز للتأمين",
      card1Text:
        "يدعم الاكتتاب وفحوصات التحقق والقرارات القائمة على المخاطر.",
      card2Title: "مستقل",
      card2Text:
        "تم تصميمه كطبقة تحقق محايدة عبر المشغلين والأسواق والحدود.",
      card3Title: "قابل للتوسع",
      card3Text:
        "يعمل للأصل الواحد وللأساطيل الكبيرة بنفس نموذج البحث العام.",
    },
    statuses: {
      registeredVerified: {
        label: "مسجل ومتحقق منه",
        message:
          "هذا الأصل مسجل في EquipRegistry وتم التحقق من مصدره القانوني.",
        why:
          "هذا يعزز الثقة عند الشراء والتمويل والتأمين والتعامل عبر الحدود.",
        metadataStatus: "الحالة",
        metadataPassport: "جواز السجل",
        metadataValidation: "آخر تحقق",
        actionViewPassport: "عرض الجواز",
      },
      historyUnknown: {
        label: "سجل محدود",
        message:
          "يظهر هذا الأصل في السجل، لكن سجل الملكية الكامل لم يتم التحقق منه بالكامل بعد.",
        why:
          "السجل المحدود يزيد من عدم اليقين ويجب مراجعته قبل أي معاملة أو اعتماد.",
        metadataStatus: "الحالة",
        metadataRisk: "مستوى المخاطر",
        actionViewPassport: "عرض الجواز المحدود",
        actionRegisterDocuments: "تسجيل المستندات",
      },
      stolen: {
        label: "أصل مسروق - تحذير أحمر",
        message:
          "تم الإبلاغ رسمياً عن هذا الأصل على أنه مسروق ولا يزال مميزاً بشكل نشط داخل EquipRegistry.",
        warning:
          "لا تشترِ هذا الأصل ولا تؤمّنه ولا تؤجره ولا تنقله ولا تقبل نقله.",
        why:
          "أي معاملة تتعلق بأصل مسروق قد تؤدي إلى مخاطر قانونية ومالية ومخاطر امتثال.",
        metadataStatus: "الحالة",
        metadataRisk: "مستوى المخاطر",
        metadataReportedBy: "تم الإبلاغ بواسطة",
        metadataJurisdiction: "الاختصاص القضائي",
        metadataReportDate: "تاريخ البلاغ",
        actionReportSighting: "الإبلاغ عن مشاهدة",
        actionContactAuthorities: "الاتصال بالسلطات",
      },
      notRegistered: {
        label: "غير مسجل",
        message: "هذا المعرّف غير مسجل في EquipRegistry.",
        why:
          "الأصل غير المسجل لا يملك سجلاً موثقاً ولا مسار ملكية ولا جوازاً عاماً.",
        actionRegister: "تسجيل هذا الأصل",
      },
      metadataValues: {
        active: "نشط",
        full: "كامل",
        lastValidation2025: "2025",
        limitedPassport: "جواز محدود",
        medium: "متوسط",
        blacklisted: "مدرج في القائمة السوداء",
        high: "مرتفع",
        insurancePartner: "شريك تأمين",
        euCrossBorderAlert: "تنبيه أوروبي / عابر للحدود",
        reportDate: "2025-03-12",
      },
    },
  },
};
