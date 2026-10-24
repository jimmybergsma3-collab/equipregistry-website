-- Additive local platform administration. No legacy role, organization or asset rewrite.
BEGIN;
CREATE SCHEMA platform_private;
REVOKE ALL ON SCHEMA platform_private FROM PUBLIC;
CREATE TABLE platform_private.gate (id integer PRIMARY KEY CHECK(id=1), version integer NOT NULL DEFAULT 0);
INSERT INTO platform_private.gate(id) VALUES(1);
CREATE TABLE platform_private.founder (
 id text PRIMARY KEY CHECK(id='root'), user_id text UNIQUE NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 version integer NOT NULL DEFAULT 0 CHECK(version=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE TABLE platform_private.assignment (
 id text PRIMARY KEY REFERENCES public."User"(id) ON DELETE RESTRICT,
 role text NOT NULL CHECK(role IN ('PLATFORM_ADMIN','VERIFICATION_ADMIN','SUPPORT_ADMIN','INDEPENDENT_REVIEWER')),
 countries text[] NOT NULL CHECK(cardinality(countries)>0 AND cardinality(countries)<=249),
 state text NOT NULL CHECK(state IN ('ACTIVE','SUSPENDED','REVOKED')),
 account_revision text NOT NULL, expires_at timestamptz NOT NULL, version integer NOT NULL CHECK(version>=0),
 created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE TABLE platform_private.invitation (
 id uuid PRIMARY KEY, target_id text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 issuer_id text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 role text NOT NULL CHECK(role IN ('PLATFORM_ADMIN','VERIFICATION_ADMIN','SUPPORT_ADMIN','INDEPENDENT_REVIEWER')),
 countries text[] NOT NULL CHECK(cardinality(countries)>0 AND cardinality(countries)<=249),
 target_revision text NOT NULL, issuer_revision text NOT NULL, assignment_version integer,
 state text NOT NULL DEFAULT 'PENDING' CHECK(state IN ('PENDING','ACCEPTED','DECLINED','REVOKED')),
 expires_at timestamptz NOT NULL, grant_expires_at timestamptz NOT NULL,
 version integer NOT NULL DEFAULT 0 CHECK(version>=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(target_id<>issuer_id), CHECK(expires_at>created_at AND grant_expires_at>=expires_at)
);
CREATE UNIQUE INDEX platform_pending_invitation ON platform_private.invitation(target_id) WHERE state='PENDING';
CREATE INDEX platform_invitation_issuer ON platform_private.invitation(issuer_id);
CREATE TABLE platform_private.country (
 id text PRIMARY KEY CHECK(id ~ '^[A-Z]{2}$'), config jsonb NOT NULL CHECK(jsonb_typeof(config)='object'),
 version integer NOT NULL DEFAULT 0 CHECK(version>=0)
);
-- Trust anchors have NO app-side creation/update route. An externally approved
-- bootstrap must bind a real provider key. Synthetic keys are explicitly tagged.
CREATE TABLE platform_private.provider (
 id text PRIMARY KEY, public_key text NOT NULL, countries text[] NOT NULL,
 purposes text[] NOT NULL, synthetic boolean NOT NULL DEFAULT false,
 expires_at timestamptz NOT NULL, revoked_at timestamptz,
 version integer NOT NULL DEFAULT 0 CHECK(version>=0)
);
CREATE TABLE platform_private.attestation (
 id uuid PRIMARY KEY, provider_id text NOT NULL REFERENCES platform_private.provider(id) ON DELETE RESTRICT,
 subject_id text NOT NULL, country text NOT NULL, purpose text NOT NULL CHECK(purpose IN ('REGISTER','REPRESENTATION','QUALIFICATION')),
 envelope jsonb NOT NULL, signature text NOT NULL, created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 version integer NOT NULL DEFAULT 0 CHECK(version=0)
);
CREATE INDEX platform_attestation_subject ON platform_private.attestation(subject_id,country,purpose);
CREATE INDEX platform_attestation_provider ON platform_private.attestation(provider_id);
CREATE TABLE platform_private.verification (
 id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT,
 applicant_id text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT, country text NOT NULL REFERENCES platform_private.country(id),
 claims jsonb NOT NULL, digest text NOT NULL CHECK(digest ~ '^[a-f0-9]{64}$'),
 organization_version integer NOT NULL, country_version integer NOT NULL, applicant_revision text NOT NULL, applicant_membership_version integer,
 state text NOT NULL DEFAULT 'PENDING' CHECK(state IN ('PENDING','UNDER_REVIEW','VERIFIED','REJECTED','EXPIRED','REVOKED')),
 reviewer_id text REFERENCES public."User"(id), assigned_by text REFERENCES public."User"(id),
 reviewer_version integer, reviewer_revision text, assigner_revision text, assigner_version integer,
 qualification_id uuid REFERENCES platform_private.attestation(id), register_id uuid REFERENCES platform_private.attestation(id), representation_id uuid REFERENCES platform_private.attestation(id),
 reviewed_at timestamptz, expires_at timestamptz, reason text,
 version integer NOT NULL DEFAULT 0 CHECK(version>=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(reviewer_id IS NULL OR reviewer_id<>applicant_id AND reviewer_id<>assigned_by),
 CHECK(state<>'UNDER_REVIEW' OR reviewer_id IS NOT NULL AND qualification_id IS NOT NULL),
 CHECK(state<>'VERIFIED' OR reviewer_id IS NOT NULL AND register_id IS NOT NULL AND representation_id IS NOT NULL AND reviewed_at IS NOT NULL AND expires_at>reviewed_at)
);
CREATE INDEX platform_verification_org ON platform_private.verification(organization_id,created_at);
CREATE INDEX platform_verification_reviewer ON platform_private.verification(reviewer_id);
CREATE INDEX platform_verification_applicant ON platform_private.verification(applicant_id);
CREATE INDEX platform_verification_country ON platform_private.verification(country,state);
CREATE TABLE platform_private.event (
 id uuid PRIMARY KEY, kind text NOT NULL, record_id text NOT NULL, version integer NOT NULL CHECK(version>=0),
 action text NOT NULL, actor_id text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 country text, detail jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 UNIQUE(kind,record_id,version)
);
CREATE INDEX platform_event_actor ON platform_private.event(actor_id,created_at);
CREATE INDEX platform_event_country ON platform_private.event(country,created_at);
CREATE FUNCTION platform_private.immutable() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN RAISE EXCEPTION 'immutable platform record'; END $$;
CREATE FUNCTION platform_private.guard_record() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN
 IF TG_OP='DELETE' THEN RAISE EXCEPTION 'platform deletion closed'; END IF;
 IF TG_TABLE_NAME IN ('assignment','invitation') AND EXISTS(SELECT 1 FROM platform_private.founder WHERE user_id=CASE WHEN TG_TABLE_NAME='assignment' THEN to_jsonb(NEW)->>'id' ELSE to_jsonb(NEW)->>'target_id' END) THEN RAISE EXCEPTION 'Founder cannot be assigned or invited'; END IF;
 IF TG_OP='INSERT' THEN IF NEW.version<>0 THEN RAISE EXCEPTION 'initial version required'; END IF;
 ELSE
  IF NEW.version<>OLD.version+1 OR NEW.id<>OLD.id THEN RAISE EXCEPTION 'version transition required'; END IF;
  IF TG_TABLE_NAME='invitation' THEN
   IF OLD.state<>'PENDING' OR NEW.state='PENDING' OR (to_jsonb(NEW)-ARRAY['state','version']) IS DISTINCT FROM (to_jsonb(OLD)-ARRAY['state','version']) THEN RAISE EXCEPTION 'immutable invitation terms'; END IF;
  END IF;
  IF TG_TABLE_NAME='provider' THEN
   IF OLD.revoked_at IS NOT NULL OR NEW.revoked_at IS NULL OR (to_jsonb(NEW)-ARRAY['revoked_at','version']) IS DISTINCT FROM (to_jsonb(OLD)-ARRAY['revoked_at','version']) THEN RAISE EXCEPTION 'provider trust anchor immutable'; END IF;
  END IF;
  IF TG_TABLE_NAME='verification' THEN
   IF (to_jsonb(NEW)-ARRAY['state','reviewer_id','assigned_by','reviewer_version','reviewer_revision','assigner_revision','assigner_version','qualification_id','register_id','representation_id','reviewed_at','expires_at','reason','version']) IS DISTINCT FROM (to_jsonb(OLD)-ARRAY['state','reviewer_id','assigned_by','reviewer_version','reviewer_revision','assigner_revision','assigner_version','qualification_id','register_id','representation_id','reviewed_at','expires_at','reason','version']) THEN RAISE EXCEPTION 'immutable application identity'; END IF;
   IF NOT ((OLD.state='PENDING' AND NEW.state IN ('UNDER_REVIEW','REVOKED')) OR (OLD.state='UNDER_REVIEW' AND NEW.state IN ('VERIFIED','REJECTED','REVOKED')) OR (OLD.state='VERIFIED' AND NEW.state IN ('EXPIRED','REVOKED'))) THEN RAISE EXCEPTION 'invalid verification transition'; END IF;
  END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE FUNCTION platform_private.require_audit() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM platform_private.event WHERE kind=TG_TABLE_NAME AND record_id=NEW.id::text AND version=NEW.version AND xmin::text=pg_current_xact_id()::text) THEN RAISE EXCEPTION 'atomic platform audit required'; END IF;
 RETURN NULL;
END $$;
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['founder','assignment','invitation','country','provider','attestation','verification','event'] LOOP
  EXECUTE format('ALTER TABLE platform_private.%I ENABLE ROW LEVEL SECURITY',t);
  EXECUTE format('ALTER TABLE platform_private.%I FORCE ROW LEVEL SECURITY',t);
  EXECUTE format('REVOKE ALL ON platform_private.%I FROM PUBLIC',t);
  IF t IN ('founder','attestation','event') THEN
   EXECUTE format('CREATE TRIGGER immutable BEFORE UPDATE OR DELETE ON platform_private.%I FOR EACH ROW EXECUTE FUNCTION platform_private.immutable()',t);
  ELSE
   EXECUTE format('CREATE TRIGGER guard_record BEFORE INSERT OR UPDATE OR DELETE ON platform_private.%I FOR EACH ROW EXECUTE FUNCTION platform_private.guard_record()',t);
  END IF;
  IF t<>'event' THEN EXECUTE format('CREATE CONSTRAINT TRIGGER audit_required AFTER INSERT OR UPDATE ON platform_private.%I DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION platform_private.require_audit()',t); END IF;
 END LOOP;
END $$;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA platform_private FROM PUBLIC;
REVOKE ALL ON platform_private.gate FROM PUBLIC;
COMMIT;
