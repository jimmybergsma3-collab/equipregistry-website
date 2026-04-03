import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import ReportSightingClient from "@/components/report/report-sighting-client";
import { isValidLang, type Lang } from "@/lib/i18n/config";

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
        title: "Autoriteiten contacteren",
        subtitle:
          "Gebruik je locatie om de juiste autoriteiten te contacteren wanneer een asset gemarkeerd of als gestolen gemeld is.",
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
        title: "Contactar autoridades",
        subtitle:
          "Use su ubicación para contactar con las autoridades correspondientes cuando un activo esté marcado o reportado como robado.",
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
        title: "Behörden kontaktieren",
        subtitle:
          "Nutzen Sie Ihren Standort, um die zuständigen Behörden zu kontaktieren, wenn ein Asset markiert oder als gestohlen gemeldet ist.",
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
        title: "Contacter les autorités",
        subtitle:
          "Utilisez votre position pour contacter les autorités compétentes lorsqu’un actif est signalé ou déclaré volé.",
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
        title: "Contatta autorità",
        subtitle:
          "Usa la tua posizione per contattare le autorità competenti quando un asset è segnalato o denunciato come rubato.",
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
        title: "Contactar autoridades",
        subtitle:
          "Use a sua localização para contactar as autoridades competentes quando um ativo estiver sinalizado ou reportado como roubado.",
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
        title: "Contact authorities",
        subtitle:
          "Use your location to contact the relevant authorities when an asset is flagged or reported stolen.",
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
  const t = getReportTexts(lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <PageHero title={t.title} subtitle={t.subtitle} />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="rounded-2xl border border-red-300 bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              ⚠️ {t.warningTitle}
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

          <ReportSightingClient lang={lang} />

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