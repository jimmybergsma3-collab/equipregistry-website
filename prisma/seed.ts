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
