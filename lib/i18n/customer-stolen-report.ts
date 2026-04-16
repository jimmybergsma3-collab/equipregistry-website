import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

export type CustomerStolenReportText = {
  title: string;
  description: string;
  reportAction: string;
  submit: string;
  processing: string;
  confirmMessage: string;
  pendingBadge: string;
  pendingDescription: string;
  activeBadge: string;
  activeDescription: string;
  fields: {
    policeReportNumber: string;
    incidentDate: string;
    incidentCountry: string;
    incidentCountryPlaceholder: string;
    incidentDescription: string;
    incidentDescriptionPlaceholder: string;
    supportingDocuments: string;
    supportingDocumentsDescription: string;
  };
  validation: {
    descriptionRequired: string;
    uploadsRequired: string;
  };
  messages: {
    success: string;
    alreadyPending: string;
    alreadyActive: string;
    notEligible: string;
    requestMissing: string;
    authRequired: string;
  };
};

const TEXT: Record<Lang, CustomerStolenReportText> = {
  en: {
    title: "Report stolen or missing",
    description:
      "Submit an owner incident report with supporting evidence. EquipRegistry will keep the passport public state unchanged until admin review is completed.",
    reportAction: "Report stolen / missing",
    submit: "Submit owner report",
    processing: "Submitting...",
    confirmMessage:
      "Are you sure you want to submit this stolen or missing report for admin review?",
    pendingBadge: "Owner report pending review",
    pendingDescription:
      "Your report has been submitted with evidence and is waiting for admin review. The public passport stays unchanged until EquipRegistry confirms the warning.",
    activeBadge: "Public red flag active",
    activeDescription:
      "EquipRegistry has confirmed this case and activated the public stolen warning on the passport.",
    fields: {
      policeReportNumber: "Police report number",
      incidentDate: "Incident date",
      incidentCountry: "Incident country",
      incidentCountryPlaceholder: "e.g. Spain",
      incidentDescription: "Incident description",
      incidentDescriptionPlaceholder:
        "Describe what happened, where it happened, and any safe references that help admin review the case.",
      supportingDocuments: "Supporting documents / evidence",
      supportingDocumentsDescription:
        "Upload at least one relevant document, image, or other evidence file for the review.",
    },
    validation: {
      descriptionRequired: "Incident description is required.",
      uploadsRequired:
        "At least one supporting document or evidence file is required.",
    },
    messages: {
      success:
        "Your report was submitted for admin review. The public passport warning is still inactive.",
      alreadyPending:
        "This asset already has an owner report waiting for admin review.",
      alreadyActive:
        "This asset already has an active public stolen warning.",
      notEligible:
        "Only passport-issued assets can be reported as stolen or missing from the dashboard.",
      requestMissing: "Registration not found.",
      authRequired: "Please sign in again to continue.",
    },
  },
  es: {
    title: "Reportar robo o desaparicion",
    description:
      "Envie un reporte del propietario con pruebas. EquipRegistry mantendra el pasaporte publico sin cambios hasta completar la revision administrativa.",
    reportAction: "Reportar robo / desaparicion",
    submit: "Enviar reporte del propietario",
    processing: "Enviando...",
    confirmMessage:
      "Confirma que desea enviar este reporte de robo o desaparicion para revision administrativa?",
    pendingBadge: "Reporte del propietario pendiente de revision",
    pendingDescription:
      "Su reporte se envio con pruebas y esta esperando revision administrativa. El pasaporte publico no cambia hasta la confirmacion de EquipRegistry.",
    activeBadge: "Bandera roja publica activa",
    activeDescription:
      "EquipRegistry confirmo este caso y activo la advertencia publica de robo en el pasaporte.",
    fields: {
      policeReportNumber: "Numero de denuncia policial",
      incidentDate: "Fecha del incidente",
      incidentCountry: "Pais del incidente",
      incidentCountryPlaceholder: "p. ej. Espana",
      incidentDescription: "Descripcion del incidente",
      incidentDescriptionPlaceholder:
        "Describa lo sucedido, el lugar y referencias seguras que ayuden a la revision.",
      supportingDocuments: "Documentos / pruebas de apoyo",
      supportingDocumentsDescription:
        "Suba al menos un documento, imagen u otra prueba relevante para la revision.",
    },
    validation: {
      descriptionRequired: "La descripcion del incidente es obligatoria.",
      uploadsRequired:
        "Se requiere al menos un documento de apoyo o archivo de prueba.",
    },
    messages: {
      success:
        "Su reporte se envio para revision administrativa. La advertencia publica sigue inactiva.",
      alreadyPending:
        "Este activo ya tiene un reporte del propietario pendiente de revision.",
      alreadyActive:
        "Este activo ya tiene una advertencia publica de robo activa.",
      notEligible:
        "Solo los activos con pasaporte emitido pueden reportarse como robados o desaparecidos desde el panel.",
      requestMissing: "Registro no encontrado.",
      authRequired: "Inicie sesion de nuevo para continuar.",
    },
  },
  de: {
    title: "Diebstahl oder Verlust melden",
    description:
      "Senden Sie einen Eigentuemerbericht mit Nachweisen. EquipRegistry laesst den oeffentlichen Pass unveraendert, bis die Admin-Pruefung abgeschlossen ist.",
    reportAction: "Diebstahl / Verlust melden",
    submit: "Eigentuemerbericht absenden",
    processing: "Wird gesendet...",
    confirmMessage:
      "Moechten Sie diesen Diebstahl- oder Vermisstbericht wirklich zur Admin-Pruefung absenden?",
    pendingBadge: "Eigentuemerbericht wartet auf Pruefung",
    pendingDescription:
      "Ihr Bericht wurde mit Nachweisen eingereicht und wartet auf Admin-Pruefung. Der oeffentliche Pass bleibt unveraendert, bis EquipRegistry warnt.",
    activeBadge: "Oeffentliche rote Warnung aktiv",
    activeDescription:
      "EquipRegistry hat den Fall bestaetigt und die oeffentliche Diebstahlwarnung im Pass aktiviert.",
    fields: {
      policeReportNumber: "Polizeiberichtsnummer",
      incidentDate: "Vorfallsdatum",
      incidentCountry: "Land des Vorfalls",
      incidentCountryPlaceholder: "z. B. Spanien",
      incidentDescription: "Vorfallsbeschreibung",
      incidentDescriptionPlaceholder:
        "Beschreiben Sie den Vorfall, den Ort und sichere Hinweise fuer die Admin-Pruefung.",
      supportingDocuments: "Unterlagen / Nachweise",
      supportingDocumentsDescription:
        "Laden Sie mindestens ein relevantes Dokument, Bild oder anderes Nachweisfile hoch.",
    },
    validation: {
      descriptionRequired: "Eine Vorfallsbeschreibung ist erforderlich.",
      uploadsRequired:
        "Mindestens ein unterstuetzendes Dokument oder Nachweisfile ist erforderlich.",
    },
    messages: {
      success:
        "Ihr Bericht wurde zur Admin-Pruefung eingereicht. Die oeffentliche Warnung bleibt inaktiv.",
      alreadyPending:
        "Fuer dieses Asset liegt bereits ein Eigentuemerbericht zur Pruefung vor.",
      alreadyActive:
        "Fuer dieses Asset ist bereits eine oeffentliche Diebstahlwarnung aktiv.",
      notEligible:
        "Nur Assets mit ausgestelltem Pass koennen im Dashboard als gestohlen oder vermisst gemeldet werden.",
      requestMissing: "Registrierung nicht gefunden.",
      authRequired: "Bitte melden Sie sich erneut an, um fortzufahren.",
    },
  },
  fr: {
    title: "Signaler un vol ou une disparition",
    description:
      "Envoyez un signalement proprietaire avec justificatifs. EquipRegistry laisse le passeport public inchange jusqu'a la fin de la revue admin.",
    reportAction: "Signaler vol / disparition",
    submit: "Envoyer le signalement proprietaire",
    processing: "Envoi...",
    confirmMessage:
      "Confirmez-vous l'envoi de ce signalement de vol ou de disparition pour revue admin?",
    pendingBadge: "Signalement proprietaire en attente",
    pendingDescription:
      "Votre signalement avec preuves a ete envoye et attend la revue admin. Le passeport public ne change pas avant confirmation d'EquipRegistry.",
    activeBadge: "Alerte rouge publique active",
    activeDescription:
      "EquipRegistry a confirme ce dossier et active l'alerte publique de vol sur le passeport.",
    fields: {
      policeReportNumber: "Numero de rapport de police",
      incidentDate: "Date de l'incident",
      incidentCountry: "Pays de l'incident",
      incidentCountryPlaceholder: "ex. Espagne",
      incidentDescription: "Description de l'incident",
      incidentDescriptionPlaceholder:
        "Decrivez ce qui s'est passe, le lieu et les references utiles pour la revue admin.",
      supportingDocuments: "Documents / preuves justificatives",
      supportingDocumentsDescription:
        "Televersez au moins un document, une image ou une autre preuve pertinente.",
    },
    validation: {
      descriptionRequired: "La description de l'incident est obligatoire.",
      uploadsRequired:
        "Au moins un justificatif ou fichier de preuve est requis.",
    },
    messages: {
      success:
        "Votre signalement a ete envoye pour revue admin. L'alerte publique reste inactive.",
      alreadyPending:
        "Cet actif a deja un signalement proprietaire en attente de revue.",
      alreadyActive:
        "Cet actif a deja une alerte publique de vol active.",
      notEligible:
        "Seuls les actifs avec passeport emis peuvent etre signales comme voles ou disparus depuis le tableau de bord.",
      requestMissing: "Enregistrement introuvable.",
      authRequired: "Veuillez vous reconnecter pour continuer.",
    },
  },
  it: {
    title: "Segnala furto o smarrimento",
    description:
      "Invii un report del proprietario con prove. EquipRegistry mantiene invariato il passaporto pubblico fino al completamento della revisione admin.",
    reportAction: "Segnala furto / smarrimento",
    submit: "Invia report del proprietario",
    processing: "Invio...",
    confirmMessage:
      "Conferma l'invio di questo report di furto o smarrimento per revisione admin?",
    pendingBadge: "Report del proprietario in attesa",
    pendingDescription:
      "Il report con prove e stato inviato ed e in attesa di revisione admin. Il passaporto pubblico non cambia finche EquipRegistry non conferma.",
    activeBadge: "Bandiera rossa pubblica attiva",
    activeDescription:
      "EquipRegistry ha confermato il caso e attivato l'avviso pubblico di furto sul passaporto.",
    fields: {
      policeReportNumber: "Numero del rapporto di polizia",
      incidentDate: "Data dell'incidente",
      incidentCountry: "Paese dell'incidente",
      incidentCountryPlaceholder: "es. Spagna",
      incidentDescription: "Descrizione dell'incidente",
      incidentDescriptionPlaceholder:
        "Descriva l'accaduto, il luogo e riferimenti utili per la revisione admin.",
      supportingDocuments: "Documenti / prove di supporto",
      supportingDocumentsDescription:
        "Carichi almeno un documento, un'immagine o un'altra prova rilevante.",
    },
    validation: {
      descriptionRequired: "La descrizione dell'incidente e obbligatoria.",
      uploadsRequired:
        "E richiesto almeno un documento di supporto o file di prova.",
    },
    messages: {
      success:
        "Il report e stato inviato per revisione admin. L'avviso pubblico resta inattivo.",
      alreadyPending:
        "Questo asset ha gia un report del proprietario in attesa di revisione.",
      alreadyActive:
        "Questo asset ha gia un avviso pubblico di furto attivo.",
      notEligible:
        "Solo gli asset con passaporto emesso possono essere segnalati come rubati o smarriti dal dashboard.",
      requestMissing: "Registrazione non trovata.",
      authRequired: "Acceda di nuovo per continuare.",
    },
  },
  nl: {
    title: "Diefstal of vermissing melden",
    description:
      "Dien een melding van de eigenaar in met bewijsbestanden. EquipRegistry laat het publieke paspoort ongewijzigd totdat de admin-beoordeling is afgerond.",
    reportAction: "Diefstal / vermissing melden",
    submit: "Melding indienen",
    processing: "Indienen...",
    confirmMessage:
      "Weet je zeker dat je deze diefstal- of vermissingsmelding voor admin-beoordeling wilt indienen?",
    pendingBadge: "Melding wacht op beoordeling",
    pendingDescription:
      "Je melding met bewijs is ingediend en wacht op admin-beoordeling. Het publieke paspoort verandert niet totdat EquipRegistry de waarschuwing bevestigt.",
    activeBadge: "Publieke rode waarschuwing actief",
    activeDescription:
      "EquipRegistry heeft deze zaak bevestigd en de publieke diefstalwaarschuwing op het paspoort geactiveerd.",
    fields: {
      policeReportNumber: "Politierapportnummer",
      incidentDate: "Datum van incident",
      incidentCountry: "Land van incident",
      incidentCountryPlaceholder: "bijv. Spanje",
      incidentDescription: "Beschrijving van incident",
      incidentDescriptionPlaceholder:
        "Beschrijf wat er is gebeurd, waar het gebeurde en veilige referenties voor de admin-beoordeling.",
      supportingDocuments: "Ondersteunende documenten / bewijs",
      supportingDocumentsDescription:
        "Upload minimaal een relevant document, afbeelding of ander bewijsbestand.",
    },
    validation: {
      descriptionRequired: "Een beschrijving van het incident is verplicht.",
      uploadsRequired:
        "Minimaal een ondersteunend document of bewijsbestand is verplicht.",
    },
    messages: {
      success:
        "Je melding is ingestuurd voor admin-beoordeling. De publieke waarschuwing blijft inactief.",
      alreadyPending:
        "Voor deze asset staat al een melding van de eigenaar klaar voor beoordeling.",
      alreadyActive:
        "Voor deze asset is al een publieke diefstalwaarschuwing actief.",
      notEligible:
        "Alleen assets met een uitgegeven paspoort kunnen vanuit het dashboard als gestolen of vermist worden gemeld.",
      requestMissing: "Registratie niet gevonden.",
      authRequired: "Log opnieuw in om verder te gaan.",
    },
  },
  pt: {
    title: "Reportar roubo ou desaparecimento",
    description:
      "Envie um reporte do proprietario com provas. A EquipRegistry mantem o passaporte publico inalterado ate terminar a revisao admin.",
    reportAction: "Reportar roubo / desaparecimento",
    submit: "Enviar reporte do proprietario",
    processing: "A enviar...",
    confirmMessage:
      "Confirma o envio deste reporte de roubo ou desaparecimento para revisao admin?",
    pendingBadge: "Reporte do proprietario pendente",
    pendingDescription:
      "O seu reporte com provas foi enviado e aguarda revisao admin. O passaporte publico nao muda ate a confirmacao da EquipRegistry.",
    activeBadge: "Bandeira vermelha publica ativa",
    activeDescription:
      "A EquipRegistry confirmou o caso e ativou o aviso publico de roubo no passaporte.",
    fields: {
      policeReportNumber: "Numero do relatorio policial",
      incidentDate: "Data do incidente",
      incidentCountry: "Pais do incidente",
      incidentCountryPlaceholder: "ex. Espanha",
      incidentDescription: "Descricao do incidente",
      incidentDescriptionPlaceholder:
        "Descreva o que aconteceu, onde aconteceu e referencias seguras para a revisao admin.",
      supportingDocuments: "Documentos / provas de apoio",
      supportingDocumentsDescription:
        "Carregue pelo menos um documento, imagem ou outra prova relevante.",
    },
    validation: {
      descriptionRequired: "A descricao do incidente e obrigatoria.",
      uploadsRequired:
        "E necessario pelo menos um documento de apoio ou ficheiro de prova.",
    },
    messages: {
      success:
        "O seu reporte foi enviado para revisao admin. O aviso publico continua inativo.",
      alreadyPending:
        "Este ativo ja tem um reporte do proprietario pendente de revisao.",
      alreadyActive:
        "Este ativo ja tem um aviso publico de roubo ativo.",
      notEligible:
        "Apenas ativos com passaporte emitido podem ser reportados como roubados ou desaparecidos a partir do painel.",
      requestMissing: "Registo nao encontrado.",
      authRequired: "Inicie sessao novamente para continuar.",
    },
  },
  ru: {
    title: "Soobshit o krazhe ili propazhe",
    description:
      "Otpravte otchet vlasdeltsa s dokazatelstvami. EquipRegistry ne menyaet publichnyy pasport do zaversheniya proverki adminom.",
    reportAction: "Soobshit o krazhe / propazhe",
    submit: "Otpravit otchet vlasdeltsa",
    processing: "Otpravka...",
    confirmMessage:
      "Vy podtverzhdaete otpravku etogo soobshcheniya o krazhe ili propazhe na proverku adminu?",
    pendingBadge: "Otchet vlasdeltsa ozhidaet proverki",
    pendingDescription:
      "Vash otchet s dokazatelstvami otpravlen i ozhidaet proverki admina. Publichnyy pasport ne menyayetsya do podtverzhdeniya EquipRegistry.",
    activeBadge: "Publichnyy krasnyy flag aktivan",
    activeDescription:
      "EquipRegistry podtverdil etot sluchay i aktiviroval publichnoe preduprezhdenie o krazhe na pasporte.",
    fields: {
      policeReportNumber: "Nomer politseyskogo otcheta",
      incidentDate: "Data intsidenta",
      incidentCountry: "Strana intsidenta",
      incidentCountryPlaceholder: "naprimer, Ispaniya",
      incidentDescription: "Opisanie intsidenta",
      incidentDescriptionPlaceholder:
        "Opishite chto proizooshlo, gde eto proizooshlo i bezopasnye ssylki dlya proverki adminom.",
      supportingDocuments: "Podtverzhdayushchie dokumenty / dokazatelstva",
      supportingDocumentsDescription:
        "Zagruzite khotya by odin relevantnyy dokument, izobrazhenie ili inoye dokazatelstvo.",
    },
    validation: {
      descriptionRequired: "Opisanie intsidenta obyazatelno.",
      uploadsRequired:
        "Trebuetsya khotya by odin podtverzhdayushchiy dokument ili fayl dokazatelstva.",
    },
    messages: {
      success:
        "Vash otchet otpravlen na proverku adminu. Publichnoe preduprezhdenie ostayetsya neaktivnym.",
      alreadyPending:
        "Po etomu aktivu uzhe est otchet vlasdeltsa, ozhidayushchiy proverki.",
      alreadyActive:
        "Po etomu aktivu uzhe est aktivnoe publichnoe preduprezhdenie o krazhe.",
      notEligible:
        "Tolko aktivy s vydannym pasportom mozhno otmechat kak ukradennye ili propavshie iz lichnogo kabineta.",
      requestMissing: "Registratsiya ne naydena.",
      authRequired: "Pozhaluysta, voydite snova, chtoby prodolzhit.",
    },
  },
  zh: {
    title: "Baogao bei dao huo shizong",
    description:
      "Tijiao suoyouren baogao he zhengju. EquipRegistry hui zai admin shenhe wancheng qian baochi gongkai huzhao zhuangtai bu bian.",
    reportAction: "Baogao beidao / shizong",
    submit: "Tijiao suoyouren baogao",
    processing: "Tijiao zhong...",
    confirmMessage:
      "Nin queding yao jiang zhe ge beidao huo shizong baogao tijiao gei admin shenhe ma?",
    pendingBadge: "Suoyouren baogao dai shenhe",
    pendingDescription:
      "Nin de baogao he zhengju yi tijiao, zheng zai dengdai admin shenhe. Gongkai huzhao zai EquipRegistry queren qian bu hui gaibian.",
    activeBadge: "Gongkai hongse jinggao yi qiyong",
    activeDescription:
      "EquipRegistry yi queren ci anjian, bing zai huzhao shang qiyong gongkai bei dao jinggao.",
    fields: {
      policeReportNumber: "Jingfang baogao bianhao",
      incidentDate: "Shijian riqi",
      incidentCountry: "Shijian guojia",
      incidentCountryPlaceholder: "li ru Xibanya",
      incidentDescription: "Shijian shuoming",
      incidentDescriptionPlaceholder:
        "Shuoming fashengle shenme, zai nali fasheng, yi ji youzhu yu admin shenhe de anquan cankao.",
      supportingDocuments: "Zhichi wenjian / zhengju",
      supportingDocumentsDescription:
        "Qing zhishao shangchuan yi ge xiangguan wenjian, tupian huo qita zhengju wenjian.",
    },
    validation: {
      descriptionRequired: "Bixu tianxie shijian shuoming.",
      uploadsRequired: "Zhishao xuyao yi ge zhichi wenjian huo zhengju wenjian.",
    },
    messages: {
      success:
        "Nin de baogao yi tijiao gei admin shenhe. Gongkai jinggao reng wei qiyong.",
      alreadyPending:
        "Ci zichan yi jing you yi ge suoyouren baogao zhengzai dengdai shenhe.",
      alreadyActive:
        "Ci zichan yi jing you qiyong de gongkai bei dao jinggao.",
      notEligible:
        "Zhiyou yi qianfa huzhao de zichan cai neng cong yonghu yibiaoban baogao wei beidao huo shizong.",
      requestMissing: "Weizhaodao zhuce jiliao.",
      authRequired: "Qing chongxin denglu hou jixu.",
    },
  },
  hi: {
    title: "Chori ya lapata hone ki report",
    description:
      "Malik ki report aur saboot jama karen. Admin review poora hone tak EquipRegistry sarvajanik passport ko bina badle rakhega.",
    reportAction: "Chori / lapata report karen",
    submit: "Malik ki report jama karen",
    processing: "Jama kiya ja raha hai...",
    confirmMessage:
      "Kya aap nishchit hain ki aap is chori ya lapata report ko admin review ke liye jama karna chahte hain?",
    pendingBadge: "Malik ki report review mein hai",
    pendingDescription:
      "Aapki report saboot ke saath bhej di gayi hai aur admin review ka intezar kar rahi hai. EquipRegistry ke pushti karne tak sarvajanik passport nahin badlega.",
    activeBadge: "Sarvajanik red flag sakriya",
    activeDescription:
      "EquipRegistry ne is case ki pushti kar di hai aur passport par sarvajanik chori chetavni sakriya kar di hai.",
    fields: {
      policeReportNumber: "Police report sankhya",
      incidentDate: "Ghatna ki tarikh",
      incidentCountry: "Ghatna ka desh",
      incidentCountryPlaceholder: "jaise Spain",
      incidentDescription: "Ghatna ka varnan",
      incidentDescriptionPlaceholder:
        "Batayen kya hua, kahan hua aur admin review ke liye surakshit sandarbh dein.",
      supportingDocuments: "Sahayak dastavez / saboot",
      supportingDocumentsDescription:
        "Kam se kam ek sambandhit dastavez, tasvir ya anya saboot file upload karen.",
    },
    validation: {
      descriptionRequired: "Ghatna ka varnan avashyak hai.",
      uploadsRequired:
        "Kam se kam ek sahayak dastavez ya saboot file avashyak hai.",
    },
    messages: {
      success:
        "Aapki report admin review ke liye bhej di gayi hai. Sarvajanik chetavni abhi nishkriya hai.",
      alreadyPending:
        "Is asset ke liye malik ki report pahle se review ke liye lambit hai.",
      alreadyActive:
        "Is asset ke liye sarvajanik chori chetavni pahle se sakriya hai.",
      notEligible:
        "Sirf passport-jari assets ko dashboard se chori ya lapata ke roop mein report kiya ja sakta hai.",
      requestMissing: "Registration nahin mili.",
      authRequired: "Kripya jari rakhne ke liye dobara sign in karen.",
    },
  },
  ar: {
    title: "Iblagh an sariqa aw mafqud",
    description:
      "Qaddim taqrir almalik mae aladila. Satubqi EquipRegistry aljawaz al'aam bila taghyir hatta yaktamilat almurajaea alidaria.",
    reportAction: "Iblagh sariqa / mafqud",
    submit: "Taqdim taqrir almalik",
    processing: "Jari altaqdim...",
    confirmMessage:
      "Hal anta mutaakkid min taqdim hadha altaqrir lil-murajaea alidaria?",
    pendingBadge: "Taqrir almalik biantezar almurajaea",
    pendingDescription:
      "Tam taqdim taqriruk mae aladila wa huwa biantezar almurajaea alidaria. Sayabqa aljawaz al'aam bidun taghyir hatta taqrir EquipRegistry.",
    activeBadge: "Alraaya alhamra alamma nashita",
    activeDescription:
      "Akkadat EquipRegistry hadhihi alqadiya wa faalat tahdhir alsariqa al'aam ala aljawaz.",
    fields: {
      policeReportNumber: "Raqm taqrir alshurta",
      incidentDate: "Tarikh alhadith",
      incidentCountry: "Dawlat alhadith",
      incidentCountryPlaceholder: "mithal: Isbaniya",
      incidentDescription: "Wasf alhadith",
      incidentDescriptionPlaceholder:
        "Wasif ma hadatha, ayna hadatha, wa marajie amina tusaeid almurajaea alidaria.",
      supportingDocuments: "Mustanadat / adilla daima",
      supportingDocumentsDescription:
        "Arfiq malafan wahidan ala alaqal min mustanad aw sura aw dalil murtabit.",
    },
    validation: {
      descriptionRequired: "Wasf alhadith matlub.",
      uploadsRequired:
        "Yalzamu malaf mustanad aw dalil wahid ala alaqal.",
    },
    messages: {
      success:
        "Tam taqdim altaqrir lilmurajaea alidaria. Altahdhir al'aam la yazal ghayr mufaal.",
      alreadyPending:
        "Yujad taqrir malik muntazir lil-murajaea lihatha al-asl.",
      alreadyActive:
        "Yujad tahdhir sariqa aam nashit lihatha al-asl.",
      notEligible:
        "Faqat al-usul allati sudiira laha jawaz yumkin al-iblagh anha kamasruqa aw mafquda min dashboard al-amil.",
      requestMissing: "Lam yutam aleuthur ala altasjil.",
      authRequired: "Yurja aldukhul marra ukhraa lilmutabaea.",
    },
  },
};

export function getCustomerStolenReportText(
  lang: Lang | string
): CustomerStolenReportText {
  const safeLang = isValidLang(lang) ? (lang as Lang) : DEFAULT_LANG;
  return TEXT[safeLang];
}
