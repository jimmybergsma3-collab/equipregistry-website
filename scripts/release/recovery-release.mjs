import {createHash} from 'node:crypto';
import {readFileSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {verifyCandidate} from './verify-candidate.mjs';
export async function recoveryRelease(root,manifest,baseline,evidence,evidenceDirectory){
 await verifyCandidate(root,manifest,baseline);
 const fail=m=>{throw Error(m)};
 if(!evidence||evidence.sourceManifestSha256!==createHash('sha256').update(JSON.stringify(manifest)).digest('hex'))fail('RECOVERY_SOURCE_MISMATCH');
 const required=['databaseBackupVerified','storageBackupVerified','postSnapshotNumbersReconciled','rolesAndPoliciesVerified','signingKeysAvailable','oldWritersDrained','restoreTargetIsolated'];
 for(const name of required)if(evidence[name]!==true)fail('RECOVERY_EVIDENCE_MISSING:'+name);
 if(!/^[a-f0-9]{64}$/.test(evidence.databaseBackupSha256??'')||!/^[a-f0-9]{64}$/.test(evidence.storageManifestSha256??''))fail('BACKUP_HASH_REQUIRED');
 if(!Array.isArray(evidence.checks)||evidence.checks.length!==required.length||new Set(evidence.checks.map(x=>x.name)).size!==required.length)fail('EVIDENCE_REFERENCES_REQUIRED');
 const evidenceRoot=realpathSync(evidenceDirectory);
 for(const name of required){const check=evidence.checks.find(x=>x.name===name);if(!check||!/^[a-f0-9]{64}$/.test(check.artifactSha256??'')||typeof check.path!=='string'||path.isAbsolute(check.path)||check.path.split(/[\\/]/).includes('..'))fail('EVIDENCE_REFERENCE_MISSING:'+name);
  const file=realpathSync(path.resolve(evidenceRoot,check.path));if(!file.startsWith(evidenceRoot+path.sep)||createHash('sha256').update(readFileSync(file)).digest('hex')!==check.artifactSha256)fail('EVIDENCE_HASH_MISMATCH:'+name);
 }
 // Evidence semantics still require operator review; this verifier never opens writers.
 return {compatibleSource:true,productionAuthorized:false,activateWriters:false,recoveryMode:'closed until independent release approval',databaseBackupSha256:evidence.databaseBackupSha256,sourceManifestSha256:evidence.sourceManifestSha256};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/recovery-release.mjs')){
 try{const [root,manifest,baseline,evidence,evidenceDirectory]=process.argv.slice(2);console.log(JSON.stringify(await recoveryRelease(root,JSON.parse(readFileSync(manifest)),readFileSync(baseline),JSON.parse(readFileSync(evidence)),evidenceDirectory),null,2))}catch(e){console.error(e.message);process.exitCode=1}
}
