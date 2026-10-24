-- Read-only inspection; use project identity verification before execution.
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout='15s';
SET LOCAL lock_timeout='2s';
SELECT count(*) AS total, count(*) FILTER (WHERE "deletedAt" IS NOT NULL) AS soft_deleted
FROM public."RegistrationRequest";
SELECT upper(trim(reference)) AS number, count(*) AS occurrences
FROM public."RegistrationRequest" GROUP BY 1 HAVING count(*) > 1;
SELECT upper(trim("registryId")) AS number, count(*) AS occurrences
FROM public."Machine" GROUP BY 1 HAVING count(*) > 1;
SELECT r.reference, r.category, r.subcategory, r."deletedAt" IS NOT NULL AS deleted
FROM public."RegistrationRequest" r ORDER BY reference;
SELECT "registryId", category FROM public."Machine" ORDER BY "registryId";
SELECT * FROM public."RegistrySequence" ORDER BY id;
SELECT count(*) AS shared_references,
 count(*) FILTER (WHERE m."ownerId" <> r."userId" OR m."serialNumber" <> r."serialNumber") AS inconsistent_links
FROM public."Machine" m JOIN public."RegistrationRequest" r
ON upper(trim(m."registryId")) = upper(trim(r.reference));
-- Text references in JSON are evidence to review, NEVER automatic allocation floors.
SELECT hit[1] AS reference, count(*) AS occurrences FROM public."RegistrationRequest" r
CROSS JOIN LATERAL regexp_matches(r."dynamicFields"::text || ' ' || r.documents::text,
 '(ER-(?:LM|BK|SV|HA)-[0-9]+)', 'gi') AS hit GROUP BY 1;
SELECT schemaname, tablename, indexdef FROM pg_indexes
WHERE tablename IN ('RegistrationRequest','Machine','RegistrySequence','NumberReservation');
ROLLBACK;
