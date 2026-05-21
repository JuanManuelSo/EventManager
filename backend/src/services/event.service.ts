import { prisma } from "../lib/prisma.js";
import { CreateEventInput } from "../validations/event.validation.js";

type CreateEventServiceInput = CreateEventInput & {
  ownerId: number;
};

export const eventService = {
  async create(input: CreateEventServiceInput) {
    const event = await prisma.event.create({
      data: {
        nombre: input.nombre,
        fecha: new Date(input.fecha),
        locacion: input.locacion,
        tipo: input.tipo,
        salon: input.salon ?? "",
        cant_invitados: input.cant_invitados,
        coverImage: input.coverImage,

        owner: {
          connect: {
            id: input.ownerId,
          },
        },
      },
    });
    return event;
  },
  async getById(id: number) {
    const event = await prisma.event.findUnique({
      where: { id_evento: id },
    });

    return event;
  },
  async getEventByUser(id: number) {
    const events = await prisma.event.findMany({
      where: { ownerId: id },
      select: {
        id_evento: true,
        nombre: true,
        fecha: true,
        locacion: true,
        tipo: true,
        Estado: true,
        cant_invitados: true,
        coverImage: true,
        checkedInCount: true,
        porcentajeAsistencia: true,
      },
    });
    return events;
  },
};
