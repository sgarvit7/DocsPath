"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function FDAArticlePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div>
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3">
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

      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 py-18">
        {/* 📄 Article Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          {/* Title + Image Wrapper */}
          <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
            <div className="flex-1">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2"
                variants={fadeInUp}
                custom={1}
              >
                New FDA-Approved Treatments in 2025:
                <br />
                What Doctors Need to Know
              </motion.h1>
              <motion.p
                className="text-sm text-gray-600 dark:text-gray-400 mb-4"
                variants={fadeInUp}
                custom={2}
              >
                March 5, 2025 | Dr. Rohit Malhotra
              </motion.p>
            </div>

            <motion.div variants={fadeInUp} custom={0}>
              <Image
                src="/assets/prelogin-img/blog/blog31.jpg"
                alt="FDA 2025 Approval Article"
                width={300}
                height={180}
                className="rounded-md object-cover w-full max-w-xs md:max-w-sm"
              />
            </motion.div>
          </div>

          {/* Intro */}
          <motion.p
            className="mb-6 text-base sm:text-lg md:text-xl"
            variants={fadeInUp}
            custom={3}
          >
            The FDA has approved groundbreaking new drugs and therapies in 2025
            that could revolutionize patient care. From gene therapy to next-gen
            cancer treatments, these approvals mark a major step forward in
            medicine.
          </motion.p>

          {/* Treatments Section */}
          <motion.h2
            className="font-semibold mb-3 text-lg sm:text-xl"
            variants={fadeInUp}
            custom={4}
          >
            Top 3 FDA-Approved Treatments in 2025
          </motion.h2>

          {[
            {
              title: "1. CRISPR-Based Gene Therapy for Genetic Disorders",
              name: "GenCureX™",
              approvedFor: "Sickle Cell Disease, Beta Thalassemia",
              how: "Uses CRISPR gene-editing technology to correct faulty genes, offering a potential cure.",
            },
            {
              title: "2. AI-Enhanced Cancer Immunotherapy",
              name: "ImmunoX AI™",
              approvedFor: "Lung Cancer, Melanoma",
              how: "AI-driven analysis of a patient’s immune system to personalize cancer treatment for better results.",
            },
            {
              title: "3. Next-Generation Alzheimer’s Drug",
              name: "NeuroGuard™",
              approvedFor: "Early-Stage Alzheimer’s Disease",
              how: "Targets amyloid plaques and tau proteins, slowing cognitive decline significantly.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="mb-5 text-base sm:text-lg space-y-1"
              variants={fadeInUp}
              custom={5 + i}
            >
              <p className="font-medium">{item.title}</p>
              <p>
                ✔ Treatment Name: <strong>{item.name}</strong>
              </p>
              <p>✔ Approved For: {item.approvedFor}</p>
              <p>✔ How It Works: {item.how}</p>
            </motion.div>
          ))}

          {/* Impact Section */}
          <motion.h2
            className="font-semibold mt-10 mb-3 text-lg sm:text-xl"
            variants={fadeInUp}
            custom={9}
          >
            What This Means for Doctors
          </motion.h2>

          <motion.ul
            className="list-disc ml-5 space-y-2 text-base sm:text-lg mb-8"
            initial="hidden"
            animate="visible"
          >
            {[
              "New Treatment Protocols – Physicians must update treatment plans to include these cutting-edge therapies.",
              "Patient Access & Insurance – Availability might be limited due to costs; insurance providers will determine coverage.",
              "Training & Adoption – Doctors must stay updated on how to administer and monitor these new treatments.",
            ].map((point, i) => (
              <motion.li key={i} variants={fadeInUp} custom={10 + i}>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {/* Conclusion */}
          <motion.h2
            className="font-semibold text-lg sm:text-xl mb-2"
            variants={fadeInUp}
            custom={13}
          >
            Conclusion
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg"
            variants={fadeInUp}
            custom={14}
          >
            2025’s FDA-approved drugs mark a new era in medicine, offering hope
            for previously untreatable conditions. Physicians must stay informed
            to provide the best care for their patients.
          </motion.p>
        </motion.section>
      </main>
    </div>
  );
}
