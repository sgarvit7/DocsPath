"use client";

import { useState } from "react";
import EmailInput from "@/components/publicPageComponents/EmailInput";
import PhoneInput from "@/components/publicPageComponents/PhoneInput";

interface JobApplicationProps {
  jobTitle: string;
}

export default function JobApplication({ jobTitle }: JobApplicationProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: null as File | null,
  });

  const [phoneOk, setPhoneOk] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files?.[0] || null;
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      console.log(jobTitle)
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Application submitted:", formData);
  };

  return (
    <div className="bg-white border border-[#086861] dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-6">
        Apply for this position
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-red-800 text-xl">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            className="w-full px-3 py-2 placeholder:text-xs border-b dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-mail <span className="text-red-800 text-xl">*</span>
          </label>
          <EmailInput
            value={formData.email}
            onChange={(email) =>
              setFormData((prev) => ({ ...prev, email }))
            }
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Mobile No. <span className="text-red-800 text-xl">*</span>
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(phone) =>
              setFormData((prev) => ({ ...prev, phone }))
            }
            onValidate={setPhoneOk}
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resume (.pdf,.doc,.docx) <span className="text-red-800 text-xl">*</span>
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleFileChange}
            className="w-full px-3 py-2 border-b dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        {/* Cover Letter Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover letter (.pdf,.doc,.docx)
          </label>
          <input
            type="file"
            name="coverLetter"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleFileChange}
            className="w-full px-3 py-2 border-b dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
        </div>

        {/* Terms Toggle Switch */}
        <div className="flex  items-center justify-between">
          <button
            type="button"
            onClick={() => setAcceptedTerms(!acceptedTerms)}
            className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
              acceptedTerms ? "bg-teal-600" : ""
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                acceptedTerms ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <label className="text-sm mr-66 text-gray-700 dark:text-gray-300">
            I agree to the{" "}
            <a href="#" className="text-teal-600 hover:text-teal-500">
              Terms and Conditions
            </a>
          </label>
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!phoneOk || !acceptedTerms}
          className="w-full bg-[#005A51] hover:bg-teal-700 cursor-pointer text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-60"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
