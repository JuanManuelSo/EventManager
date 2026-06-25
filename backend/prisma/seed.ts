import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const hash = await bcrypt.hash("admin1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@eventmanager.com" },
    update: {},
    create: {
      email: "admin@eventmanager.com",
      contrasena: hash,
      nombre: "Admin",
    },
  });

  console.log("✓ Usuario admin creado");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
