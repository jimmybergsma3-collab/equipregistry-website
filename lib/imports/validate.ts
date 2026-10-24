import { getRegistryCategories } from "../registry/categories";
import { getDynamicFieldsForCategory } from "../registry/asset-fields";
import { getLocalizedCountryOptions } from "../i18n/countries";
import { fail, formulaText, unsafeText, type Cell, type Table } from "./contract";
import { checkMapping, type Mapping } from "./mapping";

export type ValidationProfile = { sourceSystem?: string; identifierType?: "SERIAL" | "VIN" | "FRAME" | "HIN";
  asOfYear: number; decimal: "." | ","; countryFormat?: "ISO_ALPHA2";
  countries?: Record<string, string>; units?: Record<string, string>; listSeparator?: "|" };
export type Issue = { code: string; field?: string };
export type Payload = { assetName: string; category: string; subcategory: string; brand: string | null; model: string | null;
  serialNumber: string | null; identifierType: string | null; sourceSystem: string | null; externalAssetKey: string | null;
  year: number | null; country: string | null; registryHint: string | null;
  dynamic: Record<string, string | string[] | { value: string; unit: string }> };
export type PreviewRow = { position: number; state: "INVALID" | "REVIEW" | "READY_FOR_PRIVATE_PREPARATION"; issues: Issue[]; payload: Payload };
const placeholder = /^(n\/?a|unknown|none|null|undefined|[-?]+|0+)$/i;
const identifierFields = new Set(["serialNumber", "externalAssetKey", "engineSerialNumber", "chassisNumber", "frameNumber", "secondBatterySerialNumber", "deviceId", "registrationNumber", "internalReference", "batchLotNumber", "registryHint"]);
export function validateRows(table: Table, mapping: Mapping, profile: ValidationProfile): PreviewRow[] {
  checkMapping(table, mapping);
  if (!profile || !Number.isInteger(profile.asOfYear) || profile.asOfYear < 1900 || profile.asOfYear > 9998 || ![".", ","].includes(profile.decimal) || profile.listSeparator && profile.listSeparator !== "|") fail("VALIDATION_PROFILE");
  if (profile.sourceSystem && (profile.sourceSystem.length > 80 || unsafeText(profile.sourceSystem) || formulaText(profile.sourceSystem))) fail("SOURCE_SYSTEM_INVALID");
  // The frozen registration picker contains 240 codes. Complete the ISO alpha-2
  // set locally, including territories, without changing the individual flow.
  // Source: https://unstats.un.org/unsd/methodology/m49/overview/ (ISO-alpha2 column).
  const countries = new Set([...getLocalizedCountryOptions("en").map(c => c.code), "AQ", "BV", "GS", "HM", "IO", "KP", "PN", "TF", "UM"]);
  const categories = getRegistryCategories("en");
  return table.rows.map(row => {
    const issues: Issue[] = [], values: Record<string, string> = Object.create(null), raw: Record<string, Cell> = Object.create(null);
    const issue = (code: string, field?: string) => { if (!issues.some(i => i.code === code && i.field === field)) issues.push({ code, ...(field ? { field } : {}) }); };
    for (const { column, target } of mapping) {
      const cell = row.cells[column], text = cell.text.normalize("NFC").trim();
      // Unsafe cells are never accepted merely because a column was ignored.
      if (unsafeText(cell.text) || formulaText(cell.text)) { issue("UNSAFE_CELL", target ?? undefined); continue; }
      if (!target) continue;
      raw[target] = cell;
      if (["boolean", "date", "error"].includes(cell.kind) && text) { issue("CELL_TYPE_REVIEW", target); continue; }
      if (identifierFields.has(target) && text && (cell.kind !== "text" || /^[0-9.]+e[+-]?[0-9]+$/i.test(text))) { issue("IDENTIFIER_PRECISION", target); continue; }
      if (text.length > 200 && !["solarPanelSerialNumbers", "batterySerialNumbers"].includes(target)) { issue("VALUE_LENGTH", target); continue; }
      values[target] = text;
    }
    for (const field of ["category", "subcategory", "assetName"]) if (!values[field]) issue("REQUIRED", field);
    if (!categories.some(c => c.value === values.category && c.subcategories.some(s => s.value === values.subcategory))) issue("CATEGORY_PAIR", "subcategory");
    const serial = values.serialNumber || null, key = values.externalAssetKey || null;
    if (serial && placeholder.test(serial)) issue("IDENTIFIER_PLACEHOLDER", "serialNumber");
    if (key && placeholder.test(key)) issue("IDENTIFIER_PLACEHOLDER", "externalAssetKey");
    if (!serial && !key) issue("IDENTITY_REQUIRED");
    if (key && !profile.sourceSystem?.trim()) issue("SOURCE_SYSTEM_REQUIRED", "externalAssetKey");
    const identifierType = serial ? values.identifierType || profile.identifierType || null : null;
    if (serial && !["SERIAL", "VIN", "FRAME", "HIN"].includes(identifierType ?? "")) issue("IDENTIFIER_TYPE_REQUIRED", "identifierType");
    if (!serial && values.identifierType) issue("IDENTIFIER_WITHOUT_VALUE", "identifierType");
    if (identifierType === "VIN" && serial && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(serial)) issue("VIN_FORMAT_REVIEW", "serialNumber");
    let year: number | null = null, country: string | null = null;
    if (values.year) { if (!/^[0-9]{4}$/.test(values.year) || Number(values.year) > profile.asOfYear || Number(values.year) < 1000) issue("YEAR_REVIEW", "year"); else year = Number(values.year); }
    if (values.country) {
      const code = profile.countryFormat === "ISO_ALPHA2" ? values.country.toUpperCase() : profile.countries && Object.hasOwn(profile.countries, values.country) ? profile.countries[values.country] : undefined;
      if (!code || !countries.has(code)) issue("COUNTRY_CONFIRMATION", "country"); else country = code;
    }
    const dynamic: Payload["dynamic"] = Object.create(null);
    const allowed = getDynamicFieldsForCategory(values.category, values.subcategory).filter(f => !["installationLocation", "ownerOrganisation"].includes(f.key));
    for (const [field, value] of Object.entries(values)) {
      if (!value || ["assetName", "category", "subcategory", "brand", "model", "serialNumber", "identifierType", "year", "country", "externalAssetKey", "registryHint"].includes(field)) continue;
      const definition = allowed.find(f => f.key === field);
      if (!definition) { issue("FIELD_NOT_ALLOWED", field); continue; }
      if (definition.type === "list") {
        if (!profile.listSeparator || raw[field].kind !== "text") { issue("LIST_PROFILE_REQUIRED", field); continue; }
        const items = value.split(profile.listSeparator).map(v => v.trim());
        if (items.length > (definition.maxItems ?? 100) || items.some(v => !v || v.length > 200 || placeholder.test(v) || formulaText(v)) || new Set(items).size !== items.length) issue("LIST_INVALID", field);
        else dynamic[field] = items;
      } else if (["hoursOfOperation", "powerRating", "capacity"].includes(field)) {
        const units: Record<string, string[]> = { hoursOfOperation: ["h"], powerRating: ["W", "kW", "MW", "hp", "PS"], capacity: ["Wh", "kWh", "MWh", "Ah", "mAh"] };
        const unit = profile.units?.[field];
        const number = profile.decimal === "," ? value.replace(",", ".") : value;
        if (!unit || !units[field].includes(unit) || !/^(0|[1-9][0-9]{0,11})(\.[0-9]{1,6})?$/.test(number)) issue("QUANTITY_PROFILE", field);
        else dynamic[field] = { value: number, unit }; // No automatic conversion or regional defaults.
      } else dynamic[field] = value;
    }
    if (values.registryHint) issue("REGISTRY_LINK_UNPROVEN", "registryHint");
    if (!serial && key) issue("IDENTITY_INCOMPLETE");
    const reviewCodes = ["IDENTITY_INCOMPLETE", "VIN_FORMAT_REVIEW", "REGISTRY_LINK_UNPROVEN"];
    return { position: row.position, state: issues.some(i => !reviewCodes.includes(i.code)) ? "INVALID" : issues.length ? "REVIEW" : "READY_FOR_PRIVATE_PREPARATION", issues,
      payload: { assetName: values.assetName ?? "", category: values.category ?? "", subcategory: values.subcategory ?? "", brand: values.brand || null, model: values.model || null,
        serialNumber: serial, identifierType, externalAssetKey: key, sourceSystem: key ? profile.sourceSystem?.normalize("NFC").trim() ?? null : null,
        year, country, registryHint: values.registryHint || null, dynamic } };
  });
}
