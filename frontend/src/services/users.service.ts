import type { User } from "../types";

export const usersService = {
  async getAll(): Promise<User[]> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User[]>("/users");
    return data;
  },

  async getById(id: number): Promise<User> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async getByEmail(email: string): Promise<User | null> {
    const { default: api } = await import("../lib/api");
    const { data } = await api.get<User>(`/users/email/${email}`);
    return data;
  },

  async delete(id: number): Promise<void> {
    const { default: api } = await import("../lib/api");
    await api.delete(`/users/${id}`);
  },
};
