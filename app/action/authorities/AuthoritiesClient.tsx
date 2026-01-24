"use client";

import { useState } from "react";

export default function AuthoritiesClient({
  registryId,
  caseId,
}: {
  registryId?: string;
  caseId: string;
}) {
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "granted"; lat: number; lon: number; accuracy?: number }
    | { state: "denied" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  // Demo-statisch contact
  const emergency = "112";
  const station = "Policía Nacional – Valencia Centro (DEMO)";
  const phone = "+34 960 000 000 (DEMO)";
  const backup = "Guardia Civil: 062 (DEMO)";

  const fmt = (n: number) => (Math.round(n * 10000) / 10000).toFixed(4);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus({ state: "error", message: "Geolocation is not supported by this browser." });
      return;
    }

    setStatus({ state: "loading" });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStatus({
          state: "granted",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setStatus({ state: "denied" });
        else setStatus({ state: "error", message: err.message || "Unable to get location." });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  const buildScript = () => {
    const locationLine =
      status.state === "granted"
        ? `Approx. location: ${fmt(status.lat)}, ${fmt(status.lon)}${typeof status.accuracy === "number" ? ` (±${Math.round(status.accuracy)}m)` : ""}`
        : "Approx. location: (not shared)";

    return [
      "EquipRegistry – Stolen equipment sighting (DEMO)",
      `Case ID: ${caseId}`,
      `Registry ID: ${registryId ?? "(unknown)"}`,
      "",
      "Recommended authority contact (DEMO):",
      `Emergency: ${emergency}`,
      `${station}`,
      `Phone: ${phone}`,
      `${backup}`,
      "",
      locationLine,
      "",
      "Message to authorities:",
      "I have spotted suspected stolen equipment.",
      "Please advise how to proceed. I can share the Case ID and Registry ID.",
    ].join("\n");
  };

  const copyScript = async () => {
    const text = buildScript();
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied details to clipboard.");
    } catch {
      window.prompt("Copy this text:", text);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: 14,
          background: "#ffffff",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 6 }}>Emergency</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>{emergency}</div>

        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 10, marginBottom: 6 }}>
          Nearest station (demo)
        </div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{station}</div>
        <div style={{ fontSize: 14 }}>{phone}</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>{backup}</div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={requestLocation}
            style={{
              padding: "10px 14px",
              background: "#1f4fd8",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Use my location
          </button>

          <button
            onClick={copyScript}
            style={{
              padding: "10px 14px",
              background: "#f1f5f9",
              color: "#1f2937",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Copy call script
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 13 }}>
          {status.state === "idle" && <span style={{ color: "#6b7280" }}>Location not requested.</span>}
          {status.state === "loading" && <span style={{ color: "#6b7280" }}>Requesting location…</span>}
          {status.state === "granted" && (
            <span style={{ color: "#111827" }}>
              Detected coordinates: <strong>{fmt(status.lat)}, {fmt(status.lon)}</strong>
            </span>
          )}
          {status.state === "denied" && <span style={{ color: "#b45309" }}>Location permission denied. Using demo contact.</span>}
          {status.state === "error" && <span style={{ color: "#b91c1c" }}>{status.message}</span>}
        </div>

        <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
          Demo note: location is shown only in your browser and is not stored.
        </div>
      </div>
    </div>
  );
}
