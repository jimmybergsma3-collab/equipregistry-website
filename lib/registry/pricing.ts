export type AssetPricingCategory =
  | "light_mobility_step"
  | "bike"
  | "standard_vehicle"
  | "heavy_asset";

export const PRICING = {
  light_mobility_step: {
    registration: 4.95,
    yearly: 1.95,
  },
  bike: {
    registration: 9.95,
    yearly: 2.95,
  },
  standard_vehicle: {
    registration: 19.95,
    yearly: 4.95,
  },
  heavy_asset: {
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

const LIGHT_MOBILITY_SUBCATEGORIES = new Set([
  "electric scooter",
  "moped / light mobility",
  "patinete electrico",
  "ciclomotor / movilidad ligera",
  "elektrische step",
  "brommer / lichte mobiliteit",
  "electric_scooter",
  "scooter",
]);

const BIKE_SUBCATEGORIES = new Set([
  "bicycle",
  "e-bike",
  "cargo bike",
  "bicicleta",
  "fiets",
  "bakfiets",
  "ebike",
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
    return "light_mobility_step";
  }

  if (BIKE_SUBCATEGORIES.has(normalizedSubcategory)) {
    return "bike";
  }

  if (normalizedCategory === "bikes") {
    return "bike";
  }

  if (
    normalizedCategory === "vehicles" ||
    normalizedCategory === "trailers" ||
    normalizedCategory === "vehicle" ||
    normalizedCategory === "trailer"
  ) {
    return "standard_vehicle";
  }

  return "heavy_asset";
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
