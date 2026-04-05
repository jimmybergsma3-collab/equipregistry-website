import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact/contact-form";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <h1 style={styles.title}>{dict.contact.title}</h1>
            <p style={styles.subtitle}>{dict.contact.subtitle}</p>
          </div>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h2 style={styles.company}>EquipRegistry</h2>

              <div style={styles.block}>
                <p style={styles.label}>{dict.contact.addressLabel}</p>
                <p style={styles.text}>
                  Jimmy Bergsma
                  <br />
                  Calle Murcia 111
                  <br />
                  03420 Castalla
                  <br />
                  Alicante, Spain
                </p>
              </div>

              <div style={styles.block}>
                <p style={styles.label}>NIE</p>
                <p style={styles.text}>Y8875740P</p>
              </div>

              <div style={styles.block}>
                <p style={styles.label}>{dict.contact.emailLabel}</p>
                <p style={styles.text}>contact@equipregistry.com</p>
              </div>

              <div style={styles.block}>
                <p style={styles.label}>{dict.contact.legalLabel}</p>
                <p style={styles.text}>
                  {dict.contact.legalLine1}
                  <br />
                  {dict.contact.legalLine2}
                </p>
              </div>
            </div>

            <ContactForm
              lang={lang}
              texts={{
                formTitle: dict.contact.formTitle,
                nameLabel: dict.contact.nameLabel,
                emailFieldLabel: dict.contact.emailFieldLabel,
                messageLabel: dict.contact.messageLabel,
                namePlaceholder: dict.contact.namePlaceholder,
                emailPlaceholder: dict.contact.emailPlaceholder,
                messagePlaceholder: dict.contact.messagePlaceholder,
                submitButton: dict.contact.submitButton,
                sendingButton: dict.contact.sendingButton,
                successMessage: dict.contact.successMessage,
                errorMessage: dict.contact.errorMessage,
              }}
            />
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    padding: "48px 20px 72px",
  },
  container: {
    maxWidth: "1180px",
    margin: "0 auto",
  },
  hero: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "36px",
    lineHeight: 1.1,
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    marginTop: "12px",
    color: "#4b5563",
    fontSize: "17px",
    maxWidth: "760px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    alignItems: "start",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    background: "#fff",
  },
  company: {
    fontSize: "24px",
    fontWeight: 700,
    marginTop: 0,
    marginBottom: "20px",
  },
  block: {
    marginBottom: "18px",
  },
  label: {
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#6b7280",
    marginBottom: "6px",
  },
  text: {
    fontSize: "16px",
    lineHeight: 1.65,
    color: "#111827",
    margin: 0,
  },
};