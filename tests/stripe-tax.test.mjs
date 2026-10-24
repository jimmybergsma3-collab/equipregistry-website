import {test} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loader} from './import-fixtures.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reached= new Error('validated: ready for durable checkout attempt');
const db={registrationRequest:{findFirst:async()=>({id:'registration',userId:'owner',applicantType:'private',requestStatus:'payment_required',paymentCompleted:false,category:'other',subcategory:'electric_scooter'})},$transaction:async()=>{throw reached;}};
const load=loader({[path.join(root,'lib/db-capabilities.ts')]:{registrationDb:db}});
const {createCheckout}=load('lib/stripe/payments.ts');
const {LIVE_ACCOUNT,LIVE_PRICES,LIVE_PRODUCTS}=load('lib/stripe/policy.ts');
process.env.ER_CHECKOUT_MODE='live';process.env.ER_CHECKOUT_LIVE_APPROVED='true';process.env.ER_STRIPE_TAX_REVIEWED='true';
function stripe(behavior,defaultBehavior,currency='eur'){
 return {accounts:{retrieve:async()=>({id:LIVE_ACCOUNT})},prices:{retrieve:async()=>({id:LIVE_PRICES.light_mobility,active:true,type:'one_time',currency,unit_amount:995,livemode:true,tax_behavior:behavior,product:{id:LIVE_PRODUCTS.light_mobility,active:true,tax_code:'txcd_10000000'}})},tax:{settings:{retrieve:async()=>({defaults:{tax_behavior:defaultBehavior}})}}};
}
test('Stripe currency-inferred EUR and explicit inclusive prices reach checkout creation',async()=>{
 for(const [price,setting] of [['unspecified','inferred_by_currency'],['unspecified','inclusive'],['inclusive','exclusive']]){
  await assert.rejects(createCheckout('owner','registration','nl',stripe(price,setting)),e=>e===reached);
 }
});
test('exclusive or unconfigured tax behavior cannot add VAT above advertised totals',async()=>{
 for(const [price,setting] of [['exclusive','inferred_by_currency'],['unspecified','exclusive'],['unspecified',null],['unspecified','automatic']]){
  await assert.rejects(createCheckout('owner','registration','nl',stripe(price,setting)),e=>e.code==='TAX_BEHAVIOR_NOT_APPROVED');
 }
 await assert.rejects(createCheckout('owner','registration','nl',stripe('unspecified','inferred_by_currency','usd')),e=>e.code==='PRICE_VALIDATION_FAILED');
});
test('a persisted attempt with the retired hosted alias resumes using the same payment and idempotency binding',async()=>{
 const parameters={mode:'payment',ui_mode:'hosted',line_items:[{price:LIVE_PRICES.light_mobility,quantity:1}],automatic_tax:{enabled:true},allow_promotion_codes:true};
 const attempt={id:'synthetic-attempt',state:'creating',mode:'live',account_id:LIVE_ACCOUNT,parameters,created_at:new Date(),session_id:null};
 const tx={$queryRaw:async(strings)=>strings.join('').includes('public.')?[await db.registrationRequest.findFirst()]:[attempt],$executeRaw:async()=>1};
 const database={...db,$transaction:async fn=>fn(tx)};
 const service=loader({[path.join(root,'lib/db-capabilities.ts')]:{registrationDb:database}})('lib/stripe/payments.ts');
 const provider=stripe('unspecified','inferred_by_currency');
 let called=false;
 provider.checkout={sessions:{create:async(p,options)=>{
  called=true;assert.equal(p.ui_mode,undefined);assert.deepEqual(p.line_items,parameters.line_items);assert.deepEqual(p.automatic_tax,{enabled:true});assert.equal(options.idempotencyKey,'er-checkout-synthetic-attempt-hosted-page');
  return {id:'synthetic-session',status:'open',url:'https://checkout.stripe.com/c/pay/synthetic'};
 }}};
 assert.equal(await service.createCheckout('owner','registration','nl',provider),'https://checkout.stripe.com/c/pay/synthetic');assert(called);
 assert.equal(parameters.ui_mode,'hosted');
});

