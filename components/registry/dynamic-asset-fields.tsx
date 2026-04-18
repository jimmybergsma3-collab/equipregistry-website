"use client";

import { getDynamicFieldsForCategory } from "@/lib/registry/asset-fields";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
  category: string;
  subcategory: string;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
};

const TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    addEntry: string;
    remove: string;
    listHint: string;
  }
> = {
  en: {
    title: "Category-specific details",
    subtitle:
      "Additional fields are shown based on the selected asset category and subcategory.",
    addEntry: "Add entry",
    remove: "Remove",
    listHint: "Add as many identifiers as needed for this asset.",
  },
  es: {
    title: "Detalles especificos de la categoria",
    subtitle:
      "Se muestran campos adicionales segun la categoria y subcategoria seleccionadas.",
    addEntry: "Anadir valor",
    remove: "Eliminar",
    listHint: "Anada tantos identificadores como necesite para este activo.",
  },
  de: {
    title: "Kategoriespezifische Angaben",
    subtitle:
      "Zusatzfelder werden anhand der gewahlten Kategorie und Unterkategorie angezeigt.",
    addEntry: "Eintrag hinzufugen",
    remove: "Entfernen",
    listHint: "Fugen Sie so viele Kennungen hinzu, wie fur dieses Asset benotigt werden.",
  },
  fr: {
    title: "Details propres a la categorie",
    subtitle:
      "Des champs supplementaires s'affichent selon la categorie et la sous-categorie choisies.",
    addEntry: "Ajouter une valeur",
    remove: "Supprimer",
    listHint: "Ajoutez autant d'identifiants que necessaire pour cet actif.",
  },
  it: {
    title: "Dettagli specifici della categoria",
    subtitle:
      "Vengono mostrati campi aggiuntivi in base alla categoria e sottocategoria selezionate.",
    addEntry: "Aggiungi valore",
    remove: "Rimuovi",
    listHint: "Aggiungi tutti gli identificativi necessari per questo asset.",
  },
  nl: {
    title: "Categorie-specifieke details",
    subtitle:
      "Aanvullende velden worden getoond op basis van de gekozen categorie en subcategorie.",
    addEntry: "Waarde toevoegen",
    remove: "Verwijderen",
    listHint: "Voeg zoveel identificaties toe als nodig is voor dit asset.",
  },
  pt: {
    title: "Detalhes especificos da categoria",
    subtitle:
      "Sao apresentados campos adicionais conforme a categoria e subcategoria selecionadas.",
    addEntry: "Adicionar valor",
    remove: "Remover",
    listHint: "Adicione todos os identificadores necessarios para este ativo.",
  },
  ru: {
    title: "Dopolnitelnyye dannyye po kategorii",
    subtitle:
      "Dopolnitelnyye polya zavisyat ot vybrannoy kategorii i podkategorii.",
    addEntry: "Dobavit znachenie",
    remove: "Udalit",
    listHint: "Dobavte stolko identifikatorov, skolko nuzhno dlya etogo aktiva.",
  },
  zh: {
    title: "Leibie xiangguan xinxi",
    subtitle: "Ewai ziduan hui genju suo xuan leibie he zileibie xianshi.",
    addEntry: "Tianjia",
    remove: "Shanchu",
    listHint: "Ke an xu wei gai zican tianjia duo ge bianhao.",
  },
  hi: {
    title: "Category-specific details",
    subtitle:
      "Selected category aur subcategory ke hisab se extra fields dikhaye jate hain.",
    addEntry: "Add entry",
    remove: "Remove",
    listHint: "Is asset ke liye jitne identifiers chahiye utne jod sakte hain.",
  },
  ar: {
    title: "Tafasil khasah bialfiea",
    subtitle:
      "Tuzhar huqul idafiah hasab alfiea walfiea alfareiah almukhtarah.",
    addEntry: "Idafat qima",
    remove: "Hazf",
    listHint: "Add as many identifiers as needed for this asset.",
  },

  pl: {
    title: "Szczegoly zalezne od kategorii",
    subtitle:
      "Dodatkowe pola sa wyswietlane na podstawie wybranej kategorii i podkategorii assetu.",
    addEntry: "Dodaj wpis",
    remove: "Usun",
    listHint: "Dodaj tyle identyfikatorow, ile potrzeba dla tego assetu.",
  },
  sv: {
    title: "Kategorispecifika detaljer",
    subtitle:
      "Ytterligare falt visas baserat pa vald kategori och underkategori for asseten.",
    addEntry: "Lagg till post",
    remove: "Ta bort",
    listHint: "Lagg till sa manga identifierare som behovs for denna asset.",
  },
  da: {
    title: "Kategorispecifikke detaljer",
    subtitle:
      "Yderligere felter vises ud fra den valgte kategori og underkategori for assetet.",
    addEntry: "Tilfoj post",
    remove: "Fjern",
    listHint: "Tilfoj sa mange identifikatorer som nodvendigt for dette asset.",
  },
  no: {
    title: "Kategorispesifikke detaljer",
    subtitle:
      "Ekstra felt vises basert pa valgt kategori og underkategori for assetet.",
    addEntry: "Legg til post",
    remove: "Fjern",
    listHint: "Legg til sa mange identifikatorer som trengs for dette assetet.",
  },};

function toStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toListValue(value: unknown) {
  if (!Array.isArray(value)) {
    return [""];
  }

  const cleaned = value.map((item) => String(item ?? ""));

  return cleaned.length > 0 ? cleaned : [""];
}

export default function DynamicAssetFields({
  lang,
  category,
  subcategory,
  values,
  onChange,
}: Props) {
  const text = TEXT[lang];
  const fields = getDynamicFieldsForCategory(category, subcategory, lang);

  if (!category || fields.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-zinc-900">{text.title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{text.subtitle}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          if (field.type === "list") {
            const entries = toListValue(values[field.key]);
            const canAddMore = !field.maxItems || entries.length < field.maxItems;

            return (
              <div key={field.key} className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-900">
                  {field.label}
                  {field.required ? <span className="text-red-600"> *</span> : null}
                </label>

                <div className="space-y-2">
                  {entries.map((entry, index) => (
                    <div key={`${field.key}-${index}`} className="flex gap-2">
                      <input
                        type="text"
                        value={entry}
                        onChange={(event) => {
                          const next = [...entries];
                          next[index] = event.target.value;
                          onChange(field.key, next);
                        }}
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const next = entries.filter((_, itemIndex) => itemIndex !== index);
                          onChange(field.key, next.length > 0 ? next : []);
                        }}
                        className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50"
                      >
                        {text.remove}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {canAddMore ? (
                    <button
                      type="button"
                      onClick={() => onChange(field.key, [...entries, ""])}
                      className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
                    >
                      {text.addEntry}
                    </button>
                  ) : null}

                  <p className="text-xs text-zinc-500">{text.listHint}</p>
                </div>
              </div>
            );
          }

          return (
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
                type="text"
                value={toStringValue(values[field.key])}
                onChange={(event) => onChange(field.key, event.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
