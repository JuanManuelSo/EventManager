import { Router } from "express";
import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";
import guestRoutes from "./guest.routes.js";

const router = Router();

// Todo montado bajo /api
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/events/:eventId/guests", guestRoutes);

export default router;
