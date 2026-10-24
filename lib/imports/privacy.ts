import { fail, headerKey, type Table } from './contract';

/** Conservative whole-file gate, including ignored columns. No detector proves
 * absence of personal data in arbitrary prose: only reviewed synthetic use is enabled. */
export function rejectSensitiveTable(table: Table) {
  // A selected sheet cannot establish whole-file privacy. Persistent intake uses
  // the narrower single-sheet profile; the unchanged preview parser stays general.
  if (table.sheets.length > 1) fail('WHOLE_FILE_REVIEW_REQUIRED');
  const sensitiveHeader = /email|e-mail|phone|telephone|telefoon|tel[eé]fono|address|adres|direcci|owner|eigenaar|propriet|contact|latitude|longitude|gps|location|locatie|ubicaci|passport|paspoort|iban|bankaccount|creditcard|password|secret|token|document|evidence|police|insurance|person|persoon|birth|geboorte|ssn|bsn/i;
  const sensitiveValue = /[\w.+-]+@[\w.-]+\.[a-z]{2,}|https?:\/\/|\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]){10,30}\b|\b(?:bearer|password|secret)\s*[:=]|\b-?\d{1,2}\.\d{4,}\s*[,;]\s*-?\d{1,3}\.\d{4,}/i;
  if (table.headers.some(h => sensitiveHeader.test(headerKey(h))) || table.rows.some(r => r.cells.some(c => sensitiveValue.test(c.text)))) fail('SENSITIVE_FILE_REJECTED');
}
