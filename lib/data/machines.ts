import { readFile } from "node:fs/promises";
import path from "node:path";

export type MachineStatus = "VERIFIED" | "HISTORY_UNKNOWN" | "NOT_REGISTERED" | "STOLEN";

export type MachineRecord = {
  registryId: string;
  serial: string;
  brand: string;
  model: string;
  country: string;
  owner: string;
  policyNo: string;
  status: MachineStatus;
  lastVerifiedAt: string; // ISO date string
};

function getDataFilePath() {
  return path.join(process.cwd(), "data", "machines.json");
}

export async function getMachines(): Promise<MachineRecord[]> {
  const filePath = getDataFilePath();
  const raw = await readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as MachineRecord[];

  if (!Array.isArray(parsed)) return [];
  return parsed;
}

export async function getMachineByRegistryId(registryId: string): Promise<MachineRecord | null> {
  const machines = await getMachines();
  return machines.find((m) => m.registryId === registryId) ?? null;
}
