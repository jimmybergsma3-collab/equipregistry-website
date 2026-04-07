"use client";

import { use, useMemo, useState, type FormEvent } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PageHero from "@/components/page-hero";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

type ContactType = "general" | "business" | "support";
type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactPage({ params }: Props) {
  const { lang } = use(params);

  if (!isValidLang(lang)) {
    notFound();
  }

  const currentLang = lang as Lang;
  const t = getDictionary(currentLang);

  const [contactType, setContactType] = useState<ContactType>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const subjectSuggestion = useMemo(() => {
    if (contactType === "business") return "Insurance partnership / pilot";
    if (contactType === "support") return "Registration or passport support";
    return "";
  }, [contactType]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactType,
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || t.pages.contact.errorMessage);
      }

      setSubmitState("success");
      setSubmitMessage(t.pages.contact.successMessage);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setContactType("general");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error && error.message
          ? error.message
          : t.pages.contact.errorMessage
      );
    }
  }

  return (
    <>
      <SiteHeader lang={currentLang} />

      <PageHero
        title={t.pages.contact.title}
        subtitle={t.pages.contact.subtitle}
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                {t.pages.contact.generalTitle}
              </h2>
              <p className="mb-5 text-sm leading-7 text-slate-700">
                {t.pages.contact.generalText}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {t.pages.contact.emailLabel}:{" "}
                <a
                  href="mailto:info@equipregistry.com"
                  className="underline underline-offset-2 hover:text-slate-700"
                >
                  info@equipregistry.com
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                {t.pages.contact.businessTitle}
              </h2>
              <p className="mb-5 text-sm leading-7 text-slate-700">
                {t.pages.contact.businessText}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {t.pages.contact.emailLabel}:{" "}
                <a
                  href="mailto:business@equipregistry.com"
                  className="underline underline-offset-2 hover:text-slate-700"
                >
                  business@equipregistry.com
                </a>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">
                {t.pages.contact.supportTitle}
              </h2>
              <p className="mb-5 text-sm leading-7 text-slate-700">
                {t.pages.contact.supportText}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {t.pages.contact.emailLabel}:{" "}
                <a
                  href="mailto:support@equipregistry.com"
                  className="underline underline-offset-2 hover:text-slate-700"
                >
                  support@equipregistry.com
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-8">
            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              {t.pages.contact.formTitle}
            </h2>

            <p className="mb-6 text-sm text-slate-600">
              {t.pages.contact.formIntro}
            </p>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-900">
                  {t.pages.contact.typeLabel}
                </span>

                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value as ContactType)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                >
                  <option value="general">{t.pages.contact.typeGeneral}</option>
                  <option value="business">{t.pages.contact.typeBusiness}</option>
                  <option value="support">{t.pages.contact.typeSupport}</option>
                </select>
              </label>

              <input
                type="text"
                placeholder={t.pages.contact.namePlaceholder}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />

              <input
                type="email"
                placeholder={t.pages.contact.emailPlaceholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />

              <input
                type="text"
                placeholder={
                  subjectSuggestion || t.pages.contact.subjectPlaceholder
                }
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />

              <textarea
                placeholder={t.pages.contact.messagePlaceholder}
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
              />

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitState === "submitting"
                  ? t.pages.contact.sendingButton
                  : t.pages.contact.sendButton}
              </button>

              {submitMessage ? (
                <p
                  className={`text-sm ${
                    submitState === "success"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <SiteFooter lang={currentLang} />
    </>
  );
}