import { parse } from "csv-parse/sync";
import { LIMITS, fail, table, PreparationError, type FileInput, type ParseProfile, type Table } from "./contract";
import { parseXlsx } from "./xlsx";

function decode(bytes: Uint8Array, encoding: ParseProfile["encoding"]) {
  const bom16 = bytes[0] === 255 && bytes[1] === 254 ? "utf-16le" : bytes[0] === 254 && bytes[1] === 255 ? "utf-16be" : null;
  if (bom16 && encoding !== bom16 || encoding?.startsWith("utf-16") && encoding !== bom16) fail("ENCODING_CONFIRMATION");
  if (bytes[0] === 239 && bytes[1] === 187 && bytes[2] === 191 && encoding && encoding !== "utf-8") fail("ENCODING_MISMATCH");
  if (encoding && !["utf-8", "utf-16le", "utf-16be", "windows-1252"].includes(encoding)) fail("ENCODING_UNSUPPORTED");
  try { return new TextDecoder(encoding ?? "utf-8", { fatal: true }).decode(bytes); }
  catch { return fail("ENCODING_INVALID"); }
}
function csv(text: string, delimiter: string): Table {
  let count = 0, cells = 0;
  const rows: Table["rows"] = [];
  // Callback discards records after copying a bounded, typed row; no coercion or object headers.
  parse(text, { delimiter, bom: false, cast: false, skip_empty_lines: false,
    max_record_size: LIMITS.cellChars * LIMITS.columns, relax_column_count: false,
    on_record(record: string[], context: { lines: number }) {
      if (++count > LIMITS.rows + 1 || record.length > LIMITS.columns || (cells += record.length) > LIMITS.cells) fail("TABLE_LIMIT");
      if (record.some(v => v.length > LIMITS.cellChars)) fail("CELL_LENGTH");
      rows.push({ position: context.lines, cells: record.map(text => ({ text, kind: "text" })) });
      return null;
    } });
  return table("csv", rows);
}
export async function parseImport(input: FileInput, profile: ParseProfile): Promise<Table> {
  try {
    if (!(input.bytes instanceof Uint8Array) || !input.bytes.length || input.bytes.length > LIMITS.fileBytes) fail("FILE_LIMIT");
    // PDF is not a table import, even when its filename or MIME is disguised.
    if (Buffer.from(input.bytes.subarray(0, 1024)).includes(Buffer.from("%PDF-"))) fail("FORMAT_MISMATCH");
    if (typeof input.filename !== "string" || input.filename.length > 255 || typeof input.mime !== "string") fail("FILE_METADATA");
    const ext = input.filename.toLowerCase().match(/\.(csv|xlsx)$/)?.[1];
    const zip = input.bytes[0] === 80 && input.bytes[1] === 75 && input.bytes[2] === 3 && input.bytes[3] === 4;
    const mime = input.mime.toLowerCase();
    if (ext === "xlsx" && zip && ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/octet-stream", ""].includes(mime)) return await parseXlsx(Buffer.from(input.bytes), profile.sheet);
    if (ext !== "csv" || zip || !["text/csv", "text/plain", "application/csv", "application/octet-stream", ""].includes(mime)) fail("FORMAT_MISMATCH");
    const text = decode(input.bytes, profile.encoding);
    if (text.includes("\0") || /^\s*</.test(text) || /^\s*\{/.test(text)) fail("CSV_NOT_TEXT_TABLE");
    if (profile.delimiter) {
      if (![",", ";", "\t"].includes(profile.delimiter)) fail("DELIMITER_UNSUPPORTED");
      return csv(text, profile.delimiter);
    }
    // Detection is advisory only: caller must explicitly choose the dialect before preview.
    const candidates = [",", ";", "\t"].filter(d => { try { return csv(text, d).headers.length > 1; } catch { return false; } });
    return fail(candidates.length === 1 ? "DELIMITER_CONFIRMATION" : "DELIMITER_AMBIGUOUS");
  } catch (error) {
    if (error instanceof PreparationError) throw error;
    return fail("FILE_INVALID"); // Never expose parser messages, paths or original cells.
  }
}
