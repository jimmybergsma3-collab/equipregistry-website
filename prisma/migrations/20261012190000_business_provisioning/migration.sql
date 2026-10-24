-- Local synthetic provisioning. Historical fixture assignments retain their old
-- contract; all assignments issued by the new service bind both account epochs.
ALTER TABLE business_private.assignment ADD COLUMN assigned_revision text;
-- protect_record compares every non-mutable column, so issuer binding is immutable.
CREATE FUNCTION business_private.require_assignment_event() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.assigned_revision IS NOT NULL AND NOT EXISTS(
  SELECT 1 FROM business_private.event WHERE subject=NEW.subject AND record_id=NEW.id
   AND version=CASE WHEN NEW.revoked_at IS NULL THEN 0 ELSE 1 END
   AND action=CASE WHEN NEW.revoked_at IS NULL THEN 'REVIEW_ASSIGNED' ELSE 'REVIEW_REVOKED' END
   AND xmin::text=pg_current_xact_id()::text
 ) THEN RAISE EXCEPTION 'atomic assignment audit required'; END IF;
 RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER assignment_audit AFTER INSERT OR UPDATE ON business_private.assignment
 DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION business_private.require_assignment_event();
REVOKE ALL ON FUNCTION business_private.require_assignment_event() FROM PUBLIC;
