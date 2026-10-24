"use client";

import { useState } from "react";

type ContactFormTexts = {
  formTitle: string;
  nameLabel: string;
  emailFieldLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
  sendingButton: string;
  successMessage: string;
  errorMessage: string;
};

type Props = {
  lang: string;
  texts: ContactFormTexts;
};

export default function ContactForm({ lang, texts }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          lang,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error || texts.errorMessage);
      }

      setSuccess(texts.successMessage);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : texts.errorMessage);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{texts.formTitle}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          {texts.nameLabel}
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={texts.namePlaceholder}
            required
            maxLength={120}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          {texts.emailFieldLabel}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={texts.emailPlaceholder}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          {texts.messageLabel}
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={texts.messagePlaceholder}
            required
            minLength={10}
            maxLength={5000}
            rows={7}
            style={styles.textarea}
          />
        </label>

        <button type="submit" disabled={sending} style={styles.button}>
          {sending ? texts.sendingButton : texts.submitButton}
        </button>

        {success ? <p style={styles.success}>{success}</p> : null}
        {error ? <p style={styles.error}>{error}</p> : null}
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    background: "#fff",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "16px",
  },
  label: {
    display: "grid",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
  },
  button: {
    border: "none",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    background: "#111",
    color: "#fff",
  },
  success: {
    color: "#166534",
    fontSize: "14px",
    margin: 0,
  },
  error: {
    color: "#b91c1c",
    fontSize: "14px",
    margin: 0,
  },
};