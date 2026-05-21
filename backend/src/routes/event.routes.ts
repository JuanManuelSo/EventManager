import { Router } from "express";
import { eventController } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, eventController.getEventByUser);
router.get("/:id", authMiddleware, eventController.getById);
router.post("/", authMiddleware, eventController.create);

export default router;
