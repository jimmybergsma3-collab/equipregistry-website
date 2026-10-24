/* Fixed synthetic demo. All record content is rendered as text, never HTML. */
const $ = id => document.getElementById(id);
let view = 'rental', current = null, organization = null, generation = 0;
const el = (tag, text, className) => { const n = document.createElement(tag); n.textContent = text; if (className) n.className = className; return n; };
const date = value => new Intl.DateTimeFormat('nl-NL', {dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Madrid'}).format(new Date(value));
async function api(url, options) {const response = await fetch(url, {cache: 'no-store', ...options}); if (!response.ok) throw Error('unavailable'); return response.json();}
function hide() {$('workspace').hidden = true; $('assets').replaceChildren(); $('detail').replaceChildren(); current = null; organization = null;}
function unavailable() {hide(); $('notice').textContent = 'Geen toegang tot assets in dit profiel, of de bron is niet beschikbaar. Er worden geen assetgegevens getoond.';}
function render(data) {
  const d = $('detail'); d.replaceChildren();
  d.append(el('p', 'PRIVATE ASSET · ' + data.role, 'eyebrow'), el('h2', data.asset.name), el('p', data.asset.brand + ' · ' + data.asset.model), el('span', data.status, 'pill'));
  const cards = el('div', '', 'cards');
  const values = [['Registratie', data.registration], ['Verificatie', data.verification], ['Incidenten', data.incident]];
  if (view === 'rental') values.push(['Serienummer', data.asset.serialNumber || 'Niet opgegeven'], ['Overdracht', data.transfer]);
  if (view === 'insurance') values.push(['Verzekeringsdekking', data.coverage], ['Evidence', 'Geen documenten gedeeld']);
  if (view === 'finance') values.push(['Financiering / lease', data.finance], ['Rechten', 'Geen financieringsrechten afgeleid']);
  for (const [name, value] of values) {const card = el('section', '', 'card'); card.append(el('h3', name), el('p', value)); cards.append(card);}
  d.append(cards, el('h3', 'Lifecycle & history'), el('p', data.historyNotice, 'muted'));
  const timeline = el('ol', '', 'timeline');
  for (const e of data.timeline) {const item = el('li', ''); const time = el('time', date(e.recordedAt)); time.dateTime = e.recordedAt; item.append(time, el('strong', e.label), el('small', `Bron: ${e.source} · ${e.id} · versie ${e.version}`)); timeline.append(item);}
  if (!data.timeline.length) d.append(el('p', data.history === 'restricted' ? 'Historie afgeschermd voor dit profiel.' : 'Geen brongebeurtenissen beschikbaar. Er is geen historie aangevuld.'));
  d.append(timeline, el('p', 'Synthetisch bronmoment: ' + date(data.asOf) + ' · assetversie ' + data.asset.version, 'muted'));
}
async function select(id) {
  current = id; const tick = ++generation; $('detail').replaceChildren(); $('notice').textContent = 'Gegevens laden…';
  try {const data = await api(`/api/asset?organizationId=${organization}&assetId=${id}&view=${view}`); if (tick !== generation) return; render(data); $('notice').textContent = ''; for (const b of $('assets').children) b.setAttribute('aria-pressed', String(b.dataset.id === id));}
  catch {if (tick === generation) unavailable();}
}
async function login() {
  $('profile').disabled = true;
  const tick = ++generation; hide(); $('notice').textContent = 'Demoprofiel laden…';
  try {
    await api('/session', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({profile: $('profile').value, token: document.querySelector('meta[name="demo-token"]').content})});
    if (tick !== generation) return;
    const data = await api('/api/assets'); if (tick !== generation) return;
    organization = data.organizationId; $('count').textContent = `${data.assets.length} synthetische assets`; $('workspace').hidden = false;
    for (const a of data.assets) {const b = el('button', a.name); b.type = 'button'; b.dataset.id = a.id; b.addEventListener('click', () => select(a.id)); $('assets').append(b);}
    if (data.assets.length) await select(data.assets[0].id); else $('notice').textContent = 'Geen toegestane assets beschikbaar.';
  } catch {if (tick === generation) unavailable();}
  finally {$('profile').disabled = false;}
}
$('profile').addEventListener('change', login);
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => {
  view = button.dataset.view; for (const b of document.querySelectorAll('[data-view]')) b.setAttribute('aria-pressed', String(b === button)); if (current) select(current);
});
login();
