// components/registry/manual-payment-panel.tsx

import {
  MANUAL_PAYMENT_DETAILS,
  getManualPaymentText,
} from "@/lib/registry/payment";

type Props = {
  passportNumber: string;
  lang: string;
};

export default function ManualPaymentPanel({
  passportNumber,
  lang,
}: Props) {
  const text = getManualPaymentText(lang);

  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
          {text.paymentPendingLabel}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-zinc-900">
          {text.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-700">
          {text.introText}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.accountHolderLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            {MANUAL_PAYMENT_DETAILS.accountHolder}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.ibanLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            {MANUAL_PAYMENT_DETAILS.iban}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.bicLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            {MANUAL_PAYMENT_DETAILS.bic}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.currencyLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            {MANUAL_PAYMENT_DETAILS.currency}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.referenceLabel}
          </p>
          <p className="mt-1 text-base font-semibold text-zinc-900">
            {passportNumber}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {text.referenceHelpText}
          </p>
        </div>

        <div className="rounded-2xl border border-white/70 bg-white p-4 sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            {text.feeLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-900">
            {text.registrationFeeText}
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            {text.processingText}
          </p>
        </div>
      </div>
    </section>
  );
}