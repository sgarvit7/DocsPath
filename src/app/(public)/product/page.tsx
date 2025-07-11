"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";

import WhyDocsPath from "@/components/publicPageComponents/ProductsPage/WhyDocspath";
import Image from "next/image";
import CoreCapabilities from "@/components/publicPageComponents/ProductsPage/CoreCapabilities";
import PricingPlans from "@/components/publicPageComponents/PricingPlans";

// interface Capability {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
// }

// interface ServiceTarget {
//   title: string;
//   description: string;
//   bgColor: string;
// }

const HealthcareLanding: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
        <Bell
          className={` ${darkMode ? "text-white" : "text-black"} w-6 h-6`}
        />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full cursor-pointer border border-black transition-colors duration-200 ${
            darkMode ? "bg-teal-600" : "bg-white"
          }`}
        >
          <div
            className={`absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="relative">
        {/* Header Section */}
        <div
          className={`relative overflow-hidden transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Background Pattern */}
          <Image
            src="/assets/bg-pattern.png"
            alt="bg"
            width={400}
            height={400}
            className="absolute -top-30 -left-30 z-0 opacity-50 rotate-180"
          />

          <div className="relative text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="col-span-3">
                <h1
                  className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-[#086861]"
                  }`}
                >
                  Powering the Future of Healthcare
                </h1>
                <p
                  className={`text-lg mb-4 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  DocsPath is more than a tool. It’s a comprehensive
                  infrastructure designed to streamline clinical workflows,
                  optimize operations, and elevate the standard of care.
                </p>
                <p
                  className={`text-lg mb-4 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Whether you&apos;re running a high-volume hospital or a private
                  practice, DocsPath replaces complexity with clarity—freeing
                  your team to do what matters most: treat patients
                </p>
              </div>

              <div className="col-span-2 relative w-full h-full">
                <div className="w-full h-[200px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-[3/2] overflow-hidden mx-auto">
                  <Image
                    src="/assets/prelogin-img/HealthcareProfessionals.png"
                    alt="Jobs"
                    fill
                    className="object-cover w-full rounded-[6rem] border border-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Core Capabilities Section */}
        {/* <div className="mb-20">
          <h2
            className={`text-4xl font-bold text-center mb-12 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Core Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className={`mb-4 ${capability.color}`}>
                  {capability.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {capability.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        <CoreCapabilities darkMode={darkMode} id="features" />

        <WhyDocsPath darkMode={darkMode} />

        <PricingPlans darkMode={darkMode} id="pricing" />
      </div>
    </div>
  );
};

export default HealthcareLanding;
