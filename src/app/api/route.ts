import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';


// Define directory for storing uploaded files
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);// This checks if the folder exists and is accessible. If it does NOT exist, it throws an error.
  } catch (error) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    /*
      - The option { recursive: true } means:
      - If the parent folders in the path also don't exist, it creates them too.
      - Example: if path is 'uploads/images/temp', it will create all missing parts.
    */
  }
}

// Helper function to save a file from the form data
async function saveFile(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());// This reads the uploaded file and converts it into a binary format (buffer) that can be written to your system. file.arrayBuffer() gets the content of the file. Buffer.from(...) prepares it for saving.  
  const fileName = `${uuidv4()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  
  await fs.writeFile(filePath, fileBuffer);
  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir();
    
    // Parse the form data
    const formData = await request.formData();
    
    // Extract admin data
    const managementType = formData.get('managementType') as string;
    
    // Extract personal info
    const personalInfo = {
      fullName: formData.get('personalInfo.fullName') as string,
      email: formData.get('personalInfo.email') as string,
      phone: formData.get('personalInfo.phone') as string,
      designation: formData.get('personalInfo.designation') as string,
    };
    
    // Extract clinic info
    const clinicInfo = {
      clinicName: formData.get('clinicInfo.clinicName') as string,
      clinicType: formData.get('clinicInfo.clinicType') as string,
      registrationNumber: formData.get('clinicInfo.registrationNumber') as string,
      establishmentYear: formData.get('clinicInfo.establishmentYear') as string,
      address: formData.get('clinicInfo.address') as string,
    };
    
    // Handle file uploads and store metadata
    const documents: Record<string, any> = {
      departments: formData.get('documents.departments') as string,
      doctorsCount: formData.get('documents.doctorsCount') as string,
      communicationMode: formData.get('documents.communicationMode') as string,
    };
    
    // Process government ID file
    const governmentIdFile = formData.get('documents.governmentId') as File | null;
    if (governmentIdFile && governmentIdFile instanceof File) {
      const fileName = await saveFile(governmentIdFile);
      documents.governmentIdPath = fileName;
      documents.governmentIdOriginalName = governmentIdFile.name;
    }
    
    // Process registration certificate file
    const registrationCertFile = formData.get('documents.registrationCertificate') as File | null;
    if (registrationCertFile && registrationCertFile instanceof File) {
      const fileName = await saveFile(registrationCertFile);
      documents.registrationCertificatePath = fileName;
      documents.registrationCertificateOriginalName = registrationCertFile.name;
    }
    
    // Process accreditation file (optional)
    const accreditationFile = formData.get('documents.accreditation') as File | null;
    if (accreditationFile && accreditationFile instanceof File) {
      const fileName = await saveFile(accreditationFile);
      documents.accreditationPath = fileName;
      documents.accreditationOriginalName = accreditationFile.name;
    }
    
    // Save admin data to the database using Prisma
    const savedAdmin = await prisma.admin.create({
      data: {
        managementType,
        // Personal info
        fullName: personalInfo.fullName,
        email: personalInfo.email,
        phone: personalInfo.phone,
        designation: personalInfo.designation,
        // Clinic info
        clinicName: clinicInfo.clinicName,
        clinicType: clinicInfo.clinicType,
        registrationNumber: clinicInfo.registrationNumber,
        establishmentYear: clinicInfo.establishmentYear,
        address: clinicInfo.address,
        // Documents info
        departments: documents.departments,
        doctorsCount: documents.doctorsCount,
        communicationMode: documents.communicationMode,
        // File paths
        governmentIdPath: documents.governmentIdPath,
        governmentIdOriginalName: documents.governmentIdOriginalName,
        registrationCertificatePath: documents.registrationCertificatePath,
        registrationCertificateOriginalName: documents.registrationCertificateOriginalName,
        accreditationPath: documents.accreditationPath,
        accreditationOriginalName: documents.accreditationOriginalName
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin registration completed successfully',
      adminId: savedAdmin.id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error processing admin registration:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}