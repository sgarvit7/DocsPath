"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HenryMedsArticle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="dark:bg-gray-900">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center mb-9 space-x-3 ">
        <Bell className="w-6 h-6" />
        <span
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-10 h-5 rounded-full border border-black transition-colors duration-200 ${
            darkMode ? "bg-teal-600" : "bg-white"
          }`}
        >
          <div
            className={`absolute top-[-2px] left-[2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200 ${
              darkMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 dark:border-2 px-4 sm:px-6 md:px-10 py-15 md:py-15 max-w-7xl mx-auto rounded-lg shadow-lg lg:mt-10 mb-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex-1">
            How Henry Meds is tackling the obesity epidemic—and transforming the
            patient experience
          </h1>
          <div className="flex-shrink-0 w-full md:w-auto max-w-sm">
            <Image
              src="/assets/prelogin-img/blog/blog41.jpg"
              alt="Doctor portrait"
              width={300}
              height={100}
              className="rounded-md object-cover w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="leading-relaxed text-base sm:text-lg md:text-xl pt-4"
        >
          Obesity is one of America’s biggest health issues. Despite the
          connection between weight and other health concerns, many Americans
          have been chronically underserved by traditional care. Henry Meds is
          offering a new way forward by making prescriptions more accessible
          with affordable telehealth plans.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold">
            Henry Meds’ vision
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            By making prescription medications more accessible to Americans,
            while avoiding middlemen and reducing costs, Henry Meds offers
            access to board-certified providers and weight-loss medications
            (like GLP-1s) through a simple telehealth model.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold">
            Improving accessibility
          </h2>
          <ul className="list-disc list-inside text-base sm:text-lg space-y-1">
            <li>Low-friction, subscription-based patient onboarding</li>
            <li>Access to board-certified providers</li>
            <li>Medications shipped directly to the patient</li>
            <li>Transparent pricing with no insurance required</li>
          </ul>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold">
            Telehealth + GLP-1s
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            GLP-1 medications (like semaglutide) are reshaping the weight-loss
            conversation. Henry Meds’ telehealth model ensures patients can
            access them affordably and safely without waiting weeks for
            appointments.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="space-y-3 pt-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold">
            How to get started
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Visit the Henry Meds website to take the first step toward a
            patient-first telehealth solution. Their simple onboarding and
            ongoing care model is designed for results.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
