export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    serial?: string;
  }>;
};

export default async function TestPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold mb-6">TEST PAGE</h1>

      <form method="GET" action="/test" className="mb-6">
        <input
          name="serial"
          placeholder="Enter serial"
          className="border px-4 py-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Search
        </button>
      </form>

      <div className="border p-4 bg-slate-100">
        <strong>DEBUG:</strong><br />
        serial = {params.serial || "❌ nothing received"}
      </div>
    </main>
  );
}
