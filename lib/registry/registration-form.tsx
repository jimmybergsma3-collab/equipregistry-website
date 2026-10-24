"use client";

import { useMemo, useState } from "react";
import CategorySelects from "@/components/registry/category-selects";

type FormErrors = {
  assetName?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
};

export default function RegistrationForm() {
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const isReadyForSubmission = useMemo(() => {
    return (
      assetName.trim() !== "" &&
      category.trim() !== "" &&
      subcategory.trim() !== "" &&
      brand.trim() !== "" &&
      model.trim() !== "" &&
      serialNumber.trim() !== ""
    );
  }, [assetName, category, subcategory, brand, model, serialNumber]);

  function validate() {
    const nextErrors: FormErrors = {};

    if (!assetName.trim()) nextErrors.assetName = "Asset name is required.";
    if (!category.trim()) nextErrors.category = "Category is required.";
    if (!subcategory.trim()) nextErrors.subcategory = "Subcategory is required.";
    if (!brand.trim()) nextErrors.brand = "Brand is required.";
    if (!model.trim()) nextErrors.model = "Model is required.";
    if (!serialNumber.trim()) nextErrors.serialNumber = "Serial number is required.";

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    console.log("Registration form payload:", {
      assetName,
      category,
      subcategory,
      brand,
      model,
      serialNumber,
    });

    // volgende stap:
    // retail -> checkout
    // partner -> direct submit
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-zinc-900">Asset Details</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Complete all required fields before the registration can proceed.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="assetName"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Asset Name <span className="text-red-600">*</span>
            </label>
            <input
              id="assetName"
              name="assetName"
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="e.g. Opel Corsa 1.2 / Komatsu WA380"
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
                errors.assetName
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-zinc-300 focus:border-zinc-900",
              ].join(" ")}
            />
            {errors.assetName ? (
              <p className="mt-2 text-sm text-red-600">{errors.assetName}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <CategorySelects
            lang="en"
            category={category}
            subcategory={subcategory}
            onCategoryChange={(value) => {
              setCategory(value);
              setSubcategory("");
            }}
            onSubcategoryChange={setSubcategory}
            categoryError={errors.category}
            subcategoryError={errors.subcategory}
          />
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="brand"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Brand <span className="text-red-600">*</span>
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Opel / Komatsu"
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
                errors.brand
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-zinc-300 focus:border-zinc-900",
              ].join(" ")}
            />
            {errors.brand ? (
              <p className="mt-2 text-sm text-red-600">{errors.brand}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="model"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Model <span className="text-red-600">*</span>
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Corsa / WA380"
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
                errors.model
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-zinc-300 focus:border-zinc-900",
              ].join(" ")}
            />
            {errors.model ? (
              <p className="mt-2 text-sm text-red-600">{errors.model}</p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="serialNumber"
              className="mb-2 block text-sm font-medium text-zinc-900"
            >
              Serial Number / VIN <span className="text-red-600">*</span>
            </label>
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter serial number or VIN"
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition",
                errors.serialNumber
                  ? "border-red-300 ring-1 ring-red-200"
                  : "border-zinc-300 focus:border-zinc-900",
              ].join(" ")}
            />
            {errors.serialNumber ? (
              <p className="mt-2 text-sm text-red-600">{errors.serialNumber}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">
              Registration Readiness
            </h3>
            <p className="mt-1 text-sm text-zinc-600">
              Registration can only continue when all required data is complete.
            </p>
          </div>

          <span
            className={[
              "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
              isReadyForSubmission
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-amber-200 bg-amber-50 text-amber-700",
            ].join(" ")}
          >
            {isReadyForSubmission ? "Ready for submission" : "Incomplete"}
          </span>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Continue Registration
          </button>
        </div>
      </section>
    </form>
  );
}
