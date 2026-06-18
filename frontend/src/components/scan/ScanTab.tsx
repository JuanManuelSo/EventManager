import { useState, useCallback, useMemo, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { useGuests } from "../../hooks/useGuests";
import { useScanQR, useCheckinById } from "../../hooks/useCheckin";
import QRCamera from "./QRCamera";
import ManualGuestSearchPanel from "./ManualGuestSearchPanel";
import ScanStats from "./ScanStats";
import ScanFeedbackOverlay from "./ScanFeedbackOverlay";
import RecentCheckinsPanel, { type RecentCheckinEntry } from "./RecentCheckinsPanel";
import { percentage } from "../../lib/utils";
import type { CheckinResult } from "../../types";

type FeedbackState =
  | { type: "success"; result: CheckinResult }
  | { type: "duplicate"; result: CheckinResult }
  | { type: "error"; message: string }
  | null;

export default function ScanTab({ eventId }: { eventId: number }) {
  const { data: guests = [], isLoading } = useGuests(eventId);
  const scanMutation = useScanQR(eventId);
  const checkinMutation = useCheckinById(eventId);

  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [recent, setRecent] = useState<RecentCheckinEntry[]>([]);
  const [manualResetKey, setManualResetKey] = useState(0);
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
      const entry: RecentCheckinEntry = {
        id: result.guest.id,
        name: `${result.guest.nombre} ${result.guest.apellido}`,
        numero: result.guest.numero ?? "—",
        table: result.guest.mesa ?? "—",
        cantAcompanantes: result.guest.cant_acompanantes ?? null,
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
        setManualResetKey((prev) => prev + 1);
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

  function handleManualCheckin(guestId: number) {
    if (checkinMutation.isPending) return;

    checkinMutation.mutate(guestId, {
      onSuccess: (res) => {
        handleScanResult(res, true);
      },
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
      <ScanStats isLoading={isLoading} stats={stats} />

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
              <ScanFeedbackOverlay feedback={feedback} />
            </div>
          </div>

          <ManualGuestSearchPanel
            guests={guests}
            isLoading={checkinMutation.isPending}
            resetKey={manualResetKey}
            onConfirmCheckin={(guest) => handleManualCheckin(guest.id)}
          />

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
        <RecentCheckinsPanel recent={recent} />
      </div>
    </div>
  );
}
