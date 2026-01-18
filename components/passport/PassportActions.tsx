'use client';

import Link from 'next/link';
import React from 'react';

/* ---------- Types ---------- */

type Status =
  | 'REGISTERED_VERIFIED'
  | 'HISTORY_UNKNOWN'
  | 'NOT_REGISTERED'
  | 'STOLEN';

type Role = 'guest' | 'owner' | 'insurer' | 'admin';

interface PassportActionsProps {
  registryId: string;
  status: Status;
  mode?: 'public' | 'private';
  role?: Role;
}

/* ---------- Status accent ---------- */

function getAccentStyle(status: Status): React.CSSProperties {
  switch (status) {
    case 'REGISTERED_VERIFIED':
      return { borderColor: '#16a34a', backgroundColor: '#ecfdf5' };
    case 'HISTORY_UNKNOWN':
      return { borderColor: '#f59e0b', backgroundColor: '#fffbeb' };
    case 'STOLEN':
      return { borderColor: '#dc2626', backgroundColor: '#fef2f2' };
    default:
      return { borderColor: '#9ca3af', backgroundColor: '#f9fafb' };
  }
}

/* ---------- Component ---------- */

export default function PassportActions({
  registryId,
  status,
  mode = 'public',
  role = 'guest',
}: PassportActionsProps) {
  const accentStyle = getAccentStyle(status);

  const isOwner = role === 'owner';
  const isInsurer = role === 'insurer';
  const isAdmin = role === 'admin';

  /* ---- Role-aware labels ---- */

  const verificationTitle =
    isAdmin
      ? 'Start registry verification'
      : isInsurer
      ? 'Initiate insurance verification'
      : 'Request ownership verification';

  const downloadTitle =
    isAdmin
      ? 'Export registry document'
      : 'Download equipment passport';

  return (
    <section style={styles.section}>
      <h3 style={styles.title}>Available actions</h3>

      <div style={styles.grid}>
        {/* ---------------- PUBLIC ---------------- */}
        {mode === 'public' && (
          <>
            {status === 'NOT_REGISTERED' && (
              <ActionCard
                href={`/action?type=register&registryId=${registryId}`}
                title="Register this machine"
                text="Start the official registration process."
                accentStyle={accentStyle}
              />
            )}

            {(status === 'HISTORY_UNKNOWN' ||
              status === 'REGISTERED_VERIFIED') && (
              <ActionCard
                href={`/action?type=verify&registryId=${registryId}`}
                title="Request verification"
                text="Request validation of ownership or origin."
                accentStyle={accentStyle}
              />
            )}

            {status === 'STOLEN' && (
              <ActionCard
                href={`/action?type=report&registryId=${registryId}`}
                title="Report a sighting"
                text="Report stolen or suspicious equipment."
                accentStyle={accentStyle}
              />
            )}

            <ActionCard
              href={`/action?type=passport&registryId=${registryId}`}
              title="About this passport"
              text="Learn how registry passports work."
              accentStyle={accentStyle}
            />
          </>
        )}

        {/* ---------------- PRIVATE ---------------- */}
        {mode === 'private' && role !== 'guest' && (
          <>
            {/* View passport */}
            <ActionCard
              href={`/dashboard/passport/${registryId}`}
              title="View full passport"
              text="Access the complete internal record."
              accentStyle={accentStyle}
            />

            {/* Verify */}
            {(status === 'HISTORY_UNKNOWN' ||
              status === 'REGISTERED_VERIFIED') && (
              <ActionCard
                href={`/action?type=verify&registryId=${registryId}`}
                title={verificationTitle}
                text="Initiate a validation process."
                accentStyle={accentStyle}
              />
            )}

            {/* Register (owner only) */}
            {isOwner && status === 'NOT_REGISTERED' && (
              <ActionCard
                href={`/action?type=register&registryId=${registryId}`}
                title="Register this machine"
                text="Create a registry record for this machine."
                accentStyle={accentStyle}
              />
            )}

            {/* Download / Export */}
            {(isOwner || isAdmin) && (
              <ActionCard
                href={`/action?type=passport&registryId=${registryId}`}
                title={downloadTitle}
                text="Download or print the official document."
                accentStyle={accentStyle}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Action card ---------- */

function ActionCard({
  href,
  title,
  text,
  accentStyle,
}: {
  href: string;
  title: string;
  text: string;
  accentStyle: React.CSSProperties;
}) {
  return (
    <Link href={href} style={{ ...styles.card, ...accentStyle }}>
      <strong style={styles.cardTitle}>{title}</strong>
      <span style={styles.cardText}>{text}</span>
    </Link>
  );
}

/* ---------- Styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  card: {
    border: '1px solid',
    borderRadius: 10,
    padding: 16,
    textDecoration: 'none',
    color: '#111827',
    background: '#ffffff',
  },
  cardTitle: {
    display: 'block',
    fontSize: 14,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: '#4b5563',
  },
};
