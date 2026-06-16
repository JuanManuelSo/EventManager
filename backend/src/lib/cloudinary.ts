import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

const EVENT_MEDIA_FOLDER = "event_manager/videos";

export async function uploadVideo(
  filePath: string,
  publicId?: string,
): Promise<{ url: string; publicId: string; duration: number; format: string }> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: EVENT_MEDIA_FOLDER,
    public_id: publicId,
    resource_type: "video",
    eager: [{ format: "mp4" }],
    eager_async: true,
  });

  return {
    url: result.secure_url,
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

  const url = result.format === "pdf"
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

export async function deleteMedia(publicId: string, resourceType?: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType ?? "video" });
}
