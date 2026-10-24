import {createHash,randomUUID} from 'node:crypto';
import {PrismaClient} from '@prisma/client';
import {readFileSync} from 'node:fs';

const canonical=v=>JSON.stringify(v,(_k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
const hash=v=>createHash('sha256').update(canonical(v)).digest('hex');
const revision=u=>hash([u.id,u.emailVerifiedAt?.toISOString(),u.role,u.epoch]);
function fail(){throw new Error('TRUST_CEREMONY_CLOSED')}
function input(v,keys){if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!keys.includes(k)))fail();return v}
export async function founderPlan(db,value){
 const v=input(value,['accountId','evidenceDigest']);if(typeof v.accountId!=='string'||!v.accountId.trim()||v.accountId.length>200||!/^\w{64}$/.test(v.evidenceDigest??'')||!/^[a-f0-9]{64}$/.test(v.evidenceDigest))fail();
 return db.$transaction(async tx=>{
  await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
  const root=await tx.$queryRawUnsafe('SELECT user_id FROM platform_private.founder');if(root.length)fail();
  const users=await tx.$queryRawUnsafe('SELECT id,role::text,"emailVerifiedAt",xmin::text epoch FROM public."User" WHERE id=$1',v.accountId),u=users[0];if(!u?.emailVerifiedAt)fail();
  const plan={kind:'FOUNDER_BINDING',accountId:u.id,accountRevision:revision(u),evidenceDigest:v.evidenceDigest,expiresAt:new Date(Date.now()+15*60000).toISOString(),scope:'IMMUTABLE_EXISTING_ACCOUNT',productionAuthorized:false};return {...plan,planHash:hash(plan)};
 },{isolationLevel:'RepeatableRead'});
}
export async function bindSyntheticFounder(db,value,acknowledgedHash,url){
 const v=input(value,['kind','accountId','accountRevision','evidenceDigest','expiresAt','scope','productionAuthorized','planHash']),{planHash,...plan}=v;
 const target=new URL(url);if(process.env.ER_TRUST_CEREMONY!=='SYNTHETIC_LOCAL_ONLY'||target.protocol!=='postgresql:'||target.hostname!=='127.0.0.1'||target.port!=='55480'||target.pathname!=='/synthetic_business'||target.username!=='trust_operator'||v.kind!=='FOUNDER_BINDING'||v.scope!=='IMMUTABLE_EXISTING_ACCOUNT'||v.productionAuthorized!==false||hash(plan)!==planHash||planHash!==acknowledgedHash||!Number.isFinite(Date.parse(v.expiresAt))||Date.parse(v.expiresAt)<=Date.now()||Date.parse(v.expiresAt)>Date.now()+15*60000)fail();
 return db.$transaction(async tx=>{
  const role=(await tx.$queryRawUnsafe('SELECT current_user role'))[0];if(role.role!=='trust_operator')fail();
  await tx.$queryRawUnsafe('SELECT id FROM platform_private.gate WHERE id=1 FOR UPDATE');
  if((await tx.$queryRawUnsafe('SELECT user_id FROM platform_private.founder')).length)fail();
  const u=(await tx.$queryRawUnsafe('SELECT id,role::text,"emailVerifiedAt",xmin::text epoch FROM public."User" WHERE id=$1 FOR SHARE',v.accountId))[0];if(!u?.emailVerifiedAt||revision(u)!==v.accountRevision)fail();
  await tx.$executeRawUnsafe("INSERT INTO platform_private.founder(id,user_id) VALUES('root',$1)",u.id);
  await tx.$executeRawUnsafe("INSERT INTO platform_private.event(id,kind,record_id,version,action,actor_id,detail) VALUES($1::uuid,'founder','root',0,'SYNTHETIC_FOUNDER_CEREMONY',$2,$3::jsonb)",randomUUID(),u.id,JSON.stringify({planHash,evidenceDigest:v.evidenceDigest,operator:'trust_operator',synthetic:true}));return {bound:true,accountId:u.id,productionAuthorized:false};
 });
}
export async function recoveryPlan(db){return db.$transaction(async tx=>{
 await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');const root=(await tx.$queryRawUnsafe('SELECT f.user_id,u."emailVerifiedAt" FROM platform_private.founder f JOIN public."User" u ON u.id=f.user_id'))[0];if(!root)fail();
 return {kind:'FOUNDER_RECOVERY_REVIEW',accountId:root.user_id,emailVerified:!!root.emailVerifiedAt,automaticRecovery:false,productionAuthorized:false,requirements:['Re-establish the same existing account identity using independently approved recovery evidence.','Restore account access using the reviewed existing authentication procedure; do not rebind Founder or edit User.role.','Reconcile sessions, pending invitations, grants and audit after restoration.','Keep privileged traffic closed until recovery and revocation checks pass.','If the original account cannot be recovered, a separately reviewed migration and identity decision is required.']};
},{isolationLevel:'RepeatableRead'})}

if(process.argv[1]?.replaceAll('\\','/').endsWith('/trust-ceremony.mjs')){
 const db=new PrismaClient();try{const command=process.argv[2];const result=command==='plan-recovery'?await recoveryPlan(db):command==='plan-founder'?await founderPlan(db,JSON.parse(readFileSync(0,'utf8'))):command==='bind-synthetic'?await bindSyntheticFounder(db,JSON.parse(readFileSync(0,'utf8')),process.argv[3],process.env.DATABASE_URL):fail();process.stdout.write(JSON.stringify(result,null,2)+'\n')}catch{process.stderr.write('Trust operation unavailable; no authority or identity is inferred.\n');process.exitCode=1}finally{await db.$disconnect()}
}
