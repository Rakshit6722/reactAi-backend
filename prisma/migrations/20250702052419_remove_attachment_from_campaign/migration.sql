/*
  Warnings:

  - You are about to drop the column `campaignId` on the `CampaignAttachments` table. All the data in the column will be lost.
  - Added the required column `emailSentId` to the `CampaignAttachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CampaignAttachments" DROP CONSTRAINT "CampaignAttachments_campaignId_fkey";

-- AlterTable
ALTER TABLE "CampaignAttachments" DROP COLUMN "campaignId",
ADD COLUMN     "emailSentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "EmailSent" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "order" INTEGER,
    "sendAfterDays" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignAttachments" ADD CONSTRAINT "CampaignAttachments_emailSentId_fkey" FOREIGN KEY ("emailSentId") REFERENCES "EmailSent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailSent" ADD CONSTRAINT "EmailSent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
