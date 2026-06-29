import { Request, Response, NextFunction } from "express";
import { checkinService } from "../services/checkIn.service.js";
import { z } from "zod";

const paramsSchema = z.object({
  eventId: z.coerce.number().int().positive(),
});

export const checkInController = {
  async scanQR(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const { qrCode } = z
        .object({ qrCode: z.string().min(1) })
        .parse(req.body);

      const result = await checkinService.scanQR(eventId, qrCode);
      return res.json(result);
    } catch (error: any) {
      const isValidation = error?.name === "ZodError";
      return res.status(error?.statusCode ?? (isValidation ? 400 : 500)).json({
        message: error?.message ?? "Error en el check-in.",
      });
    }
  },
  async checkinById(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = paramsSchema.parse({ eventId: req.params.eventId });
      const { guestId } = z
        .object({ guestId: z.number().int().positive() })
        .parse(req.body);

      const result = await checkinService.checkinById(eventId, guestId);
      return res.json(result);
    } catch (error: any) {
      const isValidation = error?.name === "ZodError";
      return res.status(error?.statusCode ?? (isValidation ? 400 : 500)).json({
        message: error?.message ?? "Error en el check-in.",
      });
    }
  },
};
