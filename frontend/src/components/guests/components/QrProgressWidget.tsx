import { Loader2 } from "lucide-react";

export default function QrProgressWidget({
  state,
  onClose,
  onRetry,
  onDownloadAgain,
}: {
  state: {
    status: "IDLE" | "PROCESSING" | "DONE" | "ERROR";
    processed: number;
    total: number;
    error?: string;
  };
  onClose: () => void;
  onRetry: () => void;
  onDownloadAgain: () => Promise<void>;
}) {
  const percent =
    state.total > 0 ? Math.round((state.processed / state.total) * 100) : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-84 rounded-xl border border-slate-200 bg-white shadow-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          Generación de QRs
        </p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xs"
        >
          Cerrar
        </button>
      </div>

      {state.status === "PROCESSING" && (
        <>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <Loader2 size={13} className="animate-spin" />
            Procesando {state.processed}/{state.total}
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {percent}% completado
          </p>
        </>
      )}

      {state.status === "DONE" && (
        <div className="mt-3">
          <p className="text-xs text-emerald-700 font-medium">
            Listo. ZIP generado correctamente.
          </p>
          <button
            onClick={() => void onDownloadAgain()}
            className="mt-2 px-3 py-1.5 text-xs rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            Descargar otra vez
          </button>
        </div>
      )}

      {state.status === "ERROR" && (
        <div className="mt-3">
          <p className="text-xs text-red-600 font-medium">
            {state.error || "Error generando QRs"}
          </p>
          <button
            onClick={onRetry}
            className="mt-2 px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}
