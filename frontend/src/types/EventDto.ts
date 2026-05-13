import type { EventStatus } from ".";

export interface CreateEventDTO {
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon: string;
  coverImage?: string;
  status: EventStatus;
  cant_invitados?: number;
}
