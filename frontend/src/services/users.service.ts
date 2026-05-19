import type { User } from "../types";
import { sleep } from "../lib/utils";

const USE_MOCK = false;

const MOCK_USERS: User[] = [
  {
    id: 1,
    email: "admin@eventmanager.com",
    nombre: "Administrador",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: "soporte@eventmanager.com",
    nombre: "Soporte Técnico",
    createdAt: new Date().toISOString(),
  },
];

export const usersService = {
  async getAll(): Promise<User[]> {
    if (USE_MOCK) {
      await sleep(600);
      return MOCK_USERS;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  async getById(id: number): Promise<User> {
    if (USE_MOCK) {
      await sleep(400);
      const user = MOCK_USERS.find((u) => u.id === id);
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async getByEmail(email: string): Promise<User | null> {
    if (USE_MOCK) {
      await sleep(400);
      return MOCK_USERS.find((u) => u.email === email) ?? null;
    }
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User>(`/users/email/${email}`);
    return data;
  },

  async delete(id: number): Promise<void> {
    if (USE_MOCK) {
      await sleep(500);
      const idx = MOCK_USERS.findIndex((u) => u.id === id);
      if (idx !== -1) MOCK_USERS.splice(idx, 1);
      return;
    }
    const { default: api } = await import("../lib/api");
    await api.delete(`/users/${id}`);
  },
};
