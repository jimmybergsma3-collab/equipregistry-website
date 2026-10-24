export type AssetPricingCategory =
  | "light_mobility"
  | "vehicles"
  | "machines"
  | "agriculture"
  | "construction"
  | "marine"
  | "energy"
  | "industry";

export const PRICING = {
  light_mobility: {
    registration: 9.95,
    yearly: 2.95,
  },
  vehicles: {
    registration: 19.95,
    yearly: 4.95,
  },
  machines: {
    registration: 24.95,
    yearly: 6.95,
  },
  agriculture: {
    registration: 24.95,
    yearly: 6.95,
  },
  construction: {
    registration: 24.95,
    yearly: 6.95,
  },
  marine: {
    registration: 24.95,
    yearly: 6.95,
  },
  energy: {
    registration: 24.95,
    yearly: 6.95,
  },
  industry: {
    registration: 24.95,
    yearly: 6.95,
  },
} as const satisfies Record<
  AssetPricingCategory,
  {
    registration: number;
    yearly: number;
  }
>;

export const PRICING_SECTION_ORDER: AssetPricingCategory[] = [
  "light_mobility",
  "vehicles",
  "machines",
  "agriculture",
  "construction",
  "marine",
  "energy",
  "industry",
];

const LIGHT_MOBILITY_SUBCATEGORIES = new Set([
  "bicycle",
  "e-bike",
  "cargo bike",
  "bicicleta",
  "fiets",
  "bakfiets",
  "ebike",
  "electric scooter",
  "electric_scooter",
  "patinete electrico",
  "trottinette electrique",
  "trotinette eletrica",
  "elektrische step",
  "scooter electrique",
]);

function normalizeValue(value: string | undefined) {
  return value
    ?.trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") ?? "";
}

export function getPricingCategory(
  category: string,
  subcategory?: string
): AssetPricingCategory {
  const normalizedCategory = normalizeValue(category);
  const normalizedSubcategory = normalizeValue(subcategory);

  if (LIGHT_MOBILITY_SUBCATEGORIES.has(normalizedSubcategory)) {
    return "light_mobility";
  }

  if (
    normalizedCategory === "other" ||
    normalizedCategory === "bike" ||
    normalizedCategory === "bikes" ||
    normalizedCategory === "light mobility" ||
    normalizedCategory === "light_mobility" ||
    normalizedCategory === "bikelightmobility"
  ) {
    return LIGHT_MOBILITY_SUBCATEGORIES.has(normalizedSubcategory)
      ? "light_mobility"
      : "machines";
  }

  if (
    normalizedCategory === "vehicles" ||
    normalizedCategory === "trailers" ||
    normalizedCategory === "vehicle" ||
    normalizedCategory === "trailer"
  ) {
    return "vehicles";
  }

  if (normalizedCategory === "machines" || normalizedCategory === "equipment") {
    return "machines";
  }

  if (normalizedCategory === "agriculture") {
    return "agriculture";
  }

  if (normalizedCategory === "construction") {
    return "construction";
  }

  if (normalizedCategory === "marine") {
    return "marine";
  }

  if (normalizedCategory === "energy") {
    return "energy";
  }

  if (normalizedCategory === "industry" || normalizedCategory === "industrial") {
    return "industry";
  }

  return "machines";
}

export function getPricing(category: string, subcategory?: string) {
  return PRICING[getPricingCategory(category, subcategory)];
}

export function formatPricingAmount(amount: number, locale = "en") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
