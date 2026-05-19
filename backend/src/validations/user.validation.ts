import { z } from "zod";

// Schema del body esperado para crear un usuario
export const createUserSchema = z.object({
  body: z.object({
    email: z
      .string({ error: "El email es requerido" })
      .email("El email no tiene formato válido")
      .toLowerCase(),

    contrasena: z
      .string({ error: "La contraseña es requerida" })
      .min(8, "La contraseña debe tener al menos 8 caracteres"),

    nombre: z
      .string({ error: "El nombre es requerido" })
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(100),
  }),
});

// Tipo TypeScript inferido del schema — en el controller
export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
