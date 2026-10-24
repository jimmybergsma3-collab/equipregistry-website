import {pathToFileURL} from 'node:url';

export const databaseProfiles = Object.freeze({
 ER_REGISTRATION_DATABASE_URL:'registration_app',
 ER_IMPORT_DATABASE_URL:'import_app',
 ER_ORGANIZATION_DATABASE_URL:'organization_app',
 ER_BUSINESS_DATABASE_URL:'business_reader',
 ER_PLATFORM_DATABASE_URL:'platform_app',
});

// Offline only. Never returns URL values, passwords, key material or error messages
// from a URL parser. A valid configuration is not evidence of deployed credentials.
export function configurationPreflight(env, target) {
 const blocked=[], seenPasswords=new Set();
 if(!target || !['production','rehearsal'].includes(target.mode) ||
    typeof target.host!=='string' || !target.host || typeof target.database!=='string' || !target.database)
  throw Error('EXPLICIT_DATABASE_TARGET_REQUIRED');
 for(const [key,login] of Object.entries(databaseProfiles)) {
  try {
   const value=env[key];
   if(typeof value!=='string'||!value) {blocked.push({key,reason:'MISSING'});continue;}
   const u=new URL(value), password=decodeURIComponent(u.password);
   const pooler=u.hostname.endsWith('.pooler.supabase.com');
   const ref=env.ER_DATABASE_PROJECT_REF??'';
   const expectedLogin=pooler?`${login}.${ref}`:login;
   if(pooler && (!/^[a-z]{20}$/.test(ref) || ref!==target.projectRef ||
      u.hostname!==env.ER_DATABASE_POOLER_HOST || u.port!=='5432' ||
      u.pathname!=='/postgres' || u.searchParams.get('sslmode')!=='require' ||
      u.searchParams.get('sslaccept')!=='strict')) throw Error('INVALID');
   if(u.protocol!=='postgresql:' || decodeURIComponent(u.username)!==expectedLogin || !password || u.hash)
    throw Error('INVALID');
   if(u.hostname!==target.host || decodeURIComponent(u.pathname.slice(1))!==target.database)
    blocked.push({key,reason:'TARGET_MISMATCH'});
   const allowed=['sslmode','sslaccept','sslcert','connection_limit','pool_timeout','connect_timeout','pgbouncer'];
   if([...u.searchParams.keys()].some(k=>!allowed.includes(k)) || new Set(u.searchParams.keys()).size!==[...u.searchParams.keys()].length)
    blocked.push({key,reason:'UNREVIEWED_URL_OPTIONS'});
   if(target.mode==='production' && u.searchParams.get('sslmode')!=='require')
    blocked.push({key,reason:'EXPLICIT_TLS_REQUIRED'});
   if(target.mode==='production' && u.searchParams.get('sslaccept')!=='strict')
    blocked.push({key,reason:'CERTIFICATE_VALIDATION_REQUIRED'});
   if(u.searchParams.has('sslcert') && (!env.ER_DATABASE_CA_PATH || u.searchParams.get('sslcert')!==env.ER_DATABASE_CA_PATH))
    blocked.push({key,reason:'UNREVIEWED_CA_PATH'});
   if(seenPasswords.has(password))blocked.push({key,reason:'SHARED_PASSWORD'});
   seenPasswords.add(password);
  } catch {blocked.push({key,reason:'INVALID_URL_OR_LOGIN'});}
 }
 for(const key of ['ER_SESSION_SECRET','ER_UPLOAD_BINDING_SECRET'])
  if(typeof env[key]!=='string'||Buffer.byteLength(env[key],'utf8')<32)blocked.push({key,reason:'MISSING_OR_SHORT'});
 if(env.ER_SESSION_SECRET && env.ER_SESSION_SECRET===env.ER_UPLOAD_BINDING_SECRET)
  blocked.push({key:'ER_UPLOAD_BINDING_SECRET',reason:'SHARED_SIGNING_KEY'});
 return {configuration:blocked.length?'BLOCKED':'PASS',blocked,productionAuthorized:false,
  authentication:'UNTESTED',deployedMapping:'UNPROVEN',restoreKeyCustody:'UNPROVEN'};
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
 try {
  const [mode,host,database,projectRef]=process.argv.slice(2);
  const result=configurationPreflight(process.env,{mode,host,database,projectRef});
  console.log(JSON.stringify(result,null,2));if(result.configuration!=='PASS')process.exitCode=2;
 } catch {console.error('EXPLICIT_DATABASE_TARGET_REQUIRED');process.exitCode=1;}
}
