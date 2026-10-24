import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dependencyRequire = createRequire(import.meta.url);
const root = path.resolve(__dirname, '..');
export function loader(overrides = {}) {
  const cache = new Map();
  function load(file) {
    const absolute = path.resolve(root, file);
    if (overrides[absolute]) return overrides[absolute];
    if (cache.has(absolute)) return cache.get(absolute).exports;
    const compiled = { exports: {} }; cache.set(absolute, compiled);
    const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    const localRequire = name => {
      if (name === 'server-only') return {};
      if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
      if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(absolute), name)) + '.ts');
      return dependencyRequire(name);
    };
    vm.runInThisContext('(function(require,module,exports){' + code + '\n})', { filename: absolute })(localRequire, compiled, compiled.exports);
    return compiled.exports;
  }
  return load;
};
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let i = 0; i < 8; i++) c = c & 1 ? 0xedb88320 ^ c >>> 1 : c >>> 1; return c >>> 0; });
function crc(bytes) { let c = 0xffffffff; for (const b of bytes) c = crcTable[(c ^ b) & 255] ^ c >>> 8; return (c ^ 0xffffffff) >>> 0; }
export function zip(parts, options = {}) {
  let offset = 0; const chunks = [], central = [];
  for (const [name, text] of parts) {
    const bytes = Buffer.from(text), filename = Buffer.from(name), body = options.deflate ? zlib.deflateRawSync(bytes) : bytes;
    const header = Buffer.alloc(30); header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20, 4); header.writeUInt16LE(options.encrypted ? 1 : 0, 6); header.writeUInt16LE(options.deflate ? 8 : 0, 8);
    header.writeUInt32LE(crc(bytes), 14); header.writeUInt32LE(body.length, 18); header.writeUInt32LE(options.declaredSize ?? bytes.length, 22); header.writeUInt16LE(filename.length, 26);
    chunks.push(header, filename, body);
    const c = Buffer.alloc(46); c.writeUInt32LE(0x02014b50); c.writeUInt16LE(20, 4); header.copy(c, 6, 4, 28); c.writeUInt32LE(options.symlink ? 0xa0000000 : 0, 38); c.writeUInt32LE(offset, 42);
    central.push(c, filename); offset += header.length + filename.length + body.length;
  }
  const directory = Buffer.concat(central), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50); end.writeUInt16LE(parts.length, 8); end.writeUInt16LE(parts.length, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...chunks, directory, end]);
};
const main = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const docrel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
const rel = 'http://schemas.openxmlformats.org/package/2006/relationships';
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export const headers = ['assetName', 'category', 'subcategory', 'serialNumber'];
export const valid = ['Synthetic 全球', 'vehicles', 'truck', '0000123'];
export function parts(rows = [headers, valid]) {
  const column = i => i < 26 ? String.fromCharCode(65 + i) : String.fromCharCode(64 + Math.floor(i / 26)) + String.fromCharCode(65 + i % 26);
  const sheet = `<worksheet xmlns="${main}"><sheetData>${rows.map((row, i) => `<row r="${i + 1}">${row.map((cell, j) => typeof cell === 'object' ? `<c r="${column(j)}${i + 1}" ${cell.attrs || ''}>${cell.body}</c>` : `<c r="${column(j)}${i + 1}" t="inlineStr"><is><t>${escape(cell)}</t></is></c>`).join('')}</row>`).join('')}</sheetData></worksheet>`;
  return [
    ['[Content_Types].xml', '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>'],
    ['_rels/.rels', `<Relationships xmlns="${rel}"><Relationship Id="rId1" Type="${docrel}/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
    ['xl/workbook.xml', `<workbook xmlns="${main}" xmlns:r="${docrel}"><sheets><sheet name="Assets" sheetId="1" r:id="rId1"/></sheets></workbook>`],
    ['xl/_rels/workbook.xml.rels', `<Relationships xmlns="${rel}"><Relationship Id="rId1" Type="${docrel}/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`],
    ['xl/worksheets/sheet1.xml', sheet],
  ];
};
export const xlsx = (entries = parts(), options) => ({ bytes: zip(entries, options), filename: 'synthetic.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
export const csv = text => ({ bytes: Buffer.from(text), filename: 'synthetic.csv', mime: 'text/csv' });
export const mapping = headers.map((target, column) => ({ column, target }));
export const profile = { asOfYear: 2026, decimal: '.', identifierType: 'SERIAL' };
export { main };
