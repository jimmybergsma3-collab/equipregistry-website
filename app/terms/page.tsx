export const dynamic = "force-dynamic";

export default function TermsPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-sm text-slate-500 mb-10">Last updated: 21 December 2025</p>

          <p className="mb-6">
            These Terms & Conditions govern your access to and use of the EquipRegistry platform. By accessing or using the platform, you agree to be bound by these terms. If you do not agree, you must not use the platform.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Platform:</strong> the EquipRegistry website, services, and related systems.</li>
            <li><strong>User:</strong> any individual or entity accessing or using the platform.</li>
            <li><strong>Equipment:</strong> heavy or small machinery registered or searched within the platform.</li>
            <li><strong>Status:</strong> the registration result displayed by the platform.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. Purpose of the Platform</h2>
          <p className="mb-4">
            EquipRegistry provides an informational registry designed to support equipment verification, fraud prevention, and risk assessment. The platform does not function as a title registry, ownership authority, or legal certification body.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Use of the Platform</h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Users must provide accurate and lawful information.</li>
            <li>The platform may only be used for legitimate and professional purposes.</li>
            <li>Users may not attempt to manipulate, reverse engineer, or misuse the platform.</li>
            <li>Access may be restricted or revoked in case of misuse or violation of these terms.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Registration & Verification</h2>
          <p className="mb-4">
            Equipment statuses are based on the information provided and available verification sources. EquipRegistry does not guarantee completeness, accuracy, or legal validity of submitted data.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. No Legal or Insurance Advice</h2>
          <p className="mb-4">
            Information provided by the platform does not constitute legal, financial, or insurance advice. Users remain solely responsible for independent verification and decision-making.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, EquipRegistry shall not be liable for any direct or indirect damages arising from use of, or reliance on, the platform, including but not limited to financial loss, operational disruption, or disputes regarding equipment ownership or status.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Intellectual Property</h2>
          <p className="mb-4">
            All content, branding, design, and platform functionality are the intellectual property of EquipRegistry or its licensors. Unauthorized use is prohibited.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Availability & Changes</h2>
          <p className="mb-4">
            The platform is provided on an "as is" and "as available" basis. EquipRegistry may modify, suspend, or discontinue any part of the platform at any time without prior notice.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">9. Termination</h2>
          <p className="mb-4">
            EquipRegistry reserves the right to suspend or terminate access to the platform in case of violation of these Terms & Conditions or applicable laws.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">10. Governing Law</h2>
          <p className="mb-4">
            These Terms & Conditions are governed by and construed in accordance with applicable international and European Union laws, without regard to conflict of law principles.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">11. Changes to These Terms</h2>
          <p className="mb-4">
            EquipRegistry may update these Terms & Conditions from time to time. Continued use of the platform constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">12. Contact</h2>
          <p className="mb-2">For questions regarding these Terms & Conditions, please contact:</p>
          <p className="font-medium">Email: <a href="mailto:legal@equipregistry.com" className="text-blue-700 underline">legal@equipregistry.com</a></p>
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
