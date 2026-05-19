import type { Guest, PaginatedResponse, EventStats } from "../types";
import { MOCK_GUESTS, MOCK_EVENTS } from "../mocks/data";
import { sleep, percentage } from "../lib/utils";

const USE_MOCK = true;

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
    const mockEventKey = `ev${eventId}`;

    if (USE_MOCK) {
      await sleep(500);
      let guests = MOCK_GUESTS[mockEventKey] ?? [];

      if (options.search) {
        const q = options.search.toLowerCase();
        guests = guests.filter(
          (g) =>
            g.nombre.toLowerCase().includes(q) ||
            g.apellido.toLowerCase().includes(q) ||
            g.email?.toLowerCase().includes(q) ||
            g.mesa?.toLowerCase().includes(q),
        );
      }

      if (options.status && options.status !== "all") {
        if (options.status === "checked_in") {
          guests = guests.filter((g) => g.checkedIn);
        } else {
          guests = guests.filter((g) => g.status === options.status);
        }
      }

      const page = options.page ?? 1;
      const pageSize =
        options.pageSize ?? (options.page === undefined ? guests.length : 10);
      const total = guests.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const data = guests.slice(start, start + pageSize);

      return { data, total, page, pageSize, totalPages };
    }

    const { default: api } = await import("../lib/api");
    const { data } = await api.get<PaginatedResponse<Guest>>(
      `/events/${eventId}/guests`,
      { params: options },
    );
    return data;
  },

  async getStats(eventId: number): Promise<EventStats> {
    const mockEventKey = `ev${eventId}`;

    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[mockEventKey] ?? [];
      const total = guests.length;
      const present = guests.filter((g) => g.checkedIn).length;
      const confirmed = guests.filter((g) => g.status === "Presente").length;
      const pending = guests.filter((g) => g.status === "Pendiente").length;
      const declined = guests.filter((g) => g.status === "Ausente").length;

      return {
        total,
        present,
        confirmed,
        pending,
        declined,
        percentage: percentage(present, total),
        byHour: [
          { hour: "17h", count: 12 },
          { hour: "18h", count: 35 },
          { hour: "19h", count: 68 },
          { hour: "20h", count: 45 },
          { hour: "21h", count: 22 },
        ],
      };
    }

    const { default: api } = await import("../lib/api");
    const { data } = await api.get<EventStats>(
      `/events/${eventId}/guests/stats`,
    );
    return data;
  },

  async checkin(eventId: number, qrCode: string): Promise<Guest> {
    const mockEventKey = `ev${eventId}`;

    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[mockEventKey] ?? [];
      const guest = guests.find((g) => g.qrHash === qrCode);
      if (!guest) throw new Error("QR no encontrado");
      if (guest.checkedIn)
        throw new Error("El invitado ya realizó su check-in");

      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();

      const event = MOCK_EVENTS.find((e) => e.id_evento === eventId);
      if (event) {
        event.checkedInCount += 1;
        event.porcentajeAsistencia = percentage(
          event.checkedInCount,
          event.cant_invitados ?? 0,
        );
      }

      return guest;
    }

    const { default: api } = await import("../lib/api");
    const { data } = await api.post<Guest>(`/events/${eventId}/checkin`, {
      qrCode,
    });
    return data;
  },

  async manualCheckin(eventId: number, guestId: number): Promise<Guest> {
    const mockEventKey = `ev${eventId}`;

    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[mockEventKey] ?? [];
      const guest = guests.find((g) => g.id === guestId);
      if (!guest) throw new Error("Invitado no encontrado");
      if (guest.checkedIn)
        throw new Error("El invitado ya realizó su check-in");

      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();

      const event = MOCK_EVENTS.find((e) => e.id_evento === eventId);
      if (event) {
        event.checkedInCount += 1;
        event.porcentajeAsistencia = percentage(
          event.checkedInCount,
          event.cant_invitados ?? 0,
        );
      }

      return guest;
    }

    const { default: api } = await import("../lib/api");
    const { data } = await api.post<Guest>(
      `/events/${eventId}/guests/${guestId}/checkin`,
    );
    return data;
  },

  async bulkCreate(
    eventId: number,
    rows: Partial<Guest>[],
  ): Promise<{ created: number }> {
    const mockEventKey = `ev${eventId}`;

    if (USE_MOCK) {
      await sleep(1000);
      const guests = MOCK_GUESTS[mockEventKey] ?? [];
      let created = 0;

      rows.forEach((row, i) => {
        guests.push({
          id: eventId,
          eventId: eventId,
          nombre: row.nombre ?? "Nombre",
          apellido: row.apellido ?? "Apellido",
          email: row.email,
          telefono: row.telefono,
          qrHash: `QR-${eventId}-IMP-${Date.now()}-${i}`,
          mesa: row.mesa,
          status: "Pendiente",
          checkedIn: false,
          invitacionEnviada: false,
        });
        created++;
      });

      const event = MOCK_EVENTS.find((e) => e.id_evento === eventId);
      if (event) event.cant_invitados = (event.cant_invitados ?? 0) + created;

      return { created };
    }

    const { default: api } = await import("../lib/api");
    const { data } = await api.post(`/events/${eventId}/guests/bulk`, {
      guests: rows,
    });
    return data;
  },

  async sendInvitations(
    eventId: number,
    guestIds: string[],
  ): Promise<{ sent: number }> {
    if (USE_MOCK) {
      await sleep(1200);
      return { sent: guestIds.length };
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.post(`/events/${eventId}/invitations`, {
      guestIds,
    });
    return data;
  },
};
