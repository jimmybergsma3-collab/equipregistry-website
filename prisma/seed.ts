import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("demo", 10);

  // 1 demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@equipregistry.com" },
    update: {
      passwordHash,
      name: "Demo User",
      role: "user",
    },
    create: {
      email: "demo@equipregistry.com",
      passwordHash,
      name: "Demo User",
      role: "user",
    },
  });

  // demo machines (match jouw demo IDs)
  const machines = [
    {
      registryId: "ER-REG-001",
      serialNumber: "ER-REG-001",
      brand: "Caterpillar",
      model: "980 Wheel Loader",
      year: "2021",
      category: "Equipment",
      status: "Verified",
    },
    {
      registryId: "ER-HIS-404",
      serialNumber: "ER-HIS-404",
      brand: "Volvo",
      model: "L90H Wheel Loader",
      year: "2014",
      category: "Equipment",
      status: "History Unknown",
    },
    {
      registryId: "ER-NOT-999",
      serialNumber: "ER-NOT-999",
      brand: "JCB",
      model: "3CX Backhoe Loader",
      year: "2017",
      category: "Equipment",
      status: "Not Registered",
    },
    {
      registryId: "ER-STOL-777",
      serialNumber: "ER-STOL-777",
      brand: "Komatsu",
      model: "WA380 Wheel Loader",
      year: "2019",
      category: "Equipment",
      status: "Stolen / Red Flag",
    },
  ];

  const demoPassports = [
    {
      reference: "ER-REG-001",
      assetName: "Caterpillar 980 Wheel Loader",
      category: "machines",
      subcategory: "wheel_loader",
      brand: "Caterpillar",
      model: "980 Wheel Loader",
      serialNumber: "ER-REG-001",
      year: "2021",
      country: "Spain",
      dynamicFields: {
        __registryStatus: "registered_verified",
      },
    },
    {
      reference: "ER-HIS-404",
      assetName: "Volvo L90H Wheel Loader",
      category: "machines",
      subcategory: "wheel_loader",
      brand: "Volvo",
      model: "L90H Wheel Loader",
      serialNumber: "ER-HIS-404",
      year: "2014",
      country: "Spain",
      dynamicFields: {
        __registryStatus: "history_unknown",
      },
    },
    {
      reference: "ER-STOL-777",
      assetName: "Komatsu WA380 Wheel Loader",
      category: "machines",
      subcategory: "wheel_loader",
      brand: "Komatsu",
      model: "WA380 Wheel Loader",
      serialNumber: "ER-STOL-777",
      year: "2019",
      country: "Spain",
      dynamicFields: {
        __registryStatus: "verified_stolen",
        __stolen: {
          caseReference: "ER-CASE-2026-00123",
          assetReference: "ER-STOL-777",
          registrationReference: "ER-STOL-777",
          isStolen: true,
          status: "open",
          previousRegistryStatus: "registered_verified",
          previousMachineStatus: "passport_issued",
          policeReportNumber: "VAL-2026-00123",
          policeReportDate: "2026-01-14",
          country: "Spain",
          cityRegion: "Valencia",
          incidentDate: "2026-01-13",
          incidentDescription:
            "Demo stolen asset record for public verification flow.",
          supportingDocumentReferences: [],
          caseNotes: "Demo stolen case",
          createdBy: user.id,
          updatedBy: user.id,
          resolvedBy: null,
          resolvedAt: null,
          createdAt: "2026-01-14T09:00:00.000Z",
          updatedAt: "2026-01-14T09:00:00.000Z",
          evidenceFiles: [],
          policeReportFiles: [],
        },
      },
    },
  ];

  for (const m of machines) {
    await prisma.machine.upsert({
      where: { registryId: m.registryId },
      update: {
        brand: m.brand,
        model: m.model,
        year: m.year,
        serialNumber: m.serialNumber,
        category: m.category,
        status: m.status,
        ownerId: user.id,
      },
      create: {
        ...m,
        ownerId: user.id,
      },
    });
  }

  for (const passport of demoPassports) {
    await prisma.registrationRequest.upsert({
      where: { reference: passport.reference },
      update: {
        userId: user.id,
        assetName: passport.assetName,
        category: passport.category,
        subcategory: passport.subcategory,
        brand: passport.brand,
        model: passport.model,
        serialNumber: passport.serialNumber,
        year: passport.year,
        country: passport.country,
        ownerName: user.name,
        ownerEmail: user.email,
        applicantType: "private",
        requestStatus: "passport_issued",
        paymentCompleted: true,
        declarationAccepted: true,
        dynamicFields: passport.dynamicFields,
        documents: {},
        completenessScore: 100,
        deletedAt: null,
      },
      create: {
        reference: passport.reference,
        userId: user.id,
        assetName: passport.assetName,
        category: passport.category,
        subcategory: passport.subcategory,
        brand: passport.brand,
        model: passport.model,
        serialNumber: passport.serialNumber,
        year: passport.year,
        country: passport.country,
        ownerName: user.name,
        ownerEmail: user.email,
        applicantType: "private",
        requestStatus: "passport_issued",
        paymentCompleted: true,
        declarationAccepted: true,
        dynamicFields: passport.dynamicFields,
        documents: {},
        completenessScore: 100,
      },
    });
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
