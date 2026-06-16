import type { EventMedia } from "../types";

export const mediaService = {
  async getByEvent(eventId: number): Promise<EventMedia[]> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get(`/events/${eventId}/media`);
    return data.data;
  },

  async upload(
    eventId: number,
    file: File,
    nombre: string,
    tipo: string,
    mesa?: number | null,
  ): Promise<EventMedia> {
    const { default: api } = await import("../lib/api");
    const formData = new FormData();
    formData.append("video", file);
    formData.append("nombre", nombre);
    formData.append("tipo", tipo);
    if (mesa !== undefined && mesa !== null) {
      formData.append("mesa", String(mesa));
    }
    const { data } = await api.post(`/events/${eventId}/media/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000,
    });
    return data.data;
  },

  async delete(eventId: number, mediaId: number): Promise<void> {
    const { default: api } = await import("../lib/api");
    await api.delete(`/events/${eventId}/media/${mediaId}`);
  },

  async getQrCard(eventId: number): Promise<{
    url: string | null;
    slot: { x: number | null; y: number | null; size: number | null };
  }> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get(`/events/${eventId}/media/qr-card`);
    return data.data;
  },

  async uploadQrCard(eventId: number, file: File): Promise<{ url: string }> {
    const { default: api } = await import("../lib/api");
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await api.post(`/events/${eventId}/media/qr-card`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  },

  async updateQrCardSlot(
    eventId: number,
    slot: { x: number; y: number; size: number },
  ): Promise<{
    url: string | null;
    slot: { x: number | null; y: number | null; size: number | null };
  }> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.put(`/events/${eventId}/media/qr-card/slot`, slot);
    return data.data;
  },
};
