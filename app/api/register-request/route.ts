import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

function createReferenceNumber() {
  return `ER-REQ-${Date.now()}`;
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

    const assetName = String(body.assetName || "").trim();
    const category = String(body.category || "").trim();
    const subcategory = String(body.subcategory || "").trim();
    const brand = String(body.brand || "").trim();
    const model = String(body.model || "").trim();
    const serialNumber = String(body.serialNumber || "").trim();
    const year = String(body.year || "").trim();
    const country = String(body.country || "").trim();

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

    if (applicantType !== "private" && applicantType !== "sme") {
      return NextResponse.json(
        { error: "Ongeldig aanvragerstype." },
        { status: 400 }
      );
    }

    if (!assetName || !category || !subcategory || !brand || !model || !serialNumber) {
      return NextResponse.json(
        { error: "Vul alle verplichte assetgegevens in." },
        { status: 400 }
      );
    }

    if (!declarationAccepted) {
      return NextResponse.json(
        { error: "Je moet de verklaring accepteren." },
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
          serialNumber,
          year: year || null,
          country: country || null,
          ownerName: name,
          ownerEmail: email,
          applicantType,
          requestStatus: "payment_required",
          paymentCompleted: false,
          declarationAccepted: true,
          dynamicFields: {},
          documents: {},
          completenessScore: 60,
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