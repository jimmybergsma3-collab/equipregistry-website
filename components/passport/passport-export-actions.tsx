"use client";

import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang | string;
};

export default function PassportExportActions({ lang }: Props) {
  const safeLang = isValidLang(lang) ? (lang as Lang) : "en";
  const dictionary = getDictionary(safeLang);

  function handleExport() {
    window.print();
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2 print:hidden">
      <button
        type="button"
        onClick={handleExport}
        className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
      >
        {dictionary.common.print}
      </button>

      <button
        type="button"
        onClick={handleExport}
        className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
      >
        {dictionary.common.downloadPdf}
      </button>
    </div>
  );
}
