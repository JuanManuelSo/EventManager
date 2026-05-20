import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import { useDashboardStats, useEventsByUser } from "../hooks/useEvents";
import { useAuth } from "../store/AuthContext";
import EventCard from "../components/events/EventCard";
import EventCardSkeleton from "../components/events/EventCardSkeleton";
import StatCard from "../components/ui/StatCard";
import type { Event } from "../types";

import ModalCreateEvent from "../components/events/ModalCreateEvent";
import type { CreateEventOutput } from "../validations/validateCreateEvent";

type Filter = "all" | Event["Estado"];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "ACTIVO", label: "Activos" },
  { key: "FINALIZADO", label: "Finalizados" },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 1. Debug: Verificar si el ID del usuario está disponible y su tipo
  console.log(
    "[Dashboard] Auth User:",
    user
      ? `ID: ${user.id} (${typeof user.id}), Name: ${user.nombre}`
      : "Cargando usuario...",
  );

  const {
    data: events,
    isLoading: eventsLoading,
    isError,
  } = useEventsByUser(user?.id);

  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [viewGrid, setViewGrid] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  /* ── Derived list ── */
  const filtered = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];

    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      // Normalizamos el status por si el backend devuelve "ACTIVO" en lugar de "Activo"
      const matchFilter =
        filter === "all" || e.Estado?.toLowerCase() === filter.toLowerCase();
      const matchQuery =
        !q ||
        e.nombre.toLowerCase().includes(q) ||
        e.locacion.toLowerCase().includes(q) ||
        e.tipo.toLowerCase().includes(q) ||
        (e.salon ?? "").toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [events, query, filter]);

  /* ── Count badges per tab ── */
  const counts = useMemo<Partial<Record<Filter, number>>>(() => {
    if (!events)
      return {
        all: 0,
        Activo: 0,
        Finalizado: 0,
      };

    return {
      all: events.length,
      Activo: events.filter((e) => e.Estado?.toLowerCase() === "activo").length,
      Finalizado: events.filter((e) => e.Estado?.toLowerCase() === "finalizado")
        .length,
    };
  }, [events]);

  const handleCreateEvent = async (data: CreateEventOutput) => {
    try {
      console.log("Enviando al backend:", data);
      //Aqui iria la llamada a la api
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // });
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  const isSearching = !!query || filter !== "all";

  return (
    <div className="max-w-290 mx-auto px-6 py-8">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[22px] font-semibold text-slate-900 tracking-tight leading-tight">
            Gestión de Eventos
          </h1>
          <p className="text-[13px] text-slate-400 mt-1 leading-relaxed max-w-md">
            Panel centralizado para el control de acceso y logística de eventos
            corporativos y sociales de alto perfil.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5
                     bg-slate-900 text-white text-[13px] font-medium rounded-lg shrink-0
                     hover:bg-slate-800 active:bg-slate-950
                     transition-colors duration-150 focus:outline-none"
        >
          <Plus size={14} strokeWidth={2.5} />
          Crear evento
        </button>
        <ModalCreateEvent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleCreateEvent}
        />
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statsLoading ? (
          Array.from({ length: 3 }).map((_, i) => <StatSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Eventos totales" value={stats?.totalEvents ?? 0} />
            <StatCard
              label="Invitados gestionados"
              value={(stats?.totalGuests ?? 0).toLocaleString("es-AR")}
            />
            <StatCard
              label="Asistencia promedio"
              value={`${stats?.averageAttendance ?? 0}%`}
            />
          </>
        )}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar evento..."
            className="pl-8 pr-3 py-1.75 w-52 text-[13px] text-slate-900
                       bg-white border border-slate-200 rounded-lg
                       placeholder:text-slate-400
                       focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900
                       transition-colors duration-150"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            const count = counts[key];
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium",
                  "transition-all duration-150 focus:outline-none",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                {label}
                {count > 0 && (
                  <span
                    className={[
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
          <ViewBtn
            active={viewGrid}
            onClick={() => setViewGrid(true)}
            icon={<LayoutGrid size={13} />}
          />
          <ViewBtn
            active={!viewGrid}
            onClick={() => setViewGrid(false)}
            icon={<List size={13} />}
          />
        </div>
      </div>

      {/* ── Content ── */}
      {eventsLoading ? (
        <div className="grid grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={() => window.location.reload()} />
      ) : filtered.length === 0 ? (
        <EmptyState
          hasSearch={isSearching}
          onClear={() => {
            setQuery("");
            setFilter("all");
          }}
        />
      ) : (
        <div
          className={
            viewGrid ? "grid grid-cols-3 gap-5" : "flex flex-col gap-3"
          }
        >
          {filtered.map((event) => (
            <EventCard key={event.id_evento} event={event} />
          ))}

          {/* New event placeholder — only in default view */}
          {!isSearching && viewGrid && (
            <NewEventCard onClick={() => navigate("/events/new")} />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Micro-components ── */

function ViewBtn({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "p-1.5 rounded transition-colors duration-150 focus:outline-none",
        active
          ? "bg-slate-900 text-white"
          : "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
      ].join(" ")}
    >
      {icon}
    </button>
  );
}

function StatSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
      <div className="h-2.5 w-28 bg-slate-100 rounded animate-pulse mb-3" />
      <div className="h-8   w-16 bg-slate-100 rounded animate-pulse" />
    </div>
  );
}

function NewEventCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl border-2 border-dashed border-slate-200 min-h-70
                 flex flex-col items-center justify-center gap-3
                 text-slate-400
                 hover:border-slate-300 hover:bg-slate-50/60 hover:text-slate-500
                 transition-all duration-200 focus:outline-none group"
    >
      <div
        className="w-9 h-9 rounded-lg border border-dashed border-slate-300
                      flex items-center justify-center
                      group-hover:border-slate-400 transition-colors duration-200"
      >
        <Plus size={16} />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium">Nuevo evento</p>
        <p className="text-[11px] text-slate-300 mt-0.5">
          Hacé clic para comenzar
        </p>
      </div>
    </button>
  );
}

function EmptyState({
  hasSearch,
  onClear,
}: {
  hasSearch: boolean;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
        <Search size={20} className="text-slate-400" />
      </div>
      <p className="text-[14px] font-medium text-slate-700 mb-1">
        {hasSearch ? "Sin resultados" : "Todavía no tenés eventos"}
      </p>
      <p className="text-[13px] text-slate-400 mb-5 max-w-xs leading-relaxed">
        {hasSearch
          ? "Probá con otro término o quitá los filtros activos."
          : "Creá tu primer evento para empezar a gestionar invitados y check-ins."}
      </p>
      {hasSearch && (
        <button
          onClick={onClear}
          className="text-[13px] font-semibold text-slate-900 underline underline-offset-2 hover:text-slate-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-[14px] font-medium text-slate-700 mb-1">
        Error al cargar los eventos
      </p>
      <p className="text-[13px] text-slate-400 mb-5">
        Algo salió mal. Intentá nuevamente.
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-slate-900 text-white text-[13px] font-medium rounded-lg hover:bg-slate-800 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}
