import { Router } from "express";
import { mediaController } from "../controllers/media.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";
import path from "path";
import os from "os";

//Configuracion de multer para videos
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
      cb(
        new Error(
          "Formato de video no soportado. Usa MP4, WebM, OGG, MOV, AVI o MKV.",
        ),
      );
    }
  },
});

//Configuracion de multer para imagenes(QR cards)
const imageUpload = multer({
  dest: path.join(os.tmpdir(), "event-manager-uploads"),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "application/pdf",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no soportado. Usa PNG, JPG, WebP o PDF."));
    }
  },
});

const router = Router({ mergeParams: true });

//Get all
router.get("/", authMiddleware, mediaController.list);

//Subir video
router.post(
  "/upload",
  authMiddleware,
  videoUpload.single("video"),
  mediaController.upload,
);

//Eliminar video
router.delete("/:mediaId", authMiddleware, mediaController.delete);

//QR Card
router.get("/qr-card", authMiddleware, mediaController.getQrCard);

//Subir QR Card
router.post(
  "/qr-card",
  authMiddleware,
  imageUpload.single("image"),
  mediaController.uploadQrCard,
);

//Actualizar slot de QR Card
router.put("/qr-card/slot", authMiddleware, mediaController.updateQrCardSlot);

export default router;
