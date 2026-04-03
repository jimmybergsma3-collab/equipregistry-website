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

function maskSerial(serial: string | null) {
  if (!serial) return "Not available";

  if (serial.length <= 6) {
    return `${serial.slice(0, 2)}***`;
  }

  return `${serial.slice(0, 4)}*****${serial.slice(-2)}`;
}

export default async function PassportPage({ params }: Props) {
  const { lang, registryId } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const request = await prisma.registrationRequest.findFirst({
    where: {
      reference: registryId,
    },
    select: {
      reference: true,
      requestStatus: true,
      assetName: true,
      category: true,
      subcategory: true,
      brand: true,
      model: true,
      serialNumber: true,
      year: true,
      country: true,
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

            <p className="mt-3 text-sm text-zinc-600">
              Public passport view — limited asset data visible without login.
            </p>

            <div className="mt-4 inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              Status: {request.requestStatus}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Asset Name</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.assetName || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Category</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.category || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Subcategory</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.subcategory || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Brand</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.brand || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Model</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.model || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Year</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.year || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Country</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {request.country || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Serial Number</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {maskSerial(request.serialNumber)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}