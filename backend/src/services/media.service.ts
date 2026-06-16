import { prisma } from "../lib/prisma.js";
import { uploadVideo, uploadImage, deleteMedia } from "../lib/cloudinary.js";

export const mediaService = {
  async getByEvent(eventId: number) {
    return prisma.eventMedia.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(eventId: number, mediaId: number) {
    const media = await prisma.eventMedia.findFirst({
      where: { id: mediaId, eventId },
    });
    if (!media) {
      const error = new Error("Media no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }
    return media;
  },

  async upload(
    eventId: number,
    filePath: string,
    originalName: string,
    nombre: string,
    tipo: string,
    mesa?: number | null,
  ) {
    const publicId = `event_${eventId}_${Date.now()}`;

    const {
      url,
      publicId: cloudId,
      duration,
      format,
    } = await uploadVideo(filePath, publicId);

    return prisma.eventMedia.create({
      data: {
        eventId,
        publicId: cloudId,
        videoUrl: url,
        nombre: nombre || originalName,
        tipo,
        mesa: mesa ?? null,
        formato: format,
        duracion: Math.round(duration),
      },
    });
  },

  async delete(eventId: number, mediaId: number) {
    const media = await this.getById(eventId, mediaId);

    await deleteMedia(media.publicId);

    await prisma.eventMedia.delete({ where: { id: mediaId } });

    return { deleted: true };
  },

  async uploadQrCard(eventId: number, filePath: string, originalName: string) {
    const { url, publicId } = await uploadImage(
      filePath,
      `event_${eventId}_qr_card`,
    );

    const event = await prisma.event.update({
      where: { id_evento: eventId },
      data: { invitationBaseImageUrl: url },
    });

    return { url: event.invitationBaseImageUrl };
  },

  //Actualziar slot de QR Card
  async updateQrCardSlot(
    eventId: number,
    slot: { x: number; y: number; size: number },
  ) {
    const event = await prisma.event.update({
      where: { id_evento: eventId },
      data: {
        invitationQrX: slot.x,
        invitationQrY: slot.y,
        invitationQrSize: slot.size,
      },
      select: {
        invitationBaseImageUrl: true,
        invitationQrX: true,
        invitationQrY: true,
        invitationQrSize: true,
      },
    });

    return {
      url: event.invitationBaseImageUrl,
      slot: {
        x: event.invitationQrX,
        y: event.invitationQrY,
        size: event.invitationQrSize,
      },
    };
  },

  //Obtener QR Card y slot
  async getQrCard(eventId: number) {
    const event = await prisma.event.findUnique({
      where: { id_evento: eventId },
      select: {
        invitationBaseImageUrl: true,
        invitationQrX: true,
        invitationQrY: true,
        invitationQrSize: true,
      },
    });
    return {
      url: event?.invitationBaseImageUrl ?? null,
      slot: {
        x: event?.invitationQrX ?? null,
        y: event?.invitationQrY ?? null,
        size: event?.invitationQrSize ?? null,
      },
    };
  },
};
