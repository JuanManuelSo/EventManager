import { prisma } from "../lib/prisma.js";
import { emitGuestCheckinVideoIfAvailable } from "./checkin-video.service.js";

export interface CheckinResult {
  alreadyIn: boolean;
  guest: {
    id: number;
    nombre: string;
    apellido: string;
    email: string | null;
    mesa: string | null;
    qrHash: string;
    checkInTime: Date | null;
    status: string;
    video: string | null;
    cant_acompanantes: number | null;
  };
}

async function syncEventAttendance(eventId: number) {
  const [checkedInCount, totalGuests] = await Promise.all([
    prisma.guest.count({
      where: { eventId, checkInTime: { not: null } },
    }),
    prisma.guest.count({ where: { eventId } }),
  ]);

  const porcentajeAsistencia =
    totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;

  await prisma.event.update({
    where: { id_evento: eventId },
    data: { checkedInCount, porcentajeAsistencia },
  });
}

export const checkinService = {
  /**
   * Check-in por QR hash
   * El string que llega del scanner es "QR-<hash>", lo limpiamos acá
   */
  async scanQR(eventId: number, raw: string): Promise<CheckinResult> {
    const guest = await prisma.guest.findFirst({
      where: { qrHash: raw, eventId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        mesa: true,
        qrHash: true,
        checkInTime: true,
        status: true,
        video: true,
        cant_acompanantes: true,
      },
    });

    if (!guest) {
      const error = new Error("QR inválido — invitado no encontrado.") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    // Ya hizo check-in
    if (guest.checkInTime !== null) {
      return { alreadyIn: true, guest };
    }

    // Marcar check-in
    const updated = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        checkInTime: new Date(),
        status: "PRESENTE",
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        mesa: true,
        qrHash: true,
        checkInTime: true,
        status: true,
        video: true,
        localVideo: true,
        cant_acompanantes: true,
      },
    });

    await syncEventAttendance(eventId);

    await emitGuestCheckinVideoIfAvailable(eventId, updated);

    return { alreadyIn: false, guest: updated };
  },

  /**
   * Check-in manual por ID (búsqueda desde el frontend)
   */
  async checkinById(eventId: number, guestId: number): Promise<CheckinResult> {
    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        mesa: true,
        qrHash: true,
        checkInTime: true,
        status: true,
        video: true,
        localVideo: true,
        cant_acompanantes: true,
      },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado.") as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    if (guest.checkInTime !== null) {
      return { alreadyIn: true, guest };
    }

    const updated = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        checkInTime: new Date(),
        status: "PRESENTE",
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        mesa: true,
        qrHash: true,
        checkInTime: true,
        status: true,
        video: true,
        localVideo: true,
        cant_acompanantes: true,
      },
    });

    await syncEventAttendance(eventId);

    await emitGuestCheckinVideoIfAvailable(eventId, updated);

    return { alreadyIn: false, guest: updated };
  },
};
