import Image from 'next/image';
import Link from 'next/link';

import PassportLayout from '@/components/passport/PassportLayout';
import PassportQRCode from '@/components/passport/PassportQRCode';
import { getPublicPassport } from '@/lib/passport/getPublicPassport';
import { STATUS_TEXT } from '@/lib/passport/statusText';

interface PageProps {
  params: Promise<{
    registryId: string;
  }>;
}

export default async function PublicPassportPage({ params }: PageProps) {
  const { registryId } = await params;

  const passport = getPublicPassport(registryId);
  const statusContent = STATUS_TEXT[passport.status];

  return (
    <>
      {/* Back to search (outside passport document) */}
      <div style={styles.backRow}>
        <Link href="/" style={styles.backLink}>
          ← Back to search
        </Link>
      </div>

      <PassportLayout title="" subtitle="">
        {/* Header with logo + QR (PDF-safe) */}
        <header style={styles.headerRow}>
          <div>
            <Image
              src="/equipregistry_logo.png"
              alt="EquipRegistry"
              width={200}
              height={200}
              style={styles.logo}
            />

            <h1 style={styles.title}>Digital Equipment Passport</h1>
            <p style={styles.subtitle}>Issued by EquipRegistry</p>
          </div>

          <div style={styles.qrBlock}>
            <PassportQRCode registryId={passport.registryId} />
            <span style={styles.qrCaption}>Scan to verify</span>
          </div>
        </header>

        <hr />

        {/* Identification + Status */}
        <div style={styles.topGrid}>
          {/* Left column */}
          <div>
            <Row label="Registry ID" value={passport.registryId} />
            <Row label="Serial Number" value={passport.machine.serialMasked} />
            <Row
              label="Make / Model"
              value={`${passport.machine.brand} ${passport.machine.model}`}
            />
            <Row label="Machine Type" value={passport.machine.type} />
            <Row
              label="Year of Manufacture"
              value={passport.machine.yearOfManufacture ?? '-'}
            />
          </div>

          {/* Right column – Status */}
          <div
            style={{
              ...styles.statusCard,
              ...styles.statusByType[passport.status],
            }}
          >
            <span style={styles.statusHeadline}>
              {statusContent.headline}
            </span>

            <p style={styles.statusPrimary}>
              {statusContent.primary}
            </p>

            <p style={styles.small}>
              Last validated: {passport.validation.lastValidated}
            </p>
          </div>
        </div>

        <hr style={{ margin: '32px 0' }} />

        {/* Registry Validation */}
        <section>
          <h3 style={styles.sectionTitle}>Registry Validation</h3>

          <ul style={styles.validationList}>
            <li>
              Registry record: <strong>Active</strong>
            </li>
            <li>
              Status classification:{' '}
              <strong>{statusContent.headline}</strong>
            </li>
            <li>
              Validation source:{' '}
              <strong>{passport.validation.source}</strong>
            </li>
          </ul>
        </section>

        <hr />

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            This document reflects the machine’s registry status at the time shown.
            The current status can always be verified through the EquipRegistry platform.
          </p>
          <p style={styles.disclaimer}>
            EquipRegistry provides an independent registry service and does not
            mediate ownership, transactions, or disputes.
          </p>
        </footer>

        {/* Bottom band (visual closure) */}
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

const styles: Record<string, React.CSSProperties | any> = {
  backRow: {
    maxWidth: 820,
    margin: '0 auto 12px',
    paddingLeft: 4,
  },

  backLink: {
    fontSize: 13,
    color: '#1f4fd8',
    textDecoration: 'none',
  },

  headerRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 24,
    marginBottom: 24,
    alignItems: 'start',
  },

  logo: {
    display: 'block',
    marginBottom: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: 600,
    marginTop: 4,
  },

  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },

  qrBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 4,
  },

  qrCaption: {
    fontSize: 11,
    marginTop: 6,
    color: '#374151',
  },

  topGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 28,
    marginTop: 28,
  },

  row: {
    display: 'flex',
    marginBottom: 10,
  },

  label: {
    width: 220,
    fontWeight: 600,
    color: '#111827',
  },

  statusCard: {
    padding: 18,
    borderRadius: 6,
    border: '2px solid',
    minHeight: 150,
  },

  statusHeadline: {
    fontSize: 15,
    fontWeight: 800,
    textTransform: 'uppercase',
    marginBottom: 10,
    display: 'block',
  },

  statusPrimary: {
    fontSize: 14,
    marginBottom: 8,
  },

  statusByType: {
    REGISTERED_VERIFIED: {
      borderColor: '#16a34a',
      backgroundColor: '#ecfdf5',
    },
    HISTORY_UNKNOWN: {
      borderColor: '#f59e0b',
      backgroundColor: '#fffbeb',
    },
    STOLEN: {
      borderColor: '#dc2626',
      backgroundColor: '#fef2f2',
    },
    NOT_REGISTERED: {
      borderColor: '#9ca3af',
      backgroundColor: '#f9fafb',
    },
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 14,
  },

  validationList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginBottom: 0,
  },

  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTop: '1px solid #e5e7eb',
    fontSize: 13,
    color: '#374151',
  },

  disclaimer: {
    marginTop: 10,
    fontSize: 12,
    color: '#6b7280',
  },

  footerBand: {
    height: 10,
    backgroundColor: '#1f4fd8',
    marginTop: 24,
  },

  small: {
    fontSize: 12,
    color: '#374151',
  },
};
