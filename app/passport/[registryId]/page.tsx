import React from "react";
import Image from "next/image";
import Link from "next/link";

import PassportActions from "@/components/passport/PassportActions";
import PassportQRCode from "@/components/passport/PassportQRCode";
import PassportLayout from "@/components/passport/PassportLayout";

import { getMachineByRegistryId } from "@/lib/queries/machines";
import { STATUS_TEXT } from "@/lib/passport/statusText";
import { normalizeStatus } from "@/lib/machineStatus";

export default async function PassportPage({
  params,
}: {
  params: Promise<{ registryId: string }>;
}) {
  const { registryId } = await params;

  // ✅ Stable on server + client to avoid hydration mismatch
  const origin =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const machine = await getMachineByRegistryId(registryId);

  if (!machine) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Not Registered</h1>
        <p className="text-sm text-slate-600 mt-2">Registry ID: {registryId}</p>
        <div className="mt-4">
          <Link className="underline" href="/">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Canonical status for UI + copy
  const status = normalizeStatus(machine.status);

  const statusContent =
    (STATUS_TEXT as any)[status] ??
    (STATUS_TEXT as any).NOT_REGISTERED ?? {
      headline: status,
      primary: "Status information not available.",
    };

  // Placeholders until you add these fields to Prisma
  const serialMasked = "—";
  const machineType = "—";

  return (
    <>
      <div style={styles.backRow}>
        <Link style={styles.backLink} href="/dashboard">
          ← Back to dashboard
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
          </div>

          {/* QR — fixed top-right, PDF safe */}
          <div style={styles.qrBlock}>
            <PassportQRCode registryId={machine.registryId} origin={origin} />
            <span style={styles.qrCaption}>Scan to verify</span>
          </div>
        </header>

        <hr />

        {/* ===== IDENTIFICATION + STATUS ===== */}
        <div style={styles.topGrid}>
          {/* Left column */}
          <div>
            <Row label="Registry ID" value={machine.registryId} />
            <Row label="Serial Number" value={serialMasked} />
            <Row
              label="Make / Model"
              value={`${machine.brand} ${machine.model}`}
            />
            <Row label="Machine Type" value={machineType} />
            <Row
              label="Year of Manufacture"
              value={machine.year ?? "-"}
            />
          </div>

          {/* Right column – Status */}
          <div
            style={{
              ...styles.statusCard,
              ...(styles.statusByType as any)[status],
            }}
          >
            <span style={styles.statusHeadline}>{statusContent.headline}</span>
            <p style={styles.statusPrimary}>{statusContent.primary}</p>

            <p style={styles.small}>
              Last validated: {machine.lastValidated ?? "—"}
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

        {/* ===== ACTIONS (PUBLIC) ===== */}
        <PassportActions
          registryId={machine.registryId}
          status={status}
          mode="public"
        />

        {/* ===== FOOTER ===== */}
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
