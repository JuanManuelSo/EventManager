import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Trash2,
  Flag,
  Info,
  UserCheck,
  QrCode,
  BarChart2,
  Film,
} from "lucide-react";
import {
  useEvent,
  useDeleteEvent,
  useFinalizeEvent,
  useUpdateEvent,
} from "../hooks/useEvents";
import { useToast } from "../components/ui/Toast";
import { formatDate, formatDateTime } from "../lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createEventSchema,
  type CreateEventInput,
} from "../validations/validateCreateEvent";
import { EditableField } from "../components/ui/EditableField";
import GuestsTab from "../components/guests/GuestsTab";
import ScanTab from "../components/scan/ScanTab";
import MediaTab from "../components/media/MediaTab";
import DeleteEventModal from "../components/events/DeleteEventModal";
import FinalizeEventModal from "../components/events/FinalizeEventModal";

/* ── Tab definitions ── */
type Tab = "info" | "guests" | "scan" | "media" | "metrics";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "info", label: "Información", icon: <Info size={13} /> },
  { key: "guests", label: "Invitados", icon: <UserCheck size={13} /> },
  { key: "scan", label: "Escaneo QR", icon: <QrCode size={13} /> },
  { key: "media", label: "Multimedia", icon: <Film size={13} /> },
  { key: "metrics", label: "Métricas", icon: <BarChart2 size={13} /> },
];

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState<Tab>("info");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);

  const deleteEventMutation = useDeleteEvent();
  const finalizeEventMutation = useFinalizeEvent();

  const handleDeleteConfirm = () => {
    deleteEventMutation.mutate(eventId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        toast.success("Evento eliminado", {
          description: "El evento se eliminó permanentemente.",
        });
        navigate("/");
      },
      onError: () => {
        toast.error("Error al eliminar", {
          description: "No se pudo eliminar el evento. Intentá nuevamente.",
        });
      },
    });
  };

  const handleFinalizeConfirm = () => {
    finalizeEventMutation.mutate(eventId, {
      onSuccess: () => {
        setIsFinalizeModalOpen(false);
        toast.success("Evento finalizado", {
          description: "Los invitados pendientes fueron marcados como ausentes.",
        });
      },
      onError: (error: any) => {
        toast.error("No se pudo finalizar el evento", {
          description:
            error?.response?.data?.message ??
            "Intentá nuevamente en unos instantes.",
        });
      },
    });
  };

  const eventId = id ? Number(id) : NaN;

  const { data: event, isLoading, isError } = useEvent(eventId);

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
    <div key={eventId} className="max-w-290 mx-auto px-6 py-6">
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
                <span className="text-xs">{formatDate(event.fecha)}</span>
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

            {event.Estado === "ACTIVO" && (
              <button
                onClick={() => setIsFinalizeModalOpen(true)}
                className="h-9 inline-flex items-center gap-2 px-3 rounded-lg
                           bg-white/4 border border-white/10 text-amber-300
                           hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-200
                           transition-all duration-150 focus:outline-none cursor-pointer"
                title="Finalizar evento"
              >
                <Flag size={14} />
                <span className="text-xs font-medium">Finalizar</span>
              </button>
            )}

            <button
              onClick={() => setIsDeleteModalOpen(true)}
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
                "border-b-2 -mb-px transition-all duration-150 focus:outline-none cursor-pointer",
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
      {tab === "guests" && <GuestsTab eventId={event.id_evento} />}
      {tab === "scan" && <ScanTab eventId={event.id_evento} />}
      {tab === "media" && <MediaTab eventId={event.id_evento} />}
      {tab === "metrics" && <ComingSoon label="Métricas" />}

      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        event={event}
        isLoading={deleteEventMutation.isPending}
      />
      <FinalizeEventModal
        isOpen={isFinalizeModalOpen}
        onClose={() => {
          if (finalizeEventMutation.isPending) return;
          setIsFinalizeModalOpen(false);
        }}
        onConfirm={handleFinalizeConfirm}
        event={event}
        isLoading={finalizeEventMutation.isPending}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   INFORMACIÓN TAB
════════════════════════════════════════════ */
function InfoTab({ event }: { event: import("../types").Event }) {
  const [isEditing, setIsEditing] = useState(false);
  const updateEvent = useUpdateEvent();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    // Usamos 'values' en lugar de 'defaultValues' para que el formulario
    // se actualice automáticamente cuando los datos del evento terminen de cargar.
    values: {
      nombre: event.nombre,
      tipo: event.tipo,
      fecha: event.fecha, // Asegúrate de que venga en formato compatible con datetime-local
      salon: event.salon ?? "",
      locacion: event.locacion,
      cant_invitados: event.cant_invitados,
    },
  });

  const onSubmit = async (data: CreateEventInput) => {
    try {
      await updateEvent.mutateAsync({
        id: event.id_evento,
        data: {
          nombre: data.nombre,
          tipo: data.tipo,
          fecha: data.fecha,
          salon: data.salon,
          locacion: data.locacion,
          cant_invitados: data.cant_invitados,
        },
      });
      toast.success("Evento actualizado", {
        description: "El evento se actualizó correctamente.",
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al actualizar", {
        description: "No se pudo actualizar el evento. Intentá nuevamente.",
      });
    }
  };

  const handleCancel = () => {
    reset(); // Revierte los cambios a los defaultValues originales
    setIsEditing(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">
            Detalles Generales
          </h2>
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 underline cursor-pointer"
              >
                Editar Información
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!isDirty}
                  className="text-xs font-bold  text-blue-500  cursor-pointer disabled:opacity-90 hover:text-blue-700 hover:underline transitions-all duration-150"
                >
                  Guardar Cambios
                </button>
              </>
            )}
          </div>
        </div>

        {/* Fields grid */}

        <div className="px-6 py-5 grid grid-cols-2 gap-x-12 gap-y-5 ">
          <EditableField
            label="Nombre del evento"
            isEditing={isEditing}
            register={register("nombre")}
            value={event.nombre}
            error={errors.nombre?.message}
          />
          <EditableField
            label="Tipo"
            isEditing={isEditing}
            register={register("tipo")}
            value={event.tipo}
            error={errors.tipo?.message}
          />
          <EditableField
            label="Fecha y Hora"
            isEditing={isEditing}
            register={register("fecha")}
            type="datetime-local"
            value={formatDateTime(event.fecha)}
            error={errors.fecha?.message}
          />
          <EditableField
            label="Salón"
            isEditing={isEditing}
            register={register("salon")}
            value={event.salon ?? "—"}
            error={errors.salon?.message}
          />
          <EditableField
            label="Ubicación"
            isEditing={isEditing}
            register={register("locacion")}
            value={event.locacion}
            fullWidth
            error={errors.locacion?.message}
          />
          <EditableField
            label="Invitados"
            isEditing={isEditing}
            register={register("cant_invitados", { valueAsNumber: true })}
            type="number"
            value={`${event.cant_invitados?.toLocaleString("es-AR") ?? "-"} Personas`}
            error={errors.cant_invitados?.message}
          />
        </div>
      </form>
    </div>
  );
}

// function InfoField({
//   label,
//   value,
//   fullWidth,
// }: {
//   label: string;
//   value: string;
//   fullWidth?: boolean;
// }) {
//   return (
//     <div className={fullWidth ? "col-span-2" : ""}>
//       <p className="text-[11px] text-slate-400 mb-1">{label}</p>
//       <p className="text-[13px] font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

/* ComingSoon Tabs */
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
    <div className="max-w-290 mx-auto px-6 py-6">
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
