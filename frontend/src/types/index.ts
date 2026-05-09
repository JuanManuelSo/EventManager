export type EventStatus = 'draft' | 'active' | 'done';
export type GuestStatus = 'pending' | 'confirmed' | 'declined';
export type UserRole = 'admin' | 'staff' | 'scanner';
export type InvitationChannel = 'email' | 'whatsapp' | 'link';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Event {
  id: string;
  creatorId: string;
  name: string;
  date: string;
  location: string;
  type: string;
  salon?: string;
  coverImageUrl?: string;
  status: EventStatus;
  capacity?: number;
  guestCount: number;
  checkedInCount: number;
  createdAt: string;
}

export interface Guest {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  qrCode: string;
  tableNumber?: string;
  status: GuestStatus;
  checkedIn: boolean;
  checkedInAt?: string;
  invitedAt?: string;
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
  guestId: string;
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
