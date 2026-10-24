import { redirect } from "next/navigation";
import { publicIncidents } from "@/lib/incidents/public-read";
import type {Lang} from "@/lib/i18n/config";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { prisma } from "@/lib/db";
import { getRegistrationStatusDisplay } from "@/lib/registry/request-meta";
import { getCategoryByValue, getRegistryCategories } from "@/lib/registry/categories";
import RegistryWorkspace from "./workspace";

export type Search = Record<string, string | string[] | undefined>;
export default async function WorkspacePage({lang, admin, search}: {lang: string; admin: boolean; search: Search}) {
 const user = await getCurrentUser();
 if (!user || (admin && user.role !== 'admin')) redirect(`/${lang}/${admin ? 'secure-admin-access' : 'login'}`);
 const value = (key: string) => typeof search[key] === 'string' ? String(search[key]) : '';
 const q = value('q').trim().slice(0, 120);
 const page = Math.min(100000, Math.max(1, Number.parseInt(value('page')) || 1));
 const size = [10,30,50].includes(Number(value('size'))) ? Number(value('size')) : 30;
 const sort = ['reference','assetName','category','ownerName','updatedAt'].includes(value('sort')) ? value('sort') : 'updatedAt';
 const direction = value('direction') === 'asc' ? 'asc' : 'desc';
 const base: Prisma.RegistrationRequestWhereInput = {deletedAt: null, ...(admin ? {} : {userId: user.id, requestStatus: 'passport_issued'})};
 const status = value('status');
 const categories=getRegistryCategories(lang as Lang).map(({value,label})=>({value,label}));
 const category=categories.some(c=>c.value===value('category'))?value('category'):'';
 const where: Prisma.RegistrationRequestWhereInput = {...base, ...(category?{category}:{}),
  ...(admin && ['submitted','under_review','approved','passport_issued','more_info_required','rejected'].includes(status) ? {requestStatus: status as Prisma.EnumRegistrationRequestStatusFilter['equals']} : {}),
  ...(q ? {OR: ['reference','assetName','ownerName','serialNumber'].map(key => ({[key]: {contains:q, mode:'insensitive'}}))} : {})};
 const [total, matched, issued, requests] = await Promise.all([
  prisma.registrationRequest.count({where:base}), prisma.registrationRequest.count({where}),
  prisma.registrationRequest.count({where:{...base,requestStatus:'passport_issued'}}),
  prisma.registrationRequest.findMany({where, orderBy:[{[sort]:direction},{id:'asc'}], skip:(page-1)*size,take:size,
   select:{id:true,reference:true,assetName:true,category:true,ownerName:true,requestStatus:true,completenessScore:true,updatedAt:true,dynamicFields:true,serialNumber:true}})
 ]);
 const rows=await Promise.all(requests.map(async r=>({id:r.id, reference:r.reference, assetName:r.assetName, category:getCategoryByValue(r.category,lang as Lang)?.label ?? r.category,
  owner:r.ownerName, status:getRegistrationStatusDisplay(r.dynamicFields,r.requestStatus), issued:r.requestStatus==='passport_issued', score:r.completenessScore,
  updated:r.updatedAt.toISOString(),serial:r.serialNumber, incident: r.requestStatus==='passport_issued' ? await publicIncidents(r.reference,r.dynamicFields) : null})));
 return <RegistryWorkspace key={JSON.stringify(search)} lang={lang} admin={admin} rows={rows} total={total} matched={matched} issued={issued} page={page} size={size} q={q} status={status} sort={sort} direction={direction} category={category} categories={categories} />;
}
