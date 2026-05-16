import type { CheckinResult } from "../types";
import { MOCK_GUESTS } from "../mocks/guests";
import { sleep } from "../lib/utils";
import api from "../lib/api";

const USE_MOCK = true;

export const checkinService = {
  /**
   * Receives the raw QR code string scanned from the camera.
   * Backend does: UPDATE guests SET checked_in=true WHERE qr_code=$1 AND checked_in=false RETURNING *
   * If 0 rows → already checked in (409).
   */
  async scanQR(qrHash: string, eventId: number): Promise<CheckinResult> {
    if (USE_MOCK) {
      await sleep(600);

      const guest = MOCK_GUESTS.find(
        (g) =>
          g.qrHash === qrHash && g.eventId.toString() === eventId.toString(),
      );

      if (!guest) throw new Error("QR inválido — invitado no encontrado.");

      // Anti-duplicate: already checked in
      if (guest.checkedIn) {
        return { guest, alreadyIn: true };
      }

      // Mark as checked in (mutate mock in memory)
      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();

      return { guest, alreadyIn: false };
    }

    const { data } = await api.post<CheckinResult>(
      `/events/${eventId}/checkin`,
      { qrHash },
    );
    return data;
  },

  /**
   * Manual check-in by guest ID (fallback when QR can't be scanned)
   */
  async checkinById(guestId: number, eventId: number): Promise<CheckinResult> {
    if (USE_MOCK) {
      await sleep(400);
      const guest = MOCK_GUESTS.find(
        (g) => g.id === guestId && g.eventId === eventId,
      );
      if (!guest) throw new Error("Invitado no encontrado.");
      if (guest.checkedIn) return { guest, alreadyIn: true };
      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();
      return { guest, alreadyIn: false };
    }
    const { data } = await api.post<CheckinResult>(
      `/events/${eventId}/checkin`,
      { guestId },
    );
    return data;
  },
};
