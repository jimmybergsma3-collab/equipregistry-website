import 'server-only';
import { organizationDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import * as governance from '@/lib/organizations/governance';
import { OrganizationError, readOrganizationAdministration, setMembership } from '@/lib/organizations/service';
import { BusinessError } from './model';
import { portalEnabled } from './portal';

type Mandate = {id: string; organizationId: string; targetId: string; reviewerId: string; scope: string; version: number; expiresAt: Date; acceptedAt: Date | null; revokedAt: Date | null; usedAt: Date | null; organizationVersion: number};

// An administrative invitation is not an independently verified legal mandate.
// Deliberately no bootstrap, source registration, proposal, application or activation.
export async function accessCommand(command: string, input: unknown) {
  if (!portalEnabled()) throw new BusinessError(404);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new BusinessError(400);
  const commands: Record<string, () => Promise<unknown>> = {
    'members.read': () => readOrganizationAdministration(input, true),
    'members.set': () => setMembership(input, true),
    'members.leave': () => governance.leaveOrganization(input, true),
    'mandates.accept': () => governance.acceptMandate(input, true),
    'mandates.revoke': () => governance.revokeMandate(input),
  };
  try {
    if (Object.hasOwn(commands, command)) return await commands[command]();
    if (command !== 'mandates.inbox' || Object.keys(input).length) throw new BusinessError(400);
    const session = await getSession();
    if (!session.isAuthenticated) throw new BusinessError(401);
    return await prisma.$transaction(async tx => {
      const actor = (await tx.$queryRaw<{id: string; role: string; emailVerifiedAt: Date | null}[]>`
        SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${session.user.id} FOR SHARE`)[0];
      if (!actor?.emailVerifiedAt) throw new BusinessError(401);
      // Only proposals addressed to this account or issued by this current admin.
      // Never turn a platform role into a tenant directory or asset-read privilege.
      const selected = await tx.$queryRaw<{id: string}[]>`
        SELECT o.id FROM public."Organization" o WHERE EXISTS (
          SELECT 1 FROM governance_private."Mandate" m WHERE m."organizationId"=o.id
          AND (m."targetId"=${actor.id} OR (m."reviewerId"=${actor.id} AND ${actor.role}='admin'))
        ) ORDER BY o.id LIMIT 101 FOR UPDATE OF o`;
      if (!selected.length) return {mandates: [], partial: false};
      const ids = selected.slice(0, 100).map(o => o.id);
      const rows = await tx.$queryRaw<Mandate[]>`
        SELECT id,"organizationId","targetId","reviewerId",scope,version,"expiresAt","acceptedAt","revokedAt","usedAt","organizationVersion"
        FROM governance_private."Mandate" WHERE "organizationId"=ANY(${ids}::uuid[])
        AND ("targetId"=${actor.id} OR ("reviewerId"=${actor.id} AND ${actor.role}='admin'))
        ORDER BY "createdAt" DESC,id LIMIT 101`;
      const clock = (await tx.$queryRaw<{now: Date}[]>`SELECT clock_timestamp() now`)[0].now;
      const orgs = await tx.organization.findMany({where:{id:{in:ids}},select:{id:true,displayName:true,version:true,status:true}});
      return {partial: selected.length > 100 || rows.length > 100, mandates: rows.slice(0, 100).map(m => {
        const org = orgs.find(o => o.id === m.organizationId)!;
        const state = m.usedAt ? 'USED' : m.revokedAt ? 'REVOKED' : m.expiresAt <= clock ? 'EXPIRED' :
          m.organizationVersion !== org.version ? 'STALE' : m.acceptedAt ? 'ACCEPTED' : 'AWAITING_ACCEPTANCE';
        return {id:m.id, organizationId:org.id, organizationName:org.displayName, scope:m.scope, version:m.version,
          expiresAt:m.expiresAt.toISOString(), state, addressedToYou:m.targetId===actor.id,
          canAccept:m.targetId===actor.id && state==='AWAITING_ACCEPTANCE',
          canRevoke:actor.role==='admin' && m.reviewerId===actor.id && !m.usedAt && !m.revokedAt};
      })};
    }, {maxWait:5000, timeout:10000});
  } catch (error) {
    if (error instanceof BusinessError) throw error;
    if (error instanceof OrganizationError) throw new BusinessError(error.status);
    throw new BusinessError(503);
  }
}
