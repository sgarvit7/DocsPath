"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateWorkSchedulePreferences,
  previousStep,
} from "@/store/selfSlice";
import { AppDispatch, RootState } from "@/store/store";
import OnboardingLayout from "../OnboardingLayout";
import { useRouter } from "next/navigation";
import EndingScreen from "@/components/publicPageComponents/EndingScreen";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DayTiming = {
  start: string;
  end: string;
};

const WorkSchedulePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayTimings, setDayTimings] = useState<Record<string, DayTiming>>({});

  const dispatch = useDispatch<AppDispatch>();
  const { workSchedulePreferences, isLoading, error, isSubmitted } =
    useSelector((state: RootState) => state.selfOnboarding);
  const router = useRouter();

  const handleInputChange = (
    field: keyof typeof workSchedulePreferences,
    value: string
  ) => {
    dispatch(updateWorkSchedulePreferences({ [field]: value }));
  };

  const handleDaySelect = (day: string) => {
    if (selectedDays.includes(day)) {
      const updatedDays = selectedDays.filter((d) => d !== day);
      setSelectedDays(updatedDays);
      const updatedTimings = { ...dayTimings };
      delete updatedTimings[day];
      setDayTimings(updatedTimings);
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleTimeChange = (
    day: string,
    field: "start" | "end",
    value: string
  ) => {
    setDayTimings((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const scheduleStr = selectedDays
      .map((day) => {
        const timing = dayTimings[day];
        if (timing?.start && timing?.end) {
          return `${day}: ${timing.start}–${timing.end}`;
        }
        return null;
      })
      .filter(Boolean)
      .join(", ");

    handleInputChange("availableConsultationHours", scheduleStr);
  }, [dayTimings, selectedDays]);

  const handleSubmit = async () => {
    const allFilled = selectedDays.every(
      (day) => dayTimings[day]?.start && dayTimings[day]?.end
    );

    if (
      !workSchedulePreferences.availableConsultationHours ||
      !workSchedulePreferences.languageSpoken ||
      !allFilled
    ) {
      alert("Please fill in all required fields and timings.");
      return;
    }

    setSubmitted(true);
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back();
  };

  if (submitted) {
    return (
      <EndingScreen
        name="Self Onboarding"
        link="/clinic-management/dashboard/clinic-onboarding"
        delay={5000}
      />
    );
  }

  return (
    <OnboardingLayout currentStep={6}>
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
          {/* Day selection */}
          <div>
            <label className="block text-xs text-gray-500 mt-1 ml-4">
              Select Days & Timings*
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {weekdays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDaySelect(day)}
                  className={`px-3 py-2 text-xs rounded-full border ${
                    selectedDays.includes(day)
                      ? "bg-[#086861] text-white"
                      : "bg-[#F4F9F9] text-[#086861] border-[#086861]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {selectedDays.map((day) => (
              <div key={day} className="mt-3">
                <label className="block text-xs text-gray-500 ml-2 mb-1">
                  {day} Timing
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    required
                    value={dayTimings[day]?.start || ""}
                    onChange={(e) =>
                      handleTimeChange(day, "start", e.target.value)
                    }
                    className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                     focus:outline-none focus:ring-2 focus:ring-teal-500 
                     focus:border-transparent bg-[#F4F9F9] text-gray-700"
                  />
                  <span className="text-gray-500 text-sm">to</span>
                  <input
                    type="time"
                    required
                    value={dayTimings[day]?.end || ""}
                    onChange={(e) =>
                      handleTimeChange(day, "end", e.target.value)
                    }
                    className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                     focus:outline-none focus:ring-2 focus:ring-teal-500 
                     focus:border-transparent bg-[#F4F9F9] text-gray-700"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Read-only summary input */}
          <div>
            <input
              type="text"
              placeholder="Available Consultation Hours*"
              value={workSchedulePreferences.availableConsultationHours}
              readOnly
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 
                 focus:border-transparent bg-[#F4F9F9] text-gray-700 
                 placeholder-[#086861]"
            />
          </div>

          {/* Language Spoken */}
          <div>
            <label className="block text-xs text-gray-500 mt-1 ml-4">
              Language Spoken*
            </label>
            <select
              value={workSchedulePreferences.languageSpoken}
              onChange={(e) =>
                handleInputChange("languageSpoken", e.target.value)
              }
              className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-[#F4F9F9] text-gray-700 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundSize: "16px",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">Select</option>
              <option value="hin">Hindi</option>
              <option value="eng">English</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Additional Fields */}
          <textarea
            placeholder="Additional Information"
            value={workSchedulePreferences.additionalInformation}
            onChange={(e) =>
              handleInputChange("additionalInformation", e.target.value)
            }
            rows={3}
            className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-[#F4F9F9] text-gray-700 resize-none"
          />
          <input
            type="number"
            placeholder="Emergency Contact Details"
            value={workSchedulePreferences.emergencyContactDetails}
            onChange={(e) =>
              handleInputChange("emergencyContactDetails", e.target.value)
            }
            className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-[#F4F9F9] text-gray-700"
          />
          <textarea
            placeholder="Personal Bio"
            value={workSchedulePreferences.personalBio}
            onChange={(e) =>
              handleInputChange("personalBio", e.target.value)
            }
            rows={3}
            className="w-full p-3 pl-4 border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-[#F4F9F9] text-gray-700 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            Doctor data submitted successfully! Redirecting...
          </div>
        )}

        <div className="pt-6 flex gap-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-300 shadow-lg text-gray-700 py-3 cursor-pointer px-6 rounded-full font-medium hover:bg-gray-400 transition-colors"
            disabled={isLoading}
          >
            Back
          </motion.button>
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-[#086861] shadow-lg text-white py-3 px-6 cursor-pointer rounded-full font-medium hover:bg-teal-700 transition-colors disabled:bg-teal-400 disabled:cursor-not-allowed"
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
