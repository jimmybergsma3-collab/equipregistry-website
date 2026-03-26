import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RegisterPageClient from "@/components/register/register-page-client";
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

      <main className="max-w-3xl mx-auto py-20 px-6">
        <RegisterPageClient lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}