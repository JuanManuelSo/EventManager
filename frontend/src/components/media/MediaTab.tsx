import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Film,
  Upload,
  Trash2,
  X,
  Image,
  Loader2,
  CheckCircle2,
  XCircle,
  Video,
  PlayCircle,
  Users,
  Table2,
} from "lucide-react";
import { mediaService } from "../../services/media.service";
import { guestsService } from "../../services/guests.service";
import { useToast } from "../ui/Toast";
import Button from "../ui/Button";
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

function DeleteVideoModal({
  isOpen,
  onClose,
  onConfirm,
  video,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  video: EventMedia | null;
  isLoading?: boolean;
}) {
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

/* ── Upload Video Modal ── */
function UploadVideoModal({
  eventId,
  onClose,
  onSuccess,
}: {
  eventId: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<
    "individual" | "con_acompanantes" | "general"
  >("general");
  const [mesa, setMesa] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    try {
      await mediaService.upload(
        eventId,
        file,
        nombre || file.name,
        tipo,
        mesa ? Number(mesa) : null,
      );
      toast.success("Video subido correctamente");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Error al subir video");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Subir video
            </h3>
            <p className="text-[11px] text-slate-400">
              MP4, WebM, MOV o AVI — máximo 200MB
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <XCircle size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* File picker */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Archivo de video
            </label>
            <div
              className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer"
              onClick={() =>
                document.getElementById("video-file-input")?.click()
              }
            >
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <Video size={16} className="text-blue-500" />
                  <p className="text-xs text-slate-700 font-medium">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </p>
                </div>
              ) : (
                <div>
                  <Upload size={20} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-slate-500">
                    Hacé clic para seleccionar o arrastrá un archivo
                  </p>
                </div>
              )}
              <input
                id="video-file-input"
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,video/x-matroska"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Nombre del video
            </label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Video Mesa 1 Individual"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Tipo
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="general">General</option>
              <option value="individual">Individual</option>
              <option value="con_acompanantes">Con acompañantes</option>
            </select>
          </div>

          {/* Mesa */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Mesa{" "}
              <span className="text-slate-400">
                (opcional — dejar vacío para cualquier mesa)
              </span>
            </label>
            <select
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="">— Todas las mesas —</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  Mesa {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload size={12} />
                Subir
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Bulk Assign Modal ── */
function BulkAssignModal({
  eventId,
  mediaList,
  onClose,
  onSuccess,
}: {
  eventId: number;
  mediaList: EventMedia[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const [selectedVideo, setSelectedVideo] = useState("");
  const [mesa, setMesa] = useState("");
  const [tipo, setTipo] = useState<"todos" | "individual" | "con_acompanantes">(
    "todos",
  );
  const [assigning, setAssigning] = useState(false);

  async function handleAssign() {
    if (!selectedVideo) return;
    setAssigning(true);
    try {
      const result = await guestsService.bulkAssignVideo(eventId, {
        videoUrl: selectedVideo,
        mesa: mesa || null,
        tipo,
      });
      toast.success(`Video asignado a ${result.updated} invitados`);
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Error al asignar videos");
    } finally {
      setAssigning(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Asignar video a invitados
            </h3>
            <p className="text-[11px] text-slate-400">
              Asigná un video a todos los invitados que coincidan con los
              filtros
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <XCircle size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Video selector */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Video
            </label>
            <select
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="">— Seleccionar video —</option>
              {mediaList.map((m) => (
                <option key={m.id} value={m.videoUrl}>
                  {m.nombre} {m.mesa ? `(Mesa ${m.mesa})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Mesa filter */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Mesa <span className="text-slate-400">(opcional)</span>
            </label>
            <select
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="">— Todas las mesas —</option>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  Mesa {n}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo filter */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              ¿A quiénes asignar?
            </label>
            <div className="flex gap-2">
              {[
                { key: "todos" as const, label: "Todos" },
                { key: "individual" as const, label: "Individuales" },
                { key: "con_acompanantes" as const, label: "Con acompañantes" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setTipo(key)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    tipo === key
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedVideo || assigning}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {assigning ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Asignando...
              </>
            ) : (
              <>
                <CheckCircle2 size={12} />
                Asignar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── QR Card Section ── */
function QrCardSection({ eventId }: { eventId: number }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [savingSlot, setSavingSlot] = useState(false);
  const [slotX, setSlotX] = useState("");
  const [slotY, setSlotY] = useState("");
  const [slotSize, setSlotSize] = useState("");

  const { data: qrCard } = useQuery({
    queryKey: ["qr-card", eventId],
    queryFn: () => mediaService.getQrCard(eventId),
    enabled: !!eventId,
  });

  const currentSlot = qrCard?.slot;
  const displayedSlotX =
    slotX || (currentSlot?.x != null ? String(currentSlot.x) : "");
  const displayedSlotY =
    slotY || (currentSlot?.y != null ? String(currentSlot.y) : "");
  const displayedSlotSize =
    slotSize || (currentSlot?.size != null ? String(currentSlot.size) : "");

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      await mediaService.uploadQrCard(eventId, file);
      queryClient.invalidateQueries({ queryKey: ["qr-card", eventId] });
      toast.success("Plantilla de invitación actualizada");
    } catch {
      toast.error("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveSlot() {
    const x = Number(displayedSlotX);
    const y = Number(displayedSlotY);
    const size = Number(displayedSlotSize);

    if (
      !Number.isInteger(x) ||
      !Number.isInteger(y) ||
      !Number.isInteger(size) ||
      size < 32
    ) {
      toast.error("Ingresá coordenadas válidas para el slot del QR");
      return;
    }

    setSavingSlot(true);
    try {
      await mediaService.updateQrCardSlot(eventId, { x, y, size });
      queryClient.invalidateQueries({ queryKey: ["qr-card", eventId] });
      setSlotX("");
      setSlotY("");
      setSlotSize("");
      toast.success("Slot del QR guardado");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Error al guardar el slot");
    } finally {
      setSavingSlot(false);
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_1px_3px_rgb(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Image size={16} className="text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-800">
              Plantilla de invitación (Tarjeta QR)
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Esta imagen se usará como base para generar las tarjetas QR de los
            invitados. Subí un diseño PNG, JPG, WebP o PDF.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        {qrCard?.url ? (
          <div className="relative group">
            <img
              src={qrCard.url}
              alt="Plantilla QR"
              className="w-28 h-28 object-cover rounded-lg border border-slate-200"
            />
            <button
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept =
                  "image/png,image/jpeg,image/webp,application/pdf";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleUpload(file);
                };
                input.click();
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
            >
              <Upload size={18} className="text-white" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/png,image/jpeg,image/webp,application/pdf";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) handleUpload(file);
              };
              input.click();
            }}
            className="w-28 h-28 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-blue-300 transition-colors cursor-pointer"
          >
            <Upload size={16} className="text-slate-300" />
            <p className="text-[10px] text-slate-400">Subir imagen</p>
          </div>
        )}

        <div className="text-[11px] text-slate-500 space-y-3">
          {qrCard?.url ? (
            <p className="text-emerald-600 font-medium">
              Plantilla cargada correctamente
            </p>
          ) : (
            <p>Aún no hay plantilla subida</p>
          )}
          {uploading && (
            <p className="text-blue-600 mt-1 flex items-center gap-1">
              <Loader2 size={10} className="animate-spin" />
              Subiendo...
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 max-w-xs">
            <label className="space-y-1">
              <span className="block text-[10px] font-medium text-slate-500">
                X
              </span>
              <input
                type="number"
                min="0"
                value={displayedSlotX}
                onChange={(e) => setSlotX(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="px"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[10px] font-medium text-slate-500">
                Y
              </span>
              <input
                type="number"
                min="0"
                value={displayedSlotY}
                onChange={(e) => setSlotY(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="px"
              />
            </label>
            <label className="space-y-1">
              <span className="block text-[10px] font-medium text-slate-500">
                Tamaño
              </span>
              <input
                type="number"
                min="32"
                value={displayedSlotSize}
                onChange={(e) => setSlotSize(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                placeholder="px"
              />
            </label>
          </div>

          <button
            onClick={handleSaveSlot}
            disabled={savingSlot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {savingSlot ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar slot QR"
            )}
          </button>
          <p className="max-w-md text-[10px] text-slate-400">
            X/Y son píxeles desde la esquina superior izquierda de la plantilla.
            Tamaño define el ancho y alto del QR.
          </p>
        </div>
      </div>
    </div>
  );
}
