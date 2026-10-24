import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/getSession';
import { createCheckout } from '@/lib/stripe/payments';
import { PaymentError, validOrigin } from '@/lib/stripe/policy';
export const runtime='nodejs';
export async function POST(request:Request){
 try{
  const session=await getSession();
  if(!session.isAuthenticated)return NextResponse.json({message:'Authentication required.'},{status:401});
  if(!validOrigin(request))return NextResponse.json({message:'Invalid origin.'},{status:403});
  const p=await request.json();
  if(!p||typeof p.registrationId!=='string'||p.registrationId.length>100||Object.keys(p).some(k=>!['registrationId','lang'].includes(k)))return NextResponse.json({message:'Invalid request.'},{status:400});
  const url=await createCheckout(session.user.id,p.registrationId,typeof p.lang==='string'?p.lang:'en',undefined,request.headers.get('origin')!);
  return NextResponse.json({url},{headers:{'Cache-Control':'no-store'}});
 }catch(e){return NextResponse.json({message:e instanceof PaymentError?e.code:'Checkout is temporarily unavailable.'},{status:e instanceof PaymentError?e.status:503});}
}
