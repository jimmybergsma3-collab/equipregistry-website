import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loader} from './import-fixtures.mjs';
const {validOrigin}=loader()('lib/stripe/policy.ts');
const {checkoutReturnOrigin}=loader()('lib/stripe/policy.ts');
test('Stripe returns to the authenticated host without permitting external redirects',()=>{
 process.env.NEXT_PUBLIC_APP_URL='https://equipregistry.com';
 for(const origin of ['https://www.equipregistry.com','https://equipregistry.com'])assert.equal(checkoutReturnOrigin(origin),origin);
 assert.equal(checkoutReturnOrigin(),'https://equipregistry.com');
 for(const origin of ['https://evil.example','https://equipregistry.com.evil.example','https://equipregistry.com/path','http://equipregistry.com'])assert.throws(()=>checkoutReturnOrigin(origin));
});
function request(origin,site='same-origin',extra={}) {
 return new Request('https://equipregistry.com/api/stripe/checkout',{headers:{...(origin===null?{}:{origin}),'sec-fetch-site':site,...extra}});
}
test('both verified public hosts pass for either canonical host',()=>{
 for(const canonical of ['https://equipregistry.com','https://www.equipregistry.com']){
  process.env.NEXT_PUBLIC_APP_URL=canonical;
  assert(validOrigin(request('https://equipregistry.com')));
  assert(validOrigin(request('https://www.equipregistry.com')));
  assert(validOrigin(request('https://www.equipregistry.com','same-site')));
 }
});
test('foreign origins, lookalikes, HTTP, ports and forged host headers remain rejected',()=>{
 process.env.NEXT_PUBLIC_APP_URL='https://equipregistry.com';
 for(const origin of [null,'null','https://evil.example','https://equipregistry.com.evil.example','https://other.equipregistry.com','http://equipregistry.com','https://equipregistry.com:444','https://equipregistry.com/']){
  assert.equal(validOrigin(request(origin,'same-origin',{host:'equipregistry.com','x-forwarded-host':'equipregistry.com'})),false);
 }
 assert.equal(validOrigin(request('https://equipregistry.com','cross-site')),false);
});
test('other environments do not inherit production domain permissions',()=>{
 process.env.NEXT_PUBLIC_APP_URL='https://preview.example';
 assert(validOrigin(request('https://preview.example')));
 assert.equal(validOrigin(request('https://www.equipregistry.com')),false);
});
