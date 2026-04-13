"use client";

import { useId, useMemo } from "react";
import type { Lang } from "@/lib/i18n/config";
import { getLocalizedCountryOptions } from "@/lib/i18n/countries";

type Props = {
  id: string;
  name?: string;
  lang: Lang;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
};

export default function SearchableCountrySelect({
  id,
  name,
  lang,
  value,
  placeholder,
  className,
  onChange,
}: Props) {
  const generatedId = useId();
  const listId = `${generatedId}-${id}-countries`;
  const options = useMemo(() => getLocalizedCountryOptions(lang), [lang]);

  return (
    <>
      <input
        id={id}
        name={name}
        type="text"
        list={listId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="country-name"
        className={className}
      />
      <datalist id={listId}>
        {options.map((option) => (
          <option key={option.code} value={option.name} />
        ))}
      </datalist>
    </>
  );
}
