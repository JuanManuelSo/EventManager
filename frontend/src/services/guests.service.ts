import type { Guest, PaginatedResponse, EventStats } from '../types';
import { MOCK_GUESTS, MOCK_EVENTS } from '../mocks/data';
import { sleep, percentage } from '../lib/utils';

const USE_MOCK = true;

export const guestsService = {
  async getByEvent(
    eventId: string,
    options: { page?: number; pageSize?: number; search?: string; status?: string } = {}
  ): Promise<PaginatedResponse<Guest>> {
    if (USE_MOCK) {
      await sleep(500);
      let guests = MOCK_GUESTS[eventId] ?? [];

      if (options.search) {
        const q = options.search.toLowerCase();
        guests = guests.filter(
          (g) =>
            g.firstName.toLowerCase().includes(q) ||
            g.lastName.toLowerCase().includes(q) ||
            g.email?.toLowerCase().includes(q) ||
            g.tableNumber?.toLowerCase().includes(q)
        );
      }

      if (options.status && options.status !== 'all') {
        if (options.status === 'checked_in') {
          guests = guests.filter((g) => g.checkedIn);
        } else {
          guests = guests.filter((g) => g.status === options.status);
        }
      }

      const page = options.page ?? 1;
      const pageSize = options.pageSize ?? 10;
      const total = guests.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const data = guests.slice(start, start + pageSize);

      return { data, total, page, pageSize, totalPages };
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.get<PaginatedResponse<Guest>>(
      `/events/${eventId}/guests`,
      { params: options }
    );
    return data;
  },

  async getStats(eventId: string): Promise<EventStats> {
    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[eventId] ?? [];
      const total = guests.length;
      const present = guests.filter((g) => g.checkedIn).length;
      const confirmed = guests.filter((g) => g.status === 'confirmed').length;
      const pending = guests.filter((g) => g.status === 'pending').length;
      const declined = guests.filter((g) => g.status === 'declined').length;

      return {
        total,
        present,
        confirmed,
        pending,
        declined,
        percentage: percentage(present, total),
        byHour: [
          { hour: '17h', count: 12 },
          { hour: '18h', count: 35 },
          { hour: '19h', count: 68 },
          { hour: '20h', count: 45 },
          { hour: '21h', count: 22 },
        ],
      };
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.get<EventStats>(`/events/${eventId}/guests/stats`);
    return data;
  },

  async checkin(eventId: string, qrCode: string): Promise<Guest> {
    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[eventId] ?? [];
      const guest = guests.find((g) => g.qrCode === qrCode);
      if (!guest) throw new Error('QR no encontrado');
      if (guest.checkedIn) throw new Error('El invitado ya realizó su check-in');

      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();

      const event = MOCK_EVENTS.find((e) => e.id === eventId);
      if (event) event.checkedInCount += 1;

      return guest;
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.post<Guest>(`/events/${eventId}/checkin`, { qrCode });
    return data;
  },

  async manualCheckin(eventId: string, guestId: string): Promise<Guest> {
    if (USE_MOCK) {
      await sleep(300);
      const guests = MOCK_GUESTS[eventId] ?? [];
      const guest = guests.find((g) => g.id === guestId);
      if (!guest) throw new Error('Invitado no encontrado');
      if (guest.checkedIn) throw new Error('El invitado ya realizó su check-in');

      guest.checkedIn = true;
      guest.checkedInAt = new Date().toISOString();

      const event = MOCK_EVENTS.find((e) => e.id === eventId);
      if (event) event.checkedInCount += 1;

      return guest;
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.post<Guest>(`/events/${eventId}/guests/${guestId}/checkin`);
    return data;
  },

  async bulkCreate(eventId: string, rows: Partial<Guest>[]): Promise<{ created: number }> {
    if (USE_MOCK) {
      await sleep(1000);
      const guests = MOCK_GUESTS[eventId] ?? [];
      let created = 0;

      rows.forEach((row, i) => {
        guests.push({
          id: `g${eventId}-import-${Date.now()}-${i}`,
          eventId,
          firstName: row.firstName ?? 'Nombre',
          lastName: row.lastName ?? 'Apellido',
          email: row.email,
          phone: row.phone,
          qrCode: `QR-${eventId}-IMP-${Date.now()}-${i}`,
          tableNumber: row.tableNumber,
          status: 'pending',
          checkedIn: false,
        });
        created++;
      });

      const event = MOCK_EVENTS.find((e) => e.id === eventId);
      if (event) event.guestCount += created;

      return { created };
    }

    const { default: api } = await import('../lib/api');
    const { data } = await api.post(`/events/${eventId}/guests/bulk`, { guests: rows });
    return data;
  },

  async sendInvitations(eventId: string, guestIds: string[]): Promise<{ sent: number }> {
    if (USE_MOCK) {
      await sleep(1200);
      return { sent: guestIds.length };
    }
    const { default: api } = await import('../lib/api');
    const { data } = await api.post(`/events/${eventId}/invitations`, { guestIds });
    return data;
  },
};
