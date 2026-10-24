import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

// Static dependency evidence, including authentication dependencies. Command-level
// splits inside services are recorded separately; this is not a permission grant.
export function routeRoleMap(root) {
 const files=[];
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.tsx?$/.test(p))files.push(path.relative(root,p).replaceAll('\\','/'));}}
 for(const dir of ['app','lib','components'])walk(path.join(root,dir));
 const graph=new Map(),direct=new Map();
 const names={registrationDb:'registration_app',importDb:'import_app',organizationDb:'organization_app',businessDb:'business_reader',platformDb:'platform_app'};
 function resolve(file,spec){const p=spec.startsWith('@/')?spec.slice(2):spec.startsWith('.')?path.posix.normalize(path.posix.join(path.posix.dirname(file),spec)):null;if(!p)return null;return [p,p+'.ts',p+'.tsx',p+'/index.ts',p+'/index.tsx'].find(n=>files.includes(n));}
 for(const file of files){const source=fs.readFileSync(path.join(root,file),'utf8'),ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true);const deps=[],roles=new Set();
  for(const n of ast.statements){if(!(ts.isImportDeclaration(n)||ts.isExportDeclaration(n))||!n.moduleSpecifier||!ts.isStringLiteral(n.moduleSpecifier))continue;const dep=resolve(file,n.moduleSpecifier.text);if(dep==='lib/db-capabilities.ts'){
    const text=n.getText(ast);for(const [symbol,role]of Object.entries(names))if(new RegExp('\\b'+symbol+'\\b').test(text))roles.add(role);
   }else if(dep)deps.push(dep);}
  graph.set(file,deps);direct.set(file,roles);
  if(file!=='lib/db-capabilities.ts'&&/new\s+PrismaClient\s*\(/.test(source))throw Error('UNROUTED_CLIENT:'+file);
 }
 function roles(file,seen=new Set()){if(seen.has(file))return [];seen.add(file);return [...(direct.get(file)||[]),...(graph.get(file)||[]).flatMap(d=>roles(d,seen))];}
 const routes=files.filter(f=>f.startsWith('app/')&&/(?:^|\/)(?:route|page|actions)\.tsx?$/.test(f)).map(file=>({file,roles:[...new Set(roles(file))].sort()}));
 return {scope:'static server dependency reachability; authentication uses registration_app',routes,
  serviceSplits:{'lib/organizations/service.ts':'ordinary commands organization_app; activateOrganization platform_app',
   'lib/organizations/governance.ts':'ordinary consent/revoke/leave/archive organization_app; propose/apply/closure/retention platform_app',
   'lib/business/provisioning.ts':'synthetic-only request organization_app; review platform_app; subject.create business_reader'},
  constraints:['No DATABASE_URL fallback or derived credential','Public projection and tenant authorization remain in existing trusted services','Existing synthetic-only and feature flags remain required']};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(routeRoleMap(path.resolve(process.argv[2]||'.')),null,2));
