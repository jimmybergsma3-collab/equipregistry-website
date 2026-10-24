import { parentPort, workerData } from 'node:worker_threads';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import net from 'node:net';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Local-only worker: no app credentials, database/session modules or network.
net.Socket.prototype.connect = function () { throw Error('NETWORK_DISABLED'); };
globalThis.fetch = async () => { throw Error('NETWORK_DISABLED'); };
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../lib/imports');
const require = createRequire(import.meta.url), cache = new Map();
function load(name) {
  if (!['parse', 'xlsx', 'contract', 'privacy'].includes(name)) throw Error('MODULE_DISABLED');
  if (cache.has(name)) return cache.get(name).exports;
  const mod = { exports: {} }; cache.set(name, mod);
  const code = ts.transpileModule(fs.readFileSync(path.join(root, name + '.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const localRequire = target => {
    if (target.startsWith('./')) return load(target.slice(2));
    if (!['csv-parse/sync', 'yauzl', 'sax', 'node:path', 'path'].includes(target)) throw Error('MODULE_DISABLED');
    return require(target);
  };
  vm.runInThisContext('(function(require,module,exports){' + code + '\n})')(localRequire, mod, mod.exports);
  return mod.exports;
}
try {
  const table = await load('parse').parseImport(workerData.file, workerData.parse);
  load('privacy').rejectSensitiveTable(table);
  parentPort.postMessage({ table });
} catch (error) {
  parentPort.postMessage({ code: error instanceof load('contract').PreparationError ? error.code : 'FILE_INVALID' });
}
