"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";

const faqs = [
  {
    title: "Getting Started",
    items: ["How do I register my clinic?", "What roles can I assign?"],
  },
  {
    title: "Appointments & Queue",
    items: ["Can I manage walk-ins and bookings together?"],
    answer:
      "Yes, MedyCall’s queue syncs both walk-ins and digital bookings, giving you real-time control with smart prioritization tools.",
  },
  {
    title: "EHR & Patient Management",
    items: ["How is patient data secured?"],
  },
  {
    title: "AI Assistants & Automation",
    items: ["What can the AI agents do?"],
  },
  {
    title: "Billing & Reports",
    items: ["Is invoice generation automatic?"],
  },
  {
    title: "Admin Dashboard Features",
    items: ["Can I see all doctor activities in one place?"],
  },
  {
    title: "Contact & Support",
    items: [],
  },
];

const Bubble = ({
  size,
  top,
  left,
  right,
  bottom,
}: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}) => (
  <div
    className="absolute bg-[#c9dddc] dark:bg-teal-600 rounded-full opacity-20"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      right,
      bottom,
      boxShadow: "0 4px 20px rgba(0,0, 0, 0.9)",
    }}
  />
);

export default function HelpCenter() {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div  className="dark:bg-gray-900">
        {/*  Dark Mode Toggle*/}
      <div className="bg-[#e5f4f3] dark:bg-gray-600 text-gray-800 dark:text-[white]">
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
              <Bubble size={45} top="400px" right="150px" />
             <div
  className="absolute w-[300px] h-[150px] top-[520px] -right-[70px] bg-[#c9dddc] dark:bg-teal-600 opacity-20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] rounded-b-full rotate-90"
/>


             
              
          
        <div className="max-w-screen-xl mx-auto px-8 sm:px-6 lg:px-35 pt-12 pb-18" >
          <section>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-40">
              <Image
                src="/assets/prelogin-img/helpCenter1.jpg"
                alt="Support"
                width={420}
                height={420}
                className="rounded-[70px] shadow-md w-full max-w-xs md:max-w-sm "
              />
              <div className="w-full mt-20 md:mt-20 ">
                <h2 className="text-3xl font-bold text-[#3c506e] dark:text-white">
                  MedyCall Help Center
                </h2>
                <p className="text-md text-[#3c506e] dark:text-gray-400 mt-2">
                  Your guide to mastering the MedyCall platform
                </p>
                <input
                  type="text"
                  placeholder="Search topics like appointment, AI, Billing..."
                  className="w-full mt-4 p-2 border border-gray-900 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                />
              </div>
            </div>
          </section>
        </div>
      </div>


      <div className="flex flex-col md:flex-row max-w-screen-xl dark:bg-gray-900 ">
        {/* Sidebar */}
        <aside className="w-full  md:w-1/4 bg-[#b4d9d6] text-[#3c506e] text-md font-bold font-[serif] px-6 py-6 dark:bg-gray-700 dark:text-white">
          <ul className="space-y-3">
            {faqs.map((faq, idx) => (
              <li
                key={idx}
                className="hover:underline cursor-pointer"
                onClick={() => setOpenIndex(idx)}
              >
                {faq.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* FAQ Section */}
        <div className="w-full md:w-3/4 px-6 py-8 dark:bg-gray-900">
          <div className="space-y-6">
            {faqs.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-300 dark:border-gray-700 pb-4"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenIndex(index === openIndex ? null : index)
                  }
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {section.title}
                  </h3>
                  <span className="text-2xl font-bold dark:text-white">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>

                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pl-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {section.items.map((item, i) => (
                      <p key={i} className="mt-2">
                        • {item}
                      </p>
                    ))}
                    {section.answer && (
                      <p className="mt-2 italic text-gray-600 dark:text-gray-400">
                        {section.answer}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
