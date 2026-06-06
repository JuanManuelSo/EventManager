import { Router } from "express";
import { mediaController } from "../controllers/media.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import os from "os";

const videoUpload = multer({
  dest: path.join(os.tmpdir(), "event-manager-uploads"),
  limits: { fileSize: 200 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-matroska",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de video no soportado. Usa MP4, WebM, OGG, MOV, AVI o MKV."));
    }
  },
});

const imageUpload = multer({
  dest: path.join(os.tmpdir(), "event-manager-uploads"),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no soportado. Usa PNG, JPG, WebP o PDF."));
    }
  },
});

const router = Router({ mergeParams: true });

router.get("/", authMiddleware, mediaController.list);
router.post("/upload", authMiddleware, videoUpload.single("video"), mediaController.upload);
router.delete("/:mediaId", authMiddleware, mediaController.delete);

router.get("/qr-card", authMiddleware, mediaController.getQrCard);
router.post("/qr-card", authMiddleware, imageUpload.single("image"), mediaController.uploadQrCard);

export default router;
