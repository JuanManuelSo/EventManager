import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration: number;
  exiting: boolean;
}

interface ToastOptions {
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  success: (title: string, options?: ToastOptions) => string;
  error: (title: string, options?: ToastOptions) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    timersRef.current.delete(id);
  }, []);

  const dismissToast = useCallback(
    (id: string) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => removeToast(id), 200);
    },
    [removeToast],
  );

  const addToast = useCallback(
    (type: ToastType, title: string, options?: ToastOptions): string => {
      const id = `toast-${++counter}-${Date.now()}`;
      const toast: Toast = {
        id,
        type,
        title,
        description: options?.description,
        duration: options?.duration ?? (type === "success" ? 4000 : 6000),
        exiting: false,
      };

      setToasts((prev) => [...prev, toast]);

      const timer = setTimeout(() => dismissToast(id), toast.duration);
      timersRef.current.set(id, timer);

      return id;
    },
    [dismissToast],
  );

  const success = useCallback(
    (title: string, options?: ToastOptions) => addToast("success", title, options),
    [addToast],
  );

  const error = useCallback(
    (title: string, options?: ToastOptions) => addToast("error", title, options),
    [addToast],
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <ToastPortal toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/* ── Toast visual ── */

const ICONS = {
  success: CheckCircle,
  error: XCircle,
};

const ACCENT = {
  success: "border-l-emerald-500",
  error: "border-l-red-500",
};

const ICON_COLOR = {
  success: "text-emerald-500",
  error: "text-red-500",
};

function ToastPortal({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return createPortal(
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type];
        return (
          <div
            key={toast.id}
            role="alert"
            className={[
              "pointer-events-auto w-[360px] bg-white rounded-xl shadow-lg border border-brand-border/80",
              "border-l-4",
              ACCENT[toast.type],
              "px-4 py-3",
              "transition-all duration-200 ease-out",
              toast.exiting
                ? "opacity-0 translate-x-4 scale-95"
                : "opacity-100 translate-x-0 scale-100",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <Icon size={18} className={`shrink-0 mt-0.5 ${ICON_COLOR[toast.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-150 focus:outline-none"
                aria-label="Cerrar"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
