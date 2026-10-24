/* Local synthetic demonstration: no storage, HTML interpolation, exports of uploaded rows or commit route. */
const $ = id => document.getElementById(id);
let input = null, preview = null, pending = false, controller = null;
const sections = ['upload', 'map', 'issues', 'confirm', 'summary'];
function stage(id) {
  sections.forEach((name, i) => { $(name).hidden = name !== id; $('steps').children[i].classList.toggle('active', name === id); });
  $(id).querySelector('h2').focus(); $('error').textContent = '';
}
async function api(route, body) {
  controller = new AbortController();
  const res = await fetch(route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal, cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data.ok) throw Error(data.code || 'PREVIEW_UNAVAILABLE');
  return data.result;
}
async function action(callback) {
  if (pending) return;
  pending = true; $('busy').textContent = 'Checking locally…'; $('error').textContent = '';
  try { await callback(); } catch (error) { $('error').textContent = error.name === 'AbortError' ? 'Preview cancelled.' : `Unable to continue: ${error.message}. Check the file and explicit profile choices.`; }
  finally { pending = false; controller = null; $('busy').textContent = ''; }
}
function base64(bytes) { let text = ''; for (let i = 0; i < bytes.length; i += 8192) text += String.fromCharCode(...bytes.subarray(i, i + 8192)); return btoa(text); }
function download(bytes, filename, type) { const url = URL.createObjectURL(new Blob([bytes], { type })); const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
for (const format of ['Csv', 'Xlsx']) $('sample' + format).onclick = () => action(async () => {
  const samples = await api('/sample', {});
  if (format === 'Csv') download(samples.csv, 'synthetic-fleet.csv', 'text/csv');
  else download(Uint8Array.from(atob(samples.xlsx), x => x.charCodeAt(0)), 'synthetic-fleet.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
});
$('inspect').onclick = () => action(async () => {
  input = null; preview = null;
  const file = $('file').files[0];
  if (!file || !$('synthetic').checked) throw Error('SYNTHETIC_FILE_REQUIRED');
  if (file.size > 2097152 || !file.size || !/\.(csv|xlsx)$/i.test(file.name)) throw Error('FILE_LIMIT_OR_FORMAT');
  const csv = /\.csv$/i.test(file.name);
  if (csv && (!$('delimiter').value || !$('encoding').value) || !csv && !$('sheet').value) throw Error('EXPLICIT_PARSE_PROFILE_REQUIRED');
  input = { filename: file.name, mime: file.type, bytes: base64(new Uint8Array(await file.arrayBuffer())), parse: csv ? { delimiter: $('delimiter').value === 'tab' ? '\t' : $('delimiter').value, encoding: $('encoding').value } : { sheet: $('sheet').value } };
  const data = await api('/inspect', input);
  $('mapping').replaceChildren();
  data.headers.forEach((header, column) => {
    const label = document.createElement('label'); label.className = 'mapping-row'; label.append(document.createTextNode(`${column + 1}. ${header}`));
    const select = document.createElement('select'); select.dataset.column = column;
    [['', 'Choose target'], ['ignore', 'Ignore this column'], ...data.targets.map(x => [x, x])].forEach(([value, text]) => { const option = document.createElement('option'); option.value = value; option.textContent = text; select.append(option); });
    label.append(select); $('mapping').append(label);
  }); stage('map');
});
$('review').onclick = () => action(async () => {
  preview = null; $('ack').checked = false; $('finish').disabled = true;
  const mapping = [...$('mapping').querySelectorAll('select')].map(select => { if (!select.value) throw Error('MAPPING_INCOMPLETE'); return { column: Number(select.dataset.column), target: select.value === 'ignore' ? null : select.value }; });
  if (!$('decimal').value) throw Error('DECIMAL_PROFILE_REQUIRED');
  const countries = Object.create(null);
  if ($('country').value === 'custom') for (const line of $('countries').value.split('\n').filter(x => x.trim())) { const parts = line.split('='); if (parts.length !== 2 || !parts[0].trim() || !/^[A-Z]{2}$/.test(parts[1].trim()) || Object.hasOwn(countries, parts[0].trim())) throw Error('COUNTRY_MAPPING_INVALID'); countries[parts[0].trim()] = parts[1].trim(); }
  input.mapping = mapping;
  input.validation = { asOfYear: Number($('year').value), decimal: $('decimal').value, ...($('identifier').value ? { identifierType: $('identifier').value } : {}), sourceSystem: $('sourceSystem').value, countryFormat: $('country').value === 'ISO_ALPHA2' ? 'ISO_ALPHA2' : undefined, countries, units: { hoursOfOperation: $('hours').value, powerRating: $('power').value, capacity: $('capacity').value }, ...($('list').value ? { listSeparator: '|' } : {}) };
  preview = await api('/preview', input);
  const invalid = preview.rows.filter(r => r.state === 'INVALID').length, review = preview.rows.filter(r => r.state === 'REVIEW').length;
  $('counts').textContent = `${preview.rows.length} rows · ${invalid} invalid · ${review} need review · ${preview.rows.length - invalid - review} ready for private preparation`;
  $('rows').replaceChildren();
  for (const row of preview.rows) { const tr = document.createElement('tr'); for (const value of [row.position, row.payload.assetName, row.payload.serialNumber || '—', row.state, row.issues.map(i => i.code + (i.field ? ` (${i.field})` : '')).join(', ') || '—']) { const td = document.createElement('td'); td.textContent = value; tr.append(td); } $('rows').append(tr); }
  $('next').disabled = !!(invalid || review) || !preview.rows.length; stage('issues');
});
$('edit').onclick = () => { preview = null; stage('map'); };
$('next').onclick = () => { if (!preview || preview.rows.some(r => r.state !== 'READY_FOR_PRIVATE_PREPARATION')) return; $('ack').checked = false; $('finish').disabled = true; $('confirmCount').textContent = `${preview.rows.length} synthetic rows prepared for a dry run.`; stage('confirm'); };
$('ack').onchange = () => { $('finish').disabled = !$('ack').checked; };
$('finish').onclick = () => action(async () => {
  if (!$('ack').checked || !preview) return;
  const latest = await api('/preview', input);
  if (!latest.rows.length || latest.rows.some(r => r.state !== 'READY_FOR_PRIVATE_PREPARATION')) { preview = null; stage('map'); throw Error('PREVIEW_CHANGED_REVIEW_AGAIN'); }
  $('summaryText').textContent = `${latest.rows.length} synthetic rows checked successfully. Preparation confirmed; nothing was imported.`;
  input = null; preview = null; $('file').value = ''; $('rows').replaceChildren(); $('mapping').replaceChildren(); stage('summary');
});
$('restart').onclick = () => { controller?.abort(); location.reload(); };
window.addEventListener('pagehide', () => { controller?.abort(); input = null; preview = null; });
stage('upload');
