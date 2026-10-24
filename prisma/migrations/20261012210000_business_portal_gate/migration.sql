-- Local candidate only. No real verification provider or release authorization.
CREATE SCHEMA portal_private;
REVOKE ALL ON SCHEMA portal_private FROM PUBLIC;
CREATE TABLE portal_private.request (
  organization_id uuid PRIMARY KEY REFERENCES public."Organization"(id) ON DELETE RESTRICT,
  applicant_id text NOT NULL REFERENCES public."User"(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
ALTER TABLE portal_private.request ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_private.request FORCE ROW LEVEL SECURITY;
REVOKE ALL ON portal_private.request FROM PUBLIC;

CREATE FUNCTION portal_private.check_request() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog AS $$
BEGIN
  IF TG_OP <> 'INSERT' THEN RAISE EXCEPTION 'Portal request immutable'; END IF;
  PERFORM 1 FROM public."Organization" WHERE id=NEW.organization_id AND status='PENDING_REVIEW' FOR UPDATE;
  IF NOT FOUND OR NOT EXISTS (
    SELECT 1 FROM public."OrganizationEvent" WHERE "organizationId"=NEW.organization_id
      AND "actorId"=NEW.applicant_id AND action='ORGANIZATION_CREATED'
      AND xmin::text=pg_current_xact_id()::text
  ) THEN RAISE EXCEPTION 'Portal request requires atomic pending provenance'; END IF;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION portal_private.check_request() FROM PUBLIC;
CREATE TRIGGER portal_request_provenance BEFORE INSERT OR UPDATE OR DELETE ON portal_private.request
FOR EACH ROW EXECUTE FUNCTION portal_private.check_request();

CREATE FUNCTION portal_private.block_activation() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = pg_catalog AS $$
BEGIN
  IF NEW.status <> 'PENDING_REVIEW' AND EXISTS (
    SELECT 1 FROM portal_private.request WHERE organization_id=NEW.id
  ) THEN RAISE EXCEPTION 'Real organization verification is unavailable'; END IF;
  RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION portal_private.block_activation() FROM PUBLIC;
CREATE TRIGGER portal_request_no_activation BEFORE UPDATE ON public."Organization"
FOR EACH ROW EXECUTE FUNCTION portal_private.block_activation();
