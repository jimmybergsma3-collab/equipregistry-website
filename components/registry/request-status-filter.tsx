"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { RegistrationRequestStatus, getRequestStatusLabel } from "@/lib/registry/workflow";

type Props = {
  currentStatus: string;
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

export default function RequestStatusFilter({ currentStatus }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label
        htmlFor="statusFilter"
        className="text-sm font-medium text-zinc-700"
      >
        Filter by status
      </label>

      <select
        id="statusFilter"
        value={currentStatus || "all"}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 sm:w-[260px]"
      >
        {FILTERS.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
}