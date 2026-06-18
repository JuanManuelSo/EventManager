import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { CheckinResult } from "../../types";

type FeedbackState =
  | { type: "success"; result: CheckinResult }
  | { type: "duplicate"; result: CheckinResult }
  | { type: "error"; message: string }
  | null;

export default function ScanFeedbackOverlay({
  feedback,
}: {
  feedback: FeedbackState;
}) {
  if (!feedback) return null;

  return (
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
            {feedback.result.guest.nombre} {feedback.result.guest.apellido}
          </p>
          <p className="text-emerald-300 text-xs">
            {feedback.result.guest.mesa ?? "Sin mesa asignada"} · Check-in
            registrado
          </p>
          {feedback.result.guest?.video && (
            <p className="text-emerald-300/70 text-[10px] mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Reproduciendo video en pantalla
            </p>
          )}
        </>
      )}
      {feedback.type === "duplicate" && (
        <>
          <AlertTriangle size={36} className="text-amber-400" />
          <p className="text-white font-semibold text-[14px]">Ya registrado</p>
          <p className="text-amber-300 text-xs">
            {feedback.result.guest.nombre} {feedback.result.guest.apellido} ya
            hizo check-in.
          </p>
        </>
      )}
      {feedback.type === "error" && (
        <>
          <XCircle size={36} className="text-red-400" />
          <p className="text-white font-semibold text-[14px]">QR inválido</p>
          <p className="text-red-300 text-xs">{feedback.message}</p>
        </>
      )}
    </div>
  );
}
