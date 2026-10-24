import {notFound} from 'next/navigation';
import {isValidLang} from '@/lib/i18n/config';
import WorkspacePage, {type Search} from '@/components/registry/workspace-page';
export const dynamic='force-dynamic';
export const metadata={title:'Registratieoverzicht | EquipRegistry',robots:{index:false,follow:false}};
export default async function Page({params,searchParams}:{params:Promise<{lang:string}>;searchParams:Promise<Search>}){const {lang}=await params;if(!isValidLang(lang))notFound();return <WorkspacePage lang={lang} admin search={await searchParams}/>;}
