import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

function createReferenceNumber() {
  return `ER-REQ-${Date.now()}`;
}

const ALLOWED_APPLICANT_TYPES = ["private", "sme"] as const;

const ALLOWED_ASSET_TYPES = [
  "Vehicle",
  "Equipment",
  "BikeLightMobility",
  "Trailer",
  "Energy",
  "Agriculture",
  "Medical",
  "Industrial",
  "Other",
] as const;

const ALLOWED_CATEGORIES = [
  "Vehicles",
  "Machines",
  "Industry",
  "Bikes",
  "Trailers",
  "Energy",
  "Agriculture",
  "Medical",
  "Other",
] as const;

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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const applicantType = String(body.applicantType || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const companyName = String(body.companyName || "").trim();
    const vatNumber = String(body.vatNumber || "").trim();

    const assetType = String(body.assetType || "Other").trim();
    const assetName = String(body.assetName || "").trim();
    const category = String(body.category || "").trim();
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

    const solarPanelSerialNumbers = normalizeStringArray(
      body.solarPanelSerialNumbers
    );
    const batterySerialNumbers = normalizeStringArray(body.batterySerialNumbers);
    const bikeBatterySerialNumbers = normalizeStringArray(
      body.bikeBatterySerialNumbers
    );

    const declarationAccepted = body.declarationAccepted === true;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Naam, e-mail en wachtwoord zijn verplicht." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Wachtwoord moet minimaal 6 tekens bevatten." },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_APPLICANT_TYPES.includes(
        applicantType as (typeof ALLOWED_APPLICANT_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Ongeldig aanvragerstype." },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_ASSET_TYPES.includes(
        assetType as (typeof ALLOWED_ASSET_TYPES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Ongeldig assettype." },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_CATEGORIES.includes(
        category as (typeof ALLOWED_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        { error: "Ongeldige categorie." },
        { status: 400 }
      );
    }

    if (!assetName || !category || !subcategory || !brand || !model) {
      return NextResponse.json(
        { error: "Vul alle verplichte assetgegevens in." },
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
        {
          error:
            "Minimaal één identificerend nummer is verplicht (serienummer, VIN, framenummer, paneelserienummer, accu serienummer of device ID).",
        },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        { error: "Je moet de verklaring accepteren." },
        { status: 400 }
      );
    }

    if (applicantType === "sme" && !companyName) {
      return NextResponse.json(
        { error: "Bedrijfsnaam is verplicht voor zakelijke aanvragen." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Er bestaat al een account met dit e-mailadres. Log eerst in om een nieuwe registratie toe te voegen.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

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

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          companyName: companyName || null,
          vatNumber: vatNumber || null,
          role: "user",
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

      return { user, registrationRequest };
    });

    const res = NextResponse.json({
      success: true,
      requestId: result.registrationRequest.id,
      reference: result.registrationRequest.reference,
    });

    res.cookies.set("er_session", result.user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("REGISTER REQUEST ERROR:", error);

    return NextResponse.json(
      { error: "Serverfout tijdens registreren." },
      { status: 500 }
    );
  }
}