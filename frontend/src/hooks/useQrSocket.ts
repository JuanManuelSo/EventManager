import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { SOCKET_URL } from "../components/guests/constants";
import { guestsService } from "../services/guests.service";

export interface QrJobState {
  status: "IDLE" | "PROCESSING" | "DONE" | "ERROR";
  processed: number;
  total: number;
  error?: string;
}

type QrJobUpdate = QrJobState | ((prev: QrJobState) => QrJobState);

export function useQrSocket(
  eventId: number,
  onJobUpdate: (job: QrJobUpdate) => void,
  onDownloadReady: () => void,
) {
  const queryClient = useQueryClient();

  const triggerDownload = useCallback(async () => {
    const blob = await guestsService.downloadQrs(eventId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrs-evento-${eventId}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }, [eventId]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      socket.emit("qr:join", { eventId });
    });

    socket.on(
      "qr:job_started",
      (payload: { eventId: number; total: number }) => {
        if (payload.eventId !== eventId) return;
        onJobUpdate({ status: "PROCESSING", processed: 0, total: payload.total });
      },
    );

    socket.on(
      "qr:job_progress",
      (payload: { eventId: number; processed: number; total: number }) => {
        if (payload.eventId !== eventId) return;
        onJobUpdate({
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
        onJobUpdate({
          status: "DONE",
          processed: payload.total,
          total: payload.total,
        });
        onDownloadReady();
        queryClient.invalidateQueries({
          queryKey: ["events", "detail", eventId],
        });
      },
    );

    socket.on(
      "qr:job_error",
      (payload: { eventId: number; message: string }) => {
        if (payload.eventId !== eventId) return;
        onJobUpdate((prev) => ({
          ...prev,
          status: "ERROR",
          error: payload.message,
        }));
        queryClient.invalidateQueries({
          queryKey: ["events", "detail", eventId],
        });
      },
    );

    return () => {
      socket.emit("qr:leave", { eventId });
      socket.disconnect();
    };
  }, [eventId, onJobUpdate, onDownloadReady, queryClient]);

  return { triggerDownload };
}
