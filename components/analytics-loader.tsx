"use client";

import { useEffect } from "react";

const STORAGE_KEY = "er_cookie_consent";

export default function AnalyticsLoader() {
  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);

    if (consent !== "accepted") return;

    // voorkom dubbel laden
    if (document.getElementById("cf-analytics")) return;

    const script = document.createElement("script");
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.defer = true;
    script.id = "cf-analytics";
    script.setAttribute(
      "data-cf-beacon",
      '{"token":"cb5840a0fd194e25ae1c422f07066afb"}'
    );

    document.body.appendChild(script);
  }, []);

  return null;
}