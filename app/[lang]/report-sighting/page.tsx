import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import ReportSightingClient from "../action/ReportSightingClient";
import { getLangDir, isValidLang, isRTL, type Lang } from "@/lib/i18n/config";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  searchParams?: Promise<{
    registryId?: string;
    caseId?: string;
  }>;
};

const REPORT_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    warningTitle: string;
    warningText: string;
    caseInfo: string;
    registryId: string;
    caseId: string;
    whatToDo: string;
    steps: string[];
  }
> = {
  en: {
    title: "Report sighting",
    subtitle:
      "Use this page for public stolen-asset guidance and keep the location, time, and case ID ready for the relevant authorities.",
    warningTitle: "Warning",
    warningText:
      "This asset is registered as stolen. Do not approach it yourself. Contact the relevant authorities first.",
    caseInfo: "Case information",
    registryId: "Registry ID",
    caseId: "Case ID",
    whatToDo: "What to do",
    steps: [
      "Keep a safe distance",
      "Note the location and time",
      "Contact local police or border authorities",
      "Use the case ID when reporting",
    ],
  },
  es: {
    title: "Reportar avistamiento",
    subtitle:
      "Use esta pagina para la orientacion publica sobre activos robados y tenga preparados la ubicacion, la hora y el ID del caso para las autoridades.",
    warningTitle: "Advertencia",
    warningText:
      "Este activo figura como robado. No se acerque usted mismo. Contacte primero con las autoridades competentes.",
    caseInfo: "Informacion del caso",
    registryId: "ID de registro",
    caseId: "ID del caso",
    whatToDo: "Que hacer",
    steps: [
      "Mantenga una distancia segura",
      "Anote la ubicacion y la hora",
      "Contacte con la policia local o autoridades fronterizas",
      "Use el ID del caso al informar",
    ],
  },
  de: {
    title: "Sichtung melden",
    subtitle:
      "Nutzen Sie diese Seite fuer die oeffentliche Hinweise bei gestohlenen Assets und halten Sie Ort, Zeit und Fall-ID fuer die Behoerden bereit.",
    warningTitle: "Warnung",
    warningText:
      "Dieses Asset ist als gestohlen registriert. Naehern Sie sich dem Objekt nicht selbst. Kontaktieren Sie zuerst die zustaendigen Behoerden.",
    caseInfo: "Falldaten",
    registryId: "Register-ID",
    caseId: "Fall-ID",
    whatToDo: "Was zu tun ist",
    steps: [
      "Halten Sie sicheren Abstand",
      "Notieren Sie Ort und Zeit",
      "Kontaktieren Sie Polizei oder Grenzbehoerden",
      "Verwenden Sie die Fall-ID bei der Meldung",
    ],
  },
  fr: {
    title: "Signaler une observation",
    subtitle:
      "Utilisez cette page pour l'orientation publique d'un actif vole et gardez le lieu, l'heure et l'ID du dossier prets pour les autorites.",
    warningTitle: "Avertissement",
    warningText:
      "Cet actif est enregistre comme vole. N'approchez pas l'objet vous-meme. Contactez d'abord les autorites competentes.",
    caseInfo: "Informations du dossier",
    registryId: "ID d'enregistrement",
    caseId: "ID du dossier",
    whatToDo: "Que faire",
    steps: [
      "Gardez une distance de securite",
      "Notez le lieu et l'heure",
      "Contactez la police locale ou les autorites frontalieres",
      "Utilisez l'ID du dossier lors du signalement",
    ],
  },
  it: {
    title: "Segnalare avvistamento",
    subtitle:
      "Usa questa pagina per la guida pubblica su asset rubati e tieni pronti luogo, ora e ID del caso per le autorita.",
    warningTitle: "Avviso",
    warningText:
      "Questo asset risulta registrato come rubato. Non avvicinarti personalmente. Contatta prima le autorita competenti.",
    caseInfo: "Informazioni sul caso",
    registryId: "ID registro",
    caseId: "ID caso",
    whatToDo: "Cosa fare",
    steps: [
      "Mantieni una distanza di sicurezza",
      "Annota luogo e ora",
      "Contatta polizia locale o autorita di frontiera",
      "Usa l'ID del caso nella segnalazione",
    ],
  },
  nl: {
    title: "Waarneming melden",
    subtitle:
      "Gebruik deze pagina voor publieke guidance bij een gestolen asset en houd locatie, tijd en zaak-ID klaar voor de bevoegde autoriteiten.",
    warningTitle: "Waarschuwing",
    warningText:
      "Deze asset staat als gestolen geregistreerd. Benader het object niet zelf. Neem eerst contact op met de bevoegde autoriteiten.",
    caseInfo: "Zaakinformatie",
    registryId: "Registratie-ID",
    caseId: "Zaak-ID",
    whatToDo: "Wat te doen",
    steps: [
      "Blijf op veilige afstand",
      "Noteer locatie en tijd",
      "Neem contact op met lokale politie of grensautoriteiten",
      "Gebruik het zaak-ID bij je melding",
    ],
  },
  pt: {
    title: "Reportar avistamento",
    subtitle:
      "Use esta pagina para orientacao publica sobre ativos roubados e mantenha localizacao, hora e ID do caso prontos para as autoridades.",
    warningTitle: "Aviso",
    warningText:
      "Este ativo esta registado como roubado. Nao se aproxime do objeto. Contacte primeiro as autoridades competentes.",
    caseInfo: "Informacao do caso",
    registryId: "ID do registo",
    caseId: "ID do caso",
    whatToDo: "O que fazer",
    steps: [
      "Mantenha uma distancia segura",
      "Anote a localizacao e a hora",
      "Contacte a policia local ou autoridades fronteiricas",
      "Use o ID do caso ao reportar",
    ],
  },
  pl: {
    title: "Zglos obserwacje",
    subtitle:
      "Uzyj tej strony do publicznych wskazowek przy skradzionym aktywie i przygotuj lokalizacje, czas oraz ID sprawy dla sluzb.",
    warningTitle: "Ostrzezenie",
    warningText:
      "To aktywo jest oznaczone jako skradzione. Nie podchodz samodzielnie. Najpierw skontaktuj sie z odpowiednimi sluzbami.",
    caseInfo: "Informacje o sprawie",
    registryId: "ID rejestru",
    caseId: "ID sprawy",
    whatToDo: "Co zrobic",
    steps: [
      "Zachowaj bezpieczny dystans",
      "Zanotuj lokalizacje i czas",
      "Skontaktuj sie z policja lub sluzbami granicznymi",
      "Uzyj ID sprawy przy zgloszeniu",
    ],
  },
  sv: {
    title: "Rapportera observation",
    subtitle:
      "Anvand denna sida for publik vagledning kring stulet objekt och ha plats, tid och arende-ID redo for myndigheterna.",
    warningTitle: "Varning",
    warningText:
      "Detta objekt ar registrerat som stulet. Narma dig det inte sjalv. Kontakta relevanta myndigheter forst.",
    caseInfo: "Arendeinformation",
    registryId: "Register-ID",
    caseId: "Arende-ID",
    whatToDo: "Vad du ska gora",
    steps: [
      "Halla ett sakert avstand",
      "Anteckna plats och tid",
      "Kontakta lokal polis eller gransmyndighet",
      "Anvand arende-ID vid rapportering",
    ],
  },
  da: {
    title: "Rapporter observation",
    subtitle:
      "Brug denne side til offentlig vejledning om stjalne aktiver og hav sted, tidspunkt og sags-ID klar til myndighederne.",
    warningTitle: "Advarsel",
    warningText:
      "Dette aktiv er registreret som stjalet. Gaa ikke selv hen til objektet. Kontakt forst de relevante myndigheder.",
    caseInfo: "Sagsinformation",
    registryId: "Register-ID",
    caseId: "Sags-ID",
    whatToDo: "Hvad du skal gore",
    steps: [
      "Hold sikker afstand",
      "Noter sted og tidspunkt",
      "Kontakt lokalt politi eller graensemyndigheder",
      "Brug sags-ID ved anmeldelse",
    ],
  },
  no: {
    title: "Rapporter observasjon",
    subtitle:
      "Bruk denne siden for offentlig veiledning om stjalne eiendeler og ha sted, tid og saks-ID klart for myndighetene.",
    warningTitle: "Advarsel",
    warningText:
      "Denne eiendelen er registrert som stjalet. Ikke ga bort til objektet selv. Kontakt relevante myndigheter forst.",
    caseInfo: "Saksinformasjon",
    registryId: "Register-ID",
    caseId: "Saks-ID",
    whatToDo: "Hva du skal gjore",
    steps: [
      "Hold trygg avstand",
      "Noter sted og tid",
      "Kontakt lokalt politi eller grensemyndigheter",
      "Bruk saks-ID ved rapportering",
    ],
  },
  ru: {
    title: "Сообщить о наблюдении",
    subtitle:
      "Используйте эту страницу для публичных инструкций по украденному активу и держите место, время и ID дела под рукой для властей.",
    warningTitle: "Предупреждение",
    warningText:
      "Этот актив зарегистрирован как украденный. Не приближайтесь к нему самостоятельно. Сначала свяжитесь с компетентными органами.",
    caseInfo: "Информация о деле",
    registryId: "ID реестра",
    caseId: "ID дела",
    whatToDo: "Что делать",
    steps: [
      "Держитесь на безопасном расстоянии",
      "Запишите место и время",
      "Свяжитесь с местной полицией или пограничными службами",
      "Используйте ID дела при сообщении",
    ],
  },
  zh: {
    title: "报告目击情况",
    subtitle:
      "使用此页面获取失窃资产的公开指引，并为执法机构准备好地点、时间和案件编号。",
    warningTitle: "警告",
    warningText:
      "该资产已被登记为失窃。请不要自行接近该物品。请先联系相关执法机构。",
    caseInfo: "案件信息",
    registryId: "登记编号",
    caseId: "案件编号",
    whatToDo: "应采取的行动",
    steps: [
      "保持安全距离",
      "记录地点和时间",
      "联系当地警方或边境执法机构",
      "报案时使用案件编号",
    ],
  },
  hi: {
    title: "देखे जाने की रिपोर्ट भेजें",
    subtitle:
      "इस पेज का उपयोग चोरी हुए एसेट के सार्वजनिक मार्गदर्शन के लिए करें और अधिकारियों के लिए स्थान, समय और केस आईडी तैयार रखें।",
    warningTitle: "चेतावनी",
    warningText:
      "यह एसेट चोरी के रूप में पंजीकृत है। इसके पास स्वयं न जाएँ। पहले संबंधित अधिकारियों से संपर्क करें।",
    caseInfo: "केस जानकारी",
    registryId: "रजिस्ट्री आईडी",
    caseId: "केस आईडी",
    whatToDo: "क्या करना है",
    steps: [
      "सुरक्षित दूरी बनाए रखें",
      "स्थान और समय नोट करें",
      "स्थानीय पुलिस या सीमा अधिकारियों से संपर्क करें",
      "रिपोर्ट करते समय केस आईडी का उपयोग करें",
    ],
  },
  ar: {
    title: "إرسال بلاغ مشاهدة",
    subtitle:
      "استخدم هذه الصفحة للحصول على إرشادات عامة حول الأصل المسروق، واحتفظ بالموقع والوقت ومعرّف القضية للجهات المختصة.",
    warningTitle: "تحذير",
    warningText:
      "هذا الأصل مسجل كأصل مسروق. لا تقترب منه بنفسك. تواصل أولاً مع الجهات المختصة.",
    caseInfo: "معلومات القضية",
    registryId: "معرّف السجل",
    caseId: "معرّف القضية",
    whatToDo: "ما الذي يجب فعله",
    steps: [
      "ابقَ على مسافة آمنة",
      "سجّل الموقع والوقت",
      "تواصل مع الشرطة المحلية أو الجهات الحدودية",
      "استخدم معرّف القضية عند الإبلاغ",
    ],
  },
};

function getReportTexts(lang: Lang) {
  return repairMojibakeDeep(REPORT_TEXT[lang] ?? REPORT_TEXT.en);
}

export default async function ReportSightingPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const query = searchParams ? await searchParams : {};
  const registryId = query?.registryId || "";
  const caseId = query?.caseId || "";
  const t = getReportTexts(safeLang);
  const dir = getLangDir(safeLang);
  const rtl = isRTL(safeLang);

  return (
    <>
      <SiteHeader lang={safeLang} />

      <main dir={dir}>
        <PageHero title={t.title} subtitle={t.subtitle} />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl space-y-6 px-6">
            <div className="rounded-2xl border border-red-300 bg-red-50 p-6">
              <h2 className="mb-2 text-xl font-semibold text-red-700">
                {t.warningTitle}
              </h2>

              <p className="text-sm text-red-700">{t.warningText}</p>
            </div>

            {(registryId || caseId) && (
              <div className="rounded-2xl border bg-slate-50 p-6">
                <h3 className="mb-3 font-semibold">{t.caseInfo}</h3>

                {registryId && (
                  <p className="text-sm">
                    <strong>{t.registryId}:</strong> {registryId}
                  </p>
                )}

                {caseId && (
                  <p className="text-sm">
                    <strong>{t.caseId}:</strong> {caseId}
                  </p>
                )}
              </div>
            )}

            <ReportSightingClient
              lang={safeLang}
              registryId={registryId || undefined}
              caseId={caseId || undefined}
            />

            <div className="rounded-2xl border bg-white p-6">
              <h3 className="mb-3 font-semibold">{t.whatToDo}</h3>

              <ul
                className={`list-disc space-y-2 text-sm text-slate-700 ${
                  rtl ? "pr-5 text-right" : "pl-5 text-left"
                }`}
              >
                {t.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={safeLang} />
    </>
  );
}
