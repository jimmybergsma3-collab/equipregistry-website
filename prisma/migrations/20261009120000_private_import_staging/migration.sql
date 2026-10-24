-- LOCAL CANDIDATE ONLY. SQL-managed private extension, no production adoption.
CREATE SCHEMA import_private;
REVOKE ALL ON SCHEMA import_private FROM PUBLIC;
CREATE TABLE import_private."Job" (
 id uuid PRIMARY KEY, "organizationId" uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT,
 "creatorId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 "ingestKey" uuid NOT NULL, "fileHash" text NOT NULL CHECK(length("fileHash")=64),
 "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp(),
 "expiresAt" timestamptz NOT NULL, revision integer NOT NULL DEFAULT 0 CHECK(revision>=0),
 status text NOT NULL DEFAULT 'STAGED' CHECK(status IN ('STAGED','PARTIAL','COMPLETED','CANCELLED')),
 mapping jsonb NOT NULL, profile jsonb NOT NULL, "previewDigest" text NOT NULL,
 UNIQUE("organizationId","ingestKey"), UNIQUE("organizationId",id),
 -- 30 * 24 hours, independent of the connection timezone and DST transitions.
 CHECK("expiresAt"="createdAt"+interval '720 hours')
);
CREATE TABLE import_private."Row" (
 id uuid PRIMARY KEY, "organizationId" uuid NOT NULL, "jobId" uuid NOT NULL,
 position integer NOT NULL CHECK(position>0), payload jsonb NOT NULL, issues jsonb NOT NULL,
 state text NOT NULL CHECK(state IN ('INVALID','REVIEW','READY_FOR_PRIVATE_PREPARATION')),
 outcome text CHECK(outcome IN ('CREATED','ALREADY_IMPORTED')), "assetId" uuid,
 FOREIGN KEY("organizationId","jobId") REFERENCES import_private."Job"("organizationId",id) ON DELETE RESTRICT,
 FOREIGN KEY("organizationId","assetId") REFERENCES public."PrivateImportedAsset"("organizationId",id) ON DELETE RESTRICT,
 UNIQUE("jobId",position), UNIQUE("organizationId","jobId",id),
 CHECK((outcome IS NULL)=("assetId" IS NULL))
);
-- Immutable full payload is an extension of the private asset, not another asset type.
CREATE TABLE import_private."AssetPayload" (
 "organizationId" uuid NOT NULL, "assetId" uuid NOT NULL, payload jsonb NOT NULL,
 PRIMARY KEY("organizationId","assetId"),
 FOREIGN KEY("organizationId","assetId") REFERENCES public."PrivateImportedAsset"("organizationId",id) ON DELETE RESTRICT
);
CREATE TABLE import_private."Event" (
 id uuid PRIMARY KEY, "organizationId" uuid NOT NULL, "jobId" uuid NOT NULL,
 "actorId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
 revision integer NOT NULL, action text NOT NULL CHECK(action IN ('STAGED','COMMITTED','CANCELLED')),
 "commandKey" uuid NOT NULL, "requestHash" text NOT NULL, result jsonb NOT NULL,
 "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp(),
 FOREIGN KEY("organizationId","jobId") REFERENCES import_private."Job"("organizationId",id) ON DELETE RESTRICT,
 UNIQUE("organizationId","jobId","commandKey")
);
-- No filename, file hash, actor, cells, mapping or source payload for rejected files.
CREATE TABLE import_private."Rejection" (
 id uuid PRIMARY KEY, "organizationId" uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT,
 code text NOT NULL CHECK(code='SENSITIVE_FILE_REJECTED'), "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE FUNCTION import_private.guard_job() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF (to_jsonb(OLD)-ARRAY['status','revision']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['status','revision']) OR
 NEW.revision<>OLD.revision+1 OR OLD.status IN ('COMPLETED','CANCELLED') THEN RAISE EXCEPTION 'import immutable or terminal'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER job_guard BEFORE UPDATE ON import_private."Job" FOR EACH ROW EXECUTE FUNCTION import_private.guard_job();
CREATE FUNCTION import_private.guard_row() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF OLD.outcome IS NOT NULL OR NEW.outcome IS NULL OR
 (to_jsonb(OLD)-ARRAY['outcome','assetId']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['outcome','assetId']) THEN RAISE EXCEPTION 'import row immutable'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER row_guard BEFORE UPDATE ON import_private."Row" FOR EACH ROW EXECUTE FUNCTION import_private.guard_row();
CREATE FUNCTION import_private.audit_complete() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE jid uuid; oid uuid;
BEGIN
 IF TG_TABLE_NAME='Job' THEN jid=NEW.id; oid=NEW."organizationId"; ELSE jid=NEW."jobId"; oid=NEW."organizationId"; END IF;
 IF NOT EXISTS(SELECT 1 FROM import_private."Event" WHERE "jobId"=jid AND "organizationId"=oid AND xmin::text=pg_current_xact_id()::text) THEN RAISE EXCEPTION 'import atomic audit required'; END IF;
 RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER job_audit AFTER INSERT OR UPDATE ON import_private."Job" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION import_private.audit_complete();
CREATE CONSTRAINT TRIGGER row_audit AFTER INSERT OR UPDATE ON import_private."Row" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION import_private.audit_complete();
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['Job','Row','AssetPayload','Event','Rejection'] LOOP
 EXECUTE format('ALTER TABLE import_private.%I ENABLE ROW LEVEL SECURITY',t);
 EXECUTE format('ALTER TABLE import_private.%I FORCE ROW LEVEL SECURITY',t);
 EXECUTE format('REVOKE ALL ON import_private.%I FROM PUBLIC',t);
 EXECUTE format('CREATE TRIGGER no_delete BEFORE DELETE ON import_private.%I FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable()',t);
 IF t IN ('AssetPayload','Event','Rejection') THEN EXECUTE format('CREATE TRIGGER no_update BEFORE UPDATE ON import_private.%I FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable()',t); END IF;
 END LOOP;
END $$;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA import_private FROM PUBLIC;
