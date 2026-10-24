"use server";

import * as service from "@/lib/organizations/service";

// Separate server actions use Next's action POST/origin protections. No legacy caller.
async function result<T>(fn: () => Promise<T>) {
  try { return {ok:true as const,data:await fn()}; }
  catch (error) {
    return {ok:false as const,status:error instanceof service.OrganizationError?error.status:503};
  }
}
export async function createOrganization(input: unknown) { return result(()=>service.createOrganization(input)); }
export async function activateOrganization(input: unknown) { return result(()=>service.activateOrganization(input)); }
export async function setMembership(input: unknown) { return result(()=>service.setMembership(input)); }
export async function createPrivateAsset(input: unknown) { return result(()=>service.createPrivateAsset(input)); }
export async function readPrivateAsset(input: unknown) { return result(()=>service.readPrivateAsset(input)); }
export async function correctPrivateAssetName(input: unknown) { return result(()=>service.correctPrivateAssetName(input)); }
export async function readOrganizationAdministration(input: unknown) { return result(()=>service.readOrganizationAdministration(input)); }
