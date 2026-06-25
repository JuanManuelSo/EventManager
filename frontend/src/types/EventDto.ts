export interface CreateEventDTO {
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon: string;
  coverImage?: string;
  cant_invitados?: number;
  ownerId?: number;
  checkedInCount?: number;
  porcentajeAsistencia?: number;
}

export interface UpdateEventDTO {
  nombre?: string;
  fecha?: string;
  locacion?: string;
  tipo?: string;
  salon?: string;
  cant_invitados?: number;
}
