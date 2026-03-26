// lib/registry/categories.ts

export type RegistryCategoryKey =
  | "industry"
  | "vehicles"
  | "machines"
  | "agriculture"
  | "construction"
  | "marine"
  | "energy"
  | "other";

export type RegistrySubcategory = {
  value: string;
  label: string;
};

export type RegistryCategory = {
  value: RegistryCategoryKey;
  label: string;
  subcategories: RegistrySubcategory[];
};

export const REGISTRY_CATEGORIES: RegistryCategory[] = [
  {
    value: "industry",
    label: "Industry",
    subcategories: [
      { value: "generator", label: "Generator" },
      { value: "compressor", label: "Compressor" },
      { value: "pump", label: "Pump" },
      { value: "welding_equipment", label: "Welding Equipment" },
      { value: "industrial_cleaner", label: "Industrial Cleaner" },
      { value: "air_treatment_unit", label: "Air Treatment Unit" },
      { value: "other_industry", label: "Other Industry Equipment" },
    ],
  },
  {
    value: "vehicles",
    label: "Vehicles",
    subcategories: [
      { value: "passenger_car", label: "Passenger Car" },
      { value: "van", label: "Van" },
      { value: "truck", label: "Truck" },
      { value: "trailer", label: "Trailer" },
      { value: "motorcycle", label: "Motorcycle" },
      { value: "bus", label: "Bus" },
      { value: "special_vehicle", label: "Special Vehicle" },
      { value: "other_vehicle", label: "Other Vehicle" },
    ],
  },
  {
    value: "machines",
    label: "Machines",
    subcategories: [
      { value: "excavator", label: "Excavator" },
      { value: "wheel_loader", label: "Wheel Loader" },
      { value: "bulldozer", label: "Bulldozer" },
      { value: "forklift", label: "Forklift" },
      { value: "telehandler", label: "Telehandler" },
      { value: "roller", label: "Roller" },
      { value: "crane", label: "Crane" },
      { value: "other_machine", label: "Other Machine" },
    ],
  },
  {
    value: "agriculture",
    label: "Agriculture",
    subcategories: [
      { value: "tractor", label: "Tractor" },
      { value: "harvester", label: "Harvester" },
      { value: "sprayer", label: "Sprayer" },
      { value: "plough", label: "Plough" },
      { value: "baler", label: "Baler" },
      { value: "other_agriculture", label: "Other Agricultural Equipment" },
    ],
  },
  {
    value: "construction",
    label: "Construction",
    subcategories: [
      { value: "concrete_mixer", label: "Concrete Mixer" },
      { value: "scissor_lift", label: "Scissor Lift" },
      { value: "boom_lift", label: "Boom Lift" },
      { value: "compactor", label: "Compactor" },
      { value: "site_generator", label: "Site Generator" },
      { value: "other_construction", label: "Other Construction Equipment" },
    ],
  },
  {
    value: "marine",
    label: "Marine",
    subcategories: [
      { value: "jet_ski", label: "Jet Ski" },
      { value: "work_boat", label: "Work Boat" },
      { value: "outboard_engine", label: "Outboard Engine" },
      { value: "trailerable_boat", label: "Trailerable Boat" },
      { value: "other_marine", label: "Other Marine Equipment" },
    ],
  },
  {
    value: "energy",
    label: "Energy",
    subcategories: [
      { value: "battery_system", label: "Battery System" },
      { value: "solar_unit", label: "Solar Unit" },
      { value: "transformer", label: "Transformer" },
      { value: "power_module", label: "Power Module" },
      { value: "other_energy", label: "Other Energy Equipment" },
    ],
  },
  {
    value: "other",
    label: "Other",
    subcategories: [
      { value: "other_asset", label: "Other Asset" },
    ],
  },
];

export function getCategoryByValue(value?: string | null) {
  if (!value) return null;
  return REGISTRY_CATEGORIES.find((category) => category.value === value) ?? null;
}

export function getSubcategoriesByCategory(value?: string | null) {
  return getCategoryByValue(value)?.subcategories ?? [];
}