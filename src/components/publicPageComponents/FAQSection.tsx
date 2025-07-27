"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

type Props = {
  darkMode: boolean;
};

const faqItems = [
  {
    id: 1,
    text: "How does DocsPath improve clinical operations?",
    answer: "It automates appointments, billing, patient communications, EHR management, and more—giving you back time to focus on patients.",
  },
  {
    id: 2,
    text: "Can this system integrate with what I already use?",
    answer: "Yes. DocsPath is built to sync seamlessly with your current EHR, billing systems, and calendars.",
  },
  {
    id: 3,
    text: " Is patient data secure?",
    answer: "Absolutely. DocsPath is HIPAA and GDPR compliant with advanced encryption to protect patient information.",
  },
  {
    id: 4,
    text: "Do I need to train my staff?",
    answer: "No. The system is easy to use and our onboarding team helps you get started in just hours.",
  },
  {
    id: 5,
    text: "How do I get started?",
    answer: "Click Start Free Trial or Request a Demo. We’ll guide you through everything from setup to customization.",
  }
];

// const generateAnimation = (columnIndex: number) => ({
//   y: ["0%", "-50%", "0%"],
//   transition: {
//     duration: 12,
//     ease: "linear",
//     repeat: Infinity,
//     delay: columnIndex * 2,
//   },
// });

export default function FAQSection({ darkMode }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileFAQSection darkMode={darkMode} /> : <DesktopFAQSection darkMode={darkMode} />;
}

function DesktopFAQSection({ darkMode }: Props) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={clsx(
        "w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 sm:px-8 lg:px-25 pt-16 pb-3",
        darkMode ? "bg-gray-900 text-white" : "bg-[white] bg-[url('/assets/prelogin-img/pricing1.png')] bg-cover bg-center text-black"
      )}
    >
      {/* Left Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        {/* <p className="text-base sm:text-lg mb-8">We’ve compiled some of the most common queries to help you get started.</p> */}

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className={clsx(
                  "rounded-xl border cursor-pointer transition-all duration-300",
                  darkMode
                    ? "bg-transparent border-[#005C56] text-white"
                    : " border-[#005C56] text-black"
                )}
                onClick={() => toggle(item.id)}
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <p className={clsx("font-semibold text-[#005C56]",roboto.className)}>{item.text}</p>
                  <span className="text-xl font-bold">
                    {isActive ? "−" : "+"}
                  </span>
                </div>
                {isActive && (
                  <div className="px-6 pb-4 text-sm text-gray-700 dark:text-gray-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Image Section (unchanged) */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-end w-full max-w-xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-50 ml-20 h-auto mb-[-12px]"
          >
            <Image
              src={
                darkMode
                  ? "/assets/prelogin-img/home/question-mark-dark-1.png"
                  : "/assets/prelogin-img/home/question-mark-1.png"
              }
              alt="?"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="w-full flex justify-center z-10">
            <Image
              src="/assets/prelogin-img/home/faq-1.png"
              alt="FAQ Doctor"
              width={1000}
              height={600}
              className=" "
              priority
              style={{width:"650px"}}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileFAQSection({ darkMode }: Props) {
 const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={clsx(
        "w-full flex flex-col-reverse items-center justify-between gap-8 px-4 sm:px-8 pb-6",
        darkMode ? "bg-gray-900 text-white" : "bg-[white] text-black"
      )}
    >
      {/* Text Section */}
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-base sm:text-lg mb-8">We’ve compiled some of the most common queries to help you get started.</p>

        <div className="h-auto ">
          <motion.div className="flex flex-col gap-6" >
             {faqItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                className={clsx(
                  "rounded-xl border cursor-pointer transition-all duration-300",
                  darkMode
                    ? "bg-transparent border-green-600 text-white"
                    : "bg-white border-[#005C56] text-[#005C56]"
                )}
                onClick={() => toggle(item.id)}
              >
                <div className="flex items-center justify-between px-6 py-4">
                  <p className="font-semibold text-sm text-[#005C56] ">{item.text}</p>
                  <span className="text-xl font-bold">
                    {isActive ? "−" : "+"}
                  </span>
                </div>
                {isActive && (
                  <div className="px-6 pb-4 text-sm text-gray-700 dark:text-gray-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        
          </motion.div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex flex-col items-center justify-end w-full max-w-xs"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-14 h-auto mb-[-12px]"
          >
            <Image
              src={darkMode
                ? "/assets/prelogin-img/home/question-mark-dark-1.png"
                : "/assets/prelogin-img/home/question-mark-1.png"}
              alt="?"
              width={250}
              height={100}
              className=" object-contain"
            />
          </motion.div>

          <div className="w-full flex justify-center z-10">
            <Image
              src="/assets/prelogin-img/home/faq-1.png"
              alt="FAQ Doctor"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
