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
  401: 'Sign in with an email-verified account to continue.',
  409: 'A request already exists or has changed. Refresh your organizations before trying again.',
  400: 'Check the entered values and try again.',
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
      if (!response.ok) { setNotice(messages[response.status] ?? 'Access is unavailable. Refresh to check your current permissions or try again later.'); return; }
      if (target === 'request') setNotice(`Organization request recorded. Status: ${result.data.status}. No access or verification has been granted. Refresh your organizations to view it.`);
      else if (target === 'saved') setNotice('Saved. Refresh organizations or administrative invitations to check the current state. Acceptance does not grant administrator rights.');
      else setScreen({[target]: target === 'members' ? {...result.data, organizationId: input.organizationId} : result.data});
    } catch {
      if (version === sequence.current) setNotice('The result could not be confirmed. Refresh before retrying; a submitted request may already have been recorded.');
    } finally { clearTimeout(timeout); if (version === sequence.current) setBusy(false); }
  }, []);
  useEffect(() => {
    const initial = setTimeout(() => void run('overview', {}, 'overview'), 0);
    // On backgrounding or navigation, discard private results and late responses.
    const cancel = () => { ++sequence.current; active.current?.abort(); };
    const clear = () => { cancel(); setScreen({}); setBusy(false); setNotice('Refresh to check your current access.'); };
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
    <header className="space-y-3"><p className="text-sm font-semibold text-slate-600">EquipRegistry · Business workspace · English</p>
      <h1 className="text-3xl font-bold">Your organizations</h1>
      <p>Use your existing account to request an organization and view private assets that your current membership permits.</p>
      <p className="rounded-lg bg-amber-50 p-4 text-sm">Email verification confirms access to an email address. It does not verify identity, a company, ownership or authority. Organization activation and contract verification are not available here.</p>
      <div className="flex flex-wrap gap-3"><button className={button} disabled={busy} onClick={() => void run('overview', {}, 'overview')}>Refresh organizations</button><button className={button} disabled={busy} onClick={() => void run('mandates.inbox', {}, 'inbox')}>Administrative invitations</button><a className={button} href={`/${lang}/dashboard`}>Dashboard</a><a className={button} href={`/${lang}/login`}>Sign in</a></div>
    </header>
    <p role="status" aria-live="polite">{busy ? 'Checking current access…' : notice}</p>
    {platformManagementEnabled ? <a className={button} href={`/${lang}/dashboard/platform/administrators`}>Platform Management · Administrators and business verification</a> : null}
    {screen.overview ? <section aria-label="Organizations" className="space-y-3">
      {!screen.overview.organizations.length ? <p>No active memberships or pending requests are available.</p> : null}
      {screen.overview.organizations.map(org => <article key={org.id} className="space-y-2 rounded-xl border p-4">
        <h2 className="text-xl font-semibold">{org.name}</h2>{platformManagementEnabled?<p className="break-all text-sm">Organization ID: {org.id}</p>:null}<p>{org.status === 'PENDING_REVIEW' ? 'Pending independent review — no organization access granted.' : `Active membership · ${org.role}`}</p>
        {org.status === 'ACTIVE' && org.role === 'ORG_ADMIN' ? <button className={button} disabled={busy} onClick={() => void run('members.read', {organizationId: org.id}, 'members')}>Manage members</button> : null}
        {org.status === 'ACTIVE' && org.role && org.role !== 'ORG_ADMIN' ? <button className={button} disabled={busy} onClick={() => mutate('members.leave', {organizationId: org.id, expectedVersion: org.membershipVersion})}>Leave this organization</button> : null}
        {org.status === 'ACTIVE' && ['ORG_ADMIN', 'IMPORTER', 'VIEWER'].includes(org.role ?? '') ? <button className={button} disabled={busy} onClick={() => void run('list', {organizationId: org.id}, 'assets')}>View private assets</button> : null}
      </article>)}
      {screen.overview.partial ? <p>Only the first 100 matching organization records were checked. This is not a complete list.</p> : null}
    </section> : null}
    {screen.assets ? <section aria-label="Private assets" className="space-y-3"><h2 className="text-xl font-semibold">Private assets</h2>
      {!screen.assets.assets.length ? <p>No private assets available.</p> : null}
      {screen.assets.assets.map(asset => <article key={asset.id} className="space-y-2 rounded-xl border p-4"><h3 className="font-semibold">{asset.name}</h3><div className="flex flex-wrap gap-2">{(['rental', 'insurance', 'finance'] as const).map(view => <button className={button} key={view} disabled={busy} onClick={() => void run('asset', {organizationId: screen.assets!.organizationId, assetId: asset.id, view}, 'detail')}>{view}</button>)}</div></article>)}
      {screen.assets.partial ? <p>Only the first 100 assets are shown.</p> : null}
    </section> : null}
    {screen.detail ? <section aria-label="Asset details" className="space-y-3 rounded-xl border p-4"><h2 className="text-xl font-semibold">{screen.detail.asset.name}</h2><p>{screen.detail.asset.brand} {screen.detail.asset.model}</p>
      {'serialNumber' in screen.detail.asset ? <p>Serial: {screen.detail.asset.serialNumber || 'Not provided'}</p> : null}
      <p>Private import only. Registration, ownership, incident status, coverage and financing are not established by this view.</p>
      <p>Current access checked: {screen.detail.asOf}</p><p>{screen.detail.historyNotice}</p>
      <ol className="space-y-2">{screen.detail.timeline.map(item => <li key={item.id}>{item.recordedAt} · {item.label} · version {item.version}</li>)}</ol>
    </section> : null}
    {screen.members ? <section aria-label="Member permissions" className="space-y-3 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Member permissions</h2>
      <p>Manage ordinary roles for this organization. These roles do not establish legal authority, ownership or reviewer qualification. An evidence worker cannot upload documents here.</p>
      {screen.members.memberships.map(m => <article key={m.userId} className="space-y-2 border-t pt-3">
        <p className="break-all">Account: {m.userId}</p><p>{m.role} · {m.status} · version {m.version}</p>
        <p>Starts: {new Date(m.startsAt).toLocaleString()}{m.endsAt ? ` · Ends: ${new Date(m.endsAt).toLocaleString()}` : ''}</p>
        {m.role !== 'ORG_ADMIN' && m.status === 'ACTIVE' ? <button className={button} disabled={busy} onClick={() => mutate('members.set', {organizationId:screen.members!.organizationId,userId:m.userId,role:m.role,status:'REVOKED',expectedVersion:m.version}, false)}>Revoke {m.role} access</button> : null}
      </article>)}
      {screen.members.partial ? <p>Only the first 100 memberships are shown. An omitted existing account will produce a conflict; no rights are overwritten.</p> : null}
      <form onSubmit={grant} className="grid gap-3 border-t pt-3">
        <label className="grid gap-1">Exact account ID<input name="userId" required maxLength={200} disabled={busy} className="min-w-0 rounded-lg border p-3" /></label>
        <label className="grid gap-1">Ordinary role<select name="role" disabled={busy} className="min-w-0 rounded-lg border p-3"><option value="VIEWER">Viewer</option><option value="IMPORTER">Importer</option><option value="EVIDENCE_WORKER">Evidence worker (uploads unavailable)</option></select></label>
        <p>The account must already exist and be email-verified. This sends no invitation or email. Administrator assignment is unavailable here.</p>
        <button className={button} disabled={busy}>Grant or update ordinary access</button>
      </form>
    </section> : null}
    {screen.inbox ? <section aria-label="Administrative invitations" className="space-y-3 rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Administrative invitations</h2>
      <p>Existing proposals addressed to you, or issued by your current platform-admin account. These are administrative records, not verified company identities or legal mandates. Accepting records your consent only. New reviews and activation remain unavailable here.</p>
      {!screen.inbox.mandates.length ? <p>No administrative invitations available.</p> : null}
      {screen.inbox.mandates.map(m => <article key={m.id} className="space-y-2 border-t pt-3">
        <h3 className="font-semibold">{m.organizationName}</h3><p>{m.scope} · {m.state}</p><p>Expires: {new Date(m.expiresAt).toLocaleString()}</p>
        <div className="flex flex-wrap gap-2">{m.canAccept ? <button className={button} disabled={busy} onClick={() => mutate('mandates.accept', {organizationId:m.organizationId,reviewId:m.id,expectedVersion:m.version})}>Accept administrative invitation</button> : null}
        {m.canRevoke ? <button className={button} disabled={busy} onClick={() => mutate('mandates.revoke', {organizationId:m.organizationId,reviewId:m.id,expectedVersion:m.version,reason:'Issuing platform administrator withdrew the unused proposal through the business portal.'})}>Revoke unused invitation</button> : null}</div>
      </article>)}
      {screen.inbox.partial ? <p>Only the first 100 matching invitations across the first 100 organizations are shown.</p> : null}
    </section> : null}
    <section className="space-y-3 border-t pt-6"><h2 className="text-xl font-semibold">Request an organization</h2><p className="text-sm">One pending request per account. Submission does not create membership or grant reviewer rights. No documents can be uploaded.</p>
      <form onSubmit={submit} className="grid gap-3"><label className="grid gap-1">Organization name<input name="displayName" required maxLength={200} disabled={busy} className="min-w-0 rounded-lg border p-3" /></label>
        <label className="grid gap-1">Two-letter country code<input name="countryCode" required pattern="[A-Za-z]{2}" maxLength={2} disabled={busy} placeholder="NL" className="min-w-0 rounded-lg border p-3" /></label>
        <button className={button} disabled={busy}>Submit for review</button>
      </form>
    </section>
  </main>;
}

