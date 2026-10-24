import * as yauzl from "yauzl";
import * as sax from "sax";
import { posix } from "node:path";
import { LIMITS, fail, table, unsafeText, formulaText, type Cell, type Table } from "./contract";

const MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const REL = "http://schemas.openxmlformats.org/package/2006/relationships";
const DOCREL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const CONTENT = "http://schemas.openxmlformats.org/package/2006/content-types";
type Tag = { local: string; uri: string; attrs: Record<string, string> };
function xml(bytes: Buffer, open: (tag: Tag, parents: string[]) => void = () => {}, text: (s: string, parents: string[]) => void = () => {}, close: (name: string) => void = () => {}) {
  let value: string;
  try { value = new TextDecoder("utf-8", { fatal: true }).decode(bytes); } catch { return fail("XML_ENCODING"); }
  if (/<!DOCTYPE|<!ENTITY/i.test(value) || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value)) fail("XML_UNSAFE");
  const declaration = value.match(/^\s*<\?xml\s+[^?]*encoding=["']([^"']+)/i);
  if (declaration && declaration[1].toLowerCase() !== "utf-8") fail("XML_ENCODING");
  const options = { xmlns: true, strictEntities: true };
  const parser = sax.parser(true, options);
  const parents: string[] = []; let nodes = 0;
  let attributes = new Set<string>();
  parser.onopentagstart = () => { attributes = new Set(); };
  parser.onattribute = attribute => { if (attributes.has(attribute.name)) fail("XML_DUPLICATE_ATTRIBUTE"); attributes.add(attribute.name); };
  parser.onerror = () => fail("XML_INVALID");
  parser.ondoctype = () => fail("XML_UNSAFE");
  parser.onprocessinginstruction = node => { if (node.name !== "xml") fail("XML_UNSAFE"); };
  parser.onopentag = node => {
    const n = node as sax.QualifiedTag;
    if (++nodes > LIMITS.xmlNodes || parents.length >= LIMITS.xmlDepth || Object.keys(n.attributes).length > LIMITS.xmlAttributes) fail("XML_LIMIT");
    const attrs: Record<string, string> = Object.create(null);
    for (const a of Object.values(n.attributes)) {
      if (a.value.length > LIMITS.cellChars) fail("XML_ATTRIBUTE_LIMIT");
      attrs[a.uri === DOCREL ? "r:" + a.local : a.name] = a.value;
    }
    open({ local: n.local, uri: n.uri, attrs }, parents);
    parents.push(n.local);
  };
  parser.ontext = s => text(s, parents);
  parser.oncdata = () => fail("XML_UNSUPPORTED");
  parser.onclosetag = () => close(parents.pop()!);
  // Bounded chunks also activate the parser's internal token buffer checks.
  for (let i = 0; i < value.length; i += 4096) parser.write(value.slice(i, i + 4096));
  parser.close();
}
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1; return c >>> 0; });
function crc32(bytes: Buffer) { let c = 0xffffffff; for (const b of bytes) c = crcTable[(c ^ b) & 255] ^ c >>> 8; return (c ^ 0xffffffff) >>> 0; }
async function archive(bytes: Buffer): Promise<Map<string, Buffer>> {
  return new Promise((resolve, reject) => {
    yauzl.fromBuffer(bytes, { lazyEntries: true, validateEntrySizes: true, strictFileNames: true }, (error, zip) => {
      if (error || !zip) { reject(new Error("ZIP")); return; }
      const entries = new Map<string, Buffer>(); let total = 0, count = 0, stopped = false;
      const stop = (error: unknown) => { if (!stopped) { stopped = true; zip.close(); reject(error); } };
      zip.on("error", stop);
      zip.on("end", () => { if (!stopped) { stopped = true; zip.close(); resolve(entries); } });
      zip.on("entry", (entry: yauzl.Entry) => {
        try {
          const name = entry.fileName;
          if (++count > LIMITS.zipEntries || entries.has(name) || name.length > 200 || !/^(\[Content_Types\]\.xml|_rels\/\.rels|docProps\/[a-zA-Z]+\.xml|xl\/workbook\.xml|xl\/_rels\/workbook\.xml\.rels|xl\/worksheets\/sheet[0-9]+\.xml|xl\/sharedStrings\.xml|xl\/styles\.xml|xl\/theme\/theme[0-9]+\.xml)$/.test(name)) fail("ZIP_ENTRY_UNSUPPORTED");
          if (entry.generalPurposeBitFlag & 1 || ![0, 8].includes(entry.compressionMethod) || ((entry.externalFileAttributes >>> 16) & 0xf000) === 0xa000) fail("ZIP_UNSAFE");
          if (entry.uncompressedSize > LIMITS.partBytes || entry.uncompressedSize > Math.max(1, entry.compressedSize) * LIMITS.ratio || total + entry.uncompressedSize > LIMITS.expandedBytes) fail("ZIP_LIMIT");
          zip.openReadStream(entry, (error, stream) => {
            if (error || !stream) { stop(error); return; }
            const chunks: Buffer[] = []; let size = 0;
            stream.on("error", stop);
            stream.on("data", (chunk: Buffer) => {
              size += chunk.length; total += chunk.length;
              if (size > LIMITS.partBytes || total > LIMITS.expandedBytes || size > Math.max(1, entry.compressedSize) * LIMITS.ratio) { stream.destroy(); stop(new Error("ZIP_LIMIT")); return; }
              chunks.push(chunk);
            });
            stream.on("end", () => {
              if (stopped) return;
              const data = Buffer.concat(chunks);
              if (size !== entry.uncompressedSize || crc32(data) !== entry.crc32) { stop(new Error("ZIP_INTEGRITY")); return; }
              entries.set(name, data); zip.readEntry();
            });
          });
        } catch (error) { stop(error); }
      });
      zip.readEntry();
    });
  });
}
export async function parseXlsx(bytes: Buffer, selected?: string): Promise<Table> {
  const parts = await archive(bytes);
  const get = (name: string) => parts.get(name) ?? fail("XLSX_PART_MISSING");
  const targets = new Map<string, string>();
  let officeDocument = false;
  for (const [name, data] of parts) {
    // Every part is parsed, even excluded sheets: malformed XML/DTDs never hide there.
    xml(data, tag => {
      if (name.endsWith(".rels")) {
        if (tag.uri !== REL) fail("RELATIONSHIP_INVALID");
        if (tag.local === "Relationship") {
          const { Target, TargetMode, Type, Id } = tag.attrs;
          const core = Type === "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
          if (!Target || !Id || TargetMode || !(Type?.startsWith(DOCREL + "/") || core) || /[:\\%?#]/.test(Target) || Target.startsWith("/") || Target.split("/").includes("..")) fail("EXTERNAL_OR_UNSAFE_RELATIONSHIP");
          const allowed = ["officeDocument", "worksheet", "styles", "sharedStrings", "theme", "extended-properties", "custom-properties"];
          if (!core && !allowed.includes(Type.slice(DOCREL.length + 1))) fail("RELATIONSHIP_UNSUPPORTED");
          const resolved = posix.join(name === "_rels/.rels" ? "" : "xl", Target);
          if (!parts.has(resolved)) fail("RELATIONSHIP_MISSING");
          if (name === "_rels/.rels" && Type === DOCREL + "/officeDocument") {
            if (officeDocument || resolved !== "xl/workbook.xml") fail("WORKBOOK_RELATIONSHIP");
            officeDocument = true;
          }
          if (name === "xl/_rels/workbook.xml.rels") {
            if (targets.has(Id)) fail("RELATIONSHIP_DUPLICATE");
            targets.set(Id, resolved);
          }
        }
      }
    });
  }
  if (!officeDocument) fail("WORKBOOK_RELATIONSHIP");
  let workbookType = false;
  xml(get("[Content_Types].xml"), tag => {
    if (tag.uri !== CONTENT) fail("CONTENT_TYPE_INVALID");
    if (tag.local === "Override") {
      const type = tag.attrs.ContentType;
      if (tag.attrs.PartName === "/xl/workbook.xml" && type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml") workbookType = true;
      if (!type || !/^(application\/vnd\.openxmlformats-officedocument\.(spreadsheetml\.(sheet.main|worksheet|styles|sharedStrings)|theme|extended-properties|custom-properties)\+xml|application\/vnd\.openxmlformats-package\.core-properties\+xml)$/.test(type)) fail("CONTENT_TYPE_UNSUPPORTED");
    } else if (tag.local === "Default" && !((tag.attrs.Extension === "xml" && tag.attrs.ContentType === "application/xml") || (tag.attrs.Extension === "rels" && tag.attrs.ContentType === "application/vnd.openxmlformats-package.relationships+xml"))) fail("CONTENT_TYPE_UNSUPPORTED");
  });
  if (!workbookType) fail("CONTENT_TYPE_MISMATCH");
  const sheets: (Table["sheets"][number] & { path: string })[] = [];
  xml(get("xl/workbook.xml"), (tag, parents) => {
    if (tag.uri !== MAIN) fail("WORKBOOK_UNSUPPORTED");
    if (tag.local === "sheet" && parents.join("/") === "workbook/sheets") {
      const name = tag.attrs.name, state = tag.attrs.state ?? "visible", path = targets.get(tag.attrs["r:id"]);
      if (!name || unsafeText(name) || formulaText(name) || name.length > 128 || !["visible", "hidden", "veryHidden"].includes(state) || !path?.startsWith("xl/worksheets/") || sheets.some(s => s.name === name || s.path === path) || sheets.length >= LIMITS.sheets) fail("SHEET_INVALID");
      sheets.push({ name, excluded: state !== "visible", path });
    }
  });
  if (!selected) fail("SHEET_SELECTION_REQUIRED");
  const sheet = sheets.find(s => s.name === selected && !s.excluded) ?? fail("SHEET_UNAVAILABLE");
  const strings: string[] = []; let shared = "";
  if (parts.has("xl/sharedStrings.xml")) xml(get("xl/sharedStrings.xml"), tag => {
    if (tag.uri !== MAIN) fail("SHARED_STRING_INVALID");
    if (tag.local === "si") shared = "";
  }, (s, parents) => { if (parents.at(-1) === "t") { shared += s; if (shared.length > LIMITS.cellChars) fail("CELL_LENGTH"); } }, name => {
    if (name === "si") { if (strings.length >= LIMITS.sharedStrings) fail("SHARED_STRING_LIMIT"); strings.push(shared); }
  });
  const rows: Table["rows"] = []; let row: Table["rows"][number] | undefined, cell: Cell | undefined;
  let col = -1, type = "", content = "", count = 0, values = 0, inline = 0;
  const blank = (): Cell => ({ text: "", kind: "text" });
  xml(get(sheet.path), (tag, parents) => {
    if (tag.uri !== MAIN) fail("WORKSHEET_UNSUPPORTED");
    if (["f", "mergeCell", "hyperlink", "extLst", "tablePart", "drawing", "oleObject"].includes(tag.local)) fail("WORKSHEET_ACTIVE_OR_MERGED");
    if ((tag.local === "row" || tag.local === "col") && (["1", "true"].includes(tag.attrs.hidden) || tag.attrs.ht === "0" || tag.attrs.width === "0")) fail("HIDDEN_TABLE_DATA");
    if (tag.local === "row") {
      const position = Number(tag.attrs.r);
      if (parents.join("/") !== "worksheet/sheetData" || !Number.isInteger(position) || position !== rows.length + 1 || position > LIMITS.rows + 1) fail("ROW_POSITION");
      row = { position, cells: [] }; rows.push(row);
    }
    if (tag.local === "c") {
      if (!row || parents.join("/") !== "worksheet/sheetData/row") fail("CELL_POSITION");
      const match = tag.attrs.r?.match(/^([A-Z]{1,3})([1-9][0-9]*)$/);
      if (!match || Number(match[2]) !== row.position) fail("CELL_POSITION");
      col = [...match[1]].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0) - 1;
      if (col < row.cells.length || col >= LIMITS.columns || ++count > LIMITS.cells) fail("CELL_LIMIT_OR_DUPLICATE");
      while (row.cells.length < col) row.cells.push(blank());
      type = tag.attrs.t ?? "n"; content = ""; values = 0; inline = 0;
      if (!["n", "s", "inlineStr", "b", "d", "e"].includes(type)) fail("CELL_TYPE");
      cell = { text: "", kind: type === "n" ? (tag.attrs.s && tag.attrs.s !== "0" ? "date" : "number") : type === "b" ? "boolean" : type === "d" ? "date" : type === "e" ? "error" : "text" };
      row.cells.push(cell);
    }
    if (cell && tag.local === "v" && (type === "inlineStr" || parents.at(-1) !== "c" || ++values > 1)) fail("CELL_STRUCTURE");
    if (cell && tag.local === "is" && (type !== "inlineStr" || parents.at(-1) !== "c" || ++inline > 1)) fail("CELL_STRUCTURE");
    if (cell && tag.local === "t" && (type !== "inlineStr" || !parents.includes("is") || !["is", "r"].includes(parents.at(-1)!))) fail("CELL_STRUCTURE");
    if (cell && tag.local === "rPh") fail("CELL_STRUCTURE");
  }, (s, parents) => {
    if (cell && ["v", "t"].includes(parents.at(-1)!)) { content += s; if (content.length > LIMITS.cellChars) fail("CELL_LENGTH"); }
  }, name => {
    if (name === "c" && cell) {
      if (type === "inlineStr" && inline !== 1) fail("CELL_STRUCTURE");
      if (type === "s") { if (!/^(0|[1-9][0-9]*)$/.test(content) || Number(content) >= strings.length) fail("SHARED_STRING_INDEX"); cell.text = strings[Number(content)]; }
      else cell.text = content;
      cell = undefined;
    }
    if (name === "row") row = undefined;
  });
  const width = Math.max(0, ...rows.map(r => r.cells.length));
  rows.forEach(r => { while (r.cells.length < width) r.cells.push(blank()); });
  return table("xlsx", rows, sheets.map(({ name, excluded }) => ({ name, excluded })));
}
