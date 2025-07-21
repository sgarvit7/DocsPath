"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Bell } from "lucide-react";
import clsx from "clsx";
import { Inter, Roboto, Roboto_Slab } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "500", "700"] });

const sections = [
  {
    title: "Appointment & Scheduling",
    items: ["How to schedule an appointment?", "Can I reschedule or cancel?"],
  },
  {
    title: "Prescription & ePharmacy",
    items: ["Upload prescriptions", "ePharmacy partner guide"],
  },
  {
    title: "Billing, payment & insurance",
    items: ["Accepted insurance plans", "Generate patient invoices"],
  },
  {
    title: "Security, Compliance & data privacy",
    items: ["HIPAA compliance", "How is my data protected?"],
  },
  {
    title: "Electronic Health Records EHR",
    items: ["How to update records?", "Exporting EHR documents"],
  },
  {
    title: "Telemedicine & virtual consultations",
    items: ["Start a virtual consultation", "Supported devices"],
  },
  {
    title: "AI voice agent & automated calls",
    items: ["Set up voice assistant", "Call logs"],
  },
  {
    title: "Troubleshooting & common issues",
    items: ["Not receiving OTP", "App crashing on login"],
  },
  {
    title: "FAQ",
    items: ["What is Docspath?", "Is DocsPath free to use?"],
  },
];

const KnowledgeBasePage = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  // Update localStorage and optionally add a dark class to <body> or <html>
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Utility to highlight matched keyword
  const highlight = (text: string, term: string) => {
    if (!term) return text;
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedTerm})`, "gi");
    return text.replace(regex, `<span class="text-teal-500 font-semibold">$1</span>`);
  };

  // Open relevant sections automatically when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setOpenSections({});
      return;
    }

    const newOpenSections: Record<string, boolean> = {};
    sections.forEach((section) => {
      const matched = section.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matched) newOpenSections[section.title] = true;
    });
    setOpenSections(newOpenSections);
  }, [searchTerm]);

  return (
    <div className={clsx({ dark: darkMode }, "min-h-screen dark:bg-gray-900 ", inter.className)}>
      {/* Dark Mode Toggle */}
      <div className={clsx("absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10")}>
        <Bell className="w-6 h-6" />
        <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>Dark mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "relative w-10 h-5 rounded-full cursor-pointer border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white"
          )}
        >
          <div
            className={clsx(
              "absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>

      {/* Header */}
      <div className={clsx("transition-colors duration-300 pt-17 pb-9 dark:bg-gray-900")}>
        <div
          className={clsx(
            "dark:bg-[#111827] bg-no-repeat w-full bg-center py-6 px-4 sm:px-8 md:px-16 lg:px-20 bg-[url('/assets/prelogin-img/kbBackground.png')] dark:bg-[url('/assets/prelogin-img/kb2.png')] dark:py-9"
          )}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx("text-2xl sm:text-3xl font-bold text-[#005C56] pt-15 mt-5 lg:mx-43 dark:text-[#101828] dark:pt-5", robotoSlab.className)}
          >
            Knowledge Base
          </motion.h1>

          {/* Search */}
          <div className={clsx("max-w-4xl my-3 text-center px-4")}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={clsx("text-[#505050] dark:text-[#101828] mb-4", roboto.className)}
            >
              Find step by step guides, FAQs, troubleshooting solutions, and best practices
            </motion.p>
            <div className="flex justify-center">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for guide, FAQs, troubleshooting..."
                  className={clsx("w-full rounded-md bg-white border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-gray-600", roboto.className)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-300 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="dark:bg-gray-900 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={clsx("max-w-3xl lg:mx-50 bg-white border-[black] border-1 dark:bg-gray-800 shadow-lg z-10 rounded-xl p-6", roboto.className)}
          style={{ boxShadow: "0 5px 2px -2px rgba(0, 0, 0, 0.4)" }}
        >
          <h2 className={clsx("text-lg font-semibold text-[#005C56] dark:text-teal-300", roboto.className)}>Getting started</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <span className="text-[#086861] dark:text-teal-400 font-medium">How to create an account?</span> - Click Sign up, choose your role, verify Email and log in.
            </li>
            <li>
              <span className="text-[#086861] dark:text-teal-400 font-medium">Setting up your profile</span> - Doctors add specialization; Admins configure settings.
            </li>
          </ul>
        </motion.div>

        <span>
          <Image
            src={darkMode ? "/assets/prelogin-img/kb-img2.png" : "/assets/prelogin-img/kb-img2.png"}
            alt="pattern"
            height={100}
            width={100}
            className="ml-6 -mt-19 hidden lg:block"
          />
          <Image
            src={darkMode ? "/assets/prelogin-img/kb-img1.png" : "/assets/prelogin-img/kb-img1.png"}
            alt="pattern"
            height={100}
            width={100}
            className="ml-330 inset-0 z-0 -mt-25 hidden lg:block"
          />
        </span>

        {/* FAQ Sections */}
        <div className="max-w-6xl mx-auto lg:-mt-1 sm:mt-10 px-4 grid grid-cols-1 md:grid-cols-2">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={clsx("bg-white dark:bg-gray-900 p-4", robotoSlab.className)}
            >
              <button
                className={clsx("w-full text-left cursor-pointer flex justify-between items-center text-[#005C56] dark:text-teal-300 font-black text-lg", robotoSlab.className)}
                onClick={() => setOpenSections((prev) => ({ ...prev, [section.title]: !prev[section.title] }))}
              >
                {section.title}
                <ChevronDown className={clsx("w-5 h-5 transition-transform duration-300", { "rotate-180": openSections[section.title] })} />
              </button>

              <AnimatePresence>
                {openSections[section.title] && (
                  <motion.ul
                    key="dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-4 mt-3 space-y-1 text-md text-gray-700 dark:text-gray-300 overflow-hidden"
                  >
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="list-disc ml-4"
                        dangerouslySetInnerHTML={{ __html: highlight(item, searchTerm) }}
                      />
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer Help Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={clsx("max-w-3xl lg:mx-50 mt-10 p-6 rounded-xl bg-[#d7f0ee] border-[black] border-1 dark:bg-gray-800 dark:border-gray-700 text-gray-600 dark:text-gray-300 ", roboto.className)}
          style={{ boxShadow: "0 5px 2px -2px rgba(0, 0, 0, 0.4)" }}
        >
          <h3 className={clsx("font-semibold text-[#005C56] text-lg", robotoSlab.className)}>Need further assistance?</h3>
          <p className="text-[#7B809A]">If you have any issues, please contact our support team at</p>
          <a href="mailto:service@Docspath.com" className="text-black underline ml-1">
            service@DocsPath.com
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
