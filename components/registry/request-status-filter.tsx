"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getRequestStatusLabel } from "@/lib/registry/workflow";

type Props = {
  lang: string;
  currentStatus: string;
  currentReview: string;
};

const FILTERS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  { value: "payment_required", label: getRequestStatusLabel("payment_required") },
  { value: "submitted", label: getRequestStatusLabel("submitted") },
  { value: "under_review", label: getRequestStatusLabel("under_review") },
  { value: "approved", label: getRequestStatusLabel("approved") },
  { value: "passport_issued", label: getRequestStatusLabel("passport_issued") },
  { value: "rejected", label: getRequestStatusLabel("rejected") },
  { value: "more_info_required", label: getRequestStatusLabel("more_info_required") },
  { value: "draft", label: getRequestStatusLabel("draft") },
  { value: "incomplete", label: getRequestStatusLabel("incomplete") },
];

const REVIEW_TEXT = {
  en: {
    status: "Filter by status",
    review: "Review state",
    all: "All",
    reviewed: "Reviewed",
    notReviewed: "Not reviewed",
  },
  es: {
    status: "Filtrar por estado",
    review: "Estado de revision",
    all: "Todos",
    reviewed: "Revisados",
    notReviewed: "Sin revisar",
  },
  de: {
    status: "Nach Status filtern",
    review: "Pruefstatus",
    all: "Alle",
    reviewed: "Geprueft",
    notReviewed: "Nicht geprueft",
  },
  fr: {
    status: "Filtrer par statut",
    review: "Etat de revue",
    all: "Tous",
    reviewed: "Revus",
    notReviewed: "Non revus",
  },
  it: {
    status: "Filtra per stato",
    review: "Stato revisione",
    all: "Tutti",
    reviewed: "Revisionati",
    notReviewed: "Non revisionati",
  },
  nl: {
    status: "Filter op status",
    review: "Reviewstatus",
    all: "Alle",
    reviewed: "Beoordeeld",
    notReviewed: "Niet beoordeeld",
  },
  pt: {
    status: "Filtrar por estado",
    review: "Estado de revisao",
    all: "Todos",
    reviewed: "Revistos",
    notReviewed: "Nao revistos",
  },
  ru: {
    status: "Фильтр по статусу",
    review: "Статус проверки",
    all: "Все",
    reviewed: "Проверенные",
    notReviewed: "Не проверенные",
  },
  zh: {
    status: "按状态筛选",
    review: "审核状态",
    all: "全部",
    reviewed: "已审核",
    notReviewed: "未审核",
  },
  hi: {
    status: "स्थिति के अनुसार फ़िल्टर करें",
    review: "समीक्षा स्थिति",
    all: "सभी",
    reviewed: "समीक्षित",
    notReviewed: "असमीक्षित",
  },
  ar: {
    status: "تصفية حسب الحالة",
    review: "حالة المراجعة",
    all: "الكل",
    reviewed: "تمت المراجعة",
    notReviewed: "غير مراجع",
  },
} as const;

export default function RequestStatusFilter({
  lang,
  currentStatus,
  currentReview,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const text =
    REVIEW_TEXT[lang as keyof typeof REVIEW_TEXT] ?? REVIEW_TEXT.en;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  }

  function handleReviewChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("review");
    } else {
      params.set("review", value);
    }

    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="statusFilter"
          className="text-sm font-medium text-zinc-700"
        >
          {text.status}
        </label>

        <select
          id="statusFilter"
          value={currentStatus || "all"}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 sm:w-[240px]"
        >
          {FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.value === "all" ? text.all : filter.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="reviewFilter"
          className="text-sm font-medium text-zinc-700"
        >
          {text.review}
        </label>

        <select
          id="reviewFilter"
          value={currentReview || "all"}
          onChange={(e) => handleReviewChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 sm:w-[220px]"
        >
          <option value="all">{text.all}</option>
          <option value="reviewed">{text.reviewed}</option>
          <option value="not_reviewed">{text.notReviewed}</option>
        </select>
      </div>
    </div>
  );
}
