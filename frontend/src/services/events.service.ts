import type { Event, User, DashboardStats } from "../types";
import type { CreateEventDTO } from "../types/EventDto";
import { MOCK_EVENTS, MOCK_DASHBOARD_STATS } from "../mocks/data";
import { sleep } from "../lib/utils";

const USE_MOCK = true;

type ApiResponse<T> = {
  status: string;
  data: T;
};

export const eventsService = {
  async getAll(): Promise<Event[]> {
    if (USE_MOCK) {
      await sleep(600);
      return MOCK_EVENTS;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<Event[]>("/events");
    return data;
  },

  async getById(id: number): Promise<Event> {
    // if (USE_MOCK) {
    //   await sleep(400);
    //   const event = MOCK_EVENTS.find((e) => e.id_evento === id);
    //   if (!event) throw new Error("Evento no encontrado");
    //   return event;
    // }
    const { default: api } = await import("../lib/api");
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_MOCK) {
      await sleep(300);
      return MOCK_DASHBOARD_STATS;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<DashboardStats>("/events/stats/dashboard");
    return data;
  },

  async create(data: CreateEventDTO): Promise<Event> {
    const payload = {
      ...data,
      // Convertir a ISO completo con timezone
      fecha: new Date(data.fecha).toISOString(),
    };

    const { default: api } = await import("../lib/api");
    const { data: res } = await api.post<{ data: Event }>("/events", payload);
    return res.data;
  },

  async update(id: number, payload: Partial<Event>): Promise<Event> {
    if (USE_MOCK) {
      await sleep(500);
      const idx = MOCK_EVENTS.findIndex((e) => e.id_evento === id);
      if (idx === -1) throw new Error("Evento no encontrado");
      MOCK_EVENTS[idx] = { ...MOCK_EVENTS[idx], ...payload };
      return MOCK_EVENTS[idx];
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.patch<Event>(`/events/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    if (USE_MOCK) {
      await sleep(400);
      const idx = MOCK_EVENTS.findIndex((e) => e.id_evento === id);
      if (idx !== -1) MOCK_EVENTS.splice(idx, 1);
      return;
    }
    const { default: api } = await import("../lib/api");
    await api.delete(`/events/${id}`);
  },

  async getEventByUser(): Promise<Event[]> {
    // if (USE_MOCK) {
    //   await sleep(400);
    //   const events = MOCK_EVENTS.filter((e) => e.ownerId === id);
    //   return events;
    // }

    const { default: api } = await import("../lib/api");
    const response = await api.get<ApiResponse<Event[]>>(`/events`);

    return response.data.data;
  },
};
