import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Image, Upload, Loader2 } from "lucide-react";
import { mediaService } from "../../services/media.service";
import { useToast } from "../ui/Toast";

interface QrCardSectionProps {
  eventId: number;
}

export default function QrCardSection({ eventId }: QrCardSectionProps) {
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
