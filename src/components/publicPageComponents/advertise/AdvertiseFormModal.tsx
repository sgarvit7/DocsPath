"use client";

import Image from "next/image";
import React from "react";

interface AdvertiseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvertiseFormModal: React.FC<AdvertiseFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4 overflow-y-auto py-8">
      <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button - always on top */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700 z-50"
        >
          &times;
        </button>

        {/* Left Section */}
        <div className="bg-teal-800 md:w-1/2 w-full flex justify-center items-center text-white text-center ">
          <Image
            src="/assets/prelogin-img/sales.png"
            alt="Healthcare"
            width={650}
            height={150}
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 lg:mt-20 sm:mt-0">
          <h2 className="text-2xl font-bold mb-6 mt-4 md:mt-0">Start Your Advertisement</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-700"
          >
            &times;
          </button>

          <form className="space-y-4">
            {[
              { label: "Full Name", type: "text", placeholder: "John Doe" },
              { label: "E-mail", type: "email", placeholder: "john.doe@example.com" },
              { label: "Mobile No", type: "tel", placeholder: "+1 (555) 123-4567" },
              { label: "Company Name", type: "text", placeholder: "ABC Pharma Inc." },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block font-medium">
                  {field.label} <span className="text-red-600">*</span>
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
            ))}

            <div>
              <label className="block font-medium">
                Your Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                rows={3}
                placeholder="Tell us about your advertising needs..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-800 text-white py-2 rounded hover:bg-teal-700 transition"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseFormModal;
