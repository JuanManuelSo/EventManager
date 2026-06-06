export type EventStatus = "ACTIVO" | "FINALIZADO";
export type GuestStatus = "Pendiente" | "Presente" | "Ausente";
export type InvitationChannel = "email" | "whatsapp" | "link";

export interface User {
  id: number;
  nombre: string;
  email: string;
  createdAt: string;
}

export interface Event {
  id_evento: number;
  nombre: string;
  fecha: string;
  locacion: string;
  tipo: string;
  salon: string;
  coverImage?: string;
  Estado: EventStatus;
  cant_invitados?: number;

  checkedInCount: number;
  porcentajeAsistencia: number; //Porcentaje de asistencia calculado con cant_invitados y checkedInCount

  ownerId?: number;

  createdAt: string;
}

export interface Guest {
  id: number;
  eventId: number;
  documento: string;
  nombre: string;
  apellido: string;
  email?: string;
  telefono?: string;
  numero?: string;
  qrHash: string;
  mesa?: string;
  cant_acompanantes?: number;
  invitacionEnviada: boolean;
  status: GuestStatus;
  video?: string | null;

  checkedInAt?: string;
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

export interface EventMedia {
  id: number;
  eventId: number;
  publicId: string;
  videoUrl: string;
  nombre: string;
  tipo: "individual" | "con_acompanantes" | "general";
  mesa: number | null;
  formato: string | null;
  duracion: number | null;
  createdAt: string;
  updatedAt: string;
}
