-- Preparation only; replace number_app with the reviewed backend role before adoption.
-- No role is created or granted to an external principal by the migration.
-- Combine with reviewed registration/public-table permissions; never grant this to anon/authenticated.
GRANT USAGE ON SCHEMA registry_private TO number_app;
GRANT SELECT, INSERT ON registry_private."NumberReservation" TO number_app;
GRANT UPDATE ("claimedRequestId") ON registry_private."NumberReservation" TO number_app;
CREATE POLICY number_backend ON registry_private."NumberReservation" TO number_app USING (true) WITH CHECK (true);
GRANT SELECT, INSERT, UPDATE ON public."RegistrySequence" TO number_app;
-- Existing RLS on public tables must explicitly permit the trusted backend inventory.
-- Legacy/reference inventory needs SELECT(reference,category,subcategory)
-- on RegistrationRequest and SELECT(registryId,category) on Machine.
-- Trigger checks require owner/id/serial/deletedAt visibility as well.
-- No DELETE/TRUNCATE on counters or history. Never grant table ownership or BYPASSRLS.
