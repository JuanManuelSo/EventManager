import { X, Video } from "lucide-react";
import Button from "../ui/Button";
import type { EventMedia } from "../../types";
import { useScrollLock } from "../../hooks/MyHooks/useScrollLock";

interface DeleteVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  video: EventMedia | null;
  isLoading?: boolean;
}

export default function DeleteVideoModal({
  isOpen,
  onClose,
  onConfirm,
  video,
  isLoading,
}: DeleteVideoModalProps) {
  useScrollLock(isOpen);
  if (!isOpen || !video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Eliminar Video
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
            ¿Estás seguro de que deseas eliminar este video?
          </p>
          <p className="text-xs text-red-600 mt-1">
            Esta acción es permanente y borrará el video del evento:
          </p>
          <p className="text-[13px] text-slate-700 mt-2 font-bold">
            <Video size={16} className="inline mr-1" />
            {video.nombre}
          </p>
        </div>

        <div className="flex gap-3 mt-2">
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
            {isLoading ? "Eliminando..." : "Eliminar Video"}
          </Button>
        </div>
      </div>
    </div>
  );
}
