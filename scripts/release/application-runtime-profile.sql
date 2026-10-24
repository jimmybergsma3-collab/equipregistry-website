-- §71 additive local application composition. Apply AFTER the four existing profiles.
-- Trusted server authorization, not tenant isolation against a compromised backend.
-- No login creation, secrets, ownership, BYPASSRLS or SECURITY DEFINER bypass.
BEGIN;
-- Signup explicitly inserts role='user'. A restrictive INSERT policy prevents admin
-- creation while preserving the frozen signup code and ordinary User SELECT policy.
GRANT INSERT (id,email,"passwordHash",name,"companyName","vatNumber",role,"createdAt","updatedAt") ON public."User" TO er_registration_runtime;
CREATE POLICY registration_signup_guard ON public."User" AS RESTRICTIVE FOR INSERT TO er_registration_runtime WITH CHECK(role='user' AND "emailVerifiedAt" IS NULL);
GRANT UPDATE (name,"passwordHash","companyName","vatNumber","emailVerifiedAt","updatedAt") ON public."User" TO er_registration_runtime;
ALTER TABLE public."EmailVerificationToken" ENABLE ROW LEVEL SECURITY;
GRANT SELECT,INSERT ON public."EmailVerificationToken" TO er_registration_runtime;
GRANT UPDATE("usedAt") ON public."EmailVerificationToken" TO er_registration_runtime;
CREATE POLICY registration_tokens ON public."EmailVerificationToken" TO er_registration_runtime USING(true) WITH CHECK(true);

GRANT SELECT,INSERT ON public."AssetPhotoPublication" TO er_registration_runtime;
GRANT UPDATE("publicationStatus","privacyReviewResult","reviewedBy","reviewedAt","reviewPolicyVersion","publishedAt","revokedAt","revokedBy","revocationReasonCode") ON public."AssetPhotoPublication" TO er_registration_runtime;
CREATE POLICY registration_photos ON public."AssetPhotoPublication" TO er_registration_runtime USING(true) WITH CHECK(true);
GRANT USAGE ON SCHEMA incident_private TO er_registration_runtime;
GRANT SELECT,INSERT ON incident_private."AssetIncident",incident_private."AssetIncidentEvidence",incident_private."AssetIncidentEvent" TO er_registration_runtime;
GRANT UPDATE(state,version,"resolutionReason","reviewNote","lastActorId","commandKey","commandHash","reviewedAt","reviewerId","resolvedAt") ON incident_private."AssetIncident" TO er_registration_runtime;
GRANT USAGE ON SEQUENCE incident_private."AssetIncidentEvent_id_seq" TO er_registration_runtime;
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['AssetIncident','AssetIncidentEvidence','AssetIncidentEvent'] LOOP
  EXECUTE format('CREATE POLICY registration_incidents ON incident_private.%I TO er_registration_runtime USING(true) WITH CHECK(true)',t);
 END LOOP;
END $$;

-- Existing organization governance: ordinary archival/retention commands only.
GRANT SELECT ON governance_private."AssetBlocker" TO er_organization_runtime;
CREATE POLICY organization_blockers ON governance_private."AssetBlocker" FOR SELECT TO er_organization_runtime USING(true);
GRANT UPDATE("lifecycleState") ON public."PrivateImportedAsset" TO er_organization_runtime;
-- Reviewed legacy administrative governance runs under platform, never ordinary org.
GRANT INSERT ON governance_private."Mandate" TO er_platform_runtime;
GRANT UPDATE("usedAt","grantedVersion") ON governance_private."Mandate" TO er_platform_runtime;
-- Existing exact-local synthetic subject provisioning remains separately gated in code.
GRANT INSERT ON business_private.subject TO er_business_runtime;
COMMIT;
