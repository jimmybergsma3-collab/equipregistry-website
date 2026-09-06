import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectPreferredLanguage } from "@/lib/i18n/locale-detection";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  const lang = detectPreferredLanguage(acceptLanguage);

  redirect(`/${lang}`);
}
