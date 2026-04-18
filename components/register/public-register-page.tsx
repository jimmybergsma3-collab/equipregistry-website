"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { type Lang } from "@/lib/i18n/config";

type Props = {
  lang: Lang;
};

type RegisterText = {
  title: string;
  subtitle: string;
  noteTitle: string;
  noteText: string;
  name: string;
  email: string;
  password: string;
  company: string;
  vat: string;
  newsletter: string;
  terms: string;
  submit: string;
  submitting: string;
  loginPrompt: string;
  loginLink: string;
  requiredFields: string;
  passwordShort: string;
  emailExists: string;
  termsRequired: string;
  serverError: string;
};

const TEXT: Record<Lang, RegisterText> = {
  en: {
    title: "Create account",
    subtitle:
      "Create your EquipRegistry account first. Asset registration continues inside the dashboard after email verification.",
    noteTitle: "Launch flow",
    noteText:
      "This public step only creates your account. The existing V1 registration request flow remains inside the dashboard.",
    name: "Full name",
    email: "Email",
    password: "Password",
    company: "Company name (optional)",
    vat: "VAT number (optional)",
    newsletter: "Receive registry updates by email",
    terms: "I accept the terms and conditions",
    submit: "Create account",
    submitting: "Creating account...",
    loginPrompt: "Already have an account?",
    loginLink: "Login",
    requiredFields: "Complete the required fields.",
    passwordShort: "Use a password with at least 6 characters.",
    emailExists: "An account with this email already exists.",
    termsRequired: "You must accept the terms to continue.",
    serverError: "Server error. Please try again.",
  },
  es: {
    title: "Crear cuenta",
    subtitle:
      "Cree primero su cuenta de EquipRegistry. El registro del activo continua en el panel despues de verificar el correo electronico.",
    noteTitle: "Flujo de lanzamiento",
    noteText:
      "Este paso publico solo crea su cuenta. El flujo V1 existente para solicitudes de registro permanece dentro del panel.",
    name: "Nombre completo",
    email: "Correo electronico",
    password: "Contrasena",
    company: "Nombre de la empresa (opcional)",
    vat: "Numero de IVA (opcional)",
    newsletter: "Recibir actualizaciones del registro por correo electronico",
    terms: "Acepto los terminos y condiciones",
    submit: "Crear cuenta",
    submitting: "Creando cuenta...",
    loginPrompt: "Ya tiene una cuenta?",
    loginLink: "Iniciar sesion",
    requiredFields: "Complete los campos obligatorios.",
    passwordShort: "Use una contrasena de al menos 6 caracteres.",
    emailExists: "Ya existe una cuenta con este correo electronico.",
    termsRequired: "Debe aceptar los terminos para continuar.",
    serverError: "Error del servidor. Intentalo de nuevo.",
  },
  de: {
    title: "Konto erstellen",
    subtitle:
      "Erstellen Sie zuerst Ihr EquipRegistry-Konto. Die Asset-Registrierung geht nach der E-Mail-Bestaetigung im Dashboard weiter.",
    noteTitle: "Startablauf",
    noteText:
      "Dieser oeffentliche Schritt erstellt nur Ihr Konto. Der bestehende V1-Registrierungsablauf bleibt im Dashboard.",
    name: "Vollstaendiger Name",
    email: "E-Mail",
    password: "Passwort",
    company: "Firmenname (optional)",
    vat: "USt-IdNr. (optional)",
    newsletter: "Registry-Aktualisierungen per E-Mail erhalten",
    terms: "Ich akzeptiere die Allgemeinen Geschaeftsbedingungen",
    submit: "Konto erstellen",
    submitting: "Konto wird erstellt...",
    loginPrompt: "Sie haben bereits ein Konto?",
    loginLink: "Anmelden",
    requiredFields: "Bitte fuellen Sie die Pflichtfelder aus.",
    passwordShort: "Verwenden Sie ein Passwort mit mindestens 6 Zeichen.",
    emailExists: "Fuer diese E-Mail-Adresse besteht bereits ein Konto.",
    termsRequired: "Sie muessen die Bedingungen akzeptieren, um fortzufahren.",
    serverError: "Serverfehler. Bitte versuchen Sie es erneut.",
  },
  fr: {
    title: "Creer un compte",
    subtitle:
      "Creez d'abord votre compte EquipRegistry. L'enregistrement de l'actif se poursuit dans le tableau de bord apres verification de l'e-mail.",
    noteTitle: "Flux de lancement",
    noteText:
      "Cette etape publique cree uniquement votre compte. Le flux V1 existant de demande d'enregistrement reste dans le tableau de bord.",
    name: "Nom complet",
    email: "E-mail",
    password: "Mot de passe",
    company: "Nom de l'entreprise (optionnel)",
    vat: "Numero de TVA (optionnel)",
    newsletter: "Recevoir les mises a jour du registre par e-mail",
    terms: "J'accepte les conditions generales",
    submit: "Creer un compte",
    submitting: "Creation du compte...",
    loginPrompt: "Vous avez deja un compte ?",
    loginLink: "Connexion",
    requiredFields: "Veuillez remplir les champs obligatoires.",
    passwordShort: "Utilisez un mot de passe d'au moins 6 caracteres.",
    emailExists: "Un compte existe deja avec cette adresse e-mail.",
    termsRequired: "Vous devez accepter les conditions pour continuer.",
    serverError: "Erreur du serveur. Veuillez reessayer.",
  },
  it: {
    title: "Crea account",
    subtitle:
      "Crei prima il suo account EquipRegistry. La registrazione dell'asset continua nella dashboard dopo la verifica dell'e-mail.",
    noteTitle: "Flusso di lancio",
    noteText:
      "Questo passaggio pubblico crea solo il suo account. Il flusso V1 esistente per la richiesta di registrazione rimane nella dashboard.",
    name: "Nome completo",
    email: "E-mail",
    password: "Password",
    company: "Nome azienda (opzionale)",
    vat: "Partita IVA (opzionale)",
    newsletter: "Ricevere aggiornamenti del registro via e-mail",
    terms: "Accetto i termini e le condizioni",
    submit: "Crea account",
    submitting: "Creazione account...",
    loginPrompt: "Ha gia un account?",
    loginLink: "Accedi",
    requiredFields: "Compili i campi obbligatori.",
    passwordShort: "Usi una password di almeno 6 caratteri.",
    emailExists: "Esiste gia un account con questa e-mail.",
    termsRequired: "Deve accettare i termini per continuare.",
    serverError: "Errore del server. Riprovi.",
  },
  nl: {
    title: "Account aanmaken",
    subtitle:
      "Maak eerst je EquipRegistry-account aan. De assetregistratie gaat na e-mailverificatie verder in het dashboard.",
    noteTitle: "Lanceringstraject",
    noteText:
      "Deze publieke stap maakt alleen je account aan. De bestaande V1-registratieaanvraag blijft in het dashboard.",
    name: "Volledige naam",
    email: "E-mail",
    password: "Wachtwoord",
    company: "Bedrijfsnaam (optioneel)",
    vat: "BTW-nummer (optioneel)",
    newsletter: "Ontvang registry-updates per e-mail",
    terms: "Ik accepteer de algemene voorwaarden",
    submit: "Account aanmaken",
    submitting: "Account wordt aangemaakt...",
    loginPrompt: "Heb je al een account?",
    loginLink: "Inloggen",
    requiredFields: "Vul de verplichte velden in.",
    passwordShort: "Gebruik een wachtwoord van minimaal 6 tekens.",
    emailExists: "Er bestaat al een account met dit e-mailadres.",
    termsRequired: "Je moet de voorwaarden accepteren om verder te gaan.",
    serverError: "Serverfout. Probeer het opnieuw.",
  },
  pt: {
    title: "Criar conta",
    subtitle:
      "Crie primeiro a sua conta EquipRegistry. O registo do ativo continua no painel apos a verificacao do e-mail.",
    noteTitle: "Fluxo de lancamento",
    noteText:
      "Este passo publico cria apenas a sua conta. O fluxo V1 existente de pedido de registo permanece no painel.",
    name: "Nome completo",
    email: "E-mail",
    password: "Palavra-passe",
    company: "Nome da empresa (opcional)",
    vat: "Numero de IVA (opcional)",
    newsletter: "Receber atualizacoes do registo por e-mail",
    terms: "Aceito os termos e condicoes",
    submit: "Criar conta",
    submitting: "A criar conta...",
    loginPrompt: "Ja tem uma conta?",
    loginLink: "Iniciar sessao",
    requiredFields: "Preencha os campos obrigatorios.",
    passwordShort: "Utilize uma palavra-passe com pelo menos 6 caracteres.",
    emailExists: "Ja existe uma conta com este endereco de e-mail.",
    termsRequired: "Tem de aceitar os termos para continuar.",
    serverError: "Erro do servidor. Tente novamente.",
  },
  ru: {
    title: "Создать аккаунт",
    subtitle:
      "Сначала создайте аккаунт EquipRegistry. Регистрация актива продолжится в панели после подтверждения электронной почты.",
    noteTitle: "Стартовый поток",
    noteText:
      "Этот публичный шаг создает только аккаунт. Существующий поток V1 для регистрационных заявок остается внутри панели.",
    name: "Полное имя",
    email: "Электронная почта",
    password: "Пароль",
    company: "Название компании (необязательно)",
    vat: "Номер НДС (необязательно)",
    newsletter: "Получать обновления реестра по электронной почте",
    terms: "Я принимаю условия и положения",
    submit: "Создать аккаунт",
    submitting: "Создание аккаунта...",
    loginPrompt: "У вас уже есть аккаунт?",
    loginLink: "Войти",
    requiredFields: "Заполните обязательные поля.",
    passwordShort: "Используйте пароль не короче 6 символов.",
    emailExists: "Аккаунт с этим адресом уже существует.",
    termsRequired: "Необходимо принять условия, чтобы продолжить.",
    serverError: "Ошибка сервера. Пожалуйста, попробуйте снова.",
  },
  zh: {
    title: "创建账户",
    subtitle:
      "请先创建您的 EquipRegistry 账户。完成电子邮箱验证后，资产注册将在控制台中继续进行。",
    noteTitle: "上线流程",
    noteText:
      "此公开步骤仅用于创建账户。现有的 V1 注册申请流程仍保留在控制台内。",
    name: "姓名",
    email: "电子邮箱",
    password: "密码",
    company: "公司名称（可选）",
    vat: "增值税号（可选）",
    newsletter: "通过电子邮件接收注册系统更新",
    terms: "我接受条款和条件",
    submit: "创建账户",
    submitting: "正在创建账户...",
    loginPrompt: "已有账户？",
    loginLink: "登录",
    requiredFields: "请填写必填字段。",
    passwordShort: "请使用至少 6 个字符的密码。",
    emailExists: "该电子邮箱已存在账户。",
    termsRequired: "您必须接受条款后才能继续。",
    serverError: "服务器错误。请重试。",
  },
  hi: {
    title: "खाता बनाएं",
    subtitle:
      "पहले अपना EquipRegistry खाता बनाएं। ईमेल सत्यापन के बाद एसेट पंजीकरण डैशबोर्ड में जारी रहेगा।",
    noteTitle: "लॉन्च फ्लो",
    noteText:
      "यह सार्वजनिक चरण केवल आपका खाता बनाता है। मौजूदा V1 पंजीकरण अनुरोध प्रवाह डैशबोर्ड के भीतर ही रहता है।",
    name: "पूरा नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    company: "कंपनी का नाम (वैकल्पिक)",
    vat: "वैट नंबर (वैकल्पिक)",
    newsletter: "ईमेल द्वारा रजिस्ट्री अपडेट प्राप्त करें",
    terms: "मैं नियम और शर्तें स्वीकार करता हूं",
    submit: "खाता बनाएं",
    submitting: "खाता बनाया जा रहा है...",
    loginPrompt: "क्या आपके पास पहले से खाता है?",
    loginLink: "लॉग इन",
    requiredFields: "कृपया आवश्यक फ़ील्ड भरें।",
    passwordShort: "कम से कम 6 अक्षरों वाला पासवर्ड उपयोग करें।",
    emailExists: "इस ईमेल पते के साथ एक खाता पहले से मौजूद है।",
    termsRequired: "आगे बढ़ने के लिए शर्तें स्वीकार करना आवश्यक है।",
    serverError: "सर्वर त्रुटि। कृपया फिर से प्रयास करें।",
  },
  ar: {
    title: "إنشاء حساب",
    subtitle:
      "أنشئ حساب EquipRegistry أولا. بعد التحقق من البريد الإلكتروني ستتابع تسجيل الأصل داخل لوحة التحكم.",
    noteTitle: "مسار الإطلاق",
    noteText:
      "هذه الخطوة العامة تنشئ حسابك فقط. تدفق طلب التسجيل الحالي V1 يبقى داخل لوحة التحكم.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    company: "اسم الشركة (اختياري)",
    vat: "رقم ضريبة القيمة المضافة (اختياري)",
    newsletter: "تلقي تحديثات السجل عبر البريد الإلكتروني",
    terms: "أوافق على الشروط والأحكام",
    submit: "إنشاء حساب",
    submitting: "جارٍ إنشاء الحساب...",
    loginPrompt: "هل لديك حساب بالفعل؟",
    loginLink: "تسجيل الدخول",
    requiredFields: "يرجى اكمال الحقول المطلوبة.",
    passwordShort: "استخدم كلمة مرور من 6 احرف على الاقل.",
    emailExists: "يوجد حساب بالفعل لهذا البريد الالكتروني.",
    termsRequired: "يجب قبول الشروط للمتابعة.",
    serverError: "حدث خطا في الخادم. يرجى المحاولة مرة اخرى.",
  },

  pl: {
    title: "Utworz konto",
    subtitle:
      "Najpierw utworz konto EquipRegistry. Rejestracja assetu bedzie kontynuowana w panelu po weryfikacji e-mail.",
    noteTitle: "Przebieg startowy",
    noteText:
      "Ten publiczny krok tworzy tylko konto. Istniejacy proces zgloszenia rejestracji V1 pozostaje w panelu.",
    name: "Imie i nazwisko",
    email: "E-mail",
    password: "Haslo",
    company: "Nazwa firmy (opcjonalnie)",
    vat: "Numer VAT (opcjonalnie)",
    newsletter: "Otrzymuj aktualizacje rejestru e-mailem",
    terms: "Akceptuje regulamin i warunki",
    submit: "Utworz konto",
    submitting: "Tworzenie konta...",
    loginPrompt: "Masz juz konto?",
    loginLink: "Zaloguj sie",
    requiredFields: "Uzupelnij wymagane pola.",
    passwordShort: "Uzyj hasla o dlugosci co najmniej 6 znakow.",
    emailExists: "Konto z tym adresem e-mail juz istnieje.",
    termsRequired: "Aby kontynuowac, musisz zaakceptowac warunki.",
    serverError: "Blad serwera. Sprobuj ponownie.",
  },
  sv: {
    title: "Skapa konto",
    subtitle:
      "Skapa forst ditt EquipRegistry-konto. Registreringen av asseten fortsatter i instrumentpanelen efter e-postverifiering.",
    noteTitle: "Lanseringsflode",
    noteText:
      "Detta publika steg skapar bara ditt konto. Det befintliga V1-flodet for registreringsbegaran finns kvar i instrumentpanelen.",
    name: "Fullstandigt namn",
    email: "E-post",
    password: "Losenord",
    company: "Foretagsnamn (valfritt)",
    vat: "Momsnummer (valfritt)",
    newsletter: "Fa registeruppdateringar via e-post",
    terms: "Jag accepterar villkoren",
    submit: "Skapa konto",
    submitting: "Skapar konto...",
    loginPrompt: "Har du redan ett konto?",
    loginLink: "Logga in",
    requiredFields: "Fyll i de obligatoriska falten.",
    passwordShort: "Anvand ett losenord med minst 6 tecken.",
    emailExists: "Det finns redan ett konto med denna e-postadress.",
    termsRequired: "Du maste acceptera villkoren for att fortsatta.",
    serverError: "Serverfel. Forsok igen.",
  },
  da: {
    title: "Opret konto",
    subtitle:
      "Opret forst din EquipRegistry-konto. Registreringen af assetet fortsaetter i dashboardet efter e-mailbekraeftelse.",
    noteTitle: "Lanceringsflow",
    noteText:
      "Dette offentlige trin opretter kun din konto. Det eksisterende V1-flow for registreringsanmodninger forbliver i dashboardet.",
    name: "Fuldt navn",
    email: "E-mail",
    password: "Adgangskode",
    company: "Firmanavn (valgfrit)",
    vat: "Momsnummer (valgfrit)",
    newsletter: "Modtag registeropdateringer via e-mail",
    terms: "Jeg accepterer vilkar og betingelser",
    submit: "Opret konto",
    submitting: "Opretter konto...",
    loginPrompt: "Har du allerede en konto?",
    loginLink: "Log ind",
    requiredFields: "Udfyld de obligatoriske felter.",
    passwordShort: "Brug en adgangskode med mindst 6 tegn.",
    emailExists: "Der findes allerede en konto med denne e-mailadresse.",
    termsRequired: "Du skal acceptere vilkarene for at fortsaette.",
    serverError: "Serverfejl. Prov igen.",
  },
  no: {
    title: "Opprett konto",
    subtitle:
      "Opprett EquipRegistry-kontoen din forst. Registreringen av assetet fortsetter i dashbordet etter e-postbekreftelse.",
    noteTitle: "Lanseringsflyt",
    noteText:
      "Dette offentlige trinnet oppretter bare kontoen din. Den eksisterende V1-flyten for registreringsforesporsler blir i dashbordet.",
    name: "Fullt navn",
    email: "E-post",
    password: "Passord",
    company: "Firmanavn (valgfritt)",
    vat: "MVA-nummer (valgfritt)",
    newsletter: "Fa registeroppdateringer pa e-post",
    terms: "Jeg godtar vilkarene",
    submit: "Opprett konto",
    submitting: "Oppretter konto...",
    loginPrompt: "Har du allerede en konto?",
    loginLink: "Logg inn",
    requiredFields: "Fyll ut de obligatoriske feltene.",
    passwordShort: "Bruk et passord med minst 6 tegn.",
    emailExists: "Det finnes allerede en konto med denne e-postadressen.",
    termsRequired: "Du ma godta vilkarene for a fortsette.",
    serverError: "Serverfeil. Prov igjen.",
  },
};

function getErrorMessage(lang: Lang, code?: string) {
  const text = TEXT[lang] ?? TEXT.en;

  switch (code) {
    case "REQUIRED_FIELDS_MISSING":
      return text.requiredFields;
    case "PASSWORD_TOO_SHORT":
      return text.passwordShort;
    case "EMAIL_ALREADY_EXISTS":
      return text.emailExists;
    case "TERMS_ACCEPTANCE_REQUIRED":
      return text.termsRequired;
    default:
      return text.serverError;
  }
}

export default function PublicRegisterPage({ lang }: Props) {
  const currentLang = lang;
  const t = TEXT[currentLang] ?? TEXT.en;
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          companyName,
          vatNumber,
          newsletterOptIn,
          termsAccepted,
          lang: currentLang,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(getErrorMessage(currentLang, data?.error));
        return;
      }

      if (data?.verificationRequired) {
        router.push(`/${currentLang}/verify-email?status=sent`);
        return;
      }

      router.push(`/${currentLang}/login`);
    } catch {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader lang={currentLang} />

      <main
        dir={currentLang === "ar" ? "rtl" : "ltr"}
        className="min-h-screen bg-white"
      >
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                EquipRegistry
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                {t.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
                {t.subtitle}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-zinc-900">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-zinc-900">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-zinc-900">
                        {t.password}
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-900">
                        {t.company}
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-900">
                        {t.vat}
                      </label>
                      <input
                        type="text"
                        value={vatNumber}
                        onChange={(event) => setVatNumber(event.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <label className="flex items-start gap-3 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={newsletterOptIn}
                        onChange={(event) => setNewsletterOptIn(event.target.checked)}
                        className="mt-1 size-4 rounded border-zinc-300"
                      />
                      <span>{t.newsletter}</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-zinc-700">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                        className="mt-1 size-4 rounded border-zinc-300"
                        required
                      />
                      <span>{t.terms}</span>
                    </label>
                  </div>

                  {error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? t.submitting : t.submit}
                    </button>

                    <p className="text-sm text-zinc-600">
                      {t.loginPrompt}{" "}
                      <Link
                        href={`/${currentLang}/login`}
                        className="font-medium text-zinc-900 underline underline-offset-4"
                      >
                        {t.loginLink}
                      </Link>
                    </p>
                  </div>
                </form>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={currentLang} />
    </>
  );
}
