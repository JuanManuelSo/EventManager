import { Request, Response, NextFunction } from "express";
import { guestService } from "../services/guest.service.js";
import { bulkCreateGuestsSchema } from "../validations/guest.validation.js";
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
};
