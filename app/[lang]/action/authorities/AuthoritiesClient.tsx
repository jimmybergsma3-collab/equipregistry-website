"use client";

import type { CSSProperties } from "react";
import type { Lang } from "@/lib/i18n/config";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

type Props = {
  lang: Lang;
  registryId?: string;
  caseId: string;
};

type AuthoritiesText = {
  title: string;
  text: string;
  registryId: string;
  caseId: string;
  note: string;
};

const TEXT: Partial<Record<Lang, AuthoritiesText>> = {
  en: {
    title: "Recommended next step",
    text: "Contact the relevant police, customs, or cross-border authority and provide the reference details below when reporting this case.",
    registryId: "Registry ID",
    caseId: "Case ID",
    note: "Keep any supporting information ready, such as location, time, photos, transport details, and any relevant documents.",
  },
  es: {
    title: "Siguiente paso recomendado",
    text: "Contacta con la policía, aduanas o la autoridad transfronteriza competente y facilita los datos de referencia que aparecen abajo al reportar este caso.",
    registryId: "ID de registro",
    caseId: "ID del caso",
    note: "Ten preparada toda la información de apoyo, como ubicación, hora, fotos, datos de transporte y cualquier documento relevante.",
  },
  de: {
    title: "Empfohlener nächster Schritt",
    text: "Kontaktieren Sie die zuständige Polizei, den Zoll oder die grenzüberschreitende Behörde und geben Sie bei der Meldung dieses Falls die unten stehenden Referenzdaten an.",
    registryId: "Register-ID",
    caseId: "Fall-ID",
    note: "Halten Sie unterstützende Informationen bereit, z. B. Ort, Zeit, Fotos, Transportdaten und relevante Dokumente.",
  },
  fr: {
    title: "Étape suivante recommandée",
    text: "Contactez la police, les douanes ou l’autorité transfrontalière compétente et fournissez les références ci-dessous lors du signalement de ce dossier.",
    registryId: "ID d’enregistrement",
    caseId: "ID du dossier",
    note: "Gardez à portée de main toutes les informations utiles, comme le lieu, l’heure, les photos, les détails de transport et tout document pertinent.",
  },
  it: {
    title: "Passaggio successivo consigliato",
    text: "Contatta la polizia, la dogana o l’autorità transfrontaliera competente e fornisci i dati di riferimento riportati sotto quando segnali questo caso.",
    registryId: "ID registro",
    caseId: "ID caso",
    note: "Tieni pronti eventuali dati di supporto, come posizione, orario, foto, dettagli di trasporto e documenti rilevanti.",
  },
  nl: {
    title: "Aanbevolen volgende stap",
    text: "Neem contact op met de relevante politie, douane of grensoverschrijdende autoriteit en geef onderstaande referentiegegevens door wanneer je deze zaak meldt.",
    registryId: "Registratie-ID",
    caseId: "Zaak-ID",
    note: "Houd ondersteunende informatie gereed, zoals locatie, tijdstip, foto’s, transportgegevens en relevante documenten.",
  },
  pt: {
    title: "Próximo passo recomendado",
    text: "Contacte a polícia, as alfândegas ou a autoridade transfronteiriça competente e forneça os dados de referência abaixo ao reportar este caso.",
    registryId: "ID de registo",
    caseId: "ID do caso",
    note: "Tenha pronta qualquer informação de apoio, como localização, hora, fotos, dados de transporte e documentos relevantes.",
  },

  pl: {
    title: "Zalecany kolejny krok",
    text: "Skontaktuj sie z odpowiednia policja, urzedem celnym lub organem transgranicznym i podaj ponizsze dane referencyjne podczas zglaszania tej sprawy.",
    registryId: "ID rejestru",
    caseId: "ID sprawy",
    note: "Przygotuj wszelkie informacje pomocnicze, takie jak lokalizacja, czas, zdjecia, dane transportowe i odpowiednie dokumenty.",
  },
  sv: {
    title: "Rekommenderat nasta steg",
    text: "Kontakta relevant polis, tull eller graensoverskridande myndighet och ange referensuppgifterna nedan nar du rapporterar detta arende.",
    registryId: "Register-ID",
    caseId: "Arende-ID",
    note: "Ha all relevant information redo, till exempel plats, tid, bilder, transportuppgifter och eventuella relevanta dokument.",
  },
  da: {
    title: "Anbefalet naeste skridt",
    text: "Kontakt det relevante politi, toldvaesen eller den graenseoverskridende myndighed, og oplys referenceoplysningerne nedenfor, nar du anmelder denne sag.",
    registryId: "Register-ID",
    caseId: "Sags-ID",
    note: "Hav alle relevante oplysninger klar, saasom sted, tidspunkt, billeder, transportoplysninger og eventuelle relevante dokumenter.",
  },
  no: {
    title: "Anbefalt neste steg",
    text: "Kontakt relevant politi, tollmyndighet eller grenseoverskridende myndighet, og oppgi referanseopplysningene nedenfor nar du rapporterer denne saken.",
    registryId: "Register-ID",
    caseId: "Saks-ID",
    note: "Ha stotteinformasjon klar, for eksempel sted, tidspunkt, bilder, transportdetaljer og relevante dokumenter.",
  },
};

const FALLBACK_TEXT: AuthoritiesText = {
  title: "Recommended next step",
  text: "Contact the relevant police, customs, or cross-border authority and provide the reference details below when reporting this case.",
  registryId: "Registry ID",
  caseId: "Case ID",
  note: "Keep any supporting information ready, such as location, time, photos, transport details, and any relevant documents.",
};

export default function AuthoritiesClient({
  lang,
  registryId,
  caseId,
}: Props) {
  const t = repairMojibakeDeep(TEXT[lang] ?? FALLBACK_TEXT);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{t.title}</h3>

      <p style={styles.text}>{t.text}</p>

      <div style={styles.metaBox}>
        {registryId ? (
          <p style={styles.metaLine}>
            <strong>{t.registryId}:</strong> {registryId}
          </p>
        ) : null}

        <p style={styles.metaLine}>
          <strong>{t.caseId}:</strong> {caseId}
        </p>
      </div>

      <p style={styles.note}>{t.note}</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  card: {
    marginTop: 20,
    marginBottom: 20,
    border: "1px solid #dbeafe",
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: "#1e3a8a",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#1f2937",
    marginBottom: 12,
  },
  metaBox: {
    border: "1px solid #bfdbfe",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  metaLine: {
    fontSize: 14,
    color: "#111827",
    margin: 0,
    marginBottom: 6,
  },
  note: {
    fontSize: 12,
    color: "#475569",
    margin: 0,
    lineHeight: 1.5,
  },
};
