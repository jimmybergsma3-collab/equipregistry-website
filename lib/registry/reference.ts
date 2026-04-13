type PassportReferenceCategory =
  | "light_mobility_step"
  | "bike"
  | "standard_vehicle"
  | "heavy_asset";

function padNumber(value: number, size: number) {
  return String(value).padStart(size, "0");
}

const PASSPORT_NUMBER_PREFIX: Record<PassportReferenceCategory, string> = {
  light_mobility_step: "ER-LM",
  bike: "ER-BK",
  standard_vehicle: "ER-SV",
  heavy_asset: "ER-HA",
};

const LIGHT_MOBILITY_STEP_SUBCATEGORIES = new Set([
  "electric scooter",
  "moped / light mobility",
  "patinete electrico",
  "ciclomotor / movilidad ligera",
  "elektrische step",
  "brommer / lichte mobiliteit",
  "electric_scooter",
  "trottinette electrique",
  "trotinette eletrica",
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

export function getPassportNumberCategory(
  category: string,
  subcategory?: string
): PassportReferenceCategory {
  const normalizedCategory = normalizeValue(category);
  const normalizedSubcategory = normalizeValue(subcategory);

  if (LIGHT_MOBILITY_STEP_SUBCATEGORIES.has(normalizedSubcategory)) {
    return "light_mobility_step";
  }

  if (
    BIKE_SUBCATEGORIES.has(normalizedSubcategory) ||
    normalizedCategory === "bikes" ||
    normalizedCategory === "bike"
  ) {
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

export function getPassportNumberPrefix(
  category: string,
  subcategory?: string
) {
  return PASSPORT_NUMBER_PREFIX[getPassportNumberCategory(category, subcategory)];
}

export function getPassportSequenceId(category: string, subcategory?: string) {
  return `registry-sequence:${getPassportNumberCategory(category, subcategory)}`;
}

export function generatePassportNumber(
  sequence: number,
  category: string,
  subcategory?: string
) {
  return `${getPassportNumberPrefix(category, subcategory)}-${padNumber(
    sequence,
    6
  )}`;
}
