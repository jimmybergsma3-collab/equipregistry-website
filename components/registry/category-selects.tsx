"use client";

import { useEffect, useMemo } from "react";
import {
  getRegistryCategories,
  getSubcategoriesByCategory,
} from "@/lib/registry/categories";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
  category: string;
  subcategory: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  categoryError?: string;
  subcategoryError?: string;
};

const TEXT: Record<
  Lang,
  {
    category: string;
    subcategory: string;
    selectCategory: string;
    selectSubcategory: string;
    chooseCategoryFirst: string;
  }
> = {
  en: {
    category: "Category",
    subcategory: "Subcategory",
    selectCategory: "Select a category",
    selectSubcategory: "Select a subcategory",
    chooseCategoryFirst: "Choose category first",
  },
  es: {
    category: "Categoría",
    subcategory: "Subcategoría",
    selectCategory: "Seleccione una categoría",
    selectSubcategory: "Seleccione una subcategoría",
    chooseCategoryFirst: "Primero elija una categoría",
  },
  de: {
    category: "Kategorie",
    subcategory: "Unterkategorie",
    selectCategory: "Kategorie auswählen",
    selectSubcategory: "Unterkategorie auswählen",
    chooseCategoryFirst: "Zuerst Kategorie wählen",
  },
  fr: {
    category: "Catégorie",
    subcategory: "Sous-catégorie",
    selectCategory: "Sélectionnez une catégorie",
    selectSubcategory: "Sélectionnez une sous-catégorie",
    chooseCategoryFirst: "Choisissez d’abord une catégorie",
  },
  it: {
    category: "Categoria",
    subcategory: "Sottocategoria",
    selectCategory: "Seleziona una categoria",
    selectSubcategory: "Seleziona una sottocategoria",
    chooseCategoryFirst: "Scegli prima una categoria",
  },
  nl: {
    category: "Categorie",
    subcategory: "Subcategorie",
    selectCategory: "Selecteer een categorie",
    selectSubcategory: "Selecteer een subcategorie",
    chooseCategoryFirst: "Kies eerst een categorie",
  },
  pt: {
    category: "Categoria",
    subcategory: "Subcategoria",
    selectCategory: "Selecione uma categoria",
    selectSubcategory: "Selecione uma subcategoria",
    chooseCategoryFirst: "Escolha primeiro uma categoria",
  },
  ru: {
    category: "Категория",
    subcategory: "Подкатегория",
    selectCategory: "Выберите категорию",
    selectSubcategory: "Выберите подкатегорию",
    chooseCategoryFirst: "Сначала выберите категорию",
  },
  zh: {
    category: "类别",
    subcategory: "子类别",
    selectCategory: "选择类别",
    selectSubcategory: "选择子类别",
    chooseCategoryFirst: "请先选择类别",
  },
  hi: {
    category: "श्रेणी",
    subcategory: "उपश्रेणी",
    selectCategory: "एक श्रेणी चुनें",
    selectSubcategory: "एक उपश्रेणी चुनें",
    chooseCategoryFirst: "पहले श्रेणी चुनें",
  },
  ar: {
    category: "الفئة",
    subcategory: "الفئة الفرعية",
    selectCategory: "اختر فئة",
    selectSubcategory: "اختر فئة فرعية",
    chooseCategoryFirst: "اختر الفئة أولاً",
  },
};

export default function CategorySelects({
  lang,
  category,
  subcategory,
  onCategoryChange,
  onSubcategoryChange,
  categoryError,
  subcategoryError,
}: Props) {
  const text = TEXT[lang];

  const categories = useMemo(() => getRegistryCategories(lang), [lang]);

  const subcategories = useMemo(
    () => getSubcategoriesByCategory(category, lang),
    [category, lang]
  );

  useEffect(() => {
    if (!subcategory) return;

    const stillValid = subcategories.some((item) => item.value === subcategory);

    if (!stillValid) {
      onSubcategoryChange("");
    }
  }, [subcategory, subcategories, onSubcategoryChange]);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-medium text-zinc-900"
        >
          {text.category} <span className="text-red-600">*</span>
        </label>

        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={[
            "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
            categoryError
              ? "border-red-300 ring-1 ring-red-200"
              : "border-zinc-300 focus:border-zinc-900",
          ].join(" ")}
        >
          <option value="">{text.selectCategory}</option>
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {categoryError ? (
          <p className="mt-2 text-sm text-red-600">{categoryError}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="subcategory"
          className="mb-2 block text-sm font-medium text-zinc-900"
        >
          {text.subcategory} <span className="text-red-600">*</span>
        </label>

        <select
          id="subcategory"
          name="subcategory"
          value={subcategory}
          onChange={(e) => onSubcategoryChange(e.target.value)}
          disabled={!category}
          className={[
            "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500",
            subcategoryError
              ? "border-red-300 ring-1 ring-red-200"
              : "border-zinc-300 focus:border-zinc-900",
          ].join(" ")}
        >
          <option value="">
            {category ? text.selectSubcategory : text.chooseCategoryFirst}
          </option>

          {subcategories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {subcategoryError ? (
          <p className="mt-2 text-sm text-red-600">{subcategoryError}</p>
        ) : null}
      </div>
    </div>
  );
}