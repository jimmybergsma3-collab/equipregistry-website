import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

export type CustomerStolenReportText = {
  title: string;
  description: string;
  action: string;
  processing: string;
  confirmMessage: string;
  success: string;
  alreadyReported: string;
  notEligible: string;
  requestMissing: string;
  authRequired: string;
  activeBadge: string;
  activeDescription: string;
  defaultIncidentDescription: string;
};

const TEXT: Record<Lang, CustomerStolenReportText> = {
  en: {
    title: "Report stolen or missing",
    description:
      "If this asset has been stolen or is missing, activate a public warning on the passport so third parties see the serious status immediately.",
    action: "Report stolen / missing",
    processing: "Reporting...",
    confirmMessage:
      "Are you sure you want to mark this asset as stolen or missing? This will activate a public warning on the passport.",
    success:
      "The asset was flagged as stolen or missing. The public warning is now active.",
    alreadyReported: "This asset is already flagged as stolen or missing.",
    notEligible:
      "Only passport-issued assets can be reported as stolen or missing from the dashboard.",
    requestMissing: "Registration not found.",
    authRequired: "Please sign in again to continue.",
    activeBadge: "Stolen / missing reported",
    activeDescription:
      "A public warning is active on this passport. If the asset is recovered, contact EquipRegistry or the relevant authorities.",
    defaultIncidentDescription:
      "The registered owner reported this asset as stolen or missing from the customer dashboard.",
  },
  es: {
    title: "Reportar robo o desaparicion",
    description:
      "Si este activo ha sido robado o se encuentra desaparecido, active una advertencia publica en el pasaporte para que terceros vean de inmediato el estado grave.",
    action: "Reportar robo / desaparicion",
    processing: "Reportando...",
    confirmMessage:
      "Confirma que desea marcar este activo como robado o desaparecido? Esto activara una advertencia publica en el pasaporte.",
    success:
      "El activo ha sido marcado como robado o desaparecido. La advertencia publica ya esta activa.",
    alreadyReported: "Este activo ya esta marcado como robado o desaparecido.",
    notEligible:
      "Solo los activos con pasaporte emitido pueden reportarse como robados o desaparecidos desde el panel.",
    requestMissing: "Registro no encontrado.",
    authRequired: "Inicie sesion de nuevo para continuar.",
    activeBadge: "Robo / desaparicion reportado",
    activeDescription:
      "Hay una advertencia publica activa en este pasaporte. Si el activo se recupera, contacte con EquipRegistry o con las autoridades competentes.",
    defaultIncidentDescription:
      "El propietario registrado reporto este activo como robado o desaparecido desde el panel del cliente.",
  },
  de: {
    title: "Diebstahl oder Verlust melden",
    description:
      "Wenn dieses Asset gestohlen wurde oder fehlt, aktivieren Sie eine oeffentliche Warnung im Pass, damit Dritte den ernsten Status sofort sehen.",
    action: "Diebstahl / Verlust melden",
    processing: "Wird gemeldet...",
    confirmMessage:
      "Moechten Sie dieses Asset wirklich als gestohlen oder vermisst markieren? Dadurch wird eine oeffentliche Warnung im Pass aktiviert.",
    success:
      "Das Asset wurde als gestohlen oder vermisst markiert. Die oeffentliche Warnung ist jetzt aktiv.",
    alreadyReported:
      "Dieses Asset ist bereits als gestohlen oder vermisst markiert.",
    notEligible:
      "Nur Assets mit ausgestelltem Pass koennen im Dashboard als gestohlen oder vermisst gemeldet werden.",
    requestMissing: "Registrierung nicht gefunden.",
    authRequired: "Bitte melden Sie sich erneut an, um fortzufahren.",
    activeBadge: "Diebstahl / Verlust gemeldet",
    activeDescription:
      "Fuer diesen Pass ist eine oeffentliche Warnung aktiv. Wenn das Asset wiedergefunden wird, kontaktieren Sie EquipRegistry oder die zustaendigen Behoerden.",
    defaultIncidentDescription:
      "Der registrierte Eigentuemer hat dieses Asset im Kundendashboard als gestohlen oder vermisst gemeldet.",
  },
  fr: {
    title: "Signaler un vol ou une disparition",
    description:
      "Si cet actif a ete vole ou est porte disparu, activez une alerte publique sur le passeport afin que les tiers voient immediatement la gravite de la situation.",
    action: "Signaler vol / disparition",
    processing: "Signalement...",
    confirmMessage:
      "Confirmez-vous que vous souhaitez marquer cet actif comme vole ou disparu? Cela activera une alerte publique sur le passeport.",
    success:
      "L'actif a ete signale comme vole ou disparu. L'alerte publique est maintenant activee.",
    alreadyReported: "Cet actif est deja signale comme vole ou disparu.",
    notEligible:
      "Seuls les actifs avec passeport emis peuvent etre signales comme voles ou disparus depuis le tableau de bord.",
    requestMissing: "Enregistrement introuvable.",
    authRequired: "Veuillez vous reconnecter pour continuer.",
    activeBadge: "Vol / disparition signale",
    activeDescription:
      "Une alerte publique est active sur ce passeport. Si l'actif est recupere, contactez EquipRegistry ou les autorites competentes.",
    defaultIncidentDescription:
      "Le proprietaire enregistre a signale cet actif comme vole ou disparu depuis le tableau de bord client.",
  },
  it: {
    title: "Segnala furto o smarrimento",
    description:
      "Se questo asset e stato rubato o risulta smarrito, attivi un avviso pubblico sul passaporto affinche i terzi vedano subito la gravita dello stato.",
    action: "Segnala furto / smarrimento",
    processing: "Segnalazione in corso...",
    confirmMessage:
      "Conferma di voler contrassegnare questo asset come rubato o smarrito? Questo attivera un avviso pubblico sul passaporto.",
    success:
      "L'asset e stato contrassegnato come rubato o smarrito. L'avviso pubblico e ora attivo.",
    alreadyReported:
      "Questo asset e gia contrassegnato come rubato o smarrito.",
    notEligible:
      "Solo gli asset con passaporto emesso possono essere segnalati come rubati o smarriti dal dashboard.",
    requestMissing: "Registrazione non trovata.",
    authRequired: "Acceda di nuovo per continuare.",
    activeBadge: "Furto / smarrimento segnalato",
    activeDescription:
      "Su questo passaporto e attivo un avviso pubblico. Se l'asset viene recuperato, contatti EquipRegistry o le autorita competenti.",
    defaultIncidentDescription:
      "Il proprietario registrato ha segnalato questo asset come rubato o smarrito dal dashboard cliente.",
  },
  nl: {
    title: "Diefstal of vermissing melden",
    description:
      "Als deze asset is gestolen of vermist raakt, activeer dan een publieke waarschuwing op het paspoort zodat derden de ernstige status direct zien.",
    action: "Diefstal / vermissing melden",
    processing: "Melding verzenden...",
    confirmMessage:
      "Weet je zeker dat je deze asset als gestolen of vermist wilt markeren? Dit activeert een publieke waarschuwing op het paspoort.",
    success:
      "De asset is gemarkeerd als gestolen of vermist. De publieke waarschuwing is nu actief.",
    alreadyReported: "Deze asset is al gemarkeerd als gestolen of vermist.",
    notEligible:
      "Alleen assets met een uitgegeven paspoort kunnen vanuit het dashboard als gestolen of vermist worden gemeld.",
    requestMissing: "Registratie niet gevonden.",
    authRequired: "Log opnieuw in om verder te gaan.",
    activeBadge: "Diefstal / vermissing gemeld",
    activeDescription:
      "Er staat een publieke waarschuwing op dit paspoort. Neem contact op met EquipRegistry of de bevoegde autoriteiten als de asset wordt teruggevonden.",
    defaultIncidentDescription:
      "De geregistreerde eigenaar heeft deze asset vanuit het klantdashboard als gestolen of vermist gemeld.",
  },
  pt: {
    title: "Reportar roubo ou desaparecimento",
    description:
      "Se este ativo foi roubado ou esta desaparecido, ative um aviso publico no passaporte para que terceiros vejam imediatamente a gravidade do estado.",
    action: "Reportar roubo / desaparecimento",
    processing: "A reportar...",
    confirmMessage:
      "Confirma que pretende marcar este ativo como roubado ou desaparecido? Isto ativara um aviso publico no passaporte.",
    success:
      "O ativo foi marcado como roubado ou desaparecido. O aviso publico esta agora ativo.",
    alreadyReported: "Este ativo ja esta marcado como roubado ou desaparecido.",
    notEligible:
      "Apenas ativos com passaporte emitido podem ser reportados como roubados ou desaparecidos a partir do painel.",
    requestMissing: "Registo nao encontrado.",
    authRequired: "Inicie sessao novamente para continuar.",
    activeBadge: "Roubo / desaparecimento reportado",
    activeDescription:
      "Existe um aviso publico ativo neste passaporte. Se o ativo for recuperado, contacte a EquipRegistry ou as autoridades competentes.",
    defaultIncidentDescription:
      "O proprietario registado reportou este ativo como roubado ou desaparecido a partir do painel do cliente.",
  },
  ru: {
    title: "Soobshit o krazhe ili propazhe",
    description:
      "Esli etot aktiv ukraden ili propal, vklyuchite publichnoe preduprezhdenie v pasporte, chtoby treti storony srazu videli seryoznyy status.",
    action: "Soobshit o krazhe / propazhe",
    processing: "Otpravka...",
    confirmMessage:
      "Vy deystvitelno khotite otmetit etot aktiv kak ukradennyy ili propavshiy? Eto vklyuchit publichnoe preduprezhdenie v pasporte.",
    success:
      "Aktiv otmechen kak ukradennyy ili propavshiy. Publichnoe preduprezhdenie teper aktivno.",
    alreadyReported:
      "Etot aktiv uzhe otmechen kak ukradennyy ili propavshiy.",
    notEligible:
      "Tolko aktivy s vydannym pasportom mozhno otmetit kak ukradennye ili propavshie iz lichnogo kabineta.",
    requestMissing: "Registratsiya ne naydena.",
    authRequired: "Pozhaluysta, voydite snova, chtoby prodolzhit.",
    activeBadge: "Krazha / propazha zayavlena",
    activeDescription:
      "Na etom pasporte aktivno publichnoe preduprezhdenie. Esli aktiv nayden, svyazhites s EquipRegistry ili s kompetentnymi organami.",
    defaultIncidentDescription:
      "Zaregistrirovannyy vladelets soobshchil ob etom aktive kak o ukradennom ili propavshem iz klientskogo kabineta.",
  },
  zh: {
    title: "Baogao bei dao huo shizong",
    description:
      "Ruguo ci zichan yi bei dao huo shizong, qing qiyong huzhao shang de gongkai jinggao, rang disanfang liji kandao yanzhong zhuangtai.",
    action: "Baogao beidao / shizong",
    processing: "Baogao zhong...",
    confirmMessage:
      "Nin queding yao jiang ci zichan biaoji wei beidao huo shizong ma? Zhe jiang zai huzhao shang qiyong gongkai jinggao.",
    success:
      "Gai zichan yi bei biaoji wei beidao huo shizong. Gongkai jinggao xianzai yi qiyong.",
    alreadyReported:
      "Gai zichan yi jing bei biaoji wei beidao huo shizong.",
    notEligible:
      "Zhiyou yi qianfa huzhao de zichan cai neng cong yonghu yibiaoban baogao wei beidao huo shizong.",
    requestMissing: "Weizhaodao zhuce jiliao.",
    authRequired: "Qing chongxin denglu hou jixu.",
    activeBadge: "Beidao / shizong yi baogao",
    activeDescription:
      "Ci huzhao shang de gongkai jinggao yi jing qiyong. Ruguo zichan bei zhaohui, qing lianxi EquipRegistry huo xiangguan jiguan.",
    defaultIncidentDescription:
      "Zhuce suoyouren yi cong kehu yibiaoban baogao gai zichan wei beidao huo shizong.",
  },
  hi: {
    title: "Chori ya lapata hone ki report",
    description:
      "Yadi yah asset chori ho gaya hai ya lapata hai, to passport par sarvajanik chetavni sakriya karen taki teesre paksh turant gambhir sthiti dekh saken.",
    action: "Chori / lapata report karen",
    processing: "Report bheji ja rahi hai...",
    confirmMessage:
      "Kya aap nishchit hain ki is asset ko chori ya lapata ke roop mein chinhnit karna chahte hain? Isse passport par sarvajanik chetavni sakriya ho jayegi.",
    success:
      "Asset ko chori ya lapata ke roop mein chinhnit kar diya gaya hai. Sarvajanik chetavni ab sakriya hai.",
    alreadyReported:
      "Yah asset pahle se hi chori ya lapata ke roop mein chinhnit hai.",
    notEligible:
      "Sirf passport-jari assets ko dashboard se chori ya lapata ke roop mein report kiya ja sakta hai.",
    requestMissing: "Registration nahin mili.",
    authRequired: "Kripya jari rakhne ke liye dobara sign in karen.",
    activeBadge: "Chori / lapata report ki gayi",
    activeDescription:
      "Is passport par sarvajanik chetavni sakriya hai. Yadi asset mil jata hai, to EquipRegistry ya sambandhit adhikariyon se sampark karen.",
    defaultIncidentDescription:
      "Panjikrit malik ne is asset ko customer dashboard se chori ya lapata bataya.",
  },
  ar: {
    title: "Iblagh an sariqa aw mafqud",
    description:
      "Idha kana hatha al-asl qad suriqa aw faqada, faqqim bitafil tahdhir aamm fi aljawaz hatta yara alghayr alhala alkhatira fawran.",
    action: "Iblagh sariqa / mafqud",
    processing: "Jari al-iblagh...",
    confirmMessage:
      "Hal anta mutaakkid min annaka turid talim hatha al-asl ala annahu masruq aw mafqud? Hatha sayufail tahdhiran aammani fi aljawaz.",
    success:
      "Tam talim al-asl ala annahu masruq aw mafqud. Altahdhir al-aam asbaha nashitan alaan.",
    alreadyReported:
      "Hatha al-asl mawsum bilsariqa aw alfqdan min qabl.",
    notEligible:
      "Faqqat al-usul allati sudira laha jawaz yumkin al-iblagh anha kamasruqa aw mafquda min dashboard al-amil.",
    requestMissing: "Lam yutam alathur ala altasjil.",
    authRequired: "Yurja aldukhul marra ukhraa lilmutabaea.",
    activeBadge: "Tam iblagh sariqa / mafqud",
    activeDescription:
      "Hunaka tahdhir aam nashit ala hatha aljawaz. Idha tammat istiadat al-asl, farji alittisal bi EquipRegistry aw aljihat almuhtassa.",
    defaultIncidentDescription:
      "Ablagh almalik almusajjal an hatha al-asl masruq aw mafqud min dashboard al-amil.",
  },
};

export function getCustomerStolenReportText(
  lang: Lang | string
): CustomerStolenReportText {
  const safeLang = isValidLang(lang) ? (lang as Lang) : DEFAULT_LANG;
  return TEXT[safeLang];
}
