// app/[lang]/admin/page.tsx

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { requireAdmin } from "@/lib/auth/get-current-user";
import AdminLogoutButton from "@/components/auth/admin-logout-button";
import { prisma } from "@/lib/db";
import { normalizeRequestStatus } from "@/lib/registry/workflow";
import RequestStatusBadge from "@/components/registry/request-status-badge";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export const metadata: Metadata = {
  title: "Admin Dashboard | EquipRegistry",
  robots: {
    index: false,
    follow: false,
  },
};

function formatDate(date: Date, lang: Lang) {
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
  };

  return new Intl.DateTimeFormat(localeMap[lang], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

const PAGE_TEXT: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: {
      total: string;
      open: string;
      approved: string;
      issued: string;
    };
    table: {
      title: string;
      empty: string;
      columns: {
        reference: string;
        asset: string;
        owner: string;
        applicant: string;
        status: string;
        payment: string;
        updated: string;
      };
      paid: string;
      unpaid: string;
    };
    links: {
      website: string;
      userDashboard: string;
    };
  }
> = {
  en: {
    eyebrow: "EquipRegistry Admin",
    title: "Admin overview",
    subtitle: "Overview of all registration requests in the system.",
    cards: {
      total: "Total requests",
      open: "Open / active",
      approved: "Approved",
      issued: "Passport issued",
    },
    table: {
      title: "Latest registration requests",
      empty: "No registration requests found.",
      columns: {
        reference: "Reference",
        asset: "Asset",
        owner: "Owner",
        applicant: "Applicant",
        status: "Status",
        payment: "Payment",
        updated: "Updated",
      },
      paid: "Paid",
      unpaid: "Unpaid",
    },
    links: {
      website: "Back to website",
      userDashboard: "User dashboard",
    },
  },
  es: {
    eyebrow: "EquipRegistry Admin",
    title: "Resumen de administrador",
    subtitle: "Resumen de todas las solicitudes de registro del sistema.",
    cards: {
      total: "Solicitudes totales",
      open: "Abiertas / activas",
      approved: "Aprobadas",
      issued: "Pasaporte emitido",
    },
    table: {
      title: "Últimas solicitudes de registro",
      empty: "No se encontraron solicitudes de registro.",
      columns: {
        reference: "Referencia",
        asset: "Activo",
        owner: "Propietario",
        applicant: "Solicitante",
        status: "Estado",
        payment: "Pago",
        updated: "Actualizado",
      },
      paid: "Pagado",
      unpaid: "No pagado",
    },
    links: {
      website: "Volver al sitio",
      userDashboard: "Panel de usuario",
    },
  },
  de: {
    eyebrow: "EquipRegistry Admin",
    title: "Admin-Übersicht",
    subtitle: "Übersicht aller Registrierungsanfragen im System.",
    cards: {
      total: "Anfragen gesamt",
      open: "Offen / aktiv",
      approved: "Genehmigt",
      issued: "Pass ausgestellt",
    },
    table: {
      title: "Neueste Registrierungsanfragen",
      empty: "Keine Registrierungsanfragen gefunden.",
      columns: {
        reference: "Referenz",
        asset: "Asset",
        owner: "Eigentümer",
        applicant: "Antragsteller",
        status: "Status",
        payment: "Zahlung",
        updated: "Aktualisiert",
      },
      paid: "Bezahlt",
      unpaid: "Unbezahlt",
    },
    links: {
      website: "Zurück zur Website",
      userDashboard: "Benutzer-Dashboard",
    },
  },
  fr: {
    eyebrow: "EquipRegistry Admin",
    title: "Vue administrateur",
    subtitle:
      "Vue d’ensemble de toutes les demandes d’enregistrement du système.",
    cards: {
      total: "Demandes totales",
      open: "Ouvertes / actives",
      approved: "Approuvées",
      issued: "Passeport émis",
    },
    table: {
      title: "Dernières demandes d’enregistrement",
      empty: "Aucune demande d’enregistrement trouvée.",
      columns: {
        reference: "Référence",
        asset: "Actif",
        owner: "Propriétaire",
        applicant: "Demandeur",
        status: "Statut",
        payment: "Paiement",
        updated: "Mis à jour",
      },
      paid: "Payé",
      unpaid: "Non payé",
    },
    links: {
      website: "Retour au site",
      userDashboard: "Tableau de bord utilisateur",
    },
  },
  it: {
    eyebrow: "EquipRegistry Admin",
    title: "Panoramica admin",
    subtitle: "Panoramica di tutte le richieste di registrazione nel sistema.",
    cards: {
      total: "Richieste totali",
      open: "Aperte / attive",
      approved: "Approvate",
      issued: "Passaporto emesso",
    },
    table: {
      title: "Ultime richieste di registrazione",
      empty: "Nessuna richiesta di registrazione trovata.",
      columns: {
        reference: "Riferimento",
        asset: "Asset",
        owner: "Proprietario",
        applicant: "Richiedente",
        status: "Stato",
        payment: "Pagamento",
        updated: "Aggiornato",
      },
      paid: "Pagato",
      unpaid: "Non pagato",
    },
    links: {
      website: "Torna al sito",
      userDashboard: "Dashboard utente",
    },
  },
  nl: {
    eyebrow: "EquipRegistry Admin",
    title: "Admin overzicht",
    subtitle: "Overzicht van alle registratieaanvragen in het systeem.",
    cards: {
      total: "Totaal aanvragen",
      open: "Open / actief",
      approved: "Goedgekeurd",
      issued: "Paspoort uitgegeven",
    },
    table: {
      title: "Laatste registratieaanvragen",
      empty: "Geen registratieaanvragen gevonden.",
      columns: {
        reference: "Referentie",
        asset: "Asset",
        owner: "Eigenaar",
        applicant: "Aanvrager",
        status: "Status",
        payment: "Betaling",
        updated: "Bijgewerkt",
      },
      paid: "Betaald",
      unpaid: "Niet betaald",
    },
    links: {
      website: "Terug naar website",
      userDashboard: "Gebruikersdashboard",
    },
  },
  pt: {
    eyebrow: "EquipRegistry Admin",
    title: "Visão geral do admin",
    subtitle: "Visão geral de todos os pedidos de registo no sistema.",
    cards: {
      total: "Total de pedidos",
      open: "Abertos / ativos",
      approved: "Aprovados",
      issued: "Passaporte emitido",
    },
    table: {
      title: "Últimos pedidos de registo",
      empty: "Nenhum pedido de registo encontrado.",
      columns: {
        reference: "Referência",
        asset: "Ativo",
        owner: "Proprietário",
        applicant: "Requerente",
        status: "Estado",
        payment: "Pagamento",
        updated: "Atualizado",
      },
      paid: "Pago",
      unpaid: "Não pago",
    },
    links: {
      website: "Voltar ao site",
      userDashboard: "Painel do utilizador",
    },
  },
  ru: {
    eyebrow: "EquipRegistry Admin",
    title: "Обзор администратора",
    subtitle: "Обзор всех заявок на регистрацию в системе.",
    cards: {
      total: "Всего заявок",
      open: "Открытые / активные",
      approved: "Одобрено",
      issued: "Паспорт выдан",
    },
    table: {
      title: "Последние заявки на регистрацию",
      empty: "Заявки на регистрацию не найдены.",
      columns: {
        reference: "Ссылка",
        asset: "Актив",
        owner: "Владелец",
        applicant: "Заявитель",
        status: "Статус",
        payment: "Оплата",
        updated: "Обновлено",
      },
      paid: "Оплачено",
      unpaid: "Не оплачено",
    },
    links: {
      website: "Назад на сайт",
      userDashboard: "Панель пользователя",
    },
  },
  zh: {
    eyebrow: "EquipRegistry Admin",
    title: "管理员总览",
    subtitle: "系统内所有注册申请的总览。",
    cards: {
      total: "申请总数",
      open: "开放 / 活跃",
      approved: "已批准",
      issued: "护照已签发",
    },
    table: {
      title: "最新注册申请",
      empty: "未找到注册申请。",
      columns: {
        reference: "参考号",
        asset: "资产",
        owner: "所有者",
        applicant: "申请人",
        status: "状态",
        payment: "付款",
        updated: "更新日期",
      },
      paid: "已支付",
      unpaid: "未支付",
    },
    links: {
      website: "返回网站",
      userDashboard: "用户仪表板",
    },
  },
  hi: {
    eyebrow: "EquipRegistry Admin",
    title: "एडमिन ओवरव्यू",
    subtitle: "सिस्टम में सभी पंजीकरण अनुरोधों का अवलोकन।",
    cards: {
      total: "कुल अनुरोध",
      open: "खुले / सक्रिय",
      approved: "स्वीकृत",
      issued: "पासपोर्ट जारी",
    },
    table: {
      title: "नवीनतम पंजीकरण अनुरोध",
      empty: "कोई पंजीकरण अनुरोध नहीं मिला।",
      columns: {
        reference: "संदर्भ",
        asset: "एसेट",
        owner: "मालिक",
        applicant: "आवेदक",
        status: "स्थिति",
        payment: "भुगतान",
        updated: "अपडेट किया गया",
      },
      paid: "भुगतान किया गया",
      unpaid: "अवैतनिक",
    },
    links: {
      website: "वेबसाइट पर वापस जाएँ",
      userDashboard: "यूज़र डैशबोर्ड",
    },
  },
  ar: {
    eyebrow: "EquipRegistry Admin",
    title: "نظرة عامة للمشرف",
    subtitle: "نظرة عامة على جميع طلبات التسجيل في النظام.",
    cards: {
      total: "إجمالي الطلبات",
      open: "مفتوحة / نشطة",
      approved: "تمت الموافقة",
      issued: "تم إصدار الجواز",
    },
    table: {
      title: "أحدث طلبات التسجيل",
      empty: "لم يتم العثور على طلبات تسجيل.",
      columns: {
        reference: "المرجع",
        asset: "الأصل",
        owner: "المالك",
        applicant: "مقدم الطلب",
        status: "الحالة",
        payment: "الدفع",
        updated: "آخر تحديث",
      },
      paid: "مدفوع",
      unpaid: "غير مدفوع",
    },
    links: {
      website: "العودة إلى الموقع",
      userDashboard: "لوحة المستخدم",
    },
  },
};

export default async function AdminPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const text = PAGE_TEXT[currentLang] ?? PAGE_TEXT.en;

  const user = await requireAdmin();

  if (!user) {
    redirect(`/${lang}/secure-admin-access`);
  }

  const requests = await prisma.registrationRequest.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 25,
  });

  const totalCount = await prisma.registrationRequest.count({
    where: {
      deletedAt: null,
    },
  });

  const openCount = await prisma.registrationRequest.count({
    where: {
      deletedAt: null,
      requestStatus: {
        in: [
          "incomplete",
          "ready_for_submission",
          "payment_required",
          "submitted",
          "under_review",
          "more_info_required",
        ],
      },
    },
  });

  const approvedCount = await prisma.registrationRequest.count({
    where: {
      deletedAt: null,
      requestStatus: "approved",
    },
  });

  const issuedCount = await prisma.registrationRequest.count({
    where: {
      deletedAt: null,
      requestStatus: "passport_issued",
    },
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {text.eyebrow}
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
                {text.title}
              </h1>

              <p className="mt-3 text-sm text-neutral-600">
                {text.subtitle}
              </p>

              <p className="mt-3 text-sm text-neutral-600">
                {user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${lang}/dashboard`}
                className="inline-flex rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
              >
                {text.links.userDashboard}
              </Link>

              <Link
                href={`/${lang}/`}
                className="inline-flex rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-100"
              >
                {text.links.website}
              </Link>

              <AdminLogoutButton lang={lang} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-500">{text.cards.total}</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {totalCount}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-500">{text.cards.open}</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {openCount}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-500">{text.cards.approved}</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {approvedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-500">{text.cards.issued}</p>
              <p className="mt-2 text-3xl font-semibold text-neutral-900">
                {issuedCount}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                {text.table.title}
              </h2>
            </div>

            {requests.length === 0 ? (
              <div className="px-6 py-6 text-sm text-neutral-600">
                {text.table.empty}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.reference}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.asset}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.owner}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.applicant}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.status}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.payment}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {text.table.columns.updated}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-200 bg-white">
                    {requests.map((item) => {
                      const normalizedStatus = normalizeRequestStatus(
                        item.requestStatus
                      );

                      return (
                        <tr key={item.id}>
                          <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                            {item.reference}
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            <div className="font-medium text-neutral-900">
                              {item.assetName}
                            </div>
                            <div className="text-neutral-500">
                              {item.category} / {item.subcategory}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            <div className="font-medium text-neutral-900">
                              {item.ownerName}
                            </div>
                            <div className="text-neutral-500">
                              {item.ownerEmail}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            <div className="font-medium text-neutral-900">
                              {item.user?.name || "—"}
                            </div>
                            <div className="text-neutral-500">
                              {item.user?.email || "—"}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            <RequestStatusBadge
                              status={normalizedStatus}
                              lang={lang}
                            />
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            {item.paymentCompleted
                              ? text.table.paid
                              : text.table.unpaid}
                          </td>

                          <td className="px-6 py-4 text-sm text-neutral-700">
                            {formatDate(item.updatedAt, currentLang)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}