import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "../../../../../cloudinary/uploadImageToCloudinary";
import {Admin} from "@/types/admin";

export async function GET(req: NextRequest) {
  try {

    // Fetch all admin profiles from the database
    const admins: Admin[] = await prisma.admin.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin profiles:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      address,
      specialization,
      profilePicture,
      experience,
      clinicName,
      clinicType,
      registrationNumber,
      establishmentYear,
      departments,
      doctorsCount,
      communicationMode,
    } = body;

    // Validate required fields
    if (
      !name || !email || !phone || !address || !specialization || !experience ||
      !clinicName || !clinicType || !registrationNumber || !establishmentYear ||
      !departments || !doctorsCount || !communicationMode
    ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Upload profile picture to Cloudinary
    // let profilePictureUrl = "";
    // if (profilePicture) {
    //   const uploadResult = await uploadFileToCloudinary(profilePicture);
    //   profilePictureUrl = uploadResult.secure_url;
    // }

    // Create new admin profile in the database
    const newAdmin = await prisma.admin.create({
      data: {
        id: uuidv4(),
        fullName: name,
        email,
        phone,
        address,
        designation: specialization,
        managementType: "admin",
        profilePhoto: profilePicture, // Assuming this is a URL or base64 string

        // Clinic Info
        clinicName,
        clinicType,
        registrationNumber,
        establishmentYear,

        // Document Info
        departments,
        doctorsCount,
        communicationMode,

        // You can optionally store profilePictureUrl in another field
        // profilePictureUrl,
      },
    });

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error("Error creating admin profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
