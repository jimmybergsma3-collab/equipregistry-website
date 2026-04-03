import Link from "next/link";
import { notFound } from "next/navigation";
import AuthoritiesClient from "@/app/[lang]/action/authorities/AuthoritiesClient";
import ReportSightingClient from "@/app/[lang]/action/report/ReportSightingClient";
import LoginRequiredButton from "@/components/auth/login-required-button";
import { isValidLang, type Lang } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    type?: string;
    registryId?: string;
    caseId?: string;
  }>;
}

const ACTION_TEXT: Record<
  Lang,
  {
    verify: {
      title: string;
      intro: string;
      registryId: string;
      nextTitle: string;
      steps: string[];
      login: string;
      back: string;
    };
    register: {
      title: string;
      intro: string;
      whoTitle: string;
      who: string[];
      includesTitle: string;
      includes: string[];
      login: string;
      back: string;
    };
    report: {
      title: string;
      intro: string;
      registryId: string;
      important: string;
      importantText: string;
      nextTitle: string;
      next: string[];
      back: string;
    };
    authorities: {
      title: string;
      intro: string;
      registryId: string;
      caseId: string;
      important: string;
      importantText: string;
      back: string;
    };
    fallback: {
      title: string;
      intro: string;
      back: string;
    };
  }
> = {
  en: {
    verify: {
      title: "Request verification",
      intro:
        "Verification confirms the legal origin and ownership history of registered equipment. This reduces fraud, insurance risk and compliance uncertainty.",
      registryId: "Registry ID",
      nextTitle: "What happens next",
      steps: [
        "Login as the equipment owner or authorized party",
        "Submit ownership and origin documentation",
        "A validation partner reviews the case",
        "The registry status is updated upon approval",
      ],
      login: "Login to continue",
      back: "Back to search",
    },
    register: {
      title: "Register equipment",
      intro:
        "Equipment registration creates an official EquipRegistry passport. This establishes a verified reference for ownership, documentation and insurance validation.",
      whoTitle: "Who can register",
      who: [
        "Equipment owners",
        "Authorized dealers or manufacturers",
        "Insurance or leasing partners (with mandate)",
      ],
      includesTitle: "Registration includes",
      includes: [
        "Unique registry ID",
        "Digital equipment passport",
        "Proof-of-origin validation",
        "Insurance-ready status reference",
      ],
      login: "Login to start registration",
      back: "Back to search",
    },
    report: {
      title: "Report a sighting",
      intro:
        "If you believe you have identified equipment that is reported as stolen or suspicious, you can submit a sighting report to EquipRegistry.",
      registryId: "Registry ID",
      important: "Important",
      importantText:
        "Do not attempt to intervene, recover or confront any party. Reporting a sighting helps authorities and insurers take appropriate action.",
      nextTitle: "What happens after reporting",
      next: [
        "Your report is logged securely",
        "Relevant insurers or authorities are notified",
        "No personal details are disclosed publicly",
        "You may be contacted for clarification if needed",
      ],
      back: "Back to search",
    },
    authorities: {
      title: "Contact authorities",
      intro:
        "Demo flow: shows a recommended authority contact route for a stolen equipment alert. You may optionally share your approximate location (demo only).",
      registryId: "Registry ID",
      caseId: "Case ID",
      important: "Important",
      importantText:
        "If there is immediate danger, call emergency services. Do not intervene or confront any party.",
      back: "Back to search",
    },
    fallback: {
      title: "EquipRegistry action",
      intro:
        "This action requires additional context. Please start from a serial lookup or registry passport.",
      back: "Back to search",
    },
  },
  es: {
    verify: {
      title: "Solicitar verificación",
      intro:
        "La verificación confirma el origen legal y el historial de propiedad del equipo registrado. Esto reduce el fraude, el riesgo de seguros y la incertidumbre de cumplimiento.",
      registryId: "ID de registro",
      nextTitle: "Qué ocurre después",
      steps: [
        "Inicie sesión como propietario del equipo o parte autorizada",
        "Envíe la documentación de propiedad y origen",
        "Un socio de validación revisa el caso",
        "El estado del registro se actualiza tras la aprobación",
      ],
      login: "Iniciar sesión para continuar",
      back: "Volver a la búsqueda",
    },
    register: {
      title: "Registrar equipo",
      intro:
        "El registro de equipos crea un pasaporte oficial de EquipRegistry. Esto establece una referencia verificada para propiedad, documentación y validación de seguros.",
      whoTitle: "Quién puede registrar",
      who: [
        "Propietarios del equipo",
        "Distribuidores o fabricantes autorizados",
        "Socios aseguradores o de leasing (con mandato)",
      ],
      includesTitle: "El registro incluye",
      includes: [
        "ID de registro único",
        "Pasaporte digital del equipo",
        "Validación del origen",
        "Referencia de estado preparada para seguros",
      ],
      login: "Iniciar sesión para empezar el registro",
      back: "Volver a la búsqueda",
    },
    report: {
      title: "Reportar avistamiento",
      intro:
        "Si cree haber identificado un equipo reportado como robado o sospechoso, puede enviar un reporte de avistamiento a EquipRegistry.",
      registryId: "ID de registro",
      important: "Importante",
      importantText:
        "No intente intervenir, recuperar ni confrontar a ninguna parte. Reportar un avistamiento ayuda a las autoridades y aseguradoras a actuar adecuadamente.",
      nextTitle: "Qué ocurre después del reporte",
      next: [
        "Su reporte se registra de forma segura",
        "Se notifica a aseguradoras o autoridades relevantes",
        "No se divulgan públicamente datos personales",
        "Podrían contactarle para aclaraciones si es necesario",
      ],
      back: "Volver a la búsqueda",
    },
    authorities: {
      title: "Contactar autoridades",
      intro:
        "Flujo demo: muestra una ruta recomendada de contacto con autoridades para una alerta de equipo robado. Opcionalmente puede compartir su ubicación aproximada (solo demo).",
      registryId: "ID de registro",
      caseId: "ID del caso",
      important: "Importante",
      importantText:
        "Si existe peligro inmediato, llame a los servicios de emergencia. No intervenga ni confronte a ninguna parte.",
      back: "Volver a la búsqueda",
    },
    fallback: {
      title: "Acción de EquipRegistry",
      intro:
        "Esta acción requiere contexto adicional. Comience desde una búsqueda por número de serie o pasaporte de registro.",
      back: "Volver a la búsqueda",
    },
  },
  de: {
    verify: {
      title: "Verifizierung anfordern",
      intro:
        "Die Verifizierung bestätigt den legalen Ursprung und die Eigentumshistorie registrierter Geräte. Dies reduziert Betrug, Versicherungsrisiken und Compliance-Unsicherheit.",
      registryId: "Register-ID",
      nextTitle: "Was passiert als Nächstes",
      steps: [
        "Melden Sie sich als Eigentümer oder berechtigte Partei an",
        "Reichen Sie Eigentums- und Herkunftsnachweise ein",
        "Ein Validierungspartner prüft den Fall",
        "Der Registerstatus wird nach Genehmigung aktualisiert",
      ],
      login: "Anmelden, um fortzufahren",
      back: "Zurück zur Suche",
    },
    register: {
      title: "Gerät registrieren",
      intro:
        "Die Geräte-Registrierung erstellt einen offiziellen EquipRegistry-Pass. Dadurch entsteht eine verifizierte Referenz für Eigentum, Unterlagen und Versicherungsvalidierung.",
      whoTitle: "Wer kann registrieren",
      who: [
        "Geräteeigentümer",
        "Autorisierte Händler oder Hersteller",
        "Versicherungs- oder Leasingpartner (mit Mandat)",
      ],
      includesTitle: "Die Registrierung umfasst",
      includes: [
        "Eindeutige Register-ID",
        "Digitalen Gerätepass",
        "Herkunftsvalidierung",
        "Versicherungsfähige Statusreferenz",
      ],
      login: "Anmelden, um die Registrierung zu starten",
      back: "Zurück zur Suche",
    },
    report: {
      title: "Sichtung melden",
      intro:
        "Wenn Sie glauben, ein als gestohlen oder verdächtig gemeldetes Gerät identifiziert zu haben, können Sie eine Sichtungsmeldung an EquipRegistry senden.",
      registryId: "Register-ID",
      important: "Wichtig",
      importantText:
        "Versuchen Sie nicht einzugreifen, etwas zurückzuholen oder jemanden zu konfrontieren. Eine Sichtungsmeldung hilft Behörden und Versicherern beim Handeln.",
      nextTitle: "Was nach der Meldung passiert",
      next: [
        "Ihre Meldung wird sicher protokolliert",
        "Relevante Versicherer oder Behörden werden benachrichtigt",
        "Keine persönlichen Daten werden öffentlich gemacht",
        "Bei Bedarf können Sie für Rückfragen kontaktiert werden",
      ],
      back: "Zurück zur Suche",
    },
    authorities: {
      title: "Behörden kontaktieren",
      intro:
        "Demo-Ablauf: zeigt einen empfohlenen Kontaktweg zu Behörden bei einem Alarm wegen gestohlener Geräte. Optional können Sie Ihren ungefähren Standort teilen (nur Demo).",
      registryId: "Register-ID",
      caseId: "Fall-ID",
      important: "Wichtig",
      importantText:
        "Bei unmittelbarer Gefahr rufen Sie den Notruf. Greifen Sie nicht ein und konfrontieren Sie niemanden.",
      back: "Zurück zur Suche",
    },
    fallback: {
      title: "EquipRegistry-Aktion",
      intro:
        "Diese Aktion benötigt zusätzlichen Kontext. Bitte starten Sie über eine Seriennummernsuche oder einen Registerpass.",
      back: "Zurück zur Suche",
    },
  },
  fr: {
    verify: {
      title: "Demander une vérification",
      intro:
        "La vérification confirme l’origine légale et l’historique de propriété des équipements enregistrés. Cela réduit la fraude, le risque d’assurance et l’incertitude de conformité.",
      registryId: "ID de registre",
      nextTitle: "Ce qui se passe ensuite",
      steps: [
        "Connectez-vous en tant que propriétaire ou partie autorisée",
        "Soumettez les documents de propriété et d’origine",
        "Un partenaire de validation examine le dossier",
        "Le statut du registre est mis à jour après approbation",
      ],
      login: "Se connecter pour continuer",
      back: "Retour à la recherche",
    },
    register: {
      title: "Enregistrer un équipement",
      intro:
        "L’enregistrement d’un équipement crée un passeport officiel EquipRegistry. Cela établit une référence vérifiée pour la propriété, les documents et la validation d’assurance.",
      whoTitle: "Qui peut enregistrer",
      who: [
        "Les propriétaires d’équipement",
        "Les concessionnaires ou fabricants autorisés",
        "Les partenaires assureurs ou leasing (avec mandat)",
      ],
      includesTitle: "L’enregistrement comprend",
      includes: [
        "Un identifiant de registre unique",
        "Un passeport numérique d’équipement",
        "Une validation de provenance",
        "Une référence de statut prête pour l’assurance",
      ],
      login: "Se connecter pour commencer l’enregistrement",
      back: "Retour à la recherche",
    },
    report: {
      title: "Signaler un repérage",
      intro:
        "Si vous pensez avoir identifié un équipement signalé comme volé ou suspect, vous pouvez envoyer un signalement à EquipRegistry.",
      registryId: "ID de registre",
      important: "Important",
      importantText:
        "N’essayez pas d’intervenir, de récupérer ou de confronter une partie. Un signalement aide les autorités et les assureurs à agir correctement.",
      nextTitle: "Ce qui se passe après le signalement",
      next: [
        "Votre signalement est enregistré de manière sécurisée",
        "Les assureurs ou autorités concernés sont informés",
        "Aucune donnée personnelle n’est rendue publique",
        "Vous pourrez être contacté pour des précisions si nécessaire",
      ],
      back: "Retour à la recherche",
    },
    authorities: {
      title: "Contacter les autorités",
      intro:
        "Flux démo : affiche un itinéraire recommandé de contact avec les autorités pour une alerte d’équipement volé. Vous pouvez éventuellement partager votre position approximative (démo uniquement).",
      registryId: "ID de registre",
      caseId: "ID du dossier",
      important: "Important",
      importantText:
        "En cas de danger immédiat, appelez les secours. N’intervenez pas et ne confrontez personne.",
      back: "Retour à la recherche",
    },
    fallback: {
      title: "Action EquipRegistry",
      intro:
        "Cette action nécessite un contexte supplémentaire. Veuillez commencer depuis une recherche de numéro de série ou un passeport de registre.",
      back: "Retour à la recherche",
    },
  },
  it: {
    verify: {
      title: "Richiedi verifica",
      intro:
        "La verifica conferma l’origine legale e la cronologia di proprietà delle attrezzature registrate. Questo riduce frodi, rischi assicurativi e incertezza di conformità.",
      registryId: "ID registro",
      nextTitle: "Cosa succede dopo",
      steps: [
        "Accedi come proprietario o parte autorizzata",
        "Invia la documentazione di proprietà e origine",
        "Un partner di validazione esamina il caso",
        "Lo stato del registro viene aggiornato dopo l’approvazione",
      ],
      login: "Accedi per continuare",
      back: "Torna alla ricerca",
    },
    register: {
      title: "Registra attrezzatura",
      intro:
        "La registrazione dell’attrezzatura crea un passaporto ufficiale EquipRegistry. Questo stabilisce un riferimento verificato per proprietà, documentazione e validazione assicurativa.",
      whoTitle: "Chi può registrare",
      who: [
        "Proprietari dell’attrezzatura",
        "Rivenditori o produttori autorizzati",
        "Partner assicurativi o leasing (con mandato)",
      ],
      includesTitle: "La registrazione include",
      includes: [
        "ID registro univoco",
        "Passaporto digitale dell’attrezzatura",
        "Validazione della provenienza",
        "Riferimento di stato pronto per assicurazioni",
      ],
      login: "Accedi per iniziare la registrazione",
      back: "Torna alla ricerca",
    },
    report: {
      title: "Segnala un avvistamento",
      intro:
        "Se ritieni di aver identificato un’attrezzatura segnalata come rubata o sospetta, puoi inviare una segnalazione a EquipRegistry.",
      registryId: "ID registro",
      important: "Importante",
      importantText:
        "Non tentare di intervenire, recuperare o confrontare nessuna parte. Segnalare un avvistamento aiuta autorità e assicuratori ad agire.",
      nextTitle: "Cosa succede dopo la segnalazione",
      next: [
        "La tua segnalazione viene registrata in modo sicuro",
        "Vengono informati assicuratori o autorità competenti",
        "Nessun dato personale viene divulgato pubblicamente",
        "Potresti essere contattato per chiarimenti se necessario",
      ],
      back: "Torna alla ricerca",
    },
    authorities: {
      title: "Contatta le autorità",
      intro:
        "Flusso demo: mostra un percorso consigliato di contatto con le autorità per un allarme di attrezzatura rubata. Puoi facoltativamente condividere la tua posizione approssimativa (solo demo).",
      registryId: "ID registro",
      caseId: "ID caso",
      important: "Importante",
      importantText:
        "Se c’è pericolo immediato, chiama i servizi di emergenza. Non intervenire e non affrontare nessuno.",
      back: "Torna alla ricerca",
    },
    fallback: {
      title: "Azione EquipRegistry",
      intro:
        "Questa azione richiede un contesto aggiuntivo. Inizia da una ricerca per numero di serie o da un passaporto di registro.",
      back: "Torna alla ricerca",
    },
  },
  nl: {
    verify: {
      title: "Verificatie aanvragen",
      intro:
        "Verificatie bevestigt de legale herkomst en eigendomsgeschiedenis van geregistreerd equipment. Dit verlaagt fraude, verzekeringsrisico en compliance-onzekerheid.",
      registryId: "Registry ID",
      nextTitle: "Wat gebeurt hierna",
      steps: [
        "Log in als eigenaar van het equipment of als bevoegde partij",
        "Dien eigendoms- en herkomstdocumentatie in",
        "Een validatiepartner beoordeelt de case",
        "De registratiestatus wordt bijgewerkt na goedkeuring",
      ],
      login: "Inloggen om verder te gaan",
      back: "Terug naar zoeken",
    },
    register: {
      title: "Equipment registreren",
      intro:
        "Registratie van equipment creëert een officieel EquipRegistry-paspoort. Dit vormt een geverifieerde referentie voor eigendom, documentatie en verzekeringsvalidatie.",
      whoTitle: "Wie kan registreren",
      who: [
        "Eigenaren van equipment",
        "Geautoriseerde dealers of fabrikanten",
        "Verzekerings- of leasepartners (met mandaat)",
      ],
      includesTitle: "Registratie omvat",
      includes: [
        "Unieke registry ID",
        "Digitaal equipmentpaspoort",
        "Validatie van herkomst",
        "Insurance-ready statusreferentie",
      ],
      login: "Inloggen om registratie te starten",
      back: "Terug naar zoeken",
    },
    report: {
      title: "Waarneming melden",
      intro:
        "Als je denkt dat je equipment hebt geïdentificeerd dat als gestolen of verdacht is gemeld, kun je een waarnemingsmelding indienen bij EquipRegistry.",
      registryId: "Registry ID",
      important: "Belangrijk",
      importantText:
        "Probeer niet in te grijpen, iets terug te halen of iemand te confronteren. Een melding helpt autoriteiten en verzekeraars om passend te handelen.",
      nextTitle: "Wat gebeurt na de melding",
      next: [
        "Je melding wordt veilig vastgelegd",
        "Relevante verzekeraars of autoriteiten worden geïnformeerd",
        "Er worden geen persoonlijke gegevens openbaar gemaakt",
        "Je kunt worden benaderd voor verduidelijking indien nodig",
      ],
      back: "Terug naar zoeken",
    },
    authorities: {
      title: "Autoriteiten contacteren",
      intro:
        "Demo-flow: toont een aanbevolen route om autoriteiten te contacteren bij een alarm voor gestolen equipment. Je kunt optioneel je geschatte locatie delen (alleen demo).",
      registryId: "Registry ID",
      caseId: "Case ID",
      important: "Belangrijk",
      importantText:
        "Bel bij direct gevaar de hulpdiensten. Grijp niet in en confronteer niemand.",
      back: "Terug naar zoeken",
    },
    fallback: {
      title: "EquipRegistry actie",
      intro:
        "Deze actie vereist extra context. Begin vanaf een zoekopdracht op serienummer of registry-paspoort.",
      back: "Terug naar zoeken",
    },
  },
  pt: {
    verify: {
      title: "Solicitar verificação",
      intro:
        "A verificação confirma a origem legal e o histórico de propriedade do equipamento registado. Isto reduz fraude, risco de seguro e incerteza de conformidade.",
      registryId: "ID de registo",
      nextTitle: "O que acontece a seguir",
      steps: [
        "Inicie sessão como proprietário do equipamento ou parte autorizada",
        "Submeta a documentação de propriedade e origem",
        "Um parceiro de validação analisa o caso",
        "O estado do registo é atualizado após aprovação",
      ],
      login: "Iniciar sessão para continuar",
      back: "Voltar à pesquisa",
    },
    register: {
      title: "Registar equipamento",
      intro:
        "O registo de equipamento cria um passaporte oficial EquipRegistry. Isto estabelece uma referência verificada para propriedade, documentação e validação de seguros.",
      whoTitle: "Quem pode registar",
      who: [
        "Proprietários do equipamento",
        "Revendedores ou fabricantes autorizados",
        "Parceiros de seguros ou leasing (com mandato)",
      ],
      includesTitle: "O registo inclui",
      includes: [
        "ID de registo único",
        "Passaporte digital do equipamento",
        "Validação de proveniência",
        "Referência de estado preparada para seguros",
      ],
      login: "Iniciar sessão para começar o registo",
      back: "Voltar à pesquisa",
    },
    report: {
      title: "Reportar avistamento",
      intro:
        "Se acredita ter identificado equipamento reportado como roubado ou suspeito, pode submeter um relatório de avistamento ao EquipRegistry.",
      registryId: "ID de registo",
      important: "Importante",
      importantText:
        "Não tente intervir, recuperar ou confrontar qualquer parte. Reportar um avistamento ajuda autoridades e seguradoras a agir adequadamente.",
      nextTitle: "O que acontece após o relatório",
      next: [
        "O seu relatório é registado de forma segura",
        "As seguradoras ou autoridades relevantes são notificadas",
        "Nenhum dado pessoal é divulgado publicamente",
        "Poderá ser contactado para esclarecimentos se necessário",
      ],
      back: "Voltar à pesquisa",
    },
    authorities: {
      title: "Contactar autoridades",
      intro:
        "Fluxo demo: mostra uma rota recomendada de contacto com autoridades para um alerta de equipamento roubado. Pode opcionalmente partilhar a sua localização aproximada (apenas demo).",
      registryId: "ID de registo",
      caseId: "ID do caso",
      important: "Importante",
      importantText:
        "Se existir perigo imediato, ligue para os serviços de emergência. Não intervenha nem confronte ninguém.",
      back: "Voltar à pesquisa",
    },
    fallback: {
      title: "Ação EquipRegistry",
      intro:
        "Esta ação requer contexto adicional. Comece a partir de uma pesquisa por número de série ou passaporte de registo.",
      back: "Voltar à pesquisa",
    },
  },
};

export default async function ActionPage({ params, searchParams }: PageProps) {
  const { lang } = await params;
  const { type, registryId, caseId } = await searchParams;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const t = ACTION_TEXT[safeLang];

  const nextTarget = registryId
    ? `/${safeLang}/passport/${encodeURIComponent(registryId)}`
    : `/${safeLang}/dashboard`;

  const backToSearchHref = `/${safeLang}`;

  if (type === "verify") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.verify.title}</h1>

          <p style={styles.text}>{t.verify.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.verify.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.verify.nextTitle}</h3>
            <ul style={styles.list}>
              {t.verify.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div style={styles.actions}>
            <LoginRequiredButton
              lang={safeLang}
              next={nextTarget}
              label={t.verify.login}
              className="inline-block rounded-[10px] bg-[#1f4fd8] px-5 py-3 text-sm font-semibold text-white"
            />

            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.verify.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "register") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.register.title}</h1>

          <p style={styles.text}>{t.register.intro}</p>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.register.whoTitle}</h3>
            <ul style={styles.list}>
              {t.register.who.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.register.includesTitle}</h3>
            <ul style={styles.list}>
              {t.register.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.actions}>
            <LoginRequiredButton
              lang={safeLang}
              next={nextTarget}
              label={t.register.login}
              className="inline-block rounded-[10px] bg-[#1f4fd8] px-5 py-3 text-sm font-semibold text-white"
            />

            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.register.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "report") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.report.title}</h1>

          <p style={styles.text}>{t.report.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.report.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.warning}>
            <strong>{t.report.important}</strong>
            <p style={{ marginTop: 6 }}>{t.report.importantText}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{t.report.nextTitle}</h3>
            <ul style={styles.list}>
              {t.report.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ReportSightingClient lang={safeLang} />

          <div style={styles.actions}>
            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.report.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (type === "authorities") {
    const resolvedCaseId = caseId ?? "ER-CASE-2026-00123";

    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>{t.authorities.title}</h1>

          <p style={styles.text}>{t.authorities.intro}</p>

          {registryId && (
            <p style={styles.registryId}>
              {t.authorities.registryId}: <strong>{registryId}</strong>
            </p>
          )}

          <p style={styles.registryId}>
            {t.authorities.caseId}: <strong>{resolvedCaseId}</strong>
          </p>

          <AuthoritiesClient registryId={registryId} caseId={resolvedCaseId} />

          <div style={styles.warning}>
            <strong>{t.authorities.important}</strong>
            <p style={{ marginTop: 6 }}>{t.authorities.importantText}</p>
          </div>

          <div style={styles.actions}>
            <Link href={backToSearchHref} style={styles.secondaryButton}>
              {t.authorities.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t.fallback.title}</h1>

        <p style={styles.text}>{t.fallback.intro}</p>

        <Link href={backToSearchHref} style={styles.primaryButton}>
          {t.fallback.back}
        </Link>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },

  card: {
    maxWidth: 540,
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 1.6,
  },

  registryId: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 20,
  },

  warning: {
    border: "1px solid #fca5a5",
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 14,
    fontSize: 13,
    color: "#7f1d1d",
    marginBottom: 20,
  },

  section: {
    marginTop: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  list: {
    paddingLeft: 18,
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#1f4fd8",
    color: "#ffffff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#f1f5f9",
    color: "#1f2937",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
};