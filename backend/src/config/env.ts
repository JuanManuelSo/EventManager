import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("3000"),

  DATABASE_URL: z.string(),

  FRONTEND_URL: z.string().default("http://localhost:5173"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
