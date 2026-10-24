import "server-only";
import { Prisma } from "@prisma/client";
import { organizationDb as prisma, platformDb } from '@/lib/db-capabilities';
import { getSession } from "@/lib/auth/getSession";
import { getRegistryCategories } from "@/lib/registry/categories";

type Tx = Prisma.TransactionClient;
type Actor = { id: string; role: string; emailVerifiedAt: Date | null };
type Role = "ORG_ADMIN" | "IMPORTER" | "EVIDENCE_WORKER" | "VIEWER";
export class OrganizationError extends Error {
  constructor(public status: number) { super("Organization operation unavailable."); }
}
function deny(status = 404): never { throw new OrganizationError(status); }
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function id(v: unknown): string { return typeof v === "string" && uuid.test(v) ? v : deny(400); }
function text(v: unknown, max: number): string {
  if (typeof v !== "string") deny(400);
  const s = v.normalize("NFC").trim();
  if (!s || s.length > max || /[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(s)) deny(400);
  return s;
}
function object(input: unknown, keys: string[]): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).some(k => !keys.includes(k))) deny(400);
  return input as Record<string, unknown>;
}
function version(v: unknown): number { return Number.isSafeInteger(v) && Number(v) >= 0 ? Number(v) : deny(400); }
async function transaction<T>(fn: (tx: Tx, actor: Actor) => Promise<T>, portalStrict = false, administrative = false) {
  const session = await getSession();
  if (!session.isAuthenticated) deny(401);
  return (administrative ? platformDb : prisma).$transaction(async tx => {
    // Lock the current account role; a stale session claim cannot authorize a write.
    const actors = await tx.$queryRaw<Actor[]>`SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${session.user.id} FOR SHARE`;
    if (!actors[0] || portalStrict && !actors[0].emailVerifiedAt) deny(401);
    return fn(tx, actors[0]);
  });
}
function platform(actor: Actor) { if (actor.role !== "admin") deny(403); }
async function lockedOrganization(tx: Tx, organizationId: string) {
  const rows = await tx.$queryRaw<{id: string; status: string; version: number}[]>`SELECT id,status,version FROM public."Organization" WHERE id=${organizationId}::uuid FOR UPDATE`;
  return rows[0] ?? deny();
}
async function member(tx: Tx, actor: Actor, organizationId: string, roles: Role[], portalStrict = false) {
  // All membership changes and asset commands share this lock, including revocation.
  const org = await lockedOrganization(tx, organizationId);
  const membership = await tx.organizationMembership.findUnique({where:{organizationId_userId:{organizationId,userId:actor.id}}});
  if (org.status !== "ACTIVE" || !membership || membership.status !== "ACTIVE" || membership.endsAt || !roles.includes(membership.role as Role)) deny();
  if (portalStrict && membership.startsAt > (await tx.$queryRaw<{now: Date}[]>`SELECT clock_timestamp() now`)[0].now) deny();
  return org;
}
async function event(tx: Tx, actor: Actor, organizationId: string, action: string, subjectId: string, subjectVersion: number) {
  await tx.organizationEvent.create({data:{organizationId,actorId:actor.id,action,subjectId,subjectVersion}});
}

export async function createOrganization(input: unknown) {
  const v = object(input,["displayName","countryCode"]);
  const displayName = text(v.displayName,200);
  const countryCode = v.countryCode == null ? null : text(v.countryCode,2);
  if (countryCode && !/^[A-Z]{2}$/.test(countryCode)) deny(400);
  return transaction(async (tx, actor) => {
    platform(actor);
    const org = await tx.organization.create({data:{displayName,countryCode}});
    await event(tx,actor,org.id,"ORGANIZATION_CREATED",org.id,0);
    return {id:org.id,status:org.status,version:org.version};
  });
}

export async function activateOrganization(input: unknown) {
  const v = object(input,["organizationId","expectedVersion","firstAdministratorId","mandateReviewed","privateReviewReference"]);
  const organizationId=id(v.organizationId), expectedVersion=version(v.expectedVersion);
  const firstAdministratorId=text(v.firstAdministratorId,200), privateReviewReference=text(v.privateReviewReference,200);
  if (v.mandateReviewed !== true || privateReviewReference.length < 10) deny(400);
  return transaction(async (tx,actor) => {
    platform(actor);
    if (firstAdministratorId===actor.id) deny(403);
    const org=await lockedOrganization(tx,organizationId);
    if (org.status!=="PENDING_REVIEW" || org.version!==expectedVersion) deny(409);
    const users=await tx.$queryRaw<{id:string}[]>`SELECT id FROM public."User" WHERE id=${firstAdministratorId} FOR SHARE`;
    if (!users.length) deny(400);
    return recordInitialOrganizationActivation(tx,{organizationId,reviewerId:actor.id,firstAdministratorId,privateReviewReference,expectedVersion,actorId:actor.id});
  }, false, true);
}


// Shared transaction primitive. Callers must authenticate, lock and authorize first.
export async function recordInitialOrganizationActivation(tx:Tx, input:{organizationId:string;reviewerId:string;firstAdministratorId:string;privateReviewReference:string;expectedVersion:number;actorId:string}) {
 const {organizationId,reviewerId,firstAdministratorId,privateReviewReference,expectedVersion,actorId}=input;
 await tx.organizationMandateReview.create({data:{organizationId,reviewerId,firstAdministratorId,privateReviewReference}});
 await tx.organizationMembership.create({data:{organizationId,userId:firstAdministratorId,role:"ORG_ADMIN",grantedBy:reviewerId}});
 await tx.organization.update({where:{id:organizationId},data:{status:"ACTIVE",version:{increment:1},activatedAt:new Date()}});
 await tx.organizationEvent.create({data:{organizationId,actorId,action:"MANDATE_REVIEWED_AND_ACTIVATED",subjectId:firstAdministratorId,subjectVersion:expectedVersion+1}});
 return {id:organizationId,status:"ACTIVE",version:expectedVersion+1};
}

// Ordinary membership management cannot bypass the separately reviewed governance commands.
export async function setMembership(input: unknown, portalStrict = false) {
  const v=object(input,["organizationId","userId","role","status","expectedVersion"]);
  const organizationId=id(v.organizationId), userId=text(v.userId,200);
  const role=text(v.role,24), status=text(v.status,16);
  if (!["IMPORTER","EVIDENCE_WORKER","VIEWER"].includes(role) || !["ACTIVE","REVOKED"].includes(status)) deny(400);
  const expectedVersion=v.expectedVersion === null ? null : version(v.expectedVersion);
  return transaction(async(tx,actor)=>{
    if (portalStrict && status === "ACTIVE") {
      const target = (await tx.$queryRaw<{emailVerifiedAt: Date | null}[]>`SELECT "emailVerifiedAt" FROM public."User" WHERE id=${userId} FOR SHARE`)[0];
      if (!target?.emailVerifiedAt) deny();
    }
    await member(tx,actor,organizationId,["ORG_ADMIN"],portalStrict);
    if (userId===actor.id) deny(403);
    const current=await tx.organizationMembership.findUnique({where:{organizationId_userId:{organizationId,userId}}});
    if (current?.role==="ORG_ADMIN") deny(403);
    if (current ? current.version!==expectedVersion : expectedVersion!==null || status!=="ACTIVE") deny(409);
    if (!await tx.user.findUnique({where:{id:userId},select:{id:true}})) deny(400);
    const data={role,status,grantedBy:actor.id,endsAt:status==="REVOKED"?new Date():null};
    const result=current ? await tx.organizationMembership.update({where:{organizationId_userId:{organizationId,userId}},data:{...data,version:{increment:1}}}) : await tx.organizationMembership.create({data:{organizationId,userId,...data}});
    await event(tx,actor,organizationId,status==="REVOKED"?"MEMBERSHIP_REVOKED":"MEMBERSHIP_GRANTED",userId,result.version);
    return {userId,role:result.role,status:result.status,version:result.version};
  }, portalStrict);
}

const assetSelect={id:true,organizationId:true,assetName:true,category:true,subcategory:true,brand:true,model:true,serialNumber:true,identifierType:true,sourceSystem:true,externalAssetKey:true,identityRevision:true,identityState:true,evidenceState:true,lifecycleState:true,version:true} as const;
export async function createPrivateAsset(input: unknown) {
  const v=object(input,["organizationId","assetName","category","subcategory","brand","model","serialNumber","identifierType","sourceSystem","externalAssetKey"]);
  const organizationId=id(v.organizationId), assetName=text(v.assetName,200), category=text(v.category,40), subcategory=text(v.subcategory,80);
  if (!getRegistryCategories("en").some(c=>c.value===category&&c.subcategories.some(s=>s.value===subcategory))) deny(400);
  const optional=(k:string,max:number)=>v[k]==null?null:text(v[k],max);
  const brand=optional("brand",200), model=optional("model",200), serialNumber=optional("serialNumber",200), identifierType=optional("identifierType",16), sourceSystem=optional("sourceSystem",80), externalAssetKey=optional("externalAssetKey",200);
  if (!!sourceSystem!==!!externalAssetKey || !serialNumber&&!externalAssetKey || !!serialNumber!==!!identifierType || identifierType&&!["SERIAL","VIN","FRAME","HIN"].includes(identifierType)) deny(400);
  if (serialNumber && /^(n\/?a|unknown|none|null|[-?]+|0+)$/i.test(serialNumber)) deny(400);
  return transaction(async(tx,actor)=>{
    await member(tx,actor,organizationId,["ORG_ADMIN","IMPORTER"]);
    const data={organizationId,assetName,category,subcategory,brand,model,serialNumber,identifierType,sourceSystem,externalAssetKey,identityState:serialNumber?"IDENTITY_PROVIDED":"IDENTITY_INCOMPLETE"};
    if (sourceSystem && externalAssetKey) {
      const prior=await tx.privateImportedAsset.findUnique({where:{organizationId_sourceSystem_externalAssetKey:{organizationId,sourceSystem,externalAssetKey}}});
      if (prior) {
        if (prior.lifecycleState !== "IMPORTED_PRIVATE") deny(409);
        if (Object.entries(data).some(([k,value])=>prior[k as keyof typeof prior]!==value)) deny(409);
        return {id:prior.id,outcome:"ALREADY_IMPORTED"};
      }
    }
    // Scoped candidate match only; never search foreign tenants or merge ownership.
    if (serialNumber && await tx.privateImportedAsset.findFirst({where:{organizationId,serialNumber:{equals:serialNumber,mode:"insensitive"}},select:{id:true}})) deny(409);
    const asset=await tx.privateImportedAsset.create({data:{...data,createdBy:actor.id},select:assetSelect});
    await event(tx,actor,organizationId,"PRIVATE_ASSET_CREATED",asset.id,0);
    return {id:asset.id,outcome:"CREATED"};
  });
}

export async function readPrivateAsset(input: unknown) {
  const v=object(input,["organizationId","assetId"]), organizationId=id(v.organizationId), assetId=id(v.assetId);
  return transaction(async(tx,actor)=>{
    await member(tx,actor,organizationId,["ORG_ADMIN","IMPORTER","VIEWER"]);
    return await tx.privateImportedAsset.findFirst({where:{id:assetId,organizationId,lifecycleState:"IMPORTED_PRIVATE"},select:assetSelect}) ?? deny();
  });
}

// Explicit versioned non-identity correction, never an import overwrite.
export async function correctPrivateAssetName(input: unknown) {
  const v=object(input,["organizationId","assetId","expectedVersion","assetName"]), organizationId=id(v.organizationId), assetId=id(v.assetId), expectedVersion=version(v.expectedVersion), assetName=text(v.assetName,200);
  return transaction(async(tx,actor)=>{
    await member(tx,actor,organizationId,["ORG_ADMIN","IMPORTER"]);
    const result=await tx.privateImportedAsset.updateMany({where:{id:assetId,organizationId,version:expectedVersion,lifecycleState:"IMPORTED_PRIVATE"},data:{assetName,version:{increment:1}}});
    if (result.count!==1) deny(409);
    await event(tx,actor,organizationId,"PRIVATE_ASSET_NAME_CORRECTED",assetId,expectedVersion+1);
    return {id:assetId,version:expectedVersion+1};
  });
}

export async function readOrganizationAdministration(input: unknown, portalStrict = false) {
  const v=object(input,["organizationId"]), organizationId=id(v.organizationId);
  return transaction(async(tx,actor)=>{
    await member(tx,actor,organizationId,["ORG_ADMIN"],portalStrict);
    const memberships=await tx.organizationMembership.findMany({where:{organizationId},select:{userId:true,role:true,status:true,version:true,startsAt:true,endsAt:true},take:portalStrict?101:100,orderBy:{userId:"asc"}});
    const events=await tx.organizationEvent.findMany({where:{organizationId},select:{action:true,actorId:true,subjectId:true,subjectVersion:true,createdAt:true},orderBy:{createdAt:"desc"},take:100});
    return portalStrict ? {memberships:memberships.slice(0,100),events,partial:memberships.length>100} : {memberships,events};
  }, portalStrict);
}
