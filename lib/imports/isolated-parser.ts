import 'server-only';
import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { LIMITS, PreparationError, type FileInput, type ParseProfile, type Table } from './contract';

let activeParsers = 0;
const MAX_ACTIVE_PARSERS = 2;

/** Watchdog and V8 limits supplement the parser's byte/ZIP/XML limits. This is
 * deliberately not an OS sandbox or a hard total-RSS/CPU guarantee. */
export async function parseIsolated(file: FileInput, parse: ParseProfile, signal?: AbortSignal): Promise<Table> {
  if (signal?.aborted) throw new PreparationError('IMPORT_CANCELLED');
  if (!(file?.bytes instanceof Uint8Array) || !file.bytes.length || file.bytes.length > LIMITS.fileBytes) throw new PreparationError('FILE_LIMIT');
  if (activeParsers >= MAX_ACTIVE_PARSERS) throw new PreparationError('IMPORT_BUSY');
  activeParsers++;
  let worker: Worker | undefined;
  try {
  worker = new Worker(path.join(process.cwd(), 'local-import/parse-worker.mjs'), {
    workerData: { file, parse }, env: { NODE_ENV: 'test' }, execArgv: [],
    resourceLimits: { maxOldGenerationSizeMb: 128, maxYoungGenerationSizeMb: 16, stackSizeMb: 4 },
  });
  } catch { activeParsers--; throw new PreparationError('PARSER_UNAVAILABLE'); }
  const running = worker;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let cancel: (() => void) | undefined;
  try {
    return await new Promise<Table>((resolve, reject) => {
      cancel = () => reject(new PreparationError('IMPORT_CANCELLED'));
      signal?.addEventListener('abort', cancel, { once: true });
      timer = setTimeout(() => reject(new PreparationError('PARSER_TIMEOUT')), 10000);
      running.once('message', (message: { code?: string; table: Table }) => message.code ? reject(new PreparationError(message.code)) : resolve(message.table));
      running.once('error', () => reject(new PreparationError('FILE_INVALID')));
      running.once('exit', () => reject(new PreparationError('IMPORT_CANCELLED')));
    });
  } finally {
    clearTimeout(timer);
    if (cancel) signal?.removeEventListener('abort', cancel);
    try { await running.terminate(); } finally { activeParsers--; }
  }
}
