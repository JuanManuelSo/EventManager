import type { EventStatus } from ".";

export interface Event {
  id_evento: number;
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon?: string;
  coverImage?: string;
  status: EventStatus;
  cant_invitados?: number;
  guestCount: number;
  checkedInCount: number;

  createdAt: string;
}

export interface CreateEventDTO {
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon?: string;
  coverImage?: string;
  status: EventStatus;
  cant_invitados?: number;
}
