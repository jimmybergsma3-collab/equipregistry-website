// Read-only projection. Source adapters must hold current account/org locks throughout the callback.
export type View = 'rental' | 'insurance' | 'finance';
export type MemberRole = 'ORG_ADMIN' | 'IMPORTER' | 'VIEWER';
export type Asset = { id: string; organizationId: string; assetName: string; category: string; brand: string | null; model: string | null; serialNumber: string | null; lifecycleState: string; version: number; createdAt: Date };
export type Event = { id: string; organizationId: string; subjectId: string; action: string; subjectVersion: number; createdAt: Date };
export type Access = { actorId: string; accountEnabled: boolean; organizationId: string; organizationStatus: string; member: { userId: string; organizationId: string; role: string; status: string; startsAt: Date; endsAt: Date | null } | null; now: Date };
export type Snapshot = { list?: () => Promise<{id: string; assetName: string}[]>; access: Access; asset: (id: string) => Promise<Asset | null>; events: (id: string) => Promise<Event[]> };
export type Reader = { withSnapshot<T>(organizationId: string, read: (snapshot: Snapshot) => Promise<T>): Promise<T> };
export class BusinessError extends Error {
  constructor(public status = 404) { super('BUSINESS_UNAVAILABLE'); }
}
export const actions: Record<string, string> = Object.freeze({
  PRIVATE_ASSET_CREATED: 'Privé-asset aangemaakt', PRIVATE_ASSET_NAME_CORRECTED: 'Assetnaam gecorrigeerd',
  DRAFT_ARCHIVED: 'Privéconcept gearchiveerd', DRAFT_RESTORED: 'Privéconcept hersteld',
});
const validDate = (v: Date) => v instanceof Date && Number.isFinite(v.getTime());
export function authorize(a: Access, organizationId: string): MemberRole {
  if (!a.actorId || !a.accountEnabled) throw new BusinessError(401);
  const m = a.member;
  if (!validDate(a.now) || a.organizationId !== organizationId || a.organizationStatus !== 'ACTIVE' || !m ||
      m.userId !== a.actorId || m.organizationId !== organizationId || m.status !== 'ACTIVE' ||
      !validDate(m.startsAt) || m.startsAt > a.now || m.endsAt !== null ||
      !['ORG_ADMIN', 'IMPORTER', 'VIEWER'].includes(m.role)) throw new BusinessError();
  return m.role as MemberRole;
}
export async function readBusinessAsset(reader: Reader, input: { organizationId: string; assetId: string; view: View }) {
  const uuid = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  if (!uuid.test(input.organizationId) || !uuid.test(input.assetId) || !['rental', 'insurance', 'finance'].includes(input.view) ||
      Object.keys(input).some(k => !['organizationId', 'assetId', 'view'].includes(k))) throw new BusinessError(400);
  try {
    return await reader.withSnapshot(input.organizationId, async snapshot => {
      const role = authorize(snapshot.access, input.organizationId);
      const a = await snapshot.asset(input.assetId);
      if (!a || a.id !== input.assetId || a.organizationId !== input.organizationId || a.lifecycleState !== 'IMPORTED_PRIVATE' ||
          !validDate(a.createdAt) || a.createdAt > snapshot.access.now || !Number.isSafeInteger(a.version) || a.version < 0) throw new BusinessError();
      // Existing detailed organization audit permission belongs to ORG_ADMIN only.
      const events = role === 'ORG_ADMIN' ? await snapshot.events(a.id) : [];
      if (events.length > 101) throw new BusinessError(503);
      const ids = new Set<string>();
      const versions = new Set<number>();
      for (const e of events) {
        if (e.organizationId !== a.organizationId || e.subjectId !== a.id || !Object.hasOwn(actions, e.action) ||
            !validDate(e.createdAt) || e.createdAt < a.createdAt || e.createdAt > snapshot.access.now ||
            !Number.isSafeInteger(e.subjectVersion) || e.subjectVersion < 0 || e.subjectVersion > a.version ||
            !e.id || ids.has(e.id) || versions.has(e.subjectVersion)) throw new BusinessError(503);
        ids.add(e.id); versions.add(e.subjectVersion);
      }
      // Select the latest 100 actual source events, then show ascending source version.
      const sorted = [...events].sort((x, y) => y.subjectVersion - x.subjectVersion);
      const timeline = sorted.slice(0, 100).reverse().map(e => ({
        source: 'OrganizationEvent' as const, id: e.id, version: e.subjectVersion,
        recordedAt: e.createdAt.toISOString(), label: actions[e.action],
      }));
      authorize(snapshot.access, input.organizationId);
      return {
        asset: { id: a.id, name: a.assetName, category: a.category, brand: a.brand, model: a.model,
          // Purpose views minimize identifiers; no serial-search endpoint exists.
          ...(input.view === 'rental' ? { serialNumber: a.serialNumber } : {}), version: a.version },
        view: input.view, role, asOf: snapshot.access.now.toISOString(),
        status: 'Privé geïmporteerd', registration: 'Geen registratiekoppeling', verification: 'Niet vastgesteld',
        incident: 'Niet gekoppeld — incidentstatus onbekend', transfer: 'Geen overdrachtsproces beschikbaar',
        ...(input.view === 'insurance' ? { coverage: 'Dekking niet vastgesteld' } : {}),
        ...(input.view === 'finance' ? { finance: 'Financiering of lease niet vastgesteld' } : {}),
        timeline, history: role !== 'ORG_ADMIN' ? 'restricted' : events.length > 100 ? 'partial' : 'available',
        historyNotice: role !== 'ORG_ADMIN' ? 'Gedetailleerde historie is alleen zichtbaar voor de organisatiebeheerder.' :
          events.length > 100 ? 'Alleen de laatste 100 brongebeurtenissen; oudere historie is niet weergegeven.' :
          'Uitsluitend beschikbare brongebeurtenissen. Geen volledige levensloop of vroegere veldwaarden afgeleid.',
      };
    });
  } catch (error) { if (error instanceof BusinessError) throw error; throw new BusinessError(503); }
}
