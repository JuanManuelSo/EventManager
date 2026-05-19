import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import type { CreateUserInput } from "../validations/user.validation.js";

const SALT_ROUNDS = 12;

export const userService = {
  async create(input: CreateUserInput) {
    // 1. Verificar que el email no exista
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      // Error con código para que el controller lo maneje
      const error = new Error("El email ya está registrado") as any;
      error.statusCode = 409; // Conflict
      throw error;
    }

    // 2. Hashear la contraseña — NUNCA se guarda en texto plano
    const hashedPassword = await bcrypt.hash(input.contrasena, SALT_ROUNDS);

    // 3. Crear en DB
    const user = await prisma.user.create({
      data: {
        email: input.email,
        contrasena: hashedPassword,
        nombre: input.nombre,
      },
      // select: nunca devolvemos la contraseña al cliente
      select: {
        id: true,
        email: true,
        nombre: true,
        createdAt: true,
      },
    });

    return user;
  },

  async findAll() {
    return prisma.user.findMany({
      select: { id: true, email: true, nombre: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, nombre: true, createdAt: true },
    });

    if (!user) {
      const error = new Error("Usuario no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    return user;
  },

  async delete(id: number) {
    //Verificar que exista
    await this.findById(id);

    await prisma.user.delete({
      where: { id },
    });

    return { message: "Usuario eliminado correctamente" };
  },
};
