import { Router } from "express";
import { eventController } from "../controllers/event.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, eventController.create);
router.get("/", authMiddleware, eventController.getEventByUser);
router.get("/stats", authMiddleware, eventController.summary);
router.get("/:id", authMiddleware, eventController.getById);
router.delete("/:id", authMiddleware, eventController.delete);
router.patch("/:id/finalize", authMiddleware, eventController.finalize);
router.put("/:id", authMiddleware, eventController.update);

router;

export default router;
