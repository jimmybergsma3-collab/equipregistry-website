import { notFound } from "next/navigation";
import { adminPhotos } from "@/lib/asset-photos/service";
import { PHOTO_LABELS } from "@/lib/asset-photos/policy";
import { photoLabels } from "@/lib/i18n/asset-photos";
import { isActiveLaunchLang } from "@/lib/i18n/config";
import { photoAction } from "./actions";

export const dynamic = "force-dynamic";
export default async function PhotoAdmin({ params, searchParams }: { params: Promise<{ lang: string; registrationId: string }>; searchParams: Promise<{ result?: string }> }) {
  const { lang, registrationId } = await params;
  if (!isActiveLaunchLang(lang)) notFound();
  const data = await adminPhotos(registrationId).catch(() => null);
  if (!data) notFound();
  const labels = photoLabels(lang);
  const result = (await searchParams).result;
  const hidden = <><input type="hidden" name="lang" value={lang} /><input type="hidden" name="registrationId" value={registrationId} /></>;
  return <main className="mx-auto max-w-4xl space-y-6 p-5 sm:p-8">
    <header><p className="text-sm text-sky-700">{data.reference}</p><h1 className="mt-2 text-3xl font-semibold">Asset photo publication</h1><p className="mt-3 text-zinc-600">Separate photo review. Registration approval and passport issuance are unaffected. Local synthetic storage only.</p></header>
    {result ? <p role="status" className="rounded-xl bg-sky-50 p-4">{result === "saved" ? "Decision saved." : "Photo unavailable. Check eligibility, permission and the exact prepared variant."}</p> : null}
    <form action={photoAction} className="grid gap-4 rounded-2xl border p-5">
      {hidden}<input type="hidden" name="action" value="prepare" />
      <h2 className="text-xl font-semibold">1. Prepare a photo</h2>
      <label className="grid gap-2">Existing eligible image<select name="fileId" required className="min-w-0 rounded border p-2"><option value="">Select an image</option>{data.candidates.map(file => <option key={file.id} value={file.id}>{file.name} ({file.group})</option>)}</select></label>
      {!data.candidates.length ? <p>No proven eligible images. Legacy and private document groups cannot be published.</p> : null}
      <label className="grid gap-2">Public label<select name="label" required className="rounded border p-2">{PHOTO_LABELS.map(label => <option key={label} value={label}>{labels[label]}</option>)}</select></label>
      <label className="grid gap-2">Permission evidence<textarea name="consentEvidence" required minLength={20} maxLength={2000} className="rounded border p-2" placeholder="Record who granted permission, when, by which channel and the private evidence reference for this exact image and registration." /></label>
      <label className="flex items-start gap-2"><input type="checkbox" name="rightsConfirmed" required />I have checked the rights holder’s specific permission for this image. The evidence above is accurate and retained privately.</label>
      <button className="rounded-xl bg-zinc-950 p-3 text-white" disabled={!data.candidates.length}>Prepare private preview</button>
    </form>
    <h2 className="text-xl font-semibold">2. Review the prepared variant</h2>
    <p className="text-sm text-zinc-600">Inspect the entire image. Reject documents, people, personal details, private locations, screens, reflections or plates that require redaction. This version removes embedded metadata; it does not automatically redact visible content.</p>
    <div className="grid gap-5 sm:grid-cols-2">{data.rows.map(row => <article key={row.id} className="min-w-0 space-y-3 rounded-2xl border p-4">
      {/* Direct authenticated preview; no optimizer cache. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api/admin/asset-photos/${row.id}`} alt={labels[row.labelCode]} width={row.variantWidth} height={row.variantHeight} className="h-auto max-h-80 w-full rounded-lg object-contain" />
      <h3 className="font-semibold">{labels[row.labelCode]} · revision {row.revision}</h3><p>{row.publicationStatus}</p>
      <form action={photoAction} className="grid gap-3">{hidden}<input type="hidden" name="mediaId" value={row.id} /><input type="hidden" name="variantHash" value={row.variantSha256} />
        {row.publicationStatus === "pending_review" ? <><label className="flex items-start gap-2"><input type="checkbox" name="privacyConfirmed" />I inspected this exact variant. It is an appropriate asset photo, permission is verified and no private content remains.</label><div className="flex gap-3"><button name="action" value="publish" className="rounded-lg bg-sky-700 px-4 py-2 text-white">Publish</button><button name="action" value="reject" className="rounded-lg border px-4 py-2">Reject</button></div></> : null}
        {row.publicationStatus === "published" ? <button name="action" value="revoke" className="rounded-lg border border-red-300 px-4 py-2 text-red-800">Revoke public access</button> : null}
      </form>
    </article>)}</div>
  </main>;
}
