"use client";

import {
  ApplicantType,
  RegistrationCompletenessResult,
  getNextSubmitAction,
  getApplicantTypeLabel,
} from "@/lib/registry/workflow";
import type { Lang } from "@/lib/i18n/config";

function prettifyKey(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

type Props = {
  lang: Lang;
  applicantType: ApplicantType;
  completeness: RegistrationCompletenessResult;
  paymentCompleted: boolean;
};

const TEXT: Record<
  Lang,
  {
    title: string;
    applicantType: string;
    complete: string;
    incomplete: string;
    nextSteps: {
      incomplete: string;
      payment: string;
      ready: string;
    };
    missingFields: string;
    missingDynamic: string;
    missingDocuments: string;
    paymentStatus: string;
    paymentDone: string;
    paymentPending: string;
    paid: string;
    pending: string;
  }
> = {
  en: {
    title: "Registration readiness",
    applicantType: "Applicant type",
    complete: "Complete",
    incomplete: "Incomplete",
    nextSteps: {
      incomplete: "Complete all required information.",
      payment:
        "Your file is complete. Continue to payment to activate submission.",
      ready: "Your file is complete and ready to be submitted.",
    },
    missingFields: "Missing fields",
    missingDynamic: "Missing category-specific fields",
    missingDocuments: "Missing documents",
    paymentStatus: "Payment status",
    paymentDone: "Payment completed or not required for this partner type.",
    paymentPending: "Payment has not been completed yet.",
    paid: "Paid / Cleared",
    pending: "Payment pending",
  },
  es: {
    title: "Estado de registro",
    applicantType: "Tipo de solicitante",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Complete toda la información requerida.",
      payment:
        "El expediente está completo. Continúe al pago para activar el envío.",
      ready: "El expediente está completo y listo para enviar.",
    },
    missingFields: "Campos faltantes",
    missingDynamic: "Campos específicos faltantes",
    missingDocuments: "Documentos faltantes",
    paymentStatus: "Estado del pago",
    paymentDone: "Pago completado o no requerido para este tipo de socio.",
    paymentPending: "El pago aún no se ha completado.",
    paid: "Pagado",
    pending: "Pago pendiente",
  },
  de: {
    title: "Registrierungsstatus",
    applicantType: "Antragstyp",
    complete: "Vollständig",
    incomplete: "Unvollständig",
    nextSteps: {
      incomplete: "Alle erforderlichen Angaben ausfüllen.",
      payment:
        "Die Daten sind vollständig. Fahren Sie mit der Zahlung fort.",
      ready: "Die Daten sind vollständig und bereit zur Einreichung.",
    },
    missingFields: "Fehlende Felder",
    missingDynamic: "Fehlende kategoriespezifische Felder",
    missingDocuments: "Fehlende Dokumente",
    paymentStatus: "Zahlungsstatus",
    paymentDone: "Zahlung abgeschlossen oder nicht erforderlich.",
    paymentPending: "Zahlung noch nicht abgeschlossen.",
    paid: "Bezahlt",
    pending: "Zahlung ausstehend",
  },
  fr: {
    title: "État de l’enregistrement",
    applicantType: "Type de demandeur",
    complete: "Complet",
    incomplete: "Incomplet",
    nextSteps: {
      incomplete: "Complétez toutes les informations requises.",
      payment:
        "Le dossier est complet. Passez au paiement pour activer l’envoi.",
      ready: "Le dossier est complet et prêt à être soumis.",
    },
    missingFields: "Champs manquants",
    missingDynamic: "Champs spécifiques manquants",
    missingDocuments: "Documents manquants",
    paymentStatus: "Statut du paiement",
    paymentDone: "Paiement effectué ou non requis.",
    paymentPending: "Le paiement n’est pas encore effectué.",
    paid: "Payé",
    pending: "Paiement en attente",
  },
  it: {
    title: "Stato registrazione",
    applicantType: "Tipo richiedente",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Completa tutte le informazioni richieste.",
      payment:
        "Il file è completo. Procedi al pagamento per attivare l’invio.",
      ready: "Il file è completo e pronto per essere inviato.",
    },
    missingFields: "Campi mancanti",
    missingDynamic: "Campi specifici mancanti",
    missingDocuments: "Documenti mancanti",
    paymentStatus: "Stato pagamento",
    paymentDone: "Pagamento completato o non richiesto.",
    paymentPending: "Pagamento non ancora completato.",
    paid: "Pagato",
    pending: "In attesa",
  },
  nl: {
    title: "Registratie status",
    applicantType: "Type aanvrager",
    complete: "Compleet",
    incomplete: "Incompleet",
    nextSteps: {
      incomplete: "Vul alle verplichte gegevens in.",
      payment:
        "Je dossier is compleet. Ga door naar betaling om te activeren.",
      ready: "Je dossier is compleet en klaar om in te dienen.",
    },
    missingFields: "Ontbrekende velden",
    missingDynamic: "Ontbrekende categorievelden",
    missingDocuments: "Ontbrekende documenten",
    paymentStatus: "Betalingsstatus",
    paymentDone: "Betaling voltooid of niet vereist.",
    paymentPending: "Betaling nog niet voltooid.",
    paid: "Betaald",
    pending: "Betaling openstaand",
  },
  pt: {
    title: "Estado do registo",
    applicantType: "Tipo de requerente",
    complete: "Completo",
    incomplete: "Incompleto",
    nextSteps: {
      incomplete: "Preencha todas as informações obrigatórias.",
      payment: "O ficheiro está completo. Continue para pagamento.",
      ready: "O ficheiro está completo e pronto para envio.",
    },
    missingFields: "Campos em falta",
    missingDynamic: "Campos específicos em falta",
    missingDocuments: "Documentos em falta",
    paymentStatus: "Estado do pagamento",
    paymentDone: "Pagamento concluído ou não necessário.",
    paymentPending: "Pagamento ainda não concluído.",
    paid: "Pago",
    pending: "Pendente",
  },
  ru: {
    title: "Готовность регистрации",
    applicantType: "Тип заявителя",
    complete: "Заполнено",
    incomplete: "Не заполнено",
    nextSteps: {
      incomplete: "Заполните всю обязательную информацию.",
      payment:
        "Ваше досье заполнено. Перейдите к оплате, чтобы активировать отправку.",
      ready: "Ваше досье заполнено и готово к отправке.",
    },
    missingFields: "Отсутствующие поля",
    missingDynamic: "Отсутствующие поля по категории",
    missingDocuments: "Отсутствующие документы",
    paymentStatus: "Статус оплаты",
    paymentDone: "Оплата выполнена или не требуется для этого типа партнёра.",
    paymentPending: "Оплата ещё не выполнена.",
    paid: "Оплачено / подтверждено",
    pending: "Ожидается оплата",
  },
  zh: {
    title: "注册准备状态",
    applicantType: "申请人类型",
    complete: "完整",
    incomplete: "不完整",
    nextSteps: {
      incomplete: "请完成所有必填信息。",
      payment: "您的资料已完整。继续付款以激活提交。",
      ready: "您的资料已完整，可以提交。",
    },
    missingFields: "缺失字段",
    missingDynamic: "缺失的类别专属字段",
    missingDocuments: "缺失文件",
    paymentStatus: "付款状态",
    paymentDone: "已完成付款，或此合作伙伴类型无需付款。",
    paymentPending: "尚未完成付款。",
    paid: "已支付 / 已清算",
    pending: "待付款",
  },
  hi: {
    title: "पंजीकरण तैयारी स्थिति",
    applicantType: "आवेदक प्रकार",
    complete: "पूर्ण",
    incomplete: "अपूर्ण",
    nextSteps: {
      incomplete: "सभी आवश्यक जानकारी पूरी करें।",
      payment:
        "आपकी फ़ाइल पूरी है। सबमिशन सक्रिय करने के लिए भुगतान पर जाएँ।",
      ready: "आपकी फ़ाइल पूरी है और जमा करने के लिए तैयार है।",
    },
    missingFields: "गायब फ़ील्ड",
    missingDynamic: "गायब श्रेणी-विशिष्ट फ़ील्ड",
    missingDocuments: "गायब दस्तावेज़",
    paymentStatus: "भुगतान स्थिति",
    paymentDone:
      "भुगतान पूरा हो चुका है या इस पार्टनर प्रकार के लिए आवश्यक नहीं है।",
    paymentPending: "भुगतान अभी पूरा नहीं हुआ है।",
    paid: "भुगतान किया गया / स्वीकृत",
    pending: "भुगतान लंबित",
  },
  ar: {
    title: "جاهزية التسجيل",
    applicantType: "نوع مقدم الطلب",
    complete: "مكتمل",
    incomplete: "غير مكتمل",
    nextSteps: {
      incomplete: "أكمل جميع المعلومات المطلوبة.",
      payment: "ملفك مكتمل. تابع إلى الدفع لتفعيل الإرسال.",
      ready: "ملفك مكتمل وجاهز للإرسال.",
    },
    missingFields: "الحقول المفقودة",
    missingDynamic: "الحقول الخاصة بالفئة المفقودة",
    missingDocuments: "المستندات المفقودة",
    paymentStatus: "حالة الدفع",
    paymentDone: "تم الدفع أو أنه غير مطلوب لهذا النوع من الشركاء.",
    paymentPending: "لم يكتمل الدفع بعد.",
    paid: "مدفوع / تمت التسوية",
    pending: "الدفع معلق",
  },

  pl: {
    title: "Gotowosc rejestracji",
    applicantType: "Typ wnioskodawcy",
    complete: "Kompletna",
    incomplete: "Niekompletna",
    nextSteps: {
      incomplete: "Uzupelnij wszystkie wymagane informacje.",
      payment:
        "Twoja sprawa jest kompletna. Przejdz do platnosci, aby aktywowac zlozenie.",
      ready: "Twoja sprawa jest kompletna i gotowa do zlozenia.",
    },
    missingFields: "Brakujace pola",
    missingDynamic: "Brakujace pola zalezne od kategorii",
    missingDocuments: "Brakujace dokumenty",
    paymentStatus: "Status platnosci",
    paymentDone: "Platnosc zostala zakonczona lub nie jest wymagana dla tego typu partnera.",
    paymentPending: "Platnosc nie zostala jeszcze zakonczona.",
    paid: "Oplacone / Rozliczone",
    pending: "Oczekuje na platnosc",
  },
  sv: {
    title: "Registreringsstatus",
    applicantType: "Sokandetyp",
    complete: "Komplett",
    incomplete: "Ofullstandig",
    nextSteps: {
      incomplete: "Fyll i all obligatorisk information.",
      payment:
        "Ditt arende ar komplett. Fortsatt till betalning for att aktivera inlamningen.",
      ready: "Ditt arende ar komplett och klart att skickas in.",
    },
    missingFields: "Saknade falt",
    missingDynamic: "Saknade kategorispecifika falt",
    missingDocuments: "Saknade dokument",
    paymentStatus: "Betalningsstatus",
    paymentDone: "Betalningen ar genomford eller kravs inte for denna partnertyp.",
    paymentPending: "Betalningen har inte genomforts an.",
    paid: "Betald / Bekraftad",
    pending: "Betalning vantar",
  },
  da: {
    title: "Registreringsstatus",
    applicantType: "Ansogertype",
    complete: "Komplet",
    incomplete: "Ufuldstaendig",
    nextSteps: {
      incomplete: "Udfyld alle obligatoriske oplysninger.",
      payment:
        "Din sag er komplet. Fortsaet til betaling for at aktivere indsendelsen.",
      ready: "Din sag er komplet og klar til at blive indsendt.",
    },
    missingFields: "Manglende felter",
    missingDynamic: "Manglende kategorispecifikke felter",
    missingDocuments: "Manglende dokumenter",
    paymentStatus: "Betalingsstatus",
    paymentDone: "Betalingen er gennemfort eller er ikke kraevet for denne partnertype.",
    paymentPending: "Betalingen er endnu ikke gennemfort.",
    paid: "Betalt / Godkendt",
    pending: "Betaling afventer",
  },
  no: {
    title: "Registreringsstatus",
    applicantType: "Sokertype",
    complete: "Komplett",
    incomplete: "Ufullstendig",
    nextSteps: {
      incomplete: "Fyll ut all obligatorisk informasjon.",
      payment:
        "Saken din er komplett. Fortsett til betaling for a aktivere innsendingen.",
      ready: "Saken din er komplett og klar til a sendes inn.",
    },
    missingFields: "Manglende felt",
    missingDynamic: "Manglende kategorispesifikke felt",
    missingDocuments: "Manglende dokumenter",
    paymentStatus: "Betalingsstatus",
    paymentDone: "Betalingen er fullfort eller ikke paakrevd for denne partnertypen.",
    paymentPending: "Betalingen er ikke fullfort enn.",
    paid: "Betalt / Bekreftet",
    pending: "Betaling venter",
  },};

const STATUS_COPY_OVERRIDES: Record<
  Lang,
  Pick<
    (typeof TEXT)[Lang],
    "paymentStatus" | "paymentDone" | "paymentPending" | "paid" | "pending"
  > & {
    nextSteps: Pick<(typeof TEXT)[Lang]["nextSteps"], "payment">;
  }
> = {
  en: {
    nextSteps: {
      payment:
        "Your file is complete. Final processing starts after checkout confirmation.",
    },
    paymentStatus: "Checkout status",
    paymentDone: "Checkout is confirmed or not required for this applicant type.",
    paymentPending: "Checkout has not been completed yet.",
    paid: "Confirmed",
    pending: "Ready for checkout",
  },
  es: {
    nextSteps: {
      payment:
        "El expediente esta completo. El procesamiento final comienza despues de la confirmacion del checkout.",
    },
    paymentStatus: "Estado del checkout",
    paymentDone: "El checkout esta confirmado o no es necesario para este tipo de solicitante.",
    paymentPending: "El checkout aun no se ha completado.",
    paid: "Confirmado",
    pending: "Listo para checkout",
  },
  de: {
    nextSteps: {
      payment:
        "Die Datei ist vollstaendig. Die weitere Bearbeitung beginnt nach der Checkout-Bestaetigung.",
    },
    paymentStatus: "Checkout-Status",
    paymentDone: "Checkout ist bestaetigt oder fuer diesen Antragstyp nicht erforderlich.",
    paymentPending: "Checkout wurde noch nicht abgeschlossen.",
    paid: "Bestaetigt",
    pending: "Bereit fuer Checkout",
  },
  fr: {
    nextSteps: {
      payment:
        "Le dossier est complet. Le traitement final commence apres la confirmation du checkout.",
    },
    paymentStatus: "Statut du checkout",
    paymentDone: "Le checkout est confirme ou non requis pour ce type de demandeur.",
    paymentPending: "Le checkout n'a pas encore ete finalise.",
    paid: "Confirme",
    pending: "Pret pour le checkout",
  },
  it: {
    nextSteps: {
      payment:
        "Il dossier e completo. L'elaborazione finale inizia dopo la conferma del checkout.",
    },
    paymentStatus: "Stato checkout",
    paymentDone: "Il checkout e confermato o non richiesto per questo tipo di richiedente.",
    paymentPending: "Il checkout non e ancora stato completato.",
    paid: "Confermato",
    pending: "Pronto per il checkout",
  },
  nl: {
    nextSteps: {
      payment:
        "Je dossier is compleet. De verdere verwerking start na checkoutbevestiging.",
    },
    paymentStatus: "Checkoutstatus",
    paymentDone: "Checkout is bevestigd of niet vereist voor dit type aanvrager.",
    paymentPending: "Checkout is nog niet voltooid.",
    paid: "Bevestigd",
    pending: "Klaar voor checkout",
  },
  pt: {
    nextSteps: {
      payment:
        "O ficheiro esta completo. O processamento final comeca apos a confirmacao do checkout.",
    },
    paymentStatus: "Estado do checkout",
    paymentDone: "O checkout esta confirmado ou nao e necessario para este tipo de requerente.",
    paymentPending: "O checkout ainda nao foi concluido.",
    paid: "Confirmado",
    pending: "Pronto para checkout",
  },
  ru: {
    nextSteps: {
      payment:
        "Fail polnostyu gotov. Finalnaya obrabotka nachinayetsya posle podtverzhdeniya checkout.",
    },
    paymentStatus: "Status checkout",
    paymentDone: "Checkout podtverzhden ili ne trebuetsya dlya etogo tipa zayavitelya.",
    paymentPending: "Checkout eshche ne zavershen.",
    paid: "Podtverzhdeno",
    pending: "Ozhidayet checkout",
  },
  zh: {
    nextSteps: {
      payment:
        "Wenjian yi wancheng. Zuizhong chuli jiang zai checkout queren hou kaishi.",
    },
    paymentStatus: "Checkout zhuangtai",
    paymentDone: "Checkout yi queren huo ci shenqingren leixing wuxu checkout.",
    paymentPending: "Checkout shangwei wancheng.",
    paid: "Yi queren",
    pending: "Dengdai checkout",
  },
  hi: {
    nextSteps: {
      payment:
        "Aapki file poori hai. Antim processing checkout pushti ke baad shuru hoti hai.",
    },
    paymentStatus: "Checkout sthiti",
    paymentDone: "Checkout pusht hai ya is applicant type ke liye zaruri nahin hai.",
    paymentPending: "Checkout abhi tak poora nahin hua hai.",
    paid: "Pusht",
    pending: "Checkout ka intizar",
  },
  ar: {
    nextSteps: {
      payment:
        "Almalaf maktamil. Tabda almu3alaja alnihaiya baed taqid alcheckout.",
    },
    paymentStatus: "Halat alcheckout",
    paymentDone: "Alcheckout muakkad aw ghayr matlub lihadha naw muqaddim alttalab.",
    paymentPending: "Lam yaktamil alcheckout baed.",
    paid: "Muakkad",
    pending: "Fi intizar alcheckout",
  },

  pl: {
    nextSteps: {
      payment:
        "Your file is complete. Final processing starts after checkout confirmation.",
    },
    paymentStatus: "Checkout status",
    paymentDone: "Checkout is confirmed or not required for this applicant type.",
    paymentPending: "Checkout has not been completed yet.",
    paid: "Confirmed",
    pending: "Ready for checkout",
  },
  sv: {
    nextSteps: {
      payment:
        "Your file is complete. Final processing starts after checkout confirmation.",
    },
    paymentStatus: "Checkout status",
    paymentDone: "Checkout is confirmed or not required for this applicant type.",
    paymentPending: "Checkout has not been completed yet.",
    paid: "Confirmed",
    pending: "Ready for checkout",
  },
  da: {
    nextSteps: {
      payment:
        "Your file is complete. Final processing starts after checkout confirmation.",
    },
    paymentStatus: "Checkout status",
    paymentDone: "Checkout is confirmed or not required for this applicant type.",
    paymentPending: "Checkout has not been completed yet.",
    paid: "Confirmed",
    pending: "Ready for checkout",
  },
  no: {
    nextSteps: {
      payment:
        "Your file is complete. Final processing starts after checkout confirmation.",
    },
    paymentStatus: "Checkout status",
    paymentDone: "Checkout is confirmed or not required for this applicant type.",
    paymentPending: "Checkout has not been completed yet.",
    paid: "Confirmed",
    pending: "Ready for checkout",
  },};

export default function RegistrationReadinessPanel({
  lang,
  applicantType,
  completeness,
  paymentCompleted,
}: Props) {
  const baseText = TEXT[lang];
  const override = STATUS_COPY_OVERRIDES[lang];
  const text = {
    ...baseText,
    ...override,
    nextSteps: {
      ...baseText.nextSteps,
      ...override.nextSteps,
    },
  };

  const nextAction = getNextSubmitAction(
    applicantType,
    completeness.isComplete,
    paymentCompleted
  );

  let nextStepText = text.nextSteps.incomplete;
  if (nextAction === "go_to_payment") {
    nextStepText = text.nextSteps.payment;
  }
  if (nextAction === "submit_registration") {
    nextStepText = text.nextSteps.ready;
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {text.title}
          </h3>
          <p className="text-sm text-zinc-600">
            {text.applicantType}: {getApplicantTypeLabel(applicantType)}
          </p>
          <p className="text-sm text-zinc-600">{nextStepText}</p>
        </div>

        <span className="text-sm font-medium">
          {completeness.isComplete
            ? `${text.complete} (${completeness.score}%)`
            : `${text.incomplete} (${completeness.score}%)`}
        </span>
      </div>

      {!!completeness.missingFields.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingFields}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingFields.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      {!!completeness.missingDynamicFields.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingDynamic}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingDynamicFields.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      {!!completeness.missingDocuments.length && (
        <div className="mt-4">
          <p className="text-sm font-medium">{text.missingDocuments}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {completeness.missingDocuments.map((f) => (
              <span key={f}>{prettifyKey(f)}</span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <p className="text-sm font-medium">{text.paymentStatus}</p>
        <p className="text-sm text-zinc-600">
          {paymentCompleted ? text.paymentDone : text.paymentPending}
        </p>
        <p className="mt-2 text-sm font-medium">
          {paymentCompleted ? text.paid : text.pending}
        </p>
      </div>
    </section>
  );
}
