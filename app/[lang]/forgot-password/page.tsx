import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MAILBOXES } from "@/lib/email/addresses";
import { getForgotPasswordText } from "@/lib/i18n/forgot-password";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function ForgotPasswordPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const text = getForgotPasswordText(safeLang);

  return (
    <>
      <SiteHeader lang={safeLang} />

      <main dir={getLangDir(safeLang)} className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">
              EquipRegistry
            </p>
            <h1 className="mt-3 text-3xl font-bold text-zinc-950">
              {text.title}
            </h1>
            <p className="mt-3 text-base text-zinc-600">{text.subtitle}</p>
            <p className="mt-5 text-sm leading-6 text-zinc-700">
              {text.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${MAILBOXES.support}`}
                className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {text.supportCta}
              </a>
              <Link
                href={`/${safeLang}/contact`}
                className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
              >
                {text.contactCta}
              </Link>
            </div>

            <div className="mt-8">
              <Link
                href={`/${safeLang}/login`}
                className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900"
              >
                {text.backToLogin}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter lang={safeLang} />
    </>
  );
}
