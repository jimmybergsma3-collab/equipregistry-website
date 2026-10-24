"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { decidePhoto, preparePhoto } from "@/lib/asset-photos/service";
import { isActiveLaunchLang } from "@/lib/i18n/config";

export async function photoAction(data: FormData) {
  const lang = String(data.get("lang"));
  const registrationId = String(data.get("registrationId"));
  if (!isActiveLaunchLang(lang) || !/^[a-zA-Z0-9_-]{1,100}$/.test(registrationId)) throw new Error("Photo publication unavailable.");
  let result = "saved";
  try {
    const action = String(data.get("action"));
    if (action === "prepare") await preparePhoto({ registrationId, fileId: String(data.get("fileId")), label: String(data.get("label")), consentEvidence: String(data.get("consentEvidence")), rightsConfirmed: data.get("rightsConfirmed") === "on" });
    else if (action === "publish" || action === "reject" || action === "revoke") await decidePhoto({ registrationId, mediaId: String(data.get("mediaId")), decision: action, reviewedVariantHash: String(data.get("variantHash")), privacyConfirmed: data.get("privacyConfirmed") === "on" });
    else throw new Error("Invalid decision");
  } catch { result = "unavailable"; }
  const location = `/${lang}/admin/asset-photos/${registrationId}`;
  revalidatePath(location);
  redirect(`${location}?result=${result}`);
}
