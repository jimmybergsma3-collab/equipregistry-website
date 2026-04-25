import RequestStatusBadge from "@/components/registry/request-status-badge";
import AdminRequestRowActions from "@/components/registry/admin-request-row-actions";
import { RegistrationRequestSummary } from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import {
  getCategoryByValue,
  getSubcategoryByValue,
} from "@/lib/registry/categories";
import {
  formatDateForLang,
  getLocalizedApplicantTypeLabel,
} from "@/lib/i18n/registry-display";

type AdminRegistrationRequest = RegistrationRequestSummary & {
  ownerName: string;
  ownerEmail: string;
};

type Props = {
  lang: string;
  requests: AdminRegistrationRequest[];
};

const TABLE_TEXT: Record<
  Lang,
  {
    emptyTitle: string;
    emptyDescription: string;
    sectionTitle: string;
    sectionDescription: string;
    columns: {
      reference: string;
      asset: string;
      applicant: string;
      status: string;
      payment: string;
      completeness: string;
      updated: string;
      actions: string;
    };
    paymentPaid: string;
    paymentPending: string;
  }
> = {
  en: {
    emptyTitle: "Registration requests",
    emptyDescription: "No registrations match the current admin view.",
    sectionTitle: "Registration requests",
    sectionDescription:
      "Review, approve, request more information, confirm payment, or delete registrations directly from the overview.",
    columns: {
      reference: "Reference",
      asset: "Asset",
      applicant: "Applicant",
      status: "Status",
      payment: "Payment",
      completeness: "Completeness",
      updated: "Updated",
      actions: "Actions",
    },
    paymentPaid: "Paid",
    paymentPending: "Not completed",
  },
  es: {
    emptyTitle: "Solicitudes de registro",
    emptyDescription:
      "No hay registros que coincidan con la vista administrativa actual.",
    sectionTitle: "Solicitudes de registro",
    sectionDescription:
      "Revise, apruebe, solicite mas informacion, confirme pagos o elimine registros directamente desde el resumen.",
    columns: {
      reference: "Referencia",
      asset: "Activo",
      applicant: "Solicitante",
      status: "Estado",
      payment: "Pago",
      completeness: "Completitud",
      updated: "Actualizado",
      actions: "Acciones",
    },
    paymentPaid: "Pagado",
    paymentPending: "No completado",
  },
  de: {
    emptyTitle: "Registrierungsanfragen",
    emptyDescription:
      "Es gibt keine Registrierungen fuer die aktuelle Admin-Ansicht.",
    sectionTitle: "Registrierungsanfragen",
    sectionDescription:
      "Pruefen, genehmigen, weitere Informationen anfordern, Zahlungen bestaetigen oder Registrierungen direkt aus der Uebersicht loeschen.",
    columns: {
      reference: "Referenz",
      asset: "Asset",
      applicant: "Antragsteller",
      status: "Status",
      payment: "Zahlung",
      completeness: "Vollstaendigkeit",
      updated: "Aktualisiert",
      actions: "Aktionen",
    },
    paymentPaid: "Bezahlt",
    paymentPending: "Nicht abgeschlossen",
  },
  fr: {
    emptyTitle: "Demandes d'enregistrement",
    emptyDescription:
      "Aucun enregistrement ne correspond a la vue d'administration actuelle.",
    sectionTitle: "Demandes d'enregistrement",
    sectionDescription:
      "Examinez, approuvez, demandez plus d'informations, confirmez les paiements ou supprimez des enregistrements directement depuis la vue d'ensemble.",
    columns: {
      reference: "Reference",
      asset: "Actif",
      applicant: "Demandeur",
      status: "Statut",
      payment: "Paiement",
      completeness: "Completude",
      updated: "Mis a jour",
      actions: "Actions",
    },
    paymentPaid: "Paye",
    paymentPending: "Non finalise",
  },
  it: {
    emptyTitle: "Richieste di registrazione",
    emptyDescription:
      "Nessuna registrazione corrisponde alla vista amministrativa corrente.",
    sectionTitle: "Richieste di registrazione",
    sectionDescription:
      "Rivedi, approva, richiedi piu informazioni, conferma pagamenti o elimina registrazioni direttamente dalla panoramica.",
    columns: {
      reference: "Riferimento",
      asset: "Asset",
      applicant: "Richiedente",
      status: "Stato",
      payment: "Pagamento",
      completeness: "Completezza",
      updated: "Aggiornato",
      actions: "Azioni",
    },
    paymentPaid: "Pagato",
    paymentPending: "Non completato",
  },
  nl: {
    emptyTitle: "Registratieaanvragen",
    emptyDescription:
      "Geen registraties komen overeen met de huidige adminweergave.",
    sectionTitle: "Registratieaanvragen",
    sectionDescription:
      "Beoordeel, keur goed, vraag meer informatie op, bevestig betalingen of verwijder registraties direct vanuit het overzicht.",
    columns: {
      reference: "Referentie",
      asset: "Object",
      applicant: "Aanvrager",
      status: "Status",
      payment: "Betaling",
      completeness: "Volledigheid",
      updated: "Bijgewerkt",
      actions: "Acties",
    },
    paymentPaid: "Betaald",
    paymentPending: "Niet voltooid",
  },
  pt: {
    emptyTitle: "Pedidos de registo",
    emptyDescription:
      "Nenhum registo corresponde a vista administrativa atual.",
    sectionTitle: "Pedidos de registo",
    sectionDescription:
      "Reveja, aprove, solicite mais informacao, confirme pagamentos ou elimine registos diretamente a partir da visao geral.",
    columns: {
      reference: "Referencia",
      asset: "Ativo",
      applicant: "Requerente",
      status: "Estado",
      payment: "Pagamento",
      completeness: "Completude",
      updated: "Atualizado",
      actions: "Acoes",
    },
    paymentPaid: "Pago",
    paymentPending: "Nao concluido",
  },
  ru: {
    emptyTitle: "Заявки на регистрацию",
    emptyDescription:
      "Нет регистраций, соответствующих текущему административному представлению.",
    sectionTitle: "Заявки на регистрацию",
    sectionDescription:
      "Проверяйте, одобряйте, запрашивайте дополнительную информацию, подтверждайте оплату или удаляйте регистрации прямо из обзора.",
    columns: {
      reference: "Референс",
      asset: "Актив",
      applicant: "Заявитель",
      status: "Статус",
      payment: "Оплата",
      completeness: "Полнота",
      updated: "Обновлено",
      actions: "Действия",
    },
    paymentPaid: "Оплачено",
    paymentPending: "Ожидает",
  },
  zh: {
    emptyTitle: "注册请求",
    emptyDescription: "当前管理视图下没有匹配的注册记录。",
    sectionTitle: "注册请求",
    sectionDescription:
      "可直接在总览中审核、批准、请求更多信息、确认付款或删除注册。",
    columns: {
      reference: "参考编号",
      asset: "资产",
      applicant: "申请人",
      status: "状态",
      payment: "付款",
      completeness: "完整度",
      updated: "更新日期",
      actions: "操作",
    },
    paymentPaid: "已付款",
    paymentPending: "待处理",
  },
  hi: {
    emptyTitle: "पंजीकरण अनुरोध",
    emptyDescription:
      "वर्तमान एडमिन दृश्य से मेल खाने वाले कोई पंजीकरण नहीं हैं।",
    sectionTitle: "पंजीकरण अनुरोध",
    sectionDescription:
      "अवलोकन से सीधे समीक्षा करें, स्वीकृत करें, अधिक जानकारी मांगें, भुगतान पुष्टि करें या पंजीकरण हटाएं।",
    columns: {
      reference: "संदर्भ",
      asset: "एसेट",
      applicant: "आवेदक",
      status: "स्थिति",
      payment: "भुगतान",
      completeness: "पूर्णता",
      updated: "अपडेट",
      actions: "कार्रवाई",
    },
    paymentPaid: "भुगतान किया गया",
    paymentPending: "लंबित",
  },
  ar: {
    emptyTitle: "طلبات التسجيل",
    emptyDescription: "لا توجد تسجيلات تطابق عرض الإدارة الحالي.",
    sectionTitle: "طلبات التسجيل",
    sectionDescription:
      "راجع ووافق واطلب مزيدًا من المعلومات وأكد الدفع أو احذف التسجيلات مباشرة من النظرة العامة.",
    columns: {
      reference: "المرجع",
      asset: "الأصل",
      applicant: "مقدم الطلب",
      status: "الحالة",
      payment: "الدفع",
      completeness: "الاكتمال",
      updated: "آخر تحديث",
      actions: "الإجراءات",
    },
    paymentPaid: "مدفوع",
    paymentPending: "قيد الانتظار",
  },

  pl: {
    emptyTitle: "Wnioski rejestracyjne",
    emptyDescription: "Brak rejestracji pasujacych do biezacego widoku administratora.",
    sectionTitle: "Wnioski rejestracyjne",
    sectionDescription:
      "Weryfikuj, zatwierdzaj, pros o dodatkowe informacje, potwierdzaj platnosc lub usuwaj rejestracje bezposrednio z przegladu.",
    columns: {
      reference: "Referencja",
      asset: "Aktywo",
      applicant: "Wnioskodawca",
      status: "Status",
      payment: "Platnosc",
      completeness: "Kompletnosc",
      updated: "Zaktualizowano",
      actions: "Akcje",
    },
    paymentPaid: "Oplacono",
    paymentPending: "Nie zakonczono",
  },
  sv: {
    emptyTitle: "Registreringsforfragningar",
    emptyDescription: "Inga registreringar matchar den aktuella adminvyn.",
    sectionTitle: "Registreringsforfragningar",
    sectionDescription:
      "Granska, godkann, begar mer information, bekrafta betalningar eller radera registreringar direkt fran oversikten.",
    columns: {
      reference: "Referens",
      asset: "Tillgang",
      applicant: "Sokande",
      status: "Status",
      payment: "Betalning",
      completeness: "Komplettering",
      updated: "Uppdaterad",
      actions: "Atgarder",
    },
    paymentPaid: "Betald",
    paymentPending: "Inte slutford",
  },
  da: {
    emptyTitle: "Registreringsanmodninger",
    emptyDescription: "Ingen registreringer matcher den aktuelle adminvisning.",
    sectionTitle: "Registreringsanmodninger",
    sectionDescription:
      "Gennemga, godkend, anmod om flere oplysninger, bekraeft betalinger eller slet registreringer direkte fra oversigten.",
    columns: {
      reference: "Reference",
      asset: "Aktiv",
      applicant: "Ansoger",
      status: "Status",
      payment: "Betaling",
      completeness: "Fuldstaendighed",
      updated: "Opdateret",
      actions: "Handlinger",
    },
    paymentPaid: "Betalt",
    paymentPending: "Ikke afsluttet",
  },
  no: {
    emptyTitle: "Registreringsforesporsler",
    emptyDescription: "Ingen registreringer samsvarer med den gjeldende adminvisningen.",
    sectionTitle: "Registreringsforesporsler",
    sectionDescription:
      "Gjennomga, godkjenn, be om mer informasjon, bekreft betalinger eller slett registreringer direkte fra oversikten.",
    columns: {
      reference: "Referanse",
      asset: "Aktiv",
      applicant: "Soker",
      status: "Status",
      payment: "Betaling",
      completeness: "Fullstendighet",
      updated: "Oppdatert",
      actions: "Handlinger",
    },
    paymentPaid: "Betalt",
    paymentPending: "Ikke fullfort",
  },};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function AdminRequestTable({ lang, requests }: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = TABLE_TEXT[safeLang];

  if (requests.length === 0) {
    return (
      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-zinc-900">{text.emptyTitle}</h2>
        <p className="mt-1 text-sm text-zinc-600">{text.emptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-3.5 py-2">
        <h2 className="text-sm font-semibold text-zinc-900">{text.sectionTitle}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="w-[12rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.reference}
              </th>
              <th className="w-[20rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.asset}
              </th>
              <th className="w-[7rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.applicant}
              </th>
              <th className="w-[10rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.status}
              </th>
              <th className="w-[6rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.completeness}
              </th>
              <th className="w-[7rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.updated}
              </th>
              <th className="w-[16rem] px-2.5 py-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.actions}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {requests.map((item) => {
              const displayStatus = item.displayStatus ?? item.requestStatus;
              const rowClassName =
                displayStatus === "stolen_pending_review"
                  ? "align-top bg-amber-50/60 hover:bg-amber-100/50"
                  : "align-top hover:bg-zinc-50/60";

              return (
              <tr key={item.id} className={rowClassName}>
                <td className="px-2.5 py-2 text-sm text-zinc-700">
                  <div className="whitespace-nowrap font-mono text-[13px] font-semibold tracking-tight text-zinc-950">
                    {item.reference}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] font-medium text-zinc-700">
                    {item.ownerName}
                  </div>
                  <div className="truncate text-[10px] text-zinc-500">
                    {item.ownerEmail}
                  </div>
                </td>

                <td className="px-2.5 py-2 text-sm text-zinc-700">
                  <div className="truncate font-medium text-zinc-900">
                    {item.assetName}
                  </div>
                  <div className="truncate text-[10px] text-zinc-500">
                    {getCategoryByValue(item.category, safeLang)?.label ??
                      item.category}{" "}
                    /{" "}
                    {getSubcategoryByValue(
                      item.category,
                      item.subcategory,
                      safeLang
                    )?.label ?? item.subcategory}
                  </div>
                </td>

                <td className="px-2.5 py-2 text-[11px] text-zinc-700 whitespace-nowrap">
                  <span className="inline-block truncate align-top">
                    {getLocalizedApplicantTypeLabel(item.applicantType, safeLang)}
                  </span>
                </td>

                <td className="px-2.5 py-2 text-sm text-zinc-700">
                  <div className="whitespace-nowrap">
                    <RequestStatusBadge
                      status={displayStatus}
                      lang={lang}
                      compact
                    />
                  </div>
                </td>

                <td className="px-2.5 py-2 text-[11px] font-medium tabular-nums text-zinc-700 whitespace-nowrap">
                  {item.completeness.score}%
                </td>

                <td className="px-2.5 py-2 text-[11px] tabular-nums text-zinc-600 whitespace-nowrap">
                  {formatDateForLang(item.updatedAt, safeLang)}
                </td>

                <td className="px-2.5 py-2">
                  <AdminRequestRowActions
                    registrationId={item.id}
                    lang={lang}
                    requestStatus={item.requestStatus}
                  />
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
