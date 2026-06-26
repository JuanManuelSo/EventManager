import type { Guest, PaginatedResponse, EventStats } from "../types";

export const guestsService = {
  async getByEvent(
    eventId: number,
    options: {
      page?: number;
      pageSize?: number;
      search?: string;
      status?: string;
    } = {},
  ): Promise<PaginatedResponse<Guest>> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<PaginatedResponse<Guest>>(
      `/events/${eventId}/guests`,
      { params: options },
    );
    return data;
  },

  async getStats(eventId: number): Promise<EventStats> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<EventStats>(
      `/events/${eventId}/guests/stats`,
    );
    return data;
  },

  async checkin(eventId: number, qrCode: string): Promise<Guest> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post<Guest>(`/events/${eventId}/checkin`, {
      qrCode,
    });
    return data;
  },

  async manualCheckin(eventId: number, guestId: number): Promise<Guest> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post<Guest>(
      `/events/${eventId}/guests/${guestId}/checkin`,
    );
    return data;
  },

  async bulkCreate(
    eventId: number,
    rows: Partial<Guest>[],
  ): Promise<{ created: number; guests: Guest[] }> {
    const { default: api } = await import("../lib/api");
    console.log("Payload enviado:", JSON.stringify({ guests: rows }, null, 2));

    const { data } = await api.post(`/events/${eventId}/guests/bulk`, {
      guests: rows,
    });
    return data;
  },

  async create(eventId: number, guest: Partial<Guest>): Promise<Guest> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post(`/events/${eventId}/guests`, guest);
    return data.data;
  },

  async sendInvitations(
    eventId: number,
    guestIds: string[],
  ): Promise<{ sent: number }> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post(`/events/${eventId}/invitations`, {
      guestIds,
    });
    return data;
  },

  async generateQrs(eventId: number): Promise<{
    eventId: number;
    qrJobStatus: "PROCESSING";
    total: number;
  }> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post(`/events/${eventId}/guests/qr/generate`);
    return data.data;
  },

  async downloadQrs(eventId: number): Promise<Blob> {
    const { default: api } = await import("../lib/api");
    const response = await api.get(`/events/${eventId}/guests/qr/download`, {
      responseType: "blob",
    });
    return response.data as Blob;
  },

  async generateGuestQr(eventId: number, guestId: number): Promise<Blob> {
    const { default: api } = await import("../lib/api");
    const response = await api.get(`/events/${eventId}/guests/${guestId}/qr`, {
      responseType: "blob",
    });
    return response.data as Blob;
  },

  async delete(eventId: number, guestId: number): Promise<void> {
    const { default: api } = await import("../lib/api");
    const response = await api.delete(`/events/${eventId}/guests/${guestId}`);
    return response.data;
  },

  async updateGuest(
    eventId: number,
    guestId: number,
    data: { video?: string | null },
  ): Promise<Guest> {
    const { default: api } = await import("../lib/api");
    const response = await api.put(
      `/events/${eventId}/guests/${guestId}`,
      data,
    );
    return response.data.data;
  },

  async bulkAssignVideo(
    eventId: number,
    payload: {
      videoUrl: string;
      mesa?: string | null;
      tipo?: "individual" | "con_acompanantes" | "todos";
    },
  ): Promise<{ updated: number }> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.post(
      `/events/${eventId}/guests/bulk-assign-video`,
      payload,
    );
    return data;
  },
};
