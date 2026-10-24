import { getSession } from '@/lib/auth/getSession';
import { platformEnabled, platformCommand, PlatformError } from '@/lib/platform/service';

export const runtime='nodejs';
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
export async function POST(request:Request){
 if(!platformEnabled())return reply({error:'UNAVAILABLE'},404);
 const session=await getSession();if(!session.isAuthenticated||!session.user.emailVerifiedAt)return reply({error:'SIGN_IN_REQUIRED'},401);
 const url=new URL(request.url),origin=request.headers.has('host')?`${url.protocol}//${request.headers.get('host')}`:url.origin;
 if(request.headers.get('origin')!==origin||![null,'same-origin'].includes(request.headers.get('sec-fetch-site')))return reply({error:'UNAVAILABLE'},403);
 if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return reply({error:'UNAVAILABLE'},415);
 const reader=request.body?.getReader();if(!reader)return reply({error:'INVALID_REQUEST'},400);
 try{
  let size=0;const chunks:Uint8Array[]=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();return reply({error:'INVALID_REQUEST'},413)}chunks.push(value)}
  const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks)));
  if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!['command','input'].includes(k))||typeof body.command!=='string')throw new PlatformError(400);
  return reply({data:await platformCommand(body.command,body.input)});
 }catch(e){const status=e instanceof PlatformError?e.status:e instanceof SyntaxError||e instanceof TypeError?400:503;return reply({error:status===409?'STATE_OR_EVIDENCE_CONFLICT':status===401?'SIGN_IN_REQUIRED':status===400?'INVALID_REQUEST':'UNAVAILABLE'},status)}finally{reader.releaseLock()}
}
