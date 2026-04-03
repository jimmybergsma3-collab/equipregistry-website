"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import PassportQRCode from "@/components/passport/PassportQRCode";
import PassportLayout from "@/components/passport/PassportLayout";

import { MOCK_MACHINES, type InsuranceMachine } from "@/lib/insurance/mockMachines";
import { STATUS_TEXT } from "@/lib/passport/statusText";
import { normalizeStatus } from "@/lib/machineStatus";

const STORAGE_KEY = "er_insurance_machines_v1";

function financeLabel(s?: string) {
  switch (s) {
    case "FINANCED":
      return "Financed";
    case "LEASED":
      return "Leased";
    case "OWNED":
      return "Owned";
    default:
      return "Unknown";
  }
}

function fraudSignals(machine: InsuranceMachine) {
  const signals: string[] = [];
  let tone: "red" | "orange" | "gray" = "gray";
  let note = "No elevated fraud indicators based on finance + registry status.";

  const fin = machine.financeStatus;
  const st = machine.status;

  if (st === "STOLEN" && (fin === "FINANCED" || fin === "LEASED")) {
    tone = "red";
    signals.push("Stolen asset with active financing/lease exposure.");
    signals.push("Potential double financing or fraudulent collateral risk.");
    note = "High priority: lender/lessor may have an active claim on this asset.";
  } else if (st === "HISTORY_UNKNOWN" && fin === "FINANCED") {
    tone = "orange";
    signals.push("History Unknown combined with active financing.");
    signals.push("Increased probability of fraud or disputed provenance.");
    note = "Flag for underwriting: request proof of legal origin and lien checks.";
  } else if (st === "NOT_REGISTERED" && fin === "FINANCED") {
    tone = "orange";
    signals.push("Financed asset not found in registry.");
    signals.push("Potential unregistered collateral / documentation gap.");
    note = "Consider requiring registration before policy issuance/renewal.";
  } else if (fin === "UNKNOWN") {
    signals.push("Financing status unknown (data gap).");
    note = "Recommend collecting finance/lease information for better risk scoring.";
  } else if (fin === "LEASED" && st === "VERIFIED") {
    signals.push("Leased asset: verify lessor/contract alignment (demo rule).");
  }

  return { tone, signals, note };
}

export default function InsurancePassportPage() {
  const params = useParams();
  const registryId = (params?.registryId as string) || "";

  const [machines, setMachines] = useState<InsuranceMachine[]>(MOCK_MACHINES);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
const parsed = safeParse<InsuranceMachine[]>(raw) ?? [];        if (Array.isArray(parsed) && parsed.length) setMachines(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const machine = useMemo(
    () => machines.find((m) => m.id === registryId || m.serial === registryId),
    [machines, registryId]
  );

  const fraud = useMemo(() => (machine ? fraudSignals(machine) : null), [machine]);

  // ✅ Stable on client to avoid mismatch
  const origin =
    (process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"));

  if (!machine) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Machine not found</h1>
        <p className="text-sm text-slate-600 mt-2">Registry ID: {registryId}</p>
        <div className="mt-4">
          <Link className="underline" href="/dashboard/insurance/machines">
            Back to machines
          </Link>
        </div>
      </div>
    );
  }

  const status = normalizeStatus(machine.status);

  const statusContent =
    (STATUS_TEXT as any)[status] ??
    (STATUS_TEXT as any).NOT_REGISTERED ?? {
      headline: status,
      primary: "Status information not available.",
    };

  // placeholders (same as public passport)
  const serialMasked = "—";
  const machineType = "—";

  return (
    <>
      <div style={styles.backRow}>
        <Link style={styles.backLink} href={`/dashboard/insurance/machines/${machine.id}`}>
          ← Back to machine
        </Link>
      </div>

      <PassportLayout title="" subtitle="">
        {/* ===== HEADER (LOGO + TITLE + QR) ===== */}
        <header style={styles.headerRow}>
          <div>
            <Image
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              width={180}
              height={180}
              style={styles.logo}
              priority
            />

            <h1 style={styles.title}>Digital Equipment Passport</h1>
            <p style={styles.issued}>Issued by EquipRegistry</p>
            <p style={styles.issued}>Mode: Insurance / Full (demo)</p>
          </div>

          <div style={styles.qrBlock}>
            <PassportQRCode registryId={machine.serial} origin={origin} />
            <span style={styles.qrCaption}>Scan to verify</span>
          </div>
        </header>

        <hr />

        {/* ===== IDENTIFICATION + STATUS ===== */}
        <div style={styles.topGrid}>
          <div>
            <Row label="Registry ID" value={machine.serial} />
            <Row label="Serial Number" value={serialMasked} />
            <Row label="Make / Model" value={`${machine.brand} ${machine.model}`} />
            <Row label="Machine Type" value={machineType} />
            <Row label="Year of Manufacture" value={"—"} />

            {/* ✅ Insurance shows financing */}
            <Row label="Financing" value={financeLabel(machine.financeStatus)} />
            <Row label="Finance Provider" value={machine.financeProvider || "—"} />
          </div>

          <div style={{ ...styles.statusCard, ...(styles.statusByType as any)[status] }}>
            <span style={styles.statusHeadline}>{statusContent.headline}</span>
            <p style={styles.statusPrimary}>{statusContent.primary}</p>

            <p style={styles.small}>
              Last validated: {machine.lastVerifiedAt ?? "—"}
            </p>
          </div>
        </div>

        <hr style={{ margin: "28px 0" }} />

        {/* ===== REGISTRY VALIDATION ===== */}
        <section>
          <h3 style={styles.sectionTitle}>Registry Validation</h3>

          <ul style={styles.validationList}>
            <li>
              Registry record: <strong>Active</strong>
            </li>
            <li>
              Status classification: <strong>{statusContent.headline}</strong>
            </li>
            <li>
              Validation source: <strong>EquipRegistry</strong>
            </li>
          </ul>
        </section>

        <hr />

        {/* ===== FRAUD / DOUBLE FINANCING SIGNALS ===== */}
        {fraud && (
          <section>
            <h3 style={styles.sectionTitle}>Fraud & Double Financing Signals</h3>

            <div
              style={{
                ...styles.signalBox,
                ...(fraud.tone === "red"
                  ? styles.signalRed
                  : fraud.tone === "orange"
                  ? styles.signalOrange
                  : styles.signalGray),
              }}
            >
              <div style={styles.signalTopRow}>
                <span style={styles.signalLabel}>
                  Risk level:{" "}
                  <strong>
                    {fraud.tone === "red" ? "High" : fraud.tone === "orange" ? "Medium" : "Low"}
                  </strong>
                </span>
              </div>

              <p style={styles.signalNote}>{fraud.note}</p>

              {fraud.signals.length > 0 && (
                <ul style={styles.signalList}>
                  {fraud.signals.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        <hr />

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            This document reflects the machine’s registry status at the time shown.
            The current status can always be verified through the EquipRegistry platform.
          </p>
          <p style={styles.disclaimer}>
            EquipRegistry provides an independent registry service and does not mediate
            ownership, transactions, or disputes.
          </p>
        </footer>

        <div style={styles.footerBand} />
      </PassportLayout>
    </>
  );
}

/* ---------- Helper ---------- */

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}:</span>
      <span>{value}</span>
    </div>
  );
}

/* ---------- Styles ---------- */

const styles: {
  [key: string]: React.CSSProperties | any;
  statusByType: Record<string, React.CSSProperties>;
} = {
  backRow: {
    maxWidth: 820,
    margin: "0 auto 12px",
    paddingLeft: 4,
  },

  backLink: {
    fontSize: 13,
    color: "#1f4fd8",
    textDecoration: "none",
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "start",
    gap: 24,
    marginBottom: 20,
  },

  logo: {
    display: "block",
    marginBottom: 6,
    height: "auto",
    width: "auto",
  },

  title: {
    fontSize: 28,
    fontWeight: 600,
    marginTop: 6,
  },

  issued: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },

  qrBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 4,
  },

  qrCaption: {
    fontSize: 11,
    marginTop: 6,
    color: "#374151",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 28,
    marginTop: 24,
  },

  row: {
    display: "flex",
    marginBottom: 10,
  },

  label: {
    width: 220,
    fontWeight: 600,
    color: "#111827",
  },

  statusCard: {
    padding: 18,
    borderRadius: 6,
    border: "2px solid",
    backgroundColor: "#ffffff",
    minHeight: 140,
  },

  statusHeadline: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    marginBottom: 8,
    display: "block",
  },

  statusPrimary: {
    fontSize: 14,
    marginBottom: 6,
  },

  statusByType: {
    REGISTERED_VERIFIED: {
      borderColor: "#16a34a",
      backgroundColor: "#ecfdf5",
    },
    HISTORY_UNKNOWN: {
      borderColor: "#f59e0b",
      backgroundColor: "#fffbeb",
    },
    STOLEN: {
      borderColor: "#dc2626",
      backgroundColor: "#fef2f2",
    },
    NOT_REGISTERED: {
      borderColor: "#9ca3af",
      backgroundColor: "#f9fafb",
    },
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 12,
  },

  validationList: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: 0,
  },

  signalBox: {
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: 14,
    marginTop: 8,
  },

  signalTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  signalLabel: {
    fontSize: 13,
    color: "#111827",
  },

  signalNote: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 10,
  },

  signalList: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 13,
    color: "#374151",
  },

  signalRed: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },

  signalOrange: {
    borderColor: "#fde68a",
    backgroundColor: "#fffbeb",
  },

  signalGray: {
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },

  footer: {
    marginTop: 28,
    paddingTop: 16,
    borderTop: "1px solid #e5e7eb",
    fontSize: 13,
    color: "#374151",
  },

  disclaimer: {
    marginTop: 10,
    fontSize: 12,
    color: "#6b7280",
  },

  footerBand: {
    height: 8,
    backgroundColor: "#1f4fd8",
    marginTop: 24,
  },

  small: {
    fontSize: 12,
    color: "#374151",
  },
};