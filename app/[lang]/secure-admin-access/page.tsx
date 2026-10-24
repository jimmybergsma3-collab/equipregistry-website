// app/[lang]/secure-admin-access/page.tsx

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { isValidLang } from "@/lib/i18n/config";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AdminLoginForm from "@/components/auth/admin-login-form";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export const metadata: Metadata = {
  title: "Admin Access | EquipRegistry",
  robots: {
    index: false,
    follow: false,
  },
};

const TEXT = {
  en: {
    title: "Admin access",
    subtitle: "This page is intended only for internal admin access.",
  },
  nl: {
    title: "Admin toegang",
    subtitle: "Deze pagina is alleen bedoeld voor interne beheerstoegang.",
  },
} as const;

export default async function SecureAdminAccessPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const user = await getCurrentUser();

  if (user?.role === "admin") {
    redirect(`/${lang}/admin`);
  }

  const text = lang === "nl" ? TEXT.nl : TEXT.en;

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-[70vh] bg-white">
        <section className="mx-auto max-w-md px-6 py-16">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
              EquipRegistry
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
              {text.title}
            </h1>
            <p className="mt-3 text-sm text-neutral-600">
              {text.subtitle}
            </p>
          </div>

          <AdminLoginForm lang={lang} />
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
