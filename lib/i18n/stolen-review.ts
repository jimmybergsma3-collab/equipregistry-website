import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

export type StolenReviewText = {
  pendingReview: string;
  activateTitle: string;
  activateDescription: string;
  activate: string;
  activating: string;
  evidenceFiles: string;
  policeReportFiles: string;
  noEvidenceFiles: string;
  noPoliceReportFiles: string;
  messages: {
    pendingSaved: string;
    activated: string;
    notPending: string;
    missingEvidence: string;
    caseMissing: string;
  };
};

const TEXT: Record<Lang, StolenReviewText> = {
  en: {
    pendingReview: "Pending admin review",
    activateTitle: "Activate public warning",
    activateDescription:
      "Review the owner report and attached evidence before turning this into a public red-flag passport warning.",
    activate: "Activate public red flag",
    activating: "Activating...",
    evidenceFiles: "Owner evidence files",
    policeReportFiles: "Police report files",
    noEvidenceFiles: "No owner evidence files uploaded yet.",
    noPoliceReportFiles: "No police report files uploaded yet.",
    messages: {
      pendingSaved: "Stolen case saved for review. The public warning is still inactive.",
      activated: "Public stolen warning activated for this passport.",
      notPending:
        "Only reports pending review can be activated as a public stolen warning.",
      missingEvidence:
        "At least one supporting document or evidence file is required before activation.",
      caseMissing: "No owner report was found for this registration.",
    },
  },
  es: {
    pendingReview: "Pendiente de revision administrativa",
    activateTitle: "Activar advertencia publica",
    activateDescription:
      "Revise el reporte del propietario y las pruebas adjuntas antes de convertirlo en una advertencia publica de bandera roja.",
    activate: "Activar bandera roja publica",
    activating: "Activando...",
    evidenceFiles: "Archivos de evidencia del propietario",
    policeReportFiles: "Archivos de denuncia policial",
    noEvidenceFiles: "Todavia no se han subido pruebas del propietario.",
    noPoliceReportFiles: "Todavia no se han subido archivos policiales.",
    messages: {
      pendingSaved:
        "El caso se guardo para revision. La advertencia publica sigue inactiva.",
      activated:
        "La advertencia publica de robo se activo para este pasaporte.",
      notPending:
        "Solo los reportes pendientes de revision pueden activarse como advertencia publica de robo.",
      missingEvidence:
        "Se requiere al menos un documento de apoyo o archivo de evidencia antes de la activacion.",
      caseMissing: "No se encontro un reporte del propietario para este registro.",
    },
  },
  de: {
    pendingReview: "Ausstehende Admin-Pruefung",
    activateTitle: "Oeffentliche Warnung aktivieren",
    activateDescription:
      "Pruefen Sie den Eigentuemerbericht und die Nachweise, bevor Sie daraus eine oeffentliche rote Warnung machen.",
    activate: "Oeffentliche rote Warnung aktivieren",
    activating: "Aktivierung...",
    evidenceFiles: "Nachweisdateien des Eigentuemers",
    policeReportFiles: "Polizeiberichtsdateien",
    noEvidenceFiles: "Es wurden noch keine Nachweisdateien hochgeladen.",
    noPoliceReportFiles: "Es wurden noch keine Polizeiberichtsdateien hochgeladen.",
    messages: {
      pendingSaved:
        "Der Diebstahlfall wurde zur Pruefung gespeichert. Die oeffentliche Warnung bleibt inaktiv.",
      activated:
        "Die oeffentliche Diebstahlwarnung wurde fuer diesen Pass aktiviert.",
      notPending:
        "Nur Faelle mit ausstehender Pruefung koennen als oeffentliche Diebstahlwarnung aktiviert werden.",
      missingEvidence:
        "Vor der Aktivierung ist mindestens ein Nachweis- oder Belegfile erforderlich.",
      caseMissing:
        "Fuer diese Registrierung wurde kein Eigentuemerbericht gefunden.",
    },
  },
  fr: {
    pendingReview: "En attente de revue admin",
    activateTitle: "Activer l'alerte publique",
    activateDescription:
      "Examinez le signalement du proprietaire et les preuves jointes avant d'activer une alerte publique rouge sur le passeport.",
    activate: "Activer le drapeau rouge public",
    activating: "Activation...",
    evidenceFiles: "Fichiers de preuve du proprietaire",
    policeReportFiles: "Fichiers de rapport de police",
    noEvidenceFiles: "Aucune preuve proprietaire n'a encore ete televersee.",
    noPoliceReportFiles: "Aucun fichier de police n'a encore ete televerse.",
    messages: {
      pendingSaved:
        "Le dossier a ete enregistre pour revue. L'alerte publique reste inactive.",
      activated:
        "L'alerte publique de vol a ete activee pour ce passeport.",
      notPending:
        "Seuls les signalements en attente de revue peuvent etre actives comme alerte publique.",
      missingEvidence:
        "Au moins un justificatif ou fichier de preuve est requis avant l'activation.",
      caseMissing:
        "Aucun signalement proprietaire n'a ete trouve pour cet enregistrement.",
    },
  },
  it: {
    pendingReview: "In attesa di revisione admin",
    activateTitle: "Attiva avviso pubblico",
    activateDescription:
      "Esamini il report del proprietario e le prove allegate prima di attivare l'avviso pubblico rosso sul passaporto.",
    activate: "Attiva bandiera rossa pubblica",
    activating: "Attivazione...",
    evidenceFiles: "File di prova del proprietario",
    policeReportFiles: "File del rapporto di polizia",
    noEvidenceFiles: "Nessun file di prova del proprietario caricato.",
    noPoliceReportFiles: "Nessun file di rapporto di polizia caricato.",
    messages: {
      pendingSaved:
        "Il caso e stato salvato per la revisione. L'avviso pubblico resta inattivo.",
      activated:
        "L'avviso pubblico di furto e stato attivato per questo passaporto.",
      notPending:
        "Solo i report in attesa di revisione possono essere attivati come avviso pubblico di furto.",
      missingEvidence:
        "Prima dell'attivazione e richiesto almeno un documento di supporto o file di prova.",
      caseMissing:
        "Nessun report del proprietario trovato per questa registrazione.",
    },
  },
  nl: {
    pendingReview: "In afwachting van admin-beoordeling",
    activateTitle: "Publieke waarschuwing activeren",
    activateDescription:
      "Beoordeel eerst de melding van de eigenaar en de bijlagen voordat dit een publieke rode waarschuwing op het paspoort wordt.",
    activate: "Publieke rode waarschuwing activeren",
    activating: "Activeren...",
    evidenceFiles: "Bewijsbestanden van eigenaar",
    policeReportFiles: "Bestanden van politierapport",
    noEvidenceFiles: "Er zijn nog geen bewijsbestanden geupload.",
    noPoliceReportFiles: "Er zijn nog geen politiebestanden geupload.",
    messages: {
      pendingSaved:
        "De zaak is opgeslagen voor beoordeling. De publieke waarschuwing blijft inactief.",
      activated:
        "De publieke diefstalwaarschuwing is voor dit paspoort geactiveerd.",
      notPending:
        "Alleen meldingen in afwachting van beoordeling kunnen als publieke diefstalwaarschuwing worden geactiveerd.",
      missingEvidence:
        "Voor activatie is minimaal een ondersteunend document of bewijsbestand vereist.",
      caseMissing:
        "Er is geen melding van de eigenaar gevonden voor deze registratie.",
    },
  },
  pt: {
    pendingReview: "Pendente de revisao admin",
    activateTitle: "Ativar aviso publico",
    activateDescription:
      "Reveja o reporte do proprietario e as provas anexas antes de transformar isto num aviso publico vermelho.",
    activate: "Ativar bandeira vermelha publica",
    activating: "A ativar...",
    evidenceFiles: "Ficheiros de prova do proprietario",
    policeReportFiles: "Ficheiros do relatorio policial",
    noEvidenceFiles: "Ainda nao foram carregadas provas do proprietario.",
    noPoliceReportFiles: "Ainda nao foram carregados ficheiros policiais.",
    messages: {
      pendingSaved:
        "O caso foi guardado para revisao. O aviso publico continua inativo.",
      activated:
        "O aviso publico de roubo foi ativado para este passaporte.",
      notPending:
        "Apenas relatos pendentes de revisao podem ser ativados como aviso publico de roubo.",
      missingEvidence:
        "E necessario pelo menos um documento de apoio ou ficheiro de prova antes da ativacao.",
      caseMissing:
        "Nao foi encontrado um reporte do proprietario para este registo.",
    },
  },
  ru: {
    pendingReview: "Ozhidaet proverki adminom",
    activateTitle: "Vklyuchit publichnoe preduprezhdenie",
    activateDescription:
      "Proverte otchet vlasdeltsa i prilozhennye dokazatelstva, prezhde chem vklyuchat publichnyy krasnyy flag.",
    activate: "Vklyuchit publichnyy krasnyy flag",
    activating: "Aktivatsiya...",
    evidenceFiles: "Fayly dokazatelstv vlasdeltsa",
    policeReportFiles: "Fayly politseyskogo otcheta",
    noEvidenceFiles: "Dokazatelstva vlasdeltsa eshche ne zagruzheny.",
    noPoliceReportFiles: "Fayly politseyskogo otcheta eshche ne zagruzheny.",
    messages: {
      pendingSaved:
        "Delo sokhraneno dlya proverki. Publichnoe preduprezhdenie vse eshche neaktivno.",
      activated:
        "Publichnoe preduprezhdenie o krazhe aktivirovano dlya etogo pasporta.",
      notPending:
        "Tolko zayavki, ozhidayushchie proverki, mozhno aktivirovat kak publichnoe preduprezhdenie o krazhe.",
      missingEvidence:
        "Pered aktivatsiey nuzhen khotya by odin podtverzhdayushchiy dokument ili fayl dokazatelstva.",
      caseMissing:
        "Dlya etoy registratsii ne naiden otchet vlasdeltsa.",
    },
  },
  zh: {
    pendingReview: "Dai admin shenhe",
    activateTitle: "Qiyong gongkai jinggao",
    activateDescription:
      "Zai jiang ci baogao biancheng gongkai hongse jinggao qian, qing xian shencha suoyouren de baogao he fujian zhengju.",
    activate: "Qiyong gongkai hongse jinggao",
    activating: "Qiyong zhong...",
    evidenceFiles: "Suoyouren zhengju wenjian",
    policeReportFiles: "Jingfang baogao wenjian",
    noEvidenceFiles: "Shangwei shangchuan suoyouren zhengju wenjian.",
    noPoliceReportFiles: "Shangwei shangchuan jingfang baogao wenjian.",
    messages: {
      pendingSaved:
        "Anjian yi baocun dengdai shenhe. Gongkai jinggao reng wei qiyong.",
      activated:
        "Ci huzhao de gongkai bei dao jinggao yi qiyong.",
      notPending:
        "Zhi you dai shenhe de baogao cai neng qiyong wei gongkai bei dao jinggao.",
      missingEvidence:
        "Qiyong qian xu yao zhishao yi ge zhichi wenjian huo zhengju wenjian.",
      caseMissing:
        "Wei zhe ge zhuce zhaodao suoyouren baogao.",
    },
  },
  hi: {
    pendingReview: "Admin samiksha lambit",
    activateTitle: "Sarvajanik chetavni sakriya karen",
    activateDescription:
      "Isse sarvajanik red-flag banane se pehle malik ki report aur sabooton ki samiksha karen.",
    activate: "Sarvajanik red flag sakriya karen",
    activating: "Sakriya kiya ja raha hai...",
    evidenceFiles: "Malik ke saboot files",
    policeReportFiles: "Police report files",
    noEvidenceFiles: "Abhi tak malik ke saboot files upload nahin hue.",
    noPoliceReportFiles: "Abhi tak police report files upload nahin hue.",
    messages: {
      pendingSaved:
        "Mamla samiksha ke liye save ho gaya hai. Sarvajanik chetavni abhi nishkriya hai.",
      activated:
        "Is passport ke liye sarvajanik chori chetavni sakriya kar di gayi hai.",
      notPending:
        "Sirf samiksha ke liye lambit reports ko sarvajanik chori chetavni ke roop mein sakriya kiya ja sakta hai.",
      missingEvidence:
        "Sakriyata se pehle kam se kam ek supporting document ya saboot file zaruri hai.",
      caseMissing:
        "Is registration ke liye malik ki report nahin mili.",
    },
  },
  ar: {
    pendingReview: "Biantezar murajaeat al-idara",
    activateTitle: "Tafeil tahdhir aam",
    activateDescription:
      "Murajie taqrir almalik waladila almurfaqa qabl tahwilihi ila tahdhir aam ahmar ala aljawaz.",
    activate: "Tafeil alraaya alhamra alamma",
    activating: "Jari altafeil...",
    evidenceFiles: "Malafat adillat almalik",
    policeReportFiles: "Malafat taqrir alshurta",
    noEvidenceFiles: "Lam yutam raf adillat lilmalik baed.",
    noPoliceReportFiles: "Lam yutam raf malafat alshurta baed.",
    messages: {
      pendingSaved:
        "Tam hifz alqadiya lilmurajaea. Altahdir al'aam la yazal ghayr mufaal.",
      activated:
        "Tam tafeil tahdhir alsariqa al'aam lihatha aljawaz.",
      notPending:
        "Faqat altabligat almuallaqa bialmurajaea yumkin tafeiluha katahdir sariqa aam.",
      missingEvidence:
        "Yalzamu wujud mustanad daem aw malaf dalil wahid ala alaqal qabl altafeil.",
      caseMissing:
        "Lam yutam aleuthur ala taqrir almalik lihatha altasjil.",
    },
  },

  pl: {
    pendingReview: "Oczekuje na weryfikacje administratora",
    activateTitle: "Aktywuj publiczne ostrzezenie",
    activateDescription:
      "Sprawdz zgloszenie wlasciciela i zalaczone dowody, zanim zamienisz je w publiczne ostrzezenie typu red flag w paszporcie.",
    activate: "Aktywuj publiczna czerwona flage",
    activating: "Aktywowanie...",
    evidenceFiles: "Pliki dowodowe wlasciciela",
    policeReportFiles: "Pliki zgloszenia policyjnego",
    noEvidenceFiles: "Nie przeslano jeszcze plikow dowodowych wlasciciela.",
    noPoliceReportFiles: "Nie przeslano jeszcze plikow zgloszenia policyjnego.",
    messages: {
      pendingSaved: "Sprawa kradziezy zostala zapisana do weryfikacji. Publiczne ostrzezenie jest nadal nieaktywne.",
      activated: "Publiczne ostrzezenie o kradziezy zostalo aktywowane dla tego paszportu.",
      notPending:
        "Tylko zgloszenia oczekujace na weryfikacje mozna aktywowac jako publiczne ostrzezenie o kradziezy.",
      missingEvidence:
        "Przed aktywacja wymagany jest co najmniej jeden dokument potwierdzajacy lub plik dowodowy.",
      caseMissing: "Nie znaleziono zgloszenia wlasciciela dla tej rejestracji.",
    },
  },
  sv: {
    pendingReview: "Admin-granskning vantar",
    activateTitle: "Aktivera publik varning",
    activateDescription:
      "Granska agarrapporten och bifogade bevis innan detta forvandlas till en publik red-flag-varning i passet.",
    activate: "Aktivera publik rod flagga",
    activating: "Aktiverar...",
    evidenceFiles: "Agarens bevisfiler",
    policeReportFiles: "Polisrapportfiler",
    noEvidenceFiles: "Inga bevisfiler fran agaren har laddats upp an.",
    noPoliceReportFiles: "Inga polisrapportfiler har laddats upp an.",
    messages: {
      pendingSaved: "Stoldarendet sparades for granskning. Den publika varningen ar fortfarande inaktiv.",
      activated: "Publik stoldvarning aktiverad for detta pass.",
      notPending:
        "Endast rapporter som vantar pa granskning kan aktiveras som publik stoldvarning.",
      missingEvidence:
        "Minst ett stodjande dokument eller en bevisfil kravs fore aktivering.",
      caseMissing: "Ingen agarrapport hittades for denna registrering.",
    },
  },
  da: {
    pendingReview: "Admin-gennemgang afventer",
    activateTitle: "Aktiver offentlig advarsel",
    activateDescription:
      "Gennemga ejerrapporten og vedhaeftede beviser, for dette omdannes til en offentlig red-flag-advarsel i passet.",
    activate: "Aktiver offentlig rod markering",
    activating: "Aktiverer...",
    evidenceFiles: "Ejerens bevisfiler",
    policeReportFiles: "Politirapportfiler",
    noEvidenceFiles: "Der er endnu ikke uploadet bevisfiler fra ejeren.",
    noPoliceReportFiles: "Der er endnu ikke uploadet politirapportfiler.",
    messages: {
      pendingSaved: "Sagen om stjalet asset blev gemt til gennemgang. Den offentlige advarsel er stadig inaktiv.",
      activated: "Offentlig stjalet-advarsel aktiveret for dette pas.",
      notPending:
        "Kun rapporter, der afventer gennemgang, kan aktiveres som offentlig stjalet-advarsel.",
      missingEvidence:
        "Mindst et stottedokument eller en bevisfil er paakraevet for aktivering.",
      caseMissing: "Der blev ikke fundet nogen ejerrapport for denne registrering.",
    },
  },
  no: {
    pendingReview: "Admin-gjennomgang venter",
    activateTitle: "Aktiver offentlig advarsel",
    activateDescription:
      "Ga gjennom eierrapporten og vedlagte bevis for dette blir en offentlig red-flag-advarsel i passet.",
    activate: "Aktiver offentlig rod markering",
    activating: "Aktiverer...",
    evidenceFiles: "Eierens bevisfiler",
    policeReportFiles: "Politirapportfiler",
    noEvidenceFiles: "Ingen bevisfiler fra eieren er lastet opp enn.",
    noPoliceReportFiles: "Ingen politirapportfiler er lastet opp enn.",
    messages: {
      pendingSaved: "Tyverisaken ble lagret for gjennomgang. Den offentlige advarselen er fortsatt inaktiv.",
      activated: "Offentlig stjalet-advarsel aktivert for dette passet.",
      notPending:
        "Bare rapporter som venter pa gjennomgang kan aktiveres som offentlig stjalet-advarsel.",
      missingEvidence:
        "Minst ett stottedokument eller en bevisfil er paakrevd for aktivering.",
      caseMissing: "Det ble ikke funnet noen eierrapport for denne registreringen.",
    },
  },
};

export function getStolenReviewText(lang: string | Lang): StolenReviewText {
  const safeLang = isValidLang(lang) ? (lang as Lang) : DEFAULT_LANG;
  return TEXT[safeLang];
}
