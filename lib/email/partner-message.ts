import {sectors,states} from '@/lib/business/partner-model';
import {MAILBOXES} from './addresses';

export type PartnerMail = {
 id:string; application_id:string; version:number; kind:'internal'|'receipt'|'decision';
 recipient:string; company:string; country:string; sector:keyof typeof sectors;
 state:keyof typeof states; requested_at:Date|string;
};
export function partnerMessage(m:PartnerMail) {
 const footer='Deze aanvraag en beoordeling geven geen automatische zakelijke toegang, lidmaatschap of officiële paspoortverificatie. Vragen? Antwoord op deze e-mail aan business@equipregistry.com.';
 const text=m.kind==='internal'
  ? `Nieuwe zakelijke aanvraag\n\nBedrijf: ${m.company}\nSector: ${sectors[m.sector]}\nLand: ${m.country}\nAanvraagdatum: ${new Date(m.requested_at).toISOString()}\n\nBeveiligd admindossier (inloggen verplicht): https://www.equipregistry.com/nl/admin/partners/${m.application_id}`
  : m.kind==='receipt'
   ? `Wij hebben uw zakelijke aanvraag voor ${m.company} ontvangen. EquipRegistry beoordeelt de bedrijfsidentiteit, officiële registratie, bevoegdheid en toestemming handmatig.\n\n${footer}`
   : `De beoordeling van uw zakelijke aanvraag voor ${m.company} is opgeslagen.\n\nStatus: ${states[m.state]}\n${m.state==='MORE_INFO'?'Neem contact op via business@equipregistry.com om de benodigde aanvullende informatie veilig af te stemmen.\n':''}${m.state==='READY'?'Uw intake is goedgekeurd. De afzonderlijke bedrijfsverificatie en bevoegde activatie zijn nog vereist.\n':''}\n${footer}`;
 return {from:`EquipRegistry <${MAILBOXES.business}>`,replyTo:MAILBOXES.business,to:m.recipient,
  subject:m.kind==='internal'?'Nieuwe zakelijke aanvraag — EquipRegistry':m.kind==='receipt'?'Uw zakelijke aanvraag is ontvangen — EquipRegistry':'Beoordeling zakelijke aanvraag — EquipRegistry',
  text,html:`<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}</div>${m.kind==='internal'?`<p><a href="https://www.equipregistry.com/nl/admin/partners/${m.application_id}">Open beveiligd admindossier</a></p>`:''}`};
}
