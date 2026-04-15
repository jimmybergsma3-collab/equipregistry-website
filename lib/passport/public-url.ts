import type { Lang } from "@/lib/i18n/config";

function getFirstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() ?? "";
}

function isLocalHost(host: string) {
  const normalized = host.toLowerCase();

  return (
    normalized.includes("localhost") ||
    normalized.startsWith("127.0.0.1") ||
    normalized.startsWith("[::1]")
  );
}

function normalizeOrigin(value: string | null | undefined) {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  try {
    return new URL(normalized).origin.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string | null) {
  if (!origin) {
    return false;
  }

  try {
    return isLocalHost(new URL(origin).host);
  } catch {
    return false;
  }
}

export function buildPublicPassportPath(lang: Lang, registryId: string) {
  return `/${lang}/passport/${encodeURIComponent(registryId)}`;
}

export function getPublicPassportUrl(
  headerList: Headers,
  lang: Lang,
  registryId: string
) {
  const path = buildPublicPassportPath(lang, registryId);
  const configuredOrigin = normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL);
  const forwardedHost = getFirstHeaderValue(headerList.get("x-forwarded-host"));
  const host = forwardedHost || getFirstHeaderValue(headerList.get("host"));

  if (host) {
    const proto =
      getFirstHeaderValue(headerList.get("x-forwarded-proto")) ||
      (isLocalHost(host) ? "http" : "https");
    const requestOrigin = normalizeOrigin(`${proto}://${host}`);

    if (requestOrigin && !isLocalOrigin(requestOrigin)) {
      return `${requestOrigin}${path}`;
    }

    if (configuredOrigin && !isLocalOrigin(configuredOrigin)) {
      return `${configuredOrigin}${path}`;
    }

    if (requestOrigin) {
      return `${requestOrigin}${path}`;
    }
  }

  return configuredOrigin ? `${configuredOrigin}${path}` : path;
}
