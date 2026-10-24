-- Read-only role composition gate; run after ALL capability profiles on the clone.
-- psql -X -v ON_ERROR_STOP=1 -v runtime_role=EXACT_LOGIN -f runtime-role-preflight.sql
-- Does not authorize production or prove provider credential/deployment mapping.
\set ON_ERROR_STOP on
BEGIN READ ONLY;
SET LOCAL statement_timeout='10s';
SELECT set_config('er.release_role', :'runtime_role', true);
DO $$
DECLARE target oid; reachable oid[]; r record; caps text[];
BEGIN
 SELECT oid INTO target FROM pg_roles WHERE rolname=current_setting('er.release_role');
 IF target IS NULL THEN RAISE EXCEPTION 'RUNTIME_ROLE_MISSING'; END IF;
 -- Include even NOINHERIT memberships: SET ROLE can still reach these capabilities.
 WITH RECURSIVE graph(id) AS (SELECT target UNION SELECT m.roleid FROM pg_auth_members m JOIN graph g ON m.member=g.id)
 SELECT array_agg(id) INTO reachable FROM graph;
 FOR r IN SELECT * FROM pg_roles WHERE oid=ANY(reachable) LOOP
  IF r.rolsuper OR r.rolbypassrls OR r.rolcreatedb OR r.rolcreaterole OR r.rolreplication
  THEN RAISE EXCEPTION 'PRIVILEGED_RUNTIME_ROLE:%',r.rolname; END IF;
 END LOOP;
 IF EXISTS(SELECT 1 FROM pg_shdepend WHERE refclassid='pg_authid'::regclass AND refobjid=ANY(reachable) AND deptype='o')
 THEN RAISE EXCEPTION 'RUNTIME_OWNS_OBJECTS'; END IF;
 SELECT array_agg(rolname ORDER BY rolname) INTO caps FROM pg_roles WHERE oid=ANY(reachable) AND rolname IN
 ('er_registration_runtime','er_import_runtime','er_platform_runtime','er_business_runtime','er_organization_runtime');
 IF coalesce(cardinality(caps),0)<>1 THEN RAISE EXCEPTION 'EXACTLY_ONE_CAPABILITY_REQUIRED'; END IF;
 IF EXISTS(SELECT 1 FROM pg_roles WHERE oid=ANY(reachable) AND oid<>target AND NOT (rolname=ANY(caps)))
 THEN RAISE EXCEPTION 'UNREVIEWED_INHERITED_ROLE'; END IF;
 IF EXISTS(SELECT 1 FROM pg_namespace WHERE nspname IN ('public','registry_private','incident_private','import_private','business_private','governance_private','portal_private','platform_private') AND has_schema_privilege(target,oid,'CREATE'))
 THEN RAISE EXCEPTION 'RUNTIME_SCHEMA_CREATE'; END IF;
 IF EXISTS(SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE c.relkind='r'
 AND n.nspname IN ('public','registry_private','incident_private','import_private','business_private','governance_private','portal_private','platform_private')
 AND NOT c.relrowsecurity AND (has_any_column_privilege(target,c.oid,'SELECT') OR has_any_column_privilege(target,c.oid,'INSERT') OR has_any_column_privilege(target,c.oid,'UPDATE')))
 THEN RAISE EXCEPTION 'RUNTIME_ACCESS_WITHOUT_RLS'; END IF;
 IF has_column_privilege(target,'public."User"','role','UPDATE') OR has_table_privilege(target,'public."User"','INSERT')
 OR has_table_privilege(target,'platform_private.founder','INSERT') OR has_table_privilege(target,'platform_private.provider','INSERT')
 THEN RAISE EXCEPTION 'RUNTIME_BOOTSTRAP_PRIVILEGE'; END IF;
 IF EXISTS(SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
 WHERE c.relkind='r' AND n.nspname IN ('public','registry_private','incident_private','import_private','business_private','governance_private','portal_private','platform_private')
 AND (has_table_privilege(target,c.oid,'DELETE') OR has_table_privilege(target,c.oid,'TRUNCATE')))
 THEN RAISE EXCEPTION 'RUNTIME_DESTRUCTIVE_PRIVILEGE'; END IF;
 -- Ordinary runtime must not mutate immutable audit rows, even through column grants.
 IF EXISTS(SELECT 1 FROM pg_attribute a JOIN pg_class c ON c.oid=a.attrelid JOIN pg_namespace n ON n.oid=c.relnamespace
 WHERE a.attnum>0 AND NOT a.attisdropped AND
 ((n.nspname='public' AND c.relname='OrganizationEvent') OR
 (n.nspname='incident_private' AND c.relname IN ('AssetIncidentEvent','AssetIncidentEvidence')) OR
 (n.nspname='business_private' AND c.relname IN ('event','receipt','read_audit','acceptance')) OR (n.nspname='business_private' AND c.relname='confirmation' AND a.attname<>'revoked_at') OR
 (n.nspname='platform_private' AND c.relname='event')) AND has_column_privilege(target,c.oid,a.attnum,'UPDATE'))
 THEN RAISE EXCEPTION 'RUNTIME_AUDIT_UPDATE'; END IF;
 RAISE NOTICE 'LOCAL_ROLE_COMPOSITION_PASS:%:%; production mapping still required',current_setting('er.release_role'),caps;
END $$;
ROLLBACK;
