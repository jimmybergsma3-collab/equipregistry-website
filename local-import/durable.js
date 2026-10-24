/* Local synthetic persistent wizard; text-only rendering and no browser storage. */
const $ = id => document.getElementById(id);
let input = null, preview = null, pending = false, controller = null;
const sections = ['upload', 'map', 'issues', 'confirm', 'summary'];
function stage(id) {
  sections.forEach((name, i) => { $(name).hidden = name !== id; $('steps').children[i].classList.toggle('active', name === id); });
  $(id).querySelector('h2').focus(); $('error').textContent = '';
}
async function api(route, body) {
  controller = new AbortController();
  const res = await fetch('/api/private-imports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ command: route.slice(1), input: { ...body, organizationId: $('organization').value.trim() } }), signal: controller.signal, cache: 'no-store' });
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
$('inspect').onclick = () => action(async () => {
  input = null; preview = null;
  const file = $('file').files[0];
  if (!file || !$('synthetic').checked) throw Error('SYNTHETIC_FILE_REQUIRED');
  if (file.size > 2097152 || !file.size || !/\.(csv|xlsx)$/i.test(file.name)) throw Error('FILE_LIMIT_OR_FORMAT');
  const csv = /\.csv$/i.test(file.name);
  if (csv && (!$('delimiter').value || !$('encoding').value) || !csv && !$('sheet').value) throw Error('EXPLICIT_PARSE_PROFILE_REQUIRED');
  input = { filename: file.name, mime: file.type, bytes: base64(new Uint8Array(await file.arrayBuffer())), parse: csv ? { delimiter: $('delimiter').value === 'tab' ? '\t' : $('delimiter').value, encoding: $('encoding').value } : { sheet: $('sheet').value } };
  const data = await api('/inspect', input);
  if (data.rejected) { input = null; $('file').value = ''; throw Error('SENSITIVE_FILE_REJECTED: Sensitive data was found. The entire file was rejected and its content was not stored. Remove personal or sensitive fields and offer a corrected file. Reference: ' + data.reference); }
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
  input.ingestKey ??= crypto.randomUUID(); input.mapping = mapping;
  input.validation = { asOfYear: Number($('year').value), decimal: $('decimal').value, ...($('identifier').value ? { identifierType: $('identifier').value } : {}), sourceSystem: $('sourceSystem').value, countryFormat: $('country').value === 'ISO_ALPHA2' ? 'ISO_ALPHA2' : undefined, countries, units: { hoursOfOperation: $('hours').value, powerRating: $('power').value, capacity: $('capacity').value }, ...($('list').value ? { listSeparator: '|' } : {}) };
  preview = await api('/stage', input);
  if (preview.rejected) { input = null; $('file').value = ''; throw Error('Sensitive file rejected. No file content was stored. Correct the file and upload again. Reference: ' + preview.reference); }
  renderPreview();
});
function renderPreview() {
  $('counts').textContent = 'Import ' + preview.id + ' · expires ' + new Date(preview.expiresAt).toLocaleString() + ' · ' + preview.status;
  $('rows').replaceChildren();
  for (const row of preview.rows) {
    const tr = document.createElement('tr'), td = document.createElement('td'), check = document.createElement('input');
    check.type = 'checkbox'; check.value = row.id; check.disabled = preview.expired || !!row.outcome || row.state !== 'READY_FOR_PRIVATE_PREPARATION'; td.append(check); tr.append(td);
    check.onchange = () => { $('next').disabled = !selected().length; };
    for (const value of [row.position, row.payload?.assetName || '—', row.payload?.serialNumber || '—', row.outcome || row.state || 'EXPIRED', row.issues?.map(i => i.code).join(', ') || '—']) { const cell = document.createElement('td'); cell.textContent = value; tr.append(cell); }
    $('rows').append(tr);
  }
  $('next').disabled = true; stage('issues');
}
function selected() { return [...$('rows').querySelectorAll('input:checked')].map(x => x.value); }
$('resume').onclick = () => action(async () => { preview = await api('/read', {jobId: $('resumeId').value.trim()}); renderPreview(); });
$('edit').onclick = () => action(async () => {
  if (preview && !['CANCELLED', 'COMPLETED'].includes(preview.status)) {
    await api('/cancel', { jobId: preview.id, revision: preview.revision, commandKey: crypto.randomUUID() });
  }
  preview = null;
  if (input) { delete input.ingestKey; stage('map'); } else stage('upload');
});
$('next').onclick = () => { if (!preview || !selected().length) return; $('ack').checked = false; $('finish').disabled = true; $('confirmCount').textContent = selected().length + ' selected rows. Import ' + preview.id; stage('confirm'); };
$('ack').onchange = () => { $('finish').disabled = !$('ack').checked; };
$('finish').onclick = () => action(async () => {
  if (!$('ack').checked || !preview) return;
  const command = { jobId: preview.id, commandKey: preview.commandKey || (preview.commandKey = crypto.randomUUID()), revision: preview.revision, previewDigest: preview.previewDigest, selectedRows: selected(), acknowledged: true };
  const result = await api('/commit', command);
  $('summaryText').textContent = result.outcomes.length + ' selected rows committed. Import ' + preview.id + ' · ' + result.status + '. Keep this reference to resume remaining rows.';
  input = null; preview = null; $('file').value = ''; $('rows').replaceChildren(); $('mapping').replaceChildren(); stage('summary');
});
$('restart').onclick = () => { controller?.abort(); location.reload(); };
window.addEventListener('pagehide', () => { controller?.abort(); input = null; preview = null; });
stage('upload');


