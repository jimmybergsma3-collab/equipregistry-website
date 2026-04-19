import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import PageHero from "@/components/page-hero";
import AuthoritiesClient from "@/app/[lang]/action/authorities/AuthoritiesClient";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";
import { getPublicAuthoritiesText } from "@/lib/i18n/public-authorities";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{
    registryId?: string;
    caseId?: string;
  }>;
};

export default async function ContactAuthoritiesRedirect({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const text = getPublicAuthoritiesText(safeLang);
  const dir = getLangDir(safeLang);
  const query = searchParams ? await searchParams : {};
  const registryId = query?.registryId?.trim() || undefined;
  const caseId = query?.caseId?.trim() || "";

  return (
    <>
      <SiteHeader lang={safeLang} />

      <main dir={dir} className="min-h-screen bg-white">
        <PageHero title={text.title} subtitle={text.intro} />

        <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-900">
            {text.note}
          </div>

          <AuthoritiesClient
            lang={safeLang}
            registryId={registryId}
            caseId={caseId}
          />
        </section>
      </main>

      <SiteFooter lang={safeLang} />
    </>
  );
}
