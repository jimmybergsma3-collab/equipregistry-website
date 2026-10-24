BEGIN;
-- Local preparation only. Deploy behind a drained writer barrier, never alongside old writers.
CREATE SCHEMA registry_private;
REVOKE ALL ON SCHEMA registry_private FROM PUBLIC;
CREATE TABLE registry_private."NumberReservation" (
  reference text PRIMARY KEY,
  "reservedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "claimedRequestId" text
);
ALTER TABLE registry_private."NumberReservation" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON registry_private."NumberReservation" FROM PUBLIC;
-- Tombstones survive customer/registration deletion; no FK/cascade and no names, contact details or documents.
INSERT INTO registry_private."NumberReservation" (reference, "claimedRequestId")
SELECT upper(trim(reference)), id FROM public."RegistrationRequest";
INSERT INTO registry_private."NumberReservation" (reference, "claimedRequestId")
SELECT upper(trim("registryId")), 'historical-machine:' || id FROM public."Machine"
ON CONFLICT (reference) DO NOTHING;

CREATE FUNCTION registry_private.protect_number_history() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  IF TG_OP IN ('DELETE','TRUNCATE') THEN RAISE EXCEPTION 'NUMBER_HISTORY_IMMUTABLE'; END IF;
  IF TG_TABLE_NAME = 'RegistrySequence' THEN
    IF NEW.id IS DISTINCT FROM OLD.id OR NEW."nextValue" <= OLD."nextValue" THEN
      RAISE EXCEPTION 'NUMBER_COUNTER_MUST_ADVANCE';
    END IF;
  ELSE
    IF NEW.reference IS DISTINCT FROM OLD.reference OR NEW."reservedAt" IS DISTINCT FROM OLD."reservedAt"
       OR OLD."claimedRequestId" IS NOT NULL OR NEW."claimedRequestId" IS NULL THEN
      RAISE EXCEPTION 'NUMBER_HISTORY_IMMUTABLE';
    END IF;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER number_counter_guard BEFORE UPDATE OR DELETE ON public."RegistrySequence"
FOR EACH ROW EXECUTE FUNCTION registry_private.protect_number_history();
CREATE TRIGGER number_counter_truncate_guard BEFORE TRUNCATE ON public."RegistrySequence"
FOR EACH STATEMENT EXECUTE FUNCTION registry_private.protect_number_history();
CREATE TRIGGER number_history_guard BEFORE UPDATE OR DELETE ON registry_private."NumberReservation"
FOR EACH ROW EXECUTE FUNCTION registry_private.protect_number_history();
CREATE TRIGGER number_history_truncate_guard BEFORE TRUNCATE ON registry_private."NumberReservation"
FOR EACH STATEMENT EXECUTE FUNCTION registry_private.protect_number_history();

CREATE FUNCTION registry_private.claim_registration_number() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.reference IS DISTINCT FROM OLD.reference THEN RAISE EXCEPTION 'ISSUED_NUMBER_IMMUTABLE'; END IF;
    RETURN NEW;
  END IF;
  UPDATE registry_private."NumberReservation" SET "claimedRequestId" = NEW.id
  WHERE reference = NEW.reference AND "claimedRequestId" IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'NUMBER_NOT_RESERVED_OR_ALREADY_CLAIMED'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER registration_number_claim BEFORE INSERT OR UPDATE OF reference ON public."RegistrationRequest"
FOR EACH ROW EXECUTE FUNCTION registry_private.claim_registration_number();

CREATE FUNCTION registry_private.require_registered_machine_number() RETURNS trigger
LANGUAGE plpgsql SET search_path = pg_catalog AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW."registryId" IS DISTINCT FROM OLD."registryId" THEN RAISE EXCEPTION 'ISSUED_NUMBER_IMMUTABLE'; END IF;
    RETURN NEW;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public."RegistrationRequest" r
    WHERE r.reference = NEW."registryId" AND r."userId" = NEW."ownerId" AND r."serialNumber" = NEW."serialNumber"
      AND r."deletedAt" IS NULL) THEN RAISE EXCEPTION 'MACHINE_NUMBER_REQUIRES_REGISTRATION'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER machine_number_binding BEFORE INSERT OR UPDATE OF "registryId" ON public."Machine"
FOR EACH ROW EXECUTE FUNCTION registry_private.require_registered_machine_number();
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA registry_private FROM PUBLIC;

COMMIT;
