import StripeCheckoutButton from './stripe-checkout-button';
import { paymentDetails } from '@/lib/stripe/payments';
import { eligibleApplicant } from '@/lib/stripe/policy';

export default async function PaymentPanel({id,userId,lang,status,applicant,admin=false}:{id:string;userId:string;lang:string;status:string;applicant:string;admin?:boolean}){
 if(!process.env.ER_CHECKOUT_MODE||process.env.ER_CHECKOUT_MODE==='off')return null;
 const p=await paymentDetails(id,userId,admin);
 const nl=lang==='nl',es=lang==='es';
 const labels:Record<string,string>={creating:'Checkout wordt voorbereid',open:'Betaling open',processing:'Betaling wordt verwerkt',paid:'Betaald',discounted:'Volledig verrekend met korting',failed:'Betaling mislukt',expired:'Betaalsessie verlopen',canceled:'Betaling geannuleerd',refunded:'Terugbetaald — handmatige opvolging',partially_refunded:'Gedeeltelijk terugbetaald — handmatige opvolging',disputed:'Betwiste betaling — handmatige opvolging'};
 const retry=!p||['creating','open','expired','failed','canceled'].includes(p.state);
 if(!p&&status!=='payment_required')return null;
 return <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6" aria-label="Payment">
   <h2 className="text-lg font-semibold">{nl?'Betaling':es?'Pago':'Payment'}</h2>
   <p className="my-2 text-sm">{nl?'Betaling of korting geeft geen verificatie, eigendomsbevestiging, paspoort of QR-code. Handmatige beoordeling blijft vereist.':es?'El pago o descuento no verifica la propiedad ni emite un pasaporte o código QR. Se requiere revisión manual.':'Payment or a discount does not verify ownership or issue a passport or QR code. Manual review is required.'}</p>
   {p?<p className="my-2">{nl?labels[p.state]:p.state.replaceAll('_',' ')}</p>:null}
   {!admin&&status==='payment_required'&&eligibleApplicant(applicant)&&retry?<StripeCheckoutButton registrationId={id} lang={lang}/>:null}
   {p?.invoice_url?<p><a className="underline" href={p.invoice_url} rel="noreferrer">{nl?'Factuur':es?'Factura':'Invoice'} {p.invoice_number}</a></p>:null}
   {p?.receipt_url?<p><a className="underline" href={p.receipt_url} rel="noreferrer">{nl?'Betaalbewijs (geen fiscale factuur)':es?'Recibo de pago (no es una factura fiscal)':'Payment receipt (not a tax invoice)'}</a></p>:null}
 </section>;
}
