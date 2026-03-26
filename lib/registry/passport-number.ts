// lib/registry/passport-number.ts

import { prisma } from "@/lib/db";
import { generatePassportNumber } from "@/lib/registry/reference";

export async function reserveNextPassportNumber() {
  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.registrySequence.findUnique({
      where: { id: "registry-sequence" },
    });

    if (!existing) {
      const created = await tx.registrySequence.create({
        data: {
          id: "registry-sequence",
          nextValue: 2,
        },
      });

      return {
        sequence: 1,
        passportNumber: generatePassportNumber(1),
      };
    }

    const currentValue = existing.nextValue;

    await tx.registrySequence.update({
      where: { id: "registry-sequence" },
      data: {
        nextValue: currentValue + 1,
      },
    });

    return {
      sequence: currentValue,
      passportNumber: generatePassportNumber(currentValue),
    };
  });

  return result;
}