-- Clone-first service role. Context is set by authenticated application code.
-- GUCs are not credentials: arbitrary SQL using this role can spoof context.
BEGIN;
CREATE ROLE er_import_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
GRANT USAGE ON SCHEMA public,import_private TO er_import_runtime;
GRANT SELECT ON public."User",public."Organization",public."OrganizationMembership",public."PrivateImportedAsset",public."OrganizationEvent" TO er_import_runtime;
GRANT UPDATE(name) ON public."User" TO er_import_runtime;
GRANT UPDATE("displayName") ON public."Organization" TO er_import_runtime;
GRANT INSERT ON public."PrivateImportedAsset",public."OrganizationEvent" TO er_import_runtime;
GRANT SELECT,INSERT ON ALL TABLES IN SCHEMA import_private TO er_import_runtime;
GRANT UPDATE(status,revision) ON import_private."Job" TO er_import_runtime;
GRANT UPDATE(outcome,"assetId") ON import_private."Row" TO er_import_runtime;
GRANT UPDATE(window_start,attempts) ON import_private."ParserBudget" TO er_import_runtime;
CREATE POLICY import_org ON public."Organization" TO er_import_runtime USING(id::text=current_setting('er.import_org',true));
CREATE POLICY import_member ON public."OrganizationMembership" TO er_import_runtime USING("organizationId"::text=current_setting('er.import_org',true) AND "userId"=current_setting('er.import_actor',true));
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['PrivateImportedAsset','OrganizationEvent'] LOOP
 EXECUTE format('CREATE POLICY import_tenant ON public.%I TO er_import_runtime USING ("organizationId"::text=current_setting(''er.import_org'',true)) WITH CHECK ("organizationId"::text=current_setting(''er.import_org'',true))',t);
 END LOOP;
 FOREACH t IN ARRAY ARRAY['Job','Row','AssetPayload','Event','Rejection'] LOOP
 EXECUTE format('CREATE POLICY import_tenant ON import_private.%I TO er_import_runtime USING ("organizationId"::text=current_setting(''er.import_org'',true)) WITH CHECK ("organizationId"::text=current_setting(''er.import_org'',true))',t);
 END LOOP;
END $$;
CREATE POLICY import_budget ON import_private."ParserBudget" TO er_import_runtime USING
 (kind='account' AND subject=current_setting('er.import_actor',true) OR kind='organization' AND subject=current_setting('er.import_org',true))
 WITH CHECK (kind='account' AND subject=current_setting('er.import_actor',true) OR kind='organization' AND subject=current_setting('er.import_org',true));
-- Compatible with registration-runtime-profile enabling User RLS.
CREATE POLICY er_import_runtime_account_read ON public."User" FOR SELECT TO er_import_runtime USING(true);
CREATE POLICY er_import_runtime_account_lock ON public."User" FOR UPDATE TO er_import_runtime USING(true) WITH CHECK(true);
COMMIT;
