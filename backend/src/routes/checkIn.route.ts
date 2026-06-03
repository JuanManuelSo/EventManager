import { Router } from "express";
import { checkInController } from "../controllers/checkIn.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/:eventId/scan", authMiddleware, checkInController.scanQR);
route.post("/:eventId/manual", authMiddleware, checkInController.checkinById);

export default route;
