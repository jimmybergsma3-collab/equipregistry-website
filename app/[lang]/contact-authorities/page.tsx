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

  const redirectParams = new URLSearchParams({
    type: "authorities",
  });

  if (query?.registryId) {
    redirectParams.set("registryId", query.registryId);
  }

  if (query?.caseId) {
    redirectParams.set("caseId", query.caseId);
  }

  redirect(`/${lang}/action?${redirectParams.toString()}`);
}
