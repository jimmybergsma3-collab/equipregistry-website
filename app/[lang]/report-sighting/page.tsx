import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import ReportSightingClient from "../action/ReportSightingClient";
import { isValidLang, type Lang } from "@/lib/i18n/config";
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
    title: "Soobshchit o nablyudenii",
    subtitle:
      "Ispolzuyte etu stranicu dlya publichnoy instruktsii po ukradennomu aktivu i derzhite mesto, vremya i ID dela gotovymi dlya vlastey.",
    warningTitle: "Preduprezhdenie",
    warningText:
      "Etot aktiv zaregistrirovan kak ukradennyy. Ne podkhodite k nemu samostoyatelno. Snachala svyazhites s kompetentnymi organami.",
    caseInfo: "Informatsiya o dele",
    registryId: "ID reestra",
    caseId: "ID dela",
    whatToDo: "Chto delat",
    steps: [
      "Derzhites na bezopasnom rasstoyanii",
      "Zapishete mesto i vremya",
      "Svyazhites s mestnoy politsiey ili pogranichnymi sluzhbami",
      "Ispolzuyte ID dela pri soobshchenii",
    ],
  },
  zh: {
    title: "Baogao muji",
    subtitle:
      "Shiyong ci yemian huode bei dao ziche de gongkai zhidao, bing wei zhifa jigou zhunbei didian, shijian he Case ID.",
    warningTitle: "Jinggao",
    warningText:
      "Ci ziche yi dengji wei bei dao. Qing buyao qinjin duixiang. Qing xian lianxi xiangguan zhifa jigou.",
    caseInfo: "Case xinxi",
    registryId: "Registry ID",
    caseId: "Case ID",
    whatToDo: "Ying gai zenme zuo",
    steps: [
      "Baochi anquan juli",
      "Jilu didian he shijian",
      "Lianxi dangdi jingcha huo bianjing jigou",
      "Baoan shi shiyong Case ID",
    ],
  },
  hi: {
    title: "Sighting report bhejen",
    subtitle:
      "Is page ka upyog public stolen-asset guidance ke liye karen aur authorities ke liye location, time aur Case ID taiyar rakhen.",
    warningTitle: "Warning",
    warningText:
      "Yeh asset stolen ke roop me registered hai. Iske paas khud na jayen. Pehle sambandhit authorities se sampark karen.",
    caseInfo: "Case jankari",
    registryId: "Registry ID",
    caseId: "Case ID",
    whatToDo: "Kya karna hai",
    steps: [
      "Surakshit doori banaye rakhen",
      "Location aur time note karen",
      "Local police ya border authorities se sampark karen",
      "Report karte waqt Case ID ka upyog karen",
    ],
  },
  ar: {
    title: "Irsal balagh mushahada",
    subtitle:
      "Astakhdim hadhihi alsafha li'iirshadat al'usul almasruqa wahtafiz bialmawqie walwaqt wa Case ID li'jihat alikhtisas.",
    warningTitle: "Tahdhir",
    warningText:
      "Hatha al'asl musajjal ka masruq. La taqtarib minhu binafsik. Tawasul awal an ma e aljihatin almukhtassa.",
    caseInfo: "Maelumat alqadiya",
    registryId: "Registry ID",
    caseId: "Case ID",
    whatToDo: "Mada tafal",
    steps: [
      "Abq masafa amina",
      "Sajjil almawqie walwaqt",
      "Tawasul mae alshurta almahalliya aw aljihatin alhududiya",
      "Astakhdim Case ID eind al'ibligh",
    ],
  },
};

function getReportTexts(lang: Lang) {
  return REPORT_TEXT[lang] ?? REPORT_TEXT.en;
}

export default async function ReportSightingPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const query = searchParams ? await searchParams : {};
  const registryId = query?.registryId || "";
  const caseId = query?.caseId || "";
  const t = repairMojibakeDeep(getReportTexts(lang));

  return (
    <>
      <SiteHeader lang={lang} />

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
            lang={lang}
            registryId={registryId || undefined}
            caseId={caseId || undefined}
          />

          <div className="rounded-2xl border bg-white p-6">
            <h3 className="mb-3 font-semibold">{t.whatToDo}</h3>

            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
              {t.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}
