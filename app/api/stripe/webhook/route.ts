import { NextResponse } from 'next/server';
import { client, webhookSecret, processPaymentEvent } from '@/lib/stripe/payments';
export const runtime='nodejs';
export async function POST(request:Request){
 const signature=request.headers.get('stripe-signature');
 if(!signature)return NextResponse.json({message:'Invalid signature.'},{status:400});
 let stripe,secret;
 try{stripe=client();secret=webhookSecret();}catch{
  const key=process.env.STRIPE_SECRET_KEY, signing=process.env.STRIPE_WEBHOOK_SECRET;
  console.error('STRIPE_WEBHOOK_CONFIGURATION', {
   modeLive:process.env.ER_CHECKOUT_MODE==='live',approved:process.env.ER_CHECKOUT_LIVE_APPROVED==='true',
   keyPresent:!!key,keyLivePrefix:/^[sr]k_live_/.test(key?.trim()||''),keyWhitespace:!!key&&/\s/.test(key),
   signingPresent:!!signing,signingPrefix:!!signing?.startsWith('whsec_'),signingWhitespace:!!signing&&/\s/.test(signing)
  });
  return NextResponse.json({message:'Webhook unavailable.'},{status:503});
 }
 const payload=await request.text();
 if(payload.length>1024*1024)return NextResponse.json({message:'Event too large.'},{status:413});
 let event;
 try{event=stripe.webhooks.constructEvent(payload,signature,secret);}catch{return NextResponse.json({message:'Invalid signature.'},{status:400});}
 try{await processPaymentEvent(stripe,event);}catch{return NextResponse.json({message:'Event processing incomplete; retry required.'},{status:503});}
 return NextResponse.json({received:true});
}
