import { prisma } from "../lib/prisma.js";
import crypto from "crypto";

type GetByEventOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
};

type GuestImportRow = {
  documento: string;
  nombre: string;
  apellido: string;
  email?: string;
  numero?: string;
  mesa?: string;
  status?: "Pendiente" | "Presente" | "Ausente";
  cant_acompanantes?: number;
};

function generateQrHash(eventId: number): string {
  const raw = `${eventId}-${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;
  return `QR-${crypto.createHash("sha256").update(raw).digest("hex").slice(0, 20)}`;
}

function parseGuestStatus(val?: string) {
  switch (val) {
    case "Presente":
      return "PRESENTE" as const;
    case "Ausente":
      return "AUSENTE" as const;
    default:
      return "PENDIENTE" as const;
  }
}

export const guestService = {
  async getOwnedEvent(eventId: number, ownerId: number) {
    return prisma.event.findFirst({
      where: { id_evento: eventId, ownerId },
      select: { id_evento: true, ownerId: true, qrJobStatus: true },
    });
  },

  async getOwnedGuest(eventId: number, guestId: number, ownerId: number) {
    const event = await prisma.event.findFirst({
      where: { id_evento: eventId, ownerId },
      select: {
        id_evento: true,
        invitationBaseImageUrl: true,
        invitationQrX: true,
        invitationQrY: true,
        invitationQrSize: true,
      },
    });

    if (!event) {
      const error = new Error("Evento no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        qrHash: true,
      },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    return { event, guest };
  },

  async getByEvent(eventId: number, options: GetByEventOptions = {}) {
    const { search, status } = options;

    const page = options.page ?? 1;
    const pageSize =
      options.pageSize ?? (options.page === undefined ? undefined : 10);

    const where: any = { eventId };

    if (search) {
      const q = search.toLowerCase();
      where.OR = [
        { nombre: { contains: q, mode: "insensitive" } },
        { apellido: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { mesa: { contains: q, mode: "insensitive" } },
        { documento: { contains: q, mode: "insensitive" } },
      ];
    }

    if (status && status !== "all") {
      if (status === "checked_in") {
        where.checkInTime = { not: null };
      } else {
        where.status = parseGuestStatus(status);
      }
    }

    const [data, total] = await Promise.all([
      prisma.guest.findMany({
        where,
        ...(pageSize ? { skip: (page - 1) * pageSize, take: pageSize } : {}),
        orderBy: { apellido: "asc" },
      }),
      prisma.guest.count({ where }),
    ]);

    const totalPages = pageSize ? Math.ceil(total / pageSize) : 1;

    return { data, total, page, pageSize: pageSize ?? total, totalPages };
  },

  async getStats(eventId: number) {
    const [total, present, pending, declined] = await Promise.all([
      prisma.guest.count({ where: { eventId } }),
      prisma.guest.count({ where: { eventId, status: "PRESENTE" } }),
      prisma.guest.count({ where: { eventId, status: "PENDIENTE" } }),
      prisma.guest.count({ where: { eventId, status: "AUSENTE" } }),
    ]);

    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return {
      total,
      present,
      confirmed: present,
      pending,
      declined,
      percentage,
      byHour: [],
    };
  },

  async create(eventId: number, row: GuestImportRow) {
    const guest = await prisma.guest.create({
      data: {
        documento: row.documento,
        nombre: row.nombre,
        apellido: row.apellido,
        email: row.email || null,
        numero: row.numero || null,
        mesa: row.mesa || null,
        cant_acompanantes: row.cant_acompanantes ?? null,
        status: parseGuestStatus(row.status),
        qrHash: generateQrHash(eventId),
        eventId,
      },
    });

    return guest;
  },

  async bulkCreate(eventId: number, rows: GuestImportRow[]) {
    let createdCount = 0;

    for (const row of rows) {
      try {
        await prisma.guest.create({
          data: {
            documento: row.documento,
            nombre: row.nombre,
            apellido: row.apellido,
            email: row.email || null,
            numero: row.numero || null,
            mesa: row.mesa || null,
            cant_acompanantes: row.cant_acompanantes ?? null,
            status: parseGuestStatus(row.status),
            qrHash: generateQrHash(eventId),
            eventId,
          },
        });
        createdCount++;
      } catch (err: any) {
        if (err.code === "P2002") {
          continue;
        }
        throw err;
      }
    }

    return { created: createdCount };
  },

  //Mostrar invitados que hicieroon check-in desde ScanTab
  async checkin(eventId: number, qrCode: string) {
    const guest = await prisma.guest.findFirst({
      where: { eventId, qrHash: qrCode },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    if (guest.checkInTime) {
      const error = new Error("El invitado ya realizó su check-in") as any;
      error.statusCode = 409;
      throw error;
    }

    const updated = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        status: "PRESENTE",
        checkInTime: new Date(),
      },
    });

    const checkedInCount = await prisma.guest.count({
      where: { eventId, checkInTime: { not: null } },
    });

    const totalGuests = await prisma.guest.count({ where: { eventId } });
    const porcentajeAsistencia =
      totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;

    await prisma.event.update({
      where: { id_evento: eventId },
      data: { checkedInCount, porcentajeAsistencia },
    });

    return updated;
  },

  //Cehck-in manual desde ScanTab
  async manualCheckin(eventId: number, guestId: number) {
    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    if (guest.checkInTime) {
      const error = new Error("El invitado ya realizó su check-in") as any;
      error.statusCode = 409;
      throw error;
    }

    const updated = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        status: "PRESENTE",
        checkInTime: new Date(),
      },
    });

    const checkedInCount = await prisma.guest.count({
      where: { eventId, checkInTime: { not: null } },
    });

    const totalGuests = await prisma.guest.count({ where: { eventId } });
    const porcentajeAsistencia =
      totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;

    await prisma.event.update({
      where: { id_evento: eventId },
      data: { checkedInCount, porcentajeAsistencia },
    });

    return updated;
  },

  //Eliminacion de invitados desde GuestTab
  async delete(eventId: number, guestId: number, userId: number) {
    const event = await this.getOwnedEvent(eventId, userId);

    if (!event) {
      const error = new Error("Evento no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    if (guest.status === "PRESENTE") {
      const error = new Error(
        "No se puede eliminar un invitado que ya está presente",
      ) as any;
      error.statusCode = 409;
      throw error;
    }

    await prisma.guest.delete({ where: { id: guest.id } });

    if (guest.checkInTime) {
      const checkedInCount = await prisma.guest.count({
        where: { eventId, checkInTime: { not: null } },
      });

      const totalGuests = await prisma.guest.count({ where: { eventId } });
      const porcentajeAsistencia =
        totalGuests > 0 ? Math.round((checkedInCount / totalGuests) * 100) : 0;

      await prisma.event.update({
        where: { id_evento: eventId },
        data: { checkedInCount, porcentajeAsistencia },
      });
    }

    return { deleted: true };
  },

  //Marcado de invitaciones como enviada
  async sendInvitations(eventId: number, guestIds: number[]) {
    await prisma.guest.updateMany({
      where: { id: { in: guestIds }, eventId },
      data: { invitacionEnviada: true },
    });

    return { sent: guestIds.length };
  },

  //Actualizacion de datos de invitados desde GuestTab
  async update(
    eventId: number,
    guestId: number,
    data: {
      video?: string | null;
      mesa?: string | null;
      nombre?: string;
      apellido?: string;
      email?: string | null;
    },
  ) {
    const guest = await prisma.guest.findFirst({
      where: { id: guestId, eventId },
    });

    if (!guest) {
      const error = new Error("Invitado no encontrado") as any;
      error.statusCode = 404;
      throw error;
    }

    return prisma.guest.update({
      where: { id: guestId },
      data: {
        ...(data.video !== undefined ? { video: data.video } : {}),
        ...(data.mesa !== undefined ? { mesa: data.mesa } : {}),
        ...(data.nombre !== undefined ? { nombre: data.nombre } : {}),
        ...(data.apellido !== undefined ? { apellido: data.apellido } : {}),
        ...(data.email !== undefined ? { email: data.email } : {}),
      },
    });
  },

  //Asignacion de videos query en MediaTab
  async bulkAssignVideo(
    eventId: number,
    params: {
      mesa?: string | null;
      tipo?: "individual" | "con_acompanantes" | "todos";
      videoUrl: string;
    },
  ) {
    const where: any = { eventId };

    if (params.mesa) {
      where.mesa = params.mesa;
    }

    if (params.tipo === "individual") {
      where.cant_acompanantes = 1;
    } else if (params.tipo === "con_acompanantes") {
      where.cant_acompanantes = { gt: 1 };
    }

    const result = await prisma.guest.updateMany({
      where,
      data: { video: params.videoUrl },
    });

    return { updated: result.count };
  },
};
