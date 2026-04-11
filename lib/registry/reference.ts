import {
  getPricingCategory,
  type AssetPricingCategory,
} from "@/lib/registry/pricing";

function padNumber(value: number, size: number) {
  return String(value).padStart(size, "0");
}

const PASSPORT_NUMBER_PREFIX: Record<AssetPricingCategory, string> = {
  light_mobility_step: "ER-LM",
  bike: "ER-BK",
  standard_vehicle: "ER-SV",
  heavy_asset: "ER-HA",
};

export function getPassportNumberCategory(
  category: string,
  subcategory?: string
): AssetPricingCategory {
  return getPricingCategory(category, subcategory);
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
