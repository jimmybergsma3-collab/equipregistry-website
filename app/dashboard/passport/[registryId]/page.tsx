import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/getSession";

type PageProps = {
  params: Promise<{
    registryId: string;
  }>;
};

export default async function PrivatePassportPage({ params }: PageProps) {
  const { registryId } = await params;

  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect(
      `/login?next=${encodeURIComponent(`/dashboard/passport/${registryId}`)}`
    );
  }

  return (
    <main
      style={{
        minHeight: "calc(100vh - 72px)", // ruimte voor dashboard header
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        padding: 24,
      }}
    >
      <section
        style={{
          background: "#ffffff",
          padding: "32px 36px",
          border: "1px solid #d1d5db",
          borderRadius: 8,
          maxWidth: 520,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>EquipRegistry</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
              Private Passport
            </h1>
          </div>

          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              background: "#f1f5f9",
              color: "#111827",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 13,
              height: "fit-content",
              border: "1px solid #e5e7eb",
            }}
          >
            Back
          </Link>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#f8fafc",
          }}
        >
          <div style={{ fontSize: 12, color: "#6b7280" }}>Registry ID</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{registryId}</div>

          <div style={{ marginTop: 10, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
            This is the <strong>private</strong> passport route under <code>/dashboard</code>.
            Later we will show full owner data here (Layer 2 access).
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          <Link
            href={`/passport/${encodeURIComponent(registryId)}`}
            style={{
              display: "inline-block",
              padding: "12px 16px",
              background: "#1f4fd8",
              color: "#ffffff",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            View public passport
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 16px",
              background: "#f1f5f9",
              color: "#111827",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              border: "1px solid #e5e7eb",
            }}
          >
            Back to search
          </Link>
        </div>
      </section>
    </main>
  );
}
