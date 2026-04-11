import { notFound, redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/require-admin-session";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function AdminDashboardIndexPage({ params }: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  await requireAdminSession(lang);

  redirect(`/${lang}/dashboard/admin/registrations`);
}
