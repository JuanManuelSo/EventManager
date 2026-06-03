import type { CheckinResult } from "../types";
import api from "../lib/api";

export const checkinService = {
  /**
   * Receives the raw QR code string scanned from the camera.
   * Backend does: UPDATE guests SET checked_in=true WHERE qr_code=$1 AND checked_in=false RETURNING *
   * If 0 rows → already checked in (409).
   */
  async scanQR(qrHash: string, eventId: number): Promise<CheckinResult> {
    const { data } = await api.post<CheckinResult>(`/checkin/${eventId}/scan`, {
      qrCode: qrHash,
    });
    return data;
  },

  /**
   * Manual check-in by guest ID (fallback when QR can't be scanned)
   */
  async checkinById(guestId: number, eventId: number): Promise<CheckinResult> {
    const { data } = await api.post<CheckinResult>(
      `/checkin/${eventId}/manual`,
      { guestId },
    );
    return data;
  },
};
