import JSZip from "jszip";
import QRCode from "qrcode";
import sharp from "sharp";
import { prisma } from "../lib/prisma.js";
import { getIo } from "../lib/socket.js";
import { ensureQrJobCanStart } from "./qr-job.domain.js";

const zipStore = new Map<number, Buffer>();
const runningJobs = new Set<number>();

type QrTemplate = {
  url: string;
  x: number;
  y: number;
  size: number;
};

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
      select: {
        id_evento: true,
        qrJobStatus: true,
        invitationBaseImageUrl: true,
        invitationQrX: true,
        invitationQrY: true,
        invitationQrSize: true,
      },
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

    const template = event?.invitationBaseImageUrl &&
      event.invitationQrX !== null &&
      event.invitationQrY !== null &&
      event.invitationQrSize !== null
      ? {
          url: event.invitationBaseImageUrl,
          x: event.invitationQrX,
          y: event.invitationQrY,
          size: event.invitationQrSize,
        }
      : null;

    void this.process(eventId, guests, template).finally(() => {
      runningJobs.delete(eventId);
    });

    return {
      eventId,
      qrJobStatus: "PROCESSING" as const,
      total: guests.length,
    };
  },

  async process(
    eventId: number,
    guests: Array<{ id: number; qrHash: string }>,
    template: QrTemplate | null,
  ) {
    try {
      const zip = new JSZip();
      const templateBuffer = template ? await fetchImage(template.url) : null;

      for (let i = 0; i < guests.length; i++) {
        const guest = guests[i];
        const png = await buildQrPng(guest.qrHash);

        if (template && templateBuffer) {
          const card = await composeQrCard(templateBuffer, png, template);
          zip.file(`guest-${guest.id}-${guest.qrHash}-card.png`, card);
        } else {
          zip.file(`guest-${guest.id}-${guest.qrHash}.png`, png);
        }

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

  clearZip(eventId: number) {
    zipStore.delete(eventId);
  },

  async generateGuestQr(qrHash: string, template: QrTemplate | null) {
    const png = await buildQrPng(qrHash);

    if (!template) {
      return png;
    }

    const templateBuffer = await fetchImage(template.url);
    return composeQrCard(templateBuffer, png, template);
  },
};

async function buildQrPng(qrHash: string) {
  return QRCode.toBuffer(qrHash, {
    type: "png",
    width: 600,
    errorCorrectionLevel: "M",
  });
}

async function fetchImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo descargar la plantilla de invitación");
  }

  return Buffer.from(await response.arrayBuffer());
}

async function composeQrCard(
  templateBuffer: Buffer,
  qrBuffer: Buffer,
  template: QrTemplate,
) {
  const resizedQr = await sharp(qrBuffer)
    .resize(template.size, template.size)
    .png()
    .toBuffer();

  return sharp(templateBuffer)
    .composite([{ input: resizedQr, left: template.x, top: template.y }])
    .png()
    .toBuffer();
}
