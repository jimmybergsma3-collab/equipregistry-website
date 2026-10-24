-- Reviewed profile for the platform service only. NOT a whole-site production grant.
-- Execute only on an isolated clone until provider/app-role deployment is reviewed.
-- Trusted application service policies: tenant checks stay in transactional services.
-- These policies do NOT claim protection against arbitrary SQL by the service itself.
BEGIN;
CREATE ROLE er_platform_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
GRANT USAGE ON SCHEMA public,platform_private,portal_private,governance_private TO er_platform_runtime;
GRANT SELECT ON public."User",public."Organization",public."OrganizationMembership",public."OrganizationEvent",public."PrivateImportedAsset",public."OrganizationMandateReview",governance_private."Mandate",governance_private."Operation",governance_private."Closure",portal_private.request TO er_platform_runtime;
GRANT SELECT ON ALL TABLES IN SCHEMA platform_private TO er_platform_runtime;
-- Column UPDATE is currently required by existing SELECT FOR SHARE/UPDATE callers.
GRANT UPDATE(name) ON public."User" TO er_platform_runtime;
GRANT UPDATE("displayName",status,version,"activatedAt") ON public."Organization" TO er_platform_runtime;
GRANT INSERT ON public."Organization",public."OrganizationEvent",public."OrganizationMembership",public."OrganizationMandateReview",public."PrivateImportedAsset",governance_private."Operation",governance_private."Closure",portal_private.request TO er_platform_runtime;
GRANT UPDATE(role,status,"grantedBy","endsAt",version) ON public."OrganizationMembership" TO er_platform_runtime;
GRANT UPDATE("acceptedAt","revokedAt","revocationReason",version) ON governance_private."Mandate" TO er_platform_runtime;
GRANT UPDATE(version) ON platform_private.gate TO er_platform_runtime;
GRANT INSERT ON platform_private.assignment,platform_private.invitation,platform_private.country,platform_private.attestation,platform_private.verification,platform_private.event,platform_private.activation,platform_private.activation_consent TO er_platform_runtime;
GRANT UPDATE(role,countries,state,account_revision,expires_at,version) ON platform_private.assignment TO er_platform_runtime;
GRANT UPDATE(state,version) ON platform_private.invitation TO er_platform_runtime;
GRANT UPDATE(config,version) ON platform_private.country TO er_platform_runtime;
GRANT UPDATE(revoked_at,version) ON platform_private.provider TO er_platform_runtime;
GRANT UPDATE(state,reviewer_id,assigned_by,reviewer_version,reviewer_revision,assigner_revision,assigner_version,qualification_id,register_id,representation_id,reviewed_at,expires_at,reason,version) ON platform_private.verification TO er_platform_runtime;
-- Administrative serialization row also gets explicit RLS under this profile.
ALTER TABLE platform_private.gate ENABLE ROW LEVEL SECURITY;
DO $$ DECLARE item record; BEGIN
 FOR item IN SELECT n.nspname,c.relname FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE c.relkind='r' AND c.relrowsecurity AND (n.nspname IN ('platform_private','portal_private') OR n.nspname='public' AND c.relname IN ('Organization','OrganizationMembership','OrganizationEvent','PrivateImportedAsset','OrganizationMandateReview') OR n.nspname='governance_private' AND c.relname IN ('Mandate','Operation','Closure')) LOOP
 EXECUTE format('CREATE POLICY platform_service_capability ON %I.%I TO er_platform_runtime USING(true) WITH CHECK(true)',item.nspname,item.relname);
 END LOOP;
END $$;
-- Deliberately no Founder/provider insertion, key mutation, User.role mutation,
-- public Machine/RegistrationRequest/RegistrySequence writes, DELETE or TRUNCATE.
-- Compatible with registration-runtime-profile enabling User RLS.
CREATE POLICY er_platform_runtime_account_read ON public."User" FOR SELECT TO er_platform_runtime USING(true);
CREATE POLICY er_platform_runtime_account_lock ON public."User" FOR UPDATE TO er_platform_runtime USING(true) WITH CHECK(true);
COMMIT;
