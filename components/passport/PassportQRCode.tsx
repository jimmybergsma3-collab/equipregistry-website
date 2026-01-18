// components/passport/PassportQRCode.tsx

'use client';

type Props = {
  registryId: string;
  origin: string; // <-- toevoegen
};

export default function PassportQRCode({ registryId, origin }: Props) {
  // Zorg dat origin altijd hetzelfde is server + client
  const verifyUrl = `${origin.replace(/\/$/, "")}/passport/${encodeURIComponent(registryId)}`;

  const qrSrc =
    "https://api.qrserver.com/v1/create-qr-code/?" +
    `size=140x140&data=${encodeURIComponent(verifyUrl)}`;

  return (
    <div style={{ display: "block" }}>
      <img
        src={qrSrc}
        alt="Scan to verify live registry status"
        width={140}
        height={140}
        style={{ display: "block" }}
      />
    </div>
  );
}


/* ---------- Styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: 'center',
  },

  qr: {
    display: 'block',
  },

  caption: {
    marginTop: 6,
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.3,
  },
};
