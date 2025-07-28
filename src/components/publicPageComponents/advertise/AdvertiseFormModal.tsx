"use client";

import Image from "next/image";
import React, { useState } from "react";
import EmailInput from "../EmailInput";
import PhoneInput from "../PhoneInput";

interface AdvertiseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvertiseFormModal: React.FC<AdvertiseFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({ email: false });
  const [phoneOk, setPhoneOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormErrors((prev) => ({
      ...prev,
      email: !emailPattern.test(email),
    }));
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (
      !formData.fullName.trim() ||
      !formData.email ||
      !formData.phone ||
      !formData.company.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formErrors.email || !phoneOk) {
      alert("Please enter valid contact info.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      alert("Your inquiry was submitted successfully.");
      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send your inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4 overflow-y-auto py-8">
      <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-22 lg:right-7 text-gray-500 text-2xl  hover:text-gray-700 z-50"
        >
          &times;
        </button>

        <div className="bg-teal-800 md:w-1/2 w-full flex justify-center items-center text-white text-center">
          <Image
            src="/assets/prelogin-img/salescard.png"
            alt="Healthcare"
            width={650}
            height={150}
            className="max-w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 mt-4 md:mt-25">Start Your Advertisement</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">E-mail *</label>
              <EmailInput value={formData.email} onChange={handleEmailChange} />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>
              )}
            </div>

            <div>
              <label className="block font-medium">Mobile No *</label>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                onValidate={setPhoneOk}
              />
            </div>

            <div>
              <label className="block font-medium">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Your Message</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows={3}
                placeholder="Tell us about your advertising needs..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseFormModal;
