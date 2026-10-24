import { fail } from "./contract";
import type { Payload, PreviewRow } from "./validate";
export type ExistingPrivateAsset = Pick<Payload, "assetName" | "category" | "subcategory" | "brand" | "model" | "serialNumber" | "identifierType" | "sourceSystem" | "externalAssetKey"> & { organizationId: string; lifecycleState: string };
const folded = (s: string) => s.normalize("NFC").trim().toLowerCase();
const loose = (s: string) => folded(s).replace(/[\s-]/g, "");
export function markConflicts(rows: PreviewRow[], organizationId: string, existing: ExistingPrivateAsset[]) {
  // Defense in depth: an incorrectly scoped repository response is never consumed or exposed.
  if (existing.length > 10000 || existing.some(a => a.organizationId !== organizationId)) fail("SCOPED_LOOKUP_UNAVAILABLE");
  const add = (row: PreviewRow, code: string) => {
    if (!row.issues.some(i => i.code === code)) row.issues.push({ code });
    if (row.state !== "INVALID") row.state = "REVIEW";
  };
  const keyIndex = new Map<string, PreviewRow[]>(), serialIndex = new Map<string, PreviewRow[]>();
  for (const row of rows) {
    const p = row.payload;
    const key = p.externalAssetKey && JSON.stringify([p.sourceSystem, p.externalAssetKey]);
    if (key) keyIndex.set(key, [...(keyIndex.get(key) ?? []), row]);
    if (p.serialNumber) { const serial = loose(p.serialNumber); serialIndex.set(serial, [...(serialIndex.get(serial) ?? []), row]); }
  }
  for (const group of [...keyIndex.values(), ...serialIndex.values()]) if (group.length > 1) {
    const same = group.every(r => JSON.stringify(r.payload) === JSON.stringify(group[0].payload));
    group.forEach(r => add(r, same ? "DUPLICATE_IN_FILE" : "IDENTITY_CONFLICT_IN_FILE"));
  }
  const sourceIndex = new Map<string, ExistingPrivateAsset[]>(), identityIndex = new Map<string, ExistingPrivateAsset[]>();
  for (const asset of existing) {
    if (asset.externalAssetKey) { const key = JSON.stringify([asset.sourceSystem, asset.externalAssetKey]); sourceIndex.set(key, [...(sourceIndex.get(key) ?? []), asset]); }
    if (asset.serialNumber) { const key = loose(asset.serialNumber); identityIndex.set(key, [...(identityIndex.get(key) ?? []), asset]); }
  }
  for (const row of rows) {
    const p = row.payload;
    const sources = p.externalAssetKey ? sourceIndex.get(JSON.stringify([p.sourceSystem, p.externalAssetKey])) ?? [] : [];
    const serials = p.serialNumber ? identityIndex.get(loose(p.serialNumber)) ?? [] : [];
    for (const asset of sources) {
      const changed = (["serialNumber", "identifierType", "category", "subcategory"] as const).some(k => p[k] !== asset[k]);
      add(row, changed ? "EXISTING_SOURCE_IDENTITY_CONFLICT" : "REVIEW_EXISTING_SOURCE");
      if (asset.lifecycleState !== "IMPORTED_PRIVATE") add(row, "EXISTING_ARCHIVED_HOLD");
    }
    if (serials.length) add(row, "REVIEW_EXISTING_SERIAL");
    if (serials.some(a => a.lifecycleState !== "IMPORTED_PRIVATE")) add(row, "EXISTING_ARCHIVED_HOLD");
  }
  return rows;
}
