import type { CSSProperties } from "react";
import PassportExportActions from "@/components/passport/passport-export-actions";
import type { Lang } from "@/lib/i18n/config";

type PassportField = {
  label: string;
  value: string;
};

type Props = {
  lang: Lang;
  direction: "ltr" | "rtl";
  alignClassName: string;
  eyebrow: string;
  documentTitle: string;
  publicNote: string;
  passportNumberLabel: string;
  passportNumber: string;
  statusLabel: string;
  statusValue: string;
  statusTone?: "default" | "warning" | "danger";
  verificationSummaryTitle: string;
  verificationSummaryMessage: string;
  verificationSummaryWhy: string;
  verificationPanelTitle: string;
  verificationPanelText: string;
  verificationUrlLabel: string;
  verificationUrl: string;
  qrTitle: string;
  qrText: string;
  qrAlt: string;
  qrImageUrl: string;
  fields: PassportField[];
};

const printStyles: CSSProperties = {
  WebkitPrintColorAdjust: "exact",
  printColorAdjust: "exact",
};

function DetailCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 print:rounded-xl print:p-2.5 print:[break-inside:avoid] print:[page-break-inside:avoid]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 print:text-[10px] print:tracking-[0.14em]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-zinc-900 print:mt-1.5 print:text-[12px] print:leading-4">
        {value}
      </p>
    </div>
  );
}

export default function OfficialPassport({
  lang,
  direction,
  alignClassName,
  eyebrow,
  documentTitle,
  publicNote,
  passportNumberLabel,
  passportNumber,
  statusLabel,
  statusValue,
  statusTone = "default",
  verificationSummaryTitle,
  verificationSummaryMessage,
  verificationSummaryWhy,
  verificationPanelTitle,
  verificationPanelText,
  verificationUrlLabel,
  verificationUrl,
  qrTitle,
  qrText,
  qrAlt,
  qrImageUrl,
  fields,
}: Props) {
  const statusClassName =
    statusTone === "danger"
      ? "border-red-200 bg-red-50 text-red-700"
      : statusTone === "warning"
      ? "border-orange-200 bg-orange-50 text-orange-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <section
      dir={direction}
      style={printStyles}
      className="overflow-hidden rounded-[2rem] border border-zinc-300 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] print:w-full print:max-w-[190mm] print:overflow-visible print:rounded-none print:border-zinc-300 print:shadow-none print:[break-inside:avoid] print:[page-break-inside:avoid]"
    >
      <div className="border-b border-zinc-200 px-6 py-6 sm:px-8 print:px-4 print:py-3">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between print:flex-row print:items-start print:justify-between print:gap-4">
          <div className={`flex flex-col gap-4 print:gap-2 ${alignClassName}`}>
            <div className="flex items-center gap-4 print:gap-3">
              <img
                src="/equipregistry_logo.png"
                alt="EquipRegistry"
                className="h-12 w-auto print:h-10"
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500 print:text-[10px] print:tracking-[0.18em]">
                  {eyebrow}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 print:mt-1 print:text-[24px] print:leading-none">
                  {documentTitle}
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm text-zinc-600 print:max-w-none print:text-[11px] print:leading-4">
              {publicNote}
            </p>
          </div>

          <div className={`min-w-[16rem] print:min-w-[56mm] print:max-w-[56mm] ${alignClassName}`}>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-950 px-5 py-4 text-white print:rounded-xl print:px-3.5 print:py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300 print:text-[10px] print:tracking-[0.14em]">
                {passportNumberLabel}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[0.08em] print:mt-1.5 print:text-[18px]">
                {passportNumber}
              </p>
            </div>

            <div
              className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium print:mt-2 print:px-2.5 print:py-0.5 print:text-[10px] ${statusClassName}`}
            >
              {statusLabel}: {statusValue}
            </div>

            <PassportExportActions lang={lang} />
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_20rem] print:grid-cols-[minmax(0,1.35fr)_56mm] print:gap-4 print:px-4 print:py-3">
        <div className="space-y-6 print:space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 print:gap-2 print:grid-cols-2">
            {fields.map((field) => (
              <DetailCard
                key={`${field.label}:${field.value}`}
                label={field.label}
                value={field.value}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2 print:gap-2">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-5 print:rounded-xl print:p-3 print:[break-inside:avoid] print:[page-break-inside:avoid]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 print:text-[10px] print:tracking-[0.14em]">
                {verificationSummaryTitle}
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-900 print:mt-2 print:text-[12px] print:leading-4">
                {verificationSummaryMessage}
              </p>
              <p className="mt-3 text-sm text-zinc-600 print:mt-2 print:text-[11px] print:leading-4">
                {verificationSummaryWhy}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5 print:rounded-xl print:p-3 print:[break-inside:avoid] print:[page-break-inside:avoid]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 print:text-[10px] print:tracking-[0.14em]">
                {verificationPanelTitle}
              </p>
              <p className="mt-3 text-sm text-zinc-700 print:mt-2 print:text-[11px] print:leading-4">
                {verificationPanelText}
              </p>

              <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 print:mt-3 print:rounded-xl print:p-2.5 print:[break-inside:avoid] print:[page-break-inside:avoid]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 print:text-[10px] print:tracking-[0.14em]">
                  {verificationUrlLabel}
                </p>
                <p className="mt-2 break-all text-sm font-medium text-zinc-900 print:mt-1.5 print:text-[10px] print:leading-4">
                  {verificationUrl}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[1.75rem] bg-zinc-950 p-6 text-white print:rounded-xl print:p-3 print:[break-inside:avoid] print:[page-break-inside:avoid]">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300 print:text-[10px] print:tracking-[0.14em]">
            {qrTitle}
          </p>
          <p className="mt-3 text-sm text-zinc-300 print:mt-2 print:text-[11px] print:leading-4">
            {qrText}
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-white p-4 print:mt-3 print:rounded-xl print:p-2">
            <img
              src={qrImageUrl}
              alt={qrAlt}
              width={240}
              height={240}
              className="mx-auto h-auto w-full max-w-[15rem] print:max-w-[42mm]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 rounded-2xl bg-white/10 p-4 print:mt-3 print:rounded-xl print:p-2.5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300 print:text-[10px] print:tracking-[0.14em]">
              {verificationUrlLabel}
            </p>
            <p className="mt-2 break-all text-sm text-white/90 print:mt-1.5 print:text-[10px] print:leading-4">
              {verificationUrl}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
