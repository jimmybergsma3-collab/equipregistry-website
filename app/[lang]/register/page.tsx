import { notFound, redirect } from "next/navigation";
import PublicRegisterPage from "@/components/register/public-register-page";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang, type Lang } from "@/lib/i18n/config";

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

  const session = await getSession();

  if (session.isAuthenticated) {
    redirect(`/${lang}/dashboard/register`);
  }

  return <PublicRegisterPage lang={lang as Lang} />;
}
