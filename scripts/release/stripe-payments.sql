-- LOCAL CANDIDATE ONLY. Production execution requires the user's bundled GO.
-- Existing capability and schema; no new role, service, subscription or public API.
BEGIN;
SET LOCAL lock_timeout='2s';
SET LOCAL statement_timeout='30s';
CREATE TABLE registry_private.payment_attempt (
 id uuid PRIMARY KEY, registration_id text NOT NULL REFERENCES public."RegistrationRequest"(id),
 user_id text NOT NULL REFERENCES public."User"(id), account_id text NOT NULL,
 mode text NOT NULL CHECK(mode IN ('test','live')), category text NOT NULL,
 price_id text NOT NULL, product_id text NOT NULL, parameters jsonb NOT NULL,
 state text NOT NULL DEFAULT 'creating' CHECK(state IN ('creating','open','processing','paid','discounted','expired','failed','canceled','partially_refunded','refunded','disputed')),
 session_id text UNIQUE, customer_id text, intent_id text, invoice_id text,
 invoice_number text, invoice_url text, invoice_pdf text, receipt_url text,
 amount_total bigint, amount_refunded bigint NOT NULL DEFAULT 0, currency text,
 invoice_status text, tax_status text, amount_tax bigint, amount_discount bigint,
 created_at timestamptz NOT NULL DEFAULT clock_timestamp(), updated_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE UNIQUE INDEX payment_one_active ON registry_private.payment_attempt(registration_id)
 WHERE state IN ('creating','open','processing');
CREATE INDEX payment_intent ON registry_private.payment_attempt(intent_id);
CREATE TABLE registry_private.payment_event (
 account_id text NOT NULL, event_id text NOT NULL, mode text NOT NULL,
 attempt_id uuid REFERENCES registry_private.payment_attempt(id), event_type text NOT NULL,
 outcome text NOT NULL, created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 PRIMARY KEY(account_id,event_id)
);
CREATE TABLE registry_private.payment_grant (
 user_id text PRIMARY KEY REFERENCES public."User"(id), reason text NOT NULL,
 granted_at timestamptz NOT NULL DEFAULT clock_timestamp(), expires_at timestamptz,
 CHECK(length(reason) BETWEEN 1 AND 500)
);
-- Deliberately empty: the user will designate pilot members later.
ALTER TABLE registry_private.payment_attempt ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_private.payment_attempt FORCE ROW LEVEL SECURITY;
ALTER TABLE registry_private.payment_event ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_private.payment_event FORCE ROW LEVEL SECURITY;
ALTER TABLE registry_private.payment_grant ENABLE ROW LEVEL SECURITY;
ALTER TABLE registry_private.payment_grant FORCE ROW LEVEL SECURITY;
REVOKE ALL ON registry_private.payment_attempt,registry_private.payment_event,registry_private.payment_grant FROM PUBLIC,anon,authenticated;
GRANT USAGE ON SCHEMA registry_private TO er_registration_runtime,er_platform_runtime;
GRANT SELECT,INSERT,UPDATE ON registry_private.payment_attempt TO er_registration_runtime;
GRANT SELECT,INSERT ON registry_private.payment_event TO er_registration_runtime;
GRANT SELECT ON registry_private.payment_grant TO er_registration_runtime;
GRANT SELECT ON registry_private.payment_attempt,registry_private.payment_event,registry_private.payment_grant TO er_platform_runtime;
CREATE POLICY payment_runtime ON registry_private.payment_attempt TO er_registration_runtime USING(true) WITH CHECK(true);
CREATE POLICY payment_events_read ON registry_private.payment_event FOR SELECT TO er_registration_runtime USING(true);
CREATE POLICY payment_events_insert ON registry_private.payment_event FOR INSERT TO er_registration_runtime WITH CHECK(true);
CREATE POLICY payment_grants_read ON registry_private.payment_grant FOR SELECT TO er_registration_runtime USING(true);
CREATE POLICY payment_admin_read ON registry_private.payment_attempt FOR SELECT TO er_platform_runtime USING(true);
CREATE POLICY payment_admin_events ON registry_private.payment_event FOR SELECT TO er_platform_runtime USING(true);
CREATE POLICY payment_admin_grants ON registry_private.payment_grant FOR SELECT TO er_platform_runtime USING(true);
COMMIT;
