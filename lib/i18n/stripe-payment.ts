import type { Lang } from "@/lib/i18n/config";

type StripePaymentText = {
  checkoutTitle: string;
  checkoutDescription: string;
  amountLabel: string;
  webhookNote: string;
  payButton: string;
  processing: string;
  genericError: string;
  returnSuccessTitle: string;
  returnSuccessText: string;
  returnCancelTitle: string;
  returnCancelText: string;
  authRequired: string;
  requestMissing: string;
  alreadyPaid: string;
  notPayable: string;
  sessionUnavailable: string;
};

const STRIPE_PAYMENT_TEXT: Record<Lang, StripePaymentText> = {
  en: {
    checkoutTitle: "Complete payment",
    checkoutDescription:
      "Continue this registration through secure Stripe Checkout.",
    amountLabel: "Registration fee",
    webhookNote:
      "Payment is confirmed automatically after Stripe webhook confirmation.",
    payButton: "Pay with Stripe",
    processing: "Redirecting...",
    genericError: "Unable to start Stripe Checkout right now.",
    returnSuccessTitle: "Stripe checkout completed",
    returnSuccessText:
      "Your payment return was received. Final confirmation is completed automatically after Stripe confirms the payment.",
    returnCancelTitle: "Stripe checkout cancelled",
    returnCancelText:
      "No payment was completed. You can return to this registration and try again when you are ready.",
    authRequired: "You must be logged in to continue to payment.",
    requestMissing: "Registration not found.",
    alreadyPaid: "This registration has already been paid.",
    notPayable: "This registration is not waiting for payment.",
    sessionUnavailable: "Stripe Checkout could not be created right now.",
  },
  es: {
    checkoutTitle: "Completar pago",
    checkoutDescription:
      "Continúe este registro mediante Stripe Checkout seguro.",
    amountLabel: "Tarifa de registro",
    webhookNote:
      "El pago se confirma automáticamente después de la confirmación del webhook de Stripe.",
    payButton: "Pagar con Stripe",
    processing: "Redirigiendo...",
    genericError: "No se puede iniciar Stripe Checkout en este momento.",
    returnSuccessTitle: "Stripe Checkout completado",
    returnSuccessText:
      "Se recibió el retorno del pago. La confirmación final se completa automáticamente cuando Stripe confirme el pago.",
    returnCancelTitle: "Stripe Checkout cancelado",
    returnCancelText:
      "No se completó ningún pago. Puede volver a este registro e intentarlo de nuevo cuando quiera.",
    authRequired: "Debe iniciar sesión para continuar al pago.",
    requestMissing: "Registro no encontrado.",
    alreadyPaid: "Este registro ya ha sido pagado.",
    notPayable: "Este registro no está esperando pago.",
    sessionUnavailable: "No se pudo crear Stripe Checkout en este momento.",
  },
  de: {
    checkoutTitle: "Zahlung abschließen",
    checkoutDescription:
      "Führen Sie diese Registrierung über den sicheren Stripe Checkout fort.",
    amountLabel: "Registrierungsgebühr",
    webhookNote:
      "Die Zahlung wird nach der Stripe-Webhook-Bestätigung automatisch bestätigt.",
    payButton: "Mit Stripe bezahlen",
    processing: "Weiterleitung...",
    genericError: "Stripe Checkout kann derzeit nicht gestartet werden.",
    returnSuccessTitle: "Stripe Checkout abgeschlossen",
    returnSuccessText:
      "Ihre Zahlungsrückleitung wurde empfangen. Die endgültige Bestätigung erfolgt automatisch, sobald Stripe die Zahlung bestätigt.",
    returnCancelTitle: "Stripe Checkout abgebrochen",
    returnCancelText:
      "Es wurde keine Zahlung abgeschlossen. Sie können zu dieser Registrierung zurückkehren und es später erneut versuchen.",
    authRequired: "Sie müssen angemeldet sein, um zur Zahlung fortzufahren.",
    requestMissing: "Registrierung nicht gefunden.",
    alreadyPaid: "Diese Registrierung wurde bereits bezahlt.",
    notPayable: "Diese Registrierung wartet nicht auf eine Zahlung.",
    sessionUnavailable: "Stripe Checkout konnte derzeit nicht erstellt werden.",
  },
  fr: {
    checkoutTitle: "Finaliser le paiement",
    checkoutDescription:
      "Poursuivez cet enregistrement via Stripe Checkout sécurisé.",
    amountLabel: "Frais d’enregistrement",
    webhookNote:
      "Le paiement est confirmé automatiquement après la confirmation du webhook Stripe.",
    payButton: "Payer avec Stripe",
    processing: "Redirection...",
    genericError: "Impossible de lancer Stripe Checkout pour le moment.",
    returnSuccessTitle: "Stripe Checkout terminé",
    returnSuccessText:
      "Le retour de paiement a bien été reçu. La confirmation finale est effectuée automatiquement lorsque Stripe confirme le paiement.",
    returnCancelTitle: "Stripe Checkout annulé",
    returnCancelText:
      "Aucun paiement n’a été finalisé. Vous pouvez revenir à cet enregistrement et réessayer quand vous le souhaitez.",
    authRequired: "Vous devez être connecté pour continuer vers le paiement.",
    requestMissing: "Enregistrement introuvable.",
    alreadyPaid: "Cet enregistrement a déjà été payé.",
    notPayable: "Cet enregistrement n’attend pas de paiement.",
    sessionUnavailable: "Stripe Checkout n’a pas pu être créé pour le moment.",
  },
  it: {
    checkoutTitle: "Completa il pagamento",
    checkoutDescription:
      "Prosegui questa registrazione tramite Stripe Checkout sicuro.",
    amountLabel: "Tariffa di registrazione",
    webhookNote:
      "Il pagamento viene confermato automaticamente dopo la conferma del webhook di Stripe.",
    payButton: "Paga con Stripe",
    processing: "Reindirizzamento...",
    genericError: "Impossibile avviare Stripe Checkout in questo momento.",
    returnSuccessTitle: "Stripe Checkout completato",
    returnSuccessText:
      "Il ritorno del pagamento è stato ricevuto. La conferma finale viene completata automaticamente quando Stripe conferma il pagamento.",
    returnCancelTitle: "Stripe Checkout annullato",
    returnCancelText:
      "Nessun pagamento è stato completato. Puoi tornare a questa registrazione e riprovare quando vuoi.",
    authRequired: "Devi accedere per continuare al pagamento.",
    requestMissing: "Registrazione non trovata.",
    alreadyPaid: "Questa registrazione è già stata pagata.",
    notPayable: "Questa registrazione non è in attesa di pagamento.",
    sessionUnavailable: "Stripe Checkout non può essere creato in questo momento.",
  },
  nl: {
    checkoutTitle: "Betaling voltooien",
    checkoutDescription:
      "Ga verder met deze registratie via beveiligde Stripe Checkout.",
    amountLabel: "Registratiekost",
    webhookNote:
      "De betaling wordt automatisch bevestigd na bevestiging via de Stripe-webhook.",
    payButton: "Betalen met Stripe",
    processing: "Doorsturen...",
    genericError: "Stripe Checkout kan nu niet worden gestart.",
    returnSuccessTitle: "Stripe Checkout voltooid",
    returnSuccessText:
      "Je betaalterugkeer is ontvangen. De definitieve bevestiging gebeurt automatisch zodra Stripe de betaling bevestigt.",
    returnCancelTitle: "Stripe Checkout geannuleerd",
    returnCancelText:
      "Er is geen betaling voltooid. Je kunt terugkeren naar deze registratie en het later opnieuw proberen.",
    authRequired: "Je moet ingelogd zijn om door te gaan naar betaling.",
    requestMissing: "Registratie niet gevonden.",
    alreadyPaid: "Deze registratie is al betaald.",
    notPayable: "Deze registratie wacht niet op betaling.",
    sessionUnavailable: "Stripe Checkout kon nu niet worden aangemaakt.",
  },
  pt: {
    checkoutTitle: "Concluir pagamento",
    checkoutDescription:
      "Continue este registo através do Stripe Checkout seguro.",
    amountLabel: "Taxa de registo",
    webhookNote:
      "O pagamento é confirmado automaticamente após a confirmação do webhook da Stripe.",
    payButton: "Pagar com Stripe",
    processing: "A redirecionar...",
    genericError: "Não é possível iniciar o Stripe Checkout neste momento.",
    returnSuccessTitle: "Stripe Checkout concluído",
    returnSuccessText:
      "O retorno do pagamento foi recebido. A confirmação final é concluída automaticamente quando a Stripe confirmar o pagamento.",
    returnCancelTitle: "Stripe Checkout cancelado",
    returnCancelText:
      "Nenhum pagamento foi concluído. Pode voltar a este registo e tentar novamente quando quiser.",
    authRequired: "Tem de iniciar sessão para continuar para o pagamento.",
    requestMissing: "Registo não encontrado.",
    alreadyPaid: "Este registo já foi pago.",
    notPayable: "Este registo não está à espera de pagamento.",
    sessionUnavailable: "Não foi possível criar o Stripe Checkout neste momento.",
  },
  ru: {
    checkoutTitle: "Завершить оплату",
    checkoutDescription:
      "Продолжите эту регистрацию через защищенный Stripe Checkout.",
    amountLabel: "Регистрационный сбор",
    webhookNote:
      "Оплата подтверждается автоматически после подтверждения вебхуком Stripe.",
    payButton: "Оплатить через Stripe",
    processing: "Перенаправление...",
    genericError: "Сейчас невозможно запустить Stripe Checkout.",
    returnSuccessTitle: "Stripe Checkout завершен",
    returnSuccessText:
      "Возврат после оплаты получен. Окончательное подтверждение выполняется автоматически после подтверждения оплаты Stripe.",
    returnCancelTitle: "Stripe Checkout отменен",
    returnCancelText:
      "Оплата не была завершена. Вы можете вернуться к этой регистрации и попробовать снова позже.",
    authRequired: "Чтобы перейти к оплате, необходимо войти в систему.",
    requestMissing: "Регистрация не найдена.",
    alreadyPaid: "Эта регистрация уже оплачена.",
    notPayable: "Эта регистрация не ожидает оплаты.",
    sessionUnavailable: "Сейчас не удалось создать Stripe Checkout.",
  },
  zh: {
    checkoutTitle: "完成付款",
    checkoutDescription: "通过安全的 Stripe Checkout 继续此注册流程。",
    amountLabel: "注册费用",
    webhookNote: "付款会在 Stripe webhook 确认后自动完成确认。",
    payButton: "使用 Stripe 支付",
    processing: "正在跳转...",
    genericError: "当前无法启动 Stripe Checkout。",
    returnSuccessTitle: "Stripe Checkout 已完成",
    returnSuccessText:
      "我们已收到您的付款返回。最终确认会在 Stripe 确认付款后自动完成。",
    returnCancelTitle: "Stripe Checkout 已取消",
    returnCancelText:
      "付款尚未完成。您可以返回此注册并在准备好后再次尝试。",
    authRequired: "您必须先登录才能继续付款。",
    requestMissing: "未找到注册记录。",
    alreadyPaid: "此注册已完成付款。",
    notPayable: "此注册当前不在等待付款状态。",
    sessionUnavailable: "当前无法创建 Stripe Checkout。",
  },
  hi: {
    checkoutTitle: "भुगतान पूरा करें",
    checkoutDescription:
      "सुरक्षित Stripe Checkout के माध्यम से इस पंजीकरण को आगे बढ़ाएँ।",
    amountLabel: "पंजीकरण शुल्क",
    webhookNote:
      "Stripe webhook पुष्टि के बाद भुगतान स्वतः पुष्टि हो जाता है।",
    payButton: "Stripe से भुगतान करें",
    processing: "रीडायरेक्ट किया जा रहा है...",
    genericError: "अभी Stripe Checkout शुरू नहीं किया जा सकता।",
    returnSuccessTitle: "Stripe Checkout पूरा हुआ",
    returnSuccessText:
      "आपकी भुगतान वापसी प्राप्त हो गई है। अंतिम पुष्टि Stripe द्वारा भुगतान की पुष्टि के बाद स्वतः पूरी हो जाएगी।",
    returnCancelTitle: "Stripe Checkout रद्द किया गया",
    returnCancelText:
      "कोई भुगतान पूरा नहीं हुआ। आप इस पंजीकरण पर वापस आकर बाद में फिर प्रयास कर सकते हैं।",
    authRequired: "भुगतान जारी रखने के लिए लॉग इन होना आवश्यक है।",
    requestMissing: "पंजीकरण नहीं मिला।",
    alreadyPaid: "इस पंजीकरण का भुगतान पहले ही हो चुका है।",
    notPayable: "यह पंजीकरण भुगतान की प्रतीक्षा में नहीं है।",
    sessionUnavailable: "अभी Stripe Checkout बनाया नहीं जा सका।",
  },
  ar: {
    checkoutTitle: "إكمال الدفع",
    checkoutDescription: "تابع هذا التسجيل عبر Stripe Checkout الآمن.",
    amountLabel: "رسوم التسجيل",
    webhookNote: "يتم تأكيد الدفع تلقائيًا بعد تأكيد Webhook من Stripe.",
    payButton: "الدفع عبر Stripe",
    processing: "جارٍ إعادة التوجيه...",
    genericError: "لا يمكن بدء Stripe Checkout الآن.",
    returnSuccessTitle: "اكتمل Stripe Checkout",
    returnSuccessText:
      "تم استلام عودة الدفع. يكتمل التأكيد النهائي تلقائيًا بعد أن تؤكد Stripe الدفع.",
    returnCancelTitle: "تم إلغاء Stripe Checkout",
    returnCancelText:
      "لم يكتمل أي دفع. يمكنك العودة إلى هذا التسجيل والمحاولة مرة أخرى عندما تكون جاهزًا.",
    authRequired: "يجب تسجيل الدخول للمتابعة إلى الدفع.",
    requestMissing: "لم يتم العثور على التسجيل.",
    alreadyPaid: "تم دفع هذا التسجيل بالفعل.",
    notPayable: "هذا التسجيل لا ينتظر الدفع.",
    sessionUnavailable: "تعذر إنشاء Stripe Checkout الآن.",
  },
};

export function getStripePaymentText(lang: Lang) {
  return STRIPE_PAYMENT_TEXT[lang] ?? STRIPE_PAYMENT_TEXT.en;
}
