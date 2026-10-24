import { prisma } from "@/lib/db";
import {
  generatePassportNumber,
  getOfficialPassportNumber,
  getPassportNumberPrefix,
  getPassportSequenceId,
} from "@/lib/registry/reference";

// Deliberately committed separately from registration: failed requests leave gaps,
// never reusable reservations. Do not accept a caller's transaction client.
export async function reserveNextPassportNumber(category: string, subcategory?: string) {
  const prefix = getPassportNumberPrefix(category, subcategory);
  const sequenceId = getPassportSequenceId(category, subcategory);
  return prisma.$transaction(async (tx) => {
    // Preserve historical display aliases without changing their stored references.
    const legacy = await tx.$queryRaw<Array<{ reference: string; category: string; subcategory: string | null }>>`
      SELECT reference, category, subcategory FROM public."RegistrationRequest"
      WHERE reference !~* '^ER-(LM|BK|SV|HA)-[0-9]{6}$'
      UNION ALL
      SELECT m."registryId", coalesce(m.category, ''), r.subcategory FROM public."Machine" m
      LEFT JOIN public."RegistrationRequest" r ON r.reference = m."registryId"
      WHERE m."registryId" !~* '^ER-(LM|BK|SV|HA)-[0-9]{6}$'
    `;
    let legacyFloor = 0;
    // Stable order avoids conflicting historical-alias lock acquisition.
    legacy.sort((a, b) => a.reference.localeCompare(b.reference) || a.category.localeCompare(b.category) || (a.subcategory ?? "").localeCompare(b.subcategory ?? ""));
    for (const row of legacy) {
      const alias = getOfficialPassportNumber(row.reference, row.category, row.subcategory ?? undefined);
      await tx.$executeRaw`
        INSERT INTO registry_private."NumberReservation" (reference, "claimedRequestId")
        VALUES (${alias}, 'historical-display-alias') ON CONFLICT (reference) DO NOTHING
      `;
      if (alias.startsWith(prefix + "-")) legacyFloor = Math.max(legacyFloor, Number(alias.slice(prefix.length + 1)));
    }
    const rows = await tx.$queryRaw<Array<{ sequence: number }>>`
      WITH known AS (
        SELECT upper(trim(reference)) AS reference FROM public."RegistrationRequest"
        UNION ALL SELECT upper(trim("registryId")) FROM public."Machine"
        UNION ALL SELECT reference FROM registry_private."NumberReservation"
      ), floor AS (
        SELECT greatest(${legacyFloor}::bigint, coalesce(max(substring(reference from '[0-9]+$')::bigint), 0)) AS value
        FROM known WHERE reference ~ ('^' || ${prefix} || '-[0-9]+$')
      ), reserved AS (
        INSERT INTO public."RegistrySequence" AS counter (id, "nextValue", "updatedAt")
        SELECT ${sequenceId}, (value + 2)::integer, CURRENT_TIMESTAMP FROM floor WHERE value < 999999
        ON CONFLICT (id) DO UPDATE SET
          "nextValue" = greatest(counter."nextValue", EXCLUDED."nextValue" - 1) + 1,
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE counter."nextValue" BETWEEN 1 AND 999999
        RETURNING "nextValue" - 1 AS sequence
      ), recorded AS (
        INSERT INTO registry_private."NumberReservation" (reference)
        SELECT ${prefix} || '-' || lpad(sequence::text, 6, '0') FROM reserved
        RETURNING reference
      ) SELECT sequence FROM reserved WHERE EXISTS (SELECT 1 FROM recorded)
    `;
    if (rows.length !== 1) throw new Error("PASSPORT_NUMBER_EXHAUSTED_OR_INVALID_COUNTER");
    const sequence = rows[0].sequence;
    return { sequence, passportNumber: generatePassportNumber(sequence, category, subcategory) };
  }, { maxWait: 10000, timeout: 15000 });
}
