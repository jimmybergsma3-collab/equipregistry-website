import {PartnerError} from '@/lib/business/partner-model';
import {submitPartner,reviewPartner,partnerMailAction,partnerMailHealth,createPartnerTest,previewPartnerDeletion,deletePartnerTest} from '@/lib/business/partners';
export const runtime='nodejs';
export const maxDuration=60;
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
export async function POST(request:Request){
 const url=new URL(request.url),origin=request.headers.has('host')?`${url.protocol}//${request.headers.get('host')}`:url.origin;
 if(request.headers.get('origin')!==origin||![null,'same-origin'].includes(request.headers.get('sec-fetch-site')))return reply({error:'Niet toegestaan.'},403);
 if(request.headers.get('content-type')?.split(';')[0]!=='application/json')return reply({error:'Ongeldig verzoek.'},415);
 const reader=request.body?.getReader();if(!reader)return reply({},400);
 try{
  const chunks:Uint8Array[]=[];let size=0;while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();return reply({},413);}chunks.push(value);}
  const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks)));
  if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!['command','input'].includes(k))||!body.input||typeof body.input!=='object'||Array.isArray(body.input))return reply({},400);
  if(body.command==='submit')return reply(await submitPartner(body.input));
  if(body.command==='review')return reply(await reviewPartner(body.input));
  if(body.command==='mail')return reply(await partnerMailAction(body.input));
  if(body.command==='mail-health')return reply(await partnerMailHealth());
  if(body.command==='test-create')return reply(await createPartnerTest());
  if(body.command==='delete-preview')return reply(await previewPartnerDeletion(body.input));
  if(body.command==='test-delete')return reply(await deletePartnerTest(body.input));
  return reply({},400);
 }catch(e){return reply({error:e instanceof PartnerError&&e.status===409?'Dossier gewijzigd, of een bestaand e-mailgeverifieerd account met het zakelijke e-mailadres ontbreekt.':'Aanvraag niet verwerkt. Controleer de invoer of neem contact op met business@equipregistry.com.'},e instanceof PartnerError?e.status:e instanceof SyntaxError?400:503);}
 finally{reader.releaseLock();}
}
