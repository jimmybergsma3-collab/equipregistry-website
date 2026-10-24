import "server-only";
import type { Prisma } from "@prisma/client";
import { importDb as prisma } from '@/lib/db-capabilities';
import { getSession } from "../auth/getSession";
import { OrganizationError } from "../organizations/service";
import { parseImport } from "./parse";
import { validateRows, type ValidationProfile } from "./validate";
import { markConflicts } from "./conflicts";
import { fail, PreparationError, type FileInput, type ParseProfile } from "./contract";
import { type Mapping } from "./mapping";

/** Internal server entry point, deliberately not exposed as an action or HTTP endpoint.
 * Calls no mutator. Future persistence must obtain fresh authorization and recheck conflicts.
 */
type PreparationInput = { organizationId: string; file: FileInput; parse: ParseProfile; mapping: Mapping; validation: ValidationProfile };
export async function preparePrivateImport(input: PreparationInput) {
  try { return await prepare(input); }
  catch (error) {
    if (error instanceof PreparationError || error instanceof OrganizationError) throw error;
    return fail("PREVIEW_UNAVAILABLE");
  }
}
async function prepare(input: PreparationInput) {
  const session = await getSession();
  if (!session.isAuthenticated) throw new OrganizationError(401);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input.organizationId)) throw new OrganizationError(404);
  // Authorize before parsing, and again under the existing governance lock after parsing.
  const authorize = async (tx: Prisma.TransactionClient) => {
    await tx.$queryRaw`SELECT set_config('er.import_actor',${session.user.id},true),set_config('er.import_org',${input.organizationId},true)`;
    const users = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM public."User" WHERE id=${session.user.id} FOR SHARE`;
    if (!users.length) throw new OrganizationError(401);
    const organizations = await tx.$queryRaw<{ status: string }[]>`SELECT status FROM public."Organization" WHERE id=${input.organizationId}::uuid FOR UPDATE`;
    const member = await tx.organizationMembership.findUnique({ where: { organizationId_userId: { organizationId: input.organizationId, userId: session.user.id } } });
    if (organizations[0]?.status !== "ACTIVE" || member?.status !== "ACTIVE" || member.endsAt || !["ORG_ADMIN", "IMPORTER"].includes(member.role)) throw new OrganizationError(404);
  };
  await prisma.$transaction(authorize);
  const table = await parseImport(input.file, input.parse);
  const rows = validateRows(table, input.mapping, input.validation);
  return prisma.$transaction(async tx => {
    await authorize(tx);
    const existing = await tx.privateImportedAsset.findMany({ where: { organizationId: input.organizationId },
      select: { organizationId: true, assetName: true, category: true, subcategory: true, brand: true, model: true, serialNumber: true, identifierType: true, sourceSystem: true, externalAssetKey: true, lifecycleState: true },
      take: 10001, orderBy: { id: "asc" } });
    return { version: "4C-1-v1", dryRun: true as const, persistable: false as const,
      coverage: { file: "CHECKED", ownOrganization: "CHECKED_INCLUDING_ARCHIVED", legacyRegistry: "NOT_CHECKED_NO_PROVEN_ORGANIZATION_LINK", otherOrganizations: "NOT_QUERIED" },
      rows: markConflicts(rows, input.organizationId, existing),
      sheets: table.sheets, duplicateHeaders: table.duplicateHeaders,
      ownershipClaim: false, evidenceVerified: false };
  });
}
