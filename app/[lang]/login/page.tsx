"use client";

import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getForgotPasswordText } from "@/lib/i18n/forgot-password";
import { repairMojibakeDeep } from "@/lib/i18n/repair-mojibake";

const LOGIN_ERROR_TEXT: Record<
  Lang,
  Record<"REQUIRED_FIELDS_MISSING" | "INVALID_CREDENTIALS" | "EMAIL_NOT_VERIFIED" | "SERVER_ERROR", string>
> = {
  en: {
    REQUIRED_FIELDS_MISSING: "Complete the required fields.",
    INVALID_CREDENTIALS: "Incorrect email or password.",
    EMAIL_NOT_VERIFIED: "Verify your email address before logging in.",
    SERVER_ERROR: "Server error. Please try again.",
  },
  es: {
    REQUIRED_FIELDS_MISSING: "Complete los campos obligatorios.",
    INVALID_CREDENTIALS: "Correo electronico o contrasena incorrectos.",
    EMAIL_NOT_VERIFIED: "Verifique su correo electronico antes de iniciar sesion.",
    SERVER_ERROR: "Error del servidor. Intentalo de nuevo.",
  },
  de: {
    REQUIRED_FIELDS_MISSING: "Bitte fuellen Sie die Pflichtfelder aus.",
    INVALID_CREDENTIALS: "E-Mail-Adresse oder Passwort ist falsch.",
    EMAIL_NOT_VERIFIED: "Bestaetigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.",
    SERVER_ERROR: "Serverfehler. Bitte versuchen Sie es erneut.",
  },
  fr: {
    REQUIRED_FIELDS_MISSING: "Veuillez remplir les champs obligatoires.",
    INVALID_CREDENTIALS: "Adresse e-mail ou mot de passe incorrect.",
    EMAIL_NOT_VERIFIED: "Verifiez votre adresse e-mail avant de vous connecter.",
    SERVER_ERROR: "Erreur du serveur. Veuillez reessayer.",
  },
  it: {
    REQUIRED_FIELDS_MISSING: "Compili i campi obbligatori.",
    INVALID_CREDENTIALS: "E-mail o password non corretti.",
    EMAIL_NOT_VERIFIED: "Verifichi il suo indirizzo e-mail prima di accedere.",
    SERVER_ERROR: "Errore del server. Riprovi.",
  },
  nl: {
    REQUIRED_FIELDS_MISSING: "Vul de verplichte velden in.",
    INVALID_CREDENTIALS: "Onjuist e-mailadres of wachtwoord.",
    EMAIL_NOT_VERIFIED: "Verifieer eerst je e-mailadres voordat je inlogt.",
    SERVER_ERROR: "Serverfout. Probeer het opnieuw.",
  },
  pt: {
    REQUIRED_FIELDS_MISSING: "Preencha os campos obrigatorios.",
    INVALID_CREDENTIALS: "E-mail ou palavra-passe incorretos.",
    EMAIL_NOT_VERIFIED: "Verifique o seu endereco de e-mail antes de iniciar sessao.",
    SERVER_ERROR: "Erro do servidor. Tente novamente.",
  },
  ru: {
    REQUIRED_FIELDS_MISSING: "Zapolnite obyazatel'nye polya.",
    INVALID_CREDENTIALS: "Nevernyi adres elektronnoy pocty ili parol'.",
    EMAIL_NOT_VERIFIED: "Podtverdite adres elektronnoy pocty pered vhodom.",
    SERVER_ERROR: "Oshibka servera. Pozhaluysta, poprobuyte snova.",
  },
  zh: {
    REQUIRED_FIELDS_MISSING: "请填写必填字段。",
    INVALID_CREDENTIALS: "电子邮箱或密码不正确。",
    EMAIL_NOT_VERIFIED: "登录前请先验证您的电子邮箱地址。",
    SERVER_ERROR: "服务器错误。请重试。",
  },
  hi: {
    REQUIRED_FIELDS_MISSING: "कृपया आवश्यक फ़ील्ड भरें।",
    INVALID_CREDENTIALS: "ईमेल या पासवर्ड गलत है।",
    EMAIL_NOT_VERIFIED: "लॉग इन करने से पहले अपना ईमेल सत्यापित करें।",
    SERVER_ERROR: "सर्वर त्रुटि। कृपया फिर से प्रयास करें।",
  },
  ar: {
    REQUIRED_FIELDS_MISSING: "يرجى اكمال الحقول المطلوبة.",
    INVALID_CREDENTIALS: "البريد الالكتروني او كلمة المرور غير صحيحة.",
    EMAIL_NOT_VERIFIED: "يرجى تاكيد بريدك الالكتروني قبل تسجيل الدخول.",
    SERVER_ERROR: "حدث خطا في الخادم. يرجى المحاولة مرة اخرى.",
  },

  pl: {
    REQUIRED_FIELDS_MISSING: "Uzupelnij wymagane pola.",
    INVALID_CREDENTIALS: "Nieprawidlowy adres e-mail lub haslo.",
    EMAIL_NOT_VERIFIED: "Zweryfikuj swoj adres e-mail przed zalogowaniem.",
    SERVER_ERROR: "Blad serwera. Sprobuj ponownie.",
  },
  sv: {
    REQUIRED_FIELDS_MISSING: "Fyll i de obligatoriska falten.",
    INVALID_CREDENTIALS: "Fel e-postadress eller losenord.",
    EMAIL_NOT_VERIFIED: "Verifiera din e-postadress innan du loggar in.",
    SERVER_ERROR: "Serverfel. Forsok igen.",
  },
  da: {
    REQUIRED_FIELDS_MISSING: "Udfyld de obligatoriske felter.",
    INVALID_CREDENTIALS: "Forkert e-mail eller adgangskode.",
    EMAIL_NOT_VERIFIED: "Bekraeft din e-mailadresse, for du logger ind.",
    SERVER_ERROR: "Serverfejl. Prov igen.",
  },
  no: {
    REQUIRED_FIELDS_MISSING: "Fyll ut de obligatoriske feltene.",
    INVALID_CREDENTIALS: "Feil e-postadresse eller passord.",
    EMAIL_NOT_VERIFIED: "Verifiser e-postadressen din for du logger inn.",
    SERVER_ERROR: "Serverfeil. Prov igjen.",
  },};

const LOGIN_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    login: string;
    loading: string;
    loginFailed: string;
    serverError: string;
    setupDone: string;
    homepage: string;
  }
> = {
  en: {
    title: "Login",
    subtitle: "Access your EquipRegistry account",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    login: "Login",
    loading: "Loading...",
    loginFailed: "Login failed.",
    serverError: "Server error. Please try again.",
    setupDone: "Setup completed successfully.",
    homepage: "Back to homepage",
  },
  es: {
    title: "Iniciar sesión",
    subtitle: "Accede a tu cuenta de EquipRegistry",
    email: "Correo electrónico",
    emailPlaceholder: "Introduce tu correo electrónico",
    password: "Contraseña",
    passwordPlaceholder: "Introduce tu contraseña",
    login: "Iniciar sesión",
    loading: "Cargando...",
    loginFailed: "Inicio de sesión fallido.",
    serverError: "Error del servidor. Inténtalo de nuevo.",
    setupDone: "Configuración completada correctamente.",
    homepage: "Volver a la página de inicio",
  },
  de: {
    title: "Anmelden",
    subtitle: "Greife auf dein EquipRegistry-Konto zu",
    email: "E-Mail",
    emailPlaceholder: "Gib deine E-Mail ein",
    password: "Passwort",
    passwordPlaceholder: "Gib dein Passwort ein",
    login: "Anmelden",
    loading: "Wird geladen...",
    loginFailed: "Anmeldung fehlgeschlagen.",
    serverError: "Serverfehler. Bitte versuche es erneut.",
    setupDone: "Einrichtung erfolgreich abgeschlossen.",
    homepage: "Zurück zur Startseite",
  },
  fr: {
    title: "Connexion",
    subtitle: "Accédez à votre compte EquipRegistry",
    email: "E-mail",
    emailPlaceholder: "Entrez votre e-mail",
    password: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    login: "Se connecter",
    loading: "Chargement...",
    loginFailed: "Échec de la connexion.",
    serverError: "Erreur du serveur. Veuillez réessayer.",
    setupDone: "Configuration terminée avec succès.",
    homepage: "Retour à l’accueil",
  },
  it: {
    title: "Accedi",
    subtitle: "Accedi al tuo account EquipRegistry",
    email: "E-mail",
    emailPlaceholder: "Inserisci la tua e-mail",
    password: "Password",
    passwordPlaceholder: "Inserisci la tua password",
    login: "Accedi",
    loading: "Caricamento...",
    loginFailed: "Accesso non riuscito.",
    serverError: "Errore del server. Riprova.",
    setupDone: "Configurazione completata con successo.",
    homepage: "Torna alla homepage",
  },
  nl: {
    title: "Inloggen",
    subtitle: "Krijg toegang tot je EquipRegistry-account",
    email: "E-mail",
    emailPlaceholder: "Voer je e-mailadres in",
    password: "Wachtwoord",
    passwordPlaceholder: "Voer je wachtwoord in",
    login: "Inloggen",
    loading: "Laden...",
    loginFailed: "Inloggen mislukt.",
    serverError: "Serverfout. Probeer het opnieuw.",
    setupDone: "Installatie succesvol voltooid.",
    homepage: "Terug naar homepage",
  },
  pt: {
    title: "Iniciar sessão",
    subtitle: "Aceda à sua conta EquipRegistry",
    email: "E-mail",
    emailPlaceholder: "Introduza o seu e-mail",
    password: "Palavra-passe",
    passwordPlaceholder: "Introduza a sua palavra-passe",
    login: "Iniciar sessão",
    loading: "A carregar...",
    loginFailed: "Falha no início de sessão.",
    serverError: "Erro do servidor. Tente novamente.",
    setupDone: "Configuração concluída com sucesso.",
    homepage: "Voltar à página inicial",
  },
  ru: {
    title: "Войти",
    subtitle: "Войдите в свою учетную запись EquipRegistry",
    email: "Электронная почта",
    emailPlaceholder: "Введите адрес электронной почты",
    password: "Пароль",
    passwordPlaceholder: "Введите пароль",
    login: "Войти",
    loading: "Загрузка...",
    loginFailed: "Не удалось войти.",
    serverError: "Ошибка сервера. Пожалуйста, попробуйте еще раз.",
    setupDone: "Настройка успешно завершена.",
    homepage: "Вернуться на главную страницу",
  },
  zh: {
    title: "登录",
    subtitle: "访问您的 EquipRegistry 账户",
    email: "电子邮箱",
    emailPlaceholder: "请输入您的电子邮箱",
    password: "密码",
    passwordPlaceholder: "请输入您的密码",
    login: "登录",
    loading: "加载中...",
    loginFailed: "登录失败。",
    serverError: "服务器错误。请重试。",
    setupDone: "设置已成功完成。",
    homepage: "返回首页",
  },
  hi: {
    title: "लॉगिन",
    subtitle: "अपने EquipRegistry खाते तक पहुँचें",
    email: "ईमेल",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    password: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    login: "लॉगिन",
    loading: "लोड हो रहा है...",
    loginFailed: "लॉगिन विफल हुआ।",
    serverError: "सर्वर त्रुटि। कृपया फिर से प्रयास करें।",
    setupDone: "सेटअप सफलतापूर्वक पूरा हुआ।",
    homepage: "होमपेज पर वापस जाएँ",
  },
  ar: {
    title: "تسجيل الدخول",
    subtitle: "الوصول إلى حساب EquipRegistry الخاص بك",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور الخاصة بك",
    login: "تسجيل الدخول",
    loading: "جارٍ التحميل...",
    loginFailed: "فشل تسجيل الدخول.",
    serverError: "خطأ في الخادم. يرجى المحاولة مرة أخرى.",
    setupDone: "تم إكمال الإعداد بنجاح.",
    homepage: "العودة إلى الصفحة الرئيسية",
  },

  pl: {
    title: "Logowanie",
    subtitle: "Uzyskaj dostep do swojego konta EquipRegistry",
    email: "E-mail",
    emailPlaceholder: "Wpisz swoj adres e-mail",
    password: "Haslo",
    passwordPlaceholder: "Wpisz swoje haslo",
    login: "Zaloguj sie",
    loading: "Ladowanie...",
    loginFailed: "Logowanie nie powiodlo sie.",
    serverError: "Blad serwera. Sprobuj ponownie.",
    setupDone: "Konfiguracja zostala pomyslnie zakonczona.",
    homepage: "Powrot na strone glowna",
  },
  sv: {
    title: "Logga in",
    subtitle: "Fa tillgang till ditt EquipRegistry-konto",
    email: "E-post",
    emailPlaceholder: "Ange din e-postadress",
    password: "Losenord",
    passwordPlaceholder: "Ange ditt losenord",
    login: "Logga in",
    loading: "Laddar...",
    loginFailed: "Inloggningen misslyckades.",
    serverError: "Serverfel. Forsok igen.",
    setupDone: "Installationen slutfordes.",
    homepage: "Tillbaka till startsidan",
  },
  da: {
    title: "Log ind",
    subtitle: "Fa adgang til din EquipRegistry-konto",
    email: "E-mail",
    emailPlaceholder: "Indtast din e-mail",
    password: "Adgangskode",
    passwordPlaceholder: "Indtast din adgangskode",
    login: "Log ind",
    loading: "Indlaeser...",
    loginFailed: "Login mislykkedes.",
    serverError: "Serverfejl. Prov igen.",
    setupDone: "Opsaetning gennemfort.",
    homepage: "Tilbage til forsiden",
  },
  no: {
    title: "Logg inn",
    subtitle: "Fa tilgang til EquipRegistry-kontoen din",
    email: "E-post",
    emailPlaceholder: "Skriv inn e-postadressen din",
    password: "Passord",
    passwordPlaceholder: "Skriv inn passordet ditt",
    login: "Logg inn",
    loading: "Laster...",
    loginFailed: "Innlogging mislyktes.",
    serverError: "Serverfeil. Prov igjen.",
    setupDone: "Oppsettet ble fullfort.",
    homepage: "Tilbake til startsiden",
  },};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const lang = String(params.lang || "en") as Lang;
  const t = repairMojibakeDeep(LOGIN_TEXT[lang] ?? LOGIN_TEXT.en);
  const forgotPasswordText = getForgotPasswordText(lang);

  const rawNext = searchParams.get("next");
  const safeNext = rawNext && rawNext.startsWith("/") ? rawNext : null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getLoginErrorMessage(code?: string) {
    const messages = repairMojibakeDeep(
      LOGIN_ERROR_TEXT[lang] ?? LOGIN_ERROR_TEXT.en
    );

    if (code && code in messages) {
      return messages[code as keyof typeof messages];
    }

    return messages.SERVER_ERROR;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(getLoginErrorMessage(data?.error) || t.loginFailed);
        return;
      }

      const fallbackTarget =
        typeof data?.redirectTo === "string" && data.redirectTo.startsWith("/")
          ? `/${lang}${data.redirectTo}`
          : `/${lang}/dashboard`;

      router.push(safeNext ?? fallbackTarget);
      router.refresh();
    } catch {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader lang={lang} />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-md px-6 py-20">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-3">{t.title}</h1>
              <p className="text-slate-600">{t.subtitle}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">{t.email}</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">{t.password}</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  required
                />
              </div>

              <div className="flex justify-end text-sm">
                <Link
                  href={`/${lang}/forgot-password`}
                  className="text-slate-600 underline hover:text-blue-700"
                >
                  {forgotPasswordText.linkLabel}
                </Link>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {loading ? t.loading : t.login}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <Link href={`/${lang}`} className="underline hover:text-blue-700">
                {t.homepage}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
