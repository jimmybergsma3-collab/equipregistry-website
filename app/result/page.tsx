type Props = {
  searchParams: {
    serial?: string;
  };
};

function getStatus(serial: string) {
  const s = serial.toUpperCase();

  if (s.includes("ER-REG-001")) {
    return {
      label: "Registered & Verified",
      color: "green",
      message:
        "This machine is registered in EquipRegistry and its legal origin has been verified.",
      why:
        "This equipment has a verified legal origin and an active registry passport. It can be insured, sold or rented with reduced legal and insurance risk.",
    };
  }

  if (s.includes("ER-HIS-404")) {
    return {
      label: "History Unknown",
      color: "orange",
      message:
        "This machine is registered, but its full ownership history could not be verified.",
      why:
        "Incomplete ownership history increases fraud, insurance and compliance risk. Verification reduces uncertainty for insurers and buyers.",
    };
  }

  if (s.includes("ER-STOL-777")) {
    return {
      label: "Stolen Equipment",
      color: "red",
      message:
        "This machine has been reported stolen. Do not purchase, insure or transport this asset.",
      why:
        "Any transaction involving stolen equipment may lead to financial loss, claim denial or legal consequences.",
    };
  }

  return {
    label: "Not Registered",
    color: "gray",
    message:
      "This serial number is not registered in EquipRegistry.",
    why:
      "Unregistered equipment lacks a verified ownership record, increasing legal and insurance uncertainty.",
  };
}

export default function ResultPage({ searchParams }: Props) {
  const serial = searchParams.serial || "";
  const status = getStatus(serial);

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4">
        Equipment Registration Result
      </h1>

      <p className="text-slate-600 mb-8">
        Serial number: <strong>{serial}</strong>
      </p>

      <div
        className={`border-l-4 p-6 mb-6 ${
          status.color === "green"
            ? "border-green-600 bg-green-50"
            : status.color === "orange"
            ? "border-orange-500 bg-orange-50"
            : status.color === "red"
            ? "border-red-600 bg-red-50"
            : "border-slate-400 bg-slate-100"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">
          {status.label}
        </h2>
        <p className="text-slate-700">{status.message}</p>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-2">Why this matters</h3>
        <p className="text-slate-700 text-sm">{status.why}</p>
      </div>

      <div className="mt-8">
        <a
          href="/"
          className="text-equipBlue font-medium hover:underline"
        >
          ← Back to search
        </a>
      </div>
    </main>
  );
}
