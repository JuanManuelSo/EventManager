import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, ChevronRight } from "lucide-react";
import type { Event } from "../../types";
import { formatDate, percentage } from "../../lib/utils";

const STATUS_MAP: Record<
  Event["Estado"],
  { label: string; dot: string; text: string; bg: string }
> = {
  ACTIVO: {
    label: "Activo",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  FINALIZADO: {
    label: "Finalizado",
    dot: "bg-slate-500",
    text: "text-slate-400",
    bg: "bg-slate-500/10",
  },
};

export default function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();
  const s = STATUS_MAP[event.Estado] || STATUS_MAP["FINALIZADO"];
  const pct = percentage(event.checkedInCount, event.cant_invitados ?? 0);

  return (
    <article
      onClick={() => navigate(`/events/${event.id_evento}`)}
      className="group cursor-pointer rounded-xl overflow-hidden bg-brand-dark
                 border border-white/5
                 shadow-[0_1px_4px_rgb(0,0,0,0.14)]
                 hover:shadow-[0_8px_28px_rgb(0,0,0,0.22)]
                 hover:-translate-y-0.5
                 transition-all duration-200 ease-out"
    >
      {/* Cover */}
      <div className="relative h-37 overflow-hidden bg-slate-800">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt={event.nombre}
            className="w-full h-full object-cover opacity-50
                       group-hover:opacity-60 group-hover:scale-[1.03]
                       transition-all duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/20 to-transparent" />

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.25 rounded-full ${s.bg} backdrop-blur-sm`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot} ${event.Estado === "ACTIVO" ? "animate-pulse" : ""}`}
          />
          <span className={`text-[10px] font-semibold leading-none ${s.text}`}>
            {s.label}
          </span>
        </div>

        {/* Type badge - bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold tracking-[0.13em] text-white/50 uppercase">
            {event.tipo}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4">
        <h3 className="text-white font-semibold text-[13.5px] leading-snug mb-3 truncate">
          {event.nombre}
        </h3>

        <div className="space-y-1.5 mb-3.5">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin size={10} className="shrink-0" />
            <span className="text-[11px] truncate">
              {event.salon ?? event.locacion}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar size={10} className="shrink-0" />
            <span className="text-[11px]">{formatDate(event.fecha)}</span>
          </div>
        </div>

        {/* Check-in progress bar */}
        {event.Estado === "ACTIVO" && event.checkedInCount > 0 && (
          <div className="mb-3.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] text-slate-600 uppercase tracking-wider font-semibold">
                Check-in
              </span>
              <span className="text-[10px] font-bold text-emerald-400">
                {pct}%
              </span>
            </div>
            <div className="h-0.5 bg-white/6 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/6 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users size={11} className="text-blue-400" />
            <span className="text-[11px]">
              {event.cant_invitados?.toLocaleString("es-AR")} invitados
            </span>
          </div>
          <ChevronRight
            size={14}
            className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-150"
          />
        </div>
      </div>
    </article>
  );
}
