-- CreateEnum
CREATE TYPE "PhotoLabel" AS ENUM ('overview', 'front', 'rear', 'left', 'right', 'interior', 'serial_plate', 'vin_chassis', 'hull_id', 'engine_serial', 'detail', 'damage', 'attachment', 'other');

-- CreateEnum
CREATE TYPE "PhotoPublicationStatus" AS ENUM ('private', 'pending_review', 'published', 'rejected', 'revoked');

-- CreateEnum
CREATE TYPE "PhotoPrivacyResult" AS ENUM ('pending', 'passed', 'failed');

-- CreateTable
CREATE TABLE "AssetPhotoPublication" (
    "id" TEXT NOT NULL,
    "registrationRequestId" TEXT NOT NULL,
    "sourceFileId" TEXT NOT NULL,
    "sourceDocumentKey" TEXT NOT NULL,
    "sourceLocator" TEXT NOT NULL,
    "sourceSha256" TEXT NOT NULL,
    "sourceMetadataSha256" TEXT NOT NULL,
    "sourceOwnerId" TEXT NOT NULL,
    "sourceProvenance" TEXT NOT NULL,
    "revision" INTEGER NOT NULL,
    "labelCode" "PhotoLabel" NOT NULL,
    "publicationStatus" "PhotoPublicationStatus" NOT NULL DEFAULT 'private',
    "consentActorId" TEXT NOT NULL,
    "consentRecordedBy" TEXT NOT NULL,
    "consentRecordedAt" TIMESTAMP(3) NOT NULL,
    "consentEvidenceRef" TEXT NOT NULL,
    "consentPolicyVersion" TEXT NOT NULL,
    "variantObjectKey" TEXT NOT NULL,
    "variantSha256" TEXT NOT NULL,
    "variantMimeType" TEXT NOT NULL,
    "variantWidth" INTEGER NOT NULL,
    "variantHeight" INTEGER NOT NULL,
    "privacyReviewResult" "PhotoPrivacyResult" NOT NULL DEFAULT 'pending',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewPolicyVersion" TEXT,
    "publishedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "revokedBy" TEXT,
    "revocationReasonCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetPhotoPublication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Photo_public_listing_idx" ON "AssetPhotoPublication"("registrationRequestId", "publicationStatus", "labelCode", "publishedAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "AssetPhotoPublication_registrationRequestId_sourceFileId_re_key" ON "AssetPhotoPublication"("registrationRequestId", "sourceFileId", "revision");

-- AddForeignKey
ALTER TABLE "AssetPhotoPublication" ADD CONSTRAINT "AssetPhotoPublication_registrationRequestId_fkey" FOREIGN KEY ("registrationRequestId") REFERENCES "RegistrationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AssetPhotoPublication" ADD CONSTRAINT "Photo_proof_check" CHECK (
  "id" ~ '^[a-f0-9]{48}$' AND "revision" > 0 AND
  "sourceSha256" ~ '^[a-f0-9]{64}$' AND "sourceMetadataSha256" ~ '^[a-f0-9]{64}$' AND
  "variantSha256" ~ '^[a-f0-9]{64}$' AND "variantObjectKey" = "variantSha256" AND
  "variantMimeType" = 'image/webp' AND "variantWidth" BETWEEN 1 AND 1600 AND "variantHeight" BETWEEN 1 AND 1200 AND
  "sourceProvenance" = 'server-bound-v1' AND "sourceOwnerId" = "consentActorId" AND
  length(trim("consentEvidenceRef")) >= 20 AND length("consentRecordedBy") > 0 AND
  "consentPolicyVersion" = 'asset-photo-consent-v1' AND
  "sourceDocumentKey" IN ('asset_overview_photo','serial_plate_photo','vin_chassis_photo','hull_id_photo','engine_serial_photo')
);
ALTER TABLE "AssetPhotoPublication" ADD CONSTRAINT "Photo_published_check" CHECK (
  "publicationStatus" <> 'published' OR (
    "privacyReviewResult" = 'passed' AND "reviewedBy" IS NOT NULL AND length("reviewedBy") > 0 AND
    "reviewedAt" IS NOT NULL AND "reviewPolicyVersion" IS NOT NULL AND "reviewPolicyVersion" = 'asset-photo-privacy-v1' AND
    "publishedAt" IS NOT NULL AND "revokedAt" IS NULL AND "revokedBy" IS NULL
  )
);
ALTER TABLE "AssetPhotoPublication" ADD CONSTRAINT "Photo_revoked_check" CHECK (
  ("publicationStatus" = 'revoked' AND "revokedAt" IS NOT NULL AND "revokedBy" IS NOT NULL AND "revocationReasonCode" IS NOT NULL)
  OR ("publicationStatus" <> 'revoked' AND "revokedAt" IS NULL AND "revokedBy" IS NULL AND "revocationReasonCode" IS NULL)
);
CREATE FUNCTION "photo_publication_guard"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN RAISE EXCEPTION 'Photo publication audit records are retained'; END IF;
  IF TG_OP = 'INSERT' THEN
    IF NEW."publicationStatus" NOT IN ('private','pending_review') OR NEW."privacyReviewResult" <> 'pending' OR NEW."publishedAt" IS NOT NULL THEN
      RAISE EXCEPTION 'New revisions require review';
    END IF;
    RETURN NEW;
  END IF;
  IF (to_jsonb(NEW) - ARRAY['publicationStatus','privacyReviewResult','reviewedBy','reviewedAt','reviewPolicyVersion','publishedAt','revokedAt','revokedBy','revocationReasonCode']) IS DISTINCT FROM
     (to_jsonb(OLD) - ARRAY['publicationStatus','privacyReviewResult','reviewedBy','reviewedAt','reviewPolicyVersion','publishedAt','revokedAt','revokedBy','revocationReasonCode']) THEN
    RAISE EXCEPTION 'Photo revision payload is immutable';
  END IF;
  IF NOT ((OLD."publicationStatus" = 'private' AND NEW."publicationStatus" = 'pending_review') OR
          (OLD."publicationStatus" = 'pending_review' AND NEW."publicationStatus" IN ('published','rejected')) OR
          (OLD."publicationStatus" = 'published' AND NEW."publicationStatus" = 'revoked')) THEN
    RAISE EXCEPTION 'Invalid publication transition';
  END IF;
  IF OLD."publicationStatus" = 'published' AND
     (to_jsonb(NEW) - ARRAY['publicationStatus','revokedAt','revokedBy','revocationReasonCode']) IS DISTINCT FROM
     (to_jsonb(OLD) - ARRAY['publicationStatus','revokedAt','revokedBy','revocationReasonCode']) THEN
    RAISE EXCEPTION 'Published review evidence is immutable';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER "Photo_revision_guard" BEFORE INSERT OR UPDATE OR DELETE ON "AssetPhotoPublication"
FOR EACH ROW EXECUTE FUNCTION "photo_publication_guard"();
ALTER TABLE "AssetPhotoPublication" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON "AssetPhotoPublication" FROM PUBLIC;
-- No anonymous/customer policy: only the trusted application server may access this table.

