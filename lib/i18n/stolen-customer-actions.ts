import { DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n/config";

type StolenCustomerActionsText = {
  policeFilesTitle: string;
  policeFilesDescription: string;
  recoveredTitle: string;
  recoveredDescription: string;
  recoveredAction: string;
};

const TEXT: Record<Lang, StolenCustomerActionsText> = {
  en: {
    policeFilesTitle: "Police report files",
    policeFilesDescription:
      "Upload the police report itself if you already have it. This is optional but helps EquipRegistry review faster.",
    recoveredTitle: "Asset recovered?",
    recoveredDescription:
      "If the asset has been found or returned, notify EquipRegistry so the public warning can be reviewed and removed.",
    recoveredAction: "Notify EquipRegistry",
  },
  es: {
    policeFilesTitle: "Archivos de denuncia policial",
    policeFilesDescription:
      "Suba la denuncia policial si ya la tiene. Es opcional, pero ayuda a EquipRegistry a revisar mas rapido.",
    recoveredTitle: "El activo ha sido recuperado?",
    recoveredDescription:
      "Si el activo ha sido encontrado o devuelto, avise a EquipRegistry para revisar y retirar la advertencia publica.",
    recoveredAction: "Avisar a EquipRegistry",
  },
  de: {
    policeFilesTitle: "Dateien zum Polizeibericht",
    policeFilesDescription:
      "Laden Sie den eigentlichen Polizeibericht hoch, wenn er bereits vorliegt. Das ist optional, hilft EquipRegistry aber bei einer schnelleren Pruefung.",
    recoveredTitle: "Asset wiedergefunden?",
    recoveredDescription:
      "Wenn das Asset gefunden oder zurueckgegeben wurde, informieren Sie EquipRegistry, damit die oeffentliche Warnung geprueft und entfernt werden kann.",
    recoveredAction: "EquipRegistry informieren",
  },
  fr: {
    policeFilesTitle: "Fichiers du rapport de police",
    policeFilesDescription:
      "Televersez le rapport de police si vous l'avez deja. C'est facultatif, mais cela aide EquipRegistry a examiner le dossier plus vite.",
    recoveredTitle: "Actif retrouve ?",
    recoveredDescription:
      "Si l'actif a ete retrouve ou restitue, informez EquipRegistry afin que l'alerte publique puisse etre revue et retiree.",
    recoveredAction: "Informer EquipRegistry",
  },
  it: {
    policeFilesTitle: "File del rapporto di polizia",
    policeFilesDescription:
      "Carichi il rapporto di polizia se e gia disponibile. E facoltativo, ma aiuta EquipRegistry a velocizzare la revisione.",
    recoveredTitle: "Asset recuperato?",
    recoveredDescription:
      "Se l'asset e stato ritrovato o restituito, avvisi EquipRegistry cosi l'avviso pubblico puo essere rivisto e rimosso.",
    recoveredAction: "Avvisa EquipRegistry",
  },
  nl: {
    policeFilesTitle: "Bestanden van politierapport",
    policeFilesDescription:
      "Upload het politierapport zelf als je dat al hebt. Dit is optioneel, maar helpt EquipRegistry om sneller te beoordelen.",
    recoveredTitle: "Asset teruggevonden?",
    recoveredDescription:
      "Als de asset is teruggevonden of terugbezorgd, meld dit aan EquipRegistry zodat de publieke waarschuwing beoordeeld en verwijderd kan worden.",
    recoveredAction: "EquipRegistry informeren",
  },
  pt: {
    policeFilesTitle: "Ficheiros do relatorio policial",
    policeFilesDescription:
      "Carregue o relatorio policial se ja o tiver. E opcional, mas ajuda a EquipRegistry a rever mais depressa.",
    recoveredTitle: "Ativo recuperado?",
    recoveredDescription:
      "Se o ativo foi encontrado ou devolvido, avise a EquipRegistry para que o aviso publico possa ser revisto e removido.",
    recoveredAction: "Avisar a EquipRegistry",
  },
  pl: {
    policeFilesTitle: "Pliki zgloszenia policyjnego",
    policeFilesDescription:
      "Przeslij samo zgloszenie policyjne, jesli juz je masz. To opcjonalne, ale pomaga EquipRegistry szybciej ocenic sprawe.",
    recoveredTitle: "Asset odzyskany?",
    recoveredDescription:
      "Jesli asset zostal odnaleziony lub zwrocony, poinformuj EquipRegistry, aby publiczne ostrzezenie moglo zostac zweryfikowane i usuniete.",
    recoveredAction: "Powiadom EquipRegistry",
  },
  sv: {
    policeFilesTitle: "Polisrapportfiler",
    policeFilesDescription:
      "Ladda upp sjalva polisrapporten om du redan har den. Det ar valfritt men hjalper EquipRegistry att granska snabbare.",
    recoveredTitle: "Asset aterfunnen?",
    recoveredDescription:
      "Om asseten har hittats eller kommit tillbaka, meddela EquipRegistry sa att den publika varningen kan granskas och tas bort.",
    recoveredAction: "Meddela EquipRegistry",
  },
  da: {
    policeFilesTitle: "Politirapportfiler",
    policeFilesDescription:
      "Upload selve politirapporten, hvis du allerede har den. Det er valgfrit, men det hjalper EquipRegistry med hurtigere gennemgang.",
    recoveredTitle: "Asset fundet igen?",
    recoveredDescription:
      "Hvis assetet er fundet eller leveret tilbage, skal du give EquipRegistry besked, sa den offentlige advarsel kan gennemgas og fjernes.",
    recoveredAction: "Giv EquipRegistry besked",
  },
  no: {
    policeFilesTitle: "Politirapportfiler",
    policeFilesDescription:
      "Last opp selve politirapporten hvis du allerede har den. Det er valgfritt, men hjelper EquipRegistry med raskere gjennomgang.",
    recoveredTitle: "Asset funnet igjen?",
    recoveredDescription:
      "Hvis asseten er funnet eller levert tilbake, gi EquipRegistry beskjed slik at den offentlige advarselen kan gjennomgas og fjernes.",
    recoveredAction: "Varsle EquipRegistry",
  },
  ru: {
    policeFilesTitle: "Faily politseyskogo otcheta",
    policeFilesDescription:
      "Zagruzite sam politseyskiy otchet, esli on u vas uzhe est. Eto neobyazatelno, no pomogaet EquipRegistry proverit delo bystree.",
    recoveredTitle: "Aktiv nayden?",
    recoveredDescription:
      "Esli aktiv nayden ili vozvrashchen, soobshchite EquipRegistry, chtoby publichnoe preduprezhdenie mogli proverit i snyat.",
    recoveredAction: "Soobshit EquipRegistry",
  },
  zh: {
    policeFilesTitle: "Jingfang baogao wenjian",
    policeFilesDescription:
      "Ruguo nin yijing you jingfang baogao, qing shangchuan gai wenjian. Zhe shi kexuan de, dan keyi bangzhu EquipRegistry geng kuai shencha.",
    recoveredTitle: "Zichan yijing zhaohui?",
    recoveredDescription:
      "Ruguo zichan yijing zhaodao huo guihuan, qing tongzhi EquipRegistry, yi bian fucha bing yichu gongkai jinggao.",
    recoveredAction: "Tongzhi EquipRegistry",
  },
  hi: {
    policeFilesTitle: "Police report files",
    policeFilesDescription:
      "Agar police report uplabdh hai to use bhi upload karein. Yeh optional hai, lekin EquipRegistry ko review jaldi karne mein madad karta hai.",
    recoveredTitle: "Asset wapas mil gaya?",
    recoveredDescription:
      "Agar asset mil gaya hai ya laut aaya hai, to EquipRegistry ko batayen taki public warning ko review karke hataaya ja sake.",
    recoveredAction: "EquipRegistry ko batayen",
  },
  ar: {
    policeFilesTitle: "Malafat taqrir alshurta",
    policeFilesDescription:
      "Arfiq nafs taqrir alshurta idha kan mutahan. Hatha ikhtiyari, lakinahu yusaeid EquipRegistry ala murajaea asrae.",
    recoveredTitle: "Hal tama aleuthur ealaa al'asl?",
    recoveredDescription:
      "Idha tam aleuthur ealaa al'asl aw iieadatuh, faakhbir EquipRegistry hatta yumkin murajieat altahdhir al'aam wa'izatuh.",
    recoveredAction: "Ikhbar EquipRegistry",
  },
};

export function getStolenCustomerActionsText(lang: string | Lang) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : DEFAULT_LANG;
  return TEXT[safeLang];
}
