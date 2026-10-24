import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/getSession';
import { platformEnabled } from '@/lib/platform/service';
import { isValidLang } from '@/lib/i18n/config';
import PlatformManagement from '@/components/business/platform-management';

export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{lang:string}>}){
 if(!platformEnabled())notFound();const {lang}=await params;if(!isValidLang(lang))notFound();
 const session=await getSession();if(!session.isAuthenticated||!session.user.emailVerifiedAt)redirect(`/${lang}/login`);
 return <PlatformManagement lang={lang} />;
}
