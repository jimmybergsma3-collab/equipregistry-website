-- LOCAL/SYNTHETIC ONLY. No adoption of production migration history.
-- Deliberately SQL-managed in a private schema: existing Prisma models stay intact.
BEGIN;
CREATE SCHEMA incident_private;
REVOKE ALL ON SCHEMA incident_private FROM PUBLIC;

CREATE TABLE incident_private."AssetIncident" (
  id UUID PRIMARY KEY,
  "registrationRequestId" TEXT NOT NULL REFERENCES public."RegistrationRequest"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "incidentType" TEXT NOT NULL CHECK ("incidentType" IN ('STOLEN','MISSING')),
  state TEXT NOT NULL CHECK (state IN ('PENDING_REVIEW','ACTIVE','RESOLVED')),
  version INTEGER NOT NULL DEFAULT 0 CHECK (version >= 0),
  "reportedAt" TIMESTAMPTZ NOT NULL DEFAULT transaction_timestamp(),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT transaction_timestamp(),
  "reviewedAt" TIMESTAMPTZ,
  "resolvedAt" TIMESTAMPTZ,
  "reporterId" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "reviewerId" TEXT REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "lastActorId" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "resolutionReason" TEXT CHECK ("resolutionReason" IN ('RECOVERED','NOT_SUBSTANTIATED','WITHDRAWN','CORRECTED')),
  "reviewNote" TEXT,
  "commandKey" UUID NOT NULL,
  "commandHash" TEXT NOT NULL CHECK ("commandHash" ~ '^[0-9a-f]{64}$'),
  UNIQUE (id, "registrationRequestId"),
  CHECK ((state = 'RESOLVED') = ("resolvedAt" IS NOT NULL AND "resolutionReason" IS NOT NULL)),
  CHECK (state = 'RESOLVED' OR ("resolvedAt" IS NULL AND "resolutionReason" IS NULL)),
  CHECK (state = 'PENDING_REVIEW' OR ("reviewedAt" IS NOT NULL AND "reviewerId" IS NOT NULL)),
  CHECK ("resolvedAt" IS NULL OR "resolvedAt" >= "reportedAt"),
  CHECK ("reviewedAt" IS NULL OR "reviewedAt" >= "reportedAt")
);
CREATE UNIQUE INDEX "Incident_one_live_per_asset" ON incident_private."AssetIncident" ("registrationRequestId") WHERE state <> 'RESOLVED';
CREATE INDEX "Incident_asset_history" ON incident_private."AssetIncident" ("registrationRequestId", "reportedAt", id);

CREATE TABLE incident_private."AssetIncidentEvidence" (
  id UUID PRIMARY KEY,
  "incidentId" UUID NOT NULL,
  "registrationRequestId" TEXT NOT NULL,
  "sourceFileId" TEXT NOT NULL UNIQUE,
  "sourceScope" TEXT NOT NULL CHECK ("sourceScope" IN ('evidenceFiles','policeReportFiles')),
  "sourceMetadata" JSONB NOT NULL CHECK (jsonb_typeof("sourceMetadata") = 'object'),
  "sourceMetadataSha256" TEXT NOT NULL CHECK ("sourceMetadataSha256" ~ '^[0-9a-f]{64}$'),
  "ownerIdAtBinding" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "attachedBy" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT transaction_timestamp(),
  FOREIGN KEY ("incidentId", "registrationRequestId") REFERENCES incident_private."AssetIncident"(id,"registrationRequestId") ON DELETE RESTRICT ON UPDATE RESTRICT,
  CHECK ("sourceMetadata"->>'id' = "sourceFileId"),
  CHECK ("sourceMetadata"->'binding'->>'uploaderId' = "ownerIdAtBinding"),
  CHECK ("sourceMetadata" ? 'binding' AND "sourceMetadata" ? 'contentSha256'),
  UNIQUE (id, "incidentId")
);
CREATE INDEX "Incident_evidence_lookup" ON incident_private."AssetIncidentEvidence" ("incidentId", "registrationRequestId");

CREATE TABLE incident_private."AssetIncidentEvent" (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "incidentId" UUID NOT NULL REFERENCES incident_private."AssetIncident"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  version INTEGER NOT NULL,
  "eventType" TEXT NOT NULL CHECK ("eventType" IN ('REPORTED','ACTIVATED','RESOLVED')),
  "fromState" TEXT,
  "toState" TEXT NOT NULL,
  "actorId" TEXT NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  "recordedAt" TIMESTAMPTZ NOT NULL DEFAULT transaction_timestamp(),
  "commandKey" UUID NOT NULL,
  "commandHash" TEXT NOT NULL,
  "reviewNote" TEXT,
  "resolutionReason" TEXT,
  "evidenceIds" UUID[] NOT NULL,
  "policyVersion" TEXT NOT NULL DEFAULT '3B-1-v1',
  UNIQUE ("incidentId", version),
  UNIQUE ("actorId", "commandKey")
);

CREATE FUNCTION incident_private.immutable_record() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'incident audit record is immutable'; END $$;
CREATE TRIGGER immutable_event BEFORE UPDATE OR DELETE ON incident_private."AssetIncidentEvent" FOR EACH ROW EXECUTE FUNCTION incident_private.immutable_record();
CREATE TRIGGER immutable_evidence BEFORE UPDATE OR DELETE ON incident_private."AssetIncidentEvidence" FOR EACH ROW EXECUTE FUNCTION incident_private.immutable_record();
CREATE TRIGGER retain_incident BEFORE DELETE ON incident_private."AssetIncident" FOR EACH ROW EXECUTE FUNCTION incident_private.immutable_record();

CREATE FUNCTION incident_private.guard_evidence() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE r public."RegistrationRequest"%ROWTYPE; current_state TEXT; actor_role TEXT;
BEGIN
  SELECT * INTO r FROM public."RegistrationRequest" WHERE id=NEW."registrationRequestId" FOR UPDATE;
  SELECT state INTO current_state FROM incident_private."AssetIncident" WHERE id=NEW."incidentId" AND "registrationRequestId"=r.id FOR UPDATE;
  SELECT role::text INTO actor_role FROM public."User" WHERE id=NEW."attachedBy" FOR SHARE;
  IF r.id IS NULL OR r."deletedAt" IS NOT NULL OR r."requestStatus" <> 'passport_issued' OR r."userId" <> NEW."ownerIdAtBinding" OR current_state IS NULL OR current_state='RESOLVED' OR actor_role IS NULL OR (actor_role <> 'admin' AND NEW."attachedBy" <> r."userId") THEN RAISE EXCEPTION 'invalid evidence binding'; END IF;
  NEW."createdAt" := transaction_timestamp();
  RETURN NEW;
END $$;
CREATE TRIGGER guard_evidence BEFORE INSERT ON incident_private."AssetIncidentEvidence" FOR EACH ROW EXECUTE FUNCTION incident_private.guard_evidence();

CREATE FUNCTION incident_private.guard_incident() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE r public."RegistrationRequest"%ROWTYPE; actor_role TEXT;
BEGIN
  SELECT * INTO r FROM public."RegistrationRequest" WHERE id=NEW."registrationRequestId" FOR UPDATE;
  IF r.id IS NULL OR r."deletedAt" IS NOT NULL OR r."requestStatus" <> 'passport_issued' THEN RAISE EXCEPTION 'incident parent unavailable'; END IF;
  SELECT role::text INTO actor_role FROM public."User" WHERE id=NEW."lastActorId" FOR SHARE;
  IF actor_role IS NULL THEN RAISE EXCEPTION 'actor unavailable'; END IF;
  IF TG_OP='INSERT' THEN
    IF NEW.state <> 'PENDING_REVIEW' OR NEW.version <> 0 OR NEW."reporterId" <> NEW."lastActorId" OR (actor_role <> 'admin' AND r."userId" <> NEW."lastActorId") THEN RAISE EXCEPTION 'invalid report'; END IF;
    NEW."createdAt" := transaction_timestamp(); NEW."reportedAt" := transaction_timestamp();
    NEW."reviewedAt" := NULL; NEW."reviewerId" := NULL; NEW."reviewNote" := NULL;
  ELSE
    IF (NEW.id,NEW."registrationRequestId",NEW."incidentType",NEW."reporterId",NEW."createdAt",NEW."reportedAt") IS DISTINCT FROM (OLD.id,OLD."registrationRequestId",OLD."incidentType",OLD."reporterId",OLD."createdAt",OLD."reportedAt") THEN RAISE EXCEPTION 'immutable incident identity'; END IF;
    IF actor_role <> 'admin' OR OLD.state='RESOLVED' OR NEW.version <> OLD.version+1 OR NOT ((OLD.state='PENDING_REVIEW' AND NEW.state IN ('ACTIVE','RESOLVED')) OR (OLD.state='ACTIVE' AND NEW.state='RESOLVED')) THEN RAISE EXCEPTION 'invalid transition'; END IF;
    IF length(trim(coalesce(NEW."reviewNote",''))) < 10 THEN RAISE EXCEPTION 'documented review required'; END IF;
    IF (NEW.state='ACTIVE' OR NEW."resolutionReason"='RECOVERED') AND NOT EXISTS (SELECT 1 FROM incident_private."AssetIncidentEvidence" WHERE "incidentId"=NEW.id) THEN RAISE EXCEPTION 'bound evidence required'; END IF;
    NEW."reviewedAt" := transaction_timestamp(); NEW."reviewerId" := NEW."lastActorId";
    IF NEW.state='RESOLVED' THEN NEW."resolvedAt" := transaction_timestamp(); END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER guard_incident BEFORE INSERT OR UPDATE ON incident_private."AssetIncident" FOR EACH ROW EXECUTE FUNCTION incident_private.guard_incident();
CREATE FUNCTION incident_private.record_event() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO incident_private."AssetIncidentEvent" ("incidentId",version,"eventType","fromState","toState","actorId","commandKey","commandHash","reviewNote","resolutionReason","evidenceIds")
  VALUES (NEW.id,NEW.version,CASE WHEN TG_OP='INSERT' THEN 'REPORTED' WHEN NEW.state='ACTIVE' THEN 'ACTIVATED' ELSE 'RESOLVED' END,CASE WHEN TG_OP='INSERT' THEN NULL ELSE OLD.state END,NEW.state,NEW."lastActorId",NEW."commandKey",NEW."commandHash",NEW."reviewNote",NEW."resolutionReason",ARRAY(SELECT id FROM incident_private."AssetIncidentEvidence" WHERE "incidentId"=NEW.id ORDER BY id));
  RETURN NEW;
END $$;
CREATE TRIGGER record_event AFTER INSERT OR UPDATE ON incident_private."AssetIncident" FOR EACH ROW EXECUTE FUNCTION incident_private.record_event();

ALTER TABLE incident_private."AssetIncident" ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_private."AssetIncidentEvidence" ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_private."AssetIncidentEvent" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA incident_private FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA incident_private FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA incident_private FROM PUBLIC;
COMMIT;
