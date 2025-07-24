"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { Inter, Roboto } from "next/font/google";
import EmailInput from "@/components/publicPageComponents/EmailInput";
import PhoneInput from "@/components/publicPageComponents/PhoneInput";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function RequestDemoPage() {
  const inputClass = clsx(
    "w-full px-4 py-2 border-b-2  focus:outline-none focus:ring-2 focus:ring-[#1F6E66] dark:bg-gray-800 dark:border-gray-600 dark:text-white",
    roboto.className
  );

  const [agreed, setAgreed] = useState(false);
  const [formErrors, setFormErrors] = useState({ email: false });
  const [phoneOk, setPhoneOk] = useState(false);

const handlePhoneChange = (phone: string) => {
  setFormData((prev) => ({ ...prev, phone }));
};


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    org: "",
    role: "",
    date: "",
    notes: "",
  });

  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFormErrors((prev) => ({
        ...prev,
        email: !emailPattern.test(value),
      }));
    }
  };
  

  const handleAutofill = () => {
    if (!user) return;

    setFormData({
      fullName: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
      org: "",
      role: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  const handleEmailChange = (email: string) => {
  setFormData((prev) => ({ ...prev, email }));

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setFormErrors((prev) => ({
    ...prev,
    email: !emailPattern.test(email),
  }));
};


  const isFormValid =
    agreed &&
    !formErrors.email &&
    formData.fullName &&
    formData.email &&
    phoneOk &&
    formData.date;

  return (
    <div className={clsx("min-h-screen flex flex-col", inter.className)}>
      <div className={clsx("bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col min-h-screen", inter.className)}>
        <main className={clsx("flex-grow container mx-auto px-4 py-8 lg:py-12", inter.className)}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={clsx("bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col lg:flex-row min-h-[600px]", inter.className)}
          >
            <div className={clsx("lg:w-1/2 bg-[#1F6E66] text-white rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none flex flex-col items-center justify-center text-center", inter.className)}>
              <Image
                src="/assets/prelogin-img/request-demo.png"
                alt="image"
                width={0}
                height={0}
                className={clsx("w-full h-full")}
              />
            </div>

            <div className={clsx("lg:w-1/2 p-6 lg:p-10", inter.className)}>
              <h3 className={clsx("text-3xl font-bold mb-2 text-center lg:text-left", inter.className)}>Request a Demo</h3>

              <form className={clsx("space-y-5", inter.className)} onSubmit={(e) => e.preventDefault()}>
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm mb-2">
                    Full Name <span className="text-red-600 text-2xl">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-2">
                    E-mail <span className="text-red-600 text-2xl">*</span>
                  </label>
                  <EmailInput
                  value={formData.email}
                  onChange={handleEmailChange}
                />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter a valid email (e.g. you@example.com).
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-2">
                    Mobile No <span className="text-red-600 text-2xl">*</span>
                  </label>
                   <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              onValidate={setPhoneOk}
            />

                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm mb-2">
                    Hospital / Clinic Name
                  </label>
                  <input
                    type="text"
                    name="org"
                    placeholder="Your Clinic Name"
                    value={formData.org}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {/* Role */}
                <div>
  <label className="block text-sm mb-2">
    Designation
  </label>
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className={inputClass}
  >
    <option value="">Select Designation</option>
    <option value="Doctor">Doctor</option>
    <option value="Admin">Admin</option>
    <option value="Self">Self</option>
  </select>
</div>


                {/* Date */}
                <div>
                  <label className="block text-sm mb-2">
                    Preferred Demo Date <span className="text-red-600 text-2xl">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder=""
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <label className="flex items-center space-x-3 text-sm cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 peer-checked:bg-teal-600 rounded-full transition-colors duration-200 shadow-inner" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
                    </div>
                    <span className={clsx("text-[#7B809A]", inter.className)}>
                      I agree to the <a href="#" className="text-[#344767] font-semibold underline hover:underline">Terms and Conditions</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={clsx("w-full px-6 py-3 rounded-md font-semibold text-white transition", {
                      "bg-[#005A51] hover:bg-[#014e44]": isFormValid,
                      "bg-gray-400 cursor-not-allowed": !isFormValid,
                    })}
                  >
                    Submit
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleAutofill}
                      className={clsx("text-md text-[#344767] underline cursor-pointer hover:text-blue-900", roboto.className)}
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
