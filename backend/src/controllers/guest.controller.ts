import { Request, Response, NextFunction } from "express";
import { guestService } from "../services/guest.service.js";
import {
  bulkCreateGuestsSchema,
  createGuestSchema,
} from "../validations/guest.validation.js";
import { qrJobService } from "../services/qr-job.service.js";
import z from "zod";

const paramsSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  guestId: z.coerce.number().int().positive().optional(),
});

export const guestController = {
  async getByEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const { page, pageSize, search, status } = req.query as any;

      const result = await guestService.getByEvent(eventId, {
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
        search,
        status,
      });

      res.json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  },

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });

      const stats = await guestService.getStats(eventId);

      res.json({ status: "success", data: stats });
    } catch (error) {
      next(error);
    }
  },

  async bulkCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const body = bulkCreateGuestsSchema.parse(req.body);

      const result = await guestService.bulkCreate(eventId, body.guests);

      res.status(201).json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const body = createGuestSchema.parse(req.body);

      const guest = await guestService.create(eventId, body);

      res.status(201).json({ status: "success", data: guest });
    } catch (error) {
      next(error);
    }
  },

  async checkin(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const { qrCode } = z.object({ qrCode: z.string().min(1) }).parse(req.body);

      const guest = await guestService.checkin(eventId, qrCode);

      res.json({ status: "success", data: guest });
    } catch (error) {
      next(error);
    }
  },

  async manualCheckin(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, guestId } = paramsSchema.parse({
        eventId: req.params.eventId,
        guestId: req.params.guestId,
      });

      if (!guestId) {
        res.status(400).json({ status: "error", message: "guestId requerido" });
        return;
      }

      const guest = await guestService.manualCheckin(eventId, guestId);

      res.json({ status: "success", data: guest });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, guestId } = paramsSchema.parse({
        eventId: req.params.eventId,
        guestId: req.params.guestId,
      });

      if (!guestId) {
        res
          .status(400)
          .json({ status: "error", message: "guestId requerido" });
        return;
      }

      const userId = req.user?.userId;

      if (!userId) {
        res
          .status(401)
          .json({ status: "error", message: "Usuario no autenticado" });
        return;
      }

      const result = await guestService.delete(eventId, guestId, userId);

      res.json({ status: "success", ...result });
    } catch (error: any) {
      if (error?.statusCode) {
        res
          .status(error.statusCode)
          .json({ status: "error", message: error.message });
        return;
      }

      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, guestId } = paramsSchema.parse({
        eventId: req.params.eventId,
        guestId: req.params.guestId,
      });

      if (!guestId) {
        res.status(400).json({ status: "error", message: "guestId requerido" });
        return;
      }

      const body = z
        .object({
          video: z.string().url().nullable().optional(),
          mesa: z.string().optional(),
          nombre: z.string().min(1).optional(),
          apellido: z.string().min(1).optional(),
          email: z.string().email().nullable().optional(),
        })
        .parse(req.body);

      const guest = await guestService.update(eventId, guestId, body);

      res.json({ status: "success", data: guest });
    } catch (error: any) {
      if (error?.name === "ZodError") {
        res.status(400).json({ status: "error", message: error.message });
        return;
      }
      if (error?.statusCode) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
        return;
      }
      next(error);
    }
  },

  async bulkAssignVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });

      const body = z
        .object({
          videoUrl: z.string().url(),
          mesa: z.string().optional().nullable(),
          tipo: z.enum(["individual", "con_acompanantes", "todos"]).default("todos"),
        })
        .parse(req.body);

      const result = await guestService.bulkAssignVideo(eventId, body);

      res.json({ status: "success", ...result });
    } catch (error: any) {
      if (error?.name === "ZodError") {
        res.status(400).json({ status: "error", message: error.message });
        return;
      }
      next(error);
    }
  },

  async sendInvitations(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const { guestIds } = z.object({ guestIds: z.array(z.number()) }).parse(req.body);

      const result = await guestService.sendInvitations(eventId, guestIds);

      res.json({ status: "success", ...result });
    } catch (error) {
      next(error);
    }
  },

  async generateQrs(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        return;
      }

      const data = await qrJobService.start(eventId, userId);

      res.json({ status: "success", data });
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
        return;
      }

      next(error);
    }
  },

  async generateSingleQr(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, guestId } = paramsSchema.parse({
        eventId: req.params.eventId,
        guestId: req.params.guestId,
      });
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        return;
      }

      if (!guestId) {
        res.status(400).json({ status: "error", message: "guestId requerido" });
        return;
      }

      const { event, guest } = await guestService.getOwnedGuest(eventId, guestId, userId);

      const template = event.invitationBaseImageUrl &&
        event.invitationQrX !== null &&
        event.invitationQrY !== null &&
        event.invitationQrSize !== null
        ? {
            url: event.invitationBaseImageUrl,
            x: event.invitationQrX,
            y: event.invitationQrY,
            size: event.invitationQrSize,
          }
        : null;

      const image = await qrJobService.generateGuestQr(guest.qrHash, template);
      const safeName = `${guest.apellido}-${guest.nombre}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || `guest-${guest.id}`;

      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Disposition", `attachment; filename="qr-${safeName}.png"`);
      res.send(image);
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
        return;
      }

      next(error);
    }
  },

  async downloadQrs(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({ status: "error", message: "Usuario no autenticado" });
        return;
      }

      const event = await guestService.getOwnedEvent(eventId, userId);

      if (!event) {
        res.status(404).json({ status: "error", message: "Evento no encontrado" });
        return;
      }

      const zip = qrJobService.getZip(eventId);
      if (!zip) {
        res.status(404).json({ status: "error", message: "ZIP no disponible todavía" });
        return;
      }

      const safeFileName = `qrs-evento-${String(eventId).replace(/[^0-9]/g, "") || eventId}.zip`;
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${safeFileName}"`);
      res.send(zip);
    } catch (error) {
      next(error);
    }
  },
};
