"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { isRTL, type Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
  registryId?: string;
  caseId?: string;
};

type ReportText = {
  title: string;
  registryId: string;
  locationLabel: string;
  locationPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  submit: string;
  submittedTitle: string;
  submittedText: string;
};

type UnavailableText = {
  title: string;
  description: string;
  submit: string;
  caseId: string;
  registryMissing: string;
};

const TEXT: Record<Lang, ReportText> = {
  en: {
    title: "Submit sighting report",
    registryId: "Registry ID",
    locationLabel: "Approximate location",
    locationPlaceholder: "City, area or nearest location",
    notesLabel: "Notes",
    notesPlaceholder: "Describe what you saw",
    submit: "Submit report",
    submittedTitle: "Report submitted",
    submittedText: "Your sighting report has been recorded in this demo flow.",
  },
  es: {
    title: "Enviar aviso de avistamiento",
    registryId: "ID de registro",
    locationLabel: "Ubicacion aproximada",
    locationPlaceholder: "Ciudad, zona o ubicacion mas cercana",
    notesLabel: "Notas",
    notesPlaceholder: "Describe lo que viste",
    submit: "Enviar aviso",
    submittedTitle: "Aviso enviado",
    submittedText: "Tu aviso ha sido registrado en este flujo de demostracion.",
  },
  de: {
    title: "Sichtungsmeldung senden",
    registryId: "Register-ID",
    locationLabel: "Ungefaehre Position",
    locationPlaceholder: "Stadt, Gebiet oder naechstgelegener Ort",
    notesLabel: "Notizen",
    notesPlaceholder: "Beschreiben Sie, was Sie gesehen haben",
    submit: "Meldung senden",
    submittedTitle: "Meldung gesendet",
    submittedText: "Ihre Sichtungsmeldung wurde in diesem Demo-Ablauf erfasst.",
  },
  fr: {
    title: "Envoyer un signalement",
    registryId: "ID d'enregistrement",
    locationLabel: "Lieu approximatif",
    locationPlaceholder: "Ville, zone ou lieu le plus proche",
    notesLabel: "Notes",
    notesPlaceholder: "Decrivez ce que vous avez vu",
    submit: "Envoyer le signalement",
    submittedTitle: "Signalement envoye",
    submittedText: "Votre signalement a ete enregistre dans ce flux de demonstration.",
  },
  it: {
    title: "Invia segnalazione avvistamento",
    registryId: "ID registro",
    locationLabel: "Posizione approssimativa",
    locationPlaceholder: "Citta, zona o localita piu vicina",
    notesLabel: "Note",
    notesPlaceholder: "Descrivi cio che hai visto",
    submit: "Invia segnalazione",
    submittedTitle: "Segnalazione inviata",
    submittedText: "La tua segnalazione e stata registrata in questo flusso demo.",
  },
  nl: {
    title: "Waarneming doorgeven",
    registryId: "Registratie-ID",
    locationLabel: "Geschatte locatie",
    locationPlaceholder: "Stad, gebied of dichtstbijzijnde locatie",
    notesLabel: "Notities",
    notesPlaceholder: "Beschrijf wat je hebt gezien",
    submit: "Melding verzenden",
    submittedTitle: "Melding verzonden",
    submittedText: "Je waarneming is vastgelegd in deze demo-flow.",
  },
  pt: {
    title: "Enviar avistamento",
    registryId: "ID de registo",
    locationLabel: "Localizacao aproximada",
    locationPlaceholder: "Cidade, area ou localizacao mais proxima",
    notesLabel: "Notas",
    notesPlaceholder: "Descreva o que viu",
    submit: "Enviar relatorio",
    submittedTitle: "Relatorio enviado",
    submittedText: "O seu relatorio foi registado neste fluxo de demonstracao.",
  },
  pl: {
    title: "Przeslij zgloszenie obserwacji",
    registryId: "ID rejestru",
    locationLabel: "Przyblizona lokalizacja",
    locationPlaceholder: "Miasto, obszar lub najblizsza lokalizacja",
    notesLabel: "Notatki",
    notesPlaceholder: "Opisz, co widziales",
    submit: "Przeslij zgloszenie",
    submittedTitle: "Zgloszenie przeslane",
    submittedText: "Twoje zgloszenie obserwacji zostalo zapisane w tym przeplywie demonstracyjnym.",
  },
  sv: {
    title: "Skicka observationsrapport",
    registryId: "Register-ID",
    locationLabel: "Ungefarlig plats",
    locationPlaceholder: "Stad, omrade eller narmaste plats",
    notesLabel: "Anteckningar",
    notesPlaceholder: "Beskriv vad du sag",
    submit: "Skicka rapport",
    submittedTitle: "Rapport skickad",
    submittedText: "Din observationsrapport har registrerats i detta demo-flode.",
  },
  da: {
    title: "Indsend observationsrapport",
    registryId: "Register-ID",
    locationLabel: "Omtrentligt sted",
    locationPlaceholder: "By, omraade eller naermeste sted",
    notesLabel: "Noter",
    notesPlaceholder: "Beskriv, hvad du sa",
    submit: "Indsend rapport",
    submittedTitle: "Rapport indsendt",
    submittedText: "Din observationsrapport er blevet registreret i dette demo-flow.",
  },
  no: {
    title: "Send observasjonsrapport",
    registryId: "Register-ID",
    locationLabel: "Omtrentlig sted",
    locationPlaceholder: "By, omrade eller naermeste sted",
    notesLabel: "Notater",
    notesPlaceholder: "Beskriv hva du sa",
    submit: "Send rapport",
    submittedTitle: "Rapport sendt",
    submittedText: "Observasjonsrapporten din er registrert i denne demo-flyten.",
  },
  ru: {
    title: "Отправить сообщение о замеченном объекте",
    registryId: "ID реестра",
    locationLabel: "Примерное местоположение",
    locationPlaceholder: "Город, район или ближайшее место",
    notesLabel: "Примечания",
    notesPlaceholder: "Опишите, что вы увидели",
    submit: "Отправить сообщение",
    submittedTitle: "Сообщение отправлено",
    submittedText: "Ваше сообщение сохранено в этом демонстрационном сценарии.",
  },
  zh: {
    title: "提交目击报告",
    registryId: "登记编号",
    locationLabel: "大致位置",
    locationPlaceholder: "城市、区域或最近地点",
    notesLabel: "备注",
    notesPlaceholder: "请描述你所看到的情况",
    submit: "提交报告",
    submittedTitle: "报告已提交",
    submittedText: "你的目击报告已记录到此演示流程中。",
  },
  hi: {
    title: "देखे जाने की रिपोर्ट भेजें",
    registryId: "रजिस्ट्री आईडी",
    locationLabel: "अनुमानित स्थान",
    locationPlaceholder: "शहर, क्षेत्र या निकटतम स्थान",
    notesLabel: "नोट्स",
    notesPlaceholder: "जो आपने देखा उसका वर्णन करें",
    submit: "रिपोर्ट भेजें",
    submittedTitle: "रिपोर्ट भेज दी गई",
    submittedText: "आपकी रिपोर्ट इस डेमो फ्लो में दर्ज कर ली गई है।",
  },
  ar: {
    title: "إرسال بلاغ مشاهدة",
    registryId: "معرّف السجل",
    locationLabel: "الموقع التقريبي",
    locationPlaceholder: "المدينة أو المنطقة أو أقرب موقع",
    notesLabel: "ملاحظات",
    notesPlaceholder: "اشرح ما الذي شاهدته",
    submit: "إرسال البلاغ",
    submittedTitle: "تم إرسال البلاغ",
    submittedText: "تم تسجيل بلاغ المشاهدة في هذا المسار التجريبي.",
  },
};

const UNAVAILABLE_TEXT: Record<Lang, UnavailableText> = {
  en: {
    title: "Reporting unavailable",
    description:
      "Sighting reporting is currently unavailable. Contact the relevant authorities directly.",
    submit: "Reporting unavailable",
    caseId: "Case ID",
    registryMissing: "Registry ID missing. This report cannot be submitted.",
  },
  es: {
    title: "Reporte no disponible",
    description:
      "El reporte de avistamientos no esta disponible en este momento. Contacte directamente con las autoridades competentes.",
    submit: "Reporte no disponible",
    caseId: "ID del caso",
    registryMissing:
      "Falta el ID de registro. Este reporte no se puede enviar.",
  },
  de: {
    title: "Meldung nicht verfuegbar",
    description:
      "Sichtungsmeldungen sind derzeit nicht verfuegbar. Kontaktieren Sie die zustaendigen Behoerden direkt.",
    submit: "Meldung nicht verfuegbar",
    caseId: "Fall-ID",
    registryMissing:
      "Register-ID fehlt. Diese Meldung kann nicht gesendet werden.",
  },
  fr: {
    title: "Signalement indisponible",
    description:
      "Le signalement d'observation n'est pas disponible pour le moment. Contactez directement les autorites competentes.",
    submit: "Signalement indisponible",
    caseId: "ID du dossier",
    registryMissing:
      "L'ID d'enregistrement manque. Ce signalement ne peut pas etre envoye.",
  },
  it: {
    title: "Segnalazione non disponibile",
    description:
      "La segnalazione di avvistamento non e disponibile in questo momento. Contatti direttamente le autorita competenti.",
    submit: "Segnalazione non disponibile",
    caseId: "ID caso",
    registryMissing:
      "Manca l'ID registro. Questa segnalazione non puo essere inviata.",
  },
  nl: {
    title: "Melden niet beschikbaar",
    description:
      "Het melden van waarnemingen is momenteel niet beschikbaar. Neem rechtstreeks contact op met de bevoegde autoriteiten.",
    submit: "Melden niet beschikbaar",
    caseId: "Zaak-ID",
    registryMissing:
      "Registratie-ID ontbreekt. Deze melding kan niet worden verzonden.",
  },
  pt: {
    title: "Reporte indisponivel",
    description:
      "O reporte de avistamentos nao esta disponivel neste momento. Contacte diretamente as autoridades competentes.",
    submit: "Reporte indisponivel",
    caseId: "ID do caso",
    registryMissing:
      "Falta o ID do registo. Este reporte nao pode ser enviado.",
  },
  pl: {
    title: "Zgloszenie niedostepne",
    description:
      "Zgloszenia obserwacji sa obecnie niedostepne. Skontaktuj sie bezposrednio z odpowiednimi sluzbami.",
    submit: "Zgloszenie niedostepne",
    caseId: "ID sprawy",
    registryMissing:
      "Brakuje ID rejestru. Tego zgloszenia nie mozna wyslac.",
  },
  sv: {
    title: "Rapportering ej tillganglig",
    description:
      "Rapportering av observationer ar inte tillganglig just nu. Kontakta relevanta myndigheter direkt.",
    submit: "Rapportering ej tillganglig",
    caseId: "Arende-ID",
    registryMissing:
      "Register-ID saknas. Denna rapport kan inte skickas.",
  },
  da: {
    title: "Rapportering utilgaengelig",
    description:
      "Observationsrapportering er ikke tilgaengelig lige nu. Kontakt de relevante myndigheder direkte.",
    submit: "Rapportering utilgaengelig",
    caseId: "Sags-ID",
    registryMissing:
      "Register-ID mangler. Denne rapport kan ikke sendes.",
  },
  no: {
    title: "Rapportering utilgjengelig",
    description:
      "Observasjonsrapportering er ikke tilgjengelig akkurat na. Kontakt relevante myndigheter direkte.",
    submit: "Rapportering utilgjengelig",
    caseId: "Saks-ID",
    registryMissing:
      "Register-ID mangler. Denne rapporten kan ikke sendes.",
  },
  ru: {
    title: "Отчет недоступен",
    description:
      "Сообщения о наблюдении временно недоступны. Свяжитесь с компетентными органами напрямую.",
    submit: "Отчет недоступен",
    caseId: "ID дела",
    registryMissing:
      "Отсутствует ID реестра. Этот отчет нельзя отправить.",
  },
  zh: {
    title: "报告暂不可用",
    description:
      "目前无法提交目击报告。请直接联系相关执法机构。",
    submit: "报告暂不可用",
    caseId: "案件编号",
    registryMissing:
      "缺少登记编号。无法提交此报告。",
  },
  hi: {
    title: "रिपोर्टिंग उपलब्ध नहीं",
    description:
      "दृश्य रिपोर्टिंग फिलहाल उपलब्ध नहीं है। कृपया सीधे संबंधित अधिकारियों से संपर्क करें।",
    submit: "रिपोर्टिंग उपलब्ध नहीं",
    caseId: "केस आईडी",
    registryMissing:
      "रजिस्ट्री आईडी अनुपस्थित है। यह रिपोर्ट सबमिट नहीं की जा सकती।",
  },
  ar: {
    title: "الإبلاغ غير متاح",
    description:
      "الإبلاغ عن المشاهدات غير متاح حالياً. تواصل مباشرة مع الجهات المختصة.",
    submit: "الإبلاغ غير متاح",
    caseId: "معرّف القضية",
    registryMissing:
      "معرّف السجل غير موجود. لا يمكن إرسال هذا البلاغ.",
  },
};

export default function ReportSightingClient({
  lang,
  registryId,
  caseId,
}: Props) {
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const t = TEXT[lang] ?? TEXT.en;
  const unavailableText = UNAVAILABLE_TEXT[lang] ?? UNAVAILABLE_TEXT.en;
  const rtl = isRTL(lang);
  const reportingUnavailable = true;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (reportingUnavailable) {
      setError(unavailableText.description);
      return;
    }

    if (!registryId) {
      setError(unavailableText.registryMissing);
      return;
    }

    setSubmitting(true);

    const noteParts = [location.trim(), notes.trim()].filter(Boolean);

    try {
      const response = await fetch("/api/sighting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registryId,
          caseId,
          note: noteParts.join("\n"),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Could not submit report.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit report."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        ...styles.wrapper,
        direction: rtl ? "rtl" : "ltr",
        textAlign: rtl ? "right" : "left",
      }}
    >
      <h3 style={styles.title}>{t.title}</h3>
      <div style={styles.warningBox}>
        <strong>{unavailableText.title}</strong>
        <p style={styles.warningText}>{unavailableText.description}</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          {registryId ? (
            <div style={styles.infoBox}>
              <strong>{t.registryId}:</strong> {registryId}
            </div>
          ) : null}

          {caseId ? (
            <div style={styles.infoBox}>
              <strong>{unavailableText.caseId}:</strong> {caseId}
            </div>
          ) : null}

          <div>
            <label style={styles.label}>{t.locationLabel}</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t.locationPlaceholder}
              style={{
                ...styles.input,
                textAlign: rtl ? "right" : "left",
              }}
              disabled={reportingUnavailable || submitting}
            />
          </div>

          <div>
            <label style={styles.label}>{t.notesLabel}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              rows={5}
              style={{
                ...styles.textarea,
                textAlign: rtl ? "right" : "left",
              }}
              disabled={reportingUnavailable || submitting}
            />
          </div>

          <button
            type="submit"
            disabled={reportingUnavailable || submitting}
            style={styles.button}
          >
            {reportingUnavailable
              ? unavailableText.submit
              : submitting
                ? `${t.submit}...`
                : t.submit}
          </button>

          {error ? <p style={styles.error}>{error}</p> : null}
        </form>
      ) : (
        <div style={styles.success}>
          <strong>{t.submittedTitle}</strong>
          <p style={styles.successText}>{t.submittedText}</p>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
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
    display: "grid",
    gap: 14,
  },
  warningBox: {
    border: "1px solid #fcd34d",
    backgroundColor: "#fffbeb",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    color: "#92400e",
    fontSize: 14,
  },
  warningText: {
    marginTop: 8,
    marginBottom: 0,
  },
  infoBox: {
    border: "1px solid #e5e7eb",
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#111827",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    resize: "vertical",
  },
  button: {
    display: "inline-block",
    padding: "12px 18px",
    backgroundColor: "#1f4fd8",
    color: "#ffffff",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
  success: {
    border: "1px solid #86efac",
    backgroundColor: "#f0fdf4",
    borderRadius: 10,
    padding: 16,
    color: "#166534",
    fontSize: 14,
  },
  successText: {
    marginTop: 8,
    marginBottom: 0,
  },
  error: {
    margin: 0,
    color: "#b91c1c",
    fontSize: 13,
  },
};
