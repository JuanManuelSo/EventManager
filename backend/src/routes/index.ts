import { Router } from "express";
import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";
import guestRoutes from "./guest.routes.js";
import checkInRoutes from "./checkIn.route.js";
import mediaRoutes from "./media.routes.js";

const router = Router();

// Todo montado bajo /api
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/events/:eventId/guests", guestRoutes);
router.use("/events/:eventId/media", mediaRoutes);

router.use("/checkin/", checkInRoutes);

export default router;
