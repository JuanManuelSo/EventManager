import { useState, useCallback, useMemo, useRef } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Users,
  UserCheck,
  Percent,
  RotateCcw,
} from "lucide-react";
import { useGuests } from "../../hooks/useGuests";
import { useScanQR, useCheckinById } from "../../hooks/useCheckin";
import QRCamera from "./QRCamera";
import { percentage } from "../../lib/utils";
import type { CheckinResult, Guest } from "../../types";

/* ── Scan feedback state ── */
type FeedbackState =
  | { type: "success"; result: CheckinResult }
  | { type: "duplicate"; result: CheckinResult }
  | { type: "error"; message: string }
  | null;

/* ── Recent check-in entry ── */
interface RecentEntry {
  id: number;
  name: string;
  table: string;
  time: string;
  duplicate: boolean;
}

export default function ScanTab({ eventId }: { eventId: number }) {
  const { data: guests = [], isLoading } = useGuests(eventId);
  const scanMutation = useScanQR(eventId);
  const checkinMutation = useCheckinById(eventId);

  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [manualQ, setManualQ] = useState("");
  const [manualRes, setManualRes] = useState<Guest[]>([]);
  const [scanActive, setScanActive] = useState(true);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Live stats ── */
  const stats = useMemo(() => {
    const total = guests.length;
    const present = guests.filter((g) => g.checkedIn).length;
    const pct = percentage(present, total);
    return { total, present, absent: total - present, pct };
  }, [guests]);

  /* ── Handle scan result ── */
  const handleScanResult = useCallback(
    (result: CheckinResult, isManual = false) => {
      const entry: RecentEntry = {
        id: result.guest.id,
        name: `${result.guest.nombre} ${result.guest.apellido}`,
        table: result.guest.mesa ?? "—",
        time: new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        duplicate: result.alreadyIn,
      };

      setRecent((prev) => [entry, ...prev].slice(0, 8));
      setFeedback(
        result.alreadyIn
          ? { type: "duplicate", result }
          : { type: "success", result },
      );

      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
      feedbackTimer.current = setTimeout(() => setFeedback(null), 3500);

      if (isManual) {
        setManualQ("");
        setManualRes([]);
      }
    },
    [],
  );

  /* ── Camera scan ── */
  const handleCameraScan = useCallback(
    (qrCode: string) => {
      if (scanMutation.isPending) return;
      console.log("🚀 Enviando al backend:", qrCode);
      scanMutation.mutate(qrCode, {
        onSuccess: (res) => {
          console.log("✅ Respuesta backend:", res);
          handleScanResult(res);
        },
        onError: (err) => {
          console.error("❌ Error backend:", err);
          console.error("❌ Detalle:", (err as any)?.response?.data);
          setFeedback({ type: "error", message: (err as Error).message });
          if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
          feedbackTimer.current = setTimeout(() => setFeedback(null), 3500);
        },
      });
    },
    [scanMutation, handleScanResult],
  );

  /* ── Manual search ── */
  function handleManualSearch(q: string) {
    setManualQ(q);
    if (!q.trim()) {
      setManualRes([]);
      return;
    }
    const lower = q.toLowerCase();
    setManualRes(
      guests
        .filter(
          (g) =>
            `${g.nombre} ${g.apellido}`.toLowerCase().includes(lower) ||
            (g.email ?? "").toLowerCase().includes(lower),
        )
        .slice(0, 5),
    );
  }

  function handleManualCheckin(guest: Guest) {
    if (checkinMutation.isPending) return;
    checkinMutation.mutate(guest.id, {
      onSuccess: (res) => handleScanResult(res, true),
      onError: (err) => {
        setFeedback({ type: "error", message: (err as Error).message });
        if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = setTimeout(() => setFeedback(null), 3500);
      },
    });
  }

  /* ── Dev: simulate scan ── */
  function simulateScan() {
    const notIn = guests.filter((g) => !g.checkedIn);
    if (!notIn.length) return;
    const pick = notIn[Math.floor(Math.random() * notIn.length)];
    handleCameraScan(pick.qrHash);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* ── Live stats bar ── */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <StatBox
            icon={<Users size={14} className="text-slate-400" />}
            label="Total invitados"
            value={stats.total}
            color="default"
          />
          <StatBox
            icon={<UserCheck size={14} className="text-emerald-500" />}
            label="Presentes"
            value={stats.present}
            color="green"
          />
          <StatBox
            icon={<Percent size={14} className="text-blue-500" />}
            label="Asistencia"
            value={`${stats.pct}%`}
            color="blue"
            sub={
              <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${stats.pct}%` }}
                />
              </div>
            }
          />
        </div>
      )}

      {/* ── Main panel ── */}
      <div className="grid grid-cols-[1fr_1fr] gap-5">
        {/* Left: scanner */}
        <div className="flex flex-col gap-3">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="text-[13px] font-semibold text-slate-800">
                Cámara de escaneo
              </h3>
              <button
                onClick={() => setScanActive((v) => !v)}
                className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                {scanActive ? "Pausar" : "Reanudar"}
              </button>
            </div>

            {/* Camera viewport */}
            <div className="h-55 relative bg-[#0a0a0a]">
              <QRCamera
                onScan={handleCameraScan}
                active={scanActive}
                disabled={scanMutation.isPending || feedback !== null}
              />

              {/* Feedback overlay */}
              {feedback && (
                <div
                  className={[
                    "absolute inset-0 flex flex-col items-center justify-center gap-2",
                    "transition-all duration-200 backdrop-blur-[2px]",
                    feedback.type === "success" ? "bg-emerald-950/80" : "",
                    feedback.type === "duplicate" ? "bg-amber-950/80" : "",
                    feedback.type === "error" ? "bg-red-950/80" : "",
                  ].join(" ")}
                >
                  {feedback.type === "success" && (
                    <>
                      <CheckCircle2 size={36} className="text-emerald-400" />
                      <p className="text-white font-semibold text-[14px]">
                        {feedback.result.guest.nombre}{" "}
                        {feedback.result.guest.apellido}
                      </p>
                      <p className="text-emerald-300 text-xs">
                        {feedback.result.guest.mesa ?? "Sin mesa asignada"} ·
                        Check-in registrado
                      </p>
                    </>
                  )}
                  {feedback.type === "duplicate" && (
                    <>
                      <AlertTriangle size={36} className="text-amber-400" />
                      <p className="text-white font-semibold text-[14px]">
                        Ya registrado
                      </p>
                      <p className="text-amber-300 text-xs">
                        {feedback.result.guest.nombre}{" "}
                        {feedback.result.guest.apellido} ya hizo check-in.
                      </p>
                    </>
                  )}
                  {feedback.type === "error" && (
                    <>
                      <XCircle size={36} className="text-red-400" />
                      <p className="text-white font-semibold text-[14px]">
                        QR inválido
                      </p>
                      <p className="text-red-300 text-xs">{feedback.message}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Manual search */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
            <div className="px-4 py-3 border-b border-slate-100">
              <h3 className="text-[13px] font-semibold text-slate-800">
                Búsqueda manual
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fallback si el QR no puede escanearse
              </p>
            </div>
            <div className="p-3">
              <div className="relative">
                <Search
                  size={12}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  value={manualQ}
                  onChange={(e) => handleManualSearch(e.target.value)}
                  placeholder="Nombre o email del invitado..."
                  className="w-full pl-7 pr-3 py-2 text-xs text-slate-800
                             bg-slate-50 border border-slate-200 rounded-lg
                             placeholder:text-slate-400
                             focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900
                             transition-colors duration-150"
                />
              </div>

              {manualRes.length > 0 && (
                <div className="mt-2 flex flex-col divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                  {manualRes.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleManualCheckin(g)}
                      disabled={checkinMutation.isPending}
                      className="flex items-center justify-between px-3 py-2.5
                                 hover:bg-slate-50 transition-colors duration-100
                                 disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          {g.nombre} {g.apellido}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {g.mesa ?? "—"}
                        </p>
                      </div>
                      {g.checkedIn ? (
                        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                          Ya registrado
                        </span>
                      ) : (
                        <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full">
                          Check-in
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dev simulator */}
          {import.meta.env.DEV && (
            <button
              onClick={simulateScan}
              disabled={scanMutation.isPending}
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium
                         text-slate-400 border border-dashed border-slate-200 rounded-xl
                         hover:text-slate-600 hover:border-slate-300
                         disabled:opacity-40 disabled:cursor-not-allowed
                         transition-colors duration-150"
            >
              <RotateCcw size={13} />
              Simular escaneo QR (DEV)
            </button>
          )}
        </div>

        {/* Right: recent check-ins */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgb(0,0,0,0.05)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-[13px] font-semibold text-slate-800">
              Últimos check-ins
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-600 font-medium">
                En vivo
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                  <UserCheck size={18} className="text-slate-400" />
                </div>
                <p className="text-xs text-slate-400">
                  Los check-ins aparecerán aquí en tiempo real.
                </p>
              </div>
            ) : (
              recent.map((entry, i) => (
                <div
                  key={`${entry.id}-${i}`}
                  className={[
                    "flex items-center gap-3 px-4 py-3",
                    i === 0 ? "bg-slate-50/80" : "",
                    entry.duplicate ? "opacity-60" : "",
                  ].join(" ")}
                >
                  {/* Avatar */}
                  <div
                    className={[
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold",
                      entry.duplicate
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700",
                    ].join(" ")}
                  >
                    {entry.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {entry.name}
                    </p>
                    <p className="text-[11px] text-slate-400">{entry.table}</p>
                  </div>

                  {/* Time + status */}
                  <div className="text-right shrink-0">
                    <p className="text-[11px] font-bold text-slate-700">
                      {entry.time}
                    </p>
                    {entry.duplicate && (
                      <p className="text-[9px] text-amber-500 font-semibold mt-0.5">
                        DUPLICADO
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Micro-components ── */

function StatBox({
  icon,
  label,
  value,
  color,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: "default" | "green" | "blue";
  sub?: React.ReactNode;
}) {
  const valueColor =
    color === "green"
      ? "text-emerald-600"
      : color === "blue"
        ? "text-blue-600"
        : "text-slate-900";

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-[0_1px_3px_rgb(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p
        className={`text-[26px] font-semibold leading-none tracking-tight ${valueColor}`}
      >
        {value}
      </p>
      {sub}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl px-5 py-4"
        >
          <div className="h-2.5 w-24 bg-slate-100 rounded animate-pulse mb-3" />
          <div className="h-7   w-16 bg-slate-100 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}
