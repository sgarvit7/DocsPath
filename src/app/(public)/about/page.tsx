// app/about/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AboutHero from "@/components/publicPageComponents/aboutPageComponents/AboutHero";
import MissionVision from "@/components/publicPageComponents/aboutPageComponents/MissionVision";
import LeadershipTeam from "@/components/publicPageComponents/aboutPageComponents/LeadershipTeam";
import Awards from "@/components/publicPageComponents/aboutPageComponents/Awards";
import Partnership from "@/components/publicPageComponents/aboutPageComponents/Partnership";
import CareersBanner from "@/components/publicPageComponents/aboutPageComponents/CareersBanner";
import Image from "next/image";
import { Bell } from "lucide-react";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen mt-10"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/lower-bg-pattern.png"
          alt="bg"
          width={350}
          height={350}
          className="absolute -top-10 -right-10 z-0 rotate-180 scale-x-[-1] opacity-50"
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
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

      <AboutHero darkMode={darkMode} />
      <MissionVision darkMode={darkMode} id="mission"/>
      <LeadershipTeam darkMode={darkMode} id="leadership" />
      <CareersBanner darkMode={darkMode}/>
      <Awards darkMode={darkMode} id="awards" />
      <Partnership darkMode={darkMode} id="partnership"/>
    </motion.div>
  );
}
