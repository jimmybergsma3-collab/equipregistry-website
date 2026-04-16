import { existsSync } from "node:fs";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "jimmybergsma3@gmail.com";
const TEMP_PASSWORD = "EquipRegistryAdmin!2026";

for (const filename of [".env.local", ".env"]) {
  const envPath = resolve(process.cwd(), filename);

  if (existsSync(envPath) && typeof process.loadEnvFile === "function") {
    process.loadEnvFile(envPath);
  }
}

async function main() {
  const { prisma } = await import("../lib/db");
  const email = ADMIN_EMAIL.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error(`Admin user not found for ${email}`);
  }

  if (user.role !== "admin") {
    throw new Error(`User ${user.email} is not an admin`);
  }

  const passwordHash = await bcrypt.hash(TEMP_PASSWORD, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
    },
  });

  console.log(`Admin password reset for ${user.email}`);
  console.log(`Temporary password: ${TEMP_PASSWORD}`);

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error("RESET_ADMIN_PASSWORD_FAILED");
  console.error(error instanceof Error ? error.message : error);

  try {
    const { prisma } = await import("../lib/db");
    await prisma.$disconnect();
  } catch {}

  process.exit(1);
});
