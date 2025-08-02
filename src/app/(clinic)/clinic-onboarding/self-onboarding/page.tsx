"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalInfo, nextStep } from "@/store/selfSlice";
import { RootState } from "@/store/store";
import OnboardingLayout from "./OnboardingLayout";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { personalInfo } = useSelector((state: RootState) => state.selfOnboarding);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [phoneOk] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  // Prefill from localStorage
  useEffect(() => {
    const savedFullName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("emailAddress");
    const savedPhone = localStorage.getItem("phoneNumber");

    if (savedFullName || savedEmail || savedPhone) {
      dispatch(
        updatePersonalInfo({
          fullName: savedFullName || personalInfo.fullName,
          emailAddress: savedEmail || personalInfo.emailAddress,
          phoneNumber: savedPhone || personalInfo.phoneNumber,
        })
      );
    }
  }, [dispatch]);

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(updatePersonalInfo({ profilePhoto: file }));
    }
  };

  const handleNext = async () => {
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
        dobError = "Age should be above 18 years old";
      }
    }
    console.log(phoneOk);

    const newErrors = {
      fullName: personalInfo.fullName ? "" : "Full Name is required",
      emailAddress: personalInfo.emailAddress ? "" : "Email is required",
      phoneNumber: personalInfo.phoneNumber ? "" : "Mobile Number is required",
      dateOfBirth: dobError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((msg) => msg !== "");
    if (hasErrors) return;

    const formData = new FormData();
    formData.append("fullName", personalInfo.fullName);
    formData.append("emailAddress", personalInfo.emailAddress);
    formData.append("phoneNumber", personalInfo.phoneNumber);
    formData.append("dateOfBirth", personalInfo.dateOfBirth);
    formData.append("gender", personalInfo.gender);

    if (personalInfo.profilePhoto) {
      formData.append("profilePhoto", personalInfo.profilePhoto);
    }
    console.log(personalInfo);
    dispatch(updatePersonalInfo({ ...personalInfo }));
    dispatch(nextStep());
    router.push("/clinic-onboarding/self-onboarding/clinic-info");
  };

  return (
    <OnboardingLayout currentStep={1}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl text-center font-medium text-gray-400 mb-6">
          Personal & Contact Information
        </h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name*"
            value={personalInfo.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full p-3 text-xs pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
          />

          <input
            type="text"
            placeholder="Mobile Number*"
            value={personalInfo.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="w-full p-3 text-xs pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
          />

          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Email Address*"
              value={personalInfo.emailAddress}
              onChange={(e) => handleInputChange("emailAddress", e.target.value)}
              className="w-full p-3 text-xs pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 placeholder-[#086861]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mt-1">Date Of Birth *</label>
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
                className="w-full p-3 text-xs pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700"
              />

              {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label className="block text-xs text-gray-500 mt-1">Gender</label>
              <select
                value={personalInfo.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full p-3 text-xs pl-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-[#F4F9F9] text-gray-700 appearance-none pr-10"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mt-1">Profile Photo (Optional)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3 border border-gray-200 rounded-full bg-[#F4F9F9] cursor-pointer hover:bg-gray-100 flex items-center justify-between"
            >
              <span className="text-[#086861] text-sm">
                {personalInfo.profilePhoto ? personalInfo.profilePhoto.name : "Choose File"}
              </span>
              <svg
                className="w-5 h-5 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#086861] text-lg text-white py-3 px-6 rounded-full font-bold hover:bg-teal-700 transition-colors"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default PersonalInfoPage;
