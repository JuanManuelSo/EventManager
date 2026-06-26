import { X } from "lucide-react";
import type { Guest } from "../../types";

export default function ManualCheckinConfirmModal({
  guest,
  isLoading,
  onClose,
  onConfirm,
}: {
  guest: Guest | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!guest) return null;

  const hasVideo = !!guest.video;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Confirmar check-in manual
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verificá los datos antes de registrar el ingreso.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-lg font-semibold text-slate-900">
            {guest.nombre} {guest.apellido}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-[11px] font-semibold text-slate-700 border border-slate-200">
              <span className="text-slate-400 font-medium">Mesa</span>
              {guest.mesa ?? "—"}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-violet-50 text-[11px] font-semibold text-violet-700 border border-violet-100">
              <span className="text-violet-400 font-medium">+</span>
              {guest.cant_acompanantes ?? 0} acompañante
              {(guest.cant_acompanantes ?? 0) !== 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-[11px] font-semibold text-slate-700 border border-slate-200">
              <span className="text-slate-400 font-medium">DNI</span>
              {guest.documento || "—"}
            </span>
          </div>
          <div className="mt-3 space-y-1.5 text-xs text-slate-500">
            {(guest.email || guest.telefono || guest.numero) && (
              <p>{guest.email ?? guest.telefono ?? guest.numero}</p>
            )}
            <p>
              Estado actual:{" "}
              <span className="font-semibold text-slate-700">
                {guest.checkedIn ? "Ya registrado" : "Pendiente de ingreso"}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {hasVideo ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
              <p className="text-xs font-medium text-emerald-800">
                Este invitado tiene video asignado.
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Al confirmar el check-in, el video se enviará automáticamente al
                display.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] text-slate-500">
                Este invitado no tiene video asignado.
              </p>
            </div>
          )}

          {guest.checkedIn && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-[11px] text-amber-700">
                El invitado ya tiene check-in registrado. Si continuás, el
                sistema lo marcará como duplicado.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-sm font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Registrando..." : "Confirmar check-in"}
          </button>
        </div>
      </div>
    </div>
  );
}
