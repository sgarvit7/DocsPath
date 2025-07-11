"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Bell } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function RoboticSurgeryArticle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 p-6 md:p-12">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3  ">
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

      {/* ✨ Animated article section */}
      <motion.section
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800 border border-gray-300 mt-10 dark:border-gray-700 rounded-xl p-6 md:p-10 max-w-7xl mx-auto shadow-xl"
      >
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-2"
          variants={fadeInUp}
          custom={0}
        >
          How Robotics is Assisting in Surgeries: A Game Changer in 2025
        </motion.h1>

        <motion.p
          className="text-md text-gray-500 dark:text-gray-400 mb-6"
          variants={fadeInUp}
          custom={1}
        >
          March 5, 2025 | ✍️ Dr. Kavita Rao
        </motion.p>

        <motion.div
          className="w-full flex justify-center mb-6"
          variants={fadeInUp}
          custom={2}
        >
          <Image
            src="/assets/prelogin-img/blog/blog11.jpg"
            alt="Robotic Surgery Illustration"
            width={250}
            height={250}
            className="rounded"
          />
        </motion.div>
        <div className="text-xl">
          <motion.p className="mb-4 text-xl" variants={fadeInUp} custom={3}>
            Surgical robotics has transformed the way doctors perform
            procedures, offering greater precision, reduced recovery times, and
            enhanced patient outcomes. In 2025, advancements in robotic-assisted
            surgeries are making complex operations safer and more efficient
            than ever.
          </motion.p>

          <motion.h2
            className="font-semibold text-xl mb-2"
            variants={fadeInUp}
            custom={4}
          >
            How Robotics is Changing Surgery?
          </motion.h2>

          <motion.ol
            className="list-decimal text-xl ml-5 space-y-1 mb-6"
            initial="hidden"
            animate="visible"
          >
            {[
              "Enhanced Precision – Robotic arms can make micro-movements beyond human capability, reducing errors.",
              "Minimally Invasive Procedures – Smaller incisions mean less pain, lower infection risk, and faster recovery.",
              "AI-Powered Assistance – AI integration helps with real-time decision-making during procedures.",
              "Remote Surgery Possibilities – With 5G and AI, surgeons can operate on patients remotely using robotic systems.",
            ].map((point, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                custom={5 + index}
                className="text-sm"
              >
                {point}
              </motion.li>
            ))}
          </motion.ol>

          <motion.h2
            className="font-semibold text-xl mb-2"
            variants={fadeInUp}
            custom={10}
          >
            Key Robotic Surgery Systems in 2025
          </motion.h2>

          <motion.ul
            className="list-disc ml-5 text-2xl space-y-1 mb-6"
            initial="hidden"
            animate="visible"
          >
            {[
              "Da Vinci Xi – The most advanced robotic-assisted surgery system for minimally invasive procedures.",
              "Mako SmartRobotics™ – Transforming orthopedic surgeries with AI-driven precision.",
              "Hugo™ RAS System – Expanding access to robotic-assisted surgery in underserved areas.",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                custom={11 + index}
                className="text-sm"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h2
            className="font-semibold mb-2"
            variants={fadeInUp}
            custom={15}
          >
            Challenges &amp; Future Potential
          </motion.h2>

          <motion.ul
            className="list-disc ml-5 space-y-1 mb-6"
            initial="hidden"
            animate="visible"
          >
            {[
              "High Costs – Robotic systems are expensive, limiting accessibility.",
              "Training Requirements – Surgeons must undergo extensive training.",
              "AI Regulation & Ethics – As AI becomes more involved in decision-making, regulations must ensure patient safety.",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                custom={16 + index}
                className="text-sm"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.h2
            className="font-semibold mb-2"
            variants={fadeInUp}
            custom={20}
          >
            Conclusion
          </motion.h2>

          <motion.p className="mb-4" variants={fadeInUp} custom={21}>
            Robotics in surgery is no longer futuristic—it&rsquo;s reality. As costs
            decrease and accessibility improves, robot-assisted surgeries will
            become a standard practice worldwide.
          </motion.p>

          <motion.p className="italic" variants={fadeInUp} custom={22}>
            What do you think about robotic surgery? Share your thoughts in the
            comments!
          </motion.p>

          <motion.p
            className="mt-6 text-lg text-blue-600 dark:text-blue-400 underline"
            variants={fadeInUp}
            custom={23}
          >
            Read more &rarr; Medical Device Network
          </motion.p>
        </div>
      </motion.section>
    </main>
  );
}
