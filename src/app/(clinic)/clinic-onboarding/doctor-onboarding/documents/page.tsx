"use client";
import React, { useRef} from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateVerificationDocument, nextStep, previousStep } from "@/store/doctorSlice";
import { RootState } from "@/store/store";
import OnboardingLayout from "../OnboardingLayout";
import { useRouter } from "next/navigation";

const VerificationDocumentPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { verificationDocument } = useSelector((state: RootState) => state.doctorOnboarding);

  const isUploading = false;

  const govIdRef = useRef<HTMLInputElement>(null);
  const degreeRef = useRef<HTMLInputElement>(null);
  const registrationRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (field: keyof typeof verificationDocument, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updateVerificationDocument({ [field]: file }));
    }
  };

  const handleNext = () => {
    if (!verificationDocument.governmentIssuedId || !verificationDocument.medicalDegreeCertificate) {
      alert("Please upload at least Government ID and Medical Degree Certificate");
      return;
    }
    console.log(verificationDocument)
    dispatch(nextStep());
    router.push("/clinic-onboarding/doctor-onboarding/work-preferences");
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back();
  };

  const FileUploadField: React.FC<{
    label: string;
    fieldKey: keyof typeof verificationDocument;
    fileRef: React.RefObject<HTMLInputElement>;
    isOptional?: boolean;
  }> = ({ label, fieldKey, fileRef, isOptional = false }) => {
    const fileData = verificationDocument[fieldKey] as File | null;

    return (
      <div>
        <label className="block text-xs text-gray-500 mt-1 ml-4">
          {label} {isOptional && "(Optional)"}
          {fileData && (
            <span className="ml-2 text-green-600">
              ({(fileData.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          )}
        </label>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => handleFileSelect(fieldKey, e)}
          className="hidden"
          disabled={isUploading}
        />
        <div
          onClick={() => !isUploading && fileRef.current?.click()}
          className={`w-full p-3 border border-gray-200 rounded-full bg-[#F4F9F9] cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className={fileData ? "text-[#086861] text-sm" : "text-[#08686180] text-sm"}>
            {isUploading ? "Uploading..." : fileData ? fileData.name : "Choose File (PDF/DOC/PNG/JPG)"}
          </span>
          {isUploading ? (
            <svg className="w-5 h-5 text-teal-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
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
          )}
        </div>
      </div>
    );
  };

  return (
    <OnboardingLayout currentStep={3}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl text-center font-medium text-gray-400 mb-6">Verification Document</h3>

        <div className="space-y-4">
          <FileUploadField label="Government-Issued ID*" fieldKey="governmentIssuedId" fileRef={govIdRef as React.RefObject<HTMLInputElement>} />
          <FileUploadField label="Medical Degree Certificate*" fieldKey="medicalDegreeCertificate" fileRef={degreeRef as React.RefObject<HTMLInputElement>} />
          <FileUploadField label="Medical Council Registration Certificate" fieldKey="medicalCouncilRegistrationCertificate" fileRef={registrationRef as React.RefObject<HTMLInputElement>} />
          <FileUploadField label="Experience Certificate" fieldKey="experienceCertificate" fileRef={experienceRef as React.RefObject<HTMLInputElement>} />
        </div>

        <div className="pt-6 flex gap-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-300 shadow-lg text-gray-700 cursor-pointer py-3 px-6 rounded-full font-bold hover:bg-gray-400 transition-colors"
            disabled={isUploading}
          >
            Back
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-[#086861] shadow-xl text-white py-3 px-6 cursor-pointer rounded-full font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default VerificationDocumentPage;
