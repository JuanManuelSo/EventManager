-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_evento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "locacion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "salon" TEXT NOT NULL,
    "cant_invitados" INTEGER NOT NULL,
    "coverImage" TEXT,
    "Estado" TEXT,
    "ownerId" INTEGER NOT NULL,
    "checkedInCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_evento")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "documento" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT,
    "numero" TEXT,
    "mesa" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "cant_acompanantes" INTEGER NOT NULL,
    "invitacionEnviada" BOOLEAN NOT NULL DEFAULT false,
    "video" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,
    "qrHash" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3),
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_documento_key" ON "Guest"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_qrHash_key" ON "Guest"("qrHash");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_eventId_key" ON "Guest"("email", "eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id_evento") ON DELETE CASCADE ON UPDATE CASCADE;
