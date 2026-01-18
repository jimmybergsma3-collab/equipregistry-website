export type CanonStatus =
  | "REGISTERED_VERIFIED"
  | "HISTORY_UNKNOWN"
  | "NOT_REGISTERED"
  | "STOLEN";

export function normalizeStatus(input: string | null | undefined): CanonStatus {
  const s = (input ?? "").trim().toUpperCase();

  // al correct
  if (
    s === "REGISTERED_VERIFIED" ||
    s === "HISTORY_UNKNOWN" ||
    s === "NOT_REGISTERED" ||
    s === "STOLEN"
  ) {
    return s;
  }

  // map varianten uit seed/UI
  if (s === "VERIFIED" || s === "REGISTERED" || s === "REGISTERED & VERIFIED") {
    return "REGISTERED_VERIFIED";
  }

  if (s === "HISTORY UNKNOWN" || s === "UNKNOWN" || s === "HISTORY-UNKNOWN") {
    return "HISTORY_UNKNOWN";
  }

  if (s === "NOT REGISTERED" || s === "UNREGISTERED" || s === "NOT-REGISTERED") {
    return "NOT_REGISTERED";
  }

  if (s === "STOLEN / RED FLAG" || s === "RED FLAG" || s === "RED_FLAG") {
    return "STOLEN";
  }

  // fallback veilig
  return "NOT_REGISTERED";
}

export function getStatusUI(input: string | null | undefined) {
  const s = normalizeStatus(input);

  if (s === "REGISTERED_VERIFIED") return { label: "Registered & Verified", tone: "green" as const };
  if (s === "HISTORY_UNKNOWN") return { label: "History Unknown", tone: "orange" as const };
  if (s === "NOT_REGISTERED") return { label: "Not Registered", tone: "gray" as const };
  return { label: "Stolen / Red Flag", tone: "red" as const };
}
