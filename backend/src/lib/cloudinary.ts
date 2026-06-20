import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

const EVENT_MEDIA_FOLDER = "event_manager/videos";
const LOCAL_VIDEOS_DIR = path.resolve("local_media/videos");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function saveLocalCopy(
  sourceFilePath: string,
  publicId: string,
): Promise<string> {
  ensureDir(LOCAL_VIDEOS_DIR);
  const filename = `${publicId.replace(/\//g, "_")}.mp4`;
  const destPath = path.join(LOCAL_VIDEOS_DIR, filename);
  fs.copyFileSync(sourceFilePath, destPath);
  return `/local_media/videos/${filename}`; // URL local relativa
}

export async function uploadVideo(
  filePath: string,
  publicId?: string,
): Promise<{
  url: string;
  localUrl: string;
  publicId: string;
  duration: number;
  format: string;
}> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: EVENT_MEDIA_FOLDER,
    public_id: publicId,
    resource_type: "video",
    eager: [{ format: "mp4" }],
    eager_async: true,
  });

  const localUrl = await saveLocalCopy(filePath, result.public_id);

  return {
    url: result.secure_url,
    localUrl,
    publicId: result.public_id,
    duration: result.duration ?? 0,
    format: result.format,
  };
}

export async function uploadImage(
  filePath: string,
  publicId?: string,
): Promise<{ url: string; publicId: string; format: string }> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "event_manager/images",
    public_id: publicId,
    resource_type: "image",
  });

  const url =
    result.format === "pdf"
      ? cloudinary.url(result.public_id, {
          secure: true,
          resource_type: "image",
          format: "png",
          page: 1,
        })
      : result.secure_url;

  return {
    url,
    publicId: result.public_id,
    format: result.format,
  };
}

export async function deleteMedia(
  publicId: string,
  resourceType?: string,
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType ?? "video",
  });
}
