import { memo } from "react";
import { useScrollLock } from "../../../hooks/MyHooks/useScrollLock";

interface ConfirmGuestQrModalProps {
  isOpen: boolean;
  guestName: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmGuestQrModal = memo(function ConfirmGuestQrModal({
  isOpen,
  guestName,
  isLoading,
  onClose,
  onConfirm,
}: ConfirmGuestQrModalProps) {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white border border-slate-200 shadow-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800">
          Confirmar generación de QR
        </h3>
        <p className="text-xs text-slate-500 mt-2">Se va a generar el QR para:</p>
        <p className="mt-2 text-sm font-semibold text-slate-800">{guestName}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {isLoading ? "Generando..." : "Generar"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ConfirmGuestQrModal;
