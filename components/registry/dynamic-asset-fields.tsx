// components/registry/dynamic-asset-fields.tsx

"use client";

import { getCategoryDependentFields } from "@/lib/registry/asset-fields";

type Props = {
  category: string;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export default function DynamicAssetFields({
  category,
  values,
  onChange,
}: Props) {
  const fields = getCategoryDependentFields(category);

  if (!category || fields.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-zinc-900">
          Category-specific details
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          Additional fields are shown based on the selected asset category.
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
              type={field.type}
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