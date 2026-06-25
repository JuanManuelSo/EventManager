import type { Event, DashboardStats } from "../types";
import type { CreateEventDTO, UpdateEventDTO } from "../types/EventDto";

type ApiResponse<T> = {
  status: string;
  data: T;
};

export const eventsService = {
  async getAll(): Promise<Event[]> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<Event[]>("/events");
    return data;
  },

  async getById(id: number): Promise<Event> {
    const { default: api } = await import("../lib/api");
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<{
      status: string;
      data: DashboardStats;
    }>("/events/stats");

    return data.data;
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

  async update(id: number, payload: UpdateEventDTO): Promise<Event> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.put<Event>(`/events/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    const { default: api } = await import("../lib/api");
    await api.delete(`/events/${id}`);
  },

  async getEventByUser(): Promise<Event[]> {
    const { default: api } = await import("../lib/api");
    const response = await api.get<ApiResponse<Event[]>>(`/events`);

    return response.data.data;
  },

  async getStats(): Promise<{
    totalEvents: number;
  }> {
    const { default: api } = await import("../lib/api");

    const { data } = await api.get("/events/stats");

    return data.data;
  },
};
