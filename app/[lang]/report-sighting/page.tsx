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

function getReportTexts(lang: Lang) {
  switch (lang) {
    case "nl":
      return {
        title: "Waarneming melden",
        subtitle:
          "Gebruik deze pagina om een publieke waarneming vast te leggen en houd locatie, tijd en case-ID gereed voor de bevoegde autoriteiten.",
        warningTitle: "Waarschuwing",
        warningText:
          "Dit asset staat geregistreerd als gestolen. Benader het object niet zelf. Neem contact op met de bevoegde autoriteiten.",
        caseInfo: "Case informatie",
        whatToDo: "Wat te doen",
        steps: [
          "Blijf op veilige afstand",
          "Noteer locatie en tijd",
          "Neem contact op met lokale politie",
          "Gebruik het case ID bij melding",
        ],
      };

    case "es":
      return {
        title: "Reportar avistamiento",
        subtitle:
          "Use esta página para registrar un avistamiento público y tenga preparados la ubicación, la hora y el ID del caso para las autoridades competentes.",
        warningTitle: "Advertencia",
        warningText:
          "Este activo está registrado como robado. No se acerque al objeto. Contacte con las autoridades competentes.",
        caseInfo: "Información del caso",
        whatToDo: "Qué hacer",
        steps: [
          "Mantenga una distancia segura",
          "Anote ubicación y hora",
          "Contacte con la policía local",
          "Use el ID del caso al informar",
        ],
      };

    case "de":
      return {
        title: "Sichtung melden",
        subtitle:
          "Nutzen Sie diese Seite, um eine öffentliche Sichtung zu melden, und halten Sie Ort, Zeit und Fall-ID für die zuständigen Behörden bereit.",
        warningTitle: "Warnung",
        warningText:
          "Dieses Asset ist als gestohlen registriert. Nähern Sie sich dem Objekt nicht selbst. Kontaktieren Sie die zuständigen Behörden.",
        caseInfo: "Falldaten",
        whatToDo: "Was zu tun ist",
        steps: [
          "Halten Sie sicheren Abstand",
          "Notieren Sie Ort und Zeit",
          "Kontaktieren Sie die örtliche Polizei",
          "Verwenden Sie die Fall-ID bei der Meldung",
        ],
      };

    case "fr":
      return {
        title: "Signaler une observation",
        subtitle:
          "Utilisez cette page pour enregistrer une observation publique et gardez le lieu, l’heure et l’ID du dossier prêts pour les autorités compétentes.",
        warningTitle: "Avertissement",
        warningText:
          "Cet actif est enregistré comme volé. N’approchez pas l’objet vous-même. Contactez les autorités compétentes.",
        caseInfo: "Informations du dossier",
        whatToDo: "Que faire",
        steps: [
          "Gardez une distance de sécurité",
          "Notez le lieu et l’heure",
          "Contactez la police locale",
          "Utilisez l’ID du dossier lors du signalement",
        ],
      };

    case "it":
      return {
        title: "Segnalare avvistamento",
        subtitle:
          "Usa questa pagina per registrare un avvistamento pubblico e tieni pronti luogo, ora e ID del caso per le autorità competenti.",
        warningTitle: "Avviso",
        warningText:
          "Questo asset risulta registrato come rubato. Non avvicinarti all’oggetto. Contatta le autorità competenti.",
        caseInfo: "Informazioni sul caso",
        whatToDo: "Cosa fare",
        steps: [
          "Mantieni una distanza di sicurezza",
          "Annota luogo e ora",
          "Contatta la polizia locale",
          "Usa l’ID del caso nella segnalazione",
        ],
      };

    case "pt":
      return {
        title: "Reportar avistamento",
        subtitle:
          "Use esta página para registar um avistamento público e mantenha localização, hora e ID do caso prontos para as autoridades competentes.",
        warningTitle: "Aviso",
        warningText:
          "Este ativo está registado como roubado. Não se aproxime do objeto. Contacte as autoridades competentes.",
        caseInfo: "Informação do caso",
        whatToDo: "O que fazer",
        steps: [
          "Mantenha uma distância segura",
          "Anote localização e hora",
          "Contacte a polícia local",
          "Use o ID do caso ao reportar",
        ],
      };

    default:
      return {
        title: "Report sighting",
        subtitle:
          "Use this page to record a public sighting and keep the location, time and case ID ready for the relevant authorities.",
        warningTitle: "Warning",
        warningText:
          "This asset is registered as stolen. Do not approach the object yourself. Contact the relevant authorities.",
        caseInfo: "Case information",
        whatToDo: "What to do",
        steps: [
          "Keep a safe distance",
          "Note location and time",
          "Contact local police",
          "Use the case ID when reporting",
        ],
      };
  }
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

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              {t.warningTitle}
            </h2>

            <p className="text-sm text-red-700">{t.warningText}</p>
          </div>

          {(registryId || caseId) && (
            <div className="rounded-2xl border p-6 bg-slate-50">
              <h3 className="font-semibold mb-3">{t.caseInfo}</h3>

              {registryId && (
                <p className="text-sm">
                  <strong>Registry ID:</strong> {registryId}
                </p>
              )}

              {caseId && (
                <p className="text-sm">
                  <strong>Case ID:</strong> {caseId}
                </p>
              )}
            </div>
          )}

          <ReportSightingClient
            lang={lang}
            registryId={registryId || undefined}
            caseId={caseId || undefined}
          />

          <div className="rounded-2xl border p-6 bg-white">
            <h3 className="font-semibold mb-3">{t.whatToDo}</h3>

            <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
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
