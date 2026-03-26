// lib/registry/asset-fields.ts

export type AssetFieldDefinition = {
  key: string;
  label: string;
  placeholder?: string;
  required: boolean;
};

const CATEGORY_DYNAMIC_FIELDS: Record<string, AssetFieldDefinition[]> = {
  Vehicles: [
    {
      key: "vin",
      label: "VIN / Chassis Number",
      placeholder: "Enter VIN or chassis number",
      required: true,
    },
    {
      key: "registrationNumber",
      label: "Registration Number",
      placeholder: "Enter registration number",
      required: false,
    },
    {
      key: "fuelType",
      label: "Fuel Type",
      placeholder: "Diesel, Petrol, Electric...",
      required: false,
    },
  ],
  Machines: [
    {
      key: "operatingWeight",
      label: "Operating Weight",
      placeholder: "Enter operating weight",
      required: false,
    },
    {
      key: "engineSerialNumber",
      label: "Engine Serial Number",
      placeholder: "Enter engine serial number",
      required: false,
    },
    {
      key: "chassisNumber",
      label: "Chassis Number",
      placeholder: "Enter chassis number",
      required: true,
    },
  ],
  Industry: [
    {
      key: "unitType",
      label: "Unit Type",
      placeholder: "Enter unit type",
      required: true,
    },
    {
      key: "internalReference",
      label: "Internal Reference",
      placeholder: "Enter internal reference",
      required: false,
    },
  ],
};

export function getDynamicFieldsForCategory(
  category: string
): AssetFieldDefinition[] {
  return CATEGORY_DYNAMIC_FIELDS[category] ?? [];
}

export function getRequiredDynamicFieldKeys(category: string): string[] {
  return getDynamicFieldsForCategory(category)
    .filter((field) => field.required)
    .map((field) => field.key);
}