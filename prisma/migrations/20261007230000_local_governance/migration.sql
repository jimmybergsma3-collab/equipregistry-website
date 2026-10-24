-- LOCAL SYNTHETIC ONLY. Forward additive migration on the proven 4B chain.
-- No down migration: historical mandate/audit records must never be removed.
BEGIN;
CREATE SCHEMA governance_private;
REVOKE ALL ON SCHEMA governance_private FROM PUBLIC;
CREATE TABLE governance_private."Mandate" (
 id uuid PRIMARY KEY,
 "organizationId" uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 "targetId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 "reviewerId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 scope text NOT NULL CHECK (scope IN ('ADD_ADMIN','TRANSFER','REOPEN')),
 "organizationVersion" integer NOT NULL CHECK ("organizationVersion">=1),
 "targetVersion" integer CHECK ("targetVersion">=0),
 "privateReviewReference" text NOT NULL CHECK (length(btrim("privateReviewReference")) BETWEEN 10 AND 200),
 "createdAt" timestamptz NOT NULL DEFAULT transaction_timestamp(),
 "expiresAt" timestamptz NOT NULL DEFAULT (transaction_timestamp()+interval '7 days'),
 "acceptedAt" timestamptz, "revokedAt" timestamptz, "usedAt" timestamptz,
 "revocationReason" text, "grantedVersion" integer,
 version integer NOT NULL DEFAULT 0 CHECK(version>=0),
 CHECK ("reviewerId"<>"targetId"),
 CHECK ("expiresAt">"createdAt" AND "expiresAt" <= "createdAt"+interval '7 days'),
 CHECK ("acceptedAt" IS NULL OR "acceptedAt">="createdAt" AND "acceptedAt"<"expiresAt"),
 CHECK ("usedAt" IS NULL OR "acceptedAt" IS NOT NULL AND "revokedAt" IS NULL AND "usedAt">="acceptedAt" AND "usedAt"<"expiresAt" AND "grantedVersion" IS NOT NULL),
 CHECK (("revokedAt" IS NULL)=("revocationReason" IS NULL))
);
CREATE INDEX ON governance_private."Mandate" ("organizationId","targetId");
CREATE TABLE governance_private."Operation" (
 "organizationId" uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 id uuid NOT NULL, "actorId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 hash text NOT NULL CHECK(hash ~ '^[0-9a-f]{64}$'), result jsonb NOT NULL,
 "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp(), PRIMARY KEY("organizationId",id)
);
CREATE TABLE governance_private."Closure" (
 "organizationId" uuid NOT NULL REFERENCES public."Organization"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 version integer NOT NULL, "actorId" text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
 reason text NOT NULL CHECK(length(btrim(reason)) BETWEEN 1 AND 200),
 "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp(), PRIMARY KEY("organizationId",version)
);
-- Conservative blockers only. No evidence content, bridge, hold-release or purge API.
CREATE UNIQUE INDEX "private_asset_tenant_identity" ON public."PrivateImportedAsset"("organizationId",id);
CREATE TABLE governance_private."AssetBlocker" (
 id uuid PRIMARY KEY, "organizationId" uuid NOT NULL, "assetId" uuid NOT NULL,
 kind text NOT NULL CHECK(kind IN ('EVIDENCE','REVIEW','REGISTRATION','INCIDENT','ISSUED_LINK','HOLD')),
 "createdAt" timestamptz NOT NULL DEFAULT clock_timestamp(),
 FOREIGN KEY("organizationId","assetId") REFERENCES public."PrivateImportedAsset"("organizationId",id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

ALTER TABLE public."Organization" DROP CONSTRAINT organization_state;
ALTER TABLE public."Organization" ADD CONSTRAINT organization_state CHECK (
 length(btrim("displayName")) BETWEEN 1 AND 200 AND
 ((status='PENDING_REVIEW' AND version=0 AND "activatedAt" IS NULL) OR
  (status IN ('ACTIVE','SUSPENDED_GOVERNANCE','ARCHIVED') AND version>=1 AND "activatedAt" IS NOT NULL)));
ALTER TABLE public."PrivateImportedAsset" DROP CONSTRAINT private_asset_state;
ALTER TABLE public."PrivateImportedAsset" ADD CONSTRAINT private_asset_state CHECK (
 "lifecycleState" IN ('IMPORTED_PRIVATE','ARCHIVED_PRIVATE') AND "evidenceState"='EVIDENCE_REQUIRED' AND "identityRevision"=0 AND version>=0 AND
 length(btrim("assetName"))>0 AND
 (("sourceSystem" IS NULL AND "externalAssetKey" IS NULL) OR ("sourceSystem" IS NOT NULL AND "externalAssetKey" IS NOT NULL AND length(btrim("sourceSystem"))>0 AND length(btrim("externalAssetKey"))>0)) AND
 ("serialNumber" IS NOT NULL OR "externalAssetKey" IS NOT NULL) AND
 (("serialNumber" IS NOT NULL AND length(btrim("serialNumber"))>0 AND "identifierType" IS NOT NULL AND "identifierType" IN ('SERIAL','VIN','FRAME','HIN') AND "identityState"='IDENTITY_PROVIDED') OR
 ("serialNumber" IS NULL AND "identifierType" IS NULL AND "identityState"='IDENTITY_INCOMPLETE')));
ALTER TABLE public."OrganizationEvent" DROP CONSTRAINT organization_event_action;
ALTER TABLE public."OrganizationEvent" ADD CONSTRAINT organization_event_action CHECK ("subjectVersion">=0 AND action IN (
 'ORGANIZATION_CREATED','MANDATE_REVIEWED_AND_ACTIVATED','MEMBERSHIP_GRANTED','MEMBERSHIP_REVOKED','PRIVATE_ASSET_CREATED','PRIVATE_ASSET_NAME_CORRECTED',
 'MANDATE_PROPOSED','MANDATE_ACCEPTED','MANDATE_REVOKED','MANDATE_USED','ADMIN_GRANTED','ADMINISTRATION_CHANGED','ORGANIZATION_REOPENED','ORGANIZATION_ARCHIVED','ORGANIZATION_SUSPENDED','DRAFT_ARCHIVED','DRAFT_RESTORED','RETENTION_REVIEWED'));

CREATE OR REPLACE FUNCTION public.org4b_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.version<>OLD.version+1 THEN RAISE EXCEPTION 'version required'; END IF;
 IF TG_TABLE_NAME='Organization' THEN
  IF (to_jsonb(OLD)-ARRAY['status','version','activatedAt']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['status','version','activatedAt']) OR
   (OLD.status<>'PENDING_REVIEW' AND NEW."activatedAt" IS DISTINCT FROM OLD."activatedAt") OR
   NOT ((OLD.status='PENDING_REVIEW' AND NEW.status='ACTIVE') OR (OLD.status='ACTIVE' AND NEW.status IN ('ACTIVE','ARCHIVED','SUSPENDED_GOVERNANCE')) OR
    (OLD.status='SUSPENDED_GOVERNANCE' AND NEW.status IN ('ARCHIVED','ACTIVE')) OR (OLD.status='ARCHIVED' AND NEW.status='ACTIVE')) THEN RAISE EXCEPTION 'invalid organization transition'; END IF;
 ELSIF TG_TABLE_NAME='OrganizationMembership' THEN
  IF (to_jsonb(OLD)-ARRAY['role','status','version','endsAt','grantedBy']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['role','status','version','endsAt','grantedBy']) THEN RAISE EXCEPTION 'membership identity immutable'; END IF;
 ELSIF TG_TABLE_NAME='PrivateImportedAsset' THEN
  PERFORM 1 FROM public."Organization" WHERE id=OLD."organizationId" AND status='ACTIVE' FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'inactive organization'; END IF;
  IF (to_jsonb(OLD)-ARRAY['assetName','version','lifecycleState']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['assetName','version','lifecycleState']) THEN RAISE EXCEPTION 'asset identity immutable'; END IF;
  IF NEW."lifecycleState" IS DISTINCT FROM OLD."lifecycleState" THEN
   IF NEW."assetName"<>OLD."assetName" OR EXISTS(SELECT 1 FROM governance_private."AssetBlocker" WHERE "organizationId"=OLD."organizationId" AND "assetId"=OLD.id) THEN RAISE EXCEPTION 'bound asset lifecycle closed'; END IF;
   IF NEW."lifecycleState"='IMPORTED_PRIVATE' AND NOT EXISTS(SELECT 1 FROM public."OrganizationEvent" WHERE "organizationId"=OLD."organizationId" AND "subjectId"=OLD.id::text AND action='DRAFT_ARCHIVED' AND "subjectVersion"=OLD.version AND "createdAt">clock_timestamp()-interval '90 days') THEN RAISE EXCEPTION 'restore requires separate review'; END IF;
  ELSIF OLD."lifecycleState"<>'IMPORTED_PRIVATE' THEN RAISE EXCEPTION 'archived asset read only'; END IF;
 END IF;
 RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.org4b_activation_complete() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE oid uuid; o public."Organization"; r public."OrganizationMandateReview";
BEGIN
 IF TG_TABLE_NAME='Organization' THEN oid=NEW.id; ELSE oid=NEW."organizationId"; END IF;
 SELECT * INTO o FROM public."Organization" WHERE id=oid FOR UPDATE;
 SELECT * INTO r FROM public."OrganizationMandateReview" WHERE "organizationId"=oid;
 IF o.status='PENDING_REVIEW' THEN
  IF r."organizationId" IS NOT NULL OR EXISTS(SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=oid) THEN RAISE EXCEPTION 'incomplete activation'; END IF;
 ELSE
  IF r."organizationId" IS NULL THEN RAISE EXCEPTION 'initial review required'; END IF;
  IF o.status='ACTIVE' AND NOT EXISTS(SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=oid AND role='ORG_ADMIN' AND status='ACTIVE' AND "endsAt" IS NULL) THEN RAISE EXCEPTION 'last admin'; END IF;
  IF o.status<>'ACTIVE' AND EXISTS(SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=oid AND status='ACTIVE') THEN RAISE EXCEPTION 'closed org memberships must be revoked'; END IF;
  IF EXISTS(SELECT 1 FROM public."OrganizationMembership" m WHERE m."organizationId"=oid AND m.role='ORG_ADMIN' AND m.status='ACTIVE' AND NOT (
    (m.version=0 AND m."userId"=r."firstAdministratorId" AND m."grantedBy"=r."reviewerId") OR EXISTS(
      SELECT 1 FROM governance_private."Mandate" g WHERE g."organizationId"=oid AND g."targetId"=m."userId" AND g."usedAt" IS NOT NULL AND g."revokedAt" IS NULL AND g."grantedVersion"=m.version))) THEN RAISE EXCEPTION 'independent mandate required'; END IF;
 END IF;
 RETURN NULL;
END $$;

CREATE OR REPLACE FUNCTION public.org4b_audit_complete() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE oid uuid; sid text; ver integer; actions text[];
BEGIN
 IF TG_TABLE_NAME='Organization' THEN
  oid=NEW.id; ver=NEW.version; sid=NEW.id::text;
  IF TG_OP='INSERT' THEN actions=ARRAY['ORGANIZATION_CREATED'];
  ELSIF OLD.status='PENDING_REVIEW' THEN SELECT "firstAdministratorId" INTO sid FROM public."OrganizationMandateReview" WHERE "organizationId"=oid; actions=ARRAY['MANDATE_REVIEWED_AND_ACTIVATED'];
  ELSIF NEW.status='ARCHIVED' THEN actions=ARRAY['ORGANIZATION_ARCHIVED'];
  ELSIF NEW.status='SUSPENDED_GOVERNANCE' THEN actions=ARRAY['ORGANIZATION_SUSPENDED'];
  ELSIF OLD.status<>'ACTIVE' THEN actions=ARRAY['ORGANIZATION_REOPENED'];
  ELSE actions=ARRAY['ADMINISTRATION_CHANGED']; END IF;
 ELSIF TG_TABLE_NAME='OrganizationMembership' THEN
  oid=NEW."organizationId"; sid=NEW."userId"; ver=NEW.version;
  IF NEW.status='REVOKED' THEN actions=ARRAY['MEMBERSHIP_REVOKED'];
  ELSIF NEW.role='ORG_ADMIN' THEN
   IF TG_OP='INSERT' AND EXISTS(SELECT 1 FROM public."OrganizationMandateReview" WHERE "organizationId"=oid AND "firstAdministratorId"=sid AND xmin::text=pg_current_xact_id()::text) THEN ver=1; actions=ARRAY['MANDATE_REVIEWED_AND_ACTIVATED'];
   ELSE actions=ARRAY['ADMIN_GRANTED']; END IF;
  ELSE actions=ARRAY['MEMBERSHIP_GRANTED']; END IF;
 ELSE
  oid=NEW."organizationId"; sid=NEW.id::text; ver=NEW.version;
  IF TG_OP='INSERT' THEN actions=ARRAY['PRIVATE_ASSET_CREATED'];
  ELSIF NEW."lifecycleState"<>OLD."lifecycleState" THEN
   IF NEW."lifecycleState"='ARCHIVED_PRIVATE' THEN actions=ARRAY['DRAFT_ARCHIVED']; ELSE actions=ARRAY['DRAFT_RESTORED']; END IF;
  ELSE actions=ARRAY['PRIVATE_ASSET_NAME_CORRECTED']; END IF;
 END IF;
 IF NOT EXISTS(SELECT 1 FROM public."OrganizationEvent" WHERE "organizationId"=oid AND "subjectId"=sid AND "subjectVersion"=ver AND action=ANY(actions) AND xmin::text=pg_current_xact_id()::text) THEN RAISE EXCEPTION 'atomic audit required'; END IF;
 RETURN NULL;
END $$;

CREATE FUNCTION governance_private.mandate_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE o public."Organization"; actor text; action text;
BEGIN
 SELECT * INTO o FROM public."Organization" WHERE id=NEW."organizationId" FOR UPDATE;
 IF TG_OP='INSERT' THEN
  IF NEW.version<>0 OR NEW."acceptedAt" IS NOT NULL OR NEW."revokedAt" IS NOT NULL OR NEW."usedAt" IS NOT NULL OR NEW."grantedVersion" IS NOT NULL OR NEW."organizationVersion"<>o.version OR
   NOT ((NEW.scope IN ('TRANSFER','ADD_ADMIN') AND o.status='ACTIVE') OR (NEW.scope='REOPEN' AND o.status IN ('ARCHIVED','SUSPENDED_GOVERNANCE'))) OR
   NOT EXISTS(SELECT 1 FROM public."User" WHERE id=NEW."reviewerId" AND role::text='admin' AND "emailVerifiedAt" IS NOT NULL) THEN RAISE EXCEPTION 'invalid mandate'; END IF;
 ELSE
  IF OLD."usedAt" IS NOT NULL OR OLD."revokedAt" IS NOT NULL OR NEW.version<>OLD.version+1 OR
   (to_jsonb(OLD)-ARRAY['acceptedAt','revokedAt','revocationReason','usedAt','grantedVersion','version']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['acceptedAt','revokedAt','revocationReason','usedAt','grantedVersion','version']) THEN RAISE EXCEPTION 'immutable mandate identity'; END IF;
  IF NOT ((OLD."acceptedAt" IS NULL AND NEW."acceptedAt" IS NOT NULL AND NEW."revokedAt" IS NULL AND NEW."usedAt" IS NULL AND NEW."grantedVersion" IS NULL) OR
   (NEW."acceptedAt" IS NOT DISTINCT FROM OLD."acceptedAt" AND NEW."revokedAt" IS NOT NULL AND NEW."usedAt" IS NULL AND NEW."grantedVersion" IS NULL) OR
   (NEW."acceptedAt" IS NOT DISTINCT FROM OLD."acceptedAt" AND NEW."usedAt" IS NOT NULL AND NEW."revokedAt" IS NULL AND NEW."grantedVersion" IS NOT NULL)) THEN RAISE EXCEPTION 'invalid mandate transition'; END IF;
  IF NEW."usedAt" IS NOT NULL AND (NEW."organizationVersion"<>o.version OR
   NOT EXISTS(SELECT 1 FROM public."User" WHERE id=NEW."reviewerId" AND role::text='admin' AND "emailVerifiedAt" IS NOT NULL) OR
   NOT EXISTS(SELECT 1 FROM public."User" WHERE id=NEW."targetId" AND "emailVerifiedAt" IS NOT NULL) OR
   NOT EXISTS(SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=NEW."organizationId" AND "userId"=NEW."targetId" AND status='ACTIVE' AND role='ORG_ADMIN' AND version=NEW."grantedVersion") OR
   NOT ((NEW.scope IN ('ADD_ADMIN','TRANSFER') AND o.status='ACTIVE') OR (NEW.scope='REOPEN' AND o.status IN ('ARCHIVED','SUSPENDED_GOVERNANCE')))) THEN RAISE EXCEPTION 'current mandate scope and grant required'; END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER mandate_guard BEFORE INSERT OR UPDATE ON governance_private."Mandate" FOR EACH ROW EXECUTE FUNCTION governance_private.mandate_guard();
CREATE FUNCTION governance_private.mandate_audit() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE audit_action text;
BEGIN
 IF TG_OP='INSERT' THEN audit_action='MANDATE_PROPOSED';
 ELSIF NEW."revokedAt" IS NOT NULL THEN audit_action='MANDATE_REVOKED';
 ELSIF NEW."usedAt" IS NOT NULL THEN audit_action='MANDATE_USED'; ELSE audit_action='MANDATE_ACCEPTED'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public."OrganizationEvent" e WHERE e."organizationId"=NEW."organizationId" AND e."subjectId"=NEW.id::text AND e."subjectVersion"=NEW.version AND e.action=audit_action AND e.xmin::text=pg_current_xact_id()::text AND
  (audit_action<>'MANDATE_ACCEPTED' OR e."actorId"=NEW."targetId")) THEN RAISE EXCEPTION 'mandate atomic audit required'; END IF;
 RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER mandate_audit AFTER INSERT OR UPDATE ON governance_private."Mandate" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION governance_private.mandate_audit();
CREATE FUNCTION governance_private.blocker_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 PERFORM 1 FROM public."Organization" WHERE id=NEW."organizationId" AND status='ACTIVE' FOR UPDATE;
 IF NOT FOUND OR NOT EXISTS(SELECT 1 FROM public."PrivateImportedAsset" WHERE id=NEW."assetId" AND "organizationId"=NEW."organizationId" AND "lifecycleState"='IMPORTED_PRIVATE') THEN RAISE EXCEPTION 'blocker requires active private asset'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER blocker_guard BEFORE INSERT ON governance_private."AssetBlocker" FOR EACH ROW EXECUTE FUNCTION governance_private.blocker_guard();
CREATE TRIGGER mandate_no_delete BEFORE DELETE ON governance_private."Mandate" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['Mandate','Operation','Closure','AssetBlocker'] LOOP
  EXECUTE format('ALTER TABLE governance_private.%I ENABLE ROW LEVEL SECURITY',t);
  EXECUTE format('ALTER TABLE governance_private.%I FORCE ROW LEVEL SECURITY',t);
  EXECUTE format('REVOKE ALL ON governance_private.%I FROM PUBLIC',t);
  IF t<>'Mandate' THEN EXECUTE format('CREATE TRIGGER immutable BEFORE UPDATE OR DELETE ON governance_private.%I FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable()',t); END IF;
 END LOOP;
END $$;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA governance_private FROM PUBLIC;
COMMIT;
