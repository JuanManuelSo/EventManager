import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { guestsService } from "../../services/guests.service";
import { useToast } from "../ui/Toast";
import type { EventMedia } from "../../types";

interface BulkAssignModalProps {
  eventId: number;
  mediaList: EventMedia[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function BulkAssignModal({
  eventId,
  mediaList,
  onClose,
  onSuccess,
}: BulkAssignModalProps) {
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
