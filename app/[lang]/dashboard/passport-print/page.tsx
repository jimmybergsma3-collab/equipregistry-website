import {notFound,redirect} from 'next/navigation';
import {getCurrentUser} from '@/lib/auth/get-current-user';
import {prisma} from '@/lib/db';
import {isValidLang} from '@/lib/i18n/config';
import PassportPage from '../../passport/[registryId]/page';
import PrintSelection from '@/components/registry/print-selection';
export const dynamic='force-dynamic';
export const metadata={title:'Paspoorten afdrukken | EquipRegistry',robots:{index:false,follow:false}};
export default async function Page({params,searchParams}:{params:Promise<{lang:string}>;searchParams:Promise<{ids?:string}>}){
 const {lang}=await params;if(!isValidLang(lang))notFound();
 const user=await getCurrentUser();if(!user)redirect(`/${lang}/login`);
 const raw=(await searchParams).ids;if(typeof raw!=='string'||raw.length>3000)notFound();
 const ids=raw.split(',');if(!ids.length||ids.length>30||new Set(ids).size!==ids.length||ids.some(id=>! /^[a-zA-Z0-9_-]{1,100}$/.test(id)))notFound();
 const records=await prisma.registrationRequest.findMany({where:{id:{in:ids},deletedAt:null,requestStatus:'passport_issued',...(user.role==='admin'?{}:{userId:user.id})},select:{id:true,reference:true}});
 if(records.length!==ids.length)notFound();
 const passports=await Promise.all(ids.map(id=>PassportPage({params:Promise.resolve({lang,registryId:records.find(r=>r.id===id)!.reference})})));
 return <><PrintSelection count={ids.length}/><style>{`@media print { .passport-batch-item + .passport-batch-item { break-before: page; } }`}</style>{passports.map((passport,i)=><div className="passport-batch-item" key={ids[i]}>{passport}</div>)}</>;
}
