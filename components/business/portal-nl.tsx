'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { readPrivateBusinessAsset } from '@/lib/business/read';

type Overview = {partial: boolean; organizations: {id: string; name: string; status: string; role: string | null; membershipVersion?: number}[]};
type Assets = {organizationId: string; partial: boolean; assets: {id: string; name: string}[]};
type Detail = Awaited<ReturnType<typeof readPrivateBusinessAsset>>;
type Members = {organizationId: string; partial: boolean; memberships: {userId: string; role: string; status: string; version: number; startsAt: string; endsAt: string | null}[]};
type Inbox = {partial: boolean; mandates: {id: string; organizationId: string; organizationName: string; scope: string; version: number; expiresAt: string; state: string; addressedToYou: boolean; canAccept: boolean; canRevoke: boolean}[]};
type Screen = {overview?: Overview; assets?: Assets; detail?: Detail; members?: Members; inbox?: Inbox};
const button = 'rounded-lg border border-slate-300 px-4 py-2 text-left hover:bg-slate-100 disabled:opacity-50';
const messages: Record<number, string> = {
  401: 'Meld je aan met een account met bevestigd e-mailadres.',
  409: 'De aanvraag bestaat al of is gewijzigd. Vernieuw de organisaties voordat je opnieuw probeert.',
  400: 'Controleer de ingevoerde gegevens en probeer opnieuw.',
};

export default function BusinessPortal({lang, platformManagementEnabled = false}: {lang: string; platformManagementEnabled?: boolean}) {
  const [screen, setScreen] = useState<Screen>({});
  const [busy, setBusy] = useState(true);
  const [notice, setNotice] = useState('');
  const sequence = useRef(0);
  const active = useRef<AbortController | null>(null);
  const operation = useRef<{payload: string; id: string} | null>(null);
  const requestIdentity = useRef<{payload: string; id: string} | null>(null);
  const run = useCallback(async (command: string, input: Record<string, unknown>, target: keyof Screen | 'request' | 'saved') => {
    const version = ++sequence.current;
    active.current?.abort();
    const controller = new AbortController(); active.current = controller;
    setScreen({}); setNotice(''); setBusy(true);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/business', {method: 'POST', credentials: 'same-origin', cache: 'no-store', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({command, input}), signal: controller.signal});
      const result = await response.json();
      if (version !== sequence.current) return;
      if (!response.ok) { setNotice(messages[response.status] ?? 'Toegang is niet beschikbaar. Vernieuw om de huidige rechten te controleren.'); return; }
      if (target === 'request') setNotice(`Organisatieaanvraag vastgelegd. Status: ${result.data.status}. Er zijn geen toegangs- of verificatierechten verleend. Vernieuw de organisaties.`);
      else if (target === 'saved') setNotice('Opgeslagen. Vernieuw de organisaties of uitnodigingen voor de huidige stand. Accepteren verleent geen beheerdersrechten.');
      else setScreen({[target]: target === 'members' ? {...result.data, organizationId: input.organizationId} : result.data});
    } catch {
      if (version === sequence.current) setNotice('Het resultaat kon niet worden bevestigd. Vernieuw voordat je opnieuw probeert; de aanvraag kan al zijn vastgelegd.');
    } finally { clearTimeout(timeout); if (version === sequence.current) setBusy(false); }
  }, []);
  useEffect(() => {
    const initial = setTimeout(() => void run('overview', {}, 'overview'), 0);
    // On backgrounding or navigation, discard private results and late responses.
    const cancel = () => { ++sequence.current; active.current?.abort(); };
    const clear = () => { cancel(); setScreen({}); setBusy(false); setNotice('Vernieuw om je huidige toegang te controleren.'); };
    const visibility = () => { if (document.hidden) clear(); };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', clear);
    return () => { clearTimeout(initial); cancel(); document.removeEventListener('visibilitychange', visibility); window.removeEventListener('pagehide', clear); };
  }, [run]);
  function mutate(command: string, input: Record<string, unknown>, idempotent = true) {
    const payload = JSON.stringify({command, input});
    if (operation.current?.payload !== payload) operation.current = {payload, id: crypto.randomUUID()};
    void run(command, idempotent ? {...input, operationId: operation.current.id} : input, 'saved');
  }
  function grant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!screen.members) return;
    const data = new FormData(event.currentTarget), userId = String(data.get('userId') ?? '').trim();
    const prior = screen.members.memberships.find(m => m.userId === userId);
    mutate('members.set', {organizationId: screen.members.organizationId, userId, role: String(data.get('role')), status: 'ACTIVE', expectedVersion: prior?.version ?? null}, false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {displayName: String(data.get('displayName') ?? '').trim().normalize('NFC'), countryCode: String(data.get('countryCode') ?? '').trim().toUpperCase()};
    const payload = JSON.stringify(values);
    if (requestIdentity.current?.payload !== payload) requestIdentity.current = {payload, id: crypto.randomUUID()};
    void run('request', {...values, id: requestIdentity.current.id}, 'request');
  }
  return <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 break-words">
    <a className={button} href={`/${lang}/dashboard/business`}>← Assetregister</a><header className="space-y-3"><p className="text-sm font-semibold text-slate-600">EquipRegistry · Zakelijke omgeving</p>
      <h1 className="text-3xl font-bold">Organisaties en toegang</h1>
      <p>Vraag een organisatie aan of bekijk privé-assets waarvoor je lidmaatschap toegang geeft.</p>
      <p className="rounded-lg bg-amber-50 p-4 text-sm">E-mailbevestiging bevestigt alleen toegang tot een e-mailadres. Identiteit, onderneming, eigendom en bevoegdheid worden daarmee niet geverifieerd. Organisatieactivering en contractverificatie zijn hier niet beschikbaar.</p>
      <div className="flex flex-wrap gap-3"><button className={button} disabled={busy} onClick={() => void run('overview', {}, 'overview')}>Organisaties vernieuwen</button><button className={button} disabled={busy} onClick={() => void run('mandates.inbox', {}, 'inbox')}>Beheerdersuitnodigingen</button><a className={button} href={`/${lang}/dashboard`}>Dashboard</a><a className={button} href={`/${lang}/login`}>Aanmelden</a></div>
    </header>
    <p role="status" aria-live="polite">{busy ? 'Toegang controleren…' : notice}</p>
    {platformManagementEnabled ? <a className={button} href={`/${lang}/dashboard/platform/administrators`}>Platformbeheer · Beheerders en bedrijfsverificatie</a> : null}
    {screen.overview ? <section aria-label="Organisaties" className="space-y-3">
      {!screen.overview.organizations.length ? <p>Geen actieve lidmaatschappen of openstaande aanvragen beschikbaar.</p> : null}
      {screen.overview.organizations.map(org => <article key={org.id} className="space-y-2 rounded-xl border p-4">
        <h2 className="text-xl font-semibold">{org.name}</h2>{platformManagementEnabled?<p className="break-all text-sm">Organisatie-ID: {org.id}</p>:null}<p>{org.status === 'PENDING_REVIEW' ? 'Wacht op onafhankelijke beoordeling; nog geen organisatietoegang verleend.' : `Actief lidmaatschap · ${org.role}`}</p>
        {org.status === 'ACTIVE' && org.role === 'ORG_ADMIN' ? <button className={button} disabled={busy} onClick={() => void run('members.read', {organizationId: org.id}, 'members')}>Leden beheren</button> : null}
        {org.status === 'ACTIVE' && org.role && org.role !== 'ORG_ADMIN' ? <button className={button} disabled={busy} onClick={() => mutate('members.leave', {organizationId: org.id, expectedVersion: org.membershipVersion})}>Organisatie verlaten</button> : null}
        {org.status === 'ACTIVE' && ['ORG_ADMIN', 'IMPORTER', 'VIEWER'].includes(org.role ?? '') ? <button className={button} disabled={busy} onClick={() => void run('list', {organizationId: org.id}, 'assets')}>Privé-imports bekijken</button> : null}
      </article>)}
      {screen.overview.partial ? <p>De eerste 100 passende organisatierecords zijn gecontroleerd. Dit is geen volledige lijst.</p> : null}
    </section> : null}
    {screen.assets ? <section aria-label="Privé-imports" className="space-y-3"><h2 className="text-xl font-semibold">Privé-imports</h2>
      {!screen.assets.assets.length ? <p>Geen privé-imports beschikbaar.</p> : null}
      {screen.assets.assets.map(asset => <article key={asset.id} className="space-y-2 rounded-xl border p-4"><h3 className="font-semibold">{asset.name}</h3><div className="flex flex-wrap gap-2">{(['rental', 'insurance', 'finance'] as const).map(view => <button className={button} key={view} disabled={busy} onClick={() => void run('asset', {organizationId: screen.assets!.organizationId, assetId: asset.id, view}, 'detail')}>{({rental:'Verhuur',insurance:'Verzekering',finance:'Financiering'})[view]}</button>)}</div></article>)}
      {screen.assets.partial ? <p>De eerste 100 privé-assets worden getoond.</p> : null}
    </section> : null}
    {screen.detail ? <section aria-label="Assetdetails" className="space-y-3 rounded-xl border p-4"><button className={button} onClick={()=>setScreen({})}>Details sluiten ×</button><h2 className="text-xl font-semibold">{screen.detail.asset.name}</h2><p>{screen.detail.asset.brand} {screen.detail.asset.model}</p>
      {'serialNumber' in screen.detail.asset ? <p>Serienummer: {screen.detail.asset.serialNumber || 'Niet opgegeven'}</p> : null}
      <p>Dit is uitsluitend een privé-import. Deze weergave bevestigt geen registratie, eigendom, incidentstatus, dekking of financiering.</p>
      <p>Huidige toegang gecontroleerd: {screen.detail.asOf}</p><p>Alleen vastgelegde gebeurtenissen binnen je huidige toegangsrechten worden getoond.</p>
      <ol className="space-y-2">{screen.detail.timeline.map(item => <li key={item.id}>{item.recordedAt} · {item.label} · version {item.version}</li>)}</ol>
    </section> : null}
    {screen.members ? <section aria-label="Ledenrechten" className="space-y-3 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Ledenrechten</h2>
      <p>Beheer gewone rollen voor deze organisatie. Deze bevestigen geen wettelijke bevoegdheid, eigendom of beoordelaarskwalificatie. Documentuploads zijn hier niet beschikbaar.</p>
      {screen.members.memberships.map(m => <article key={m.userId} className="space-y-2 border-t pt-3">
        <p className="break-all">Account: {m.userId}</p><p>{m.role} · {m.status} · version {m.version}</p>
        <p>Vanaf: {new Date(m.startsAt).toLocaleString()}{m.endsAt ? ` · Tot: ${new Date(m.endsAt).toLocaleString()}` : ''}</p>
        {m.role !== 'ORG_ADMIN' && m.status === 'ACTIVE' ? <button className={button} disabled={busy} onClick={() => mutate('members.set', {organizationId:screen.members!.organizationId,userId:m.userId,role:m.role,status:'REVOKED',expectedVersion:m.version}, false)}>Toegang {m.role} intrekken</button> : null}
      </article>)}
      {screen.members.partial ? <p>De eerste 100 lidmaatschappen worden getoond. Een niet getoond bestaand account geeft een conflict; rechten worden niet overschreven.</p> : null}
      <form onSubmit={grant} className="grid gap-3 border-t pt-3">
        <label className="grid gap-1">Exact account-ID<input name="userId" required maxLength={200} disabled={busy} className="min-w-0 rounded-lg border p-3" /></label>
        <label className="grid gap-1">Gewone rol<select name="role" disabled={busy} className="min-w-0 rounded-lg border p-3"><option value="VIEWER">Lezer</option><option value="IMPORTER">Importeur</option><option value="EVIDENCE_WORKER">Documentmedewerker (uploads niet beschikbaar)</option></select></label>
        <p>Het account moet bestaan en een bevestigd e-mailadres hebben. Er wordt geen uitnodiging of e-mail verstuurd. Beheerders worden hier niet toegewezen.</p>
        <button className={button} disabled={busy}>Gewone toegang verlenen of bijwerken</button>
      </form>
    </section> : null}
    {screen.inbox ? <section aria-label="Beheerdersuitnodigingen" className="space-y-3 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Beheerdersuitnodigingen</h2>
      <p>Bestaande voorstellen aan jou of van je platformbeheerdersaccount. Dit zijn administratieve vastleggingen, geen geverifieerde bedrijfsidentiteiten of juridische mandaten. Accepteren legt uitsluitend je toestemming vast. Nieuwe beoordelingen en activering zijn hier niet beschikbaar.</p>
      {!screen.inbox.mandates.length ? <p>Geen beheerdersuitnodigingen beschikbaar.</p> : null}
      {screen.inbox.mandates.map(m => <article key={m.id} className="space-y-2 border-t pt-3">
        <h3 className="font-semibold">{m.organizationName}</h3><p>{m.scope} · {m.state}</p><p>Verloopt: {new Date(m.expiresAt).toLocaleString()}</p>
        <div className="flex flex-wrap gap-2">{m.canAccept ? <button className={button} disabled={busy} onClick={() => mutate('mandates.accept', {organizationId:m.organizationId,reviewId:m.id,expectedVersion:m.version})}>Beheerdersuitnodiging accepteren</button> : null}
        {m.canRevoke ? <button className={button} disabled={busy} onClick={() => mutate('mandates.revoke', {organizationId:m.organizationId,reviewId:m.id,expectedVersion:m.version,reason:'Issuing platform administrator withdrew the unused proposal through the business portal.'})}>Ongebruikte uitnodiging intrekken</button> : null}</div>
      </article>)}
      {screen.inbox.partial ? <p>De eerste 100 passende uitnodigingen uit de eerste 100 organisaties worden getoond.</p> : null}
    </section> : null}
    <section className="space-y-3 border-t pt-6"><h2 className="text-xl font-semibold">Organisatie aanvragen</h2><p className="text-sm">Eén openstaande aanvraag per account. Indienen maakt geen lidmaatschap aan en verleent geen beoordelaarsrechten. Documentuploads zijn niet beschikbaar.</p>
      <form onSubmit={submit} className="grid gap-3"><label className="grid gap-1">Organisatienaam<input name="displayName" required maxLength={200} disabled={busy} className="min-w-0 rounded-lg border p-3" /></label>
        <label className="grid gap-1">Landcode van twee letters<input name="countryCode" required pattern="[A-Za-z]{2}" maxLength={2} disabled={busy} placeholder="NL" className="min-w-0 rounded-lg border p-3" /></label>
        <button className={button} disabled={busy}>Ter beoordeling indienen</button>
      </form>
    </section>
  </main>;
}

