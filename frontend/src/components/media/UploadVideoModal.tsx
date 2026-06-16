import { useState } from "react";
import { XCircle, Video, Upload, Loader2 } from "lucide-react";
import { mediaService } from "../../services/media.service";
import { useToast } from "../ui/Toast";

interface UploadVideoModalProps {
  eventId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadVideoModal({
  eventId,
  onClose,
  onSuccess,
}: UploadVideoModalProps) {
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
