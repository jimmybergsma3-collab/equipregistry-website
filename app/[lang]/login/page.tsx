"use client";

import { useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import type { Lang } from "@/lib/i18n/config";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
    subtitle: "Log in to register assets and access your dashboard.",
    email: "Email",
    emailPlaceholder: "name@company.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    login: "Login",
    loading: "Loading...",
    loginFailed: "Login failed.",
    serverError: "Server error during login.",
    setupDone: "Temporary setup completed? Go back to",
    homepage: "homepage",
  },
  es: {
    title: "Iniciar sesión",
    subtitle: "Inicia sesión para registrar activos y abrir tu panel.",
    email: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    password: "Contraseña",
    passwordPlaceholder: "••••••••",
    login: "Entrar",
    loading: "Cargando...",
    loginFailed: "Error al iniciar sesión.",
    serverError: "Error del servidor durante el inicio de sesión.",
    setupDone: "¿Configuración temporal completada? Volver a la",
    homepage: "página principal",
  },
  de: {
    title: "Anmelden",
    subtitle: "Melden Sie sich an, um Assets zu registrieren und Ihr Dashboard zu öffnen.",
    email: "E-Mail",
    emailPlaceholder: "name@firma.com",
    password: "Passwort",
    passwordPlaceholder: "••••••••",
    login: "Anmelden",
    loading: "Lädt...",
    loginFailed: "Anmeldung fehlgeschlagen.",
    serverError: "Serverfehler während der Anmeldung.",
    setupDone: "Temporäre Einrichtung abgeschlossen? Zurück zur",
    homepage: "Startseite",
  },
  fr: {
    title: "Connexion",
    subtitle: "Connectez-vous pour enregistrer des actifs et accéder à votre tableau de bord.",
    email: "E-mail",
    emailPlaceholder: "nom@entreprise.com",
    password: "Mot de passe",
    passwordPlaceholder: "••••••••",
    login: "Connexion",
    loading: "Chargement...",
    loginFailed: "Échec de la connexion.",
    serverError: "Erreur serveur pendant la connexion.",
    setupDone: "Configuration temporaire terminée ? Retour à la",
    homepage: "page d’accueil",
  },
  it: {
    title: "Accesso",
    subtitle: "Accedi per registrare asset e aprire la tua dashboard.",
    email: "Email",
    emailPlaceholder: "nome@azienda.com",
    password: "Password",
    passwordPlaceholder: "••••••••",
    login: "Accedi",
    loading: "Caricamento...",
    loginFailed: "Accesso non riuscito.",
    serverError: "Errore del server durante l’accesso.",
    setupDone: "Configurazione temporanea completata? Torna alla",
    homepage: "homepage",
  },
  nl: {
    title: "Inloggen",
    subtitle: "Log in om assets te registreren en je dashboard te openen.",
    email: "E-mail",
    emailPlaceholder: "naam@bedrijf.com",
    password: "Wachtwoord",
    passwordPlaceholder: "••••••••",
    login: "Inloggen",
    loading: "Bezig...",
    loginFailed: "Inloggen mislukt.",
    serverError: "Serverfout tijdens inloggen.",
    setupDone: "Tijdelijke setup gedaan? Ga terug naar de",
    homepage: "homepage",
  },
  pt: {
    title: "Iniciar sessão",
    subtitle: "Inicie sessão para registar ativos e abrir o seu painel.",
    email: "Email",
    emailPlaceholder: "nome@empresa.com",
    password: "Palavra-passe",
    passwordPlaceholder: "••••••••",
    login: "Entrar",
    loading: "A carregar...",
    loginFailed: "Falha no início de sessão.",
    serverError: "Erro do servidor durante o início de sessão.",
    setupDone: "Configuração temporária concluída? Voltar à",
    homepage: "página inicial",
  },
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const lang = String(params.lang || "en") as Lang;
  const t = LOGIN_TEXT[lang] ?? LOGIN_TEXT.en;

  const rawNext = searchParams.get("next");
  const safeNext =
    rawNext && rawNext.startsWith("/") ? rawNext : `/${lang}/dashboard`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setError(data.error || t.loginFailed);
        return;
      }

      router.push(safeNext);
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

      <main className="min-h-screen bg-zinc-50">
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
              {t.setupDone}{" "}
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