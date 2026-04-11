"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteRegistrationAsAdmin } from "@/app/[lang]/dashboard/registrations/[id]/actions";

type Props = {
  id: string;
  lang: string;
  label?: string;
  confirmText?: string;
  deletingText?: string;
  errorText?: string;
  admin?: boolean;
};

export default function DeleteRequestButton({
  id,
  lang,
  label = "Delete",
  confirmText = "Are you sure you want to delete this registration?",
  deletingText = "Deleting...",
  errorText = "Failed to delete registration.",
  admin = false,
}: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(confirmText);

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      if (admin) {
        const result = await deleteRegistrationAsAdmin(id, lang);

        if (!result.success) {
          throw new Error(result.message || errorText);
        }
      } else {
        const response = await fetch(`/api/register-request/${id}`, {
          method: "DELETE",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(data?.error || errorText);
        }
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : errorText);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={`${label} ${id}`}
      data-lang={lang}
    >
      {isDeleting ? deletingText : label}
    </button>
  );
}
