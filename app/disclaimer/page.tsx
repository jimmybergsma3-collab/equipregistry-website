import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function DisclaimerPage() {
  const lang = "en";

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-sm text-slate-500 mb-10">
              Last updated: 21 December 2025
            </p>

            <p className="mb-6 text-slate-700">
              The information provided on the EquipRegistry platform is for
              general informational purposes only. While we strive to keep the
              information accurate and up to date, EquipRegistry makes no
              representations or warranties of any kind, express or implied,
              about the completeness, accuracy, reliability, suitability, or
              availability of the platform or the information contained on it.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              No Legal or Professional Advice
            </h2>
            <p className="mb-4 text-slate-700">
              Nothing on this platform constitutes legal, financial, insurance,
              or professional advice of any kind. Users should always seek
              independent professional advice before making decisions based on
              equipment status or registry information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              No Ownership or Title Guarantee
            </h2>
            <p className="mb-4 text-slate-700">
              EquipRegistry does not act as an ownership registry, title
              authority, or certification body. Equipment registration or status
              information does not constitute proof of ownership, legal title,
              or legal compliance.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              Limitation of Liability
            </h2>
            <p className="mb-4 text-slate-700">
              To the fullest extent permitted by applicable law, EquipRegistry
              shall not be liable for any loss or damage, including without
              limitation indirect or consequential loss or damage, or any loss
              or damage whatsoever arising from loss of data or profits arising
              out of, or in connection with, the use of this platform.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              Third-Party Information
            </h2>
            <p className="mb-4 text-slate-700">
              The platform may contain information provided by third parties.
              EquipRegistry does not guarantee the accuracy or completeness of
              such information and accepts no responsibility for errors or
              omissions originating from third-party sources.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">
              Platform Availability
            </h2>
            <p className="mb-4 text-slate-700">
              EquipRegistry may modify, suspend, or discontinue the platform or
              any part of it at any time without notice. We do not guarantee
              uninterrupted or error-free operation of the platform.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
            <p className="mb-2 text-slate-700">
              If you have any questions regarding this disclaimer, please
              contact:
            </p>
            <p className="font-medium text-slate-700">
              Email:{" "}
              <a
                href="mailto:legal@equipregistry.com"
                className="text-blue-700 underline"
              >
                legal@equipregistry.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}