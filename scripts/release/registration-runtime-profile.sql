-- Section68 clone-tested capability profile, NOT automatic whole-site role composition.
-- Trusted backend service only. Row authorization remains in the existing application.
BEGIN;
CREATE ROLE er_registration_runtime NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
GRANT USAGE ON SCHEMA public,registry_private TO er_registration_runtime;
GRANT SELECT ON public."User",public."RegistrationRequest",public."Machine",public."RegistrySequence",registry_private."NumberReservation" TO er_registration_runtime;
GRANT INSERT ON public."RegistrationRequest",public."Machine",public."RegistrySequence",registry_private."NumberReservation" TO er_registration_runtime;
GRANT UPDATE ("vatNumber") ON public."User" TO er_registration_runtime;
GRANT UPDATE ON public."RegistrationRequest",public."Machine",public."RegistrySequence" TO er_registration_runtime;
GRANT UPDATE ("claimedRequestId") ON registry_private."NumberReservation" TO er_registration_runtime;
-- No DELETE, TRUNCATE, User.role, Founder/bootstrap, provider keys or schema ownership.
CREATE POLICY er_registration_numbers ON registry_private."NumberReservation" TO er_registration_runtime USING(true) WITH CHECK(true);
DO $$ DECLARE t text; BEGIN
 FOREACH t IN ARRAY ARRAY['User','RegistrationRequest','Machine','RegistrySequence'] LOOP
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
  EXECUTE format('CREATE POLICY er_registration_service ON public.%I TO er_registration_runtime USING(true) WITH CHECK(true)',t);
 END LOOP;
END $$;
-- Token/signup/mail/incident/photo/platform capabilities need their own reviewed grants.
-- Do not apply to live until the complete app role and all public readers have passed.
COMMIT;
