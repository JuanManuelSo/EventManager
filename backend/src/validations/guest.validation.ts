import { z } from "zod";

export const guestImportRowSchema = z.object({
  documento: z.string().min(1, "Documento es requerido"),
  nombre: z.string().min(1, "Nombre es requerido"),
  apellido: z.string().min(1, "Apellido es requerido"),
  email: z.string().optional(),
  numero: z.string().optional(),
  mesa: z.string().optional(),
  status: z.enum(["Pendiente", "Presente", "Ausente"]).optional(),
  cant_acompanantes: z.coerce.number().int().min(0).optional(),
});

export const bulkCreateGuestsSchema = z.object({
  guests: z
    .array(guestImportRowSchema)
    .min(1, "Debe incluir al menos un invitado"),
});

export type GuestImportInput = z.infer<typeof guestImportRowSchema>;
