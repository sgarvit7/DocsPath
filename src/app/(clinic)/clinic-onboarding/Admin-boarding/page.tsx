"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo, nextStep } from "@/store/adminSlice";
import { RootState } from "@/store/store";
import { FileMetadata } from "@/store/adminSlice";
import OnboardingLayout from "./OnboardingLayout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state: RootState) => state.admin);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const name = sessionStorage.getItem("fullName") || localStorage.getItem("fullName");
    const email = sessionStorage.getItem("emailAddress") || localStorage.getItem("emailAddress");
    const phone = sessionStorage.getItem("phoneNumber") || localStorage.getItem("phoneNumber");

    if (name) dispatch(updatePersonalInfo({ fullName: name }));
    if (email) dispatch(updatePersonalInfo({ email: email }));
    if (phone) dispatch(updatePersonalInfo({ phone: phone }));
  }, [dispatch]);

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!data.secure_url) throw new Error("Upload failed");

        const uploadedFile: FileMetadata = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          url: data.secure_url,
        };

        dispatch(updatePersonalInfo({ profilePhoto: uploadedFile }));
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        alert("Image upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNext = () => {
    let dobError = "";
    if (!personalInfo.dateOfBirth) {
      dobError = "Date of Birth is required";
    } else {
      const dob = new Date(personalInfo.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        dobError = "Age should be above 18 years";
      }
    }

    const newErrors = {
      fullName: personalInfo.fullName ? "" : "Full Name is required",
      emailAddress: personalInfo.email ? "" : "Email is required",
      phoneNumber: personalInfo.phone ? "" : "Mobile Number is required",
      dateOfBirth: dobError,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;
    console.log(personalInfo);

    dispatch(nextStep());
    router.push("/clinic-onboarding/Admin-boarding/clinic-info");
  };

  return (
    <OnboardingLayout currentStep={1}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 max-w-lg mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl text-center font-medium text-gray-400 mb-6">
          Personal & Contact Information
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name*"
            readOnly
            value={personalInfo.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full p-2 sm:p-3 text-xs sm:text-sm cursor-not-allowed md:text-base pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
          />
          {errors.fullName && <p className="text-red-500 text-xs sm:text-sm">{errors.fullName}</p>}

          <input
            type="email"
            placeholder="E-mail*"
            readOnly
            value={personalInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-2 sm:p-3 cursor-not-allowed text-xs sm:text-sm md:text-base pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
          />
          {errors.emailAddress && <p className="text-red-500 text-xs sm:text-sm">{errors.emailAddress}</p>}

          <input
            type="tel"
            placeholder="Mobile No*"
            value={personalInfo.phone}
            readOnly
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full cursor-not-allowed p-2 sm:p-3 text-xs sm:text-sm md:text-base pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs sm:text-sm">{errors.phoneNumber}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div> 
              <label className="block text-xs sm:text-sm text-gray-500 mt-1">Date Of Birth *</label>
              <DatePicker
                selected={personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : null}
                onChange={(date) => {
                  if (date) {
                    const formattedDate = date.toISOString().split("T")[0];
                    handleInputChange("dateOfBirth", formattedDate);
                  }
                }}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date of Birth"
                className="w-full p-2 sm:p-3 text-xs sm:text-sm md:text-base pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700"
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs sm:text-sm">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-gray-500 mt-1">Gender</label>
              <select
                value={personalInfo.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full p-2 sm:p-3 text-xs sm:text-sm md:text-base pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 appearance-none pr-10"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <label className="block text-xs sm:text-sm text-gray-500 mt-1">Profile Photo (optional)</label>      
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />

          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`w-full p-2 sm:p-3 border border-gray-200 rounded-full bg-[#F4F9F9] cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              {personalInfo.profilePhoto?.url && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={personalInfo.profilePhoto.url}
                    alt="Profile preview"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <span className={personalInfo.profilePhoto?.url ? "text-gray-700 text-xs sm:text-sm" : "text-[#086861] text-xs sm:text-sm"}>
                {isUploading
                  ? "Uploading..."
                  : personalInfo.profilePhoto?.name || "Choose File"}
              </span>
            </div>

            {isUploading ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
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

        <div className="pt-6">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#086861] text-sm sm:text-base md:text-lg text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default PersonalInfoPage;
