import {notFound} from 'next/navigation';
import {portalEnabled} from '@/lib/business/portal';
import {isValidLang} from '@/lib/i18n/config';
import {platformEnabled} from '@/lib/platform/service';
import BusinessPortalNL from '@/components/business/portal-nl';
import BusinessPortal from '@/components/business/portal';
import WorkspacePage,{type Search} from '@/components/registry/workspace-page';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{lang:string}>;searchParams:Promise<Search>}){if(!portalEnabled())notFound();const {lang}=await params;if(!isValidLang(lang))notFound();const search=await searchParams;const Management=lang==='nl'?BusinessPortalNL:BusinessPortal;return search.view==='management'?<Management lang={lang} platformManagementEnabled={platformEnabled()}/>:<WorkspacePage lang={lang} admin={false} search={search}/>;}
