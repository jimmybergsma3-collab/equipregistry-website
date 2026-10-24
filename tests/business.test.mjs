import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import http from 'node:http';
import business from '../lib/business/model.ts';
import fixtures from '../local-business/fixtures.ts';
import demo from '../local-business/server.ts';
import { loader } from './import-fixtures.mjs';
const { readBusinessAsset } = business;
const { fixtureReader, fixtureStore, organizations } = fixtures;
const { createDemoServer } = demo;

const assetId='aaaaaaaa-aaaa-4aaa-8aaa-000000000001';
const input={organizationId:organizations.a,assetId,view:'rental'};
const denied = status => e => e.status === status && e.message === 'BUSINESS_UNAVAILABLE';
function mutateReader(change, store=fixtureStore()) {const original=fixtureReader('admin',store);return {withSnapshot:(org,read)=>original.withSnapshot(org,s=>{change(s);return read(s);})};}

test('admin gets only factual scoped events in source version order; no reconstructed names',async()=>{
 const store=fixtureStore(),before=JSON.stringify(store),out=await readBusinessAsset(fixtureReader('admin',store),input);
 assert.equal(out.timeline.length,4);assert.deepEqual(out.timeline.map(e=>e.version),[0,1,2,3]);
 assert.equal(out.timeline[0].recordedAt,'2026-10-01T10:00:00.000Z');
 assert.equal(JSON.stringify(store),before);assert(!JSON.stringify(out.timeline).includes('Graafmachine'));
 assert.equal(out.status,'Privé geïmporteerd');assert.equal(out.verification,'Niet vastgesteld');
 assert.match(out.incident,/onbekend/);assert(!Object.hasOwn(out,'owner'));
});
test('importer/viewer have asset access but never query detailed event source',async()=>{
 for(const role of ['importer','viewer']) {const port=fixtureReader(role);const r={withSnapshot:(org,read)=>port.withSnapshot(org,s=>{s.events=()=>assert.fail('forbidden history query');return read(s);})};
 const out=await readBusinessAsset(r,input);assert.equal(out.history,'restricted');assert.deepEqual(out.timeline,[]);}
});
test('workers, external parties and platform admin have no implicit business access',async()=>{
 for(const role of ['worker','insurer','finance','platform','other'])await assert.rejects(readBusinessAsset(fixtureReader(role),input),denied(404));
});
test('anonymous, disabled, revoked, future, ended and closed memberships fail before source read',async()=>{
 for(const [change,status] of [
  [s=>s.access.actorId='',401],[s=>s.access.accountEnabled=false,401],
  [s=>s.access.member.status='REVOKED',404],[s=>s.access.member.startsAt=new Date('2027-01-01'),404],
  [s=>s.access.member.endsAt=new Date('2027-01-01'),404],[s=>s.access.organizationStatus='ARCHIVED',404],
  [s=>s.access.member.userId='foreign',404],[s=>s.access.member.organizationId=organizations.b,404],
  [s=>s.access.now=new Date('invalid'),404]]) {
   await assert.rejects(readBusinessAsset(mutateReader(s=>{change(s);s.asset=()=>assert.fail('unauthorized read');}),input),denied(status));
  }
});
test('foreign IDs and missing assets are indistinguishable; no company/serial lookup',async()=>{
 for(const id of ['aaaaaaaa-aaaa-4aaa-8aaa-000000000004','aaaaaaaa-aaaa-4aaa-8aaa-000000000099'])await assert.rejects(readBusinessAsset(fixtureReader('admin'),{...input,assetId:id}),denied(404));
 await assert.rejects(readBusinessAsset(fixtureReader('admin'),{...input,serialNumber:'DEMO-004'}),denied(400));
 await assert.rejects(readBusinessAsset(fixtureReader('admin'),{...input,organizationId:organizations.b}),denied(404));
});
test('purpose DTOs exclude serial, actor, user, document, storage and source metadata',async()=>{
 const store=fixtureStore();Object.assign(store.assets[0],{ownerEmail:'SECRET',documents:'SECRET',sourceSystem:'SECRET'});store.events[0].actorId='SECRET';
 for(const view of ['rental','insurance','finance']) {const out=await readBusinessAsset(fixtureReader('admin',store),{...input,view});assert(!JSON.stringify(out).includes('SECRET'));
 assert.equal(Object.hasOwn(out.asset,'serialNumber'),view==='rental');assert.equal(Object.hasOwn(out,'coverage'),view==='insurance');assert.equal(Object.hasOwn(out,'finance'),view==='finance');}
});
test('broken source rows, foreign events, duplicate versions and future events fail closed',async()=>{
 for(const change of [e=>e.organizationId=organizations.b,e=>e.subjectId='foreign',e=>e.action='ADMINISTRATION_CHANGED',e=>e.createdAt=new Date('invalid'),e=>e.createdAt=new Date('2027-01-01'),e=>e.subjectVersion=9,e=>e.subjectVersion=1]) {
  await assert.rejects(readBusinessAsset(mutateReader(s=>{const get=s.events;s.events=async id=>{const rows=await get(id);change(rows[0]);return rows;};}),input),denied(503));
 }
 const store=fixtureStore();store.assets[0].lifecycleState='ARCHIVED_PRIVATE';await assert.rejects(readBusinessAsset(fixtureReader('admin',store),input),denied(404));
});
test('no fabricated events for an empty source, and bounded history explicitly marked partial',async()=>{
 const store=fixtureStore();store.events=[];let out=await readBusinessAsset(fixtureReader('admin',store),input);assert.deepEqual(out.timeline,[]);
 store.assets[0].version=105;store.events=Array.from({length:106},(_,i)=>({id:`event-${i}`,organizationId:organizations.a,subjectId:assetId,action:'PRIVATE_ASSET_NAME_CORRECTED',subjectVersion:i,createdAt:new Date('2026-10-02T10:00:00Z')}));
 out=await readBusinessAsset(fixtureReader('admin',store),input);assert.equal(out.history,'partial');assert.equal(out.timeline.length,100);assert.equal(out.timeline[0].version,6);
});
test('revocation before projection delivery and repository faults do not return a stale result',async()=>{
 await assert.rejects(readBusinessAsset(mutateReader(s=>{const get=s.events;s.events=async id=>{const rows=await get(id);s.access.member.status='REVOKED';return rows;};}),input),denied(404));
 await assert.rejects(readBusinessAsset(mutateReader(s=>{s.events=async()=>{throw Error('SECRET DATABASE DETAILS');};}),input),denied(503));
});
test('internal Prisma reader holds account then org lock; scoped selects, no write/legacy queries',async()=>{
 const root=process.cwd(),store=fixtureStore(),queries=[];let membershipRole='ORG_ADMIN',authenticated=true,verified=true;
 const tx={
  $queryRaw:async (parts,...values)=>{const sql=parts.join('?');queries.push({sql,values});if(sql.includes('"User"'))return [{id:'actor',role:'user',emailVerifiedAt:verified?new Date():null}];if(sql.includes('"Organization"'))return [{status:'ACTIVE'}];if(sql.includes('clock_timestamp'))return [{now:new Date('2026-10-09T10:00:00Z')}];assert.fail(sql);},
  organizationMembership:{findUnique:async q=>{assert.deepEqual(q.where.organizationId_userId,{organizationId:organizations.a,userId:'actor'});return {userId:'actor',organizationId:organizations.a,role:membershipRole,status:'ACTIVE',startsAt:new Date('2026-01-01'),endsAt:null};}},
  privateImportedAsset:{findFirst:async q=>{assert.deepEqual(q.where,{id:assetId,organizationId:organizations.a,lifecycleState:'IMPORTED_PRIVATE'});assert(!q.select.createdBy);return store.assets[0];}},
  organizationEvent:{findMany:async q=>{assert.equal(membershipRole,'ORG_ADMIN');assert.equal(q.where.organizationId,organizations.a);assert.equal(q.where.subjectId,assetId);assert.equal(q.take,101);assert(!q.select.actorId);return store.events.filter(e=>e.subjectId===assetId);}},
 };
 const load=loader({[path.join(root,'lib/db-capabilities.ts')]:{businessDb:{$transaction:async fn=>fn(tx)}},[path.join(root,'lib/auth/getSession.ts')]:{getSession:async()=>({isAuthenticated:authenticated,user:{id:'actor',role:'admin'}})}});
 const read=load('lib/business/read.ts').readPrivateBusinessAsset;
 assert.equal((await read(input)).timeline.length,4);assert.match(queries[0].sql,/FOR SHARE/);assert.match(queries[1].sql,/FOR UPDATE/);
 membershipRole='VIEWER';assert.equal((await read(input)).timeline.length,0);
 verified=false;await assert.rejects(read(input),denied(401));authenticated=false;await assert.rejects(read(input),denied(401));
});
test('HTTP synthetic session, tenant privacy, no-store, origin/host guard and no mutations',async()=>{
 const server=createDemoServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 try {
  const html=await (await fetch(base)).text(),token=/name="demo-token" content="([^"]+)"/.exec(html)[1];
  assert.equal((await fetch(base+'/api/assets')).status,401);
  assert.equal((await fetch(base+'/session',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://foreign.invalid'},body:JSON.stringify({profile:'admin',token})})).status,403);
  async function login(profile){const r=await fetch(base+'/session',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({profile,token})});assert.equal(r.status,200);return r.headers.get('set-cookie').split(';')[0];}
  const cookie=await login('admin'),headers={Cookie:cookie};let r=await fetch(base+'/api/assets',{headers});assert.equal(r.headers.get('cache-control'),'no-store');assert.equal((await r.json()).assets.length,3);
  for(const id of ['aaaaaaaa-aaaa-4aaa-8aaa-000000000004','aaaaaaaa-aaaa-4aaa-8aaa-000000000099']) {r=await fetch(base+`/api/asset?assetId=${id}`,{headers});assert.equal(r.status,404);assert.deepEqual(await r.json(),{error:'DEMO_UNAVAILABLE'});}
  r=await fetch(base+`/api/asset?assetId=${assetId}&view=finance`,{headers});const out=await r.json();assert(!JSON.stringify(out).includes('DEMO-001'));assert.equal(out.synthetic,true);
  for(const role of ['insurer','finance','worker','platform']) {r=await fetch(base+'/api/assets',{headers:{Cookie:await login(role)}});assert.equal(r.status,404);assert(!JSON.stringify(await r.json()).includes('Graafmachine'));}
  r=await fetch(base+'/api/asset',{method:'POST',headers});assert.equal(r.status,405);
  const badHost=await new Promise((resolve,reject)=>{http.get(base+'/api/assets',{headers:{...headers,Host:'foreign.invalid'}},res=>{res.resume();resolve(res.statusCode);}).on('error',reject);});assert.equal(badHost,403);
  r=await fetch(base+'/api/assets',{headers:{Cookie:await login('other')}});const other=await r.json();assert.equal(other.assets.length,1);assert.match(other.assets[0].name,/Zuid/);
 } finally {server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
