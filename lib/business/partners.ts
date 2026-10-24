import 'server-only';
import {randomUUID} from 'node:crypto';
import type {Prisma} from '@prisma/client';
import {registrationDb,platformDb} from '@/lib/db-capabilities';
import {getSession} from '@/lib/auth/getSession';
import {getLocalizedCountryOptions} from '@/lib/i18n/countries';
import {application,clean,PartnerError,states,type PartnerApplication} from './partner-model';
import {attemptPartnerMail,dispatchPartnerMail} from './partner-mail';
import {partnerSenderStatus} from '@/lib/email/mailer';
type Tx=Prisma.TransactionClient;
export async function submitPartner(input:Record<string,unknown>){
 const {requestId,...fields}=input;
 if(requestId!==undefined&&(typeof requestId!=='string'||!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId)))throw new PartnerError();
 const id=typeof requestId==='string'?requestId:randomUUID();
 const a=application(fields);if(!getLocalizedCountryOptions('en').some(c=>c.code===a.country))throw new PartnerError();
 // The intake capability can INSERT only. It cannot inspect other applications.
 const inserted=await registrationDb.$executeRaw`INSERT INTO portal_private.partner_application(id,company,country,registration,sector,representative,email,purpose) VALUES(${id}::uuid,${a.company},${a.country},${a.registration},${a.sector},${a.representative},${a.email},${a.purpose}) ON CONFLICT DO NOTHING`;
 if(inserted)await attemptPartnerMail(id);
 return {submitted:true};
}
async function admin<T>(fn:(tx:Tx,actor:string)=>Promise<T>){
 const s=await getSession();if(!s.isAuthenticated)throw new PartnerError(401);
 return platformDb.$transaction(async tx=>{
  const users=await tx.$queryRaw<{id:string;role:string;emailVerifiedAt:Date|null}[]>`SELECT id,role::text,"emailVerifiedAt" FROM public."User" WHERE id=${s.user.id} FOR SHARE`;
  if(users[0]?.role!=='admin'||!users[0].emailVerifiedAt)throw new PartnerError(403);
  return fn(tx,users[0].id);
 },{timeout:15000});
}
export async function listPartners(q='',state='',page=1){
 return admin(async tx=>{
  const query=q.trim().slice(0,200),filter=Object.hasOwn(states,state)?state:'';
  const offset=(Math.min(100000,Math.max(1,Math.trunc(page)||1))-1)*20;
  const rows=await tx.$queryRaw<PartnerApplication[]>`SELECT * FROM portal_private.partner_application WHERE (${filter}='' OR state=${filter}) AND (${query}='' OR strpos(lower(company||' '||registration||' '||email||' '||representative),lower(${query}))>0) ORDER BY created_at DESC,id LIMIT 20 OFFSET ${offset}`;
  const totals=await tx.$queryRaw<{n:bigint}[]>`SELECT count(*) n FROM portal_private.partner_application WHERE (${filter}='' OR state=${filter}) AND (${query}='' OR strpos(lower(company||' '||registration||' '||email||' '||representative),lower(${query}))>0)`;
  return {rows:JSON.parse(JSON.stringify(rows)) as PartnerApplication[],total:Number(totals[0].n)};
 });
}
export async function partnerDetail(id:string){
 if(!/^[0-9a-f-]{36}$/i.test(id))throw new PartnerError();
 return admin(async tx=>{
  const rows=await tx.$queryRaw<PartnerApplication[]>`SELECT * FROM portal_private.partner_application WHERE id=${id}::uuid`;
  if(!rows[0])throw new PartnerError(404);
  const events=await tx.$queryRaw`SELECT actor_id,state,note,created_at,version FROM portal_private.partner_event WHERE application_id=${id}::uuid ORDER BY version`;
  const mail=await tx.$queryRaw`SELECT id,version,kind,recipient,status,attempts,provider_id,delivery,checked_at,error_code FROM portal_private.partner_mail WHERE application_id=${id}::uuid ORDER BY version,kind`;
  return JSON.parse(JSON.stringify({application:rows[0],events,mail}));
 });
}
export async function reviewPartner(v:Record<string,unknown>){
 if(Object.keys(v).some(k=>!['id','version','state','note','checks'].includes(k)))throw new PartnerError();
 const id=clean(v.id,36),state=clean(v.state,30),note=clean(v.note,2000);
 if(!/^[0-9a-f-]{36}$/i.test(id)||!Number.isSafeInteger(v.version)||!Object.hasOwn(states,state)||state==='SUBMITTED')throw new PartnerError();
 const checks=v.checks as Record<string,unknown>;
 if(!checks||typeof checks!=='object'||Array.isArray(checks)||Object.keys(checks).some(k=>!['identity','registration','authority','consent'].includes(k))||Object.values(checks).some(x=>typeof x!=='boolean'))throw new PartnerError();
 if(state==='READY'&&!['identity','registration','authority','consent'].every(k=>checks[k]===true))throw new PartnerError();
 const result=await admin(async(tx,actor)=>{
  const a=(await tx.$queryRaw<PartnerApplication[]>`SELECT * FROM portal_private.partner_application WHERE id=${id}::uuid FOR UPDATE`)[0];
  if(!a)throw new PartnerError(404);if(a.version!==v.version||a.state==='READY')throw new PartnerError(409);
  let org=a.organization_id;
  if(state==='READY'){
   const u=(await tx.$queryRaw<{id:string}[]>`SELECT id FROM public."User" WHERE lower(email)=${a.email} AND "emailVerifiedAt" IS NOT NULL FOR SHARE`)[0];
   if(!u||u.id===actor)throw new PartnerError(409);
   // Bind to the EXISTING account, organization and verification pipeline. Never activate.
   org=randomUUID();
   await tx.organization.create({data:{id:org,displayName:a.company,countryCode:a.country}});
   await tx.organizationEvent.create({data:{organizationId:org,actorId:u.id,action:'ORGANIZATION_CREATED',subjectId:org,subjectVersion:0}});
   await tx.$executeRaw`INSERT INTO portal_private.request(organization_id,applicant_id) VALUES(${org}::uuid,${u.id})`;
  }
  await tx.$executeRaw`UPDATE portal_private.partner_application SET state=${state},reviewer_id=${actor},checks=${JSON.stringify(checks)}::jsonb,organization_id=${org}::uuid,version=version+1 WHERE id=${id}::uuid`;
  await tx.$executeRaw`INSERT INTO portal_private.partner_event(application_id,version,actor_id,state,note) VALUES(${id}::uuid,${a.version+1},${actor},${state},${note})`;
  return {saved:true,organizationId:org};
 });
 await attemptPartnerMail(id);
 return result;
}

function partnerId(v:Record<string,unknown>){const id=clean(v.id,36);if(!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id))throw new PartnerError();return id;}
export async function partnerMailAction(v:Record<string,unknown>){
 const id=partnerId(v);await admin(async tx=>{const rows=await tx.$queryRaw`SELECT id FROM portal_private.partner_application WHERE id=${id}::uuid`;if(!Array.isArray(rows)||!rows.length)throw new PartnerError(404);});
 await dispatchPartnerMail(id);return {saved:true};
}
export async function partnerMailHealth(){await admin(async()=>true);return {sender:await partnerSenderStatus()};}
export async function createPartnerTest(){
 const id=await admin(async(tx,actor)=>{const rows=await tx.$queryRaw<{id:string}[]>`SELECT portal_private.partner_create_test(${actor}) id`;return rows[0].id;});
 await attemptPartnerMail(id);return {id};
}
export async function previewPartnerDeletion(v:Record<string,unknown>){
 const id=partnerId(v);return admin(async(tx,actor)=>{const rows=await tx.$queryRaw<{preview:unknown}[]>`SELECT portal_private.partner_delete_preview(${id}::uuid,${actor}) preview`;return rows[0].preview;});
}
export async function deletePartnerTest(v:Record<string,unknown>){
 const id=partnerId(v);if(!Number.isSafeInteger(v.version)||v.confirmation!==`VERWIJDER ${id}`)throw new PartnerError();
 return admin(async(tx,actor)=>{await tx.$queryRaw`SELECT portal_private.partner_delete_test(${id}::uuid,${actor},${v.version as number}::integer,${v.confirmation as string})`;return {deleted:true};});
}
