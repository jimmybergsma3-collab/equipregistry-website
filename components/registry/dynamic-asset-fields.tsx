"use client";

import { getDynamicFieldsForCategory } from "@/lib/registry/asset-fields";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
  category: string;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

const TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
  }
> = {
  en: {
    title: "Category-specific details",
    subtitle: "Additional fields are shown based on the selected asset category.",
  },
  es: {
    title: "Detalles específicos de la categoría",
    subtitle: "Se muestran campos adicionales según la categoría de activo seleccionada.",
  },
  de: {
    title: "Kategoriespezifische Angaben",
    subtitle: "Zusätzliche Felder werden je nach gewählter Asset-Kategorie angezeigt.",
  },
  fr: {
    title: "Détails spécifiques à la catégorie",
    subtitle: "Des champs supplémentaires s’affichent selon la catégorie d’actif sélectionnée.",
  },
  it: {
    title: "Dettagli specifici della categoria",
    subtitle: "Vengono mostrati campi aggiuntivi in base alla categoria di asset selezionata.",
  },
  nl: {
    title: "Categorie-specifieke details",
    subtitle: "Aanvullende velden worden getoond op basis van de gekozen assetcategorie.",
  },
  pt: {
    title: "Detalhes específicos da categoria",
    subtitle: "São apresentados campos adicionais com base na categoria de ativo selecionada.",
  },
};

export default function DynamicAssetFields({
  lang,
  category,
  values,
  onChange,
}: Props) {
  const text = TEXT[lang];
  const fields = getDynamicFieldsForCategory(category);

  if (!category || fields.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-zinc-900">
          {text.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          {text.subtitle}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              {field.label}
              {field.required ? <span className="text-red-600"> *</span> : null}
            </label>

            <input
              id={field.key}
              name={field.key}
              type="text"
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder ?? ""}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
            />
          </div>
        ))}
      </div>
    </section>
  );
}