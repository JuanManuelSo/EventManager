import { Router } from "express";
import { guestController } from "../controllers/guest.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, guestController.getByEvent);
router.get("/stats", authMiddleware, guestController.getStats);
router.post("/", authMiddleware, guestController.create);
router.post("/bulk", authMiddleware, guestController.bulkCreate);
router.post("/checkin", authMiddleware, guestController.checkin);
router.post("/:guestId/checkin", authMiddleware, guestController.manualCheckin);
router.post("/invitations", authMiddleware, guestController.sendInvitations);
router.post("/qr/generate", authMiddleware, guestController.generateQrs);
router.get("/qr/download", authMiddleware, guestController.downloadQrs);
router.get("/:guestId/qr", authMiddleware, guestController.generateSingleQr);
router.put("/:guestId", authMiddleware, guestController.update);
router.post("/bulk-assign-video", authMiddleware, guestController.bulkAssignVideo);
router.delete("/:guestId", authMiddleware, guestController.delete);

export default router;
