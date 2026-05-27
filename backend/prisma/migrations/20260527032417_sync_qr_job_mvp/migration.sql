-- CreateEnum
CREATE TYPE "QrJobStatus" AS ENUM ('IDLE', 'PROCESSING', 'DONE', 'ERROR');

-- DropIndex
DROP INDEX "Guest_documento_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "qrGeneratedAt" TIMESTAMP(3),
ADD COLUMN     "qrJobStatus" "QrJobStatus" NOT NULL DEFAULT 'IDLE';

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "qrGeneratedAt" TIMESTAMP(3),
ADD COLUMN     "qrImageUrl" TEXT;
