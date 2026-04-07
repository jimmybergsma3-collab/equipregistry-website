import { randomBytes, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import type { ApplicantType } from "@prisma/client";
import type { Lang } from "@/lib/i18n/config";
import { sendAccountVerificationEmail } from "@/lib/email/send-registration-email";

function createReferenceNumber() {
  return `ER-REQ-${Date.now()}`;
}

const ALLOWED_APPLICANT_TYPES = ["private", "sme"] as const;
const ALLOWED_LANGS = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "nl",
  "pt",
  "ru",
  "zh",
  "hi",
  "ar",
] as const;

const FRONTEND_CATEGORY_TO_ASSET_TYPE = {
  vehicle: "Vehicle",
  equipment: "Equipment",
  bikelightmobility: "BikeLightMobility",
  trailer: "Trailer",
  energy: "Energy",
  agriculture: "Agriculture",
  medical: "Medical",
  industrial: "Industrial",
  other: "Other",
} as const;

const FRONTEND_CATEGORY_TO_DB_CATEGORY = {
  vehicle: "Vehicles",
  equipment: "Machines",
  bikelightmobility: "Bikes",
  trailer: "Trailers",
  energy: "Energy",
  agriculture: "Agriculture",
  medical: "Medical",
  industrial: "Industry",
  other: "Other",
} as const;

type FrontendCategory = keyof typeof FRONTEND_CATEGORY_TO_ASSET_TYPE;

function isFrontendCategory(value: string): value is FrontendCategory {
  return value in FRONTEND_CATEGORY_TO_ASSET_TYPE;
}

function isLang(value: string): value is Lang {
  return ALLOWED_LANGS.includes(value as (typeof ALLOWED_LANGS)[number]);
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function calculateCompletenessScore(input: {
  serialNumber: string;
  vin: string;
  frameNumber: string;
  deviceId: string;
  solarPanelSerialNumbers: string[];
  batterySerialNumbers: string[];
  bikeBatterySerialNumbers: string[];
  engineNumber: string;
  capacity: string;
  powerRating: string;
  batchLotNumber: string;
  installationLocation: string;
  hoursOfOperation: string;
  certification: string;
  ownerOrganisation: string;
  year: string;
  country: string;
}) {
  let score = 60;

  if (
    input.serialNumber ||
    input.vin ||
    input.frameNumber ||
    input.deviceId ||
    input.solarPanelSerialNumbers.length > 0 ||
    input.batterySerialNumbers.length > 0 ||
    input.bikeBatterySerialNumbers.length > 0
  ) {
    score += 10;
  }

  if (input.year) score += 5;
  if (input.country) score += 5;
  if (input.engineNumber) score += 5;
  if (input.capacity) score += 5;
  if (input.powerRating) score += 2;
  if (input.batchLotNumber) score += 2;
  if (input.installationLocation) score += 2;
  if (input.hoursOfOperation) score += 2;
  if (input.certification) score += 2;
  if (input.ownerOrganisation) score += 2;

  return Math.min(score, 100);
}

function createVerificationToken() {
  return randomBytes(32).toString("hex");
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  const url = new URL(req.url);
  return url.origin.replace(/\/+$/, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const applicantTypeRaw = String(body.applicantType || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const companyName = String(body.companyName || "").trim();
    const vatNumber = String(body.vatNumber || "").trim();

    const frontendCategoryRaw = String(body.category || "").trim();
    const assetName = String(body.assetName || "").trim();
    const subcategory = String(body.subcategory || "").trim();
    const brand = String(body.brand || "").trim();
    const model = String(body.model || "").trim();

    const serialNumber = String(body.serialNumber || "").trim();
    const year = String(body.year || "").trim();
    const country = String(body.country || "").trim();

    const vin = String(body.vin || "").trim();
    const engineNumber = String(body.engineNumber || "").trim();
    const frameNumber = String(body.frameNumber || "").trim();
    const capacity = String(body.capacity || "").trim();
    const powerRating = String(body.powerRating || "").trim();
    const batchLotNumber = String(body.batchLotNumber || "").trim();
    const installationLocation = String(body.installationLocation || "").trim();
    const hoursOfOperation = String(body.hoursOfOperation || "").trim();
    const deviceId = String(body.deviceId || "").trim();
    const certification = String(body.certification || "").trim();
    const ownerOrganisation = String(body.ownerOrganisation || "").trim();

    const langRaw = String(body.lang || "en").trim().toLowerCase();
    const lang: Lang = isLang(langRaw) ? langRaw : "en";

    const solarPanelSerialNumbers = normalizeStringArray(
      body.solarPanelSerialNumbers
    );
    const batterySerialNumbers = normalizeStringArray(body.batterySerialNumbers);
    const bikeBatterySerialNumbers = normalizeStringArray(
      body.bikeBatterySerialNumbers
    );

    const declarationAccepted =
      body.declarationAccepted === true || body.declarationAccepted === "true";

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "REQUIRED_FIELDS_MISSING" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "PASSWORD_TOO_SHORT" },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_APPLICANT_TYPES.includes(
        applicantTypeRaw as (typeof ALLOWED_APPLICANT_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "INVALID_APPLICANT_TYPE" },
        { status: 400 }
      );
    }

    const applicantType = applicantTypeRaw as ApplicantType;

    if (!isFrontendCategory(frontendCategoryRaw)) {
      return NextResponse.json(
        { error: "INVALID_CATEGORY" },
        { status: 400 }
      );
    }

    const assetType = FRONTEND_CATEGORY_TO_ASSET_TYPE[frontendCategoryRaw];
    const category = FRONTEND_CATEGORY_TO_DB_CATEGORY[frontendCategoryRaw];

    if (!assetName || !subcategory || !brand || !model) {
      return NextResponse.json(
        { error: "ASSET_FIELDS_MISSING" },
        { status: 400 }
      );
    }

    const primaryIdentifier =
      serialNumber ||
      vin ||
      frameNumber ||
      solarPanelSerialNumbers[0] ||
      batterySerialNumbers[0] ||
      bikeBatterySerialNumbers[0] ||
      deviceId;

    if (!primaryIdentifier) {
      return NextResponse.json(
        { error: "IDENTIFIER_REQUIRED" },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        { error: "DECLARATION_REQUIRED" },
        { status: 400 }
      );
    }

    if (applicantType === "sme" && !companyName) {
      return NextResponse.json(
        { error: "COMPANY_NAME_REQUIRED" },
        { status: 400 }
      );
    }

    const dynamicFields = {
      assetType,
      vin: vin || null,
      engineNumber: engineNumber || null,
      frameNumber: frameNumber || null,
      solarPanelSerialNumbers,
      batterySerialNumbers,
      bikeBatterySerialNumbers,
      capacity: capacity || null,
      powerRating: powerRating || null,
      batchLotNumber: batchLotNumber || null,
      installationLocation: installationLocation || null,
      hoursOfOperation: hoursOfOperation || null,
      deviceId: deviceId || null,
      certification: certification || null,
      ownerOrganisation: ownerOrganisation || null,
    };

    const baseUrl = getBaseUrl(req);
    const rawToken = createVerificationToken();
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        registrationRequests: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (existingUser?.emailVerifiedAt) {
      return NextResponse.json(
        { error: "EMAIL_ALREADY_EXISTS" },
        { status: 409 }
      );
    }

    let requestId = "";
    let reference = "";

    if (existingUser && !existingUser.emailVerifiedAt) {
      const existingDraft = existingUser.registrationRequests[0] ?? null;

      const updated = await prisma.$transaction(async (tx) => {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await tx.user.update({
          where: { id: existingUser.id },
          data: {
            name,
            passwordHash,
            companyName: companyName || null,
            vatNumber: vatNumber || null,
          },
        });

        let registrationRequest;

        if (existingDraft) {
          registrationRequest = await tx.registrationRequest.update({
            where: { id: existingDraft.id },
            data: {
              assetName,
              category,
              subcategory,
              brand,
              model,
              serialNumber: primaryIdentifier,
              year: year || null,
              country: country || null,
              ownerName: name,
              ownerEmail: email,
              applicantType,
              requestStatus: "payment_required",
              paymentCompleted: false,
              declarationAccepted: true,
              dynamicFields,
              documents:
                existingDraft.documents === null
                  ? Prisma.JsonNull
                  : existingDraft.documents,
              completenessScore: calculateCompletenessScore({
                serialNumber,
                vin,
                frameNumber,
                deviceId,
                solarPanelSerialNumbers,
                batterySerialNumbers,
                bikeBatterySerialNumbers,
                engineNumber,
                capacity,
                powerRating,
                batchLotNumber,
                installationLocation,
                hoursOfOperation,
                certification,
                ownerOrganisation,
                year,
                country,
              }),
            },
          });
        } else {
          registrationRequest = await tx.registrationRequest.create({
            data: {
              reference: createReferenceNumber(),
              userId: user.id,
              assetName,
              category,
              subcategory,
              brand,
              model,
              serialNumber: primaryIdentifier,
              year: year || null,
              country: country || null,
              ownerName: name,
              ownerEmail: email,
              applicantType,
              requestStatus: "payment_required",
              paymentCompleted: false,
              declarationAccepted: true,
              dynamicFields,
              documents: {},
              completenessScore: calculateCompletenessScore({
                serialNumber,
                vin,
                frameNumber,
                deviceId,
                solarPanelSerialNumbers,
                batterySerialNumbers,
                bikeBatterySerialNumbers,
                engineNumber,
                capacity,
                powerRating,
                batchLotNumber,
                installationLocation,
                hoursOfOperation,
                certification,
                ownerOrganisation,
                year,
                country,
              }),
            },
          });
        }

        await tx.emailVerificationToken.updateMany({
          where: {
            userId: user.id,
            usedAt: null,
          },
          data: {
            usedAt: new Date(),
          },
        });

        await tx.emailVerificationToken.create({
          data: {
            userId: user.id,
            tokenHash,
            expiresAt,
          },
        });

        return { user, registrationRequest };
      });

      requestId = updated.registrationRequest.id;
      reference = updated.registrationRequest.reference;
    } else {
      const created = await prisma.$transaction(async (tx) => {
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await tx.user.create({
          data: {
            name,
            email,
            passwordHash,
            companyName: companyName || null,
            vatNumber: vatNumber || null,
            role: "user",
            emailVerifiedAt: null,
          },
        });

        const registrationRequest = await tx.registrationRequest.create({
          data: {
            reference: createReferenceNumber(),
            userId: user.id,
            assetName,
            category,
            subcategory,
            brand,
            model,
            serialNumber: primaryIdentifier,
            year: year || null,
            country: country || null,
            ownerName: name,
            ownerEmail: email,
            applicantType,
            requestStatus: "payment_required",
            paymentCompleted: false,
            declarationAccepted: true,
            dynamicFields,
            documents: {},
            completenessScore: calculateCompletenessScore({
              serialNumber,
              vin,
              frameNumber,
              deviceId,
              solarPanelSerialNumbers,
              batterySerialNumbers,
              bikeBatterySerialNumbers,
              engineNumber,
              capacity,
              powerRating,
              batchLotNumber,
              installationLocation,
              hoursOfOperation,
              certification,
              ownerOrganisation,
              year,
              country,
            }),
          },
        });

        await tx.emailVerificationToken.create({
          data: {
            userId: user.id,
            tokenHash,
            expiresAt,
          },
        });

        return { user, registrationRequest };
      });

      requestId = created.registrationRequest.id;
      reference = created.registrationRequest.reference;
    }

    const verifyUrl = `${baseUrl}/${lang}/verify-email?token=${encodeURIComponent(
      rawToken
    )}&requestId=${encodeURIComponent(requestId)}`;

    await sendAccountVerificationEmail({
      to: email,
      ownerName: name,
      verifyUrl,
      lang,
    });

    return NextResponse.json({
      success: true,
      verificationRequired: true,
      requestId,
      reference,
      message: "VERIFY_EMAIL_REQUIRED",
    });
  } catch (error) {
    console.error("REGISTER REQUEST ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
