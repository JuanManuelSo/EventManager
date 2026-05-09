import { useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const QUOTE =
  '"El check‑in que antes solía tomar 30 minutos ahora solo toma 3."';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    credentials?: string;
    password?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  /* Already authenticated → redirect immediately */
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!credentials.trim()) next.credentials = "Ingresá tu usuario o email.";
    if (!password.trim()) next.password = "Ingresá tu contraseña.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      /* authService accepts email or alias "admin" → see auth.service.ts */
      const emailOrAlias = credentials.trim().includes("@")
        ? credentials.trim()
        : `${credentials.trim()}@eventmanager.com`;

      await login(emailOrAlias, password);
      navigate("/", { replace: true });
    } catch {
      setErrors({ form: "Credenciales incorrectas. Intentá nuevamente." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <aside className="hidden lg:flex w-[42%] bg-[#0A0A0A] flex-col justify-between p-10 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 bg-white rounded flex items-center justify-center shrink-0">
            <LogoIcon />
          </span>
          <span className="text-white text-sm font-semibold tracking-tight">
            Event Manager
          </span>
        </div>

        {/* Quote */}
        <div>
          <blockquote className="text-white text-[1.65rem] font-semibold leading-snug tracking-tight mb-6">
            {QUOTE}
          </blockquote>
          <p className="text-neutral-500 text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
            Diseñado para eventos modernos
          </p>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 bg-white">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-10">
          <span className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center">
            <LogoIcon white />
          </span>
          <span className="text-slate-900 text-sm font-semibold tracking-tight">
            Event Manager
          </span>
        </div>

        <div className="w-full max-w-85">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-8">
            Iniciar Sesión
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Credentials field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Credenciales
              </label>
              <input
                type="text"
                autoComplete="username"
                placeholder="usuario o email"
                value={credentials}
                onChange={(e) => {
                  setCredentials(e.target.value);
                  if (errors.credentials)
                    setErrors((p) => ({ ...p, credentials: undefined }));
                }}
                className={[
                  "input-base",
                  errors.credentials ? "input-error" : "",
                ].join(" ")}
              />
              {errors.credentials && (
                <p className="text-xs text-red-500">{errors.credentials}</p>
              )}
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600">
                Contraseña
              </label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((p) => ({ ...p, password: undefined }));
                }}
                className={[
                  "input-base",
                  errors.password ? "input-error" : "",
                ].join(" ")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            {/* Global error */}
            {errors.form && (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2.5">
                <p className="text-xs text-red-600">{errors.form}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              loading={submitting}
              fullWidth
              size="lg"
              className="mt-1"
            >
              Empezar
            </Button>
          </form>

          {/* Dev hint — remove in production */}
          {import.meta.env.DEV && (
            <p className="mt-8 text-center text-2xs text-slate-300">
              admin · 123456
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

/* ── Minimal logo icon ── */
function LogoIcon({ white }: { white?: boolean }) {
  const fill = white ? "#ffffff" : "#0A0A0A";
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill={fill} />
      <rect
        x="7.5"
        y="1"
        width="4.5"
        height="4.5"
        rx="1"
        fill={fill}
        opacity=".45"
      />
      <rect
        x="1"
        y="7.5"
        width="4.5"
        height="4.5"
        rx="1"
        fill={fill}
        opacity=".45"
      />
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill={fill} />
    </svg>
  );
}
