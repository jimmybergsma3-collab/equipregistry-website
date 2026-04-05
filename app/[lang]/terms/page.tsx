import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { TERMS_CONTENT } from "@/lib/legal/terms";
import { getLangDir, isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const safeLang = lang as Lang;
  const content = TERMS_CONTENT[safeLang];
  const dir = getLangDir(safeLang);

  return (
    <>
      <SiteHeader lang={safeLang} />

      <main dir={dir} className="min-h-screen bg-[#f7f7f9] text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
          <a
            href={`/${safeLang}`}
            className="mb-4 inline-block text-sm text-slate-500 hover:text-slate-800"
          >
            ← Back
          </a>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-tight">
              {content.pageTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {content.intro}
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">
                {content.companyTitle}
              </h2>

              <div className="space-y-1 text-sm text-slate-700">
                {content.companyLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {content.sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h2>

                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph, index) => (
                    <p
                      key={`${section.title}-${index}`}
                      className="text-sm leading-7 text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-500">{content.lastUpdated}</p>
        </div>
      </main>

      <SiteFooter lang={safeLang} />
    </>
  );
}