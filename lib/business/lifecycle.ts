import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import { businessDb as prisma } from '@/lib/db-capabilities';
import { getSession } from '@/lib/auth/getSession';
import { BusinessError } from './model';

type Tx = Prisma.TransactionClient;
// Rows are internal only. Responses below use explicit field projections.
interface Row {
 id: string; subject: string; tenant: string; asset: string; version: number; identity_revision: number;
 principal: string; party: string; scope: string; source: string; reviewer: string; assignment: string;
 membership_version: number; organization_version: number; account_revision: string;
 state: string; role: string; status: string; userId: string; emailVerifiedAt: Date | null;
 startsAt: Date; endsAt: Date | null; starts_at: Date; ends_at: Date | null;
 created_at: Date; expires_at: Date; reviewed_at: Date; revoked_at: Date | null;
 from_party: string; to_party: string; proposer: string; receiver: string; from_authority: string; to_authority: string;
 relation: string; terms: string; subject_version: number; actor: string; authority: string; authority_version: number;
 counterparty: string; kind: string; declared_at: Date; freshness_until: Date; terminal_at: Date | null;
 declaration_version: number; finance: string; contact: string; confirmed_at: Date;
 recipient: string; recipient_party: string; recipient_membership_version: number; recipient_organization_version: number;
 recipient_account_revision: string; giver: string; purpose: string; fields: string[]; event_kinds: string[]; history_from: Date;
 raised_by: string; next_review_at: Date; release_requested_by: string; released_at: Date; record_class: string; record_id: string;
 action: string; occurred_at: Date; result_id: string; result_version: number; digest: string; available: boolean;
 name: string; category: string; brand: string | null; model: string | null; serialNumber: string | null;
 necessity_review_at: Date;
 account_epoch: string; reviewer_revision: string;
 contract_reference: string; reference: string;
 identityRevision: number; lifecycleState: string; case_id: string; assigned_by: string;
 assigned_revision: string | null;
}
type Input = Record<string, unknown>;
const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const hash = (v: unknown) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const fail = (status = 404): never => { throw new BusinessError(status); };
const str = (v: unknown, max = 100): string => typeof v === 'string' && v.length > 0 && v.length <= max ? v : fail(400);
const uuid = (v: unknown) => uuidPattern.test(str(v)) ? v as string : fail(400);
const date = (v: unknown) => { const d = new Date(str(v)); return Number.isFinite(+d) ? d : fail(400); };
const choice = (v: unknown, allowed: string[]) => allowed.includes(str(v)) ? v as string : fail(400);
function keys(i: Input, allowed: string[]) { if (Object.keys(i).some(k => !allowed.includes(k))) fail(400); }
function list(v: unknown, allowed: string[], empty = false): string[] {
 if (!Array.isArray(v) || (!empty && !v.length) || v.length > allowed.length || new Set(v).size !== v.length || v.some(x => typeof x !== 'string' || !allowed.includes(x))) fail(400);
 return v as string[];
}
const rows = (tx: Tx, sql: string, ...args: unknown[]) => tx.$queryRawUnsafe<Row[]>(sql, ...args);
const one = async (tx: Tx, sql: string, ...args: unknown[]) => (await rows(tx, sql, ...args))[0] ?? fail();
const execute = (tx: Tx, sql: string, ...args: unknown[]) => tx.$executeRawUnsafe(sql, ...args);
const now = async (tx: Tx) => (await tx.$queryRaw<{now: Date}[]>`SELECT clock_timestamp() now`)[0].now;
const hours = (d: Date, h: number) => new Date(+d + h * 3600000);
type Table = 'subject'|'source'|'authority'|'relation'|'transfer'|'finance'|'grant_access'|'hold';
async function get(tx: Tx, table: Table, id: string, subject?: string) {
 const row = await one(tx, `SELECT * FROM business_private.${table} WHERE id=$1::uuid`, uuid(id));
 if (subject && row.subject !== subject) fail();
 return row;
}
async function event(tx: Tx, subject: string, id: string, version: number, action: string, actor: string) {
 await execute(tx, 'INSERT INTO business_private.event(id,subject,record_id,version,action,actor) VALUES($1::uuid,$2::uuid,$3::uuid,$4,$5,$6)',randomUUID(),subject,id,version,action,actor);
}
async function changed(tx: Tx, table: Table, row: Row, changes: Record<string, unknown>, action: string, actor: string) {
 // Column names come exclusively from server-side literals at call sites.
 const fields = Object.keys(changes), values = Object.values(changes);
 const result = await one(tx, `UPDATE business_private.${table} SET ${fields.map((f,n)=>`${f}=$${n+1}${f==='assignment'?'::uuid':''}`).join(',')},version=version+1 WHERE id=$${values.length+1}::uuid AND version=$${values.length+2} RETURNING *`,...values,row.id,row.version);
 await event(tx,row.subject || row.id,row.id,result.version,action,actor); return result;
}
function revision(u: Row) { return hash([u.id,u.emailVerifiedAt?.toISOString(),u.role,u.account_epoch]); }
async function account(tx: Tx, id: string) {
 const u = await one(tx,'SELECT id,role::text,"emailVerifiedAt",xmin::text AS account_epoch FROM public."User" WHERE id=$1 FOR SHARE',id);
 if (!u.emailVerifiedAt) fail(); // New business powers always require verified accounts.
 return u;
}
async function member(tx: Tx, party: string, user: string, clock: Date) {
 const org = await one(tx,'SELECT * FROM public."Organization" WHERE id=$1::uuid',party);
 const m = await one(tx,'SELECT * FROM public."OrganizationMembership" WHERE "organizationId"=$1::uuid AND "userId"=$2',party,user);
 if (org.status !== 'ACTIVE' || m.status !== 'ACTIVE' || m.startsAt > clock || m.endsAt !== null || !['ORG_ADMIN','IMPORTER','VIEWER'].includes(m.role)) fail();
 return {org,m};
}
async function independent(tx: Tx, reviewer: string, parties: string[], actors: string[], clock: Date) {
 const u = await account(tx,reviewer);
 if (u.role !== 'admin' || actors.includes(reviewer)) fail();
 const conflicts = await rows(tx,'SELECT * FROM public."OrganizationMembership" WHERE "userId"=$1 AND "organizationId"=ANY($2::uuid[]) AND status=$3 AND "startsAt"<=$4 AND ("endsAt" IS NULL OR "endsAt">$4)',reviewer,parties,'ACTIVE',clock);
 if (conflicts.length) fail();
}
async function assignment(tx: Tx, id: string, subject: string, caseId: string, kind: string, actor: string, clock: Date, parties: string[], actors: string[]) {
 if(kind==='AUTHORITY')actors=[...actors,...(await rows(tx,"SELECT actor FROM business_private.event WHERE subject=$1::uuid AND record_id=$2::uuid AND action='AUTHORITY_REQUESTED'",subject,caseId)).map(e=>e.actor)];
 const a = await one(tx,'SELECT * FROM business_private.assignment WHERE id=$1::uuid',uuid(id));
 if(a.subject!==subject || a.case_id!==caseId || a.kind!==kind || a.reviewer!==actor || a.revoked_at || a.expires_at<=clock) fail();
 if((await account(tx,actor)).account_epoch!==a.reviewer_revision)fail();
 if(a.assigned_revision){
  const issuer=await account(tx,a.assigned_by);
  if(issuer.account_epoch!==a.assigned_revision)fail();
  await independent(tx,a.assigned_by,parties,[...actors,actor],clock);
 }
 await independent(tx,actor,parties,actors,clock); return a;
}
async function source(tx: Tx, id: string, subject: string, kind: string) {
 const s=await get(tx,'source',id,subject);if(!s.available || s.kind!==kind) fail(409); return s;
}
async function authority(tx: Tx, id: string, subject: Row, scope: string, principal?: string) {
 const a=await get(tx,'authority',id,subject.id), clock=await now(tx);
 if(a.state!=='ACTIVE'||a.revoked_at||a.expires_at<=clock||a.reviewed_at>clock||a.scope!==scope||(principal&&a.principal!==principal)||a.identity_revision!==subject.identity_revision) fail();
 const u=await account(tx,a.principal), {org,m}=await member(tx,a.party,a.principal,clock);
 if(a.membership_version!==m.version||a.organization_version!==org.version||a.account_revision!==revision(u)) fail();
 await source(tx,a.source,subject.id,'AUTHORITY');
 await assignment(tx,a.assignment,subject.id,a.id,'AUTHORITY',a.reviewer,clock,[subject.tenant,a.party],[a.principal]);
 if(a.expires_at<=await now(tx))fail();
 return a;
}
async function blocked(tx: Tx, subject: string) {
 const holds=await rows(tx,"SELECT id FROM business_private.hold WHERE subject=$1::uuid AND state IN ('PROPOSED','ACTIVE','RELEASE_PENDING')",subject);
 const finances=await rows(tx,"SELECT id FROM business_private.finance WHERE subject=$1::uuid AND state IN ('DECLARED','DISPUTED')",subject);
 // No automatic compatibility/ranking inference: unresolved declarations block.
 if(holds.length||finances.length) fail(409);
}

async function transaction<T>(subjectId: string, fn: (tx: Tx,s: Row,actor: Row)=>Promise<T>): Promise<T> {
 uuid(subjectId);
 const session=await getSession();if(!session.isAuthenticated) fail(401);const actorId=session.user?.id??fail(401);
 // The runtime is intentionally unavailable outside this exact synthetic candidate.
 const db=new URL(process.env.ER_BUSINESS_DATABASE_URL??'http://disabled');
 if(process.env.ER_LIFECYCLE_SYNTHETIC!=='1'||db.hostname!=='127.0.0.1'||db.port!=='55480'||db.pathname!=='/synthetic_business'||db.username!=='business_reader') fail();
 for(let attempt=0;attempt<3;attempt++)try {
  return await prisma.$transaction(async tx=>{
   const actor=await account(tx,actorId);
   // Subject writers serialize before taking the existing organization locks.
   // Existing writers never lock business subjects; bounded deadlock retry below.
   const s=await one(tx,'SELECT * FROM business_private.subject WHERE id=$1::uuid FOR UPDATE',subjectId);
   const parties=await rows(tx,`SELECT tenant AS id FROM business_private.subject WHERE id=$1::uuid UNION SELECT party AS id FROM business_private.authority WHERE subject=$1::uuid UNION SELECT recipient_party AS id FROM business_private.grant_access WHERE subject=$1::uuid UNION SELECT counterparty AS id FROM business_private.finance WHERE subject=$1::uuid ORDER BY id`,s.id);
   for(const p of parties){const org=await one(tx,'SELECT id,status FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',p.id);if(org.status!=='ACTIVE')fail();}
   const asset=await one(tx,'SELECT * FROM public."PrivateImportedAsset" WHERE id=$1::uuid AND "organizationId"=$2::uuid',s.asset,s.tenant);
   if(asset.lifecycleState!=='IMPORTED_PRIVATE'||asset.identityRevision!==s.identity_revision) fail();
   return fn(tx,s,actor);
  },{maxWait:5000,timeout:15000});
 } catch(e) {
  if(e instanceof BusinessError)throw e;
  const code=(e as {code?:string;meta?:{code?:string}}).meta?.code;
  if(attempt<2&&(code==='40P01'||code==='40001'||(e as {code?:string}).code==='P2034'))continue;
  throw new BusinessError(503);
 }
 return fail(503);
}

const commandFields: Record<string,string[]> = {
 'source.register':['kind','reference','digest'], 'source.revoke':['id'],
 'review.assign':['kind','caseId','reviewer','expiresAt'], 'review.revoke':['id'],
 'authority.nominate':['authority','principal','party','source'],
 'authority.request':['party','scope','source'], 'authority.review':['id','assignment','approve'], 'authority.revoke':['id'],
 'relation.open':['authority'], 'relation.close':['id','authority'], 'relation.reviewNecessity':['id','assignment','source'],
 'transfer.propose':['authority','receiverAuthority','source'], 'transfer.accept':['id','terms'],
 'transfer.review':['id','assignment','approve'], 'transfer.complete':['id','terms'], 'transfer.cancel':['id'],
 'finance.declare':['authority','counterparty','kind','contractReference','source','startsAt','endsAt'],
 'finance.withdraw':['id','authority'], 'finance.dispute':['id','authority'], 'finance.confirm':['id','assignment','source','contact','expiresAt'], 'finance.revoke':['id'],
 'grant.propose':['authority','recipient','recipientParty','purpose','fields','eventKinds','historyFrom','startsAt','expiresAt'],
 'grant.accept':['id','terms'], 'grant.revoke':['id'],
 'hold.propose':['recordClass','recordId','reason','caseReference'], 'hold.approve':['id','assignment'],
 'hold.review':['id','assignment'], 'hold.releaseRequest':['id'], 'hold.release':['id','assignment'],
};
export async function businessCommand(subjectId: string, command: string, operation: string, input: Input) {
 uuid(operation);if(!Object.hasOwn(commandFields,command))fail(400);
 keys(input,[...commandFields[command],'expectedVersion']);
 if(!Number.isSafeInteger(input.expectedVersion)||Number(input.expectedVersion)<0)fail(400);
 return transaction(subjectId,async(tx,s,actor)=>{
  const digest=hash([command,Object.entries(input).sort(([a],[b])=>a.localeCompare(b))]);
  // A receipt never bypasses live authorization. Replays are only disclosed to
  // their originating actor, while current tenant membership remains valid.
  const old=(await rows(tx,'SELECT * FROM business_private.receipt WHERE actor=$1 AND operation=$2::uuid',actor.id,operation))[0];
  if(old){if(old.subject!==s.id||old.digest!==digest)fail(409);if(hours(old.created_at,720)<=await now(tx))fail();await replayAccess(tx,s,actor.id);return {id:old.result_id,version:old.result_version,replayed:true};}
  const clock=await now(tx), id=randomUUID(); let result: Row;
  const expected=(r:Row)=>{if(r.version!==input.expectedVersion)fail(409);};
  const target=async(t:Table)=>{const r=await get(tx,t,uuid(input.id),s.id);expected(r);return r;};
  if(command==='source.register'){
   expected(s);await independent(tx,actor.id,[s.tenant],[],clock);
   const kind=choice(input.kind,['AUTHORITY','TRANSFER','FINANCE','CONTACT','HOLD']);
   const reference=str(input.reference),digest=str(input.digest);
   if(!/^SYNTHETIC:[A-Za-z0-9:_-]{1,80}$/.test(reference)||!/^[a-f0-9]{64}$/.test(digest))fail(400);
   result=await one(tx,'INSERT INTO business_private.source(id,subject,reference,digest,kind) VALUES($1::uuid,$2::uuid,$3,$4,$5) RETURNING *',id,s.id,reference,digest,kind);
   await event(tx,s.id,id,0,'SYNTHETIC_SOURCE_PROVISIONED',actor.id);
  }else if(command==='source.revoke'){
   await independent(tx,actor.id,[s.tenant],[],clock);
   const src=await target('source');if(!src.available)fail(409);
   result=await changed(tx,'source',src,{available:false},'SOURCE_REVOKED',actor.id);
  }else if(command==='review.assign'){
   expected(s);const kind=choice(input.kind,['AUTHORITY','TRANSFER','FINANCE','HOLD','RELATION']);
   const table={AUTHORITY:'authority',TRANSFER:'transfer',FINANCE:'finance',HOLD:'hold',RELATION:'relation'}[kind] as Table;
   const record=await get(tx,table,uuid(input.caseId),s.id);
   const parties=[s.tenant,...[record.party,record.from_party,record.to_party,record.counterparty].filter(Boolean)];
   const actors=[record.principal,record.proposer,record.receiver,record.actor,record.raised_by,record.release_requested_by].filter(Boolean);
   if(kind==='AUTHORITY')actors.push(...(await rows(tx,"SELECT actor FROM business_private.event WHERE subject=$1::uuid AND record_id=$2::uuid AND action='AUTHORITY_REQUESTED'",s.id,record.id)).map(e=>e.actor));
   const reviewer=str(input.reviewer,200),expires=date(input.expiresAt);
   if(expires<=clock||expires>hours(clock,720))fail(400);
   await independent(tx,actor.id,parties,[...actors,reviewer],clock);
   await independent(tx,reviewer,parties,[...actors,actor.id],clock);
   const u=await account(tx,reviewer);
   await execute(tx,'INSERT INTO business_private.assignment(id,subject,reviewer,kind,case_id,assigned_by,reviewer_revision,assigned_revision,expires_at) VALUES($1::uuid,$2::uuid,$3,$4,$5::uuid,$6,$7,$8,$9)',id,s.id,reviewer,kind,record.id,actor.id,u.account_epoch,actor.account_epoch,expires);
   await event(tx,s.id,id,0,'REVIEW_ASSIGNED',actor.id);result={id,version:0} as Row;
  }else if(command==='review.revoke'){
   expected(s);const a=await one(tx,'SELECT * FROM business_private.assignment WHERE id=$1::uuid AND subject=$2::uuid',uuid(input.id),s.id);
   if(a.assigned_by!==actor.id||actor.role!=='admin'||a.revoked_at)fail();
   await execute(tx,'UPDATE business_private.assignment SET revoked_at=$2 WHERE id=$1::uuid',a.id,clock);
   await event(tx,s.id,a.id,1,'REVIEW_REVOKED',actor.id);result={id:a.id,version:1} as Row;
  }else if(command==='authority.nominate'){
   expected(s);const sponsor=await authority(tx,uuid(input.authority),s,'TRANSFER_PROPOSE',actor.id);
   const relation=await one(tx,'SELECT * FROM business_private.relation WHERE subject=$1::uuid AND ends_at IS NULL',s.id);
   if(relation.party!==sponsor.party)fail();
   const party=uuid(input.party),principal=str(input.principal,200);
   if(party===sponsor.party||principal===actor.id)fail(400);
   await one(tx,'SELECT id FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',party);
   const recipient=await account(tx,principal),{org,m}=await member(tx,party,principal,clock);
   await source(tx,uuid(input.source),s.id,'AUTHORITY');
   // Nomination is pending only. It grants no rights and cannot accept a transfer.
   // Independent review and the recipient's exact transfer acceptance remain required.
   result=await one(tx,`INSERT INTO business_private.authority(id,subject,principal,party,scope,source,membership_version,organization_version,identity_revision,account_revision) VALUES($1::uuid,$2::uuid,$3,$4::uuid,'TRANSFER_ACCEPT',$5::uuid,$6,$7,$8,$9) RETURNING *`,id,s.id,principal,party,input.source,m.version,org.version,s.identity_revision,revision(recipient));
   await event(tx,s.id,id,0,'AUTHORITY_REQUESTED',actor.id);
  }else if(command==='authority.request'){
   expected(s);const party=uuid(input.party), scope=choice(input.scope,['TRANSFER_PROPOSE','TRANSFER_ACCEPT','FINANCE_DECLARE','GRANT_ACCESS']);
   await one(tx,'SELECT id FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',party);
   const {org,m}=await member(tx,party,actor.id,clock);await source(tx,uuid(input.source),s.id,'AUTHORITY');
   // Current reviewed relation parties can request renewed mandates after a
   // transfer invalidates the old ones. This creates no automatic authority.
   const currentParty=(await rows(tx,'SELECT party FROM business_private.relation WHERE subject=$1::uuid AND ends_at IS NULL',s.id))[0]?.party;
   if(party!==s.tenant&&party!==currentParty&&!await hasInvitation(tx,s.id,actor.id))fail();
   result=await one(tx,`INSERT INTO business_private.authority(id,subject,principal,party,scope,source,membership_version,organization_version,identity_revision,account_revision) VALUES($1::uuid,$2::uuid,$3,$4::uuid,$5,$6::uuid,$7,$8,$9,$10) RETURNING *`,id,s.id,actor.id,party,scope,input.source,m.version,org.version,s.identity_revision,revision(actor));
   await event(tx,s.id,id,0,'AUTHORITY_REQUESTED',actor.id);
  }else if(command==='authority.review'){
   const a=await target('authority');if(a.state!=='PENDING'||hours(a.created_at,168)<=clock||typeof input.approve!=='boolean')fail(409);
   await assignment(tx,uuid(input.assignment),s.id,a.id,'AUTHORITY',actor.id,clock,[s.tenant,a.party],[a.principal]);
   const u=await account(tx,a.principal),{org,m}=await member(tx,a.party,a.principal,clock);await source(tx,a.source,s.id,'AUTHORITY');
   if(a.membership_version!==m.version||a.organization_version!==org.version||a.account_revision!==revision(u))fail();
   result=await changed(tx,'authority',a,{state:input.approve?'ACTIVE':'REJECTED',reviewer:actor.id,assignment:input.assignment,reviewed_at:clock,expires_at:hours(clock,720)},'AUTHORITY_REVIEWED',actor.id);
  }else if(command==='authority.revoke'){
   const a=await target('authority');if(actor.id!==a.principal&&actor.id!==a.reviewer)fail();
   result=await changed(tx,'authority',a,{state:'REVOKED',revoked_at:clock},'AUTHORITY_REVOKED',actor.id);
   await revokeGrants(tx,s.id,actor.id,clock,a.id);
  }else if(command==='relation.open'){
   expected(s);const a=await authority(tx,uuid(input.authority),s,'TRANSFER_PROPOSE',actor.id);
   if(a.party!==s.tenant||(await rows(tx,'SELECT id FROM business_private.relation WHERE subject=$1::uuid',s.id)).length)fail(409);
   await blocked(tx,s.id);
   result=await one(tx,'INSERT INTO business_private.relation(id,subject,party,authority,starts_at) VALUES($1::uuid,$2::uuid,$3::uuid,$4::uuid,$5) RETURNING *',id,s.id,a.party,a.id,clock);
   await event(tx,s.id,id,0,'RELATION_OPENED',actor.id);await changed(tx,'subject',s,{identity_revision:s.identity_revision},'SUBJECT_RELATION_CHANGED',actor.id);
  }else if(command==='relation.reviewNecessity'){
   const r=await target('relation');if(r.ends_at)fail(409);
   await assignment(tx,uuid(input.assignment),s.id,r.id,'RELATION',actor.id,clock,[s.tenant,r.party],[]);await source(tx,uuid(input.source),s.id,'AUTHORITY');
   result=await changed(tx,'relation',r,{necessity_review_at:clock},'RELATION_NECESSITY_REVIEWED',actor.id);
  }else if(command==='relation.close'){
   const r=await target('relation'),a=await authority(tx,uuid(input.authority),s,'TRANSFER_PROPOSE',actor.id);
   if(r.party!==a.party||r.ends_at)fail();await blocked(tx,s.id);
   if((await rows(tx,"SELECT id FROM business_private.transfer WHERE subject=$1::uuid AND state IN ('PROPOSED','REVIEWED')",s.id)).length)fail(409);
   result=await changed(tx,'relation',r,{ends_at:clock},'RELATION_CLOSED',actor.id);await revokeGrants(tx,s.id,actor.id,clock);await changed(tx,'subject',s,{identity_revision:s.identity_revision},'SUBJECT_RELATION_CHANGED',actor.id);
  }else if(command==='transfer.propose'){
   expected(s);const a=await authority(tx,uuid(input.authority),s,'TRANSFER_PROPOSE',actor.id),b=await authority(tx,uuid(input.receiverAuthority),s,'TRANSFER_ACCEPT');
   if(a.party===b.party||a.principal===b.principal)fail(409);await source(tx,uuid(input.source),s.id,'TRANSFER');await blocked(tx,s.id);
   const r=await one(tx,'SELECT * FROM business_private.relation WHERE subject=$1::uuid AND ends_at IS NULL',s.id);if(r.party!==a.party)fail();
   // Expired proposals are terminalized transactionally; no scheduler required.
   for(const p of await rows(tx,"SELECT * FROM business_private.transfer WHERE subject=$1::uuid AND state IN ('PROPOSED','REVIEWED') AND expires_at<=$2",s.id,clock))await changed(tx,'transfer',p,{state:'CANCELLED',terminal_at:p.expires_at},'TRANSFER_EXPIRED',actor.id);
   const terms=hash([s.id,s.version,r.id,a.id,a.version,b.id,b.version,input.source,'57.1']);
   result=await one(tx,`INSERT INTO business_private.transfer(id,subject,relation,from_party,to_party,proposer,receiver,from_authority,to_authority,source,terms,subject_version,created_at,expires_at) VALUES($1::uuid,$2::uuid,$3::uuid,$4::uuid,$5::uuid,$6,$7,$8::uuid,$9::uuid,$10::uuid,$11,$12,$13,$14) RETURNING *`,id,s.id,r.id,a.party,b.party,a.principal,b.principal,a.id,b.id,input.source,terms,s.version,clock,hours(clock,168));await event(tx,s.id,id,0,'TRANSFER_PROPOSED',actor.id);
  }else if(command.startsWith('transfer.')){
   const p=await target('transfer');if(!['PROPOSED','REVIEWED'].includes(p.state)||p.expires_at<=clock)fail(409);
   if(command==='transfer.cancel'){
    if(![p.proposer,p.receiver].includes(actor.id))fail();await member(tx,actor.id===p.proposer?p.from_party:p.to_party,actor.id,clock);result=await changed(tx,'transfer',p,{state:'CANCELLED',terminal_at:clock},'TRANSFER_CANCELLED',actor.id);
   }else{
    const a=await authority(tx,p.from_authority,s,'TRANSFER_PROPOSE'),b=await authority(tx,p.to_authority,s,'TRANSFER_ACCEPT');
    if(p.subject_version!==s.version)fail(409);await source(tx,p.source,s.id,'TRANSFER');await blocked(tx,s.id);
    if(command==='transfer.accept'){
     if(input.terms!==p.terms||![p.proposer,p.receiver].includes(actor.id))fail();
     await execute(tx,'INSERT INTO business_private.acceptance(transfer,party,actor,terms,accepted_at) VALUES($1::uuid,$2,$3,$4,$5)',p.id,actor.id===p.proposer?'FROM':'TO',actor.id,p.terms,clock);
     result=await changed(tx,'transfer',p,{state:'PROPOSED'},'TRANSFER_ACCEPTED',actor.id);
    }else{
     const accepts=await rows(tx,'SELECT * FROM business_private.acceptance WHERE transfer=$1::uuid AND terms=$2',p.id,p.terms);if(accepts.length!==2)fail(409);
     if(command==='transfer.review'){
      if(typeof input.approve!=='boolean')fail(400);await assignment(tx,uuid(input.assignment),s.id,p.id,'TRANSFER',actor.id,clock,[s.tenant,a.party,b.party],[a.principal,b.principal]);
      result=await changed(tx,'transfer',p,{state:input.approve?'REVIEWED':'REJECTED',reviewer:actor.id,assignment:input.assignment,terminal_at:input.approve?null:clock},'TRANSFER_REVIEWED',actor.id);
     }else{
      if(p.state!=='REVIEWED'||input.terms!==p.terms||![p.proposer,p.receiver].includes(actor.id))fail();
      await assignment(tx,p.assignment,s.id,p.id,'TRANSFER',p.reviewer,clock,[s.tenant,a.party,b.party],[a.principal,b.principal]);
      if(p.expires_at<=await now(tx)||a.expires_at<=await now(tx)||b.expires_at<=await now(tx))fail(409);
      const r=await get(tx,'relation',p.relation,s.id);if(r.ends_at||r.party!==p.from_party)fail(409);
      await changed(tx,'relation',r,{ends_at:clock},'RELATION_CLOSED',actor.id);
      const nr=randomUUID();await execute(tx,'INSERT INTO business_private.relation(id,subject,party,authority,starts_at) VALUES($1::uuid,$2::uuid,$3::uuid,$4::uuid,$5)',nr,s.id,b.party,b.id,clock);await event(tx,s.id,nr,0,'RELATION_OPENED',actor.id);
      await revokeGrants(tx,s.id,actor.id,clock);await changed(tx,'subject',s,{identity_revision:s.identity_revision},'SUBJECT_RELATION_CHANGED',actor.id);
      for(const oldAuthority of await rows(tx,"SELECT * FROM business_private.authority WHERE subject=$1::uuid AND state='ACTIVE'",s.id))await changed(tx,'authority',oldAuthority,{state:'REVOKED',revoked_at:clock},'AUTHORITY_RELATION_CHANGED',actor.id);
      result=await changed(tx,'transfer',p,{state:'COMPLETED',terminal_at:clock},'TRANSFER_COMPLETED',actor.id);
     }
    }
   }
  }else if(command==='finance.declare'){
   expected(s);const a=await authority(tx,uuid(input.authority),s,'FINANCE_DECLARE',actor.id),cp=uuid(input.counterparty);
   await one(tx,'SELECT id FROM public."Organization" WHERE id=$1::uuid AND status=$2 FOR UPDATE',cp,'ACTIVE');await source(tx,uuid(input.source),s.id,'FINANCE');
   const start=date(input.startsAt),end=input.endsAt===null?null:date(input.endsAt);if(end&&end<=start)fail(400);
   const ref=str(input.contractReference);if(!/^[A-Za-z0-9:_-]+$/.test(ref))fail(400);
   result=await one(tx,`INSERT INTO business_private.finance(id,subject,actor,party,counterparty,authority,kind,contract_reference,source,starts_at,ends_at,declared_at,freshness_until) VALUES($1::uuid,$2::uuid,$3,$4::uuid,$5::uuid,$6::uuid,$7,$8,$9::uuid,$10,$11,$12,$13) RETURNING *`,id,s.id,actor.id,a.party,cp,a.id,choice(input.kind,['FINANCE','LEASE']),ref,input.source,start,end,clock,hours(clock,2160));await event(tx,s.id,id,0,'FINANCE_DECLARED',actor.id);
  }else if(command.startsWith('finance.')){
   const f=await target('finance');
   if(command==='finance.withdraw'||command==='finance.dispute'){
    if(actor.id!==f.actor||!['DECLARED','DISPUTED'].includes(f.state))fail();
    const a=await authority(tx,input.authority?uuid(input.authority):f.authority,s,'FINANCE_DECLARE',actor.id);if(a.party!==f.party)fail();
    result=await changed(tx,'finance',f,{state:command==='finance.withdraw'?'WITHDRAWN':'DISPUTED',terminal_at:command==='finance.withdraw'?clock:null},command==='finance.withdraw'?'FINANCE_WITHDRAWN':'FINANCE_DISPUTED',actor.id);
   }else if(command==='finance.confirm'){
    await authority(tx,f.authority,s,'FINANCE_DECLARE');
    if(f.state!=='DECLARED'||f.freshness_until<=clock||(f.ends_at&&f.ends_at<=clock))fail(409);
    await assignment(tx,uuid(input.assignment),s.id,f.id,'FINANCE',actor.id,clock,[s.tenant,f.party,f.counterparty],[f.actor]);await source(tx,uuid(input.source),s.id,'FINANCE');await source(tx,uuid(input.contact),s.id,'CONTACT');
    const end=date(input.expiresAt);if(end<=clock||end>hours(clock,2160)||end>f.freshness_until||(f.ends_at&&end>f.ends_at))fail(400);
    await execute(tx,`INSERT INTO business_private.confirmation(id,finance,declaration_version,reviewer,assignment,source,contact,scope,confirmed_at,expires_at) VALUES($1::uuid,$2::uuid,$3,$4,$5::uuid,$6::uuid,$7::uuid,'CONTRACT_EXISTENCE',$8,$9)`,id,f.id,f.version,actor.id,input.assignment,input.source,input.contact,clock,end);
    await event(tx,s.id,id,0,'FINANCE_CONFIRMED',actor.id);result={...f,id,version:0};
   }else{
    if(actor.id!==f.actor){
     const own=await one(tx,'SELECT * FROM business_private.confirmation WHERE finance=$1::uuid AND reviewer=$2 AND revoked_at IS NULL',f.id,actor.id);
     await assignment(tx,own.assignment,s.id,f.id,'FINANCE',actor.id,clock,[s.tenant,f.party,f.counterparty],[f.actor]);
    }
    await execute(tx,'UPDATE business_private.confirmation SET revoked_at=$1 WHERE finance=$2::uuid AND revoked_at IS NULL',clock,f.id);
    result=await changed(tx,'finance',f,{state:f.state},'FINANCE_CONFIRMATION_REVOKED',actor.id);
   }
  }else if(command==='grant.propose'){
   expected(s);const a=await authority(tx,uuid(input.authority),s,'GRANT_ACCESS',actor.id),recipient=str(input.recipient),party=uuid(input.recipientParty);
   await one(tx,'SELECT id FROM public."Organization" WHERE id=$1::uuid FOR UPDATE',party);const u=await account(tx,recipient),{org,m}=await member(tx,party,recipient,clock);
   const fields=list(input.fields,['name','category','brand','model','serialNumber','status']),events=list(input.eventKinds,['RELATION_OPENED','RELATION_CLOSED','TRANSFER_COMPLETED','FINANCE_DECLARED','FINANCE_WITHDRAWN','FINANCE_CONFIRMED'],true);
   const start=input.startsAt===null?clock:date(input.startsAt),end=date(input.expiresAt),history=input.historyFrom===null?start:date(input.historyFrom);
   if(start<clock||end<=start||end>hours(start,720)||history>start)fail(400);
   const purpose=choice(input.purpose,['INSURANCE_ASSESSMENT','FINANCE_ASSESSMENT']);
   const terms=hash([s.id,s.version,a.id,a.version,recipient,party,m.version,org.version,purpose,fields,events,history,start,end,'57.1']);
   result=await one(tx,`INSERT INTO business_private.grant_access(id,subject,giver,authority,authority_version,recipient,recipient_party,recipient_membership_version,recipient_organization_version,recipient_account_revision,subject_version,purpose,fields,event_kinds,history_from,starts_at,expires_at,terms,created_at) VALUES($1::uuid,$2::uuid,$3,$4::uuid,$5,$6,$7::uuid,$8,$9,$10,$11,$12,$13::text[],$14::text[],$15,$16,$17,$18,$19) RETURNING *`,id,s.id,actor.id,a.id,a.version,recipient,party,m.version,org.version,revision(u),s.version,purpose,fields,events,history,start,end,terms,clock);await event(tx,s.id,id,0,'GRANT_PROPOSED',actor.id);
  }else if(command.startsWith('grant.')){
   const g=await target('grant_access');
   if(command==='grant.revoke'){
    if(![g.giver,g.recipient].includes(actor.id)&&actor.role!=='admin')fail();result=await changed(tx,'grant_access',g,{state:'REVOKED',revoked_at:clock},'GRANT_REVOKED',actor.id);
   }else{
    if(g.state!=='PROPOSED'||input.terms!==g.terms||actor.id!==g.recipient)fail();await validGrant(tx,s,g,actor.id,false);
    result=await changed(tx,'grant_access',g,{state:'ACTIVE',accepted_at:clock},'GRANT_ACCEPTED',actor.id);
   }
  }else{
   if(actor.role!=='admin')fail();
   if(command==='hold.propose'){
    expected(s);const cls=choice(input.recordClass,['RELATION','TRANSFER','FINANCE','GRANT']),table=({RELATION:'relation',TRANSFER:'transfer',FINANCE:'finance',GRANT:'grant_access'} as const)[cls as 'RELATION'];
    await get(tx,table,uuid(input.recordId),s.id);
    // A named case assignment is required even for the first hold actor.
    if(!await hasCaseReview(tx,s.id,actor.id,clock,uuid(input.recordId)))fail();
    const ref=str(input.caseReference);if(!/^[A-Za-z0-9:_-]+$/.test(ref))fail(400);
    result=await one(tx,`INSERT INTO business_private.hold(id,subject,record_class,record_id,reason,case_reference,raised_by,next_review_at,created_at) VALUES($1::uuid,$2::uuid,$3,$4::uuid,$5,$6,$7,$8,$9) RETURNING *`,id,s.id,cls,input.recordId,choice(input.reason,['DISPUTE','INVESTIGATION','LEGAL_OBLIGATION']),ref,actor.id,hours(clock,2160),clock);await event(tx,s.id,id,0,'HOLD_PROPOSED',actor.id);
   }else{
    const h=await target('hold');
    if(command==='hold.releaseRequest'){
     if(h.state!=='ACTIVE'||![h.raised_by,h.reviewer].includes(actor.id))fail();result=await changed(tx,'hold',h,{state:'RELEASE_PENDING',release_requested_by:actor.id},'HOLD_RELEASE_REQUESTED',actor.id);
    }else{
     await assignment(tx,uuid(input.assignment),s.id,h.id,'HOLD',actor.id,clock,[s.tenant],[h.raised_by]);
     if(command==='hold.approve'){
      if(h.state!=='PROPOSED')fail(409);result=await changed(tx,'hold',h,{state:'ACTIVE',reviewer:actor.id,next_review_at:hours(clock,2160)},'HOLD_APPROVED',actor.id);
     }else if(command==='hold.review'){
      if(!['ACTIVE','RELEASE_PENDING'].includes(h.state))fail(409);result=await changed(tx,'hold',h,{next_review_at:hours(clock,2160),reviewer:actor.id},'HOLD_REVIEWED',actor.id);
     }else{
      if(h.state!=='RELEASE_PENDING'||h.release_requested_by===actor.id)fail();result=await changed(tx,'hold',h,{state:'RELEASED',released_at:clock,released_by:actor.id},'HOLD_RELEASED',actor.id);
     }
    }
   }
  }
  await execute(tx,'INSERT INTO business_private.receipt(actor,operation,subject,digest,result_id,result_version) VALUES($1,$2::uuid,$3::uuid,$4,$5::uuid,$6)',actor.id,operation,s.id,digest,result.id,result.version);
  return {id:result.id,version:result.version,replayed:false};
 });
}

async function hasInvitation(tx: Tx, subject: string, user: string) {
 // Historical fixture invitations only. Operational assignments never double as
 // invitations; the current party uses authority.nominate for an exact recipient.
 return (await rows(tx,"SELECT id FROM business_private.assignment WHERE subject=$1::uuid AND assigned_by=$2 AND assigned_revision IS NULL AND kind='AUTHORITY' AND revoked_at IS NULL AND expires_at>clock_timestamp()",subject,user)).length>0;
}
async function hasReviewAccess(tx: Tx, subject: string, user: string, clock: Date) {
 const reviewer=await account(tx,user);if(reviewer.role!=='admin')return false;
 for(const a of await rows(tx,'SELECT * FROM business_private.assignment WHERE subject=$1::uuid AND reviewer=$2 AND revoked_at IS NULL AND expires_at>$3',subject,user,clock)){
  if(a.reviewer_revision!==reviewer.account_epoch)continue;
  if(a.assigned_revision){const issuer=await account(tx,a.assigned_by);if(issuer.role!=='admin'||issuer.account_epoch!==a.assigned_revision)continue;}
  return true;
 }
 return false;
}
async function hasCaseReview(tx:Tx,subject:string,user:string,clock:Date,caseId:string){
 return (await rows(tx,"SELECT id FROM business_private.assignment WHERE subject=$1::uuid AND reviewer=$2 AND revoked_at IS NULL AND expires_at>$3 AND case_id=$4::uuid AND kind='HOLD'",subject,user,clock,caseId)).length>0;
}
async function replayAccess(tx: Tx,s:Row,user:string){
 const clock=await now(tx);
 const owned=await rows(tx,'SELECT * FROM business_private.authority WHERE subject=$1::uuid AND principal=$2',s.id,user);
 for(const a of owned)try{await authority(tx,a.id,s,a.scope,user);return;}catch(e){if(!(e instanceof BusinessError))throw e;}
 if(await hasReviewAccess(tx,s.id,user,clock))return;
 try{await member(tx,s.tenant,user,clock);return;}catch(e){if(!(e instanceof BusinessError))throw e;}
 const grants=await rows(tx,'SELECT * FROM business_private.grant_access WHERE subject=$1::uuid AND recipient=$2',s.id,user);
 for(const g of grants)try{await validGrant(tx,s,g,user);return;}catch(e){if(!(e instanceof BusinessError))throw e;}
 fail();
}
async function revokeGrants(tx:Tx,subject:string,actor:string,clock:Date,authorityId?:string){
 const grants=await rows(tx,"SELECT * FROM business_private.grant_access WHERE subject=$1::uuid AND state<>'REVOKED' AND ($2::uuid IS NULL OR authority=$2::uuid)",subject,authorityId??null);
 for(const g of grants)await changed(tx,'grant_access',g,{state:'REVOKED',revoked_at:clock},'GRANT_REVOKED',actor);
}
async function validGrant(tx:Tx,s:Row,g:Row,recipient:string,active=true){
 const clock=await now(tx);if(g.recipient!==recipient||g.revoked_at||(active&&g.state!=='ACTIVE')||g.expires_at<=clock||(active&&g.starts_at>clock)||g.subject_version!==s.version)fail();
 const a=await authority(tx,g.authority,s,'GRANT_ACCESS',g.giver);if(a.version!==g.authority_version)fail();
 const u=await account(tx,recipient),{org,m}=await member(tx,g.recipient_party,recipient,clock);
 if(m.version!==g.recipient_membership_version||org.version!==g.recipient_organization_version||revision(u)!==g.recipient_account_revision)fail();
 if(g.expires_at<=await now(tx)||a.expires_at<=await now(tx))fail();
 return clock;
}

export async function readExternal(subjectId:string,grantId:string,purpose:string){
 const result=await transaction(subjectId,async(tx,s,actor)=>{
  const g=await get(tx,'grant_access',uuid(grantId),s.id);let allowed=true;
  try{await validGrant(tx,s,g,actor.id);if(purpose!==g.purpose)fail();}catch(e){if(!(e instanceof BusinessError))throw e;allowed=false;}
  // Do not record guessed foreign IDs against another recipient's grant.
  if(g.recipient===actor.id)await execute(tx,'INSERT INTO business_private.read_audit(id,grant_id,subject,grant_version,recipient,purpose,decision,reason) VALUES($1::uuid,$2::uuid,$3::uuid,$4,$5,$6,$7,$8)',randomUUID(),g.id,s.id,g.version,actor.id,g.purpose,allowed?'ALLOW':'DENY',allowed?'AUTHORIZED':'DENIED');
  if(!allowed)return null;
  const asset=await one(tx,'SELECT "assetName" AS name,category,brand,model,"serialNumber" FROM public."PrivateImportedAsset" WHERE id=$1::uuid AND "organizationId"=$2::uuid',s.asset,s.tenant);
  const all:Record<string,unknown>={name:asset.name,category:asset.category,brand:asset.brand,model:asset.model,serialNumber:asset.serialNumber,status:'Privé-asset; registratie, juridische eigendom, dekking en incidentstatus niet vastgesteld'};
  const events=await rows(tx,'SELECT id,action,occurred_at FROM business_private.visible_events($1::uuid,clock_timestamp()) WHERE action=ANY($2::text[]) AND occurred_at>=$3 ORDER BY occurred_at DESC,id DESC LIMIT 101',s.id,g.event_kinds,g.history_from);
  // Bounded latest snapshot, no cursor that could widen or preserve access.
  return {asOf:(await now(tx)).toISOString(),grantVersion:g.version,purpose:g.purpose,asset:Object.fromEntries(g.fields.map(f=>[f,all[f]])),timeline:events.slice(0,100).map(e=>({id:e.id,action:e.action,recordedAt:e.occurred_at})),partial:events.length>100};
 });return result??fail();
}

export async function readLifecycle(subjectId:string,view:string){
 choice(view,['rental','insurance','finance']);
 return transaction(subjectId,async(tx,s,actor)=>{
  const clock=await now(tx),{m}=await member(tx,s.tenant,actor.id,clock);
  const asset=await one(tx,'SELECT "assetName" AS name,category,brand,model FROM public."PrivateImportedAsset" WHERE id=$1::uuid',s.asset);
  const relations=await rows(tx,"SELECT *,ends_at+interval '24 months' AS expires_at FROM business_private.relation WHERE subject=$1::uuid AND (ends_at IS NULL OR ends_at+interval '24 months'>$2) ORDER BY starts_at DESC LIMIT 100",s.id,clock);
  const finances=await rows(tx,"SELECT * FROM business_private.finance WHERE subject=$1::uuid AND COALESCE(terminal_at,LEAST(ends_at,freshness_until),freshness_until)+interval '24 months'>$2 ORDER BY declared_at DESC LIMIT 100",s.id,clock);
  const finance=[];
  for(const f of finances){
   let confirmed=false;
   for(const c of await rows(tx,'SELECT * FROM business_private.confirmation WHERE finance=$1::uuid AND declaration_version=$2 AND revoked_at IS NULL AND expires_at>$3',f.id,f.version,clock))try{
    await authority(tx,f.authority,s,'FINANCE_DECLARE');await source(tx,f.source,s.id,'FINANCE');await source(tx,c.source,s.id,'FINANCE');await source(tx,c.contact,s.id,'CONTACT');await assignment(tx,c.assignment,s.id,f.id,'FINANCE',c.reviewer,clock,[s.tenant,f.party,f.counterparty],[f.actor]);confirmed=true;
   }catch(e){if(!(e instanceof BusinessError))throw e;}
   finance.push({id:f.id,version:f.version,kind:f.kind,state:f.state,label:f.state!=='DECLARED'?f.state:f.freshness_until<=clock||(f.ends_at&&f.ends_at<=clock)?'Verklaring verouderd; actuele status onbekend':confirmed?'Onafhankelijk bevestigd: uitsluitend bestaan contract':'Door partij verklaard — niet onafhankelijk bevestigd',asOf:f.declared_at,freshnessUntil:f.freshness_until});
  }
  const timeline=m.role==='ORG_ADMIN'?await rows(tx,'SELECT id,action,occurred_at FROM business_private.visible_events($1::uuid,clock_timestamp()) ORDER BY occurred_at DESC LIMIT 101',s.id):[];
  return {subjectId:s.id,version:s.version,view,asOf:clock,asset:{name:asset.name,category:asset.category,brand:asset.brand,model:asset.model},registration:'Geen registratiekoppeling',incident:'Incidentstatus onbekend',coverage:'Dekking niet vastgesteld',relationNotice:'Geregistreerde relatie; juridische eigendom niet zelfstandig vastgesteld',relations:relations.map(r=>({id:r.id,version:r.version,startsAt:r.starts_at,endsAt:r.ends_at})),finance,financeConflict:finances.filter(f=>['DECLARED','DISPUTED'].includes(f.state)).length>1,history:m.role==='ORG_ADMIN'?'available':'restricted',partial:timeline.length>100,timeline:timeline.slice(0,100).map(e=>({id:e.id,action:e.action,recordedAt:e.occurred_at}))};
 });
}

export async function readCase(subjectId:string,tableName:string,id:string){
 const table=choice(tableName,['authority','transfer','finance','grant_access','hold']) as Table;
 return transaction(subjectId,async(tx,s,actor)=>{
  const r=await get(tx,table,uuid(id),s.id),clock=await now(tx);
  const participants=table==='authority'?[r.principal]:table==='transfer'?[r.proposer,r.receiver]:table==='finance'?[r.actor]:table==='grant_access'?[r.giver,r.recipient]:[r.raised_by,r.reviewer];
  if(!participants.includes(actor.id)){
   const kind=({authority:'AUTHORITY',transfer:'TRANSFER',finance:'FINANCE',hold:'HOLD'} as Record<string,string>)[table];if(!kind)fail();
   const a=await one(tx,'SELECT * FROM business_private.assignment WHERE subject=$1::uuid AND case_id=$2::uuid AND reviewer=$3 AND kind=$4 AND revoked_at IS NULL AND expires_at>$5',s.id,r.id,actor.id,kind,clock);
   await assignment(tx,a.id,s.id,r.id,kind,actor.id,clock,[s.tenant,r.party,r.from_party,r.to_party,r.counterparty].filter(Boolean),participants);
  }else if(table==='authority'||table==='finance')await member(tx,r.party,actor.id,clock);
  else if(table==='transfer')await member(tx,actor.id===r.proposer?r.from_party:r.to_party,actor.id,clock);
  else if(table==='grant_access'){
   if(actor.id===r.recipient)await member(tx,r.recipient_party,actor.id,clock);
   else{const a=await get(tx,'authority',r.authority,s.id);await member(tx,a.party,actor.id,clock);}
  }else if(actor.role!=='admin')fail();
  let deadline:Date|null=null;
  if(table==='transfer'&&r.state!=='COMPLETED')deadline=hours(r.terminal_at??r.expires_at,720);
  if(table==='transfer'&&r.state==='COMPLETED'){const previous=await get(tx,'relation',r.relation,s.id);if(previous.ends_at)deadline=calendarMonths(previous.ends_at,24);}
  if(table==='grant_access')deadline=calendarMonths(r.revoked_at??r.expires_at,12);
  if(table==='finance')deadline=calendarMonths(r.terminal_at??(r.ends_at&&r.ends_at<r.freshness_until?r.ends_at:r.freshness_until),24);
  if(table==='authority'&&r.state!=='ACTIVE')deadline=hours(r.revoked_at??hours(r.created_at,168),720);
  if(deadline&&deadline<=clock)fail();
  const evidence=r.source?await get(tx,'source',r.source,s.id):null;
  return {id:r.id,version:r.version,state:r.state,terms:r.terms??null,startsAt:r.starts_at??null,expiresAt:r.expires_at??null,scope:r.scope??null,purpose:r.purpose??null,fields:r.fields??null,eventKinds:r.event_kinds??null,historyFrom:r.history_from??null,
   ...(table==='transfer'?{fromParty:r.from_party,toParty:r.to_party,proposer:r.proposer,receiver:r.receiver,subjectVersion:r.subject_version,relation:r.relation}:{}),
   ...(table==='authority'?{principal:r.principal,party:r.party}:{}),
   ...(table==='finance'?{kind:r.kind,declaringParty:r.party,counterparty:r.counterparty,contractReference:r.contract_reference,contractEnd:r.ends_at,freshnessUntil:r.freshness_until}:{}),
   ...(table==='grant_access'?{recipient:r.recipient,recipientParty:r.recipient_party}:{}),
   sourceReference:evidence?.reference??null,sourceDigest:evidence?.digest??null,sourceAvailable:evidence?.available??null,
   reviewOverdue:table==='hold'&&r.state!=='RELEASED'&&r.next_review_at<=clock,synthetic:true};
 });
}
export function calendarMonths(value:Date,months:number){
 const d=new Date(value),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+months);const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));return d;
}

export async function retentionPreview(subjectId:string,recordClass:string,recordId:string){
 const cls=choice(recordClass,['RELATION','TRANSFER','FINANCE','GRANT']);
 const table=({RELATION:'relation',TRANSFER:'transfer',FINANCE:'finance',GRANT:'grant_access'} as const)[cls as 'RELATION'];
 return transaction(subjectId,async(tx,s,actor)=>{
  const clock=await now(tx);if(actor.role!=='admin'||!await hasCaseReview(tx,s.id,actor.id,clock,uuid(recordId)))fail();
  const r=await get(tx,table,uuid(recordId),s.id);
  const review=await one(tx,"SELECT * FROM business_private.assignment WHERE subject=$1::uuid AND case_id=$2::uuid AND reviewer=$3 AND kind='HOLD' AND revoked_at IS NULL AND expires_at>$4",s.id,r.id,actor.id,clock);
  await assignment(tx,review.id,s.id,r.id,'HOLD',actor.id,clock,[s.tenant,r.party,r.from_party,r.to_party,r.counterparty].filter(Boolean),[r.principal,r.proposer,r.receiver,r.actor].filter(Boolean));
  let deadline:Date|null=null;
  if(cls==='RELATION'&&r.ends_at)deadline=calendarMonths(r.ends_at,24);
  if(cls==='TRANSFER'&&r.state!=='COMPLETED')deadline=hours(r.terminal_at??r.expires_at,720);
  if(cls==='TRANSFER'&&r.state==='COMPLETED'){const previous=await get(tx,'relation',r.relation,s.id);if(previous.ends_at)deadline=calendarMonths(previous.ends_at,24);}
  if(cls==='FINANCE')deadline=calendarMonths(r.terminal_at??(r.ends_at&&r.ends_at<r.freshness_until?r.ends_at:r.freshness_until),24);
  if(cls==='GRANT')deadline=calendarMonths(r.revoked_at??r.expires_at,12);
  const holds=await rows(tx,"SELECT id,state,next_review_at,released_at FROM business_private.hold WHERE subject=$1::uuid AND record_class=$2 AND record_id=$3::uuid",s.id,cls,r.id);
  const active=holds.filter(h=>h.state!=='RELEASED');
  return {id:r.id,recordClass:cls,originalDeadline:deadline,ordinaryReadsClosed:deadline!==null&&deadline<=clock,holdBlocksRemoval:active.length>0,overdueHoldReview:active.some(h=>h.next_review_at<=clock),necessityReviewDue:cls==='RELATION'&&!r.ends_at&&calendarMonths(r.necessity_review_at,12)<=clock,reviewRemovalBy:!active.length&&deadline&&deadline<=clock&&holds.some(h=>h.released_at)?hours(new Date(Math.max(...holds.filter(h=>h.released_at).map(h=>+h.released_at))),168):null,physicalRemovalAvailable:false,backupMaximumHours:720,restoreRequiresReconciliation:true};
 });
}
