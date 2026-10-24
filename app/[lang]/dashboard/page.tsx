import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function DashboardPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const session = await getSession();

  if (!session.isAuthenticated) {
    redirect(`/${lang}/login?next=/${lang}/dashboard`);
  }

  if (session.user.role === "admin") {
    redirect(`/${lang}/admin`);
  }

  redirect(`/${lang}/dashboard/registrations`);
}