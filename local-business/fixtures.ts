import { type Reader, type Access, type Asset, type Event } from '../lib/business/model';
export const organizations = { a: '11111111-1111-4111-8111-111111111111', b: '22222222-2222-4222-8222-222222222222' };
export const profiles = {
  admin: { label: 'Organisatiebeheerder · Noord', role: 'ORG_ADMIN', org: organizations.a },
  importer: { label: 'Importmedewerker · Noord', role: 'IMPORTER', org: organizations.a },
  viewer: { label: 'Lezer · Noord', role: 'VIEWER', org: organizations.a },
  other: { label: 'Organisatiebeheerder · Zuid', role: 'ORG_ADMIN', org: organizations.b },
  worker: { label: 'Evidence-medewerker · Noord', role: 'EVIDENCE_WORKER', org: organizations.a },
  insurer: { label: 'Externe verzekeraar · geen toestemming', role: 'EXTERNAL_INSURER', org: organizations.a },
  finance: { label: 'Externe financier · geen toestemming', role: 'EXTERNAL_FINANCE', org: organizations.a },
  platform: { label: 'Platformbeheerder · geen lidmaatschap', role: 'PLATFORM_ADMIN', org: organizations.a },
} as const;
export type Profile = keyof typeof profiles;
const date = (day: number) => new Date(`2026-10-${String(day).padStart(2, '0')}T10:00:00.000Z`);
export function fixtureStore() {
  const assets: Asset[] = ['Graafmachine Atlas', 'Mobiele generator', 'Werkplatform', 'Zuid transportwagen'].map((name, index) => ({
    id: `aaaaaaaa-aaaa-4aaa-8aaa-${String(index + 1).padStart(12, '0')}`,
    organizationId: index === 3 ? organizations.b : organizations.a, assetName: `Demo · ${name}`, category: index === 3 ? 'transport' : 'equipment',
    brand: 'Synthetisch', model: `Model ${index + 1}`, serialNumber: `DEMO-00${index + 1}`,
    lifecycleState: 'IMPORTED_PRIVATE', version: index === 0 ? 3 : 0, createdAt: date(1),
  }));
  const events: Event[] = assets.map((a, i) => ({id: `fixture-event-${i}`, organizationId: a.organizationId, subjectId: a.id, action: 'PRIVATE_ASSET_CREATED', subjectVersion: 0, createdAt: date(1)}));
  ['PRIVATE_ASSET_NAME_CORRECTED', 'DRAFT_ARCHIVED', 'DRAFT_RESTORED'].forEach((action, i) => events.push({id: `fixture-change-${i}`, organizationId: organizations.a, subjectId: assets[0].id, action, subjectVersion: i + 1, createdAt: date(i + 2)}));
  return { assets, events };
}
export function fixtureReader(profile: Profile, store = fixtureStore()): Reader {
  return {
    async withSnapshot(organizationId, read) {
      const p = profiles[profile];
      const access: Access = {
        actorId: `synthetic-${profile}`, accountEnabled: true, organizationId, organizationStatus: 'ACTIVE', now: date(9),
        member: p.role.startsWith('EXTERNAL') || profile === 'platform' ? null : {
          userId: `synthetic-${profile}`, organizationId: p.org, role: p.role, status: 'ACTIVE', startsAt: date(1), endsAt: null,
        },
      };
      return read({access, asset: async id => store.assets.find(a => a.id === id && a.organizationId === organizationId) ?? null,
        events: async id => store.events.filter(e => e.organizationId === organizationId && e.subjectId === id).sort((a,b) => b.subjectVersion-a.subjectVersion).slice(0,101)});
    },
  };
}
