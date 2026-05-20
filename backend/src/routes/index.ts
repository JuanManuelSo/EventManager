import { Router } from "express";
import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";

const router = Router();

// Todo montado bajo /api
router.use("/users", userRoutes);
router.use("/events", eventRoutes);

export default router;
