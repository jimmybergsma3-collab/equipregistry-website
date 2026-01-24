"use client";

import { useMemo, useState } from "react";

type State =
  | { stage: "idle" }
  | { stage: "locating" }
  | { stage: "ready"; lat?: number; lon?: number; accuracy?: number }
  | { stage: "submitting" }
  | { stage: "done"; caseId: string }
  | { stage: "error"; message: string };

export default function ReportSightingClient({ registryId }: { registryId?: string }) {
  const [note, setNote] = useState("");
  const [state, setState] = useState<State>({ stage: "idle" });

  const canSubmit = useMemo(() => !!registryId && state.stage !== "submitting", [registryId, state.stage]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState({ stage: "error", message: "Geolocation is not supported by this browser." });
      return;
    }
    setState({ stage: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          stage: "ready",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      (err) => {
        // Allow submit even if denied
        setState({ stage: "ready" });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  };

  const submit = async () => {
    if (!registryId) return;

    setState({ stage: "submitting" });

    // coords only if we actually got them
    const coords =
      state.stage === "ready" && typeof state.lat === "number" && typeof state.lon === "number"
        ? { lat: state.lat, lon: state.lon, accuracy: state.accuracy }
        : null;

    const res = await fetch("/api/sighting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        registryId,
        note,
        coords,
      }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.ok) {
      setState({ stage: "error", message: json?.error ?? "Failed to submit sighting." });
      return;
    }

    setState({ stage: "done", caseId: json.caseId });
  };

  const coordsText =
    state.stage === "ready" && typeof state.lat === "number" && typeof state.lon === "number"
      ? `Location captured: ${state.lat.toFixed(4)}, ${state.lon.toFixed(4)}${typeof state.accuracy === "number" ? ` (±${Math.round(state.accuracy)}m)` : ""}`
      : "Location not captured (you can still submit).";

  return (
    <div style={{ marginTop: 16 }}>
      {state.stage === "done" ? (
        <div style={{ border: "1px solid #bbf7d0", background: "#f0fdf4", borderRadius: 10, padding: 14 }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>Sighting submitted ✅</div>
          <div style={{ fontSize: 13, color: "#14532d" }}>
            Case ID: <strong>{state.caseId}</strong>
          </div>
          <div style={{ fontSize: 12, color: "#166534", marginTop: 6 }}>
            Thank you. EquipRegistry has received your report for review.
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 10 }}>
            <label style={{ fontSize: 13, color: "#374151", fontWeight: 700 }}>Optional note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Seen at a port / on a trailer / seller location..."
              style={{
                width: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: 12,
                fontSize: 14,
              }}
            />

            <div style={{ fontSize: 12, color: "#6b7280" }}>{coordsText}</div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
              <button
                type="button"
                onClick={requestLocation}
                style={{
                  padding: "12px 16px",
                  background: "#1f4fd8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Use my location
              </button>

              <button
                type="button"
                disabled={!canSubmit}
                onClick={submit}
                style={{
                  padding: "12px 16px",
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontSize: 14,
                  opacity: canSubmit ? 1 : 0.6,
                }}
              >
                Submit sighting
              </button>
            </div>

            {state.stage === "error" && <div style={{ color: "#b91c1c", fontSize: 13 }}>{state.message}</div>}

            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
              Demo note: location is shared only if you click “Use my location”. For demo purposes it is not publicly visible.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
