export type EventStatus = "Activo" | "Finalizado";
export type GuestStatus = "Pendiente" | "Presente" | "Ausente";
export type InvitationChannel = "email" | "whatsapp" | "link";

export interface User {
  id: string;
  nombre: string;
  email: string;
}

export interface Event {
  id_evento: number;
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon: string;
  coverImage?: string;
  status: EventStatus;
  cant_invitados?: number;

  checkedInCount: number;
  porcentajeAsistencia: number; //Porcentaje de asistencia calculado con cant_invitados y checkedInCount

  createdAt: string;
}

export interface Guest {
  id: number;
  eventId: number;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  qrHash: string;
  mesa?: string;
  cant_acompanantes?: number;
  invitacionEnviada: boolean;
  status: GuestStatus; //Estado del invitado: Pendiente, Presente, Ausente

  checkedInAt?: string; //Horario de check-in
  checkedIn: boolean;
}

export interface EventStats {
  total: number;
  present: number;
  confirmed: number;
  pending: number;
  declined: number;
  percentage: number;
  byHour: { hour: string; count: number }[];
}

export interface CheckinRecord {
  id: string;
  guestId: number;
  guestName: string;
  tableNumber?: string;
  initials: string;
  checkedInAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface DashboardStats {
  totalEvents: number;
  totalGuests: number;
  averageAttendance: number;
}

export interface CheckinResult {
  guest: Guest;
  alreadyIn: boolean;
}
