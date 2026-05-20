import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/event.service.js";
import z from "zod";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const eventController = {
  async getEventByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = paramsSchema.parse({
        id: req.user?.userId,
      });
      if (!id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado",
        });
        return;
      }

      const events = await eventService.getEventByUser(id);
      res.json({ status: "succes", data: events });
    } catch (error) {
      next(error);
    }
  },
};
