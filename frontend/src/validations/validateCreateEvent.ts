import { z } from "zod";

export const createEventSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre es demasiado largo"),

  fecha: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Fecha inválida",
    }),

  locacion: z.string().min(5, "La ubicación debe ser más específica"),

  tipo: z.string().min(1, "El tipo es obligatorio"),

  salon: z.string().max(100).nullish().or(z.literal("")),

  cant_invitados: z
    .number("Debe ser un número")
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo")
    .optional(),

  coverImage: z
    .string()
    .url("URL de imagen inválida")
    .nullish()
    .or(z.literal("")),

  status: z.enum(["Activo", "Finalizado"]),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type CreateEventOutput = z.infer<typeof createEventSchema>;
