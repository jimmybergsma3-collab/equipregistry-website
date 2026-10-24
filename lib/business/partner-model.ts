export const sectors = {rental:'Verhuurbedrijf',insurance:'Verzekeraar',bank:'Bank',finance:'Financier',leasing:'Leasemaatschappij',oem:'OEM'};
export const states = {SUBMITTED:'Ingediend',UNDER_REVIEW:'In beoordeling',MORE_INFO:'Meer informatie nodig',REJECTED:'Afgewezen',READY:'Intake goedgekeurd — verificatie vereist'};
export class PartnerError extends Error { constructor(public status=400){super('Aanvraag niet beschikbaar.');} }
export function clean(value:unknown,max:number){if(typeof value!=='string')throw new PartnerError();const s=value.trim().normalize('NFC');if(!s||s.length>max||/[\x00-\x1f\x7f\u202a-\u202e\u2066-\u2069]/.test(s))throw new PartnerError();return s;}
export function application(input:Record<string,unknown>){
 if(Object.keys(input).some(k=>!['company','country','registration','sector','representative','email','purpose','consent','website'].includes(k))||input.consent!==true||input.website)throw new PartnerError();
 const data={company:clean(input.company,200),country:clean(input.country,2),registration:clean(input.registration,100),sector:clean(input.sector,20),representative:clean(input.representative,200),email:clean(input.email,254).toLowerCase(),purpose:clean(input.purpose,2000)};
 if(!/^[A-Z]{2}$/.test(data.country)||!Object.hasOwn(sectors,data.sector)||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))throw new PartnerError();return data;
}
export type PartnerApplication={id:string;company:string;country:string;registration:string;sector:keyof typeof sectors;representative:string;email:string;purpose:string;state:keyof typeof states;version:number;reviewer_id:string|null;organization_id:string|null;created_at:string;checks:Record<string,boolean>};
