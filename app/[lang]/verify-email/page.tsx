import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { isValidLang, type Lang } from "@/lib/i18n/config";

type Props = {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    token?: string;
    requestId?: string;
    status?: string;
  }>;
};

type VerifyText = {
  title: string;
  subtitle: string;
  sentTitle: string;
  sentText: string;
  invalidTitle: string;
  invalidText: string;
  expiredTitle: string;
  expiredText: string;
  home: string;
  login: string;
};

const TEXT: Record<Lang, VerifyText> = {
  en: {
    title: "Verify email",
    subtitle: "Confirm your email address to activate your account and continue in the existing dashboard flow.",
    sentTitle: "Verification email sent",
    sentText: "Check your inbox and open the verification link. After confirmation you will continue directly into your dashboard.",
    invalidTitle: "Verification link unavailable",
    invalidText: "This verification link is invalid or has already been used. Request a new verification email if you still need access.",
    expiredTitle: "Verification link expired",
    expiredText: "This verification link has expired. Start the verification step again to receive a fresh email.",
    home: "Back to homepage",
    login: "Go to login",
  },
  es: {
    title: "Verificar correo electronico",
    subtitle: "Confirme su correo electronico para activar su cuenta y continuar en el flujo existente del panel.",
    sentTitle: "Correo de verificacion enviado",
    sentText: "Revise su bandeja de entrada y abra el enlace de verificacion. Despues de confirmarlo continuara directamente en su panel.",
    invalidTitle: "Enlace de verificacion no disponible",
    invalidText: "Este enlace de verificacion no es valido o ya fue utilizado. Solicite un nuevo correo de verificacion si aun necesita acceso.",
    expiredTitle: "El enlace de verificacion ha caducado",
    expiredText: "Este enlace de verificacion ha caducado. Inicie de nuevo el paso de verificacion para recibir un correo nuevo.",
    home: "Volver a la pagina de inicio",
    login: "Ir al inicio de sesion",
  },
  de: {
    title: "E-Mail bestaetigen",
    subtitle: "Bestaetigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren und im bestehenden Dashboard-Ablauf fortzufahren.",
    sentTitle: "Bestaetigungs-E-Mail gesendet",
    sentText: "Pruefen Sie Ihren Posteingang und oeffnen Sie den Bestaetigungslink. Nach der Bestaetigung gelangen Sie direkt in Ihr Dashboard.",
    invalidTitle: "Bestaetigungslink nicht verfuegbar",
    invalidText: "Dieser Bestaetigungslink ist ungueltig oder wurde bereits verwendet. Fordern Sie bei Bedarf eine neue Bestaetigungs-E-Mail an.",
    expiredTitle: "Bestaetigungslink abgelaufen",
    expiredText: "Dieser Bestaetigungslink ist abgelaufen. Starten Sie den Bestaetigungsschritt erneut, um eine neue E-Mail zu erhalten.",
    home: "Zurueck zur Startseite",
    login: "Zur Anmeldung",
  },
  fr: {
    title: "Verifier l'e-mail",
    subtitle: "Confirmez votre adresse e-mail pour activer votre compte et poursuivre dans le flux existant du tableau de bord.",
    sentTitle: "E-mail de verification envoye",
    sentText: "Consultez votre boite de reception et ouvrez le lien de verification. Apres confirmation, vous arriverez directement dans votre tableau de bord.",
    invalidTitle: "Lien de verification indisponible",
    invalidText: "Ce lien de verification est invalide ou a deja ete utilise. Demandez un nouvel e-mail de verification si vous avez toujours besoin d'acces.",
    expiredTitle: "Lien de verification expire",
    expiredText: "Ce lien de verification a expire. Relancez l'etape de verification pour recevoir un nouvel e-mail.",
    home: "Retour a l'accueil",
    login: "Aller a la connexion",
  },
  it: {
    title: "Verifica e-mail",
    subtitle: "Confermi il suo indirizzo e-mail per attivare il suo account e continuare nel flusso esistente della dashboard.",
    sentTitle: "E-mail di verifica inviata",
    sentText: "Controlli la sua casella di posta e apra il link di verifica. Dopo la conferma entrera direttamente nella dashboard.",
    invalidTitle: "Link di verifica non disponibile",
    invalidText: "Questo link di verifica non e valido oppure e gia stato utilizzato. Richieda una nuova e-mail di verifica se ha ancora bisogno di accesso.",
    expiredTitle: "Link di verifica scaduto",
    expiredText: "Questo link di verifica e scaduto. Avvii di nuovo il passaggio di verifica per ricevere una nuova e-mail.",
    home: "Torna alla homepage",
    login: "Vai al login",
  },
  nl: {
    title: "E-mail verifieren",
    subtitle: "Bevestig je e-mailadres om je account te activeren en verder te gaan in de bestaande dashboardflow.",
    sentTitle: "Verificatie-e-mail verzonden",
    sentText: "Controleer je inbox en open de verificatielink. Na bevestiging ga je direct door naar je dashboard.",
    invalidTitle: "Verificatielink niet beschikbaar",
    invalidText: "Deze verificatielink is ongeldig of is al gebruikt. Vraag een nieuwe verificatie-e-mail aan als je nog toegang nodig hebt.",
    expiredTitle: "Verificatielink verlopen",
    expiredText: "Deze verificatielink is verlopen. Start de verificatiestap opnieuw om een nieuwe e-mail te ontvangen.",
    home: "Terug naar homepage",
    login: "Ga naar inloggen",
  },
  pt: {
    title: "Verificar e-mail",
    subtitle: "Confirme o seu endereco de e-mail para ativar a sua conta e continuar no fluxo existente do painel.",
    sentTitle: "E-mail de verificacao enviado",
    sentText: "Verifique a sua caixa de entrada e abra a ligacao de verificacao. Apos a confirmacao seguira diretamente para o seu painel.",
    invalidTitle: "Ligacao de verificacao indisponivel",
    invalidText: "Esta ligacao de verificacao e invalida ou ja foi utilizada. Solicite um novo e-mail de verificacao se ainda precisar de acesso.",
    expiredTitle: "Ligacao de verificacao expirada",
    expiredText: "Esta ligacao de verificacao expirou. Inicie novamente a etapa de verificacao para receber um novo e-mail.",
    home: "Voltar a pagina inicial",
    login: "Ir para o inicio de sessao",
  },
  ru: {
    title: "Подтвердить электронную почту",
    subtitle: "Подтвердите адрес электронной почты, чтобы активировать аккаунт и продолжить в существующем потоке панели.",
    sentTitle: "Письмо для подтверждения отправлено",
    sentText: "Проверьте входящие и откройте ссылку подтверждения. После подтверждения вы сразу перейдете в панель.",
    invalidTitle: "Ссылка подтверждения недоступна",
    invalidText: "Эта ссылка подтверждения недействительна или уже использована. Запросите новое письмо, если вам по-прежнему нужен доступ.",
    expiredTitle: "Срок действия ссылки истек",
    expiredText: "Срок действия этой ссылки подтверждения истек. Запустите шаг подтверждения снова, чтобы получить новое письмо.",
    home: "Вернуться на главную",
    login: "Перейти ко входу",
  },
  zh: {
    title: "验证电子邮箱",
    subtitle: "请确认您的电子邮箱地址，以激活账户并继续现有的控制台流程。",
    sentTitle: "验证邮件已发送",
    sentText: "请检查您的收件箱并打开验证链接。确认后，您将直接进入控制台。",
    invalidTitle: "验证链接不可用",
    invalidText: "此验证链接无效或已被使用。如果您仍需要访问权限，请重新请求验证邮件。",
    expiredTitle: "验证链接已过期",
    expiredText: "此验证链接已过期。请重新开始验证步骤以接收新的邮件。",
    home: "返回首页",
    login: "前往登录",
  },
  hi: {
    title: "ईमेल सत्यापित करें",
    subtitle: "अपने खाते को सक्रिय करने और मौजूदा डैशबोर्ड प्रवाह में आगे बढ़ने के लिए अपना ईमेल पता सत्यापित करें।",
    sentTitle: "सत्यापन ईमेल भेज दिया गया",
    sentText: "अपना इनबॉक्स देखें और सत्यापन लिंक खोलें। पुष्टि के बाद आप सीधे अपने डैशबोर्ड में जाएंगे।",
    invalidTitle: "सत्यापन लिंक उपलब्ध नहीं है",
    invalidText: "यह सत्यापन लिंक अमान्य है या पहले ही उपयोग किया जा चुका है। यदि आपको अभी भी पहुंच चाहिए तो नया सत्यापन ईमेल मांगें।",
    expiredTitle: "सत्यापन लिंक समाप्त हो गया",
    expiredText: "यह सत्यापन लिंक समाप्त हो गया है। नया ईमेल प्राप्त करने के लिए सत्यापन चरण फिर से शुरू करें।",
    home: "होमपेज पर वापस जाएं",
    login: "लॉग इन पर जाएं",
  },
  ar: {
    title: "تاكيد البريد الالكتروني",
    subtitle: "قم بتاكيد عنوان بريدك الالكتروني لتفعيل حسابك ومتابعة التدفق الحالي داخل لوحة التحكم.",
    sentTitle: "تم ارسال رسالة التاكيد",
    sentText: "تحقق من صندوق الوارد وافتح رابط التاكيد. بعد التاكيد ستنتقل مباشرة الى لوحة التحكم.",
    invalidTitle: "رابط التاكيد غير متاح",
    invalidText: "رابط التاكيد هذا غير صالح او تم استخدامه بالفعل. اطلب رسالة تاكيد جديدة اذا كنت ما زلت بحاجة الى الوصول.",
    expiredTitle: "انتهت صلاحية رابط التاكيد",
    expiredText: "انتهت صلاحية رابط التاكيد هذا. ابدأ خطوة التاكيد مرة اخرى للحصول على رسالة جديدة.",
    home: "العودة الى الصفحة الرئيسية",
    login: "الانتقال الى تسجيل الدخول",
  },
};

export default async function VerifyEmailPage({
  params,
  searchParams,
}: Props) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  const query = await searchParams;
  const token = query.token?.trim();
  const requestId = query.requestId?.trim();

  if (token) {
    const redirectParams = new URLSearchParams();
    redirectParams.set("token", token);
    redirectParams.set("lang", lang);

    if (requestId) {
      redirectParams.set("requestId", requestId);
    }

    redirect(`/api/auth/verify-email?${redirectParams.toString()}`);
  }

  const currentLang = lang as Lang;
  const t = TEXT[currentLang] ?? TEXT.en;
  const status =
    query.status === "expired" || query.status === "invalid"
      ? query.status
      : "sent";

  const heading = status === "expired" ? t.expiredTitle : status === "invalid" ? t.invalidTitle : t.sentTitle;
  const body = status === "expired" ? t.expiredText : status === "invalid" ? t.invalidText : t.sentText;

  return (
    <>
      <SiteHeader lang={currentLang} />

      <main
        dir={currentLang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-zinc-50"
      >
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              EquipRegistry
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              {t.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
              {t.subtitle}
            </p>

            <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h2 className="text-lg font-semibold text-zinc-950">{heading}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{body}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${currentLang}`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
              >
                {t.home}
              </Link>

              <Link
                href={`/${currentLang}/login`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {t.login}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={currentLang} />
    </>
  );
}
