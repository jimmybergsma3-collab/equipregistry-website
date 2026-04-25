import Link from "next/link";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import {
  RegistrationRequestSummary,
  isVisibleInDashboard,
} from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import {
  formatDateForLang,
  getLocalizedApplicantTypeLabel,
} from "@/lib/i18n/registry-display";
import { getOfficialPassportNumber } from "@/lib/registry/reference";

type Props = {
  lang: string;
  requests: RegistrationRequestSummary[];
  detailBasePath?: string;
  showOnlyVisible?: boolean;
};

const TABLE_TEXT: Record<
  Lang,
  {
    emptyTitle: string;
    emptyDescription: string;
    sectionTitle: string;
    sectionDescription: string;
    columns: {
      passportNumber: string;
      asset: string;
      applicant: string;
      status: string;
      completeness: string;
      updated: string;
      action: string;
    };
    open: string;
    applicantTypes: Record<string, string>;
  }
> = {
  en: {
    emptyTitle: "Your registered assets",
    emptyDescription: "No active registration requests are visible yet.",
    sectionTitle: "Registration requests",
    sectionDescription:
      "Requests become visible in the dashboard once they move beyond draft.",
    columns: {
      passportNumber: "Passport Number",
      asset: "Object",
      applicant: "Applicant",
      status: "Status",
      completeness: "Completeness",
      updated: "Updated",
      action: "Action",
    },
    open: "Open",
    applicantTypes: {
      private: "Private",
      sme: "SME",
      insurer_partner: "Insurer",
      bank_partner: "Bank",
      dealer_partner: "Dealer",
      rental_partner: "Rental company",
    },
  },

  es: {
    emptyTitle: "Tus activos registrados",
    emptyDescription:
      "Todavía no hay solicitudes de registro activas visibles.",
    sectionTitle: "Solicitudes de registro",
    sectionDescription:
      "Las solicitudes aparecen en el panel cuando superan la fase de borrador.",
    columns: {
      passportNumber: "Número de pasaporte",
      asset: "Activo",
      applicant: "Solicitante",
      status: "Estado",
      completeness: "Completitud",
      updated: "Actualizado",
      action: "Acción",
    },
    open: "Abrir",
    applicantTypes: {
      private: "Privado",
      sme: "PyME",
      insurer_partner: "Aseguradora",
      bank_partner: "Banco",
      dealer_partner: "Concesionario",
      rental_partner: "Empresa de alquiler",
    },
  },

  de: {
    emptyTitle: "Ihre registrierten Vermögenswerte",
    emptyDescription:
      "Es sind noch keine aktiven Registrierungsanfragen sichtbar.",
    sectionTitle: "Registrierungsanfragen",
    sectionDescription:
      "Anfragen werden im Dashboard sichtbar, sobald sie über den Entwurfsstatus hinausgehen.",
    columns: {
      passportNumber: "Passnummer",
      asset: "Asset",
      applicant: "Antragsteller",
      status: "Status",
      completeness: "Vollständigkeit",
      updated: "Aktualisiert",
      action: "Aktion",
    },
    open: "Öffnen",
    applicantTypes: {
      private: "Privat",
      sme: "KMU",
      insurer_partner: "Versicherer",
      bank_partner: "Bank",
      dealer_partner: "Händler",
      rental_partner: "Vermietungsunternehmen",
    },
  },

  fr: {
    emptyTitle: "Vos actifs enregistrés",
    emptyDescription:
      "Aucune demande d’enregistrement active n’est encore visible.",
    sectionTitle: "Demandes d’enregistrement",
    sectionDescription:
      "Les demandes deviennent visibles dans le tableau de bord une fois qu’elles dépassent le statut de brouillon.",
    columns: {
      passportNumber: "Numéro de passeport",
      asset: "Actif",
      applicant: "Demandeur",
      status: "Statut",
      completeness: "Complétude",
      updated: "Mis à jour",
      action: "Action",
    },
    open: "Ouvrir",
    applicantTypes: {
      private: "Privé",
      sme: "PME",
      insurer_partner: "Assureur",
      bank_partner: "Banque",
      dealer_partner: "Concessionnaire",
      rental_partner: "Société de location",
    },
  },

  it: {
    emptyTitle: "I tuoi beni registrati",
    emptyDescription:
      "Non ci sono ancora richieste di registrazione attive visibili.",
    sectionTitle: "Richieste di registrazione",
    sectionDescription:
      "Le richieste diventano visibili nel dashboard quando superano la fase di bozza.",
    columns: {
      passportNumber: "Numero passaporto",
      asset: "Asset",
      applicant: "Richiedente",
      status: "Stato",
      completeness: "Completezza",
      updated: "Aggiornato",
      action: "Azione",
    },
    open: "Apri",
    applicantTypes: {
      private: "Privato",
      sme: "PMI",
      insurer_partner: "Assicuratore",
      bank_partner: "Banca",
      dealer_partner: "Rivenditore",
      rental_partner: "Società di noleggio",
    },
  },

  nl: {
    emptyTitle: "Jouw geregistreerde assets",
    emptyDescription:
      "Er zijn nog geen actieve registratieaanvragen zichtbaar.",
    sectionTitle: "Registratieaanvragen",
    sectionDescription:
      "Aanvragen worden zichtbaar in het dashboard zodra ze verder zijn dan concept.",
    columns: {
      passportNumber: "Paspoortnummer",
      asset: "Asset",
      applicant: "Aanvrager",
      status: "Status",
      completeness: "Volledigheid",
      updated: "Bijgewerkt",
      action: "Actie",
    },
    open: "Openen",
    applicantTypes: {
      private: "Particulier",
      sme: "MKB",
      insurer_partner: "Verzekeraar",
      bank_partner: "Bank",
      dealer_partner: "Dealer",
      rental_partner: "Verhuurbedrijf",
    },
  },

  pt: {
    emptyTitle: "Os seus ativos registados",
    emptyDescription:
      "Ainda não existem pedidos de registo ativos visíveis.",
    sectionTitle: "Pedidos de registo",
    sectionDescription:
      "Os pedidos tornam-se visíveis no painel quando ultrapassam a fase de rascunho.",
    columns: {
      passportNumber: "Número do passaporte",
      asset: "Ativo",
      applicant: "Requerente",
      status: "Estado",
      completeness: "Completude",
      updated: "Atualizado",
      action: "Ação",
    },
    open: "Abrir",
    applicantTypes: {
      private: "Privado",
      sme: "PME",
      insurer_partner: "Seguradora",
      bank_partner: "Banco",
      dealer_partner: "Concessionário",
      rental_partner: "Empresa de aluguer",
    },
  },

  ru: {
    emptyTitle: "Ваши зарегистрированные активы",
    emptyDescription:
      "Пока нет видимых активных заявок на регистрацию.",
    sectionTitle: "Заявки на регистрацию",
    sectionDescription:
      "Заявки становятся видимыми в панели после выхода из статуса черновика.",
    columns: {
      passportNumber: "Номер паспорта",
      asset: "Актив",
      applicant: "Заявитель",
      status: "Статус",
      completeness: "Полнота",
      updated: "Обновлено",
      action: "Действие",
    },
    open: "Открыть",
    applicantTypes: {
      private: "Частное лицо",
      sme: "МСП",
      insurer_partner: "Страховщик",
      bank_partner: "Банк",
      dealer_partner: "Дилер",
      rental_partner: "Арендная компания",
    },
  },

  zh: {
    emptyTitle: "您已注册的资产",
    emptyDescription: "目前还没有可见的有效注册申请。",
    sectionTitle: "注册申请",
    sectionDescription: "申请在脱离草稿阶段后会显示在仪表板中。",
    columns: {
      passportNumber: "护照编号",
      asset: "资产",
      applicant: "申请人",
      status: "状态",
      completeness: "完整度",
      updated: "更新日期",
      action: "操作",
    },
    open: "打开",
    applicantTypes: {
      private: "个人",
      sme: "中小企业",
      insurer_partner: "保险公司",
      bank_partner: "银行",
      dealer_partner: "经销商",
      rental_partner: "租赁公司",
    },
  },

  hi: {
    emptyTitle: "आपकी पंजीकृत संपत्तियाँ",
    emptyDescription:
      "अभी तक कोई सक्रिय पंजीकरण अनुरोध दिखाई नहीं दे रहे हैं।",
    sectionTitle: "पंजीकरण अनुरोध",
    sectionDescription:
      "ड्राफ्ट चरण से आगे बढ़ने पर अनुरोध डैशबोर्ड में दिखाई देते हैं।",
    columns: {
      passportNumber: "पासपोर्ट नंबर",
      asset: "एसेट",
      applicant: "आवेदक",
      status: "स्थिति",
      completeness: "पूर्णता",
      updated: "अपडेट किया गया",
      action: "कार्रवाई",
    },
    open: "खोलें",
    applicantTypes: {
      private: "निजी",
      sme: "एसएमई",
      insurer_partner: "बीमाकर्ता",
      bank_partner: "बैंक",
      dealer_partner: "डीलर",
      rental_partner: "किराया कंपनी",
    },
  },

  ar: {
    emptyTitle: "أصولك المسجلة",
    emptyDescription: "لا توجد طلبات تسجيل نشطة ظاهرة حتى الآن.",
    sectionTitle: "طلبات التسجيل",
    sectionDescription:
      "تظهر الطلبات في لوحة التحكم بمجرد تجاوزها مرحلة المسودة.",
    columns: {
      passportNumber: "رقم الجواز",
      asset: "الأصل",
      applicant: "مقدم الطلب",
      status: "الحالة",
      completeness: "الاكتمال",
      updated: "آخر تحديث",
      action: "الإجراء",
    },
    open: "فتح",
    applicantTypes: {
      private: "فردي",
      sme: "شركة صغيرة أو متوسطة",
      insurer_partner: "شركة تأمين",
      bank_partner: "بنك",
      dealer_partner: "تاجر",
      rental_partner: "شركة تأجير",
    },
  },

  pl: {
    emptyTitle: "Twoje zarejestrowane aktywa",
    emptyDescription: "Nie ma jeszcze widocznych aktywnych wnioskow rejestracyjnych.",
    sectionTitle: "Wnioski rejestracyjne",
    sectionDescription:
      "Wnioski staja sie widoczne w panelu, gdy wyjda poza etap wersji roboczej.",
    columns: {
      passportNumber: "Numer paszportu",
      asset: "Aktywo",
      applicant: "Wnioskodawca",
      status: "Status",
      completeness: "Kompletnosc",
      updated: "Zaktualizowano",
      action: "Akcja",
    },
    open: "Otworz",
    applicantTypes: {
      private: "Osoba prywatna",
      sme: "MSP",
      insurer_partner: "Ubezpieczyciel",
      bank_partner: "Bank",
      dealer_partner: "Dealer",
      rental_partner: "Firma wynajmujaca",
    },
  },
  sv: {
    emptyTitle: "Dina registrerade tillgangar",
    emptyDescription: "Inga aktiva registreringsforfragningar ar synliga an.",
    sectionTitle: "Registreringsforfragningar",
    sectionDescription:
      "Forfragningar blir synliga i dashboarden nar de gar forbi utkaststadiet.",
    columns: {
      passportNumber: "Passnummer",
      asset: "Objekt",
      applicant: "Sokande",
      status: "Status",
      completeness: "Komplettering",
      updated: "Uppdaterad",
      action: "Atgard",
    },
    open: "Oppna",
    applicantTypes: {
      private: "Privat",
      sme: "SMF",
      insurer_partner: "Forsakringsgivare",
      bank_partner: "Bank",
      dealer_partner: "Aterforsaljare",
      rental_partner: "Uthyrningsforetag",
    },
  },
  da: {
    emptyTitle: "Dine registrerede aktiver",
    emptyDescription: "Ingen aktive registreringsanmodninger er synlige endnu.",
    sectionTitle: "Registreringsanmodninger",
    sectionDescription:
      "Anmodninger bliver synlige i dashboardet, nar de gar ud over kladdestadiet.",
    columns: {
      passportNumber: "Pasnummer",
      asset: "Objekt",
      applicant: "Ansoger",
      status: "Status",
      completeness: "Fuldstaendighed",
      updated: "Opdateret",
      action: "Handling",
    },
    open: "Aabn",
    applicantTypes: {
      private: "Privat",
      sme: "SMV",
      insurer_partner: "Forsikringsselskab",
      bank_partner: "Bank",
      dealer_partner: "Forhandler",
      rental_partner: "Udlejningsfirma",
    },
  },
  no: {
    emptyTitle: "Dine registrerte aktiva",
    emptyDescription: "Ingen aktive registreringsforesporsler er synlige ennå.",
    sectionTitle: "Registreringsforesporsler",
    sectionDescription:
      "Foresporsler blir synlige i dashboardet nar de gar forbi utkaststadiet.",
    columns: {
      passportNumber: "Passnummer",
      asset: "Objekt",
      applicant: "Soker",
      status: "Status",
      completeness: "Fullstendighet",
      updated: "Oppdatert",
      action: "Handling",
    },
    open: "Apne",
    applicantTypes: {
      private: "Privat",
      sme: "SMB",
      insurer_partner: "Forsikringsselskap",
      bank_partner: "Bank",
      dealer_partner: "Forhandler",
      rental_partner: "Utleieselskap",
    },
  },
};

const DASHBOARD_TABLE_OVERRIDES: Record<
  Lang,
  Pick<
    (typeof TABLE_TEXT)[Lang],
    "emptyTitle" | "emptyDescription" | "sectionTitle" | "sectionDescription"
  >
> = {
  en: {
    emptyTitle: "Dashboard",
    emptyDescription: "No active registrations are visible yet.",
    sectionTitle: "My registrations",
    sectionDescription: "Registrations appear here as soon as they move beyond draft.",
  },
  es: {
    emptyTitle: "Panel",
    emptyDescription: "Todavia no hay registros activos visibles.",
    sectionTitle: "Mis registros",
    sectionDescription: "Los registros aparecen aqui cuando superan la fase de borrador.",
  },
  de: {
    emptyTitle: "Dashboard",
    emptyDescription: "Es sind noch keine aktiven Registrierungen sichtbar.",
    sectionTitle: "Meine Registrierungen",
    sectionDescription: "Registrierungen erscheinen hier, sobald sie den Entwurfsstatus verlassen.",
  },
  fr: {
    emptyTitle: "Tableau de bord",
    emptyDescription: "Aucun enregistrement actif n'est encore visible.",
    sectionTitle: "Mes enregistrements",
    sectionDescription: "Les enregistrements apparaissent ici une fois le statut brouillon depasse.",
  },
  it: {
    emptyTitle: "Dashboard",
    emptyDescription: "Non ci sono ancora registrazioni attive visibili.",
    sectionTitle: "Le mie registrazioni",
    sectionDescription: "Le registrazioni appaiono qui quando superano la fase di bozza.",
  },
  nl: {
    emptyTitle: "Dashboard",
    emptyDescription: "Er zijn nog geen actieve registraties zichtbaar.",
    sectionTitle: "Mijn registraties",
    sectionDescription: "Registraties verschijnen hier zodra ze verder zijn dan concept.",
  },
  pt: {
    emptyTitle: "Painel",
    emptyDescription: "Ainda nao existem registos ativos visiveis.",
    sectionTitle: "Os meus registos",
    sectionDescription: "Os registos aparecem aqui quando ultrapassam a fase de rascunho.",
  },
  ru: {
    emptyTitle: "Dashboard",
    emptyDescription: "Poka net vidimykh aktivnykh registratsiy.",
    sectionTitle: "Moi registratsii",
    sectionDescription: "Registratsii poyavlyayutsya zdes posle vykhoda iz statusa chernovika.",
  },
  zh: {
    emptyTitle: "Yibiao ban",
    emptyDescription: "Muqian hai meiyou kejian de huoyue zhuce.",
    sectionTitle: "Wo de zhuce",
    sectionDescription: "Zhuce zai likai caogao jieduan hou hui xianshi zai zheli.",
  },
  hi: {
    emptyTitle: "Dashboard",
    emptyDescription: "Abhi tak koi sakriya registrations dikhai nahin de rahi hain.",
    sectionTitle: "Meri registrations",
    sectionDescription: "Registrations yahan tab dikhai deti hain jab ve draft se aage badh jati hain.",
  },
  ar: {
    emptyTitle: "Dashboard",
    emptyDescription: "La tujad tasjilat nashita zahira hatta alaan.",
    sectionTitle: "Tasjilati",
    sectionDescription: "Tazhar altasjilat huna eind tajawuz marhalat almusawada.",
  },

  pl: {
    emptyTitle: "Panel",
    emptyDescription: "Nie ma jeszcze widocznych aktywnych rejestracji.",
    sectionTitle: "Moje rejestracje",
    sectionDescription: "Rejestracje pojawiaja sie tutaj, gdy wyjda poza etap wersji roboczej.",
  },
  sv: {
    emptyTitle: "Dashboard",
    emptyDescription: "Inga aktiva registreringar ar synliga an.",
    sectionTitle: "Mina registreringar",
    sectionDescription: "Registreringar visas har sa snart de gar forbi utkaststadiet.",
  },
  da: {
    emptyTitle: "Dashboard",
    emptyDescription: "Ingen aktive registreringer er synlige endnu.",
    sectionTitle: "Mine registreringer",
    sectionDescription: "Registreringer vises her, sa snart de gar ud over kladdestadiet.",
  },
  no: {
    emptyTitle: "Dashboard",
    emptyDescription: "Ingen aktive registreringer er synlige ennå.",
    sectionTitle: "Mine registreringer",
    sectionDescription: "Registreringer vises her sa snart de gar forbi utkaststadiet.",
  },
};

function formatDate(dateString: string, lang: Lang) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  const localeMap: Record<Lang, string> = {
    en: "en-GB",
    es: "es-ES",
    de: "de-DE",
    fr: "fr-FR",
    it: "it-IT",
    nl: "nl-NL",
    pt: "pt-PT",
    ru: "ru-RU",
    zh: "zh-CN",
    hi: "hi-IN",
    ar: "ar-SA",
  
    pl: "pl-PL",
    sv: "sv-SE",
    da: "da-DK",
    no: "nb-NO",
  };

  return new Intl.DateTimeFormat(localeMap[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getApplicantLabel(applicantType: string, lang: Lang) {
  const text = TABLE_TEXT[lang] ?? TABLE_TEXT.en;
  return text.applicantTypes[applicantType] ?? applicantType;
}

export default function DashboardRequestTable({
  lang,
  requests,
  detailBasePath,
  showOnlyVisible = true,
}: Props) {
  const currentLang = lang as Lang;
  const text = {
    ...(TABLE_TEXT[currentLang] ?? TABLE_TEXT.en),
    ...(DASHBOARD_TABLE_OVERRIDES[currentLang] ?? DASHBOARD_TABLE_OVERRIDES.en),
  };
  const detailPath = detailBasePath ?? `/${lang}/dashboard/registrations`;

  const visibleRequests = showOnlyVisible
    ? requests.filter((item) => isVisibleInDashboard(item.requestStatus))
    : requests;

  if (visibleRequests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          {text.emptyTitle}
        </h2>
        <p className="mt-2 text-sm text-zinc-600">{text.emptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          {text.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          {text.sectionDescription}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.passportNumber}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.asset}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.applicant}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.completeness}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.updated}
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.action}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {visibleRequests.map((item) => {
              const displayStatus = item.displayStatus ?? item.requestStatus;
              const officialPassportNumber = getOfficialPassportNumber(
                item.reference,
                item.category,
                item.subcategory
              );

              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                    <div>{officialPassportNumber}</div>
                    {officialPassportNumber !== item.reference ? (
                      <div className="mt-1 text-xs font-normal text-zinc-500">
                        {item.reference}
                      </div>
                    ) : null}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-700">
                    <div className="font-medium text-zinc-900">{item.assetName}</div>
                    <div className="text-zinc-500">
                      {getCategoryByValue(item.category, currentLang)?.label ??
                        item.category}{" "}
                      /{" "}
                      {getSubcategoryByValue(
                        item.category,
                        item.subcategory,
                        currentLang
                      )?.label ?? item.subcategory}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-700">
                    {getLocalizedApplicantTypeLabel(
                      item.applicantType,
                      currentLang
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-700">
                    <RequestStatusBadge status={displayStatus} lang={lang} />
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-700">
                    {item.completeness.score}%
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-700">
                    {formatDateForLang(item.updatedAt, currentLang)}
                  </td>

                  <td className="px-6 py-4 text-right text-sm">
                    <Link
                      href={`${detailPath}/${item.id}`}
                      className="font-medium text-zinc-900 underline underline-offset-4"
                    >
                      {text.open}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
