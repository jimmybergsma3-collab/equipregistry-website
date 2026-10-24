import 'server-only';
import { recordInitialOrganizationActivation } from '@/lib/organizations/service';
import { recordOrganizationClosure } from '@/lib/organizations/governance';
import { createHash, createPublicKey, randomUUID, verify } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import { platformDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { getLocalizedCountryOptions } from '@/lib/i18n/countries';

type Tx = Prisma.TransactionClient;
type Input = Record<string, unknown>;
type Config = {registries: {name:string; url:string; registrationType:string; providerId:string}[]; requiredFields:string[]; validityDays:number};
type Envelope = {id:string; providerId:string; subjectId:string; country:string; purpose:string; digest:string; sourceUri:string; observedAt:string; expiresAt:string};
type Row = {id:string; user_id:string; role:string; countries:string[]; state:string; version:number; account_revision:string; expires_at:Date;
 target_id:string; issuer_id:string; target_revision:string; issuer_revision:string; assignment_version:number|null; grant_expires_at:Date;
 email:string; name:string|null; emailVerifiedAt:Date|null; epoch:string; config:Config; public_key:string; purposes:string[]; synthetic:boolean; revoked_at:Date|null;
 provider_id:string; subject_id:string; country:string; purpose:string; envelope:Envelope; signature:string;
 organization_id:string; applicant_id:string; claims:Record<string,string>; digest:string; organization_version:number; country_version:number; applicant_revision:string; applicant_membership_version:number|null;
 reviewer_id:string|null; assigned_by:string; reviewer_version:number; reviewer_revision:string; assigner_revision:string; assigner_version:number|null;
 qualification_id:string; register_id:string; representation_id:string; reviewed_at:Date|null; reason:string|null; created_at:Date;
 status:string; countryCode:string|null; startsAt:Date; endsAt:Date|null; action:string; kind:string; record_id:string; actor_id:string; detail:Record<string,unknown>};
type Context = {tx:Tx; actor:Row; founder:boolean; grant:Row|null; clock:Date};
const roles = ['PLATFORM_ADMIN','VERIFICATION_ADMIN','SUPPORT_ADMIN','INDEPENDENT_REVIEWER'];
const iso = new Set(getLocalizedCountryOptions('en').map(x=>x.code));
export class PlatformError extends Error { constructor(public status=404){super('PLATFORM_UNAVAILABLE');} }
function deny(status=404):never{throw new PlatformError(status);}
export const platformEnabled=()=>process.env.ER_PLATFORM_MANAGEMENT_ENABLED==='1';
const text=(v:unknown,max=200):string=>typeof v==='string'&&v===v.trim().normalize('NFC')&&v.length>0&&v.length<=max&&!/[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(v)?v:deny(400);
const uuid=(v:unknown)=>/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(text(v,36))?v as string:deny(400);
const version=(v:unknown)=>Number.isSafeInteger(v)&&Number(v)>=0?Number(v):deny(400);
const date=(v:unknown)=>{const d=new Date(text(v,40));if(!Number.isFinite(+d))deny(400);return d;};
const country=(v:unknown)=>iso.has(text(v,2))?v as string:deny(400);
const countries=(v:unknown)=>{if(!Array.isArray(v)||!v.length||v.length>iso.size||new Set(v).size!==v.length)deny(400);return v.map(country).sort();};
const role=(v:unknown)=>roles.includes(text(v,40))?v as string:deny(400);
const obj=(v:unknown,keys:string[])=>{if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!keys.includes(k)))deny(400);return v as Input;};
const canonical=(v:unknown):string=>JSON.stringify(v,(_key,value)=>value&&typeof value==='object'&&!Array.isArray(value)?Object.fromEntries(Object.entries(value).sort(([a],[b])=>a.localeCompare(b))):value);
const digest=(v:unknown)=>createHash('sha256').update(canonical(v)).digest('hex');
const revision=(u:Row)=>digest([u.id,u.emailVerifiedAt?.toISOString(),u.role,u.epoch]);
const rows=(tx:Tx,sql:string,...args:unknown[])=>tx.$queryRawUnsafe<Row[]>(sql,...args);
const one=async(tx:Tx,sql:string,...args:unknown[])=>(await rows(tx,sql,...args))[0]??deny();
const exec=(tx:Tx,sql:string,...args:unknown[])=>tx.$executeRawUnsafe(sql,...args);
const now=async(tx:Tx)=>(await tx.$queryRaw<{now:Date}[]>`SELECT clock_timestamp() now`)[0].now;
async function account(tx:Tx,id:string){const u=await one(tx,'SELECT id,email,name,role::text,"emailVerifiedAt",xmin::text epoch FROM public."User" WHERE id=$1 FOR SHARE',id);if(!u.emailVerifiedAt)deny();return u;}
async function audit(tx:Tx,actor:string,kind:string,id:string,ver:number,action:string,c:string|null=null){
 const tables=['activation','activation_consent','founder','assignment','invitation','country','provider','attestation','verification'];if(!tables.includes(kind))deny(400);
 const snapshot=await one(tx,`SELECT to_jsonb(t) detail FROM platform_private.${kind} t WHERE id::text=$1`,id);
 const keys=['role','countries','state','expires_at','grant_expires_at','target_id','issuer_id','reviewer_id','assigned_by','config','reason','revoked_at','case_id','case_version','applicant_id','approved_by','organization_version'];
 const detail=Object.fromEntries(Object.entries(snapshot.detail).filter(([k])=>keys.includes(k)));
 await exec(tx,'INSERT INTO platform_private.event(id,kind,record_id,version,action,actor_id,country,detail) VALUES($1::uuid,$2,$3,$4,$5,$6,$7,$8::jsonb)',randomUUID(),kind,id,ver,action,actor,c,JSON.stringify(detail));
}
const isActive=(g:Row|undefined,u:Row,clock:Date)=>!!g&&g.state==='ACTIVE'&&g.expires_at>clock&&g.account_revision===revision(u);
function scope(ctx:Context,allowed:string[],c?:string){if(ctx.founder)return;if(!ctx.grant||!allowed.includes(ctx.grant.role)||c&&!ctx.grant.countries.includes(c))deny();}
const root=(ctx:Context)=>{if(!ctx.founder)deny();};
async function transaction<T>(fn:(ctx:Context)=>Promise<T>){
 if(!platformEnabled())deny();const session=await getSession();if(!session.isAuthenticated)deny(401);const actorId=session.user.id;
 try{return await prisma.$transaction(async tx=>{
  // One stable administrative lock orders authorization changes and reviews.
  await one(tx,'SELECT id FROM platform_private.gate WHERE id=1 FOR UPDATE');
  const actor=await account(tx,actorId),clock=await now(tx);
  const founder=!!(await rows(tx,'SELECT id FROM platform_private.founder WHERE user_id=$1',actor.id)).length;
  const grant=(await rows(tx,'SELECT * FROM platform_private.assignment WHERE id=$1',actor.id))[0];
  return fn({tx,actor,founder,grant:isActive(grant,actor,clock)?grant:null,clock});
 },{maxWait:5000,timeout:15000});}catch(e){if(e instanceof PlatformError)throw e;throw new PlatformError(503);}
}
async function independent(tx:Tx,id:string,org:string,excluded:string[]){if(excluded.includes(id))deny();await account(tx,id);if((await rows(tx,'SELECT "userId" id FROM public."OrganizationMembership" WHERE "organizationId"=$1::uuid AND "userId"=$2 AND status=$3 AND "startsAt"<=clock_timestamp() AND ("endsAt" IS NULL OR "endsAt">clock_timestamp())',org,id,'ACTIVE')).length)deny();}
function syntheticAllowed(){try{const d=new URL(process.env.ER_PLATFORM_DATABASE_URL??'');return process.env.ER_PLATFORM_SYNTHETIC_ATTESTATIONS==='1'&&d.protocol==='postgresql:'&&d.hostname==='127.0.0.1'&&d.port==='55480'&&d.pathname==='/synthetic_business';}catch{return false;}}
async function validateSignature(tx:Tx,envelope:Envelope,signature:string){
 const p=await one(tx,'SELECT * FROM platform_private.provider WHERE id=$1 FOR SHARE',envelope.providerId),clock=await now(tx);
 if(p.revoked_at||p.expires_at<=clock||!p.countries.includes(envelope.country)||!p.purposes.includes(envelope.purpose)||p.synthetic&&!syntheticAllowed())deny(409);
 const key=createPublicKey(p.public_key);if(key.asymmetricKeyType!=='ed25519'||!verify(null,Buffer.from(canonical(envelope)),key,Buffer.from(signature,'base64')))deny(409);
 const observed=date(envelope.observedAt),expires=date(envelope.expiresAt);if(observed>clock||expires<=clock||expires<=observed||expires>p.expires_at)deny(409);
 return {expires,provider:p};
}
async function attestation(tx:Tx,id:string,subject:string,c:string,purpose:string,expected:string){
 const a=await one(tx,'SELECT * FROM platform_private.attestation WHERE id=$1::uuid',uuid(id));
 if(a.subject_id!==subject||a.country!==c||a.purpose!==purpose||a.envelope.id!==a.id||a.envelope.providerId!==a.provider_id||a.envelope.subjectId!==subject||a.envelope.country!==c||a.envelope.purpose!==purpose||a.envelope.digest!==expected)deny(409);
 return {...await validateSignature(tx,a.envelope,a.signature),envelope:a.envelope};
}
async function reviewer(tx:Tx,id:string,c:string,qualification:string){const u=await account(tx,id),g=await one(tx,'SELECT * FROM platform_private.assignment WHERE id=$1',id);if(!isActive(g,u,await now(tx))||g.role!=='INDEPENDENT_REVIEWER'||!g.countries.includes(c))deny();const proof=await attestation(tx,qualification,id,c,'QUALIFICATION',revision(u));return {u,g,proof};}
async function entitled(ctx:Context,c:Row){
 if(c.applicant_id===ctx.actor.id)return;
 if(ctx.founder)return;
 if(ctx.grant?.role==='VERIFICATION_ADMIN'&&ctx.grant.countries.includes(c.country))return;
 if(ctx.grant?.role==='INDEPENDENT_REVIEWER'&&c.reviewer_id===ctx.actor.id&&ctx.grant.countries.includes(c.country))return;
 deny();
}
async function currentCase(ctx:Context,c:Row){
 const org=await one(ctx.tx,'SELECT id,status,version,"countryCode" FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',c.organization_id);
 const config=await one(ctx.tx,'SELECT * FROM platform_private.country WHERE id=$1',c.country);
 const activated=(await rows(ctx.tx,'SELECT * FROM platform_private.activation WHERE id=$1::uuid AND case_id=$2::uuid',org.id,c.id))[0];
 if(org.version!==(activated?.organization_version??c.organization_version)||org.countryCode!==c.country||config.version!==c.country_version||!['ACTIVE','PENDING_REVIEW'].includes(org.status))deny(409);
 const applicant=await account(ctx.tx,c.applicant_id);if(revision(applicant)!==c.applicant_revision)deny(409);
 if(org.status==='PENDING_REVIEW'){if(c.applicant_membership_version!==null||!(await rows(ctx.tx,'SELECT organization_id id FROM portal_private.request WHERE organization_id=$1::uuid AND applicant_id=$2',org.id,c.applicant_id)).length)deny(409);}
 else{const m=await one(ctx.tx,'SELECT * FROM public."OrganizationMembership" WHERE "organizationId"=$1::uuid AND "userId"=$2 FOR SHARE',org.id,c.applicant_id);if(m.version!==(activated?0:c.applicant_membership_version)||m.role!=='ORG_ADMIN'||m.status!=='ACTIVE'||m.endsAt||m.startsAt>await now(ctx.tx))deny(409);}
 return config.config;
}
async function currentReview(ctx:Context,c:Row){
 if(!c.reviewer_id)deny();await independent(ctx.tx,c.reviewer_id,c.organization_id,[c.applicant_id,c.assigned_by]);
 await independent(ctx.tx,c.assigned_by,c.organization_id,[c.applicant_id,c.reviewer_id]);
 const r=await reviewer(ctx.tx,c.reviewer_id,c.country,c.qualification_id);if(r.g.version!==c.reviewer_version||revision(r.u)!==c.reviewer_revision)deny(409);
 const issuer=await account(ctx.tx,c.assigned_by);if(revision(issuer)!==c.assigner_revision)deny(409);
 const isFounder=(await rows(ctx.tx,'SELECT id FROM platform_private.founder WHERE user_id=$1',c.assigned_by)).length>0;
 if(!isFounder){const a=await one(ctx.tx,'SELECT * FROM platform_private.assignment WHERE id=$1',c.assigned_by);if(!isActive(a,issuer,await now(ctx.tx))||a.role!=='VERIFICATION_ADMIN'||!a.countries.includes(c.country)||a.version!==c.assigner_version)deny(409);}
 return r.proof.expires;
}
async function effective(ctx:Context,c:Row){
 if(c.state!=='VERIFIED')return c.state;
 if(c.expires_at<=await now(ctx.tx))return 'EXPIRED';
 try{await currentCase(ctx,c);await currentReview(ctx,c);await attestation(ctx.tx,c.register_id,c.id,c.country,'REGISTER',c.digest);await attestation(ctx.tx,c.representation_id,c.id,c.country,'REPRESENTATION',c.digest);return 'VERIFIED';}catch(e){if(e instanceof PlatformError)return 'REVOKED';throw e;}
}
const fields:Record<string,string[]>={
 'activation.consent':['id','expectedVersion'], 'activation.apply':['id','expectedVersion'], 'activation.suspend':['id','expectedVersion','organizationVersion','reason'],
 'overview':[], 'users.search':['query'], 'administrators.list':[], 'invitations.list':[],
 'invitation.create':['targetId','role','countries','expiresAt','grantExpiresAt'], 'invitation.respond':['id','expectedVersion','accept'], 'invitation.revoke':['id','expectedVersion'],
 'assignment.change':['userId','expectedVersion','role','countries','state','expiresAt'],
 'country.list':[], 'country.save':['country','expectedVersion','config'], 'providers.list':[], 'provider.revoke':['id','expectedVersion'],
 'attestation.ingest':['envelope','signature'], 'verification.request':['organizationId','country','claims'],
 'verification.list':[], 'verification.assign':['id','expectedVersion','reviewerId','qualificationId'],
 'verification.decide':['id','expectedVersion','approve','registerId','representationId','reason'],
 'verification.revoke':['id','expectedVersion','reason'], 'verification.recheck':['id','expectedVersion'], 'audit.list':[],
};
export async function platformCommand(command:string,input:unknown){
 if(!Object.hasOwn(fields,command))deny(400);const v=obj(input,fields[command]);
 return transaction(async ctx=>{
  const {tx,actor}=ctx;
  if(command==='overview')return {accountId:actor.id,role:ctx.founder?'FOUNDER':ctx.grant?.role??null,countries:ctx.founder?[...iso].sort():ctx.grant?.countries??[],trustAnchorsConfigured:(await rows(tx,'SELECT id FROM platform_private.founder')).length>0,independentQualificationRequired:true};
  if(command==='users.search'){
   root(ctx);const q=text(v.query,200);if(q.length<3)deny(400);
   const users=await tx.user.findMany({where:{OR:[{id:q},{email:{equals:q,mode:'insensitive'}},{name:{startsWith:q,mode:'insensitive'}}]},select:{id:true,name:true,email:true,emailVerifiedAt:true},orderBy:{id:'asc'},take:21});
   return {users:users.slice(0,20).map(u=>({id:u.id,name:u.name,email:u.email,verified:!!u.emailVerifiedAt})),partial:users.length>20};
  }
  if(command==='administrators.list'){
   scope(ctx,['PLATFORM_ADMIN']);const found=await rows(tx,'SELECT * FROM platform_private.assignment WHERE $1 OR countries && $2::text[] ORDER BY id LIMIT 101',ctx.founder,ctx.grant?.countries??[]);
   const administrators=[];for(const g of found.slice(0,100)){const u=await one(tx,'SELECT id,role::text,"emailVerifiedAt",xmin::text epoch FROM public."User" WHERE id=$1 FOR SHARE',g.id);const state=g.state!=='ACTIVE'?g.state:g.expires_at<=ctx.clock?'EXPIRED':!u.emailVerifiedAt||revision(u)!==g.account_revision?'ACCOUNT_CHANGED':'ACTIVE';administrators.push({userId:g.id,role:g.role,countries:g.countries,state,version:g.version,expiresAt:g.expires_at});}return {administrators,partial:found.length>100};
  }
  if(command==='invitations.list'){
   const found=await rows(tx,'SELECT * FROM platform_private.invitation WHERE $1 OR target_id=$2 ORDER BY created_at DESC,id LIMIT 101',ctx.founder,actor.id);
   return {invitations:found.slice(0,100).map(i=>({id:i.id,targetId:i.target_id,role:i.role,countries:i.countries,state:i.state==='PENDING'&&i.expires_at<=ctx.clock?'EXPIRED':i.state,version:i.version,expiresAt:i.expires_at,grantExpiresAt:i.grant_expires_at,canRespond:i.target_id===actor.id&&i.state==='PENDING'&&i.expires_at>ctx.clock})),partial:found.length>100};
  }
  if(command==='invitation.create'){
   root(ctx);const target=await account(tx,text(v.targetId)),r=role(v.role),cs=countries(v.countries),expires=date(v.expiresAt),grantExpires=date(v.grantExpiresAt);
   if(target.id===actor.id||(await rows(tx,'SELECT id FROM platform_private.founder WHERE user_id=$1',target.id)).length)deny(403);
   if(expires<=await now(tx)||grantExpires<expires)deny(400);
   const old=(await rows(tx,'SELECT * FROM platform_private.assignment WHERE id=$1',target.id))[0];
   const pending=(await rows(tx,"SELECT * FROM platform_private.invitation WHERE target_id=$1 AND state='PENDING'",target.id))[0];
   if(pending)deny(409);const id=randomUUID();
   await exec(tx,'INSERT INTO platform_private.invitation(id,target_id,issuer_id,role,countries,target_revision,issuer_revision,assignment_version,expires_at,grant_expires_at) VALUES($1::uuid,$2,$3,$4,$5::text[],$6,$7,$8,$9,$10)',id,target.id,actor.id,r,cs,revision(target),revision(actor),old?.version??null,expires,grantExpires);
   await audit(tx,actor.id,'invitation',id,0,'INVITED');return {id,version:0};
  }
  if(command==='invitation.respond'||command==='invitation.revoke'){
   const i=await one(tx,'SELECT * FROM platform_private.invitation WHERE id=$1::uuid',uuid(v.id));
   if(command==='invitation.revoke')root(ctx);else if(i.target_id!==actor.id)deny();
   if(i.version!==version(v.expectedVersion)||i.state!=='PENDING')deny(409);
   let state='REVOKED';
   if(command==='invitation.respond'){
    if(typeof v.accept!=='boolean')deny(400);if(i.expires_at<=await now(tx)||i.target_revision!==revision(actor))deny(409);
    const issuer=await account(tx,i.issuer_id);if(revision(issuer)!==i.issuer_revision||!(await rows(tx,'SELECT id FROM platform_private.founder WHERE user_id=$1',issuer.id)).length)deny(409);
    state=v.accept?'ACCEPTED':'DECLINED';
    if(v.accept){
     const old=(await rows(tx,'SELECT * FROM platform_private.assignment WHERE id=$1',actor.id))[0];if((old?.version??null)!==i.assignment_version)deny(409);
     const ver=old?old.version+1:0;
     if(old)await exec(tx,`UPDATE platform_private.assignment SET role=$2,countries=$3::text[],state='ACTIVE',account_revision=$4,expires_at=$5,version=$6 WHERE id=$1`,actor.id,i.role,i.countries,revision(actor),i.grant_expires_at,ver);
     else await exec(tx,`INSERT INTO platform_private.assignment(id,role,countries,state,account_revision,expires_at,version) VALUES($1,$2,$3::text[],'ACTIVE',$4,$5,$6)`,actor.id,i.role,i.countries,revision(actor),i.grant_expires_at,ver);
     await audit(tx,actor.id,'assignment',actor.id,ver,'INVITATION_ACCEPTED');
    }
   }
   await exec(tx,'UPDATE platform_private.invitation SET state=$2,version=version+1 WHERE id=$1::uuid',i.id,state);await audit(tx,actor.id,'invitation',i.id,i.version+1,state);return {id:i.id,state,version:i.version+1};
  }
  if(command==='assignment.change'){
   root(ctx);const target=await one(tx,'SELECT id,role::text,"emailVerifiedAt",xmin::text epoch FROM public."User" WHERE id=$1 FOR SHARE',text(v.userId)),old=await one(tx,'SELECT * FROM platform_private.assignment WHERE id=$1',target.id);
   if(target.id===actor.id)deny(403);if(old.version!==version(v.expectedVersion))deny(409);
   const r=role(v.role),cs=countries(v.countries),expires=date(v.expiresAt),state=text(v.state,16);if(!['ACTIVE','SUSPENDED','REVOKED'].includes(state)||state==='ACTIVE'&&(!target.emailVerifiedAt||expires<=await now(tx)))deny(400);
   // Revocation is terminal for this appointment. A new invitation requires consent.
   if(old.state==='REVOKED')deny(409);
   await exec(tx,'UPDATE platform_private.assignment SET role=$2,countries=$3::text[],state=$4,expires_at=$5,account_revision=$6,version=version+1 WHERE id=$1',target.id,r,cs,state,expires,revision(target));
   await audit(tx,actor.id,'assignment',target.id,old.version+1,'ACCESS_'+state);return {userId:target.id,version:old.version+1,state};
  }
  if(command==='country.list'){
   const configured=await rows(tx,'SELECT * FROM platform_private.country ORDER BY id');return {countries:configured.map(c=>({country:c.id,version:c.version,config:c.config})),supportedCodes:[...iso].sort()};
  }
  if(command==='country.save'){
   root(ctx);const code=country(v.country),cfg=obj(v.config,['registries','requiredFields','validityDays']);
   if(!Array.isArray(cfg.registries)||cfg.registries.length>20||!Array.isArray(cfg.requiredFields)||cfg.requiredFields.some(x=>!['legalName','registrationNumber','registrationType','registeredAddress','representativeId'].includes(String(x)))||new Set(cfg.requiredFields).size!==cfg.requiredFields.length||!['legalName','registrationNumber','registrationType','representativeId'].every(x=>(cfg.requiredFields as unknown[]).includes(x))||!Number.isSafeInteger(cfg.validityDays)||Number(cfg.validityDays)<1||Number(cfg.validityDays)>3650)deny(400);
   const registries=cfg.registries.map(value=>{const r=obj(value,['name','url','registrationType','providerId']),url=new URL(text(r.url,500));if(url.protocol!=='https:'||url.username||url.password||url.hash||url.search)deny(400);return {name:text(r.name),url:url.toString(),registrationType:text(r.registrationType,80),providerId:text(r.providerId,100)};});
   const config={registries,requiredFields:cfg.requiredFields,validityDays:cfg.validityDays};const old=(await rows(tx,'SELECT * FROM platform_private.country WHERE id=$1',code))[0];
   if((old?.version??null)!==v.expectedVersion)deny(409);const ver=old?old.version+1:0;
   if(old)await exec(tx,'UPDATE platform_private.country SET config=$2::jsonb,version=$3 WHERE id=$1',code,JSON.stringify(config),ver);else await exec(tx,'INSERT INTO platform_private.country(id,config,version) VALUES($1,$2::jsonb,$3)',code,JSON.stringify(config),ver);await audit(tx,actor.id,'country',code,ver,'COUNTRY_CONFIGURED',code);return {country:code,version:ver};
  }
  if(command==='providers.list'){root(ctx);return {providers:(await rows(tx,'SELECT * FROM platform_private.provider ORDER BY id LIMIT 101')).map(p=>({id:p.id,countries:p.countries,purposes:p.purposes,synthetic:p.synthetic,expiresAt:p.expires_at,revoked:!!p.revoked_at,version:p.version}))};}
  if(command==='provider.revoke'){
   root(ctx);const p=await one(tx,'SELECT * FROM platform_private.provider WHERE id=$1 FOR UPDATE',text(v.id,100));if(p.revoked_at||p.version!==version(v.expectedVersion))deny(409);
   await exec(tx,'UPDATE platform_private.provider SET revoked_at=clock_timestamp(),version=version+1 WHERE id=$1',p.id);await audit(tx,actor.id,'provider',p.id,p.version+1,'TRUST_REVOKED');return {id:p.id,version:p.version+1};
  }
  if(command==='attestation.ingest'){
   const e=obj(v.envelope,['id','providerId','subjectId','country','purpose','digest','sourceUri','observedAt','expiresAt']);
   const envelope:Envelope={id:uuid(e.id),providerId:text(e.providerId,100),subjectId:text(e.subjectId,200),country:country(e.country),purpose:text(e.purpose,30),digest:text(e.digest,64),sourceUri:text(e.sourceUri,500),observedAt:date(e.observedAt).toISOString(),expiresAt:date(e.expiresAt).toISOString()};
   if(!['REGISTER','REPRESENTATION','QUALIFICATION'].includes(envelope.purpose)||!/^[a-f0-9]{64}$/.test(envelope.digest))deny(400);scope(ctx,['VERIFICATION_ADMIN'],envelope.country);const signature=text(v.signature,100);if(!/^[A-Za-z0-9+/]{86}==$/.test(signature))deny(400);
   await validateSignature(tx,envelope,signature);
   await exec(tx,'INSERT INTO platform_private.attestation(id,provider_id,subject_id,country,purpose,envelope,signature) VALUES($1::uuid,$2,$3,$4,$5,$6::jsonb,$7)',envelope.id,envelope.providerId,envelope.subjectId,envelope.country,envelope.purpose,JSON.stringify(envelope),signature);
   await audit(tx,actor.id,'attestation',envelope.id,0,'SIGNED_ATTESTATION_RECEIVED',envelope.country);return {id:envelope.id};
  }
  if(command==='verification.request'){
   const org=await one(tx,'SELECT id,status,version,"countryCode" FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',uuid(v.organizationId)),code=country(v.country);
   if(org.countryCode!==code||!['ACTIVE','PENDING_REVIEW'].includes(org.status))deny(409);
   let membershipVersion:number|null=null;
   if(org.status==='PENDING_REVIEW'){if(!(await rows(tx,'SELECT organization_id id FROM portal_private.request WHERE organization_id=$1::uuid AND applicant_id=$2',org.id,actor.id)).length)deny();}
   else{const m=await one(tx,'SELECT * FROM public."OrganizationMembership" WHERE "organizationId"=$1::uuid AND "userId"=$2 FOR SHARE',org.id,actor.id);if(m.role!=='ORG_ADMIN'||m.status!=='ACTIVE'||m.endsAt||m.startsAt>await now(tx))deny();membershipVersion=m.version;}
   const config=await one(tx,'SELECT * FROM platform_private.country WHERE id=$1',code);const claimsInput=obj(v.claims,['legalName','registrationNumber','registrationType','registeredAddress','representativeId']),claims:Record<string,string>={};for(const [k,value] of Object.entries(claimsInput))claims[k]=text(value,k==='registeredAddress'?500:200);
   if(config.config.requiredFields.some(k=>!claims[k])||claims.representativeId!==actor.id)deny(400);
   if((await rows(tx,"SELECT id FROM platform_private.verification WHERE organization_id=$1::uuid AND state IN ('PENDING','UNDER_REVIEW','VERIFIED')",org.id)).length)deny(409);
   const id=randomUUID(),hash=digest([org.id,org.version,code,config.version,claims,actor.id,revision(actor),membershipVersion]);
   await exec(tx,'INSERT INTO platform_private.verification(id,organization_id,applicant_id,country,claims,digest,organization_version,country_version,applicant_revision,applicant_membership_version) VALUES($1::uuid,$2::uuid,$3,$4,$5::jsonb,$6,$7,$8,$9,$10)',id,org.id,actor.id,code,JSON.stringify(claims),hash,org.version,config.version,revision(actor),membershipVersion);
   await audit(tx,actor.id,'verification',id,0,'VERIFICATION_REQUESTED',code);return {id,state:'PENDING',version:0};
  }
  if(command==='verification.list'){
   const found=await rows(tx,`SELECT * FROM platform_private.verification WHERE applicant_id=$1 OR $2 OR ($3='VERIFICATION_ADMIN' AND country=ANY($4::text[])) OR ($3='INDEPENDENT_REVIEWER' AND reviewer_id=$1 AND country=ANY($4::text[])) ORDER BY created_at DESC,id LIMIT 101`,actor.id,ctx.founder,ctx.grant?.role??'',ctx.grant?.countries??[]);
   const cases=[];for(const c of found.slice(0,100)){const state=await effective(ctx,c);const activation=(await rows(tx,'SELECT * FROM platform_private.activation WHERE case_id=$1::uuid',c.id))[0];const consent=(await rows(tx,'SELECT id FROM platform_private.activation_consent WHERE id=$1::uuid',c.id))[0];const organization=await one(tx,'SELECT id,status,version FROM public."Organization" WHERE id=$1::uuid',c.organization_id);cases.push({activationEnabled:process.env.ER_ORGANIZATION_ACTIVATION_ENABLED==='1',activationAccepted:!!consent,activated:!!activation,organizationStatus:organization.status,organizationVersion:organization.version,id:c.id,organizationId:c.organization_id,country:c.country,claims:c.claims,digest:c.digest,state,recordedState:c.state,version:c.version,reviewerId:c.reviewer_id,reviewedAt:c.reviewed_at,expiresAt:c.expires_at,reason:c.reason});}return {cases,partial:found.length>100};
  }
  if(command.startsWith('verification.')||command.startsWith('activation.')){
   const c=await one(tx,'SELECT * FROM platform_private.verification WHERE id=$1::uuid',uuid(v.id));await entitled(ctx,c);if(c.version!==version(v.expectedVersion))deny(409);
   if(command.startsWith('activation.')){
    if(process.env.ER_ORGANIZATION_ACTIVATION_ENABLED!=='1')deny();
    const org=await one(tx,'SELECT id,status,version FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',c.organization_id);
    if(command==='activation.suspend'){
     scope(ctx,['VERIFICATION_ADMIN'],c.country);if(actor.id===c.applicant_id)deny(403);
     await one(tx,'SELECT id FROM platform_private.activation WHERE id=$1::uuid AND case_id=$2::uuid',org.id,c.id);
     if(org.status!=='ACTIVE'||org.version!==version(v.organizationVersion))deny(409);
     const result=await recordOrganizationClosure(tx,actor.id,org.id,org.version,'SUSPENDED_GOVERNANCE',text(v.reason,200));
     if(['PENDING','UNDER_REVIEW','VERIFIED'].includes(c.state)){await exec(tx,"UPDATE platform_private.verification SET state='REVOKED',reason=$2,version=version+1 WHERE id=$1::uuid",c.id,'Organization administration explicitly suspended');await audit(tx,actor.id,'verification',c.id,c.version+1,'ORGANIZATION_SUSPENDED',c.country);}
     return result;
    }
    if(org.status!=='PENDING_REVIEW'||await effective(ctx,c)!=='VERIFIED')deny(409);
    if(command==='activation.consent'){
     if(actor.id!==c.applicant_id)deny();
     if((await rows(tx,'SELECT id FROM platform_private.activation_consent WHERE id=$1::uuid',c.id)).length)deny(409);
     await exec(tx,'INSERT INTO platform_private.activation_consent(id,applicant_id,case_version,account_revision,digest,expires_at) VALUES($1::uuid,$2,$3,$4,$5,$6)',c.id,actor.id,c.version,revision(actor),c.digest,c.expires_at);
     await audit(tx,actor.id,'activation_consent',c.id,0,'ORGANIZATION_ADMIN_CONSENT',c.country);return {id:c.id,state:'CONSENT_RECORDED'};
    }
    root(ctx);await independent(tx,actor.id,org.id,[c.applicant_id,c.reviewer_id??'']);
    const consent=await one(tx,'SELECT * FROM platform_private.activation_consent WHERE id=$1::uuid',c.id);
    if(consent.expires_at<=await now(tx))deny(409);
    // The database also requires exact consent/case identity and same-tx activation provenance.
    await exec(tx,'INSERT INTO platform_private.activation(id,case_id,case_version,applicant_id,reviewer_id,approved_by,organization_version) VALUES($1::uuid,$2::uuid,$3,$4,$5,$6,$7)',org.id,c.id,c.version,c.applicant_id,c.reviewer_id,actor.id,org.version+1);
    await audit(tx,actor.id,'activation',org.id,0,'ORGANIZATION_ACTIVATION_AUTHORIZED',c.country);
    return recordInitialOrganizationActivation(tx,{organizationId:org.id,reviewerId:c.reviewer_id!,firstAdministratorId:c.applicant_id,privateReviewReference:'platform-case:'+c.id,expectedVersion:org.version,actorId:actor.id});
   }
   if(command==='verification.assign'){
    scope(ctx,['VERIFICATION_ADMIN'],c.country);if(c.state!=='PENDING')deny(409);await currentCase(ctx,c);
    const rid=text(v.reviewerId),qid=uuid(v.qualificationId);await independent(tx,actor.id,c.organization_id,[c.applicant_id,rid]);await independent(tx,rid,c.organization_id,[c.applicant_id,actor.id]);const reviewerRow=await reviewer(tx,rid,c.country,qid);
    await exec(tx,`UPDATE platform_private.verification SET state='UNDER_REVIEW',reviewer_id=$2,assigned_by=$3,reviewer_version=$4,reviewer_revision=$5,assigner_revision=$6,assigner_version=$7,qualification_id=$8::uuid,version=version+1 WHERE id=$1::uuid`,c.id,rid,actor.id,reviewerRow.g.version,revision(reviewerRow.u),revision(actor),ctx.grant?.version??null,qid);await audit(tx,actor.id,'verification',c.id,c.version+1,'REVIEW_ASSIGNED',c.country);return {id:c.id,state:'UNDER_REVIEW',version:c.version+1};
   }
   if(command==='verification.decide'){
    if(c.reviewer_id!==actor.id||c.state!=='UNDER_REVIEW'||typeof v.approve!=='boolean')deny();const config=await currentCase(ctx,c),qualificationExpiry=await currentReview(ctx,c),reason=text(v.reason,500);
    let state='REJECTED',expiry:Date|null=null,register:string|null=null,representation:string|null=null;
    if(v.approve){register=uuid(v.registerId);representation=uuid(v.representationId);const a=await attestation(tx,register,c.id,c.country,'REGISTER',c.digest),b=await attestation(tx,representation,c.id,c.country,'REPRESENTATION',c.digest);
     if(!config.registries.some(r=>r.registrationType===c.claims.registrationType&&r.providerId===a.envelope.providerId&&r.url===a.envelope.sourceUri)||!config.registries.some(r=>r.registrationType===c.claims.registrationType&&r.providerId===b.envelope.providerId&&r.url===b.envelope.sourceUri))deny(409);
     expiry=new Date(Math.min(+a.expires,+b.expires,+qualificationExpiry,+(await now(tx))+config.validityDays*86400000));state='VERIFIED';
    }else if(v.registerId!=null||v.representationId!=null)deny(400);
    await exec(tx,'UPDATE platform_private.verification SET state=$2,reviewed_at=clock_timestamp(),expires_at=$3,reason=$4,register_id=$5::uuid,representation_id=$6::uuid,version=version+1 WHERE id=$1::uuid',c.id,state,expiry,reason,register,representation);await audit(tx,actor.id,'verification',c.id,c.version+1,state,c.country);return {id:c.id,state,version:c.version+1};
   }
   if(command==='verification.revoke'){
    scope(ctx,['VERIFICATION_ADMIN'],c.country);if(!['PENDING','UNDER_REVIEW','VERIFIED'].includes(c.state)||actor.id===c.applicant_id)deny(409);const reason=text(v.reason,500);await exec(tx,"UPDATE platform_private.verification SET state='REVOKED',reason=$2,version=version+1 WHERE id=$1::uuid",c.id,reason);await audit(tx,actor.id,'verification',c.id,c.version+1,'VERIFICATION_REVOKED',c.country);return {id:c.id,state:'REVOKED',version:c.version+1};
   }
   if(command==='verification.recheck'){
    const state=await effective(ctx,c);if(c.state!=='VERIFIED'||state==='VERIFIED')return {id:c.id,state,version:c.version};
    await exec(tx,'UPDATE platform_private.verification SET state=$2,reason=$3,version=version+1 WHERE id=$1::uuid',c.id,state,'Current evidence, scope or authorization no longer valid');await audit(tx,actor.id,'verification',c.id,c.version+1,'RECHECK_'+state,c.country);return {id:c.id,state,version:c.version+1};
   }
  }
  if(command==='audit.list'){
   if(!ctx.founder&&!ctx.grant)deny();const events=await rows(tx,'SELECT * FROM platform_private.event WHERE $1 OR actor_id=$2 OR ($3=\'VERIFICATION_ADMIN\' AND country=ANY($4::text[])) ORDER BY created_at DESC,id LIMIT 101',ctx.founder,actor.id,ctx.grant?.role??'',ctx.grant?.countries??[]);return {events:events.slice(0,100).map(e=>({action:e.action,kind:e.kind,recordId:e.record_id,version:e.version,actorId:e.actor_id,country:e.country,at:e.created_at,detail:e.detail})),partial:events.length>100};
  }
  deny(400);
 });
}
