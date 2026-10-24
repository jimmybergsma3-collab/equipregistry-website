-- Read-only adoption/role evidence. Never establishes baseline adoption by itself.
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY;
SET LOCAL statement_timeout='15s';
SET LOCAL lock_timeout='2s';
SELECT current_database(),current_user,version();
SELECT rolname,rolsuper,rolcreaterole,rolcreatedb,rolreplication,rolbypassrls,rolinherit,rolcanlogin,rolconnlimit FROM pg_roles ORDER BY rolname;
SELECT role.rolname AS granted_role,member.rolname AS member,m.admin_option FROM pg_auth_members m JOIN pg_roles role ON role.oid=m.roleid JOIN pg_roles member ON member.oid=m.member ORDER BY 1,2;
SELECT grantee,table_schema,table_name,privilege_type FROM information_schema.role_table_grants WHERE table_schema IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2,3,4;
SELECT n.nspname,c.relname,c.relkind,c.relrowsecurity,c.relforcerowsecurity,pg_get_userbyid(c.relowner) owner,c.relacl FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2;
SELECT table_schema,table_name,column_name,ordinal_position,data_type,udt_name,is_nullable,column_default FROM information_schema.columns WHERE table_schema IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2,4;
SELECT n.nspname,c.conname,pg_get_constraintdef(c.oid) FROM pg_constraint c JOIN pg_namespace n ON n.oid=c.connamespace WHERE n.nspname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2;
SELECT schemaname,tablename,indexname,indexdef FROM pg_indexes WHERE schemaname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2,3;
SELECT n.nspname,c.relname,t.tgname,pg_get_triggerdef(t.oid) FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid JOIN pg_namespace n ON n.oid=c.relnamespace WHERE NOT t.tgisinternal AND n.nspname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2,3;
SELECT n.nspname,p.proname,p.prosecdef,p.proconfig,pg_get_userbyid(p.proowner),p.proacl,pg_get_functiondef(p.oid) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE p.prokind='f' AND n.nspname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY 1,2;
SELECT * FROM pg_policies WHERE schemaname IN ('public','incident_private','governance_private','import_private','business_private','portal_private','platform_private','registry_private') ORDER BY schemaname,tablename,policyname;
SELECT to_regclass('public._prisma_migrations') AS existing_ledger;
SELECT * FROM pg_default_acl ORDER BY oid;
ROLLBACK;
