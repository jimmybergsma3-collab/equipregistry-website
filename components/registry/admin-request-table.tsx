import RequestStatusBadge from "@/components/registry/request-status-badge";
import AdminRequestRowActions from "@/components/registry/admin-request-row-actions";
import { RegistrationRequestSummary } from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import {
  getCategoryByValue,
  getSubcategoriesByCategory,
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
    paymentPending: "Pending",
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
    paymentPending: "Pendiente",
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
    paymentPending: "Ausstehend",
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
    paymentPending: "En attente",
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
    paymentPending: "In attesa",
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
      asset: "Asset",
      applicant: "Aanvrager",
      status: "Status",
      payment: "Betaling",
      completeness: "Volledigheid",
      updated: "Bijgewerkt",
      actions: "Acties",
    },
    paymentPaid: "Betaald",
    paymentPending: "In afwachting",
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
    paymentPending: "Pendente",
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
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getStatusDotClass(status: RegistrationRequestSummary["requestStatus"]) {
  switch (status) {
    case "passport_issued":
    case "approved":
      return "bg-emerald-500";
    case "under_review":
    case "more_info_required":
    case "payment_required":
      return "bg-amber-500";
    case "rejected":
      return "bg-red-500";
    case "submitted":
      return "bg-blue-500";
    default:
      return "bg-zinc-400";
  }
}

export default function AdminRequestTable({ lang, requests }: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const text = TABLE_TEXT[safeLang];

  if (requests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">{text.emptyTitle}</h2>
        <p className="mt-2 text-sm text-zinc-600">{text.emptyDescription}</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">{text.sectionTitle}</h2>
        <p className="mt-1 text-sm text-zinc-600">{text.sectionDescription}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.reference}
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
                {text.columns.payment}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.completeness}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.updated}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {text.columns.actions}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {requests.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-900">{item.reference}</div>
                  <div className="mt-1 text-zinc-600">{item.ownerName}</div>
                  <div className="text-zinc-500">{item.ownerEmail}</div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-900">{item.assetName}</div>
                  <div className="text-zinc-500">
                    {getCategoryByValue(item.category, safeLang)?.label ??
                      item.category}{" "}
                    /{" "}
                    {getSubcategoriesByCategory(item.category, safeLang).find(
                      (subcategory) => subcategory.value === item.subcategory
                    )?.label ?? item.subcategory}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {getLocalizedApplicantTypeLabel(item.applicantType, safeLang)}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block size-2.5 rounded-full ${getStatusDotClass(
                        item.requestStatus
                      )}`}
                      aria-hidden="true"
                    />
                    <RequestStatusBadge status={item.requestStatus} lang={lang} />
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.paymentCompleted
                    ? text.paymentPaid
                    : text.paymentPending}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.completeness.score}%
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {formatDateForLang(item.updatedAt, safeLang)}
                </td>

                <td className="px-6 py-4">
                  <AdminRequestRowActions
                    registrationId={item.id}
                    lang={lang}
                    requestStatus={item.requestStatus}
                    paymentCompleted={item.paymentCompleted}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
