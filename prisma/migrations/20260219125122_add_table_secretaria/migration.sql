-- AlterTable
ALTER TABLE "User" ADD COLUMN     "secretariaId" TEXT;

-- CreateTable
CREATE TABLE "Secretaria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Secretaria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_secretariaId_fkey" FOREIGN KEY ("secretariaId") REFERENCES "Secretaria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
