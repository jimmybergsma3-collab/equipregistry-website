import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RequestStatusFilter from "@/components/registry/request-status-filter";
import AdminRequestTable from "@/components/registry/admin-request-table";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { RegistrationRequestStatus } from "@/lib/registry/workflow";
import { isValidLang, type Lang } from "@/lib/i18n/config";
import { getLocalizedRequestStatusLabel } from "@/lib/i18n/registry-display";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    status?: string;
    review?: string;
  }>;
};

const ALLOWED_STATUSES: RegistrationRequestStatus[] = [
  "draft",
  "incomplete",
  "ready_for_submission",
  "payment_required",
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "more_info_required",
  "passport_issued",
];

const PAGE_TEXT: Record<
  Lang,
  {
    eyebrow: string;
    title: string;
    filteredByStatus: string;
    showingReviewed: string;
    showingNotReviewed: string;
    showingAll: string;
  }
> = {
  en: {
    eyebrow: "EquipRegistry Admin",
    title: "Registration management",
    filteredByStatus: "Showing registrations filtered by:",
    showingReviewed: "Showing reviewed registrations.",
    showingNotReviewed: "Showing registrations that still need review.",
    showingAll: "Showing all registrations across the current system view.",
  },
  es: {
    eyebrow: "Administracion EquipRegistry",
    title: "Gestion de registros",
    filteredByStatus: "Mostrando registros filtrados por:",
    showingReviewed: "Mostrando registros revisados.",
    showingNotReviewed: "Mostrando registros que aun requieren revision.",
    showingAll: "Mostrando todos los registros dentro de la vista actual del sistema.",
  },
  de: {
    eyebrow: "EquipRegistry Admin",
    title: "Registrierungsverwaltung",
    filteredByStatus: "Angezeigte Registrierungen gefiltert nach:",
    showingReviewed: "Es werden gepruefte Registrierungen angezeigt.",
    showingNotReviewed:
      "Es werden Registrierungen angezeigt, die noch geprueft werden muessen.",
    showingAll:
      "Es werden alle Registrierungen der aktuellen Systemansicht angezeigt.",
  },
  fr: {
    eyebrow: "Administration EquipRegistry",
    title: "Gestion des enregistrements",
    filteredByStatus: "Enregistrements filtres par :",
    showingReviewed: "Affichage des enregistrements examines.",
    showingNotReviewed:
      "Affichage des enregistrements qui necessitent encore une revision.",
    showingAll:
      "Affichage de tous les enregistrements dans la vue systeme actuelle.",
  },
  it: {
    eyebrow: "Amministrazione EquipRegistry",
    title: "Gestione registrazioni",
    filteredByStatus: "Registrazioni filtrate per:",
    showingReviewed: "Mostra le registrazioni revisionate.",
    showingNotReviewed:
      "Mostra le registrazioni che richiedono ancora revisione.",
    showingAll:
      "Mostra tutte le registrazioni nella vista di sistema corrente.",
  },
  nl: {
    eyebrow: "EquipRegistry Admin",
    title: "Registratiebeheer",
    filteredByStatus: "Registraties gefilterd op:",
    showingReviewed: "Beoordeelde registraties worden getoond.",
    showingNotReviewed:
      "Registraties die nog beoordeling nodig hebben worden getoond.",
    showingAll: "Alle registraties binnen de huidige systeemweergave worden getoond.",
  },
  pt: {
    eyebrow: "Administracao EquipRegistry",
    title: "Gestao de registos",
    filteredByStatus: "A mostrar registos filtrados por:",
    showingReviewed: "A mostrar registos revistos.",
    showingNotReviewed:
      "A mostrar registos que ainda necessitam de revisao.",
    showingAll:
      "A mostrar todos os registos na vista atual do sistema.",
  },
  ru: {
    eyebrow: "Администрирование EquipRegistry",
    title: "Управление регистрациями",
    filteredByStatus: "Показ регистраций с фильтром по статусу:",
    showingReviewed: "Показаны проверенные регистрации.",
    showingNotReviewed:
      "Показаны регистрации, которые еще требуют проверки.",
    showingAll:
      "Показаны все регистрации в рамках текущего системного представления.",
  },
  zh: {
    eyebrow: "EquipRegistry 管理",
    title: "注册管理",
    filteredByStatus: "按以下状态筛选注册：",
    showingReviewed: "显示已审核注册。",
    showingNotReviewed: "显示仍需审核的注册。",
    showingAll: "显示当前系统视图中的全部注册。",
  },
  hi: {
    eyebrow: "EquipRegistry एडमिन",
    title: "पंजीकरण प्रबंधन",
    filteredByStatus: "इस स्थिति के अनुसार पंजीकरण दिखाए जा रहे हैं:",
    showingReviewed: "समीक्षित पंजीकरण दिखाए जा रहे हैं।",
    showingNotReviewed:
      "वे पंजीकरण दिखाए जा रहे हैं जिन्हें अभी समीक्षा की आवश्यकता है।",
    showingAll: "वर्तमान सिस्टम दृश्य के सभी पंजीकरण दिखाए जा रहे हैं।",
  },
  ar: {
    eyebrow: "إدارة EquipRegistry",
    title: "إدارة التسجيلات",
    filteredByStatus: "عرض التسجيلات المصفاة حسب:",
    showingReviewed: "يتم عرض التسجيلات التي تمت مراجعتها.",
    showingNotReviewed:
      "يتم عرض التسجيلات التي ما زالت تحتاج إلى مراجعة.",
    showingAll: "يتم عرض جميع التسجيلات ضمن عرض النظام الحالي.",
  },

  pl: {
    eyebrow: "Administracja EquipRegistry",
    title: "Zarzadzanie rejestracjami",
    filteredByStatus: "Wyswietlanie rejestracji filtrowanych wedlug:",
    showingReviewed: "Wyswietlane sa zweryfikowane rejestracje.",
    showingNotReviewed: "Wyswietlane sa rejestracje, ktore nadal wymagaja weryfikacji.",
    showingAll: "Wyswietlane sa wszystkie rejestracje z biezacego widoku systemu.",
  },
  sv: {
    eyebrow: "EquipRegistry Admin",
    title: "Registreringshantering",
    filteredByStatus: "Visar registreringar filtrerade efter:",
    showingReviewed: "Visar granskade registreringar.",
    showingNotReviewed: "Visar registreringar som fortfarande behover granskas.",
    showingAll: "Visar alla registreringar i den aktuella systemvyn.",
  },
  da: {
    eyebrow: "EquipRegistry Admin",
    title: "Registreringsstyring",
    filteredByStatus: "Viser registreringer filtreret efter:",
    showingReviewed: "Viser gennemgaede registreringer.",
    showingNotReviewed: "Viser registreringer, der stadig skal gennemgas.",
    showingAll: "Viser alle registreringer i den aktuelle systemvisning.",
  },
  no: {
    eyebrow: "EquipRegistry Admin",
    title: "Registreringsadministrasjon",
    filteredByStatus: "Viser registreringer filtrert etter:",
    showingReviewed: "Viser gjennomgaatte registreringer.",
    showingNotReviewed: "Viser registreringer som fortsatt trenger gjennomgang.",
    showingAll: "Viser alle registreringer i den gjeldende systemvisningen.",
  },};

export default async function AdminRegistrationsPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;
  const { status, review } = await searchParams;

  if (!isValidLang(lang)) {
    notFound();
  }

  await requireAdminSession(lang);
  const safeLang = lang as Lang;
  const pageText = PAGE_TEXT[safeLang];
  const validStatus =
    status && ALLOWED_STATUSES.includes(status as RegistrationRequestStatus)
      ? (status as RegistrationRequestStatus)
      : null;
  const validReview =
    review === "reviewed" || review === "not_reviewed" ? review : "all";
  const reviewedStatuses: RegistrationRequestStatus[] = [
    "under_review",
    "approved",
    "rejected",
    "more_info_required",
    "passport_issued",
  ];

  const requests = await prisma.registrationRequest.findMany({
    where: {
      deletedAt: null,
      ...(validStatus
        ? {
            requestStatus: validStatus,
          }
        : validReview === "reviewed"
        ? {
            requestStatus: {
              in: reviewedStatuses,
            },
          }
        : validReview === "not_reviewed"
        ? {
            requestStatus: {
              notIn: reviewedStatuses,
            },
          }
        : {}),
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
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
    paymentCompleted: item.paymentCompleted,
    ownerName: item.ownerName,
    ownerEmail: item.ownerEmail,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    completeness: {
      isComplete: item.completenessScore === 100,
      missingFields: [],
      missingDocuments: [],
      missingDynamicFields: [],
      score: item.completenessScore,
    },
  }));

  return (
    <>
      <SiteHeader lang={lang} />

      <main
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white"
      >
        <div className="mx-auto max-w-[1400px] px-3 py-4 sm:px-4 lg:px-5">
          <div className="mb-4 flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                {pageText.eyebrow}
              </p>
              <h1 className="mt-1.5 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                {pageText.title}
              </h1>
              <p className="mt-1.5 text-sm text-zinc-600">
                {validStatus
                  ? `${pageText.filteredByStatus} ${getLocalizedRequestStatusLabel(
                      validStatus,
                      safeLang
                    )}`
                  : validReview === "reviewed"
                  ? pageText.showingReviewed
                  : validReview === "not_reviewed"
                  ? pageText.showingNotReviewed
                  : pageText.showingAll}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <RequestStatusFilter
                lang={lang}
                currentStatus={validStatus ?? "all"}
                currentReview={validReview}
              />
            </div>
          </div>

          <AdminRequestTable lang={lang} requests={mappedRequests} />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
