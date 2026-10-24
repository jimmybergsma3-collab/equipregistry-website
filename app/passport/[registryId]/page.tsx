import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { detectPreferredLanguage } from "@/lib/i18n/locale-detection";

type Props = {
  params: Promise<{
    registryId: string;
  }>;
};

export default async function PassportScanRedirectPage({ params }: Props) {
  const { registryId } = await params;
  const headerList = await headers();
  const lang = detectPreferredLanguage(headerList.get("accept-language"));

  redirect(`/${lang}/passport/${encodeURIComponent(registryId)}`);
}
