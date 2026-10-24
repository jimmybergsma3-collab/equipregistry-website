import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const VERSION = "v1";

function signingKey() {
  const key = process.env.ER_SESSION_SECRET;
  if (!key || Buffer.byteLength(key, "utf8") < 32) {
    throw new Error("ER_SESSION_SECRET must contain at least 32 bytes.");
  }
  return key;
}

function signature(payload: string) {
  return createHmac("sha256", signingKey())
    .update(`${VERSION}.${payload}`)
    .digest();
}

// No legacy user-ID fallback: an identifier is not proof of authentication.
export function createSessionToken(userId: string, maxAge: number) {
  if (!userId || !Number.isSafeInteger(maxAge) || maxAge <= 0 || maxAge > MAX_AGE_SECONDS) {
    throw new Error("Invalid session parameters.");
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    sub: userId,
    iat: issuedAt,
    exp: issuedAt + maxAge,
    nonce: randomBytes(16).toString("base64url"),
  })).toString("base64url");
  return `${VERSION}.${payload}.${signature(payload).toString("base64url")}`;
}

export function verifySessionToken(token: string | undefined): string | null {
  try {
    if (!token || token.length > 4096) return null;
    const parts = token.split(".");
    if (parts.length !== 3 || parts[0] !== VERSION) return null;
    const [, payload, suppliedSignature] = parts;
    if (!/^[A-Za-z0-9_-]+$/.test(payload) || !/^[A-Za-z0-9_-]{43}$/.test(suppliedSignature)) return null;
    const supplied = Buffer.from(suppliedSignature, "base64url");
    const expected = signature(payload);
    if (supplied.toString("base64url") !== suppliedSignature || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (!claims || typeof claims.sub !== "string" || !claims.sub || claims.sub.length > 256 ||
      !Number.isSafeInteger(claims.iat) || !Number.isSafeInteger(claims.exp) ||
      claims.iat > now || claims.exp <= now || claims.exp <= claims.iat ||
      claims.exp - claims.iat > MAX_AGE_SECONDS ||
      typeof claims.nonce !== "string" || !/^[A-Za-z0-9_-]{22}$/.test(claims.nonce)) return null;
    return claims.sub;
  } catch {
    // Missing configuration, malformed tokens and invalid signatures fail closed.
    return null;
  }
}
