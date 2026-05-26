import type { Event, Guest, User, DashboardStats } from "../types";

export const MOCK_USER: User = {
  id: 1,
  nombre: "Martín González",
  email: "admin@eventmanager.com",
  createdAt: new Date().toISOString(),
};

const porcentaje = (cant_invitados: number, checkedInCount: number) => {
  if (cant_invitados === 0) return 0;
  return Math.round((checkedInCount / cant_invitados) * 100);
};

export const MOCK_EVENTS: Event[] = [
  {
    id_evento: 1,
    nombre: "Boda de Fernandez & Lopez",
    fecha: "2026-07-11T19:00:00.000Z",
    locacion: "Hotel Colonial, San Nicolás de los Arroyos",
    tipo: "Boda",
    salon: "La Reja del Sol",
    coverImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    Estado: "ACTIVO",
    cant_invitados: 350,
    checkedInCount: 182,
    porcentajeAsistencia: porcentaje(350, 182),
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id_evento: 2,
    nombre: "Boda de Fernandez & Lopez",
    fecha: "2026-07-11T19:00:00.000Z",
    locacion: "Hotel Colonial, San Nicolás de los Arroyos",
    tipo: "Boda",
    salon: "Salón Principal",
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    Estado: "ACTIVO",
    cant_invitados: 350,
    checkedInCount: 147,
    porcentajeAsistencia: porcentaje(350, 147),
    createdAt: "2026-01-20T10:00:00.000Z",
  },
  {
    id_evento: 3,
    nombre: "Boda de Fernandez & Lopez",
    fecha: "2026-07-11T19:00:00.000Z",
    locacion: "Hotel Colonial, San Nicolás de los Arroyos",
    tipo: "Boda",
    salon: "Jardín de Invierno",
    coverImage:
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
    Estado: "ACTIVO",
    cant_invitados: 350,
    checkedInCount: 95,
    porcentajeAsistencia: porcentaje(350, 95),
    createdAt: "2026-02-01T10:00:00.000Z",
  },
];

const FIRST_NAMES = [
  "Juan Manuel",
  "María",
  "Carlos",
  "Ana",
  "Pedro",
  "Laura",
  "Diego",
  "Valentina",
  "Roberto",
  "Sofía",
  "Martín",
  "Lucía",
  "Nicolás",
  "Camila",
  "Alejandro",
  "Paula",
  "Fernando",
  "Florencia",
  "Sebastián",
  "Agustina",
];

const LAST_NAMES = [
  "Sosa",
  "García",
  "Martínez",
  "López",
  "González",
  "Rodríguez",
  "Pérez",
  "Fernández",
  "Álvarez",
  "Torres",
  "Ramírez",
  "Flores",
  "Acosta",
  "Medina",
  "Romero",
  "Herrera",
  "Morales",
  "Gutiérrez",
  "Ortega",
  "Castro",
];

function buildGuests(eventId: number, count: number): Guest[] {
  const guests: Guest[] = [];
  for (let i = 0; i < count; i++) {
    const nombre = FIRST_NAMES[i % FIRST_NAMES.length];
    const apellido = LAST_NAMES[i % LAST_NAMES.length];
    const isCheckedIn = i < 182;
    const status: Guest["status"] =
      i < 220 ? "Presente" : i < 310 ? "Pendiente" : "Ausente";
    const tableNum = Math.floor(i / 8) + 1;

    guests.push({
      id: eventId,
      eventId,
      documento: `${eventId}-${i.toString().padStart(5, "0")}`,
      nombre,
      apellido,
      email: `${nombre.toLowerCase().replace(" ", ".")}${i}@gmail.com`,
      telefono: `+54 11 ${4000 + i}-${1000 + i}`,
      qrHash: `QR-${eventId}-${i.toString().padStart(4, "0")}`,
      mesa: `Mesa ${tableNum}`,
      status,
      checkedIn: isCheckedIn,
      invitacionEnviada: i < 310,
    });
  }
  return guests;
}

export const MOCK_GUESTS: Record<string, Guest[]> = {
  ev1: buildGuests(1, 330),
  ev2: buildGuests(2, 330),
  ev3: buildGuests(3, 330),
};

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalEvents: 12,
  totalGuests: 1890,
  averageAttendance: 89,
};

// Simulate valid credentials
export const VALID_CREDENTIALS = [
  { email: "admin@eventmanager.com", password: "123456" },
  { email: "admin", password: "123456" },
];
