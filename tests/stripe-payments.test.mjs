import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import Stripe from 'stripe';
import {PrismaClient} from '@prisma/client';
import {loader} from './import-fixtures.mjs';

// Only the existing loopback PostgreSQL test server. Never load .env or production credentials.
const url='postgresql://postgres:synthetic@127.0.0.1:55438/stripeproof20261020';
const root=process.cwd(),db=new PrismaClient({datasourceUrl:url});
const runtime=new PrismaClient({datasourceUrl:url.replace('postgres:synthetic','registration_app:synthetic')});
after(async()=>{await runtime.$disconnect();await db.$disconnect();});
const load=loader({[path.join(root,'lib/db-capabilities.ts')]:{registrationDb:runtime}});
const policy=load('lib/stripe/policy.ts'), service=load('lib/stripe/payments.ts');
Object.assign(process.env,{ER_CHECKOUT_MODE:'test',ER_STRIPE_TEST_ACCOUNT_ID:'acct_synthetic',ER_STRIPE_TEST_PRICE_VEHICLES:'price_synthetic',NEXT_PUBLIC_APP_URL:'http://127.0.0.1:3199'});
const sessions=new Map(),keys=new Map();let created=0,crash=false;
const fake={accounts:{retrieve:async()=>({id:'acct_synthetic'})},prices:{retrieve:async()=>({id:'price_synthetic',active:true,type:'one_time',currency:'eur',unit_amount:1995,livemode:false,tax_behavior:'inclusive',product:{id:'prod_synthetic',active:true,tax_code:'txcd_10000000'}})},checkout:{sessions:{
 create:async(params,opts)=>{
  if(keys.has(opts.idempotencyKey))return sessions.get(keys.get(opts.idempotencyKey));
  created++;const s={id:'cs_test_'+randomUUID(),...params,livemode:false,status:'open',payment_status:'unpaid',url:'https://checkout.stripe.com/c/pay/test',amount_total:1995,currency:'eur',customer:'cus_synthetic',automatic_tax:{status:'complete'},line_items:{data:[{quantity:1,price:{id:'price_synthetic'}}],has_more:false}};
  sessions.set(s.id,s);keys.set(opts.idempotencyKey,s.id);if(crash){crash=false;throw Error('simulated timeout after Stripe accepted request');}return s;
 },retrieve:async id=>{assert(sessions.has(id));return sessions.get(id);}}},
 paymentIntents:{retrieve:async()=>({metadata:{}})},charges:{retrieve:async()=>({})}};
async function fixture(applicant='private'){
 const id=randomUUID(),user='synthetic-'+id;
 await db.$executeRaw`INSERT INTO public."User"(id) VALUES(${user})`;
 await db.$executeRaw`INSERT INTO public."RegistrationRequest"(id,reference,"userId","assetName",category,subcategory,brand,model,"serialNumber","ownerName","ownerEmail","applicantType","requestStatus","declarationAccepted","dynamicFields",documents) VALUES(${id},${'TEST-'+id},${user},'Synthetic vehicle','vehicles','truck','Synthetic','Synthetic',${id},'Synthetic customer','customer@example.invalid',${applicant}::"ApplicantType",'payment_required',true,'{"keep":"private","__registryStatus":"history_unknown"}'::jsonb,'{"keep":"private"}'::jsonb)`;
 return {id,user};
}
async function attempt(id){return (await db.$queryRaw`SELECT * FROM registry_private.payment_attempt WHERE registration_id=${id} ORDER BY created_at DESC LIMIT 1`)[0];}
async function event(a,type='checkout.session.completed',eid='evt_'+randomUUID()){
 const s=sessions.get(a.session_id);return service.processPaymentEvent(fake,{id:eid,type,livemode:false,data:{object:{id:s.id,metadata:s.metadata}}});
}
test('activation requires explicit live approval; all eight prices come only from server configuration',()=>{
 assert.throws(()=>policy.paymentMode({}),/CHECKOUT_DISABLED/);assert.throws(()=>policy.paymentMode({ER_CHECKOUT_MODE:'live'}),/CHECKOUT_DISABLED/);
 assert.equal(Object.keys(policy.LIVE_PRODUCTS).length,8);
 for(const category of Object.keys(policy.LIVE_PRODUCTS)){
  assert.throws(()=>policy.configuredPrice(category,{ER_CHECKOUT_MODE:'test'}),/PRICE_NOT_CONFIGURED/);
  const p=policy.configuredPrice(category,{ER_CHECKOUT_MODE:'test',[`ER_STRIPE_TEST_PRICE_${category.toUpperCase()}`]:'price_fixed'});
  assert.equal(p.amount,category==='light_mobility'?995:category==='vehicles'?1995:2495);
 }
 assert.throws(()=>policy.categoryForPayment('invented','truck'));
 assert.throws(()=>policy.categoryForPayment('vehicles','bicycle'));
 assert.equal(policy.categoryForPayment('vehicles','truck'),'vehicles');
});
test('institutional applicants, other owners and cleared registrations cannot checkout',async()=>{
 const a=await fixture('bank_partner');await assert.rejects(service.createCheckout(a.user,a.id,'en',fake),/PARTNER_INTAKE_REQUIRED/);
 const b=await fixture();await assert.rejects(service.createCheckout('other',b.id,'en',fake));
 await db.registrationRequest.update({where:{id:b.id},data:{paymentCompleted:true}});
 await assert.rejects(service.createCheckout(b.user,b.id,'en',fake),/NOT_PAYABLE/);
});
test('concurrent checkout requests create one Stripe session and immutable price/owner binding',async()=>{
 const f=await fixture(),before=created;
 const urls=await Promise.all(Array.from({length:3},()=>service.createCheckout(f.user,f.id,'nl',fake)));
 assert.equal(created,before+1);assert.equal(new Set(urls).size,1);
 const a=await attempt(f.id);assert.equal(a.user_id,f.user);assert.equal(a.price_id,'price_synthetic');
 assert.equal(a.parameters.allow_promotion_codes,true);assert(!a.parameters.discounts);assert.equal(a.parameters.invoice_creation.enabled,true);assert.equal(a.parameters.ui_mode,'hosted');
 assert.equal(a.parameters.customer_creation,'always');assert.equal(a.parameters.client_reference_id,f.id);
});
test('timeout after Stripe acceptance recovers using durable idempotency key',async()=>{
 const f=await fixture(),before=created;crash=true;
 await assert.rejects(service.createCheckout(f.user,f.id,'en',fake));
 await service.createCheckout(f.user,f.id,'en',fake);assert.equal(created,before+1);
});
test('signed event deduplication is atomic; payment only enters manual review and preserves private fields',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);
 Object.assign(s,{status:'complete',payment_status:'paid'});const eid='evt_'+randomUUID();
 await Promise.all([event(a,undefined,eid),event(a,undefined,eid)]);
 const r=await db.registrationRequest.findUnique({where:{id:f.id}});
 assert.equal(r.requestStatus,'submitted');assert.equal(r.paymentCompleted,true);assert.deepEqual(r.dynamicFields,{keep:'private',__registryStatus:'history_unknown'});assert.deepEqual(r.documents,{keep:'private'});
 const rows=await db.$queryRaw`SELECT * FROM registry_private.payment_event WHERE event_id=${eid}`;assert.equal(rows.length,1);
});
test('100% discount works without PaymentIntent and never verifies or issues',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);
 Object.assign(s,{status:'complete',payment_status:'no_payment_required',amount_total:0,payment_intent:null});await event(a);
 assert.equal((await attempt(f.id)).state,'discounted');assert.equal((await db.registrationRequest.findUnique({where:{id:f.id}})).requestStatus,'submitted');
 for(const st of ['approved','passport_issued','under_review','rejected'])assert.equal(policy.nextReviewStatus(st,'paid'),st);
});
test('asynchronous payment stays pending until success; expiry allows a fresh attempt',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);let a=await attempt(f.id),s=sessions.get(a.session_id);
 s.status='complete';await event(a);assert.equal((await attempt(f.id)).state,'processing');assert.equal((await db.registrationRequest.findUnique({where:{id:f.id}})).paymentCompleted,false);
 s.payment_status='paid';await event(a,'checkout.session.async_payment_succeeded');assert.equal((await attempt(f.id)).state,'paid');
 const g=await fixture();await service.createCheckout(g.user,g.id,'en',fake);a=await attempt(g.id);s=sessions.get(a.session_id);s.status='expired';await event(a,'checkout.session.expired');
 await service.createCheckout(g.user,g.id,'en',fake);assert.notEqual((await attempt(g.id)).id,a.id);
});
test('refund reconciliation wins over delayed paid events; issued passport status is never revoked',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);
 Object.assign(s,{status:'complete',payment_status:'paid',payment_intent:{id:'pi_synthetic',latest_charge:{id:'ch_synthetic',amount_refunded:100,refunded:false,receipt_url:'https://pay.stripe.com/receipts/test'}}});
 await db.registrationRequest.update({where:{id:f.id},data:{requestStatus:'passport_issued',paymentCompleted:true}});
 await event(a);assert.equal((await attempt(f.id)).state,'partially_refunded');
 s.payment_intent.latest_charge.refunded=true;s.payment_intent.latest_charge.amount_refunded=1995;
 await event(a);assert.equal((await attempt(f.id)).state,'refunded');assert.equal((await db.registrationRequest.findUnique({where:{id:f.id}})).requestStatus,'passport_issued');
});
test('binding mismatch and wrong mode roll back both state and event receipt',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);s.metadata.userId='foreign';
 await assert.rejects(event(a),/PAYMENT_BINDING_MISMATCH/);assert.equal((await attempt(f.id)).state,'open');
 const rows=await db.$queryRaw`SELECT * FROM registry_private.payment_event WHERE attempt_id=${a.id}::uuid`;assert.equal(rows.length,0);
 await assert.rejects(service.processPaymentEvent(fake,{livemode:true}),/EVENT_ACCOUNT_MODE_MISMATCH/);
});
test('pilot grants are explicit, empty by default, expire, and cannot be forged by runtime',async()=>{
 const f=await fixture();assert.equal(await service.registrationNeedsPayment(f.user,'private'),true);
 await db.$executeRaw`INSERT INTO registry_private.payment_grant(user_id,reason) VALUES(${f.user},'Synthetic grant')`;
 assert.equal(await service.registrationNeedsPayment(f.user,'private'),false);
 await db.$executeRaw`UPDATE registry_private.payment_grant SET expires_at=now()-interval '1 second' WHERE user_id=${f.user}`;
 assert.equal(await service.registrationNeedsPayment(f.user,'private'),true);
 await assert.rejects(runtime.$executeRaw`INSERT INTO registry_private.payment_grant(user_id,reason) VALUES('forged','forged')`);
 await assert.rejects(runtime.$executeRaw`DELETE FROM registry_private.payment_event`);
 await assert.rejects(runtime.$executeRaw`UPDATE registry_private.payment_event SET outcome='forged'`);
});
test('Stripe SDK rejects forged signatures and verifies exact raw bytes',()=>{
 const stripe=new Stripe('sk_test_synthetic'),secret='whsec_synthetic';
 const payload=JSON.stringify({id:'evt_synthetic',type:'checkout.session.completed'});
 const header=stripe.webhooks.generateTestHeaderString({payload,secret});
 assert.equal(stripe.webhooks.constructEvent(payload,header,secret).id,'evt_synthetic');
 assert.throws(()=>stripe.webhooks.constructEvent(payload+' ',header,secret));
 assert.throws(()=>stripe.webhooks.constructEvent(payload,header,'whsec_other'));
});

test('failed async payment and canceled intent allow retry without settling registration',async()=>{
 for(const type of ['checkout.session.async_payment_failed','payment_intent.canceled']){
  const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);
  s.status='complete';if(type==='payment_intent.canceled')s.payment_intent={id:'pi_cancel',status:'canceled'};
  await event(a,type);assert.equal((await attempt(f.id)).state,type.includes('failed')?'failed':'canceled');
  assert.equal((await db.registrationRequest.findUnique({where:{id:f.id}})).paymentCompleted,false);
 }
});
test('zero payment waits for completed tax and persists invoice, tax and discount facts',async()=>{
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',fake);const a=await attempt(f.id),s=sessions.get(a.session_id);
 Object.assign(s,{status:'complete',payment_status:'no_payment_required',amount_total:0,payment_intent:null,automatic_tax:{status:'requires_location_inputs'},total_details:{amount_tax:0,amount_discount:1995}});
 await event(a);assert.equal((await attempt(f.id)).state,'processing');
 s.automatic_tax.status='complete';s.invoice={id:'in_synthetic',status:'paid',number:'SYNTHETIC'};
 await event(a,'invoice.paid');const saved=await attempt(f.id);
 assert.equal(saved.state,'discounted');assert.equal(saved.tax_status,'complete');assert.equal(saved.invoice_status,'paid');assert.equal(saved.amount_discount,1995n);
});
test('unused and unrelated events safely acknowledge without writes',async()=>{
 await service.processPaymentEvent(fake,{type:'customer.created',livemode:false});
 await service.processPaymentEvent(fake,{type:'invoice.paid',livemode:false,data:{object:{id:'in_unrelated',metadata:{}}}});
});
test('live uses the exact owner-supplied Price and rejects an incorrect amount',async()=>{
 const saved={...process.env};
 try{
  Object.assign(process.env,{ER_CHECKOUT_MODE:'live',ER_CHECKOUT_LIVE_APPROVED:'true',ER_STRIPE_TAX_REVIEWED:'true',NEXT_PUBLIC_APP_URL:'https://equipregistry.com'});
  delete process.env.ER_STRIPE_LIVE_PRICE_VEHICLES;
  const live={...fake,accounts:{retrieve:async()=>({id:policy.LIVE_ACCOUNT})},products:{retrieve:async id=>{assert.equal(id,policy.LIVE_PRODUCTS.vehicles);return {active:true,default_price:policy.LIVE_PRICES.vehicles};}},prices:{retrieve:async id=>{assert.equal(id,policy.LIVE_PRICES.vehicles);return {...await fake.prices.retrieve(),id,livemode:true,product:{active:true,id:policy.LIVE_PRODUCTS.vehicles,tax_code:'txcd_10000000'}};}}};
  const f=await fixture();await service.createCheckout(f.user,f.id,'nl',live);
  assert.equal((await attempt(f.id)).price_id,policy.LIVE_PRICES.vehicles);
  live.prices.retrieve=async()=>({...{id:policy.LIVE_PRICES.vehicles,active:true,type:'one_time',currency:'eur',unit_amount:1,livemode:true},product:{active:true,id:policy.LIVE_PRODUCTS.vehicles,tax_code:'txcd_10000000'}});
  const bad=await fixture();await assert.rejects(service.createCheckout(bad.user,bad.id,'nl',live),/PRICE_VALIDATION_FAILED/);
 }finally{for(const key of Object.keys(process.env))if(!(key in saved))delete process.env[key];Object.assign(process.env,saved);}
});
test('existing inclusive account tax defaults are supported; exclusive defaults are refused',async()=>{
 const defaults={tax_behavior:'inclusive',tax_code:'txcd_10000000'};
 const client={...fake,prices:{retrieve:async()=>({...await fake.prices.retrieve(),tax_behavior:'unspecified',product:{id:'prod_synthetic',active:true,tax_code:null}})},tax:{settings:{retrieve:async()=>({defaults})}}};
 const f=await fixture();await service.createCheckout(f.user,f.id,'en',client);
 defaults.tax_behavior='exclusive';const bad=await fixture();await assert.rejects(service.createCheckout(bad.user,bad.id,'en',client),/TAX_BEHAVIOR_NOT_APPROVED/);
});
