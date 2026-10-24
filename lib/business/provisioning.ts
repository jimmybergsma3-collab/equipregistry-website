import 'server-only';
import { randomUUID } from 'node:crypto';
import { type Prisma } from '@prisma/client';
import { businessDb, organizationDb, platformDb } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { BusinessError } from './model';

type Tx=Prisma.TransactionClient;
function deny(status=404):never{throw new BusinessError(status);}
const id=(v:unknown)=>typeof v==='string'&&/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(v)?v:deny(400);
const text=(v:unknown,max:number)=>typeof v==='string'&&v.trim()===v&&v.length>0&&v.length<=max&&!/[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(v)?v:deny(400);
type Account={id:string;role:string;emailVerifiedAt:Date|null};
async function account(tx:Tx,user:string){
 const u=(await tx.$queryRawUnsafe<Account[]>('SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=$1 FOR UPDATE',user))[0];
 if(!u?.emailVerifiedAt)deny();return u;
}
async function transaction<T>(command:string, fn:(tx:Tx,a:Account)=>Promise<T>){
 const db=new URL(process.env.ER_BUSINESS_DATABASE_URL??'http://disabled');
 if(process.env.ER_LIFECYCLE_SYNTHETIC!=='1'||db.protocol!=='postgresql:'||db.hostname!=='127.0.0.1'||db.port!=='55480'||db.pathname!=='/synthetic_business'||db.username!=='business_reader'||db.search)deny();
 const session=await getSession();if(!session.isAuthenticated)deny(401);
 // Fixed command-to-capability mapping; never derive a username/password.
 const client=command==='organization.request'?organizationDb:command==='organization.review'?platformDb:businessDb;
 try{return await client.$transaction(async tx=>fn(tx,await account(tx,session.user.id)),{timeout:15000});}
 catch(e){if(e instanceof BusinessError)throw e;throw new BusinessError(503);}
}
const event=(tx:Tx,org:string,actor:string,action:string,subject:string,version:number)=>tx.organizationEvent.create({data:{organizationId:org,actorId:actor,action,subjectId:subject,subjectVersion:version}});

// Reuses the existing pending-organization and reviewed-first-administrator
// contract. No account creation, evidence upload, serial matching or registry bridge.
export async function provision(command:string,input:Record<string,unknown>){
 const fields:Record<string,string[]>={
  'organization.request':['id','displayName','countryCode'],
  'organization.review':['id','expectedVersion','reference'],
  'subject.create':['organizationId','assetId','expectedVersion'],
 };
 if(!Object.hasOwn(fields,command)||Object.keys(input).some(k=>!fields[command].includes(k)))deny(400);
 return transaction(command,async(tx,actor)=>{
  if(command==='organization.request'){
   const orgId=id(input.id),displayName=text(input.displayName,200),countryCode=text(input.countryCode,2);
   if(!/^[A-Z]{2}$/.test(countryCode))deny(400);
   const existing=await tx.organization.findUnique({where:{id:orgId}});
   if(existing){
    const own=await tx.organizationEvent.findFirst({where:{organizationId:orgId,actorId:actor.id,action:'ORGANIZATION_CREATED'}});
    if(!own)deny();if(existing.displayName!==displayName||existing.countryCode!==countryCode)deny(409);
    return {id:orgId,version:existing.version,state:existing.status,replayed:true};
   }
   // Bound repeated submissions without making other tenants discoverable.
   if(await tx.organizationEvent.findFirst({where:{actorId:actor.id,action:'ORGANIZATION_CREATED',organization:{status:'PENDING_REVIEW'}}}))deny(409);
   const org=await tx.organization.create({data:{id:orgId,displayName,countryCode}});
   await event(tx,org.id,actor.id,'ORGANIZATION_CREATED',org.id,0);
   return {id:org.id,version:0,state:'PENDING_REVIEW'};
  }
  if(command==='organization.review'){
   if(actor.role!=='admin')deny();
   const orgId=id(input.id),reference=text(input.reference,100);
   if(!/^SYNTHETIC:[A-Za-z0-9:_-]{1,80}$/.test(reference))deny(400);
   const created=await tx.organizationEvent.findFirst({where:{organizationId:orgId,action:'ORGANIZATION_CREATED'},select:{actorId:true}});
   if(!created||created.actorId===actor.id)deny();
   const applicant=await account(tx,created.actorId);
   await tx.$queryRawUnsafe('SELECT id FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',orgId);
   const org=await tx.organization.findUnique({where:{id:orgId}});
   if(!org||org.status!=='PENDING_REVIEW'||org.version!==input.expectedVersion)deny(409);
   if(await tx.organizationMembership.findUnique({where:{organizationId_userId:{organizationId:orgId,userId:actor.id}}}))deny();
   await tx.organizationMandateReview.create({data:{organizationId:orgId,reviewerId:actor.id,firstAdministratorId:applicant.id,privateReviewReference:reference}});
   await tx.organizationMembership.create({data:{organizationId:orgId,userId:applicant.id,role:'ORG_ADMIN',grantedBy:actor.id}});
   await tx.organization.update({where:{id:orgId},data:{status:'ACTIVE',version:{increment:1},activatedAt:new Date()}});
   await event(tx,orgId,actor.id,'MANDATE_REVIEWED_AND_ACTIVATED',applicant.id,org.version+1);
   return {id:orgId,version:org.version+1,state:'ACTIVE'};
  }
  const orgId=id(input.organizationId),assetId=id(input.assetId);
  await tx.$queryRawUnsafe('SELECT id FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',orgId);
  const org=await tx.organization.findUnique({where:{id:orgId}}),m=await tx.organizationMembership.findUnique({where:{organizationId_userId:{organizationId:orgId,userId:actor.id}}});
  const clock=(await tx.$queryRaw<{now:Date}[]>`SELECT clock_timestamp() now`)[0].now;
  if(org?.status!=='ACTIVE'||m?.role!=='ORG_ADMIN'||m.status!=='ACTIVE'||m.endsAt||m.startsAt>clock)deny();
  const asset=await tx.privateImportedAsset.findFirst({where:{id:assetId,organizationId:orgId}});
  if(!asset||asset.lifecycleState!=='IMPORTED_PRIVATE')deny();if(asset.version!==input.expectedVersion)deny(409);
  const old=(await tx.$queryRawUnsafe<{id:string;version:number;identity_revision:number}[]>('SELECT id,version,identity_revision FROM business_private.subject WHERE tenant=$1::uuid AND asset=$2::uuid',orgId,assetId))[0];
  if(old){if(old.identity_revision!==asset.identityRevision)deny(409);return {id:old.id,version:old.version,replayed:true};}
  const subject=randomUUID();
  await tx.$executeRawUnsafe('INSERT INTO business_private.subject(id,tenant,asset,identity_revision) VALUES($1::uuid,$2::uuid,$3::uuid,$4)',subject,orgId,assetId,asset.identityRevision);
  await tx.$executeRawUnsafe('INSERT INTO business_private.event(id,subject,record_id,version,action,actor) VALUES($1::uuid,$2::uuid,$2::uuid,0,$3,$4)',randomUUID(),subject,'SUBJECT_CREATED',actor.id);
  return {id:subject,version:0};
 });
}
