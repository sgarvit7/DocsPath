-- CreateEnum
CREATE TYPE "DoctorStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "medicalLicenseNumber" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "yearsOfExperience" TEXT NOT NULL,
    "associatedClinicHospitalName" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "governmentIssuedId" TEXT,
    "medicalDegreeCertificate" TEXT,
    "medicalCouncilRegistrationCertificate" TEXT,
    "experienceCertificate" TEXT,
    "availableConsultationHours" TEXT NOT NULL,
    "preferredModeOfConsultation" TEXT NOT NULL,
    "languageSpoken" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "emergencyContactDetails" TEXT NOT NULL,
    "personalBio" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "DoctorStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_emailAddress_key" ON "doctors"("emailAddress");
