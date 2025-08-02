"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDocuments,
  previousStep,
  submitAdminData,
} from "@/store/adminSlice";
import { FileMetadata } from "@/store/adminSlice";
import { RootState } from "@/store/store";
import OnboardingLayout from "../OnboardingLayout";
import { useRouter } from "next/navigation";
import EndingScreen from "@/components/publicPageComponents/EndingScreen";
// import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";

interface FormState {
  governmentId: FileMetadata | null;
  registrationCertificate: FileMetadata | null;
  accreditation: FileMetadata | null;
  departments: string;
  doctorsCount: string;
  communicationMode: string;
}

const VerificationDocumentPage: React.FC = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const documents = useSelector((state: RootState) => state.admin.documents);
  const profilePhoto = useSelector(
    (state: RootState) => state.admin.personalInfo.profilePhoto
  );
  // const loading = useSelector((state: RootState) => state.admin.loading);
  const error = useSelector((state: RootState) => state.admin.error);
  const success = useSelector((state: RootState) => state.admin.success);

  const [formData, setFormData] = useState<FormState>({
    governmentId: documents.governmentId || null,
    registrationCertificate: documents.registrationCertificate || null,
    accreditation: documents.accreditation || null,
    departments: documents.departments || "",
    doctorsCount: documents.doctorsCount || "",
    communicationMode: documents.communicationMode || "",
  });

  const [formErrors, setFormErrors] = useState({
    governmentId: "",
    registrationCertificate: "",
    accreditation: "",
    communicationMode: "",
  });

  const govIdInputRef = useRef<HTMLInputElement>(null);
  const regCertInputRef = useRef<HTMLInputElement>(null);
  const accreditationInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    field: keyof Pick<
      FormState,
      "governmentId" | "registrationCertificate" | "accreditation"
    >,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "your_upload_preset"); // Replace
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Upload failed");

      const fileData: FileMetadata = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        url: data.secure_url,
      };

      setFormData((prev) => ({ ...prev, [field]: fileData }));
      dispatch(updateDocuments({ [field]: fileData }));

      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    } catch (err) {
      console.error("File upload error:", err);
      alert("File upload failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    dispatch(updateDocuments({ [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getFileName = (fileData: FileMetadata | null) => {
    if (!fileData) return "";
    return fileData.name.length > 20
      ? fileData.name.slice(0, 17) + "..."
      : fileData.name;
  };

  // const validateForm = () => {
  //   const errors = {
  //     governmentId: "",
  //     registrationCertificate: "",
  //     accreditation: "",
  //     communicationMode: "",
  //   };
  //   let isValid = true;

  //   if (!formData.governmentId) {
  //     errors.governmentId = "Government-issued ID is required";
  //     isValid = false;
  //   }
  //   if (!formData.registrationCertificate) {
  //     errors.registrationCertificate = "Registration certificate is required";
  //     isValid = false;
  //   }
  //   if (!formData.communicationMode) {
  //     errors.communicationMode = "Preferred mode of communication is required";
  //     isValid = false;
  //   }

  //   setFormErrors(errors);
  //   return isValid;
  // };

  const urlToFile = async (meta: FileMetadata): Promise<File> => {
    const response = await fetch(meta.url!);
    const blob = await response.blob();
    return new File([blob], meta.name, {
      type: meta.type,
      lastModified: meta.lastModified,
    });
  };

  const handleNext = async () => {
    // if (!validateForm()) return;

    try {
      setIsUploading(true);

      const files = {
        governmentId: formData.governmentId
          ? await urlToFile(formData.governmentId)
          : undefined,
        registrationCertificate: formData.registrationCertificate
          ? await urlToFile(formData.registrationCertificate)
          : undefined,
        accreditation: formData.accreditation
          ? await urlToFile(formData.accreditation)
          : undefined,
        profilePhoto: profilePhoto ? await urlToFile(profilePhoto) : undefined,
      };

await dispatch(submitAdminData(files)).unwrap(); 

      setSubmitted(true);
    } catch (err) {
      console.error("Final Submission Error:", err);
      alert("Submission failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back();
  };

  if (submitted) {
    return (
      <EndingScreen
        name="Admin Onboarding"
        link="/clinic-management/dashboard/admin"
        delay={1000}
      />
    );
  }

  const communicationModes = ["Email", "Phone", "SMS", "WhatsApp"];

  return (
    <OnboardingLayout currentStep={3}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl text-center font-medium text-gray-400 mb-6">
          Verification Document
        </h3>

        {/* Government ID */}
        <div>
          <label className="block text-xs text-gray-500 mt-1 ml-4">
            Upload Government Issued ID* [.pdf/.jpg//.png/.jpeg]
          </label>
          <input
            type="file"
            ref={govIdInputRef}
            onChange={(e) => handleFileUpload("governmentId", e)}
            className="hidden"
            accept="image/*,.pdf"
          />
          <div
            className={`w-full p-2 border text-sm rounded-full bg-[#F4F9F9] flex justify-between items-center cursor-pointer ${
              formErrors.governmentId ? "border-red-500" : ""
            }`}
            onClick={() => govIdInputRef.current?.click()}
          >
            <span className="text-[#086861] truncate">
              {getFileName(formData.governmentId)}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-teal-600 bg-white p-1 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M16 16l-4-4-4 4" />
                <path d="M12 12v9" />
                <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
              </svg>
            </span>
          </div>
          {formErrors.governmentId && (
            <p className="text-red-500 text-xs mt-1 ml-4">
              {formErrors.governmentId}
            </p>
          )}
        </div>

        {/* Registration Certificate */}
        <div>
          <label className="block text-xs text-gray-500 mt-1 ml-4">
            Upload Clinic/Hospital Registration Certificate*
            [.pdf/.jpg//.png/.jpeg]
          </label>
          <input
            type="file"
            ref={regCertInputRef}
            onChange={(e) => handleFileUpload("registrationCertificate", e)}
            className="hidden"
            accept="image/*,.pdf"
          />
          <div
            className={`w-full p-2 border text-sm rounded-full bg-[#F4F9F9] flex justify-between items-center cursor-pointer ${
              formErrors.registrationCertificate
                ? "border-red-500"
                : ""
            }`}
            onClick={() => regCertInputRef.current?.click()}
          >
            <span className="text-[#086861] truncate">
              {getFileName(formData.registrationCertificate)}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-teal-600 bg-white p-1 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M16 16l-4-4-4 4" />
                <path d="M12 12v9" />
                <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
              </svg>
            </span>
          </div>
          {formErrors.registrationCertificate && (
            <p className="text-red-500 text-xs mt-1 ml-4">
              {formErrors.registrationCertificate}
            </p>
          )}
        </div>

        {/* Accreditation - Optional */}
        <div>
          <label className="block text-xs text-gray-500 mt-1 ml-4">
            Upload Accreditation (if applicable) [.pdf/.jpg//.png/.jpeg]
          </label>
          <input
            type="file"
            ref={accreditationInputRef}
            onChange={(e) => handleFileUpload("accreditation", e)}
            className="hidden"
            accept="image/*,.pdf"
          />
          <div
            className="w-full p-2 border border-gray-200 text-sm rounded-full bg-[#F4F9F9] flex justify-between items-center cursor-pointer"
            onClick={() => accreditationInputRef.current?.click()}
          >
            <span className="text-[#086861] truncate">
              {getFileName(formData.accreditation)}
            </span>
            {/* <span className=" text-[#00665B] text-xl  mr-1 ">
              ☁
            </span> */}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-teal-600 bg-white p-1 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M16 16l-4-4-4 4" />
                <path d="M12 12v9" />
                <path d="M20.39 18.39A5.5 5.5 0 0018 9h-1.26A8 8 0 104 16.3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Dropdowns */}
        <div>
          <select
            name="departments"
            value={formData.departments}
            onChange={handleChange}
            className="w-full p-3 rounded-full bg-[#F4F9F9] text-[#086861] border border-gray-200"
          >
            <option value="">Select Speciality Offered</option>
            {[
              "Allergy and Immunology",
              "Anesthesiology",
              "Cardiology",
              "Dermatology",
              "Diabetology",
              "Emergency Medicine",
              "Endocrinology",
              "ENT",
              "Family Medicine",
              "Gastroenterology",
              "General Medicine",
              "Gynecology",
              "Hematology",
              "Infectious Disease",
              "Internal Medicine",
              "Nephrology",
              "Neurology",
              "Oncology",
              "Ophthalmology",
              "Orthopedics",
              "Pathology",
              "Pediatrics",
              "Plastic Surgery",
              "Psychiatry",
              "Pulmonology",
              "Radiology",
              "Rheumatology",
              "Sports Medicine",
              "Urology",
            ].map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="doctorsCount"
            value={formData.doctorsCount}
            onChange={handleChange}
            className="w-full p-3 rounded-full bg-[#F4F9F9] text-[#086861] border border-gray-200"
          >
            <option value="">Number Of Doctors</option>
            {Array.from({ length: 2000 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="communicationMode"
            value={formData.communicationMode}
            onChange={handleChange}
            className={`w-full p-3 rounded-full bg-[#F4F9F9] text-[#086861] border ${
              formErrors.communicationMode
                ? "border-red-500"
                : "border-gray-200"
            }`}
          >
            <option value="">Preferred Mode Of Communication</option>
            {communicationModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {formErrors.communicationMode && (
            <p className="text-red-500 text-xs mt-1 ml-4">
              {formErrors.communicationMode}
            </p>
          )}
        </div>

        {/* Feedback / Errors */}
        {isUploading && (
          <p className="text-sm text-center text-teal-600">Uploading...</p>
        )}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {String(error)}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            Submitted successfully!
          </div>
        )}

        {/* Navigation */}
        <div className="pt-6 flex gap-4">
          <motion.button
            onClick={handleBack}
            className="flex-1 bg-gray-300 py-3 px-6 rounded-full font-bold text-gray-700 hover:bg-gray-400"
          >
            Back
          </motion.button>
          <motion.button
            onClick={handleNext}
            disabled={isUploading}
            className="flex-1 bg-[#086861] py-3 px-6 rounded-full font-bold text-white hover:bg-teal-700 disabled:opacity-50"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default VerificationDocumentPage;
