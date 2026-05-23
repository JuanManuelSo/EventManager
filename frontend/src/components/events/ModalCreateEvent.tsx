import { EventForm } from "../events/EventForm";
import type { CreateEventOutput } from "../../validations/validateCreateEvent";
import { X } from "lucide-react";
import Button from "../ui/Button";

interface ModalCreateEventProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CreateEventOutput) => Promise<void>;
  isLoading?: boolean;
}

export default function ModalCreateEvent({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ModalCreateEventProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Crear Nuevo Evento
            </h2>
            <p className="text-xs text-slate-500">
              {" "}
              Complete el formulario para crear un nuevo evento
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <EventForm onSubmit={onConfirm} isSubmittingExternal={isLoading} />

        <Button
          variant="secondary"
          onClick={onClose}
          fullWidth
          size="lg"
          className="mt-4 "
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
