import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getLangDir, isValidLang } from "@/lib/i18n/config";
import { getLegalUiText } from "@/lib/i18n/legal-ui";
import { getPrivacyText, PRIVACY_CONTACT } from "@/lib/legal/privacy";

type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-[#374151]">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const t = getPrivacyText(lang);
  const legalUi = getLegalUiText(lang);
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
            {"<-"} {legalUi.back}
          </Link>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-medium text-[#1d4ed8]">{t.lastUpdated}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4b5563]">
            {t.subtitle}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <Section title={t.sections.whoWeAre}>
            <p>{t.whoWeAre.intro}</p>
            <p className="font-medium">{t.whoWeAre.controller}</p>
            <div className="rounded-2xl bg-[#f8fafc] p-4">
              <p className="font-medium">{PRIVACY_CONTACT.owner}</p>
              <p>{PRIVACY_CONTACT.addressLine1}</p>
              <p>{PRIVACY_CONTACT.addressLine2}</p>
              <p>{PRIVACY_CONTACT.addressLine3}</p>
              <p>{PRIVACY_CONTACT.taxId}</p>
              <p>{PRIVACY_CONTACT.email}</p>
            </div>
          </Section>

          <Section title={t.sections.dataWeCollect}>
            <p>{t.dataWeCollect.intro}</p>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.dataWeCollect.personalTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.dataWeCollect.personalItems} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.dataWeCollect.accountTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.dataWeCollect.accountItems} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.dataWeCollect.assetTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.dataWeCollect.assetItems} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.dataWeCollect.technicalTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.dataWeCollect.technicalItems} />
              </div>
            </div>
          </Section>

          <Section title={t.sections.howWeUseData}>
            <p>{t.howWeUseData.intro}</p>
            <BulletList items={t.howWeUseData.items} />
          </Section>

          <Section title={t.sections.publicPrivate}>
            <p>{t.publicPrivate.intro}</p>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.publicPrivate.publicTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.publicPrivate.publicItems} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#111827]">
                {t.publicPrivate.privateTitle}
              </h3>
              <div className="mt-2">
                <BulletList items={t.publicPrivate.privateItems} />
              </div>
            </div>

            <p>{t.publicPrivate.note}</p>
          </Section>

          <Section title={t.sections.legalBasis}>
            <p>{t.legalBasis.intro}</p>
            <BulletList items={t.legalBasis.items} />
          </Section>

          <Section title={t.sections.sharing}>
            <p>{t.sharing.intro}</p>
            <BulletList items={t.sharing.items} />
            <p>{t.sharing.note}</p>
          </Section>

          <Section title={t.sections.payments}>
            <p>{t.payments.intro}</p>
            <BulletList items={t.payments.items} />
          </Section>

          <Section title={t.sections.retention}>
            <p>{t.retention.intro}</p>
            <BulletList items={t.retention.items} />
          </Section>

          <Section title={t.sections.security}>
            <p>{t.security.intro}</p>
            <BulletList items={t.security.items} />
            <p>{t.security.note}</p>
          </Section>

          <Section title={t.sections.rights}>
            <p>{t.rights.intro}</p>
            <BulletList items={t.rights.items} />
            <p>{t.rights.note}</p>
          </Section>

          <Section title={t.sections.cookies}>
            <p>{t.cookies.intro}</p>
            <BulletList items={t.cookies.items} />
          </Section>

          <Section title={t.sections.transfers}>
            <p>{t.transfers.intro}</p>
          </Section>

          <Section title={t.sections.futureFeatures}>
            <p>{t.futureFeatures.intro}</p>
            <BulletList items={t.futureFeatures.items} />
          </Section>

          <Section title={t.sections.changes}>
            <p>{t.changes.intro}</p>
          </Section>

          <Section title={t.sections.contact}>
            <p>{t.contact.intro}</p>

            <div className="grid gap-3 rounded-2xl bg-[#f8fafc] p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-semibold text-[#111827]">
                  {t.contact.ownerLabel}
                </p>
                <p>{PRIVACY_CONTACT.owner}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">
                  {t.contact.emailLabel}
                </p>
                <p>{PRIVACY_CONTACT.email}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">
                  {t.contact.addressLabel}
                </p>
                <p>{PRIVACY_CONTACT.addressLine1}</p>
                <p>{PRIVACY_CONTACT.addressLine2}</p>
                <p>{PRIVACY_CONTACT.addressLine3}</p>
              </div>

              <div>
                <p className="font-semibold text-[#111827]">
                  {t.contact.taxLabel}
                </p>
                <p>{PRIVACY_CONTACT.taxId}</p>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
