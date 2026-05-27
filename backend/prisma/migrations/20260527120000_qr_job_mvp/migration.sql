-- AlterTable
ALTER TABLE "Event"
ADD COLUMN "invitationBaseImageUrl" TEXT,
ADD COLUMN "qrJobError" TEXT,
ADD COLUMN "qrJobFinishedAt" TIMESTAMP(3),
ADD COLUMN "qrJobProcessed" INTEGER,
ADD COLUMN "qrJobRequestedBy" INTEGER,
ADD COLUMN "qrJobStartedAt" TIMESTAMP(3),
ADD COLUMN "qrJobTotal" INTEGER,
DROP COLUMN "qrZipUrl";

-- DropIndex
DROP INDEX "Guest_qrHash_key";

-- CreateIndex
CREATE UNIQUE INDEX "Guest_eventId_qrHash_key" ON "Guest"("eventId", "qrHash");
