"use client";

import { useEffect, useMemo } from "react";
import {
  REGISTRY_CATEGORIES,
  getSubcategoriesByCategory,
} from "@/lib/registry/categories";

type Props = {
  category: string;
  subcategory: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  categoryError?: string;
  subcategoryError?: string;
};

export default function CategorySelects({
  category,
  subcategory,
  onCategoryChange,
  onSubcategoryChange,
  categoryError,
  subcategoryError,
}: Props) {
  const subcategories = useMemo(
    () => getSubcategoriesByCategory(category),
    [category]
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
          Category <span className="text-red-600">*</span>
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
          <option value="">Select a category</option>
          {REGISTRY_CATEGORIES.map((item) => (
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
          Subcategory <span className="text-red-600">*</span>
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
            {category ? "Select a subcategory" : "Choose category first"}
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