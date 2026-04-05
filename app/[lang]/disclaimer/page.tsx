import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getLangDir, isValidLang } from "@/lib/i18n/config";
import { disclaimerContent } from "@/lib/legal/disclaimer";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

const CONTACT = {
  owner: "Jimmy Bergsma",
  addressLine1: "Calle Murcia 111",
  addressLine2: "03420 Castalla",
  addressLine3: "Alicante, Spain",
  taxId: "Y8875740P",
  email: "info@equipregistry.com",
};

function Section({
  title,
  body,
}: {
  title: string;
  body: string[];
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#374151]">
        {body.map((paragraph, index) => (
          <p key={`${title}-${index}`}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const content = disclaimerContent[lang];
  const dir = getLangDir(lang);

  return (
    <div className="min-h-screen bg-[#f8fafc]" dir={dir}>
      <SiteHeader lang={lang} />

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center text-sm font-medium text-[#1d4ed8] hover:underline"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            {content.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b5563]">
            {content.intro}
          </p>

          <div className="mt-6 rounded-2xl bg-[#f8fafc] p-4 text-sm text-[#374151]">
            <p className="font-semibold text-[#111827]">
              {content.operatorTitle}
            </p>
            <p>{CONTACT.owner}</p>
            <p>{CONTACT.addressLine1}</p>
            <p>{CONTACT.addressLine2}</p>
            <p>{CONTACT.addressLine3}</p>
            <p>{CONTACT.taxId}</p>
            <p>{CONTACT.email}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <Section
            title={content.sections.general.title}
            body={content.sections.general.body}
          />

          <Section
            title={content.sections.noGuarantee.title}
            body={content.sections.noGuarantee.body}
          />

          <Section
            title={content.sections.userResponsibility.title}
            body={content.sections.userResponsibility.body}
          />

          <Section
            title={content.sections.thirdParties.title}
            body={content.sections.thirdParties.body}
          />

          <Section
            title={content.sections.stolenReports.title}
            body={content.sections.stolenReports.body}
          />

          <Section
            title={content.sections.availability.title}
            body={content.sections.availability.body}
          />

          <Section
            title={content.sections.futureServices.title}
            body={content.sections.futureServices.body}
          />

          <Section
            title={content.sections.liability.title}
            body={content.sections.liability.body}
          />

          <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#111827]">
              {content.sections.contact.title}
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-[#374151]">
              {content.sections.contact.body.map((paragraph, index) => (
                <p key={`contact-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-4 grid gap-3 rounded-2xl bg-[#f8fafc] p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-semibold text-[#111827]">Responsible person</p>
                <p>{CONTACT.owner}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">Email</p>
                <p>{CONTACT.email}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">Address</p>
                <p>{CONTACT.addressLine1}</p>
                <p>{CONTACT.addressLine2}</p>
                <p>{CONTACT.addressLine3}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">Tax / ID number</p>
                <p>{CONTACT.taxId}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm leading-7 text-[#374151]">{content.closing}</p>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}