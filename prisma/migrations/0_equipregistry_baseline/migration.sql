-- DB-1 review artifact, 2026-10-07. NOT for execution on existing production.
-- Hand-authored from reviewed prisma/schema.prisma; no production dump or data.
-- Requires an EMPTY public application schema. Archive old init outside active
-- migrations before later adoption; do NOT append this after the legacy init.
-- No users, application records, sequence values, grants, RLS or provider setup.
BEGIN;
CREATE TYPE "public"."ApplicantType" AS ENUM
  ('private', 'sme', 'insurer_partner', 'bank_partner', 'dealer_partner', 'rental_partner');
CREATE TYPE "public"."RegistrationRequestStatus" AS ENUM
  ('draft', 'incomplete', 'ready_for_submission', 'payment_required', 'submitted',
   'under_review', 'approved', 'rejected', 'more_info_required', 'passport_issued');
CREATE TYPE "public"."UserRole" AS ENUM ('user', 'admin');

CREATE TABLE "public"."User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "companyName" TEXT,
  "vatNumber" TEXT,
  "role" "public"."UserRole" NOT NULL DEFAULT 'user',
  "emailVerifiedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "public"."EmailVerificationToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "public"."Machine" (
  "id" TEXT NOT NULL,
  "registryId" TEXT NOT NULL,
  "serialNumber" TEXT NOT NULL,
  "brand" TEXT,
  "model" TEXT,
  "year" TEXT,
  "category" TEXT,
  "status" TEXT,
  "ownerId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "public"."RegistrationRequest" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "assetName" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "subcategory" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "serialNumber" TEXT NOT NULL,
  "year" TEXT,
  "country" TEXT,
  "ownerName" TEXT NOT NULL,
  "ownerEmail" TEXT NOT NULL,
  "applicantType" "public"."ApplicantType" NOT NULL,
  "requestStatus" "public"."RegistrationRequestStatus" NOT NULL,
  "paymentCompleted" BOOLEAN NOT NULL DEFAULT false,
  "declarationAccepted" BOOLEAN NOT NULL,
  "dynamicFields" JSONB NOT NULL,
  "documents" JSONB NOT NULL,
  "completenessScore" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "RegistrationRequest_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "public"."RegistrySequence" (
  "id" TEXT NOT NULL DEFAULT 'registry-sequence',
  "nextValue" INTEGER NOT NULL DEFAULT 1,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RegistrySequence_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "public"."User" ("email");
CREATE UNIQUE INDEX "EmailVerificationToken_tokenHash_key" ON "public"."EmailVerificationToken" ("tokenHash");
CREATE INDEX "EmailVerificationToken_userId_idx" ON "public"."EmailVerificationToken" ("userId");
CREATE INDEX "EmailVerificationToken_expiresAt_idx" ON "public"."EmailVerificationToken" ("expiresAt");
CREATE UNIQUE INDEX "Machine_registryId_key" ON "public"."Machine" ("registryId");
CREATE UNIQUE INDEX "RegistrationRequest_reference_key" ON "public"."RegistrationRequest" ("reference");
ALTER TABLE "public"."EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Machine" ADD CONSTRAINT "Machine_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "public"."User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."RegistrationRequest" ADD CONSTRAINT "RegistrationRequest_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "public"."User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
