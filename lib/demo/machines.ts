export type MachineStatus = "VERIFIED" | "HISTORY_UNKNOWN" | "NOT_REGISTERED" | "STOLEN";

export type Machine = {
  registryId: string;
  serial: string;
  model: string;
  brand: string;
  year: string;
  status: MachineStatus;
  lastValidation?: string;
  location?: string;
};

export const demoMachines: Machine[] = [
  {
    registryId: "ER-REG-001",
    serial: "ER-REG-001",
    brand: "Caterpillar",
    model: "980 Wheel Loader",
    year: "2021",
    status: "VERIFIED",
    lastValidation: "2025",
    location: "NL / Rotterdam",
  },
  {
    registryId: "ER-HIS-404",
    serial: "ER-HIS-404",
    brand: "Volvo",
    model: "L90H Wheel Loader",
    year: "2014",
    status: "HISTORY_UNKNOWN",
    lastValidation: "—",
    location: "ES / Valencia",
  },
  {
    registryId: "ER-NOT-999",
    serial: "ER-NOT-999",
    brand: "JCB",
    model: "3CX Backhoe Loader",
    year: "2017",
    status: "NOT_REGISTERED",
    lastValidation: "—",
    location: "Unknown",
  },
  {
    registryId: "ER-STOL-777",
    serial: "ER-STOL-777",
    brand: "Komatsu",
    model: "WA380 Wheel Loader",
    year: "2019",
    status: "STOLEN",
    lastValidation: "2025-03-12",
    location: "EU / Cross-border alert",
  },
];

export function statusLabel(s: MachineStatus) {
  switch (s) {
    case "VERIFIED":
      return "Verified";
    case "HISTORY_UNKNOWN":
      return "History Unknown";
    case "NOT_REGISTERED":
      return "Not Registered";
    case "STOLEN":
      return "Stolen / Red Flag";
  }
}

export function statusColor(s: MachineStatus) {
  switch (s) {
    case "VERIFIED":
      return { bg: "#ecfdf5", border: "#16a34a", text: "#065f46" };
    case "HISTORY_UNKNOWN":
      return { bg: "#fff7ed", border: "#f97316", text: "#9a3412" };
    case "NOT_REGISTERED":
      return { bg: "#f1f5f9", border: "#64748b", text: "#334155" };
    case "STOLEN":
      return { bg: "#fef2f2", border: "#dc2626", text: "#7f1d1d" };
  }
}
