"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });

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

export default function BurnoutArticle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="dark:bg-gray-900">
      <Link
        href="/blog"
        className={clsx(
          "absolute top-4 left-4 z-10 flex items-center space-x-2 text-teal-700 dark:text-teal-300 hover:underline",
          inter.className
        )}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Blog</span>
      </Link>

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[white] dark:bg-gray-500 p-2 rounded-full items-center space-x-3">
        <Bell className="w-6 h-6" />
        <span
          className={clsx(
            "text-sm",
            darkMode ? "text-gray-300" : "text-[black]",
            inter.className
          )}
        >
          Dark mode
        </span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={clsx(
            "relative w-10 h-5 rounded-full border border-black transition-colors duration-200",
            darkMode ? "bg-teal-600" : "bg-white"
          )}
        >
          <div
            className={clsx(
              "absolute top-[-2px] w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
              darkMode ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <motion.div variants={fadeInUp} custom={0} className="mb-6 mt-5">
        <Image
          src={darkMode?"/assets/prelogin-img/blog/blog21.jpg":"/assets/prelogin-img/blog/blog22.jpg"}
          alt="Burnout in Healthcare"
          width={1000}
          height={400}
          className="w-full h-auto object-cover rounded-md"
        />
      </motion.div>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500">
        <motion.section
          initial="hidden"
          animate="visible"
          className={clsx("max-w-8xl lg:mx-10 px-4 md:px-8 pb-16", inter.className)}
        >
          <motion.h1
            className="text-xl md:text-4xl font-bold leading-tight mb-1"
            variants={fadeInUp}
            custom={1}
          >
            Burnout in Healthcare: How Doctors <br />
            Can Maintain Mental Wellness
          </motion.h1>

          <motion.p
            className="text-md text-gray-600 dark:text-gray-400 mb-6"
            variants={fadeInUp}
            custom={2}
          >
            March 5, 2025 | Dr. Sameer Joshi
          </motion.p>

          <div className="text-xl">
            <motion.p className="mb-4" variants={fadeInUp} custom={3}>
              Doctors are known for their dedication to saving lives, but what
              happens when their own well-being is at risk? Studies show that
              burnout affects nearly 50% of physicians, leading to fatigue,
              emotional exhaustion, and even medical errors.
            </motion.p>

            <motion.h2 className="mb-2" variants={fadeInUp} custom={4}>
              Signs of Burnout in Healthcare Professionals
            </motion.h2>

            <motion.ul
              className="ml-10  space-y-1 text-lg mb-6"
              initial="hidden"
              animate="visible"
            >
              {[
                "Chronic Fatigue – Feeling drained even after rest.",
                "Reduced Compassion – Feeling disconnected from patients.",
                "Cynicism & Detachment – Losing motivation for work.",
                "Increased Medical Errors – Reduced focus and decision-making ability.",
              ].map((item, i) => (
                <motion.li key={i} variants={fadeInUp} custom={5 + i}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.h2
              className="font-bold mb-2"
              variants={fadeInUp}
              custom={9}
            >
              Practical Strategies for Managing Burnout
            </motion.h2>

            <motion.ul
              className="space-y-1 text-lg mb-6"
              initial="hidden"
              animate="visible"
            >
              {[
                "✔ Set Boundaries – Limit work hours, take regular breaks.",
                "✔ Mindfulness & Meditation – Reduce stress with daily mindfulness practices.",
                "✔ Seek Peer Support – Talking to colleagues can help.",
                "✔ Exercise & Nutrition – Prioritize physical health for better mental resilience.",
                "✔ Professional Help – Therapy and counseling should not be ignored.",
              ].map((item, i) => (
                <motion.li key={i} variants={fadeInUp} custom={10 + i}>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.h2 className="mb-1" variants={fadeInUp} custom={16}>
              Healthcare Systems Must Also Step Up!
            </motion.h2>

            <motion.p className="text-lg mb-4" variants={fadeInUp} custom={17}>
              Hospitals must implement better work schedules, mental health
              support, and wellness programs to protect doctors from burnout.
            </motion.p>

            <motion.h2
              className="font-semibold mb-2"
              variants={fadeInUp}
              custom={18}
            >
              Conclusion
            </motion.h2>

            <motion.p className="text-lg" variants={fadeInUp} custom={19}>
              Physicians save lives, but they also need to take care of their
              own health. Recognizing burnout and taking proactive steps can
              help doctors continue to provide the best patient care.
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
