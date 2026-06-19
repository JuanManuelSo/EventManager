import { memo, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Film, X } from "lucide-react";
import type { EventMedia, Guest } from "../../types";
import { mediaService } from "../../services/media.service";
import { guestsService } from "../../services/guests.service";
import { useToast } from "../ui/Toast";
import Button from "../ui/Button";

interface AssignVideoModalProps {
  isOpen: boolean;
  eventId: number;
  guest: Guest;
  onClose: () => void;
  onSuccess: () => void;
}

const AssignVideoModal = memo(function AssignVideoModal({
  isOpen,
  eventId,
  guest,
  onClose,
  onSuccess,
}: AssignVideoModalProps) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(guest.video ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: mediaList = [] } = useQuery<EventMedia[]>({
    queryKey: ["media", eventId],
    queryFn: () => mediaService.getByEvent(eventId),
    enabled: isOpen && !!eventId,
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedVideoUrl(guest.video ?? "");
    }
  }, [guest.video, isOpen]);

  if (!isOpen) return null;

  async function handleAssign() {
    if (!selectedVideoUrl) return;

    setIsSubmitting(true);
    try {
      await guestsService.updateGuest(eventId, guest.id, {
        video: selectedVideoUrl,
      });
      await queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
      onSuccess();
    } catch {
      toast.error("Error al asignar video");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Asignar video
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Selecciona un video para {guest.apellido}, {guest.nombre}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-4">
          <p className="text-sm font-medium text-slate-700">Invitado</p>
          <p className="text-xs text-slate-500 mt-1">
            {guest.apellido}, {guest.nombre}
          </p>
          {guest.mesa && (
            <p className="text-xs text-slate-500 mt-1">Mesa {guest.mesa}</p>
          )}
          {guest.cant_acompanantes && (
            <p className="text-xs text-slate-500 mt-1">
              {guest.cant_acompanantes} acompañantes
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-slate-600 mb-1">
            Video disponible
          </label>
          <select
            value={selectedVideoUrl}
            onChange={(e) => setSelectedVideoUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-colors duration-150"
          >
            <option value="">- Seleccionar video -</option>
            {mediaList.map((media) => (
              <option key={media.id} value={media.videoUrl}>
                {media.nombre}
              </option>
            ))}
          </select>
          {selectedVideoUrl && (
            <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
              <Film size={10} />
              Este video se asignara al invitado
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
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
            onClick={handleAssign}
            loading={isSubmitting}
            disabled={!selectedVideoUrl}
            fullWidth
            size="lg"
            className="cursor-pointer"
          >
            {isSubmitting ? "Asignando..." : "Asignar video"}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default AssignVideoModal;
