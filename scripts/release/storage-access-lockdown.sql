-- Prepared Section68 operation. CLONE FIRST. No object or bucket rows are changed.
-- Requires Storage policy ownership. Service-role backend remains responsible for auth/provenance.
BEGIN;
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='storage' AND c.relname='objects' AND c.relrowsecurity)
 THEN RAISE EXCEPTION 'STORAGE_RLS_REQUIRED'; END IF;
END $$;
-- Restrictive policy also blocks a forgotten permissive policy; no new upload route.
CREATE POLICY er68_deny_direct_objects ON storage.objects AS RESTRICTIVE
FOR ALL TO anon, authenticated USING(false) WITH CHECK(false);
DROP POLICY IF EXISTS "Allow uploads bucket 1fah9o2_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow read 1fah9o2_0" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads 1fah9o2_0" ON storage.objects;
COMMIT;
