import 'server-only';
import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'node:async_hooks';

// Fixed server-side routing; no request-controlled role or DATABASE_URL fallback.
const profiles = {
  registration: ['ER_REGISTRATION_DATABASE_URL', 'registration_app', 'er_registration_runtime'],
  imports: ['ER_IMPORT_DATABASE_URL', 'import_app', 'er_import_runtime'],
  organization: ['ER_ORGANIZATION_DATABASE_URL', 'organization_app', 'er_organization_runtime'],
  business: ['ER_BUSINESS_DATABASE_URL', 'business_reader', 'er_business_runtime'],
  platform: ['ER_PLATFORM_DATABASE_URL', 'platform_app', 'er_platform_runtime'],
} as const;
type Capability = keyof typeof profiles;
const unavailable = () => new Error('Database capability unavailable.');

export function capabilityUrl(capability: Capability): string {
  try {
    const [key, login] = profiles[capability];
    const value = process.env[key];
    if (!value) throw unavailable();
    const url = new URL(value);
    const pooler = url.hostname.endsWith('.pooler.supabase.com');
    const projectRef = process.env.ER_DATABASE_PROJECT_REF ?? '';
    const expectedLogin = pooler ? `${login}.${projectRef}` : login;
    if (pooler && (!/^[a-z]{20}$/.test(projectRef) ||
        url.hostname !== process.env.ER_DATABASE_POOLER_HOST || url.port !== '5432' ||
        url.pathname !== '/postgres' || url.searchParams.get('sslmode') !== 'require' ||
        url.searchParams.get('sslaccept') !== 'strict')) throw unavailable();
    if (url.protocol !== 'postgresql:' || decodeURIComponent(url.username) !== expectedLogin || !url.password ||
        !url.hostname || url.pathname.length < 2 || url.hash) throw unavailable();
    if (new Set(url.searchParams.keys()).size !== [...url.searchParams.keys()].length) throw unavailable();
    for (const [key] of url.searchParams) {
      if (!['sslmode', 'sslaccept', 'sslcert', 'connection_limit', 'pool_timeout', 'connect_timeout', 'pgbouncer'].includes(key)) throw unavailable();
    }
    if (url.searchParams.has('sslaccept') && url.searchParams.get('sslaccept') !== 'strict') throw unavailable();
    if (url.searchParams.has('sslcert') && (!process.env.ER_DATABASE_CA_PATH ||
        url.searchParams.get('sslcert') !== process.env.ER_DATABASE_CA_PATH)) throw unavailable();
    for (const [otherKey] of Object.values(profiles)) {
      if (otherKey === key || !process.env[otherKey]) continue;
      let other: URL;
      try { other = new URL(process.env[otherKey]!); } catch { continue; }
      if (decodeURIComponent(other.password) === decodeURIComponent(url.password)) throw unavailable();
    }
    return value;
  } catch { throw unavailable(); }
}

// NOINHERIT memberships count too: SET ROLE can otherwise cross the boundary.
async function validate(client: Prisma.TransactionClient, capability: Capability) {
  const [, login, role] = profiles[capability];
  const rows = await client.$queryRaw<{ valid: boolean }[]>`
    WITH RECURSIVE reachable AS (
      SELECT oid,rolname,rolsuper,rolbypassrls,rolcreatedb,rolcreaterole,rolreplication
      FROM pg_roles WHERE rolname=session_user
      UNION
      SELECT r.oid,r.rolname,r.rolsuper,r.rolbypassrls,r.rolcreatedb,r.rolcreaterole,r.rolreplication
      FROM pg_roles r JOIN pg_auth_members m ON m.roleid=r.oid JOIN reachable p ON p.oid=m.member
    ) SELECT (
      session_user::text=${login} AND current_user::text=${login}
      AND EXISTS(SELECT 1 FROM reachable WHERE rolname=${role})
      AND NOT EXISTS(SELECT 1 FROM reachable WHERE rolsuper OR rolbypassrls OR rolcreatedb OR rolcreaterole OR rolreplication OR rolname::text NOT IN (${login},${role}))
      AND NOT EXISTS(SELECT 1 FROM pg_shdepend WHERE refclassid='pg_authid'::regclass AND refobjid IN (SELECT oid FROM reachable) AND deptype='o')
      AND NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname IN ('public','registry_private','incident_private','import_private','business_private','governance_private','portal_private','platform_private') AND has_schema_privilege(current_user,oid,'CREATE'))
      AND NOT has_column_privilege(current_user,'public."User"','role','UPDATE')
      AND NOT EXISTS(SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
        WHERE n.nspname='platform_private' AND c.relname IN ('founder','provider') AND has_table_privilege(current_user,c.oid,'INSERT'))
      AND NOT EXISTS(SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
        WHERE c.relkind='r' AND n.nspname IN ('public','registry_private','incident_private','import_private','business_private','governance_private','portal_private','platform_private')
        AND (has_table_privilege(current_user,c.oid,'DELETE') OR has_table_privilege(current_user,c.oid,'TRUNCATE')
          OR (NOT c.relrowsecurity AND (has_any_column_privilege(current_user,c.oid,'SELECT') OR has_any_column_privilege(current_user,c.oid,'INSERT') OR has_any_column_privilege(current_user,c.oid,'UPDATE')))))
    ) AS valid`;
  if (rows[0]?.valid !== true) throw unavailable();
}

type Entry = { url: string; client: PrismaClient };
const pools: Partial<Record<Capability, Entry>> = {};
function clientFor(capability: Capability): PrismaClient {
  const url = capabilityUrl(capability);
  const cached = pools[capability];
  if (cached) {
    // Credential rotation requires a restart; never silently reuse an old secret.
    if (cached.url !== url) throw unavailable();
    return cached.client;
  }
  const base = new PrismaClient({ datasourceUrl: url, log: [] });
  const batch = new AsyncLocalStorage<boolean>();
  const extended = base.$extends({ query: { $allOperations: async ({ args, query }) => {
    if (!batch.getStore()) try { await validate(base, capability); } catch { throw unavailable(); }
    return query(args);
  } } }) as unknown as PrismaClient;
  const client = new Proxy(extended, { get(target, property) {
    if (property === '$transaction') return async (...args: unknown[]) => {
      if (typeof args[0] === 'function') {
        const operation = args[0] as (tx: Prisma.TransactionClient) => Promise<unknown>;
        return base.$transaction(async tx => {
          try { await validate(tx, capability); } catch { throw unavailable(); }
          return operation(tx);
        }, args[1] as Parameters<PrismaClient['$transaction']>[1]);
      }
      try { await validate(base, capability); } catch { throw unavailable(); }
      return batch.run(true, () => Reflect.apply(target.$transaction, target, args));
    };
    const value = Reflect.get(target, property);
    return typeof value === 'function' ? value.bind(target) : value;
  } });
  pools[capability] = { url, client };
  return client;
}

function routed(capability: Capability): PrismaClient {
  // Builds need no credentials. The first database operation fails closed.
  return new Proxy({} as PrismaClient, { get(_target, property) {
    const client = clientFor(capability);
    const value = Reflect.get(client, property);
    return typeof value === 'function' ? value.bind(client) : value;
  } });
}
export const registrationDb = routed('registration');
export const importDb = routed('imports');
export const organizationDb = routed('organization');
export const businessDb = routed('business');
export const platformDb = routed('platform');
