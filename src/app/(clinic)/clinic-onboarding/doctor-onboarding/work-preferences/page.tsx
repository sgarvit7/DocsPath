"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkSchedulePreferences,
  previousStep,
  submitDoctorOnboarding,
} from "@/store/doctorSlice";
import { AppDispatch, RootState } from "@/store/store";
import OnboardingLayout from "../OnboardingLayout";
import { useRouter } from "next/navigation";

const WorkSchedulePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workSchedulePreferences, isLoading, error, isSubmitted } =
    useSelector((state: RootState) => state.doctorOnboarding);
  const router = useRouter();

  const handleInputChange = (
    field: keyof typeof workSchedulePreferences,
    value: string
  ) => {
    dispatch(updateWorkSchedulePreferences({ [field]: value }));
  };

  // redirect to doctor dashboard is submitted sucessfully.
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        router.push("/clinic-management/dashboard/doctor");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = async () => {
    // Basic validation
    if (
      !workSchedulePreferences.availableConsultationHours ||
      !workSchedulePreferences.languageSpoken
    ) {
      alert("Please fill in the required fields");
      return;
    }

    try {
      const doctorData = await dispatch(submitDoctorOnboarding()).unwrap();
      console.log(doctorData);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back();
  };

  return (
    <OnboardingLayout currentStep={4}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl text-center font-medium text-gray-400 mb-6">
          Work schedule & Preferences
        </h3>

        <div className="space-y-4">
          {/* Available Consultation Hours */}
          <div>
            <input
              type="number"
              placeholder="Available Consultation Hours"
              value={workSchedulePreferences.availableConsultationHours}
              onChange={(e) =>
                handleInputChange("availableConsultationHours", e.target.value)
              }
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861]"
            />
          </div>

          {/* Preferred Mode of Consultation */}
          <div>
            <select
              value={workSchedulePreferences.preferredModeOfConsultation}
              onChange={(e) =>
                handleInputChange("preferredModeOfConsultation", e.target.value)
              }
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundSize: "16px",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">Preferred Mode Of Consultation</option>
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Language Spoken */}
          <div>
            <input
              type="text"
              placeholder="Language Spoken"
              value={workSchedulePreferences.languageSpoken}
              onChange={(e) =>
                handleInputChange("languageSpoken", e.target.value)
              }
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861]"
            />
          </div>

          {/* Additional Information */}
          <div>
            <textarea
              placeholder="Additional Information"
              value={workSchedulePreferences.additionalInformation}
              onChange={(e) =>
                handleInputChange("additionalInformation", e.target.value)
              }
              rows={3}
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861] resize-none"
            />
          </div>

          {/* Emergency Contact Details */}
          <div>
            <input
              type="number"
              placeholder="Emergency Contact Details"
              value={workSchedulePreferences.emergencyContactDetails}
              onChange={(e) =>
                handleInputChange("emergencyContactDetails", e.target.value)
              }
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861]"
            />
          </div>

          {/* Personal Bio */}
          <div>
            <textarea
              placeholder="Personal Bio"
              value={workSchedulePreferences.personalBio}
              onChange={(e) => handleInputChange("personalBio", e.target.value)}
              rows={3}
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861] resize-none"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
  <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
    Doctor data submitted successfully! Redirecting...
  </div>
)}

        {/* Navigation Buttons */}
        <div className="pt-6 flex gap-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-300 shadow-lg text-gray-700 py-3 px-6 rounded-full font-medium hover:bg-gray-400 transition-colors"
            disabled={isLoading}
          >
            Back
          </motion.button>
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-[#086861] shadow-lg text-white py-3 px-6 rounded-full font-medium hover:bg-teal-700 transition-colors disabled:bg-teal-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default WorkSchedulePage;
