"use client";

import { useMemo, useState } from "react";
import { EMERGENCY_NUMBERS } from "@/lib/emergency-numbers";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
};

function getClientTexts(lang: Lang) {
  switch (lang) {
    case "nl":
      return {
        title: "Huidige locatie",
        description:
          "Sta locatie toe zodat we je direct naar de juiste autoriteiten kunnen sturen.",
        button: "Gebruik mijn locatie",
        detecting: "Locatie ophalen...",
        success: "Locatie gedetecteerd",
        openMaps: "Open politie in Google Maps",
        callAuthorities: "Bel autoriteiten",
        confirmTitle: "Bevestiging",
        confirmText: "Weet u zeker dat u het alarmnummer wilt bellen:",
        cancel: "Annuleren",
        call: "Bellen",
        gpsUnsupported:
          "Geolocatie wordt niet ondersteund door deze browser.",
        gpsFailed: "Locatie kon niet worden opgehaald. Probeer opnieuw.",
        reverseFailed:
          "Locatie gevonden, maar landdetectie is mislukt. Google Maps werkt wel.",
        noCentralNumber:
          "Geen centraal politienummer beschikbaar voor deze locatie. Gebruik lokale autoriteiten.",
        country: "Land",
        gps: "GPS",
        desktopNotice:
          "Gebruik een telefoon om dit nummer te bellen.",
      };

    case "es":
      return {
        title: "Ubicación actual",
        description:
          "Permite la ubicación para dirigirte directamente a las autoridades correspondientes.",
        button: "Usar mi ubicación",
        detecting: "Detectando...",
        success: "Ubicación detectada",
        openMaps: "Abrir policía en Google Maps",
        callAuthorities: "Llamar a autoridades",
        confirmTitle: "Confirmación",
        confirmText:
          "¿Seguro que desea llamar al número de emergencia:",
        cancel: "Cancelar",
        call: "Llamar",
        gpsUnsupported:
          "La geolocalización no es compatible con este navegador.",
        gpsFailed: "No se pudo obtener la ubicación. Inténtalo de nuevo.",
        reverseFailed:
          "Se encontró la ubicación, pero falló la detección del país. Google Maps sí funciona.",
        noCentralNumber:
          "No hay un número central de policía disponible para esta ubicación. Contacte con autoridades locales.",
        country: "País",
        gps: "GPS",
        desktopNotice:
          "Utilice un teléfono para llamar a este número.",
      };

    case "de":
      return {
        title: "Aktueller Standort",
        description:
          "Erlauben Sie den Standortzugriff, damit wir Sie direkt an die zuständigen Behörden weiterleiten können.",
        button: "Meinen Standort verwenden",
        detecting: "Standort wird ermittelt...",
        success: "Standort erkannt",
        openMaps: "Polizei in Google Maps öffnen",
        callAuthorities: "Behörden anrufen",
        confirmTitle: "Bestätigung",
        confirmText:
          "Möchten Sie diese Notrufnummer wirklich anrufen:",
        cancel: "Abbrechen",
        call: "Anrufen",
        gpsUnsupported:
          "Geolokalisierung wird von diesem Browser nicht unterstützt.",
        gpsFailed:
          "Standort konnte nicht ermittelt werden. Bitte erneut versuchen.",
        reverseFailed:
          "Standort gefunden, aber die Ländererkennung ist fehlgeschlagen. Google Maps funktioniert trotzdem.",
        noCentralNumber:
          "Für diesen Standort ist keine zentrale Polizeinummer verfügbar. Bitte nutzen Sie lokale Behörden.",
        country: "Land",
        gps: "GPS",
        desktopNotice:
          "Bitte verwenden Sie ein Telefon, um diese Nummer anzurufen.",
      };

    case "fr":
      return {
        title: "Position actuelle",
        description:
          "Autorisez l’accès à la position afin que nous puissions vous diriger directement vers les autorités compétentes.",
        button: "Utiliser ma position",
        detecting: "Localisation en cours...",
        success: "Position détectée",
        openMaps: "Ouvrir la police dans Google Maps",
        callAuthorities: "Appeler les autorités",
        confirmTitle: "Confirmation",
        confirmText:
          "Voulez-vous vraiment appeler ce numéro d’urgence :",
        cancel: "Annuler",
        call: "Appeler",
        gpsUnsupported:
          "La géolocalisation n’est pas prise en charge par ce navigateur.",
        gpsFailed:
          "La position n’a pas pu être récupérée. Veuillez réessayer.",
        reverseFailed:
          "Position trouvée, mais la détection du pays a échoué. Google Maps fonctionne toujours.",
        noCentralNumber:
          "Aucun numéro central de police n’est disponible pour cet emplacement. Utilisez les autorités locales.",
        country: "Pays",
        gps: "GPS",
        desktopNotice:
          "Utilisez un téléphone pour appeler ce numéro.",
      };

    case "it":
      return {
        title: "Posizione attuale",
        description:
          "Consenti l’accesso alla posizione così possiamo indirizzarti direttamente verso le autorità competenti.",
        button: "Usa la mia posizione",
        detecting: "Rilevamento posizione...",
        success: "Posizione rilevata",
        openMaps: "Apri polizia in Google Maps",
        callAuthorities: "Chiama autorità",
        confirmTitle: "Conferma",
        confirmText:
          "Vuoi davvero chiamare questo numero di emergenza:",
        cancel: "Annulla",
        call: "Chiama",
        gpsUnsupported:
          "La geolocalizzazione non è supportata da questo browser.",
        gpsFailed:
          "Impossibile recuperare la posizione. Riprova.",
        reverseFailed:
          "Posizione trovata, ma il rilevamento del paese non è riuscito. Google Maps funziona comunque.",
        noCentralNumber:
          "Nessun numero centrale di polizia disponibile per questa posizione. Usa le autorità locali.",
        country: "Paese",
        gps: "GPS",
        desktopNotice:
          "Usa un telefono per chiamare questo numero.",
      };

    case "pt":
      return {
        title: "Localização atual",
        description:
          "Permita o acesso à localização para que possamos encaminhá-lo diretamente para as autoridades competentes.",
        button: "Usar a minha localização",
        detecting: "A obter localização...",
        success: "Localização detetada",
        openMaps: "Abrir polícia no Google Maps",
        callAuthorities: "Ligar para autoridades",
        confirmTitle: "Confirmação",
        confirmText:
          "Tem a certeza de que quer ligar para este número de emergência:",
        cancel: "Cancelar",
        call: "Ligar",
        gpsUnsupported:
          "A geolocalização não é suportada por este navegador.",
        gpsFailed:
          "Não foi possível obter a localização. Tente novamente.",
        reverseFailed:
          "Localização encontrada, mas a deteção do país falhou. O Google Maps continua a funcionar.",
        noCentralNumber:
          "Não existe um número central da polícia disponível para esta localização. Utilize as autoridades locais.",
        country: "País",
        gps: "GPS",
        desktopNotice:
          "Use um telefone para ligar para este número.",
      };

    default:
      return {
        title: "Current location",
        description:
          "Allow location access so we can direct you straight to the relevant authorities.",
        button: "Use my location",
        detecting: "Detecting...",
        success: "Location detected",
        openMaps: "Open police in Google Maps",
        callAuthorities: "Call authorities",
        confirmTitle: "Confirmation",
        confirmText:
          "Are you sure you want to call this emergency number:",
        cancel: "Cancel",
        call: "Call",
        gpsUnsupported: "Geolocation is not supported by this browser.",
        gpsFailed: "Could not retrieve location. Try again.",
        reverseFailed:
          "Location found, but country detection failed. Google Maps still works.",
        noCentralNumber:
          "No central police number is available for this location. Use local authorities.",
        country: "Country",
        gps: "GPS",
        desktopNotice:
          "Use a phone to call this number.",
      };
  }
}

export default function ReportSightingClient({ lang }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationText, setLocationText] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryLabel, setCountryLabel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const text = useMemo(() => getClientTexts(lang), [lang]);

  const isMobile =
    typeof window !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const mapsUrl =
    latitude && longitude
      ? `https://www.google.com/maps/search/police/@${latitude},${longitude},15z`
      : "";

  const handleGetLocation = () => {
    setLoading(true);
    setError("");
    setLocationText("");
    setLatitude("");
    setLongitude("");
    setCountryCode("");
    setCountryLabel("");
    setPhoneNumber("");
    setShowConfirm(false);

    if (!navigator.geolocation) {
      setError(text.gpsUnsupported);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);

          setLatitude(lat);
          setLongitude(lon);
          setLocationText(
            `${text.success}: ${lat}, ${lon} (±${Math.round(
              position.coords.accuracy
            )}m)`
          );

          const reverse = await fetch(
            `/api/reverse-country?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`,
            { cache: "no-store" }
          );

          if (!reverse.ok) {
            setError(text.reverseFailed);
            setLoading(false);
            return;
          }

          const data = await reverse.json();
          const detectedCode = data?.countryCode || "DEFAULT";
          const detectedCountry = data?.country || "";

          setCountryCode(detectedCode);
          setCountryLabel(detectedCountry);

          const entry =
            EMERGENCY_NUMBERS[detectedCode] || EMERGENCY_NUMBERS.DEFAULT;

          if (entry.status === "ok" && entry.numbers.length > 0) {
            setPhoneNumber(entry.numbers[0]);
          } else {
            setPhoneNumber("");
            setError(text.noCentralNumber);
          }

          setLoading(false);
        } catch {
          setError(text.reverseFailed);
          setLoading(false);
        }
      },
      () => {
        setError(text.gpsFailed);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      <div className="rounded-2xl border p-6 bg-white">
        <h3 className="text-lg font-semibold mb-3">{text.title}</h3>

        <p className="text-sm text-slate-600 mb-4">{text.description}</p>

        <button
          type="button"
          onClick={handleGetLocation}
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold disabled:opacity-60"
        >
          {loading ? text.detecting : text.button}
        </button>

        {locationText && (
          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {locationText}
          </div>
        )}

        {(countryLabel || countryCode) && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 space-y-1">
            {countryLabel && (
              <p>
                <strong>{text.country}:</strong> {countryLabel}
              </p>
            )}
            {countryCode && (
              <p>
                <strong>ISO:</strong> {countryCode}
              </p>
            )}
            {latitude && longitude && (
              <p>
                <strong>{text.gps}:</strong> {latitude}, {longitude}
              </p>
            )}
          </div>
        )}

        {mapsUrl && (
          <div className="mt-4">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex px-5 py-3 rounded-xl border border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold"
            >
              {text.openMaps}
            </a>
          </div>
        )}

        {phoneNumber && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="inline-flex px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {text.callAuthorities} ({phoneNumber})
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-semibold mb-3">{text.confirmTitle}</h4>
            <p className="text-sm text-slate-600 mb-6">
              {text.confirmText} <strong>{phoneNumber}</strong>?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300"
              >
                {text.cancel}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isMobile) {
                    window.location.href = `tel:${phoneNumber}`;
                  } else {
                    alert(`⚠️ ${phoneNumber}\n\n${text.desktopNotice}`);
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-center"
              >
                {text.call}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}