'use client';

type Props = {
  registryId?: string;
  caseId: string;
};

export default function AuthoritiesClient({ registryId, caseId }: Props) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Recommended next step</h3>

      <p style={styles.text}>
        Contact the relevant police or cross-border authority and provide the case ID below.
      </p>

      <div style={styles.metaBox}>
        {registryId && (
          <p style={styles.metaLine}>
            <strong>Registry ID:</strong> {registryId}
          </p>
        )}
        <p style={styles.metaLine}>
          <strong>Case ID:</strong> {caseId}
        </p>
      </div>

      <p style={styles.note}>
        This is currently a demo helper. Final authority-routing logic can be added later.
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    marginTop: 20,
    marginBottom: 20,
    border: '1px solid #dbeafe',
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: '#1e3a8a',
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#1f2937',
    marginBottom: 12,
  },
  metaBox: {
    border: '1px solid #bfdbfe',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  metaLine: {
    fontSize: 14,
    color: '#111827',
    margin: 0,
    marginBottom: 6,
  },
  note: {
    fontSize: 12,
    color: '#475569',
    margin: 0,
  },
};