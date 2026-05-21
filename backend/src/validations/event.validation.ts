import { z } from "zod";

export const createEventSchema = z.object({
  nombre: z.string().min(1, "El nombre del evento es requerido"),
  fecha: z
    .string()
    .min(1, "La fecha es requerida")
    .datetime("Formato de fecha y hora inválido"), // Espera un string en formato ISO para datetime-local
  locacion: z.string().min(1, "La ubicación es requerida"),
  tipo: z.string().min(1, "El tipo de evento es requerido"),
  salon: z.string(), // Se asume opcional ya que en el frontend se maneja con `?? ""`
  cant_invitados: z
    .number()
    .min(0, "La cantidad de invitados no puede ser negativa")
    .int("Debe ser un número entero"),
  coverImage: z.string().optional(), // La imagen de portada es opcional
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
