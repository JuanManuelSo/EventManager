import type { Event, Guest, User, DashboardStats } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Martín González',
  email: 'admin@eventmanager.com',
  role: 'admin',
};

export const MOCK_EVENTS: Event[] = [
  {
    id: 'ev1',
    creatorId: 'u1',
    name: 'Boda de Fernandez & Lopez',
    date: '2026-07-11T19:00:00.000Z',
    location: 'Hotel Colonial, San Nicolás de los Arroyos',
    type: 'Boda',
    salon: 'La Reja del Sol',
    coverImageUrl:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    status: 'active',
    capacity: 350,
    guestCount: 330,
    checkedInCount: 182,
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  {
    id: 'ev2',
    creatorId: 'u1',
    name: 'Boda de Fernandez & Lopez',
    date: '2026-07-11T19:00:00.000Z',
    location: 'Hotel Colonial, San Nicolás de los Arroyos',
    type: 'Boda',
    salon: 'Salón Principal',
    coverImageUrl:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    status: 'active',
    capacity: 350,
    guestCount: 330,
    checkedInCount: 147,
    createdAt: '2026-01-20T10:00:00.000Z',
  },
  {
    id: 'ev3',
    creatorId: 'u1',
    name: 'Boda de Fernandez & Lopez',
    date: '2026-07-11T19:00:00.000Z',
    location: 'Hotel Colonial, San Nicolás de los Arroyos',
    type: 'Boda',
    salon: 'Jardín de Invierno',
    coverImageUrl:
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80',
    status: 'active',
    capacity: 350,
    guestCount: 330,
    checkedInCount: 95,
    createdAt: '2026-02-01T10:00:00.000Z',
  },
];

const FIRST_NAMES = [
  'Juan Manuel', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego',
  'Valentina', 'Roberto', 'Sofía', 'Martín', 'Lucía', 'Nicolás', 'Camila',
  'Alejandro', 'Paula', 'Fernando', 'Florencia', 'Sebastián', 'Agustina',
];

const LAST_NAMES = [
  'Sosa', 'García', 'Martínez', 'López', 'González', 'Rodríguez', 'Pérez',
  'Fernández', 'Álvarez', 'Torres', 'Ramírez', 'Flores', 'Acosta', 'Medina',
  'Romero', 'Herrera', 'Morales', 'Gutiérrez', 'Ortega', 'Castro',
];

function buildGuests(eventId: string, count: number): Guest[] {
  const guests: Guest[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const isCheckedIn = i < 182;
    const status: Guest['status'] = i < 220 ? 'confirmed' : i < 310 ? 'pending' : 'declined';
    const tableNum = Math.floor(i / 8) + 1;

    guests.push({
      id: `g${eventId}-${i}`,
      eventId,
      firstName,
      lastName,
      email: `${firstName.toLowerCase().replace(' ', '.')}${i}@gmail.com`,
      phone: `+54 11 ${4000 + i}-${1000 + i}`,
      qrCode: `QR-${eventId}-${i.toString().padStart(4, '0')}`,
      tableNumber: `Mesa ${tableNum}`,
      status,
      checkedIn: isCheckedIn,
      checkedInAt: isCheckedIn
        ? new Date(Date.now() - (182 - i) * 3 * 60000).toISOString()
        : undefined,
    });
  }
  return guests;
}

export const MOCK_GUESTS: Record<string, Guest[]> = {
  ev1: buildGuests('ev1', 330),
  ev2: buildGuests('ev2', 330),
  ev3: buildGuests('ev3', 330),
};

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalEvents: 12,
  totalGuests: 1890,
  averageAttendance: 89,
};

// Simulate valid credentials
export const VALID_CREDENTIALS = [
  { email: 'admin@eventmanager.com', password: '123456' },
  { email: 'admin', password: '123456' },
];
