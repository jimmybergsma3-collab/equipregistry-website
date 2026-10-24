-- LOCAL SYNTHETIC 4B ONLY. No production adoption or deployment authorization.
-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "displayName" VARCHAR(200) NOT NULL,
    "countryCode" VARCHAR(2),
    "status" VARCHAR(24) NOT NULL DEFAULT 'PENDING_REVIEW',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationMembership" (
    "organizationId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "role" VARCHAR(24) NOT NULL,
    "status" VARCHAR(16) NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 0,
    "startsAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMPTZ(6),
    "grantedBy" TEXT NOT NULL,

    CONSTRAINT "OrganizationMembership_pkey" PRIMARY KEY ("organizationId","userId")
);

-- CreateTable
CREATE TABLE "OrganizationMandateReview" (
    "organizationId" UUID NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "firstAdministratorId" TEXT NOT NULL,
    "privateReviewReference" VARCHAR(200) NOT NULL,
    "reviewedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationMandateReview_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "PrivateImportedAsset" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "assetName" VARCHAR(200) NOT NULL,
    "category" VARCHAR(40) NOT NULL,
    "subcategory" VARCHAR(80) NOT NULL,
    "brand" VARCHAR(200),
    "model" VARCHAR(200),
    "serialNumber" VARCHAR(200),
    "identifierType" VARCHAR(16),
    "sourceSystem" VARCHAR(80),
    "externalAssetKey" VARCHAR(200),
    "identityRevision" INTEGER NOT NULL DEFAULT 0,
    "identityState" VARCHAR(24) NOT NULL,
    "evidenceState" VARCHAR(24) NOT NULL DEFAULT 'EVIDENCE_REQUIRED',
    "lifecycleState" VARCHAR(24) NOT NULL DEFAULT 'IMPORTED_PRIVATE',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrivateImportedAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationEvent" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" VARCHAR(40) NOT NULL,
    "subjectId" VARCHAR(200) NOT NULL,
    "subjectVersion" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganizationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizationMembership_userId_status_idx" ON "OrganizationMembership"("userId", "status");

-- CreateIndex
CREATE INDEX "PrivateImportedAsset_organizationId_identifierType_serialNu_idx" ON "PrivateImportedAsset"("organizationId", "identifierType", "serialNumber");

-- CreateIndex
CREATE INDEX "PrivateImportedAsset_organizationId_id_idx" ON "PrivateImportedAsset"("organizationId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateImportedAsset_organizationId_sourceSystem_externalAs_key" ON "PrivateImportedAsset"("organizationId", "sourceSystem", "externalAssetKey");

-- CreateIndex
CREATE INDEX "OrganizationEvent_organizationId_createdAt_idx" ON "OrganizationEvent"("organizationId", "createdAt");

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "OrganizationMembership_grantedBy_fkey" FOREIGN KEY ("grantedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMandateReview" ADD CONSTRAINT "OrganizationMandateReview_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMandateReview" ADD CONSTRAINT "OrganizationMandateReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMandateReview" ADD CONSTRAINT "OrganizationMandateReview_firstAdministratorId_fkey" FOREIGN KEY ("firstAdministratorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateImportedAsset" ADD CONSTRAINT "PrivateImportedAsset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateImportedAsset" ADD CONSTRAINT "PrivateImportedAsset_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationEvent" ADD CONSTRAINT "OrganizationEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationEvent" ADD CONSTRAINT "OrganizationEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Additive local-only constraints. No policy grants anonymous/authenticated access.
ALTER TABLE "Organization" ADD CONSTRAINT "organization_state" CHECK (
  length(btrim("displayName")) BETWEEN 1 AND 200 AND version IN (0,1) AND
  ((status='PENDING_REVIEW' AND version=0 AND "activatedAt" IS NULL) OR
   (status='ACTIVE' AND version=1 AND "activatedAt" IS NOT NULL)));
ALTER TABLE "OrganizationMembership" ADD CONSTRAINT "membership_state" CHECK (
  role IN ('ORG_ADMIN','IMPORTER','EVIDENCE_WORKER','VIEWER') AND version>=0 AND
  ((status='ACTIVE' AND "endsAt" IS NULL) OR (status='REVOKED' AND "endsAt">="startsAt")));
ALTER TABLE "OrganizationMandateReview" ADD CONSTRAINT "review_reference" CHECK (length(btrim("privateReviewReference"))>=10 AND "reviewerId"<>"firstAdministratorId");
ALTER TABLE "PrivateImportedAsset" ADD CONSTRAINT "private_asset_state" CHECK (
  "lifecycleState"='IMPORTED_PRIVATE' AND "evidenceState"='EVIDENCE_REQUIRED' AND "identityRevision"=0 AND version>=0 AND
  length(btrim("assetName"))>0 AND
  (("sourceSystem" IS NULL AND "externalAssetKey" IS NULL) OR ("sourceSystem" IS NOT NULL AND "externalAssetKey" IS NOT NULL AND length(btrim("sourceSystem"))>0 AND length(btrim("externalAssetKey"))>0)) AND
  ("serialNumber" IS NOT NULL OR "externalAssetKey" IS NOT NULL) AND
  (("serialNumber" IS NOT NULL AND length(btrim("serialNumber"))>0 AND "identifierType" IS NOT NULL AND "identifierType" IN ('SERIAL','VIN','FRAME','HIN') AND "identityState"='IDENTITY_PROVIDED') OR
   ("serialNumber" IS NULL AND "identifierType" IS NULL AND "identityState"='IDENTITY_INCOMPLETE')));
ALTER TABLE "OrganizationEvent" ADD CONSTRAINT "organization_event_action" CHECK (
  "subjectVersion">=0 AND action IN ('ORGANIZATION_CREATED','MANDATE_REVIEWED_AND_ACTIVATED','MEMBERSHIP_GRANTED','MEMBERSHIP_REVOKED','PRIVATE_ASSET_CREATED','PRIVATE_ASSET_NAME_CORRECTED'));

CREATE FUNCTION public.org4b_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION '4B immutable record'; END $$;
CREATE TRIGGER org4b_review_immutable BEFORE UPDATE OR DELETE ON "OrganizationMandateReview" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();
CREATE TRIGGER org4b_event_immutable BEFORE UPDATE OR DELETE ON "OrganizationEvent" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();
CREATE TRIGGER org4b_org_no_delete BEFORE DELETE ON "Organization" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();
CREATE TRIGGER org4b_member_no_delete BEFORE DELETE ON "OrganizationMembership" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();
CREATE TRIGGER org4b_asset_no_delete BEFORE DELETE ON "PrivateImportedAsset" FOR EACH ROW EXECUTE FUNCTION public.org4b_immutable();

CREATE FUNCTION public.org4b_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_TABLE_NAME='Organization' THEN
    IF OLD.status<>'PENDING_REVIEW' OR NEW.status<>'ACTIVE' OR
      (to_jsonb(OLD)-ARRAY['status','version','activatedAt']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['status','version','activatedAt']) THEN
      RAISE EXCEPTION '4B organization lifecycle closed';
    END IF;
  ELSIF TG_TABLE_NAME='OrganizationMembership' THEN
    IF OLD.role='ORG_ADMIN' OR NEW.role='ORG_ADMIN' OR NEW.version<>OLD.version+1 OR
      (to_jsonb(OLD)-ARRAY['role','status','version','endsAt','grantedBy']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['role','status','version','endsAt','grantedBy']) THEN
      RAISE EXCEPTION '4B administrator succession closed';
    END IF;
  ELSIF TG_TABLE_NAME='PrivateImportedAsset' THEN
    IF NEW.version<>OLD.version+1 OR
      (to_jsonb(OLD)-ARRAY['assetName','version']) IS DISTINCT FROM (to_jsonb(NEW)-ARRAY['assetName','version']) THEN
      RAISE EXCEPTION '4B identity and lifecycle closed';
    END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER org4b_org_guard BEFORE UPDATE ON "Organization" FOR EACH ROW EXECUTE FUNCTION public.org4b_guard();
CREATE TRIGGER org4b_member_guard BEFORE UPDATE ON "OrganizationMembership" FOR EACH ROW EXECUTE FUNCTION public.org4b_guard();
CREATE TRIGGER org4b_asset_guard BEFORE UPDATE ON "PrivateImportedAsset" FOR EACH ROW EXECUTE FUNCTION public.org4b_guard();

CREATE FUNCTION public.org4b_review_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE account_role text;
BEGIN
  SELECT role::text INTO account_role FROM public."User" WHERE id=NEW."reviewerId" FOR SHARE;
  IF account_role IS DISTINCT FROM 'admin' THEN RAISE EXCEPTION '4B platform review required'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public."Organization" WHERE id=NEW."organizationId" AND status='PENDING_REVIEW') THEN
    RAISE EXCEPTION '4B pending review required';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER org4b_review_guard BEFORE INSERT ON "OrganizationMandateReview" FOR EACH ROW EXECUTE FUNCTION public.org4b_review_guard();

-- Deferred final-state check prevents half activation, extra administrators and unreviewed grants.
CREATE FUNCTION public.org4b_activation_complete() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE oid uuid; o public."Organization"; r public."OrganizationMandateReview";
BEGIN
  IF TG_TABLE_NAME='Organization' THEN oid=NEW.id; ELSE oid=NEW."organizationId"; END IF;
  SELECT * INTO o FROM public."Organization" WHERE id=oid;
  SELECT * INTO r FROM public."OrganizationMandateReview" WHERE "organizationId"=oid;
  IF o.status='PENDING_REVIEW' THEN
    IF r."organizationId" IS NOT NULL OR EXISTS (SELECT 1 FROM public."OrganizationMembership" WHERE "organizationId"=oid) THEN
      RAISE EXCEPTION '4B incomplete activation';
    END IF;
  ELSE
    IF r."organizationId" IS NULL OR NOT EXISTS (SELECT 1 FROM public."OrganizationMembership"
      WHERE "organizationId"=oid AND "userId"=r."firstAdministratorId" AND role='ORG_ADMIN' AND status='ACTIVE' AND "grantedBy"=r."reviewerId") OR
      (SELECT count(*) FROM public."OrganizationMembership" WHERE "organizationId"=oid AND role='ORG_ADMIN')<>1 THEN
      RAISE EXCEPTION '4B incomplete reviewed administrator';
    END IF;
  END IF;
  RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER org4b_activation_complete AFTER INSERT OR UPDATE ON "Organization" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_activation_complete();
CREATE CONSTRAINT TRIGGER org4b_membership_complete AFTER INSERT OR UPDATE ON "OrganizationMembership" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_activation_complete();
CREATE CONSTRAINT TRIGGER org4b_review_complete AFTER INSERT ON "OrganizationMandateReview" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_activation_complete();

-- Every mutation requires a matching event from the same transaction.
CREATE FUNCTION public.org4b_audit_complete() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE oid uuid; sid text; ver integer; actions text[];
BEGIN
  IF TG_TABLE_NAME='Organization' THEN
    oid=NEW.id; ver=NEW.version;
    IF TG_OP='INSERT' THEN sid=NEW.id::text; actions=ARRAY['ORGANIZATION_CREATED'];
    ELSE SELECT "firstAdministratorId" INTO sid FROM public."OrganizationMandateReview" WHERE "organizationId"=oid; actions=ARRAY['MANDATE_REVIEWED_AND_ACTIVATED']; END IF;
  ELSIF TG_TABLE_NAME='OrganizationMembership' THEN
    oid=NEW."organizationId"; sid=NEW."userId"; ver=NEW.version;
    IF NEW.role='ORG_ADMIN' THEN ver=1; actions=ARRAY['MANDATE_REVIEWED_AND_ACTIVATED'];
    ELSIF NEW.status='REVOKED' THEN actions=ARRAY['MEMBERSHIP_REVOKED']; ELSE actions=ARRAY['MEMBERSHIP_GRANTED']; END IF;
  ELSE
    oid=NEW."organizationId"; sid=NEW.id::text; ver=NEW.version;
    IF TG_OP='INSERT' THEN actions=ARRAY['PRIVATE_ASSET_CREATED']; ELSE actions=ARRAY['PRIVATE_ASSET_NAME_CORRECTED']; END IF;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public."OrganizationEvent" WHERE "organizationId"=oid AND "subjectId"=sid AND "subjectVersion"=ver AND action=ANY(actions) AND xmin::text=pg_current_xact_id()::text) THEN
    RAISE EXCEPTION '4B atomic audit required';
  END IF;
  RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER org4b_org_audit AFTER INSERT OR UPDATE ON "Organization" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_audit_complete();
CREATE CONSTRAINT TRIGGER org4b_member_audit AFTER INSERT OR UPDATE ON "OrganizationMembership" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_audit_complete();
CREATE CONSTRAINT TRIGGER org4b_asset_audit AFTER INSERT OR UPDATE ON "PrivateImportedAsset" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public.org4b_audit_complete();

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['Organization','OrganizationMembership','OrganizationMandateReview','PrivateImportedAsset','OrganizationEvent'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
    EXECUTE format('ALTER TABLE public.%I FORCE ROW LEVEL SECURITY',t);
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC',t);
    IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname='anon') THEN EXECUTE format('REVOKE ALL ON public.%I FROM anon',t); END IF;
    IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname='authenticated') THEN EXECUTE format('REVOKE ALL ON public.%I FROM authenticated',t); END IF;
  END LOOP;
END $$;
REVOKE ALL ON FUNCTION public.org4b_immutable(),public.org4b_guard(),public.org4b_review_guard(),public.org4b_activation_complete(),public.org4b_audit_complete() FROM PUBLIC;
