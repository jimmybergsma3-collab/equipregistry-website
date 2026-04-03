"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/lib/i18n/config";

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
};

export default function LoginModal({ lang, next, isOpen, onClose }: Props) {
  const router = useRouter();
  const t = TEXT[lang] ?? TEXT.en;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(data.error || t.loginFailed);
        return;
      }

      const target =
        next && next.trim().length > 0
          ? next
          : `/${lang}/dashboard/registrations`;

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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              margin: 0,
              color: "#18181b",
            }}
          >
            {t.title}
          </h2>
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "#52525b",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "14px" }}>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#18181b",
              }}
            >
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              style={{
                width: "100%",
                border: "1px solid #d4d4d8",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#18181b",
              }}
            >
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              required
              style={{
                width: "100%",
                border: "1px solid #d4d4d8",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "14px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              fontSize: "14px",
              marginTop: "-2px",
            }}
          >
            <Link
              href={`/${lang}/forgot-password`}
              onClick={onClose}
              style={{
                color: "#52525b",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {t.forgotPassword}
            </Link>

            <Link
              href={`/${lang}/register`}
              onClick={onClose}
              style={{
                color: "#52525b",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {t.noAccount}
            </Link>
          </div>

          {error && (
            <div
              style={{
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#b91c1c",
                borderRadius: "10px",
                padding: "12px 14px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", paddingTop: "6px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                border: "1px solid #d4d4d8",
                background: "#ffffff",
                color: "#27272a",
                borderRadius: "10px",
                padding: "12px 14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.cancel}
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                background: "#1d4ed8",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "12px 14px",
                fontWeight: 700,
                cursor: "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? t.loading : t.login}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}