-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'RUNNING', 'COMPLETED', 'CANCELLED', 'FAILED');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT';
