import Link from "next/link";
import RequestStatusBadge from "@/components/registry/request-status-badge";
import DeleteRequestButton from "@/components/registry/delete-request-button";
import {
  RegistrationRequestSummary,
  getApplicantTypeLabel,
  isVisibleInDashboard,
} from "@/lib/registry/workflow";
import { getDictionary } from "@/lib/i18n/dictionary";

type Props = {
  lang: string;
  requests: RegistrationRequestSummary[];
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function canDeleteRequest(status: RegistrationRequestSummary["requestStatus"]) {
  return (
    status === "draft" ||
    status === "incomplete" ||
    status === "submitted"
  );
}

export default function DashboardRequestTable({ lang, requests }: Props) {
  const dict = getDictionary(lang);

  const visibleRequests = requests.filter((item) =>
    isVisibleInDashboard(item.requestStatus)
  );

  if (visibleRequests.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Your registered assets
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          No active registration requests are visible yet.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          Registration requests
        </h2>
        <p className="mt-1 text-sm text-zinc-600">
          Requests become visible in the dashboard once they move beyond draft.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Passport Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Asset
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Applicant
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Completeness
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Updated
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 bg-white">
            {visibleRequests.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-zinc-900">
                  <div>{item.reference}</div>

                  {canDeleteRequest(item.requestStatus) ? (
                    <div className="mt-2">
                      <DeleteRequestButton
                        id={item.id}
                        lang={lang}
                        label={
                          lang === "es"
                            ? "Eliminar"
                            : lang === "de"
                            ? "Löschen"
                            : lang === "fr"
                            ? "Supprimer"
                            : lang === "it"
                            ? "Elimina"
                            : lang === "nl"
                            ? "Verwijderen"
                            : lang === "pt"
                            ? "Eliminar"
                            : lang === "ru"
                            ? "Удалить"
                            : lang === "zh"
                            ? "删除"
                            : lang === "hi"
                            ? "हटाएँ"
                            : lang === "ar"
                            ? "حذف"
                            : "Delete"
                        }
                        deletingText={
                          lang === "es"
                            ? "Eliminando..."
                            : lang === "de"
                            ? "Wird gelöscht..."
                            : lang === "fr"
                            ? "Suppression..."
                            : lang === "it"
                            ? "Eliminazione..."
                            : lang === "nl"
                            ? "Verwijderen..."
                            : lang === "pt"
                            ? "A eliminar..."
                            : lang === "ru"
                            ? "Удаление..."
                            : lang === "zh"
                            ? "删除中..."
                            : lang === "hi"
                            ? "हटाया जा रहा है..."
                            : lang === "ar"
                            ? "جارٍ الحذف..."
                            : "Deleting..."
                        }
                        confirmText={
                          lang === "es"
                            ? "¿Está seguro de que desea eliminar este registro?"
                            : lang === "de"
                            ? "Möchten Sie diese Registrierung wirklich löschen?"
                            : lang === "fr"
                            ? "Voulez-vous vraiment supprimer cet enregistrement ?"
                            : lang === "it"
                            ? "Vuoi davvero eliminare questa registrazione?"
                            : lang === "nl"
                            ? "Weet je zeker dat je deze registratie wilt verwijderen?"
                            : lang === "pt"
                            ? "Tem a certeza de que pretende eliminar este registo?"
                            : lang === "ru"
                            ? "Вы уверены, что хотите удалить эту регистрацию?"
                            : lang === "zh"
                            ? "您确定要删除此注册吗？"
                            : lang === "hi"
                            ? "क्या आप वाकई इस पंजीकरण को हटाना चाहते हैं?"
                            : lang === "ar"
                            ? "هل أنت متأكد أنك تريد حذف هذا التسجيل؟"
                            : "Are you sure you want to delete this registration?"
                        }
                        errorText={
                          lang === "es"
                            ? "No se pudo eliminar el registro."
                            : lang === "de"
                            ? "Registrierung konnte nicht gelöscht werden."
                            : lang === "fr"
                            ? "Impossible de supprimer l’enregistrement."
                            : lang === "it"
                            ? "Impossibile eliminare la registrazione."
                            : lang === "nl"
                            ? "Registratie kon niet worden verwijderd."
                            : lang === "pt"
                            ? "Não foi possível eliminar o registo."
                            : lang === "ru"
                            ? "Не удалось удалить регистрацию."
                            : lang === "zh"
                            ? "无法删除注册。"
                            : lang === "hi"
                            ? "पंजीकरण हटाया नहीं जा सका।"
                            : lang === "ar"
                            ? "تعذر حذف التسجيل."
                            : "Failed to delete registration."
                        }
                      />
                    </div>
                  ) : null}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-900">{item.assetName}</div>
                  <div className="text-zinc-500">
                    {item.category} / {item.subcategory}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {getApplicantTypeLabel(item.applicantType)}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  <RequestStatusBadge status={item.requestStatus} lang={lang} />
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {item.completeness.score}%
                </td>

                <td className="px-6 py-4 text-sm text-zinc-700">
                  {formatDate(item.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}