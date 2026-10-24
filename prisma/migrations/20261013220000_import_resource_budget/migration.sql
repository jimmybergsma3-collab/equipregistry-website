-- Additive resource accounting; no payload, filename, key material or uploaded data.
CREATE TABLE import_private."ParserBudget" (
 kind text NOT NULL CHECK(kind IN ('account','organization')),
 subject text NOT NULL, window_start timestamptz NOT NULL,
 attempts integer NOT NULL CHECK(attempts BETWEEN 1 AND 30),
 PRIMARY KEY(kind,subject)
);
ALTER TABLE import_private."ParserBudget" ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_private."ParserBudget" FORCE ROW LEVEL SECURITY;
REVOKE ALL ON import_private."ParserBudget" FROM PUBLIC;
