import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    registryId?: string;
  }>;
}

export default async function ActionPage({ searchParams }: PageProps) {
  const { type, registryId } = await searchParams;

  const nextTarget = registryId
    ? `/dashboard/passport/${encodeURIComponent(registryId)}`
    : "/dashboard";

  /* ---------- VERIFY ---------- */
  if (type === "verify") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Request verification</h1>

          <p style={styles.text}>
            Verification confirms the legal origin and ownership history of
            registered equipment. This reduces fraud, insurance risk and
            compliance uncertainty.
          </p>

          {registryId && (
            <p style={styles.registryId}>
              Registry ID: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>What happens next</h3>
            <ul style={styles.list}>
              <li>Login as the equipment owner or authorized party</li>
              <li>Submit ownership and origin documentation</li>
              <li>A validation partner reviews the case</li>
              <li>The registry status is updated upon approval</li>
            </ul>
          </div>

          <div style={styles.actions}>
            <Link href={`/login?next=${encodeURIComponent(nextTarget)}`} style={styles.primaryButton}>
              Login to continue
            </Link>

            <Link href="/" style={styles.secondaryButton}>
              Back to search
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ---------- REGISTER ---------- */
  if (type === "register") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Register equipment</h1>

          <p style={styles.text}>
            Equipment registration creates an official EquipRegistry passport.
            This establishes a verified reference for ownership, documentation
            and insurance validation.
          </p>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Who can register</h3>
            <ul style={styles.list}>
              <li>Equipment owners</li>
              <li>Authorized dealers or manufacturers</li>
              <li>Insurance or leasing partners (with mandate)</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Registration includes</h3>
            <ul style={styles.list}>
              <li>Unique registry ID</li>
              <li>Digital equipment passport</li>
              <li>Proof-of-origin validation</li>
              <li>Insurance-ready status reference</li>
            </ul>
          </div>

          <div style={styles.actions}>
            <Link href={`/login?next=${encodeURIComponent(nextTarget)}`} style={styles.primaryButton}>
              Login to start registration
            </Link>

            <Link href="/" style={styles.secondaryButton}>
              Back to search
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ---------- REPORT ---------- */
  if (type === "report") {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Report a sighting</h1>

          <p style={styles.text}>
            If you believe you have identified equipment that is reported as
            stolen or suspicious, you can submit a sighting report to
            EquipRegistry.
          </p>

          {registryId && (
            <p style={styles.registryId}>
              Registry ID: <strong>{registryId}</strong>
            </p>
          )}

          <div style={styles.warning}>
            <strong>Important</strong>
            <p style={{ marginTop: 6 }}>
              Do not attempt to intervene, recover or confront any party.
              Reporting a sighting helps authorities and insurers take
              appropriate action.
            </p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>What happens after reporting</h3>
            <ul style={styles.list}>
              <li>Your report is logged securely</li>
              <li>Relevant insurers or authorities are notified</li>
              <li>No personal details are disclosed publicly</li>
              <li>You may be contacted for clarification if needed</li>
            </ul>
          </div>

          <div style={styles.actions}>
            <Link href={`/login?next=${encodeURIComponent(nextTarget)}`} style={styles.primaryButton}>
              Login to submit report
            </Link>

            <Link href="/" style={styles.secondaryButton}>
              Back to search
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ---------- FALLBACK ---------- */
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>EquipRegistry action</h1>

        <p style={styles.text}>
          This action requires additional context. Please start from a serial
          lookup or registry passport.
        </p>

        <Link href="/" style={styles.primaryButton}>
          Back to search
        </Link>
      </div>
    </main>
  );
}

/* ---------- Styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },

  card: {
    maxWidth: 540,
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 12,
  },

  text: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 1.6,
  },

  registryId: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 20,
  },

  warning: {
    border: "1px solid #fca5a5",
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 14,
    fontSize: 13,
    color: "#7f1d1d",
    marginBottom: 20,
  },

  section: {
    marginTop: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  list: {
    paddingLeft: 18,
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },

  primaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#1f4fd8",
    color: "#ffffff",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },

  secondaryButton: {
    display: "inline-block",
    padding: "12px 20px",
    backgroundColor: "#f1f5f9",
    color: "#1f2937",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
};
