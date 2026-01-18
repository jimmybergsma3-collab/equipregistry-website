import { prisma } from "@/lib/db";

export async function getDashboardMachines() {
  return prisma.machine.findMany({
    orderBy: { createdAt: "desc" },
    include: { owner: true },
  });
}

export async function getMachineById(id: number) {
  return prisma.machine.findUnique({
    where: { id },
    include: { owner: true },
  });
}

export async function getMachineByRegistryId(registryId: string) {
  return prisma.machine.findUnique({
    where: { registryId },
    include: { owner: true },
  });
}
