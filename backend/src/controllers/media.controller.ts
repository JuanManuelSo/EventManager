import { Request, Response, NextFunction } from "express";
import { mediaService } from "../services/media.service.js";
import z from "zod";

const paramsSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  mediaId: z.coerce.number().int().positive().optional(),
});

export const mediaController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const items = await mediaService.getByEvent(eventId);
      res.json({ status: "success", data: items });
    } catch (error) {
      next(error);
    }
  },

  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });

      if (!req.file) {
        res.status(400).json({ status: "error", message: "Archivo requerido" });
        return;
      }

      const body = z
        .object({
          nombre: z.string().min(1).optional(),
          tipo: z.enum(["individual", "con_acompanantes", "general"]),
          mesa: z.coerce.number().int().optional().nullable(),
        })
        .parse(req.body);

      const media = await mediaService.upload(
        eventId,
        req.file.path,
        req.file.originalname,
        body.nombre || req.file.originalname,
        body.tipo,
        body.mesa ?? null,
      );

      res.status(201).json({ status: "success", data: media });
    } catch (error: any) {
      if (error?.name === "ZodError") {
        res.status(400).json({ status: "error", message: error.message });
        return;
      }
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, mediaId } = paramsSchema.parse({
        eventId: req.params.eventId,
        mediaId: req.params.mediaId,
      });

      if (!mediaId) {
        res.status(400).json({ status: "error", message: "mediaId requerido" });
        return;
      }

      const result = await mediaService.delete(eventId, mediaId);
      res.json({ status: "success", ...result });
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
        return;
      }
      next(error);
    }
  },

  async uploadQrCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });

      if (!req.file) {
        res.status(400).json({ status: "error", message: "Archivo requerido" });
        return;
      }

      const result = await mediaService.uploadQrCard(
        eventId,
        req.file.path,
        req.file.originalname,
      );

      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  },

  async getQrCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });

      const result = await mediaService.getQrCard(eventId);

      res.json({ status: "success", data: result });
    } catch (error) {
      next(error);
    }
  },
};
