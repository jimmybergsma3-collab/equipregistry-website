import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  generatePassportNumber,
  getPassportSequenceId,
} from "@/lib/registry/reference";

type RegistrySequenceClient = Pick<Prisma.TransactionClient, "registrySequence">;

async function reserveNextPassportNumberInClient(
  client: RegistrySequenceClient,
  category: string,
  subcategory?: string
) {
  const sequenceId = getPassportSequenceId(category, subcategory);
  const existing = await client.registrySequence.findUnique({
    where: { id: sequenceId },
  });

  if (!existing) {
    await client.registrySequence.create({
      data: {
        id: sequenceId,
        nextValue: 2,
      },
    });

    return {
      sequence: 1,
      passportNumber: generatePassportNumber(1, category, subcategory),
    };
  }

  const currentValue = existing.nextValue;

  await client.registrySequence.update({
    where: { id: sequenceId },
    data: {
      nextValue: currentValue + 1,
    },
  });

  return {
    sequence: currentValue,
    passportNumber: generatePassportNumber(
      currentValue,
      category,
      subcategory
    ),
  };
}

export async function reserveNextPassportNumber(
  category: string,
  subcategory?: string,
  client?: RegistrySequenceClient
) {
  if (client) {
    return reserveNextPassportNumberInClient(client, category, subcategory);
  }

  return prisma.$transaction(async (tx) => {
    return reserveNextPassportNumberInClient(tx, category, subcategory);
  });
}
