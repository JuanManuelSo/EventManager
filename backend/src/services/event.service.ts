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
  async delete(eventId: number, ownerId: number) {
    const event = await prisma.event.findFirst({
      where: {
        id_evento: eventId,
        ownerId,
      },
    });

    if (!event) {
      const error = new Error("Evento no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    if (event.ownerId !== ownerId) {
      const error = new Error("No autorizado para eliminar este evento") as any;

      error.statusCode = 403;

      throw error;
    }

    await prisma.event.delete({
      where: {
        id_evento: eventId,
      },
    });

    return {
      success: true,
    };
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
  async getDashboardSummary(ownerId: number) {
    const [totalEvents, guests, attendance] = await Promise.all([
      prisma.event.count({
        where: { ownerId },
      }),

      prisma.event.aggregate({
        where: { ownerId },

        _sum: {
          cant_invitados: true,
        },
      }),

      prisma.event.aggregate({
        where: { ownerId },

        _avg: {
          porcentajeAsistencia: true,
        },
      }),
    ]);

    return {
      totalEvents,

      totalGuests: guests._sum.cant_invitados ?? 0,

      averageAttendance: Math.round(attendance._avg.porcentajeAsistencia ?? 0),
    };
  },
};
