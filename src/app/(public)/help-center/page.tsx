"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Inter, Roboto_Slab } from "next/font/google";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const faqs = [
  {
    title: "Getting Started",
    items: ["How do I register my clinic?", "What roles can I assign?"],
  },
  {
    title: "Appointments & Queue",
    items: ["Can I manage walk-ins and bookings together?"],
    answer:
      "Yes, Docspath’s queue syncs both walk-ins and digital bookings, giving you real-time control with smart prioritization tools.",
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
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [searchText, setSearchText] = useState("");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotatingTexts = [
    "DocsPath Help Center",
    "Your Virtual Health Assistant",
    "All-in-One Healthcare Platform",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const highlightMatch = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-600 rounded px-1">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleSearch = () => {
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) return;

    const index = faqs.findIndex((section) => {
      const inTitle = section.title.toLowerCase().includes(keyword);
      const inItems = section.items.some((item) =>
        item.toLowerCase().includes(keyword)
      );
      return inTitle || inItems;
    });

    if (index !== -1 && sectionRefs.current[index]) {
      setOpenIndex(index);
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-gray-900 pt-16">
        <div className="bg-[#e5f4f3] dark:bg-gray-600 text-gray-800 dark:text-white">
          <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
            <Bell className="w-6 h-6" />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
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
          <div className="absolute w-[300px] h-[150px] top-[520px] -right-[70px] bg-[#c9dddc] dark:bg-teal-600 opacity-20 shadow-[0_4px_20px_rgba(0,0,0,0.9)] rounded-b-full rotate-90" />

          <div className="w-full dark:bg-gray-900 bg-[#e5f4f3] text-gray-800 dark:text-white">
  <div className="relative w-full lg:h-[400px] sm:h-auto">
    <section className="flex flex-col md:flex-row items-stretch w-full ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 lg:h-[400px] sm:h-auto">
        <Image
          src="/assets/prelogin-img/help-center1.png"
          alt="Support"
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-none"
        />
      </div>

      {/* Rotating Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:px-18">
        <div style={{ minHeight: "56px" }}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTextIndex}
              className={clsx(
                "text-2xl sm:text-3xl md:text-4xl font-bold text-[#344767] dark:text-white",
                inter.className
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              {rotatingTexts[currentTextIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={clsx(
            "text-sm sm:text-md text-[#7B809A] mt-2 dark:text-gray-400",
            inter.className
          )}
        >
          Your guide to mastering the DocsPath platform
        </motion.p>

        <input
          type="text"
          placeholder="Search topics like appointment, AI, Billing..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full sm:w-2/3 mt-4 p-2 border border-gray-900 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
        />
      </div>
    </section>
  </div>
</div>

        </div>

        {/* FAQ Section */}
        <div className="flex flex-col md:flex-row max-w-screen-xl dark:bg-gray-900">
          <aside
            className={clsx(
              "w-full md:w-1/4 bg-[#b4d9d6] text-[#344767] text-md font-bold px-6 py-6 dark:bg-gray-700 dark:text-white",
              robotoSlab.className
            )}
          >
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

          <div className="w-full md:w-3/4 px-6 py-8 dark:bg-gray-900">
            <div className="space-y-6">
              {faqs.map((section, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className="border-b border-gray-300 dark:border-gray-700 pb-4"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setOpenIndex(index === openIndex ? null : index)
                    }
                  >
                    <h3
                      className={clsx(
                        "text-xl font-bold text-gray-800 dark:text-white",
                        inter.className
                      )}
                    >
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
                          • {highlightMatch(item, searchText)}
                        </p>
                      ))}
                      {section.answer && (
                        <p className="mt-2 italic text-gray-600 dark:text-gray-400">
                          {highlightMatch(section.answer, searchText)}
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
