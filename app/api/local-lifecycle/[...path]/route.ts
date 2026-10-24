import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { localBusinessAllowed, localBusinessToken, localHeaders } from '@/lib/business/local-gate';
import { businessCommand, readCase, readExternal, readLifecycle, retentionPreview } from '@/lib/business/lifecycle';
import { BusinessError } from '@/lib/business/model';
import { createSessionToken } from '@/lib/auth/session-token';
import { provision } from '@/lib/business/provisioning';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const base='/api/local-lifecycle/';
const json=(data:unknown,status=200,extra={})=>Response.json(data,{status,headers:{...localHeaders,...extra}});
function enabled(r:Request){return localBusinessAllowed(r)&&process.env.ER_LIFECYCLE_SYNTHETIC==='1';}
export async function GET(request:Request){
 if(!enabled(request))return json({error:'BUSINESS_UNAVAILABLE'},404);
 const u=new URL(request.url),name=u.pathname.slice(base.length);
 try{
  if(['demo','app.js','style.css'].includes(name)){
   const filename=name==='demo'?'index.html':name;
   const text=(await readFile(path.join(process.cwd(),'local-lifecycle',filename),'utf8')).replace('DEMO_NONCE',localBusinessToken);
   return new Response(text,{headers:{...localHeaders,'Content-Type':name==='demo'?'text/html; charset=utf-8':name==='app.js'?'text/javascript; charset=utf-8':'text/css; charset=utf-8'}});
  }
  const allowed=name==='asset'?['subject','view']:name==='external'?['subject','grant','purpose']:name==='case'?['subject','table','id']:name==='retention'?['subject','recordClass','id']:[];
  if(!allowed.length||[...u.searchParams.keys()].some(k=>!allowed.includes(k))||allowed.some(k=>u.searchParams.getAll(k).length!==1))return json({error:'BUSINESS_UNAVAILABLE'},400);
  const subject=u.searchParams.get('subject')??'';
  if(name==='asset')return json(await readLifecycle(subject,u.searchParams.get('view')??''));
  if(name==='external')return json(await readExternal(subject,u.searchParams.get('grant')??'',u.searchParams.get('purpose')??''));
  if(name==='retention')return json(await retentionPreview(subject,u.searchParams.get('recordClass')??'',u.searchParams.get('id')??''));
  return json(await readCase(subject,u.searchParams.get('table')??'',u.searchParams.get('id')??''));
 }catch(e){return json({error:'BUSINESS_UNAVAILABLE'},e instanceof BusinessError?e.status:503);}
}
export async function POST(request:Request){
 if(!enabled(request))return json({error:'BUSINESS_UNAVAILABLE'},404);
 if(request.headers.get('origin')!=='http://127.0.0.1:3158'||request.headers.get('content-type')!=='application/json')return json({error:'BUSINESS_UNAVAILABLE'},403);
 try{
  const reader=request.body?.getReader();if(!reader)return json({error:'BUSINESS_UNAVAILABLE'},400);
  const chunks:Uint8Array[]=[];let length=0;
  while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>8192){await reader.cancel();return json({error:'BUSINESS_UNAVAILABLE'},413);}chunks.push(value);}
  const body=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if(!body||typeof body!=='object'||Array.isArray(body)||typeof body.token!=='string')return json({error:'BUSINESS_UNAVAILABLE'},400);
  const token=Buffer.from(body.token);if(token.length!==localBusinessToken.length||!timingSafeEqual(token,Buffer.from(localBusinessToken)))return json({error:'BUSINESS_UNAVAILABLE'},403);
  const name=new URL(request.url).pathname.slice(base.length);
  if(name==='session'){
   if(Object.keys(body).some(k=>!['token','profile'].includes(k))||!['admin','other','viewer','importer','worker','platform','reviewer'].includes(body.profile))return json({error:'BUSINESS_UNAVAILABLE'},400);
   return json({synthetic:true},200,{'Set-Cookie':`er_session=${createSessionToken('synthetic-business-'+body.profile,900)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=900`});
  }
  if(name==='provision'){
   if(Object.keys(body).some(k=>!['token','command','input'].includes(k))||typeof body.command!=='string'||!body.input||typeof body.input!=='object'||Array.isArray(body.input))return json({error:'BUSINESS_UNAVAILABLE'},400);
   return json(await provision(body.command,body.input));
  }
  if(name!=='command'||Object.keys(body).some(k=>!['token','subject','command','input'].includes(k))||typeof body.subject!=='string'||typeof body.command!=='string'||!body.input||typeof body.input!=='object'||Array.isArray(body.input))return json({error:'BUSINESS_UNAVAILABLE'},400);
  return json(await businessCommand(body.subject,body.command,request.headers.get('idempotency-key')??'',body.input));
 }catch(e){return json({error:'BUSINESS_UNAVAILABLE'},e instanceof BusinessError?e.status:e instanceof SyntaxError?400:503);}
}
