import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Upload,
  QrCode,
  Send,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  UserPlus,
  Film,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { useGuests, useDeleteGuest } from "../../hooks/useGuests";
import { guestsService } from "../../services/guests.service";
import type { Guest } from "../../types";

import ExcelImportModal from "./ExcelImportModal";
import ManualGuestModal from "./ManualGuestModal";
import DeleteGuestModal from "../guests/DeleteGuestModal";

import type { GuestImportRow } from "../../lib/guestImport";

import { useToast } from "../ui/Toast";

const PAGE_SIZE = 10;
const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const SOCKET_URL = API_BASE.replace(/\/api\/?$/, "");

type StatusFilter = "all" | Guest["status"];

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "Presente", label: "Presentes" },
  { key: "Pendiente", label: "Pendientes" },
  { key: "Ausente", label: "Ausentes" },
];

const STATUS_CONFIG: Record<
  Guest["status"],
  { label: string; bg: string; text: string; icon: React.ReactNode }
> = {
  Presente: {
    label: "Presente",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: <CheckCircle2 size={11} />,
  },
  Pendiente: {
    label: "Pendiente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: <Clock size={11} />,
  },
  Ausente: {
    label: "Ausente",
    bg: "bg-red-50",
    text: "text-red-600",
    icon: <XCircle size={11} />,
  },
};

export default function GuestsTab({ eventId }: { eventId: number }) {
  const { data: guests = [], isLoading } = useGuests(eventId);
  const [importedGuests] = useState<Guest[]>([]);

  const navigate = useNavigate();

  console.log("GuestTab render", { guests });

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const toast = useToast();
  const deleteGuestMutation = useDeleteGuest();

  //Estado para modal
  const [isDeleteGuestModalOpen, setIsDeleteGuestModalOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null);

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isManualGuestOpen, setIsManualGuestOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [manualCreateLoading, setManualCreateLoading] = useState(false);
  const [isQrConfirmOpen, setIsQrConfirmOpen] = useState(false);
  const [qrWidgetOpen, setQrWidgetOpen] = useState(false);
  const [qrJob, setQrJob] = useState<{
    status: "IDLE" | "PROCESSING" | "DONE" | "ERROR";
    processed: number;
    total: number;
    error?: string;
  }>({ status: "IDLE", processed: 0, total: 0 });

  const allGuests = [...guests, ...importedGuests];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allGuests.filter((g: Guest) => {
      const matchStatus = statusFilter === "all" || g.status === statusFilter;
      const matchQuery =
        !q ||
        `${g.nombre} ${g.apellido}`.toLowerCase().includes(q) ||
        (g.email ?? "").toLowerCase().includes(q) ||
        (g.mesa ?? "").toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [guests, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allPageSelected =
    paginated.length > 0 && paginated.every((g: Guest) => selected.has(g.id));

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      allPageSelected
        ? paginated.forEach((g: Guest) => next.delete(g.id))
        : paginated.forEach((g: Guest) => next.add(g.id));
      return next;
    });
  }

  function toggleOne(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function changePage(p: number) {
    setPage(p);
    setOpenMenu(null);
  }

  const generateQrMutation = useMutation({
    mutationFn: () => guestsService.generateQrs(eventId),
    onSuccess: (data) => {
      setQrJob({ status: "PROCESSING", processed: 0, total: data.total });
      setQrWidgetOpen(true);
      setIsQrConfirmOpen(false);
      toast.success("Generación de QRs iniciada");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "No se pudo iniciar la generación de QRs",
      );
    },
  });

  const handleDeleteConfirm = () => {
    if (!guestToDelete) return;

    deleteGuestMutation.mutate(
      { eventId, guestId: guestToDelete.id },
      {
        onSuccess: () => {
          setIsDeleteGuestModalOpen(false);
          setGuestToDelete(null);
          toast.success("Invitado eliminado correctamente");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ??
              "No se pudo eliminar el invitado"
          );
        },
      },
    );
  };

  async function triggerDownload() {
    const blob = await guestsService.downloadQrs(eventId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrs-evento-${eventId}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      socket.emit("qr:join", { eventId });
    });

    socket.on(
      "qr:job_started",
      (payload: { eventId: number; total: number }) => {
        if (payload.eventId !== eventId) return;
        setQrWidgetOpen(true);
        setQrJob({ status: "PROCESSING", processed: 0, total: payload.total });
      },
    );

    socket.on(
      "qr:job_progress",
      (payload: { eventId: number; processed: number; total: number }) => {
        if (payload.eventId !== eventId) return;
        setQrWidgetOpen(true);
        setQrJob({
          status: "PROCESSING",
          processed: payload.processed,
          total: payload.total,
        });
      },
    );

    socket.on(
      "qr:job_done",
      async (payload: { eventId: number; total: number }) => {
        if (payload.eventId !== eventId) return;
        setQrWidgetOpen(true);
        setQrJob({
          status: "DONE",
          processed: payload.total,
          total: payload.total,
        });
        toast.success("QRs listos. Descargando ZIP...");
        try {
          await triggerDownload();
        } catch {
          toast.error("No se pudo descargar el ZIP");
        } finally {
          queryClient.invalidateQueries({
            queryKey: ["events", "detail", eventId],
          });
        }
      },
    );

    socket.on(
      "qr:job_error",
      (payload: { eventId: number; message: string }) => {
        if (payload.eventId !== eventId) return;
        setQrWidgetOpen(true);
        setQrJob((prev) => ({
          ...prev,
          status: "ERROR",
          error: payload.message,
        }));
        toast.error(payload.message || "Falló la generación de QRs");
        queryClient.invalidateQueries({
          queryKey: ["events", "detail", eventId],
        });
      },
    );

    return () => {
      socket.emit("qr:leave", { eventId });
      socket.disconnect();
    };
  }, [eventId]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-visible shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 shrink-0">
          Total: {allGuests.length}
        </span>

        <div className="relative">
          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar invitado..."
            className="pl-7 pr-3 py-1.5 w-48 text-xs text-slate-800
                       bg-slate-50 border border-slate-200 rounded-lg
                       placeholder:text-slate-400
                       focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900
                       transition-colors duration-150"
          />
        </div>

        <div className="flex items-center gap-1">
          {STATUS_FILTERS.map(({ key, label }) => (
            <button
              key={`status-invitado-${key}`}
              onClick={() => {
                setStatusFilter(key);
                setPage(1);
              }}
              className={[
                "px-2.5 py-1 rounded text-[11px] font-medium transition-colors duration-150 focus:outline-none cursor-pointer",
                statusFilter === key
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ActionBtn
            icon={<Upload size={13} />}
            label="Cargar Excel"
            onClick={() => setIsImportOpen(true)}
          />
          <ActionBtn
            icon={<UserPlus size={13} />}
            label="Cargar Invitado"
            onClick={() => setIsManualGuestOpen(true)}
          />
          <ActionBtn
            icon={<QrCode size={13} />}
            label="Generar QRs"
            disabled={allGuests.length === 0 || generateQrMutation.isPending}
            onClick={() => {
              if (allGuests.length === 0) {
                toast.error("No hay invitados para generar QRs");
                return;
              }
              setIsQrConfirmOpen(true);
            }}
          />
          <ActionBtn
            icon={<Send size={13} />}
            label="Enviar Invitaciones"
            primary
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-xl min-h-65">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="w-10 px-4 py-2.5">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded border-slate-300 accent-slate-900 cursor-pointer"
                />
              </th>
              <Th>Invitado</Th>
              <Th>Email</Th>
              <Th>Mesa</Th>
              <Th>Video</Th>
              <Th>Estado</Th>
              <Th>Check-in</Th>
              <Th align="right">Acciones</Th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-16 text-[13px] text-slate-400"
                >
                  No hay invitados que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              paginated.map((guest: Guest) => {
                const s =
                  STATUS_CONFIG[guest.status] ?? STATUS_CONFIG["Pendiente"];
                if (!STATUS_CONFIG[guest.status]) {
                  console.warn("Status desconocido:", guest.status, guest);
                }
                const isOpen = openMenu === guest.id;

                return (
                  <tr
                    key={guest.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors duration-100"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(guest.id)}
                        onChange={() => toggleOne(guest.id)}
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
                          onClick={() => setOpenMenu(isOpen ? null : guest.id)}
                          className="p-1.5 rounded text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-150 focus:outline-none cursor-pointer"
                        >
                          <MoreVertical size={15} />
                        </button>

                        {isOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenu(null)}
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
                                  setOpenMenu(null);
                                  // Toggle video assignment
                                  try {
                                    await guestsService.updateGuest(
                                      eventId,
                                      guest.id,
                                      { video: guest.video ? null : undefined },
                                    );
                                    queryClient.invalidateQueries({
                                      queryKey: ["guests", eventId],
                                    });
                                    toast.success(
                                      guest.video
                                        ? "Video eliminado"
                                        : "Abriendo selector...",
                                    );
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
                                  setGuestToDelete(guest);
                                  setIsDeleteGuestModalOpen(true);
                                  setOpenMenu(null);
                                }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Mostrando{" "}
            <span className="font-medium text-slate-600">
              {(page - 1) * PAGE_SIZE + 1} a{" "}
              {Math.min(page * PAGE_SIZE, filtered.length)}
            </span>{" "}
            de{" "}
            <span className="font-medium text-slate-600">
              {filtered.length}
            </span>{" "}
            invitados
          </p>

          <div className="flex items-center gap-1">
            <PaginationBtn
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              icon={<ChevronLeft size={14} />}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<(number | "ellipsis")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1)
                  acc.push("ellipsis");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "ellipsis" ? (
                  <span key={`e${i}`} className="px-1 text-slate-300 text-xs">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => changePage(p as number)}
                    className={[
                      "w-7 h-7 rounded text-xs font-medium transition-colors duration-150 focus:outline-none",
                      page === p
                        ? "bg-slate-900 text-white"
                        : "text-slate-500 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    {p}
                  </button>
                ),
              )}
            <PaginationBtn
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              icon={<ChevronRight size={14} />}
            />
          </div>
        </div>
      )}
      <ExcelImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        isLoading={importLoading}
        onConfirm={async (rows) => {
          const mapped: Partial<Guest>[] = rows.map((r: GuestImportRow) => ({
            documento: r.documento,
            nombre: r.nombre,
            apellido: r.apellido,
            email: r.email,
            numero: r.numero,
            telefono: r.numero,
            mesa: r.mesa,
            status: (r.status ?? "Pendiente") as Guest["status"],
            cant_acompanantes: r.cant_acompanantes,
          }));
          console.log(
            "status del primer row:",
            rows[0]?.status,
            "→ mapped:",
            mapped[0]?.status,
          );

          setImportLoading(true);
          try {
            const result = await guestsService.bulkCreate(eventId, mapped);
            queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
            setIsImportOpen(false);
            toast.success(
              `${result.created} invitados importados correctamente`,
            );
          } catch {
            toast.error("Error al importar invitados");
          } finally {
            setImportLoading(false);
          }
        }}
      />
      <ManualGuestModal
        isOpen={isManualGuestOpen}
        eventId={eventId}
        onClose={() => setIsManualGuestOpen(false)}
        isLoading={manualCreateLoading}
        onConfirm={async (guest) => {
          setManualCreateLoading(true);
          try {
            await guestsService.create(eventId, {
              ...guest,
              telefono: guest.numero,
              video: guest.videoUrl || undefined,
            });
            queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
            setIsManualGuestOpen(false);
            toast.success("Invitado cargado correctamente");
          } catch {
            toast.error("Error al cargar invitado manualmente");
          } finally {
            setManualCreateLoading(false);
          }
        }}
      />
      <ConfirmGenerateQrModal
        isOpen={isQrConfirmOpen}
        totalGuests={allGuests.length}
        isLoading={generateQrMutation.isPending}
        onClose={() => setIsQrConfirmOpen(false)}
        onConfirm={() => generateQrMutation.mutate()}
      />
      {qrWidgetOpen && (
        <QrProgressWidget
          state={qrJob}
          onClose={() => setQrWidgetOpen(false)}
          onRetry={() => generateQrMutation.mutate()}
          onDownloadAgain={triggerDownload}
        />
      )}
      <DeleteGuestModal
        isOpen={isDeleteGuestModalOpen}
        onClose={() => {
          setIsDeleteGuestModalOpen(false);
          setGuestToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        guest={guestToDelete!}
        isLoading={deleteGuestMutation.isPending}
      />
    </div>
  );
}

function Th({
  children,
  align,
}: {
  children?: React.ReactNode;
  align?: "right";
}) {
  return (
    <th
      className={`px-3 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-left ${align === "right" ? "text-right" : ""}`}
    >
      {children}
    </th>
  );
}

function ActionBtn({
  icon,
  label,
  primary,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={[
        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors duration-150 focus:outline-none cursor-pointer",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        primary
          ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
}

function ConfirmGenerateQrModal({
  isOpen,
  totalGuests,
  isLoading,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  totalGuests: number;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white border border-slate-200 shadow-xl p-5">
        <h3 className="text-sm font-semibold text-slate-800">
          Confirmar generación de QRs
        </h3>
        <p className="text-xs text-slate-500 mt-2">
          Se van a procesar{" "}
          <span className="font-semibold text-slate-700">{totalGuests}</span>{" "}
          invitados.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-3 py-1.5 text-xs rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {isLoading ? "Iniciando..." : "Generar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function QrProgressWidget({
  state,
  onClose,
  onRetry,
  onDownloadAgain,
}: {
  state: {
    status: "IDLE" | "PROCESSING" | "DONE" | "ERROR";
    processed: number;
    total: number;
    error?: string;
  };
  onClose: () => void;
  onRetry: () => void;
  onDownloadAgain: () => Promise<void>;
}) {
  const percent =
    state.total > 0 ? Math.round((state.processed / state.total) * 100) : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-84 rounded-xl border border-slate-200 bg-white shadow-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800">
          Generación de QRs
        </p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xs"
        >
          Cerrar
        </button>
      </div>

      {state.status === "PROCESSING" && (
        <>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <Loader2 size={13} className="animate-spin" />
            Procesando {state.processed}/{state.total}
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {percent}% completado
          </p>
        </>
      )}

      {state.status === "DONE" && (
        <div className="mt-3">
          <p className="text-xs text-emerald-700 font-medium">
            Listo. ZIP generado correctamente.
          </p>
          <button
            onClick={() => void onDownloadAgain()}
            className="mt-2 px-3 py-1.5 text-xs rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            Descargar otra vez
          </button>
        </div>
      )}

      {state.status === "ERROR" && (
        <div className="mt-3">
          <p className="text-xs text-red-600 font-medium">
            {state.error || "Error generando QRs"}
          </p>
          <button
            onClick={onRetry}
            className="mt-2 px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  label,
  danger,
  onClick,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left px-3 py-2 text-xs font-medium transition-colors duration-100 cursor-pointer",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function PaginationBtn({
  onClick,
  disabled,
  icon,
}: {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 focus:outline-none"
    >
      {icon}
    </button>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100">
      <td className="px-4 py-3">
        <div className="w-3.5 h-3.5 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3.5 w-32 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3   w-40 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-3   w-16 bg-slate-100 rounded animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-6   w-24 bg-slate-100 rounded-full animate-pulse" />
      </td>
      <td className="px-3 py-3">
        <div className="h-6   w-14 bg-slate-100 rounded-full animate-pulse" />
      </td>
      <td className="px-3 py-3 text-right">
        <div className="h-6 w-6 bg-slate-100 rounded animate-pulse ml-auto" />
      </td>
    </tr>
  );
}
