import {readFile,stat,realpath,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const hash=b=>createHash('sha256').update(b).digest('hex');
export async function verifyCandidate(root,manifest,baseline){
 const results=[];const resolved=await realpath(root);
 const seen=[];async function walk(dir,prefix=''){for(const item of await readdir(dir,{withFileTypes:true})){const name=prefix+item.name;if(['node_modules','.next','.git'].includes(item.name)&&item.isDirectory())continue;if(item.isSymbolicLink())throw Error('SOURCE_SYMLINK:'+name);if(item.isDirectory())await walk(path.join(dir,item.name),name+'/');else if(!['next-env.d.ts','tsconfig.tsbuildinfo'].includes(name)||Object.hasOwn(manifest.files,name))seen.push(name)}}await walk(resolved);if(JSON.stringify(seen.sort())!==JSON.stringify(Object.keys(manifest.files).sort()))throw Error('SOURCE_SET_DRIFT');for(const [name,expected] of Object.entries(manifest.files)){
  if(path.isAbsolute(name)||name.includes('\\')||name.split('/').includes('..')||!expected?.match(/^[a-f0-9]{64}$/))throw Error('INVALID_MANIFEST');
  const target=path.resolve(resolved,name);if(!target.startsWith(resolved+path.sep))throw Error('INVALID_PATH');
  if(!(await realpath(target)).startsWith(resolved+path.sep)||!(await stat(target)).isFile()||hash(await readFile(target))!==expected)throw Error('SOURCE_DRIFT:'+name);
 }
 if(hash(baseline)!=='b28bc4edfa3f7cfc72680c067817cc5d0edd7a98791945ff029d143eacd26415')throw Error('FREEZE_BASELINE_CHANGED');
 const blocks=JSON.parse(baseline.toString('utf8')).blocks;if(blocks.length!==210)throw Error('FREEZE_COUNT');
 for(const b of blocks)if(!(await readFile(path.join(root,b.path),'utf8')).includes(b.snippet))throw Error('FREEZE_CHANGED:'+b.path);
 results.push({check:'exact_manifest',files:Object.keys(manifest.files).length,pass:true},{check:'original_freeze',blocks:210,pass:true});
 return {localSourceIntegrity:'PASS',production:'NO-GO',results,reason:'Source integrity alone cannot certify live writers, storage, identity providers, role deployment, recovery or dependency safety.'};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/verify-candidate.mjs')){
 try{const [root,manifest,baseline]=process.argv.slice(2);const result=await verifyCandidate(root,JSON.parse(await readFile(manifest,'utf8')),await readFile(baseline));process.stdout.write(JSON.stringify(result,null,2)+'\n')}catch(e){process.stderr.write(String(e.message)+'\n');process.exitCode=1}
}
