import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const createGuestSchema = z.object({
  documento: z
    .string()
    .trim()
    .regex(
      /^[0-9]{7,8}$/,
      "El documento debe contener solo números y tener entre 7 y 8 dígitos",
    ),
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede superar 80 caracteres"),
  apellido: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(80, "El apellido no puede superar 80 caracteres"),
  email: z.string().trim().email("Email invalido").optional().or(z.literal("")),
  numero: z
    .string()
    .trim()
    .regex(/^[0-9+\-()\s]{7,20}$/i, "Telefono invalido")
    .optional()
    .or(z.literal("")),
  mesa: z
    .string()
    .trim()
    .max(40, "La mesa no puede superar 40 caracteres")
    .optional()
    .or(z.literal("")),
  cant_acompanantes: z
    .number()
    .int("Debe ser un numero entero")
    .min(0, "No puede ser negativo")
    .max(20, "Maximo 20 acompanantes"),
  videoUrl: z.string().optional().or(z.literal("")),
});

export type CreateGuestInput = z.infer<typeof createGuestSchema>;

export const createGuestResolver = zodResolver(createGuestSchema);
