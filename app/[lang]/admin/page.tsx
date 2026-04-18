import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { requireAdmin } from "@/lib/auth/get-current-user";
import AdminLogoutButton from "@/components/auth/admin-logout-button";
import AdminRequestTable from "@/components/registry/admin-request-table";
import { prisma } from "@/lib/db";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

type PageText = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: {
    total: string;
    open: string;
    approved: string;
    issued: string;
  };
  links: {
    website: string;
    userDashboard: string;
  };
};

export const metadata: Metadata = {
  title: "Admin Dashboard | EquipRegistry",
  robots: {
    index: false,
    follow: false,
  },
};

const DEFAULT_PAGE_TEXT: PageText = {
  eyebrow: "EquipRegistry Admin",
  title: "Admin overview",
  subtitle: "Overview of all registration requests in the system.",
  cards: {
    total: "Total requests",
    open: "Open / active",
    approved: "Approved incl. issued",
    issued: "Passport issued",
  },
  links: {
    website: "Back to website",
    userDashboard: "User dashboard",
  },
};

const PAGE_TEXT: Partial<Record<Lang, PageText>> = {
  en: DEFAULT_PAGE_TEXT,
  es: {
    eyebrow: "EquipRegistry Admin",
    title: "Resumen de administrador",
    subtitle: "Resumen de todas las solicitudes de registro del sistema.",
    cards: {
      total: "Solicitudes totales",
      open: "Abiertas / activas",
      approved: "Aprobadas incl. emitidas",
      issued: "Pasaporte emitido",
    },
    links: {
      website: "Volver al sitio",
      userDashboard: "Panel de usuario",
    },
  },
  de: {
    eyebrow: "EquipRegistry Admin",
    title: "Admin-Uebersicht",
    subtitle: "Uebersicht aller Registrierungsanfragen im System.",
    cards: {
      total: "Anfragen gesamt",
      open: "Offen / aktiv",
      approved: "Genehmigt inkl. ausgestellt",
      issued: "Pass ausgestellt",
    },
    links: {
      website: "Zurueck zur Website",
      userDashboard: "Benutzer-Dashboard",
    },
  },
  fr: {
    eyebrow: "Administration EquipRegistry",
    title: "Vue administrateur",
    subtitle: "Vue d'ensemble de toutes les demandes d'enregistrement du systeme.",
    cards: {
      total: "Demandes totales",
      open: "Ouvertes / actives",
      approved: "Approuvees incl. emises",
      issued: "Passeport emis",
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
      approved: "Approvate incl. emesse",
      issued: "Passaporto emesso",
    },
    links: {
      website: "Torna al sito",
      userDashboard: "Dashboard utente",
    },
  },
  nl: {
    eyebrow: "EquipRegistry Admin",
    title: "Adminoverzicht",
    subtitle: "Overzicht van alle registratieaanvragen in het systeem.",
    cards: {
      total: "Totaal aanvragen",
      open: "Open / actief",
      approved: "Goedgekeurd incl. uitgegeven",
      issued: "Paspoort uitgegeven",
    },
    links: {
      website: "Terug naar website",
      userDashboard: "Gebruikersdashboard",
    },
  },
  pt: {
    eyebrow: "Administracao EquipRegistry",
    title: "Visao geral do admin",
    subtitle: "Visao geral de todos os pedidos de registo no sistema.",
    cards: {
      total: "Total de pedidos",
      open: "Abertos / ativos",
      approved: "Aprovados incl. emitidos",
      issued: "Passaporte emitido",
    },
    links: {
      website: "Voltar ao site",
      userDashboard: "Painel do utilizador",
    },
  },

  pl: DEFAULT_PAGE_TEXT,
  sv: DEFAULT_PAGE_TEXT,
  da: DEFAULT_PAGE_TEXT,
  no: DEFAULT_PAGE_TEXT,
};

export default async function AdminPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const text = PAGE_TEXT[currentLang] ?? DEFAULT_PAGE_TEXT;

  const user = await requireAdmin();

  if (!user) {
    redirect(`/${lang}/secure-admin-access`);
  }

  const requests = await prisma.registrationRequest.findMany({
    where: {
      deletedAt: null,
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
      requestStatus: {
        in: ["approved", "passport_issued"],
      },
    },
  });

  const issuedCount = await prisma.registrationRequest.count({
    where: {
      deletedAt: null,
      requestStatus: "passport_issued",
    },
  });

  const mappedRequests = requests.map((item) => ({
    id: item.id,
    reference: item.reference,
    assetName: item.assetName,
    category: item.category,
    subcategory: item.subcategory,
    applicantType: item.applicantType,
    requestStatus: item.requestStatus,
    passportStatus: null,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    paymentCompleted: item.paymentCompleted,
    ownerName: item.ownerName,
    ownerEmail: item.ownerEmail,
    completeness: {
      isComplete: item.completenessScore === 100,
      missingFields: [],
      missingDocuments: [],
      missingDynamicFields: [],
      score: item.completenessScore,
    },
  }));

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="mx-auto max-w-[1400px] px-3 py-4 sm:px-4 lg:px-5">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {text.eyebrow}
              </p>

              <h1 className="mt-1.5 text-xl font-semibold text-neutral-900 sm:text-2xl">
                {text.title}
              </h1>

              <p className="mt-1.5 text-sm text-neutral-600">{text.subtitle}</p>
              <p className="mt-1 text-xs text-neutral-500">{user.email}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${lang}/dashboard`}
                className="inline-flex rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 sm:text-sm"
              >
                {text.links.userDashboard}
              </Link>

              <Link
                href={`/${lang}/`}
                className="inline-flex rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-100 sm:text-sm"
              >
                {text.links.website}
              </Link>

              <AdminLogoutButton lang={lang} />
            </div>
          </div>

          <div className="mt-4 grid gap-2.5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">{text.cards.total}</p>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {totalCount}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">{text.cards.open}</p>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {openCount}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">{text.cards.approved}</p>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {approvedCount}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">{text.cards.issued}</p>
              <p className="mt-1 text-xl font-semibold text-neutral-900">
                {issuedCount}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <AdminRequestTable lang={lang} requests={mappedRequests} />
          </div>
        </div>
      </section>
    </main>
  );
}
