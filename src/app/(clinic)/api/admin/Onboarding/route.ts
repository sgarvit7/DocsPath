import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "../../../../../../cloudinary/uploadImageToCloudinary"; // Adjust import path as needed

// Use /tmp/uploads on Vercel, and local folder in development
const UPLOAD_DIR =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "uploads")
    : path.join(process.cwd(), "/tmp/uploads");

// Helper function to ensure upload directory exists
// async function ensureUploadDir() {
//   try {
//     await fs.access(UPLOAD_DIR);
//   } catch (error) {
//     console.log(error);
//     await fs.mkdir(UPLOAD_DIR, { recursive: true });
//   }
// }

// Helper function to save a file from the form data, upload to Cloudinary, and delete local file
// async function processFile(
//   file: File
// ): Promise<{ cloudinaryUrl: string; originalName: string }> {
//   const fileBuffer = Buffer.from(await file.arrayBuffer());
//   const fileName = `${uuidv4()}-${file.name}`;
//   const filePath = path.join(UPLOAD_DIR, fileName);

//   // Save file locally first
//   await fs.writeFile(filePath, fileBuffer);

//   // Upload to Cloudinary
//   const cloudinaryUrl = await uploadFileToCloudinary(filePath);

//   // Delete local file after successful upload
//   try {
//     await fs.unlink(filePath);
//   } catch (error) {
//     console.error("Error deleting local file:", error);
//   }

//   if (!cloudinaryUrl) {
//     throw new Error("Failed to upload file to Cloudinary");
//   }

//   return {
//     cloudinaryUrl,
//     originalName: file.name,
//   };
// }

// Interface for document information
interface DocumentInfo {
  departments: string;
  doctorsCount: string;
  communicationMode: string;
  governmentIdUrl?: string;
  governmentIdOriginalName?: string;
  registrationCertificateUrl?: string;
  registrationCertificateOriginalName?: string;
  accreditationUrl?: string;
  accreditationOriginalName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const savedAdmin = await prisma.admin.create({
      data: {
        managementType: body.managementType,
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        designation: body.designation,
        clinicName: body.clinicName,
        clinicType: body.clinicType,
        registrationNumber: body.registrationNumber,
        establishmentYear: body.establishmentYear,
        address: body.address,
        departments: body.departments,
        doctorsCount: body.doctorsCount,
        communicationMode: body.communicationMode // if profilePicture used on frontend
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin created successfully",
        adminId: savedAdmin.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving admin:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({"msg": "medmin"})
}