-- Additive bridge. No data adoption, default grants or production activation.
BEGIN;
CREATE TABLE platform_private.activation_consent (
 id uuid PRIMARY KEY REFERENCES platform_private.verification(id),
 applicant_id text NOT NULL REFERENCES public."User"(id), case_version integer NOT NULL,
 account_revision text NOT NULL, digest text NOT NULL, expires_at timestamptz NOT NULL,
 version integer NOT NULL DEFAULT 0 CHECK(version=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE TABLE platform_private.activation (
 id uuid PRIMARY KEY REFERENCES public."Organization"(id),
 case_id uuid UNIQUE NOT NULL REFERENCES platform_private.verification(id), case_version integer NOT NULL,
 applicant_id text NOT NULL REFERENCES public."User"(id), reviewer_id text NOT NULL REFERENCES public."User"(id),
 approved_by text NOT NULL REFERENCES public."User"(id), organization_version integer NOT NULL CHECK(organization_version=1),
 version integer NOT NULL DEFAULT 0 CHECK(version=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(applicant_id<>reviewer_id AND approved_by<>applicant_id AND approved_by<>reviewer_id)
);
CREATE INDEX platform_activation_applicant ON platform_private.activation(applicant_id);
CREATE INDEX platform_activation_reviewer ON platform_private.activation(reviewer_id);
CREATE INDEX platform_activation_approver ON platform_private.activation(approved_by);
CREATE INDEX platform_consent_applicant ON platform_private.activation_consent(applicant_id);
DO $$ DECLARE t text; BEGIN FOREACH t IN ARRAY ARRAY['activation_consent','activation'] LOOP
 EXECUTE format('ALTER TABLE platform_private.%I ENABLE ROW LEVEL SECURITY',t);
 EXECUTE format('ALTER TABLE platform_private.%I FORCE ROW LEVEL SECURITY',t);
 EXECUTE format('REVOKE ALL ON platform_private.%I FROM PUBLIC',t);
 EXECUTE format('CREATE TRIGGER immutable BEFORE UPDATE OR DELETE ON platform_private.%I FOR EACH ROW EXECUTE FUNCTION platform_private.immutable()',t);
 EXECUTE format('CREATE CONSTRAINT TRIGGER audit_required AFTER INSERT ON platform_private.%I DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION platform_private.require_audit()',t);
END LOOP; END $$;
CREATE FUNCTION platform_private.activation_guard() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
DECLARE c platform_private.verification; a platform_private.activation_consent;
BEGIN
 SELECT * INTO c FROM platform_private.verification WHERE id=NEW.case_id;
 SELECT * INTO a FROM platform_private.activation_consent WHERE id=NEW.case_id;
 IF c.id IS NULL OR a.id IS NULL OR c.organization_id<>NEW.id OR c.applicant_id<>NEW.applicant_id OR c.reviewer_id<>NEW.reviewer_id OR c.version<>NEW.case_version OR c.state<>'VERIFIED' OR c.expires_at<=clock_timestamp() OR
 a.case_version<>c.version OR a.applicant_id<>c.applicant_id OR a.digest<>c.digest OR a.account_revision<>c.applicant_revision OR a.expires_at<=clock_timestamp() OR
 NOT EXISTS(SELECT 1 FROM platform_private.founder WHERE user_id=NEW.approved_by) OR
 NOT EXISTS(SELECT 1 FROM public."Organization" WHERE id=NEW.id AND status='PENDING_REVIEW' AND version=c.organization_version) OR
 EXISTS(SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=NEW.id) THEN RAISE EXCEPTION 'verified consent and independent Founder authorization required'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER activation_guard BEFORE INSERT ON platform_private.activation FOR EACH ROW EXECUTE FUNCTION platform_private.activation_guard();
CREATE OR REPLACE FUNCTION public.org4b_review_guard() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
DECLARE account_role text;
BEGIN
 SELECT role::text INTO account_role FROM public."User" WHERE id=NEW."reviewerId" FOR SHARE;
 IF account_role IS DISTINCT FROM 'admin' THEN IF NOT EXISTS(
 SELECT 1 FROM platform_private.activation WHERE id=NEW."organizationId" AND reviewer_id=NEW."reviewerId" AND applicant_id=NEW."firstAdministratorId" AND
 NEW."privateReviewReference"='platform-case:'||case_id::text AND xmin::text=pg_current_xact_id()::text
 ) THEN RAISE EXCEPTION '4B platform review required'; END IF; END IF;
 IF NOT EXISTS(SELECT 1 FROM public."Organization" WHERE id=NEW."organizationId" AND status='PENDING_REVIEW') THEN RAISE EXCEPTION '4B pending review required'; END IF;
 RETURN NEW;
END $$;
CREATE OR REPLACE FUNCTION portal_private.block_activation() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=pg_catalog AS $$
BEGIN
 IF EXISTS(SELECT 1 FROM portal_private.request WHERE organization_id=NEW.id) AND NEW.status<>'PENDING_REVIEW' THEN
  IF NOT EXISTS(SELECT 1 FROM platform_private.activation WHERE id=NEW.id) THEN RAISE EXCEPTION 'Verified activation required'; END IF;
  IF NEW.status='ACTIVE' AND OLD.status<>'ACTIVE' AND NOT (OLD.status='PENDING_REVIEW' AND EXISTS(SELECT 1 FROM platform_private.activation WHERE id=NEW.id AND xmin::text=pg_current_xact_id()::text)) THEN RAISE EXCEPTION 'Reactivation requires a new approved process'; END IF;
 END IF;
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION platform_private.activation_guard() FROM PUBLIC;
COMMIT;
