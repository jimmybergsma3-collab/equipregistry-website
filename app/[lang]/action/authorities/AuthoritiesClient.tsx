"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Lang } from "@/lib/i18n/config";
import { getPublicAuthoritiesText } from "@/lib/i18n/public-authorities";

type Props = {
  lang: Lang;
  registryId?: string;
  caseId: string;
};

type LocationState =
  | {
      status: "idle" | "loading";
      country: null;
      countryCode: null;
      error: null;
    }
  | {
      status: "ready";
      country: string | null;
      countryCode: string | null;
      error: null;
    }
  | {
      status: "error";
      country: null;
      countryCode: null;
      error: "denied" | "unsupported" | "failed";
    };

const DEFAULT_LOCATION_STATE: LocationState = {
  status: "idle",
  country: null,
  countryCode: null,
  error: null,
};

const EMERGENCY_NUMBERS: Record<string, string> = {
  US: "911",
  CA: "911",
  GB: "999",
  AU: "000",
  NZ: "111",
  CN: "110",
  IN: "112",
  RU: "112",
};

function getEmergencyNumber(countryCode: string | null) {
  if (!countryCode) {
    return "112";
  }

  return EMERGENCY_NUMBERS[countryCode] ?? "112";
}

function getLocationMessage(
  state: LocationState,
  text: ReturnType<typeof getPublicAuthoritiesText>
) {
  if (state.status === "ready") {
    if (state.country && state.countryCode) {
      return `${text.locationDetected}: ${state.country} (${state.countryCode})`;
    }

    if (state.country) {
      return `${text.locationDetected}: ${state.country}`;
    }

    if (state.countryCode) {
      return `${text.locationDetected}: ${state.countryCode}`;
    }
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
}: Props) {
  const text = getPublicAuthoritiesText(lang);
  const [locationState, setLocationState] =
    useState<LocationState>(DEFAULT_LOCATION_STATE);

  async function requestLocation() {
    if (!("geolocation" in navigator)) {
      setLocationState({
        status: "error",
        country: null,
        countryCode: null,
        error: "unsupported",
      });
      return;
    }

    setLocationState({
      status: "loading",
      country: null,
      countryCode: null,
      error: null,
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await lookupCountry(
            position.coords.latitude,
            position.coords.longitude
          );

          setLocationState({
            status: "ready",
            country: result.country,
            countryCode: result.countryCode,
            error: null,
          });
        } catch {
          setLocationState({
            status: "error",
            country: null,
            countryCode: null,
            error: "failed",
          });
        }
      },
      (error) => {
        setLocationState({
          status: "error",
          country: null,
          countryCode: null,
          error:
            error.code === error.PERMISSION_DENIED ? "denied" : "failed",
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  useEffect(() => {
    void requestLocation();
  }, []);

  const emergencyNumber = getEmergencyNumber(locationState.countryCode);
  const locationMessage = getLocationMessage(locationState, text);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{text.title}</h3>

      <p style={styles.text}>{text.intro}</p>

      <div style={styles.locationBox}>
        <div>
          <p style={styles.locationMessage}>{locationMessage}</p>
          <p style={styles.note}>{text.note}</p>
        </div>

        <button
          type="button"
          onClick={() => void requestLocation()}
          disabled={locationState.status === "loading"}
          style={{
            ...styles.locationButton,
            opacity: locationState.status === "loading" ? 0.7 : 1,
            cursor:
              locationState.status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {locationState.status === "loading" ? text.locating : text.retry}
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
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>{text.localAuthoritiesTitle}</h4>
        <ul style={styles.list}>
          <li>
            <strong>{text.emergencyNumber}:</strong> {emergencyNumber}
          </li>
          <li>{text.policeContact}</li>
          <li>{text.customsContact}</li>
          <li>{text.borderContact}</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>{text.shareTitle}</h4>
        <ul style={styles.list}>
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
  locationMessage: {
    fontSize: 14,
    color: "#111827",
    margin: 0,
    marginBottom: 4,
    fontWeight: 600,
  },
  locationButton: {
    borderRadius: 8,
    border: "1px solid #1d4ed8",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    padding: "10px 14px",
    fontSize: 13,
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
    paddingLeft: 18,
    display: "grid",
    gap: 8,
    color: "#1f2937",
    fontSize: 14,
    lineHeight: 1.5,
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
