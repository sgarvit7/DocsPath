import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "../../../../../cloudinary/uploadImageToCloudinary";
import { Doctor } from "@/store/doctorSlice";