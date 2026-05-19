/*
  Warnings:

  - The `Estado` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `Foto` on the `Guest` table. All the data in the column will be lost.
  - The `status` column on the `Guest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('PENDIENTE', 'AUSENTE', 'PRESENTE');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "Estado",
ADD COLUMN     "Estado" "EventStatus" NOT NULL DEFAULT 'ACTIVO';

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "Foto",
ADD COLUMN     "foto" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "GuestStatus" NOT NULL DEFAULT 'PENDIENTE',
ALTER COLUMN "cant_acompanantes" DROP NOT NULL,
ALTER COLUMN "video" DROP NOT NULL;
