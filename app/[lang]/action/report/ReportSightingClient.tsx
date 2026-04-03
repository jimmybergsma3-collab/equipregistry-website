'use client';

import { useState } from 'react';

type Props = {
  registryId?: string;
};

export default function ReportSightingClient({ registryId }: Props) {
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>Submit sighting report</h3>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          {registryId && (
            <div style={styles.infoBox}>
              <strong>Registry ID:</strong> {registryId}
            </div>
          )}

          <div>
            <label style={styles.label}>Approximate location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, area or nearest location"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe what you saw"
              rows={5}
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit report
          </button>
        </form>
      ) : (
        <div style={styles.success}>
          <strong>Report submitted</strong>
          <p style={{ marginTop: 8, marginBottom: 0 }}>
            Your sighting report has been recorded in this demo flow.
          </p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
  },
  form: {
    display: 'grid',
    gap: 14,
  },
  infoBox: {
    border: '1px solid #e5e7eb',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111827',
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    resize: 'vertical',
  },
  button: {
    display: 'inline-block',
    padding: '12px 18px',
    backgroundColor: '#1f4fd8',
    color: '#ffffff',
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
  },
  success: {
    border: '1px solid #86efac',
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    padding: 16,
    color: '#166534',
    fontSize: 14,
  },
};