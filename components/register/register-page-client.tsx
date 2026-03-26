"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  lang: string;
};

type ApplicantType = "private" | "sme";
type Category = "Vehicles" | "Machines" | "Industry";

export default function RegisterPageClient({ lang }: Props) {
  const router = useRouter();

  const [applicantType, setApplicantType] = useState<ApplicantType>("private");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");

  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState<Category>("Vehicles");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");

  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subcategoryOptions = useMemo(() => {
    switch (category) {
      case "Vehicles":
        return [
          "Passenger Car",
          "Camper",
          "Van",
          "Truck",
          "Trailer",
          "Motorcycle",
        ];
      case "Machines":
        return [
          "Excavator",
          "Wheel Loader",
          "Skid Steer",
          "Telehandler",
          "Bulldozer",
          "Mini Excavator",
        ];
      case "Industry":
        return [
          "Generator",
          "Compressor",
          "Pump",
          "Container",
          "Workshop Equipment",
        ];
      default:
        return [];
    }
  }, [category]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!declarationAccepted) {
      setError("Je moet eerst de verklaring accepteren.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantType,
          name,
          email,
          password,
          companyName,
          vatNumber,
          assetName,
          category,
          subcategory,
          brand,
          model,
          serialNumber,
          year,
          country,
          declarationAccepted,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registreren mislukt.");
        return;
      }

      router.push(`/${lang}/dashboard/registrations`);
      router.refresh();
    } catch {
      setError("Serverfout tijdens registreren.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Asset registreren</h1>
        <p className="text-slate-600">
          Start een registratieaanvraag voor een asset en maak direct je account aan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-8 space-y-8"
      >
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Aanvrager</h2>
            <p className="text-sm text-slate-500 mt-1">
              Vul je basisgegevens in. Hiermee maken we je account en koppelen we
              de registratie aan jouw profiel.
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Aanvragerstype *</label>
            <select
              value={applicantType}
              onChange={(e) => setApplicantType(e.target.value as ApplicantType)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="private">Particulier</option>
              <option value="sme">MKB / Zakelijk</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Naam *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Volledige naam"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">E-mail *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="naam@bedrijf.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Wachtwoord *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Minimaal 6 tekens"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Bedrijfsnaam {applicantType === "sme" ? "*" : "(optioneel)"}
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Naam bedrijf"
              required={applicantType === "sme"}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              BTW nummer (optioneel)
            </label>
            <input
              value={vatNumber}
              onChange={(e) => setVatNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="ESB12345678 / NL123456789B01"
            />
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Assetgegevens</h2>
            <p className="text-sm text-slate-500 mt-1">
              Geef de basisgegevens van het asset op. Verdere verificatie en documenten
              kunnen later worden aangevuld.
            </p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Asset naam *</label>
            <input
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Bijv. Opel Corsa 1.2 / CAT 320D / Atlas Copco Generator"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Categorie *</label>
            <select
              value={category}
              onChange={(e) => {
                const nextCategory = e.target.value as Category;
                setCategory(nextCategory);
                setSubcategory("");
              }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="Vehicles">Vehicles</option>
              <option value="Machines">Machines</option>
              <option value="Industry">Industry</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Subcategorie *</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              required
            >
              <option value="">Selecteer subcategorie</option>
              {subcategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Merk *</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Bijv. Opel / Caterpillar / Komatsu"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Model *</label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Bijv. Corsa / 320D / WA380"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Serienummer / VIN *
            </label>
            <input
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Serienummer, chassisnummer of VIN"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Jaar</label>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="2021"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Land</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Bijv. Spanje / Nederland / Duitsland"
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>
                Ik verklaar dat de verstrekte gegevens naar waarheid zijn ingevuld
                en dat ik gerechtigd ben om deze registratieaanvraag in te dienen.
              </span>
            </label>
          </div>
        </section>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Bezig..." : "Registratie starten"}
        </button>
      </form>
    </>
  );
}