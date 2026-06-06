-- CreateTable
CREATE TABLE "EventMedia" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mesa" INTEGER,
    "formato" TEXT,
    "duracion" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventMedia_eventId_idx" ON "EventMedia"("eventId");

-- AddForeignKey
ALTER TABLE "EventMedia" ADD CONSTRAINT "EventMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id_evento") ON DELETE CASCADE ON UPDATE CASCADE;
