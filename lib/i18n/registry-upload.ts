import type { Lang } from "@/lib/i18n/config";

export type RegistryUploadText = {
  chooseFile: string;
  addFiles: string;
  replaceFile: string;
  uploading: string;
  clearFiles: string;
  noFileSelected: string;
  sizeHelp: string;
  privacyNote: string;
  uploadFailed: string;
};

const TEXT: Record<Lang, RegistryUploadText> = {
  en: {
    chooseFile: "Choose file",
    addFiles: "Add files",
    replaceFile: "Replace file",
    uploading: "Uploading...",
    clearFiles: "Clear",
    noFileSelected: "No files uploaded yet",
    sizeHelp:
      "PDF, JPG, PNG, or WEBP. Images are optimized before upload. Max 6 MB per file.",
    privacyNote:
      "Mask or redact unnecessary personal, financial, and ID data before upload.",
    uploadFailed: "Upload failed. Please try again.",
  },
  es: {
    chooseFile: "Seleccionar archivo",
    addFiles: "Anadir archivos",
    replaceFile: "Reemplazar archivo",
    uploading: "Subiendo...",
    clearFiles: "Limpiar",
    noFileSelected: "Todavia no hay archivos",
    sizeHelp:
      "PDF, JPG, PNG o WEBP. Las imagenes se optimizan antes de subir. Maximo 6 MB por archivo.",
    privacyNote:
      "Oculte o tache los datos personales, financieros y de identidad que no sean necesarios antes de subirlos.",
    uploadFailed: "La carga ha fallado. Intentalo de nuevo.",
  },
  de: {
    chooseFile: "Datei auswahlen",
    addFiles: "Dateien hinzufugen",
    replaceFile: "Datei ersetzen",
    uploading: "Wird hochgeladen...",
    clearFiles: "Leeren",
    noFileSelected: "Noch keine Dateien hochgeladen",
    sizeHelp:
      "PDF, JPG, PNG oder WEBP. Bilder werden vor dem Upload optimiert. Maximal 6 MB pro Datei.",
    privacyNote:
      "Schwarzen Sie unnotige personen-, finanz- und ausweisbezogene Daten vor dem Upload ab.",
    uploadFailed: "Upload fehlgeschlagen. Bitte versuchen Sie es erneut.",
  },
  fr: {
    chooseFile: "Choisir un fichier",
    addFiles: "Ajouter des fichiers",
    replaceFile: "Remplacer le fichier",
    uploading: "Televersement...",
    clearFiles: "Effacer",
    noFileSelected: "Aucun fichier televerse pour le moment",
    sizeHelp:
      "PDF, JPG, PNG ou WEBP. Les images sont optimisees avant le televersement. Maximum 6 Mo par fichier.",
    privacyNote:
      "Masquez les donnees personnelles, financieres et d'identite non necessaires avant le televersement.",
    uploadFailed: "Le televersement a echoue. Veuillez reessayer.",
  },
  it: {
    chooseFile: "Scegli file",
    addFiles: "Aggiungi file",
    replaceFile: "Sostituisci file",
    uploading: "Caricamento...",
    clearFiles: "Cancella",
    noFileSelected: "Nessun file caricato",
    sizeHelp:
      "PDF, JPG, PNG o WEBP. Le immagini vengono ottimizzate prima del caricamento. Massimo 6 MB per file.",
    privacyNote:
      "Oscura i dati personali, finanziari e di identita non necessari prima del caricamento.",
    uploadFailed: "Caricamento non riuscito. Riprova.",
  },
  nl: {
    chooseFile: "Bestand kiezen",
    addFiles: "Bestanden toevoegen",
    replaceFile: "Bestand vervangen",
    uploading: "Uploaden...",
    clearFiles: "Wissen",
    noFileSelected: "Nog geen bestanden geupload",
    sizeHelp:
      "PDF, JPG, PNG of WEBP. Afbeeldingen worden voor upload geoptimaliseerd. Maximaal 6 MB per bestand.",
    privacyNote:
      "Masker of verwijder onnodige persoonlijke, financiele en identiteitsgegevens voor het uploaden.",
    uploadFailed: "Upload mislukt. Probeer het opnieuw.",
  },
  pt: {
    chooseFile: "Escolher ficheiro",
    addFiles: "Adicionar ficheiros",
    replaceFile: "Substituir ficheiro",
    uploading: "A carregar...",
    clearFiles: "Limpar",
    noFileSelected: "Ainda nao ha ficheiros carregados",
    sizeHelp:
      "PDF, JPG, PNG ou WEBP. As imagens sao otimizadas antes do carregamento. Maximo 6 MB por ficheiro.",
    privacyNote:
      "Oculte ou remova dados pessoais, financeiros e de identificacao desnecessarios antes do carregamento.",
    uploadFailed: "Falha no carregamento. Tente novamente.",
  },
  ru: {
    chooseFile: "Vybrat fayl",
    addFiles: "Dobavit fayly",
    replaceFile: "Zamenit fayl",
    uploading: "Zagruzka...",
    clearFiles: "Ochistit",
    noFileSelected: "Fayly eshche ne zagruzheny",
    sizeHelp:
      "PDF, JPG, PNG ili WEBP. Izobrazheniya optimiziruyutsya pered zagruzkoy. Maksimum 6 MB na fayl.",
    privacyNote:
      "Skroyte ili zaretushiruyte lishniye personalnyye, finansovyye i identifikatsionnyye dannyye pered zagruzkoy.",
    uploadFailed: "Zagruzka ne udalas. Pozhaluysta, povtorite popytku.",
  },
  zh: {
    chooseFile: "Xuanze wenjian",
    addFiles: "Tianjia wenjian",
    replaceFile: "Tihuan wenjian",
    uploading: "Shangchuan zhong...",
    clearFiles: "Qingchu",
    noFileSelected: "Shangwei shangchuan wenjian",
    sizeHelp:
      "PDF, JPG, PNG huo WEBP. Tuxiang hui zai shangchuan qian youhua. Meige wenjian zui duo 6 MB.",
    privacyNote:
      "Shangchuan qian qing zhedang bu biyiao de geren, jinrong he shenfen xinxi.",
    uploadFailed: "Shangchuan shibai. Qing chongshi.",
  },
  hi: {
    chooseFile: "Dastavez chunen",
    addFiles: "Dastavez joden",
    replaceFile: "Dastavez badlen",
    uploading: "Upload ho raha hai...",
    clearFiles: "Saf karen",
    noFileSelected: "Abhi tak koi dastavez upload nahin hua",
    sizeHelp:
      "PDF, JPG, PNG, ya WEBP. Tasvirein upload se pehle optimize hoti hain. Har dastavez adhiktam 6 MB.",
    privacyNote:
      "Upload se pehle gair-zaruri vyaktigat, vittiya aur pahchan sambandhit jankari ko chhupa den.",
    uploadFailed: "Dastavez bhejna asafal raha. Kripya phir se koshish karen.",
  },
  ar: {
    chooseFile: "Ikhtar milafan",
    addFiles: "Idafat malafat",
    replaceFile: "Istibdal almalaf",
    uploading: "Jari alraf...",
    clearFiles: "Masah",
    noFileSelected: "Lam yutam raf eay malafat baed",
    sizeHelp:
      "PDF, JPG, PNG aw WEBP. Yutam tahsin alsuwar qabl alraf. Alhadd alaqsa 6 MB likulli malaf.",
    privacyNote:
      "Qum bikhafa aw hajb albayanat alshakhsia walmalia wabayanat alhuwia ghayr aldaruria qabl alraf.",
    uploadFailed: "Fashal alraf. Hawil maratan ukhraa.",
  },

  pl: {
    chooseFile: "Wybierz plik",
    addFiles: "Dodaj pliki",
    replaceFile: "Zamien plik",
    uploading: "Przesylanie...",
    clearFiles: "Wyczysc",
    noFileSelected: "Nie przeslano jeszcze zadnych plikow",
    sizeHelp:
      "PDF, JPG, PNG lub WEBP. Obrazy sa optymalizowane przed przeslaniem. Maks. 6 MB na plik.",
    privacyNote:
      "Przed przeslaniem ukryj lub zamaz niepotrzebne dane osobowe, finansowe i identyfikacyjne.",
    uploadFailed: "Przesylanie nie powiodlo sie. Sprobuj ponownie.",
  },
  sv: {
    chooseFile: "Valj fil",
    addFiles: "Lagg till filer",
    replaceFile: "Byt ut fil",
    uploading: "Laddar upp...",
    clearFiles: "Rensa",
    noFileSelected: "Inga filer har laddats upp an",
    sizeHelp:
      "PDF, JPG, PNG eller WEBP. Bilder optimeras fore uppladdning. Max 6 MB per fil.",
    privacyNote:
      "Maskera eller dolj onodiga personuppgifter, ekonomiska uppgifter och ID-data fore uppladdning.",
    uploadFailed: "Uppladdningen misslyckades. Forsok igen.",
  },
  da: {
    chooseFile: "Vaelg fil",
    addFiles: "Tilfoj filer",
    replaceFile: "Udskift fil",
    uploading: "Uploader...",
    clearFiles: "Ryd",
    noFileSelected: "Der er endnu ikke uploadet filer",
    sizeHelp:
      "PDF, JPG, PNG eller WEBP. Billeder optimeres for upload. Maks. 6 MB pr. fil.",
    privacyNote:
      "Skjul eller rediger unodvendige personlige, finansielle og ID-relaterede data for upload.",
    uploadFailed: "Upload mislykkedes. Prov igen.",
  },
  no: {
    chooseFile: "Velg fil",
    addFiles: "Legg til filer",
    replaceFile: "Bytt fil",
    uploading: "Laster opp...",
    clearFiles: "Tomm",
    noFileSelected: "Ingen filer er lastet opp enn",
    sizeHelp:
      "PDF, JPG, PNG eller WEBP. Bilder optimaliseres for opplasting. Maks 6 MB per fil.",
    privacyNote:
      "Masker eller skjul unodvendige person-, finans- og ID-data for opplasting.",
    uploadFailed: "Opplasting mislyktes. Prov igjen.",
  },
};

export function getRegistryUploadText(lang: Lang): RegistryUploadText {
  return TEXT[lang] ?? TEXT.en;
}
