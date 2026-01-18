import { prisma } from "../lib/db";

async function main() {
  // 1 demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@equipregistry.com" },
    update: {},
    create: {
      email: "demo@equipregistry.com",
      password: "demo", // later hashing
      role: "owner",
    },
  });

  // demo machines (match jouw demo IDs)
  const machines = [
    {
      registryId: "ER-REG-001",
      brand: "Caterpillar",
      model: "980 Wheel Loader",
      year: 2021,
      status: "Verified",
      lastValidated: "2025",
    },
    {
      registryId: "ER-HIS-404",
      brand: "Volvo",
      model: "L90H Wheel Loader",
      year: 2014,
      status: "History Unknown",
      lastValidated: null,
    },
    {
      registryId: "ER-NOT-999",
      brand: "JCB",
      model: "3CX Backhoe Loader",
      year: 2017,
      status: "Not Registered",
      lastValidated: null,
    },
    {
      registryId: "ER-STOL-777",
      brand: "Komatsu",
      model: "WA380 Wheel Loader",
      year: 2019,
      status: "Stolen / Red Flag",
      lastValidated: "2025-03-12",
    },
  ];

  for (const m of machines) {
    await prisma.machine.upsert({
      where: { registryId: m.registryId },
      update: {
        brand: m.brand,
        model: m.model,
        year: m.year,
        status: m.status,
        lastValidated: m.lastValidated ?? null,
        ownerId: user.id,
      },
      create: {
        ...m,
        lastValidated: m.lastValidated ?? null,
        ownerId: user.id,
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
