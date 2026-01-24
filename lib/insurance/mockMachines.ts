// lib/insurance/mockMachines.ts
export type InsuranceMachineStatus =
  | "VERIFIED"
  | "HISTORY_UNKNOWN"
  | "NOT_REGISTERED"
  | "STOLEN";

export type InsuranceMachine = {
  id: string;          // internal id for routes: /machines/[id]
  serial: string;      // we keep this name, but it is your Registry ID (ER-REG-001 etc.)
  brand: string;
  model: string;
  country: string;
  owner: string;
  policyNo: string;
  status: InsuranceMachineStatus;
  lastVerifiedAt: string; // ISO date string
};

export const MOCK_MACHINES: InsuranceMachine[] = [
  {
    id: "ER-STOL-777",
    serial: "ER-STOL-777",
    brand: "Komatsu",
    model: "WA380 Wheel Loader (2019)",
    country: "EU",
    owner: "demo@equipregistry.com",
    policyNo: "POL-DEMO-777",
    status: "STOLEN",
    lastVerifiedAt: "2026-01-18",
  },
  {
    id: "ER-NOT-999",
    serial: "ER-NOT-999",
    brand: "JCB",
    model: "3CX Backhoe Loader (2017)",
    country: "EU",
    owner: "demo@equipregistry.com",
    policyNo: "POL-DEMO-999",
    status: "NOT_REGISTERED",
    lastVerifiedAt: "2025-03-22",
  },
  {
    id: "ER-HIS-404",
    serial: "ER-HIS-404",
    brand: "Volvo",
    model: "L90H Wheel Loader (2014)",
    country: "EU",
    owner: "demo@equipregistry.com",
    policyNo: "POL-DEMO-404",
    status: "HISTORY_UNKNOWN",
    lastVerifiedAt: "2025-08-03",
  },
  {
    id: "ER-REG-001",
    serial: "ER-REG-001",
    brand: "Caterpillar",
    model: "980 Wheel Loader (2021)",
    country: "EU",
    owner: "demo@equipregistry.com",
    policyNo: "POL-DEMO-001",
    status: "VERIFIED",
    lastVerifiedAt: "2026-01-12",
  },
];
