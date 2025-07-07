-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'QUEUED', 'SENT', 'FAILED', 'SKIPPED');

-- AlterTable
ALTER TABLE "EmailSent" ADD COLUMN     "status" "EmailStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "LeadEmailStatus" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "emailSentId" INTEGER NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "LeadEmailStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeadEmailStatus_leadId_emailSentId_key" ON "LeadEmailStatus"("leadId", "emailSentId");

-- AddForeignKey
ALTER TABLE "LeadEmailStatus" ADD CONSTRAINT "LeadEmailStatus_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadEmailStatus" ADD CONSTRAINT "LeadEmailStatus_emailSentId_fkey" FOREIGN KEY ("emailSentId") REFERENCES "EmailSent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
