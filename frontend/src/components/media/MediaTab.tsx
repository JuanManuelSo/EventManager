import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Film,
  Upload,
  Trash2,
  Video,
  PlayCircle,
  Table2,
  Users,
} from "lucide-react";
import { mediaService } from "../../services/media.service";
import { useToast } from "../ui/Toast";
import DeleteVideoModal from "./DeleteVideoModal";
import UploadVideoModal from "./UploadVideoModal";
import BulkAssignModal from "./BulkAssignModal";
import QrCardSection from "./QrCardSection";
import type { EventMedia } from "../../types";

export default function MediaTab({ eventId }: { eventId: number }) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<EventMedia | null>(null);

  const { data: mediaList = [], isLoading } = useQuery<EventMedia[]>({
    queryKey: ["media", eventId],
    queryFn: () => mediaService.getByEvent(eventId),
    enabled: !!eventId,
  });

  const deleteMutation = useMutation({
    mutationFn: (mediaId: number) => mediaService.delete(eventId, mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", eventId] });
      setVideoToDelete(null);
      toast.success("Video eliminado");
    },
    onError: () => toast.error("Error al eliminar video"),
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Videos del evento
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Subí y gestioná los videos para las mesas
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAssignOpen(true)}
            disabled={mediaList.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Users size={13} />
            Asignar a invitados
          </button>
          <button
            onClick={() => setUploadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            <Upload size={13} />
            Subir video
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadOpen && (
        <UploadVideoModal
          eventId={eventId}
          onClose={() => setUploadOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["media", eventId] });
            setUploadOpen(false);
          }}
        />
      )}

      {/* Assign Modal */}
      {assignOpen && (
        <BulkAssignModal
          eventId={eventId}
          mediaList={mediaList}
          onClose={() => setAssignOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
            setAssignOpen(false);
            toast.success("Videos asignados correctamente");
          }}
        />
      )}

      {/* Delete Modal */}
      <DeleteVideoModal
        isOpen={!!videoToDelete}
        onClose={() => setVideoToDelete(null)}
        onConfirm={() => {
          if (videoToDelete) deleteMutation.mutate(videoToDelete.id);
        }}
        video={videoToDelete}
        isLoading={deleteMutation.isPending}
      />

      {/* Video List */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-3"
            >
              <div className="h-12 w-20 shrink-0 bg-slate-100 rounded-lg animate-pulse" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3 w-36 bg-slate-100 rounded animate-pulse" />
                <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : mediaList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
            <Film size={22} className="text-slate-400" />
          </div>
          <p className="text-[13px] font-medium text-slate-600">
            No hay videos subidos
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Subí videos para asignarlos a las mesas del evento
          </p>
          <button
            onClick={() => setUploadOpen(true)}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            <Upload size={13} />
            Subir video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {mediaList.map((media) => (
            <div
              key={media.id}
              className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-3 shadow-[0_1px_3px_rgb(0,0,0,0.03)] hover:border-slate-300 transition-colors"
            >
              <div className="relative h-14 w-24 shrink-0 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                <video
                  src={media.videoUrl}
                  className="w-full h-full object-cover opacity-70"
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Video size={14} className="text-white" />
                  </div>
                </div>
                {media.duracion && (
                  <span className="absolute bottom-1 right-1 text-[9px] font-medium text-white bg-black/60 px-1 py-0.5 rounded">
                    {Math.floor(media.duracion / 60)}:
                    {String(media.duracion % 60).padStart(2, "0")}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-slate-800 truncate">
                  {media.nombre}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {media.tipo === "individual"
                      ? "Individual"
                      : media.tipo === "con_acompanantes"
                        ? "Con acompañantes"
                        : "General"}
                  </span>
                  {media.mesa && (
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Table2 size={10} />
                      Mesa {media.mesa}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400">
                    {media.formato?.toUpperCase() ?? "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={media.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Reproducir video"
                >
                  <PlayCircle size={15} />
                </a>
                <button
                  onClick={() => setVideoToDelete(media)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Eliminar video"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* QR Card Section */}
      <QrCardSection eventId={eventId} />
    </div>
  );
}







