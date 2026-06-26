import { useState, useMemo, useCallback, lazy, Suspense } from "react";

import {
  Search,
  Upload,
  QrCode,
  Send,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useGuests, useDeleteGuest } from "../../hooks/useGuests";
import { useQrSocket, type QrJobState, type QrJobUpdate } from "../../hooks/useQrSocket";
import { guestsService } from "../../services/guests.service";
import type { Guest } from "../../types";
import type { CreateGuestInput } from "../../validations/validateCreateGuest";

const ExcelImportModal = lazy(() => import("./ExcelImportModal"));
import ManualGuestModal from "./ManualGuestModal";
import AssignVideoModal from "./AssignVideoModal";
import DeleteGuestModal from "../guests/DeleteGuestModal";

import type { GuestImportRow } from "../../lib/guestImport";

import { useToast } from "../ui/Toast";

import { PAGE_SIZE, STATUS_FILTERS, type StatusFilter } from "./constants";
import Th from "./components/Th";
import ActionBtn from "./components/ActionBtn";
import PaginationBtn from "./components/PaginationBtn";
import SkeletonRow from "./components/SkeletonRow";
import ConfirmGenerateQrModal from "./components/ConfirmGenerateQrModal";
import ConfirmGuestQrModal from "./components/ConfirmGuestQrModal";
import QrProgressWidget from "./components/QrProgressWidget";
import GuestRow from "./components/GuestRow";

export default function GuestsTab({ eventId }: { eventId: number }) {
  const { data: guests = [], isLoading } = useGuests(eventId);

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
  const [isAssignVideoOpen, setIsAssignVideoOpen] = useState(false);
  const [guestToAssignVideo, setGuestToAssignVideo] = useState<Guest | null>(
    null,
  );

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isManualGuestOpen, setIsManualGuestOpen] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [manualCreateLoading, setManualCreateLoading] = useState(false);
  const [isQrConfirmOpen, setIsQrConfirmOpen] = useState(false);
  const [isGuestQrConfirmOpen, setIsGuestQrConfirmOpen] = useState(false);
  const [qrWidgetOpen, setQrWidgetOpen] = useState(false);
  const [guestToGenerateQr, setGuestToGenerateQr] = useState<Guest | null>(null);
  const [qrJob, setQrJob] = useState<QrJobState>({
    status: "IDLE",
    processed: 0,
    total: 0,
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guests.filter((g: Guest) => {
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

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      allPageSelected
        ? paginated.forEach((g: Guest) => next.delete(g.id))
        : paginated.forEach((g: Guest) => next.add(g.id));
      return next;
    });
  }, [allPageSelected, paginated]);

  const toggleOne = useCallback((id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const changePage = useCallback((p: number) => {
    setPage(p);
    setOpenMenu(null);
  }, []);

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

  const generateGuestQrMutation = useMutation({
    mutationFn: (guest: Guest) => guestsService.generateGuestQr(eventId, guest.id),
    onSuccess: (blob, guest) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const safeName = `${guest.apellido}-${guest.nombre}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

      link.href = url;
      link.download = `qr-${safeName || `guest-${guest.id}`}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsGuestQrConfirmOpen(false);
      setGuestToGenerateQr(null);
      toast.success("QR generado correctamente");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "No se pudo generar el QR del invitado",
      );
    },
  });

  const handleDeleteConfirm = useCallback(() => {
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
            error?.response?.data?.message ?? "No se pudo eliminar el invitado",
          );
        },
      },
    );
  }, [guestToDelete, deleteGuestMutation, eventId, toast]);

  const handleAssignVideo = useCallback((g: Guest) => {
    setGuestToAssignVideo(g);
    setIsAssignVideoOpen(true);
  }, []);

  const handleDelete = useCallback((g: Guest) => {
    setGuestToDelete(g);
    setIsDeleteGuestModalOpen(true);
  }, []);

  const handleGenerateGuestQr = useCallback((g: Guest) => {
    setGuestToGenerateQr(g);
    setIsGuestQrConfirmOpen(true);
  }, []);

  const handleQrJobUpdate = useCallback(
    (update: QrJobUpdate) => {
      setQrJob(update);
    },
    [],
  );

  const handleQrDownloadReady = useCallback(async () => {
    setQrWidgetOpen(true);
    toast.success("QRs listos. Descargando ZIP...");
    try {
      await triggerDownload();
    } catch {
      toast.error("No se pudo descargar el ZIP");
    }
  }, [toast]);

  const handleImportConfirm = useCallback(
    async (rows: GuestImportRow[]) => {
      const mapped: Partial<Guest>[] = rows.map((r) => ({
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

      setImportLoading(true);
      try {
        const result = await guestsService.bulkCreate(eventId, mapped);
        queryClient.invalidateQueries({ queryKey: ["guests", eventId] });
        setIsImportOpen(false);
        toast.success(`${result.created} invitados importados correctamente`);
      } catch {
        toast.error("Error al importar invitados");
      } finally {
        setImportLoading(false);
      }
    },
    [eventId, queryClient],
  );

  const handleManualGuestConfirm = useCallback(
    async (guest: CreateGuestInput) => {
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
    },
    [eventId, queryClient],
  );

  const { triggerDownload } = useQrSocket(
    eventId,
    handleQrJobUpdate,
    handleQrDownloadReady,
  );

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-visible shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
        <span className="text-xs font-semibold text-slate-500 shrink-0">
          Total: {guests.length}
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
            disabled={guests.length === 0 || generateQrMutation.isPending}
            onClick={() => {
              if (guests.length === 0) {
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
              <Th>Acomp.</Th>
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
                  colSpan={9}
                  className="text-center py-16 text-[13px] text-slate-400"
                >
                  No hay invitados que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              paginated.map((guest: Guest) => (
                <GuestRow
                  key={guest.id}
                  guest={guest}
                  isSelected={selected.has(guest.id)}
                  onToggleSelect={toggleOne}
                  isMenuOpen={openMenu === guest.id}
                  onToggleMenu={setOpenMenu}
                  eventId={eventId}
                  onAssignVideo={handleAssignVideo}
                  onDelete={handleDelete}
                  onGenerateQr={handleGenerateGuestQr}
                />
              ))
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
      <Suspense fallback={null}>
        <ExcelImportModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
          isLoading={importLoading}
          onConfirm={handleImportConfirm}
        />
      </Suspense>

      <ManualGuestModal
        isOpen={isManualGuestOpen}
        eventId={eventId}
        onClose={() => setIsManualGuestOpen(false)}
        isLoading={manualCreateLoading}
        onConfirm={handleManualGuestConfirm}
      />
      <ConfirmGenerateQrModal
        isOpen={isQrConfirmOpen}
        totalGuests={guests.length}
        isLoading={generateQrMutation.isPending}
        onClose={() => setIsQrConfirmOpen(false)}
        onConfirm={() => generateQrMutation.mutate()}
      />
      <ConfirmGuestQrModal
        isOpen={isGuestQrConfirmOpen && !!guestToGenerateQr}
        guestName={
          guestToGenerateQr
            ? `${guestToGenerateQr.apellido}, ${guestToGenerateQr.nombre}`
            : ""
        }
        isLoading={generateGuestQrMutation.isPending}
        onClose={() => {
          if (generateGuestQrMutation.isPending) return;
          setIsGuestQrConfirmOpen(false);
          setGuestToGenerateQr(null);
        }}
        onConfirm={() => {
          if (!guestToGenerateQr) return;
          generateGuestQrMutation.mutate(guestToGenerateQr);
        }}
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
      {guestToAssignVideo && (
        <AssignVideoModal
          isOpen={isAssignVideoOpen}
          eventId={eventId}
          guest={guestToAssignVideo}
          onClose={() => {
            setIsAssignVideoOpen(false);
            setGuestToAssignVideo(null);
          }}
          onSuccess={() => {
            setIsAssignVideoOpen(false);
            setGuestToAssignVideo(null);
            toast.success("Video asignado correctamente");
          }}
        />
      )}
    </div>
  );
}
