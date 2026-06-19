import { X } from "lucide-react";
import Button from "../ui/Button";
import { formatDate } from "../../lib/utils";
import type { Event } from "../../types";
import { useScrollLock } from "../../hooks/MyHooks/useScrollLock";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: Event;
  isLoading?: boolean;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  onConfirm,
  event,
  isLoading,
}: DeleteEventModalProps) {
  useScrollLock(isOpen);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm "
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Eliminar Evento
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-3 mb-3 p-4 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-sm text-red-800 font-medium">
            ¿Estás seguro de que deseas eliminar este evento?
          </p>
          <p className="text-xs text-red-600 mt-1">
            Esta acción es permanente y borrará toda la información de:
          </p>
          <p className="text-[13px] text-slate-700 mt-2 font-bold">
            {event.nombre} — {formatDate(event.fecha)}
          </p>
        </div>

        <div className="flex  gap-3 mt-2">
          <Button
            variant="secondary"
            onClick={onClose}
            fullWidth
            size="lg"
            className="cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
            fullWidth
            size="lg"
            className="cursor-pointer"
          >
            {isLoading ? "Eliminando..." : "Eliminar Evento"}
          </Button>
        </div>
      </div>
    </div>
  );
}
