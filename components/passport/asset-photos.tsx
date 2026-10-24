import type { PublicPhoto } from "@/lib/asset-photos/policy";
import { photoHeading, photoLabels } from "@/lib/i18n/asset-photos";

export default function AssetPhotos({ photos, lang }: { photos: PublicPhoto[]; lang: string }) {
  if (!photos.length) return null;
  const labels = photoLabels(lang);
  const hero = photos.find(photo => photo.labelCode === "overview");
  return <section aria-label={photoHeading(lang)} className="space-y-4 border-b border-zinc-200 px-6 py-6 sm:px-8 print:space-y-2 print:px-4 print:py-2">
    <h2 className="text-base font-semibold text-zinc-950 print:text-[12px]">{photoHeading(lang)} <span className="font-normal text-zinc-500">({photos.length})</span></h2>
    {hero ? <figure data-photo-hero className="overflow-hidden rounded-2xl bg-zinc-100 print:[break-inside:avoid]">
      {/* Unoptimized, same-origin and no-store so new requests always enforce revocation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={hero.src} alt={labels[hero.labelCode]} width={hero.width} height={hero.height} className="max-h-[28rem] w-full object-contain print:max-h-[24mm]" referrerPolicy="no-referrer" />
    </figure> : null}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 print:grid-cols-4 print:gap-2">{photos.map(photo => <figure key={photo.id} className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 print:[break-inside:avoid]">
      <a href={photo.src} className="block focus-visible:outline-2 focus-visible:outline-sky-700" aria-label={labels[photo.labelCode]}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={labels[photo.labelCode]} width={photo.width} height={photo.height} className="aspect-[4/3] w-full bg-zinc-50 object-contain print:max-h-[10mm]" referrerPolicy="no-referrer" />
      </a><figcaption className="break-words px-3 py-2 text-sm text-zinc-700 print:px-2 print:py-1 print:text-[9px]">{labels[photo.labelCode]}</figcaption>
    </figure>)}</div>
  </section>;
}
