import 'server-only';
import {platformDb} from '@/lib/db-capabilities';
import {partnerMessage,type PartnerMail} from '@/lib/email/partner-message';
import {sendPartnerEmail,partnerDeliveryStatus} from '@/lib/email/mailer';

type MailRow=PartnerMail&{status:string;provider_id:string|null};
// Called only with a server-created ID or after verified-platform-admin authorization.
export async function dispatchPartnerMail(applicationId:string) {
 const rows=await platformDb.$queryRaw<MailRow[]>`SELECT * FROM portal_private.partner_mail WHERE application_id=${applicationId}::uuid AND status<>'HOLD' AND (delivery IS NULL OR delivery NOT IN ('delivered','opened','clicked','bounced','complained','failed','suppressed','canceled')) ORDER BY (status='PENDING') DESC,(provider_id IS NULL) DESC,version,kind LIMIT 5`;
 for(const row of rows){
  if(row.provider_id){
   const status=await partnerDeliveryStatus(row.provider_id);
   if(status)await platformDb.$executeRaw`UPDATE portal_private.partner_mail SET delivery=${status},checked_at=clock_timestamp() WHERE id=${row.id}::uuid`;
   continue;
  }
  // After 23h an ambiguous send requires reconciliation, never a fresh send.
  await platformDb.$executeRaw`UPDATE portal_private.partner_mail SET status='HOLD',error_code='reconciliation_required' WHERE id=${row.id}::uuid AND provider_id IS NULL AND first_attempt_at<clock_timestamp()-interval '23 hours' AND status IN ('RETRY','SENDING')`;
  const claimed=await platformDb.$queryRaw<MailRow[]>`UPDATE portal_private.partner_mail SET status='SENDING',attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,clock_timestamp()),attempted_at=clock_timestamp(),error_code=NULL WHERE id=${row.id}::uuid AND provider_id IS NULL AND (status IN ('PENDING','RETRY') OR (status='SENDING' AND attempted_at<clock_timestamp()-interval '2 minutes')) AND (first_attempt_at IS NULL OR first_attempt_at>clock_timestamp()-interval '23 hours') RETURNING *`;
  if(!claimed.length)continue;
  const result=await sendPartnerEmail(partnerMessage(claimed[0]),`er-b2b/${row.id}`);
  if(result.ok){
   await platformDb.$executeRaw`UPDATE portal_private.partner_mail SET status='ACCEPTED',provider_id=${result.id},error_code=NULL WHERE id=${row.id}::uuid AND provider_id IS NULL`;
  }else{
   const code=result.code.replace(/[^a-z0-9_]/gi,'').slice(0,80)||'send_failed';
   await platformDb.$executeRaw`UPDATE portal_private.partner_mail SET status='RETRY',error_code=${code} WHERE id=${row.id}::uuid AND provider_id IS NULL`;
   console.warn('PARTNER_MAIL_RETRY',{mailId:row.id,code});
  }
 }
}
export async function attemptPartnerMail(id:string){
 try{await dispatchPartnerMail(id);}catch{console.warn('PARTNER_MAIL_PENDING',{applicationId:id});}
}
