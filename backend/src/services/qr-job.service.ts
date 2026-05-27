import JSZip from "jszip";
import QRCode from "qrcode";
import { prisma } from "../lib/prisma.js";
import { getIo } from "../lib/socket.js";
import { ensureQrJobCanStart } from "./qr-job.domain.js";

const zipStore = new Map<number, Buffer>();
const runningJobs = new Set<number>();

function roomName(eventId: number) {
  return `event:${eventId}:qr`;
}

function getDownloadUrl(eventId: number) {
  return `/api/events/${eventId}/guests/qr/download`;
}

export const qrJobService = {
  async start(eventId: number, requestedBy: number) {
    const event = await prisma.event.findFirst({
      where: { id_evento: eventId, ownerId: requestedBy },
      select: { id_evento: true, qrJobStatus: true },
    });

    const guests = await prisma.guest.findMany({
      where: { eventId },
      select: { id: true, qrHash: true },
      orderBy: { id: "asc" },
    });

    ensureQrJobCanStart({
      eventExists: Boolean(event),
      isProcessing: event?.qrJobStatus === "PROCESSING" || runningJobs.has(eventId),
      guestCount: guests.length,
    });

    await prisma.event.update({
      where: { id_evento: eventId },
      data: {
        qrJobStatus: "PROCESSING",
        qrJobStartedAt: new Date(),
        qrJobFinishedAt: null,
        qrJobError: null,
        qrJobTotal: guests.length,
        qrJobProcessed: 0,
        qrJobRequestedBy: requestedBy,
      },
    });

    runningJobs.add(eventId);
    getIo().to(roomName(eventId)).emit("qr:job_started", { eventId, total: guests.length });

    void this.process(eventId, guests).finally(() => {
      runningJobs.delete(eventId);
    });

    return {
      eventId,
      qrJobStatus: "PROCESSING" as const,
      total: guests.length,
    };
  },

  async process(eventId: number, guests: Array<{ id: number; qrHash: string }>) {
    try {
      const zip = new JSZip();

      for (let i = 0; i < guests.length; i++) {
        const guest = guests[i];
        const png = await QRCode.toBuffer(guest.qrHash, {
          type: "png",
          width: 600,
          errorCorrectionLevel: "M",
        });

        zip.file(`guest-${guest.id}-${guest.qrHash}.png`, png);

        const processed = i + 1;
        const percent = Math.round((processed / guests.length) * 100);

        await prisma.event.update({
          where: { id_evento: eventId },
          data: { qrJobProcessed: processed },
        });

        getIo().to(roomName(eventId)).emit("qr:job_progress", {
          eventId,
          processed,
          total: guests.length,
          percent,
        });
      }

      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
      zipStore.set(eventId, zipBuffer);

      await prisma.event.update({
        where: { id_evento: eventId },
        data: {
          qrJobStatus: "DONE",
          qrGeneratedAt: new Date(),
          qrJobFinishedAt: new Date(),
          qrJobError: null,
          qrJobProcessed: guests.length,
        },
      });

      getIo().to(roomName(eventId)).emit("qr:job_done", {
        eventId,
        total: guests.length,
        downloadUrl: getDownloadUrl(eventId),
      });
    } catch (error: any) {
      await prisma.event.update({
        where: { id_evento: eventId },
        data: {
          qrJobStatus: "ERROR",
          qrJobError: error?.message ?? "Error generando QRs",
          qrJobFinishedAt: new Date(),
        },
      });

      getIo().to(roomName(eventId)).emit("qr:job_error", {
        eventId,
        message: error?.message ?? "Error generando QRs",
      });
    }
  },

  getZip(eventId: number) {
    return zipStore.get(eventId) ?? null;
  },
};
