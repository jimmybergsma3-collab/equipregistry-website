import { getRegistryCategories } from "../registry/categories";
import { getDynamicFieldsForCategory } from "../registry/asset-fields";
import { fail, headerKey, type Table } from "./contract";

export const CORE_FIELDS = ["assetName", "category", "subcategory", "brand", "model", "serialNumber", "identifierType", "year", "country", "externalAssetKey", "registryHint"] as const;
export const DYNAMIC_FIELDS = [...new Set(getRegistryCategories("en").flatMap(c => c.subcategories.flatMap(s => getDynamicFieldsForCategory(c.value, s.value).map(f => f.key))))].filter(k => !["installationLocation", "ownerOrganisation"].includes(k));
export const TARGETS = [...CORE_FIELDS, ...DYNAMIC_FIELDS];
/** Suggestions only: never applied to a row until an explicit positional mapping is supplied. */
export const ALIASES: Record<string, readonly string[]> = {
  assetName: ["Asset name", "Nombre del activo", "Assetnaam", "Anlagenname"],
  category: ["Category", "Categoría", "Categorie", "Kategorie"],
  subcategory: ["Subcategory", "Subcategoría", "Subcategorie", "Unterkategorie"],
  brand: ["Brand", "Make", "Marca", "Merk", "Marke", "Hersteller"],
  model: ["Model", "Modelo", "Modell"],
  serialNumber: ["Serial", "SN", "Número de serie", "Serienummer", "Seriennummer"],
  year: ["Year built", "Año fabricación", "Bouwjaar", "Baujahr"],
  country: ["Country", "País"], // Land/Type/ID deliberately require manual selection.
  externalAssetKey: ["Asset ID", "Fleet ID", "Código de flota", "Vlootnummer", "Inventarnummer"],
  registryHint: ["Registry ID", "Registro ER", "ER-nummer", "ER-Nummer"],
  hoursOfOperation: ["Operating hours", "Horas de uso", "Bedrijfsuren", "Betriebsstunden"],
  engineSerialNumber: ["Engine serial", "Serie del motor", "Motorserienummer"],
  frameNumber: ["Frame number", "Número de cuadro", "Framenummer", "Rahmennummer"],
  unitType: ["Unit type", "Tipo de unidad", "Type unit", "Anlagentyp"],
  powerRating: ["Rated power", "Potencia nominal", "Vermogen", "Nennleistung"],
};
export type Mapping = { column: number; target: string | null }[];
export function suggestMapping(table: Table, enabled = false) {
  if (!enabled || table.duplicateHeaders.length) return [];
  return table.headers.flatMap((h, column) => {
    const matches = Object.entries(ALIASES).filter(([, aliases]) => aliases.some(a => headerKey(a) === headerKey(h)));
    return matches.length === 1 ? [{ column, target: matches[0][0] }] : [];
  });
}
export function checkMapping(table: Table, mapping: Mapping) {
  if (!Array.isArray(mapping) || mapping.length !== table.headers.length) fail("MAPPING_INCOMPLETE");
  const columns = new Set<number>(), targets = new Set<string>();
  for (const item of mapping) {
    if (!item || Object.keys(item).some(k => !["column", "target"].includes(k)) || !Number.isInteger(item.column) || item.column < 0 || item.column >= table.headers.length || columns.has(item.column)) fail("MAPPING_INVALID");
    columns.add(item.column);
    if (item.target !== null) {
      if (!TARGETS.includes(item.target) || targets.has(item.target)) fail("MAPPING_TARGET");
      targets.add(item.target);
    }
  }
  if (!["category", "subcategory", "assetName"].every(k => targets.has(k))) fail("MAPPING_REQUIRED_FIELDS");
}
