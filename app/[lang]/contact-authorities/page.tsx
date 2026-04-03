import { redirect } from "next/navigation";

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
  const query = searchParams ? await searchParams : {};

  const registryId = query?.registryId || "";
  const caseId = query?.caseId || "";

  redirect(
    `/${lang}/report-sighting?registryId=${registryId}&caseId=${caseId}`
  );
}