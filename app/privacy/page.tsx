export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/equipregistry_logo.png" alt="EquipRegistry" className="h-14" />
          <nav className="space-x-6 text-sm font-medium">
            <a href="/#how" className="hover:text-blue-700">How it works</a>
            <a href="/login" className="hover:text-blue-700">Login</a>
          </nav>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 bg-white rounded-2xl border p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-10">Last updated: 21 December 2025</p>

          <p className="mb-6">
            EquipRegistry is committed to protecting the privacy and personal data of all users of its platform.
            This Privacy Policy explains what data we collect, why we collect it, and how we safeguard it.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Who We Are</h2>
          <p className="mb-4">
            EquipRegistry is a global registry for heavy and small equipment, designed to prevent theft, fraud,
            and insurance risk. The platform supports owners, rental companies, insurers, and other professional
            parties by providing equipment verification and status checks.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. What Data We Collect</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Account and contact information:</strong> name, company name, email address, country or region, and user role.</li>
            <li><strong>Equipment data:</strong> serial numbers, equipment type, year of manufacture, registration status, and documentation proving legal origin (if provided).</li>
            <li><strong>Technical data:</strong> IP address (anonymised where possible), browser type, device information, and date/time of access.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Purpose of Processing</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Registering and verifying equipment</li>
            <li>Displaying verification and status results</li>
            <li>Preventing fraud and theft</li>
            <li>Improving platform functionality and demonstrations</li>
            <li>Communicating with users where applicable</li>
            <li>Meeting legal and compliance obligations</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Legal Basis</h2>
          <p className="mb-4">
            Personal data is processed based on performance of a contract, legitimate interest (such as fraud prevention
            and security), legal obligations, or user consent where applicable.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Sharing</h2>
          <p className="mb-4">
            EquipRegistry does not sell personal data. Data may only be shared with authorised partners where contractually
            agreed, when legally required, or with technical service providers under strict data processing agreements.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. International Transfers</h2>
          <p className="mb-4">
            As a global platform, data may be processed outside the European Union. Appropriate safeguards are applied in
            accordance with GDPR requirements, including standard contractual clauses.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Data Security</h2>
          <p className="mb-4">
            We apply appropriate technical and organisational measures, including encryption, access controls, monitoring,
            and secure hosting environments.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Data Retention</h2>
          <p className="mb-4">
            Personal data is retained only as long as necessary for the purposes for which it was collected, unless longer
            retention is required by law.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">9. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">10. Cookies</h2>
          <p className="mb-4">
            EquipRegistry uses only functional and analytical cookies necessary for platform operation.
            No advertising or tracking cookies are used.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">11. Changes</h2>
          <p className="mb-4">
            This Privacy Policy may be updated to reflect changes in legislation or platform functionality.
            The most recent version will always be available on the website.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">12. Contact</h2>
          <p className="mb-2">For privacy-related questions or requests, please contact:</p>
          <p className="font-medium">Email: <a href="mailto:privacy@equipregistry.com" className="text-blue-700 underline">privacy@equipregistry.com</a></p>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 text-sm text-slate-500 border-t bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            © {new Date().getFullYear()} EquipRegistry — Concept demo for investors
          </div>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-blue-800">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-800">Terms & Conditions</a>
            <a href="/disclaimer" className="hover:text-blue-800">Disclaimer</a>
          </div>
        </div>
      </footer>
    </>
  );
}
