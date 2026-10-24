/** Local preparation only. No persistence, registry identity or ownership semantics. */
export const LIMITS = Object.freeze({ fileBytes: 2 * 1024 * 1024, rows: 1000, columns: 64,
  cells: 32000, cellChars: 4096, headerChars: 128, sheets: 20, zipEntries: 256,
  expandedBytes: 16 * 1024 * 1024, partBytes: 8 * 1024 * 1024, ratio: 100,
  xmlDepth: 32, xmlAttributes: 32, xmlNodes: 150000, sharedStrings: 32000 });
export class PreparationError extends Error {
  constructor(public readonly code: string) { super("Import preparation unavailable: " + code); }
}
export function fail(code: string): never { throw new PreparationError(code); }
export type Cell = { text: string; kind: "text" | "number" | "boolean" | "date" | "error" };
export type Table = { format: "csv" | "xlsx"; headers: string[]; rows: { position: number; cells: Cell[] }[];
  sheets: { name: string; excluded: boolean }[]; duplicateHeaders: number[][] };
export type FileInput = { bytes: Uint8Array; filename: string; mime: string };
export type ParseProfile = { delimiter?: "," | ";" | "\t"; encoding?: "utf-8" | "utf-16le" | "utf-16be" | "windows-1252"; sheet?: string };
export const headerKey = (s: string) => s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
// Encoded SpreadsheetML character escapes require a clean text export, not guessed decoding.
export const unsafeText = (s: string) => /[\x00-\x1f\x7f-\x9f\u202a-\u202e\u2066-\u2069]|_x[0-9a-f]{4}_/iu.test(s);
export const formulaText = (s: string) => /^[\s\u200b\uFEFF]*[=+@-]/u.test(s.normalize("NFKC"));
export function table(format: Table["format"], rows: Table["rows"], sheets: Table["sheets"] = []): Table {
  if (rows.length < 2 || rows.length > LIMITS.rows + 1) fail("ROW_LIMIT_OR_EMPTY");
  const headers = rows[0].cells.map(c => c.text.normalize("NFC").trim());
  if (!headers.length || headers.length > LIMITS.columns) fail("COLUMN_LIMIT");
  if (rows.some(r => r.cells.length !== headers.length)) fail("COLUMN_COUNT");
  if (rows.length * headers.length > LIMITS.cells) fail("CELL_LIMIT");
  if (headers.some((h, i) => !h || h.length > LIMITS.headerChars || unsafeText(rows[0].cells[i].text) || formulaText(h) || rows[0].cells[i].kind !== "text")) fail("HEADER_INVALID");
  const groups = new Map<string, number[]>();
  headers.forEach((h, i) => groups.set(headerKey(h), [...(groups.get(headerKey(h)) ?? []), i]));
  return { format, headers, rows: rows.slice(1), sheets, duplicateHeaders: [...groups.values()].filter(g => g.length > 1) };
}
