import type { Event, DashboardStats } from "../types";
import { MOCK_EVENTS, MOCK_DASHBOARD_STATS } from "../mocks/data";
import { sleep } from "../lib/utils";

const USE_MOCK = true;

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
    if (USE_MOCK) {
      await sleep(400);
      const event = MOCK_EVENTS.find((e) => e.id_evento === id);
      if (!event) throw new Error("Evento no encontrado");
      return event;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
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

  async create(payload: Partial<Event>): Promise<Event> {
    if (USE_MOCK) {
      await sleep(700);
      const newEvent: Event = {
        id_evento: MOCK_EVENTS.length + 1,
        nombre: payload.nombre ?? "Nuevo Evento",
        fecha: payload.fecha ?? new Date().toISOString(),
        locacion: payload.locacion ?? "",
        tipo: payload.tipo ?? "General",
        salon: payload.salon ?? "",
        coverImage: payload.coverImage,
        status: "Activo",
        cant_invitados: payload.cant_invitados ?? 0,
        checkedInCount: 0,
        porcentajeAsistencia: 0,
        createdAt: new Date().toISOString(),
      };
      MOCK_EVENTS.push(newEvent);
      return newEvent;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.post<Event>("/events", payload);
    return data;
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
};
