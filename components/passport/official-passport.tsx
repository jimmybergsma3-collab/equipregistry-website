import type { CSSProperties } from "react";

type PassportField = {
  label: string;
  value: string;
};

type Props = {
  direction: "ltr" | "rtl";
  alignClassName: string;
  eyebrow: string;
  documentTitle: string;
  publicNote: string;
  passportNumberLabel: string;
  passportNumber: string;
  statusLabel: string;
  statusValue: string;
  statusTone?: "default" | "danger";
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
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-zinc-900">{value}</p>
    </div>
  );
}

export default function OfficialPassport({
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
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return (
    <section
      dir={direction}
      style={printStyles}
      className="overflow-hidden rounded-[2rem] border border-zinc-300 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)] print:rounded-none print:border-zinc-300 print:shadow-none"
    >
      <div className="border-b border-zinc-200 px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className={`flex flex-col gap-4 ${alignClassName}`}>
            <div className="flex items-center gap-4">
              <img
                src="/equipregistry_logo.png"
                alt="EquipRegistry"
                className="h-12 w-auto"
              />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                  {eyebrow}
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                  {documentTitle}
                </h1>
              </div>
            </div>

            <p className="max-w-2xl text-sm text-zinc-600">{publicNote}</p>
          </div>

          <div className={`min-w-[16rem] ${alignClassName}`}>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-950 px-5 py-4 text-white">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                {passportNumberLabel}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-[0.08em]">
                {passportNumber}
              </p>
            </div>

            <div
              className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusClassName}`}
            >
              {statusLabel}: {statusValue}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_20rem]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <DetailCard
                key={`${field.label}:${field.value}`}
                label={field.label}
                value={field.value}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {verificationSummaryTitle}
              </p>
              <p className="mt-3 text-sm font-medium text-zinc-900">
                {verificationSummaryMessage}
              </p>
              <p className="mt-3 text-sm text-zinc-600">
                {verificationSummaryWhy}
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {verificationPanelTitle}
              </p>
              <p className="mt-3 text-sm text-zinc-700">
                {verificationPanelText}
              </p>

              <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {verificationUrlLabel}
                </p>
                <p className="mt-2 break-all text-sm font-medium text-zinc-900">
                  {verificationUrl}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300">
            {qrTitle}
          </p>
          <p className="mt-3 text-sm text-zinc-300">{qrText}</p>

          <div className="mt-6 rounded-[1.5rem] bg-white p-4">
            <img
              src={qrImageUrl}
              alt={qrAlt}
              width={240}
              height={240}
              className="mx-auto h-auto w-full max-w-[15rem]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 rounded-2xl bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-300">
              {verificationUrlLabel}
            </p>
            <p className="mt-2 break-all text-sm text-white/90">
              {verificationUrl}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
