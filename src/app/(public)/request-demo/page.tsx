"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext"; // adjust if needed
import EmailInput from "@/components/publicPageComponents/EmailInput";

export default function RequestDemoPage() {
  const inputClass =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6E66] dark:bg-gray-800 dark:border-gray-600 dark:text-white";

  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    // org: "",
    // role: "",
    date: "",
    notes: "",
  });

  const { user } = useAuth(); // AuthContext

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutofill = () => {
    if (!user) return;

    setFormData({
      fullName: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
       
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  return (
    <div className={clsx("min-h-screen flex flex-col")}>
      <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col lg:flex-row min-h-[600px]"
          >
            {/* Left Panel */}
            <div className="lg:w-1/2 bg-[#1F6E66] text-white rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col items-center justify-center text-center">
              <Image
                src="/assets/prelogin-img/request-demo.png"
                alt="image"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </div>

            {/* Right Panel */}
            <div className="lg:w-1/2 p-6 lg:p-10">
              <h3 className="text-3xl font-bold mb-2 text-center lg:text-left">
                Request a Demo
              </h3>
              <p className="mb-6 text-center lg:text-left text-sm text-gray-600 dark:text-gray-300">
                Fill out the form below to schedule a personalized
                demonstration.
              </p>
              <form className="space-y-5">
                {[
                  {
                    label: "Full Name",
                    type: "text",
                    name: "fullName",
                    placeholder: "John Doe",
                  },
                  {
                    label: "Email",
                    type: "email",
                    name: "email",
                    placeholder: "you@example.com",
                  },
                  {
                    label: "Mobile Number",
                    type: "tel",
                    name: "phone",
                    placeholder: "+1 (555) 123-4567",
                  },
                  {
                    label: "Hospital / Clinic Name",
                    type: "text",
                    name: "org",
                    placeholder: "Your Clinic Name",
                  },
                  {
                    label: "Designation",
                    type: "text",
                    name: "role",
                    placeholder: "Doctor, Admin...",
                  },
                  {
                    label: "Preferred Demo Date",
                    type: "date",
                    name: "date",
                    placeholder: "",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className={inputClass}
                      required={field.type !== "tel"}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Any specific features you'd like to see?"
                  />
                </div>

                {/* Terms and Submit */}
                <div className="mt-6 space-y-4">
                  {/* Terms */}
                  <label className="flex items-center space-x-3 text-sm cursor-pointer">
      {/* Toggle Switch */}
      <div className="relative">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="sr-only peer"
        />
         <div className="w-10 h-5 bg-gray-300 peer-checked:bg-teal-600 rounded-full transition-colors duration-200 shadow-inner"></div>
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></div>
      </div>
                    <span>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-700 font-medium hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!agreed}
                    className={`w-full px-6 py-3 rounded-md font-semibold text-white transition 
                    ${
                      agreed
                        ? "bg-[#025f54] hover:bg-[#014e44]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Submit 
                  </button>

                  {/* Autofill Button */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleAutofill}
                      className="text-sm text-blue-700 underline hover:text-blue-900"
                    >
                      Autofill from profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
