"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { isRTL, type Lang } from "@/lib/i18n/config";
import { getPublicAuthoritiesText } from "@/lib/i18n/public-authorities";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";
import {
  buildFallbackPoliceMapsUrl,
  buildNearbyPoliceMapsUrl,
  getAuthorityContact,
  getCountryNameForDisplay,
  inferCountryCodeFromLocale,
} from "@/lib/public-authorities/global-authorities";

type Props = {
  lang: Lang;
  registryId?: string;
  caseId: string;
  initialCountryCode?: string | null;
};

type LocationState =
  | {
      status: "idle" | "loading";
      country: null;
      countryCode: null;
      latitude: null;
      longitude: null;
      error: null;
    }
  | {
      status: "ready";
      country: string | null;
      countryCode: string | null;
      latitude: number;
      longitude: number;
      error: null;
    }
  | {
      status: "error";
      country: null;
      countryCode: null;
      latitude: null;
      longitude: null;
      error: "denied" | "unsupported" | "failed";
    };

const DEFAULT_LOCATION_STATE: LocationState = {
  status: "idle",
  country: null,
  countryCode: null,
  latitude: null,
  longitude: null,
  error: null,
};

function getLocationMessage(
  state: LocationState,
  text: ReturnType<typeof getPublicAuthoritiesText>,
  countryName: string | null
) {
  if (state.status === "ready") {
    return countryName
      ? `${text.locationDetected}: ${countryName}`
      : text.locationDetected;
  }

  if (state.status === "loading") {
    return text.locating;
  }

  if (state.status === "error") {
    if (state.error === "denied") {
      return text.locationDenied;
    }

    if (state.error === "unsupported") {
      return text.locationUnsupported;
    }

    return text.locationFailed;
  }

  return text.locationWaiting;
}

async function lookupCountry(lat: number, lon: number) {
  const response = await fetch(
    `/api/reverse-country?lat=${encodeURIComponent(String(lat))}&lon=${encodeURIComponent(String(lon))}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("LOOKUP_FAILED");
  }

  const data = (await response.json()) as {
    country?: string | null;
    countryCode?: string | null;
  };

  return {
    country: typeof data.country === "string" ? data.country : null,
    countryCode:
      typeof data.countryCode === "string" ? data.countryCode : null,
  };
}

export default function AuthoritiesClient({
  lang,
  registryId,
  caseId,
  initialCountryCode = null,
}: Props) {
  const text = repairMojibakeDeep(getPublicAuthoritiesText(lang));
  const rtl = isRTL(lang);
  const [locationState, setLocationState] =
    useState<LocationState>(DEFAULT_LOCATION_STATE);

  async function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationState({
        status: "error",
        country: null,
        countryCode: null,
        latitude: null,
        longitude: null,
        error: "unsupported",
      });
      return;
    }

    setLocationState({
      status: "loading",
      country: null,
      countryCode: null,
      latitude: null,
      longitude: null,
      error: null,
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const result = await lookupCountry(latitude, longitude);

          setLocationState({
            status: "ready",
            country: result.country,
            countryCode: result.countryCode,
            latitude,
            longitude,
            error: null,
          });
        } catch {
          setLocationState({
            status: "ready",
            country: null,
            countryCode: null,
            latitude,
            longitude,
            error: null,
          });
        }
      },
      (error) => {
        setLocationState({
          status: "error",
          country: null,
          countryCode: null,
          latitude: null,
          longitude: null,
          error: error.code === error.PERMISSION_DENIED ? "denied" : "failed",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }

  useEffect(() => {
    void requestLocation();
  }, []);

  const fallbackCountryCode = useMemo(() => {
    if (locationState.countryCode) {
      return locationState.countryCode;
    }

    if (initialCountryCode) {
      return initialCountryCode;
    }

    if (typeof navigator !== "undefined") {
      return inferCountryCodeFromLocale(navigator.language, lang);
    }

    return inferCountryCodeFromLocale(null, lang);
  }, [initialCountryCode, lang, locationState.countryCode]);

  const displayCountryName = useMemo(
    () =>
      getCountryNameForDisplay(
        fallbackCountryCode,
        lang,
        locationState.country
      ),
    [fallbackCountryCode, lang, locationState.country]
  );

  const authorityContact = useMemo(
    () => getAuthorityContact(fallbackCountryCode),
    [fallbackCountryCode]
  );

  const mapsUrl =
    locationState.status === "ready"
      ? buildNearbyPoliceMapsUrl(
          locationState.latitude,
          locationState.longitude
        )
      : buildFallbackPoliceMapsUrl(displayCountryName);
  const mapsLabel =
    locationState.status === "ready"
      ? text.openNearbyPoliceMap
      : text.openPoliceMapSearch;
  const locationButtonLabel =
    locationState.status === "loading"
      ? text.locating
      : locationState.status === "idle"
        ? text.useLocation
        : text.retry;
  const locationMessage = getLocationMessage(
    locationState,
    text,
    displayCountryName
  );

  return (
    <div
      style={{
        ...styles.card,
        direction: rtl ? "rtl" : "ltr",
        textAlign: rtl ? "right" : "left",
      }}
    >
      <h3 style={styles.title}>{text.title}</h3>

      <p style={styles.text}>{text.intro}</p>

      <div style={styles.locationBox}>
        <div style={styles.locationCopy}>
          <p style={styles.locationMessage}>{locationMessage}</p>
          <p style={styles.note}>{text.note}</p>
        </div>

        <button
          type="button"
          onClick={() => void requestLocation()}
          disabled={locationState.status === "loading"}
          style={{
            ...styles.primaryButton,
            opacity: locationState.status === "loading" ? 0.7 : 1,
            cursor:
              locationState.status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {locationButtonLabel}
        </button>
      </div>

      <div style={styles.metaBox}>
        {registryId ? (
          <p style={styles.metaLine}>
            <strong>{text.registryId}:</strong> {registryId}
          </p>
        ) : null}

        <p style={styles.metaLine}>
          <strong>{text.caseId}:</strong> {caseId}
        </p>

        {displayCountryName ? (
          <p style={styles.metaLine}>
            <strong>{text.countryLabel}:</strong> {displayCountryName}
          </p>
        ) : null}

        {locationState.status === "ready" ? (
          <p style={styles.metaLine}>
            <strong>{text.coordinatesLabel}:</strong>{" "}
            {locationState.latitude}, {locationState.longitude}
          </p>
        ) : null}
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>{text.localAuthoritiesTitle}</h4>
        <ul
          style={{
            ...styles.list,
            paddingInlineStart: rtl ? 0 : 18,
            paddingInlineEnd: rtl ? 18 : 0,
          }}
        >
          <li>
            <strong>{text.emergencyNumber}:</strong>{" "}
            {authorityContact?.emergencyNumber ?? "112"}
          </li>
          <li>
            <strong>{text.policeNumber}:</strong>{" "}
            {authorityContact?.policeNumber ??
              authorityContact?.emergencyNumber ??
              "112"}
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>{text.mapsTitle}</h4>
        <p style={styles.text}>{text.mapsHint}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          style={styles.secondaryButton}
        >
          {mapsLabel}
        </a>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>{text.shareTitle}</h4>
        <ul
          style={{
            ...styles.list,
            paddingInlineStart: rtl ? 0 : 18,
            paddingInlineEnd: rtl ? 18 : 0,
          }}
        >
          <li>{text.shareRegistry}</li>
          <li>{text.shareCase}</li>
          <li>{text.shareLocation}</li>
        </ul>
      </div>

      {locationState.status === "error" ? (
        <div style={styles.fallbackBox}>
          <h4 style={styles.sectionTitle}>{text.fallbackTitle}</h4>
          <p style={styles.note}>{text.fallbackText}</p>
        </div>
      ) : null}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  card: {
    marginTop: 20,
    marginBottom: 20,
    border: "1px solid #dbeafe",
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: "#1e3a8a",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#1f2937",
    marginBottom: 12,
  },
  locationBox: {
    border: "1px solid #bfdbfe",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    display: "flex",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  locationCopy: {
    flex: 1,
    minWidth: 220,
  },
  locationMessage: {
    fontSize: 14,
    color: "#111827",
    margin: 0,
    marginBottom: 4,
    fontWeight: 600,
  },
  metaBox: {
    border: "1px solid #bfdbfe",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  metaLine: {
    fontSize: 14,
    color: "#111827",
    margin: 0,
    marginBottom: 6,
  },
  section: {
    border: "1px solid #bfdbfe",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e3a8a",
    marginTop: 0,
    marginBottom: 10,
  },
  list: {
    margin: 0,
    display: "grid",
    gap: 8,
    color: "#1f2937",
    fontSize: 14,
    lineHeight: 1.5,
  },
  primaryButton: {
    borderRadius: 8,
    border: "1px solid #1d4ed8",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
  },
  secondaryButton: {
    display: "inline-block",
    borderRadius: 8,
    border: "1px solid #1d4ed8",
    backgroundColor: "#ffffff",
    color: "#1d4ed8",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
  fallbackBox: {
    border: "1px solid #fecaca",
    backgroundColor: "#fef2f2",
    borderRadius: 8,
    padding: 12,
  },
  note: {
    fontSize: 12,
    color: "#475569",
    margin: 0,
    lineHeight: 1.5,
  },
};
