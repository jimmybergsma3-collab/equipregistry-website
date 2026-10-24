-- Additive B2B intake in the existing private portal schema. No runtime roles added.
BEGIN;
SET LOCAL lock_timeout='2s';
SET LOCAL statement_timeout='30s';
CREATE TABLE portal_private.partner_application (
 id uuid PRIMARY KEY, company varchar(200) NOT NULL, country varchar(2) NOT NULL,
 registration varchar(100) NOT NULL, sector varchar(20) NOT NULL CHECK(sector IN ('rental','insurance','bank','finance','leasing','oem')),
 representative varchar(200) NOT NULL,email varchar(254) NOT NULL,purpose varchar(2000) NOT NULL,
 state text NOT NULL DEFAULT 'SUBMITTED' CHECK(state IN ('SUBMITTED','UNDER_REVIEW','MORE_INFO','REJECTED','READY')),
 version integer NOT NULL DEFAULT 0 CHECK(version>=0),
 reviewer_id text REFERENCES public."User"(id), organization_id uuid UNIQUE REFERENCES public."Organization"(id),
 checks jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(country ~ '^[A-Z]{2}$'), CHECK(email=lower(email)),
 CHECK(state<>'READY' OR (organization_id IS NOT NULL AND reviewer_id IS NOT NULL AND checks @> '{"identity":true,"registration":true,"authority":true,"consent":true}'))
);
CREATE UNIQUE INDEX partner_open_email ON portal_private.partner_application(email) WHERE state<>'REJECTED';
CREATE INDEX partner_queue ON portal_private.partner_application(state,created_at DESC);
CREATE TABLE portal_private.partner_event (
 application_id uuid NOT NULL REFERENCES portal_private.partner_application(id),version integer NOT NULL,
 actor_id text NOT NULL REFERENCES public."User"(id),state text NOT NULL,note varchar(2000) NOT NULL,
 created_at timestamptz NOT NULL DEFAULT clock_timestamp(),PRIMARY KEY(application_id,version)
);
ALTER TABLE portal_private.partner_application ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_private.partner_application FORCE ROW LEVEL SECURITY;
ALTER TABLE portal_private.partner_event ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_private.partner_event FORCE ROW LEVEL SECURITY;
REVOKE ALL ON portal_private.partner_application,portal_private.partner_event FROM PUBLIC,anon,authenticated;
GRANT USAGE ON SCHEMA portal_private TO er_registration_runtime;
GRANT INSERT(id,company,country,registration,sector,representative,email,purpose) ON portal_private.partner_application TO er_registration_runtime;
CREATE POLICY partner_submit ON portal_private.partner_application FOR INSERT TO er_registration_runtime WITH CHECK(state='SUBMITTED' AND version=0 AND reviewer_id IS NULL AND organization_id IS NULL AND checks='{}'::jsonb);
GRANT SELECT ON portal_private.partner_application,portal_private.partner_event TO er_platform_runtime;
GRANT UPDATE(state,version,reviewer_id,organization_id,checks) ON portal_private.partner_application TO er_platform_runtime;
GRANT INSERT ON portal_private.partner_event TO er_platform_runtime;
CREATE POLICY partner_admin_read ON portal_private.partner_application FOR SELECT TO er_platform_runtime USING(true);
CREATE POLICY partner_admin_update ON portal_private.partner_application FOR UPDATE TO er_platform_runtime USING(true) WITH CHECK(true);
CREATE POLICY partner_event_read ON portal_private.partner_event FOR SELECT TO er_platform_runtime USING(true);
CREATE POLICY partner_event_write ON portal_private.partner_event FOR INSERT TO er_platform_runtime WITH CHECK(true);
CREATE FUNCTION portal_private.partner_change_guard() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN
 IF TG_OP<>'UPDATE' OR OLD.state='READY' OR NEW.version<>OLD.version+1 OR NEW.reviewer_id IS NULL THEN RAISE EXCEPTION 'Invalid partner transition'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public."User" WHERE id=NEW.reviewer_id AND role='admin' AND "emailVerifiedAt" IS NOT NULL) THEN RAISE EXCEPTION 'Verified administrator required'; END IF;
 IF NEW.state='READY' AND NOT EXISTS(SELECT 1 FROM public."Organization" o JOIN portal_private.request r ON r.organization_id=o.id JOIN public."User" u ON u.id=r.applicant_id WHERE o.id=NEW.organization_id AND o.status='PENDING_REVIEW' AND lower(u.email)=NEW.email AND u."emailVerifiedAt" IS NOT NULL AND u.id<>NEW.reviewer_id) THEN RAISE EXCEPTION 'Pending verified-account binding required'; END IF;
 RETURN NEW;
END $$;
CREATE FUNCTION portal_private.partner_audit_guard() RETURNS trigger LANGUAGE plpgsql SET search_path=pg_catalog AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM portal_private.partner_event WHERE application_id=NEW.id AND version=NEW.version AND actor_id=NEW.reviewer_id AND state=NEW.state AND xmin::text=pg_current_xact_id()::text) THEN RAISE EXCEPTION 'Atomic partner audit required'; END IF;
 RETURN NULL;
END $$;
REVOKE ALL ON FUNCTION portal_private.partner_change_guard(),portal_private.partner_audit_guard() FROM PUBLIC;
CREATE TRIGGER partner_change BEFORE UPDATE OR DELETE ON portal_private.partner_application FOR EACH ROW EXECUTE FUNCTION portal_private.partner_change_guard();
CREATE CONSTRAINT TRIGGER partner_audit AFTER UPDATE ON portal_private.partner_application DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION portal_private.partner_audit_guard();
-- No UPDATE/DELETE grants on events; administrators cannot alter audit history.
COMMIT;
