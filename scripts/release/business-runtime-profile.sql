-- Clone-first trusted backend capabilities. No login or production activation.
-- Service authorization/tenant checks remain mandatory; not isolation against SQL injection.
-- NEVER combine these capabilities with er_import_runtime: permissive policies are ORed.
BEGIN;
CREATE ROLE er_business_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
CREATE ROLE er_organization_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
GRANT USAGE ON SCHEMA public,business_private TO er_business_runtime;
GRANT USAGE ON SCHEMA public,governance_private,portal_private TO er_organization_runtime;
GRANT SELECT ON public."User",public."Organization",public."OrganizationMembership",public."PrivateImportedAsset",public."OrganizationEvent" TO er_business_runtime,er_organization_runtime;
GRANT UPDATE(name) ON public."User" TO er_business_runtime,er_organization_runtime;
GRANT UPDATE("displayName") ON public."Organization" TO er_business_runtime,er_organization_runtime;
GRANT SELECT ON business_private.subject,business_private.source,business_private.assignment,business_private.authority,business_private.relation,business_private.transfer,business_private.finance,business_private.confirmation,business_private.grant_access,business_private.hold,business_private.event,business_private.receipt,business_private.read_audit,business_private.acceptance TO er_business_runtime;
GRANT INSERT ON business_private.source,business_private.assignment,business_private.authority,business_private.relation,business_private.transfer,business_private.finance,business_private.confirmation,business_private.grant_access,business_private.hold,business_private.event,business_private.receipt,business_private.read_audit,business_private.acceptance TO er_business_runtime;
GRANT UPDATE ON business_private.subject,business_private.source,business_private.assignment,business_private.authority,business_private.relation,business_private.transfer,business_private.finance,business_private.grant_access,business_private.hold TO er_business_runtime;
GRANT UPDATE(revoked_at) ON business_private.confirmation TO er_business_runtime;
GRANT EXECUTE ON FUNCTION business_private.visible_events(uuid,timestamptz) TO er_business_runtime;
-- Ordinary portal/organization operations; no admin activation or mandate issue/use.
GRANT SELECT ON public."OrganizationMandateReview",governance_private."Mandate",governance_private."Operation",portal_private.request TO er_organization_runtime;
GRANT INSERT ON public."Organization",public."OrganizationMembership",public."PrivateImportedAsset",public."OrganizationEvent",governance_private."Operation",portal_private.request TO er_organization_runtime;
GRANT UPDATE(role,status,"grantedBy","endsAt",version) ON public."OrganizationMembership" TO er_organization_runtime;
GRANT UPDATE("assetName",version) ON public."PrivateImportedAsset" TO er_organization_runtime;
GRANT UPDATE("acceptedAt","revokedAt","revocationReason",version) ON governance_private."Mandate" TO er_organization_runtime;
DO $$ DECLARE t text; r text; BEGIN
 FOREACH r IN ARRAY ARRAY['er_business_runtime','er_organization_runtime'] LOOP
  FOREACH t IN ARRAY ARRAY['User','Organization','OrganizationMembership','PrivateImportedAsset','OrganizationEvent'] LOOP
   EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
   EXECUTE format('CREATE POLICY %I ON public.%I TO %I USING(true) WITH CHECK(true)',r,t,r);
  END LOOP;
 END LOOP;
 FOREACH t IN ARRAY ARRAY['subject','source','assignment','authority','relation','transfer','finance','confirmation','grant_access','hold','event','receipt','read_audit','acceptance'] LOOP
  EXECUTE format('CREATE POLICY business_capability ON business_private.%I TO er_business_runtime USING(true) WITH CHECK(true)',t);
 END LOOP;
END $$;
CREATE POLICY organization_review_read ON public."OrganizationMandateReview" FOR SELECT TO er_organization_runtime USING(true);
CREATE POLICY organization_mandate ON governance_private."Mandate" TO er_organization_runtime USING(true) WITH CHECK(true);
CREATE POLICY organization_operation ON governance_private."Operation" TO er_organization_runtime USING(true) WITH CHECK(true);
CREATE POLICY organization_request ON portal_private.request TO er_organization_runtime USING(true) WITH CHECK(true);
-- No User.role/password/token writes, Founder/provider/bootstrap, registry/number writes,
-- organization activation, mandate issue/use, DELETE/TRUNCATE or audit UPDATE.
COMMIT;
