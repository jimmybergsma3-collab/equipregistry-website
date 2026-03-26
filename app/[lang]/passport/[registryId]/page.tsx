import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { isValidLang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
    registryId: string;
  }>;
};

export default async function PassportPage({ params }: Props) {
  const { lang, registryId } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const request = await prisma.registrationRequest.findFirst({
    where: {
      reference: registryId,
      requestStatus: "passport_issued",
    },
  });

  if (!request) {
    notFound();
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              EquipRegistry Passport
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
              {request.reference}
            </h1>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset Name</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.assetName}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Category</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.category}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Subcategory</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.subcategory}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Brand</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.brand}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Model</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.model}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Serial Number</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">{request.serialNumber}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}