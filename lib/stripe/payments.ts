import 'server-only';
import Stripe from 'stripe';
import { randomUUID } from 'node:crypto';
import type { Prisma, RegistrationRequest } from '@prisma/client';
import { registrationDb as db } from '@/lib/db-capabilities';
import { isValidLang } from '@/lib/i18n/config';
import { PaymentError, paymentMode, LIVE_ACCOUNT, LIVE_PRODUCTS, configuredPrice, categoryForPayment, eligibleApplicant, checkoutReturnOrigin, settled, nextReviewStatus, type PaymentState } from './policy';

type Tx = Prisma.TransactionClient;
type Attempt = {
 id:string;registration_id:string;user_id:string;account_id:string;mode:'test'|'live';
 category:string;price_id:string;product_id:string;parameters:Stripe.Checkout.SessionCreateParams;
 state:PaymentState;session_id:string|null;created_at:Date;invoice_id:string|null;
 invoice_number:string|null;invoice_url:string|null;invoice_pdf:string|null;receipt_url:string|null;
};
export function client() {
 const mode=paymentMode();
 if(mode==='test'&&process.env.VERCEL_ENV==='production')throw new PaymentError(503);
 const key=process.env[mode==='test'?'ER_STRIPE_TEST_SECRET_KEY':'STRIPE_SECRET_KEY']?.trim();
 if(!key || !(new RegExp(`^[sr]k_${mode}_`)).test(key))throw new PaymentError(503,'STRIPE_KEY_MODE_MISMATCH');
 return new Stripe(key,{maxNetworkRetries:1,timeout:10000});
}
export function webhookSecret(){
 const secret=process.env[paymentMode()==='test'?'ER_STRIPE_TEST_WEBHOOK_SECRET':'STRIPE_WEBHOOK_SECRET'];
 if(!secret?.startsWith('whsec_'))throw new PaymentError(503,'WEBHOOK_NOT_CONFIGURED');
 return secret;
}
async function account(stripe:Stripe){
 const expected=paymentMode()==='live'?LIVE_ACCOUNT:process.env.ER_STRIPE_TEST_ACCOUNT_ID;
 if(!expected)throw new PaymentError(503,'ACCOUNT_NOT_CONFIGURED');
 const a=await stripe.accounts.retrieve(null);
 if(a.id!==expected)throw new PaymentError(503,'STRIPE_ACCOUNT_MISMATCH');
 return a.id;
}
export async function registrationNeedsPayment(userId:string,applicant:string){
 // An absent activation switch preserves the existing free workflow.
 if(!process.env.ER_CHECKOUT_MODE || process.env.ER_CHECKOUT_MODE==='off')return false;
 paymentMode();
 if(!eligibleApplicant(applicant))throw new PaymentError(403,'PARTNER_INTAKE_REQUIRED');
 const grants=await db.$queryRaw<{user_id:string}[]>`SELECT user_id FROM registry_private.payment_grant WHERE user_id=${userId} AND (expires_at IS NULL OR expires_at>now())`;
 return grants.length===0;
}
async function lockedRequest(tx:Tx,id:string){
 const r=(await tx.$queryRaw<RegistrationRequest[]>`SELECT * FROM public."RegistrationRequest" WHERE id=${id} FOR UPDATE`)[0];
 if(!r||r.deletedAt)throw new PaymentError(404);
 return r;
}
function payable(r:RegistrationRequest,userId:string){
 if(r.userId!==userId)throw new PaymentError(404);
 if(!eligibleApplicant(r.applicantType))throw new PaymentError(403,'PARTNER_INTAKE_REQUIRED');
 if(r.paymentCompleted||r.requestStatus!=='payment_required')throw new PaymentError(409,'NOT_PAYABLE');
}
export async function createCheckout(userId:string,id:string,lang:string,stripe:Stripe=client(),returnOrigin?:string){
 const mode=paymentMode(),accountId=await account(stripe);
 const current=await db.registrationRequest.findFirst({where:{id,userId,deletedAt:null}});
 if(!current)throw new PaymentError(404);payable(current,userId);
 const category=categoryForPayment(current.category,current.subcategory),configured=configuredPrice(category);
 const price=await stripe.prices.retrieve(configured.id,{expand:['product']});
 const product=price.product as Stripe.Product;
 if(!price.active||price.type!=='one_time'||price.currency!=='eur'||price.unit_amount!==configured.amount||
   price.livemode!==(mode==='live')||!product.active||product.deleted||
   (mode==='live'&&product.id!==LIVE_PRODUCTS[category]))throw new PaymentError(503,'PRICE_VALIDATION_FAILED');
 // EUR is inclusive under Stripe's inferred_by_currency setting (labelled Automatic in Dashboard).
 if(price.tax_behavior!=='inclusive'||!product.tax_code){
   const tax=await stripe.tax.settings.retrieve();
   if(!product.tax_code&&!tax.defaults.tax_code)throw new PaymentError(503,'TAX_CODE_NOT_CONFIGURED');
   if(price.tax_behavior!=='inclusive'&&(price.tax_behavior!=='unspecified'||!['inferred_by_currency','inclusive'].includes(tax.defaults.tax_behavior??'')))throw new PaymentError(503,'TAX_BEHAVIOR_NOT_APPROVED');
 }
 if(mode==='live' && process.env.ER_STRIPE_TAX_REVIEWED!=='true')throw new PaymentError(503,'TAX_REVIEW_REQUIRED');
 const safeLang=isValidLang(lang)?lang:'en';
 const attemptId=await db.$transaction(async tx=>{
   const r=await lockedRequest(tx,id);payable(r,userId);
   if(categoryForPayment(r.category,r.subcategory)!==category)throw new PaymentError();
   const prior=(await tx.$queryRaw<Attempt[]>`SELECT * FROM registry_private.payment_attempt WHERE registration_id=${id} ORDER BY created_at DESC LIMIT 1 FOR UPDATE`)[0];
   if(prior){
     if(!['expired','failed','canceled'].includes(prior.state)){
       if(!['creating','open','processing'].includes(prior.state)||prior.mode!==mode||prior.account_id!==accountId)throw new PaymentError();
       return prior.id;
     }
   }
   const aid=randomUUID();
   const metadata={attemptId:aid,registrationId:id,userId,category,lang:safeLang};
   const origin=checkoutReturnOrigin(returnOrigin);
   const parameters:Stripe.Checkout.SessionCreateParams={
     mode:'payment',customer_creation:'always',customer_email:r.ownerEmail,
     client_reference_id:id,metadata,payment_intent_data:{metadata},
     line_items:[{price:price.id,quantity:1}],allow_promotion_codes:true,
     automatic_tax:{enabled:true},billing_address_collection:'required',tax_id_collection:{enabled:true},
     invoice_creation:{enabled:true,invoice_data:{metadata,rendering_options:{amount_tax_display:'include_inclusive_tax'}}},
     locale:'auto',expires_at:Math.floor(Date.now()/1000)+3600,
     success_url:`${origin}/${safeLang}/dashboard/registrations/${id}?payment=returned`,
     cancel_url:`${origin}/${safeLang}/dashboard/registrations/${id}?payment=cancelled`,
   };
   await tx.$executeRaw`INSERT INTO registry_private.payment_attempt(id,registration_id,user_id,account_id,mode,category,price_id,product_id,parameters) VALUES(${aid}::uuid,${id},${userId},${accountId},${mode},${category},${price.id},${product.id},${JSON.stringify(parameters)}::jsonb)`;
   return aid;
 });
 // Immutable parameters and durable attempt ID survive process crashes and Stripe timeouts.
 return db.$transaction(async tx=>{
   const r=await lockedRequest(tx,id);payable(r,userId);
   const a=(await tx.$queryRaw<Attempt[]>`SELECT * FROM registry_private.payment_attempt WHERE id=${attemptId}::uuid FOR UPDATE`)[0];
   if(!a||!['creating','open','processing'].includes(a.state))throw new PaymentError();
   if(!a.session_id&&Date.now()-a.created_at.getTime()>20*3600000)throw new PaymentError(409,'PAYMENT_RECONCILIATION_REQUIRED');
   // Omit the retired hosted alias, including for persisted attempts rejected before session creation.
   // Stripe defaults to its hosted checkout page. Version the key for rejected legacy payloads;
   // Stripe retains their old parameters too. Existing session IDs are always retrieved, never recreated.
   const {ui_mode: _legacyUiMode, ...parameters}=a.parameters;
   const idempotencyKey=`er-checkout-${a.id}${_legacyUiMode==='hosted'?'-hosted-page':''}`;
   const s=a.session_id?await stripe.checkout.sessions.retrieve(a.session_id):await stripe.checkout.sessions.create(parameters,{idempotencyKey});
   if(s.status!=='open'||!s.url)throw new PaymentError(409,'PAYMENT_RECONCILIATION_REQUIRED');
   if(new URL(s.url).hostname!=='checkout.stripe.com')throw new PaymentError();
   await tx.$executeRaw`UPDATE registry_private.payment_attempt SET session_id=${s.id},state='open',updated_at=now() WHERE id=${a.id}::uuid`;
   return s.url;
 },{timeout:25000});
}
const objectId=(v:string|{id:string}|null|undefined)=>typeof v==='string'?v:v?.id??null;
export async function processPaymentEvent(stripe:Stripe,event:Stripe.Event){
 const mode=paymentMode(),accountId=await account(stripe);
 if(event.livemode!==(mode==='live')||event.account)throw new PaymentError(400,'EVENT_ACCOUNT_MODE_MISMATCH');
 const accepted=new Set(['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','checkout.session.expired','charge.refunded','charge.dispute.created','charge.dispute.closed','refund.updated','refund.created','refund.failed','payment_intent.canceled','invoice.paid','invoice.finalized','invoice.payment_failed']);
 if(!accepted.has(event.type))return;
 const obj=event.data.object as unknown as {id:string;metadata?:Record<string,string>;payment_intent?:string|{id:string};charge?:string|{id:string}};
 let aid=obj.metadata?.attemptId;
 if(!aid&&obj.payment_intent){
   const pi=await stripe.paymentIntents.retrieve(objectId(obj.payment_intent)!);aid=pi.metadata.attemptId;
 }
 if(!aid&&obj.charge){const ch=await stripe.charges.retrieve(objectId(obj.charge)!);if(ch.payment_intent){const pi=await stripe.paymentIntents.retrieve(objectId(ch.payment_intent)!);aid=pi.metadata.attemptId;}}
 // Legacy/unrelated objects are acknowledged but cannot change registrations.
 if(!aid||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(aid))return;
 const lookup=(await db.$queryRaw<Attempt[]>`SELECT * FROM registry_private.payment_attempt WHERE id=${aid}::uuid AND account_id=${accountId} AND mode=${mode}`)[0];
 if(!lookup)throw new PaymentError(409,'UNKNOWN_PAYMENT_ATTEMPT');
 await db.$transaction(async tx=>{
   const r=await lockedRequest(tx,lookup.registration_id);
   const a=(await tx.$queryRaw<Attempt[]>`SELECT * FROM registry_private.payment_attempt WHERE id=${aid}::uuid FOR UPDATE`)[0];
   const duplicate=await tx.$queryRaw`SELECT event_id FROM registry_private.payment_event WHERE account_id=${accountId} AND event_id=${event.id}`;
   if((duplicate as unknown[]).length)return;
   const sid=event.type.startsWith('checkout.session.')?obj.id:a.session_id;
   if(!sid)throw new PaymentError(409,'SESSION_NOT_BOUND');
   const s=await stripe.checkout.sessions.retrieve(sid,{expand:['payment_intent.latest_charge','invoice','line_items']});
   if((a.session_id&&a.session_id!==s.id)||s.metadata?.attemptId!==a.id||s.metadata.userId!==a.user_id||s.metadata.registrationId!==r.id||s.client_reference_id!==r.id||r.userId!==a.user_id||s.livemode!==(mode==='live')||s.mode!=='payment'||!eligibleApplicant(r.applicantType))throw new PaymentError(400,'PAYMENT_BINDING_MISMATCH');
   const items=s.line_items?.data??[];
   if(items.length!==1||items[0].quantity!==1||items[0].price?.id!==a.price_id||s.line_items?.has_more)throw new PaymentError(400,'PAYMENT_PRICE_MISMATCH');
   const pi=typeof s.payment_intent==='object'?s.payment_intent:null;
   const charge=pi&&typeof pi.latest_charge==='object'?pi.latest_charge:null;
   let state:PaymentState=s.status==='expired'?'expired':s.status==='open'?'open':'processing';
   if(s.status==='complete'&&s.payment_status==='paid'&&s.automatic_tax.status==='complete')state='paid';
   if(s.status==='complete'&&s.payment_status==='no_payment_required'&&s.amount_total===0&&s.automatic_tax.status==='complete')state='discounted';
   if(pi?.status==='canceled')state='canceled';
   if(event.type==='checkout.session.async_payment_failed'&&!settled(state))state='failed';
   if(charge?.refunded)state='refunded';else if((charge?.amount_refunded??0)>0)state='partially_refunded';
   if(charge?.disputed)state='disputed';
   const inv=s.invoice&&typeof s.invoice==='object'&&!('deleted'in s.invoice)?s.invoice:null;
   const customer=objectId(s.customer),intent=objectId(s.payment_intent);
   await tx.$executeRaw`UPDATE registry_private.payment_attempt SET invoice_status=${inv?.status??null},tax_status=${s.automatic_tax.status},amount_tax=${s.total_details?.amount_tax??null},amount_discount=${s.total_details?.amount_discount??null} WHERE id=${a.id}::uuid`;
   await tx.$executeRaw`UPDATE registry_private.payment_attempt SET session_id=${s.id},customer_id=${customer},intent_id=${intent},state=${state},invoice_id=${inv?.id??a.invoice_id},invoice_number=${inv?.number??a.invoice_number},invoice_url=${inv?.hosted_invoice_url??a.invoice_url},invoice_pdf=${inv?.invoice_pdf??a.invoice_pdf},receipt_url=${charge?.receipt_url??a.receipt_url},amount_total=${s.amount_total},amount_refunded=${charge?.amount_refunded??0},currency=${s.currency},updated_at=now() WHERE id=${a.id}::uuid`;
   // Never write verification, Machine, QR, documents, ownership, sequence or passport status.
   // Refunds are retained for manual review; they never revoke an issued passport automatically.
   if(settled(state)&&r.requestStatus==='payment_required')await tx.registrationRequest.update({where:{id:r.id},data:{paymentCompleted:true,requestStatus:nextReviewStatus(r.requestStatus,state) as 'submitted'}});
   await tx.$executeRaw`INSERT INTO registry_private.payment_event(account_id,event_id,mode,attempt_id,event_type,outcome) VALUES(${accountId},${event.id},${mode},${a.id}::uuid,${event.type},${state})`;
 },{timeout:25000});
}
export async function paymentDetails(id:string,userId:string,admin=false){
 if(!process.env.ER_CHECKOUT_MODE||process.env.ER_CHECKOUT_MODE==='off')return null;
 const own=await db.registrationRequest.findFirst({where:admin?{id,deletedAt:null}:{id,userId,deletedAt:null},select:{id:true}});
 if(!own)return null;
 return (await db.$queryRaw<Attempt[]>`SELECT state,invoice_number,invoice_url,invoice_pdf,receipt_url FROM registry_private.payment_attempt WHERE registration_id=${id} ORDER BY created_at DESC LIMIT 1`)[0]??null;
}

