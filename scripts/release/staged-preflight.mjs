import {readFile,realpath} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {verifyCandidate} from './verify-candidate.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
export const gates=Object.freeze({
 DATABASE:['schemaAdoption','numberWriters'],
 SECURITY:['roleComposition','storageRevocationProvenance','workerIsolation','dependencyRisk'],
 ACCOUNTS:['founderAndManualVerification','integralLogin'],
 'BACK-UP':['restoreCompatibility'],
 LIVEGANG:['oldWritersAndDrain','closedDeployment','personalAcceptance'],
});
// Evidence is an operator-reviewed record, not a cryptographic provider attestation.
// This offline checker performs no SQL, network, deployment or writer activation.
export async function stagedPreflight(root,manifest,baseline,packet,directory,now=Date.now()) {
 await verifyCandidate(root,manifest,baseline);
 if(!packet || packet.version!==1 || !['rehearsal','production'].includes(packet.mode) ||
    typeof packet.target!=='string' || !packet.target.trim() || packet.target.length>200 ||
    packet.sourceManifestSha256!==hash(JSON.stringify(manifest)))throw Error('RELEASE_IDENTITY_MISMATCH');
 const expected=Object.values(gates).flat(), seen=new Set(), blocked=[];
 if(!Array.isArray(packet.evidence))throw Error('EVIDENCE_REQUIRED');
 const base=await realpath(directory);
 for(const ref of packet.evidence){
  if(!expected.includes(ref.gate)||seen.has(ref.gate))throw Error('UNKNOWN_OR_DUPLICATE_GATE');seen.add(ref.gate);
  if(typeof ref.path!=='string'||!ref.path||path.isAbsolute(ref.path)||ref.path.includes('\\')||ref.path.split('/').some(p=>!p||p==='.'||p==='..')||!/^[a-f0-9]{64}$/.test(ref.sha256??''))throw Error('INVALID_EVIDENCE_PATH');
  const file=await realpath(path.resolve(base,ref.path));if(!file.startsWith(base+path.sep))throw Error('EVIDENCE_ESCAPE');
  const bytes=await readFile(file);if(hash(bytes)!==ref.sha256)throw Error('EVIDENCE_HASH_MISMATCH');
  const e=JSON.parse(bytes);
  if(e.gate!==ref.gate||e.target!==packet.target||e.sourceManifestSha256!==packet.sourceManifestSha256)throw Error('EVIDENCE_BINDING_MISMATCH');
  const checked=Date.parse(e.checkedAt),expires=Date.parse(e.expiresAt);
  if(!Number.isFinite(checked)||!Number.isFinite(expires)||checked>now||expires<=now||expires<=checked)throw Error('EVIDENCE_TIME_INVALID');
  if(e.status!=='PASS'||typeof e.reviewer!=='string'||!e.reviewer.trim()||typeof e.summary!=='string'||!e.summary.trim()||typeof e.synthetic!=='boolean')blocked.push(ref.gate);
  else if(packet.mode==='production'&&e.synthetic)blocked.push(ref.gate);
 }
 for(const gate of expected)if(!seen.has(gate))blocked.push(gate);
 const groups=Object.fromEntries(Object.entries(gates).map(([name,required])=>[name,{status:required.some(g=>blocked.includes(g))?'BLOCKED':'EVIDENCE_PRESENT',blocked:required.filter(g=>blocked.includes(g))}]));
 return {mode:packet.mode,target:packet.target,groups,evidenceComplete:blocked.length===0,blocked,
 productionAuthorized:false,activateWriters:false,decision:blocked.length?'NO-GO':'REQUIRES_EXPLICIT_RELEASE_APPROVAL'};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/staged-preflight.mjs')){
 try{const [root,manifest,baseline,packet,directory]=process.argv.slice(2);const result=await stagedPreflight(root,JSON.parse(await readFile(manifest)),await readFile(baseline),JSON.parse(await readFile(packet)),directory);console.log(JSON.stringify(result,null,2));if(!result.evidenceComplete)process.exitCode=2}catch(e){console.error(e.message);process.exitCode=1}
}
