interface PageProps {
  searchParams: {
    registryId?: string;
  };
}

export default function RegisterActionPage({ searchParams }: PageProps) {
  const registryId = searchParams.registryId;

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Register equipment</h1>

        <p style={styles.text}>
          You are about to start the registration process for the following
          equipment:
        </p>

        <p style={styles.registry}>
          Registry ID: <strong>{registryId ?? 'Unknown'}</strong>
        </p>

        <p style={styles.notice}>
          Registration may only be initiated by the rightful owner or an
          authorized representative.
        </p>

        <a href="/" style={styles.link}>
          ← Back to search
        </a>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    background: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: 12,
    padding: 32,
    maxWidth: 520,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 12,
  },
  registry: {
    fontSize: 14,
    marginBottom: 16,
  },
  notice: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 24,
  },
  link: {
    fontSize: 13,
    color: '#2563eb',
    textDecoration: 'none',
  },
};
