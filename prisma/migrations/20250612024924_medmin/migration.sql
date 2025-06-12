/*
  Warnings:

  - You are about to drop the column `isVerified` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "isVerified",
DROP COLUMN "status",
ALTER COLUMN "additionalInformation" DROP NOT NULL,
ALTER COLUMN "personalBio" DROP NOT NULL;

-- DropEnum
DROP TYPE "DoctorStatus";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supabaseUid" TEXT NOT NULL,
    "title" TEXT,
    "name" TEXT,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT,
    "bloodGroup" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "maritalStatus" TEXT,
    "contactNumber" TEXT,
    "alternateNumber" TEXT,
    "smokingHabit" TEXT,
    "alcoholConsumption" TEXT,
    "activityLevel" TEXT,
    "dietHabit" TEXT,
    "occupation" TEXT,
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "medications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "chronicDiseases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "injuries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "surgeries" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseUid_key" ON "User"("supabaseUid");
