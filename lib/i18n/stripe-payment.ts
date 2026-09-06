import type { Lang } from "@/lib/i18n/config";

type StripePaymentText = {
  checkoutTitle: string;
  checkoutDescription: string;
  amountLabel: string;
  webhookNote: string;
  payButton: string;
  payButtonNote: string;
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
    payButton: "Checkout",
    payButtonNote: "Secure payment via Stripe",
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
      "Continua este registro mediante Stripe Checkout seguro.",
    amountLabel: "Tarifa de registro",
    webhookNote:
      "El pago se confirma automaticamente despues de la confirmacion del webhook de Stripe.",
    payButton: "Finalizar compra",
    payButtonNote: "Pago seguro mediante Stripe",
    processing: "Redirigiendo...",
    genericError: "No se puede iniciar Stripe Checkout en este momento.",
    returnSuccessTitle: "Stripe Checkout completado",
    returnSuccessText:
      "Se recibio el retorno del pago. La confirmacion final se completa automaticamente cuando Stripe confirma el pago.",
    returnCancelTitle: "Stripe Checkout cancelado",
    returnCancelText:
      "No se completo ningun pago. Puedes volver a este registro e intentarlo de nuevo cuando quieras.",
    authRequired: "Debes iniciar sesion para continuar al pago.",
    requestMissing: "Registro no encontrado.",
    alreadyPaid: "Este registro ya ha sido pagado.",
    notPayable: "Este registro no esta esperando pago.",
    sessionUnavailable: "No se pudo crear Stripe Checkout en este momento.",
  },
  de: {
    checkoutTitle: "Zahlung abschliessen",
    checkoutDescription:
      "Fuhren Sie diese Registrierung uber den sicheren Stripe Checkout fort.",
    amountLabel: "Registrierungsgebuhr",
    webhookNote:
      "Die Zahlung wird nach der Stripe-Webhook-Bestatigung automatisch bestatigt.",
    payButton: "Zur Kasse",
    payButtonNote: "Sicher bezahlen uber Stripe",
    processing: "Weiterleitung...",
    genericError: "Stripe Checkout kann derzeit nicht gestartet werden.",
    returnSuccessTitle: "Stripe Checkout abgeschlossen",
    returnSuccessText:
      "Ihre Zahlungsruckleitung wurde empfangen. Die endgultige Bestatigung erfolgt automatisch, sobald Stripe die Zahlung bestatigt.",
    returnCancelTitle: "Stripe Checkout abgebrochen",
    returnCancelText:
      "Es wurde keine Zahlung abgeschlossen. Sie konnen zu dieser Registrierung zuruckkehren und es spater erneut versuchen.",
    authRequired: "Sie mussen angemeldet sein, um zur Zahlung fortzufahren.",
    requestMissing: "Registrierung nicht gefunden.",
    alreadyPaid: "Diese Registrierung wurde bereits bezahlt.",
    notPayable: "Diese Registrierung wartet nicht auf eine Zahlung.",
    sessionUnavailable: "Stripe Checkout konnte derzeit nicht erstellt werden.",
  },
  fr: {
    checkoutTitle: "Finaliser le paiement",
    checkoutDescription:
      "Poursuivez cet enregistrement via Stripe Checkout securise.",
    amountLabel: "Frais d'enregistrement",
    webhookNote:
      "Le paiement est confirme automatiquement apres la confirmation du webhook Stripe.",
    payButton: "Passer au paiement",
    payButtonNote: "Paiement securise via Stripe",
    processing: "Redirection...",
    genericError: "Impossible de lancer Stripe Checkout pour le moment.",
    returnSuccessTitle: "Stripe Checkout termine",
    returnSuccessText:
      "Le retour de paiement a bien ete recu. La confirmation finale est effectuee automatiquement lorsque Stripe confirme le paiement.",
    returnCancelTitle: "Stripe Checkout annule",
    returnCancelText:
      "Aucun paiement n'a ete finalise. Vous pouvez revenir a cet enregistrement et reessayer quand vous le souhaitez.",
    authRequired: "Vous devez etre connecte pour continuer vers le paiement.",
    requestMissing: "Enregistrement introuvable.",
    alreadyPaid: "Cet enregistrement a deja ete paye.",
    notPayable: "Cet enregistrement n'attend pas de paiement.",
    sessionUnavailable: "Stripe Checkout n'a pas pu etre cree pour le moment.",
  },
  it: {
    checkoutTitle: "Completa il pagamento",
    checkoutDescription:
      "Prosegui questa registrazione tramite Stripe Checkout sicuro.",
    amountLabel: "Tariffa di registrazione",
    webhookNote:
      "Il pagamento viene confermato automaticamente dopo la conferma del webhook di Stripe.",
    payButton: "Vai al pagamento",
    payButtonNote: "Pagamento sicuro tramite Stripe",
    processing: "Reindirizzamento...",
    genericError: "Impossibile avviare Stripe Checkout in questo momento.",
    returnSuccessTitle: "Stripe Checkout completato",
    returnSuccessText:
      "Il ritorno del pagamento e stato ricevuto. La conferma finale viene completata automaticamente quando Stripe conferma il pagamento.",
    returnCancelTitle: "Stripe Checkout annullato",
    returnCancelText:
      "Nessun pagamento e stato completato. Puoi tornare a questa registrazione e riprovare quando vuoi.",
    authRequired: "Devi accedere per continuare al pagamento.",
    requestMissing: "Registrazione non trovata.",
    alreadyPaid: "Questa registrazione e gia stata pagata.",
    notPayable: "Questa registrazione non e in attesa di pagamento.",
    sessionUnavailable: "Stripe Checkout non puo essere creato in questo momento.",
  },
  nl: {
    checkoutTitle: "Betaling voltooien",
    checkoutDescription:
      "Ga verder met deze registratie via beveiligde Stripe Checkout.",
    amountLabel: "Registratiekost",
    webhookNote:
      "De betaling wordt automatisch bevestigd na bevestiging via de Stripe-webhook.",
    payButton: "Afrekenen",
    payButtonNote: "Veilig betalen via Stripe",
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
      "Continue este registo atraves do Stripe Checkout seguro.",
    amountLabel: "Taxa de registo",
    webhookNote:
      "O pagamento e confirmado automaticamente apos a confirmacao do webhook da Stripe.",
    payButton: "Finalizar compra",
    payButtonNote: "Pagamento seguro via Stripe",
    processing: "A redirecionar...",
    genericError: "Nao e possivel iniciar o Stripe Checkout neste momento.",
    returnSuccessTitle: "Stripe Checkout concluido",
    returnSuccessText:
      "O retorno do pagamento foi recebido. A confirmacao final e concluida automaticamente quando a Stripe confirmar o pagamento.",
    returnCancelTitle: "Stripe Checkout cancelado",
    returnCancelText:
      "Nenhum pagamento foi concluido. Pode voltar a este registo e tentar novamente quando quiser.",
    authRequired: "Tem de iniciar sessao para continuar para o pagamento.",
    requestMissing: "Registo nao encontrado.",
    alreadyPaid: "Este registo ja foi pago.",
    notPayable: "Este registo nao esta a espera de pagamento.",
    sessionUnavailable: "Nao foi possivel criar Stripe Checkout neste momento.",
  },
  ru: {
    checkoutTitle: "Завершить оплату",
    checkoutDescription:
      "Продолжите эту регистрацию через безопасный Stripe Checkout.",
    amountLabel: "Регистрационный сбор",
    webhookNote:
      "Оплата подтверждается автоматически после подтверждения вебхуком Stripe.",
    payButton: "Оформить оплату",
    payButtonNote: "Безопасная оплата через Stripe",
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
    payButton: "前往结账",
    payButtonNote: "通过 Stripe 安全支付",
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
      "सुरक्षित Stripe Checkout के माध्यम से इस पंजीकरण को आगे बढ़ाएं।",
    amountLabel: "पंजीकरण शुल्क",
    webhookNote:
      "Stripe webhook पुष्टि के बाद भुगतान स्वतः पुष्टि हो जाता है।",
    payButton: "चेकआउट करें",
    payButtonNote: "Stripe के जरिए सुरक्षित भुगतान",
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
    webhookNote: "يتم تأكيد الدفع تلقائيا بعد تأكيد Webhook من Stripe.",
    payButton: "إكمال الدفع",
    payButtonNote: "دفع آمن عبر Stripe",
    processing: "جار إعادة التوجيه...",
    genericError: "لا يمكن بدء Stripe Checkout الآن.",
    returnSuccessTitle: "اكتمل Stripe Checkout",
    returnSuccessText:
      "تم استلام عودة الدفع. يكتمل التأكيد النهائي تلقائيا بعد أن تؤكد Stripe الدفع.",
    returnCancelTitle: "تم إلغاء Stripe Checkout",
    returnCancelText:
      "لم يكتمل أي دفع. يمكنك العودة إلى هذا التسجيل والمحاولة مرة أخرى عندما تكون جاهزا.",
    authRequired: "يجب تسجيل الدخول للمتابعة إلى الدفع.",
    requestMissing: "لم يتم العثور على التسجيل.",
    alreadyPaid: "تم دفع هذا التسجيل بالفعل.",
    notPayable: "هذا التسجيل لا ينتظر الدفع.",
    sessionUnavailable: "تعذر إنشاء Stripe Checkout الآن.",
  },
  pl: {
    checkoutTitle: "Dokoncz platnosc",
    checkoutDescription:
      "Kontynuuj te rejestracje przez bezpieczny Stripe Checkout.",
    amountLabel: "Oplata rejestracyjna",
    webhookNote:
      "Platnosc jest potwierdzana automatycznie po potwierdzeniu webhooka Stripe.",
    payButton: "Przejdz do platnosci",
    payButtonNote: "Bezpieczna platnosc przez Stripe",
    processing: "Przekierowywanie...",
    genericError: "Nie mozna teraz uruchomic Stripe Checkout.",
    returnSuccessTitle: "Platnosc Stripe zakonczona",
    returnSuccessText:
      "Odebrano powrot po platnosci. Ostateczne potwierdzenie nastapi automatycznie po potwierdzeniu platnosci przez Stripe.",
    returnCancelTitle: "Platnosc Stripe anulowana",
    returnCancelText:
      "Nie zakonczono zadnej platnosci. Mozesz wrocic do tej rejestracji i sprobowac ponownie, gdy bedziesz gotowy.",
    authRequired: "Musisz byc zalogowany, aby przejsc do platnosci.",
    requestMissing: "Nie znaleziono rejestracji.",
    alreadyPaid: "Ta rejestracja zostala juz oplacona.",
    notPayable: "Ta rejestracja nie oczekuje na platnosc.",
    sessionUnavailable: "Nie mozna teraz utworzyc Stripe Checkout.",
  },
  sv: {
    checkoutTitle: "Slutfor betalning",
    checkoutDescription:
      "Fortsatt denna registrering via sakert Stripe Checkout.",
    amountLabel: "Registreringsavgift",
    webhookNote:
      "Betalningen bekraftas automatiskt efter Stripe-webhookbekraftelse.",
    payButton: "Ga till betalning",
    payButtonNote: "Saker betalning via Stripe",
    processing: "Omdirigerar...",
    genericError: "Det gar inte att starta Stripe Checkout just nu.",
    returnSuccessTitle: "Stripe Checkout slutford",
    returnSuccessText:
      "Din betalningsaterkomst togs emot. Slutlig bekraftelse genomfors automatiskt nar Stripe bekraftar betalningen.",
    returnCancelTitle: "Stripe Checkout avbruten",
    returnCancelText:
      "Ingen betalning genomfordes. Du kan ga tillbaka till denna registrering och forsoka igen nar du ar redo.",
    authRequired: "Du maste vara inloggad for att fortsatta till betalning.",
    requestMissing: "Registreringen hittades inte.",
    alreadyPaid: "Denna registrering ar redan betald.",
    notPayable: "Denna registrering vantar inte pa betalning.",
    sessionUnavailable: "Stripe Checkout kunde inte skapas just nu.",
  },
  da: {
    checkoutTitle: "Gennemfor betaling",
    checkoutDescription:
      "Fortsat denne registrering via sikker Stripe Checkout.",
    amountLabel: "Registreringsgebyr",
    webhookNote:
      "Betalingen bekraeftes automatisk efter Stripe-webhookbekraeftelse.",
    payButton: "Ga til betaling",
    payButtonNote: "Sikker betaling via Stripe",
    processing: "Omdirigerer...",
    genericError: "Stripe Checkout kan ikke startes lige nu.",
    returnSuccessTitle: "Stripe Checkout gennemfort",
    returnSuccessText:
      "Din betalingsretur blev modtaget. Endelig bekraeftelse gennemfores automatisk, nar Stripe bekraefter betalingen.",
    returnCancelTitle: "Stripe Checkout annulleret",
    returnCancelText:
      "Ingen betaling blev gennemfort. Du kan vende tilbage til denne registrering og prove igen, nar du er klar.",
    authRequired: "Du skal vaere logget ind for at fortsaette til betaling.",
    requestMissing: "Registreringen blev ikke fundet.",
    alreadyPaid: "Denne registrering er allerede betalt.",
    notPayable: "Denne registrering afventer ikke betaling.",
    sessionUnavailable: "Stripe Checkout kunne ikke oprettes lige nu.",
  },
  no: {
    checkoutTitle: "Fullfor betaling",
    checkoutDescription:
      "Fortsett denne registreringen via sikker Stripe Checkout.",
    amountLabel: "Registreringsgebyr",
    webhookNote:
      "Betalingen bekreftes automatisk etter Stripe-webhookbekreftelse.",
    payButton: "Ga til betaling",
    payButtonNote: "Sikker betaling via Stripe",
    processing: "Omdirigerer...",
    genericError: "Kan ikke starte Stripe Checkout akkurat na.",
    returnSuccessTitle: "Stripe Checkout fullfort",
    returnSuccessText:
      "Betalingsreturen din ble mottatt. Endelig bekreftelse fullfores automatisk nar Stripe bekrefter betalingen.",
    returnCancelTitle: "Stripe Checkout avbrutt",
    returnCancelText:
      "Ingen betaling ble fullfort. Du kan ga tilbake til denne registreringen og prove igjen nar du er klar.",
    authRequired: "Du ma vaere logget inn for a fortsette til betaling.",
    requestMissing: "Registreringen ble ikke funnet.",
    alreadyPaid: "Denne registreringen er allerede betalt.",
    notPayable: "Denne registreringen venter ikke pa betaling.",
    sessionUnavailable: "Stripe Checkout kunne ikke opprettes akkurat na.",
  },
};

function removeProviderBranding(text: StripePaymentText): StripePaymentText {
  const normalize = (value: string) =>
    value
      .replace(/Stripe Checkout/g, "EquipRegistry Checkout")
      .replace(/Stripe checkout/g, "EquipRegistry checkout")
      .replace(/Stripe-webhook/g, "checkout-bevestiging")
      .replace(/Stripe webhook/g, "checkout confirmation")
      .replace(/\bStripe\b/g, "the payment provider");

  return {
    ...text,
    checkoutDescription: normalize(text.checkoutDescription),
    webhookNote: normalize(text.webhookNote),
    payButtonNote: "EquipRegistry.com / Verivista.es - NANCY'S CASTALLA",
    genericError: normalize(text.genericError),
    returnSuccessTitle: normalize(text.returnSuccessTitle),
    returnSuccessText: normalize(text.returnSuccessText),
    returnCancelTitle: normalize(text.returnCancelTitle),
    returnCancelText: normalize(text.returnCancelText),
    sessionUnavailable: normalize(text.sessionUnavailable),
  };
}

export function getStripePaymentText(lang: Lang) {
  return removeProviderBranding(STRIPE_PAYMENT_TEXT[lang] ?? STRIPE_PAYMENT_TEXT.en);
}
