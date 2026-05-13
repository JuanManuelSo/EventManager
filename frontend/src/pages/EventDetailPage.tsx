import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Trash2,
  Info,
  UserCheck,
  QrCode,
  BarChart2,
} from "lucide-react";
import { useEvent } from "../hooks/useEvents";
import { formatDate } from "../lib/utils";

/* ── Tab definitions ── */
type Tab = "info" | "guests" | "scan" | "metrics";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "info", label: "Información", icon: <Info size={13} /> },
  { key: "guests", label: "Invitados", icon: <UserCheck size={13} /> },
  { key: "scan", label: "Escaneo QR", icon: <QrCode size={13} /> },
  { key: "metrics", label: "Métricas", icon: <BarChart2 size={13} /> },
];

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("info");
  const eventId = id ? Number(id) : NaN;

  const {
    data: event,
    isLoading,
    isError,
    error,
    status,
    fetchStatus,
  } = useEvent(eventId);

  console.group("[EventDetailPage] debug");
  console.log("id desde URL:", id);
  console.log("status:", status, "| fetchStatus:", fetchStatus);
  console.log("isLoading:", isLoading, "| isError:", isError);
  console.log("error:", error);
  console.log("event data:", event);
  console.groupEnd();

  /* ── Loading ── */
  if (isLoading) return <PageSkeleton />;

  /* ── Error ── */
  if (isError || !event) {
    console.error("Error loading event:", isError);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-[14px] font-medium text-slate-700">
          Evento no encontrado
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-[13px] text-slate-500 underline underline-offset-2"
        >
          Volver al dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-290 mx-auto px-6 py-6">
      {/* ── Back link ── */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-xs text-slate-500
                   hover:text-slate-800 mb-4 transition-colors duration-150 focus:outline-none cursor-pointer"
      >
        <ArrowLeft size={13} />
        Mis eventos
      </button>

      {/* ── Hero card ── */}
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs mb-1">
        {/* Cover image */}
        <div className="relative h-50 bg-slate-800 overflow-hidden">
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.nombre}
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
        </div>

        {/* Event meta bar */}
        <div className="bg-brand-dark px-6 py-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[9px] font-bold tracking-[0.14em] text-slate-500 uppercase">
              {event.tipo}
            </span>
            <h1 className="text-white text-xl font-semibold leading-snug tracking-tight mt-0.5 truncate">
              {event.nombre}
            </h1>
            <div className="flex items-center gap-4 mt-1.5 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin size={11} className="shrink-0" />
                <span className="text-xs">{event.salon ?? event.locacion}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={11} className="shrink-0" />
                <span className="text-[12px]">{formatDate(event.fecha)}</span>
              </div>
            </div>
          </div>

          {/* Guest count + Delete */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-lg px-4 py-2.5">
              <Users size={16} className=" text-blue-400" />
              <div className="text-right">
                <p className="text-white text-lg font-semibold leading-none">
                  {event.cant_invitados ?? "-"}
                </p>
                <p className="text-[9px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">
                  Invitados
                </p>
              </div>
            </div>

            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg
                         bg-white/4 border border-white/10 text-slate-500
                         hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400
                         transition-all duration-150 focus:outline-none"
              title="Eliminar evento"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex items-center border-b border-slate-200 mb-6 mt-5">
        {TABS.map(({ key, label, icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={[
                "flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium whitespace-nowrap",
                "border-b-2 -mb-px transition-all duration-150 focus:outline-none",
                active
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300",
              ].join(" ")}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      {tab === "info" && <InfoTab event={event} />}
      {tab === "guests" && <ComingSoon label="Invitados" />}
      {tab === "scan" && <ComingSoon label="Escaneo QR" />}
      {tab === "metrics" && <ComingSoon label="Métricas" />}
    </div>
  );
}

/* ════════════════════════════════════════════
   INFORMACIÓN TAB
════════════════════════════════════════════ */
function InfoTab({ event }: { event: import("../types").Event }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">
          Detalles Generales
        </h2>
        <button
          className="text-xs font-medium text-blue-600 hover:text-blue-700
                     transition-colors duration-150 underline cursor-pointer"
        >
          Editar Información
        </button>
      </div>

      {/* Fields grid */}
      <div className="px-6 py-5 grid grid-cols-2 gap-x-12 gap-y-5 ">
        <InfoField label="Nombre del evento" value={event.nombre} />
        <InfoField label="Tipo" value={event.tipo} />

        <InfoField label="Fecha y Hora" value={formatDate(event.fecha)} />
        <InfoField label="Salón" value={event.salon ?? "—"} />

        <InfoField label="Ubicación" value={event.locacion} fullWidth />

        <InfoField
          label="Invitados"
          value={`${event.cant_invitados?.toLocaleString("es-AR") ?? "-"} Personas`}
        />
      </div>
    </div>
  );
}

function InfoField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <p className="text-[11px] text-slate-400 mb-1">{label}</p>
      <p className="text-[13px] font-semibold text-slate-800">{value}</p>
    </div>
  );
}

/* ════════════════════════════════════════════
   PLACEHOLDER — otras tabs
════════════════════════════════════════════ */
function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center py-24 bg-white border border-slate-200 rounded-xl">
      <p className="text-[13px] text-slate-400">{label} — próximamente</p>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE SKELETON
════════════════════════════════════════════ */
function PageSkeleton() {
  return (
    <div className="max-w-220 mx-auto px-6 py-6">
      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse mb-4" />
      <div className="rounded-xl overflow-hidden border border-slate-200 mb-5">
        <div className="h-220 bg-slate-200 animate-pulse" />
        <div className="bg-slate-800 px-6 py-5 space-y-2">
          <div className="h-3 w-10 bg-slate-700 rounded animate-pulse" />
          <div className="h-6 w-64 bg-slate-700 rounded animate-pulse" />
          <div className="h-3 w-48 bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-10 bg-slate-100 rounded animate-pulse mb-6" />
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-6 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-2.5 w-20 bg-slate-100 rounded animate-pulse" />
              <div className="h-4   w-36 bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
