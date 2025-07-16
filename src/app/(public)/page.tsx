"use client";

import {  useState } from "react";
import { Bell } from "lucide-react";
import HeroSection from "@/components/publicPageComponents/HeroSection";
import CoreFeaturesSection from "@/components/publicPageComponents/CoreFeaturesSection";
import HowItWorksSection from "@/components/publicPageComponents/HowItWorksSection";
import TestimonialsSection from "@/components/publicPageComponents/TestimonialsSection";
import AwardsSection from "@/components/publicPageComponents/AwardsSection";
import FAQSection from "@/components/publicPageComponents/FAQSection";
import WhoIsThisFor from "@/components/publicPageComponents/WhoIsThisFor";


export default function Page() {
  const [darkMode, setDarkMode] = useState(false);


  

  return (
    <main className="min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-20">
        <Bell className="w-6 h-6" />
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
      <HeroSection darkMode={darkMode} />
      <CoreFeaturesSection darkMode={darkMode} />
      <WhoIsThisFor darkMode={darkMode} />
      <HowItWorksSection darkMode={darkMode} />
      <TestimonialsSection darkMode={darkMode} />
      <AwardsSection darkMode={darkMode} />
      <FAQSection darkMode={darkMode} />
    </main>
  );
}
