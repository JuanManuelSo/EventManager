import { prisma } from "../lib/prisma.js";

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
  };
}

export const checkinService = {
  /**
   * Check-in por QR hash
   * El string que llega del scanner es "QR-<hash>", lo limpiamos acá
   */
  async scanQR(eventId: number, raw: string): Promise<CheckinResult> {
    const guest = await prisma.guest.findFirst({
      where: { qrHash: raw, eventId },
    });

    if (!guest) {
      throw new Error("QR inválido — invitado no encontrado.");
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
    });

    return { alreadyIn: false, guest: updated };
  },

  /**
   * Check-in manual por ID (búsqueda desde el frontend)
   */
  async checkinById(eventId: number, guestId: number): Promise<CheckinResult> {
    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
    });

    if (!guest) {
      throw new Error("Invitado no encontrado.");
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
    });

    return { alreadyIn: false, guest: updated };
  },
};
