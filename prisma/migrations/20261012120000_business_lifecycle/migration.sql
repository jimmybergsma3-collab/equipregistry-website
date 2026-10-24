-- Additive A-D 57.1 candidate. No legacy backfill, ownership update or purge.
CREATE SCHEMA business_private;
REVOKE ALL ON SCHEMA business_private FROM PUBLIC;
CREATE TABLE business_private.subject (
 id uuid PRIMARY KEY, tenant uuid NOT NULL, asset uuid NOT NULL, identity_revision integer NOT NULL,
 version integer NOT NULL DEFAULT 0 CHECK(version>=0), created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 UNIQUE(tenant,asset), FOREIGN KEY(tenant,asset) REFERENCES public."PrivateImportedAsset"("organizationId",id) ON DELETE RESTRICT
);
CREATE TABLE business_private.source (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id),
 reference varchar(100) NOT NULL CHECK(reference LIKE 'SYNTHETIC:%'), digest char(64) NOT NULL CHECK(digest ~ '^[a-f0-9]{64}$'),
 kind text NOT NULL CHECK(kind IN ('AUTHORITY','TRANSFER','FINANCE','CONTACT','HOLD')),
 available boolean NOT NULL DEFAULT true, version integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
CREATE TABLE business_private.assignment (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), reviewer text NOT NULL REFERENCES public."User"(id),
 reviewer_revision text NOT NULL,
 kind text NOT NULL CHECK(kind IN ('AUTHORITY','TRANSFER','FINANCE','HOLD','RELATION')), case_id uuid NOT NULL,
 assigned_by text NOT NULL REFERENCES public."User"(id), expires_at timestamptz NOT NULL, revoked_at timestamptz,
 CHECK(reviewer<>assigned_by)
);
CREATE TABLE business_private.authority (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), principal text NOT NULL REFERENCES public."User"(id),
 party uuid NOT NULL REFERENCES public."Organization"(id), scope text NOT NULL CHECK(scope IN ('TRANSFER_PROPOSE','TRANSFER_ACCEPT','FINANCE_DECLARE','GRANT_ACCESS')),
 source uuid NOT NULL REFERENCES business_private.source(id), reviewer text REFERENCES public."User"(id), assignment uuid REFERENCES business_private.assignment(id),
 membership_version integer NOT NULL, organization_version integer NOT NULL, identity_revision integer NOT NULL,
 account_revision text NOT NULL, reviewed_at timestamptz, expires_at timestamptz, revoked_at timestamptz,
 state text NOT NULL DEFAULT 'PENDING' CHECK(state IN ('PENDING','ACTIVE','REJECTED','REVOKED')),
 version integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(reviewer IS NULL OR reviewer<>principal), CHECK(expires_at IS NULL OR (expires_at>reviewed_at AND expires_at<=reviewed_at+interval '720 hours'))
);
CREATE TABLE business_private.relation (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), party uuid NOT NULL REFERENCES public."Organization"(id),
 authority uuid NOT NULL REFERENCES business_private.authority(id), starts_at timestamptz NOT NULL, ends_at timestamptz, version integer NOT NULL DEFAULT 0,
 necessity_review_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 CHECK(ends_at IS NULL OR ends_at>=starts_at)
);
CREATE UNIQUE INDEX one_current_relation ON business_private.relation(subject) WHERE ends_at IS NULL;
CREATE TABLE business_private.transfer (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), relation uuid NOT NULL REFERENCES business_private.relation(id),
 from_party uuid NOT NULL REFERENCES public."Organization"(id), to_party uuid NOT NULL REFERENCES public."Organization"(id),
 proposer text NOT NULL REFERENCES public."User"(id), receiver text NOT NULL REFERENCES public."User"(id),
 from_authority uuid NOT NULL REFERENCES business_private.authority(id), to_authority uuid NOT NULL REFERENCES business_private.authority(id),
 source uuid NOT NULL REFERENCES business_private.source(id), terms char(64) NOT NULL, subject_version integer NOT NULL,
 reviewer text REFERENCES public."User"(id), assignment uuid REFERENCES business_private.assignment(id),
 state text NOT NULL DEFAULT 'PROPOSED' CHECK(state IN ('PROPOSED','REVIEWED','COMPLETED','CANCELLED','REJECTED')),
 version integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, terminal_at timestamptz,
 CHECK(from_party<>to_party), CHECK(proposer<>receiver), CHECK(expires_at=created_at+interval '168 hours')
);
CREATE UNIQUE INDEX one_open_transfer ON business_private.transfer(subject) WHERE state IN ('PROPOSED','REVIEWED');
CREATE TABLE business_private.acceptance (
 transfer uuid NOT NULL REFERENCES business_private.transfer(id), party text NOT NULL CHECK(party IN ('FROM','TO')),
 actor text NOT NULL REFERENCES public."User"(id), terms char(64) NOT NULL, accepted_at timestamptz NOT NULL,
 PRIMARY KEY(transfer,party), UNIQUE(transfer,actor)
);
CREATE TABLE business_private.finance (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), actor text NOT NULL REFERENCES public."User"(id),
 party uuid NOT NULL REFERENCES public."Organization"(id), counterparty uuid NOT NULL REFERENCES public."Organization"(id),
 authority uuid NOT NULL REFERENCES business_private.authority(id), kind text NOT NULL CHECK(kind IN ('FINANCE','LEASE')),
 contract_reference varchar(100) NOT NULL, source uuid NOT NULL REFERENCES business_private.source(id),
 starts_at timestamptz NOT NULL, ends_at timestamptz, declared_at timestamptz NOT NULL, freshness_until timestamptz NOT NULL,
 state text NOT NULL DEFAULT 'DECLARED' CHECK(state IN ('DECLARED','WITHDRAWN','DISPUTED','SUPERSEDED')), version integer NOT NULL DEFAULT 0, terminal_at timestamptz,
 CHECK(ends_at IS NULL OR ends_at>starts_at), CHECK(freshness_until<=declared_at+interval '2160 hours')
);
CREATE TABLE business_private.confirmation (
 id uuid PRIMARY KEY, finance uuid NOT NULL REFERENCES business_private.finance(id), declaration_version integer NOT NULL,
 reviewer text NOT NULL REFERENCES public."User"(id), assignment uuid NOT NULL REFERENCES business_private.assignment(id),
 source uuid NOT NULL REFERENCES business_private.source(id), contact uuid NOT NULL REFERENCES business_private.source(id),
 scope text NOT NULL CHECK(scope='CONTRACT_EXISTENCE'), confirmed_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, revoked_at timestamptz,
 CHECK(expires_at>confirmed_at AND expires_at<=confirmed_at+interval '2160 hours')
);
CREATE TABLE business_private.grant_access (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), giver text NOT NULL REFERENCES public."User"(id),
 authority uuid NOT NULL REFERENCES business_private.authority(id), authority_version integer NOT NULL,
 recipient text NOT NULL REFERENCES public."User"(id), recipient_party uuid NOT NULL REFERENCES public."Organization"(id),
 recipient_membership_version integer NOT NULL, recipient_organization_version integer NOT NULL, recipient_account_revision text NOT NULL,
 subject_version integer NOT NULL, purpose text NOT NULL CHECK(purpose IN ('INSURANCE_ASSESSMENT','FINANCE_ASSESSMENT')),
 fields text[] NOT NULL CHECK(cardinality(fields)>0 AND fields <@ ARRAY['name','category','brand','model','serialNumber','status']),
 event_kinds text[] NOT NULL CHECK(event_kinds <@ ARRAY['RELATION_OPENED','RELATION_CLOSED','TRANSFER_COMPLETED','FINANCE_DECLARED','FINANCE_WITHDRAWN','FINANCE_CONFIRMED']),
 history_from timestamptz NOT NULL, starts_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, terms char(64) NOT NULL,
 state text NOT NULL DEFAULT 'PROPOSED' CHECK(state IN ('PROPOSED','ACTIVE','REVOKED')), version integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL, accepted_at timestamptz, revoked_at timestamptz,
 CHECK(starts_at>=created_at), CHECK(expires_at>starts_at AND expires_at<=starts_at+interval '720 hours')
);
CREATE TABLE business_private.hold (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), record_class text NOT NULL CHECK(record_class IN ('RELATION','TRANSFER','FINANCE','GRANT')),
 record_id uuid NOT NULL, reason text NOT NULL CHECK(reason IN ('DISPUTE','INVESTIGATION','LEGAL_OBLIGATION')),
 case_reference varchar(100) NOT NULL, raised_by text NOT NULL REFERENCES public."User"(id), reviewer text REFERENCES public."User"(id),
 state text NOT NULL DEFAULT 'PROPOSED' CHECK(state IN ('PROPOSED','ACTIVE','RELEASE_PENDING','RELEASED')),
 next_review_at timestamptz NOT NULL, release_requested_by text REFERENCES public."User"(id), released_by text REFERENCES public."User"(id),
 version integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL, released_at timestamptz,
 CHECK(reviewer IS NULL OR reviewer<>raised_by), CHECK(released_by IS NULL OR released_by<>release_requested_by)
);
CREATE TABLE business_private.event (
 id uuid PRIMARY KEY, subject uuid NOT NULL REFERENCES business_private.subject(id), record_id uuid NOT NULL,
 action varchar(50) NOT NULL, actor text NOT NULL REFERENCES public."User"(id), version integer NOT NULL,
 occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(), policy text NOT NULL DEFAULT '57.1', UNIQUE(record_id,version)
);
CREATE TABLE business_private.receipt (
 actor text NOT NULL REFERENCES public."User"(id), operation uuid NOT NULL, subject uuid NOT NULL REFERENCES business_private.subject(id),
 digest char(64) NOT NULL, result_id uuid NOT NULL, result_version integer NOT NULL, created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
 PRIMARY KEY(actor,operation)
);
CREATE TABLE business_private.read_audit (
 id uuid PRIMARY KEY, grant_id uuid NOT NULL REFERENCES business_private.grant_access(id), subject uuid NOT NULL REFERENCES business_private.subject(id),
 grant_version integer NOT NULL, recipient text NOT NULL REFERENCES public."User"(id), purpose text NOT NULL,
 decision text NOT NULL CHECK(decision IN ('ALLOW','DENY')), reason text NOT NULL CHECK(reason IN ('AUTHORIZED','DENIED')),
 occurred_at timestamptz NOT NULL DEFAULT clock_timestamp(), expires_at timestamptz NOT NULL DEFAULT clock_timestamp()+interval '2160 hours'
);
CREATE FUNCTION business_private.immutable() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'append only'; END $$;
CREATE TRIGGER immutable_event BEFORE UPDATE OR DELETE ON business_private.event FOR EACH ROW EXECUTE FUNCTION business_private.immutable();
CREATE TRIGGER immutable_receipt BEFORE UPDATE OR DELETE ON business_private.receipt FOR EACH ROW EXECUTE FUNCTION business_private.immutable();
CREATE TRIGGER immutable_read_audit BEFORE UPDATE OR DELETE ON business_private.read_audit FOR EACH ROW EXECUTE FUNCTION business_private.immutable();
CREATE TRIGGER immutable_acceptance BEFORE UPDATE OR DELETE ON business_private.acceptance FOR EACH ROW EXECUTE FUNCTION business_private.immutable();
-- Every changed business record must have an event in the same transaction.
CREATE FUNCTION business_private.require_event() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM business_private.event WHERE record_id=NEW.id AND version=NEW.version AND xmin::text=pg_current_xact_id()::text) THEN RAISE EXCEPTION 'atomic audit required'; END IF; RETURN NULL; END $$;
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['subject','source','authority','relation','transfer','finance','grant_access','hold'] LOOP
 EXECUTE format('CREATE CONSTRAINT TRIGGER audit_required AFTER INSERT OR UPDATE ON business_private.%I DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION business_private.require_event()',t);
 END LOOP;
 FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='business_private' LOOP
 EXECUTE format('ALTER TABLE business_private.%I ENABLE ROW LEVEL SECURITY',t);
 EXECUTE format('ALTER TABLE business_private.%I FORCE ROW LEVEL SECURITY',t);
 EXECUTE format('REVOKE ALL ON business_private.%I FROM PUBLIC',t);
 END LOOP;
END $$;
-- Runtime grants/policies are deliberately absent. Local synthetic test role setup
-- is separate. Production provisioning, purge and backup changes remain closed.
CREATE FUNCTION business_private.visible_events(s uuid,t timestamptz) RETURNS SETOF business_private.event
LANGUAGE sql STABLE SET timezone='UTC' AS $$
 SELECT e.* FROM business_private.event e WHERE e.subject=s AND e.record_id IN (
 SELECT id FROM business_private.relation WHERE subject=s AND (ends_at IS NULL OR ends_at+interval '24 months'>t)
 UNION SELECT p.id FROM business_private.transfer p WHERE p.subject=s AND (
  (p.state<>'COMPLETED' AND COALESCE(p.terminal_at,p.expires_at)+interval '720 hours'>t) OR
  (p.state='COMPLETED' AND EXISTS(SELECT 1 FROM business_private.relation r WHERE r.id=p.relation AND r.ends_at+interval '24 months'>t)))
 UNION SELECT id FROM business_private.finance WHERE subject=s AND COALESCE(terminal_at,LEAST(ends_at,freshness_until),freshness_until)+interval '24 months'>t
 UNION SELECT c.id FROM business_private.confirmation c JOIN business_private.finance f ON f.id=c.finance WHERE f.subject=s AND COALESCE(f.terminal_at,LEAST(f.ends_at,f.freshness_until),f.freshness_until)+interval '24 months'>t
 UNION SELECT id FROM business_private.grant_access WHERE subject=s AND COALESCE(revoked_at,expires_at)+interval '12 months'>t
 )
$$;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA business_private FROM PUBLIC;
CREATE FUNCTION business_private.protect_record() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE mutable text[];
BEGIN
 IF TG_OP='DELETE' THEN RAISE EXCEPTION 'physical removal requires separate reviewed purge'; END IF;
 mutable=CASE TG_TABLE_NAME
 WHEN 'subject' THEN ARRAY['version']
 WHEN 'source' THEN ARRAY['available','version']
 WHEN 'assignment' THEN ARRAY['revoked_at']
 WHEN 'authority' THEN ARRAY['state','reviewer','assignment','reviewed_at','expires_at','revoked_at','version']
 WHEN 'relation' THEN ARRAY['ends_at','necessity_review_at','version']
 WHEN 'transfer' THEN ARRAY['state','reviewer','assignment','terminal_at','version']
 WHEN 'finance' THEN ARRAY['state','terminal_at','version']
 WHEN 'confirmation' THEN ARRAY['revoked_at']
 WHEN 'grant_access' THEN ARRAY['state','accepted_at','revoked_at','version']
 WHEN 'hold' THEN ARRAY['state','reviewer','next_review_at','release_requested_by','released_by','released_at','version'] END;
 IF (to_jsonb(OLD)-mutable) IS DISTINCT FROM (to_jsonb(NEW)-mutable) THEN RAISE EXCEPTION 'immutable business terms'; END IF;
 RETURN NEW;
END $$;
DO $$ DECLARE t text; BEGIN FOREACH t IN ARRAY ARRAY['subject','source','assignment','authority','relation','transfer','finance','confirmation','grant_access','hold'] LOOP
 EXECUTE format('CREATE TRIGGER immutable_terms BEFORE UPDATE OR DELETE ON business_private.%I FOR EACH ROW EXECUTE FUNCTION business_private.protect_record()',t);
END LOOP; END $$;
REVOKE ALL ON FUNCTION business_private.protect_record() FROM PUBLIC;
