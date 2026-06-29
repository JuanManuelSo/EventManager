import { checkConnectivity } from "../lib/checkConnectivity.js";
import { getIo } from "../lib/socket.js";

type GuestVideoPayload = {
  id: number;
  nombre: string;
  apellido: string;
  mesa: string | null;
  video: string | null;
  localVideo: string | null;
};

export async function emitGuestCheckinVideoIfAvailable(
  eventId: number,
  guest: GuestVideoPayload,
) {
  try {
    if (!guest.video && !guest.localVideo) return;

    const isOnline = await checkConnectivity();
    const videoUrl = isOnline
      ? guest.video ?? guest.localVideo
      : guest.localVideo ?? guest.video;

    if (!videoUrl) return;

    getIo().to(`event:${eventId}:display`).emit("display:play_video", {
      guest: {
        id: guest.id,
        nombre: guest.nombre,
        apellido: guest.apellido,
        mesa: guest.mesa,
      },
      videoUrl,
    });
  } catch (error) {
    console.error("[checkin-video] Failed to emit display video", {
      eventId,
      guestId: guest.id,
      error,
    });
  }
}
