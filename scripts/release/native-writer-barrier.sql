-- Section68 prepared native barrier. No production execution in this task.
-- psql -X -v ON_ERROR_STOP=1 -v old_writer=DEDICATED_OLD_ROLE -f native-writer-barrier.sql
-- Only a dedicated, non-owner, non-privileged login is eligible. Shared postgres is rejected.
\set ON_ERROR_STOP on
SELECT set_config('er68.old_writer', :'old_writer', false);
DO $$ DECLARE r record; BEGIN
 SELECT * INTO r FROM pg_roles WHERE rolname=current_setting('er68.old_writer');
 IF NOT FOUND OR r.rolname=current_user OR r.rolname IN ('postgres','authenticator','service_role','anon','authenticated')
 OR r.rolname LIKE 'pg_%' OR r.rolname LIKE 'supabase_%'
 OR r.rolsuper OR r.rolbypassrls OR r.rolcreaterole OR r.rolcreatedb OR r.rolreplication
 OR EXISTS(SELECT 1 FROM pg_auth_members WHERE member=r.oid OR roleid=r.oid)
 OR EXISTS(SELECT 1 FROM pg_shdepend WHERE refclassid='pg_authid'::regclass AND refobjid=r.oid AND deptype='o')
 OR EXISTS(SELECT 1 FROM pg_prepared_xacts WHERE owner=r.rolname)
 THEN RAISE EXCEPTION 'DEDICATED_DRAINABLE_WRITER_REQUIRED'; END IF;
 EXECUTE format('ALTER ROLE %I NOLOGIN',r.rolname);
END $$;
-- NOLOGIN alone does not affect existing sessions. Termination rolls back in-flight work.
SELECT pg_terminate_backend(pid) FROM pg_stat_activity
WHERE usename=current_setting('er68.old_writer') AND pid<>pg_backend_pid();
DO $$ DECLARE s text; r text:=current_setting('er68.old_writer'); BEGIN
 EXECUTE format('REVOKE CONNECT ON DATABASE %I FROM %I',current_database(),r);
 FOREACH s IN ARRAY ARRAY['public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private'] LOOP
  IF EXISTS(SELECT 1 FROM pg_namespace WHERE nspname=s) THEN
   EXECUTE format('REVOKE ALL ON ALL TABLES IN SCHEMA %I FROM %I',s,r);
   EXECUTE format('REVOKE ALL ON ALL SEQUENCES IN SCHEMA %I FROM %I',s,r);
   EXECUTE format('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA %I FROM %I',s,r);
   EXECUTE format('REVOKE ALL ON SCHEMA %I FROM %I',s,r);
  END IF;
 END LOOP;
 IF EXISTS(SELECT 1 FROM pg_stat_activity WHERE usename=r AND pid<>pg_backend_pid()) THEN
  RAISE EXCEPTION 'WRITER_NOT_DRAINED';
 END IF;
END $$;
-- Keep role NOLOGIN. No automatic restore/grant-back. Rotate shared keys separately.
