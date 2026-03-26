// app/[lang]/dashboard/register/page.tsx

import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RegistrationFormStep1 from "@/components/registry/registration-form-step1";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function RegisterPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              EquipRegistry
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Register asset
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              A registration can only proceed once all required fields and
              supporting documents are complete. Retail users must pay before
              submission, while approved partners can submit directly under
              invoicing terms.
            </p>
          </div>

          <RegistrationFormStep1 />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}// app/[lang]/dashboard/register/page.tsx

import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RegistrationFormStep1 from "@/components/registry/registration-form-step1";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function RegisterPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              EquipRegistry
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              Register asset
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-zinc-600">
              A registration can only proceed once all required fields and
              supporting documents are complete. Retail users must pay before
              submission, while approved partners can submit directly under
              invoicing terms.
            </p>
          </div>

          <RegistrationFormStep1 />
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}