-- Read-only; use only an independently authorized read-only connection.
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout='15s';
SET LOCAL lock_timeout='2s';
SELECT id,public,file_size_limit,allowed_mime_types FROM storage.buckets ORDER BY id;
SELECT bucket_id,count(*) AS object_count FROM storage.objects GROUP BY bucket_id ORDER BY bucket_id;
SELECT schemaname,tablename,policyname,roles,cmd,qual,with_check FROM pg_policies WHERE schemaname='storage' ORDER BY tablename,policyname;
SELECT grantee,table_name,privilege_type FROM information_schema.role_table_grants WHERE table_schema='storage' ORDER BY grantee,table_name,privilege_type;
SELECT n.nspname,c.relname,c.relrowsecurity,c.relforcerowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='storage' AND c.relkind='r' ORDER BY c.relname;
ROLLBACK;
-- Missing storage schema/privileges is an unavailable check, never PASS.
-- Service keys bypass RLS; this inventory cannot prove HTTP revocation/cache expiry.
