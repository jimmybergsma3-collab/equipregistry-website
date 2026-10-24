import { getCategoryByValue, getSubcategoryByValue } from '../registry/categories';
import { getPricingCategory, PRICING, type AssetPricingCategory } from '../registry/pricing';

export class PaymentError extends Error {
  constructor(public status = 409, public code = 'PAYMENT_UNAVAILABLE') { super(code); }
}
export const LIVE_ACCOUNT = 'acct_1USKUF2OF297QMAo';
// Non-secret live Price IDs supplied by the account owner, 2026-10-23.
export const LIVE_PRICES: Record<AssetPricingCategory,string> = {
 light_mobility:'price_1USj0B2OF297QMAon6Qm3CeX',vehicles:'price_1USj192OF297QMAoOHiNa9k1',
 machines:'price_1USj1s2OF297QMAoSNSSPsIn',agriculture:'price_1USj2R2OF297QMAo0HyIiNnS',
 construction:'price_1USj2y2OF297QMAoAqS0VcX8',marine:'price_1USj3P2OF297QMAojQE9nh9D',
 energy:'price_1USj3t2OF297QMAoaOgeH2oB',industry:'price_1USj4H2OF297QMAo1r92q7KP',
};
// Observed in the separate EquipRegistry LIVE catalog. Never sent by the browser.
export const LIVE_PRODUCTS: Record<AssetPricingCategory, string> = {
  light_mobility:'prod_VTgMSfg1dahTcB', vehicles:'prod_VTgNgtfW6EWFxN',
  machines:'prod_VTgOTqa1qQqCHe', agriculture:'prod_VTgP7Uw31ryv3P',
  construction:'prod_VTgPvDj10aKMnJ', marine:'prod_VTgQmklUiy9V1h',
  energy:'prod_VTgQefNBezTgFk', industry:'prod_VTgRAn2QztDAfm',
};
export function paymentMode(env: NodeJS.ProcessEnv = process.env) {
  if (env.ER_CHECKOUT_MODE === 'test') return 'test' as const;
  if (env.ER_CHECKOUT_MODE === 'live' && env.ER_CHECKOUT_LIVE_APPROVED === 'true') return 'live' as const;
  throw new PaymentError(503, 'CHECKOUT_DISABLED');
}
export function eligibleApplicant(applicant: string) { return applicant === 'private' || applicant === 'sme'; }
export function categoryForPayment(category: string, subcategory: string) {
  const c = getCategoryByValue(category, 'en');
  if (!c || !getSubcategoryByValue(category, subcategory, 'en')) throw new PaymentError(400, 'INVALID_CATEGORY');
  return getPricingCategory(c.value, subcategory);
}
export function configuredPrice(category: AssetPricingCategory, env: NodeJS.ProcessEnv = process.env) {
  const mode = paymentMode(env);
  const id = mode==='live'?LIVE_PRICES[category]:env[`ER_STRIPE_TEST_PRICE_${category.toUpperCase()}`]?.trim();
  if (!id || !/^price_[a-zA-Z0-9]+$/.test(id)) throw new PaymentError(503, 'PRICE_NOT_CONFIGURED');
  return { mode, id, amount: Math.round(PRICING[category].registration * 100) };
}
export function appOrigin(env: NodeJS.ProcessEnv = process.env) {
  const url = new URL(env.NEXT_PUBLIC_APP_URL || '');
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
    (url.protocol !== 'https:' && !(paymentMode(env) === 'test' && url.hostname === '127.0.0.1'))) {
    throw new PaymentError(503, 'INVALID_APP_ORIGIN');
  }
  return url.origin;
}
export function validOrigin(request: Request) {
  const canonical = appOrigin();
  const allowed = new Set([canonical]);
  // Both verified public domains serve the same application. Never trust Host or forwarded headers.
  if (canonical === 'https://equipregistry.com' || canonical === 'https://www.equipregistry.com') {
    allowed.add('https://equipregistry.com');
    allowed.add('https://www.equipregistry.com');
  }
  const origin = request.headers.get('origin');
  return origin !== null && allowed.has(origin) && request.headers.get('sec-fetch-site') !== 'cross-site';
}
export function checkoutReturnOrigin(origin?: string) {
  if (origin === undefined) return appOrigin();
  if (!validOrigin(new Request(appOrigin(), { headers: { origin } }))) {
    throw new PaymentError(403, 'INVALID_RETURN_ORIGIN');
  }
  return origin;
}
export type PaymentState = 'creating'|'open'|'processing'|'paid'|'discounted'|'expired'|'failed'|'canceled'|'partially_refunded'|'refunded'|'disputed';
export function settled(state: PaymentState) { return state === 'paid' || state === 'discounted'; }
export function nextReviewStatus(current: string, state: PaymentState) {
  // This function can only enter the manual review queue. It cannot approve or issue anything.
  return current === 'payment_required' && settled(state) ? 'submitted' : current;
}
