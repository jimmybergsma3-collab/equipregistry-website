import 'server-only';
import { organizationDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { BusinessError } from './model';

// Release gate only; no synthetic profile login and no verification authority.
export function portalEnabled() { return process.env.ER_BUSINESS_PORTAL_ENABLED === '1'; }
function deny(status = 404): never { throw new BusinessError(status); }
function object(input: unknown, keys: string[]) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(k => !keys.includes(k))) deny(400);
  return input as Record<string, unknown>;
}

export async function portalCommand(command: string, input: unknown) {
  if (!portalEnabled()) deny();
  if (!['overview', 'request'].includes(command)) deny(400);
  const v = object(input, command === 'request' ? ['id', 'displayName', 'countryCode'] : []);
  const session = await getSession();
  if (!session.isAuthenticated) deny(401);
  try {
    return await prisma.$transaction(async tx => {
      // Serialize applicant retries and re-check verification inside the write boundary.
      const account = (await tx.$queryRaw<{id: string; emailVerifiedAt: Date | null}[]>`
        SELECT id,"emailVerifiedAt" FROM public."User" WHERE id=${session.user.id} FOR UPDATE`)[0];
      if (!account?.emailVerifiedAt) deny(401);
      if (command === 'request') {
        const {id, displayName, countryCode} = v;
        if (typeof id !== 'string' || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(id) ||
            typeof displayName !== 'string' || displayName !== displayName.trim().normalize('NFC') ||
            !displayName || displayName.length > 200 || /[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(displayName) ||
            typeof countryCode !== 'string' || !/^[A-Z]{2}$/.test(countryCode)) deny(400);
        const existing = await tx.organization.findUnique({where: {id}});
        if (existing) {
          const own = await tx.organizationEvent.findFirst({where: {organizationId: id, actorId: account.id, action: 'ORGANIZATION_CREATED'}});
          if (!own) deny();
          if (existing.displayName !== displayName || existing.countryCode !== countryCode) deny(409);
          return {id, status: existing.status, replayed: true};
        }
        if (await tx.organizationEvent.findFirst({where: {actorId: account.id, action: 'ORGANIZATION_CREATED', organization: {status: 'PENDING_REVIEW'}}})) deny(409);
        const org = await tx.organization.create({data: {id, displayName, countryCode}});
        await tx.organizationEvent.create({data: {organizationId: id, actorId: account.id, action: 'ORGANIZATION_CREATED', subjectId: id, subjectVersion: 0}});
        // Missing migration/privilege rejects and rolls back the entire request.
        await tx.$executeRaw`INSERT INTO portal_private.request(organization_id,applicant_id) VALUES(${id}::uuid,${account.id})`;
        return {id, status: org.status, replayed: false};
      }
      const now = (await tx.$queryRaw<{now: Date}[]>`SELECT clock_timestamp() now`)[0].now;
      // Lock organizations in a stable order before exposing current membership data.
      const orgs = await tx.$queryRaw<{id: string; displayName: string; status: string}[]>`
        SELECT o.id,o."displayName",o.status FROM public."Organization" o
        WHERE EXISTS (SELECT 1 FROM public."OrganizationMembership" m WHERE m."organizationId"=o.id AND m."userId"=${account.id})
           OR EXISTS (SELECT 1 FROM public."OrganizationEvent" e WHERE e."organizationId"=o.id AND e."actorId"=${account.id} AND e.action='ORGANIZATION_CREATED' AND o.status='PENDING_REVIEW')
        ORDER BY o.id LIMIT 101 FOR UPDATE OF o`;
      const memberships = await tx.organizationMembership.findMany({where: {userId: account.id, organizationId: {in: orgs.map(o => o.id)}, status: 'ACTIVE', endsAt: null, startsAt: {lte: now}}, select: {organizationId: true, role: true, version: true}});
      const requests = await tx.organizationEvent.findMany({where: {actorId: account.id, action: 'ORGANIZATION_CREATED', organizationId: {in: orgs.map(o => o.id)}}, select: {organizationId: true}});
      return {partial: orgs.length > 100, organizations: orgs.slice(0, 100).flatMap<{id: string; name: string; status: string; role: string | null}>(o => {
        const membership = memberships.find(m => m.organizationId === o.id);
        if (o.status === 'ACTIVE' && membership) return [{id: o.id, name: o.displayName, status: o.status, role: membership.role, membershipVersion: membership.version}];
        if (o.status === 'PENDING_REVIEW' && requests.some(r => r.organizationId === o.id)) return [{id: o.id, name: o.displayName, status: o.status, role: null}];
        return [];
      })};
    }, {maxWait: 5000, timeout: 10000});
  } catch (e) { if (e instanceof BusinessError) throw e; throw new BusinessError(503); }
}
