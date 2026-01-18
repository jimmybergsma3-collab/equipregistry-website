// components/passport/PassportLayout.tsx

'use client';

interface PassportLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showPrintButton?: boolean;
}

export default function PassportLayout({
  title,
  subtitle,
  children,
  showPrintButton = true,
}: PassportLayoutProps) {
  return (
    <>
      <main style={styles.page}>
        <section style={styles.document}>
          {/* Header */}
          {(title || subtitle || showPrintButton) && (
            <header style={styles.header}>
              <div>
                {title && (
                  <h1 style={styles.title}>{title}</h1>
                )}
                {subtitle && (
                  <p style={styles.subtitle}>{subtitle}</p>
                )}
              </div>

              {showPrintButton && (
                <button
                  onClick={() => window.print()}
                  style={styles.printButton}
                >
                  Download PDF
                </button>
              )}
            </header>
          )}

          <hr style={{ marginBottom: 32 }} />

          {/* Content */}
          {children}
        </section>
      </main>

      {/* Print styles */}
      <style>
        {`
          @media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    background: white !important;
  }


            button {
              display: none !important;
            }

            a {
              text-decoration: none !important;
              color: black !important;
            }

            main {
              padding: 0 !important;
              background: white !important;
            }

            section {
              border: none !important;
              box-shadow: none !important;
              margin: 0 !important;
              padding: 0 !important;
              max-width: none !important;
            }
          }
        `}
      </style>
    </>
  );
}

/* ---------- Styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: '#f3f4f6',
    padding: '48px 0',
  },

  document: {
    maxWidth: 900,
    margin: '0 auto',
    background: '#ffffff',
    padding: '36px 40px',
    border: '1px solid #d1d5db',
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 600,
  },

  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },

  printButton: {
    padding: '8px 14px',
    fontSize: 13,
    border: '1px solid #d1d5db',
    background: '#ffffff',
    borderRadius: 6,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};
