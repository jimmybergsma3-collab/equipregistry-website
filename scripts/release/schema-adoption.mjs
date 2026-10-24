import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import path from 'node:path';
export function compareBaseline(observed,baseline) {
 const copy = v => structuredClone(v);
 const left=copy(observed),right=copy(baseline),physical=[];
 for(const value of [left,right]){
  if(!Array.isArray(value.columns)||value.columns.length!==53||value.constraints?.length!==8||value.indexes?.length!==11||value.enums?.length!==3||value.rls?.length!==5)throw Error('COMPLETE_BASELINE_CATALOG_REQUIRED');
  if(JSON.stringify([...new Set(value.columns.map(x=>x.table_name))].sort())!==JSON.stringify(['EmailVerificationToken','Machine','RegistrationRequest','RegistrySequence','User']))throw Error('BASELINE_TABLE_SET_DRIFT');
 }
 const allowed=new Set(['emailVerifiedAt','createdAt','updatedAt']);
 for(const col of left.columns){const other=right.columns.find(x=>x.table_name===col.table_name&&x.column_name===col.column_name);
  if(other&&col.ordinal!==other.ordinal){
   if(col.table_name!=='User'||!allowed.has(col.column_name)||![8,9,10].includes(col.ordinal)||![8,9,10].includes(other.ordinal))throw Error('UNREVIEWED_COLUMN_ORDER');
   physical.push({table:col.table_name,column:col.column_name,observed:col.ordinal,baseline:other.ordinal});
  }
 }
 for(const cat of [left,right]){for(const col of cat.columns)if(col.table_name==='User'&&allowed.has(col.column_name))delete col.ordinal;cat.columns.sort((a,b)=>(a.table_name+'.'+a.column_name).localeCompare(b.table_name+'.'+b.column_name))}
 if(!isDeepStrictEqual(left,right))throw Error('BASELINE_SCHEMA_DRIFT');
 return {equivalent:true,reviewedPhysicalColumnOrder:physical,existingRowsMustNotBeRebuilt:true};
}
export function adoptionPlan(observed,baseline,directory,ledgerPresent) {
 if(ledgerPresent!==false)throw Error('EXISTING_OR_UNKNOWN_LEDGER_REQUIRES_REVIEW');
 const comparison=compareBaseline(observed,baseline);
 const names=readdirSync(directory).filter(n=>!n.includes('.')&&n!=='migration_lock.toml').sort();
 if(names.length!==13||names[0]!=='0_equipregistry_baseline')throw Error('MIGRATION_SET_DRIFT');
 const migrations=names.map(name=>({name,sha256:createHash('sha256').update(readFileSync(path.join(directory,name,'migration.sql'))).digest('hex'),action:name===names[0]?'BASELINE_ONLY_AFTER_OPERATOR_APPROVAL':'APPLY_ON_CLONE_FIRST'}));
 return {comparison,migrations,productionAuthorized:false,requires:['fresh snapshot and schema comparison','closed and drained old writers','backup and complete role review','baseline resolve only; never execute baseline CREATE on existing tables','apply remaining twelve migrations in order']};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/schema-adoption.mjs')){
 try{const [observed,baseline,migrations]=process.argv.slice(2);const data=JSON.parse(readFileSync(observed,'utf8'));if(data.ledgerPresent!==false)throw Error('READ_ONLY_LEDGER_EVIDENCE_REQUIRED');console.log(JSON.stringify(adoptionPlan(data.catalog,JSON.parse(readFileSync(baseline,'utf8')),migrations,data.ledgerPresent),null,2))}catch(e){console.error(e.message);process.exitCode=1}
}
