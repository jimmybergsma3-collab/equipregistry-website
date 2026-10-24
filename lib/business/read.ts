import 'server-only';
import { businessDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { canUseAuthenticatedApp } from '@/lib/auth/email-verification';
import { actions, authorize, BusinessError, readBusinessAsset, type Reader, type View } from './model';

// Internal reader; exposed only by the default-disabled synthetic local adapter.
// No writes, legacy identity bridge, field-evidence read, or external grants.
function createReader(requireVerifiedEmail = false): Reader { return {
  async withSnapshot(organizationId, read) {
    const session = await getSession();
    if (!session.isAuthenticated) throw new BusinessError(401);
    return prisma.$transaction(async tx => {
      const users = await tx.$queryRaw<{ id: string; role: 'user' | 'admin'; emailVerifiedAt: Date | null }[]>`
        SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${session.user.id} FOR SHARE`;
      const user = users[0];
      if (!user || !canUseAuthenticatedApp(user) || (requireVerifiedEmail && !user.emailVerifiedAt)) throw new BusinessError(401);
      const orgs = await tx.$queryRaw<{ status: string }[]>`SELECT status FROM public."Organization" WHERE id=${organizationId}::uuid FOR UPDATE`;
      const member = await tx.organizationMembership.findUnique({where: {organizationId_userId: {organizationId, userId: user.id}}});
      const now = (await tx.$queryRaw<{ now: Date }[]>`SELECT clock_timestamp() now`)[0].now;
      return read({
        list: () => tx.privateImportedAsset.findMany({where: {organizationId, lifecycleState: "IMPORTED_PRIVATE"}, select: {id: true, assetName: true}, orderBy: {id: "asc"}, take: 101}),
        access: {actorId: user.id, accountEnabled: true, organizationId, organizationStatus: orgs[0]?.status ?? '', member, now},
        asset: id => tx.privateImportedAsset.findFirst({
          where: {id, organizationId, lifecycleState: 'IMPORTED_PRIVATE'},
          select: {id: true, organizationId: true, assetName: true, category: true, brand: true, model: true, serialNumber: true, lifecycleState: true, version: true, createdAt: true},
        }),
        events: id => tx.organizationEvent.findMany({
          where: {organizationId, subjectId: id, action: {in: Object.keys(actions)}},
          select: {id: true, organizationId: true, subjectId: true, action: true, subjectVersion: true, createdAt: true},
          orderBy: [{subjectVersion: 'desc'}, {id: 'desc'}], take: 101,
        }),
      });
    }, {maxWait: 5000, timeout: 10000});
  },
}; }
export function readPrivateBusinessAsset(input: { organizationId: string; assetId: string; view: View }, requireVerifiedEmail = false) {
  return readBusinessAsset(createReader(requireVerifiedEmail), input);
}

export async function listPrivateBusinessAssets(organizationId: string, requireVerifiedEmail = false) {
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(organizationId)) throw new BusinessError(400);
  try {
    return await createReader(requireVerifiedEmail).withSnapshot(organizationId, async snapshot => {
      authorize(snapshot.access, organizationId);
      // Listing runs under the same account/organization lock as the detail reader.
      if (!snapshot.list) throw new BusinessError(503);
      const assets = await snapshot.list();
      return { organizationId, partial: assets.length > 100, assets: assets.slice(0, 100).map(a => ({id: a.id, name: a.assetName})) };
    });
  } catch (error) { if (error instanceof BusinessError) throw error; throw new BusinessError(503); }
}
