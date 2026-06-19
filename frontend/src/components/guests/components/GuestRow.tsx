import { memo } from "react";
import { MoreVertical, Film } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { guestsService } from "../../../services/guests.service";
import { useToast } from "../../ui/Toast";
import { STATUS_CONFIG } from "../constants";
import type { Guest } from "../../../types";
import MenuItem from "./MenuItem";

interface GuestRowProps {
  guest: Guest;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  isMenuOpen: boolean;
  onToggleMenu: (id: number | null) => void;
  eventId: number;
  onAssignVideo: (guest: Guest) => void;
  onDelete: (guest: Guest) => void;
}

const GuestRow = memo(function GuestRow({
  guest,
  isSelected,
  onToggleSelect,
  isMenuOpen,
  onToggleMenu,
  eventId,
  onAssignVideo,
  onDelete,
}: GuestRowProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const s = STATUS_CONFIG[guest.status] ?? STATUS_CONFIG["Pendiente"];

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors duration-100">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(guest.id)}
          className="w-3.5 h-3.5 rounded border-slate-300 accent-slate-900 cursor-pointer"
        />
      </td>

      <td className="px-3 py-3 min-w-35">
        <p className="text-[13px] font-semibold text-slate-800">
          {guest.apellido}, {guest.nombre}
        </p>
        {guest.telefono && (
          <p className="text-[11px] text-slate-400 mt-0.5">
            {guest.telefono}
          </p>
        )}
      </td>

      <td className="px-3 py-3 text-xs text-slate-500 min-w-45">
        {guest.email ?? "—"}
      </td>

      <td className="px-3 py-3 text-xs text-slate-600">
        {guest.mesa ?? "—"}
      </td>

      <td className="px-3 py-3 text-xs text-slate-600">
        {guest.cant_acompanantes ?? 0}
      </td>

      <td className="px-3 py-3">
        {guest.video ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">
            <Film size={10} />
            Video
          </span>
        ) : (
          <span className="text-[11px] text-slate-300">—</span>
        )}
      </td>

      <td className="px-3 py-3">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.bg} ${s.text}`}
        >
          {s.icon}
          {s.label}
        </span>
      </td>

      <td className="px-3 py-3">
        {guest.checkedIn && guest.checkedInAt ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-white">
            {new Date(guest.checkedInAt).toLocaleTimeString(
              "es-AR",
              { hour: "2-digit", minute: "2-digit" },
            )}
          </span>
        ) : (
          <span className="text-xs text-slate-300">—</span>
        )}
      </td>

      <td className="px-3 py-3 text-right">
        <div className="relative inline-block">
          <button
            onClick={() => onToggleMenu(isMenuOpen ? null : guest.id)}
            className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-150 focus:outline-none cursor-pointer"
          >
            <MoreVertical size={15} />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => onToggleMenu(null)}
              />
              <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white border border-slate-200 rounded-lg shadow-[0_4px_16px_rgb(0,0,0,0.1)] py-1 overflow-hidden">
                <MenuItem label="Ver QR" onClick={() => {}} />
                <MenuItem
                  label="Editar invitado"
                  onClick={() => {}}
                />
                <MenuItem
                  label="Enviar invitación"
                  onClick={() => {}}
                />
                <MenuItem
                  label={guest.video ? "Quitar video" : "Asignar video"}
                  onClick={async () => {
                    onToggleMenu(null);
                    if (!guest.video) {
                      onAssignVideo(guest);
                      return;
                    }

                    try {
                      await guestsService.updateGuest(eventId, guest.id, {
                        video: null,
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["guests", eventId],
                      });
                      toast.success("Video eliminado");
                    } catch {
                      toast.error("Error al actualizar");
                    }
                  }}
                />
                <div className="my-1 border-t border-slate-100" />
                <MenuItem
                  label="Eliminar "
                  danger
                  onClick={() => {
                    onDelete(guest);
                    onToggleMenu(null);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
});

export default GuestRow;
