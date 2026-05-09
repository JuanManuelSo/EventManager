import app from "./app.js";

import { prisma } from "./lib/prisma.js";

import { env } from "./config/env.js";

async function bootstrap() {
  try {
    await prisma.$connect();

    console.log("Database connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();

  console.log("Prisma disconnected");

  process.exit(0);
});

bootstrap();
