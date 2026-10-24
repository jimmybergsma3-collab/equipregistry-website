"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n/config";
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
    SERVER_ERROR: "Server error during login.",
  },
  es: {
    REQUIRED_FIELDS_MISSING: "Complete los campos obligatorios.",
    INVALID_CREDENTIALS: "Correo electronico o contrasena incorrectos.",
    EMAIL_NOT_VERIFIED: "Verifique su correo electronico antes de iniciar sesion.",
    SERVER_ERROR: "Error del servidor durante el inicio de sesion.",
  },
  de: {
    REQUIRED_FIELDS_MISSING: "Bitte fuellen Sie die Pflichtfelder aus.",
    INVALID_CREDENTIALS: "E-Mail-Adresse oder Passwort ist falsch.",
    EMAIL_NOT_VERIFIED: "Bestaetigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.",
    SERVER_ERROR: "Serverfehler waehrend der Anmeldung.",
  },
  fr: {
    REQUIRED_FIELDS_MISSING: "Veuillez remplir les champs obligatoires.",
    INVALID_CREDENTIALS: "Adresse e-mail ou mot de passe incorrect.",
    EMAIL_NOT_VERIFIED: "Verifiez votre adresse e-mail avant de vous connecter.",
    SERVER_ERROR: "Erreur du serveur pendant la connexion.",
  },
  it: {
    REQUIRED_FIELDS_MISSING: "Compili i campi obbligatori.",
    INVALID_CREDENTIALS: "E-mail o password non corretti.",
    EMAIL_NOT_VERIFIED: "Verifichi il suo indirizzo e-mail prima di accedere.",
    SERVER_ERROR: "Errore del server durante l'accesso.",
  },
  nl: {
    REQUIRED_FIELDS_MISSING: "Vul de verplichte velden in.",
    INVALID_CREDENTIALS: "Onjuist e-mailadres of wachtwoord.",
    EMAIL_NOT_VERIFIED: "Verifieer eerst je e-mailadres voordat je inlogt.",
    SERVER_ERROR: "Serverfout tijdens het inloggen.",
  },
  pt: {
    REQUIRED_FIELDS_MISSING: "Preencha os campos obrigatorios.",
    INVALID_CREDENTIALS: "E-mail ou palavra-passe incorretos.",
    EMAIL_NOT_VERIFIED: "Verifique o seu endereco de e-mail antes de iniciar sessao.",
    SERVER_ERROR: "Erro do servidor durante o inicio de sessao.",
  },
  ru: {
    REQUIRED_FIELDS_MISSING: "Zapolnite obyazatel'nye polya.",
    INVALID_CREDENTIALS: "Nevernyi adres elektronnoy pocty ili parol'.",
    EMAIL_NOT_VERIFIED: "Podtverdite adres elektronnoy pocty pered vhodom.",
    SERVER_ERROR: "Oshibka servera pri vhode.",
  },
  zh: {
    REQUIRED_FIELDS_MISSING: "请填写必填字段。",
    INVALID_CREDENTIALS: "电子邮箱或密码不正确。",
    EMAIL_NOT_VERIFIED: "登录前请先验证您的电子邮箱地址。",
    SERVER_ERROR: "登录时发生服务器错误。",
  },
  hi: {
    REQUIRED_FIELDS_MISSING: "कृपया आवश्यक फ़ील्ड भरें।",
    INVALID_CREDENTIALS: "ईमेल या पासवर्ड गलत है।",
    EMAIL_NOT_VERIFIED: "लॉग इन करने से पहले अपना ईमेल सत्यापित करें।",
    SERVER_ERROR: "लॉग इन के दौरान सर्वर त्रुटि हुई।",
  },
  ar: {
    REQUIRED_FIELDS_MISSING: "يرجى اكمال الحقول المطلوبة.",
    INVALID_CREDENTIALS: "البريد الالكتروني او كلمة المرور غير صحيحة.",
    EMAIL_NOT_VERIFIED: "يرجى تاكيد بريدك الالكتروني قبل تسجيل الدخول.",
    SERVER_ERROR: "حدث خطا في الخادم اثناء تسجيل الدخول.",
  },

  pl: {
    REQUIRED_FIELDS_MISSING: "Uzupelnij wymagane pola.",
    INVALID_CREDENTIALS: "Nieprawidlowy adres e-mail lub haslo.",
    EMAIL_NOT_VERIFIED: "Zweryfikuj swoj adres e-mail przed zalogowaniem.",
    SERVER_ERROR: "Blad serwera podczas logowania.",
  },
  sv: {
    REQUIRED_FIELDS_MISSING: "Fyll i de obligatoriska falten.",
    INVALID_CREDENTIALS: "Fel e-postadress eller losenord.",
    EMAIL_NOT_VERIFIED: "Verifiera din e-postadress innan du loggar in.",
    SERVER_ERROR: "Serverfel vid inloggning.",
  },
  da: {
    REQUIRED_FIELDS_MISSING: "Udfyld de obligatoriske felter.",
    INVALID_CREDENTIALS: "Forkert e-mail eller adgangskode.",
    EMAIL_NOT_VERIFIED: "Bekraeft din e-mailadresse, for du logger ind.",
    SERVER_ERROR: "Serverfejl under login.",
  },
  no: {
    REQUIRED_FIELDS_MISSING: "Fyll ut de obligatoriske feltene.",
    INVALID_CREDENTIALS: "Feil e-postadresse eller passord.",
    EMAIL_NOT_VERIFIED: "Verifiser e-postadressen din for du logger inn.",
    SERVER_ERROR: "Serverfeil under innlogging.",
  },};

type Props = {
  lang: Lang;
  next?: string;
  isOpen: boolean;
  onClose: () => void;
};

const TEXT: Record<
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
    cancel: string;
    forgotPassword: string;
    noAccount: string;
  }
> = {
  en: {
    title: "Login",
    subtitle: "Log in to continue.",
    email: "Email",
    emailPlaceholder: "name@company.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    login: "Login",
    loading: "Loading...",
    loginFailed: "Login failed.",
    serverError: "Server error during login.",
    cancel: "Cancel",
    forgotPassword: "Forgot password?",
    noAccount: "No account yet? Register here",
  },
  es: {
    title: "Iniciar sesión",
    subtitle: "Inicia sesión para continuar.",
    email: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    password: "Contraseña",
    passwordPlaceholder: "••••••••",
    login: "Entrar",
    loading: "Cargando...",
    loginFailed: "Error al iniciar sesión.",
    serverError: "Error del servidor durante el inicio de sesión.",
    cancel: "Cancelar",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿Aún no tienes cuenta? Regístrate aquí",
  },
  de: {
    title: "Anmelden",
    subtitle: "Melden Sie sich an, um fortzufahren.",
    email: "E-Mail",
    emailPlaceholder: "name@firma.com",
    password: "Passwort",
    passwordPlaceholder: "••••••••",
    login: "Anmelden",
    loading: "Lädt...",
    loginFailed: "Anmeldung fehlgeschlagen.",
    serverError: "Serverfehler während der Anmeldung.",
    cancel: "Abbrechen",
    forgotPassword: "Passwort vergessen?",
    noAccount: "Noch kein Konto? Hier registrieren",
  },
  fr: {
    title: "Connexion",
    subtitle: "Connectez-vous pour continuer.",
    email: "E-mail",
    emailPlaceholder: "nom@entreprise.com",
    password: "Mot de passe",
    passwordPlaceholder: "••••••••",
    login: "Connexion",
    loading: "Chargement...",
    loginFailed: "Échec de la connexion.",
    serverError: "Erreur serveur pendant la connexion.",
    cancel: "Annuler",
    forgotPassword: "Mot de passe oublié ?",
    noAccount: "Pas encore de compte ? Inscrivez-vous ici",
  },
  it: {
    title: "Accesso",
    subtitle: "Accedi per continuare.",
    email: "Email",
    emailPlaceholder: "nome@azienda.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    login: "Accedi",
    loading: "Caricamento...",
    loginFailed: "Accesso non riuscito.",
    serverError: "Errore del server durante l’accesso.",
    cancel: "Annulla",
    forgotPassword: "Password dimenticata?",
    noAccount: "Non hai ancora un account? Registrati qui",
  },
  nl: {
    title: "Inloggen",
    subtitle: "Log in om verder te gaan.",
    email: "E-mail",
    emailPlaceholder: "naam@bedrijf.com",
    password: "Wachtwoord",
    passwordPlaceholder: "••••••••",
    login: "Inloggen",
    loading: "Bezig...",
    loginFailed: "Inloggen mislukt.",
    serverError: "Serverfout tijdens inloggen.",
    cancel: "Annuleren",
    forgotPassword: "Wachtwoord vergeten?",
    noAccount: "Nog geen account? Registreer hier",
  },
  pt: {
    title: "Iniciar sessão",
    subtitle: "Inicie sessão para continuar.",
    email: "Email",
    emailPlaceholder: "nome@empresa.com",
    password: "Palavra-passe",
    passwordPlaceholder: "••••••••",
    login: "Entrar",
    loading: "A carregar...",
    loginFailed: "Falha no início de sessão.",
    serverError: "Erro do servidor durante o início de sessão.",
    cancel: "Cancelar",
    forgotPassword: "Esqueceu-se da palavra-passe?",
    noAccount: "Ainda não tem conta? Registe-se aqui",
  },

  // meegenomen voor later, nog niet activeren als je dat nog niet wilt
  ru: {
    title: "Вход",
    subtitle: "Войдите, чтобы продолжить.",
    email: "Электронная почта",
    emailPlaceholder: "name@company.com",
    password: "Пароль",
    passwordPlaceholder: "••••••••",
    login: "Войти",
    loading: "Загрузка...",
    loginFailed: "Ошибка входа.",
    serverError: "Ошибка сервера при входе.",
    cancel: "Отмена",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта? Зарегистрируйтесь",
  },
  zh: {
    title: "登录",
    subtitle: "登录以继续。",
    email: "电子邮件",
    emailPlaceholder: "name@company.com",
    password: "密码",
    passwordPlaceholder: "••••••••",
    login: "登录",
    loading: "加载中...",
    loginFailed: "登录失败。",
    serverError: "登录时发生服务器错误。",
    cancel: "取消",
    forgotPassword: "忘记密码？",
    noAccount: "还没有账户？立即注册",
  },
  hi: {
    title: "लॉगिन",
    subtitle: "जारी रखने के लिए लॉगिन करें।",
    email: "ईमेल",
    emailPlaceholder: "name@company.com",
    password: "पासवर्ड",
    passwordPlaceholder: "••••••••",
    login: "लॉगिन",
    loading: "लोड हो रहा है...",
    loginFailed: "लॉगин विफल।",
    serverError: "लॉगिन के दौरान सर्वर त्रुटि।",
    cancel: "रद्द करें",
    forgotPassword: "पासवर्ड भूल गए?",
    noAccount: "कोई खाता नहीं है? पंजीकरण करें",
  },
  ar: {
    title: "تسجيل الدخول",
    subtitle: "قم بتسجيل الدخول للمتابعة.",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@company.com",
    password: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    login: "تسجيل الدخول",
    loading: "جارٍ التحميل...",
    loginFailed: "فشل تسجيل الدخول.",
    serverError: "خطأ في الخادم أثناء تسجيل الدخول.",
    cancel: "إلغاء",
    forgotPassword: "هل نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟ سجل الآن",
  },

  pl: {
    title: "Zaloguj sie",
    subtitle: "Zaloguj sie, aby kontynuowac.",
    email: "E-mail",
    emailPlaceholder: "name@company.com",
    password: "Haslo",
    passwordPlaceholder: "••••••••",
    login: "Zaloguj sie",
    loading: "Ladowanie...",
    loginFailed: "Logowanie nie powiodlo sie.",
    serverError: "Blad serwera podczas logowania.",
    cancel: "Anuluj",
    forgotPassword: "Nie pamietasz hasla?",
    noAccount: "Nie masz jeszcze konta? Zarejestruj sie tutaj",
  },
  sv: {
    title: "Logga in",
    subtitle: "Logga in for att fortsatta.",
    email: "E-post",
    emailPlaceholder: "name@company.com",
    password: "Losenord",
    passwordPlaceholder: "••••••••",
    login: "Logga in",
    loading: "Laddar...",
    loginFailed: "Inloggningen misslyckades.",
    serverError: "Serverfel vid inloggning.",
    cancel: "Avbryt",
    forgotPassword: "Glomt losenordet?",
    noAccount: "Inget konto annu? Registrera dig har",
  },
  da: {
    title: "Log ind",
    subtitle: "Log ind for at fortsaette.",
    email: "E-mail",
    emailPlaceholder: "name@company.com",
    password: "Adgangskode",
    passwordPlaceholder: "••••••••",
    login: "Log ind",
    loading: "Indlaeser...",
    loginFailed: "Login mislykkedes.",
    serverError: "Serverfejl under login.",
    cancel: "Annuller",
    forgotPassword: "Glemt adgangskoden?",
    noAccount: "Ingen konto endnu? Registrer dig her",
  },
  no: {
    title: "Logg inn",
    subtitle: "Logg inn for a fortsette.",
    email: "E-post",
    emailPlaceholder: "name@company.com",
    password: "Passord",
    passwordPlaceholder: "••••••••",
    login: "Logg inn",
    loading: "Laster...",
    loginFailed: "Innlogging mislyktes.",
    serverError: "Serverfeil under innlogging.",
    cancel: "Avbryt",
    forgotPassword: "Glemt passordet?",
    noAccount: "Ingen konto enna? Registrer deg her",
  },};

export default function LoginModal({ lang, next, isOpen, onClose }: Props) {
  const router = useRouter();
  const t = repairMojibakeDeep(TEXT[lang] ?? TEXT.en);
  const forgotPasswordText = repairMojibakeDeep(getForgotPasswordText(lang));

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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
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

      const target =
        next && next.trim().length > 0
          ? next
          : typeof data?.redirectTo === "string" &&
            data.redirectTo.startsWith("/")
          ? `/${lang}${data.redirectTo}`
          : `/${lang}/dashboard`;

      onClose();
      router.refresh();
      router.push(target);
    } catch {
      setError(t.serverError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="fixed inset-0 z-[99999] grid place-items-center bg-black/55 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">{t.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900">
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-900">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              required
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <Link
              href={`/${lang}/forgot-password`}
              onClick={onClose}
              className="text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900"
            >
              {forgotPasswordText.linkLabel}
            </Link>

            <Link
              href={`/${lang}/register`}
              onClick={onClose}
              className="text-zinc-600 underline underline-offset-4 transition hover:text-zinc-900"
            >
              {t.noAccount}
            </Link>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t.loading : t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
