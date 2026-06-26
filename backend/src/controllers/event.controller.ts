import { Request, Response, NextFunction } from "express";
import { eventService } from "../services/event.service.js";
import type {
  CreateEventInput,
  UpdateEventInput,
} from "../validations/event.validation.js";
import {
  createEventSchema,
  updateEventSchema,
} from "../validations/event.validation.js";
import z from "zod";

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const eventController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createEventSchema.parse(req.body);

      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado",
        });
        return;
      }

      const event = await eventService.create({
        ...body,
        ownerId: userId,
      });

      res.status(201).json({
        status: "success",
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const eventId = Number(req.params.id);
      const ownerId = req.user?.userId;
      if (!ownerId) {
        return res.status(401).json({
          status: "error",
        });
      }

      await eventService.delete(eventId, ownerId);

      res.json({
        status: "success",
        message: "Evento eliminado",
      });
    } catch (error) {
      next(error);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = paramsSchema.parse({
        id: req.params.id,
      });
      const event = await eventService.getById(id);
      res.json({
        status: "success",
        data: event,
      });
    } catch (error) {
      next(error);
    }
  },
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
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = paramsSchema.parse({ id: req.params.id });
      const ownerId = req.user?.userId;
      if (!ownerId) {
        return res.status(401).json({
          status: "error",
        });
      }

      const body = updateEventSchema.parse(req.body);
      const updatedEvent = await eventService.update(id, ownerId, body);

      res.json({
        status: "success",
        data: updatedEvent,
      });
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
        return;
      }
      next(error);
    }
  },
  async finalize(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = paramsSchema.parse({ id: req.params.id });
      const ownerId = req.user?.userId;

      if (!ownerId) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado",
        });
        return;
      }

      const event = await eventService.finalize(id, ownerId);

      res.json({
        status: "success",
        data: event,
      });
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
        return;
      }
      next(error);
    }
  },
  async summary(req: Request, res: Response, next: NextFunction) {
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

      const summary = await eventService.getDashboardSummary(id);

      res.json({
        status: "succes",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },
};
